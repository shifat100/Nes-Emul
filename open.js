
navigator.mozSetMessageHandler('activity', function (activityReq) {
   app.innerHTML  = '<font color="white"><br>Please Wait...</font>';
    
  setTimeout(function() {machine(activityReq.source.data.blob)}, 3000);
});