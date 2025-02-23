import { SignOutService } from "../../../../services/sign-out-service";
import { useSignOutModel } from "./sign-out.model";
import SignInFormView from "./sign-out.view";

const Register = () => {
  const signOutService = new SignOutService();
  const methods = useSignOutModel({
    signOutService
  });
  return <SignInFormView {...methods} />;
};

export default Register;