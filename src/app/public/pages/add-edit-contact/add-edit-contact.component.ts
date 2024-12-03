import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/interfaces/contact';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['../../../shared/styles/login-register-styles.css']
})
export class AddEditContactComponent implements OnInit {
  contactForm!: FormGroup;
  contactId: number | null = null;
  formSubmitAttempt: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Inicializar el formulario con validadores
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
      email: ['', [Validators.email]], // Opcional, pero si se completa debe ser un email válido
      address: [''], // Opcional
      isFavorite: [false] // Inicializar como no favorito
    });

    // Obtener el ID del contacto desde los parámetros de la ruta
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.contactId = +id;
          // Obtener los datos del contacto del backend y actualizar el formulario
          this.contactService.getContactById(this.contactId).subscribe({
            next: (contact: Contact) => {
              this.contactForm.patchValue(contact);
            },
            error: (err) => {
              console.error('Error fetching contact', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Error getting route params', err);
      }
    });
  }

  onSubmit(): void {
    this.formSubmitAttempt = true;

    if (this.contactForm.valid) {
      console.log('Datos enviados:', this.contactForm.value); // Verifica los datos

      if (this.contactId) {
        // Editar contacto existente
        const updatedContact: Contact = {
          id: this.contactId, // Necesitamos el ID del contacto para editarlo
          ...this.contactForm.value
        };
        this.contactService.updateContact(this.contactId, updatedContact).subscribe({
          next: () => {
            console.log('Contact updated successfully');
            this.router.navigate(['/contacts']);
          },
          error: (err) => {
            console.error('Error updating contact', err);
          }
        });
      } else {
        // Agregar un nuevo contacto
        const newContact = {
          ...this.contactForm.value
        } as Contact; // Convertimos para que coincida con el tipo Contact (id será opcional aquí)

        this.contactService.addContact(newContact).subscribe({
          next: () => {
            console.log('Contact added successfully');
            this.router.navigate(['/contacts']);
          },
          error: (err) => {
            console.error('Error adding contact', err);
          }
        });
      }
    } else {
      console.warn('Form is invalid. Please correct the errors before submitting.');
    }
  }

  goBack(): void {
    this.location.back();
  }

}

     
   




//EN ESTE CÓDIGO NO FUNCIONA EL EDIT
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ContactService } from 'src/app/services/contact.service';
// import { Contact } from 'src/app/interfaces/contact';

// @Component({
//   selector: 'app-add-edit-contact',
//   templateUrl: './add-edit-contact.component.html',
//   styleUrls: ['../../../shared/styles/login-register-styles.css']
// })
// export class AddEditContactComponent implements OnInit {
//   contactForm!: FormGroup;
//   contactId: number | null = null;
//   formSubmitAttempt: boolean = false;

//   constructor(
//     private fb: FormBuilder,
//     private contactService: ContactService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     // Inicializar el formulario con validadores
//     this.contactForm = this.fb.group({
//       name: ['', Validators.required],
//       phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]],
//       email: ['', [Validators.email]], // Opcional, pero si se completa debe ser un email válido
//       address: [''], // Opcional
//       isFavorite: [false] // Inicializar como no favorito
//     });

//     // Obtener el ID del contacto desde los parámetros de la ruta
//     this.route.paramMap.subscribe({
//       next: (params) => {
//         const id = params.get('id');
//         if (id) {
//           this.contactId = +id;
//           // Obtener los datos del contacto del backend y actualizar el formulario
//           this.contactService.getContactById(this.contactId).subscribe({
//             next: (contact: Contact) => {
//               this.contactForm.patchValue(contact);
//             },
//             error: (err) => {
//               console.error('Error fetching contact', err);
//             }
//           });
//         }
//       },
//       error: (err) => {
//         console.error('Error getting route params', err);
//       }
//     });
//   }

//   onSubmit(): void {
//     this.formSubmitAttempt = true;

//     if (this.contactForm.valid) {
//       console.log('Datos enviados:', this.contactForm.value); // Verifica los datos

//       if (this.contactId) {
//         // Editar contacto existente
//         this.contactService.updateContact(this.contactId, this.contactForm.value).subscribe({
//           next: () => {
//             console.log('Contact updated successfully');
//             this.router.navigate(['/contacts']);
//           },
//           error: (err) => {
//             console.error('Error updating contact', err);
//           }
//         });
//       } else {
//         // Agregar un nuevo contacto
//         this.contactService.addContact(this.contactForm.value).subscribe({
//           next: () => {
//             console.log('Contact added successfully');
//             this.router.navigate(['/contacts']);
//           },
//           error: (err) => {
//             console.error('Error adding contact', err);
//           }
//         });
//       }
//     } else {
//       console.warn('Form is invalid. Please correct the errors before submitting.');
//     }
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ContactService } from 'src/app/services/contact.service';
// import { Contact } from 'src/app/interfaces/contact';

// @Component({
//   selector: 'app-add-edit-contact',
//   templateUrl: './add-edit-contact.component.html',
//   styleUrls: ['../../../shared/styles/login-register-styles.css']
// })
// export class AddEditContactComponent implements OnInit {
//   contactForm!: FormGroup;
//   contactId: number | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private contactService: ContactService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     // Inicializar el formulario con validadores
//     this.contactForm = this.fb.group({
//       name: ['', Validators.required],
//       phone: ['', Validators.required],
//       email: [''], // Opcional
//       address: [''], // Opcional
//       isFavorite: [false] // Inicializar como no favorito, solo se usará en edición
//     });

//     // Obtener el ID del contacto desde los parámetros de la ruta
//     this.route.paramMap.subscribe({
//       next: (params) => {
//         const id = params.get('id');
//         if (id) {
//           this.contactId = +id;
//           // Obtener los datos del contacto del backend y actualizar el formulario
//           this.contactService.getContactById(this.contactId).subscribe({
//             next: (contact: Contact) => {
//               this.contactForm.patchValue(contact);
//             },
//             error: (err) => {
//               console.error('Error fetching contact', err);
//             }
//           });
//         }
//       },
//       error: (err) => {
//         console.error('Error getting route params', err);
//       }
//     });
//   }

//   onSubmit(): void {
//     if (this.contactForm.valid) {
//       const contact: Contact = this.contactForm.value;
//       if (this.contactId) {
//         // Actualizar contacto existente
//         this.contactService.updateContact(this.contactId, contact).subscribe({
//           next: () => {
//             this.router.navigate(['/contacts']);
//           },
//           error: (err) => {
//             console.error('Error updating contact', err);
//           }
//         });
//       } else {
//         // Agregar nuevo contacto (sin opción para favorito)
//         delete contact.isFavorite; // Remover el campo "isFavorite" ya que no se usa en la creación
//         this.contactService.addContact(contact).subscribe({
//           next: () => {
//             this.router.navigate(['/contacts']);
//           },
//           error: (err) => {
//             console.error('Error adding contact', err);
//           }
//         });
//       }
//     }
//   }
// }


// //Actualicé todos los usos de subscribe() para usar un observer en lugar de múltiples funciones separadas.
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ContactService } from 'src/app/services/contact.service';
// import { Contact } from 'src/app/interfaces/contact';

// @Component({
//   selector: 'app-add-edit-contact',
//   templateUrl: './add-edit-contact.component.html',
//   styleUrls: ['./add-edit-contact.component.css']
// })
// export class AddEditContactComponent implements OnInit {
//   contactForm!: FormGroup;
//   contactId: number | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private contactService: ContactService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     // Inicializar el formulario con validadores
//     this.contactForm = this.fb.group({
//       name: ['', Validators.required],
//       phone: ['', Validators.required],
//       email: [''], // Opcional
//       address: [''], // Opcional
//       isFavorite: [false] // Inicializar como no favorito
//     });

//     // Obtener el ID del contacto desde los parámetros de la ruta
//     this.route.paramMap.subscribe({
//       next: (params) => {
//         const id = params.get('id');
//         if (id) {
//           this.contactId = +id;
//           // Obtener los datos del contacto del backend y actualizar el formulario
//           this.contactService.getContactById(this.contactId).subscribe({
//             next: (contact: Contact) => {
//               this.contactForm.patchValue(contact);
//             },
//             error: (err) => {
//               console.error('Error fetching contact', err);
//             }
//           });
//         }
//       },
//       error: (err) => {
//         console.error('Error getting route params', err);
//       }
//     });
//   }


//CÓDIGO ANTES DE CONECTAR CON EL BACKEND
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ContactService } from 'src/app/services/contact.service';

// @Component({
//   selector: 'app-add-edit-contact',
//   templateUrl: './add-edit-contact.component.html',
//   styleUrls: ['./add-edit-contact.component.css']
// })
// export class AddEditContactComponent implements OnInit {
//   contactForm!: FormGroup;
//   contactId: number | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private contactService: ContactService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.contactForm = this.fb.group({
//       name: ['', Validators.required],
//       phone: ['', Validators.required],
//       email: [''], //optional
//       address: [''], //optional
//       isFavorite: [false]
//     });
//     this.route.paramMap.subscribe(params => {
//       const id = params.get('id');
//       if (id) {
//         this.contactId = +id;
//         const contact = this.contactService.getContactById(this.contactId);
//         if (contact) {
//           this.contactForm.patchValue(contact);
//         }
//       }
//     });

//   }

//   onSubmit(): void {
//     if (this.contactForm.valid) {
//       if (this.contactId !== null) {
//         // Editar Contacto
//         this.contactService.updateContact(this.contactId, this.contactForm.value);
//       } else {
//         // Agregar Contacto
//       this.contactService.addContact(this.contactForm.value);
//       // Navegar a la lista de contactos después de guardar
//     }
//     this.router.navigate(['/contacts']);
//     }
//   }
// }


//CÓDIGO DESPUÉS DE CONECTAR CON EL BACKEND
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ContactService } from 'src/app/services/contact.service';
// import { Contact } from 'src/app/interfaces/contact';

// @Component({
//   selector: 'app-add-edit-contact',
//   templateUrl: './add-edit-contact.component.html',
//   styleUrls: ['./add-edit-contact.component.css']
// })
// export class AddEditContactComponent implements OnInit {
//   contactForm!: FormGroup;
//   contactId: number | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private contactService: ContactService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     // Inicializar el formulario con validadores
//     this.contactForm = this.fb.group({
//       name: ['', Validators.required],
//       phone: ['', Validators.required],
//       email: [''], // Opcional
//       address: [''], // Opcional
//       isFavorite: [false] // Inicializar como no favorito
//     });

//     // Obtener el ID del contacto desde los parámetros de la ruta
//     this.route.paramMap.subscribe(params => {
//       const id = params.get('id');
//       if (id) {
//         this.contactId = +id;
//         // Obtener los datos del contacto del backend y actualizar el formulario
//         this.contactService.getContactById(this.contactId).subscribe(
//           (contact: Contact) => {
//             this.contactForm.patchValue(contact);
//           },
//           error => {
//             console.error('Error fetching contact', error);
//           }
//         );
//       }
//     });
//   }

//   onSubmit(): void {
//     if (this.contactForm.valid) {
//       if (this.contactId !== null) {
//         // Editar Contacto
//         this.contactService.updateContact(this.contactId, this.contactForm.value).subscribe(
//           () => {
//             console.log('Contact updated successfully');
//             // Navegar a la lista de contactos después de guardar
//             this.router.navigate(['/contacts']);
//           },
//           error => {
//             console.error('Error updating contact', error);
//           }
//         );
//       } else {
//         // Agregar Contacto
//         this.contactService.addContact(this.contactForm.value).subscribe(
//           (newContact: Contact) => {
//             console.log('Contact added successfully', newContact);
//             // Navegar a la lista de contactos después de guardar
//             this.router.navigate(['/contacts']);
//           },
//           error => {
//             console.error('Error adding contact', error);
//           }
//         );
//       }
//     }
//   }
// }



  // onSubmit(): void {
  //   if (this.contactForm.valid) {
  //     if (this.contactId !== null) {
        
  //       // Editar Contacto
  //       console.log('Datos enviados para la actualización:', this.contactForm.value);

  //       this.contactService.updateContact(this.contactId, this.contactForm.value).subscribe({
  //         next: () => {
  //           console.log('Contact updated successfully');
  //           // Navegar a la lista de contactos después de guardar
  //           this.router.navigate(['/contacts']);
  //         },
  //         error: (err) => {
  //           console.error('Error updating contact', err);
  //         }
  //       });
  //     } else {
  //       // Agregar Contacto
  //       this.contactService.addContact(this.contactForm.value).subscribe({
  //         next: (newContact: Contact) => {
  //           console.log('Contact added successfully', newContact);
  //           // Navegar a la lista de contactos después de guardar
  //           this.router.navigate(['/contacts']);
  //         },
  //         error: (err) => {
  //           console.error('Error adding contact', err);
  //         }
  //       });
  //     }
  //   }
  // }

//   onSubmit(): void {
//     if (this.contactForm.valid) {
//       if (this.contactId !== null) {
//         // Crear un objeto actualizado con el ID incluido
//         const updatedContact: Contact = {
//           id: this.contactId, // Incluir el ID del contacto
//           ...this.contactForm.value
//         };
  
//         console.log('Datos enviados para la actualización:', updatedContact);
  
//         // Usar updatedContact en lugar de this.contactForm.value
//         this.contactService.updateContact(this.contactId, updatedContact).subscribe({
//           next: () => {
//             console.log('Contact updated successfully');
//             // Navegar a la lista de contactos después de guardar
//             this.router.navigate(['/contacts']);
//           },
//           error: (err) => {
//             console.error('Error updating contact', err);
//           }
//         });
//       } else {
//         // Agregar Contacto
//         this.contactService.addContact(this.contactForm.value).subscribe({
//           next: (newContact: Contact) => {
//             console.log('Contact added successfully', newContact);
//             // Navegar a la lista de contactos después de guardar
//             this.router.navigate(['/contacts']);
//           },
//           error: (err) => {
//             console.error('Error adding contact', err);
//           }
//         });
//       }
//     }
//   }
  
// }
