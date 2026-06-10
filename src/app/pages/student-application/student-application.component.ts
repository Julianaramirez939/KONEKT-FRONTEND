import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { NavbarComponent } from '../navbar/navbar.component';
import { ApplicationsService } from '../../services/applications.service';
import { ApplicationResponse } from '../../interfaces/application-response';

@Component({
  selector: 'app-student-applications',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './student-application.component.html',
  styleUrl: './student-application.component.css',
})
export class StudentApplicationComponent implements OnInit {
  applications: ApplicationResponse[] = [];

  constructor(private applicationsService: ApplicationsService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.applicationsService.getApplications().subscribe({
      next: (response: any) => {
        this.applications = response?.data ?? [];

        console.log('applications:', this.applications);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las postulaciones',
          confirmButtonColor: '#2563eb',
          customClass: { popup: 'konekt-swal' },
        });
      },
    });
  }

  deleteApplication(id: number): void {
    Swal.fire({
      title: '¿Eliminar postulación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#2563eb',
      customClass: { popup: 'konekt-swal' },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Eliminando...',
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
          customClass: { popup: 'konekt-swal' },
        });

        this.applicationsService.deleteApplication(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminada',
              confirmButtonColor: '#2563eb',
              customClass: { popup: 'konekt-swal' },
            });

            this.loadApplications();
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar',
              confirmButtonColor: '#2563eb',
              customClass: { popup: 'konekt-swal' },
            });
          },
        });
      }
    });
  }
}
