import { z } from "zod";

export const registerSchema = z.object({
  role: z.string().min(1, "Escolha uma opção"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres"),
  fullName: z.string(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;