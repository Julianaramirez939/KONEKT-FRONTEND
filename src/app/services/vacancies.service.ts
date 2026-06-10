import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL } from '../../global';

import { VacancieRequest } from '../interfaces/vacancie-request';
import { VacancieResponse } from '../interfaces/vacancie-response';

@Injectable({
  providedIn: 'root',
})
export class VacanciesService {
  private readonly endpoint = `${API_URL}/vacancie`;

  constructor(private http: HttpClient) {}
  
  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  createVacancie(data: VacancieRequest): Observable<VacancieResponse> {
    return this.http
      .post<VacancieResponse>(this.endpoint, data, {
        headers: this.getHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('[VacanciesService] createVacancie error:', error);

          return throwError(() => ({
            message: 'Error creating vacancy',
            error,
          }));
        }),
      );
  }

  getVacancies(): Observable<VacancieResponse[]> {
    return this.http
      .get<VacancieResponse[]>(this.endpoint, {
        headers: this.getHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('[VacanciesService] getVacancies error:', error);

          return throwError(() => ({
            message: 'Error fetching vacancies',
            error,
          }));
        }),
      );
  }

  getVacancieById(id: number): Observable<VacancieResponse> {
    return this.http
      .get<VacancieResponse>(`${this.endpoint}/${id}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('[VacanciesService] getVacancieById error:', error);

          return throwError(() => ({
            message: 'Error fetching vacancy',
            error,
          }));
        }),
      );
  }

  updateVacancie(
    id: number,
    data: Partial<VacancieRequest>,
  ): Observable<VacancieResponse> {
    return this.http
      .patch<VacancieResponse>(`${this.endpoint}/${id}`, data, {
        headers: this.getHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('[VacanciesService] updateVacancie error:', error);

          return throwError(() => ({
            message: 'Error updating vacancy',
            error,
          }));
        }),
      );
  }

  deleteVacancie(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.endpoint}/${id}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('[VacanciesService] deleteVacancie error:', error);

          return throwError(() => ({
            message: 'Error deleting vacancy',
            error,
          }));
        }),
      );
  }
}
