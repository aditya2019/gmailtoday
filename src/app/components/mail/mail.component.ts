import { Component,ViewContainerRef , OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { JsonApiService } from './../../service/json-api.service';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';
import {Injectable} from "@angular/core";
declare var gapi;

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css'],
  providers: [ JsonApiService ]
})
export class MailComponent implements OnInit {

    public allMails : any =[];
  // public errorMsg ='';
	// public showError : boolean = false;
  // public value : boolean = false;
  // public deleteidmail = [];
  // public deleteshow : boolean = true;
  // public selectedmail : any=[];
  // public store : any=[];


public  CLIENT_ID = '368199083376-bsph79es2nam7f65o45r5680olud6kqr.apps.googleusercontent.com';
public  DISCOVERY_DOCS = 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest';
public  SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

//,private toastr: ToastsManager, vcr: ViewContainerRef
//  constructor(private jsonApiService: JsonApiService,private router: Router){}
// this.toastr.setRootViewContainerRef(vcr);


   ngOnInit() {
  //   //this.getMails();
   //this.handleClientLoad();
  }


// start implementing gmail api on angular

//  handleClientLoad() {
//   gapi.load('client:auth2', this.initClient);
//    console.log("this is handlerClientLoad section");
// }
/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
// initClient =()=> {
// console.log("HOLAAAAAAAAAAAA");
//   gapi.client.init({
//     discoveryDocs: this.DISCOVERY_DOCS,
//     clientId: this.CLIENT_ID,
//     scope: this.SCOPES
//   }).then(function () {
//     console.log("uuuuuuuuuuuuuuuuuuuu");
//     // Listen for sign-in state changes.
//     gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
//     // Handle the initial sign-in state.
//     this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//     // authorizeButton.onclick = handleAuthClick;
//     // signoutButton.onclick = handleSignoutClick;
//   });
// };
/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
updateSigninStatus = () => {

    // authorizeButton.style.display = 'none';
    // signoutButton.style.display = 'block';

    //listLabels();
    this.listMessages('me', 3 ,(result)=> {
      console.log("+++++++++++++++++++++");
      // get all message as a list formate
      console.log(result);
    //  console.log("this is result"+JSON.stringify(result));
      // this.metest();
      //   this.getMessage('javajiadityapal@gmial.com', result[1].id, function(msg) {
      //   console.log("this is msg"+msg);
      // })

      result.forEach((element)=> {
console.log(typeof this.allMails)
        this.allMails.push(element);
        console.log("aditya" + this.allMails[element]);
      });


    // result.map(x => this.allMails.push(x));
      console .log("_______________________")
   //   console.log(result[1].id);

    });
  //console.log()
  console.log("saini bhai");
  console.log("all mails "+ this.allMails);
  //   this.getMessage('me', thiresult[1].id, function(msg) {
  //   console.log("this is msg"+msg);
  // })

};

metest()
{
  console.log("this is now me value here now ");
}

getMessage = (userId, messageId, callback) => {

  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
var request = gapi.client.gmail.users.messages.get({
'userId': userId,
'id': messageId
});
request.execute(callback);
};
/**
 *  Sign in the user upon button click.
 */
handleAuthClick(event) {
  console.log("hello");

  gapi.auth2.getAuthInstance().signIn();
  console.log(gapi);

};
/**
 *  Sign out the user upon button click.
 */
handleSignoutClick = (event) => {
  gapi.auth2.getAuthInstance().signOut();
};

appendPre = (message) =>{
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
};


listLabels = () => {
  gapi.client.gmail.users.labels.list({
    'userId': 'me'
  }).then(function(response) {
    var labels = response.result.labels;
    this.appendPre('Labels:');
    if (labels && labels.length > 0) {
      for (var i = 0; i < labels.length; i++) {
        var label = labels[i];
        this.appendPre(label.name)
      }
    } else {
      this.appendPre('No Labels found.');
    }
  });
};
// to get the messages here

listMessages = (userId, query, callback) => {
var getPageOfMessages = function(request, result) {
request.execute(function(resp) {
 result = result.concat(resp.messages);
 var nextPageToken = resp.nextPageToken;
 if (nextPageToken) {
   request = gapi.client.gmail.users.messages.list({
     'userId': userId,
     'pageToken': nextPageToken,
     'q': query
   });
   getPageOfMessages(request, result);
 } else {
   callback(result);
 }
});
};
var initialRequest = gapi.client.gmail.users.messages.list({
'userId': userId,
'q': query
});
getPageOfMessages(initialRequest, []);
};

// end of implementing gmail api on angular

}
