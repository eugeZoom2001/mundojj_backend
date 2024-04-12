$(document).ready(function () {
  inicio();
}); // on ready

$("#table").bootstrapTable({
 // pagination: true,
  search: true,
  columns: [
    {
      field: "id",
      title: "ID",
    },
    {
      field: "nombre",
      title: "Nombre del Proveedor",
      sortable: true,
    },
    {
      field: "saldo",
      title: "Saldo Actual",
    },
  ],
});



function sumarColumnas(tabla) {
  let total = 0;
  tabla.forEach((element) => {
   total += element.saldo;
  });
 $('tfoot tr td').text(priceFormatter(total));
}



function priceFormatter(value) {
  // return '<i class="fa fa-dollar-sign"></i>' + value;
  return convertirAPesos(value.toString());
}

const inicio = () => {
 S_CargarServer(url_proveedores,"GET",{})
    .then((result) => {
      if(result.result==="ok"){ 
      //console.log(result);

       $("#table").bootstrapTable("append", result.data);
      sumarColumnas(result.data);
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};

const salir = () => {
  document.location.href = "resumencta.html";
};

// EVENTOS

// evento click api
$("#table").on("click-row.bs.table row", function (e, value, row, index) {
  //console.log("click api",row.find("td:eq(1)").text()); // ok trae el nombre
  //console.log("click api", value); // genial trae un json con  los valores
  dSetItem("datosEstadoCtaProv", value);
  salir();
});
