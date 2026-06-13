import {
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { StudentService } from '../../services/student.service';

import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-university-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './university-dashboard.component.html',
  styleUrl: './university-dashboard.component.css',
})
export class UniversityDashboardComponent
  implements OnInit, AfterViewInit
{
  students: any[] = [];

  totalStudents = 0;

  semesters: Record<string, number> = {};

  universityName = '';

  constructor(
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  ngAfterViewInit(): void {}

  loadStudents(): void {
    const user = JSON.parse(
      sessionStorage.getItem('user') || '{}'
    );

    const universityId = user?.profile?.id;

    this.universityName =
      user?.profile?.name || 'Universidad';

    this.studentService
      .getStudents(1, universityId)
      .subscribe({
        next: (response) => {
          this.students = response.data;

          this.totalStudents =
            response.total ||
            response.data.length;

          this.generateSemesterStats();

          setTimeout(() => {
            this.createChart();
          }, 100);
        },
      });
  }

activeSemesters = 0;

generateSemesterStats(): void {
  this.semesters = {};

  this.students.forEach((student) => {
    const semester = student.semester || 'Sin dato';

    this.semesters[semester] =
      (this.semesters[semester] || 0) + 1;
  });

  this.activeSemesters = Object.keys(this.semesters).length;
}

  createChart(): void {
    const canvas = document.getElementById(
      'semesterChart'
    ) as HTMLCanvasElement;

    if (!canvas) return;

    Chart.getChart(canvas)?.destroy();

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: Object.keys(this.semesters),
        datasets: [
          {
            label: 'Estudiantes',
            data: Object.values(this.semesters),
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  get recentStudents() {
    return this.students.slice(0, 5);
  }
}