import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // Variable para verificar si el usuario está autenticado
  isAuthenticated: boolean = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Suscribirse al observable para estar al tanto de los cambios en el estado de autenticación
    this.authService.isAuthenticated$.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });
  }

  // Método para hacer logout
  logout(): void {
    this.authService.logout();
  }
}


// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent {
//   // Variable para verificar si el usuario está autenticado
//   isAuthenticated: boolean = false;

//   constructor(private authService: AuthService, private router: Router) {}

//   ngOnInit(): void {
//     // Revisar si el usuario está autenticado al iniciar el componente
//     this.isAuthenticated = this.authService.isAuthenticated();
//   }

//   // Método para hacer logout
//   logout(): void {
//     this.authService.logout();
//     this.isAuthenticated = false;
//     this.router.navigate(['/login']);  // Redirigir al login después de hacer logout
//   }

// }
