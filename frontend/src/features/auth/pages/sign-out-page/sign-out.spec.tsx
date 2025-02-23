import { describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom";
import { useSignOutModel } from "./sign-out.model";
import SignOutFormView from "./sign-out.view";
import { ISignOutService } from "../../../../services/sign-out-service";
import { renderView } from "../../../../lib/renderView";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { toast } from "sonner";
import { renderHookWithProviders } from "../../../../lib/renderHooks";
import Cookies from "js-cookie";

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

vi.mock("js-cookie", async () => {
  const actual = await vi.importActual<typeof import("js-cookie")>("js-cookie");
  return {
    ...actual,
    default: {
      set: vi.fn(),
      get: vi.fn(),
    },
  };
});

const MockSuccessSignOut: ISignOutService = {
  exec: () => Promise.resolve({ token: "fake-token" }),
};

const MockFailedSignOut: ISignOutService = {
  exec: () => Promise.reject(new Error("Sign-out failed")),
};

const MakeSut = ({ signOutService }: { signOutService: ISignOutService }) => {
  const methods = useSignOutModel({ signOutService });
  return <SignOutFormView {...methods} />;
};

describe("Sign-out Page", () => {
  test("should display error messages when form is submitted empty", async () => {
    const screen = renderView(<MakeSut signOutService={MockSuccessSignOut} />);

    const userCardPatient = screen.getByTestId("user-card-patient");
    fireEvent.click(userCardPatient);

    await waitFor(() => screen.getByTestId("button-submit"));

    const buttonSubmit = screen.getByTestId("button-submit");
    fireEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(screen.queryAllByTestId("error-message").length).toBe(3);
    });
  });

  test("should submit form with no errors when filled correctly", async () => {
    const screen = renderView(<MakeSut signOutService={MockSuccessSignOut} />);

    const userCardPatient = screen.getByTestId("user-card-patient");
    fireEvent.click(userCardPatient);

    await waitFor(() => screen.getByTestId("button-submit"));

    fireEvent.input(screen.getByTestId("input-full-name"), { target: { value: "John Doe" } });
    fireEvent.input(screen.getByTestId("input-email"), { target: { value: "john@example.com" } });
    fireEvent.input(screen.getByTestId("input-password"), { target: { value: "password123" } });

    const buttonSubmit = screen.getByTestId("button-submit");
    fireEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(screen.queryAllByTestId("error-message")).toHaveLength(0);
    });
  });

  test("should show an error message when sign-out fails", async () => {
    const screen = renderView(<MakeSut signOutService={MockFailedSignOut} />);

    const userCardPatient = screen.getByTestId("user-card-patient");
    fireEvent.click(userCardPatient);

    await waitFor(() => screen.getByTestId("button-submit"));

    fireEvent.input(screen.getByTestId("input-full-name"), { target: { value: "John Doe" } });
    fireEvent.input(screen.getByTestId("input-email"), { target: { value: "john@example.com" } });
    fireEvent.input(screen.getByTestId("input-password"), { target: { value: "Password123@" } });

    const buttonSubmit = screen.getByTestId("button-submit");
    fireEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Erro ao cadastrar usuário. Tente novamente.");
    });
  });

  test("should call signOutService.exec when form is submitted", async () => {
    const mockExec = vi.fn(() => Promise.resolve({ token: "fake-token" }));
    const signOutService = { exec: mockExec };

    const { result } = renderHookWithProviders(() => useSignOutModel({ signOutService }));

    await act(async () => {
      result.current.onSubmit({
        fullName: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "Patient",
      });
    });

    expect(mockExec).toHaveBeenCalledWith({
      fullName: "John Doe",
      email: "john@example.com",
      password: "password123",
      role: "Patient",
    });
  });

  test("should store token in cookies on successful sign-out", async () => {
    const mockExec = vi.fn(() => Promise.resolve({ token: "fake-token" }));
    const signOutService: ISignOutService = { exec: mockExec };

    const { result } = renderHookWithProviders(useSignOutModel, {
      initialProps: { signOutService },
    });

    await act(async () => {
      result.current.onSubmit({
        fullName: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "Dentist",
      });
    });

    expect(Cookies.set).toHaveBeenCalledWith("token", "fake-token", {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
    (Cookies.get as ReturnType<typeof vi.fn>).mockReturnValue("fake-token");
    expect(Cookies.get("token")).toBe("fake-token");
  });
});