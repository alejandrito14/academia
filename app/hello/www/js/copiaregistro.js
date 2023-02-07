var watchID2 = "";
var dynamicSheet2="";
var deportes=[];

function Registrar() {

	$(".linombre").removeClass('is-invalid');
	$(".lipaterno").removeClass('is-invalid');
	$(".limaterno").removeClass('is-invalid');
	$(".lifechanacimiento").removeClass('is-invalid');
	$(".lisexo").removeClass('is-invalid');

	$(".linombre").addClass('is-valid');
	$(".lipaterno").addClass('is-valid');
	$(".limaterno").addClass('is-valid');
	$(".lifechanacimiento").addClass('is-valid');
	$(".lisexo").addClass('is-valid');

	
	var v_nombre=$("#v_nombre").val();
	var v_paterno=$("#v_paterno").val();
	var v_materno=$("#v_materno").val();
	var v_sexo=$("#v_sexo").val();
	var v_fecha=$("#v_fecha").val();
	//var v_telefono=$("#v_telefono").val();
	/*var v_email=$("#v_email").val();
	var v_contra1=$("#v_contra1").val();
	var v_contra2=$("#v_contra2").val();
	var v_nivel=$("#v_nivel").val();
	var v_posicion=$("#v_posicion").val();
	var v_curp=$("#v_curp").val();

	var v_codigopostal=$("#v_codigopostal").val();
	var v_pais=$("#v_pais").val();
	var v_estado=$("#v_estado").val();
	var v_municipio=$("#v_municipio").val();
	var v_direccion=$("#v_direccion").val();

	var calle1 = $("#v_calle1").val();
	var calle2 = $("#v_calle2").val();
	var noexterior = $("#no_exterior").val();
	var nointerior = $("#no_interior").val();

	var v_tipoasentamiento =$("#v_tipoasentamiento").val();
	var calle=$("#v_calle").val();

	var v_colonia=$("#v_colonia").val();
	var v_referencia=$("#v_referencia").val();
	var v_edad=$("#v_edad").val();
	var v_celular=$("#v_celular").val();*/
 	var sistema=localStorage.getItem("SO");

	var rutaine=localStorage.getItem('rutaine');

	var tokenfirebase=localStorage.getItem('tokenfirebase');
	var uuid=localStorage.getItem('UUID');
	var id_user=localStorage.getItem('id_user');


	var datos="v_nombre="+v_nombre+"&v_paterno="+v_paterno+"&v_materno="+v_materno+"&v_sexo="+v_sexo+"&v_fecha="+v_fecha+"&sistema="+sistema+"&tokenfirebase="+tokenfirebase+"&uuid="+uuid+"&id_user="+id_user;
	var pagina = "registrousuario.php";

	var msj="";
	var bandera=1;
	if (v_nombre=='') {
		usuario1='Campo requerido';
		bandera=0;
	}


	if (v_paterno=='') {
		apellidop1='Campo requerido';
		bandera=0;
	}

	if (v_materno=='') {
		apellidom1='Campo requerido';
		bandera=0;
	}


	if (isValidDate(v_fecha)==false) {

		bandera=0;
	}
	
	if (v_sexo==0 || v_sexo==null) {
		sexo1='Campo requerido';
		bandera=0;
	}


	/*if (v_telefono=='') {
		telefono1='Campo requerido';
		bandera=0;
	}*/
	/*if (v_email=='') {
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

	if (v_nivel==0) {
		contra1='Campo requerido';
		bandera=0;
	}*/

/*	if (v_posicion==0) {
		nivel1='Campo requerido';
		bandera=0;
	}*/

	/*if (v_fecha=='') {
		fecha1='Campo requerido';
		bandera=0;
	}*/

	/*if (v_contra1!=v_contra2) {
		bandera=0;
			coincidePassword('v_contra1','v_contra2');
	}*/

	/*if (v_sexo==0) {
		sexo1='Campo requerido';
		bandera=0;
	}*/


	/*	if (v_codigopostal=='') {
				v_codigopostal1='Campo requerido';
				bandera=0;

			}*/
/*
			if (v_pais==0) {
				v_pais1='Campo requerido';
				bandera=0;

			}
			if (v_estado==0) {
				v_estado1='Campo requerido';
				bandera=0;

			}

			if (v_municipio==0) {
				v_municipio1='Campo requerido';
				bandera=0;

			}

			if (v_direccion=='') {
				v_direccion1='Campo requerido';
				bandera=0;

			}*/


			/*if (v_colonia=='') {
				v_colonia1='Campo requerido';
				bandera=0;

			}*/
			

			/*if (v_edad=='') {
				v_edad1='Campo requerido';
				bandera=0;

			}*/

			/*if (v_celular=='') {
				v_celular1='Campo requerido';
				bandera=0;

			}

			if (v_celular.length<10) {

				v_celular1='Campo requerido';
				bandera=0;

			}*/

			/*if (validarEmail(v_email)!=true) {
				email1='Campo requerido';
				bandera=0;
			}*/
	


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

    	if(respuesta.existe == 1)
    	{

    		localStorage.setItem("id_user", respuesta.idusuario);
    		localStorage.setItem("nombre", respuesta.nombre);
    	    localStorage.setItem("alias", respuesta.alias);

    		localStorage.setItem("paterno",respuesta.paterno);
    		localStorage.setItem("materno", respuesta.materno);
    		localStorage.setItem("foto", respuesta.foto);
   			localStorage.setItem('pregunta',0);
			localStorage.setItem('habilitarfactura','0');
			localStorage.setItem("fechanacimiento",v_fecha);
			localStorage.setItem("genero",v_sexo);


    		GoToPage("registrodatosacceso");
										//obtener_token();
									}else
									{

									//Si los datos estan mal lanzamos una alerta que estan los datos incorrectos
									alerta("El usuario ya se encuentra registrado","");
									
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



		

		if (v_nombre=='') {
			nombre1='Campo requerido';
			$("#lblnombre").html(nombre1);
			$(".linombre").addClass('is-invalid');

			bandera=0;
		}

		if (v_paterno=='') {
			apellidop1='Campo requerido';
			$("#lblapellidop").html(apellidop1);
			$(".lipaterno").addClass('is-invalid');

			bandera=0;
		}

		if (v_materno=='') {
			apellidom1='Campo requerido';
			$("#lblapellidom").html(apellidom1);
	    	$(".limaterno").addClass('is-invalid');

			bandera=0;
		}


		if (isValidDate(v_fecha)==false) {

			bandera=0;
			$(".lifechanacimiento").addClass('is-invalid');

		}

		if (v_sexo==0 || v_sexo==null) {
				sexo1='Campo requerido';
				bandera=0;

			$(".lisexo").addClass('is-invalid');

			}
		/*if (v_telefono==""){
			telefono='Campo requerido';
			$("#lbltelefono").html(telefono);
			bandera=0;
		}*/



		

	
		
		/*if (v_sexo==0) {
			sexo1='Campo requerido';
			bandera=0;
			$("#lblsexo").html(sexo1);

		}*/



		/*if (v_codigopostal=='') {
				v_codigopostal1='Campo requerido';
				bandera=0;
			$("#lblcodigopostal").html(v_codigopostal1);

			}

			if (v_pais==0) {
				v_pais1='Campo requerido';
				bandera=0;
			$("#lblpais").html(v_pais1);

			}
			if (v_estado==0) {
				v_estado1='Campo requerido';
				bandera=0;
			$("#lblestado").html(v_estado1);

			}

			if (v_municipio==0) {
				v_municipio1='Campo requerido';
				bandera=0;
				$("#lblmunicipio").html(v_municipio1);

			}

			if (v_direccion=='') {
				v_direccion1='Campo requerido';
				bandera=0;

				$("#lbldireccion").html(v_direccion1);

			}


			if (v_colonia=='') {
				v_colonia1='Campo requerido';
				bandera=0;
				$("#lblcolonia").html(v_colonia1);

			}
			

			if (v_edad=='') {
				v_edad1='Campo requerido';
				bandera=0;
				$("#lbledad").html(v_edad1);

			}
*/
			/*if (v_celular=='') {

				v_celular1='Campo requerido';
				bandera=0;
				$("#lblcelular").html(v_celular1);

			}

			if (v_celular.length<10) {

				v_celular1='Campo requerido';
				bandera=0;
				$("#lblcelular").html(v_celular1);

			}*/

		

			if (bandera==0) {

				alerta('','Te falta por capturar una opción obligatoria');
			}


	}
	
}


//acceso 

function RegistrarAcceso() {

	$(".licorreo").removeClass('is-invalid');
	$(".licontra1").removeClass('is-invalid');
	$(".licontra2").removeClass('is-invalid');
	$(".litipousuario").removeClass('is-invalid');
	$(".liusuario").removeClass('is-invalid');

	$(".licorreo").addClass('is-valid');
	$(".licontra1").addClass('is-valid');
	$(".licontra2").addClass('is-valid');
	$(".litipousuario").addClass('is-valid');
	$(".liusuario").addClass('is-valid');


	var v_email=$("#v_correo").val();
	var v_contra1=$("#v_contra1").val();
	var v_contra2=$("#v_contra2").val();
	var tipousuario=3;
	var v_usuario=$("#v_usuario").val();

	var id_user=localStorage.getItem('id_user');
	var tutorados="";
	if(localStorage.getItem('objeto')!=null){

		tutorados=localStorage.getItem('objeto');

	}


	var datos="v_usuario="+v_usuario+"&v_email="+v_email+"&v_contra1="+v_contra1+"&id_user="+id_user+"&tutorados="+tutorados;
	var pagina = "registroaccesousuario.php";

	var msj="";
	var bandera=1;
	if (v_usuario=='') {
		usuario1='Campo requerido';
		bandera=0;
	}
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

	if (validarEmail(v_email)!=true) {
				email1='Campo requerido';
				bandera=0;
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
    					//if (tipousuario!=6 && tipousuario!=4) {
				    	if(respuesta.existe == 0)
				    	{

				    		localStorage.setItem("correo", respuesta.email);
				    		localStorage.setItem("usuario", respuesta.usuario[0].usuario);

				    	    localStorage.setItem("session", 0);
				    		localStorage.setItem("passacademia", v_contra1);
				    		localStorage.setItem('tipoUsuario',respuesta.tipousuario);
				    		localStorage.setItem('idtipousuario',tipousuario);
				    		localStorage.removeItem('objeto');
				    		localStorage.removeItem('vcorreoregistro');
				    		localStorage.removeItem('vcontra1registro');
				    		localStorage.removeItem('vcontra2registro');
				    		var datos=respuesta.usuario[0];
				    		localStorage.setItem('foto',datos.foto);
				    		localStorage.setItem('alias',datos.alias);
				    		localStorage.setItem('sexo',datos.sexo);
				    		 GuardarTokenBase(0); 
				    		if (tipousuario==3) {
				    			  

				    			GoToPageHistory('home');	
				    		}
							if (tipousuario==2) {
								
								GoToPageHistory('homeadmin');
							}

							if (tipousuario==5) {
								GoToPageHistory('homecoach');
							}
							
				    	
										//obtener_token();
									}else
									{

									//Si los datos estan mal lanzamos una alerta que estan los datos incorrectos
									alerta("El correo ya se encuentra registrado","");
									
								}

							/*}else{

								if(respuesta.existe == 0)
				    			{

				    	
				    		localStorage.setItem("email", respuesta.email);
				    	    localStorage.setItem("session", 0);
				    		localStorage.setItem("passacademia", v_contra1);
				    		localStorage.setItem('tipoUsuario',respuesta.tipousuario);
				    		localStorage.setItem('idtipousuario',tipousuario);
				    				GoToPage('home');

				    			}else{


				    			alerta("El correo ya se encuentra registrado","");
	
				    			}


							}*/
								
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



		if (v_usuario=='') {
			usuario1='Campo requerido';
			bandera=0;
			$("#lblusuario").html(usuario1);
			$(".liusuario").removeClass('is-valid');
			$(".liusuario").addClass('is-invalid');
			}



		if (v_email=='') {
			email1='Campo requerido';
			bandera=0;
			$("#lblemail").html(email1);

			$(".licorreo").removeClass('is-valid');
			$(".licorreo").addClass('is-invalid');
			
		}

		if (v_contra1=='') {
			contra1='Campo requerido';
			bandera=0;
			$("#lblcontra1").html(contra1);

			$(".licontra1").removeClass('is-valid');
			$(".licontra1").addClass('is-invalid');

		}
		if (v_contra2=='') {
			contra2='Campo requerido';
			bandera=0;
			$("#lblcontra2").html(contra2);

			$(".licontra2").removeClass('is-valid');
			$(".licontra2").addClass('is-invalid');
		}

	
		
		/*if (v_sexo==0) {
			sexo1='Campo requerido';
			bandera=0;
			$("#lblsexo").html(sexo1);

		}*/

		if (v_contra1!=v_contra2) {
			bandera=0;

			coincidePassword('v_contra1','v_contra2');
			$(".licontra2").removeClass('is-valid');
			$(".licontra2").addClass('is-invalid');
		}


		/*if (v_codigopostal=='') {
				v_codigopostal1='Campo requerido';
				bandera=0;
			$("#lblcodigopostal").html(v_codigopostal1);

			}

			if (v_pais==0) {
				v_pais1='Campo requerido';
				bandera=0;
			$("#lblpais").html(v_pais1);

			}
			if (v_estado==0) {
				v_estado1='Campo requerido';
				bandera=0;
			$("#lblestado").html(v_estado1);

			}

			if (v_municipio==0) {
				v_municipio1='Campo requerido';
				bandera=0;
				$("#lblmunicipio").html(v_municipio1);

			}

			if (v_direccion=='') {
				v_direccion1='Campo requerido';
				bandera=0;

				$("#lbldireccion").html(v_direccion1);

			}


			if (v_colonia=='') {
				v_colonia1='Campo requerido';
				bandera=0;
				$("#lblcolonia").html(v_colonia1);

			}
			

			if (v_edad=='') {
				v_edad1='Campo requerido';
				bandera=0;
				$("#lbledad").html(v_edad1);

			}
*/
			/*if (v_celular=='') {

				v_celular1='Campo requerido';
				bandera=0;
				$("#lblcelular").html(v_celular1);

			}

			if (v_celular.length<10) {

				v_celular1='Campo requerido';
				bandera=0;
				$("#lblcelular").html(v_celular1);

			}*/

			if (validarEmail(v_email)!=true) {

				email1='Campo requerido';
				bandera=0;
				$("#lblemail").html(email1);

				$(".licorreo").removeClass('is-valid');
				$(".licorreo").addClass('is-invalid');

			}

			if (bandera==0) {

				alerta('','Te falta por capturar una opción obligatoria');
			}


	}
	
}

function ObtenerNiveles(idnivel) {
	var pagina = "ObtenerNiveles.php";

	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		success: function(datos){


			var respuesta=datos.respuesta;

			console.log(respuesta.length);
			var html="";
			if (respuesta.length>0) {
				html+=`<option value="0">SELECCIONAR NIVEL</option>`;


				for (var i = 0; i < respuesta.length; i++) {

						//armar nivel
						html+=`<option value="`+respuesta[i].idnivel+`">`+respuesta[i].nivel+`</option>`;

					}
				}else{
					html+=`<option value="0">NO SE ENCUENTRAN NIVELES</option>`;



				}

				$("#v_nivel").html(html);

				if (idnivel>0) {
					$("#v_nivel").val(idnivel);
	
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
function ObtenerPosiciones() {
	
	var pagina = "ObtenerPosiciones.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		success: function(datos){


			var respuesta=datos.respuesta;

			console.log(respuesta.length);
			var html="";
			if (respuesta.length>0) {
				html+=`<option value="0">SELECCIONAR POSICIÓN</option>`;


				for (var i = 0; i < respuesta.length; i++) {

						//armar nivel
						html+=`<option value="`+respuesta[i].idposicion+`">`+respuesta[i].nombre+`</option>`;

					}
				}else{
					html+=`<option value="0">NO SE ENCUENTRAN POSICIONES</option>`;



				}

				$("#v_posicion").html(html);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
							}
						});
}

function phoneFormatter(element) { 



	$('#'+element).attr({ placeholder : '(___) ___-____' }); 

	$('#'+element).on('input', function() { 

		var number = $(this).val().replace(/[^\d]/g, '') 

		if (number.length == 7) { 

			number = number.replace(/(\d{3})(\d{4})/, "$1-$2"); 

		} else if (number.length == 10) { 

			number = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"); 



		} 

		$(this).val(number) 

		$('#'+element).attr({ maxLength:10}); 



	}); 

} 


function ObtenerPais(idpais) {
	
	var pagina = "obtenerpais.php";
	$.ajax({
		type: 'GET',
		url: urlphp+pagina,
		async:false,
	
		success: function(datos){

			var respuesta=datos.respuesta;

			console.log(respuesta.length);
			var html="";
			if (respuesta.length>0) {
				html+=`<option value="0">Seleccionar país</option>`;


				for (var i = 0; i < respuesta.length; i++) {

						//armar nivel
						html+=`<option  value="`+respuesta[i].idpais+`">`+respuesta[i].pais+`</option>`;

					}
				}else{
					html+=`<option value="0">No se encuentran país</option>`;



				}

				$("#v_pais").html(html);

				if (idpais>0) {
				$("#v_pais").val(idpais);

				}
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+pagina+" "+ error,"ERROR");
							}
						});
}


function ObtenerEstado(idestado,idpais) {
	
	var pagina = "obtenerestados.php";
	var datos="idpais="+idpais;
	$.ajax({
		type: 'POST',
		url: urlphp+pagina,
		data:datos,
		dataType:'json',
		async:false,
		success: function(datos){

			var respuesta=datos.respuesta;

			console.log(respuesta.length);
			var html="";
			if (respuesta.length>0) {
				html+=`<option value="0">Seleccionar estado</option>`;


				for (var i = 0; i < respuesta.length; i++) {

						//armar nivel
						html+=`<option value="`+respuesta[i].id+`">`+respuesta[i].nombre+`</option>`;

					}
				}else{
					html+=`<option value="0">No se encuentran estados</option>`;



				}



				$("#v_estado").html(html);

				if (idestado>0) {
					$("#v_estado").val(idestado);
				}

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+pagina+" "+ error,"ERROR");
							}
						});
}

function ObtenerMunicipios(idmunicipio,idestado) {
	
	var pagina = "obtenermunicipios.php";
	var datos="idestado="+idestado;
	$.ajax({
		type: 'POST',
		url: urlphp+pagina,
		data:datos,
		dataType:'json',
		async:false,
		success: function(datos){

			var respuesta=datos.respuesta;

			var html="";
			if (respuesta.length>0) {
				html+=`<option value="0">Seleccionar municipio</option>`;


				for (var i = 0; i < respuesta.length; i++) {

						//armar nivel
						html+=`<option value="`+respuesta[i].id+`">`+respuesta[i].nombre+`</option>`;

					}
				}else{
					html+=`<option value="0">No se encuentran municipios</option>`;


				}

				$("#v_municipio").html(html);

				if (idmunicipio>0) {

					$("#v_municipio").val(idmunicipio);
				}

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+pagina+" "+ error,"ERROR");
							}
						});
}


function ValidarEdad() {
	var edad=$("#v_edad").val();

	if (parseFloat(edad)>17) {

		//$("#btnregistro").attr('onclick',"AgregarConImagen()");

	}else{

		//$("#btnregistro").attr('onclick',"Registrar()");

	}
}

function AgregarConImagen() {

	AbrirModalFotoIne();
}

function AbrirModalFotoIne() {

		var id_user=0;


		

			app.dialog.create({
				title: '',
				text: '',
				buttons: [
				{
					text: 'Tomar Foto',
				},
				{
					text: 'Subir Foto',
				},
				{
					text: 'Cancelar',
					color:'#ff3b30',

				},

				],

				onClick: function (dialog, index) {
					if(index === 0){
                //Button 1 clicked
                TomarFotoIne(id_user)
              //  app.dialog.alert("Tomar foto");
          }
          else if(index === 1){
                //Button 2 clicked
                getPhotoIne(pictureSource.PHOTOLIBRARY);
                // app.dialog.alert("foto GALERIA");

            }
            else if(index === 2){
                //Button 3 clicked

            }
        },
        verticalButtons: true,
    }).open();

		
	}


	function ValidarRegistro() {
		
			$("#lblnombre").html("");
			$("#lblapellidop").html("");
			$("#lblapellidom").html("");
			$("#lbltelefono").html("");
			$("#lblemail").html("");
			$("#lblcontra1").html("");
			$("#lblnivel").html("");
			$("#lblposicion").html("");
			$("#lblfecha").html("");
			$("#lblcontra2").html("");
			$("#lblsexo").html("");
			var v_nombre=$("#v_nombre").val();
			var v_paterno=$("#v_paterno").val();
			var v_materno=$("#v_materno").val();
			var v_sexo=$("#v_sexo").val();
			var v_fecha=$("#v_fecha").val();
			var v_telefono=$("#v_telefono").val();
			var v_email=$("#v_email").val();
			var v_contra1=$("#v_contra1").val();
			var v_contra2=$("#v_contra2").val();
			var v_nivel=$("#v_nivel").val();
			var v_posicion=$("#v_posicion").val();
			var v_curp=$("#v_curp").val();

			var v_codigopostal=$("#v_codigopostal").val();
			var v_pais=$("#v_pais").val();
			var v_estado=$("#v_estado").val();
			var v_municipio=$("#v_municipio").val();
			var v_direccion=$("#v_direccion").val();
			var v_colonia=$("#v_colonia").val();
			var v_referencia=$("#v_referencia").val();
			var v_edad=$("#v_edad").val();
			var v_celular=$("#v_celular").val();


			var datos="v_nombre="+v_nombre+"&v_paterno="+v_paterno+"&v_materno="+v_materno+"&v_sexo="+v_sexo+"&v_fecha="+v_fecha+"&v_telefono="+v_telefono+"&v_email="+v_email+"&v_contra1="+v_contra1+"&v_nivel="+v_nivel+"&v_posicion="+v_posicion+"&v_curp="+v_curp+"&v_codigopostal="+v_codigopostal+"&v_pais="+v_pais+"&v_estado="+v_estado+"&v_municipio="+v_municipio+"&v_direccion="+v_direccion+"&v_referencia="+v_referencia+"&v_colonia="+v_colonia+"&v_edad="+v_edad+"&v_celular="+v_celular;
			var pagina = "registrocliente.php";

			var msj="";
			var bandera=1;
			if (v_nombre=='') {
				usuario1='Campo requerido';
				bandera=0;
			}


			if (v_paterno=='') {
				apellidop1='Campo requerido';
				bandera=0;
			}

			if (v_materno=='') {
				apellidom1='Campo requerido';
				bandera=0;
			}



			if (v_telefono=='') {
				telefono1='Campo requerido';
				bandera=0;
			}
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

			if (v_nivel==0) {
				contra1='Campo requerido';
				bandera=0;
			}

			if (v_posicion==0) {
				nivel1='Campo requerido';
				bandera=0;
			}

			if (v_fecha=='') {
				fecha1='Campo requerido';
				bandera=0;
			}

			if (v_contra1!=v_contra2) {
				bandera=0;
					coincidePassword('v_contra1','v_contra2');
			}

			if (v_sexo==0) {
				sexo1='Campo requerido';
				bandera=0;
			}


			if (v_codigopostal) {
				v_codigopostal1='Campo requerido';
				bandera=0;

			}

			if (v_pais) {
				v_pais1='Campo requerido';
				bandera=0;

			}
			if (v_estado) {
				v_estado1='Campo requerido';
				bandera=0;

			}

			if (v_municipio) {
				v_municipio1='Campo requerido';
				bandera=0;

			}

			if (v_direccion) {
				v_direccion1='Campo requerido';
				bandera=0;

			}


			if (v_colonia) {
				v_colonia1='Campo requerido';
				bandera=0;

			}
			

			if (v_edad) {
				v_edad1='Campo requerido';
				bandera=0;

			}

			if (v_celular) {
				v_celular1='Campo requerido';
				bandera=0;

			}



			if (bandera==1) {
				return 1;
			}else{


		if (v_nombre=='') {
			nombre1='Campo requerido';
			$("#lblnombre").html(nombre1);

			bandera=0;
		}

		if (v_paterno=='') {
			apellidop1='Campo requerido';
			$("#lblapellidop").html(apellidop1);

			bandera=0;
		}

		if (v_materno=='') {
			apellidom1='Campo requerido';
			$("#lblapellidom").html(apellidom1);

			bandera=0;
		}

		if (v_telefono==""){
			telefono='Campo requerido';
			$("#lbltelefono").html(telefono);
			bandera=0;
		}



		if (v_email=='') {
			email1='Campo requerido';
			bandera=0;
			$("#lblemail").html(email1);

		}

		if (v_contra1=='') {
			contra1='Campo requerido';
			bandera=0;
			$("#lblcontra1").html(contra1);

		}
		if (v_contra2=='') {
			contra2='Campo requerido';
			bandera=0;
			$("#lblcontra2").html(contra2);

		}

		if (v_nivel==0) {
			nivel1='Campo requerido';
			bandera=0;
			$("#lblnivel").html(nivel1);

		}

		if (v_posicion==0) {
			posicion1='Campo requerido';
			bandera=0;
			$("#lblposicion").html(posicion1);

		}
		if (v_fecha=='') {
			fecha1='Campo requerido';
			bandera=0;
			$("#lblfecha").html(fecha1);

		}

		if (v_sexo==0) {
			sexo1='Campo requerido';
			bandera=0;
			$("#lblsexo").html(sexo1);

		}

		if (v_contra1!=v_contra2) {
			bandera=0;

			coincidePassword('v_contra1','v_contra2');
		}

			return 0;
			}
	}


	//Funcion para abrir la camara del phone
	function TomarFotoIne(iduser) {
		var srcType = Camera.PictureSourceType.CAMERA;
		var options = setOptions(srcType);
		navigator.camera.getPicture(onSuccessIne,onError,options);
	}

	//El valor devuleto al tomar la foto lo envia a esta funcion 
	function onSuccessIne(RutaImagen) {
		//app.popup.close('.popup-opciones-subir-fotos');
		//document.getElementById("miimagen").src = RutaImagen;
		fichero=RutaImagen;
		
		var iduser = 0;
		
		//alert(v_idcamiones_gasolina);
		//app.dialog.alert("El ID DE CAMIONES GASOLINA ES: "+v_idcamiones_gasolina);
		
		
		guardar_foto_ine(iduser);
	}



	function guardar_foto_ine(iduser) {

		//app.preloader.show()
	        app.dialog.preloader('Cargando...');




	var pagina = "subirine1.php";


		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = fichero.substr(fichero.lastIndexOf('/') + 1);
		options.mimeType = "image/jpeg";
		options.chunkedMode = false;
		

		//Agregamos parametros
		var params = new Object();
	
		
		options.params = params;

		
		
		var ft = new FileTransfer();

		//ft.upload(fichero, "http://192.168.1.69/svnonline/iasistencia/registroasistencia/php/asistencia_fotos_g_actividad.php", respuesta, fail, options);
		
		
		//ft.upload(fichero, urlphp+"asistencia_fotos_g_actividad.php", respuesta, fail, options);
		
		ft.upload(fichero, urlphp+pagina, respuestafotoine, fail, options);

		
	}


	function respuestafotoine(r)
	{
		var resp = r.response;
		var obj = JSON.parse(resp);
		var result = obj[0]['respuesta'];
		var ruta = obj[0]['ruta'];

		//app.preloader.hide();
		app.dialog.close();
		if(result == 1){
			$(".check-list").css('display','block');
			localStorage.setItem('rutaine',ruta);
			alerta('','Imágen importada exitosamente');

			var rutaimagen=urlphp+'upload/ine/'+ruta;
			$("#aparecerimagenine").css('display','block');
			$("#imagenine").attr('src',rutaimagen);
    	   $("#aparecerimagenine").attr('onclick','VisualizarImagen(\''+rutaimagen+'\')');

		}else{
			//Hubo un error
			alerta(result,"ERROR");
		$(".check-list").css('display','none');
		   $("#aparecerimagenine").css('display','none');

		}	
	}


function onPhotoDataSuccessIne(imageData) {

	var pagina = "subirine2.php";

		var datos= 'imagen='+imageData;


		var pagina = urlphp+pagina;
	    app.dialog.preloader('Cargando...');

		$.ajax({
			url: pagina,
			type: 'post',
			dataType: 'json',
			data:datos,
			async:false,
			beforeSend: function() {
        // setting a timeout

    },

    success: function(data) {



	    app.dialog.close();

		alerta('','Imágen importada exitosamente');
    	

    	localStorage.setItem('rutaine',data.ruta);
			$(".check-list").css('display','block');

    	   var rutaimagen=urlphp+'upload/ine/'+data.ruta;
		   $("#aparecerimagenine").css('display','block');
		   $("#imagenine").attr('src',rutaimagen);
    	   $("#aparecerimagenine").attr('onclick','VisualizarImagen(\''+rutaimagen+'\')');


      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
                  	    var error;
                        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
                        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                                                 //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                         app.dialog.alert('Error leyendo fichero jsonP '+error,'Error');
                     $(".check-list").css('display','none');
                     		   $("#aparecerimagenine").css('display','none');

                    }
                                       

  }); 

	}

 //
 function getPhotoIne(source) {

      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoDataSuccessIne, onError, { quality: 50,
      	destinationType: destinationType.DATA_URL,
      	sourceType: source });


        //  navigator.camera.getPicture(onSuccess,onError,options);

    }

//Funcion para reportar error al usar la camara del phone
	function onError(err)
	{ 
		console.log(err); 
	}

	function resp(r){
		alerta("RESPUESTA : "+r.response);
	}

	function fail(error)
	{
		//app.preloader.hide();
		alerta("Ocurrio un error durante la ejecuccion: "+error.code);
	}





	 var geo_options2 = {
	  enableHighAccuracy: true,
	  maximumAge        : 30000,
	  timeout           : 27000
	};

    function IniciarSeguimientoGeo2()
     {   	//si se requiere un cierto tiempo agregar un timeout a la funcion whatchposition
	    
	    watchID2 = navigator.geolocation.watchPosition(ObtenerPosicionGeo2, ErrorGeoSeguimiento2,geo_options2);
	 
	     
	 }

 function ObtenerPosicionGeo2(position) {
        var coordenada = 'Latitude: '  + position.coords.latitude      + '<br />' +
                        'Longitude: ' + position.coords.longitude     + '<br />' ;
		
         var lonylat = position.coords.latitude+','+position.coords.longitude;
		localStorage.setItem("lonylat", lonylat);    //Longitud y latitud.   
		direccion2(position.coords.longitude,position.coords.latitude);
		
    }

 function ErrorGeoSeguimiento2(error) {
				var error = 'code: '    + error.code    + '\n' +
							'message: ' + error.message + '\n';
					//alert(error);
			//alerta('','No se puedo geolocalizar, intente de nuevo');

			}


  function TerminarSeguimientoGeo2()
    {
		    navigator.geolocation.clearWatch(watchID2);
	}




	function direccion2(long,latitude){

		var claveapi=localStorage.getItem('claveapi');
		TerminarSeguimientoGeo2();
		var content = document.getElementById("geolocation-test");
		//var url="https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+long+"&key=AIzaSyAHf-riigQZYI7pFVWJxspXp8X2TAA_kyI";
		var url="https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+long+"&key="+claveapi+"";
	        app.preloader.show();

	$.ajax({
			type: 'GET',
			dataType: 'json',
			url: url,
			crossDomain: true,
			cache: false,
			beforeSend: function() {
	        // setting a timeout
	        app.preloader.show();

    },
    success: function(datos){
    	

    	//alert(JSON.stringify(datos));


    		var jsondatos=JSON.stringify(datos);

    		var estatus=JSON.stringify(datos,['status']);
    		var estado=JSON.parse(estatus);

    	
    		if (estado.status=="OK") {	

    			  Pintardatos2(datos);

    		}else{

    		app.preloader.hide();

    			alerta('','No se ha podido geolocalizar su ubicación');
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

	function Pintardatos2(jsondatos) {

		var addres=jsondatos.results;

		var direccion=JSON.stringify(addres,['formatted_address']);
		var objetodireccion=JSON.parse(direccion);	

		var format=JSON.stringify(objetodireccion[0]);

		var json=JSON.parse(format);

		var dividir=json.formatted_address;
		var codigo = dividir.split(',');

		var code=codigo[2].substring(0,6);
		
		$(".codigopostalclase").val(code);

		Buscarcodigo();
		app.preloader.hide();

		
	}


function ObtenerTipoAsentamiento(idasen) {

	var idpais= $("#v_pais").val();
	var idestado=$("#v_estado").val();
	var idmunicipio=$("#v_municipio").val();
	var codigopostal=$("#v_codigopostal").val();
	
	var pagina = "ObtenerTipoAsentamiento.php";


	var datos="idpais="+idpais+"&idestado="+idestado+"&idmunicipio="+idmunicipio+"&codigopostal="+codigopostal;
		
		$.ajax({
 			type: 'POST',
 			url: urlphp+pagina,
			data:datos,
			dataType:'json',
			async:false,
			success: function(datos){

				var respuesta=datos.respuesta;


				var html="";
				if (respuesta.length > 0) {

					html1+=`<option value="0">Seleccionar tipo asentamiento </option>`;

					for (var i = 0; i < respuesta.length; i++) {

							//armar nivel
							html+=`<option  value="`+respuesta[i].tipo_asenta+`">`+respuesta[i].tipo_asenta+`</option>`;

						}
					}else{
						
						html+=`<option value="0">No se encuentran asentamientos</option>`;

					}


						$("#v_tipoasentamiento").html(html);

						if (idasen!=0){

							$("#v_tipoasentamiento").val(idasen);
		
						}

				},error: function(XMLHttpRequest, textStatus, errorThrown){ 
					var error;
					 if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
					 if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
									//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
						console.log("Error leyendo fichero jsonP "+pagina+" "+ error,"ERROR");
						}
				});
	}



function ObtenerTipoAsentamiento2(idpais,idestado,idmunicipio,codigopostal,idasen) {

	/*var idpais= $("#v_pais").val();
	var idestado=$("#v_estado").val();
	var idmunicipio=$("#v_municipio").val();
	var codigopostal=$("#v_codigopostal").val();
	*/
	var pagina = "ObtenerTipoAsentamiento.php";


	var datos="idpais="+idpais+"&idestado="+idestado+"&idmunicipio="+idmunicipio+"&codigopostal="+codigopostal;
		
		$.ajax({
 			type: 'POST',
 			url: urlphp+pagina,
			data:datos,
			dataType:'json',
			async:false,
			beforeSend: function() {
	        // setting a timeout
	       // app.preloader.show();

    },
			success: function(datos){

				var respuesta=datos.respuesta;


				var html="";
				if (respuesta.length > 0) {

					html+=`<option value="0">Seleccionar tipo asentamiento </option>`;

					for (var i = 0; i < respuesta.length; i++) {

							//armar nivel
							html+=`<option  value="`+respuesta[i].tipo_asenta+`">`+respuesta[i].tipo_asenta+`</option>`;

						}
					}else{
						
						html+=`<option value="0">No se encuentran asentamientos</option>`;

					}

						$("#v_tipoasentamiento").html(html);

					if (idasen!='0'){

							$("#v_tipoasentamiento").val(idasen);
		
						}

				// app.preloader.hide();

				},error: function(XMLHttpRequest, textStatus, errorThrown){ 
					var error;
					 app.preloader.hide();
					 if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
					 if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
									//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
						console.log("Error leyendo fichero jsonP "+pagina+" "+ error,"ERROR");
						}
				});
	}

function ColocarColonia() {

	var idpais= $("#v_pais").val();
	var idestado=$("#v_estado").val();
	var idmunicipio=$("#v_municipio").val();
	var tipoasentamiento=localStorage.getItem('tipo_asenta');
	var codigopostal=$("#v_codigopostal").val();
	var nombre=$("#v_nombre").val();
	var paterno=$("#v_paterno").val();
	var materno=$("#v_materno").val();
	var sexo=$("#v_sexo").val();
	var celular=$("#v_celular").val();
	var telefono=$("#v_telefono").val();

	var calle=$("#v_calle").val();
	var no_exterior=$("#no_exterior").val();
	var no_interior=$("#no_interior").val();
	var v_calle1=$("#v_calle1").val();
	var v_calle2=$("#v_calle2").val();
	var v_referencia=$("#v_referencia").val();
	var v_email=$("#v_email").val();
	var v_contra1=$("#v_contra1").val();
	var v_contra2=$("#v_contra2").val();
	var v_edad=$("#v_edad").val();

	var objeto={
		idpais:idpais,
		idestado:idestado,
		idmunicipio:idmunicipio,
		tipoasentamiento:tipoasentamiento,
		codigopostal:codigopostal,
		nombre:nombre,
		paterno:paterno,
		materno:materno,
		sexo:sexo,
		celular:celular,
		telefono:telefono,
		calle:calle,
		no_exterior:no_exterior,
		no_interior:no_interior,
		v_calle1:v_calle1,
		v_calle2:v_calle2,
		v_referencia:v_referencia,
		v_email:v_email,
		v_contra1:v_contra1,
		v_contra2:v_contra2,
		v_edad:v_edad

	};

	localStorage.setItem('datosbuscar',JSON.stringify(objeto));

	if (codigopostal!='') {

	if (idpais>0) {

		if (idestado>0) {

			if (idmunicipio>0) {

				/*if (tipoasentamiento!=0) {*/

					 GoToPage("colonias");

				/*}else{*/

				//alerta('','Elige un tipo de asentamiento');

				//}
			}else{
				alerta('','Elige un municipio');

			}
		}else{

			alerta('','Elige un estado');

			}
		}else{


			alerta('','Elige un pais');
		}
	}else{

		alerta('','Falta código postal');


	}



	
}

function ObtenerColonias(idpais,idestado,idmunicipio,tipoasen) {

	var pagina="ObtenerColonias2.php";
	var codigopostal=$("#v_codigopostal").val();
	var datos="idpais="+idpais+"&idestado="+idestado+"&idmunicipio="+idmunicipio+"&tipoasen="+tipoasen+"&v_codigopostal="+codigopostal;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
		
			console.log(datos);

			var respuesta=datos.respuesta;

			PintarColonias(respuesta);

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
					}
		});

	}


	function PintarColonias(datos) {
	
		var html="";

		if (datos.length>0) {
		for (var i = 0; i <datos.length; i++) {
			
					localStorage.setItem('listadocolonias',JSON.stringify(datos));

				html+=`  <li class="coloniasli clasescolonia`+datos[i].idcodigopostal+`">

            <label class="" style="">
                 <input type="checkbox" name="my-radio" class="colonias" onchange="Seleccionar1(\'`+datos[i].asenta+`\',\'`+datos[i].tipo_asenta+`\',`+i+`)"  id="colonia_`+i+`" style="display: block!important;float: left;top: 1em;position: absolute; margin-left: 1em;">
                 <div class="item-content">
              <div class="item-inner">
               
                <div class="item-text" style="margin-left: 1em;padding-top: 0.1em;" onclick="Seleccionar1(\'`+datos[i].asenta+`\',\'`+datos[i].tipo_asenta+`\',`+i+`)">
                <label>`+datos[i].tipo_asenta+` `+datos[i].asenta+`</label>`
                +`
                </div>

              </div>
               <div class="item-after">
                
                </div>
                </div>
            </label>
          </li>`;
		}

	html+=`
		<li class="coloniasli clasescolonia0" style="display:none;">

		<label class="label-radio item-content">
              <div class="item-inner">
               
                <div class="item-text" style="margin-left: 1em;" id="colonia_">
                <label>NO SE ENCONTRARON COINCIDENCIAS
                </div>

              </div>
               <div class="item-after">
                
                </div>
            </label>
            </li>`;

	}else{



		html=`
		<li>

		<label class="label-radio item-content">
              <div class="item-inner">
               
                <div class="item-text" style="margin-left: 1em;" id="colonia_">
                <label>NO SE ENCONTRARON COLONIAS
                </div>

              </div>
               <div class="item-after">
                
                </div>
            </label>
            </li>`;


	}

	
	$("#listadocolonias").html(html);

	}

	function Seleccionar1(asentamiento,tipo_asenta,i) {

			$(".colonias").prop('checked',false);

			if (localStorage.getItem('cont')==i) {

				localStorage.setItem('asenta','');
				localStorage.setItem('tipo_asenta','');
				localStorage.setItem('cont',-1);

			}else{


				
				$("#colonia_"+i).prop('checked',true);
				localStorage.setItem('asenta',asentamiento);
				localStorage.setItem('tipo_asenta',tipo_asenta);
				localStorage.setItem('cont',i);

			}
			
			

		
	}

	function Seleccionar2(asentamiento,tipo_asenta,i) {

		
		
		if($("#colonia_"+i).is(':checked')) {
    	
    		$("#colonia_"+i).prop('checked',false);
    		localStorage.setItem('asenta','');
			localStorage.setItem('tipo_asenta','');

		}else{
			$(".colonias").prop('checked',false);

			$("#colonia_"+i).prop('checked',true);
			localStorage.setItem('asenta',asentamiento);
			localStorage.setItem('tipo_asenta',tipo_asenta);

		}
	}


	function Regresarregistro() {
		
	GoToPage("registrarse");

	}

	function Limpiarcampo() {

		$("#v_colonia").val('');
		
		localStorage.setItem('asenta','');


	}


	function Limpiarcampo3() {

		$("#v_colonia").val('');

			localStorage.setItem('asenta','');
	}


 var cambiar1=1;
  var cambiar2=1;

      function Contarletrasr(elemento,classe) {

          var longitud=$("#"+elemento).val().length;

        if (longitud>0) {


          $("."+classe).css('display','block');

        }else{

        $("."+classe).css('display','none');
   
        }

      }


function CambiarAtributo1(elemento) {


        if (cambiar1==1) {

           var valor= $('#'+elemento).val();
             $('#'+elemento).remove();
            var html=`<input type="text" name="v_contra1" value="`+valor+`"  placeholder="Contraseña" id="v_contra1" class="place input-with-value" style="float: left;width: 90%;" onkeyup="CoincidirContra2('v_contra1','v_contra2');Contarletrasr('v_contra1','ojito1');">`;


            $(".cambio1").html(html);

          cambiar1=2;

        }else{
              
             var valor= $('#'+elemento).val();
             $('#'+elemento).remove();

            $(".cambio1").html(''); 

           var html=`<input type="password" name="v_contra1"  value="`+valor+`" placeholder="Contraseña" id="v_contra1" class="place input-with-value" style="float: left;width: 90%;" onkeyup="CoincidirContra2('v_contra1','v_contra2');Contarletrasr('v_contra1','ojito1');">`;
           

            $(".cambio1").html(html); 
            cambiar1=1;
        }
        

      }



function CambiarAtributo2(elemento) {


        if (cambiar2==1) {

           var valor= $('#'+elemento).val();
             $('#'+elemento).remove();
            var html=`<input type="text" value="`+valor+`" name="v_contra2" placeholder="Confirmar contraseña" style="float: left;width: 90%;" id="v_contra2" onkeyup ="CoincidirContra('v_contra1','v_contra2');Contarletrasr('v_contra2','ojito2');" class="place input-with-value">`;


            $(".cambio2").html(html);

          cambiar2=2;

        }else{
              
             var valor= $('#'+elemento).val();
             $('#'+elemento).remove();

            $(".cambio2").html(''); 

            var html=`<input type="password" value="`+valor+`" name="v_contra2" placeholder="Confirmar contraseña" style="float: left;width: 90%;" id="v_contra2" onkeyup ="CoincidirContra('v_contra1','v_contra2');Contarletrasr('v_contra2','ojito2');" class="place input-with-value">`;
           

            $(".cambio2").html(html); 
            cambiar2=1;
        }
        

      }
function validarEmail(valor) {
 	var email=valor.trim();

   var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

    if (caract.test(email) == false){

        return false;
    }else{

        return true;
    }
}




function ValidarCelular() {

	var telefono=$("#telefono").val();
	var inputleido=$("#inputleido").is(':checked')?1:0;
	//GoToPage('colocartoken');
	if (telefono!='') {
	if (inputleido==1) {
	

		app.dialog.confirm('','¿Es correcto tu número celular '+telefono+'?' , function () {


		var sistema=localStorage.getItem('SO');
		var uuid=localStorage.getItem('UUID');
		var datos="telefono="+telefono+"&sistema="+sistema+"&uuid="+uuid+"&inputleido="+inputleido;

		var pagina = "validaciontelefono.php";

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
			var respuesta=datos.respuesta;
			var existe=respuesta.existe;
			var idusuario=respuesta.idusuario;
			var completado=respuesta.completado;
				localStorage.setItem('id_user',idusuario);
			localStorage.setItem('completado',completado);
			localStorage.setItem('celular',telefono);
			

			if (completado==1) {
				alerta('','El número celular que ingresaste ya fue asignado a un usuario')
			}else{

				GoToPageHistory('token');
	
			}
			//

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
				//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
				console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});

		});

		}else{
			alerta('','Antes de continuar, haz click en políticas y condiciones de servicio');

		}
	}else{

			alerta('','Ingresa celular');

	}

}

function ValidarToken(){

		var token1=$("#t1").val();
		var token2=$("#t2").val();
		var token3=$("#t3").val();
		var token4=$("#t4").val();
		var token=token1+token2+token3+token4;
		var idcliente=localStorage.getItem('id_user');
		var datos="token="+token+"&idcliente="+idcliente;
		var pagina = "validaciontoken.php";
		var enviar=1;

			//	GoToPage('elegirciudad');

		if (token1=='') {
			enviar=0;
			}
		if (token2=='') {
			enviar=0;
			}
		if (token3=='') {
			enviar=0;
			}
		if (token4=='') {
			enviar=0;
			}

		if (enviar==1) {
		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
			var respuesta=datos.respuesta.tokenvalidado;
		

			if (respuesta==1) {
				
				$("#botoncontinuartoken").css('display','block');
				$("#botoncontinuartoken").attr('onclick','GoToPageHistory("registrofoto")');

			}else{

				$("#botoncontinuartoken").css('display','none');

				alerta('','Token no válido');
			}
			//

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
				//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
				console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});

			

	}
}

function Bienvenida(){

	var txtciudad=$("#txtciudad").val();
	var clavemunicipio=localStorage.getItem('c_municipio');
	var claveestado=localStorage.getItem('c_estado');
	var id_user=localStorage.getItem('id_user');
	var datos='txtciudad='+txtciudad+"&claveestado="+claveestado+"&clavemunicipio="+clavemunicipio+"&idcliente="+id_user;
	var pagina="GuardarCiudad.php";		

	if (txtciudad!='') {
			$.ajax({
			type: 'POST',
			dataType: 'json',
			url: urlphp+pagina,
			data:datos,
			async:false,
			success: function(datos){
				
				var respuesta=datos.respuesta;
				var mensaje=datos.mensaje;

				if (respuesta==1) {
					
					GoToPage('bienvenida');


				}else{

					alerta('',mensaje);
				}
				//

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
					if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
					if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
					//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
		}else{

			alerta('','Selecciona una ciudad para continuar');
		}


}

function Datospersonales(){

	GoToPageHistory('datospersonales');
}

function identificacionoficial(){

	GoToPageHistory('identificacionoficial');
}

function fotodeperfil(){

	GoToPageHistory('fotoperfil');
}
function licenciafoto(argument) {

	GoToPage('licenciafoto');
}
function Tarjetacirculacion(argument) {
	GoToPage('tcirculacion');
}
function antecedentesnopenales(argument) {
	GoToPage('antecedentes');
}
function Dashboard(argument) {
	GoToPage('dashboard');
}

function BuscadorCiudad() {

	var buscador=$("#txtciudad").val();
	var datos="buscador="+buscador;
	var pagina = "buscadorciudad.php";

	if (buscador!='') {
		$("#limpiarinput").css('display','block');
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
			var ciudades=datos.ciudades;

			PintarCiudades(ciudades);


		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
				//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
				console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
	}else{
		$("#limpiarinput").css('display','none');

	$("#listaciudades").html('');

	}

}
function PintarCiudades(ciudades) {
	var html='';
	if (ciudades.length>0) {
		for (var i = 0; i<ciudades.length; i++) {
			
			html+=` <li>
            <div class="item-content" onclick="ElegirCiudad(`+i+`,\'`+ciudades[i].c_municipio+`\',\'`+ciudades[i].c_estado+`\')">
              <div class="item-media"></div>
              <div class="item-inner">
                <div class="item-text" id="ciudad_`+i+`">`+ciudades[i].ciudad+`</div>
                
              </div>
            </div>
          </li>`;
		}
	}else{

		html+=` <li>
            <div class="item-content">
              <div class="item-media"></div>
              <div class="item-inner">
                <div class="item-title">No se encuentran coincidencias</div>
                
              </div>
            </div>
          </li>`;
	}

	$("#listaciudades").html(html);
}

function ElegirCiudad(i,c_municipio,c_estado) {
	localStorage.setItem('c_municipio',c_municipio);
	localStorage.setItem('c_estado',c_estado);

	var texto=$("#ciudad_"+i).text();

	$("#txtciudad").val(texto);
	$("#listaciudades").html('');

}

function Limpiarinput() {
	$("#txtciudad").val('');
	$("#limpiarinput").css('display','none');

}


function Tomarfotoperfil() {
	var id_user=localStorage.getItem('id_user');
	TomarFoto(id_user);
}

function Siguiente(elemento1,elemento2) {
	
	if ($('#'+elemento1).val().length>0) {

		var valor=$('#'+elemento1).val();
		
		
		if ($('#'+elemento1).val().length==1) {
			val=valor.substring(0,1);
			$('#'+elemento1).val(val);
			$("#"+elemento2).focus();
			$("#"+elemento1).css('cssText','border-color:#a9cfd4 !important');
		}else{

			const stringObject = new String(valor); 
			if ($('#'+elemento1).val().length>2) {
			for (var i = 0; i < stringObject.length; i++) {
			 	
			 	var valor=stringObject[i];
			 	var va=i+1;
			 	$("#t"+va).val(valor);

			 	$("#t"+va).focus();
				$("#t"+va).css('cssText','border-color:#a9cfd4 !important');
			
			 }

			 ValidarToken();


			}
		}

		


	}else{

		$("#"+elemento1).focus();
		$("#"+elemento1).css('cssText','border-color:#e9e9e9 !important');

	}


}

function Validarcaja(elemento) {
	if ($('#'+elemento).val().length>0) {
		var valor=$('#'+elemento).val();

		val=valor.substring(0,1);
		$('#'+elemento).val(val);

	 $("#"+elemento).focus();
	 $("#"+elemento).css('cssText','border-color:#a9cfd4 !important');
	
	}else{

	$("#"+elemento).focus();
	$("#"+elemento).css('cssText','border-color:#e9e9e9 !important');


	}
}


function RegresarAcceso() {
	GoToPageHistory('registrar')
}
function SolicitarMembresia() {
	GoToPage('solicitarmembresia');
}

function AlumnosSecundarios(argument) {
	var v_tipousuario=$("#v_tipousuario").val();

	if (v_tipousuario==3) {
		var v_correo=$("#v_correo").val();
		var v_contra1=$("#v_contra1").val();
		var v_contra2=$("#v_contra2").val();
		localStorage.setItem('vcorreoregistro',v_correo);
		localStorage.setItem('vcontra1registro',v_contra1);
		localStorage.setItem('vcontra2registro',v_contra2);
		localStorage.setItem('vtipousuario',v_tipousuario);
		//GoToPage('registrotutorados');
		if ($(".my-sheet-swipe-to-close1")) {
			$(".my-sheet-swipe-to-close1").remove();
		}
		AbrirModalRegistroTutorados();
		MostrarFormTutorado();
		var alumnos=obtenerObjetosLocalStorage();

		if (alumnos.length>0) {
			leerLocalStorage();
		}

	}else{

		alerta('','Necesitas ser tipo alumno para agregar tutorados');
	}
	
}

/*Modal registro tutorados*/
function AbrirModalRegistroTutorados() {
	
	
var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 100%;background: none;">
            <div class="toolbar">
              <div class="toolbar-inner">
                <div class="left"></div>
                <div class="right">
                  <a class="link sheet-close"></a>
                </div>
              </div>
            </div>
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px; ">
              <div class="page-content" style="height: 100%;">
                <div style="background: white; height: 100%;width: 100%;border-radius: 20px;">
   						     <div class="row">
	   						     <div class="col-20">
	   						      	 <div class="iconocerrar link sheet-close">
	 									<span class="bi bi-x-circle-fill"></span>
	   						    	 </div>
	   						    </div>

   						    	 <div class="col-60">
   						    	 <span class="titulomodal"></span>
   						    	 </div>
   						    	 <div class="col-20">
   						    	 <span class="limpiarfiltros"></span>
   						    	 </div>
   							 </div>
   							 <div class="row" style="position: absolute;width: 100%;">
   							 	
	   							  <div class="col-100">


		   							  <div class="" style="margin-right:1em;margin-left:1em;">
		   
		  
		    <div class=" " >
           <div style="margin-left: 1em;" class="col-85 medium-50 large-40 margin-left-auto margin-right-auto align-self-center  padding-vertical">
          <h1 style=""> Ingresa los <span style="color: #0abe68;">datos</span> del nuevo asociado
          </h1>

          
         </div>

          <div class="" >

            <div  class="listadotutorados" >
                <div class="row" style="padding-top: 3em;">



        <div class="col">

         
          <div class="block">
         
         <div class="list media-list " id="" style="">           
          <div class="listado"></div>
      <!-- <div class="col-100 medium-33 large-50" style="    margin-top: 1em;
    margin-bottom: 1em;">
    <div class="card">
                <div class="card-content card-content-padding "><div class="row">
                  <div class="col-auto align-self-center">
                    <div class="avatar avatar-40 alert-danger text-color-red rounded-circle">
                     
                    </div>
                  </div>
                  <div class="col align-self-center no-padding-left">
                      <div class="row margin-bottom-half"><div class="col">
                        <p class="small text-muted no-margin-bottom"></p>
                        <p>No tienes tutorados registrados</p></div>
                        <div class="col-auto text-align-right"><p class="small text-muted no-margin-bottom"></p><p class="small"></p>
                        </div>
                      </div>
                     
                     </div>
                   </div>
                   </div>
                  </div>
                 </div> -->


          <button id="btnnuevotutorado" class="button button-fill botonesaccion botonesredondeado estiloboton" >Agregar un tutorado</button>



                
              
              </div>

        </div>
      </div>
    </div>
      </div>
      <div class="col-85 medium-50 large-40 margin-left-auto margin-right-auto align-self-center text-align-center " id="formtutorados" style="display: none;    margin-right: 1em;
    margin-left: 1em;">
            <form style="" >
                              <input type="hidden" name="v_idtu" id="v_idtu" class="input-with-value" />
                              <input type="hidden" name="v_idusuario" id="v_idusuario" class="input-with-value" />

              <!---<div class=" no-margin margin-bottom" >
              	<div>
	            <div class="item-content lipoliticas" >
		            <div class="item-inner" style="    display: flex;justify-content: left;height: 50px;">
		            <input type="checkbox" id="inputtutor" onchange="SoyTutor()">
		            <span style="margin-left:1em;margin-top: 0.8em;">Soy tutor</span>
		            </div>
	            </div>
            </div>¡--->

            <div class="" style="    margin-top: 1em; margin-bottom: 1em;">
            	<div class="row">
                                <div class="col-auto">
                                    <label class="toggle toggle-init color-theme">
                                        <input type="checkbox" id="inputtutor" onchange="SoyTutor()">
                                        <span class="toggle-icon"></span>
                                    </label>
                                </div>
                                <div class="col" style="margin: 0; padding: 0;
    justify-content: left;
    display: flex;">
                                    <h5 class="no-margin-bottom">Soy tutor</h5>
                                </div>
                            </div>
             </div>

              <div class=" lisincelular" style="display:none;margin-bottom: 1em;">
            	<div class="row">
                                <div class="col-auto">
                                    <label class="toggle toggle-init color-theme">
                                        <input type="checkbox" id="inputsincelular" onchange="SinCelular()">
                                        <span class="toggle-icon"></span>
                                    </label>
                                </div>
                                <div class="col" style="    margin: 0;padding: 0;justify-content: left;display: flex;">
                                    <h5 class="no-margin-bottom">Sin celular</h5>
                                </div>
                            </div>
             </div>

          <!---  <div>
	            <div class="item-content lisincelular" style="display:none;" >
		            <div class="item-inner" style="  display: flex;  justify-content: left;height: 50px;">
		            <input type="checkbox" id="inputsincelular" onchange="SinCelular()">
		            <span style="margin-left:1em;margin-top: 0.8em;">Sin celular</span>
		            </div>
	            </div>
            </div>¡--->

            <div class="list form-list no-margin margin-bottom" >
              	

               <ul>

              <li class="item-content item-input item-input-with-value is-valid licelulartu">
                  <div class="item-inner" style="">
                  <div class="item-title item-floating-label">Celular</div>
                  <div class="item-input-wrap">
                  <input type="text" name="v_celulartu" id="v_celulartu" class="input-with-value" onkeyup="ValidarCampo(this);BuscarUsuario();" />
                  <span class="input-clear-button" id="v_celulartu_1" style="display:none;"></span>
                </div>
              </div>
              </li>

              <div id="mensajecelular" style="color:red;"></div>


                <li class="item-content item-input item-input-with-value is-valid linombretu">
	                  <div class="item-inner">
	                  <div class="item-title item-floating-label">Nombre</div>
	                  <div class="item-input-wrap">
	                  <input type="text" name="v_nombretu" id="v_nombretu" class="input-with-value" onkeyup="ValidarCampo(this)" />
	                  <span class="input-clear-button" id="v_nombretu_1" style="display:none;"></span>
		              </div>
		             </div>
             	 </li>

               <li class="item-content item-input item-input-with-value is-valid lipaternotu" >
                  <div class="item-inner">
                  <div class="item-title item-floating-label">Apellido paterno</div>
                  <div class="item-input-wrap">
                  <input type="text" name="v_paternotu" id="v_paternotu" class="input-with-value" onkeyup="ValidarCampo(this)" />
                  <span class="input-clear-button" id="v_paternotu_1" style="display:none;"></span>
                </div>
              </div>
              </li>



               <li class="item-content item-input item-input-with-value is-valid limaternotu">

                  <div class="item-inner">
                  <div class="item-title item-floating-label">Apellido materno</div>
                  <div class="item-input-wrap">
                  <input type="text" name="v_maternotu" id="v_maternotu" class="input-with-value" onkeyup="ValidarCampo(this)" />
                  <span class="input-clear-button" id="v_maternotu_1" style="display:none;"></span>
                </div>
              </div>
              </li>

               <li class="item-content item-input item-input-with-value is-valid lifechanacimientotu">

                  <div class="item-inner">
                  <div class="item-title item-floating-label">Fecha de Nacimiento</div>
                  <div class="item-input-wrap">
                  <input type="date" name="v_fechatu" id="v_fechatu" class="input-with-value"  />
                  <span class="input-clear-button"></span>
                </div>
              </div>
              </li>

               <li class="item-content item-input item-input-with-value is-valid lisexotu">

                  <div class="item-inner">
                  <div class="item-title item-floating-label">Sexo:</div>
                  <div class="item-input-wrap">
                  <select name="gender" id="v_sexotu" class="">
                          <option value="0" class="special">Seleccionar género</option>
                          <option class="black" value="H" >HOMBRE</option>
                          <option class="black" value="M">MUJER</option>
                        </select>
                </div>
              </div>
              </li>


               <li class="item-content item-input item-input-with-value is-valid liparentescotu">

                  <div class="item-inner">
                  <div class="item-title item-floating-label">Parentesco:</div>
                  <div class="item-input-wrap">
                  <select name="gender" id="v_parentescotu" class="">
                          <option value="0" class="special">Seleccionar parentesco</option>
                          
                        </select>
                </div>
              </div>
              </li>

           

               <li class="item-content item-input item-input-with-value is-valid licorreotu" style="display:none;">

                  <div class="item-inner">
                  <div class="item-title item-floating-label">Email</div>
                  <div class="item-input-wrap">
                  <input type="text" name="v_correotu" id="v_correotu" class="input-with-value" onkeyup="ValidarCampo(this)" />
                  <span class="input-clear-button" style="display:none;"></span>
                </div>
              </div>
              </li>

              <div id="mensajecorreo" style="color:red;"></div>
          


            </ul>

            


            </div>
          
              <p class="margin-bottom"> </p>

              <div class="">
              	
              	<div class="col-100 ocultar" >
	              	<button type="button"  class="button button-fill button-raised margin-bottom color-theme" id="btnsiguiente" style="">
	               Siguiente
	              </button>
              	</div>
            
	              <div class="col-100 mostrar">
	              <button type="button"  class="button button-fill button-large button-raised margin-bottom color-theme" id="btnguadartuto" style="display:none;">
	               Guardar
	              </button>
	              </div>

	              <div class="col-100 mostrar" >
              	<button type="button"  class="button button-fill button-raised margin-bottom color-theme" id="btnregresa" style="display:none">
               Regresar
              </button>
              	</div>

	            </div>
            </form>          
			</div>
          </div>
         
        </div>
      </div>
    </div>


		   							 			` ;
				

		   							 	html+=`</div>

	   							 	</div>

   							 </div>

   				</div>
                
              </div>
            </div>
          </div>`;
          
	  dynamicSheet2 = app.sheet.create({
        content: html,

    	swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
              $$('#btnnuevotutorado').attr('onclick','MostrarFormTutorado()');
			  $$('.btnregresar').attr('onclick','RegresarApantalla()');
			  $$("#btnsiguiente").attr('onclick','Siguientesdatos()');
			   phoneFormatter('v_celulartu');
			  $$("#btnregresa").attr('onclick','Atrasdatos()');

    		leerLocalStorage();
    		
    		ObtenerParentesco(0);


    		$("#v_celulartu").attr('onblur','Cambiar2(this);QuitarEspacios(this);');
			$("#v_nombretu").attr('onblur','Cambiar2(this);QuitarEspacios(this);');
			$("#v_paternotu").attr('onblur','Cambiar2(this);QuitarEspacios(this);');
			$("#v_maternotu").attr('onblur','Cambiar2(this);QuitarEspacios(this);');
			$("#v_fechatu").attr('onblur','Cambiar2(this);QuitarEspacios(this);');
			$("#v_sexotu").attr('onblur','Cambiar2(this);QuitarEspacios(this);');
			$("#v_parentescotu").attr('onblur','Cambiar2(this);QuitarEspacios(this);');
			$("#v_correotu").attr('onblur','Cambiar2(this);QuitarEspacios(this);');

			$("#v_celulartu").attr('onfocus','Cambiar(this)');
			$("#v_nombretu").attr('onfocus','Cambiar(this)');
			$("#v_paternotu").attr('onfocus','Cambiar(this)');
			$("#v_maternotu").attr('onfocus','Cambiar(this)');
			$("#v_fechatu").attr('onfocus','Cambiar(this)');
			$("#v_sexotu").attr('onfocus','Cambiar(this)');
			$("#v_parentescotu").attr('onfocus','Cambiar(this)');
			$("#v_correotu").attr('onfocus','Cambiar(this)');
          	var fecha=new Date();
		    var dia=fecha.getDate()<10?'0'+fecha.getDate():fecha.getDate();
		    var mes=(fecha.getMonth() + 1)<10?'0'+(fecha.getMonth() + 1):(fecha.getMonth() + 1);
		    var anio=fecha.getFullYear();
		    var fechaactualdata=anio+'-'+ mes+'-'+dia;

		    $("#v_fechatu").val(fechaactualdata);
		  

          },
          opened: function (sheet) {
            console.log('Sheet opened');

            var v=$("#v_idtu").val();



    			if (v=='' || v==-1) {
    				
    			 $$('#btnguadartuto').attr('onclick','GuardarTutorado(-1)');

    			}else{
    			$$('#btnguadartuto').attr('onclick','GuardarTutorado('+v+')');

    			}

    			
          },

          close:function () {
          	leerLocalStorage();

          },
        }
      });

       dynamicSheet2.open();
}

function ValidarCampo(elemento) {
	var id=elemento.id;
	if($("#"+id).val().length>0){

	  $("#"+id+'_1').css('display','block');
	
		}else{

	  $("#"+id+'_1').css('display','none');

	}
}


function SinCelular() {

	if($("#inputsincelular").is(':checked')){
		$("#v_celulartu").attr('disabled',true);
		$(".licelulartu").css('display','none');
	}else{
		$("#v_celulartu").attr('disabled',false);
		$(".licelulartu").css('display','block');

	}
	
}

function SoyTutor() {

	if($("#inputtutor").is(':checked')){
		$(".lisincelular").css('display','block');
	}else{
		$(".lisincelular").css('display','none');
		}
	
}

function Siguientesdatos() {
	$(".linombretu").removeClass('is-invalid');
	$(".lipaternotu").removeClass('is-invalid');
	$(".limaternotu").removeClass('is-invalid');
	$(".lifechanacimientotu").removeClass('is-invalid');
	$(".lisexotu").removeClass('is-invalid');
	$(".liparentescotu").removeClass('is-invalid');

	$(".linombretu").addClass('is-valid');
	$(".lipaternotu").addClass('is-valid');
	$(".limaternotu").addClass('is-valid');
	$(".lifechanacimientotu").addClass('is-valid');
	$(".lisexotu").addClass('is-valid');
	$(".liparentescotu").addClass('is-valid');

	var v_nombretu=$("#v_nombretu").val();
	var v_paternotu=$("#v_paternotu").val();
	var v_maternotu=$("#v_maternotu").val();
	var v_fechatu=$("#v_fechatu").val();
	var v_sexotu=$("#v_sexotu").val();
	var v_parentescotu=$("#v_parentescotu").val();

	bandera=1;
	if (v_nombretu=='') {
			nombre='Campo requerido';
			$("#lblnombre").html(nombre);

			bandera=0;

			$(".linombretu").addClass('is-invalid');
			$(".linombretu").removeClass('is-valid');

		}

		if (v_paternotu=='') {
			apellidop1='Campo requerido';
			$("#lblapellidop").html(apellidop1);
			bandera=0;
			$(".lipaternotu").addClass('is-invalid');
			$(".lipaternotu").removeClass('is-valid');
		}

		if (v_maternotu=='') {
			apellidom1='Campo requerido';
			$("#lblapellidom").html(apellidom1);
			bandera=0;
			$(".limaternotu").addClass('is-invalid');
			$(".limaternotu").removeClass('is-valid');
		}


		if (v_sexotu==0) {
		sexo='Campo requerido';
			bandera=0;

			$(".lisexotu").addClass('is-invalid');
			$(".lisexotu").removeClass('is-valid');
		}

		if (v_parentescotu==0) {
		parentesco='Campo requerido';
			bandera=0;

			$(".liparentescotu").addClass('is-invalid');
			$(".liparentescotu").removeClass('is-valid');
		}



		if (isValidDate(v_fechatu)==false) {
			bandera=0;

			$(".lifechanacimientotu").addClass('is-invalid');
			$(".lifechanacimientotu").removeClass('is-valid');
		}

			if (bandera==1) {
				$(".linombretu").css('display','none');
				$(".lipaternotu").css('display','none');
				$(".limaternotu").css('display','none');
				$(".lifechanacimientotu").css('display','none');
				$(".lisexotu").css('display','none');
				$(".liparentescotu").css('display','none');
				$(".licelulartu").css('display','block');
				//$(".licorreotu").css('display','block');
				$(".ocultar").css('display','none');
				$(".mostrar").css('display','block');
				$("#btnregresa").css('display','block');
				$("#btnguadartuto").css('display','block');
			}else{


			if (v_nombretu=='') {
			nombre='Campo requerido';
			$("#lblnombre").html(nombre);

			bandera=0;

			$(".linombretu").addClass('is-invalid');
			$(".linombretu").removeClass('is-valid');

			}

		if (v_paternotu=='') {
			apellidop1='Campo requerido';
			$("#lblapellidop").html(apellidop1);

			bandera=0;
			$(".lipaternotu").addClass('is-invalid');
			$(".lipaternotu").removeClass('is-valid');
		}

		if (v_maternotu=='') {
			apellidom1='Campo requerido';
			$("#lblapellidom").html(apellidom1);

			bandera=0;
			$(".limaternotu").addClass('is-invalid');
			$(".limaternotu").removeClass('is-valid');
		}


		if (v_sexotu==0) {
		sexo='Campo requerido';
			bandera=0;

			$(".lisexotu").addClass('is-invalid');
			$(".lisexotu").removeClass('is-valid');
		}

		if (v_parentescotu==0) {
		parentesco='Campo requerido';
			bandera=0;

			$(".liparentescotu").addClass('is-invalid');
			$(".liparentescotu").removeClass('is-valid');
		}


			if (isValidDate(v_fechatu)==false) {
				bandera=0;

				$(".lifechanacimientotu").addClass('is-invalid');
				$(".lifechanacimientotu").removeClass('is-valid');
			}

		}

			if (bandera==0) {

				alerta('','Te falta por capturar una opción obligatoria');
			}
}

function Atrasdatos(argument) {
				$(".linombretu").css('display','block');

				$(".lipaternotu").css('display','block');
				$(".limaternotu").css('display','block');
				$(".lifechanacimientotu").css('display','block');
				$(".lisexotu").css('display','block');
				$(".liparentescotu").css('display','block');
				$(".licelulartu").css('display','block');
				//$(".licorreotu").css('display','block');
				
				/*$(".ocultar").css('display','block');
				$(".mostrar").css('display','none');*/
				$("#btnsiguiente").css('display','none');
				$("#btnregresa").css('display','none');
				$("#btnguadartuto").css('display','block');
}

function CargardatosIngresados() {
	var correo=localStorage.getItem('vcorreoregistro');
	var contra1=localStorage.getItem('vcontra1registro');
	var contra2=localStorage.getItem('vcontra2registro');


	$("#v_correo").val(correo);
	$("#v_contra1").val(contra1);
	$("#v_contra2").val(contra2);


}

function TipoUsuario() {
	var tipousuario=$("#v_tipousuario").val();
	if (tipousuario==3) {

		$("#mostrartuto").css('display','block');
	}else{

		$("#mostrartuto").css('display','none');
	
	}
}

function ObtenerTiposUsuarios() {

		var pagina = "ObtenerTiposUsuarios.php";

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		async:false,
		success: function(datos){
			PintarTipoUsuarios(datos.respuesta);

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
				//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
				console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}

function PintarTipoUsuarios(respuesta) {
	var html="";
	html+=`<option value="0">Selecciona tipo de usuario</option>`;
	if (respuesta.length>0) {
		for (var i = 0; i < respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].idtipousuario+`">`+respuesta[i].nombretipo+`</option>`;

		}

		$("#v_tipousuario").html(html);


			var tipousuario=localStorage.getItem('vtipousuario');
			if (tipousuario!=null) {

				$("#v_tipousuario").val(tipousuario);
			//TipoUsuario();
			}
	}
}

function MostrarFormTutorado() {
	Atrasdatos();
	$(".listadotutorados").css('display','none');
	$("#formtutorados").css('display','block');
	$(".btnregresar").attr('onclick','MostarListado()');

}
function MostarListado() {

	$(".listadotutorados").css('display','block');
	$("#formtutorados").css('display','none');
	$(".btnregresar").attr('onclick','RegresarApantalla()');
}

function RegresarApantalla() {
	GoToPage('registrodatosacceso');
}
var respuestafuncion="";
function mycallback(valor) {
	//console.log('entro'+valor);
	respuestafuncion= valor;
}

function devolver() {
	return respuestafuncion;
}

function GuardarTutorado(idcontador) {

	$(".linombretu").removeClass('is-invalid');
	$(".lipaternotu").removeClass('is-invalid');
	$(".limaternotu").removeClass('is-invalid');
	$(".lifechanacimientotu").removeClass('is-invalid');
	$(".lisexotu").removeClass('is-invalid');
	$(".licelulartu").removeClass('is-invalid');
	$(".licorreotu").removeClass('is-invalid');

	$(".linombretu").addClass('is-valid');
	$(".lipaternotu").addClass('is-valid');
	$(".limaternotu").addClass('is-valid');
	$(".lifechanacimientotu").addClass('is-valid');
	$(".lisexotu").addClass('is-valid');
	$(".licelulartu").addClass('is-valid');
	$(".licorreotu").addClass('is-valid');


	$("#mensajecorreo").text('');
	var v_nombretu=$("#v_nombretu").val();
	var v_paternotu=$("#v_paternotu").val();
	var v_maternotu=$("#v_maternotu").val();
	var v_fechatu=$("#v_fechatu").val();
	var v_sexotu=$("#v_sexotu").val();
	var v_celulartu=$("#v_celulartu").val();
	var v_correotu=$("#v_correotu").val();
	var v_parentescotu=$("#v_parentescotu").val();
	var id_user=localStorage.getItem('id_user');
	var inputsoytutor=$("#inputtutor").is(':checked')?1:0;
	var v_idusuario=$("#v_idusuario").val();
	var inputsincelular=$("#inputsincelular").is(':checked')?1:0;

	var datos="v_nombretu="+v_nombretu+"&v_paternotu="+v_paternotu+"&v_maternotu="+v_maternotu+"&v_fechatu="+v_fechatu+"&v_sexotu="+v_sexotu+"&v_celulartu="+v_celulartu+"&v_correotu="+v_correotu+"&id_user="+id_user+"&v_parentescotu="+v_parentescotu;
	var pagina = "registrotutorado.php";

	var msj="";
	var bandera=1;
if (inputsincelular==0) {

	if (v_celulartu=='') {
		celular='Campo requerido';
		bandera=0;
	}
}

	if (v_nombretu=='') {
		nombre='Campo requerido';
		bandera=0;
	}

	if (v_paternotu=='') {
		paterno='Campo requerido';
		bandera=0;
	}

	/*if (v_correotu!='') {

		if (validarEmail(v_correotu)==true) {
			
			var obtener=VerificarexisteCorreo(v_correotu,mycallback);
			console.log('verifi'+respuestafuncion);

			if (respuestafuncion==1) {
				bandera=0;
			}
			
		}else{


			bandera=0;
			}
		}*/
	

		if (v_sexotu==0) {
		sexo='Campo requerido';
			bandera=0;

		}

		if (v_parentescotu==0) {
		parentesco='Campo requerido';
			bandera=0;

			
		}

		if (isValidDate(v_fechatu)==false) {
			bandera=0;
		}
		/*if (idcontador=='-1') {
			if (ValidarIdusuario(v_idusuario)) {

				bandera=0;
			}
		}*/


	//	alert('bandera'+bandera+"idcontador"+idcontador);

	if (bandera==1) {

		var tutorado={
			v_nombretu:v_nombretu,
			v_paternotu:v_paternotu,
			v_maternotu:v_maternotu,
			v_fechatu:v_fechatu,
			v_sexotu:v_sexotu,
			v_celulartu:v_celulartu,
			v_correotu:v_correotu,
			v_parentescotu:v_parentescotu,
			inputsoytutor:inputsoytutor,
			inputsincelular:inputsincelular,
			v_idusuario:v_idusuario
		};


	  	let objetoLS;

	  	objetoLS = obtenerObjetosLocalStorage();
	  	var encontrado=0;
	  
	  	if (idcontador=='-1') {
		 if (objetoLS==null || objetoLS.length==0) {

		 		  guardarObjetoLocalStorage(tutorado);
			 }else{

			 	//console.log(tutorado);

		 		  guardarObjetoLocalStorage(tutorado);
		 }

		}else{
			let producto="";
			let conta=0;

			encontrado=0;
			objetoLS.forEach(function(productoLS, index){
				if (conta==idcontador) {
					productoLS.v_nombretu=tutorado.v_nombretu;
					productoLS.v_paternotu=tutorado.v_paternotu;
					productoLS.v_maternotu=tutorado.v_maternotu;
					productoLS.v_sexotu=tutorado.v_sexotu;
					productoLS.v_correotu=tutorado.v_correotu;
					productoLS.v_celulartu=tutorado.v_celulartu;
					productoLS.v_fechatu=tutorado.v_fechatu;
					productoLS.v_parentescotu=tutorado.v_parentescotu;
					productoLS.inputsoytutor=tutorado.inputsoytutor;
					productoLS.inputsincelular=tutorado.inputsincelular;
					productoLS.v_idusuario=tutorado.v_idusuario;
			
					encontrado=1;
				}
				conta++;

				if (encontrado==1) {
					return true;
				}
			
			});
		 localStorage.setItem('objeto', JSON.stringify(objetoLS));

		}
	 		LimpiarFormTutorado();
			 MostarListado();
    		leerLocalStorage();
			dynamicSheet2.close();

	}else{

		var bandera=1;
		/*if (v_correotu=='') {
			bandera=0;
			$(".licorreotu").addClass('is-invalid');
			$(".licorreotu").removeClass('is-valid');
			console.log('aqui1');
		}*/
		if (inputsincelular==0) {
		if (v_celulartu=='') {
			celular='Campo requerido';
			bandera=0;
			$(".licelulartu").addClass('is-invalid');
			$(".licelulartu").removeClass('is-valid');
console.log('aqui2');
		}
	}

		if (v_nombretu=='') {
			nombre='Campo requerido';
			$("#lblnombre").html(nombre);

			bandera=0;

			$(".linombretu").addClass('is-invalid');
			$(".linombretu").removeClass('is-valid');

console.log('aqui3');
		}

		

		if (v_paternotu=='') {
			apellidop1='Campo requerido';
			$("#lblapellidop").html(apellidop1);

			bandera=0;
			$(".lipaternotu").addClass('is-invalid');
			$(".lipaternotu").removeClass('is-valid');
		console.log('aqui4');
		}

		if (v_maternotu=='') {
			apellidom1='Campo requerido';
			$("#lblapellidom").html(apellidom1);

			bandera=0;
			$(".limaternotu").addClass('is-invalid');
			$(".limaternotu").removeClass('is-valid');
		console.log('aqui4');
		}


		if (v_sexotu==0) {
		sexo='Campo requerido';
			bandera=0;

			$(".lisexotu").addClass('is-invalid');
			$(".lisexotu").removeClass('is-valid');
	console.log('aqui5');
		}

		if (v_parentescotu==0) {
		parentesco='Campo requerido';
			bandera=0;

			$(".liparentescotu").addClass('is-invalid');
			$(".liparentescotu").removeClass('is-valid');
	console.log('aqui6');
		}



		if (isValidDate(v_fechatu)==false) {
			bandera=0;
console.log('aqui7');
			$(".lifechanacimientotu").addClass('is-invalid');
			$(".lifechanacimientotu").removeClass('is-valid');
		}


/*
		if (v_correotu!='') {

		if (validarEmail(v_correotu)==true) {
			
			var obtener=VerificarexisteCorreo(v_correotu,mycallback);
			console.log('verifi'+respuestafuncion);

			if (respuestafuncion==1) {
				
			$(".licorreotu").addClass('is-invalid');
			$(".licorreotu").removeClass('is-valid');
			mensaje="El correo ya se encuentra registrado";
			$("#mensajecorreo").text(mensaje);


		
			}
			
		}else{


			bandera=0;
		}
	}*/



			if (bandera==0) {

				alerta('','Te falta por capturar una opción obligatoria');
			}

			if (idcontador=='-1') {
			/*if (ValidarIdusuario(v_idusuario)) {

				alerta('','El usuario ya se ha agregado');
			}*/
		}

	}
}


function VerificarexisteCorreo(correo,callback) {
	var datos="correo="+correo;
	var pagina="VerificarexisteCorreo.php";
	$.ajax({
			type: 'POST',
			dataType: 'json',
			url: urlphp+pagina,
			data: datos,
			async:false,
			beforeSend: function() {
		        

		    },
		    success: function(datos){
		    	respuestafuncion=datos.existe;
    			callback(datos.existe);
					
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
}

function LimpiarFormTutorado() {
	$("#v_nombretu").val(" ");
	$("#v_paternotu").val(" ");
	$("#v_maternotu").val(" ");
	$("#v_fechatu").val(" ");
	//$("#v_sexotu").val(" ");
	$("#v_celulartu").val(" ");
	$("#v_correotu").val(" ");
	$("#v_idtu").val(-1);

}
function ObtenerParentesco(idparentesco) {
		var pagina = "ObtenerParentesco.php";
		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		async:false,
		success: function(datos){
			PintarParentesco(datos.respuesta,idparentesco);

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
				//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
				console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}

function PintarParentesco(respuesta,idparentesco) {
		var html="";

	html+=`<option value="0">Seleccionar parentesco</option>`;

	if (respuesta.length>0) {

		for (var i = 0; i < respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].idparentesco+`">`+respuesta[i].parentesco+`</option>`;
		}

		$("#v_parentescotu").html(html);

		if (idparentesco!=0) {
			$("#v_parentescotu").val(idparentesco);
		}

	}
}

function ObtenerdatosRegistro() {
	var pagina = "Obtenerdatospersonales.php";
	var iduser=localStorage.getItem('id_user');
	var datos="id_user="+iduser;
	if (iduser!=null) {
		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){

			PintarDatosRegistro(datos.respuesta);
			PintarDeportesUsuario(datos.deportes);


		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
				//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
				console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
	}
}

function PintarDeportesUsuario(respuesta) {

	if (respuesta.length>0) {
		deportes=[];
		for (var i = 0; i <respuesta.length; i++) {
			var objeto={
				iddeporte:respuesta[i].iddeporte,
				idnivel:respuesta[i].idnivel,
				txtdeporte:respuesta[i].deporte,
				txtnivel:respuesta[i].nivel
			}

			deportes.push(objeto);
		}
		MostrarDeportes();
	}else{
		deportes=[];
	}
}

function ObtenerdatosAcceso() {
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

			PintarDatosAcceso(datos.respuesta);


		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
				//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
				console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}
function PintarDatosRegistro(datos) {
	
	$("#v_nombre").val(datos.nombre);
	$("#v_paterno").val(datos.paterno);
	$("#v_materno").val(datos.materno);
	$("#v_sexo").val(datos.sexo);

	if (datos.fechanacimiento!='' && datos.fechanacimiento!=null &&datos.fechanacimiento!='null' ) {
		$("#v_fecha").val(datos.fechanacimiento);

	}
	
	$("#v_alias").val(datos.alias);
	$("#v_correo").val(datos.email);
	$("#v_usuario").val(datos.usuario);
	localStorage.setItem('foto',datos.foto);

}


function PintarDatosAcceso(datos) {
	
	$("#v_correo").val(datos.usuario);
	

}



function ConsultarDepende() {
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

				$(".litipousuario").css('display','none');
				$("#btnregistraralumnos").css('display','none');

				$(".datosregistro").css('display','none');
				/*$("#v_nombre").attr('disabled',true);
				$("#v_paterno").attr('disabled',true);
				$("#v_materno").attr('disabled',true);
				$("#v_fecha").attr('disabled',true);
				$("#v_sexo").attr('disabled',true);
				$("#v_correo").attr('disabled',true);*/
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

function ReenvioTokenCel() {
	var sistema=localStorage.getItem('SO');
		var uuid=localStorage.getItem('UUID');
		var telefono=localStorage.getItem('celular');
		var datos="telefono="+telefono+"&sistema="+sistema+"&uuid="+uuid;

		var pagina = "validaciontelefono.php";

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
			
			var completado=respuesta.completado;
			
			

			if (completado==1) {
				
			}else{

				alerta('','Token de verificacion reenviado');
	
			}
			//

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
				//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
				console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}

function ValidacionUsuario() {
	
		
	var iduser = localStorage.getItem("id_user");
	var usuario= localStorage.getItem("usuario");
	var password=localStorage.getItem("passacademia");
	var pagina = "VerificarUsuarioActivo.php";
	var datos="idusuarios="+iduser+"&usuario="+usuario+"&password="+password;


	if (iduser!=0 && iduser!=null) {

	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){

			var d=datos.respuesta;

			usuariovalidado=d.existe;
    		localStorage.setItem('validadocliente',usuariovalidado);

			if (usuariovalidado==0) {


				
					

			}else{
					localStorage.setItem('pregunta',0);
					localStorage.setItem('session',0);
					localStorage.removeItem("session");

					localStorage.removeItem('pregunta');
					localStorage.removeItem('datosextras');

					localStorage.setItem("nombre", '');
					localStorage.setItem("paterno", '');
					localStorage.setItem("materno",'');
					localStorage.setItem('usuario','');

					localStorage.setItem('correo','');
					localStorage.setItem("foto", '');
					localStorage.removeItem("idopcionespedido");
					localStorage.removeItem("iddireccion");
					localStorage.removeItem('carrito');
					localStorage.removeItem("id_user");



				  GoToPage('login');

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

		   
		  localStorage.setItem('validadocliente',1);


	}
}

function VerificarexisteCorreoTutorado(correo,v_idtu) {
	 return new Promise(function(resolve, reject) {
	var datos="correo="+correo;

	if (v_idtu==0) {
	var pagina="VerificarexisteCorreo2.php";
	$.ajax({
			type: 'POST',
			dataType: 'json',
			url: urlphp+pagina,
			data: datos,
			async:false,
			beforeSend: function() {
		        

		    },
		    success: function(datos){
		    	respuestafuncion=datos.existe;
    			resolve(respuestafuncion);
					
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

			resolve(0);
		}
	});


}

function getValidacionUsuario() {
    return new Promise(function(resolve, reject) {

   	var iduser = localStorage.getItem("id_user");
	var usuario= localStorage.getItem("usuario");
	var password=localStorage.getItem("passacademia");
	var pagina = "VerificarUsuarioActivo.php";
	var datos="idusuarios="+iduser+"&usuario="+usuario+"&password="+password;


	if (iduser!=0 && iduser!=null) {

	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){

			var d=datos.respuesta;
				console.log('entro');

			console.log(d);
			usuariovalidado=d.existe;
    		localStorage.setItem('validadocliente',usuariovalidado);


    		resolve(d);
			if (usuariovalidado==0) {


				
					

			}else{
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
					localStorage.removeItem("id_user");



				 // GoToPage('login');

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

		   
		  localStorage.setItem('validadocliente',1);


	}
    })
}

function IrRegistro() {
	var bandera=1;

	$(".lialias").removeClass('is-invalid');
	$(".lialias").addClass('is-valid');
	var v_alias=$("#v_alias").val();
	/*if (v_alias=='') {

		bandera=0;
	}*/
	if (localStorage.getItem('foto')=='' || localStorage.getItem('foto')==null) {

		bandera=0;
	}

	if (deportes.length==0) {
		bandera=0;
	}

	if (v_alias=='') {
		bandera=0;
	}

	if (bandera==1) {
	
	
		var iduser=localStorage.getItem('id_user');
		var foto=localStorage.getItem('foto');
		var datos="id_user="+iduser+"&foto="+foto+"&v_alias="+v_alias+"&v_deportes="+JSON.stringify(deportes);
		var pagina="registroalias.php";

		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: urlphp+pagina,
			data: datos,
			success: function(datos){


						GoToPage('registro');

					},error: function(XMLHttpRequest, textStatus, errorThrown){ 
								var error;
				  				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
							}
			});

	

	}else{

		

		/*if (v_alias=='') {
			
			$(".lialias").addClass('is-invalid');
			$(".lialias").removeClass('is-valid');
			bandera=0;
		}*/

		if (deportes.length==0) {
			bandera=0;
		}

		if (localStorage.getItem('foto')=='' || localStorage.getItem('foto')==null) {
				bandera=0;
		alerta('','Para continuar es necesaria una foto de perfil');
	
		}
		if (v_alias=='') {
			bandera=0;
			$(".lialias").addClass('is-invalid');

		}

		if (bandera==0) {
				alerta('','Te falta por capturar una opción obligatoria');
		}


	}
}
var dynamicSheet3="";
function AbrirModalDeporte() {
	
	
var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 100%;background: none;">
            <div class="toolbar">
              <div class="toolbar-inner">
                <div class="left"></div>
                <div class="right">
                  <a class="link sheet-close"></a>
                </div>
              </div>
            </div>
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px; ">
              <div class="" style="height: 100%;">
                <div style="background: white; height: 100%;width: 100%;border-radius: 20px;">
   						     <div class="row">
	   						     <div class="col-20">
	   						      	 <div class="iconocerrar link sheet-close">
	 									<span class="bi bi-x-circle-fill"></span>
	   						    	 </div>
	   						    </div>

   						    	 <div class="col-60">
   						    	 <span class="titulomodal"></span>
   						    	 </div>
   						    	 <div class="col-20">
   						    	 <span class="limpiarfiltros"></span>
   						    	 </div>
   							 </div>
   							 <div class="" style="position: absolute;width: 100%;">
   							 	
	   							  <div class="">


		   							 	  <div class="block" style="margin-right:1em;margin-left:1em;">
									    <div class="row " >
							           <div style="margin-left: 1em;" class="col-85 medium-50 large-40 margin-left-auto margin-right-auto align-self-center  padding-vertical">
							         	 <h1 style=""> Ingresa tu <span style="color: #0abe68;">deporte</span> y nivel
							         	 </h1>

							          
							         </div>
		   

      <div class="margin-left-auto margin-right-auto align-self-center text-align-center " id="formtutorados" style="margin-right: 1em;
    margin-left: 1em;">
            <form style="" >
                              <input type="hidden" name="v_iddepo" id="v_iddepo" class="input-with-value" />

              <div class="list form-list no-margin margin-bottom">
               <ul>


               <li class="item-content item-input item-input-with-value is-valid lideporte">

                  <div class="item-inner">
                  <div class="item-title item-floating-label">Deporte:</div>
                  <div class="item-input-wrap">
                  <select name="gender" id="v_deporte" class="">
                          <option value="0" class="special">Seleccionar deporte</option> 
                   </select>
                </div>
              </div>
              </li>

               <li class="item-content item-input item-input-with-value is-valid linivel">

                  <div class="item-inner">
                  <div class="item-title item-floating-label">Nivel:</div>
                  <div class="item-input-wrap">
                  <select name="gender" id="v_nivel" class="">
                          <option value="0" class="special">Seleccionar nivel</option>
                          
                   </select>
                </div>
              </div>
              </li>
             



            </ul>




            </div>
          
              <p class="margin-bottom"> </p>

              <div class="">
              	
              
            
	              <div class="col-100 mostrar">
	              <button type="button"  class="button button-fill button-large button-raised margin-bottom color-theme" id="btnguadardeporte" >
	               Guardar
	              </button>
	              </div>


	            </div>
            </form>          
			</div>
          </div>
         
        </div>
      </div>
    </div>


		   							 			` ;
				

		   							 	html+=`</div>

	   							 	</div>

   							 </div>

   				</div>
                
              </div>
            </div>
          </div>`;
          
	  dynamicSheet3 = app.sheet.create({
        content: html,

    	swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
           //
           // $$('#btnguadardeporte').attr('onclick','GuardarDeporte()');
			$$('#v_deporte').attr('onchange','ObtenerNiveles()')
			$("#v_deporte").attr('onblur','Cambiar2(this)');
			$("#v_deporte").attr('onfocus','Cambiar(this)');

			$("#v_nivel").attr('onblur','Cambiar2(this)');
			$("#v_nivel").attr('onfocus','Cambiar(this)');


          },
          opened: function (sheet) {
           
           //CargarNivel();
    		
    			var v=$("#v_iddepo").val();
    			if (v=='' || v==-1) {
    				
    				CargarDeportes(0);
    			 $$('#btnguadardeporte').attr('onclick','GuardarDeporte(-1)');

    			}else{
    			 $$('#btnguadardeporte').attr('onclick','GuardarDeporte('+v+')');

    			}
          },

          close:function () {
          

          },
        }
      });

       dynamicSheet3.open();

}

function CargarDeportes(iddeportev) {
		var datos="id_user="+iduser;
		var pagina="ObtenerDeportes.php";

		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: urlphp+pagina,
			data: datos,
			async:false,
			success: function(datos){

			var respuesta=datos.respuesta;
			PintarDeportes(respuesta);

			if (iddeportev>0) {
				
				$("#v_deporte").val(iddeportev);

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
function PintarDeportes(resultado) {
	var html="";
	html+=`<option value="0">Seleccionar deporte</option>`;

	if (resultado.length>0) {

		for (var i = 0; i < resultado.length; i++) {
			html+=`<option value="`+resultado[i].iddeporte+`">`+resultado[i].deporte+`</option>`;
		}
	}
		$("#v_deporte").html(html);

}
function ObtenerNiveles(idnivel) {
	var iddeporte=$("#v_deporte").val();
	var datos="id_user="+iduser+"&iddeporte="+iddeporte;
		var pagina="ObtenerNiveles.php";

		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: urlphp+pagina,
			data: datos,
			async:false,
			success: function(datos){
				var respuesta=datos.respuesta;
				PintarNiveles(respuesta);	

				if (idnivel>0) {
				$("#v_nivel").val(idnivel);

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

function PintarNiveles(resultado) {
	var html="";
				html+=`<option value="0">Seleccionar nivel</option>`;

	if (resultado.length>0) {

		for (var i = 0; i < resultado.length; i++) {
			html+=`<option value="`+resultado[i].idnivel+`">`+resultado[i].nivel+`</option>`;
		}
	}
		$("#v_nivel").html(html);

}
function GuardarDeporte(v_iddepo) {
	//var v_iddepo=$("#v_iddepo").val();
	var iddeporte=$("#v_deporte").val();
	var txtdeporte=$('#v_deporte option:selected').html();
	var idnivel=$("#v_nivel").val();
	var txtnivel=$('#v_nivel option:selected').html();


	if (iddeporte>0 && idnivel>0) {
	var objeto={
		iddeporte:iddeporte,
		idnivel:idnivel,
		txtdeporte:txtdeporte,
		txtnivel:txtnivel
	}
	if(v_iddepo>=0) {

		
		var posicion="";
		for (var i = 0; i <deportes.length; i++) {
			if (i == v_iddepo) {

				encontrado=1;
				posicion=i;
			}

			if (encontrado==1) {
					break;
				}
			}


		deportes[posicion].iddeporte=iddeporte;
		deportes[posicion].idnivel=idnivel;
		deportes[posicion].txtdeporte=txtdeporte;
		deportes[posicion].txtnivel=txtnivel;


	}else{

				deportes.push(objeto);

	}


	dynamicSheet3.close();

	MostrarDeportes();
	}else{

			var resp="";
		if (iddeporte==0) {
			resp+='Seleccionar deporte<br>';
		}

		if (idnivel==0) {
			resp+='Seleccionar nivel<br>';
		}

		alerta(resp,'');
	}
}

function MostrarDeportes() {


	var contador=deportes.length;
	var suma=0;
	var cont=0;
	var html="";
	var i=0;
	//console.log('contador'+contador);
	if(contador>0) {


	for (var i = 0; i < deportes.length; i++) {
		
	
        //construir template

      		
	//if (respuesta.length>0) {
	//	for (var i = 0; i <respuesta.length; i++) {
	html+=`
			<div class="col-100 medium-33 large-50 elementod"  style="    margin-top: 1em;
    margin-bottom: 1em;" id="elementod_`+i+`"><div class="card">
    <div class="card-content card-content-padding ">
    <div class="row">
	    <div class="col-auto align-self-center">
		    <div class="avatar avatar-30 alert-danger text-color-red rounded-circle">
		    <i class="bi bi-bar-chart-line-fill"></i>

		    </div>
	    </div>
    <div class="col align-self-center no-padding-left">
    <div class="row margin-bottom-half"><div class="col">
	    
	    <p style="padding:.5em;">`+deportes[i].txtdeporte+` `+deportes[i].txtnivel+`</p>
	    </div>

	  
	    <div class="col-auto" style="text-align: right;">
	    <span class="" style="float: left;padding: .5em;" onclick="EditarDeporte(`+i+`)"><i class="bi-pencil-fill"></i> </span>
	    	<span class="" style="float: left;padding: 0.5em;" onclick="EliminarDeporte(`+i+`);"><i class="bi-x-circle-fill"></i></span>
	    	</div>

	    			</div>
    			</div>
    		</div>
    	</div>
   	 </div>
    </div>
		`;
		
	

	

	}

	$(".mostrardeportes").css('display','block');

	}else{

		html+=`
			<div class="col-100 medium-33 large-50" style="    margin-top: 1em;
    margin-bottom: 1em;"><div class="card">
    <div class="card-content card-content-padding ">
    <div class="row">
	    <div class="col-auto align-self-center">
		    <div class="avatar avatar-40 alert-danger text-color-red rounded-circle">
		    </div>
	    </div>
    <div class="col align-self-center no-padding-left">
    <div class="row margin-bottom-half"><div class="col">
	    <p class="small text-muted no-margin-bottom">
	    </p>
	    <p>No tienes tutorados registrados</p>
	    </div><div class="col-auto text-align-right">
	    <p class="small text-muted no-margin-bottom"></p>
	    	<p class="small"></p></div>
	    			</div>
    			</div>
    		</div>
    	</div>
   	 </div>
    </div>
		`;
	$(".mostrardeportes").css('display','none');

	}
	$(".listadodeporte").html(html);


	//$("#lista-objeto").html(html);

}

function EliminarDeporte(idcontador) {
	 app.dialog.confirm('','¿Seguro de eliminar el deporte?', function () {
	 	 $(".elementod").each(function(){
	    	var id=$(this).attr('id');
	    	var elemento=id.split('_');
	    	if (idcontador==elemento[1]) {
	    		$("#elementod_"+idcontador).remove();
	    	}
	    });
	 	 var posicion='';
	 	 for (var i = 0; i < deportes.length; i++) {

			if (i==idcontador) {
				posicion=i;
				 deportes.splice(posicion, 1);
				break;
			}
	 	 }
	  });

}
function EditarDeporte(contador) {
	var posicion='';
	 for (var i = 0; i < deportes.length; i++) {

	 	 	if (i == contador) {
				encontrado=1;
				posicion=i;
			}
			if (encontrado==1) {
				
				break;
			}
	 	 }

			console.log('aq'+posicion);
		AbrirModalDeporte();
		Llenar(deportes[posicion],posicion);
		$$("#btnguadardeporte").attr('onclick','GuardarDeporte('+posicion+')');

		
}

function Llenar(deporte,posicion) {
	$("#v_iddepo").val(posicion);
	CargarDeportes(deporte.iddeporte);
	ObtenerNiveles(deporte.idnivel);
	
	}

	function CopiarEnUsuario() {
		var valor=$("#v_correo").val();

		var quitar=valor.trim();
		$("#v_usuario").val(quitar);
		$("#v_correo").val(quitar);
		$(".liusuario").addClass('item-input-with-value');
	}

	function Validarvacio() {
		var valor=$("#v_usuario").val();
		var quitar=valor.trim();
		$("#v_usuario").val(quitar);
		if (valor!='') {
			$(".liusuario").addClass('item-input-with-value');

				}else{
		$(".liusuario").removeClass('item-input-with-value');

				}
	}
	function QuitarEspacios(elemento) {
		var element=elemento.id;
		var valor=$("#"+element).val().trim();
		$("#"+element).val(valor)
	}

	function Cambiar(elemento) {
		$('#'+elemento.id).closest('li').removeClass("is-valid");
		$('#'+elemento.id).closest('li').removeClass("is-invalid");
		$('#'+elemento.id).closest('li').addClass("is-blue");

	}

function Cambiar2(elemento) {

	$('#'+elemento.id).closest('li').removeClass("is-blue");
 	$('#'+elemento.id).closest('li').addClass("is-valid");
}

function AbrirInfo() {
	  var notificationCallbackOnClose = app.notification.create({
		       // icon: '<i class="icon demo-icon">7</i>',
		        title: 'Recuerda',
		        //titleRightText: 'now',
		        subtitle: '',
		        text: 'La contraseña debe conteneder de 6 a 10 caracteres',
		       // closeOnClick: true,
		        closeButton: true,
		        on: {
		          click: function () {
		          	 notificationCallbackOnClose.close();

		          },


		        },
		      });
		      notificationCallbackOnClose.open();

	
}

function BuscarUsuario() {
	

var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 100%;background: none;">
            <div class="toolbar">
              <div class="toolbar-inner">
                <div class="left"></div>
                <div class="right">
                  <a class="link sheet-close"></a>
                </div>
              </div>
            </div>
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px; ">
            	 <div class="iconocerrar link sheet-close" style="z-index:10;">
	 									<span class="bi bi-x-circle-fill"></span>
	   						    	 </div>
              <div class="page-content" style="height: 100%;">
                <div style="background: white; height: 100%;width: 100%;border-radius: 20px;">
   						     <div class="row">
	   						     <div class="col-20">
	   						      	
	   						    </div>

   						    	 <div class="col-60">
   						    	 <span class="titulomodal"></span>
   						    	 </div>
   						    	 <div class="col-20">
   						    	 <span class="limpiarfiltros"></span>
   						    	 </div>
   							 </div>
   							 <div class="" style="position: absolute;top:2em;width: 100%;">
   							 					
   <div class="row" style="padding-top: 3em;">



        <div class="col">

         
          <div class="block">
   							 						<form style="    margin-right: 1em;
    margin-left: 1em;">
	   							 						<div class="list form-list no-margin margin-bottom">
	   							 						<ul>
	   							 								<li class="item-content item-input is-valid licelulartu"><div class="item-inner">
	   							 									<div class="item-title item-floating-label">
	   							 									Celular</div>
		   							 								<div class="item-input-wrap">
		   							 									<input type="text" name="v_celulartu2" id="v_celulartu2" class="" placeholder="(___) ___-____" >
		   							 									<span class="input-clear-button"></span>
		   							 								</div>
	   							 									</div>
	   							 								</li>

	   							 								<li class="item-content item-input is-valid linombretu">
	   							 									<div class="item-inner">
		   							 									<div class="item-title item-floating-label">
		   							 									Nombre</div>
			   							 								<div class="item-input-wrap">
			   							 								<input type="text" name="v_nombretu2" id="v_nombretu2" class="" onclick="QuitarEspacios(this);">
				   							 								<span class="input-clear-button">
				   							 								</span>
			   							 								</div>
	   							 									</div>
	   							 								</li>
	   							 						</ul>	

	   							 						</div>


	   							 						<div class="">
	   							 							<div class="col">
	   							 								<button type="button" class="button button-fill button-large button-raised margin-bottom color-theme" id="btnaceptartuto" style="" onclick="AceptarTuto()">
	   							 								Aceptar
	   							 								</button>
	   							 							</div>
	   							 						</div>
   							 						</form>

   							 						</div>
   							 	
		   							  		</div>

		   							  			</div>
   							 	
		   							  		</div>

	   							 	</div>

   							 </div>

   				</div>
                
              </div>
            </div>
          </div>`;
          
	  dynamicSheet1 = app.sheet.create({
        content: html,

    	swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
           


			

          },
          opened: function (sheet) {
            console.log('Sheet opened');
          },
        }
      });

       dynamicSheet1.open();
}

/*function BuscarUsuario() {
	var celularbuscar=$("#v_celulartu").val();
	var iduser=localStorage.getItem('id_user');
	var datos="id_user="+iduser+"&celularbuscar="+celularbuscar;
	var pagina="ObtenerUsuarioCelular.php";

	if (celularbuscar.length>10) {
		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: urlphp+pagina,
			data: datos,
			async:false,
			success: function(resp){
				var nombre=resp.nombre;
				var paterno=resp.paterno;
				var materno=resp.materno;
				var fecha=resp.fechanacimiento;
				var sexotu=resp.genero;
				var v_idusuario=resp.id;
				var esasociado=resp.esasociado;
				var estutor=resp.estutor;

				var propio=resp.propio;
						$("#v_nombretu").val('');
						$("#v_paternotu").val('');
						$("#v_maternotu").val('');
						$("#v_fechatu").val('');
						$("#v_sexotu").val('');
						$("#v_idusuario").val('');	

				if (resp.resultado==1) {

					if (estutor==1) {

						alerta('','El celular ya se encuentra asociado');
						$("#v_celulartu").val('');

					}

					else if(propio==1) {

						alerta('','El celular ya se encuentra registrado');
							$("#v_celulartu").val('');

					}else{


				if (esasociado==0 || esasociado==1 && propio==0 && estutor==0) {

						$(".licelulartu").addClass('item-input-with-value');
						$(".linombretu").addClass('item-input-with-value');
						$(".lipaternotu").addClass('item-input-with-value');
						$(".limaternotu").addClass('item-input-with-value');
						$(".lifechanacimientotu").addClass('item-input-with-value');

						$("#v_nombretu").val(nombre);
						$("#v_paternotu").val(paterno);
						$("#v_maternotu").val(materno);
						$("#v_fechatu").val(fecha);
						$("#v_sexotu").val(sexotu);
						$("#v_idusuario").val(v_idusuario);	

						$("#v_nombretu").css('color','gray');
						$("#v_nombretu").css('color','gray');
						$("#v_paternotu").css('color','gray');
						$("#v_maternotu").css('color','gray');
						$("#v_fechatu").css('color','gray');
						$("#v_sexotu").css('color','gray');

						$("#v_nombretu").attr('disabled',true);
						$("#v_paternotu").attr('disabled',true);
						$("#v_maternotu").attr('disabled',true);
						$("#v_fechatu").attr('disabled',true);
						$("#v_sexotu").prop('disabled','disabled');
					}else{
						$("#v_nombretu").val('');
						$("#v_paternotu").val('');
						$("#v_maternotu").val('');
						$("#v_fechatu").val('');
						$("#v_sexotu").val('');
						$("#v_idusuario").val('');	
						$("#v_celulartu").val('');

						$("#v_nombretu").css('color','black');
						$("#v_nombretu").css('color','black');
						$("#v_paternotu").css('color','black');
						$("#v_maternotu").css('color','black');
						$("#v_fechatu").css('color','black');
						$("#v_sexotu").css('color','black');

						$("#v_nombretu").attr('disabled',false);
						$("#v_paternotu").attr('disabled',false);
						$("#v_maternotu").attr('disabled',false);
						$("#v_fechatu").attr('disabled',false);
						//$("#v_sexotu").removeAttr('disabled');


					}
				}
				}else{

					
					if (esasociado==1) {

						alerta('','El celular ya se encuentra asociado');
						$("#v_celulartu").val('');

					} 
					if (estutor==1) {

						alerta('','El celular ya se encuentra asociado');
						$("#v_celulartu").val('');

					}

					if (propio==1) {

						alerta('','El celular ya se encuentra registrado');
							$("#v_celulartu").val('');

					}


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
}*/

function ValidarIdusuario(idusuario) {
		let objetoLS;
		var encontrado=0;
	  	objetoLS = obtenerObjetosLocalStorage();
		objetoLS.forEach(function(productoLS, index){


				if (productoLS.v_idusuario==idusuario) {
					encontrado=1;
					
				}

			});

		if (encontrado==1) {
			return true;
		}else{
			return false;
		}

			
}

function ObtenerIdUsuarioPrincipal() {
    return new Promise(function(resolve, reject) {

  		if (localStorage.getItem('iduserrespaldo')!=undefined && localStorage.getItem('iduserrespaldo')!=null && localStorage.getItem('iduserrespaldo')!=0 ) {

  			var iduser=localStorage.getItem('iduserrespaldo');
  			localStorage.setItem('id_user',iduser);
  		}

  		resolve();
	
    })
}
/*
function AceptarTuto() {


		var nombrecompleto="";
		var inputsincelular=$("#inputsincelular").is(':checked')?1:0;

		if (inputsincelular==0) {
				nombrecompleto=$("#v_nombretu2").val();

		}else{

			v_celulartu2==$("#v_celulartu2").val();
		}
		var datos="nombrecompleto="+nombrecompleto+"&v_celulartu2="+v_celulartu2+"&inputsincelular="+inputsincelular;
		var pagina="ObtenerCoincidencias.php";
		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: urlphp+pagina,
			data: datos,
			async:false,
			success: function(datos){
			

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
					var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
					//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
				}
		});
}*/