import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component'; 
@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {

}
