function Guardardescuento(form,regresar,donde,idmenumodulo)
{
	if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
	{			
		//recibimos todos los datos..
		//var datos = ObtenerDatosFormulario(form);
		
		var id=$("#id").val();
		var v_titulo=$("#v_titulo").val();
		var v_estatus=$("#v_estatus").val();
		var v_tipo=$("#v_tipo").val();
		var v_descuento=$("#v_descuento").val();
		var v_vigencia=0;


		
/*		$("#v_vigencia").is('checked')?1:0;
*/		

		var periodoinicial=[];
		var periodofinal=[];
		$(".from").each(function(){
			var valor=$(this).val();
			periodoinicial.push(valor);
			
		});

		$(".to").each(function(){
			var valor=$(this).val();
			periodofinal.push(valor);
		 });

		var bandera=1;

		for (var i = 0; i < periodoinicial.length; i++) {
			if (isValidDate(periodoinicial[i])==false) {
			bandera=0;
	    	$("#lblperiodos").css('color','red');

			}
		}

		for (var i = 0; i < periodofinal.length; i++) {
			if (isValidDate(periodofinal[i]) == false) {
			bandera=0;
	    	$("#lblperiodos").css('color','red');

			}
		}

		var titulo=$("#v_titulo").val();
		var monto=$("#v_descuento").val();

		var txtnumeroservicio=$("#txtnumeroservicio").val();

		if (titulo=='') {
			bandera=0;
		}

		
		var porcantidadservicio=$("#porcantidadservicio").is(':checked')?1:0;
		var portiposervicio=$("#portiposervicio").is(':checked')?1:0;
		var porservicio=$("#porservicio").is(':checked')?1:0;
		var porparentesco=$("#porparentesco").is(':checked')?1:0;
		var porniveljerarquico=$("#porniveljerarquico").is(':checked')?1:0;
		var txtdirigido=$("#txtdirigido").val();
		var v_convigencia=$("#v_convigencia").is(':checked')?1:0;
		var porclientedirecto=$("#porclientedirecto").is(':checked')?1:0;
		var todosclientes=$("#v_tclientes").is(':checked')?1:0;
		var caracteristicasdelasociador=$("#caracteristicasdelasociador").is(':checked')?1:0;
		var portiposervicio2=$("#portiposervicio2").is(':checked')?1:0;
		var porservicio2=$("#porservicio2").is(':checked')?1:0;

		if (v_convigencia==1) {

			v_vigencia=$("input[name=v_vigencia]:checked").val();

		}
		var porhorarioservicio=$("#chekhorarioservicios").is(':checked')?1:0;
		var cantidadhorariosservicios=$("#cantidadhorariosservicios").val();
		var cantidaddias=$("#cantidaddias").val();
		var objetomultiparentesco=[];
		var objetomultiprecios=[];
		$(".multipleparentesco").each(function(){
			var valor=$(this).attr('id');
			var dividir=valor.split('_');

			var rangoinicial=$("#txtrangoinicial_"+dividir[1]).val();
			var rangofinal=$("#txtrangofinal_"+dividir[1]).val();

			var idparentesco=$("#opciones_"+dividir[1]).val();
			var textoparentesco=$( "#opciones_"+dividir[1]+" option:selected" ).text();
			var tipodes=$("#tipo_"+dividir[1]).val();
			var txtcantidaddescuento=$("#txtcantidaddescuento_"+dividir[1]).val();

			var objeto={
				rangoinicial:rangoinicial,
				rangofinal:rangofinal,
				idparentesco:idparentesco,
				textoparentesco:textoparentesco,
				tipodes:tipodes,
				txtcantidaddescuento:txtcantidaddescuento
			};
			objetomultiparentesco.push(objeto);

		 });
		$(".multipleprecios").each(function(){
				var valor=$(this).attr('id');
			var dividir=valor.split('_')[1];
			var cantidad=$("#txtopcion_"+dividir).val();
			var txtcantidaddesc=$("#txtcantidaddesc_"+dividir).val();
			var tipodescuento=$("#tipodescuento_"+dividir).val();
			var objeto={
				cantidad:cantidad,
				txtcantidaddesc:txtcantidaddesc,
				tipodescuento:tipodescuento

			};

			objetomultiprecios.push(objeto);
		});
		var tiposervicio=[];
		var servicios=[];
		$(".chktiposervicio_").each(function(){

			if($(this).is(':checked')) {

				var valor=$(this).attr('id').split('_')[1];
				tiposervicio.push(valor);

				}

			});
		
			$(".chkservicio_").each(function(){

			if($(this).is(':checked')) {
				var valor=$(this).attr('id').split('_')[1];
				servicios.push(valor);

				}
			});



		var tiposervicio2=[];
		var servicios2=[];
		$(".chktiposervicio2_").each(function(){

			if($(this).is(':checked')) {

				var valor=$(this).attr('id').split('_')[1];
				tiposervicio2.push(valor);

				}

			});
		
			$(".chkservicio2_").each(function(){

			if($(this).is(':checked')) {
				var valor=$(this).attr('id').split('_')[1];
				servicios2.push(valor);

				}
			});

			var clientesdirectos=[];
			if (todosclientes==0) {

				$(".chkcliente_").each(function(){
					console.log($(this));
				if($(this).is(':checked')) {
					var valor=$(this).attr('id').split('_')[1];
					clientesdirectos.push(valor);

					}

				});
			}
		
		var v_acumulardescuento=$("#v_acumulardescuento").is(':checked')?1:0;
		var inppadre=$("#inppadre").is(':checked')?1:0;
		var inphijo=$("#inphijo").is(':checked')?1:0;
		var inpnieto=$("#inpnieto").is(':checked')?1:0;
		var modalidaddescuento=$("#modalidaddescuento").val();
		var txtdiascaducidad=$("#txtdiascaducidad").val();
		var porclientenoasociado=$("#porclientenoasociado").is(':checked')?1:0;
		/*var modalidaddescuento=$("#modalidaddescuento").val();
		var txtdiascaducidad=$("#txtdiascaducidad").val();
		var porclientenoasociado=$("#porclientenoasociado").is(':checked')?1:0;
		*/
		var datos="id="+id+"&v_titulo="+v_titulo+"&v_estatus="+v_estatus+"&v_tipo="+v_tipo+"&v_descuento="+v_descuento;
		datos+="&v_vigencia="+v_vigencia+"&v_periodoinicial="+periodoinicial+"&v_periodofinal="+periodofinal+"&txtnumeroservicio="+txtnumeroservicio+"&portiposervicio="+portiposervicio+"&tiposervicio="+tiposervicio+"&porservicio="+porservicio+"&servicios="+servicios+"&objetomultiparentesco="+JSON.stringify(objetomultiparentesco)+"&porniveljerarquico="+porniveljerarquico+"&inppadre="+inppadre+"&inphijo="+inphijo+"&inpnieto="+inpnieto+"&modalidaddescuento="+modalidaddescuento+"&txtdiascaducidad="+txtdiascaducidad+"&porclientenoasociado="+porclientenoasociado+"&objetomultiprecios="+JSON.stringify(objetomultiprecios)+"&txtdirigido="+txtdirigido+"&v_convigencia="+v_convigencia+"&v_acumulardescuento="+v_acumulardescuento;
		datos+="&porhorarioservicio="+porhorarioservicio+"&cantidadhorariosservicios="+cantidadhorariosservicios+"&cantidaddias="+cantidaddias+"&porcantidadservicio="+porcantidadservicio;
		datos+="&porparentesco="+porparentesco+"&porclientedirecto="+porclientedirecto+"&todosclientes="+todosclientes+"&clientesdirectos="+clientesdirectos+"&tiposervicio2="+tiposervicio2+"&servicios2="+servicios2+"&caracteristicasdelasociador="+caracteristicasdelasociador+"&portiposervicio2="+portiposervicio2+"&porservicio2="+porservicio2;
			
			if (bandera==1) {
				// $('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Procesando...</div>')
	
		//setTimeout(function(){
				  $.ajax({
					url:'catalogos/descuentos/ga_descuento.php', //Url a donde la enviaremos
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
				//},1000);

		}else{



	 }
	}
}


function BorrarDescuento(iddescuento,campo,tabla,valor,regresar,donde,idmenumodulo) {
	if(confirm("\u00BFEstas seguro de querer realizar esta operaci\u00f3n?"))
	{
var datos='iddescuento='+iddescuento;
	$.ajax({
		url:'catalogos/descuentos/borrarDescuento.php', //Url a donde la enviaremos
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
		  var resp = msj;
		  
			 console.log("El resultado de msj es: "+msj);
			   if( resp == 0 ){
				  aparecermodulos(regresar+"?ac=1&idmenumodulo="+idmenumodulo+"&msj=Operacion realizada con exito",donde);
				}else{
				  aparecermodulos(regresar+"?ac=0&idmenumodulo="+idmenumodulo+"&msj=El descuento se encuentra relacionado con al menos un servicio "+msj,donde);
				}			
			}
	});
}
}
function Activarvigencia() {
		

	if($("#v_vigencia").is(':checked')){
		
		$(".divvigencia").css('display','block');
		$(".divdias").css('display','none');

	}else{
		$(".divvigencia").css('display','none');
		$(".divdias").css('display','block');
	}
}


function ObtenerPeriodosDescuento(iddescuento) {
		var datos="iddescuento="+iddescuento;
			$.ajax({
					url: 'catalogos/descuentos/ObtenerPeriodos.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					data:datos,
					dataType:'json',

					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {
						var respuesta=msj.respuesta;
					PintarPeriodosDescuento(respuesta);

					}
				});
}

function PintarPeriodosDescuento(respuesta) {
	
		contadorperiodos=parseFloat($(".periodosservicios").length)+1;

		tabindex=parseFloat(6)+parseFloat(contadorperiodos);

		for (var i = 0; i < respuesta.length; i++) {
		
		

	var html=`
					<div class="row periodosservicios" id="contador_`+contadorperiodos+`">
										<div class="col-md-3">
										<label for="from">Fecha inicial</label>
											<input type="date" id="fechainicial_`+contadorperiodos+`" class="form-control from" value="`+respuesta[i].fechainicial+`" name="from">

									</div>

									<div class="col-md-3">

										<label for="to">Fecha final</label>
										<input type="date" id="fechafinal_`+contadorperiodos+`" class="form-control to" name="to" value="`+respuesta[i].fechafinal+`" >

									</div>

									<div class="col-md-3">
										<button type="button"  style="margin-top: 2em;" onclick="EliminarPeriodoDescuento(`+contadorperiodos+`)" class="btn btn_rojo"><i class="mdi mdi-delete-empty"></i></button>


									</div>

								</div>
							
							<div class="row diasperiodo" id="diasperiodo_`+contadorperiodos+`">
								<div class="col-md-12" id="dias_`+contadorperiodos+`">

								</div>

							</div>

					</div>
					

	`;


	$("#periodos").append(html)

	}
}

function EliminarPeriodoDescuento(contadorperiodos) {
		$("#contador_"+contadorperiodos).remove();

}

function AgregarMultiplesParentesco2(rangoinicial,rangofinal,idparentesco,tipodescuento,cantidad) {
	
	contadormultipleparentesco=parseFloat($(".multipleparentesco").length)+1;

		tabindex=parseFloat(6)+parseFloat(contadormultipleparentesco);
	Obtenerparentescomultiple(contadormultipleparentesco).then(r => {



	var html=`
			<div class="row multipleparentesco" id="contadorpe_`+contadormultipleparentesco+`" style=" background: #dee1e4;border-radius: 10px;padding: 1em;margin-bottom:1em;">
										<div class="col-md-2">
										<label for="from">RANGO INICIAL</label>
											<input type="text" id="txtrangoinicial_`+contadormultipleparentesco+`" class="form-control rangoinicial" name="rangoinicial">

										</div>

										<div class="col-md-2">
										<label for="from">RANGO FINAL</label>
											<input type="text" id="txtrangofinal_`+contadormultipleparentesco+`" class="form-control rangofinal" name="rangofinal">

										</div>
										<div class="col-md-2">
											<label>PARENTESCO</label>
											<select name=""  class="form-control opciones" id="opciones_`+contadormultipleparentesco+`" style="padding-top:1em;" class="form-control">`;
											html+=`<option value="0">Todos</option>`;

											for (var i = 0; i <r.length; i++) {
											html+=`<option value="`+r[i].idparentesco+`">`+r[i].parentesco+`</option>`;
															
											}

											html+=` </select> 

											

										</div>

										<div class="col-md-2">
											<label>DESCUENTO</label>
											<select name=""  class="form-control tipo" id="tipo_`+contadormultipleparentesco+`" style="padding-top:1em;" class="form-control">
											<option value="0">PORCENTAJE</option>
											<option value="1">MONTO</option>
											</select> 

										</div>

										<div class="col-md-2">
										<label for="from">CANTIDAD</label>
											<input type="text" id="txtcantidaddescuento_`+contadormultipleparentesco+`" class="form-control monto" name="monto">

										</div>


									<div class="col-md-1" style="text-align:right;">
										<button type="button"  style="margin-top: 2em;" onclick="EliminarParentesco(`+contadormultipleparentesco+`)" class="btn btn_rojo"><i class="mdi mdi-delete-empty"></i></button>


									</div>
										</div>

									</div>

						
								</div>
							

					</div>
					

	`;

		$("#multipleparentesco").append(html);
		$("#txtrangoinicial_"+contadormultipleparentesco).val(rangoinicial);
		$("#txtrangofinal_"+contadormultipleparentesco).val(rangofinal);
		$("#opciones_"+contadormultipleparentesco).val(idparentesco);
		$("#tipo_"+contadormultipleparentesco).val(tipodescuento);
		$("#txtcantidaddescuento_"+contadormultipleparentesco).val(cantidad);

		//Obtenerparentescomultiple(contadormultipleparentesco);
		});
}


function AgregarMultiplesParentesco() {
	
	contadormultipleparentesco=parseFloat($(".multipleparentesco").length)+1;

		tabindex=parseFloat(6)+parseFloat(contadormultipleparentesco);

	Obtenerparentescomultiple(contadormultipleparentesco).then(r => {


	var html=`
			<div class="row multipleparentesco" id="contadorpe_`+contadormultipleparentesco+`" style=" background: #dee1e4;border-radius: 10px;padding: 1em;margin-bottom:1em;">
										<div class="col-md-2">
											<label for="from">RANGO INICIAL</label>
											<input type="text" id="txtrangoinicial_`+contadormultipleparentesco+`" class="form-control rangoinicial" name="rangoinicial">

										</div>
										<div class="col-md-2">
											<label for="from">RANGO FINAL</label>
											<input type="text" id="txtrangofinal_`+contadormultipleparentesco+`" class="form-control rangofinal" name="rangofinal">

										</div>

										<div class="col-md-2">
											<label>PARENTESCO</label>
											<select name=""  class="form-control opciones" id="opciones_`+contadormultipleparentesco+`" style="padding-top:1em;" class="form-control">`;
											html+=`<option value="0">Todos</option>`;

											for (var i = 0; i <r.length; i++) {
											html+=`<option value="`+r[i].idparentesco+`">`+r[i].parentesco+`</option>`;
															
											}

											html+=` </select> 

										</div>

										<div class="col-md-2">
											<label>DESCUENTO</label>
											<select name=""  class="form-control tipo" id="tipo_`+contadormultipleparentesco+`" style="padding-top:1em;" class="form-control">
											<option value="0">PORCENTAJE</option>
											<option value="1">MONTO</option>
											</select> 

										</div>

										<div class="col-md-2">
										<label for="from">CANTIDAD</label>
											<input type="text" id="txtcantidaddescuento_`+contadormultipleparentesco+`" class="form-control monto" name="monto">

										</div>


									<div class="col-md-1" style="text-align:right;">
										<button type="button"  style="margin-top: 2em;" onclick="EliminarParentesco(`+contadormultipleparentesco+`)" class="btn btn_rojo"><i class="mdi mdi-delete-empty"></i></button>


									</div>
										</div>

									</div>

						
								</div>
							

					</div>
					

	`;


	$("#multipleparentesco").append(html);
	});
		//Obtenerparentescomultiple(contadormultipleparentesco);
		
}
function EliminarParentesco(contador) {
	
		$("#contadorpe_"+contador).remove();


}


function Obtenerparentescomultiple(contador) {

	 return new Promise((resolve, reject) => {

			$.ajax({
					url: 'catalogos/descuentos/ObtenerParentescos.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					dataType:'json',

					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {
						var respuesta=msj.respuesta;
						resolve(respuesta);
					//PintarParentescosDes(respuesta,contador);

					}
				});
		});
}

function PintarParentescosDes(respuesta,contador) {
	var html="";
			if (respuesta.length>0) {
											html+=`<option value="0">Todos</option>`;

					for (var i = 0; i <respuesta.length; i++) {
							html+=`<option value="`+respuesta[i].idparentesco+`">`+respuesta[i].parentesco+`</option>`;
					
					}
			
			} 

			$("#opciones_"+contador).html(html);
}

function AgregarMultiplesPrecios(cantidad,tipodes,monto) {
	
	contadorprecios=parseFloat($(".multipleprecios").length)+1;

		tabindex=parseFloat(6)+parseFloat(contadorprecios);


	var html=`
			<div class="row multipleprecios" id="contadorpre_`+contadorprecios+`" style=" background: #dee1e4;border-radius: 10px;padding: 1em;margin-bottom:1em;">
										<div class="col-md-3">
										<label for="from">CANT. DE PERSONAS</label>
											<input type="text" id="txtopcion_`+contadorprecios+`" class="form-control pregunta" name="pregunta">

										</div>
				
									
										<div class="col-md-2">
											<label>DESCUENTO</label>
											<select name=""  class="form-control tipo" id="tipodescuento_`+contadorprecios+`" style="padding-top:1em;" class="form-control">
											<option value="0">PORCENTAJE</option>
											<option value="1">MONTO</option>
											</select> 

										</div>

										<div class="col-md-3">
										<label for="from">MONTO</label>
											<input type="number" id="txtcantidaddesc_`+contadorprecios+`" class="form-control monto" name="monto">

										</div>


									<div class="col-md-1" style="text-align:right;">
										<button type="button"  style="margin-top: 2em;" onclick="EliminarOpcion(`+contadorprecios+`)" class="btn btn_rojo"><i class="mdi mdi-delete-empty"></i></button>


									</div>
										</div>

									</div>

						
								</div>
							

					</div>
					

	`;


	$("#multipleprecios").append(html);

	if (cantidad) {

		$("#txtopcion_"+contadorprecios).val(cantidad);
		$("#tipodescuento_"+contadorprecios).val(tipodes);
		$("#txtcantidaddesc_"+contadorprecios).val(monto);
	}


		

}

function EliminarOpcion(contador) {
	$("#contadorpre_"+contador).remove();
}

function HabilitarOpcionesHorarios() {
	if ($("#chekhorarioservicios").is(':checked')) {
		$("#divhorariosservicios").css('display','block');

	}else{

	    $("#divhorariosservicios").css('display','none');

	}
}

function HabilitarCantidadServicios(argument) {
	if ($("#porcantidadservicio").is(':checked')) {
		$(".divcantidadservicios").css('display','block');
	}else{
		$(".divcantidadservicios").css('display','none');

	}
}

function HabilitarPorTipoServicio() {
	if ($("#portiposervicio").is(':checked')) {
		$(".divtiposervicio").css('display','block');
	}else{
		$(".divtiposervicio").css('display','none');

	}
}


function HabilitarPorTipoServicio2() {
	if ($("#portiposervicio2").is(':checked')) {
		$(".divtiposervicio2").css('display','block');
	}else{
		$(".divtiposervicio2").css('display','none');

	}
}

function HabilitarPorservicio() {
	if ($("#porservicio").is(':checked')) {
		$(".divservicio").css('display','block');

		//ObtenerServiciosTipo();
	}else{
		$(".divservicio").css('display','none');

	}
}

function HabilitarPorservicio2() {
	if ($("#porservicio2").is(':checked')) {
		$(".divservicio2").css('display','block');

		//ObtenerServiciosTipo();
	}else{
		$(".divservicio2").css('display','none');

	}
}

function ObtenerServiciosTipo() {

	    var tiposervicio=[];
	
		$(".chktiposervicio_").each(function(){
			if($(this).is(':checked')) {
				var valor=$(this).attr('id').split('_')[1];
				tiposervicio.push(valor);
				}

			});

		var datos="tiposervicio="+tiposervicio;
			$.ajax({
				url: 'catalogos/descuentos/ObtenerServiciosTipo.php', //Url a donde la enviaremos
				type: 'POST', //Metodo que usaremos
				dataType:'json',
				data:datos,
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {
					
					var respuesta=msj.serviciosdecategorias;
					

					}
			});
}

function HabilitarParentescos(argument) {
	if ($("#porparentesco").is(':checked')) {

		$(".divparentescos").css('display','block');
		$("#multipleparentesco").html('');
		$("#porniveljerarquico").prop('checked',false);
		$("#porclientenoasociado").prop('checked',false);
		$(".divniveljerarquico").css('display','none');
		$(".divmultiplesdes").css('display','none');
		$("#divtipodescuentoglobal").css('display','none');
	    $("#divdescuentoglobal").css('display','none');
	    $("#porclientedirecto").prop('checked',false);
	    $("#lclientesdiv").css('display','none');
	    HabilitarDeshabilitarCheck();
	}else{
		$(".divparentescos").css('display','none');

	}
}


function Habilitarniveljerarquico(argument) {
	if ($("#porniveljerarquico").is(':checked')) {
		$(".divniveljerarquico").css('display','block');
		$("#porparentesco").prop('checked',false);
		$("#porclientenoasociado").prop('checked',false);
		$(".divparentescos").css('display','none');
		$("#divtipodescuentoglobal").css('display','block');
	    $("#divdescuentoglobal").css('display','block');
	    $("#porclientedirecto").prop('checked',false);
	   	$("#lclientesdiv").css('display','none');
	   	HabilitarDeshabilitarCheck();
	}else{
		$(".divniveljerarquico").css('display','none');
	
	}
}

function HabilitarClientenoasociado() {
	if ($("#porclientenoasociado").is(':checked')) {
		$(".divmultiplesdes").css('display','block');
		$("#multipleprecios").html('');
		$("#inppadre").prop('checked',false);
		$("#inphijo").prop('checked',false);
		$("#inpnieto").prop('checked',false);
		$("#multipleparentesco").html('');
		$("#porniveljerarquico").prop('checked',false);
		$("#porparentesco").prop('checked',false)
		$("#divparentescos").css('display','none');
		$(".divniveljerarquico").css('display','none');
		$(".divparentescos").css('display','none');

		$("#divtipodescuentoglobal").css('display','none');
	    $("#divdescuentoglobal").css('display','none');
	    $("#porclientedirecto").prop('checked',false);
		$("#lclientesdiv").css('display','none');
		HabilitarDeshabilitarCheck();
	}else{
		$(".divmultiplesdes").css('display','none');
		$("#porniveljerarquico").attr('disabled',false);
		
	}
}


function Habilitarporclientedirecto() {
	if ($("#porclientedirecto").is(':checked')) {

		$(".divmultiplesdes").css('display','none');
		$("#multipleprecios").html('');
		$("#inppadre").prop('checked',false);
		$("#inphijo").prop('checked',false);
		$("#inpnieto").prop('checked',false);
		$("#multipleparentesco").html('');
		$("#porniveljerarquico").prop('checked',false);
		$("#porparentesco").prop('checked',false)
		$("#divparentescos").css('display','none');
		$(".divniveljerarquico").css('display','none');
		$(".divparentescos").css('display','none');
		$("#porclientenoasociado").prop('checked',false);
		
		$("#lclientesdiv").css('display','block');
		$("#divtipodescuentoglobal").css('display','block');
	    $("#divdescuentoglobal").css('display','block');

	}else{

		
		$("#divtipodescuentoglobal").css('display','none');
	    $("#divdescuentoglobal").css('display','none');
		$("#lclientesdiv").css('display','none');
		HabilitarDeshabilitarCheck();
	}
}
function DesplegarconVigencia() {
	if ($("#v_convigencia").is(':checked')) {
		$("#opciones").css('display','block');

	}else{
		$("#opciones").css('display','none');
		$("#v_vigencia").attr('checked',false);
		$("#v_vigencia2").attr('checked',false);
	}
}

function ObtenerTipoServicioDescuento(iddescuento) {
	var datos="iddescuento="+iddescuento;
			$.ajax({
				url: 'catalogos/descuentos/ObtenerTipoDescuento.php', //Url a donde la enviaremos
				type: 'POST', //Metodo que usaremos
				dataType:'json',
				data:datos,
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {
					
					var respuesta=msj.respuesta;
					PintarTipoDescuento(respuesta);

					}
			});
}

function PintarTipoDescuento(respuesta) {
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			$("#inputtiposervicio_"+respuesta[i].idcategorias).prop('checked',true);
		}
	}
}

function ObtenerServiciosDescuento(iddescuento) {
	var datos="iddescuento="+iddescuento;
			$.ajax({
				url: 'catalogos/descuentos/ObtenerServiciosDescuento.php', //Url a donde la enviaremos
				type: 'POST', //Metodo que usaremos
				dataType:'json',
				data:datos,
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {
					
					var respuesta=msj.respuesta;
					PintarServicioDescuento(respuesta);

					}
			});
}

function PintarServicioDescuento(respuesta) {

	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			$("#inputserv_"+respuesta[i].idservicio).prop('checked',true);
		}
	}
}

function ObtenerMultipleParentesco(iddescuento) {
	var datos="iddescuento="+iddescuento;
			$.ajax({
				url: 'catalogos/descuentos/ObtenerMultipleParentesco.php', //Url a donde la enviaremos
				type: 'POST', //Metodo que usaremos
				dataType:'json',
				data:datos,
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {
					
					var respuesta=msj.respuesta;
					PintarMultipleParentesco(respuesta);

					}
			});
		}

function PintarMultipleParentesco(respuesta) {
	
	if (respuesta.length>0) {
		for (var i =0; i <respuesta.length; i++) {
			AgregarMultiplesParentesco2(respuesta[i].rangoinicial,respuesta[i].rangofinal,respuesta[i].idparentesco,respuesta[i].tipodes,respuesta[i].txtcantidaddescuento);

		}
	}
}


function ObtenerClientesnoasociado() {
	var datos="iddescuento="+iddescuento;
			$.ajax({
				url: 'catalogos/descuentos/ObtenerMultipleClienteNoasociado.php', //Url a donde la enviaremos
				type: 'POST', //Metodo que usaremos
				dataType:'json',
				data:datos,
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {
					
					var respuesta=msj.respuesta;
					PintarMultinoasociados(respuesta);

					}
			});
}
function PintarMultinoasociados(respuesta) {
	if (respuesta.length>0) {
		for (var i =0; i <respuesta.length; i++) {
			AgregarMultiplesPrecios(respuesta[i].cantidad,respuesta[i].tipodescuento,respuesta[i].txtcantidaddesc);
		}
	}
}


function HabilitarDeshabilitarCheck() {
	if($("#v_tclientes").is(':checked'))
	{
		$(".chkcliente_").each(function(index) {
		   $(this).prop('checked',true);
		});
		
	}else{
		$(".chkcliente_").each(function(index) {
		   $(this).prop('checked',false);
		});
	}
}
function ValidaChecked(idcliente) {

	if($("#inputcli_"+idcliente+"_").is(':checked')){

	}else{

		$("#v_tclientes").prop('checked',false);
	}
}

function ObtenerClientesAsignados(iddescuento) {
	var datos="iddescuento="+iddescuento;
			$.ajax({
				url: 'catalogos/descuentos/ObtenerAsignacionesClientes.php', //Url a donde la enviaremos
				type: 'POST', //Metodo que usaremos
				dataType:'json',
				data:datos,
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {
					
					var respuesta=msj.respuesta;
					if (respuesta.length>0) {
						for (var i = 0; i < respuesta.length; i++) {
							$("#inputcli_"+respuesta[i].idusuarios+"_").prop('checked',true);
						}
					}

					}
			});
}

function HabilitarAsociador() {
	
	if ($("#caracteristicasdelasociador").is(':checked')) {
		$(".caracteristicas").css('display','block');
	}else{
		$(".caracteristicas").css('display','none');
	
	}
}


function ObtenerCaracteriscasTiposervicioAsociador(iddescuento) {
 	var datos="iddescuento="+iddescuento;
			$.ajax({
				url: 'catalogos/descuentos/ObtenerCaracteriscasTiposervicioAsociador.php', //Url a donde la enviaremos
				type: 'POST', //Metodo que usaremos
				dataType:'json',
				data:datos,
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {
					
					var respuesta=msj.respuesta;
					if (respuesta.length>0) {
						for (var i = 0; i < respuesta.length; i++) {
							$("#inputtiposervicio1_"+respuesta[i].idcategorias).prop('checked',true);
						}
					}

					}
			});
 } 
 function ObtenerCaracteristicasServicioAsociador(iddescuento) {
 	var datos="iddescuento="+iddescuento;
			$.ajax({
				url: 'catalogos/descuentos/ObtenerCaracteristicasServicioAsociador.php', //Url a donde la enviaremos
				type: 'POST', //Metodo que usaremos
				dataType:'json',
				data:datos,
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {
					
					var respuesta=msj.respuesta;
					if (respuesta.length>0) {
						for (var i = 0; i < respuesta.length; i++) {
							$("#inputserv2_"+respuesta[i].idservicio).prop('checked',true);
							}
						}

					}
			});
 }

