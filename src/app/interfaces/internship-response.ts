import { ApplicationResponse } from "./application-response";

export interface IntershipResponse {
  id: number;
  status: string;
  startDate: string;
  endDate: string;
  applicationId: number;
  application: ApplicationResponse;
  createdAt: string;
  updatedAt: string;
}