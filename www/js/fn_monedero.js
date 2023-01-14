// JavaScript Document


	
function b_monedero(donde)
{

	var nombre = $('#v_nombre').val();
	var paterno = $('#v_paterno').val();
	var materno = $('#v_materno').val();
	var tarjeta = $('#v_tarjeta').val();
	
	
	var datos = 'nombre='+nombre+'&paterno='+paterno+'&materno='+materno+'&tarjeta='+tarjeta;

	var timeSlide = 100;
	
	console.log(datos);

	$("#"+donde).html('<div style="padding: 5px; text-align:center;"><img src="images/loading.gif" alt="" /><br />Cargando...</div>');	
	
	$.ajax({
			  type: 'POST',
			  url: 'catalogos/monedero/bu_monedero.php',
			  data: datos,
			  success:function(msj)
			  {
				 
				 $('#'+donde).html(msj);		 
				 
				 
			  },
			  error:function(XMLHttpRequest, textStatus, errorThrown){
				  console.log(arguments);
				  var error;
				  if (XMLHttpRequest.status === 404) error="P&aacute;gina no existe"+XMLHttpRequest.status;// display some page not found error 
				  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
				  $('#mensajes').html('<div class="alert_error"></div>');
				  $('.alert_error').hide(0).html('Ha ocurrido un error durante la ejecuci&oacute;n '+error);
				  $('.alert_error').slideDown(timeSlide);
				  OcultarDiv('mensajes');							  
			  }
		  });
	
}



function G_monedero(formulario,archivo_envio,archivo_vizualizar,donde_mostrar)
{
	//alert(archivo_envio);
	if(confirm("\u00BFEstas seguro de querer realizar esta operaci\u00f3n?"))
	{
		var datos = ObtenerDatosFormulario(formulario);//obteniedo los datos del formulario
		console.log(datos);
		$('#abc').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Cargando...</div>');
		//overlayopen('abc');
		setTimeout(function(){
				  $.ajax({
					  type: 'POST',
					  url: archivo_envio,
					  data: datos,
					  error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $('#abc').html('<div class="alert_error">'+error+'</div>');	
						  overlayclose('abc');
						  aparecermodulos(archivo_vizualizar+"?ac=0&msj=Error. "+error,donde_mostrar);
					  },
					  success:function(msj){
						  var array = msj.split('|');
						  
						   console.log("El resultado de msj es: "+msj);
						  if ( array[0] == 1 ){
							 // overlayclose('ventana');
							  //overlayclose('abc');
							  //$('#ModalPrincipal').css('display','none'); $('#contenido_modal').html('');
							  $('#modalinformacion').modal('hide');
							  //aparecermodulos(archivo_vizualizar+"?ac=1&msj=Operacion realizada con exito",donde_mostrar);
							   b_monedero('li_guias');
							   
							   if(array[2] == 0){
							  //$('#contenido_modal').html('<iframe src="ventas/pdf/monedero.php?id='+array[1]+'" width="100%" height="100%" scrolling="no"></iframe>');
								   var pag = 'modelosreportes/monedero/monedero.php?id='+array[1];
							   }else{
								  //$('#contenido_modal').html('<iframe src="ventas/pdf/monedero_termico.php?id='+array[1]+'" width="100%" height="100%" scrolling="no"></iframe>');
								   var pag = 'modelosreportes/monedero/monedero_termico.php?id='+array[1];
							   }
							  //AbrirModalGeneral('ModalPrincipal',800,400);
							  $("#titulo-modal-reportes").html('REPORTE MONEDERO');
							  imprimirPDF(pag);
						  }
						  else{
							 // overlayclose('ventana');
							 //overlayclose('abc');
							 aparecermodulos(archivo_vizualizar+"?ac=0&msj=Error. "+msj,donde_mostrar);
						  }	
					  }
				  });				  					  
		},1000);
	}
}// fin de function GuardarEspecial


function L_Clientes_Monedero()
{
	aparecermodulos('catalogos/monedero/li_clientes_monedero.php','contenedor-clientes-modal');	
	//AbrirModalSecundaria("ModalSecundaria",750,450);
	$('#Modal-cliente').modal();
	 
	
}

function S_cliente_monedero(id,nombre,nivel,idniveles)
{
	$('#cliente').val(id);
	$('#n_cliente').val(nombre);

	
	$('#Modal-cliente').modal('hide');
}


function agregarsaldo(idcliente,nombre)
{
		
	AbrirModalGeneral2('ModalPrincipal','900','400','catalogos/monedero/fa_monedero.php');
	$('.clienteid').val(idcliente);
	$('.nombrecliente').val(nombre);
	console.log(idcliente);
	console.log(nombre);
	
	
}


function agregarsaldoacliente(idusuarios,nombre) {

	var datos="idusuarios="+idusuarios+"&nombrecliente="+nombre;

		$.ajax({
			  type: 'POST',
			  url: 'catalogos/monedero/fa_monedero.php',
			  data: datos,
			  success:function(msj)
			  {		 


			  	$("#titulomodal").html('AGREGAR SALDO');
				 $("#bodymodal").html(msj);
				 var html=`<button type="button" onClick="var resp=MM_validateForm('cantidad','','R','concepto','','R'); if(resp==1){ G_monedero('alta_categoria','catalogos/monedero/ga_monedero.php','catalogos/monedero/vi_monedero.php','main');}" class="btn btn-success" style="float: right;">GUARDAR</button>`;
				 $("#btnfooter").html(html);
				 $("#modalinformacion").modal();
				 
			  },
			  error:function(XMLHttpRequest, textStatus, errorThrown){
				  console.log(arguments);
				  var error;
				  if (XMLHttpRequest.status === 404) error="P&aacute;gina no existe"+XMLHttpRequest.status;// display some page not found error 
				  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
				  $('#mensajes').html('<div class="alert_error"></div>');
				  $('.alert_error').hide(0).html('Ha ocurrido un error durante la ejecuci&oacute;n '+error);
				  $('.alert_error').slideDown(timeSlide);
				  OcultarDiv('mensajes');							  
			  }
		  });
}

function ObtenerMovimientos(idusuarios) {
	var datos="idusuarios="+idusuarios;
		

		$.ajax({
			  type: 'POST',
			  url: 'catalogos/monedero/listacargos.php',
			  data: datos,
			  success:function(msj)
			  {		 


			  	$("#titulomodal").html('MOVIMIENTOS');
				 $("#bodymodal").html(msj);
				 $("#regresarinfo").attr('onclick','');
				 $("#modalinformacion").modal();
				 
			  },
			  error:function(XMLHttpRequest, textStatus, errorThrown){
				  console.log(arguments);
				  var error;
				  if (XMLHttpRequest.status === 404) error="P&aacute;gina no existe"+XMLHttpRequest.status;// display some page not found error 
				  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
				  $('#mensajes').html('<div class="alert_error"></div>');
				  $('.alert_error').hide(0).html('Ha ocurrido un error durante la ejecuci&oacute;n '+error);
				  $('.alert_error').slideDown(timeSlide);
				  OcultarDiv('mensajes');							  
			  }
		  });
}