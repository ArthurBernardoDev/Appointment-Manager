import { api } from "../../lib/axios";

type RegisterResponse = {
  token: string;
};
type RegisterFormData = {
  role: string;
  email: string;
  password: string;
};

export async function signOut(data: RegisterFormData): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>('/api/auth/register', data);
  return response.data;
}