import { FieldErrors, UseFormRegister } from "react-hook-form";
import "./register-form.css";
import { LoginFormData } from "../pages/sign-in-page";
import { Link } from "react-router-dom";

type LoginFormProps = {
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function LoginForm({ register, errors, onSubmit }: LoginFormProps) {
  return (
    <div className="content-height">
      <div className="signup-container">
        <h1 className="logo">Sorriso+</h1>
        <h2>Entre com sua conta</h2>
        <form onSubmit={onSubmit}>
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

          <button type="submit" className="create-button">
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

export default LoginForm;
