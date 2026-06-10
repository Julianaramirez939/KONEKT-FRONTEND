import { Student } from './student';
import { VacancieResponse } from './vacancie-response';

export interface ApplicationResponse {
  id: number;
  status: string;
  companyComments?: string | null;

  student: Student;
  vacancie: VacancieResponse;

  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}