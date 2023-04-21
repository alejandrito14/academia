
function Guardarpagos(form,regresar,donde,idmenumodulo)
{
	if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
	{			
		//recibimos todos los datos..
		var datos = ObtenerDatosFormulario(form);
		
		//console.log(datos);
	
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
	LimpiarVariables();
	
	var datos="idcliente="+idcliente;

	 /* $(".cli_").removeClass('seleccionado');
	  $("#cli_"+idcliente+"_").addClass('seleccionado');*/
	  if($("#inputcli_"+idcliente+"_").is(':checked')){
	  	idparticipante=idcliente;
	  $(".chkcliente_").prop('checked',false);
	  $("#inputcli_"+idcliente+"_").prop('checked',true);
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
						CalcularTotales();

						var respuesta=msj.respuesta;
						var monedero=msj.monedero;
						//PintarpagosTabla(respuesta);
						PintarPagosPorpagar(respuesta);
						$(".btnnuevopago").css('display','block');
						$("#btnmonederodisponible").css('display','block');
						if (monedero!=null) {
							$("#btnmonederodisponible").attr('disabled',false);
							$("#monederodisponible").text(monedero);
							$("#btnmonederodisponible").attr('onclick','AbrirModalMonedero()');
						  }
								
					  	}
				  });

	}else{

	$("#contenedor_descuentos").css('display','none');
	$("#listadodescuentos").html("");
	$("#listadodescuentosmembresia").html("");
	$("#contenedor_descuentos_membresia").css('display','none');
	$("#listadopagos").html("");
	
	$("#btnpagarresumen").attr('disabled',true);
	LimpiarVariables();
	CalcularTotales();
	}
}

function PintarpagosTabla(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			html+=`<tr style="text-align: center;">
					<td width="20"><input type="checkbox" class="form-control pagosusuario" id="pago_`+respuesta[i].idpago+`" onchange="VerificarDescuento(`+respuesta[i].idpago+`)"></td>

				      <td  width="40">`+respuesta[i].concepto+`<br>`;
				      if (respuesta[i].fechafinal!='' && respuesta[i].fechafinal!=null ) {
				      html+=`
				      <span>VIGENCIA:`+respuesta[i].fechafinal+`</span>`;
				  		}
				      html+=`
				      <input type="hidden" value="`+respuesta[i].tipo+`" id="tipo_`+respuesta[i].idpago+`"> 
				      </td>
				
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

function VerificarDescuento() {
	 pagos=[];
	 //console.log(pagos);
	 var suma=0;
	$(".pagosusuario").each(function( index ) {

			if ($(this).is(':checked')) {
			   var id=$(this).attr('id');
			   var dividir=id.split('_');
			   var monto=$("#monto_"+dividir[1]).text()
			   var tipo=$("#tipo_"+dividir[1]).val();
			   var objeto={
			   	id:dividir[1],
			   	monto:monto,
			   	tipo:tipo
			   }
			  // console.log(objeto);
			   suma=parseFloat(suma)+parseFloat(monto);
			   pagos.push(objeto);


			}


	});
		if (pagos.length>0) {
			$("#btnpagar").attr('disabled',false);
			$("#btnpagar").attr('onclick','ElegirMetodoPago()')
		}else{

			$("#btnpagar").attr('disabled',true);

		}

	$("#subtotal").html(formato_numero(suma,2,'.',','));

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
						$("#contenedor_descuentos").css('display','none');
						$("#listadodescuentos").html("");

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
	var idusuario=0;
	$(".chkcliente_").each(function( index ) {
			  if ($(this).is(':checked')) {

			  	var idelemento=$(this).attr('id').split('_');
			  	 idusuario=idelemento[1];
			  }
			});
	
	  var datos="pagos="+JSON.stringify(pagos)+"&id_user="+idusuario+"&descuentosaplicados="+JSON.stringify(descuentosaplicados);
	descuentosmembresia=[];
	  $.ajax({
					url:'catalogos/pagos/ObtenerMembresiaUsuario.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					data: datos, //Le pasamos el objeto que creamos con los archivos
					dataType:'json',
					async:false,
					error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $('#abc').html('<div class="alert_error">'+error+'</div>');	
						  //aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
					  },
					success:function(msj){
						$("#listadodescuentosmembresia").html("");

						$("#contenedor_descuentos_membresia").css('display','none');
						if (msj.descuentomembresia.length>0) {
							$("#contenedor_descuentos_membresia").css('display','block');
							descuentosmembresia = msj.descuentomembresia;
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
/*
function CalcularTotales() {
	var suma=0;
	pagos=[];
	
	if ($(".pagosusuario").length>0) {
	$(".pagosusuario").each(function( index ) {

			if ($(this).is(':checked')) {
			   var id=$(this).attr('id');
			   var dividir=id.split('_');
			   var monto=$("#monto_"+dividir[1]).text()
			   var tipo=$("#tipo_"+dividir[1]).val();
 
			   var objeto={
			   	id:dividir[1],
			   	monto:monto,
			   	tipo:tipo

			   }

			   suma=parseFloat(suma)+parseFloat(monto);
			   pagos.push(objeto);
			}


	});
}

	var montodescuento=0;
	for (var i = 0; i < descuentosaplicados.length; i++) {
		montodescuento=parseFloat(montodescuento)+parseFloat(descuentosaplicados[i].montoadescontar);
	}
	

	var montodescuentomembresia=0;
	for (var i = 0; i < descuentosmembresia.length; i++) {
		montodescuentomembresia=parseFloat(montodescuentomembresia)+parseFloat(descuentosmembresia[i].montoadescontar);
	}

	$("#descuento").html(formato_numero(montodescuento,2,'.',','));
	$("#descuentomembresia").html(formato_numero(montodescuentomembresia,2,'.',','));

	// total=parseFloat(suma)-parseFloat(monedero)-parseFloat(montodescuento)+parseFloat(montodescuentomembresia);

	var resta=parseFloat(suma)-parseFloat(monedero)-parseFloat(montodescuento)-parseFloat(montodescuentomembresia);
    var sumaconcomision=resta;
	subtotalsincomision=resta;


	$("#total").html(formato_numero(resta,2,'.',','));


     // if (localStorage.getItem('comisionporcentaje')!=0 ){
       // comisionporcentaje=localStorage.getItem('comisionporcentaje');
        comimonto=parseFloat(comisionporcentaje)/100;
        
        comimonto=parseFloat(comimonto)*parseFloat(sumaconcomision);

        comision=parseFloat(comimonto)+parseFloat(comisionmonto);
      
       // localStorage.setItem('comision',comision);

     // }


     // if (localStorage.getItem('impuesto')!=0 ){
       // impuesto=localStorage.getItem('impuesto');
        impumonto=impuesto/100;

        comision1=parseFloat(comision)*parseFloat(impumonto);
        impuestotal=comision1;
       // localStorage.setItem('impuestotal',comision1);
        comision=parseFloat(comision1)+parseFloat(comision);


     // }
        $(".divcomision").css('display','none');


     // if (comision!=0 || comisionmonto!=0 ) {

        $(".divcomision").css('display','block');
        $("#comision").text(formato_numero(comision,2,'.',','));
       // localStorage.setItem('comisiontotal',comision);
        comisiontotal=comision;
        sumaconcomision=parseFloat(sumaconcomision)+parseFloat(comision);
    //  }
   // subtotalsincomision=total.toFixed(2);
    //localStorage.setItem('subtotalsincomision',resta.toFixed(2));
	  //localStorage.setItem('sumatotalapagar',sumaconcomision.toFixed(2));
	$(".lblresumen").text(formato_numero(resta,2,'.',','));
    $("#total").text(formato_numero(sumaconcomision,2,'.',','));
    $("#monedero").text(formato_numero(monedero,2,'.',','));	
    var suma=sumaconcomision;

    total=sumaconcomision;
   /* if (suma==0) {

      $("#btnpagarresumen").attr('disabled',false);
    }
}*/


function ElegirMetodoPago() {

	//$("#modalmetodopago").modal();
	ObtenerTipodepagos();
}

function ObtenerTipodepagos() {
			$.ajax({
					url:'catalogos/pagos/ObtenerTipodepagos.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					dataType:'json',
					async:false,
					error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $('#abc').html('<div class="alert_error">'+error+'</div>');	
						  //aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
					  },
					success:function(msj){

							if (msj.respuesta.length>0) {
								PintarTipoPagos(msj.respuesta);
							}
								
					  	}
				  });
}

function PintarTipoPagos(respuesta) {
	var html="";
	if (respuesta.length>0) {
		html+=`<option value="0">SELECCIONAR TIPO DE PAGO</option>`;
		for (var i = 0; i <respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].idtipodepago+`">`+respuesta[i].tipo+`</option>`;
		}
	}
	$("#tipopago").html(html);
}


function ValidacionMonto() {
	$("#btnpagarresumen").attr('disabled',true);
	var valor= $("#montovisual").val();
	
	if (valor>=total) {

	$("#btnpagarresumen").attr('disabled',false);
	var cambio=parseFloat(total)-parseFloat(valor);
	$("#cambio").text(formato_numero(Math.abs(cambio),2,'.',','));
	cambiomonto=cambio;
	}else{
	$("#btnpagarresumen").attr('disabled',true);
	
	}
}
function HabilitarBotonPagar() {
   var seleccion=0;
      $(".opccard").each(function( index ) {
        if ($(this).is(':checked')) {
        seleccion=1; 
        }
      });
      $("#btnpagarresumen").prop('disabled',true);
      if (seleccion==1) {
          $("#btnpagarresumen").prop('disabled',false);
      }
}

function Atras() {
  $("#divagregartarjeta").css('display','none');
  $("#divlistadotarjetas").css('visibility','visible');
  $("#divlistadotarjetas").css('display','block');

}




function AbrirModalDetalle(idnotapago,idusuario) {
	$("#modaldetallenota").modal();
	ObtenerDetalleNota(idnotapago,idusuario);
}

function ObtenerDetalleNota(idnotapago,idusuario) {
	/*var datos="idnotapago="+idnotapago+"&id_user="+idusuario;
	 var pagina = "ObtenerDetalleNota.php";
      $.ajax({
      type: 'POST',
      dataType: 'json',
      url: urlphp+pagina,
      data:datos,
      async:false,
      success: function(resp){

      	var pagos=resp.pagos;
      	var descuentos=resp.descuentos;
      	var descuentosmembresia=resp.descuentosmembresia;
      	var respuesta=resp.respuesta;
      	var usuario=resp.usuario;
      	PintardetalleNota(respuesta[0],usuario);
      	PintarPagos(pagos);

      	if (descuentos.length>0) {

      	PintarDescuentosDetalle(descuentos);

      }

      	if (descuentosmembresia.length>0) {
      	PintarDescuentosDetalleMembresia(descuentosmembresia[0]);

      }
      	
           
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                  //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                  console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
      });*/
}

/*function PintarPagos(respuesta) {
	var html="";
	var sumapagos=0;
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			html+=`<tr style="text-align: center;">

				      <td  width="40">`+respuesta[i].concepto+` </td>
				
				      <td  width="40">$<span id="monto_`+respuesta[i].idpago+`">`+respuesta[i].monto+`</span></td>
			    </tr>`;
		
			    sumapagos=parseFloat(sumapagos)+parseFloat(respuesta[i].monto);
		}


	}
	$("#subtotal").text(formato_numero(sumapagos,'2','.',','));
	$(".listadopagos").html(html);
}*/
function PintarDescuentosDetalle(respuesta) {
	var html="";
	console.log(respuesta);
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
	//$(".listadodescuentos").html(html);
}

function PintarDescuentosDetalleMembresia(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			
			html+=`<tr style="text-align: center;">
					
					<td width="10">
					<div style="width:15px;"></div>
					</td>
				      <td width="40">Descuento `+respuesta[i].titulo+`</td>
				      <td width="40">$<span id="monto_`+respuesta[i].idmembresia+`">`+formato_numero(respuesta[i].montoadescontar,2,'.',',')+`</span></td>
			    </tr>`;
		}
	}

	//$(".listadodescuentosmembresia").html(html);
}

function PintardetalleNota(respuesta,usuario) {
estatus=['PENDIENTE','ACEPTADO','CANCELADO'];

	$("#folio").text(respuesta.folio);
	$("#fechapago").text(respuesta.fecha);
	var nombreusuario=usuario.nombre+" "+usuario.paterno+" "+usuario.materno;
	$("#alumno").text(nombreusuario);
	$("#tipopago").text(respuesta.tipopago);

	$("#estatus").text(estatus[respuesta.estatus]);



	//$("#btnState_1").attr('onchange','CambiarEstatusNota('+respuesta.idnotapago+')');
	var html="";

	html+=`
	<div class="row">
	<div class="col-md-6" style=""></div>
	<div class="col-md-3" style="
    margin: 0;
    padding: 0;">
		<div class="">
			<div class="col-md-12">
				<div class="card">
				<div class="card-body">
			<div class="row" style="
			    /* margin-left: 1em; */
			    ">
			    	<div class="col-md-12" style="font-size: 16px;">SUBTOTAL: </div>
			    	<div class="col-md-12" style="font-size: 16px;">MONEDERO: </div>
			
				<div class="col-md-12" style="font-size: 16px;">DESCUENTO: </div>
				<div class="col-md-12" style="font-size: 16px;">DESCUENTO MEMBRESÍA: </div>
					<div class="col-md-12 divcomision" style="font-size: 16px;">COMISIÓN: </div>

				<div class="col-md-12" style="font-size: 20px;">TOTAL:</div>

			</div>
		</div>
	</div>
	</div>
	</div>
</div>
	<div class="col-md-2" style="font-size: 16px;">

		<div class="row">
			<div class="col-md-12">
				<div class="card">
				<div class="card-body" style="    padding-left: 0;
    padding-right: 1px;">
			<div class="row">
				<div class="col-md-12" style="text-align: right;">$<span id="subtotal" style="
    font-size: 16px;"></span></div>
						<div class="col-md-12" style="text-align: right;">$<span id="monedero" style="
    font-size: 16px;">`+formato_numero(respuesta.montomonedero,2,'.',',')+`</span></div>
				
				<div class="col-md-12" style="text-align: right;">$<span id="descuento" style="
    font-size: 16px;">`+formato_numero(respuesta.descuento,2,'.',',')+`</span>
				</div>
				<div class="col-md-12" style="text-align: right;padding-top: 24px;">$<span id="descuentomembresia" style="font-size: 16px;">`+formato_numero(respuesta.descuentomembresia,2,'.',',')+`</span><br>
				</div><br>

					<div class="col-md-12 divcomision" style="text-align: right;">$<span id="comision" style=" font-size: 16px;">`+formato_numero(respuesta.comisiontotal,2,'.',',')+`</span>
				</div>
				<div class="col-md-12" style="text-align: right;font-size: 20px;/* padding-top: 6px; */">$<span id="total">`+formato_numero(respuesta.total,2,'.',',')+`</span></div></div>

			</div>
		</div>
	</div>
	</div>

		</div>


	</div>
				<div class="col-md-2" style="font-size: 16px;">


	`;

	$(".modaldetalle").html(html);


	if (respuesta.estatus==1) {
		 $('.btnState_1').prop('checked', true).trigger('change');

	}
	if (respuesta.estatus==0) {

		 $('.btnState_1').prop('checked', false).trigger('change');
	
	}
	$("#btnState_1").attr('onchange','CambiarEstatusNota('+respuesta.idnotapago+','+usuario.idusuarios+')');
	
}

function HabilitarOpcion(opcion) {
	$(".opciones").prop('checked',false);
	$("#opcion_"+opcion).prop('checked',true);
	$("#listado").html();
	$("#servicioslistado").css('display','none');
	$("#membresiaslistado").css('display','none');
	$("#divservicios").css('display','none');
	$("#divmembresia").css('display','none');
	$("#servicioslistado").val(0);
	$("#membresiaslistado").val(0);
	if (opcion==1) {
		$("#listado").css('display','block');
		$("#divservicios").css('display','block');
		ObtenerServiciosListado();
		$("#servicioslistado").css('display','block');


	}
	if (opcion==2) {
		$("#listado").css('display','block');
		$("#divmembresia").css('display','block');
		ObtenerMembresiaListado();
		$("#membresiaslistado").css('display','block');
	}
	if (opcion==3) {

	}


}

function ObtenerServiciosListado() {
      $.ajax({
      type: 'POST',
      dataType: 'json',
	  url:'catalogos/pagos/ObtenerServiciosListado.php', //Url a donde la enviaremos
      async:false,
      success: function(resp){

	var respuesta=resp.respuesta;

      	if (respuesta.length>0) {
      		PintarListadoServicio(respuesta);
      	}
      	
           
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                  //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                  console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
      });
}

function PintarListadoServicio(respuesta) {
	if (respuesta.length>0) {
		var html="";
		for (var i = 0; i <respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].idservicio+`">`+respuesta[i].titulo+`</option>`;
			
		}

		$("#servicioslistado").html(html);
	}
}
function ObtenerMembresiaListado() {
      $.ajax({
      type: 'POST',
      dataType: 'json',
	  url:'catalogos/pagos/ObtenerMembresiaListado.php', //Url a donde la enviaremos
      async:false,
      success: function(resp){


      	var respuesta=resp.respuesta;

      	if (respuesta.length>0) {
      		PintarListadoMembresia(respuesta);
      	}
           
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                  //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                  console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
      });
}

function PintarListadoMembresia(respuesta) {
	if (respuesta.length>0) {
		var html="";
		for (var i = 0; i <respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].idmembresia+`">`+respuesta[i].titulo+`</option>`;
			
		}

		$("#membresiaslistado").html(html);
	}
}

var idmenumodu=0;
function VerdatelleNota(idnotapago,idusuario,idmenumodulo) {
	var datos="idnotapago="+idnotapago+"&idusuario="+idusuario+"&idmenumodulo="+idmenumodulo;

	idmenumodu=idmenumodulo;
	  $.ajax({
      type: 'POST',
      data:datos,
	  url:'catalogos/pagos/detallenota.php', //Url a donde la enviaremos
      async:false,
      success: function(resp){
      
	  $("#main").html(resp);
          
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                  //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                  console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
      });
}

function CambiarEstatusNota(idnotapago,idusuario) {
estatus=['PENDIENTE','ACEPTADO','CANCELADO'];

	var estado=0;
	if ($("#btnState_1").is(':checked')) {
		estado=1;
	}



	$("#modalconfirmacion").modal();

	var html="";
		html+=`
		<div class="row">
			<div class="col-md-12">
				¿Seguro que desea cambiar el estado de la nota a `+estatus[estado]+` ?
			</div>
		</div>

		`;
		$("#divconfirmacion").html(html);
		$("#btnaceptar").attr('onclick','AceptarCambiarEstatus('+idnotapago+','+idusuario+')');
		$("#btncerrar").attr('onclick','CerrarModalConfirm('+idnotapago+','+estado+')');

}

function AceptarCambiarEstatus(idnotapago,idusuario) {

	var datos="idnotapago="+idnotapago;
	var estado=0;
	if ($("#btnState_1").is(':checked')) {
		estado=1;
	}


	  var datos="idnotapago="+idnotapago+"&estado="+estado;
      $.ajax({
      type: 'POST',
      data:datos,
	  url:'catalogos/pagos/Cambiarestatus.php', //Url a donde la enviaremos
      async:false,
      success: function(resp){
      	 $("#modalconfirmacion").modal('hide');

      	VerdatelleNota(idnotapago,idusuario,idmenumodu);
        
      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                  //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                  console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
      });

  





}

function CerrarModalConfirm(idnotapago,estatus) {
		$("#modalconfirmacion").modal('hide');
		if (estatus==1) {
			estatus=0;
		}else{
			estatus=1;
		}

		if (estatus==1) {

			$("#btnState_1").prop('checked',true);
		}else{
			$("#btnState_1").prop('checked',false);
		
		}

}
