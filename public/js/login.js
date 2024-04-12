
let ChkRecordarme = document.getElementById("idCheckRecordarme");
ChkRecordarme.checked=false;


function callBack(response) {
    
    console.log(response);
    if (response.length > 0) {
        if(ChkRecordarme.checked){
            sSetRecordarme("si")
        }else{
            sSetRecordarme("no");  
        }
        
       // localStorage.setItem("cliente", response[0].cl_nro);
        //localStorage.setItem("nombre", response[0].cl_apynom);
       // dSetItem("hash",response[0].usu_hash);
        sSetData("nombre",response[0].usu_nombre);
        //console.log("respuesta " ,response); 
        document.location.href = 'clientes.html';
    } else {
       
        document.getElementById('idUsuario').value = "";
        document.getElementById("idPassword").value = "";
        MostrarAlerta("#alertLogin","Error : Verifique Los Datos",false)
    }

}

 const btnLogin = document.getElementById("idBotonLogin");
  let inputUsuario,inputPassword;
  let parametros_login;
  btnLogin.addEventListener("click", verificarDatos, false);

  function verificarDatos (){
    
    
    inputUsuario=document.getElementById('idUsuario').value;
     inputPassword=document.getElementById("idPassword").value; 
   
    //document.location.href='historico.html';
    if(inputUsuario.length>0 && inputPassword.length>0){
     parametros_login = { usuario: inputUsuario, password: inputPassword };
     console.log("parametros login",parametros_login );   
     S_Login()
    }else{
      MostrarAlerta("#alertLogin","Debe Ingresar los Datos",false)
        
    }    
    
}
