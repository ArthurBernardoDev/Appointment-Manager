import { api } from "../../lib/axios";

type RegisterResponse = {
  token: string;
};
type RegisterFormData = {
  email: string;
  password: string;
};

export async function signIn(data: RegisterFormData): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>('/api/auth/login', data);
  return response.data;
}