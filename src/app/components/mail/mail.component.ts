import { Component,ViewContainerRef , OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { JsonApiService } from './../../service/json-api.service';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';


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
  constructor(private jsonApiService: JsonApiService,private router: Router,private toastr: ToastsManager, vcr: ViewContainerRef) {
       this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getMails();
  }

  test()
  {
    this.jsonApiService.Success("my name is aditya")

  }

  getMails() {
  this.jsonApiService.getMails().subscribe((res) =>{
    this.allMails = res;
    console.log(this.allMails);
    this.showError = false;
  },(error:any)=>{
    this.errorMsg = error.statusText;
    this.showError = true;
  })
}

check()
{
  if(this.value==false)
  {
  this.value=true;
  this.deleteshow=false;
  // console.log(this.value);
  // console.log("heloo");
  for(let i=0;i<this.allMails.length;i++)
  {
    this.deleteidmail.push(this.allMails[i].id);
  }
  console.log("from click"+this.deleteidmail);
   }
   else
   {
   this.value=false;
   this.deleteshow=true;
   //console.log(this.value);
  // console.log("heloo");
     console.log("this is value else"+this.deleteidmail.length);
    }
}

reload()
{
  this.jsonApiService.getMails().subscribe((res) =>{
    this.value=false;
    this.allMails = res;
    console.log(this.allMails);
    this.showError = false;
  },(error:any)=>{
    this.errorMsg = error.statusText;
    this.showError = true;
  })
}


deleteitems(mailId)
{
  let itemshave;
  console.log(this.deleteidmail.length);
  for(let i=0;i<=this.deleteidmail.length;i++)
  {
    if(mailId==this.deleteidmail[i])
    {
      itemshave="true";
      let index=this.deleteidmail.indexOf(mailId);
      this.deleteidmail.splice(index, 1);
    //  this.deleteidmail.pop(this.deleteidmail[i]);
      // console.log(this.deleteidmail.length);
      // break;
    }
    else
    {
      itemshave="false";
    }
  }
  if(itemshave=="false")
  {
  this.deleteidmail.push(mailId);
  }
  if(this.deleteidmail.length==0)
  {
    console.log("length 0 hai "+this.deleteidmail.length);
    this.deleteshow=true;
    console.log(this.deleteshow);
  }else{
    console.log("length 0 nahi hai "+this.deleteidmail.length);
    this.deleteshow=false;
      console.log(this.deleteshow);
  }
 console.log(this.deleteidmail);
 }
// this is test

// delete the mails
deleteMail()
{
    console.log("length of array"+this.deleteidmail.length);
   let i;
  for (i = 0; i<this.deleteidmail.length; i++) {
  this.jsonApiService.deleteMail(this.deleteidmail[i]).subscribe(data=>{
  //  this.store=data;
        },(error:any)=>{
          console.log(error)
        })
        setTimeout(function(){
        }, 5000);
      }
  this.getMailafterdelete();

}
getMailafterdelete() {
    this.jsonApiService.getMails().subscribe((res) =>{
    this.allMails = res;
    console.log("check mails=>"+this.allMails);
   this.showError = false;
     this.jsonApiService.Success("recode is deleted")
     this.deleteidmail=[];
   },(error:any)=>{
    this.errorMsg = error._body;
    this.showError = true;
   })
  }

maildetails()
{
  //this.selectedmail=mail;
  // this.selectedmail.emit(mail);

  //this.router.navigate(['/showmail']);
}

}
