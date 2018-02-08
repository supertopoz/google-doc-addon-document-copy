var classCode = "";
var user = Session.getActiveUser().getEmail(); // Get once and use in all log writes

function title() {
    var thisDoc = DocumentApp.getActiveDocument();
    var titleName  = thisDoc.getName();
    var space = titleName.indexOf(" ");
    classCode = titleName.substring(0,space);
    return titleName  
};

// Warning do not go live with this version because it doesn't have Jumpstart. 


// --------------------------- Document opening operations ------------------------------------------------------

function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Open Reminder', 'showSidebar')
   //   .addItem('Edit my details', 'showDialog')
      .addItem('Setup Template', 'showDialog2')
      .addToUi();   
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function onInstall(e) {
  onOpen(e);
}


function showSidebar() {
  var moment = Moment.moment
  var ui = HtmlService.createTemplateFromFile('Sidebar')
    .evaluate()
    .setTitle('Reminder v3.0')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showSidebar(ui);
  title();
  writeToLog("Opened App");
}


function getUser(){
  var response;
  response = getData()
  if (response === null || response.name === ''){
  var email = Session.getActiveUser().getEmail();
  var response = UrlFetchApp.fetch("https://script.google.com/macros/s/AKfycbwCylrPb12_1m2GTTWSOF8-VvbicVTN8XK0KCSISEd4DFbvAzpD/exec?email="+email);
  return response;
  } else {
  var result = response.name + ' (' +response.phone +')'
  return result
  }
}


function showDialog() {
  var html = HtmlService.createHtmlOutputFromFile('details')
      .setWidth(400)
      .setHeight(410);
  DocumentApp.getUi() // Or DocumentApp or FormApp.
      .showModalDialog(html, 'Edit my details');
}



// --------------------------- /Document opening operations ------------------------------------------------------

// --------------------------- Write to Log ----------------------------------------------------------------------

function getCenterName(classCode){
    var centerNum = classCode.substring(0,classCode.indexOf("Y"))
    return centersList[centerNum][0].center;
}

function writeToLog(message){

   if(message === undefined) message = "Opened App";  
   var timeStamp = Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'");
   var ss = SpreadsheetApp.openById('1qep8wAKShIeUE-PuKDcwNFoFsoIxtMldRPi0Q6bvBpk').getSheetByName('Sheet1');
   var thisDoc = DocumentApp.getActiveDocument();
   var title  = thisDoc.getName();
   var titleName  = thisDoc.getName();
   var space = titleName.lastIndexOf("-");
   var classCode = titleName.substring(0,space);
   var center = getCenterName(classCode);
   var data = [timeStamp,center,user,title,message,0]
   pushToFireBaseV2(data)
   try{
   ss.appendRow(data);
   return 'success'// [timeStamp,center,user,title,message,0]; 
   } catch (e){
   return 'failed'
   }
}

// ---------------------------/ Write to Log ----------------------------------------------------------------------


//..................... Gets level and modules from document name ..................

function parseProgramAndModuleFromClassCode(classCode){
     var dash = classCode.indexOf("-")   
     var levelModule ="";
     var programme = classCode.substr(dash-1, 3).replace("-","").replace("L","");  
     (programme.indexOf("K") >=0)? levelModule = classCode.substr(dash+1, 3).replace("-","").replace("L","") : levelModule = classCode.substr(dash+2, 1); 
     return [programme, levelModule]
   }
   
function getDocumentTitle (){
  var thisDoc = DocumentApp.getActiveDocument();
  var docName  = thisDoc.getName();
  return docName;
}   
   

function parseTitleLevel(incomingLevels){
      
   var thisDoc = DocumentApp.getActiveDocument();
   var titleName  = thisDoc.getName();
   var space = titleName.lastIndexOf("-");
   var classCode = titleName.substring(0,space);                
   var result = parseProgramAndModuleFromClassCode(classCode)
   var programmeCode = result.join('');
   if(incomingLevels.indexOf(programmeCode) === -1){
     writeToLog('FAILED');
     return 'failed';
   }
   return result;
}

//..................... /Gets level and modules from document name ..................

function addFixedContent(tag){
  var members = getFbData()
  //tag = "<<startreview>>"
  var insertTop = false;
  var fileId = '18XVxQTRE1BE2Tpzp5W4ubQBR3z_HaorLsuo6WypQvyI'; // location of fixed content document
  (tag === "<<startreview>>")? insertTop = true: insertTop = false; 
  (tag !== "<<startreview>>")? writeToLog("Added Project Content") : writeToLog("Added Reminder Template");
  try {
    findTag(fileId, tag, insertTop, members);
    return [fileId, tag, insertTop, members];
  } catch (e){
    return e
  }
}

function add(e){
  var tag = e[0]
  var fileId = e[1];
  writeToLog("Added Standard Content");
  return findTag(fileId, tag);
}

function findCourseIndex(){
    var targetDoc = DocumentApp.getActiveDocument();
    var cursor = targetDoc.getCursor().getElement();
    var cursorParent  = cursor.getParent().getChildIndex(cursor);
}

function getCursor(insertTop){
  var targetDoc = DocumentApp.getActiveDocument();
  try {
    var cursor = targetDoc.getCursor().getElement();
  } catch(e){
    return e;
  }   
  var cursorParent  = cursor.getParent().getChildIndex(cursor);
    var start;
    if (insertTop === true){
      start = 0;
    } else {
      start = cursorParent;
    }
    return start
}


function replaceDateTag(){
   var date = Utilities.formatDate(new Date(), "GMT", "EEE, MMM d - yyyy");
   var targetDoc = DocumentApp.getActiveDocument();
   var dateTag = "<<TODAYDATE>>"
   var body = targetDoc.getBody();
   body.replaceText(dateTag, date); 
}

function findTag(fileId, tag, insertTop,members){ 

   var thisDoc = DocumentApp.getActiveDocument();
   var titleName  = thisDoc.getName();
   var space = titleName.lastIndexOf("-");
   var classCode = titleName.substring(0,space);   
   var targetDoc = DocumentApp.getActiveDocument();
   try{
    var sourceDoc = DocumentApp.openById(fileId); 
   } catch (e) {
    return e;
   }
   
//   var title = targetDoc.getName();
   
   var startTag = tag;     
   var firstTag = sourceDoc.getBody().findText(startTag); 
   var startTagElement = firstTag.getElement();   
   var parent = startTagElement.getParent();
   var startPoint = parent.getParent().getChildIndex(parent);  
   
   var endTag = tag.replace('start', 'finish'); 
   var lastTag = sourceDoc.getBody().findText(endTag);
   var endTagElement = lastTag.getElement();
   var endParent = endTagElement.getParent();
   var endPoint = endParent.getParent().getChildIndex(endParent);
   
   var start = getCursor(insertTop);
   
   Logger.log(startPoint);
   Logger.log(endPoint);
   try {
      for( var j = startPoint; j <= endPoint; ++j ) {    
        var body = targetDoc.getBody();
        var element = sourceDoc.getChild(j).copy();
        var type = element.getType();
        
        if( type == DocumentApp.ElementType.INLINE_IMAGE ){
          body.insertImage(start, element);          
        }      
        else if( type == DocumentApp.ElementType.PARAGRAPH ){    
          body.insertParagraph(start, element);      
        }
        
        else if( type == DocumentApp.ElementType.TABLE){        
          body.insertTable(start, element);
        }       
        else if( type == DocumentApp.ElementType.INLINE_IMAGE ){ 
          var blob = body.getChild(j).asInlineImage().getBlob();
          body.insertImage(start, blob); }
          
        else if( type == DocumentApp.ElementType.LIST_ITEM){
          body.insertListItem(start, element);
        }
        start ++;
      }
    }
    catch(e){
    return e;   
    }
    
  
     body.replaceText(endTag, ""); 
     body.replaceText(startTag, "");
     body.replaceText("<<ClassCode>>", " " + classCode);
    Logger.log(members)
    if(insertTop) addMembers(members);
    replaceDateTag();
    targetDoc.saveAndClose();
    return "worked";  
}

function addMembers(members){
    var targetDoc = DocumentApp.getActiveDocument();
    var body = targetDoc.getBody();
    var taCount = 0;
    var tCount = 0;
    var memberz = JSON.parse(members)
    try {
      memberz.forEach(function(item){
        var name = item.value.n; 
        Logger.log(item)
        var number = "(" + item.value.p + ")";    
        if(item.value.t !== "1"){            
          body.replaceText("<<ta"+taCount+">>", " " + name + " "+ number ); 
          taCount +=1
        } else {
          body.replaceText("<<teacher"+tCount+">>", " " + name);    
          tCount += 1
        }
      })
    } catch (e){
      Logger.log(e)
    }
    for(var k = 0; k < 5; k++){
    var ta = body.findText("<<ta"+k+">>");
    var teacher = body.findText("<<teacher"+k+">>");
    try {
    if(ta !== null) ta.getElement().removeFromParent()
    if(teacher !== null) teacher.getElement().removeFromParent()
    } catch(e){
    Logger.log(e)
    }
  //  body.replaceText("<<ta"+k+">>", "");       
  //  body.replaceText("<<teacher"+k+">>", "");  
    }
    return;
}

