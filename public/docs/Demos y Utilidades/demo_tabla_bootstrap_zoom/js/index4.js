const url = "http://181.15.160.178:8008/WEBAPP/asp/moviles.asp";
const id_empresa = 1972;
const dataType = "jsonp";
const crossOrigin = true;
const parametros = { cliente: id_empresa, tipoConsulta: "moviles" };

const cargarDatos = (url, parametros) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      data: parametros,
      url: url,
      crossOrigin: crossOrigin,

      dataType: dataType,
      //dataType:"json",
      success: resolve,
      error: reject,
    });
  });
};

$("#table").bootstrapTable({
  pagination: true,
  search: true,

  columns: [
    {
      field: "mo_id",
      title: "ID",
      sortable: true,
    },
    {
      field: "mo_desc",
      title: "Desc",
      sortable: true,
    },
    {
      field: "mo_domicilio",
      title: "Domicilio",
    },
  ],
});


const tabla_Agregar_datos = async () => {
  try {
    let datos = await cargarDatos(url, parametros);
    //console.log(datos);
    $("#table").bootstrapTable("append", datos);
  } catch (error) {
    console.log(error);
  }
};

tabla_Agregar_datos();

//eventos

// evento click api
$("#table").on("click-row.bs.table row", function (e, value, row, index) {
  //console.log("click api",row.find("td:eq(1)").text()); // ok trae el nombre
  console.log("click api", value); // genial trae un json con  los valores
});

// evento click  jQuery
$(document).on("click", "#table tr ", function () {
  let currentRow = $(this);
  rowClickeado = currentRow.find("td:eq(1)").text();
  console.log("click jQuery", rowClickeado); //ok trae el nombre
});
