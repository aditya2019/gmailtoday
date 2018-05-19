import { Component, OnInit } from '@angular/core';
import { JsonApiService } from './../../service/json-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sendmail',
  templateUrl: './sendmail.component.html',
  styleUrls: ['./sendmail.component.css'],
  providers: [ JsonApiService ]
})
export class SendmailComponent implements OnInit {

  constructor(private jsonApiService: JsonApiService){}

  ngOnInit() {
  }

  newUser= {
    username: '',
    password: ''
  }

  addUser() {
  this.jsonApiService.addNew(this.newUser);
  }
}
