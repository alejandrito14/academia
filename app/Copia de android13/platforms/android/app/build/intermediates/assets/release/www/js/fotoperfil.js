// JavaScript Document
/*==================== CAZAMOS LOS CLICKS ======================*/


	//Configuracion de la foto tomada
	/*var camearaOptions = {
		quality: 40,
		destinationType: navigator.camera.DestinationType.FILE_URI,
		//sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
		sourceType: navigator.camera.PictureSourceType.CAMERA,
		encodingType: Camera.EncodingType.JPEG,
		targetWidth: 100,
		targetHeight: 100
	}*/

var fichero; 

function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 40,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        //allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }

    return options;
}	
	//Tendra toda la ruta de la imagen

/*==============================INICIA AGREGAR FOTO PERFIL===============================*/

	//Funcion para abrir la camara del phone
	function TomarFoto(iduser) {

		var srcType = Camera.PictureSourceType.CAMERA;
    	var options = setOptions(srcType);
    
		navigator.camera.getPicture(onSuccessPerfil,onError,options);
	
	}

	//El valor devuleto al tomar la foto lo envia a esta funcion 
	function onSuccessPerfil(RutaImagen) {
		//app.popup.close('.popup-opciones-subir-fotos');
		//document.getElementById("miimagen").src = RutaImagen;
		fichero=RutaImagen;
		var iduser = localStorage.getItem("id_user");
	
		guardar_foto_perfil(iduser);

	}



		function guardar_foto_perfil(iduser) {
		
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = fichero.substr(fichero.lastIndexOf('/') + 1);
		options.mimeType = "image/jpeg";
		options.chunkedMode = false;
		
		//Agregamos parametros
		var params = new Object();
		params.iduser = iduser;

		console.log("Valor del parametro "+iduser+' od');
		
		options.params = params;

	
		var ft = new FileTransfer();

		console.log("El ID DEL PERFIL ES: "+iduser);

		ft.upload(fichero,urlphp+"fotoperfil.php",respuestafoto, fail, options);

		
	}


	function respuestafoto(r)
	{
		var resp = r.response;
		var obj = JSON.parse(resp);
		var result = obj[0]['respuesta'];
		var ruta = obj[0]['ruta'];

		app.preloader.hide();

		if(result == 1){

			localStorage.setItem('foto',ruta);

			
			app.dialog.alert("La foto se ha guardado correctamente",localStorage.getItem("UserName"));
			//alerta('La foto se ha guardado correctamente','PROCESO TERMINADO');
			
			//cargar_datos_actividad(idservicios_seguimientos);
		
			CargarFoto();

		}else{
			//Hubo un error
			alerta(result,"ERROR");
		}	
	}


/*====================================== INICIA AGREGAR FOTO ACTIVIDAD =================================*/



	//Funcion para abrir la camara del phone
	function TomarFotoActividad(id) {
		localStorage.setItem("idactividadfoto",id);
		var srcType = Camera.PictureSourceType.CAMERA;
    	var options = setOptions(srcType);
		navigator.camera.getPicture(onSuccess,onError,options);
	}

	function ObtenerGaleriaActividad()
	{ 
		var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
		var options = setOptions(srcType);
		//var func = createNewFileEntry;

		navigator.camera.getPicture(onSuccess,onError, options);
	}






	function respuesta(r)
	{
		var resp = r.response;
		var obj = JSON.parse(resp);
		var result = obj[0]['respuesta'];

		app.preloader.hide()

		if(result == 1){
			//Todo se completo bien
			//$('#v_descripcion_detalle_foto').val('');
			//$('#miimagen').attr("src","img/lazy-placeholder.gif");
          
			//closepop('.popup-detalle-actividad-foto');
			app.dialog.alert("La foto se ha guardado correctamente!",localStorage.getItem("UserName"));
			//alerta('La foto se ha guardado correctamente','PROCESO TERMINADO');
			
			//cargar_datos_actividad(idservicios_seguimientos);
			
			

		}else{
			//Hubo un error
			alerta(result,"ERROR");
		}	
	}

/*====================================== TERMINA AGREGAR FOTO ACTIVIDAD =====================================*/


/*====================================== INICIA AGREGAR FOTO JUSTIFICACION =================================*/

	

	//El valor devuleto al tomar la foto lo envia a esta funcion 
	function onSuccess2(RutaImagen) {
		
		fichero=RutaImagen;		
		var v_idjustificaciones = localStorage.getItem("idjustificacionesmodificaciones");
		
		//alert(v_idcamiones_gasolina);
		//app.dialog.alert("El ID DE JUSTIFICACIONES ES : "+v_idjustificaciones);
		//console.log("Ingreso a onSuccess con el id:" + v_idjustificaciones);		
		
		guardar_foto_justificacion(v_idjustificaciones);
	}



	function guardar_foto_justificacion(id) {

		app.preloader.show()

		var options = new FileUploadOptions();
		
		options.fileKey = "file";
		options.fileName = fichero.substr(fichero.lastIndexOf('/') + 1);
		options.mimeType = "image/jpeg";
		options.chunkedMode = false;
		

		//Agregamos parametros
		var params = new Object();
		
		params.v_idjustificacion = id;

		console.log("Valor del parametro "+id+' od');
		
		options.params = params;
		
		var ft = new FileTransfer();

		//ft.upload(fichero, "http://192.168.1.69/svnonline/iasistencia/registroasistencia/php/asistencia_fotos_g_actividad.php", respuesta, fail, options);
		
		
		console.log("El ID DE LA JUSTIFICACION ES: "+id);
		ft.upload(fichero, urlphp+"asistencia_fotos_g_justificacion.php", respuesta, fail, options);
		

		
	}

	
/*====================================== TERMINA AGREGAR FOTO JUSTIFICACION =====================================*/


/*============================================================================================================*|
|										INICIA FUNCIONES GENERALES															   |
|=============================================================================================================*/
	//Funcion para reportar error al usar la camara del phone
	function onError(err)
	{ 	
		//alert('error '+err);
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

	function guardarImgObservacion() {
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = fichero.substr(fichero.lastIndexOf('/') + 1);
		options.mimeType = "image/jpeg";
		options.chunkedMode = true;

		var params = new Object();
		params.descripcion = document.getElementById("v_descripcion_foto").value;


		options.params = params;
		var ft = new FileTransfer();

		//ft.upload(fichero, "http://192.168.1.73/GestionActividades/app_sisba/php/guardar_datos_observaciones.php", resp, fail, options);
		ft.upload(fichero, d_json+"guardar_datos_observaciones.php", resp, fail, options);

	}

	
    function galeria_fotos_actividades(id)
		{
			
			    var photo = l_fotos_actividad(id);
			   
	
					/*=== As Page ===*/
				var myPhotoBrowserPage = app.photoBrowser.create({
					photos : photo,
					type: 'popup',
					pageBackLinkText: 'REGRESAR',
					popupCloseLinkText: 'CERRAR',
					theme: 'dark'
				});
							
					myPhotoBrowserPage.open();
			

		}

    function galeria_fotos_justificaciones()
		{
			     
			    var id = localStorage.getItem("idjustificacionesmodificaciones");
			    var photo = l_fotos_justificaciones(id);
			   
			   	console.log(photo);
			   	console.log('id'+id);
	
					/*=== As Page ===*/
				var myPhotoBrowserPage2 = app.photoBrowser.create({
					photos : photo,
					type: 'popup',
					pageBackLinkText: 'REGRESAR',
					popupCloseLinkText: 'CERRAR',
					theme: 'dark'
				});
							
					myPhotoBrowserPage2.open();
			

		}



function CargarFoto() {

  var foto=localStorage.getItem("foto");
  var url="";
  if (foto!='null' && foto!='') {
  	url=urlphp+"upload/perfil/"+foto;
    $("#imagenusuario").attr('src',urlphp+"upload/perfil/"+foto);
    $("#imagenusuario2").attr('src',urlphp+"upload/perfil/"+foto);
    $("#imagencliente").attr('src',urlphp+"upload/perfil/"+foto);
    $("#imagencliente2").attr('src',urlphp+"upload/perfil/"+foto);
    $(".imagencliente2").attr('src',urlphp+"upload/perfil/"+foto);

  }else{

  
  	foto=localStorage.getItem('avatar');
  	 url=urlphp+"imagenesapp/"+foto;

    $("#imagenusuario").attr('src',urlphp+"imagenesapp/"+foto);
    $("#imagenusuario2").attr('src',urlphp+"imagenesapp/"+foto);

    $("#imagencliente").attr('src',urlphp+"imagenesapp/"+foto);
    $("#imagencliente2").attr('src',urlphp+"imagenesapp/"+foto);

    $(".imagencliente2").attr('src',urlphp+"imagenesapp/"+foto);

  }

  $(".divimagencliente2").attr('onclick','VerFoto("'+url+'")');

}

function VerFoto(url) {
	   var myPhotoBrowser = app.photoBrowser.create({
       
        photos: [
         url
            ]
      });
      //Open photo browser on click
      myPhotoBrowser.open();
      $(".popup-close").text('Cerrar');
     $(".popup-close").css('margin-top','100px');
}

function CargarFotodefault() {
	foto="icon-usuario.png";
    $("#imagenusuario").attr('src',"img/"+foto);
    $("#imagenusuario2").attr('src',"img/"+foto);

    $("#imagencliente").attr('src',"img/"+foto);
    $("#imagencliente2").attr('src',"img/"+foto);

    $(".imagencliente2").attr('src',"img/"+foto);

}

