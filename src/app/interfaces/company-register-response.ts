import { User } from './user';
import { Company } from './company';

export interface CompanyRegisterResponse {
  user: User;
  company: Company;
  token: string;
}