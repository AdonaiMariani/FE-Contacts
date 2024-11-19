import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { AddEditContactComponent } from '../add-edit-contact/add-edit-contact.component';

const routes: Routes = [
  {
    path: '', component: ContactsComponent,  
  },
  {
     path: 'add', component: AddEditContactComponent 
  },
  {
     path: 'edit/:id', component: AddEditContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
