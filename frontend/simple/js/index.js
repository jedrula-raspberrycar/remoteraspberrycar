//var serverUrl = 'http://192.165.0.150:3000';
var serverUrl = 'http://localhost:3000';
$(document).ready(() => {
  $("button").click(function(){
    var endpoint = $(this).data('endpoint');
    $.ajax({
      url: serverUrl + '/' + endpoint,
      type: 'POST',
      data: {
        dummy: true
      }
    });
  });
})
