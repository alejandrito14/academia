// JavaScript Document
  var confirmacion = "Las contraseñas si coinciden";
  var longitud = "La contraseña debe estar formada entre 6-10 carácteres";
  var negacion = "No coinciden las contraseñas";
  var vacio = "La contraseña no puede estar vacía";

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

// funcion para validar el correo
function caracteresCorreoValido(email, div){
    console.log(email);
    //var email = $(email).val();
    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

    if (caract.test(email) == false){
        $(div).hide().removeClass('hide').slideDown('fast');

        return false;
    }else{
        $(div).hide().addClass('hide').slideDown('slow');
//        $(div).html('');
        return true;
    }
}

function diasarray(numerodia) {
    dias=['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sábado','Domingo'];
    return dias[numerodia];
}


 function coincidePassword(contra1,contra2){


  var respuesta=$("#respuesta").html('<span id="spanrespuesta"></span>');

  var span = $('#spanrespuesta');


  var valor1 = $('#'+contra1).val();
  var valor2 = $('#'+contra2).val();


  if (valor1.length>0) {
  //muestro el span
    span.show().removeClass();
    //condiciones dentro de la función
    if(valor1 != valor2){
    span.text(negacion).addClass('negacion'); 
    }
    if(valor1.length==0 || valor1==""){
    span.text(vacio).addClass('negacion');  
    }
    if(valor1.length<6 || valor1.length>10){
    span.text(longitud).addClass('negacion');
    }
    if(valor1.length!=0 && valor1==valor2 && valor1.length>=6){
    $("#respuesta").html('<div class="check-list" style=""><span></span></div>');
    }


   }else{
    

    span.hide();
   }
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
