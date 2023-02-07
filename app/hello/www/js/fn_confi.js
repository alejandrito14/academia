function ObtenerConfiEmpresa() {
		var pagina = "Obtenerdatosconfi.php";

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		async:false,
		success: function(datos){

			if (datos.respuesta.logo!='') {

				imagen=urlimagenes+'configuracion/imagenes/'+codigoserv+datos.respuesta.logo;
			}else{

				imagen=urlimagenlogo;
			}

		$("#imagenlogo").attr('src',imagen);
		$("#nombrenegocio").text(datos.respuesta.nombrenegocio1);
		localStorage.setItem('costoenvio',datos.respuesta.costoenvio);
		localStorage.setItem('montominimo',datos.respuesta.montominimo);
    	localStorage.setItem('rutaine',0);
    	localStorage.setItem('claveapi',datos.respuesta.claveapigeolocalizacion);
    	localStorage.setItem('logo',imagen);

    	localStorage.setItem('pedidireccionregistro',datos.respuesta.pedirdireccionregistro);
    		var versionandroid=datos.respuesta.versionapp;
    		var versionios=datos.respuesta.versionappios;

    		var textodescarga=datos.respuesta.textodescarga;

    	
    	$(".texto1").text(datos.respuesta.texto1);


		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}

function ObtenerConfiguracionColores() {
		var pagina = "ObtenerConfiguracionColores.php";

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		async:false,
		success: function(datos){

			var botonescolorfondo=datos.respuesta.botonescolorfondo;
			var botonescolorletra=datos.respuesta.botonescolorletra;

			var invitadocolorfondo=datos.respuesta.invitadocolorfondo;
			var invitadocolorletra=datos.respuesta.invitadocolorletra;

			var bienvenidacolorfondo=datos.respuesta.bienvenidafondoletra;
			var bienvenidaletrafondo=datos.respuesta.bienvenidacolorletra;

			var nombresucursal2colorfondo=datos.respuesta.nombresucursal2colorfondo;
			var nombresucursal2colorletra=datos.respuesta.nombresucursal2colorletra;

			var titulopromofondo=datos.respuesta.titulopromocolorfondo;
			var titulopromocolor=datos.respuesta.titulopromocolorletra;

			var nombresucursal1fondo=datos.respuesta.nombresucursal1colorfondo;
			var nombresucursal1letra=datos.respuesta.nombresucursal1colorletra;
			var categorianombrefondo=datos.respuesta.categorianombrecolorfondo;
			var categorianombreletra=datos.respuesta.categorianombrecolorletra;
			
			var categoriasliderfondo=datos.respuesta.categoriaslidercolorfondo;
			var categoriasliderletra=datos.respuesta.categoriaslidercolorletra;
			var paquetetitulofondo=datos.respuesta.paquetetitulocolorfondo;
			var paquetetituloletra=datos.respuesta.paquetetitulocolorletra;

			var regresarcolorfondo=datos.respuesta.regresarcolorfondo;
			var regresarcolorletra=datos.respuesta.regresarcolorletra;

			var botonesaccionfondo=datos.respuesta.botonesaccioncolorfondo;
			var botonesaccionletra=datos.respuesta.botonesaccioncolorletra;

			var divisionescolorfondo=datos.respuesta.divisionescolorfondo;
			var divisionescolorletra=datos.respuesta.divisionescolorletra;

			var precioxcolorletra=datos.respuesta.precioxcolorletra;
			var cantidadxcolorletra=datos.respuesta.cantidadxcolorletra;
			var subdivisionescolorletra=datos.respuesta.subdivisionescolorletra;
			var subdivisionescolorfondo=datos.respuesta.subdivisionescolorfondo;

		/*	

			//$(".botones").css("background",botonescolorfondo+" !important");
			//$(".botones").css("color",botonescolorletra+" !important");

			//document.getElementsByClassName('.botones')[0].style.setProperty('background',botonescolorfondo, 'important');
			$('.botones').attr('style', function(i,s) {'background: '+botonescolorfondo+' !important;' });
			$('.botones').attr('style', function(i,s) {'color: '+botonescolorletra+' !important;' });

			$('.invitado').attr('style', function(i,s) { return s + 'background: '+invitadocolorfondo+' !important;' });
			$('.invitado').attr('style', function(i,s) { return s + 'color: '+invitadocolorletra+' !important;' });

			$('.bienvenida').attr('style', function(i,s) { return s + 'background: '+bienvenidacolorfondo+' !important;' });
			$('.bienvenida').attr('style', function(i,s) { return s + 'color: '+bienvenidaletrafondo+' !important;' });

			$('#nombresucursal2').attr('style', function(i,s) { return s + 'background: '+nombresucursal2colorfondo+' !important;' });
			$('#nombresucursal2').attr('style', function(i,s) { return s + 'color: '+nombresucursal2colorletra+' !important;' });

			$('.sucursaldiv').attr('style', function(i,s) { return s + 'background: '+nombresucursal2colorfondo+' !important;' });
			$('.sucursaldiv').attr('style', function(i,s) { return s + 'color: '+nombresucursal2colorletra+' !important;' });


			$('.titulosdiv').attr('style', function(i,s) { return s + 'background: '+nombresucursal2colorfondo+' !important;' });

			$('.titulosdiv').attr('style', function(i,s) { return s + 'color: '+nombresucursal2colorletra+' !important;' });

			

			$('.titulopromo').attr('style', function(i,s) { return s + 'background: '+titulopromofondo+' !important;' });
			$('.titulopromo').attr('style', function(i,s) { return s + 'color: '+titulopromocolor+' !important;' });
			

			$('#nombresucursal1').attr('style', function(i,s) { return s + 'background: '+nombresucursal2colorfondo+' !important;' });
			$('#nombresucursal1').attr('style', function(i,s) { return s + 'color: '+nombresucursal2colorletra+' !important;' });

			
			$('.categorianombre').attr('style', function(i,s) { return s + 'background: '+categorianombrefondo+' !important;' });
			$('.categorianombre').attr('style', function(i,s) { return s + 'color: '+categorianombreletra+' !important;' });
			
			$('.categoriaslider').attr('style', function(i,s) { return s + 'background: '+categoriasliderfondo+' !important;' });
			$('.categoriaslider').attr('style', function(i,s) { return s + 'color: '+categoriasliderletra+' !important;' });
		
			$('.paquetetitulo').css('background',paquetetitulofondo);
			$('.paquetetitulo').css('color',paquetetituloletra);

			$('.regresar').attr('style', function(i,s) {  'background: '+regresarcolorfondo+' !important;' });
			$('.regresar').attr('style', function(i,s) {	'color: '+regresarcolorletra+' !important;' });

			$('.botonesaccion').attr('style', function(i,s) { return s + 'background: '+botonesaccionfondo+' !important;' });
			$('.botonesaccion').attr('style', function(i,s) { return s + 'color: '+botonesaccionletra+' !important;' });


			$('.divisiones2,.divisiones4,.divisiones6,.divisiones9,.divisiones7,.divisiones5,.divisiones,.divisiones3,.divisiones5em,.divsiones3,.divpedidos,.divestatus,.divisiones8').css('background', divisionescolorfondo);
			$('.divisiones2,.divisiones4,.divisiones6,.divisiones9,.divisiones7,.divisiones5,.divisiones,.divisiones3,.divisiones5em,.divsiones3,.divpedidos,.divestatus,.divisiones8').css('color', divisionescolorletra);
			$('.subdivisiones').css('background',subdivisionescolorfondo);
			$('.subdivisiones').css('color',subdivisionescolorletra);

			$('.subdivisiones2').css('background',subdivisionescolorfondo);
			$('.subdivisiones2').css('color',subdivisionescolorletra);

			//$('.divisiones2').attr('style', function(i,s) {' background:'+divisionescolorfondo+' !important;' });

			//$('.divisiones4,.divisiones6,.divisiones9,.divisiones7,.divisiones5,.divisiones,.divisiones3,.divisiones5em').attr('style', function(i,s) { 'background: '+divisionescolorfondo+' !important;' });
		//	$('.divisiones2,.divisiones4,.divisiones6,.divisiones9,.divisiones7,.divisiones5,.divisiones,.divisiones3,.divisiones5em').attr('style', function(i,s) { 'color: '+divisionescolorletra+' !important;' });

			$('#preciox').attr('style', function(i,s) { return s + 'color: '+precioxcolorletra+' !important;' });
			$('#cantidadx').attr('style', function(i,s) { return s + 'color: '+cantidadxcolorletra+' !important;' });

*/
		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}

function VerificarUsuarioActivo() {
	var iduser = localStorage.getItem("id_user");
	var usuario= localStorage.getItem("correo");
	var password=localStorage.getItem("passwordisuoder");
	var pagina = "VerificarUsuarioActivo.php";
	var datos="idcliente="+iduser+"&usuario="+usuario+"&password="+password;


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

    		
			if (usuariovalidado==1) {


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


function ObtenerConfiVersion() {
	
		var pagina = "Obtenerdatosconfi.php";

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		async:false,
		success: function(datos){

			if (datos.respuesta.logo!='') {

				imagen=urlimagenes+'configuracion/imagenes/'+codigoserv+datos.respuesta.logo;
			}else{

				imagen=urlimagenlogo;
			}

		$("#imagenlogo").attr('src',imagen);
		$("#nombrenegocio").text(datos.respuesta.nombrenegocio1);
		//localStorage.setItem('costoenvio',datos.respuesta.costoenvio);
		localStorage.setItem('montominimo',datos.respuesta.montominimo);
    	localStorage.setItem('rutaine',0);
    	localStorage.setItem('claveapi',datos.respuesta.claveapigeolocalizacion);


    	localStorage.setItem('pedidireccionregistro',datos.respuesta.pedirdireccionregistro);
    		var versionandroid=datos.respuesta.versionapp;
    		var versionios=datos.respuesta.versionappios;

    		var textodescarga=datos.respuesta.textodescarga;

    		$("#versionapp").text(version);


    	    var enlace="";
    	    var sistema=localStorage.getItem("SO");

    	    var rutaandroid=datos.respuesta.androidmarket;
    	    var rutaios=datos.respuesta.iosmarket;

    	    var version1=localStorage.getItem('versionapp');

    	    var versionenmarket="";

    	    var validarversion=0;
    	   

		if (sistema=='android') {
    			enlace=rutaandroid;
			versionenmarket=versionandroid;
			validarversion=datos.respuesta.validarversionandroid;
    	}


    	if (sistema=='ios') {

	    		enlace=rutaios;
	    	versionenmarket=versionios;
			validarversion=datos.respuesta.validarversionios;

    	}


    	if (sistema=='web') {

	    		enlace=rutaandroid;
	    	versionenmarket="";
    	}

    	if (validarversion==1) {

	    	if (version1!=versionenmarket && sistema!='' &&  sistema!=null) {
		        app.dialog.create({
		          title: '',
		          text: textodescarga,
		          buttons: [
		           
		            {
		              text: 'Descargar',
		            }
		            
		          ],

		          onClick: function (dialog, index) {

			            if(index === 0){
			                //Button 1 clicked
			              if (sistema!='web') {
			               showArchivo(enlace);
			           		}
			                //alert(enlace);
			              // window.open(enlace);
			            }
			            else if(index === 1){
			                //Button 2 clicked
			            }
			          
			        },
		          verticalButtons: false,
		        }).open();
      
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

var inAppBrowserRef;

function showArchivo(url) {

/* var ref = cordova.InAppBrowser.open(''+url+'', '_blank', 'location=yes');
     ref.addEventListener('loadstart', function(event) { alert(event.url); });*/

var inAppBrowserRef;
var target = "_system";
var options = "location=yes,hidden=no,enableViewportScale=yes,toolbar=no,hardwareback=yes";
inAppBrowserRef = cordova.InAppBrowser.open(url, target, options); 

  /* var ref = cordova.InAppBrowser.open(''+url+'', '_system', 'location=yes');
        ref.addEventListener('loadstart', function(event) { alert(event.url); });
*/
        /*  var ref = window.open(url, 'location=yes');
         ref.addEventListener('loadStartCallBack', function(event) { alert('start: ' + event.url); });
         ref.addEventListener('loadStopCallBack', function(event) { alert('stop: ' + event.url); });
         ref.addEventListener('loadErrorCallBack', function(event) { alert('error: ' + event.message); });
         ref.addEventListener('exit', function(event) { alert(event.type); });*/
}


function GuardarTokenBase(idcliente) {

	 var sistema=localStorage.getItem("SO");
	 var tokenfirebase=localStorage.getItem('tokenfirebase');
	 var idcliente=localStorage.getItem('id_user');
	 var uuid=localStorage.getItem('UUID');
	
	 var datos="sistema="+sistema+"&tokenfirebase="+tokenfirebase+"&idusuario="+idcliente+"&uuid="+uuid;
	 var pagina = "GuardarTokenBase.php";
	 
		$.ajax({
		type: 'POST',
		dataType: 'json',
		data:datos,
		url: urlphp+pagina,
		success: function(datos){
			//alerta('','guardo');

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								alerta('',"Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}

function getUsuario() {
	 return new Promise(function(resolve, reject) {
	 	var iduser=localStorage.getItem('id_user');
    var pagina = "Obtenerdatospersonales.php";
    var datos="id_user="+iduser;
		$.ajax({
		type: 'POST',
		dataType:'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
			
			resolve(datos);

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
									console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});

    })
}


function getConfiguracion() {
    return new Promise(function(resolve, reject) {

    var pagina = "Obtenerdatosconfi.php";

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		async:false,
		success: function(datos){

			localStorage.setItem('imagensplashprincipal',datos.respuesta.splasimgprincipal);
			resolve(datos);

			if (datos.respuesta.logo!='') {

				imagen=urlimagenes+'configuracion/imagenes/'+codigoserv+datos.respuesta.logo;
			}else{

				imagen=urlimagenlogo;
			}

		$("#imagenlogo").attr('src',imagen);
		$("#nombrenegocio").text(datos.respuesta.nombrenegocio1);
		localStorage.setItem('costoenvio',datos.respuesta.costoenvio);
		localStorage.setItem('montominimo',datos.respuesta.montominimo);
    	localStorage.setItem('rutaine',0);
    	localStorage.setItem('claveapi',datos.respuesta.claveapigeolocalizacion);
    	localStorage.setItem('logo',imagen);

    	localStorage.setItem('pedidireccionregistro',datos.respuesta.pedirdireccionregistro);
    		var versionandroid=datos.respuesta.versionapp;
    		var versionios=datos.respuesta.versionappios;

    		var textodescarga=datos.respuesta.textodescarga;

    	$("#versionapp").text(version);
    	
    	$(".texto1").text(datos.respuesta.texto1);

    	localStorage.setItem('avatarhombre',datos.respuesta.avatarhombre);
    	localStorage.setItem('avatarmujer',datos.respuesta.avatarmujer);
    	localStorage.setItem('btnayuda',datos.respuesta.botonayuda);

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});

    })
}

function GuardarVersionActual() {
	
	var version1=localStorage.getItem('versionapp');
	var id_user=localStorage.getItem('id_user');
	var datos="version="+version1+"&id_user="+id_user;

	var pagina = "guardarversion.php";
		$.ajax({
		type: 'POST',
		dataType: 'json',
		data:datos,
		url: urlphp+pagina,
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
}

function getdatoscliente() {
	
	 return new Promise(function(resolve, reject) {
	 var id_user=localStorage.getItem('id_user');
     var pagina = "ObtenerdatosPerfil.php";
     var datos='iduser='+id_user;

		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
			resolve(datos);

		

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});

    })
}