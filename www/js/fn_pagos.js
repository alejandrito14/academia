var descuentosaplicados=[];
var descuentomembresia=[];
function Guardarpagos(form,regresar,donde,idmenumodulo)
{
	if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
	{			
		//recibimos todos los datos..
		var datos = ObtenerDatosFormulario(form);
		
		console.log(datos);
	
		 $('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Procesando...</div>')
				
		setTimeout(function(){
				  $.ajax({
					url:'catalogos/pagos/ga_pagos.php', //Url a donde la enviaremos
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
								aparecermodulos(regresar+"?ac=1&idmenumodulo="+idmenumodulo+"&msj=Operacion realizada con exito&idempresas="+resp[1],donde);
						 	 }else{
								aparecermodulos(regresar+"?ac=0&idmenumodulo="+idmenumodulo+"&msj=Error. "+msj,donde);
						  	}			
					  	}
				  });				  					  
		},1000);
	 }
}

function SeleccionarClientePagos(idcliente) {


	  var datos="idcliente="+idcliente;
	  $(".cli_").removeClass('seleccionado');
	  $("#cli_"+idcliente+"_").addClass('seleccionado');
	  $("#inputtodos").prop('checked',false);
	  $.ajax({
					url:'catalogos/pagos/ObtenerTodosPagos.php', //Url a donde la enviaremos
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


						var respuesta=msj.respuesta;
						PintarpagosTabla(respuesta);
								
					  	}
				  });
}

function PintarpagosTabla(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			html+=`<tr style="text-align: center;">
					<td width="20"><input type="checkbox" class="form-control pagosusuario" id="pago_`+respuesta[i].idpago+`" onchange="VerificarDescuento(`+respuesta[i].idpago+`)"></td>

				      <td  width="40">`+respuesta[i].concepto+`<br><span>VIGENCIA:`+respuesta[i].fechafinal+`</span></td>
				
				      <td  width="40">$<span id="monto_`+respuesta[i].idpago+`">`+respuesta[i].monto+`</span></td>
			    </tr>`;
		}


	}

	$("#listadopagos").html(html);
}

function SeleccionarTodosPagos() {
	if ($("#inputtodos").is(':checked')) {
		$(".pagosusuario").each(function( index ) {
			   $(this).prop('checked',true);
			});


	}else{

		$(".pagosusuario").each(function( index ) {
			   $(this).prop('checked',false);
			});

	}

	VerificarDescuento();
}
var pagos=[];
function VerificarDescuento() {
	 pagos=[];
	 var suma=0;
	$(".pagosusuario").each(function( index ) {

			if ($(this).is(':checked')) {
			   var id=$(this).attr('id');
			   var dividir=id.split('_');
			   var monto=$("#monto_"+dividir[1]).text()
			   var objeto={
			   	id:dividir[1],
			   	monto:monto

			   }

			   suma=parseFloat(suma)+parseFloat(monto);
			   pagos.push(objeto);
			}


	});

	$("#subtotal").html(suma);

	  var datos="pagos="+JSON.stringify(pagos);
		descuentosaplicados=[];
	  $.ajax({
					url:'catalogos/pagos/ObtenerDescuentosRelacionados.php', //Url a donde la enviaremos
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

						if (msj.descuentos.length>0) {
							
							$("#contenedor_descuentos").css('display','block');
							descuentosaplicados=msj.descuentos;
							PintarDescuentos(msj.descuentos);
						}

						ObtenerMembresiaUsuario();
						CalcularTotales();
								
					  	}
				  });

}

function PintarDescuentos(respuesta) {
	var html="";
	if (respuesta.length>0) {
		
		for (var i = 0; i < respuesta.length; i++) {
			html+=`<tr style="text-align: center;">
					
					<td width="10">
					<div style="width:15px;"></div>
					</td>
				      <td width="40">Descuento `+respuesta[i].titulo+`</td>
				      <td width="40">$<span id="monto_`+respuesta[i].iddescuento+`">`+formato_numero(respuesta[i].montoadescontar,2,'.',',')+`</span></td>
			    </tr>`;
		}
	}
	$("#listadodescuentos").html(html);
}

function ObtenerMembresiaUsuario() {


		var idusuario=$(".seleccionado").attr('id').split('_')[1];
	  var datos="pagos="+JSON.stringify(pagos)+"&id_user="+idusuario+"&descuentosaplicados="+JSON.stringify(descuentosaplicados);
	
	  $.ajax({
					url:'catalogos/pagos/ObtenerMembresiaUsuario.php', //Url a donde la enviaremos
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

						
						if (msj.descuentomembresia.length>0) {
							$("#contenedor_descuentos_membresia").css('display','block');
							PintarMembresiasDescuento(msj.descuentomembresia);
						}
								
					  	}
				  });
}
function PintarMembresiasDescuento(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			
			html+=`<tr style="text-align: center;">
					
					<td width="10">
					<div style="width:15px;"></div>
					</td>
				      <td width="40">Descuento `+respuesta[i].titulomembresia+`</td>
				      <td width="40">$<span id="monto_`+respuesta[i].idmembresia+`">`+formato_numero(respuesta[i].montoadescontar,2,'.',',')+`</span></td>
			    </tr>`;
		}
	}

	$("#listadodescuentosmembresia").html(html);
}

function CalcularTotales() {
	var suma=0;
	$(".pagosusuario").each(function( index ) {

			if ($(this).is(':checked')) {
			   var id=$(this).attr('id');
			   var dividir=id.split('_');
			   var monto=$("#monto_"+dividir[1]).text()
			   var objeto={
			   	id:dividir[1],
			   	monto:monto

			   }

			   suma=parseFloat(suma)+parseFloat(monto);
			   pagos.push(objeto);
			}


	});



}