function ObtenerTipos(seleccionado) {

	var datos="tipos=3,4,5,6";

	 $.ajax({
					url:'catalogos/alumnos/tiposusuarios.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					data: datos, //Le pasamos el objeto que creamos con los archivos
					dataType:'json',
					error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $("#empresasasignadas").html(error); 
					  },
					success:function(msj){
						
							PintarTiposUsuarios(msj,seleccionado);
					  	}
				  });
}

function PintarTiposUsuarios(respuesta,seleccionado) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
		
			html+=`<option value="`+respuesta[i].idtipousuario+`">`+respuesta[i].nombretipo+`</option>`;
		}
	}

	$("#v_tipo").html(html);

	if (seleccionado!=0) {

		$("#v_tipo").val(seleccionado);
	}
}



function BorrarCliente(idcliente,nombre,idmenumodulo,regresar) {

	var r = confirm("¿SEGURO DE ELIMINAR  "+nombre+" ?");
	if (r == true) {



		var datos='idusuarios='+idcliente;

		$.ajax({
							url:'catalogos/alumnos/eliminarusuario.php', //Url a donde la enviaremos
							type:'POST', //Metodo que usaremos
							data: datos, //Le pasamos el objeto que creamos con los archivos
							error:function(XMLHttpRequest, textStatus, errorThrown){
								var error;
								console.log(XMLHttpRequest);
								  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
								  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
								  $("#main").html(error); 
								},
								success:function(msj){

									if (msj==0) {
										AbrirNotificacion('El usuario se encuentra relacionado  ','mdi mdi-checkbox-marked-circle');

									}

									if (msj==1) {

											AbrirNotificacion('Se ha eliminado correctamente','mdi mdi-checkbox-marked-circle');

											aparecermodulos(regresar+'?idmenumodulo='+idmenumodulo,'main');
	
									}

								}
							});

	} 
}


