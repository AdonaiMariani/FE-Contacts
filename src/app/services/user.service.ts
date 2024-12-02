import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'https://localhost:7290/api/user'; // Ajusta esta URL según tu configuración

  constructor(private http: HttpClient) {}

  // Método para obtener los datos del usuario por ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // Método para actualizar los datos del usuario
  updateUser(user: User): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${user.id}`, user);
  }
}
