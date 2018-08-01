var CanvasJS=require('./js/canvasjs.min')
var i18next = require('i18next')
var win = require('electron').remote.getCurrentWindow().id
var store = new(require('electron-store'))


function canvas () {

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var json = JSON.parse(this.responseText);
    var keys = Object.keys(json.bpi);
    var dates=[];
    var valores=[];
    for(var i=0; i<keys.length;i++){
      var d=keys[i].split("-");
      dates[i]=new Date(d[0],d[1]-1,d[2]);
      valores[i]=json.bpi[keys[i]];
    }




var chart = new CanvasJS.Chart("chartContainer", {
animationEnabled: true,
title:{
  text: i18next.t("last 30 days")
},
axisX:{
  valueFormatString: "DD MMM",
  crosshair: {
    enabled: true,
    snapToDataPoint: true
  }
},
axisY: {
  title: i18next.t("price"),
  includeZero: false,
  valueFormatString: "$##0.00",
  crosshair: {
    enabled: true,
    snapToDataPoint: true,
    labelFormatter: function(e) {
      return "$" + CanvasJS.formatNumber(e.value, "##0.00");
    }
  }
},
data: [{
  type: "area",
  xValueFormatString: "DD MMM",
  yValueFormatString: "$##0.00",
  dataPoints: [
    { x: dates[0], y: valores[0] },
    { x: dates[1], y: valores[1] },
    { x: dates[2], y: valores[2] },
    { x: dates[3], y: valores[3] },
    { x: dates[4], y: valores[4] },
    { x: dates[5], y: valores[5]},
    { x: dates[6], y: valores[6] },
    { x: dates[7], y: valores[7] },
    { x: dates[8], y: valores[8] },
    { x: dates[9], y: valores[9] },
    { x: dates[10], y: valores[10] },
    { x: dates[11], y: valores[11] },
    { x: dates[12], y: valores[12] },
    { x: dates[13], y: valores[13] },
    { x: dates[14], y: valores[14] },
    { x: dates[15], y: valores[15] },
    { x: dates[16], y: valores[16] },
    { x: dates[17], y: valores[17] },
    { x: dates[18], y: valores[18] },
    { x: dates[19], y: valores[19] },
    { x: dates[20], y: valores[20] },
    { x: dates[21], y: valores[21] },
    { x: dates[22], y: valores[22] },
    { x: dates[23], y: valores[23] },
    { x: dates[24], y: valores[24] },
    { x: dates[25], y: valores[25] },
    { x: dates[26], y: valores[26] },
    { x: dates[27], y: valores[27] },
    { x: dates[28], y: valores[28] },
    { x: dates[29], y: valores[29] },
    { x: dates[30], y: valores[30] },
  ]
}]
});
chart.render();


}

}
xmlhttp.open("GET", "https://api.coindesk.com/v1/bpi/historical/close.json", true);
    xmlhttp.send();
}

function closeApp(){
    win.removeAllListeners('close');
    win.close();

}
function crearTabla(json){
  var tabla = document.getElementById("tablaDivisa");
     var tr0=document.createElement("TR");
    var tdAct=document.createElement("TD");
    tdAct.setAttribute("class","white noselect");
    var actualizacion=document.createElement("STRONG");
    actualizacion.setAttribute("id","txtActualizacion");
      actualizacion.textContent=i18next.t('last update');

      tdAct.appendChild(actualizacion);
    var tdAct2=document.createElement("TD");
      tdAct2.setAttribute("class","white moneda noselect");
      tdAct2.setAttribute("id","tdFecha");
      tdAct2.innerHTML=json.time.updated;
      tr0.appendChild(tdAct);
      tr0.appendChild(tdAct2);
      tabla.appendChild(tr0);


    var tr1=document.createElement("TR");
    var tdEuroTitulo=document.createElement("TD");
    tdEuroTitulo.setAttribute("class","white noselect");
    var euro=document.createElement("STRONG");
      euro.textContent="Euro";
      tdEuroTitulo.appendChild(euro);
    var tdEuro=document.createElement("TD");
      tdEuro.setAttribute("class","moneda white noselect");
      tdEuro.innerHTML=json.bpi.EUR.rate+" "+json.bpi.EUR.symbol;
      tr1.appendChild(tdEuroTitulo);
      tr1.appendChild(tdEuro);
      tabla.appendChild(tr1);

      var tr2=document.createElement("TR");

    var tdDolarTitulo=document.createElement("TD");
    tdDolarTitulo.setAttribute("class","white noselect");
    var dolar=document.createElement("STRONG");
      dolar.textContent="USD";
      tdDolarTitulo.appendChild(dolar);
    var tdDolar=document.createElement("TD");
      tdDolar.setAttribute("class","moneda white noselect");

      tdDolar.innerHTML=json.bpi.USD.rate+" "+json.bpi.USD.symbol;
      tr2.appendChild(tdDolarTitulo);
      tr2.appendChild(tdDolar);
      tabla.appendChild(tr2);

}

function setValores(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var json = JSON.parse(this.responseText);

    crearTabla(json);
    canvas();
    actualizar();

        }
  };
    xmlhttp.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json", true);
    xmlhttp.send();


  }

  function limpiarTabla(){
  var tabla=document.getElementById("tablaDivisa");
    tabla.deleteRow(0);
    tabla.deleteRow(0);
    tabla.deleteRow(0);

  }

  function actualizar(){
    setInterval(
    function(){
      var fechaAct = document.getElementById("tdFecha").innerHTML;
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var json = JSON.parse(this.responseText);
          if(json.time.updated!=fechaAct){

            limpiarTabla();
            crearTabla(json);
          }
      }
      }
      xmlhttp.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json", true);
      xmlhttp.send();

    },60000
    );
  }






//translations
i18next.init({
  lng: (store.get('lan')!==null)?store.get('lan'):'en',
  debug: true,
  resources: {
    en: {
      translation: {
        "bitcoin price": "BITCOIN PRICE",
        "last update"  :  "Last update",
        "last 30 days" :  "Bitcoin's price in the last 30 days",
        "price"        :  "Price (USD)",
        "language"     :  "Language",
        "spanish"      :  "Spanish ",
        "english"      :  "English "

      }
    }, es: {
      translation: {
        "bitcoin price": "PRECIO BITCOIN",
        "last update"  :  "Última actualización",
        "last 30 days" :  "Precio del Bitcoin los últimos 30 días",
        "price"        :  "Precio (USD)",
        "language"     :  "Idioma",
        "spanish"      :  "Español ",
        "english"      :  "Inglés "
      }
    }
  }
}, function(err, t) {

updateContentLanguage();
});
//end translations
function updateContentLanguage(){
  document.getElementsByTagName("H1")[0].innerHTML=i18next.t('bitcoin price');

  document.getElementById("language").innerHTML=i18next.t('language');

  imgEs = document.createElement("IMG");
  imgEs.setAttribute("src","img/es.png");
  imgEs.setAttribute("height","15");
  imgEs.setAttribute("width","20");

  document.getElementById("spanish").innerHTML=i18next.t('spanish');
  document.getElementById("spanish").appendChild(imgEs);
  document.getElementById("english").innerHTML=i18next.t('english');

  imgEn = document.createElement("IMG");
  imgEn.setAttribute("src","img/en.png");
  imgEn.setAttribute("height","15");
  imgEn.setAttribute("width","20");
  document.getElementById("english").appendChild(imgEn);

  if (document.getElementById("txtActualizacion")!==null) {
    document.getElementById("txtActualizacion").innerHTML=i18next.t('last update');
  }

  canvas();


}

function changeLng(lng) {
  if(lng!==i18next.language){
    store.delete('lan');
    store.set('lan',lng);
  i18next.changeLanguage(lng);
}
}

i18next.on('languageChanged', () => {
  updateContentLanguage();
});
