import UserTypeSelection from "../../components/user-type-selection";
import "../../register-form.css";
import { useSignOutModel } from "./sign-out.model";
import RegisterPage from "../../components/register-form";

type SignInFormViewProps = ReturnType<typeof useSignOutModel>

function SignInFormView(props: SignInFormViewProps) {
  const { handleSubmit, onSubmit, register, errors, role, setValue } = props;
  return (
    <div>
    {!role ? (
      <UserTypeSelection setUserRole={(role) => setValue("role", role)} />
    ) : (
      <RegisterPage
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
      />
    )}
  </div>
  );
}

export default SignInFormView;
