import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact.service';
import { faPhone, faEnvelope, faMapMarkerAlt, faEdit, faTrash, } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent {
  @Input() contact!: Contact;
  @Output() contactDeleted = new EventEmitter<number>();
  @Output() contactFavoriteChanged = new EventEmitter<void>();

  showDetails: boolean = false;
  showDeleteModal: boolean = false;

  faStarSolid = faStarSolid;
  faStarRegular = faStarRegular;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faMapMarkerAlt = faMapMarkerAlt;
  faEdit = faEdit;
  faTrash = faTrash;
  faWhatsapp = faWhatsapp;

  constructor(
    private router: Router,
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  // Método para alternar el estado de favorito del contacto
  toggleFavorite(): void {
    console.log('Favorite button clicked');
    const updatedFavoriteState = !this.contact.isFavorite;

    this.contactService.toggleFavorite(this.contact.id, updatedFavoriteState).subscribe({
      next: () => {
        this.contact.isFavorite = updatedFavoriteState;
        console.log('New favorite state', this.contact.isFavorite);
        this.contactFavoriteChanged.emit(); // Emitir el evento para notificar el cambio
        this.cdr.detectChanges(); // Detectar cambios para actualizar la vista
      },
      error: (err) => {
        console.error('Error updating favorite state', err);
      }
    });
  }

  // Método para editar el contacto
  onEdit(): void {
    this.router.navigate(['/contacts/edit', this.contact.id]);
  }

  // Método para confirmar y eliminar el contacto
  onDelete(): void {
    this.contactService.deleteContact(this.contact.id).subscribe({
      next: () => {
        this.contactDeleted.emit(this.contact.id); // Emitir evento para actualizar la lista
        console.log(`Contacto con ID ${this.contact.id} eliminado correctamente`);
        this.closeDeleteModal(); // Cerrar el modal después de la eliminación
      },
      error: (err) => {
        console.error('Error deleting contact', err);
      }
    });
  }

  // Métodos para manejar la apertura y cierre del modal de eliminación
  openDeleteModal(): void {
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }
  // onDelete(): void {
  //   if (confirm('Are you sure you want to delete this contact?')) {
  //     this.contactService.deleteContact(this.contact.id).subscribe({
  //       next: () => {
  //         this.contactDeleted.emit(this.contact.id); // Emitir evento para actualizar la lista
  //         console.log(`Contacto con ID ${this.contact.id} eliminado correctamente`);
  //       },
  //       error: (err) => {
  //         console.error('Error deleting contact', err);
  //       }
  //     });
  //   }
  // }

  // Método para abrir el modal de detalles
  openDetails(): void {
    this.showDetails = true;
  }

  // Método para cerrar el modal de detalles
  closeDetails(event: Event): void {
    event.stopPropagation(); // Detiene la propagación del evento para evitar reabrir el modal
    this.showDetails = false;
  }

  // closeDetails(): void {
  //   this.showDetails = false;
  // }

  // Método para llamar al contacto
  callContact(): void {
    if (this.contact.phone) {
      const phoneNumber = this.contact.phone.trim();
      const telLink = `tel:${phoneNumber}`;
      const anchor = document.createElement('a');
      anchor.href = telLink;
      anchor.click();
    } else {
      console.error('Número de teléfono no disponible');
    }
  }
  
  // callContact(): void {
  //   if (this.contact.phone) {
  //     window.location.href = `tel:${this.contact.phone}`;
  //   } else {
  //     console.error('Número de teléfono no disponible');
  //   }
    
  // }

  // Método para enviar mensaje de WhatsApp al contacto
  sendWhatsApp(): void {
    window.open(`https://wa.me/${this.contact.phone}`, '_blank');
  }

  // Método para enviar correo electrónico al contacto
  sendEmail(): void {
    window.location.href = `mailto:${this.contact.email}`;
  }

  // Método para abrir la ubicación del contacto en Google Maps
openMaps(): void {
  if (this.contact.address) {
    const encodedAddress = encodeURIComponent(this.contact.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  } else {
    console.error('La dirección no está disponible.');
  }
}

getAvatarColor(name: string): string {
  if (!name) {
    return '#cccccc'; // Color por defecto
  }

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }

  const hue = hash % 360; // Calcula un valor de tono único
  return `hsl(${hue}, 70%, 80%)`; // Colores pastel
}

}



//CÓDIGO ANTES DE CONECTAR CON EL BACKEND
// import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
// import { Router } from '@angular/router';
// import { Contact } from 'src/app/interfaces/contact';
// import { ContactService } from 'src/app/services/contact.service';

// @Component({
//   selector: 'app-contact-card',
//   templateUrl: './contact-card.component.html',
//   styleUrls: ['./contact-card.component.css']
// })
// export class ContactCardComponent {
//   @Input() contact!: Contact;
//   @Output() contactDeleted = new EventEmitter<number>();
//   @Output() contactFavoriteChanged = new EventEmitter<void>();


//   constructor(
//     private router: Router,
//     private contactService: ContactService,
//     private cdr: ChangeDetectorRef
//   ) {}

//   toggleFavorite(): void {
//     console.log('Favorite button clicked');
//     // this.contact.isFavorite = !this.contact.isFavorite;
//     console.log('New favorite state', this.contact.isFavorite);
//     this.contactService.toggleFavorite(this.contact.id);
//     this.contactFavoriteChanged.emit(); // Emitir el evento para notificar el cambio
//     this.cdr.detectChanges();
//   }

//   onEdit(): void {
//     // Navegar a la página de edición con el ID del contacto
//     this.router.navigate(['/contacts/edit', this.contact.id]);
//   }

//   onDelete(): void {
//     if (confirm('Are you sure you want to delete this contact?')) {
//       this.contactService.deleteContact(this.contact.id);
//       this.contactDeleted.emit(this.contact.id); // Emitir evento para actualizar la lista
//     }
//   }  
  
//   callContact(): void {
//     // Aquí puedes agregar la lógica para realizar una llamada telefónica.
//     console.log(`Calling ${this.contact.phone}`);
//   }

//   sendWhatsApp(): void {
//     // Aquí puedes agregar la lógica para abrir WhatsApp.
//     window.open(`https://wa.me/${this.contact.phone}`, '_blank');
//   }

//   sendEmail(): void {
//     // Aquí puedes agregar la lógica para enviar un correo electrónico.
//     window.location.href = `mailto:${this.contact.email}`;
//   }
// }


//CÓDIGO DESPUÉS DE CONECTAR CON EL BACKEND
// import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
// import { Router } from '@angular/router';
// import { Contact } from 'src/app/interfaces/contact';
// import { ContactService } from 'src/app/services/contact.service';

// @Component({
//   selector: 'app-contact-card',
//   templateUrl: './contact-card.component.html',
//   styleUrls: ['./contact-card.component.css']
// })
// export class ContactCardComponent {
//   @Input() contact!: Contact;
//   @Output() contactDeleted = new EventEmitter<number>();
//   @Output() contactFavoriteChanged = new EventEmitter<void>();

//   constructor(
//     private router: Router,
//     private contactService: ContactService,
//     private cdr: ChangeDetectorRef
//   ) {}

//   // Método para alternar el estado de favorito del contacto
//   toggleFavorite(): void {
//     console.log('Favorite button clicked');
//     const newFavoriteState = !this.contact.isFavorite;

//     this.contactService.toggleFavorite(this.contact.id, newFavoriteState).subscribe(
//       () => {
//         this.contact.isFavorite = newFavoriteState;
//         console.log('New favorite state', this.contact.isFavorite);
//         this.contactFavoriteChanged.emit(); // Emitir el evento para notificar el cambio
//         this.cdr.detectChanges(); // Detectar cambios para actualizar la vista
//       },
//       error => {
//         console.error('Error updating favorite state', error);
//       }
//     );
//   }

//   // Método para editar el contacto
//   onEdit(): void {
//     // Navegar a la página de edición con el ID del contacto
//     this.router.navigate(['/contacts/edit', this.contact.id]);
//   }

//   // Método para eliminar el contacto
//   onDelete(): void {
//     if (confirm('Are you sure you want to delete this contact?')) {
//       this.contactService.deleteContact(this.contact.id).subscribe(
//         () => {
//           this.contactDeleted.emit(this.contact.id); // Emitir evento para actualizar la lista
//         },
//         error => {
//           console.error('Error deleting contact', error);
//         }
//       );
//     }
//   }  
  
//   // Método para llamar al contacto
//   callContact(): void {
//     console.log(`Calling ${this.contact.phone}`);
//     // Aquí puedes agregar la lógica para realizar una llamada telefónica
//   }

//   // Método para enviar mensaje de WhatsApp al contacto
//   sendWhatsApp(): void {
//     window.open(`https://wa.me/${this.contact.phone}`, '_blank');
//   }

//   // Método para enviar correo electrónico al contacto
//   sendEmail(): void {
//     window.location.href = `mailto:${this.contact.email}`;
//   }
// }


// //Actualicé todos los usos de subscribe() para usar un observer en lugar de múltiples funciones separadas.
// import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
// import { Router } from '@angular/router';
// import { Contact } from 'src/app/interfaces/contact';
// import { ContactService } from 'src/app/services/contact.service';

// @Component({
//   selector: 'app-contact-card',
//   templateUrl: './contact-card.component.html',
//   styleUrls: ['./contact-card.component.css']
// })
// export class ContactCardComponent {
//   @Input() contact!: Contact;
//   @Output() contactDeleted = new EventEmitter<number>();
//   @Output() contactFavoriteChanged = new EventEmitter<void>();

//   constructor(
//     private router: Router,
//     private contactService: ContactService,
//     private cdr: ChangeDetectorRef
//   ) {}

//   // Método para alternar el estado de favorito del contacto
//   // toggleFavorite(): void {
//   //   console.log('Favorite button clicked');
//   //   const newFavoriteState = !this.contact.isFavorite;

//   //   this.contactService.toggleFavorite(this.contact.id, newFavoriteState).subscribe({
//   //     next: () => {
//   //       this.contact.isFavorite = newFavoriteState;
//   //       console.log('New favorite state', this.contact.isFavorite);
//   //       this.contactFavoriteChanged.emit(); // Emitir el evento para notificar el cambio
//   //       this.cdr.detectChanges(); // Detectar cambios para actualizar la vista
//   //     },
//   //     error: (err) => {
//   //       console.error('Error updating favorite state', err);
//   //     }
//   //   });
//   // }
   
//   toggleFavorite(): void {
//     console.log('Favorite button clicked');
    
//     // Crear un nuevo estado de favorito
//     const updatedFavoriteState = !this.contact.isFavorite;

//     // Crear el objeto actualizado con el nuevo estado de favorito
//     const updatedContact: Contact = {
//       ...this.contact,
//       isFavorite: updatedFavoriteState
//     };

//     this.contactService.toggleFavorite(updatedContact.id, updatedFavoriteState).subscribe({
//       next: () => {
//         this.contact.isFavorite = updatedFavoriteState;
//         console.log('New favorite state', this.contact.isFavorite);
//         this.contactFavoriteChanged.emit(); // Emitir el evento para notificar el cambio
//         this.cdr.detectChanges(); // Detectar cambios para actualizar la vista
//       },
//       error: (err) => {
//         console.error('Error updating favorite state', err);
//       }
//     });
//   }

//   // Método para editar el contacto
//   onEdit(): void {
//     // Navegar a la página de edición con el ID del contacto
//     this.router.navigate(['/contacts/edit', this.contact.id]);
//   }

//   // Método para eliminar el contacto
//   // onDelete(): void {
//   //   if (confirm('Are you sure you want to delete this contact?')) {
//   //     this.contactService.deleteContact(this.contact.id).subscribe({
//   //       next: () => {
//   //         this.contactDeleted.emit(this.contact.id); // Emitir evento para actualizar la lista
//   //       },
//   //       error: (err) => {
//   //         console.error('Error deleting contact', err);
//   //       }
//   //     });
//   //   }
//   // }

//   onDelete(): void {
//     if (confirm('Are you sure you want to delete this contact?')) {
//       // Crear la variable para el ID del contacto
//       const contactId = this.contact.id;

//       this.contactService.deleteContact(contactId).subscribe({
//         next: () => {
//           this.contactDeleted.emit(contactId); // Emitir evento para actualizar la lista
//           console.log(`Contacto con ID ${contactId} eliminado correctamente`);
//         },
//         error: (err) => {
//           console.error('Error deleting contact', err);
//         }
//       });
//     }
//   }

//   // Método para llamar al contacto
//   callContact(): void {
//     console.log(`Calling ${this.contact.phone}`);
//     // Aquí puedes agregar la lógica para realizar una llamada telefónica
//   }

//   // Método para enviar mensaje de WhatsApp al contacto
//   sendWhatsApp(): void {
//     window.open(`https://wa.me/${this.contact.phone}`, '_blank');
//   }

//   // Método para enviar correo electrónico al contacto
//   sendEmail(): void {
//     window.location.href = `mailto:${this.contact.email}`;
//   }
// }
