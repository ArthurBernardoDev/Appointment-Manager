import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../../api/auth/forgot-password";
import "./forgot-password-page.css";
import { toast } from "sonner";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      setSuccess(true);
    },
    onError: () => {
      toast.error('Tivemos um problema interno')
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ email });
  };

  return (
      <div className="forgot-password-container">
        <h2>Recuperação de Senha</h2>
        {success ? (
          <p>Se o e-mail existir, enviamos um link para redefinir sua senha.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Digite seu e-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seuemail@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={mutation.isPending}>
              {mutation.isPending
                ? "Enviando..."
                : "Enviar link de recuperação"}
            </button>
          </form>
        )}
      </div>
  );
}

export default ForgotPasswordPage;
