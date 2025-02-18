import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "../../../api/auth/sign-out";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
import UserTypeSelection from "../components/user-type-selection";
import RegisterPage from "../components/register-form";

const registerSchema = z.object({
  role: z.string().min(1, "Escolha uma opção"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres"),
  fullName: z.string(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const role = watch("role");
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: signOut,
    onSuccess: (data) => {
      if (data.token) {
        Cookies.set("token", data.token, { expires: 1, secure: true, sameSite: "Strict" });
      }
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Erro no registro:", error);
      alert("Erro ao cadastrar usuário. Tente novamente.");
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    registerMutation.mutate(data);
  };
  console.log(getValues("role"))

  return (
    <div>
      {!role ? (
        <UserTypeSelection setUserRole={(role) => setValue("role", role)} />
      ) : (
        <RegisterPage
          register={register}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
        />
      )}
    </div>
  );
};

export default Register;