import { api } from "../../lib/axios";

type ForgotPasswordData = {
  email: string;
};

export async function forgotPassword(data: ForgotPasswordData) {
  return api.post("/api/auth/forgot-password", data);
}