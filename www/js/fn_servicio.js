var cantidadparticipantes=0;
var arraydiaselegidos=[];
var arraydiaseleccionados=[];

function Guardarservicio(form,regresar,donde,idmenumodulo)
{
	if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
	{		
		var domingo=0,lunes=0,martes=0,miercoles=0,jueves=0,Viernes=0,sabado=0;
		if($("#Domingo").is(':checked')){

		 domingo=1;
		}
		 if($("#Lunes").is(':checked')){

		 lunes=1;
		}
		 if($("#Martes").is(':checked')){

		 martes=1;
		}
		 if($("#Miercoles").is(':checked')){

		 miercoles=1;
		}
		 if($("#Jueves").is(':checked')){

		 jueves=1;
		}
		 if($("#Viernes").is(':checked')){

		 Viernes=1;
		}
		 if($("#Sabado").is(':checked')){

		 sabado=1;
		}	
		//recibimos todos los datos..
		var nombre =$("#v_titulo").val();
		var descripcion=$("#v_descripcion").val();
		var orden=$("#v_orden").val();
		var estatus=$("#v_estatus").val();
		var categoria=$("#v_categoria").val();
		var costo=$("#v_costo").val();
		var id=$("#id").val();
		var v_numparticipantes=$("#v_numparticipantes").val();
		var categoriaservicio=$("#v_categoriaservicio").val();

		

		var modalidad=0;

		if ($('input[name=v_grupo]:checked')) {
				 modalidad=$('input[name=v_grupo]:checked').val();


		}

		var modalidadpago=0;
		if ($('input[name=v_grupo2]:checked')) {
			modalidadpago=$('input[name=v_grupo2]:checked').val();

		}
		var perido=$("#v_periodo").val();


		var totalclase=$("#v_totalclase").val();
		var montopagarparticipante=$("#v_montopagarparticipante").val();
		var montopagargrupo=$("#v_montopagargrupo").val();
		var fechainicial=$("#v_fechainicial").val();
		var fechafinal=$("#v_fechafinal").val();
		var datos = new FormData();

		var archivos = document.getElementById("image"); //Damos el valor del input tipo file
		var archivo = archivos.files; //Obtenemos el valor del input (los arcchivos) en modo de arreglo

		//Como no sabemos cuantos archivos subira el usuario, iteramos la variable y al
		//objeto de FormData con el metodo "append" le pasamos calve/valor, usamos el indice "i" para
		//que no se repita, si no lo usamos solo tendra el valor de la ultima iteracion
		for (i = 0; i < archivo.length; i++) {
			datos.append('archivo' + i, archivo[i]);
		}

				var diasemana=[];

		var horainicio=[];

		var horafin=[];

		$(".diasemana").each(function(){
				var valor=$(this).val();
				diasemana.push(valor);
			});
	$(".horainiciodia").each(function(){
				var valor=$(this).val();
				horainicio.push(valor);

			});

		$(".horafindia").each(function(){
			var valor=$(this).val();
			horafin.push(valor);

		});
		var participantes=[];
		var zonas=[];
		var coachs=[];
		var periodoinicial=[];
		var periodofinal=[];
		$(".chkcliente").each(function(){
			var valor=$(this).attr('id');
			var id=valor.split('_')[1];

			if ($("#"+valor).is(':checked')) {
				participantes.push(id);
			}
		});

		$(".chkzona").each(function(){
			var valor=$(this).attr('id');
			var id=valor.split('_')[1];

			if ($("#"+valor).is(':checked')) {
				zonas.push(id);
			}
		});


		$(".chkcoach").each(function(){
			var valor=$(this).attr('id');
			var id=valor.split('_')[1];

			if ($("#"+valor).is(':checked')) {
				coachs.push(id);
			}
		});

		$(".from").each(function(){
			var valor=$(this).val();
			periodoinicial.push(valor);
			
		});
		$(".to").each(function(){
			var valor=$(this).val();
			periodofinal.push(valor);
		 });

		datos.append('zonas',zonas);
		datos.append('coachs',coachs);
		datos.append('participantes',participantes);
		datos.append('diasemana',diasemana);
		datos.append('horainiciodia',horainicio);
		datos.append('horafindia',horafin);
		datos.append('v_titulo',nombre); 
		datos.append('v_descripcion',descripcion);
		datos.append('v_orden',orden); 
		datos.append('id',id);
		datos.append('v_estatus',estatus);
		datos.append('v_categoria',categoria);

		datos.append('v_costo',costo);
		datos.append('v_totalclase',totalclase);
		datos.append('v_modalidad',modalidad);
		datos.append('v_montopagarparticipante',montopagarparticipante);
		datos.append('v_montopagargrupo',montopagargrupo);
		datos.append('v_categoriaservicio',categoriaservicio);
		datos.append('v_fechainicial',fechainicial);
		datos.append('v_fechafinal',fechafinal);
		datos.append('v_modalidadpago',modalidadpago);
		datos.append('v_perido',perido);
		datos.append('v_arraydiaselegidos',arraydiaselegidos);
		datos.append('v_periodoinicial',periodoinicial);
		datos.append('v_periodofinal',periodofinal);
		datos.append('v_lunes',lunes);
		datos.append('v_martes',martes);
		datos.append('v_miercoles',miercoles);
		datos.append('v_jueves',jueves);
		datos.append('v_viernes',Viernes);
		datos.append('v_sabado',sabado);
		datos.append('v_domingo',domingo);
		datos.append('v_numparticipantes',v_numparticipantes);


		
		 $('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Procesando...</div>')
				
		setTimeout(function(){
				  $.ajax({
					url:'catalogos/servicios/ga_servicio.php', //Url a donde la enviaremos
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

function BorrarServicio(idservicio,campo,tabla,valor,regresar,donde,idmenumodulo) {
	if(confirm("\u00BFEstas seguro de querer realizar esta operaci\u00f3n?"))
	{
var datos='idservicio='+idservicio;
	$.ajax({
		url:'catalogos/servicios/borrarServicio.php', //Url a donde la enviaremos
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
				  aparecermodulos(regresar+"?ac=0&idmenumodulo="+idmenumodulo+"&msj=La categoría se encuentra relacionada "+msj,donde);
				}			
			}
	});
}
}



function AgregarHorario(){

		contadorhorarioatencion=parseFloat($(".horariosatencion").length)+1;

		tabindex=parseFloat(6)+parseFloat(contadorhorarioatencion);


	var html=`
					<div class="row horariosatencion" id="contador`+contadorhorarioatencion+`">
										<div class="col-md-3">
									<label>DIA</label>	

									<select class="form-control diasemana" tabindex="`+tabindex+`">
										<option value="t">SELECCIONAR DIA</option>
										<option value="0">DOMINGO</option>
										<option value="1">LUNES</option>
										<option value="2">MARTES</option>
										<option value="3">MIÉRCOLES</option>
										<option value="4">JUEVES</option>
										<option value="5">VIERNES</option>
										<option value="6">SÁBADO</option>

									</select>
									</div>
									<div class="col-md-4">
									<label>HORA INICIO:</label>
										<div class="form-group mb-2" style="">
											<input type="time"  class="form-control horainiciodia" tabindex="`+(tabindex+1)+`"  >
										</div>

									</div>

								
									<div class="col-md-4">

										<label>HORA FIN:</label>
										<div class="form-group mb-2" style="">
											<input type="time"  class="form-control horafindia" tabindex="`+(tabindex+1)+`" >
										</div>
									</div>
									<div class="col-md-1">
										<button type="button"  style="margin-top: 2em;" onclick="EliminarOpcionHorario(`+contadorhorarioatencion+`)" class="btn btn_rojo"><i class="mdi mdi-delete-empty"></i></button>
									</div>
								</div>

	`;


	$("#horarios").append(html)



}

function EliminarOpcionHorario(contador) {

		$("#contador"+contador).remove();

}

/*function ObtenerHorariosSemana(idservicio) {
	var datos="idservicio="+idservicio;


		$.ajax({
					url: 'catalogos/servicios/ObtenerHorariosSemana.php', //Url a donde la enviaremos
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

						var horarios=msj.respuesta;

						if (horarios.length>0) {
							PintarHorariosSemana(horarios);
						}


					}
				});
}*/

/*function PintarHorariosSemana(horarios) {

	var html="";
	for (var i = 0; i <horarios.length; i++) {

		obtenerdiv=$("#horarios").html();



	contadorhorarioatencion=parseFloat($(".horariosatencion").length)+1;
	tabindex=parseFloat(6)+parseFloat(contadorhorarioatencion);

	var html=`
					<div class="row horariosatencion" id="contador`+contadorhorarioatencion+`">
										<div class="col-md-3">
									<label>DIA</label>	

									<select class="form-control diasemana" id="diasemana_`+contadorhorarioatencion+`" tabindex="`+tabindex+`">
										<option value="t">SELECCIONAR DIA</option>
										<option value="0">DOMINGO</option>
										<option value="1">LUNES</option>
										<option value="2">MARTES</option>
										<option value="3">MIÉRCOLES</option>
										<option value="4">JUEVES</option>
										<option value="5">VIERNES</option>
										<option value="6">SÁBADO</option>

									</select>
									</div>
									<div class="col-md-4">
									<label>HORA INICIO:</label>
										<div class="form-group mb-2" style="">
											<input type="time" id="horai_`+contadorhorarioatencion+`"  class="form-control horainiciodia" tabindex="`+(tabindex+1)+`"  >
										</div>

									</div>

								
									<div class="col-md-4">

										<label>HORA FIN:</label>
										<div class="form-group mb-2" style="">
											<input type="time" id="horaf_`+contadorhorarioatencion+`" class="form-control horafindia" tabindex="`+(tabindex+1)+`" >
										</div>
									</div>
									<div class="col-md-1">
										<button type="button"  style="margin-top: 2em;" onclick="EliminarOpcionHorario(`+contadorhorarioatencion+`)" class="btn btn_rojo"><i class="mdi mdi-delete-empty"></i></button>
									</div>
								</div>

	`;



	colocarhtml=obtenerdiv+html;


	var diasemana=horarios[i].dia;
	var horai=horarios[i].horainicial;
	var horaf=horarios[i].horafinal;


	$("#horarios").append(html)

	$("#diasemana_"+contadorhorarioatencion).val(diasemana);
	$("#horai_"+contadorhorarioatencion).val(horai);
 	$("#horaf_"+contadorhorarioatencion).val(horaf);
	
		
	}
			
}*/

function SeleccionarCategoria() {
	var categoriaid=$("#v_categoria").val();
	var datos="categoriaid="+categoriaid;

	$("#divhorarios").css('display','none');
	$("#divzonas").css('display','none');
	$("#divparticipantes").css('display','none');
	$("#divcoachs").css('display','none');
	$("#divmodalidadcobro").css('display','none');
	$("#divmodalidad").css('display','none');
	$("#totalclasesdiv").css('display','none');
	$("#preciounitariodiv").css('display','none');
	$("#montopargarparticipante").css('display','none');
	$("#montopagargrupo").css('display','none');
	$("#divmodalidadpago").css('display','none');
	$("#divcategoria").css('display','none');
	$("#divdias").css('display','none');

if (categoriaid>0) {
	$.ajax({
					url: 'catalogos/categorias/ObtenerCategoria.php', //Url a donde la enviaremos
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
						var dias=msj.horarios;
						console.log(dias);
						var horarios=msj.respuesta.horarios;
						var zonas=msj.respuesta.zonas;
						var participantes=msj.respuesta.participantes;
						 cantidadparticipantes=msj.respuesta.cantidad;
						var coachs=msj.respuesta.coachs;

						var asignarcostos=msj.respuesta.configurarcostos;
						var habilitarmodalidad=msj.respuesta.habilitarmodalidad;
						var campototalclases=msj.respuesta.campototalclases;
						var campopreciounitario=msj.respuesta.campopreciounitario;
						var campomontoporparticipante=msj.respuesta.campomontoporparticipante;
						var campomontogrupo=msj.respuesta.campomontoporgrupo;
						var habilitarmodalidadpago=msj.respuesta.habilitarmodalidadpago;
						var asignarcategoria=msj.respuesta.asignarcategoria;
						var asignardias=msj.respuesta.asignardias;

						if (horarios==1) {

							$("#divhorarios").css('display','block');
						}
						if (zonas==1) {
							$("#divzonas").css('display','block');

						}

						if (participantes==1) {
							$("#divparticipantes").css('display','block');
							$("#cantidadparticipantes").text(cantidadparticipantes);
						}

						if (coachs==1) {
							$("#divcoachs").css('display','block');

						}
						if (asignarcostos==1) {

							$("#divmodalidadcobro").css('display','block');
	
						}

						if(habilitarmodalidad ==1){
							$("#divmodalidad").css('display','block');

						}
						if(campototalclases ==1){
							$("#totalclasesdiv").css('display','block');
						}
						if(campopreciounitario ==1){
							$("#preciounitariodiv").css('display','block');
						}
						if(campomontoporparticipante == 1){
							$("#montopargarparticipante").css('display','block');
						}
						if(campomontogrupo == 1){

							$("#montopagargrupo").css('display','block');

						}
						if(habilitarmodalidadpago==1){

						$("#divmodalidadpago").css('display','block');

						}
						if (asignarcategoria==1) {

						$("#divcategoria").css('display','block');
		
						}
						if (asignardias==1) {

						$("#divdias").css('display','block');
						}

						$(".diasckeckbox").attr('disabled',true);
						for (var i = 0; i < dias.length; i++) {
								

								if (dias[i].dia ==0) {
									$("#Domingo").attr('disabled',false);

									$("#Domingo").attr('checked',true);
								}
								if (dias[i].dia==1) {
								$("#Lunes").attr('disabled',false);

									$("#Lunes").attr('checked',true);
								}
								if (dias[i].dia==2) {
									$("#Martes").attr('disabled',false);

									$("#Martes").attr('checked',true);
								}
        if (dias[i].dia==3) {
               $("#Miercoles").attr('disabled',false);

									$("#Miercoles").attr('checked',true);
								}
								if (dias[i].dia==4) {
							$("#Jueves").attr('disabled',false);

									$("#Jueves").attr('checked',true);
								}
								if (dias[i].dia==5) {
							$("#Viernes").attr('disabled',false);

									$("#Viernes").attr('checked',true);
								}

								if (dias[i].dia==6) {
									$("#Sabado").attr('disabled',false);
									$("#Sabado").attr('checked',true);
								}
							
						}



					}
				});
	}
}


function ObtenerHorariosSemana(idservicio) {
	var datos="idservicio="+idservicio;


		$.ajax({
					url: 'catalogos/servicios/ObtenerHorariosSemana.php', //Url a donde la enviaremos
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

						var horarios=msj.respuesta;
						var servicio=msj.servicio;
						if (horarios.length>0) {
							PintarHorariosServicio(horarios,servicio);
						}


					}
				});
}


function PintarHorariosServicio(horarios,servicio) {
	console.log('entro');
	HorariosDisponibles();
	for (var i = 0; i < horarios.length; i++) {

		var obtenerfecha=horarios[i].fecha;
		var dividirfecha=obtenerfecha.split('-');
		var id=horarios[i].fecha+'-'+horarios[i].horainicial+'-'+horarios[i].horafinal+'-'+horarios[i].idzona;

		var objeto={
			id:id,
			fecha:dividirfecha[0]+'-'+dividirfecha[1]+'-'+dividirfecha[2],
			idzona:horarios[i].idzona,
			horainicial:horarios[i].horainicial,
			horafinal:horarios[i].horafinal

			};
		arraydiaseleccionados.push(objeto);
		arraydiaselegidos.push(id);
		
	}

	

PintarSeleccionados();
	Resumenfechas();
}

function PintarHorariosSemana(horarios) {

	var html="";
	for (var i = 0; i <horarios.length; i++) {

		obtenerdiv=$("#horarios").html();



	contadorhorarioatencion=parseFloat($(".horariosatencion").length)+1;
	tabindex=parseFloat(6)+parseFloat(contadorhorarioatencion);

	var html=`
					<div class="row horariosatencion" id="contador`+contadorhorarioatencion+`">
										<div class="col-md-3">
									<label>DIA</label>	

									<select class="form-control diasemana" id="diasemana_`+contadorhorarioatencion+`" tabindex="`+tabindex+`">
										<option value="t">SELECCIONAR DIA</option>
										<option value="0">DOMINGO</option>
										<option value="1">LUNES</option>
										<option value="2">MARTES</option>
										<option value="3">MIÉRCOLES</option>
										<option value="4">JUEVES</option>
										<option value="5">VIERNES</option>
										<option value="6">SÁBADO</option>

									</select>
									</div>
									<div class="col-md-4">
									<label>HORA INICIO:</label>
										<div class="form-group mb-2" style="">
											<input type="time" id="horai_`+contadorhorarioatencion+`"  class="form-control horainiciodia" tabindex="`+(tabindex+1)+`"  >
										</div>

									</div>

								
									<div class="col-md-4">

										<label>HORA FIN:</label>
										<div class="form-group mb-2" style="">
											<input type="time" id="horaf_`+contadorhorarioatencion+`" class="form-control horafindia" tabindex="`+(tabindex+1)+`" >
										</div>
									</div>
									<div class="col-md-1">
										<button type="button"  style="margin-top: 2em;" onclick="EliminarOpcionHorario(`+contadorhorarioatencion+`)" class="btn btn_rojo"><i class="mdi mdi-delete-empty"></i></button>
									</div>
								</div>

	`;



	colocarhtml=obtenerdiv+html;


	var diasemana=horarios[i].dia;
	var horai=horarios[i].horainicial;
	var horaf=horarios[i].horafinal;


	$("#horarios").append(html)

	$("#diasemana_"+contadorhorarioatencion).val(diasemana);
	$("#horai_"+contadorhorarioatencion).val(horai);
 	$("#horaf_"+contadorhorarioatencion).val(horaf);
	
		
	}
			
}

function Obtenerparticipantes(tipo,idservicio) {
	var datos="tipo="+tipo+"&idservicio="+idservicio;
	$.ajax({
					url: 'catalogos/servicios/ObtenerParticipantes.php', //Url a donde la enviaremos
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

						var usuarios=msj.respuesta;
						if (usuarios.length>0) {

							for (var i =0; i <usuarios.length; i++) {
								
								$("#inputcli_"+usuarios[i].idusuarios).attr('checked',true);
							}
						}

					}
				});
}

function ObtenerZonas() {
		var datos="idservicio="+idservicio;
	$.ajax({
					url: 'catalogos/servicios/ObtenerZonas.php', //Url a donde la enviaremos
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

						var zonas=msj.respuesta;
						if (zonas.length>0) {

							for (var i =0; i <zonas.length; i++) {
								
								$("#inputz_"+zonas[i].idzona).attr('checked',true);
							}
						}

					}
				});
}


function ObtenerCoachs(tipo,idservicio) {
	var datos="tipo="+tipo+"&idservicio="+idservicio;
	$.ajax({
					url: 'catalogos/servicios/ObtenerParticipantes.php', //Url a donde la enviaremos
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

						var usuarios=msj.respuesta;
						if (usuarios.length>0) {

							for (var i =0; i <usuarios.length; i++) {
								
								$("#inputcoach_"+usuarios[i].idusuarios).attr('checked',true);
							}
						}

					}
				});
}

function SeleccionarCliente() {
	var contador=0;
	var participantes=[];
		$(".chkcliente").each(function(){
			var valor=$(this).attr('id');
			var id=valor.split('_')[1];

			if ($("#"+valor).is(':checked')) {
				participantes.push(id);
				contador++;
			$("#inputcli_"+id).attr('checked',true);
			}
		});

		if (cantidadparticipantes==contador) {


		}

		if (contador>cantidadparticipantes) {

			var cantidad=participantes.length;

			var ultimo=participantes[cantidad-1];
			console.log(ultimo);
			$("#inputcli_"+ultimo).prop('checked',false);

			AbrirNotificacion('Cantidad máxima de participantes a elegir '+cantidadparticipantes,"mdi-close-circle");
			
		}

}

function BuscarEnLista(idbuscador,clista) {

		var buscador=$(idbuscador).val().toLowerCase();
		//var datos="idsucursal="+idsucursal+"&buscador="+buscador;
	
		$(clista).each(function(){
				var id=$(this).attr('id');
				obtener=$('#'+id).text().toLowerCase();
				cadena=$(this).text().toLowerCase();
					  if (obtener.indexOf(buscador.toLowerCase())!=-1 ) {
						  $('#'+id).css('display','block');	
					  }else{
						  $('#'+id).css('display','none');	
					  }
			});
}

function CambioPeriodo() {

	/*var perido=$('input[name=v_grupo2]:checked').val();

	if (perido==1) {
		$("#divperiodos").css('display','block');
		$("#btnperiodo").css('display','none');
		$(".periodosservicios").remove();
		AgregarPeriodo();
	}

	if (perido==2) {
		*/
		$("#divperiodos").css('display','block');
		$("#btnperiodo").css('display','block');
	//}

}




function AgregarPeriodo(){

		contadorperiodos=parseFloat($(".periodosservicios").length)+1;

		tabindex=parseFloat(6)+parseFloat(contadorperiodos);


	var html=`
					<div class="row periodosservicios" id="contador`+contadorperiodos+`">
										<div class="col-md-3">
										<label for="from">Fecha inicial</label>
											<input type="date" id="fechainicial_`+contadorperiodos+`" class="form-control from" name="from">

									</div>

									<div class="col-md-3">

										<label for="to">Fecha final</label>
										<input type="date" id="fechafinal_`+contadorperiodos+`" class="form-control to" name="to">

									</div>
								</div>
							
							<div class="row diasperiodo" id="diasperiodo_`+contadorperiodos+`">
								<div class="col-md-12" id="dias_`+contadorperiodos+`">

								</div>

							</div>

					</div>
					

	`;


	$("#periodos").append(html)

//cargarinputperiodos(contadorperiodos);


	//cargarHorarios();

}


function cargarHorarios(contadorperiodos) {

	var fechainicial_=$("#fechainicial_"+contadorperiodos).val();
	var fechafinal_=$("#fechafinal_"+contadorperiodos).val();


	var datos="fechainicial="+fechainicial+"&fechafinal="+fechafinal;
	$.ajax({
					url: 'catalogos/servicios/ObtenerHorarios.php', //Url a donde la enviaremos
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

						var zonas=msj.respuesta;
						if (zonas.length>0) {

							for (var i =0; i <zonas.length; i++) {
								
								$("#inputz_"+zonas[i].idzona).attr('checked',true);
							}
						}

					}
				});


}

function HorariosDisponibles() {
	var v_zonas=[];
	arraydiaselegidos=[];
	arraydiaseleccionados=[];
		$(".myc-day-time-container").html('');
Resumenfechas();
	$(".chkzona").each(function( index ) {
	 if($( this ).is(':checked')){

	 		var id=$(this).attr('id');
	 		var dividir=id.split('_');

	 		v_zonas.push(dividir[1]);

			 }

	 	;
	});


	var domingo=0,lunes=0,martes=0,miercoles=0,jueves=0,Viernes=0,sabado=0;
	if($("#Domingo").is(':checked')){

	 domingo=1;
	}
	 if($("#Lunes").is(':checked')){

	 lunes=1;
	}
	 if($("#Martes").is(':checked')){

	 martes=1;
	}
	 if($("#Miercoles").is(':checked')){

	 miercoles=1;
	}
	 if($("#Jueves").is(':checked')){

	 jueves=1;
	}
	 if($("#Viernes").is(':checked')){

	 Viernes=1;
	}
	 if($("#Sabado").is(':checked')){

	 sabado=1;
	}

	if(v_zonas.length>0){

	var v_categoria=$("#v_categoriaservicio").val();
	var v_tipocategoria=$("#v_categoria").val();
	var v_fechainicial=$("#v_fechainicial").val();
	var v_fechafinal=$("#v_fechafinal").val();

		var datos="domingo="+domingo+"&lunes="+lunes+"&martes="+martes+"&miercoles="+miercoles+"&jueves="+jueves+"&viernes="+Viernes+"&sabado="+sabado+"&v_categoria="+v_categoria+"&v_tipocategoria="+v_tipocategoria+"&v_fechainicial="+v_fechainicial+"&v_fechafinal="+v_fechafinal+"&v_zonas="+v_zonas;

			$.ajax({
					url: 'catalogos/servicios/ObtenerHorarios.php', //Url a donde la enviaremos
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

						var dividirfecha=v_fechainicial.split('-');
							console.log(dividirfecha);

						 $('#picker').markyourcalendar({
	          			 startDate: new Date(dividirfecha[0],dividirfecha[1]-1,dividirfecha[2]),
			             months: ['ene','feb','mar','abr','may','jun','jul','agos','sep','oct','nov','dic'],
			              weekdays: ['dom','lun','mar','mier','jue','vier','sab'],
			           	 isMultiple: true,

			           	 /* onClickNavigator: function(ev, instance) {
							HorariosDisponibles2();
			           	  }*/


						});



						var id=fecha+'-'+horainicial+'-'+horafinal+'-'+idzona;


						 var respuesta=msj.respuesta;

						 if (respuesta.length>0) {
						 for (var i = 0; i < respuesta.length; i++) {
						 	
						 	var fecha=respuesta[i].fecha;
						 	var idzona=respuesta[i].idzona;
						
						 	var dividirfecha=fecha.split('-');
						 	var nuevafecha=dividirfecha[0]+'-'+parseInt(dividirfecha[1])+'-'+dividirfecha[2];

						 	var htmlcontenedor= $("."+nuevafecha).html();
						 	var color=respuesta[i].color;
						 	var html="";
								 for (var j = 0; j < respuesta[i].horasposibles.length; j++) {
								 	
								 		for (var k = 0; k <respuesta[i].horasposibles[j].length; k++) {
								 			var horainicial=respuesta[i].horasposibles[j][k].horainicial;
								 			var horafinal=respuesta[i].horasposibles[j][k].horafinal;

								 			var disponible=respuesta[i].horasposibles[j][k].disponible==0?'':color;
								 			
								 			if (horainicial!=null && horafinal!=null) {
								 				var id=fecha+'-'+horainicial.slice(0,5)+'-'+horafinal.slice(0,5)+'-'+idzona;
								 				var clase="";
								 				var estilo="";	
								 					if (disponible!='') {
								 						clase='inputdia';
								 						estilo='color:white;';
								 					}

								 				html+=`<div  id="`+id+`" class="`+clase+`" style="background:`+disponible+`;border-radius: 20px;padding: .5em;text-align: center;margin-bottom: 1em;cursor:pointer;`+estilo+`">
								 				`+horainicial.slice(0,5)+'-'+horafinal.slice(0,5)+`
								 				</div>`;

								 			}
								 		}
								 		
								 }

						 	html=htmlcontenedor+html;
						 	$("."+nuevafecha).html(html);



						 }

						}else{


							AbrirNotificacion('No se encuentran horarios disponibles dentro del periodo','mdi mdi-alert-circle');
					
						}

						 PintarSeleccionados();

						 	$('.inputdia').click(function(e){

						
						 		var id=e.target.id;
						 		
						 		var encontrado=Buscardia(id);

						 		if (encontrado==1) {
						 			 var element = document.getElementById(id);
 									 element.classList.remove("activohorario");

 								 	BorrarElemento(id);
 								 	BorrarElementoObjeto(id);
						 		}else{

						 			arraydiaselegidos.push(id);
						 			var dividirfecha=id.split('-');
						 			var objeto={
						 				id:id,
						 				fecha:dividirfecha[0]+'-'+dividirfecha[1]+'-'+dividirfecha[2],
						 				idzona:dividirfecha[5],
						 				horainicial:dividirfecha[3],
						 				horafinal:dividirfecha[4]

						 			};
						 			arraydiaseleccionados.push(objeto);
						 			var element = document.getElementById(id);
								   element.classList.add("activohorario");
						 		}

								 Resumenfechas();
						 	 });

					}
				});

		}
	
}

function HorariosDisponibles2() {
	var v_zonas=[];
	$(".myc-day-time-container").html('');
	$(".chkzona").each(function( index ) {
	 if($( this ).is(':checked')){

	 		var id=$(this).attr('id');
	 		var dividir=id.split('_');

	 		v_zonas.push(dividir[1]);

			 }

	 	;
	});


	var domingo=0,lunes=0,martes=0,miercoles=0,jueves=0,Viernes=0,sabado=0;
	if($("#Domingo").is(':checked')){

	 domingo=1;
	}
	 if($("#Lunes").is(':checked')){

	 lunes=1;
	}
	 if($("#Martes").is(':checked')){

	 martes=1;
	}
	 if($("#Miercoles").is(':checked')){

	 miercoles=1;
	}
	 if($("#Jueves").is(':checked')){

	 jueves=1;
	}
	 if($("#Viernes").is(':checked')){

	 Viernes=1;
	}
	 if($("#Sabado").is(':checked')){

	 sabado=1;
	}

	if(v_zonas.length>0){

	var v_categoria=$("#v_categoriaservicio").val();
	var v_tipocategoria=$("#v_categoria").val();
	var v_fechainicial=$("#v_fechainicial").val();
	var v_fechafinal=$("#v_fechafinal").val();

		var datos="lunes="+lunes+"&martes="+martes+"&miercoles="+miercoles+"&jueves="+jueves+"&viernes="+Viernes+"&sabado="+sabado+"&v_categoria="+v_categoria+"&v_tipocategoria="+v_tipocategoria+"&v_fechainicial="+v_fechainicial+"&v_fechafinal="+v_fechafinal+"&v_zonas="+v_zonas;

			$.ajax({
					url: 'catalogos/servicios/ObtenerHorarios.php', //Url a donde la enviaremos
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

						var dividirfecha=v_fechainicial.split('-');
				

				

						 var respuesta=msj.respuesta;
						for (var i = 0; i < respuesta.length; i++) {
						 	
						 	var fecha=respuesta[i].fecha;
						 	var idzona=respuesta[i].idzona;
						 
						 	var dividirfecha=fecha.split('-');
						 	var nuevafecha=dividirfecha[0]+'-'+parseInt(dividirfecha[1])+'-'+dividirfecha[2];

						 	var htmlcontenedor= $("."+nuevafecha).html();
						 	var color=respuesta[i].color;
						 	var html="";
								 for (var j = 0; j < respuesta[i].horasposibles.length; j++) {
								 	console.log(respuesta[i].horasposibles[j]);
								 	
								 		for (var k = 0; k <respuesta[i].horasposibles[j].length; k++) {
								 			var horainicial=respuesta[i].horasposibles[j][k].horainicial;
								 			var horafinal=respuesta[i].horasposibles[j][k].horafinal;

								 			var disponible=respuesta[i].horasposibles[j][k].disponible==0?'':color;
								 			
								 			if (horainicial!=null && horafinal!=null) {
								 				var id=fecha+'-'+horainicial.slice(0,5)+'-'+horafinal.slice(0,5)+'-'+idzona;
								 				var clase="";	
								 				var estilo="";	

								 					if (disponible!='') {
								 						clase='inputdia';
								 						estilo='color:white;';
								 					}

								 				html+=`<div  id="`+id+`" class="`+clase+`" style="background:`+disponible+`;border-radius: 20px;padding: .5em;text-align: center;margin-bottom: 1em;cursor:pointer;`+estilo+`">
								 				`+horainicial.slice(0,5)+'-'+horafinal.slice(0,5)+`
								 				</div>`;
								 		/*	html+=` <label class="btn btn-primary"style="background:`+disponible+`">
                        <input type="checkbox" name="countries[]" value="España" autocomplete="off"> España
                    </label>`;*/
								 			}
								 		}
								 		
								 }

						 	html=htmlcontenedor+html;
						 	$("."+nuevafecha).html(html);


						 	

						 }
						 PintarSeleccionados();

						 $('.inputdia').click(function(e){

						 		

						 		var id=e.target.id;

						 		var encontrado=Buscardia(id);

						 		if (encontrado==1) {
						 			 var element = document.getElementById(id);
 									 element.classList.remove("activohorario");

 								 	BorrarElemento(id);
 								 	BorrarElementoObjeto(id);

						 		}else{

						 			arraydiaselegidos.push(id);
						 			var dividirfecha=id.split('-');
						 			var objeto={
						 				id:id,
						 				fecha:dividirfecha[0]+'-'+dividirfecha[2]+'-'+dividirfecha[3],
						 				idzona:dividirfecha[5],
						 				horainicial:dividirfecha[3],
						 				horafinal:dividirfecha[4]

						 			};
						 			arraydiaseleccionados.push(objeto);

						 			var element = document.getElementById(id);
								   element.classList.add("activohorario");
						 		}

						 		Resumenfechas();
								 
						 	 });

					}
				});

		}
}


function Buscardia(id) {
	var encontrado=0;
	
	for (var i = 0; i <arraydiaselegidos.length; i++) {
		
			if (id==arraydiaselegidos[i]) {
				encontrado=1;
				
			}
	}

	if (encontrado==1) {
		return 1;
	}else{

		return 0;
	}
}

function BorrarElemento(id) {
	var encontrado=0;
	for (var i = 0; i <arraydiaselegidos.length; i++) {
		
			if (id == arraydiaselegidos[i]) {
				console.log('borrando');
				arraydiaselegidos.splice(i, 1);
				return 0;
			}
	}

	

}
function BorrarElementoObjeto(id) {
	for (var i = 0; i <arraydiaseleccionados.length; i++) {
		

		if (id == arraydiaseleccionados[i].id) {
			console.log('borrando sele');

			arraydiaseleccionados.splice(i,1);
			return 0;
		}
	}
}

function PintarSeleccionados() {
		if (arraydiaselegidos.length>0) {
		for (var i = 0; i <arraydiaselegidos.length; i++) {
		
			var id=arraydiaselegidos[i];
			

			if (!!document.getElementById(id)) {
			var element = document.getElementById(id);
				element.classList.add("activohorario");
	
			}
		}
	}



}
function Resumenfechas() {
		$("#selected-dates").html('');
		let days = ['Domingo','Lunes','Martes','Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'];
		
		var ordenado =arraydiaseleccionados.sort(generateSortFn([{name: 'idzona'}, {name: 'fecha',reverse: true}]));
                     


		if (ordenado.length>0) {
			var idzonaante=0;
		for (var i = 0; i <ordenado.length; i++) {
			
			var id=ordenado[i].id;
			var dividircadena=id.split('-');
			var fecha=dividircadena[2]+'-'+dividircadena[1]+'-'+dividircadena[0];
			var horainicial=dividircadena[3].slice(0,5);
			var horafinal=dividircadena[4].slice(0,5);
			var idzona=dividircadena[5];

			var fecha2=dividircadena[0]+'-'+dividircadena[1]+'-'+dividircadena[2];

			var datatime=new Date(fecha2);
			var dia=days[datatime.getUTCDay()];

			if (idzona!=idzonaante) {

				if (!!$("#divzona_"+idzona)) {
				

				var nombrezona=$("#lblzona_"+idzona).text();
				var color=$("#divzona_"+idzona).css('background');

					if (!!$("#colocarzona"+idzona)) {

						var html=`
						<div style="background:`+color+`">`+nombrezona+`</div>
						<div class="zonas" id="colocarzona`+idzona+`"></div>`;
						$("#selected-dates").append(html);

					}
				
				

				}
				idzonaante=idzona;
			}


			var htmlfechas=`<div class="fechas">`+dia+` `+fecha+` `+horainicial+`-`+horafinal+`</div>`;
			
			$("#colocarzona"+idzona).append(htmlfechas);
			
		}
	}
}

function ObtenerPeriodos(idservicio) {
		var datos="idservicio="+idservicio;
			$.ajax({
					url: 'catalogos/servicios/ObtenerPeriodos.php', //Url a donde la enviaremos
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
					PintarPeriodos(respuesta);

					}
				});
}

function PintarPeriodos(respuesta) {
	
		contadorperiodos=parseFloat($(".periodosservicios").length)+1;

		tabindex=parseFloat(6)+parseFloat(contadorperiodos);

		for (var i = 0; i < respuesta.length; i++) {
		
		

	var html=`
					<div class="row periodosservicios" id="contador`+contadorperiodos+`">
										<div class="col-md-3">
										<label for="from">Fecha inicial</label>
											<input type="date" id="fechainicial_`+contadorperiodos+`" class="form-control from" value="`+respuesta[i].fechainicial+`" name="from">

									</div>

									<div class="col-md-3">

										<label for="to">Fecha final</label>
										<input type="date" id="fechafinal_`+contadorperiodos+`" class="form-control to" name="to" value="`+respuesta[i].fechainicial+`" >

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

function sortByAttribute(array,...attrs) {
  // generate an array of predicate-objects contains
  // property getter, and descending indicator
  let predicates = attrs.map(pred => {
    let descending = pred.charAt(0) === '-' ? -1 : 1;
    pred = pred.replace(/^-/, '');
    return {
      getter: o => o[pred],
      descend: descending
    };
  });
  // schwartzian transform idiom implementation. aka: "decorate-sort-undecorate"
  return array.map(item => {
    return {
      src: item,
      compareValues: predicates.map(predicate => predicate.getter(item))
    };
  })
  .sort((o1, o2) => {
    let i = -1, result = 0;
    while (++i < predicates.length) {
      if (o1.compareValues[i] < o2.compareValues[i]) result = -1;
      if (o1.compareValues[i] > o2.compareValues[i]) result = 1;
      if (result *= predicates[i].descend) break;
    }
    return result;
  })
  .map(item => item.src);
}


function generateSortFn(props) {
    return function (a, b) {
        for (var i = 0; i < props.length; i++) {
            var prop = props[i];
            var name = prop.name;
            var reverse = prop.reverse;
            if (a[name] < b[name])
                return reverse ? 1 : -1;
            if (a[name] > b[name])
                return reverse ? -1 : 1;
        }
        return 0;
    };
};
