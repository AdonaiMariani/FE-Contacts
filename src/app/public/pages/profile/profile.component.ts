import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../../shared/styles/login-register-styles.css'],
})
export class ProfileComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;


  user: User = {
    id: 0,
    userName: '',
    name: '',
    lastName: '',
    email: '',
  };

  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del usuario autenticado
    const userId = this.authService.getUserId();
    if (userId) {
      // Cargar datos del usuario
      this.userService.getUserById(userId).subscribe({
        next: (data) => (this.user = data),
        error: (err) => console.error('Error fetching user data:', err),
      });
    }
  }

  updateProfile(): void {
    // Validar las contraseñas si se han completado
    if (this.passwordData.currentPassword || this.passwordData.newPassword || this.passwordData.confirmPassword) {
      if (!this.passwordData.currentPassword) {
        alert('Please provide your current password to update it.');
        return;
      }
      if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
        alert('New password and confirmation do not match.');
        return;
      }

      // Añadir las contraseñas al objeto usuario
      this.user.currentPassword = this.passwordData.currentPassword;
      this.user.newPassword = this.passwordData.newPassword;
    }

    // Enviar la solicitud para actualizar el usuario
    this.userService.updateUser(this.user).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        // Limpiar los datos de la contraseña después de actualizar
        this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        alert('Failed to update profile. Please check your inputs.');
      },
    });
  }
  togglePasswordVisibility(field: 'current' | 'new' | 'confirm'): void {
    if (field === 'current') {
      this.showCurrentPassword = !this.showCurrentPassword;
    } else if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}


// import { Component, OnInit } from '@angular/core';
// import { UserService } from 'src/app/services/user.service';
// import { AuthService } from 'src/app/services/auth.service';
// import { User } from 'src/app/interfaces/user';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css'],
// })
// export class ProfileComponent implements OnInit {
//   user: User = {
//     id: 0,
//     userName: '',
//     name: '',
//     lastName: '',
//     email: '',
//   };
  
//   activeTab: string = 'details'; // Tab activa
//   passwordData = {
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   };

//   constructor(
//     private userService: UserService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     const userId = this.authService.getUserId();
//     if (userId) {
//       this.userService.getUserById(userId).subscribe({
//         next: (data) => (this.user = data),
//         error: (err) => console.error('Error fetching user data:', err),
//       });
//     }
//   }

//   setActiveTab(tab: string): void {
//     this.activeTab = tab;
//   }

//   updateProfile(): void {
//     this.userService.updateUser(this.user).subscribe({
//       next: () => alert('Profile updated successfully!'),
//       error: (err) => console.error('Error updating profile:', err),
//     });
//   }

//   changePassword(): void {
//     if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }

//     const updatedUser = {
//       ...this.user,
//       currentPassword: this.passwordData.currentPassword,
//       newPassword: this.passwordData.newPassword,
//     };

//     this.userService.updateUser(updatedUser).subscribe({
//       next: () => {
//         alert('Password updated successfully!');
//         this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
//       },
//       error: (err) => {
//         console.error('Error updating password:', err);
//         alert('Failed to update password. Please check your current password.');
//       },
//     });
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { UserService } from 'src/app/services/user.service';
// import { AuthService } from 'src/app/services/auth.service';
// import { User } from 'src/app/interfaces/user';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css'],
// })
// export class ProfileComponent implements OnInit {
//   user: User = {
//     id: 0,
//     name: '',
//     lastName: '',
//     userName: '',
//     email: '',
//   };

//   constructor(
//     private userService: UserService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     const userId = this.authService.getUserId();
//     if (userId) {
//       this.userService.getUserById(userId).subscribe({
//         next: (data) => (this.user = data),
//         error: (err) => console.error('Error fetching user:', err),
//       });
//     }
//   }

//   updateUser(): void {
//     this.userService.updateUser(this.user).subscribe({
//       next: () => alert('Profile updated successfully!'),
//       error: (err) => console.error('Error updating user:', err),
//     });
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit {
//   user: any = {};
//   passwordData = {
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   };
//   activeTab: string = 'details';

//   constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

//   ngOnInit(): void {
//     const userId = this.authService.getUserId();
//     this.http.get(`/api/user/${userId}`).subscribe((user: any) => {
//       this.user = user;
//     });
//   }

//   setActiveTab(tab: string): void {
//     this.activeTab = tab;
//   }

//   updateProfile(): void {
//     this.http.put(`/api/user/${this.user.id}`, this.user).subscribe(
//       () => {
//         alert('Profile updated successfully!');
//       },
//       (error) => {
//         alert('Error updating profile: ' + error.error.message);
//       }
//     );
//   }

//   changePassword(): void {
//     if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
//       alert('New password and confirmation do not match.');
//       return;
//     }

//     const passwordPayload = {
//       id: this.user.id,
//       currentPassword: this.passwordData.currentPassword,
//       newPassword: this.passwordData.newPassword
//     };

//     this.http.put(`/api/user/${this.user.id}`, passwordPayload).subscribe(
//       () => {
//         alert('Password changed successfully!');
//         this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
//       },
//       (error) => {
//         alert('Error changing password: ' + error.error.message);
//       }
//     );
//   }
// }
