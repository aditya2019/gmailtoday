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
