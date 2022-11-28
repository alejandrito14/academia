// JavaScript Document

function RedondearaDos(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

function formato_numero(numero, decimales, separador_decimal, separador_miles){ // v2007-08-06
    numero=parseFloat(numero);
    if(isNaN(numero)){
        return "";
    }

    if(decimales!==undefined){
        // Redondeamos
        numero=numero.toFixed(decimales);
    }

    // Convertimos el punto en separador_decimal
    numero=numero.toString().replace(".", separador_decimal!==undefined ? separador_decimal : ",");

    if(separador_miles){
        // Añadimos los separadores de miles
        var miles=new RegExp("(-?[0-9]+)([0-9]{3})");
        while(miles.test(numero)) {
            numero=numero.replace(miles, "$1" + separador_miles + "$2");
        }
    }

    return numero;
}

function onKeyDecimal(e,thix) {
        var keynum = window.event ? window.event.keyCode : e.which;
        if (document.getElementById(thix.id).value.indexOf('.') != -1 && keynum == 46)
            return false;
        if ((keynum == 8 || keynum == 48 || keynum == 46))
            return true;
        if (keynum <= 47 || keynum >= 58) return false;
        return /\d/.test(String.fromCharCode(keynum));
 }

function Backup(donde,regresar)
{
//alert(archivo_envio);
	if(confirm("\u00BFEstas seguro de querer realizar esta operaci\u00f3n?"))
	{			
		//console.log(datos);
	
		 $('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Subiendo Archivos...</div>')
				
		setTimeout(function(){
				  $.ajax({
					url:'administrador/backup.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					//data: datos, //Le pasamos el objeto que creamos con los archivos
					error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $('#abc').html('<div class="alert_error">'+error+'</div>');	
						  //aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
					  },
					success:function(msj){
						   console.log("El resultado de msj es: "+msj);
						  var array = msj.split("|");
						   if ( array[0] == 1 ){
								aparecermodulos(regresar+"?ac=1&msj=Operacion realizada con exito",donde);
						 	 }else{
				 
								aparecermodulos(regresar+"?ac=0&msj=Error. "+msj,donde);
						  	}			
					  	}
				  });				  					  
		},1000);
	 }	
}


function iraLogin()
{
	console.log('fue a login');
	window.location.href="index.php";
}
function isValidDate (value) {
  var valid = false,
      info,
      real;
        var valor=value.split('-');
         value=valor[2]+'/'+valor[1]+'/'+valor[0];
  // Validar formato
  if (/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/.test(value)) {
    
    // Validar fecha
    info = value.split(/\//);
    real = (new Date(info[2], info[1] - 1, info[0])).toISOString().substr(0,10).split('-');
    if (info[0] === real[2] && info[1] === real[1] && info[2] === real[0]) {
      valid = true;
    }
  }
  return valid;
}

function fechaformato(fecha) {
  var monthNamesShort= ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Agost","Sept", "Oct", "Nov", "Dic"];

  var f=new Date(fecha);
  var mes =f.getMonth();
  var anio=f.getFullYear();

  //console.log(monthNamesShort[mes]+' '+anio);
  return monthNamesShort[mes]+' '+anio;
}