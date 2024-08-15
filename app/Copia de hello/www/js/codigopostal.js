function Buscarcodigo() {
	var codigo=$("#v_codigopostal").val();
	var tamanio=$("#v_codigopostal").val().length;
	var datos="codigo="+codigo;
	var pagina = "buscarcodigo.php";
	localStorage.setItem('asenta','');
 	localStorage.setItem('tipo_asenta','');
 	$("#v_colonia").val('');
	if (tamanio>=5) {

	$.ajax({
 			type: 'POST',
 			url: urlphp+pagina,
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
								ObtenerEstado(idestado,pais);
								ObtenerMunicipios(idmunicipio,idestado);

								$("#v_pais").val(pais);
							//	ObtenerTipoAsentamiento(0);
 						 ObtenerTipoAsentamiento2(pais,idestado,idmunicipio,codigo,0);
 						 		

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


								$("#v_pais").val(0);
								$("#v_estado").val(0);
								$("#v_municipio").val(0);
							}

							if (variables.respuesta==3) {
								$("#codigomsj").css('visibility','hidden');

								$("#codigomsj").html('');
	
							}

							if (variables.respuesta==2) {

								var texto='<label style="font-size:14px;">'+variables.mensaje+'</label>';
								$("#codigomsj").html(texto);
								$("#codigomsj").css('visibility','visible');
								$("#v_pais").val(0);
								$("#v_estado").val(0);
								$("#v_municipio").val(0);
							}

							$(".licodigopostal").addClass('item-input-focused');
							$(".lipais").addClass('item-input-focused');
							$(".liestado").addClass('item-input-focused');
							$(".limunicipio").addClass('item-input-focused');
						}


						
						

						
	 					
	 				});	

		}else{

			$("#codigomsj").html('');
			$("#pais").val(0);
			$("#estado").val(0);
			$("#municipio").val(0);

		}
}

function Buscarcodigo2(asentamiento) {
	var codigo=$("#v_codigopostal").val();
	var tamanio=$("#v_codigopostal").val().length;
	var datos="codigo="+codigo;
	var pagina = "buscarcodigo.php";

	if (tamanio>=5) {

	$.ajax({
 			type: 'POST',
 			url: urlphp+pagina,
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
								ObtenerEstado(idestado,pais);
								ObtenerMunicipios(idmunicipio,idestado);

								$("#v_pais").val(pais);
							//	ObtenerTipoAsentamiento(0);
 						 ObtenerTipoAsentamiento2(pais,idestado,idmunicipio,codigo,asentamiento);

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


								$("#v_pais").val(0);
								$("#v_estado").val(0);
								$("#v_municipio").val(0);
							}

							if (variables.respuesta==3) {
								$("#codigomsj").css('visibility','hidden');

								$("#codigomsj").html('');
	
							}

							if (variables.respuesta==2) {

								var texto='<label style="font-size:14px;">'+variables.mensaje+'</label>';
								$("#codigomsj").html(texto);
								$("#codigomsj").css('visibility','visible');
								$("#v_pais").val(0);
								$("#v_estado").val(0);
								$("#v_municipio").val(0);
							}
						}

						
	 					
	 				});	

		}else{

			$("#codigomsj").html('');
			$("#pais").val(0);
			$("#estado").val(0);
			$("#municipio").val(0);

		}
}