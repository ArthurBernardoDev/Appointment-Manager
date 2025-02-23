import "../../register-form.css";
import { Link } from "react-router-dom";
import { useSignInModel } from "./sign-in.model";

type SignInFormViewProps = ReturnType<typeof useSignInModel>

function SignInFormView(props: SignInFormViewProps) {
  const {handleSubmit, onSubmit, register, errors} = props;
  return (
    <div className="content-height">
      <div className="signup-container">
        <h1 className="logo">Sorriso+</h1>
        <h2>Entre com sua conta</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Seu e-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Seu e-mail"
            {...register("email")}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <label htmlFor="password">Sua senha</label>
          <input
            id="password"
            type="password"
            placeholder="Sua senha"
            {...register("password")}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <button type="submit" data-testid="button-submit" className="create-button">
            Entrar
          </button>
          <p className="login-redirect">
            Esqueceu sua senha? <Link to="/forgot-password">Redefinir senha</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignInFormView;
