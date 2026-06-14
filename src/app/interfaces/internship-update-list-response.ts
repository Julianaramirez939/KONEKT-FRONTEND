import { InternshipUpdateResponse } from "./internship-update-response";

export interface InternshipUpdateListResponse {
  data: InternshipUpdateResponse[];
  total: number;
  page: number;
  per_page: number;
  page_count: number;
  has_next: boolean;
  has_prev: boolean;
}