import { api } from '../lib/axios';
import { LoginFormData } from '../features/auth/pages/sign-in-page/sign-in.schema';
import { ResponseToken } from './types';

export interface ISignInService {
  exec: (data: LoginFormData) => Promise<ResponseToken>;
}

export class SignInService implements ISignInService {
  async exec(body: LoginFormData){
    const response = await api.post<ResponseToken>('/api/auth/login', body);
    return response.data;
  }
}
