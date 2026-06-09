import { Student } from './student';
import { User } from './user';

export interface StudentRegisterResponse {
  user: User;
  student: Student;
  token: string;
}
