function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

var url = 'https://docs.google.com/spreadsheets/d/1NGoOKExnLLVtqmkY4GWJ4NQGz0NLwMjFbVgmZsnl3GY/edit#gid=0'
var sh = 'sheet1'
var folderId = '110dkEmd1n4NrwByk0JdFgwPZ2U0gMGFw'

function processForm(formdata) {
  var superscript = SuperScript.initSuper(url, sh)
  var formObject = {}
  formdata.forEach(element => formObject[element.name] = element.value);

  var file = '';
  if (Object.keys(formObject.myfile).length)
    file = superscript.uploadFile(folderId, formObject.myfile.data, formObject.myfile.name)
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheets()[0]
  ws.appendRow([
    new Date(),
    formObject.name,
    formObject.email,
    formObject.phone,
    formObject.message,
    file ? file.getUrl() : 'N/A'
  ]);
}