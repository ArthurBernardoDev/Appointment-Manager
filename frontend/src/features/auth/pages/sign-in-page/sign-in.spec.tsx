import { describe, expect, test } from 'vitest'
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
  const methods = useSignInModel({signInService: MockSucessSignIn})
  return <SignInFormView {...methods} />
}

describe("Sign in page", () => {
  test("should display all error menssages on form submission", async () => {
    const screen = renderView(<MakeSut />)

    const buttonSubmit = screen.getByTestId("button-submit")
    fireEvent.click(buttonSubmit)

    const formSubmit = screen.getByTestId("sign-in-form")
    await waitFor(() => formSubmit)

    const errorMessage = screen.getAllByTestId("error-message")
    
    expect(errorMessage.length).toBe(2)
  })
})