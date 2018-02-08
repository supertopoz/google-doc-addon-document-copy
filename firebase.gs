var moment = Moment.moment
function pushToFireBaseV2(x){
  

  var center = x[1];
  var action = x[4].replace(/ /g,"-")
  var timeStamp = x[0]
  var e = x[2]
  var key = center+"-"+action
  var d = x[3]
  var week = moment(timeStamp).isoWeek();
//  Logger.log(week)
  var year = moment().year();
  var dataToImport = {"e" : e,"d": d }
//  Logger.log(dataToImport)
 // Logger.log(dataToImport)
  var firebaseUrl = "https://action-data-2.firebaseio.com/";
  var secret = "Pkdcn7B5puo75k5KkF6HbdBKSP7ClmpcupQjY3TZ"
  try{
  var base = FirebaseApp.getDatabaseByUrl(firebaseUrl,secret);
  base.setData(center +"/"+key+"/"+[year+""+week]+"/"+timeStamp, dataToImport)
  } catch(e){
//  Logger.log(e)
  }  
}



