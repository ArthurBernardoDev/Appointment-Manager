import { api } from "../../lib/axios";


type ResetPasswordData = {
  token: string;
  newPassword: string;
};

export async function resetPassword(data: ResetPasswordData) {
  return api.post("/api/auth/reset-password", data);
}