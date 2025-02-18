import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../../api/auth/sign-in";
import LoginForm from "../components/login-form";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: signIn,
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
    onError: (error) => {
      console.error("Erro no login:", error);
      alert("Erro ao efetuar login. Tente novamente.");
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div>
      <LoginForm register={register} errors={errors} onSubmit={handleSubmit(onSubmit)} />
    </div>
  );
};

export default Login;