// SIN CÓDIGO REDUNDANTE
// //CON LISTAS JUNTAS
// //CON BEHAVIOR SUBJECT
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchTerm: string = '';
  private subscription: Subscription = new Subscription();

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    // Subscribe to contacts from the service
    this.subscription.add(
      this.contactService.contacts$.subscribe({
        next: (contacts: Contact[]) => {
          this.contacts = contacts;
          this.updateFilteredContacts();
        },
        error: (err) => {
          console.error('Error fetching contacts', err);
        },
      })
    );

    // Fetch initial contact data
    this.contactService.getContacts().subscribe();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscription.unsubscribe();
  }

  // Filter contacts based on the search term
  filterContacts(): void {
    if (this.searchTerm.trim()) {
      this.filteredContacts = this.contacts.filter((contact) =>
        contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (contact.email?.toLowerCase() ?? '').includes(this.searchTerm.toLowerCase()) ||
        contact.phone.includes(this.searchTerm)
      );
    } else {
      this.filteredContacts = [...this.contacts];
    }
    this.sortContacts();
  }

  // Handle the event when a contact is deleted
  onContactDeleted(contactId: number): void {
    console.log(`Deleting contact with ID: ${contactId}`);
    this.contacts = this.contacts.filter((contact) => contact.id !== contactId);
    this.updateFilteredContacts();
  }

  // Handle the event when a contact's favorite state changes
  onContactFavoriteChanged(): void {
    console.log('Favorite state changed, updating list');
    this.updateFilteredContacts();
  }

  // Update the filtered contacts list and apply sorting
  updateFilteredContacts(): void {
    this.filterContacts();
  }

  // Sort contacts alphabetically with favorites at the top
  sortContacts(): void {
    this.filteredContacts.sort((a, b) => {
      if (a.isFavorite === b.isFavorite) {
        return a.name.localeCompare(b.name);
      }
      return a.isFavorite ? -1 : 1;
    });
  }
}





// // CON CÓDIGO REDUNDANTE
// // //CON LISTAS JUNTAS
// // //CON BEHAVIOR SUBJECT
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Contact } from 'src/app/interfaces/contact';
// import { ContactService } from 'src/app/services/contact.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-contacts',
//   templateUrl: './contacts.component.html',
//   styleUrls: ['./contacts.component.css']
// })
// export class ContactsComponent implements OnInit, OnDestroy {
//   contacts: Contact[] = [];
//   filteredContacts: Contact[] = [];
//   searchTerm: string = '';
//   selectedContact: Contact | null = null; // Para manejar el contacto seleccionado
//   private subscription: Subscription = new Subscription();

//   constructor(private contactService: ContactService) {}

//   ngOnInit(): void {
//     this.subscription.add(
//       this.contactService.contacts$.subscribe({
//         next: (contacts: Contact[]) => {
//           this.contacts = contacts;
//           this.updateFilteredContacts();
//         },
//         error: (err) => {
//           console.error('Error fetching contacts', err);
//         }
//       })
//     );

//     this.contactService.getContacts().subscribe();
//   }

//   ngOnDestroy(): void {
//     this.subscription.unsubscribe();
//   }

//   filterContacts(): void {
//     if (this.searchTerm.trim()) {
//       this.filteredContacts = this.contacts.filter(contact =>
//         contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         (contact.email?.toLowerCase() ?? '').includes(this.searchTerm.toLowerCase()) ||
//         contact.phone.includes(this.searchTerm)
//       );
//     } else {
//       this.filteredContacts = [...this.contacts];
//     }
//     this.sortContacts();
//     console.log('Filtered contacts:', this.filteredContacts);
//   }

//   onContactDeleted(contactId: number): void {
//     console.log(`Eliminando contacto con ID: ${contactId}`);
//     this.contactService.deleteContact(contactId).subscribe({
//       next: () => {
//         console.log(`Contacto con ID ${contactId} eliminado correctamente`);
//       },
//       error: (err) => {
//         console.error('Error deleting contact', err);
//       }
//     });
//   }

//   onContactFavoriteChanged(): void {
//     this.updateFilteredContacts();
//     console.log('Lista de contactos actualizada después del cambio de favorito');
//   }

//   updateFilteredContacts(): void {
//     this.filterContacts();
//   }

//   // Ordenar los contactos alfabéticamente con los favoritos al principio
//   sortContacts(): void {
//     this.filteredContacts.sort((a, b) => {
//       if (a.isFavorite === b.isFavorite) {
//         return a.name.localeCompare(b.name);
//       }
//       return a.isFavorite ? -1 : 1;
//     });
//   }

//   // Métodos para abrir y cerrar el modal de detalles del contacto
//   openContactDetails(contact: Contact): void {
//     this.selectedContact = contact;
//   }

//   closeContactDetails(): void {
//     this.selectedContact = null;
//   }

//   // Método de ejemplo para editar el contacto
//   editContact(contact: Contact): void {
//     console.log(`Editando el contacto con ID: ${contact.id}`);
//   }
// }





// //CON LISTAS SEPARADAS
// //CON BEHAVIOR SUBJECT
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Contact } from 'src/app/interfaces/contact';
// import { ContactService } from 'src/app/services/contact.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-contacts',
//   templateUrl: './contacts.component.html',
//   styleUrls: ['./contacts.component.css']
// })
// export class ContactsComponent implements OnInit, OnDestroy {
//   contacts: Contact[] = [];
//   filteredContacts: Contact[] = [];
//   favorites: Contact[] = [];
//   searchTerm: string = '';
//   selectedContact: Contact | null = null; // Para manejar el contacto seleccionado
//   private subscription: Subscription = new Subscription();

//   constructor(private contactService: ContactService) {}

//   ngOnInit(): void {
//     this.subscription.add(
//       this.contactService.contacts$.subscribe({
//         next: (contacts: Contact[]) => {
//           this.contacts = contacts;
//           this.updateFilteredContacts();
//           this.updateFavorites();
//         },
//         error: (err) => {
//           console.error('Error fetching contacts', err);
//         }
//       })
//     );

//     this.contactService.getContacts().subscribe();
//   }

//   ngOnDestroy(): void {
//     this.subscription.unsubscribe();
//   }

//   filterContacts(): void {
//     if (this.searchTerm.trim()) {
//       this.filteredContacts = this.contacts.filter(contact =>
//         contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         (contact.email?.toLowerCase() ?? '').includes(this.searchTerm.toLowerCase()) ||
//         contact.phone.includes(this.searchTerm)
//       );
//       this.favorites = this.filteredContacts.filter(contact => contact.isFavorite);
//     } else {
//       this.filteredContacts = [...this.contacts];
//       this.updateFavorites();
//     }
//     console.log('Filtered contacts:', this.filteredContacts);
//   }

//   onContactDeleted(contactId: number): void {
//     console.log(`Eliminando contacto con ID: ${contactId}`);
//     this.contactService.deleteContact(contactId).subscribe({
//       next: () => {
//         console.log(`Contacto con ID ${contactId} eliminado correctamente`);
//       },
//       error: (err) => {
//         console.error('Error deleting contact', err);
//       }
//     });
//   }

//   onContactFavoriteChanged(): void {
//     this.updateFavorites();
//     console.log('Lista de favoritos actualizada después del cambio de favorito');
//   }

//   updateFilteredContacts(): void {
//     this.filterContacts();
//   }

//   updateFavorites(): void {
//     this.favorites = this.filteredContacts.filter(contact => contact.isFavorite);
//     console.log('Updated favorites:', this.favorites);
//   }

//   // Métodos para abrir y cerrar el modal de detalles del contacto
//   openContactDetails(contact: Contact): void {
//     this.selectedContact = contact;
//   }

//   closeContactDetails(): void {
//     this.selectedContact = null;
//   }

//   // Método de ejemplo para editar el contacto
//   editContact(contact: Contact): void {
//     console.log(`Editando el contacto con ID: ${contact.id}`);
//   }
// }






//CON BEHAVIOR SUBJECT
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Contact } from 'src/app/interfaces/contact';
// import { ContactService } from 'src/app/services/contact.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-contacts',
//   templateUrl: './contacts.component.html',
//   styleUrls: ['./contacts.component.css']
// })
// export class ContactsComponent implements OnInit, OnDestroy {
//   contacts: Contact[] = [];
//   filteredContacts: Contact[] = [];
//   favorites: Contact[] = [];
//   searchTerm: string = '';
//   selectedContact: Contact | null = null; // Para manejar el contacto seleccionado
//   private subscription: Subscription = new Subscription();

//   constructor(private contactService: ContactService) {}

//   ngOnInit(): void {
//     this.subscription.add(
//       this.contactService.contacts$.subscribe({
//         next: (contacts: Contact[]) => {
//           this.contacts = contacts;
//           this.updateFilteredContacts();
//           this.updateFavorites();
//         },
//         error: (err) => {
//           console.error('Error fetching contacts', err);
//         }
//       })
//     );

//     this.contactService.getContacts().subscribe();
//   }

//   ngOnDestroy(): void {
//     this.subscription.unsubscribe();
//   }

//   filterContacts(): void {
//     if (this.searchTerm.trim()) {
//       this.filteredContacts = this.contacts.filter(contact =>
//         contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         (contact.email?.toLowerCase() ?? '').includes(this.searchTerm.toLowerCase()) ||
//         contact.phone.includes(this.searchTerm)
//       );
//       this.favorites = this.filteredContacts.filter(contact => contact.isFavorite);
//     } else {
//       this.filteredContacts = [...this.contacts];
//       this.updateFavorites();
//     }
//     console.log('Filtered contacts:', this.filteredContacts);
//   }

//   onContactDeleted(contactId: number): void {
//     console.log(`Eliminando contacto con ID: ${contactId}`);
//     this.contactService.deleteContact(contactId).subscribe({
//       next: () => {
//         console.log(`Contacto con ID ${contactId} eliminado correctamente`);
//       },
//       error: (err) => {
//         console.error('Error deleting contact', err);
//       }
//     });
//   }

//   onContactFavoriteChanged(): void {
//     this.updateFavorites();
//     console.log('Lista de favoritos actualizada después del cambio de favorito');
//   }

//   updateFilteredContacts(): void {
//     this.filterContacts();
//   }

//   updateFavorites(): void {
//     this.favorites = this.filteredContacts.filter(contact => contact.isFavorite);
//     console.log('Updated favorites:', this.favorites);
//   }

//   toggleFavorite(contact: Contact): void {
//     console.log(`Marcando como favorito el contacto con ID: ${contact.id}`);
//     const newFavoriteState = !contact.isFavorite;

//     this.contactService.toggleFavorite(contact.id, newFavoriteState).subscribe({
//       next: () => {
//         console.log('Nuevo estado favorito:', newFavoriteState);
//       },
//       error: (err) => {
//         console.error('Error updating favorite state', err);
//       }
//     });
//   }

//   // Métodos para abrir y cerrar el modal de detalles del contacto
//   openContactDetails(contact: Contact): void {
//     this.selectedContact = contact;
//   }

//   closeContactDetails(): void {
//     this.selectedContact = null;
//   }

//   // Método de ejemplo para editar el contacto
//   editContact(contact: Contact): void {
//     // Aquí puedes implementar la lógica para editar un contacto
//     console.log(`Editando el contacto con ID: ${contact.id}`);
//   }

//   callContact(phone: string): void {
//     if (phone) {
//       window.location.href = `tel:${phone}`;
//     } else {
//       console.error('El número de teléfono no está disponible.');
//     }
//   }

  
//   openWhatsApp(phone: string): void {
//     if (phone) {
//       window.open(`https://wa.me/${phone}`, '_blank');
//     } else {
//       console.error('El número de teléfono no está disponible.');
//     }
//   }

  
//   openMaps(address: string): void {
//     if (address) {
//       const encodedAddress = encodeURIComponent(address);
//       window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
//     } else {
//       console.error('La dirección no está disponible.');
//     }
//   }
// }




// //CON BEHAVIOR SUBJECT
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Contact } from 'src/app/interfaces/contact';
// import { ContactService } from 'src/app/services/contact.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-contacts',
//   templateUrl: './contacts.component.html',
//   styleUrls: ['./contacts.component.css']
// })
// export class ContactsComponent implements OnInit, OnDestroy {
//   contacts: Contact[] = [];
//   filteredContacts: Contact[] = [];
//   favorites: Contact[] = [];
//   searchTerm: string = '';
//   private subscription: Subscription = new Subscription();

//   constructor(private contactService: ContactService) {}

//   ngOnInit(): void {
//     // Suscribirse a la lista de contactos del BehaviorSubject
//     this.subscription.add(
//       this.contactService.contacts$.subscribe({
//         next: (contacts: Contact[]) => {
//           this.contacts = contacts;
//           this.updateFilteredContacts();
//           this.updateFavorites();
//         },
//         error: (err) => {
//           console.error('Error fetching contacts', err);
//         }
//       })
//     );

//     // Obtener la lista inicial de contactos desde el backend
//     this.contactService.getContacts().subscribe();
//   }

//   ngOnDestroy(): void {
//     // Desuscribirse para evitar pérdidas de memoria
//     this.subscription.unsubscribe();
//   }

//   // Filtrar los contactos según el término de búsqueda
//   filterContacts(): void {
//     if (this.searchTerm.trim()) {
//       this.filteredContacts = this.contacts.filter(contact =>
//         contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         (contact.email?.toLowerCase() ?? '').includes(this.searchTerm.toLowerCase()) ||
//         contact.phone.includes(this.searchTerm)
//       );
//       // Actualizar también la lista de favoritos según el término de búsqueda
//       this.favorites = this.filteredContacts.filter(contact => contact.isFavorite);
//     } else {
//       this.filteredContacts = [...this.contacts];
//       this.updateFavorites();
//     }
//     console.log('Filtered contacts:', this.filteredContacts);
//   }

//   // Método llamado cuando un contacto ha sido eliminado
//   onContactDeleted(contactId: number): void {
//     console.log(`Eliminando contacto con ID: ${contactId}`);
//     this.contactService.deleteContact(contactId).subscribe({
//       next: () => {
//         console.log(`Contacto con ID ${contactId} eliminado correctamente`);
//       },
//       error: (err) => {
//         console.error('Error deleting contact', err);
//       }
//     });
//   }

//   // Método para manejar el cambio de estado de favorito de un contacto
//   onContactFavoriteChanged(): void {
//     this.updateFavorites();
//     console.log('Lista de favoritos actualizada después del cambio de favorito');
//   }

//   // Actualizar la lista filtrada de contactos
//   updateFilteredContacts(): void {
//     this.filterContacts();
//   }

//   // Actualizar la lista de favoritos
//   updateFavorites(): void {
//     this.favorites = this.filteredContacts.filter(contact => contact.isFavorite);
//     console.log('Updated favorites:', this.favorites);
//   }

//   // Alternar el estado de favorito del contacto
//   toggleFavorite(contact: Contact): void {
//     console.log(`Marcando como favorito el contacto con ID: ${contact.id}`);
//     const newFavoriteState = !contact.isFavorite;

//     this.contactService.toggleFavorite(contact.id, newFavoriteState).subscribe({
//       next: () => {
//         console.log('Nuevo estado favorito:', newFavoriteState);
//       },
//       error: (err) => {
//         console.error('Error updating favorite state', err);
//       }
//     });
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { Contact } from 'src/app/interfaces/contact';
// import { ContactService } from 'src/app/services/contact.service';


// @Component({
//   selector: 'app-contacts',
//   templateUrl: './contacts.component.html',
//   styleUrls: ['./contacts.component.css']
// })
// export class ContactsComponent implements OnInit {
//   contacts: Contact[] = [];
//   filteredContacts: Contact[] = [];
//   favorites: Contact[] = [];
//   searchTerm: string = '';

//   constructor(private contactService: ContactService) {}

//   ngOnInit(): void {
//     // Utiliza el servicio para obtener la lista de contactos cuando el componente se inicialice
//     this.contacts = this.contactService.getContacts();
//     this.filteredContacts = this.contacts;
//     this.favorites = this.contactService.getFavorites();
//   }

//   ngOnChanges(): void {
//     // Actualizar los contactos filtrados cada vez que cambie la búsqueda
//     this.filterContacts();
//   }

//   filterContacts(): void {
//     if (this.searchTerm.trim()) {
//       this.filteredContacts = this.contacts.filter(contact =>
//         contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         contact.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         contact.phone.includes(this.searchTerm)
//       );
//     } else {
//       this.filteredContacts = this.contacts;
//     }
//     // También actualizar los favoritos según el término de búsqueda
//     this.favorites = this.filteredContacts.filter(contact => contact.isFavorite);
//   }

//   onContactDeleted(contactId: number): void {
//     // Filtrar el contacto eliminado de la lista
//     this.filteredContacts = this.filteredContacts.filter(contact => contact.id !== contactId);
//   }
// }



// import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { Contact } from 'src/app/interfaces/contact';
// import { ContactService } from 'src/app/services/contact.service';

// @Component({
//   selector: 'app-contacts',
//   templateUrl: './contacts.component.html',
//   styleUrls: ['./contacts.component.css']
// })
// export class ContactsComponent implements OnInit {
//   contacts: Contact[] = [];
//   filteredContacts: Contact[] = [];
//   favorites: Contact[] = [];
//   searchTerm: string = '';
//   private subscription: Subscription = new Subscription();


//   constructor(private contactService: ContactService, private cdr: ChangeDetectorRef ) {}

//   ngOnInit(): void {
//     this.loadContacts();
//   }

//   // Carga todos los contactos desde el servicio y actualiza las listas
//   loadContacts(): void {
//     this.contacts = this.contactService.getContacts(); // Cargar todos los contactos
//     this.updateFilteredContacts(); // Inicialmente, todos los contactos se consideran filtrados
//     this.updateFavorites(); // Actualizar la lista de favoritos
//   }

//   // Filtra los contactos según el término de búsqueda
//   filterContacts(): void {
//     if (this.searchTerm.trim()) {
//       this.filteredContacts = this.contacts.filter(contact =>
//         contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         contact.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         contact.phone.includes(this.searchTerm)
//       );
//     } else {
//       this.filteredContacts = [...this.contacts]; // Si no hay término de búsqueda, mostrar todos los contactos
//     }
//     this.updateFavorites(); // Asegurar que la lista de favoritos se actualice tras la búsqueda
//   }

//   // Se llama cuando se elimina un contacto
//   onContactDeleted(contactId: number): void {
//     // Remover el contacto de la lista de contactos principal
//     this.contacts = this.contacts.filter(contact => contact.id !== contactId);
//     this.updateFilteredContacts(); // Actualizar la lista de contactos filtrados
//     this.updateFavorites(); // Actualizar la lista de favoritos
//     this.cdr.detectChanges(); // Forzar la actualización de la vista
//   }

//   // Se llama cuando el estado de favorito cambia
//   onContactFavoriteChanged(): void {
//     console.log('Favorite state changed');
//     this.updateFavorites(); // Asegurar que la lista de favoritos esté actualizada
//     this.updateFilteredContacts(); // Asegurar que la lista de contactos filtrados esté actualizada
//     this.cdr.detectChanges(); // Forzar la actualización de la vista
//   }

//   // Actualiza la lista de contactos filtrados según el término de búsqueda
//   updateFilteredContacts(): void {
//     this.filterContacts(); // Filtrar contactos basados en el término de búsqueda actual
//   }

//   // Actualiza la lista de contactos favoritos
//   updateFavorites(): void {
//     this.favorites = this.contacts.filter(contact => contact.isFavorite);
//     console.log('Updated favorites', this.favorites);
//   }
// }



//CÓDIGOS DESPUÉS DE CONECTAR CON EL BACKEND
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Contact } from 'src/app/interfaces/contact';
// import { ContactService } from 'src/app/services/contact.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-contacts',
//   templateUrl: './contacts.component.html',
//   styleUrls: ['./contacts.component.css']
// })
// export class ContactsComponent implements OnInit, OnDestroy {
//   contacts: Contact[] = [];
//   filteredContacts: Contact[] = [];
//   favorites: Contact[] = [];
//   searchTerm: string = '';
//   private subscription: Subscription = new Subscription();

//   constructor(private contactService: ContactService) {}

//   ngOnInit(): void {
//     // Obtener la lista de contactos del backend al inicializar el componente
//     this.subscription.add(
//       this.contactService.getContacts().subscribe(
//         (contacts: Contact[]) => {
//           this.contacts = contacts;
//           this.updateFilteredContacts();
//           this.updateFavorites();
//         },
//         error => {
//           console.error('Error fetching contacts', error);
//         }
//       )
//     );
//   }

//   ngOnDestroy(): void {
//     // Desuscribirse para evitar pérdidas de memoria
//     this.subscription.unsubscribe();
//   }

//   filterContacts(): void {
//     if (this.searchTerm.trim()) {
//       this.filteredContacts = this.contacts.filter(contact =>
//         contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         (contact.email?.toLowerCase() ?? '').includes(this.searchTerm.toLowerCase()) ||
//         contact.phone.includes(this.searchTerm)
//       );
//       // Actualizar también la lista de favoritos según el término de búsqueda
//       this.favorites = this.filteredContacts.filter(contact => contact.isFavorite);
//     } else {
//       this.filteredContacts = [...this.contacts];
//       this.updateFavorites();
//     }
//   }

//   onContactDeleted(contactId: number): void {
//     // Llamar al servicio para eliminar el contacto y actualizar la lista local después de eliminarlo
//     this.subscription.add(
//       this.contactService.deleteContact(contactId).subscribe(
//         () => {
//           this.contacts = this.contacts.filter(contact => contact.id !== contactId);
//           this.updateFilteredContacts();
//           this.updateFavorites();
//         },
//         error => {
//           console.error('Error deleting contact', error);
//         }
//       )
//     );
//   }

//   updateFilteredContacts(): void {
//     this.filterContacts();
//   }

//   updateFavorites(): void {
//     this.favorites = this.filteredContacts.filter(contact => contact.isFavorite);
//     console.log('Updated favorites', this.favorites); // Log para verificar la lista actualizada de favoritos
//   }

//   toggleFavorite(contact: Contact): void {
//     const newFavoriteState = !contact.isFavorite;

//     this.subscription.add(
//       this.contactService.toggleFavorite(contact.id, newFavoriteState).subscribe(
//         () => {
//           contact.isFavorite = newFavoriteState;
//           this.updateFavorites();
//         },
//         error => {
//           console.error('Error updating favorite state', error);
//         }
//       )
//     );
//   }
// }

//Actualicé todos los usos de subscribe() para usar un observer en lugar de múltiples funciones separadas.
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Contact } from 'src/app/interfaces/contact';
// import { ContactService } from 'src/app/services/contact.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-contacts',
//   templateUrl: './contacts.component.html',
//   styleUrls: ['./contacts.component.css']
// })
// export class ContactsComponent implements OnInit, OnDestroy {
//   contacts: Contact[] = [];
//   filteredContacts: Contact[] = [];
//   favorites: Contact[] = [];
//   searchTerm: string = '';
//   private subscription: Subscription = new Subscription();

//   constructor(private contactService: ContactService) {}

//   ngOnInit(): void {
//     // Obtener la lista de contactos del backend al inicializar el componente
//     this.subscription.add(
//       this.contactService.getContacts().subscribe({
//         next: (contacts: Contact[]) => {
//           this.contacts = contacts;
//           this.updateFilteredContacts();
//           this.updateFavorites();
//         },
//         error: (err) => {
//           console.error('Error fetching contacts', err);
//         }
//       })
//     );
//   }

//   ngOnDestroy(): void {
//     // Desuscribirse para evitar pérdidas de memoria
//     this.subscription.unsubscribe();
//   }

//   filterContacts(): void {
//     if (this.searchTerm.trim()) {
//       this.filteredContacts = this.contacts.filter(contact =>
//         contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         (contact.email?.toLowerCase() ?? '').includes(this.searchTerm.toLowerCase()) ||
//         contact.phone.includes(this.searchTerm)
//       );
//       // Actualizar también la lista de favoritos según el término de búsqueda
//       this.favorites = this.filteredContacts.filter(contact => contact.isFavorite);
//     } else {
//       this.filteredContacts = [...this.contacts];
//       this.updateFavorites();
//     }
//   }

//   onContactDeleted(contactId: number): void {
//     // Llamar al servicio para eliminar el contacto y actualizar la lista local después de eliminarlo
//     this.subscription.add(
//       this.contactService.deleteContact(contactId).subscribe({
//         next: () => {
//           this.contacts = this.contacts.filter(contact => contact.id !== contactId);
//           this.updateFilteredContacts();
//           this.updateFavorites();
//         },
//         error: (err) => {
//           console.error('Error deleting contact', err);
//         }
//       })
//     );
//   }

//   updateFilteredContacts(): void {
//     this.filterContacts();
//   }

//   updateFavorites(): void {
//     this.favorites = this.filteredContacts.filter(contact => contact.isFavorite);
//     console.log('Updated favorites', this.favorites); // Log para verificar la lista actualizada de favoritos
//   }

//   toggleFavorite(contact: Contact): void {
//     const newFavoriteState = !contact.isFavorite;

//     this.subscription.add(
//       this.contactService.toggleFavorite(contact.id, newFavoriteState).subscribe({
//         next: () => {
//           contact.isFavorite = newFavoriteState;
//           this.updateFavorites();
//         },
//         error: (err) => {
//           console.error('Error updating favorite state', err);
//         }
//       })
//     );
//   }
// }

//SIN BEHAVIOR SUBJECT
// import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
// import { Contact } from 'src/app/interfaces/contact';
// import { ContactService } from 'src/app/services/contact.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-contacts',
//   templateUrl: './contacts.component.html',
//   styleUrls: ['./contacts.component.css']
// })
// export class ContactsComponent implements OnInit, OnDestroy {
//   contacts: Contact[] = [];
//   filteredContacts: Contact[] = [];
//   favorites: Contact[] = [];
//   searchTerm: string = '';
//   private subscription: Subscription = new Subscription();

//   constructor(
//     private contactService: ContactService,
//     private cdr: ChangeDetectorRef // Para detectar cambios manualmente
//       ) {}

//   ngOnInit(): void {
//     // Obtener la lista de contactos del backend al inicializar el componente
//     this.subscription.add(
//       this.contactService.getContacts().subscribe({
//         next: (contacts: Contact[]) => {
//           this.contacts = contacts;
//           console.log('Contacts fetched successfully:', this.contacts);
//           this.updateFilteredContacts();
//           this.updateFavorites();
//         },
//         error: (err) => {
//           console.error('Error fetching contacts', err);
//         }
//       })
//     );
//   }

//   ngOnDestroy(): void {
//     // Desuscribirse para evitar pérdidas de memoria
//     this.subscription.unsubscribe();
//   }

//   // Filtrar los contactos según el término de búsqueda
//   filterContacts(): void {
//     if (this.searchTerm.trim()) {
//       this.filteredContacts = this.contacts.filter(contact =>
//         contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         (contact.email?.toLowerCase() ?? '').includes(this.searchTerm.toLowerCase()) ||
//         contact.phone.includes(this.searchTerm)
//       );
//       // Actualizar también la lista de favoritos según el término de búsqueda
//       this.favorites = this.filteredContacts.filter(contact => contact.isFavorite);
//     } else {
//       this.filteredContacts = [...this.contacts];
//       this.updateFavorites();
//     }
//     console.log('Filtered contacts:', this.filteredContacts);
//   }

//   //Método llamado cuando un contacto ha sido eliminado
//   onContactDeleted(contactId: number): void {
//     console.log(`Eliminando contacto con ID: ${contactId}`);
    
//     // Llamar al servicio para eliminar el contacto y actualizar la lista local después de eliminarlo
//     this.subscription.add(
//       this.contactService.deleteContact(contactId).subscribe({
//         next: () => {
//           // Filtrar la lista de contactos eliminando el contacto con el ID correspondiente
//           this.contacts = this.contacts.filter(contact => contact.id !== contactId);
//           console.log('Lista de contactos después de eliminar:', this.contacts);
          
//           this.updateFilteredContacts(); // Actualizar la lista filtrada también
//           this.updateFavorites(); // Actualizar la lista de favoritos también

//           // Forzar la detección de cambios para reflejar inmediatamente la eliminación
//           this.cdr.detectChanges();
//         },
//         error: (err) => {
//           console.error('Error deleting contact', err);
//         }
//       })
//     );
//   }

   
  
//   onContactFavoriteChanged(): void {
//     // Actualiza la lista de favoritos después de un cambio
//     this.updateFavorites();
//     console.log('Lista de favoritos actualizada después del cambio de favorito');
//   }

//   // Actualizar la lista filtrada de contactos
//   updateFilteredContacts(): void {
//     this.filterContacts();
//   }

//   // Actualizar la lista de favoritos
//   updateFavorites(): void {
//     this.favorites = this.filteredContacts.filter(contact => contact.isFavorite);
//     console.log('Updated favorites:', this.favorites); // Log para verificar la lista actualizada de favoritos
//   }

//   // Alternar el estado de favorito del contacto
//   toggleFavorite(contact: Contact): void {
//     console.log(`Marcando como favorito el contacto con ID: ${contact.id}`);
    
//     const newFavoriteState = !contact.isFavorite;

//     this.subscription.add(
//       this.contactService.toggleFavorite(contact.id, newFavoriteState).subscribe({
//         next: () => {
//           contact.isFavorite = newFavoriteState;
//           console.log('Nuevo estado favorito:', contact.isFavorite);
//           this.updateFavorites();
//         },
//         error: (err) => {
//           console.error('Error updating favorite state', err);
//         }
//       })
//     );
//   }
// }


