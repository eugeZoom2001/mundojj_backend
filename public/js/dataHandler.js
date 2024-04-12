
// recibe un string con el nombre del item y devuelve
// un objeto con su valor o null 
// despues pone el item en null

function dGetItem (item){
    let itemBusc=null;
    itemBusc= localStorage.getItem(item); 
    localStorage.setItem(item,null)
   return itemBusc;
}
function dSetItem(item, valor) {
    
    if(valor){
        localStorage.setItem(item, JSON.stringify(valor));
       
    }else{
        localStorage.setItem(item, null);
    }
}

