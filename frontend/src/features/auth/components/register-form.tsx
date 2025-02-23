import { FieldErrors, UseFormRegister } from "react-hook-form";
import "../register-form.css";
import { RegisterFormData } from "../pages/sign-out-page/sign-out.schema";

type RegisterFormProps = {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function RegisterForm({ register, errors, onSubmit }: RegisterFormProps) {
  return (
    <div className="signup-container">
      <h1 className="logo">Sorriso+</h1>
      <h2>Crie uma conta</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="fullName">Seu nome completo</label>
        <input
          id="fullName"
          type="text"
          placeholder="Seu nome e sobrenome"
          data-testid="input-full-name"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="error" data-testid="error-message">{errors.fullName.message}</p>
        )}

        <label htmlFor="email">Seu e-mail</label>
        <input
          id="email"
          type="email"
          placeholder="Seu e-mail"
          data-testid="input-email"
          {...register("email")}
        />
        {errors.email && <p className="error" data-testid="error-message">{errors.email.message}</p>}

        <label htmlFor="password">Sua senha</label>
        <input
          id="password"
          type="password"
          placeholder="Sua senha"
          data-testid="input-password"
          {...register("password")}
        />
        {errors.password && (
          <p className="error" data-testid="error-message">{errors.password.message}</p>
        )}

        <button type="submit" className="create-button" data-testid="button-submit">
          Criar perfil gratuito
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;