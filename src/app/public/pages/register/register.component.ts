import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userName: string = '';
  name: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    const userData = {
      userName: this.userName,
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    this.authService.register(userData).subscribe({
      next: () => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Registration failed:', err);
        alert('Error al registrarse. Por favor, intenta nuevamente.');
      }
    });
  }

}
