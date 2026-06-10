import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { NavbarComponent } from '../navbar/navbar.component';
import { VacanciesService } from '../../services/vacancies.service';
import { VacancieResponse } from '../../interfaces/vacancie-response';
import { ApplicationsService } from '../../services/applications.service';

import localeEsCo from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEsCo, 'es-CO');

@Component({
  selector: 'app-student-vacancies',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './student-vacancies.component.html',
  styleUrl: './student-vacancies.component.css',
})
export class StudentVacanciesComponent implements OnInit {
  vacancies: VacancieResponse[] = [];

  constructor(
    private vacanciesService: VacanciesService,
    private applicationsService: ApplicationsService,
  ) {}

  ngOnInit(): void {
    this.loadVacancies();
  }

  loadVacancies(): void {
    this.vacanciesService.getVacancies().subscribe({
      next: (data: any) => {
        this.vacancies = Array.isArray(data)
          ? data
          : data?.vacancies || data?.data || [];
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las vacantes',
          confirmButtonColor: '#2563eb',
          customClass: { popup: 'konekt-swal' },
        });
      },
    });
  }

  applyVacancy(vacancy: VacancieResponse): void {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');

    Swal.fire({
      title: '¿Postularte a esta vacante?',
      text: vacancy.title,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, postularme',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#ef4444',
      customClass: { popup: 'konekt-swal' },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Enviando postulación...',
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
          customClass: { popup: 'konekt-swal' },
        });

        this.applicationsService.applyToVacancy(vacancy.id!).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Postulación enviada',
              confirmButtonColor: '#2563eb',
              customClass: { popup: 'konekt-swal' },
            });
          },

          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo postular',
              confirmButtonColor: '#2563eb',
              customClass: { popup: 'konekt-swal' },
            });
          },
        });
      }
    });
  }
}
