function ObtenerMembresiaActivas() {

	var id_user=localStorage.getItem('id_user');
	var datos="idusuario="+id_user;
	var pagina = "ObtenerMembresiaActivas.php";
		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){

			PintarNotificacion(datos.respuesta)

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}

function PintarNotificacion(respuesta) {
	if (respuesta.length>0) {

		for (var i = 0; i <respuesta.length; i++) {
			idmembresia=respuesta[i].idmembresia;
			console.log(idmembresia);
			  var notificationCallbackOnClose = app.notification.create({
		       // icon: '<i class="icon demo-icon">7</i>',
		        title: 'Membresia',
		        //titleRightText: 'now',
		        subtitle: respuesta[i].titulo,
		        text: respuesta[i].descripcion,
		       // closeOnClick: true,
		        closeButton: true,
		        on: {
		          click: function () {
		          	 notificationCallbackOnClose.close();
		            AbrirPantallaMembresia(idmembresia);

		          },


		        },
		      });

		        notificationCallbackOnClose.open();
		}
	}
}

function AbrirPantallaMembresia(idmembresia) {

	localStorage.setItem('idmembresia',idmembresia);
	
	GoToPage('membresia');
}

function CargarInformacionMembresia() {
	
	var idmembresia=localStorage.getItem('idmembresia');
	var datos="idmembresia="+idmembresia;
	var pagina = "ObtenerMembresia.php";
		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){

			PintarMembresia(datos.respuesta)

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}

function PintarMembresia(respuesta) {
	
			imagen=urlimagenes+`membresia/imagenes/`+codigoserv+respuesta.imagen;
			$("#imgmembresia").attr('src',imagen);

			$("#titulo").text(respuesta.titulo);
			$("#descripcion").text(respuesta.descripcion);
}