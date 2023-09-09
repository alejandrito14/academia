function GuardarTipocoach() {
	
	if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
	{			
		var v_nombre=$("#v_nombre").val();
		var v_tipocomision=$("#v_tipocomision").val();
		var v_monto=$("#v_monto").val();
		var v_costo=$("#v_costo").val();
		var v_estatus=$("#v_estatus").val();
		var datos="v_nombre="+v_nombre+"&v_tipocomision="+v_tipocomision+"&v_monto="+v_monto+"&v_costo="+v_costo+"&v_estatus="+v_estatus;		

		 $('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Procesando...</div>')
		setTimeout(function(){
				  $.ajax({
					url:'catalogos/tipocoach/ga_tipocoach.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					data: datos, //Le pasamos el objeto que creamos con los archivos
					error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $('#abc').html('<div class="alert_error">'+error+'</div>');	
						  //aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
					  },
					success:function(msj){
						var resp = msj.split('|');
						
						   console.log("El resultado de msj es: "+msj);
						 	if( resp[0] == 1 ){
								aparecermodulos(regresar+"?ac=1&idmenumodulo="+idmenumodulo+"&msj=Operacion realizada con exito",donde);
						 	 }else{
								aparecermodulos(regresar+"?ac=0&idmenumodulo="+idmenumodulo+"&msj=Error. "+msj,donde);
						  	}			
					  	}
				  });				  					  
		},1000);
	 }
}