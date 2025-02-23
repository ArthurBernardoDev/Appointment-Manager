import { describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import { useSignInModel } from './sign-in.model';
import SignInFormView from './sign-in-form.view';
import { ISignInService } from '../../../../services/SignInService';
import { renderView } from '../../../../lib/renderView';
import { act, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import { renderHookWithProviders } from '../../../../lib/renderHooks';
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

const MockSucessSignIn: ISignInService = {
  exec: function () {
    return new Promise(resolve => resolve({ token: "fake-token" }));
  }
};

const MockFailedSignIn: ISignInService = {
  exec: function () {
    return new Promise((_, reject) => reject(new Error("Login falhou")));
  }
};

const MakeSut = ({ signInService }: { signInService: ISignInService }) => {
  const methods = useSignInModel({ signInService });
  return <SignInFormView {...methods} />;
};

describe("Sign in page", () => {
  test("should display error messages when form is submitted empty", async () => {
    const screen = renderView(<MakeSut signInService={MockSucessSignIn} />);
    
    const buttonSubmit = screen.getByTestId("button-submit");
    fireEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(screen.queryAllByTestId("error-message").length).toBe(2);
    });
  });

  test("should display no error messages on form submission", async () => {
    const screen = renderView(<MakeSut signInService={MockSucessSignIn} />);
  
    const inputEmail = screen.getByTestId("input-email");
    fireEvent.input(inputEmail, { target: { value: "testteste@gmail.com" } });
  
    const inputPassword = screen.getByTestId("input-password");
    fireEvent.input(inputPassword, { target: { value: "teste 1234" } });
  
    const buttonSubmit = screen.getByTestId("button-submit");
    fireEvent.click(buttonSubmit);
  
    await waitFor(() => {
      expect(screen.queryAllByTestId("error-message")).toHaveLength(0);
    });
  });

  test("should show error message when login fails", async () => {
    const screen = renderView(<MakeSut signInService={MockFailedSignIn} />);

    const inputEmail = screen.getByTestId("input-email");
    fireEvent.input(inputEmail, { target: { value: "user@example.com" } });

    const inputPassword = screen.getByTestId("input-password");
    fireEvent.input(inputPassword, { target: { value: "wrongpassword" } });

    const buttonSubmit = screen.getByTestId("button-submit");
    fireEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Erro ao efetuar login. Tente novamente.");
    });
  });

  test("should call signInService.exec when form is submitted", async () => {
    const mockExec = vi.fn(() => Promise.resolve({ token: "fake-token" }));
    const signInService = { exec: mockExec };
    const { result } = renderHookWithProviders(() => useSignInModel({ signInService }));
  
    await act(async () => {
      result.current.onSubmit({ email: "user@example.com", password: "password123" });
    });
  
    expect(mockExec).toHaveBeenCalledWith({ email: "user@example.com", password: "password123" });
  });

  test("should store token in cookies on successful login", async () => {
    const mockExec = vi.fn(() => Promise.resolve({ token: "fake-token" }));
    const signInService: ISignInService = { exec: mockExec };
  
    const { result } = renderHookWithProviders(useSignInModel, {
      initialProps: { signInService },
    });
  
    await act(async () => {
      result.current.onSubmit({ email: "user@example.com", password: "password123" });
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