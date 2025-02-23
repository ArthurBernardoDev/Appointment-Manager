import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;