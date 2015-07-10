/**
 * Created by md761 on 6/17/15.
 */

/*
   * use Parse.Analytics to track activities
   * use Parse.Users to implement auth system
   * use Parse.FacebookUtils to implement auth with facebook
   * use template engine
    */

// ToDo: move these to conf json file
var parseApplicationID = 'B4kTY895vyzs6l1eUoCt7d95BhypK5HqOmFW1RWL';
var parseJavaScriptKey = 'PbFfn9EAgGmFkp9DUGX7f6HPHhTztouaqYjblbAG';
var parseRESTKey = '4gEHsNc7clOCanAdpO7EDDKvbZJeQqU6Ehym6qjt';

function clickSendMessage() {
  var username = $('#new-message-form input[name=username]').val();
  var message = $('#new-message-form textarea[name=message]').val();

  if (!username.length || !message.length) {
    return;
  }

  $.ajax({
    url: 'https://api.parse.com/1/classes/MessageBoard',
    headers: {
      'X-Parse-Application-Id': parseApplicationID,
      'X-Parse-REST-API-Key': parseRESTKey
    },
    contentType: 'application/json', dataType: 'json',
    processData: false,
    data: JSON.stringify({
      'username': username,
      'message': message
    }),
    type: 'POST',
    success: function() {
      console.log('sent');
      updateMessages();
    },
    error: function() { console.log('error');
    }
  });


  console.log(username, 'username');
}

function updateMessages() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/MessageBoard',
    headers: {
      'X-Parse-Application-Id': parseApplicationID,
      'X-Parse-REST-API-Key': parseRESTKey
    },
    contentType: 'application/json',
    dataType: 'json',
    type: 'GET',
    success: function (data) {
      console.log('get messages success');
      console.log(data);

      if (data.results.length) {
        updateView(data.results);
      }

    },
    error: function () {
      console.log('Error while retieving the messages.');
    }
  });
}

function updateView(messages) {
  var messagesElement = $('#messages');
  messagesElement.html('');
  $.each(messages, function(index, message){
    var messageElement = $('<div class="row message"><div class="col-md-2 username">' + message.username + '</div>' +
      '<div class="col-md-6 message">' + message.message + '</div></div>');
    messagesElement.append(messageElement);
  });

}

function init() {
  updateMessages();
  $('#send-message').click(clickSendMessage);
}

$(document).ready(function(){
  Parse.initialize(parseApplicationID, parseJavaScriptKey);
  init();

});
 
 
