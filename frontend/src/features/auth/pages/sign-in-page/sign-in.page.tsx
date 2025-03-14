import { SignInService } from "../../../../services/sign-in-service";
import SignInFormView from "./sign-in-form.view";
import { useSignInModel } from "./sign-in.model";

const Login = () => {
  const signInService = new SignInService();
  const methods = useSignInModel({
    signInService
  })
  return <SignInFormView {...methods} />
};

export default Login;