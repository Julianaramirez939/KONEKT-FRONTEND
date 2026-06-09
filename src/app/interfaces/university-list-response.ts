import { University } from './university';

export interface UniversityListResponse {
  data: University[];
  total: number;
  page: number;
  per_page: number;
  page_count: number;
  has_next: boolean;
  has_prev: boolean;
}