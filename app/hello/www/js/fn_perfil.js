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

	$$("#v_paterno").val(respuesta.paterno);
	$$("#v_paterno").addClass('input-with-value');
	$$(".lipaterno").addClass('item-input-with-value');

	$$("#v_materno").val(respuesta.materno);
	$$("#v_materno").addClass('input-with-value');
	$$(".limaterno").addClass('item-input-with-value');

	$$("#v_fecha").val(respuesta.fechanacimiento);
	$$("#v_fecha").addClass('input-with-value');
	$$(".lifechanacimiento").addClass('item-input-with-value');

	$$("#v_sexo").val(respuesta.sexo);

				$(".datosregistro").css('display','none');
				$("#v_nombre").attr('disabled',true);
				$("#v_paterno").attr('disabled',true);
				$("#v_materno").attr('disabled',true);
				$("#v_fecha").attr('disabled',true);
				$("#v_sexo").attr('disabled',true);
				$("#v_correo").attr('disabled',true);
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
	var iduser = localStorage.getItem("id_user");
	var usuario= localStorage.getItem("usuario");
	var pagina = "EliminarCuenta.php";

	//$("input[name='dialog-password']").attr('placeholder','Contraseña');

	app.dialog.password('Confirma tu contraseña','Eliminar cuenta', function (username, coincidePassword) {
		var pass=$(".dialog-input").val();
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
			
			if (encontrado==1) {
				alerta('','Se ha eliminado la cuenta');
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
				$("#btnasociados").attr("onclick","GoToPage('registrotutorados')")

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