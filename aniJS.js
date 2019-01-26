let csvToJson = require('convert-csv-to-json');
let data = csvToJson.getJsonFromCsv("19.1.24.csv");

const json2xls = require('json2xls');
const fs = require('fs');

function myTrim(x) {
  return x.replace(/^\s+|\s+$/gm,'');
}

function cleaner(str) {
  console.log(str)
  return myTrim(str);
}

let dataNew = []

for (i = 0; i < data.length; i++) {
  if (data[i]["CodeEnregistrement"] === "04") {
    dataNew.push({
      "Dia": data[i]["Dated\'op�ration"],
      "Concepto": cleaner(data[i]["Libell�"]),
      "Amount": data[i]["Montant"]
    })
  }
  if (data[i]["CodeEnregistrement"] === "05") {
    dataNew[dataNew.length - 1]["Concepto"] = dataNew[dataNew.length - 1]["Concepto"] + " " + cleaner(data[i]["Libell�"])
  }
}

//.replace(/ /g,'')
//console.log(dataNew)

var xls = json2xls(dataNew);
fs.writeFileSync('dataTest.xlsx', xls, 'binary');
