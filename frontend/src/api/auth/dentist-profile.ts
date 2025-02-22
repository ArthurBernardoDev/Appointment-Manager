import { api } from "../../lib/axios";

// src/api/types.ts
export interface DentistProfileFormData {
  photo: FileList;
  specialties: number[];
  clinicAddress: string;
  description: string;
}

export interface DentistProfileResponse {
  id: number;
  photoUrl: string;
  specialties: string[];
  clinicAddress: string;
  description: string;
}
export const registerDentistProfile = async (data: DentistProfileFormData) => {
  const formData = new FormData();
  formData.append("photo", data.photo[0]);
  formData.append("clinicAddress", data.clinicAddress);
  formData.append("description", data.description);
  data.specialties.forEach((id) => formData.append("specialties", id.toString()));

  const response = await api.post<DentistProfileResponse>("/api/dentists/register", formData);
  return response.data;
};