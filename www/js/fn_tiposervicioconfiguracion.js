function  GuardarTipoServicioConfiguracion(form_usuario,regreso,donde,idmenumodulo)
{
		if(confirm("\u00BFEstas seguro de querer realizar esta operaci\u00f3n?"))
	{

				var id=$("#id").val();
				var v_nombre=$("#v_nombre").val();
				var v_descripcion=$("#v_descripcion").val();
				var v_costo=$("#v_costo").val();
				var v_numparticipantes=$("#v_numparticipantesmin").val();
				var v_numparticipantesmax=$("#v_numparticipantesmax").val();
				var v_politicasaceptacionid=$("#v_politicasaceptacionid").val();
				var v_cantidaddias=$("#v_cantidaddias").val();
				var modalidad=0;
				var descuentos=[];
				var encuestas=[];
				var v_estatus=$("#v_estatus").val();
				var v_orden=$("#v_orden").val();

				if(document.querySelector('input[name="v_grupo"]:checked')) {
				   	modalidad=$('input[name="v_grupo"]:checked').val();
				    }

				var modalidadpago=0;
				if ($('input[name=v_grupo2]').is(':checked')) {
					modalidadpago=$('input[name=v_grupo2]:checked').val();

				}

				var montopagarparticipante=$("#v_montopagarparticipante").val();
				var montopagargrupo=$("#v_montopagargrupo").val();

				$(".chkencuesta").each(function(){
							var valor=$(this).attr('id');
							var id=valor.split('_')[1];
							if ($("#"+valor).is(':checked')) {
								encuestas.push(id);
							}
						});

				var abiertocliente=$("#v_abiertocliente").is(':checked')?1:0;
				var abiertocoach=$("#v_abiertocoach").is(':checked')?1:0;
				var abiertoadmin=$("#v_abiertoadmin").is(':checked')?1:0;
				var ligarclientes=$("#v_ligarclientes").is(':checked')?1:0;
				var v_numligarclientes=$("#v_numligarclientes").val();
				var v_aceptarserviciopago=$("#v_aceptarserviciopago").val();

				
				var v_tiempoaviso=$("#v_tiempoaviso").val();
				var v_tituloaviso=$("#v_tituloaviso").val();
				var v_descripcionaviso=$("#v_descripcionaviso").val();

				var v_politicascancelacion=$("#v_politicascancelacion").val();
				var v_politicasaceptacion=$("#v_politicasaceptacion").val();
				var v_reembolso=$("#v_reembolso").is(':checked')?1:0;
				var v_politicasaceptacionid=$("#v_politicasaceptacionid").val();


		
				var v_asistencia=$("#v_asistencia").is(':checked')?1:0;
				var v_cantidadreembolso=$("#v_cantidadreembolso").val();
				var v_tiporeembolso=$("#v_tipodescuentoreembolso").val();
		
				var v_asignadocliente=$("#v_asignadocliente").is(':checked')?1:0;
				var v_asignadocoach=$("#v_asignadocoach").is(':checked')?1:0;
				var v_asignadoadmin=$("#v_asignadoadmin").is(':checked')?1:0;
				var encuestas=[];

			$(".chkencuesta").each(function(){
						var valor=$(this).attr('id');
						var id=valor.split('_')[1];
						if ($("#"+valor).is(':checked')) {
									encuestas.push(id);
						}
					});

				var datos = new FormData();
				datos.append('v_politicasaceptacionid',v_politicasaceptacionid);

				datos.append('id',id);
				datos.append('v_nombre',v_nombre); 
				datos.append('v_descripcion',v_descripcion);
				datos.append('v_costo',v_costo);
				datos.append('v_estatus',v_estatus);
				//datos.append('v_totalclase',totalclase);
				datos.append('v_modalidad',modalidad);
				datos.append('v_montopagarparticipante',montopagarparticipante);
				datos.append('v_montopagargrupo',montopagargrupo);
				datos.append('v_modalidadpago',modalidadpago);
				datos.append('v_cantidaddias',v_cantidaddias);
				datos.append('v_numparticipantes',v_numparticipantes);
				datos.append('v_numparticipantesmax',v_numparticipantesmax);
				datos.append('v_ligarclientes',ligarclientes);
				datos.append('abiertocliente',abiertocliente);
				datos.append('abiertocoach',abiertocoach);
				datos.append('abiertoadmin',abiertoadmin);
				datos.append('ligarclientes',ligarclientes);
				datos.append('v_numligarclientes',v_numligarclientes);
				datos.append('v_tiempoaviso',v_tiempoaviso);
				datos.append('v_tituloaviso',v_tituloaviso);
				datos.append('v_descripcionaviso',v_descripcionaviso);
				datos.append('v_politicascancelacion',v_politicascancelacion);
				datos.append('v_reembolso',v_reembolso);
				datos.append('v_tiporeembolso',v_tiporeembolso);
				datos.append('v_cantidadreembolso',v_cantidadreembolso);
				datos.append('v_asignadocliente',v_asignadocliente);
				datos.append('v_asignadocoach',v_asignadocoach);
				datos.append('v_asignadoadmin',v_asignadoadmin);
				datos.append('v_politicasaceptacion',v_politicasaceptacion);
				datos.append('v_politicasaceptacionid',v_politicasaceptacionid);		
				datos.append('v_encuestas',encuestas);
				datos.append('v_asistencia',v_asistencia);
				datos.append('v_aceptarserviciopago',v_aceptarserviciopago);
				datos.append('v_orden',v_orden);
				var bandera=1;
				if (v_nombre=='') {
					bandera=0;
				}
				
		$('#abc').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Cargando...</div>');
	 
		setTimeout(function(){ 
				  $.ajax({
					    url:'catalogos/tiposervicioconfiguracion/ga_tiposervicioconfiguracion.php', //Url a donde la enviaremos
						type:'POST', //Metodo que usaremos
						contentType: false, //Debe estar en false para que pase el objeto sin procesar
						data: datos, //Le pasamos el objeto que creamos con los archivos
						processData: false, //Debe estar en false para que JQuery no procese los datos a enviar
						cache: false, //Para que˘
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
						  var resp = msj.split('|');

						 if( resp[0] == 1 ){
							 
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

function ObtenerTipoServicioConfiguracionEncuesta(idtipoconfiguracion) {
	// body...
	var datos="idtipoconfiguracion="+idtipoconfiguracion;
	$.ajax({
		url:'catalogos/tiposervicioconfiguracion/ObtenerTipoServicioConfiguracionEncuesta.php', //Url a donde la enviaremos
	  type:'POST', //Metodo que usaremos
	 dataType:'json',
	 data:datos,
	  error:function(XMLHttpRequest, textStatus, errorThrown){
			var error;
			console.log(XMLHttpRequest);
			if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
			if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
			$('#abc').html('<div class="alert_error">'+error+'</div>');	
			//aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
		},
	  success:function(msj){
		 		var encuesta=msj.respuesta;

		 		if (encuesta.length>0) {
		 			for (var i = 0; i < encuesta.length; i++) {
		 				$("#inputencuesta_"+encuesta[i].idencuesta).attr('checked',true);
		
		 			}
		 		}
			 			
			}
	});
}