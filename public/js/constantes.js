// pruebas
const id_empresa = 38;
const url_moviles_prueba = "http://smsistemas.no-ip.org/servicios_rodados/asp/movilesCity.asp"

// login 

const url_login = "http://smsistemas.no-ip.org/servicios_rodados/asp/login.asp"

// Servicios

const url_autos = "/api/v1/autos";



// Stock


const url_proveedores = "api/v1/proveedores";
const url_proveedores_cta = "api/v1/proveedores/cuentas";
const url_articulos = "api/v1/stock/articulos"
const url_rubros = "api/v1/stock/rubros"
const url_altaStock = "http://smsistemas.no-ip.org/servicios_rodados/asp/stockAlta.asp"
const url_proveedores_stock="http://smsistemas.no-ip.org/servicios_rodados/asp/proveedoresStock.asp"
const url_stock="http://smsistemas.no-ip.org/servicios_rodados/asp/stock.asp"
const url_AltaRubro="http://smsistemas.no-ip.org/servicios_rodados/asp/altaRubro.asp"



const VENCIMIENTO_POR_DEFECTO="1900-01-01"
const TIEMPO_MAX_SESSION_ALERT=1000;

const TIEMPO_MAX_SESSION_POSICION=1000*60*5
const TIEMPO_MAX_SESSION_INDEX=1000*60*5
const TIEMPO_REFRESCO_POSICION = 60000;
const TIEMPO_REFRESCO_INDEX=1000*60*2
const dataType = "json"
const crossOrigin = true;
let map, infobox, dataLayer, mapOptions;
const minValorIdMovil = 1;
const maxValorIdMovil = 5000000 
const nombreSpinner="idSpinnerDiv"; 
const nombreSpinnerRecorrido="idSpinnerDivRecorrido"; 
const nombreSpinnerSinReporte="idSpinnerDivSinReporte"; 


