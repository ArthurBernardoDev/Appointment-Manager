import Cookies from "js-cookie";
import { api } from "../../lib/axios";
export interface ProfileCompletionResponse {
  isProfileComplete: boolean;
}

export const checkProfileCompletion = async (): Promise<ProfileCompletionResponse | null> => {
  const token = Cookies.get("token");

  if (!token) return null;

  const response = await api.get<ProfileCompletionResponse>("/api/dentists/check-profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};