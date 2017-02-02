var excelToJson = require('./excelToJson');
var jsonToDb = require('./jsonToDb');

module.exports = {
  excelIntegrationDb: function(excelFilePath, orderId) {
    return bResult = jsonToDb.insert(excelToJson.convert(excelFilePath, orderId));
  }
}
