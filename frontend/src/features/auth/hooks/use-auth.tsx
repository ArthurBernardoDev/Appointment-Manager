import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useAuth() {
  const token = Cookies.get("token");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["validateToken"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/api/auth/validate-token", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    retry: false,
    enabled: !!token, // Só executa a query se houver um token
  });

  if (isError) {
    Cookies.remove("token");
  }

  return { isAuthenticated: !!data, isLoading, isError };
}