let operacion = "alta";
let idStock = "";
let datos = {};
let idProveedorActual = 0;
let rubroActual = 0;

$(document).ready(function () {
  // chequear si vengo de alta o modificacion
  init()
    .then(() => {
      cargarProveedores();
    })
    .catch((err) => { });

}); // on ready

async function init() {
  proveedorActual = null;
  datos = JSON.parse(dGetItem("datosStock"));

  if (datos) {
    console.log("datos update ",datos);
    operacion = "update";
    idStock = parseInt(datos.id, 10);
    datos.operacion = operacion;
    datos.id = idStock;
    
    proveedorActual = parseInt(datos.idProveedor, 10);
    rubroActual=parseInt(datos.rubro, 10);
    //
    convertirNumeros(datos)
      .then(() => {
        cargarDatosStock(datos);
      }).catch((err) => { });

  } else {
    operacion = "alta";
    agregarItemSelect({id:-1,nombre:" -- Proveedor ---"},true);
    AgregarItemSelectRubro({idRubro:-1,rubroNombre:" -- Selecctionar ---"},true);
    $("#btnBorrar").css("display", "none");
    $(".divStock").css("display", "none");
    
  }
}

// convierte los string numeros decimales a float

const convertirNumeros = async (data) => {
  data.precio1 = data.precio1.replace(/,/g, '.')
  data.precio2 = data.precio2.replace(/,/g, '.')
  data.precio3 = data.precio3.replace(/,/g, '.')
  data.valor = data.valor.replace(/,/g, '.')

}

function cargarProveedores() {
  S_CargarProveedores(url_proveedores_stock)
    .then((result) => {
      if (result.result === "ok") {
        //console.log("proveedores inicio:" ,result.proveedores);
        if (result.proveedores.length > 0) {
          cargarProveedoresSelect(result.proveedores);
        } else {
          console.log("no hay proveedores");
        }
      }
    })
    .catch((err) => {console.log("error",err); });
   S_CargarRubros(url_CargarRubros,{}).then((resultado) => {
     //console.log("rubros",resultado.rubros);
     CargarRubrosSelect(resultado.rubros); 
    }).catch((err) => {
     console.log("error",err);
   }); 

}

function CargarRubrosSelect(rubros) {
  //console.log("cargo rubros",rubros,"tipo",typeof(rubros));
  let itemNuevo = {};
  rubros.forEach((element) => {
    itemNuevo = {
      idRubro: parseInt(element.idRubro, 10),
      rubroNombre: element.rubroNombre
    }
    AgregarItemSelectRubro(itemNuevo);
  });
}

function AgregarItemSelectRubro(item, selected = false) {
  let select = document.getElementById("idSelectRubro");
  let opcion = document.createElement("option");
    opcion.setAttribute("value", item.idRubro);
  if ((item.idRubro === rubroActual)||(selected)) {
    opcion.setAttribute("selected", true);  
  }
  
  opcion.innerText = item.rubroNombre;
  select.appendChild(opcion);
}

function cargarProveedoresSelect(proveedores) {
  //console.log("cargo proveedores",proveedores,"tipo",typeof(proveedores));
  let itemNuevo = {};
  proveedores.forEach((element) => {
    itemNuevo = {
      id: parseInt(element.id, 10),
      nombre: element.nombre
    }

    agregarItemSelect(itemNuevo);
  });
}

function agregarItemSelect(item, selected = false) {
  let select = document.getElementById("idSelectProveedor");
  let opcion = document.createElement("option");
  
  opcion.setAttribute("value", item.id);

  if ((item.id === proveedorActual)||(selected)) {
    opcion.setAttribute("selected", true);  
  }
  
  opcion.innerText = item.nombre;
  select.appendChild(opcion);
}




function cargarDatosStock(data) {
  // es UPDATE
  $("#codigo").val(data.id);
  $("#descripcion").val(data.nombre);
  $("#rubro").val(data.rubro);
  $("#cantidad").val(0),
  $("#valor").val(data.valor);
  $("#stock").val(data.stock);
  $("#precio1").val(data.precio1);
  $("#condicion1").val(data.condicion1);
  $("#precio2").val(data.precio2);
  $("#condicion2").val(data.condicion2);
  $("#precio3").val(data.precio3);
  $("#condicion3").val(data.condicion3);

}

$("#btnBorrar").on("click", function () {
  let datosBorrar = {
    id: idStock,
    operacion: "borrar",
  };
  S_AltaStock(url_altaStock, datosBorrar).then((result) => {
    MostrarAlerta("#alertStock", "Articulo Borrado con Exito", true, salir);
  }).catch((err) => {
    console.log("error", err);
  });

});

$("#btnGuardar").on("click", function () {
  obtenerDatos();
});



function obtenerDatos() {
  let datos = {
    id: $("#codigo").val(),
    descripcion: $("#descripcion").val(),
    rubro: $("#idSelectRubro").val(),
    valor: $("#valor").val(),
    cantidad: $("#cantidad").val(),
    precio1: $("#precio1").val(),
    condicion1: $("#condicion1").val(),
    precio2: $("#precio2").val(),
    condicion2: $("#condicion2").val(),
    precio3: $("#precio3").val(),
    condicion3: $("#condicion3").val(),
    comprobante :$("#comprobante").val(),
    operacion: operacion,
    idProveedor: $("#idSelectProveedor").val(),
  };
  if (validarDatos(datos)) {
     let total = parseInt(datos.cantidad)
     total = total*parseFloat(datos.valor).toFixed(2);  
     datos.total = total.toString(); 
    altaStock(datos);
  } else {
    MostrarAlerta("#alertStock", "Complete los datos requeridos", false);
  }
}

function altaStock(data) {
  //console.log("envio datos ...", data);
  
  S_AltaStock(url_altaStock, data)
    .then((result) => {
      // console.log("resultado ", result);
      if (result.result === "ok") {
        MostrarAlerta("#alertStock", "Exito", true, salir);
      } else {
        MostrarAlerta(
          "#alertStock",
          "Error Codigo de Producto Duplicado",
          false
        );
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
  
 }

function validarDatos(datos) {
  //console.log("datos validar",datos);
  let result = false;
  if ((datos.id)&&(datos.idProveedor>=0)&&(datos.rubro>=0)) {
    datos.id = parseInt(datos.id, 10); // 
    datos.idProveedor = parseInt(datos.idProveedor, 10);
    result = true;
  }
  return result;
}

const salir = () => {
  document.location.href = "stock.html";
};
