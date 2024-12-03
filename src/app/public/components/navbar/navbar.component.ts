import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { faAddressBook, faUserCircle, faUser, faSignOutAlt, faCog, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  isProfileMenuOpen: boolean = false;

  faAddressBook = faAddressBook;
  faUserCircle = faUserCircle;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;
  faCog = faCog;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;

  // Información del usuario
  userAvatarUrl: string | null = null;
  userName: string = 'User';
  defaultAvatarUrl: string = 'assets/default-avatar.png';

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
      if (authenticated) {
        this.loadUserData();
      }
    });
  }

  // Carga los datos del usuario desde el servicio
  loadUserData(): void {
    const userData = this.authService.getUserData();
    if (userData) {
      this.userAvatarUrl = userData.avatarUrl;
      this.userName = userData.name || 'User';
    }
  }

  // Método para alternar el menú desplegable
  toggleProfileMenu(event: MouseEvent): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    event.stopPropagation(); // Evita que el clic cierre el menú inmediatamente
  }

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout();
    this.isProfileMenuOpen = false;
  }

  // Detecta clics fuera del menú y cierra el menú desplegable
  @HostListener('document:click', ['$event'])
  onDocumentClick(): void {
    this.isProfileMenuOpen = false;
  }
}


// //CON PROFILE
// import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css'],
// })
// export class NavbarComponent implements OnInit {
//   isAuthenticated: boolean = false;
//   isProfileMenuOpen: boolean = false;

//   // Información del usuario
//   userAvatarUrl: string | null = null;
//   userName: string = 'User';
//   defaultAvatarUrl: string = 'assets/default-avatar.png';

//   constructor(public authService: AuthService) {}

//   ngOnInit(): void {
//     this.authService.isAuthenticated$.subscribe((authenticated) => {
//       this.isAuthenticated = authenticated;
//       if (authenticated) {
//         this.loadUserData();
//       }
//     });
//   }

//   // Carga los datos del usuario desde el servicio
//   loadUserData(): void {
//     const userData = this.authService.getUserData();
//     if (userData) {
//       this.userAvatarUrl = userData.avatarUrl;
//       this.userName = userData.name || 'User';
//     }
//   }

//   // Método para alternar el menú desplegable
//   toggleProfileMenu(): void {
//     this.isProfileMenuOpen = !this.isProfileMenuOpen;
//   }

//   // Método para cerrar sesión
//   logout(): void {
//     this.authService.logout();
//     this.isProfileMenuOpen = false;
//   }
// }

// //SIN PROFILE
// import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent implements OnInit {
//   // Variable para verificar si el usuario está autenticado
//   isAuthenticated: boolean = false;

//   constructor(public authService: AuthService) {}

//   ngOnInit(): void {
//     // Suscribirse al observable para estar al tanto de los cambios en el estado de autenticación
//     this.authService.isAuthenticated$.subscribe((authenticated) => {
//       this.isAuthenticated = authenticated;
//     });
//   }

//   // Método para hacer logout
//   logout(): void {
//     this.authService.logout();
//   }
// }


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
