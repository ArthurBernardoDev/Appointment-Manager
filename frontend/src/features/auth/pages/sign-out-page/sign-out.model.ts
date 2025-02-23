import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
import { RegisterFormData, registerSchema } from "./sign-out.schema";
import { toast } from "sonner";
import { ISignOutService } from "../../../../services/sign-out-service";

type SignOutModelProps = {
  signOutService: ISignOutService
}

export const useSignOutModel = ({ signOutService }: SignOutModelProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const role = watch("role");
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: signOutService.exec,
    onSuccess: (data) => {
      if (data.token) {
        Cookies.set("token", data.token, { expires: 1, secure: true, sameSite: "Strict" });
      }
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Erro ao cadastrar usuário. Tente novamente.");
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    registerMutation.mutate(data);
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    setValue,
    role,
    errors
  }
}