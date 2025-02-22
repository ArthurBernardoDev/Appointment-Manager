// src/components/DentistProfileForm.tsx
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./dentist-profile-form.css";
import { DentistProfileFormData, registerDentistProfile } from "../../../api/auth/dentist-profile";
import { toast } from "sonner";

const specialtiesList = [
  { id: 1, name: "Ortodontia" },
  { id: 2, name: "Endodontia" },
  { id: 3, name: "Periodontia" },
  { id: 4, name: "Implantodontia" },
];

export default function DentistProfilePage() {
  const { register, handleSubmit, setValue } = useForm<DentistProfileFormData>();
  const navigate = useNavigate();
  const [selectedSpecialties, setSelectedSpecialties] = useState<number[]>([]);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: registerDentistProfile,
    onSuccess: () => {
      toast.success("Perfil cadastrado com sucesso!");
      navigate("/dashboard");
    },
  });

  const handleSpecialtyChange = (id: number) => {
    setSelectedSpecialties((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    setValue("specialties", selectedSpecialties);
  };

  const onSubmit: SubmitHandler<DentistProfileFormData> = (data) => {
    mutate(data);
  };

  return (
    <div className="dentist-profile-container">
      <h2>Complete seu perfil de dentista</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="dentist-profile-form">
        <label>Foto de Perfil</label>
        <input type="file" {...register("photo", { required: true })} />

        <label>Especialidades</label>
        <div className="specialties-list">
          {specialtiesList.map((s) => (
            <label key={s.id} className="specialty-option">
              <input
                type="checkbox"
                value={s.id}
                onChange={() => handleSpecialtyChange(s.id)}
              />
              {s.name}
            </label>
          ))}
        </div>

        <label>Endereço da Clínica</label>
        <input type="text" {...register("clinicAddress", { required: true })} />

        <label>Descrição</label>
        <textarea {...register("description", { required: true })} />

        <button type="submit" className="submit-button" disabled={isPending}>
          {isPending ? "Enviando..." : "Salvar Perfil"}
        </button>
        {isSuccess && <p className="success-message">Perfil salvo com sucesso!</p>}
      </form>
    </div>
  );
}