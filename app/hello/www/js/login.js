// JavaScript Document


/*=======================================================================================================
*   			INICIA FUNCIONES PARA EL REGISTO DEL TOKEN PARA NOTIFICACIONES PUSH						*
*=======================================================================================================*/

/*function obtener_token()
{
	console.log('calling push init');

	var push = PushNotification.init({
		"android": {
			"senderID": "738682709669"
		},
		"browser": {},
		"ios": {
			"sound": true,
			"vibration": true,
			"badge": true
		},
		"windows": {}
	});

	console.log('after init');

	push.on('registration', function(data) {
		console.log('registration event: ' + data.registrationId);

		var oldRegId = localStorage.getItem('token_diego');

		//obtenemos el sistema operativo del telefono.
		var t_device = 0;

		if(app.device.android) {
			t_device = 1;
		}

		if(app.device.ios) {
			t_device = 2;
		}


		

		if(oldRegId !== data.registrationId) {
			// Save new registration ID
			localStorage.setItem('so',t_device);
			localStorage.setItem('token', data.registrationId);
			// Post registrationId to your app server as the value has changed
		}

			registrarTelefonofirebase();

		//mandamos a llamar un metodo de registro para poder guardar el registro de nuestro app.
		//terminamos de realizar el jquery para poder guardar la informacion del telefono.
	});

	push.on('error', function(e) {
		console.log("push error = " + e.message);
	});

	push.on('notification', function(data) {
		console.log('notification event');
		navigator.notification.alert(
			data.message,         // message
			null,                 // callback
			data.title,           // title
			'Ok'                  // buttonName
			);
	});
}


function registrarTelefonofirebase()
{         
	//ENVIAMOS DATOS A SERVIDIOR PARA GUARDARLO EN UNA BASE DE DATOS

	//Obtenemos el usuario y la contraseña desde el formulario
	var userToken = localStorage.getItem("token");
	var so = localStorage.getItem("so");
	var id = localStorage.getItem("id_user");
	var alias = 'cliente';
	
	//Pagina a la que enviaremos los datos
	var pagina = "registrarphone.php";

	//Almacenamos los datos en una variable para poder pasar los parametros vía ajax al script en PHP
	var data = "userToken="+userToken+"&idusuario="+id+"&alias="+alias+"&so="+so+"&accion=1";

	console.log(data);

	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data: data,
		crossDomain: true,
		cache: false,
		success: function(datos){
			




		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
			if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
			if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
			alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
		}
	});  
}
*/

/*=======================================================================================================
*   			TERMINA FUNCIONES PARA EL REGISTO DEL TOKEN PARA NOTIFICACIONES PUSH					*
*=======================================================================================================*/


/*=========================================== FUNCIONES GENERALES DE LA APP ==========================================*/



//Funcion para eliminar una variable de local storage
function eliminar_storage(nombre)
{
	localStorage.removeItem(nombre);
}

//Funcion que sirve para lanzar una alerta
function alerta(mensaje,titulo)
{
	app.dialog.alert(mensaje,titulo);
}

//Funcion que sirve para realizar la validación del login
function validar_login()
{
	
	console.log("Ingreso a validar login");

	//GoToPage("/homepage/");
	//localStorage.setItem("id_user",1);

	//Obtenemos el usuario y la contraseña desde el formulario
	var usuario = $('#v_usuario').val().trim();
	var password = $('#v_clave').val();
	var sistema=localStorage.getItem("SO");
	var tokenfirebase=localStorage.getItem('tokenfirebase');
	var uuid=localStorage.getItem('UUID');
	var mantenersession=0;
	var anunciovisto=localStorage.getItem('anunciovisto')

	var btnusuario=$("#btnusuario").hasClass('backgreen');
	var btnemail=$("#btnemail").hasClass('backgreen');
	var btncelular=$("#btncelular").hasClass('backgreen');
	var login="";
	if (btnusuario==true) {
		login='btnusuario';
	}
	if (btnemail==true) {
		login='btnemail';
	}
	if (btncelular==true) {
		login='btncelular';
	}



	if($('#mantenersession').is(':checked') ) {
   
		mantenersession=1;
	}
	
	//Pagina a la que enviaremos los datos
	var pagina = "validar_login2.php";


	//Almacenamos los datos en una variable para poder pasar los parametros vía ajax al script en PHP
	var data = "usuario="+usuario+"&password="+password+"&sistema="+sistema+"&tokenfirebase="+tokenfirebase+"&uuid="+uuid+"&anunciovisto="+anunciovisto+"&login="+login;

	if (usuario!='' && password!='') {
		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: urlphp+pagina,
			data: data,
			crossDomain: true,
			cache: false,
			success: function(datos){

				if(datos['resultado'] == 1)
				{

									//Si todos los datos estan bien
									//Guardamos el id en una variable local
									$(".menuoculto").css('display','block');

									localStorage.setItem("id_user", datos['id']);
									localStorage.setItem("nombre", datos['nombre']);
									localStorage.setItem("paterno", datos['paterno']);
									localStorage.setItem("materno", datos['materno']); 
				    				localStorage.setItem('tipoUsuario',datos['tipousuario']);
									localStorage.setItem('idtipousuario',datos['tipo']);

									localStorage.setItem('alias',datos['alias']);
									localStorage.setItem('usuario',datos['usuario']);

									localStorage.setItem('correo',datos['email']);
									localStorage.setItem("foto", datos['foto']);
									localStorage.setItem("session",0);
    								localStorage.setItem("passacademia",password);
    								localStorage.setItem('pregunta',0);
									//localStorage.setItem('pregunta',1);
									localStorage.setItem('actualizadatos','');
									localStorage.removeItem('asenta');
									localStorage.removeItem('datosbuscar');
									localStorage.removeItem('datosbuscar2');
									localStorage.removeItem('datosbuscar3');
									localStorage.removeItem('datosbuscar4');
									localStorage.removeItem('datosbuscar6');
									localStorage.setItem('factura',0);
									localStorage.setItem('nuevadireccion',1);
									localStorage.setItem('asenta','');
									localStorage.setItem("idopcionespedido",0);
									localStorage.setItem("iddireccion",0);
									localStorage.setItem("anunciovisto",0);

									console.log("El ID del usuario es:" + localStorage.getItem("id_user"));
									
									//Enviamos al user al index de la app
									//
									if (datos['validado']==1) {
										
									//	GoToPage("/inicio/");

										if (datos['tipo']==3 ) {
											
											 GoToPageHistory("home");

										}
										       
										if (datos['tipo']==0) {
											GoToPageHistory("homeadmin");
										}

										if (datos['tipo']==5) {
											GoToPageHistory("homecoach");
										}

									}else{

										//GoToPage("/inicio/");
										        GoToPage("/");

	
									}

									//	obtener_token();

									}else
									{

									//Si los datos estan mal lanzamos una alerta que estan los datos incorrectos
									alerta("Datos incorrectos","");
									
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

		alerta('','Ingresa tus datos de acceso');


	}
}

function entrarinvitado() {

	$(".menuoculto").css('display','none');
	localStorage.setItem("id_user",0);
	localStorage.setItem('pregunta',1);
    localStorage.setItem('session',1);
	localStorage.setItem("nombre","Invitado");
	localStorage.removeItem('carrito');



	GoToPage("inicio");

}


//Funcion que sirve para cerrar la sesion
function salir_app()
{
	app.dialog.confirm('','¿Seguro que desea salir de la aplicación?' , function () {
	
		  /* $(".popup").removeClass('modal-in');
		  $(".popup").addClass('modal-out');
		  $(".popup").css('display','none');
		  $(".popup-backdrop").removeClass('backdrop-in');
		  $(".popup").remove();

*/
	EliminarClienteUuid();
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
	myStopFunction(identificadorDeTemporizador);

	GoToPage("/");
/*

var contador=0;

	if (id>0) {
		 contador=ContarcarritoAntesdesalir();

	}

	if (contador==1) {
			


		 app.dialog.confirm('','¿Desea conservar el carrito?',
               function () {
                  Conservarcarrito();
               },
               function () {
                 
               	Eliminarcarrito();
                  }
            );

		 EliminarClienteUuid();
	}else{
			localStorage.removeItem('carrito');
			EliminarClienteUuid();
			GoToPage("/");


	}*/

   	//var pagina = "registrarphone.php";


   		

   },

   function () {

   	abrir=1;
   	
   });

}

function Conservarcarrito() {
	GoToPage("/");
}

function Eliminarcarrito(argument) {
	localStorage.removeItem('carrito');

			GoToPage("/");
}

function LimpiarVariables() {
									localStorage.removeItem('asenta');
									localStorage.removeItem('datosbuscar');
									localStorage.removeItem('datosbuscar2');
									localStorage.removeItem('datosbuscar3');
									localStorage.removeItem('datosbuscar4');
									localStorage.removeItem('datosbuscar6');

									localStorage.setItem('nuevadireccion',1);
									localStorage.setItem('asenta','');
									localStorage.setItem('nuevofiscal',1);
}


function ContarcarritoAntesdesalir() {

	productoLS = obtenerProductosLocalStorage();
	var contador=productoLS.length;
 
 	var paddin=0;
	if (contador>0) {
		
		return 1;
		}else{
		
		return 0;
		}

	
}

function salir_app2()
{



	 app.dialog.alert('','Es necesario iniciar sesión para continuar',
               function () {
                  var id = localStorage.getItem("id_user");
    
	localStorage.setItem('pregunta',0);
	localStorage.setItem('session',0);
	localStorage.removeItem("session");

	localStorage.removeItem('pregunta');
	localStorage.removeItem('datosextras');

	localStorage.setItem("nombre", '');
	localStorage.setItem("paterno", '');
	localStorage.setItem("materno",'');

	localStorage.setItem('correo','');
	localStorage.setItem("foto", '');
	localStorage.removeItem("idopcionespedido");
	localStorage.removeItem("iddireccion");



	
			localStorage.removeItem('carrito');

			GoToPage("/");


	
		localStorage.removeItem("id_user");
               }
            );

}

function EliminarClienteUuid() {
	var sistema=localStorage.getItem("SO");
	var tokenfirebase=localStorage.getItem('tokenfirebase');
	var uuid=localStorage.getItem('UUID');
	var idcliente=localStorage.getItem('id_user');

     var datos="sistema="+sistema+"&tokenfirebase="+tokenfirebase+"&idcliente="+idcliente+"&uuid="+uuid;
	 var pagina = "EliminartokenCliente.php";

		$.ajax({
		type: 'POST',
		dataType: 'json',
		data:datos,
		url: urlphp+pagina,
		async:false,
		success: function(datos){

					localStorage.removeItem("id_user");

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});

}

function Accion(elemento) {
	var id=elemento.id;
	
	$(".btnaccion").each(function(index) {
			
 			$(this).removeClass('backgreen');
 		 	$(this).addClass('backwhite');

		});

	if ($("#"+id).hasClass('backgreen')) {
		$("#"+id).removeClass('backgreen');
		$("#"+id).addClass('backwhite');	

	}else{
		$("#"+id).removeClass('backwhite');
		$("#"+id).addClass('backgreen');

	}
	
	$('#v_usuario').val('');
	if (id=='btncelular') {

		phoneFormatter('v_usuario');
		$("#flotante").text('Celular');

	}else{

		$('#v_usuario').attr({ placeholder : '' }); 
		$("#v_usuario").off("input");


		if (id=='btnusuario') {
			
			$("#flotante").text('Usuario');

		}
		if (id=='btnemail') {
		$("#flotante").text('Email');

		}
	}
		$('#v_usuario').focus();

}

function RegresarInicio(argument) {
	
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
