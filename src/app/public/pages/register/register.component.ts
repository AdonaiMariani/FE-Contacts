import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../shared/styles/login-register-styles.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          console.error('Registration failed:', err);
          this.registerForm.setErrors({ registerFailed: true });
        }
      });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}



// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   userName: string = '';
//   name: string = '';
//   lastName: string = '';
//   email: string = '';
//   password: string = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   register(): void {
//     const userData = {
//       userName: this.userName,
//       name: this.name,
//       lastName: this.lastName,
//       email: this.email,
//       password: this.password
//     };

//     this.authService.register(userData).subscribe({
//       next: () => {
//         alert('Registration successful');
//         this.router.navigate(['/login']);
//       },
//       error: (err: any) => {
//         console.error('Registration failed:', err);
//         alert('Error al registrarse. Por favor, intenta nuevamente.');
//       }
//     });
//   }

// }
