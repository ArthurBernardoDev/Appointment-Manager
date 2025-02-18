import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import "./reset-password-page.css"
import { resetPassword } from "../../../api/auth/reset-password";
import { toast } from 'sonner'

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      setSuccess(true);
    },
    onError: () => {
      toast.error("Tivemos um problema interno")
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('As senhas não coincidem!')
      return;
    }
    mutation.mutate({ token: token ?? "", newPassword });
  };

  return (
    <div className="reset-password-container">
      <h2>Redefinir Senha</h2>
      {success ? (
        <p>Sua senha foi redefinida com sucesso!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-password">Nova Senha</label>
          <input
            id="new-password"
            type="password"
            placeholder="Digite a nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label htmlFor="confirm-password">Confirme a Senha</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirme a nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Redefinindo..." : "Redefinir Senha"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ResetPasswordPage;