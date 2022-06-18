function UsuariosServicio(idservicio) {
	
	var datos="idservicio="+idservicio;
	$.ajax({
	  url:'catalogos/asignarusuarioservicios/Obtenerasignacion.php', //Url a donde la enviaremos
	  type:'POST', //Metodo que usaremos
	  data: datos, //Le pasamos el objeto que creamos con los archivos
	  dataType:'json',
	  error:function(XMLHttpRequest, textStatus, errorThrown){
			var error;
			console.log(XMLHttpRequest);
			if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
			if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
			$('#abc').html('<div class="alert_error">'+error+'</div>');	
			//aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
		},
	  success:function(msj){

	  					var servicio=msj.servicio[0];
	  		$(".tituloseleccionado").text('ASIGNAR A SERVICIO: '+servicio.titulo);
		 	
		 	$(".item").removeClass('active');
		 	$("#lista_"+idservicio).addClass('active');
			$("#listausuarios").css('display','block');
			$(".mostrar").css('display','block');
			$(".btnguardar").attr('onclick','GuardarAsignacion('+idservicio+')');
			$(".chkcliente").prop('checked',false);
				var usuarios=msj.respuesta;
						if (usuarios.length>0) {

							for (var i =0; i <usuarios.length; i++) {
								
								$("#inputcli_"+usuarios[i].idusuarios).prop('checked',true);
							}
						}
		}
	});
}

function GuardarAsignacion(idservicio) {

			var participantes=[];

		$(".chkcliente").each(function(){
			var valor=$(this).attr('id');
			var id=valor.split('_')[1];

			if ($("#"+valor).is(':checked')) {
				participantes.push(id);
			}
		});

	
	var datos="idservicio="+idservicio+"&participantes="+participantes;
	$.ajax({
	  url:'catalogos/asignarusuarioservicios/GuardarAsignacion.php', //Url a donde la enviaremos
	  type:'POST', //Metodo que usaremos
	  data: datos, //Le pasamos el objeto que creamos con los archivos
	  dataType:'json',
	  error:function(XMLHttpRequest, textStatus, errorThrown){
			var error;
			console.log(XMLHttpRequest);
			if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
			if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
			$('#abc').html('<div class="alert_error">'+error+'</div>');	
			//aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
		},
	  success:function(msj){
		 	if (msj.respuesta==1) {
				aparecermodulos('catalogos/asignarusuarioservicios/vi_asignarusuarioservicios.php'+"?ac=1&idmenumodulo=113&msj=Operacion realizada con exito",'main');

				//AbrirNotificacion("Se guardarón cambios en la asignación del servicio",'mdi mdi-checkbox-marked-circle');
				//ActualizarServicios();
		 	}
		
		}
	});
}

function ActualizarServicios() {
		
	var datos="";
	$.ajax({
	  url:'catalogos/asignarusuarioservicios/ObtenerServicios.php', //Url a donde la enviaremos
	  type:'POST', //Metodo que usaremos
	  data: datos, //Le pasamos el objeto que creamos con los archivos
	  dataType:'json',
	  error:function(XMLHttpRequest, textStatus, errorThrown){
			var error;
			console.log(XMLHttpRequest);
			if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
			if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
			$('#abc').html('<div class="alert_error">'+error+'</div>');	
			//aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
		},
	  success:function(msj){
		 	if (msj.respuesta==1) {

				
		 	}
		
		}
	});
}