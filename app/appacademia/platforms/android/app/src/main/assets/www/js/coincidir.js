  var confirmacion = "Las contraseñas si coinciden";
  var longitud = "La contraseña debe estar formada entre 6-10 carácteres";
  var negacion = "No coinciden las contraseñas";
  var vacio = "La contraseña no puede estar vacía";

function CoincidirContra(contra1,contra2) {

  var pass1 = $('#'+contra1);
  var pass2 = $('#'+contra2);


  //función que comprueba las dos contraseñas
 
  //ejecuto la función al soltar la tecla
  pass2.keyup(function(){
  coincidePassword(contra1,contra2);
  });


  /* pass1.keyup(function(){

    if (pass2.length>0) {

       coincidePassword(contra1,contra2);
    }
 
  });*/


}

function CoincidirContra2(contra1,contra2) {

  var pass1 = $('#'+contra1);
  var pass2 = $('#'+contra2);




   pass1.keyup(function(){

    if (pass2.length>0) {

       coincidePassword2(contra1,contra2);
    }
 
  });


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


  function coincidePassword2(contra1,contra2){


  var respuesta=$("#respuesta").html('<span id="spanrespuesta"></span>');

  var span = $('#spanrespuesta');


  var valor1 = $('#'+contra1).val();
  var valor2 = $('#'+contra2).val();


  if (valor1.length>0) {
  //muestro el span
    span.show().removeClass();
    //condiciones dentro de la función
    if(valor1 != valor2){
  //  span.text(negacion).addClass('negacion'); 
    }
    if(valor1.length==0 || valor1==""){
/*    span.text(vacio).addClass('negacion');  
*/    }
    if(valor1.length<6 || valor1.length>10){
    span.text(longitud).addClass('negacion');
    }
    if(valor1.length!=0 && valor1==valor2 && valor1.length>=6){
   // span.text(confirmacion).removeClass("negacion").addClass('confirmacion');

    $("#respuesta").html('<div class="check-list" style=""><span></span></div>');
    }


   }else{
    

    span.hide();
   }
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

function round(num, decimales = 2) {
    var signo = (num >= 0 ? 1 : -1);
    num = num * signo;
    if (decimales === 0) //con 0 decimales
        return signo * Math.round(num);
    // round(x * 10 ^ decimales)
    num = num.toString().split('e');
    num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
    // x * 10 ^ (-decimales)
    num = num.toString().split('e');
    return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
}