import { describe, expect, test } from 'vitest'
import '@testing-library/jest-dom';
import { useSignInModel } from './sign-in.model'
import SignInFormView from './sign-in-form.view';
import { ISignInService } from '../../../../services/SignInService';
import { renderView } from '../../../../lib/renderView';
import { fireEvent, waitFor } from '@testing-library/react';

const MockSucessSignIn: ISignInService = {
  exec: function () {
    throw new Promise(resolve => resolve("success"));
  }
}
const MakeSut = () => {
  const methods = useSignInModel({ signInService: MockSucessSignIn });
  return <SignInFormView {...methods} />;
};

describe("Sign in page", () => {
  test("should display error messages when form is submitted empty", async () => {
    const screen = renderView(<MakeSut />);
    
    const buttonSubmit = screen.getByTestId("button-submit");
    fireEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(screen.queryAllByTestId("error-message").length).toBe(2);
    });
  });

  test("should display no error messages on form submission", async () => {
    const screen = renderView(<MakeSut />);
  
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
})