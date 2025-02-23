import { z } from "zod";

export const registerSchema = z.object({
  role: z.string().min(1, "Escolha uma opção"),
  fullName: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "O nome deve conter apenas letras"),
  
  email: z
    .string()
    .email("E-mail inválido"),
  
  password: z
    .string()
    .min(8, "A senha precisa ter no mínimo 8 caracteres")
    .max(50, "A senha pode ter no máximo 50 caracteres")
    .regex(/[A-Z]/, "A senha precisa ter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha precisa ter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "A senha precisa ter pelo menos um número")
    .regex(/[\W_]/, "A senha precisa ter pelo menos um caractere especial"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;