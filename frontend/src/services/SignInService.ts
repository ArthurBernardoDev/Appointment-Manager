import { api } from '../lib/axios';
import { LoginFormData } from './../features/auth/pages/sign-in-page/sign-in.schema';

type SignInResponse = {
  token: string;
};

export interface ISignInService {
  exec: (data: LoginFormData) => Promise<SignInResponse>;
}

export class SignInService implements ISignInService {
  async exec(body: LoginFormData){
    const response = await api.post<SignInResponse>('/api/auth/login', body);
    return response.data;
  }
}