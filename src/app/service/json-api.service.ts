import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig }from '../config/config.constant';
declare var toastr:any
@Injectable()
export class JsonApiService {


  private headers = new Headers({ 'Content-Type': 'application/json'});
  constructor(private http: Http) { }

Success(title:string,meassage?:string)
{
  toastr.success(title,meassage);
}
// ________________________________________________________________________________________________
addNew(usercreds) {
  var headers = new Headers();
        var creds = 'name=' + usercreds.username + '&password=' + usercreds.password;
        var emailid = 'name=' + usercreds.username;

        headers.append('Content-Type', 'application/X-www-form-urlencoded');

        this.http.post('http://localhost:3333/adduser', creds, {headers: headers}).subscribe((data) => {
            if(data.json().success) {
              console.log('adding user');
            //     this.http.post('http://localhost:3333/sendmail', emailid, {headers: headers}).subscribe((data) => {
            // if(data.json().success) {
            //   console.log('Sent successfully');
             }
         }
       )
       }
  

// ________________________________________________________________________________________________
  getMails(){
    // return this.http.get(AppConfig.apiUrl+'/mails')
    // .map(data => data.json(),
    //   (error: any)=>this.handleError(error));

    const requestHeaders = new Headers();
  requestHeaders.append('Content-Type', 'application/json');

  const options = new RequestOptions({ headers: requestHeaders });
  const myURL = 'https://mail.google.com/mail/#inbox/bPYJESV3hxUKzpWQvvsWdt2o';

  return this.http.get(myURL, options)
  .map((res: Response) => res.json(),
     (error: any)=>this.handleError(error));

  }


// delete by id
  deleteMail(mailId){
  //  console.log(mailId[i]);
   return this.http.delete(AppConfig.apiUrl+'/mails/'+mailId, {headers: this.headers})
    .map(data => data.json(),
   (error: any)=>this.handleError(error));

   }

   // getMails(){
   //     return this.http.get(AppConfig.apiUrl+'/mails', {headers: this.headers})
   //     .map(data => data.json(),
   //    (error: any)=>this.handleError(error));
   //    }
  // Handle err

  private handleError(error: Response){
    return Observable.throw(error.statusText);
  }

}
