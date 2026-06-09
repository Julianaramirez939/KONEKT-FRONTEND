import { User } from './user';
import { University } from './university';
export interface UniversityRegisterResponse {
  user: User;
  university: University;
  token: string;
}