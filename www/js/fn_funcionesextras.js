



        function ObtenerMunicipiosCatalogo(idmunicipio,idestado,idelemento) {


        	var datos="idestado="+idestado;
        	setTimeout(function(){
        		$.ajax({
							url:'catalogos/pagos/obtenermunicipios.php', //Url a donde la enviaremos
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

									$("#"+idelemento).html(msj);
									$('#'+idelemento).chosen({width:"100%"});

									$('#'+idelemento).trigger("chosen:updated");

									if (idmunicipio>0) {
										$("#"+idelemento).val(idmunicipio);
										$('#'+idelemento).trigger("chosen:updated");

									}
								}
							});				  					  
        	},10);	
        }

        function ObtenerEstadosCatalogo(idestado,idpais,idelemento) {

        
        	var datos="idpais="+idpais;

        	setTimeout(function(){
        		$.ajax({
							url:'catalogos/pagos/obtenerestados.php', //Url a donde la enviaremos
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

									$("#"+idelemento).html(msj);
									$('#'+idelemento).chosen({width:"100%"});
									
									$('#'+idelemento).trigger("chosen:updated");
									if (idestado>0) {
										$("#"+idelemento).val(idestado);
										$('#'+idelemento).trigger("chosen:updated");

									}

								}
							});				  					  
        	},10);					
        }


        function ObtenerEstadosCatalogo2(idestado,idpais,idelemento) {


        	console.log(idelemento);

        	var elementos=idelemento.split(",");




        	ObtenerEstadosCatalogo(idestado,idpais,elementos[0]);
        	ObtenerEstadosCatalogo(idestado,idpais,elementos[1]);



        }

        function ObtenerLocalidadesCatalogo(idlocalidades,idmunicipio,idelemento) {
        	var datos="idmunicipio="+idmunicipio;

        	setTimeout(function(){
        		$.ajax({
							url:'catalogos/pagos/obtenerlocalidades.php', //Url a donde la enviaremos
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

									$("#"+idelemento).html(msj);
									$('#'+idelemento).chosen({width:"100%"});
									$('#'+idelemento).trigger("chosen:updated");
									if (idlocalidades>0) {

										$("#"+idelemento).val(idlocalidades);
										$('#'+idelemento).trigger("chosen:updated");

									}

								}
							});				  					  
        	},10);	
        }

        function trim(str) {
        return str.replace(/^\s+|\s+$/g,"");
			}
		function ObtenerMuColonias() {
			var v_codigopostal=$("#v_fis_cp").val();
			var idpais=$("#v_fis_pais").val();
			var idestado=$("#v_fis_estado").val();
			var idmunicipio=$("#v_fis_municipio").val();
			var datos="idpais="+idpais+"&idestado="+idestado+"&idmunicipio="+idmunicipio+"&v_codigopostal="+v_codigopostal;

			$.ajax({
							url:'catalogos/pagos/ObtenerColonias2.php', //Url a donde la enviaremos
							type:'POST', //Metodo que usaremos
							data: datos, //Le pasamos el objeto que creamos con los archivos
							dataType:'json',
							error:function(XMLHttpRequest, textStatus, errorThrown){
								var error;
								console.log(XMLHttpRequest);
								  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
								  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
								  $("#main").html(error); 
								},
								success:function(msj){
									var resp=msj.respuesta;
									
									PintarColoniasM(resp);
								}
							});	
		}

		function PintarColoniasM(respuesta) {
			var html="";
			if (respuesta.length>0) {
				for (var i = 0; i <respuesta.length; i++) {
					html+=`

					<option value="`+respuesta[i].asenta+`">`+respuesta[i].asenta+`</option>
					`;
				}
			}

			$("#v_fis_colonia").html(html);
		}

function Buscarcodigo() {
	var codigo=$("#v_fis_cp").val();
	var tamanio=$("#v_fis_cp").val().length;
	var datos="codigo="+codigo;

 	$("#v_colonia").val('');
	if (tamanio>=5) {

	$.ajax({
 			type: 'POST',
			url:'catalogos/pagos/buscarcodigo.php', //Url a donde la enviaremos
			data:datos,
			dataType:'json',
			async:false,
 			error:function(XMLHttpRequest, textStatus, errorThrown){
 				console.log(arguments);
 				var error;
						  if (XMLHttpRequest.status === 404) error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  AbrirNotificacion(error,"mdi-alert-octagon");
						  //$('#'+donde).html('<div class="alert_error">'+error+'</div>');						  
						},
						success:function(msj){


							var json=msj;

							var variables=json.respuesta;
							idestado=variables.idestado;
							idmunicipio=variables.idmunicipio;
							pais=variables.pais;

							

							if (variables.respuesta==1) {

								$("#codigomsj").html('');
								$("#codigomsj").css('visibility','hidden');


								/*ObtenerEstadosCatalogo(idestado,pais,'estado');
								ObtenerMunicipiosCatalogo(idmunicipio,idestado,'municipio');
*/								
								ObtenerEstadosCatalogo(idestado,pais,'v_fis_estado');
								ObtenerMunicipiosCatalogo(idmunicipio,idestado,'v_fis_municipio');

								$("#v_fis_pais").val(pais);
							//	ObtenerTipoAsentamiento(0);
 							  ObtenerMuColonias2(pais,idestado,idmunicipio,codigo,0);
 						 		

								/*$("#v_pais").attr('disabled',true);
								$("#v_estado").attr('disabled',true);
								$("#v_municipio").attr('disabled',true);*/

								/*$("#estado").val(idestado);
								$("#municipio").val(idmunicipio);*/

							}

							if(variables.respuesta==0){

								var texto='<label style="font-size:14px;">'+variables.mensaje+'</label>';
								$("#codigomsj").html(texto);
								$("#codigomsj").css('visibility','visible');


								$("#v_fis_pais").val(0);
								$("#v_fis_estado").val(0);
								$("#v_fis_municipio").val(0);
							}

							if (variables.respuesta==3) {
								$("#codigomsj").css('visibility','hidden');

								$("#codigomsj").html('');
	
							}

							if (variables.respuesta==2) {

								var texto='<label style="font-size:14px;">'+variables.mensaje+'</label>';
								$("#codigomsj").html(texto);
								$("#codigomsj").css('visibility','visible');
								$("#v_fis_pais").val(0);
								$("#v_fis_estado").val(0);
								$("#v_fis_municipio").val(0);
							}

							$(".licodigopostal").addClass('item-input-focused');
							$(".lipais").addClass('item-input-focused');
							$(".liestado").addClass('item-input-focused');
							$(".limunicipio").addClass('item-input-focused');
						}


						
						

						
	 					
	 				});	

		}else{

			$("#codigomsj").html('');
			$("#v_fis_pais").val(0);
			$("#v_fis_estado").val(0);
			$("#v_fis_municipio").val(0);

		}
}

function ObtenerMuColonias2(pais,idestado,idmunicipio,v_codigopostal,otro) {

			var idpais=pais;
			var datos="idpais="+idpais+"&idestado="+idestado+"&idmunicipio="+idmunicipio+"&v_codigopostal="+v_codigopostal;

			$.ajax({
							url:'catalogos/pagos/ObtenerColonias2.php', //Url a donde la enviaremos
							type:'POST', //Metodo que usaremos
							data: datos, //Le pasamos el objeto que creamos con los archivos
							dataType:'json',
							error:function(XMLHttpRequest, textStatus, errorThrown){
								var error;
								console.log(XMLHttpRequest);
								  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
								  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
								  $("#main").html(error); 
								},
								success:function(msj){
									var resp=msj.respuesta;
									
									PintarColoniasM(resp);
								}
							});	
			
		}

