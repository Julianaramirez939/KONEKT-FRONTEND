import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { IntershipService } from '../../services/intership.service';
import { IntershipResponse } from '../../interfaces/internship-response';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-student-intership',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './student-internship.component.html',
  styleUrl: './student-internship.component.css',
})
export class StudentInternshipComponent implements OnInit {
  interships: IntershipResponse[] = [];

  constructor(private intershipService: IntershipService) {}

  ngOnInit(): void {
    this.loadInterships();
  }

  loadInterships(): void {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const studentId = user?.profile?.id;

    this.intershipService.getInterships({ studentId }).subscribe({
      next: (res) => {
        this.interships = res.data || [];
        console.log('interships student:', this.interships);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las prácticas',
        });
      },
    });
  }
}