handleClientLoad() {
  gapi.load('client:auth2', initClient);
}


initClient() {
  gapi.client.init({
    discoveryDocs: this.DISCOVERY_DOCS,
    clientId: this.CLIENT_ID,
    scope: this.SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}


updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';

    this.listMessages('me', 5, function(result) {
      console.log("+++++++++++++++++++++");

      console.log(result);
      console .log("_______________________")

for(var i=1;i<=8;i++)
{
      this.getMessage('me', result[i].id, function(msg) {

         var fruits = [];
          console.log(msg.payload.headers.length);
         for(var t=0;t<msg.payload.headers.length;t++)
         {

         if(msg.payload.headers[t].name=='Subject')
         {
         console.log(msg.payload.headers[t].value);
         fruits.push(msg.payload.headers[t].value);
       }

       if(msg.payload.headers[t].name=='Date')
       {
       console.log(msg.payload.headers[t].value);
     }
     }

     for(var y=0;y<fruits.length;y++)
     {
       console.log("helo"+ fruits[y]);
     }


//document.getElementById("demo").innerHTML = fruits;


      })
    }
    });
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}




getMessage(userId, messageId, callback) {
var request = gapi.client.gmail.users.messages.get({
'userId': userId,
'id': messageId
});
request.execute(callback);
}

handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}


appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
};


listLabels() {
  gapi.client.gmail.users.labels.list({
    'userId': 'me'
  }).then(function(response) {
    var labels = response.result.labels;
    this.appendPre('Labels:');

    if (labels && labels.length > 0) {
      for (i = 0; i < labels.length; i++) {
        var label = labels[i];
        this.appendPre(label.name)
      }
    } else {
      this.appendPre('No Labels found.');
    }
  });
}



// function getMessages () {
//
// }
//

listMessages(userId, query, callback) {
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
}
