let datosServer = {};
$(document).ready(function () {
 
   init();
   
  }); // on ready

  
  
  function priceFormatter(value) {

   // return '<i class="fa fa-dollar-sign"></i>' +' '+ value;
    return convertirAPesos(value.toString());
  }

  function fechaFormatter (fecha){
    return crearFechaMostrar(fecha);
  }
  
  const validarDatos  = (data) => {
    let datosValidos = false
    datosValidos =(data.codOperacion !== "0")&&(data.importe!="0")
                  &&(data.importe.length>0)
    return datosValidos;
  }

 
  async function init() {
    proveedorActual = null;
    datos = JSON.parse(dGetItem("datosEstadoCtaProv"));
    if (datos) {
     // console.log("datos cuenta ",datos);
      document.getElementById('idTituloProveedor').innerText='Resumen de Cuenta '+datos.nombre;
      datosServer.proveedor = datos._id;
      datosServer.saldo =datos.saldo;
      //console.log("datos Server" ,datosServer);//ok 
      S_CargarServer(`${url_proveedores_cta}/${datosServer.proveedor}`,"GET",{})
      .then((result) => {
        
        result.data.forEach((element) => {
          //console.log( element);
          let data ={
            fecha:element.fecha,
            importe:element.importe,
            saldo:element.saldo,
            operacion:element.operacion,
            obvs:element.obvs
          }
          $("#table").bootstrapTable("append", data);
        });  

      }).catch((err) => {
        
      });

    }else{
        salir();
    }
  }

  $("#btnGuardar").on("click", function () {
   
   let data  = {
     tipoOperacion : $("#idTipoOperacion option:selected").text(),
     codOperacion: $("#idTipoOperacion option:selected").val(),
     comprobante:  $("#comprobante").val(),
     importe :  $("#importe").val(), 
     obvs :   $("#observaciones").val()
    }
   // console.log("datos cargados",data);
    if (!validarDatos(data)){
      MostrarAlerta("#alertResumenCta", "Complete Los Datos!!", false);
    }else{
      cargarDatosTabla(data)
    }
    
  });

  function cargarDatosTabla(data){
   
    let datosTabla = {
      fecha:new Date().toDateString(),
      operacion :data.tipoOperacion.toUpperCase()  ,
      obvs:data.obvs,
      importe :convertirNumero(data.importe)
    
    }
    //console.log("importe tabla",datosTabla.importe," tipo ",
    //typeof(datosTabla.importe));
    if (data.comprobante.length >0 ){
      datosTabla.operacion+=" comprobante "+data.comprobante;
      datosServer.obvs = data.obvs;
    }
    
    switch(data.codOperacion) {
      case "1": 
      datosTabla.saldo = datosServer.saldo-datosTabla.importe;
      break;
      case "2": 
      datosTabla.saldo = datosServer.saldo-datosTabla.importe;
      break;
      case "3": 
      datosTabla.saldo = datosServer.saldo+datosTabla.importe;
      break;
      case "4": //ajuste
      datosTabla.saldo = datosServer.saldo+datosTabla.importe;
      break;
    }
    
   
    datosServer.saldo = datosTabla.saldo.toFixed(2);
    datosTabla.saldo = datosServer.saldo;
     //console.log("datos tabla",datosTabla);
    $('#table').bootstrapTable('prepend', datosTabla);
   
    
    datosServer.importe =  datosTabla.importe;
    datosServer.operacion=datosTabla.operacion
    datosServer.obvs = datosTabla.obvs;
    cargarDatosServer(datosServer);

    
  }

  function cargarDatosServer (data){
     data.saldo = convertirNumero(data.saldo);
    //console.log("tipo saldo ",typeof(data.saldo)); //ok numero
    //console.log("tipo importe ",typeof(data.importe)); //ok numero
    console.log("datos enviados ... ",data);
    //  .... Actualizo proveedor 
    S_CargarServer(`${url_proveedores}/${data.proveedor}`,"PATCH",{saldo:data.saldo})
    .then((result) => {
    // ........ Actualizo Cuenta  
     S_CargarServer(url_proveedores_cta,"POST",data) 
      limpiarFormulario();
    }).catch((err) => {
      console.log("Hubo un error");
    }); 
   
  }
  function limpiarFormulario (){
    
     $("#comprobante").val(""),
      $("#importe").val(0), 
      $("#observaciones").val("")
     document.getElementById('idTipoOperacion').getElementsByTagName('option')[0].selected = 'selected'
    
   }
  

  $("#btnVolver").on("click", function () {
   // document.getElementById('idTipoOperacion').getElementsByTagName('option')[0].selected = 'selected'
   salir();
     
   });
  

   const salir = () => {
    document.location.href = 'estadocuenta.html';
  }