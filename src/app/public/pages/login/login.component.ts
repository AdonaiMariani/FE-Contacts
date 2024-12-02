
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../shared/styles/login-register-styles.css']
  
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false; // Controla la visibilidad de la contraseña
  faEye = faEye; // Ícono de ojo
  faEyeSlash = faEyeSlash; // Ícono de ojo tachado

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          console.log('Login successful');
        },
        error: (err) => {
          console.error('Login fallido:', err);
          this.loginForm.setErrors({ loginFailed: true });
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
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   email: string = '';
//   password: string = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   login(): void {
//     console.log('Login function called.'); // Log para verificar que el método se llama correctamente
//     this.authService.login(this.email, this.password).subscribe({
//       next: () => {
//         console.log('Login successful'); // Log para confirmar si el login fue exitoso
//         // La redirección se maneja en el AuthService, no es necesario duplicarla aquí
//       },
//       error: (err) => {
//         console.error('Login fallido:', err);
//         alert('Error al iniciar sesión. Por favor, revisa tus credenciales.');
//       }
//     });
//   }
// }


// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   email: string = '';
//   password: string = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   login(): void {
//     console.log('Login function called.'); // Log para verificar que el método se llama correctamente
//     this.authService.login(this.email, this.password).subscribe({
//       next: () => {
//         console.log('Login successful'); // Log para confirmar si el login fue exitoso
//         // Navegar a la página de contactos después del login
//         // this.router.navigate(['/contacts']);
//         // La redirección se maneja en el AuthService
//       },
//       error: (err) => {
//         console.error('Login fallido:', err);
//         alert('Error al iniciar sesión. Por favor, revisa tus credenciales.');
//       }
//     });
//   }

// }
