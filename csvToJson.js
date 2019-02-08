console.log("Bienvenida Ana Contreras. Estoy a su entera disposición para ejecutar la conversión")

const csvToJson = require('convert-csv-to-json');
const json2xls = require('json2xls');
const fs = require('fs');

let prompt = require('prompt');

prompt.start();
 
prompt.get(['csv', 'xlsx'], function (err, result) {
 
  console.log('Los nombres de archivo son los siguientes:');
  console.log('  CSV: ' + result.csv);
  console.log('  XLSX ' + result.xlsx);

  //let data = csvToJson.getJsonFromCsv("EneroFR.csv");
  let data = csvToJson.getJsonFromCsv(`${result.csv}`);

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
  //fs.writeFileSync('Enero.xlsx', xls, 'binary');
  fs.writeFileSync(`${result.xlsx}`, xls, 'binary');

  });