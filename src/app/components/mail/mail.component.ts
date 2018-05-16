import { Component,ViewContainerRef , OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { JsonApiService } from './../../service/json-api.service';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';
import {Injectable} from "@angular/core";

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css'],
  providers: [ JsonApiService ]
})
export class MailComponent implements OnInit {
  // @Output()
  // selectedmail : EventEmitter<any> = new EventEmitter();



   public allMails : any =[];
   public errorMsg ='';
	public showError : boolean = false;
  public value : boolean = false;
//  public deleteidmail : any =[];
  public deleteidmail = [];
  public deleteshow : boolean = true;
  public selectedmail : any=[];

  public store : any=[];

  public CLIENT_ID = '946368856728-jcaj83g48blol6s7km57c3e0a75d9b88.apps.googleusercontent.com';
    public SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];




  constructor(private jsonApiService: JsonApiService,private router: Router,private toastr: ToastsManager, vcr: ViewContainerRef) {
       this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    //this.getMails();
  }

  checkAuthAuto = () => {
      gapi.auth.authorize(
          {
              'client_id': this.CLIENT_ID,
              'scope': this.SCOPES.join(' '),
              'immediate': true
          }, this.handleAuthResult);
  };

  checkAuthManual = () => {
      gapi.auth.authorize(
          {
              'client_id': this.CLIENT_ID,
              'scope': this.SCOPES.join(' '),
              'immediate': false
          }, this.handleAuthResult);
      return false;
  };


  handleAuthResult = (authResult) => {
      var authorizeDiv = document.getElementById('authorize-div');

      if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          this.loadGmailApi();
      } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
      }
  };

  loadGmailApi = () => {
      gapi.client.load('gmail', 'v1', this.listLabels);
  };

  listLabels = () => {
      var request = gapi.client.gmail.users.labels.list({
          'userId': 'me'
      });
      var self = this;

      request.execute(function(resp) {
          var labels = resp.labels;
          self.appendPre('Labels:');

          if (labels && labels.length > 0) {
              for (var i = 0; i < labels.length; i++) {
                  var label = labels[i];
                  self.appendPre(label.name)
              }
          } else {
              self.appendPre('No Labels found.');
          }
      });
  };

  appendPre = (message) => {
      var pre = document.getElementById('output');
      var textContent = document.createTextNode(message + '\n');
      pre.appendChild(textContent);
  }





//   test()
//   {
//     this.jsonApiService.Success("my name is aditya")
//
//   }
//
//   getMails() {
//   this.jsonApiService.getMails()
//   .subscribe((res) =>{
//     this.allMails = res;
//     console.log("this is me now "+ this.allMails);
//     this.showError = false;
//   },(error:any)=>{
//     this.errorMsg = error.statusText;
//     this.showError = true;
//   })
//
// }
//
// check()
// {
//   if(this.value==false)
//   {
//   this.value=true;
//   this.deleteshow=false;
//   // console.log(this.value);
//   // console.log("heloo");
//   for(let i=0;i<this.allMails.length;i++)
//   {
//     this.deleteidmail.push(this.allMails[i].id);
//   }
//   console.log("from click"+this.deleteidmail);
//    }
//    else
//    {
//    this.value=false;
//    this.deleteshow=true;
//    //console.log(this.value);
//   // console.log("heloo");
//      console.log("this is value else"+this.deleteidmail.length);
//     }
// }
//
// reload()
// {
//   this.jsonApiService.getMails().subscribe((res) =>{
//     this.value=false;
//     this.allMails = res;
//     console.log(this.allMails);
//     this.showError = false;
//   },(error:any)=>{
//     this.errorMsg = error.statusText;
//     this.showError = true;
//   })
// }
//
//
// deleteitems(mailId)
// {
//   let itemshave;
//   console.log(this.deleteidmail.length);
//   for(let i=0;i<=this.deleteidmail.length;i++)
//   {
//     if(mailId==this.deleteidmail[i])
//     {
//       itemshave="true";
//       let index=this.deleteidmail.indexOf(mailId);
//       this.deleteidmail.splice(index, 1);
//     //  this.deleteidmail.pop(this.deleteidmail[i]);
//       // console.log(this.deleteidmail.length);
//       // break;
//     }
//     else
//     {
//       itemshave="false";
//     }
//   }
//   if(itemshave=="false")
//   {
//   this.deleteidmail.push(mailId);
//   }
//   if(this.deleteidmail.length==0)
//   {
//     console.log("length 0 hai "+this.deleteidmail.length);
//     this.deleteshow=true;
//     console.log(this.deleteshow);
//   }else{
//     console.log("length 0 nahi hai "+this.deleteidmail.length);
//     this.deleteshow=false;
//       console.log(this.deleteshow);
//   }
//  console.log(this.deleteidmail);
//  }
// // this is test
//
// // delete the mails
// deleteMail()
// {
//     console.log("length of array"+this.deleteidmail.length);
//    let i;
//   for (i = 0; i<this.deleteidmail.length; i++) {
//   this.jsonApiService.deleteMail(this.deleteidmail[i]).subscribe(data=>{
//   //  this.store=data;
//         },(error:any)=>{
//           console.log(error)
//         })
//         setTimeout(function(){
//         }, 5000);
//       }
//   this.getMailafterdelete();
//
// }
// getMailafterdelete() {
//     this.jsonApiService.getMails().subscribe((res) =>{
//     this.allMails = res;
//     console.log("check mails=>"+this.allMails);
//    this.showError = false;
//      this.jsonApiService.Success("recode is deleted")
//      this.deleteidmail=[];
//    },(error:any)=>{
//     this.errorMsg = error._body;
//     this.showError = true;
//    })
//   }

// maildetails()
// {
//   //this.selectedmail=mail;
//   // this.selectedmail.emit(mail);
//
//   //this.router.navigate(['/showmail']);
// }

}
