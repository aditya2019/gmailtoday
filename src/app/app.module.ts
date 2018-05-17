import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MailComponent } from './components/mail/mail.component';
import { HeaderComponent } from './components/header/header.component';
import { ShowmailComponent } from './components/showmail/showmail.component';
import { AppRoutingModule } from './/app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { GmailapiComponent } from './components/gmailapi/gmailapi.component';

@NgModule({
  declarations: [
    AppComponent,
    MailComponent,
    HeaderComponent,
    ShowmailComponent,
    GmailapiComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
