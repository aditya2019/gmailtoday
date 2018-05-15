import { NgModule } from '@angular/core';
import { CommonModule,APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { MailComponent } from './components/mail/mail.component';
import { ShowmailComponent } from './components/showmail/showmail.component';

const routes :Routes = [
{path: '', redirectTo:'/mail',pathMatch:'full'},
{path: 'mail', component:MailComponent},
{path: 'showmail', component:ShowmailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  CommonModule
  ],
  exports:[RouterModule],
  declarations: [],
  providers:[{provide: APP_BASE_HREF, useValue : '/' }]
})
export class AppRoutingModule { }
