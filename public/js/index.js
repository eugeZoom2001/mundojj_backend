console.log("index");
const url_autos = "/api/v1/autos";
const patente = "BB555GG";
const S_CargarServer = (url, method, data) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: method,
      url: url,
      crossOrigin: true,
      data: data,
      //dataType: dataType,
      dataType: "json",
      success: resolve,
      error: reject,
    });
  });
};

S_CargarServer(`${url_autos}`, "GET", {})
  .then((result) => {
    if (result) {
      if (result.result === "ok") {
        console.log(result);
        document.location.href = "clientes.html";
      } else {
        alert("algo salio mal");
      }
    }
  })
  .catch((err) => {
    console.log("error", err);
  });

/*  
S_CargarServer(`${url_autos}/${patente}`, "GET", {})
  .then((result) => {
    if (result) {
      if (result.result === "ok") {
        console.log(result.data[0]);
        let vencimiento1= result.data[0].vencimiento2;
        console.log("vencimiento1", crearFechaMostrar(vencimiento1));
        let otroVenc = convertirAFechaServer(crearFechaMostrar(vencimiento1))
         

        console.log("otrovenc", otroVenc);
     
      } else {
        alert("algo salio mal");
      }
    }
  })
  .catch((err) => {
    console.log("error", err);
  });

*/
  function crearFechaMostrar(fecha) {
  let ddmmyyyy = "";
  if (fecha != null) {
    if (fecha.length > 0) {
      let date = new Date(fecha);
      let anio = date.getFullYear();
      if (anio > 1970) {
        date.setHours(date.getHours() + 12);
        ddmmyyyy = date.toLocaleDateString();
      } else {
        ddmmyyyy = "";
      }
    } else {
      ddmmyyyy = "";
    }
  } else {
    ddmmyyyy = "";
  }

  return ddmmyyyy;
}


const convertirAFechaServer = (fecha) => {
  fechaNueva='1970-01-01';
  if(fecha.length>0){
  let fechaArr = fecha.split('/');
  fechaNueva=fechaArr[2]+"-"+fechaArr[1]+"-"+fechaArr[0];
  }
  return fechaNueva;
}
  

