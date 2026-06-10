import { VacancieResponse } from './vacancie-response';

export interface VacancieListResponse {
  data: VacancieResponse[];
  total: number;
  page: number;
  per_page: number;
  page_count: number;
  has_next: boolean;
  has_prev: boolean;
}
