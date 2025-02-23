import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { LoginFormData, loginSchema } from "./sign-in.schema";
import { toast } from "sonner";
import { ISignInService } from "../../../../services/sign-in-service";

type SignInModelProps = {
  signInService: ISignInService
}

export const useSignInModel = ({ signInService }: SignInModelProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: signInService.exec,
    onSuccess: (data) => {
      if (data.token) {
        Cookies.set("token", data.token, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
      }
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Erro ao efetuar login. Tente novamente.");
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    loginMutation.mutate(data);
  };

  return  {
    onSubmit,
    register,
    handleSubmit,
    errors
  }
}