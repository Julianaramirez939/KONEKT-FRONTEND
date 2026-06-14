import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { API_URL } from '../../global';

import { InternshipUpdateRequest } from '../interfaces/internship-update-request';
import { InternshipUpdateResponse } from '../interfaces/internship-update-response';
import { InternshipUpdateListResponse } from '../interfaces/internship-update-list-response';

@Injectable({
  providedIn: 'root',
})
export class InternshipUpdateService {
  private readonly endpoint = `${API_URL}/internship-update`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  // =========================
  // GET
  // =========================

getInternshipUpdates(params?: {
  page?: number;
  internshipId?: number;
}): Observable<InternshipUpdateListResponse> {
  let httpParams = new HttpParams();

  if (params?.page !== undefined) {
    httpParams = httpParams.set(
      'page',
      params.page,
    );
  }

  if (params?.internshipId !== undefined) {
    httpParams = httpParams.set(
      'internshipId',
      params.internshipId,
    );
  }

  return this.http
    .get<InternshipUpdateListResponse>(
      this.endpoint,
      {
        headers: this.getHeaders(),
        params: httpParams,
      },
    )
    .pipe(catchError(this.handleError));
}
  // =========================
  // GET BY ID
  // =========================
  getInternshipUpdateById(id: number): Observable<InternshipUpdateResponse> {
    return this.http
      .get<InternshipUpdateResponse>(`${this.endpoint}/${id}`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // =========================
  // POST
  // =========================
  createInternshipUpdate(
    data: InternshipUpdateRequest,
  ): Observable<InternshipUpdateResponse> {
    return this.http
      .post<InternshipUpdateResponse>(this.endpoint, data, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // =========================
  // PATCH
  // =========================
  updateInternshipUpdate(
    id: number,
    data: Partial<InternshipUpdateRequest>,
  ): Observable<InternshipUpdateResponse> {
    return this.http
      .patch<InternshipUpdateResponse>(`${this.endpoint}/${id}`, data, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // =========================
  // DELETE
  // =========================
  deleteInternshipUpdate(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.endpoint}/${id}`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // =========================
  // ERROR HANDLER
  // =========================
  private handleError(error: any) {
    console.error('[InternshipUpdateService Error]', error);

    const backendError = error?.error || {};

    return throwError(() => ({
      message: backendError.message || 'Request failed',
      errors: backendError.errors || null,
    }));
  }
}
