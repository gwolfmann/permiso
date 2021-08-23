import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { GalleriaModule } from 'primeng/galleria';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AlertComponent } from './infraest/alert.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SectorComponent } from './sector/sector.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { Per0Component } from './per0/per0.component';
import { NavigationComponent } from './navigation/navigation.component';
@NgModule({
  declarations: [
    AlertComponent,

    AppComponent,

    SectorComponent,

    UsersComponent,

    LoginComponent,

    Per0Component,

    NavigationComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

   TableModule,
   ButtonModule,
   ToastModule,
   DialogModule,
   MessagesModule,
   MessageModule,
   CalendarModule,   
   TabViewModule, 
   GalleriaModule,

   BrowserAnimationsModule,
   BsDatepickerModule.forRoot(),
   CurrencyMaskModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
