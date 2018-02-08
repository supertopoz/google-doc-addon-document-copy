QUnit.helpers( this );
QUnit.exposeInternals(); // Use only when testing QUnit itself.

function doGet( e ) {
  QUnit.urlParams( e.parameter );
  QUnit.config({
    title: "QUnit for Google Apps Script - Test suite" // Sets the title of the test page.
  });
  QUnit.load( tests );
  return QUnit.getHtml();
};

function tests() {
  testWriteToLog();
  testGetUser();
  testGetTitle();
  testGetCenterName();
  testParseProgramFromClassCode();
}

//************************* CODE.JS TESTS ******************************************

function testGetTitle() { 
  test("It gets the title text of the document", function () {  
    equal(title(), "H24YJ-1A-1701-reminder Production V3",'Success Text');
  });
}

function testGetUser() { 
  test("It gets the user's name correctly", function () {  
    equal(getUser(), 'Trung (0937078086)' ,'Success Text');
  });
}
function testGetCenterName() { 
  test("It gets the name of a center from a class code", function () {  
    equal(getCenterName('H24YJ-1A-1701'), 'TC-HCMC24','Success Text');
  });
}

function testParseProgramFromClassCode() { 
  test("It gets the programme name from the classcode", function () {  
    equal(JSON.stringify(parseProgramAndModuleFromClassCode('H24YJ-1A-1701')), 
          JSON.stringify(["J1","A"]) ,'Success Text');
  });
}

function testWriteToLog() { 
  test("It return the text success after trying to write to a sheet", function () {  
    equal(writeToLog('info'), 'success','Success Text');
  });
}

