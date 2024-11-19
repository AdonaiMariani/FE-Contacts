//CON BEHAVIOR SUBJECT
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, BehaviorSubject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7290/api/authentication';
  private isAuthenticatedSubject: BehaviorSubject<boolean>;

   // Inicialización del observable `isAuthenticated$` después del constructor
   isAuthenticated$: Observable<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    const token = this.getToken();
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(!!token);
    // Inicializamos `isAuthenticated$` aquí, después de que `isAuthenticatedSubject` ya ha sido inicializado
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  // Observable to watch the authentication status
  //isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response && response.token) {
          const token = response.token;
          console.log("Token received:", token);

          try {
            localStorage.setItem('token', token);
            console.log('Token stored successfully in localStorage');
            this.isAuthenticatedSubject.next(true); // Actualizar el estado de autenticación
            this.router.navigate(['/contacts']);
          } catch (error) {
            console.error('Error saving token to localStorage:', error);
          }
        } else {
          console.error("Token not found in response:", response);
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post('https://localhost:7290/api/user', userData);
  }
  
  // register(userData: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/user`, userData);
  // }
  

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false); // Actualizar el estado de autenticación
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

//SIN BEHAVIOR SUBJECT

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable, tap, catchError, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private baseUrl: string = 'https://localhost:7290/api/authentication';

//   constructor(private http: HttpClient, private router: Router) {}

//   login(email: string, password: string): Observable<any> {
//     return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { email, password }).pipe(
//       tap(response => {
//         if (response && response.token) {
//           const token = response.token;
//           console.log("Token received:", token);

//           try {
//             localStorage.setItem('token', token);
//             console.log('Token stored successfully in localStorage');
//             // Redirigir al usuario a la página de contactos solo si se almacena el token correctamente
//             this.router.navigate(['/contacts']);
//           } catch (error) {
//             console.error('Error saving token to localStorage:', error);
//           }
//         } else {
//           console.error("Token not found in response:", response);
//         }
//       }),
//       catchError((err: any) => {
//         console.error('Error during login request:', err);
//         return throwError(() => err);
//       })
//     );
//   }

//   register(userData: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}/register`, userData);
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     this.router.navigate(['/login']);
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   isAuthenticated(): boolean {
//     return !!this.getToken();
//   }
// }


// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable, tap, catchError, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private baseUrl: string = 'https://localhost:7290/api/authentication';

//   constructor(private http: HttpClient, private router: Router) {}

//   login(email: string, password: string): Observable<any> {
//     return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { email, password }).pipe(
//       tap(response => {
//         if (response && response.token) {
//           const token = response.token;
//           console.log("Token received:", token);

//           try {
//             localStorage.setItem('token', token);
//             console.log('Token stored successfully in localStorage');
//             //Redirigir al usuario a la página de contactos solo si se almacena el token correctamente
//             console.log('Redirecting to /contacts');
//             this.router.navigate(['/contacts']);
//           } catch (error) {
//             console.error('Error saving token to localStorage:', error);
//           }
//         } else {
//           console.error("Token not found in response:", response);
//         }
//       }),
//       catchError(err => {
//         console.error('HTTP error occurred during login:', err);
//         return throwError(() => err);
//       })
//     );
//   }

//   register(userData: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}/register`, userData);
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     this.router.navigate(['/login']);
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   isAuthenticated(): boolean {
//     return !!this.getToken();
//   }
// }


