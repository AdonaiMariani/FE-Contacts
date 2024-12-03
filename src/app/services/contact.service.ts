
//CON BEHAVIOR SUBJECT
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Contact } from '../interfaces/contact';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Contact/';
  private contactsSubject = new BehaviorSubject<Contact[]>([]);
  contacts$ = this.contactsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Obtiene la lista completa de contactos desde el backend y actualiza el BehaviorSubject
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.myAppUrl}${this.myApiUrl}`).pipe(
      tap((contacts) => this.contactsSubject.next(contacts)),
      catchError(this.handleError)
    );
  }

  // Obtiene un contacto específico por ID desde el backend
  getContactById(contactId: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.myAppUrl}${this.myApiUrl}${contactId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Añade un nuevo contacto a la base de datos y actualiza el BehaviorSubject
  addContact(newContact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.myAppUrl}${this.myApiUrl}`, newContact, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap((contact) => {
        const currentContacts = this.contactsSubject.value;
        this.contactsSubject.next([...currentContacts, contact]);
      }),
      catchError(this.handleError)
    );
  }

  // Actualiza un contacto existente en la base de datos y actualiza el BehaviorSubject
  updateContact(contactId: number, updatedContact: Contact): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${contactId}`, updatedContact, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(() => {
        const currentContacts = this.contactsSubject.value.map(contact =>
          contact.id === contactId ? updatedContact : contact
        );
        this.contactsSubject.next(currentContacts);
      }),
      catchError(this.handleError)
    );
  }

  // Cambia el estado de favorito de un contacto en la base de datos y actualiza el BehaviorSubject
  toggleFavorite(contactId: number, isFavorite: boolean): Observable<void> {
    return this.http.patch<void>(`${this.myAppUrl}${this.myApiUrl}${contactId}/favorite`, isFavorite, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(() => {
        const currentContacts = this.contactsSubject.value.map(contact =>
          contact.id === contactId ? { ...contact, isFavorite } : contact
        );
        this.contactsSubject.next(currentContacts);
      }),
      catchError(this.handleError)
    );
  }

  // Elimina un contacto de la base de datos y actualiza el BehaviorSubject
  deleteContact(contactId: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${contactId}`).pipe(
      tap(() => {
        const currentContacts = this.contactsSubject.value.filter(contact => contact.id !== contactId);
        this.contactsSubject.next(currentContacts);
      }),
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}





































// import { Injectable } from '@angular/core';
// import { Contact } from '../interfaces/contact';


// @Injectable({
//   providedIn: 'root'
// })
// export class ContactService {
//   private contacts: Contact[] = [
//     {
//       id: 1,
//       name: 'John Doe',
//       phone: '123-456-7890',
//       email: 'john.doe@example.com',
//       address: '123 Main St',
//       isFavorite: false
//     },
//     {
//       id: 2,
//       name: 'Jane Smith',
//       phone: '987-654-3210',
//       email: 'jane.smith@example.com',
//       address: '456 Elm St',
//       isFavorite: true
//     }
//   ];

//   constructor() {}

//   // Método para obtener la lista de contactos
//   getContacts(): Contact[] {
//     return this.contacts;
//   }

//   getContactById(id: number): Contact | undefined {
//     return this.contacts.find(contact => contact.id === id);
//   }

//   // Método para agregar un contacto
//   addContact(contact: Contact): void {
//     this.contacts.push({ ...contact, id: this.contacts.length + 1 });
//   }

//   updateContact(id: number, updatedContact: Contact): void {
//     const index = this.contacts.findIndex(contact => contact.id === id);
//     if (index !== -1) {
//       this.contacts[index] = { ...updatedContact, id };
//     }
//   }
//   // Método para marcar un contacto como favorito
//   toggleFavorite(contactId: number): void {
//     const contacts = this.contactsSubject.value;
//     const contact = this.contacts.find(c => c.id === contactId);
//     if (contact) {
//       contact.isFavorite = !contact.isFavorite;
//       // console.log('Service: New favorite state', contact.isFavorite);
//       console.log(`Service: New favorite state ${contact.isFavorite}`); // Log para verificar el estado actualizado
//         this.contactsSubject.next([...contacts]); // Emitir la nueva lista de contactos
//     }
//   }

//   getFavorites(): Contact[] {
//     return this.contacts.filter(contact => contact.isFavorite);
//   }
  
//   deleteContact(id: number): void {
//     this.contacts = this.contacts.filter(contact => contact.id !== id);
//   }
  
// }

//CÓDIGO ANTES DE CONECTAR CON EL BACKEND
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { Contact } from '../interfaces/contact';


// @Injectable({
//   providedIn: 'root'
// })
// export class ContactService {
//   // Define el BehaviorSubject que almacena la lista de contactos
//   private contactsSubject = new BehaviorSubject<Contact[]>([
//     {
//       id: 1,
//       name: 'John Doe',
//       phone: '123-456-7890',
//       email: 'john.doe@example.com',
//       address: '123 Main St',
//       isFavorite: false
//     },
//     {
//       id: 2,
//       name: 'Jane Smith',
//       phone: '987-654-3210',
//       email: 'jane.smith@example.com',
//       address: '456 Elm St',
//       isFavorite: true
//     }
//   ]);

//   // Observable para que otros componentes puedan suscribirse a la lista de contactos
//   contacts$ = this.contactsSubject.asObservable();

//   // Obtiene la lista de contactos actual
//   getContacts(): Contact[] {
//     return this.contactsSubject.value;
//   }

//   // Obtiene un contacto por ID
//   getContactById(contactId: number): Contact | undefined {
//     return this.contactsSubject.value.find(contact => contact.id === contactId);
//   }

//   // Añade un nuevo contacto a la lista
//   addContact(newContact: Contact): void {
//     const contacts = this.contactsSubject.value;
//     const newId = Math.max(...contacts.map(contact => contact.id)) + 1; // Generar un nuevo ID
//     const contactToAdd = { ...newContact, id: newId };
//     this.contactsSubject.next([...contacts, contactToAdd]);
//   }

//   // Actualiza un contacto existente
//   updateContact(contactId: number, updatedContact: Partial<Contact>): void {
//     const contacts = this.contactsSubject.value;
//     const contactIndex = contacts.findIndex(contact => contact.id === contactId);
//     if (contactIndex > -1) {
//       contacts[contactIndex] = { ...contacts[contactIndex], ...updatedContact };
//       this.contactsSubject.next([...contacts]);
//     }
//   }
//   // Cambia el estado de favorito de un contacto
//   toggleFavorite(contactId: number): void {
//     const contacts = this.contactsSubject.value;
//     const contact = contacts.find(c => c.id === contactId);
//     if (contact) {
//       contact.isFavorite = !contact.isFavorite;
//       console.log(`Service: New favorite state ${contact.isFavorite}`); // Log para verificar el estado actualizado
//       this.contactsSubject.next([...contacts]); // Emitir la nueva lista de contactos
//     }
//   }

//   // Obtiene solo los contactos que están marcados como favoritos
//   getFavorites(): Contact[] {
//     return this.contactsSubject.value.filter(contact => contact.isFavorite);
//   }

//   // Elimina un contacto de la lista
//   deleteContact(contactId: number): void {
//     const updatedContacts = this.contactsSubject.value.filter(contact => contact.id !== contactId);
//     this.contactsSubject.next([...updatedContacts]); // Emitir la nueva lista de contactos sin el contacto eliminado
//   }
// }

//CÓDIGO DESPUÉS DE CONECTAR CON EL BACKEND

//SIN BEHAVIOR SUBJECT
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { throwError } from 'rxjs';
// import { Contact } from '../interfaces/contact';
// import { environment } from 'src/environments/environment';



// @Injectable({
//   providedIn: 'root'
// })
// export class ContactService {
//   private myAppUrl: string = environment.endpoint;
//   private myApiUrl: string = 'api/Contact/';

//   constructor(private http: HttpClient) {}

//   // Obtiene la lista completa de contactos desde el backend
//   getContacts(): Observable<Contact[]> {
//     return this.http.get<Contact[]>(`${this.myAppUrl}${this.myApiUrl}`).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // Obtiene un contacto específico por ID desde el backend
//   getContactById(contactId: number): Observable<Contact> {
//     return this.http.get<Contact>(`${this.myAppUrl}${this.myApiUrl}${contactId}`).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // Añade un nuevo contacto a la base de datos
//   addContact(newContact: Contact): Observable<Contact> {
//     return this.http.post<Contact>(`${this.myAppUrl}${this.myApiUrl}`, newContact, {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json'
//       })
//     }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // Actualiza un contacto existente en la base de datos
//   updateContact(contactId: number, updatedContact: Contact): Observable<void> {
//     return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${contactId}`, updatedContact, {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json'
//       })
//     }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // Cambia el estado de favorito de un contacto en la base de datos
//   toggleFavorite(contactId: number, isFavorite: boolean): Observable<void> {
//     return this.http.patch<void>(`${this.myAppUrl}${this.myApiUrl}${contactId}/favorite`, isFavorite , {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json'
//       })
//     }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // Elimina un contacto de la base de datos
//   deleteContact(contactId: number): Observable<void> {
//     return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${contactId}`).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // Manejo de errores
//   private handleError(error: any): Observable<never> {
//     console.error('An error occurred:', error);
//     return throwError(() => new Error('Something went wrong; please try again later.'));
//   }
// }
