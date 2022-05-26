function  Guardarusuario(form_usuario,regreso,donde,archivoenvio,idmenumodulo)
{
	
	if(confirm("\u00BFEstas seguro de querer realizar esta operaci\u00f3n?"))
	{
		var datos = ObtenerDatosFormulario(formulario);//obteniedo los datos del formulario
	
		$('#abc').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Cargando...</div>');
	
		setTimeout(function(){
				  $.ajax({
					  type: 'POST',
					  url: archivoenvio,
					  data: datos,
					  error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $('#abc').html('<div class="alert_error">'+error+'</div>');	
						 aparecermodulos(regreso+"?ac=0&msj=Error. "+msj,donde);

					  },
					  success:function(msj){
						   console.log("El resultado de msj es: "+msj);
						  if ( msj == 1 ){
							 
							  aparecermodulos(regreso+"?ac=1&msj=Operacion realizada con exito&idmenumodulo="+idmenumodulo,donde);
						  }
						  else{
							
							 aparecermodulos(regreso+"?ac=0&msj=Error. "+msj,donde);
						  }	
					  }
				  });				  					  
		},1000);
	}
}