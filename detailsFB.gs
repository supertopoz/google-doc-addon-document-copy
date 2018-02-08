function setData(data) {
  var email = Session.getActiveUser().getEmail()
//  Logger.log(email);
  var golbengy = email.indexOf('@')
  var id = email.slice(0,golbengy)
  var firebaseUrl = "https://ta-details.firebaseio.com/";
  var secret = "h10m2xatuRXEikMkcBqiKdxpZzHy51QmFT7e3Sc7";
  var base = FirebaseApp.getDatabaseByUrl(firebaseUrl, secret);
  //var data = {"name": "jason","phone":"0102030405060"}
  base.setData(id, data);
}


function updateData(data) {
  var email = Session.getActiveUser().getEmail()
//  Logger.log(email);
  var golbengy = email.indexOf('@')
  var id = email.slice(0,golbengy)
  var firebaseUrl = "https://ta-details.firebaseio.com/";
  var secret = "h10m2xatuRXEikMkcBqiKdxpZzHy51QmFT7e3Sc7";
  var base = FirebaseApp.getDatabaseByUrl(firebaseUrl, secret);
  //var data = {"name": "jason","phone":"0102030405060"}
  base.updateData(id, data);
}



function getData() {
  var email = Session.getActiveUser().getEmail()
  var golbengy = email.indexOf('@')
  var id = email.slice(0,golbengy)
  var firebaseUrl = "https://ta-details.firebaseio.com/";
  var secret = "h10m2xatuRXEikMkcBqiKdxpZzHy51QmFT7e3Sc7";
  var base = FirebaseApp.getDatabaseByUrl(firebaseUrl, secret);
  var data = base.getData(id, data);
  return data
}



