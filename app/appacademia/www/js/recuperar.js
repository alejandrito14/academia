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

    		GoToPage("verificacion");

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

function CargarBoton() {

  $$("#botoncontinuartoken").attr('onclick','VerificarToken()');
}
function VerificarToken1() {
    var token1=$("#t1").val();
    var token2=$("#t2").val();
    var token3=$("#t3").val();
    var token4=$("#t4").val();

    var tokeningresado=token1+token2+token3+token4;

  var email=localStorage.getItem('email');
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
	var email=localStorage.getItem('email');
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
			var email=localStorage.getItem('email');

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

    		GoToPage("/");


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
		    		alerta('Ingrese y confirme contraseña','');


	}

}

function ReenvioToken() {
	
	var pagina = "recuperacion.php";

	var usuario=localStorage.getItem('email');
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

        }else{

        $("."+classe).css('display','none');
   
        }

      }


function CambiarAtributoinput(elemento) {


        if (cambiar1==1) {

           var valor= $('#'+elemento).val();
             $('#'+elemento).remove();
            var html=`<input type="text" name="v_contra1" value="`+valor+`"  placeholder="Contraseña" id="v_contra1" class="place input-with-value" style="float: left;width: 80%;" onkeyup="CoincidirContra2('v_contra1','v_contra2');Contarletrasr('v_contra1','ojito1');">`;


            $(".cambiarinput").html(html);

          cambiar1=2;

        }else{
              
             var valor= $('#'+elemento).val();
             $('#'+elemento).remove();

            $(".cambiarinput").html(''); 

           var html=`<input type="password" name="v_contra1"  value="`+valor+`" placeholder="Contraseña" id="v_contra1" class="place input-with-value" style="float: left;width: 80%;" onkeyup="CoincidirContra2('v_contra1','v_contra2');Contarletrasr('v_contra1','ojito1');">`;
           

            $(".cambiarinput").html(html); 
            cambiar1=1;
        }
        

      }



function CambiarAtributoinput2(elemento) {

        if (cambiar2==1) {

           var valor= $('#'+elemento).val();
             $('#'+elemento).remove();
            var html=`<input type="text" value="`+valor+`" name="v_contra2" placeholder="Confirmar contraseña" style="float: left;width: 80%;" id="v_contra2" onkeyup ="CoincidirContra('v_contra1','v_contra2');Contarletrasr('v_contra2','ojito2');" class="place input-with-value">`;


            $(".cambiarinput2").html(html);

          cambiar2=2;

        }else{
              
             var valor= $('#'+elemento).val();
             $('#'+elemento).remove();

            $(".cambiarinput2").html(''); 

            var html=`<input type="password" value="`+valor+`" name="v_contra2" placeholder="Confirmar contraseña" style="float: left;width: 80%;" id="v_contra2" onkeyup ="CoincidirContra('v_contra1','v_contra2');Contarletrasr('v_contra2','ojito2');" class="place input-with-value">`;
           

            $(".cambiarinput2").html(html); 
            cambiar2=1;
        }
        

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


