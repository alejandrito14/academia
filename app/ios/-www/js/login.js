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
	var idusuarioinvitado=localStorage.getItem('idusuarioinvitado');

	var btnusuario=$("#btnusuario").hasClass('backgreen');
	var btnemail=$("#btnemail").hasClass('backgreen');
	var btncelular=$("#btncelular").hasClass('backgreen');
	var login="";


		var number = usuario.replace(/[^\d]/g, '');

		if (number.length == 7) { 
			usuario = number.replace(/(\d{3})(\d{4})/, "$1-$2"); 
		} else if (number.length == 10) { 

			usuario = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"); 

		} 
	/*if (btnusuario==true) {
		login='btnusuario';
	}
	if (btnemail==true) {
		login='btnemail';
	}
	if (btncelular==true) {*/
		login='btncelular';
	//}



	if($('#mantenersession').is(':checked') ) {
   
		mantenersession=1;
	}
	
	//Pagina a la que enviaremos los datos
	var pagina = "validar_login2.php";


	//Almacenamos los datos en una variable para poder pasar los parametros vía ajax al script en PHP
	var data = "usuario="+usuario+"&password="+password+"&sistema="+sistema+"&tokenfirebase="+tokenfirebase+"&uuid="+uuid+"&anunciovisto="+anunciovisto+"&login="+login+"&idusuarioinvitado="+idusuarioinvitado;

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
									localStorage.removeItem('idusuarioinvitado');

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
									localStorage.setItem('invitado',0);

									console.log("El ID del usuario es:" + localStorage.getItem("id_user"));
									 ObtenerEdad();
			 					    Visualizarmenu();
									//Enviamos al user al index de la app
									//
									if (datos['validado']==1) {
										 GuardarTokenBase(0); 
									//	GoToPage("/inicio/");

										if (datos['tipo']==3 ) {
										

											if (datos['carrito'].length>0) {

												var carrito=datos['carrito'];

												idsucursal=carrito[0].idsucursal;
												localStorage.setItem('idsucursal',idsucursal);
												
												GoToPageHistory("carrito");


												 AbrirModalAvisoCarrito();


												
												}else{

													 GoToPageHistory("home");
												}
											
											

										}
										       
										if (datos['tipo']==0) {
											GoToPageHistory("homeadmin");
										}

										if (datos['tipo']==5) {
											GoToPageHistory("homeespecialista");
										}

									}else{

										//GoToPage("/inicio/");
										        GoToPage("/");

									}

									//	obtener_token();

									}else
									{
									//Si los datos estan mal lanzamos una alerta que estan los datos incorrectos
									
									var aviso="Datos incorrectos";
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

	
		var aviso="Ingresa tus datos de acceso";
		AbrirModalAviso(aviso);

	}
}


function AbrirModalAvisoCarrito() {
	
 
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
                          <p class="cambiarfuente cambiarfuente2 `+estiloparrafo+`" style="color: #c7aa6a;text-align: center;">Tienes compras pendientes en tu usuario</p>
                          <p class="cambiarfuente cambiarfuente2 `+estiloparrafo+`" style="color: #c7aa6a;text-align: center;">¿Deseas cargarlas?</p>
                          </div>

                          </div>

                          <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-50">
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente cambiarfuente2" onclick="CerrarModalAviso()">Si</button>
                            </div>

                            <div class="col-50">
                            <button style="background: white;color:black;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente cambiarfuente2" onclick="LimpiarCarrito()">No</button>
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

function QuitarCarritoAnterior() {
  var id_user=localStorage.getItem('id_user');
  var datos="id_user"+id_user;
  var pagina = "EliminarCarritoAnterior.php";
  var datos="id_user="+id_user;
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
    crossDomain: true,
    cache: false,
    data:datos,
    success: function(resp){

      var res=resp.respuesta;
      if (res.length>0) {
        PintarCarrito(res);
        var total=formato_numero(resp.totalcarrito,2,'.',',');
        $(".totalcarrito").text(total);
        localStorage.setItem('sumatotalapagar',total);
      
      }else{

        GoToPage('home');
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

//Funcion que sirve para realizar la validación del login
function validar_login2()
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
	var idusuarioinvitado=localStorage.getItem('idusuarioinvitado');
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
	var pagina = "validar_login3.php";


	//Almacenamos los datos en una variable para poder pasar los parametros vía ajax al script en PHP
	var data = "usuario="+usuario+"&password="+password+"&sistema="+sistema+"&tokenfirebase="+tokenfirebase+"&uuid="+uuid+"&anunciovisto="+anunciovisto+"&login="+login+"&idusuarioinvitado="+idusuarioinvitado;

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
									localStorage.removeItem('idusuarioinvitado');
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
									localStorage.setItem('invitado',0);

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
											GoToPageHistory("homeespecialista");
										}

									}else{

										//GoToPage("/inicio/");
										        GoToPage("/");

	
									}

									//	obtener_token();

									}else
									{

									//Si los datos estan mal lanzamos una alerta que estan los datos incorrectos
									
									 var aviso="Datos incorrectos";
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

		//alerta('','Ingresa tus datos de acceso');
		 var aviso="Ingresa tus datos de acceso";
    	 AbrirModalAviso(aviso);

	}
}

/*function entrarinvitado() {

	$(".menuoculto").css('display','none');
	localStorage.setItem("id_user",0);
	localStorage.setItem('pregunta',1);
    localStorage.setItem('session',1);
	localStorage.setItem("nombre","Invitado");
	localStorage.removeItem('carrito');



	GoToPage("inicio");

}*/

function RegresarCarrito() {
	GoToPage('carrito');
}

function AbriModalSalir() {
	 
  var parrafo="<p class='cambiarfuente' style='font-size:30px;line-height:1;'>¿Seguro que desea salir de la aplicación?</p>";


  var html2="";

var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height:70%;background: black;">
            
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
                          <div class="row" style="    margin-left: 2em; margin-right: 2em;    margin-top: 20px;">
                          <div class="col-100">
                          <div style="color: #c7aa6a;font-size: 30px;text-align: center;" class="cambiarfuente">
                            `+parrafo+`

                            </div>
                          </div>

                          </div>`;

                          html+=`
                            <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-50">
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="salir_app()">Si</button>
                            </div>
                             <div class="col-50">
                            <button style="background: white;color:black;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="CerrarModalAviso()">No</button>
                            </div>
                          
                          </div>
                          `;

                      
                         html+=` </div>

                         


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

             if (tipoletra!='') {
              $(".cambiarfuente").addClass(tipoletra);
            }

          },
          opened: function (sheet) {
            console.log('Sheet opened');

           
          },
        }
      });


       dynamicSheet1.open();
}

function ValidarCheckLeido() {
	if($("#inputleido").is(':checked')){
		$("#btnvalidarcelular").css('display','block');
	}else{
		$("#btnvalidarcelular").css('display','none');

	}
}

//Funcion que sirve para cerrar la sesion
function salir_app()
{ 

	 dynamicSheet1.close();
	//app.dialog.confirm('','¿Seguro que desea salir de la aplicación?' , function () {
	
		  /* $(".popup").removeClass('modal-in');
		  $(".popup").addClass('modal-out');
		  $(".popup").css('display','none');
		  $(".popup-backdrop").removeClass('backdrop-in');
		  $(".popup").remove();

*/
	EliminarClienteUuid();
	var id = localStorage.getItem("id_user");
    $(".lblusuario").css('display','none');
	localStorage.setItem('session',0);

	localStorage.setItem('pregunta',0);
	localStorage.removeItem('datosextras');
	localStorage.removeItem("nombre");
	localStorage.removeItem("paterno");
	localStorage.removeItem("materno");
	localStorage.removeItem('tipoUsuario');
	localStorage.setItem('idtipousuario',6);
	Visualizarmenu();

	localStorage.removeItem('correo');
	localStorage.setItem("foto", '');
	localStorage.removeItem("idopcionespedido");
	localStorage.removeItem("iddireccion");
	localStorage.removeItem("correo");
	localStorage.removeItem("passwordisuoder");
	localStorage.removeItem("id_user");
	localStorage.removeItem("idusuarioinvitado");
	localStorage.removeItem('id_usuariologin');
	myStopFunction(identificadorDeTemporizador);
	myStopFunction(intervalocitas);

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


   		

  /* },

   function () {

   	abrir=1;
   	
   });*/

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

function CargarMenu() {
	$(".limenu").attr('onclick','SeleccionMenu(this)');
}
