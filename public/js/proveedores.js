$(document).ready(function () {
 
  inicio();
 
}); // on ready

$('#table').bootstrapTable({
    pagination: true,
    search: true,
    columns: [{
      field: 'id',
      title: 'ID',
      sortable:true
    }, {
      field: 'nombre',
      title: 'Nombre',
      sortable:true
    }, {
      field: 'mail',
      title: 'Email'
    }, {
      field: 'telefonos',
      title: 'Telefonos'
    }, {
      field: 'direccion',
      title: 'Direccion'
     },{
      field: "contacto",
      title: "Contacto"
     },
  ],
    
  })

  


 const inicio = () => {
    S_CargarServer(url_proveedores,"GET",{}).then((result) => {
     if(result.result==="ok"){ 
        result.data.forEach((element) => {
        element.id=element._id
       // console.log("proveedor",element);
        
        $('#table').bootstrapTable('append', element);
       
      });
     }
    }).catch((err) => {
      
    });  
     
}





const salir = () => {
  document.location.href='stockaltapro.html'; 
}


// EVENTOS 

// evento click api
$("#table").on("click-row.bs.table row", function (e, value, row, index) {
  //console.log("click api",row.find("td:eq(1)").text()); // ok trae el nombre
  //console.log("click api", value); // genial trae un json con  los valores
  dSetItem("datosProveedor",value);
  salir();
});

