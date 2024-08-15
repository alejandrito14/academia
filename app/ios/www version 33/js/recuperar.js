function recuperar() {


	var pagina = "recuperacion.php";

	var usuario=$("#v_email").val();
	var datos='v_email='+usuario;

	$.ajax({
		type: 'POST',
		dataType: 'json',
		data: datos,
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		beforeSend: function() {
        // setting a timeout
        app.preloader.show();
    },
    success: function(datos){
    	app.preloader.hide();

    	var respuesta=datos.respuesta;

    	if (respuesta.idusuario>0) {
    		localStorage.setItem('email',respuesta.email);
        localStorage.setItem('usuario',respuesta.usuario);
        localStorage.setItem('celular',respuesta.celular);
        localStorage.setItem('id_user',respuesta.idusuario);
    		GoToPage("verificacion");

    	}else{

    		alerta('Celular no encontrado','');
    	}

    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
    	app.preloader.hide();

    	var error;
				  				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
							}
						});

}

function CargarBoton() {

  $$("#botoncontinuartoken").attr('onclick','VerificarToken()');
}
function VerificarToken1() {
    var token1=$("#t1").val();
    var token2=$("#t2").val();
    var token3=$("#t3").val();
    var token4=$("#t4").val();

    var tokeningresado=token1+token2+token3+token4;

  var email=localStorage.getItem('celular');
  var pagina = "verificacion.php";

  var datos='v_email='+email+"&token="+tokeningresado;

  $.ajax({
    type: 'POST',
    dataType: 'json',
    data: datos,
    url: urlphp+pagina,
    crossDomain: true,
    cache: false,
    beforeSend: function() {
        // setting a timeout
        app.preloader.show();

    },
    success: function(datos){
      app.preloader.hide();


      if (datos.respuesta.idusuario>0) {

      $("#botoncontinuartoken").css('display','block');
       

      }else{

        $("#botoncontinuartoken").css('display','none');

     //   alerta('Token no válido','');

      }


    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      app.preloader.hide();

      var error;
                  if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
                  if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
              }
            });

}

function VerificarToken() {
    var token1=$("#t1").val();
    var token2=$("#t2").val();
    var token3=$("#t3").val();
    var token4=$("#t4").val();
    var tokeningresado=token1+token2+token3+token4;
	var email=localStorage.getItem('celular');
	var pagina = "verificacion.php";

	var datos='v_email='+email+"&token="+tokeningresado;

	$.ajax({
		type: 'POST',
		dataType: 'json',
		data: datos,
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		beforeSend: function() {
        // setting a timeout
        app.preloader.show();

    },
    success: function(datos){
    	app.preloader.hide();


    	var respuesta=datos.respuesta;

    	if (respuesta.idusuario>0) {


    		GoToPage("cambiocontra");


    	}else{


    		alerta('Token no válido','');

    	}


    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
    	app.preloader.hide();

    	var error;
				  				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
							}
						});

}

function Reestablecercontra() {
	var contra1=$("#v_contra1").val();
	var contra2=$("#v_contra2").val();
	if (contra1!='' && contra2!='') {
		if (contra1==contra2) {
			var email=localStorage.getItem('celular');

			var pagina = "cambiocontra.php";

			var datos='v_email='+email+"&v_contra="+contra1;

			$.ajax({
				type: 'POST',
				dataType: 'json',
				data: datos,
				url: urlphp+pagina,
				crossDomain: true,
				cache: false,
				beforeSend: function() {
        // setting a timeout
        app.preloader.show();

    },
    success: function(datos){
    	app.preloader.hide();


    	var respuesta=datos.respuesta;


    	if (respuesta.idusuario>0) {

    		alerta('La contraseña se reestableció exitosamente','');
        EliminarVariables();
    		//GoToPage("/");


    	}else{


    		alerta('Falló al reestablecer contraseña','');

    	}



    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
    	app.preloader.hide();

    	var error;
				  				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
							}
						});



		}else{

			var negacion = "No coinciden las contraseñas";

			var span = $('#spanrespuesta');

			span.text(negacion); 

		}
	}else{
		    		alerta('No se permiten campos vacíos','');


	}

}

function ReenvioToken() {
	
	var pagina = "recuperacion.php";

	var usuario=localStorage.getItem('celular');
	var datos='v_email='+usuario;

	$.ajax({
		type: 'POST',
		dataType: 'json',
		data: datos,
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		beforeSend: function() {
        // setting a timeout
        app.preloader.show();

    },
    success: function(datos){
    	app.preloader.hide();

    	var respuesta=datos.respuesta;


    	if (respuesta.idusuario>0) {
    		localStorage.setItem('email',respuesta.email);

    		alerta('Se envió token de verificación','');

    	}else{


    		alerta('E-mail no encontrado','');

    	}



    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
    	app.preloader.hide();

    	var error;
				  				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
							}
						});
}



  var cambiar1=1;
  var cambiar2=1;

      function Contarletrasinput(elemento,classe) {

          var longitud=$("#"+elemento).val().length;
        if (longitud>0) {


          $("."+classe).css('display','block');
          $(".spanvisible").css('display','block');

        }else{

        $("."+classe).css('display','none');
         $(".spanvisible").css('display','none');

        }

      }


function CambiarAtributoinput(elemento) {



        if (cambiar1==1) {

           var valor= $('#'+elemento).val();
             $('#'+elemento).remove();
            var html=`<input type="text" name="v_clave" value="`+valor+`"  placeholder="Contraseña" id="v_clave" class="place input-with-value" style="width: 80%;" onkeyup="Contarletrasinput('v_clave','ojitoicono');">`;


            $(".cambiarinput").html(html);

          cambiar1=2;

        }else{
              
             var valor= $('#'+elemento).val();
             $('#'+elemento).remove();

            $(".cambiarinput").html(''); 

           var html=`<input type="password" name="v_clave"  value="`+valor+`" placeholder="Contraseña" id="v_clave" class="place input-with-value" style="width: 80%;" onkeyup="Contarletrasinput('v_clave','ojitoicono');">`;
           

            $(".cambiarinput").html(html); 
            cambiar1=1;
        }

        $("#v_clave").attr('onblur','Cambiar2(this);');
        $$('#v_clave').attr('onfocus',"Cambiar(this)");

        
      }



function CambiarAtributoinput2(elemento) {

        if (cambiar2==1) {

           var valor= $('#'+elemento).val();
             $('#'+elemento).remove();
            var html=`<input type="text" value="`+valor+`" name="v_contra2" placeholder="Confirmar contraseña" style="float: left;width: 80%;" id="v_contra2" onkeyup ="CoincidirContra('v_contra1','v_contra2');Aparecercruz('v_contra2','limpiar2','ojitoicono2');" class="place input-with-value">`;


            $(".cambiarinput2").html(html);

          cambiar2=2;

        }else{
              
             var valor= $('#'+elemento).val();
             $('#'+elemento).remove();

            $(".cambiarinput2").html(''); 

            var html=`<input type="password" value="`+valor+`" name="v_contra2" placeholder="Confirmar contraseña" style="float: left;width: 80%;" id="v_contra2" onkeyup ="CoincidirContra('v_contra1','v_contra2');Aparecercruz('v_contra2','limpiar2','ojitoicono2');" class="place input-with-value">`;
           

            $(".cambiarinput2").html(html); 
            cambiar2=1;
        }
        
          $$('#v_contra2').attr('onfocus',"Cambiar(this)");
         $$('#v_contra2').attr('onblur',"Cambiar2(this)");

      }

var cambiarvalor=1;
function CambiarAtributoinput3(elemento) {


        if (cambiarvalor==1) {

           var valor= $('#'+elemento).val();
             $('#'+elemento).remove();
            var html=` <input type="text" placeholder="" value="`+valor+`" class="text-align-center " onkeyup="Contarletrasinput('token','ojitoicon');" style="float: left;width: 90%" id="token" placeholder="000000">`;
            $(".cambiainputtoken").html(html);

         	 cambiarvalor=2;

        }else{
              
             var valor= $('#'+elemento).val();
             $('#'+elemento).remove();

            $(".cambiainputtoken").html(''); 

            var html=` <input type="password" placeholder="" value="`+valor+`" class="text-align-center " onkeyup="Contarletrasinput('token','ojitoicon');" style="float: left;width: 90%" id="token" placeholder="000000">`;
            $(".cambiainputtoken").html(html); 
            cambiarvalor=1;
        }
        

      }



function CambiarAtributoinput4(elemento) {

        if (cambiarvalor==1) {

           var valor= $('#'+elemento).val();
             $('#'+elemento).remove();
            var html=`<input type="text" value="`+valor+`" name="v_contra1" placeholder="Contraseña" style="float: left;width: 80%;" id="v_contra1" onkeyup ="Aparecercruz('v_contra1','limpiar','ojitoicono')" class="place input-with-value">`;


            $(".cambiarinput").html(html);

          cambiarvalor=2;

        }else{
              
             var valor= $('#'+elemento).val();
             $('#'+elemento).remove();

            $(".cambiarinput").html(''); 

            var html=`<input type="password" value="`+valor+`" name="v_contra1" placeholder="Contraseña" style="float: left;width: 80%;" id="v_contra1" onkeyup ="Aparecercruz('v_contra1','limpiar','ojitoicono')" class="place input-with-value">`;
           

            $(".cambiarinput").html(html); 
            cambiarvalor=1;
        }

         $$('#v_contra1').attr('onfocus',"Cambiar(this)");
         $$('#v_contra1').attr('onblur',"Cambiar2(this)");

        

      }


function CambiarAtributoinputpass(elemento) {



        if (cambiar1==1) {

           var valor= $('#'+elemento).val();
             $('#'+elemento).remove();
            var html=`<input type="text" name="v_contra1" value="`+valor+`"  placeholder="Contraseña" id="v_contra1" class="place input-with-value" style="width: 80%;" onkeyup="CoincidirContra('v_contra1','v_contra2');Contarletrasinput('v_contra1','ojitoicono');Aparecercruz('v_contra1','limpiar1','ojitoicono');AparecerBoton();">`;


            $(".cambiarinput").html(html);

          cambiar1=2;

        }else{
              
             var valor= $('#'+elemento).val();
             $('#'+elemento).remove();

            $(".cambiarinput").html(''); 

           var html=`<input type="password" name="v_contra1"  value="`+valor+`" placeholder="Contraseña" id="v_contra1" class="place input-with-value" style="width: 80%;" onkeyup="CoincidirContra('v_contra1','v_contra2');Contarletrasinput('v_contra1','ojitoicono');Aparecercruz('v_contra1','limpiar1','ojitoicono');AparecerBoton();">`;
           

            $(".cambiarinput").html(html); 
            cambiar1=1;
        }
        
         $("#v_contra1").attr('onblur','Cambiar2(this);');
         $$('#v_contra1').attr('onfocus',"Cambiar(this)");


      }

function CambiarAtributoinputpass2(elemento) {



        if (cambiar1==1) {

           var valor= $('#'+elemento).val();
             $('#'+elemento).remove();
            var html=`<input type="text" name="v_contra2" value="`+valor+`"  placeholder="Contraseña" id="v_contra2" class="place input-with-value" style="width: 80%;" onkeyup="CoincidirContra('v_contra1','v_contra2');Aparecercruz('v_contra2','spanvisible2','ojitoicono2');AparecerBoton();">`;


            $(".cambiarinput2").html(html);

          cambiar1=2;

        }else{
              
             var valor= $('#'+elemento).val();
             $('#'+elemento).remove();

            $(".cambiarinput2").html(''); 

           var html=`<input type="password" name="v_contra2"  value="`+valor+`" placeholder="Contraseña" id="v_contra2" class="place input-with-value" style="width: 80%;" onkeyup="CoincidirContra('v_contra1','v_contra2');Aparecercruz('v_contra2','spanvisible2','ojitoicono2');AparecerBoton();">`;
           

            $(".cambiarinput2").html(html); 
            cambiar1=1;
        }

          $("#v_contra2").attr('onblur','Cambiar2(this);');
          $$('#v_contra2').attr('onfocus',"Cambiar(this)");

        
      }

function Contarletrasinputpass(elemento,classe) {

          var longitud=$("#"+elemento).val().length;
        if (longitud>0) {


          $("."+classe).css('display','block');
          $(".spanvisible2").css('display','block');

        }else{

        $("."+classe).css('display','none');
         $(".spanvisible2").css('display','none');

        }

      }
function LimpiarElemento(elemento) {
  console.log(elemento);
  $("#"+elemento).val('');
  $("#span1").css('display','none');
  $(".spanvisible").css('display','none');
}
function LimpiarElemento2(elemento) {
  console.log(elemento);
  $("#"+elemento).val('');
  $("#span1").css('display','none');
  $(".limpiar").css('display','none');
}
function LimpiarElemento3(elemento) {
  console.log(elemento);
  $("#"+elemento).val('');
  $("#span2").css('display','none');
  $(".limpiar2").css('display','none');
}
function LimpiarElemento4(elemento) {
  $("#"+elemento).val('');
  $("#span2").css('display','none');
  $(".spanvisible2").css('display','none');
}
function Aparecercruz(elemento,clase,aparecer) {
            var longitud=$("#"+elemento).val().length;

  if (longitud>0) {
    $('.'+clase).css('display','block');
   $("."+aparecer).css('display','block');

  }else{
    
    $('.'+clase).css('display','none');
    $("."+aparecer).css('display','none');

  }
}

function EliminarVariables() {
  localStorage.removeItem('id_user');
  localStorage.removeItem('email');
  localStorage.removeItem('celular');
  GoToPage('login');
}

  function AparecerBoton() {
      var valor1=$("#v_contra1").val();
      var valor2=$("#v_contra2").val();
      if (valor1.length>0 && valor2.length>0) {
           if (valor1==valor2) {
          $$("#btncambiocontrase").css('display','block');

        }else{

        $$("#btncambiocontrase").css('display','none');

        }
      }else{
      
      $$("#btncambiocontrase").css('display','none');


      }
    }
