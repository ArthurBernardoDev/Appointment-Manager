import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { checkProfileCompletion } from "../../../api/auth/check-profile-completion";

export function useCheckProfileCompletion() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["profile-completion"],
    queryFn: checkProfileCompletion,
    staleTime: 5 * 60 * 1000,
    enabled: true, 
  });

  if (!isLoading && data && !data.isProfileComplete) {
    navigate("/dentist-complete");
  }

  return { isLoading };
}