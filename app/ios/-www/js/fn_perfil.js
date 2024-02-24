function Cargardatospersonales(argument) {


	var pagina = "Obtenerdatospersonales.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		success: function(datos){
			var respuesta=datos.respuesta;
			
			PintardatosU(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}
function PintardatosU(respuesta) {
	$$("#v_nombre").val(respuesta.nombre);
	$$("#v_nombre").addClass('input-with-value');
	$$(".linombre").addClass('item-input-with-value');

	$$(".spnombre").text(respuesta.nombre+' '+respuesta.paterno+' '+respuesta.materno);
	
	$$(".sptelefono").text(respuesta.celular);

	$$("#v_paterno").val(respuesta.paterno);
	$$("#v_paterno").addClass('input-with-value');
	$$(".lipaterno").addClass('item-input-with-value');

	$$("#v_materno").val(respuesta.materno);
	$$("#v_materno").addClass('input-with-value');
	$$(".limaterno").addClass('item-input-with-value');

	$$("#v_fecha").val(respuesta.fechanacimiento);
	$$("#v_fecha").addClass('input-with-value');
	$$(".lifechanacimiento").addClass('item-input-with-value');

	$$("#telefono").html('<span style="color:white;">'+respuesta.celular+'</span>');
	if (respuesta.sexo=='H') {


	$("#txtsexoh").addClass('seleccionadotipo');

	}
	if (respuesta.sexo=='M') {

	$("#txtsexom").addClass('seleccionadotipo');

	}

				$(".datosregistro").css('display','none');
				/*$("#v_nombre").attr('disabled',true);
				$("#v_paterno").attr('disabled',true);
				$("#v_materno").attr('disabled',true);
				$("#v_fecha").attr('disabled',true);
				$("#v_sexo").attr('disabled',true);
				$("#v_correo").attr('disabled',true);*/
}

var contadorcontra=0;
function Datosacceso() {
	var iduser = localStorage.getItem("id_user");
	var usuario= localStorage.getItem("usuario");
	var pagina = "VerificarUsuarioContra.php";

	//$("input[name='dialog-password']").attr('placeholder','Contraseña');

	app.dialog.password('','Confirma tu contraseña', function (username, coincidePassword) {
		var pass=$(".dialog-input").val();
		var datos="idusuario="+iduser+"&usuario="+usuario+"&password="+pass;

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,

		success: function(datos){
			var d=datos.respuesta;

			usuariovalidado=d.existe;

			if (usuariovalidado==1) {

				if (contadorcontra<3) {
				alerta('','Contraseña incorrecta');
				
				}else{
 
				alerta('','Recuperar contraseña');
				  GoToPage("forgotpassword");


				}

				contadorcontra++;

			}else{
					contadorcontra=1;
				    GoToPage("datosacceso");


			}
			


		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});

        },function (username, password) {
			
        }
        );

		$(".dialog-input").attr("placeholder", " ");

}

function EliminarCuenta(argument) {

	AbrirModalEliminarCuenta();
	

       // },function (username, password) {
			
        //});

		//$(".dialog-input").attr("placeholder", " ");

}

function AbrirModalEliminarCuenta() {
	 var aviso='<p class="'+estiloparrafo+'" style="color: rgb(199, 170, 106);text-align: center;">Para eliminar su cuenta, por favor, confirme su contraseña</p>';
	     //aviso+='<p>¿Seguro que desea eliminar la cuenta?';

  var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 70%;background: black;">
           
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px; ">
               <div class="iconocerrar link sheet-close" style="z-index:10;">
               <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5188 4.48126C23.4385 2.4011 20.788 0.984547 17.9026 0.410715C15.0171 -0.163118 12.0264 0.131546 9.30839 1.25744C6.59043 2.38334 4.26736 4.28991 2.63294 6.73606C0.998525 9.18221 0.12616 12.0581 0.12616 15C0.12616 17.9419 0.998525 20.8178 2.63294 23.264C4.26736 25.7101 6.59043 27.6167 9.30839 28.7426C12.0264 29.8685 15.0171 30.1631 17.9026 29.5893C20.788 29.0155 23.4385 27.5989 25.5188 25.5188C26.9003 24.1375 27.9961 22.4976 28.7437 20.6928C29.4914 18.888 29.8762 16.9535 29.8762 15C29.8762 13.0465 29.4914 11.1121 28.7437 9.30724C27.9961 7.50242 26.9003 5.86255 25.5188 4.48126ZM20.3126 18.7613C20.4187 18.8606 20.5034 18.9808 20.5612 19.1142C20.6191 19.2476 20.6489 19.3915 20.6489 19.5369C20.6489 19.6823 20.6191 19.8262 20.5612 19.9596C20.5034 20.093 20.4187 20.2131 20.3126 20.3125C20.2133 20.411 20.0956 20.4889 19.9661 20.5418C19.8367 20.5946 19.698 20.6214 19.5582 20.6206C19.2795 20.6195 19.0124 20.5088 18.8145 20.3125L15.0001 16.4981L11.2388 20.3125C11.0409 20.5088 10.7738 20.6195 10.4951 20.6206C10.3553 20.6214 10.2166 20.5946 10.0872 20.5418C9.95773 20.4889 9.83999 20.411 9.74071 20.3125C9.54282 20.1134 9.43174 19.8441 9.43174 19.5634C9.43174 19.2827 9.54282 19.0135 9.74071 18.8144L13.502 15L9.74071 11.2388C9.56665 11.0355 9.47569 10.774 9.48602 10.5066C9.49635 10.2392 9.6072 9.98557 9.79642 9.79635C9.98565 9.60712 10.2393 9.49627 10.5067 9.48594C10.7741 9.47561 11.0356 9.56657 11.2388 9.74063L15.0001 13.5019L18.7613 9.74063C18.8597 9.63878 18.9772 9.55729 19.107 9.50083C19.2369 9.44437 19.3766 9.41404 19.5182 9.41158C19.6598 9.40911 19.8004 9.43456 19.9322 9.48646C20.0639 9.53836 20.1842 9.6157 20.286 9.71407C20.3879 9.81244 20.4694 9.9299 20.5258 10.0598C20.5823 10.1896 20.6126 10.3293 20.6151 10.4709C20.6175 10.6125 20.5921 10.7532 20.5402 10.8849C20.4883 11.0167 20.411 11.1369 20.3126 11.2388L16.4982 15L20.3126 18.7613Z" fill="#AAAAAA"></path>
            </svg>
                       </div>
              <div class="page-content" style="height: 100%;">
                <div style="background: black; height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <span class="titulomodal cambiarfuente" style="font-size: 20px;text-align: center;font-weight: 600;color: #c7aa6a;"></span>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:1em;width: 100%;">
                
                       
                        `;

             

         html+=`
         <div class="row" style="margin-left: 2em;margin-right: 2em;margin-top:20px;">
         <div class="col-100">
         <p class="cambiarfuente cambiarfuente2" style="color: #c7aa6a;font-size: 30px;text-align: center;line-height: 1;" class="cambiarfuente `+estiloparrafo+`">`+aviso+`</p>
         </div>

         <div class="col-100" style="">
          <div class="form-elements" style="margin-top: 1em;">
          <form style="">
            <div class="list form-list no-margin margin-bottom">
                <ul class="cambiarfuente">


                   <li class="item-content item-input item-input-with-value is-valid linombre">
               

                  <div class="item-inner">
                 <div class="item-title item-label" style="    color: #9c9c9c;font-size: 18px;"></div>
                  <div class="item-input-wrap">
                                        
                  <input type="password" name="v_contra" id="v_contra" class="input-with-value form-control" placeholder="Contraseña" style="font-size: 20px;" />
    
                </div>
              </div>
              </li>

              </ul>
              </div>

              </form>
              </div>
                          </div>

                          </div>

                          <div class="row margin-bottom " style="    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-100" style="">
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="RealizarEliminacion()">Aceptar</button>
                            </div>

                         
                          </div>


                      </div>

                  </div>

                </div>
                
              </div>
            </div>
          </div>`;
          /*<p><button class="button color-theme btncortesias" id="cortesia_`+respuesta[i].idcortesia+`" onclick="ElegirCortesia(`+idcarrito+`,`+respuesta[i].idcortesia+`)" style="background: white;color:black;padding: 10px 20px;">
                                        Elegir
                                       </button>
                                     </p>*/
    dynamicSheet1 = app.sheet.create({
        content: html,

      swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
           $(".cambiarfuente2").css('display','none');
            

          },
          opened: function (sheet) {
            console.log('Sheet opened');

            if (tipoletra!='') {
              $(".cambiarfuente").addClass(tipoletra);
            }
          $(".cambiarfuente2").css('display','block');

          },
        }
      });

       dynamicSheet1.open();

}

function RealizarEliminacion(pass) {
	var iduser = localStorage.getItem("id_user");
	var usuario= localStorage.getItem("usuario");
	var pagina = "EliminarCuenta.php";
		pass=$("#v_contra").val();
	//$("input[name='dialog-password']").attr('placeholder','Contraseña');
		if (pass!='') {
	 //app.dialog.password('Confirma tu contraseña','Eliminar cuenta', function (username, coincidePassword) {
		var datos="idusuario="+iduser+"&usuario="+usuario+"&password="+pass;

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,

		success: function(res){
			var d=res.respuesta;
			var encontrado=res.encontrado;
			dynamicSheet1.close();

			if (encontrado==1) {

				aviso="Se ha eliminado la cuenta";
				AbrirModalAviso(aviso);
			//	alerta('','Se ha eliminado la cuenta');
				var id = localStorage.getItem("id_user");
    
				localStorage.setItem('session',0);
				localStorage.setItem('pregunta',0);
				localStorage.removeItem('datosextras');
				localStorage.removeItem("nombre");
				localStorage.removeItem("paterno");
				localStorage.removeItem("materno");
				localStorage.removeItem('tipoUsuario');
				localStorage.removeItem('correo');
				localStorage.setItem("foto", '');
				localStorage.removeItem("idopcionespedido");
				localStorage.removeItem("iddireccion");
				localStorage.removeItem("correo");
				localStorage.removeItem("passwordisuoder");
				localStorage.removeItem("id_user");

				GoToPage("/");
			}else{

				var aviso="Contraseña incorrecta";
				AbrirModalAviso(aviso);

			}


		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});

	}else{

		dynamicSheet1.close();
		var aviso="Es necesario ingresar la contraseña para continuar";
		AbrirModalAviso(aviso);
	}
}

function ObtenerdatosAcceso2() {
	var pagina = "Obtenerdatospersonales.php";
	var iduser=localStorage.getItem('id_user');
	var datos="id_user="+iduser;

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){

			PintarDatosAcceso2(datos.respuesta);


		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
				//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
				console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}
function PintarDatosAcceso2(datos) {
	$("#v_usuario").val(datos.usuario);
	$("#v_correo").val(datos.email);
	$("#v_contra1").val(datos.clave);
    $("#v_contra2").val(datos.clave);
    $("#v_tipousuario").val(datos.tipo);
    $("#v_tipousuario").attr('disabled',true);

    $$("#v_correo").addClass('input-with-value');
	$$(".licorreo").addClass('item-input-with-value');

    $$("#v_usuario").addClass('input-with-value');
	$$(".liusuario").addClass('item-input-with-value');

	$$("#v_contra1").addClass('input-with-value');
	$$(".licontra1").addClass('item-input-with-value');

	$$("#v_contra2").addClass('input-with-value');
	$$(".licontra2").addClass('item-input-with-value');

    /*$("#span1").css('display','block');
    $("#span2").css('display','block');
 	$(".datocorreo").css('display','none');*/

	//$("#v_correo").attr('disabled',true);

}


function GuardarDatosacceso(argument) {


	$(".licontra1").removeClass('is-invalid');
	$(".licontra2").removeClass('is-invalid');

	$(".licontra1").addClass('is-valid');
	$(".licontra2").addClass('is-valid');

	var v_email=$("#v_correo").val();
	var v_contra1=$("#v_contra1").val();
	var v_contra2=$("#v_contra2").val();
	var v_usuario=$("#v_usuario").val();
	//var datos="iduser="+iduser+"&v_nombre="+v_nombre+"&v_paterno="+v_paterno+"&v_materno="+v_materno+"&v_sexo="+v_sexo+"&v_telefono="+v_telefono+"&v_email="+v_email;
	var iduser=localStorage.getItem('id_user');
	var datos="iduser="+iduser+"&v_email="+v_email+"&v_contra1="+v_contra1+"&v_usuario="+v_usuario;
	var pagina = "Actualizarclienteacceso.php";

	var msj="";
	var bandera=1;


	if (v_email=='') {
		email1='Campo requerido';
		bandera=0;
	}

	if (v_contra1=='') {
		contra1='Campo requerido';
		bandera=0;
	}

	if (v_contra2=='') {
		contra1='Campo requerido';
		bandera=0;
	}




	if (v_contra1!=v_contra2) {
		bandera=0;
			coincidePassword('v_contra1','v_contra2');
	}

	
	


	if (bandera==1) {

		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: urlphp+pagina,
			data: datos,
			crossDomain: true,
			cache: false,
			beforeSend: function() {
        // setting a timeout
        app.preloader.show();

    },
    success: function(datos){
    	app.preloader.hide();


    	var respuesta=datos.respuesta;

    	if(respuesta.respuesta == 1)
    	{


    		localStorage.setItem("id_user", respuesta.idusuario);
    		localStorage.setItem("correo", respuesta.usuario);
    		localStorage.setItem("passwordisuoder",respuesta.contra);

    		GoToPage("profile");
    		alerta('Se actualizaron los datos de acceso correctamente','');
										//obtener_token();
			}


			if (respuesta.respuesta == 2) {

    		alerta('No se actualizarón los datos ,el correo ya se encuentra registrado','');


			}
								
								
							},error: function(XMLHttpRequest, textStatus, errorThrown){ 
								app.preloader.hide();

								alert('Error de conexión');
								var error;
				  				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
							}
						});
	
	}else{



		if (v_email=='') {
			email1='Campo requerido';
			bandera=0;
			

		}

		if (v_contra1=='') {
			contra1='Campo requerido';
			bandera=0;
		$(".licontra1").addClass('is-invalid');


		}
		if (v_contra2=='') {
			contra2='Campo requerido';
			bandera=0;
		$(".licontra2").addClass('is-invalid');

		}

	

		if (v_contra1!=v_contra2) {
			bandera=0;

			coincidePassword('v_contra1','v_contra2');
			$(".licontra1").addClass('is-invalid');
			$(".licontra2").addClass('is-invalid');
		}



			if (bandera==0) {

				alerta('','Campos obligatorios vacíos');
			}



	}
}

function CargarCompanias() {
	var pagina = "ObtenerCompanias.php";

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		async:false,
		success: function(datos){

			PintarCompanias(datos.respuesta);


		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
				//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
				console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}

function PintarCompanias(respuesta) {
	var html="";
	html+=`<option value="0">Selecciona compañia</option>`;
	if (respuesta.length>0) {
		for (var i = 0; i < respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].idcompaniaseguro+`">`+respuesta[i].nombre+`</option>`;

		}

		$("#v_companias").html(html);


	}
}

function GuardarDatosEmergencia() {
	$(".linombree").removeClass('is-invalid');
	$(".linumero1").removeClass('is-invalid');
	$(".linumero2").removeClass('is-invalid');
	$(".lialergias").removeClass('is-invalid');
	$(".lialergias").removeClass('is-invalid');
	$(".lipatologias").removeClass('is-invalid');
	$(".litiposangre").removeClass('is-invalid');
	$(".lipoliza").removeClass('is-invalid');
	$(".licompanias").removeClass('is-invalid');
	$(".lipoliticas").css('color','black');
	$(".lidatos").css('color','black');

	$(".linombree").addClass('is-valid');
	$(".linumero1").addClass('is-valid');
	$(".linumero2").addClass('is-valid');
	$(".lialergias").addClass('is-valid');
	$(".lialergias").addClass('is-valid');
	$(".lipatologias").addClass('is-valid');
	$(".litiposangre").addClass('is-valid');
	$(".lipoliza").addClass('is-valid');
	$(".licompanias").addClass('is-valid');

	var nombre=$("#v_nombrec").val();
	var numero1=$("#v_numero1").val();
	var numero2=$("#v_numero2").val();
	var alergias=$("#v_alergias").val();
	var patologia=$("#v_patologia").val();
	var sangre=$("#v_sangre").val();
	var poliza=$("#v_poliza").val();
	var compania=$("#v_companias").val();

	var inputleido=0;
	var inputleido2=0;

	if ($("#inputleido").is(':checked')) {
		inputleido=1;
	}

	if ($("#inputleido2").is(':checked')) {
		inputleido2=1;
	}

	var bandera=1;

	if (inputleido==0) {
		bandera=0;
	}
	if (inputleido2==0) {
		bandera=0;
	}
	if (nombre=='') {
		bandera=0;
	}

	if(numero1==''){
		bandera=0;
	}
	if(numero2==''){
		bandera=0;
	}
	if(alergias==''){
		bandera=0;
	}
	if(patologia==''){
		bandera=0;
	}
	if(sangre==''){
		bandera=0;
	}
	if(poliza==''){
		bandera=0;
	}
	if(compania==''){
		bandera=0;
	}

	if(compania==0){
		bandera=0;
	}

	if (bandera==1) {
		var v_id=$("#v_id").val();
		var idusuario=localStorage.getItem('id_user');
		var datos="idusuario="+idusuario+"&v_id="+v_id+"&v_nombre="+nombre+"&v_numero1="+numero1+"&v_numero2="+numero2+"&v_alergias="+alergias+"&v_patologia="+patologia+"&v_sangre="+sangre+"&v_poliza="+poliza+"&v_compania="+compania+"&v_inputleido="+inputleido+"&v_inputleido2="+inputleido2;

			var pagina = "Guardardatosemergencia.php";

				$.ajax({
				type: 'POST',
				dataType: 'json',
				url: urlphp+pagina,
				data:datos,
				async:false,
				success: function(msj){

					GoToPage("profile");
    				alerta('Se actualizaron los datos de emergencia correctamente','');
								


				},error: function(XMLHttpRequest, textStatus, errorThrown){ 
					var error;
						if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
						//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
						console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
				}

			});

			}else{

				if (nombre=='') {
					bandera=0;
					$(".linombree").addClass('is-invalid');

				}

				if(numero1==''){
					bandera=0;
				$(".linumero1").addClass('is-invalid');

				}
				if(numero2==''){
					bandera=0;
				$(".linumero2").addClass('is-invalid');

				}
				if(alergias==''){
					bandera=0;
				$(".lialergias").addClass('is-invalid');

				}
				if(patologia==''){
					bandera=0;
				$(".lipatologias").addClass('is-invalid');

				}
				if(sangre==''){
					bandera=0;
				$(".litiposangre").addClass('is-invalid');

				}
				if(poliza==''){
					bandera=0;
				$(".lipoliza").addClass('is-invalid');

				}
				if(compania==''){
					bandera=0;
				$(".licompanias").addClass('is-invalid');

				}

				if(compania==0){
				$(".licompanias").addClass('is-invalid');
					}

			if (inputleido==0) {
				bandera=0;
			$(".lipoliticas").css('color','red');

			}
			if (inputleido2==0) {
				bandera=0;
			$(".lidatos").css('color','red');

			}

			if (bandera==0) {
				alerta('','Campos obligatorios vacíos');
			}
		}
}

function Cargardatosemergencia() {
	var idusuario=localStorage.getItem('id_user');
		var datos="idusuario="+idusuario;
			var pagina = "Obtenerdatosemergencia.php";

				$.ajax({
				type: 'POST',
				dataType: 'json',
				url: urlphp+pagina,
				data:datos,
				async:false,
				success: function(msj){

					console.log(msj.respuesta[0]);
					if (msj.respuesta.length>0) {
						Pintardatosemergencia(msj.respuesta[0]);
					}
					
				},error: function(XMLHttpRequest, textStatus, errorThrown){ 
					var error;
						if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
						//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
						console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
				}

			});
}

function Pintardatosemergencia(respuesta) {
	$("#v_id").val(respuesta.idusuariodatosemergencia);
	$("#v_nombrec").val(respuesta.nombrecontacto);
	$("#v_numero1").val(respuesta.numeroemergencia);
	$("#v_numero2").val(respuesta.numeroemergencia2);
	$("#v_alergias").val(respuesta.alergias);
	$("#v_patologia").val(respuesta.patologias);
	$("#v_sangre").val(respuesta.tiposangre);
	$("#v_poliza").val(respuesta.poliza);
	$("#v_companias").val(respuesta.idcompaniaseguro);

	if (respuesta.aceptopoliticas==1) {
		$("#inputleido").attr('checked',true);	
	}

	if (respuesta.datosverdaderos==1) {
		$("#inputleido2").attr('checked',true);	
	
	}
	

}



function GuardarDatosSalud() {
	
	$(".liestatura").removeClass('is-invalid');
	$(".lipeso").removeClass('is-invalid');
	$(".lipatologia").removeClass('is-invalid');
	$(".licirugia").removeClass('is-invalid');
	$(".lialergia").removeClass('is-invalid');
	$(".liortopedico").removeClass('is-invalid');
	$(".limedicamento").removeClass('is-invalid');
	$(".lipoliticas").css('color','black');
	$(".lidatos").css('color','black');

	$(".liestatura").addClass('is-valid');
	$(".lipeso").addClass('is-valid');
	$(".lipatologia").addClass('is-valid');
	$(".licirugia").addClass('is-valid');
	$(".lialergia").addClass('is-valid');
	$(".liortopedico").addClass('is-valid');
	$(".limedicamento").addClass('is-valid');
	$(".lipoliticas").addClass('is-valid');
	$(".lidatos").addClass('is-valid');

	var estatura=$("#v_estatura").val();
	var peso=$("#v_peso").val();
	var patologia=$("#v_patologias").val();
	var alergia=$("#v_alergias").val();
	var cirugia=$("#v_cirugias").val();
	var ortopedico=$("#v_ortopedicos").val();
	var medicamento=$("#v_medicamentos").val();

	var inputleido=0;
	var inputleido2=0;

	if ($("#inputleido").is(':checked')) {
		inputleido=1;
	}

	if ($("#inputleido2").is(':checked')) {
		inputleido2=1;
	}

	var bandera=1;

	if (inputleido==0) {
		bandera=0;
	}
	if (inputleido2==0) {
		bandera=0;
	}
	if (estatura=='') {
		bandera=0;
	}

	if(peso==''){
		bandera=0;
	}
	


	if (bandera==1) {
		var v_id=$("#v_idsalud").val();
		var idusuario=localStorage.getItem('id_user');
		var datos="idusuario="+idusuario+"&v_id="+v_id+"&v_estatura="+estatura+"&v_peso="+peso+"&v_patologia="+patologia+"&v_alergia="+alergia+"&v_cirugia="+cirugia+"&v_ortopedico="+ortopedico+"&v_medicamento="+medicamento+"&v_inputleido="+inputleido+"&v_inputleido2="+inputleido2;
			var pagina = "GuardarDatosSalud.php";

				$.ajax({
				type: 'POST',
				dataType: 'json',
				url: urlphp+pagina,
				data:datos,
				async:false,
				success: function(msj){

					GoToPage("profile");
    				alerta('Se actualizaron los datos de salud correctamente','');
								


				},error: function(XMLHttpRequest, textStatus, errorThrown){ 
					var error;
						if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
						//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
						console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
				}

			});

			}else{

				if (estatura=='') {
					bandera=0;
					$(".liestatura").removeClass('is-valid');

					$(".liestatura").addClass('is-invalid');

				}

			if(peso==''){
					bandera=0;
				$(".lipeso").removeClass('is-valid');

				$(".lipeso").addClass('is-invalid');

				}
				

				if (inputleido==0) {
					bandera=0;
				$(".lipoliticas").css('color','red');

				}
				if (inputleido2==0) {
					bandera=0;
				$(".lidatos").css('color','red');

				}

			if (bandera==0) {
				alerta('','Campos obligatorios vacíos');
			}
		}
}


function Cargardatossalud() {
	var idusuario=localStorage.getItem('id_user');
		var datos="idusuario="+idusuario;
			var pagina = "Obtenerdatossalud.php";

				$.ajax({
				type: 'POST',
				dataType: 'json',
				url: urlphp+pagina,
				data:datos,
				async:false,
				success: function(msj){

					console.log(msj.respuesta[0]);
					if (msj.respuesta.length>0) {
						Pintardatossalud(msj.respuesta[0]);
					}
					
				},error: function(XMLHttpRequest, textStatus, errorThrown){ 
					var error;
						if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
						//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
						console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
				}

			});
}

function Pintardatossalud(respuesta) {
	
	$("#v_idsalud").val(respuesta.idusuariodatosalud);
	$("#v_estatura").val(respuesta.estatura);
	$("#v_peso").val(respuesta.peso);
	$("#v_patologias").val(respuesta.patologias);
	$("#v_cirugias").val(respuesta.cirugias);
	$("#v_alergias").val(respuesta.alergias);
	$("#v_ortopedicos").val(respuesta.ortopedicos);
	$("#v_medicamentos").val(respuesta.medicamentos);


	if (respuesta.aceptopoliticas==1) {
		$("#inputleido").attr('checked',true);	
	}

	if (respuesta.datosverdaderos==1) {
		$("#inputleido2").attr('checked',true);	
	
	}
	
}


function AbrirModalAlias() {
	
	
       var html=`
         
              <div class="block">
               <div class="row" style="">

                </div>

                <div class="row" style="padding-top:1em;">
                	<label style="font-size:16px;padding:1px;">Modificar alias:</label>
                	<input type="text" name="txtalias" id="txtalias"  />
                </div>
              </div>
           
         
        `;
       app.dialog.create({
          title: 'Alias',
          //text: 'Dialog with vertical buttons',
          content:html,
          buttons: [
            {
              text: 'Cancelar',
            },
            {
              text: 'Guardar',
            },
            
          ],

           onClick: function (dialog, index) {
                    if(index === 0){
              
          }
          else if(index === 1){
                GuardarAlias();
              
            }
           },

          verticalButtons: false,
        }).open();
		
}
function GuardarAlias() {
	var txtalias=$("#txtalias").val();
	var pagina="ModificarAlias.php";
	var iduser=localStorage.getItem('id_user');
	var datos="alias="+txtalias+"&id_user="+iduser;
		$.ajax({
				type: 'POST',
				dataType: 'json',
				url: urlphp+pagina,
				data:datos,
				async:false,
				success: function(msj){

					if (msj.respuesta==1) {
						$(".nombreusuario").text(txtalias);
						localStorage.setItem('alias',txtalias);
						app.dialog.close();
					}
					
				},error: function(XMLHttpRequest, textStatus, errorThrown){ 
					var error;
						if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
						//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
						console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
				}

			});

}

function VerificarAsociacion() {
	
	var pagina = "Obtenerdependencia.php";
	var iduser=localStorage.getItem('id_user');
	var datos="id_user="+iduser;

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){

			if (datos.respuesta==1) {
				$(".coltutorados").css('display','block');
				$("#btnasociados").attr("onclick","GoToPage('datosdependencia')")

			}else{
				$(".coltutorados").css('display','block');
				$("#btnasociados").attr("onclick","GoToPage('registroasociados')")
				$("#btntutorado").attr("onclick","GoToPage('registrotutorados')")

			}

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
				//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
				console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});

}

function Visualizarmenu() {
	var tiposusuario=localStorage.getItem('idtipousuario');
	
	if (tiposusuario==6) {
		$(".licitas").css('display','none');
		$(".limiscompras").css('display','none');
		$(".licitas").css('display','none');
		$(".liperfil").css('display','none');
		$(".lisalir").css('display','');
		$(".limonedero").css('display','none');
		$(".lilogin").css('display','');
		$(".linegocios").css('display','');


	}

	if (tiposusuario==3) {


		$(".limiscompras").css('display','');
		$(".licitas").css('display','');
		$(".liperfil").css('display','');
		$(".lisalir").css('display','');
		$(".limonedero").css('display','');
		$(".lilogin").css('display','none');


	}
	if (tiposusuario==5) {
		$(".linegocios").css('display','none');

		$(".limiscompras").css('display','none');
		$(".licitas").css('display','none');
		$(".liperfil").css('display','none');
		$(".lisalir").css('display','');
		$(".lilogin").css('display','none');
		$(".limonedero").css('display','none');

		
	}

	if (tiposusuario==0) {
		$(".linegocios").css('display','none');
		$(".limiscompras").css('display','none');
		$(".licitas").css('display','none');
		$(".liperfil").css('display','none');
		$(".lisalir").css('display','');
		$(".limonedero").css('display','none');
		$(".lilogin").css('display','none');

	}

}

function AbrirModalPreguntaSesion(argument) {
	
  var html2="";
  
var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 70%;background: black;">
           
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px; ">
               <div class="iconocerrar link sheet-close" style="z-index:10;">
               <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5188 4.48126C23.4385 2.4011 20.788 0.984547 17.9026 0.410715C15.0171 -0.163118 12.0264 0.131546 9.30839 1.25744C6.59043 2.38334 4.26736 4.28991 2.63294 6.73606C0.998525 9.18221 0.12616 12.0581 0.12616 15C0.12616 17.9419 0.998525 20.8178 2.63294 23.264C4.26736 25.7101 6.59043 27.6167 9.30839 28.7426C12.0264 29.8685 15.0171 30.1631 17.9026 29.5893C20.788 29.0155 23.4385 27.5989 25.5188 25.5188C26.9003 24.1375 27.9961 22.4976 28.7437 20.6928C29.4914 18.888 29.8762 16.9535 29.8762 15C29.8762 13.0465 29.4914 11.1121 28.7437 9.30724C27.9961 7.50242 26.9003 5.86255 25.5188 4.48126ZM20.3126 18.7613C20.4187 18.8606 20.5034 18.9808 20.5612 19.1142C20.6191 19.2476 20.6489 19.3915 20.6489 19.5369C20.6489 19.6823 20.6191 19.8262 20.5612 19.9596C20.5034 20.093 20.4187 20.2131 20.3126 20.3125C20.2133 20.411 20.0956 20.4889 19.9661 20.5418C19.8367 20.5946 19.698 20.6214 19.5582 20.6206C19.2795 20.6195 19.0124 20.5088 18.8145 20.3125L15.0001 16.4981L11.2388 20.3125C11.0409 20.5088 10.7738 20.6195 10.4951 20.6206C10.3553 20.6214 10.2166 20.5946 10.0872 20.5418C9.95773 20.4889 9.83999 20.411 9.74071 20.3125C9.54282 20.1134 9.43174 19.8441 9.43174 19.5634C9.43174 19.2827 9.54282 19.0135 9.74071 18.8144L13.502 15L9.74071 11.2388C9.56665 11.0355 9.47569 10.774 9.48602 10.5066C9.49635 10.2392 9.6072 9.98557 9.79642 9.79635C9.98565 9.60712 10.2393 9.49627 10.5067 9.48594C10.7741 9.47561 11.0356 9.56657 11.2388 9.74063L15.0001 13.5019L18.7613 9.74063C18.8597 9.63878 18.9772 9.55729 19.107 9.50083C19.2369 9.44437 19.3766 9.41404 19.5182 9.41158C19.6598 9.40911 19.8004 9.43456 19.9322 9.48646C20.0639 9.53836 20.1842 9.6157 20.286 9.71407C20.3879 9.81244 20.4694 9.9299 20.5258 10.0598C20.5823 10.1896 20.6126 10.3293 20.6151 10.4709C20.6175 10.6125 20.5921 10.7532 20.5402 10.8849C20.4883 11.0167 20.411 11.1369 20.3126 11.2388L16.4982 15L20.3126 18.7613Z" fill="#AAAAAA"></path>
            </svg>
                       </div>
              <div class="page-content" style="height: 100%;">
                <div style="background: black; height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <span class="titulomodal cambiarfuente" style="font-size: 20px;
    text-align: center;
    font-weight: 600;
    color: #c7aa6a;"></span>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:1em;width: 100%;">
                
                       
                        `;

                       
                          
                          
                      

                          html+=`
                          <div class="row" style="margin-left: 2em;margin-right: 2em;margin-top:20px;">
                          <div class="col-100">
                          <p  style="color: #c7aa6a;text-align: center;" class="cambiarfuente `+estiloparrafo+`">¿Desea mantener la sesión activa?</p>
                          <p  style="color: #c7aa6a;text-align: center;" class="cambiarfuente `+estiloparrafo+`"></p>
                          </div>

                          </div>

                          <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-50">
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="MantenesSession()">Si</button>
                            </div>

                            <div class="col-50">
                            <button style="background: white;color:black;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="NoMantenersesion()">No</button>
                            </div>
                          </div>


                      </div>

                  </div>

                </div>
                
              </div>
            </div>
          </div>`;
          /*<p><button class="button color-theme btncortesias" id="cortesia_`+respuesta[i].idcortesia+`" onclick="ElegirCortesia(`+idcarrito+`,`+respuesta[i].idcortesia+`)" style="background: white;color:black;padding: 10px 20px;">
                                        Elegir
                                       </button>
                                     </p>*/
    dynamicSheet1 = app.sheet.create({
        content: html,

      swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
           idcortesiaelegida=0;
            

          },
          opened: function (sheet) {
            console.log('Sheet opened');

          
          },
        }
      });

       dynamicSheet1.open();

}



function MantenesSession(argument) {
	 localStorage.setItem('session',1);
     localStorage.setItem('pregunta',1);
     dynamicSheet1.close();
}

function NoMantenersesion(argument) {
	 localStorage.setItem('pregunta',1);
dynamicSheet1.close();
}

function Guardardatospersonales() {
	var nombre= $("#v_nombre").val();
	var paterno=$("#v_paterno").val();
	var materno= $("#v_materno").val();
	var fecha=$("#v_fecha").val();
	var iduser=localStorage.getItem('id_user');
	var datos="id_user="+iduser+"&nombre="+nombre+"&paterno="+paterno+"&materno="+materno+"&fecha="+fecha+"&sexoseleccionado="+sexoseleccionado;

	var pagina="Guardardatospersonales.php";
		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(res){
			localStorage.setItem('nombre',nombre);
			localStorage.setItem('paterno',paterno);
			localStorage.setItem('materno',materno);
			localStorage.setItem('fechanacimiento',fecha);
			localStorage.setItem('sexo',sexoseleccionado);

		var aviso="Se actualizó el perfil correctamente";
		AbrirModalAviso(aviso);

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
				//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
				console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	})

}