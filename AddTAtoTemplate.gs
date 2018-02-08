function showDialog2() {
  var html = HtmlService.createHtmlOutputFromFile('templateDetails')
      .setWidth(400)
      .setHeight(550);
  DocumentApp.getUi() // Or DocumentApp or FormApp.
      .showModalDialog(html, 'Setup Template Details');
}



function updateData(id, data) {
  var firebaseUrl = "https://ta-details.firebaseio.com/";
  var secret = "h10m2xatuRXEikMkcBqiKdxpZzHy51QmFT7e3Sc7";
  var base = FirebaseApp.getDatabaseByUrl(firebaseUrl, secret);
  var value = {};
  value.value = data
  base.setData(id, value);
}

function getFbData() {
  var id = DocumentApp.getActiveDocument().getId();
  var firebaseUrl = "https://ta-details.firebaseio.com/"+id;
  var secret = "h10m2xatuRXEikMkcBqiKdxpZzHy51QmFT7e3Sc7";
  var base = FirebaseApp.getDatabaseByUrl(firebaseUrl, secret);
  var data = base.getData('/value');
  return data;
}

function sendData(data){
  var string = JSON.stringify(data);
  var id = DocumentApp.getActiveDocument().getId();
  updateData(id, string)
  return data;
}


