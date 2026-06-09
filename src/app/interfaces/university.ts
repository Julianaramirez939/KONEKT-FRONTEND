import { User } from './user';

export interface University {
  id: number;
  name: string;
  nit: string;
  address: string;
  phone: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}