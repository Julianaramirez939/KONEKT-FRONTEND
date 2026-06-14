import { IntershipResponse } from './internship-response';

export interface InternshipUpdateResponse {
  id: number;

  title: string;
  description: string;

  internshipId: number;

  internship: IntershipResponse;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}