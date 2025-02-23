import { describe, test } from 'vitest'
import { useSignInModel } from './sign-in.model'
import SignInFormView from './sign-in-form.view';
import { ISignInService } from '../../../../services/SignInService';
import { renderView } from '../../../../lib/renderView';
import { fireEvent } from '@testing-library/react';

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
  test("should form submit", () => {
    const screen = renderView(<MakeSut />)
    const form = screen.getByTestId("button-submit")
    fireEvent.submit(form)
  })
})