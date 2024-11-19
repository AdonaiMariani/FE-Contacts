import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './public/components/navbar/navbar.component';
import { AddEditContactComponent } from './public/pages/add-edit-contact/add-edit-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './public/pages/login/login.component';
import { RegisterComponent } from './public/pages/register/register.component';
//import { ContactCardComponent } from './public/components/contact-card/contact-card.component';
//import { AuthInterceptor } from './auth.interceptor';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddEditContactComponent,
    LoginComponent,
    RegisterComponent,
    //ContactCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
