import { RegisterFormData } from '../features/auth/pages/sign-out-page/sign-out.schema';
import { api } from '../lib/axios';
import { ResponseToken } from './types';

export interface ISignOutService {
  exec: (data: RegisterFormData) => Promise<ResponseToken>;
}

export class SignOutService implements ISignOutService {
  async exec(body: RegisterFormData){
    const response = await api.post<ResponseToken>('/api/auth/register', body);
    return response.data;
  }
}