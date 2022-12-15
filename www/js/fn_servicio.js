var cantidadparticipantes=0;
var arraydiaselegidos=[];
var arraydiaseleccionados=[];
var seccion=0;
var seccion2=0;
var seccion3=0;
var seccion4=0;
var zonasarray=[];
var horarioscomparacion=[];

function Guardarservicio2(form,regresar,donde,idmenumodulo)
{
	if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
	{		
		var domingo=0,lunes=0,martes=0,miercoles=0,jueves=0,Viernes=0,sabado=0;
		if($(".lbldomingo").hasClass('active')){

		 domingo=1;
		}
		 if($(".lbllunes").hasClass('active')){

		 lunes=1;
		}
		 if($(".lblmartes").hasClass('active')){

		 martes=1;
		}
		 if($(".lblmiercoles").hasClass('active')){

		 miercoles=1;
		}
		 if($(".lbljueves").hasClass('active')){

		 jueves=1;
		}
		 if($(".lblviernes").hasClass('active')){

		 Viernes=1;
		}
		 if($(".lblsabado").hasClass('active')){

		 sabado=1;
		}	


		//recibimos todos los datos..
		var nombre =$("#v_titulo").val();
		var descripcion=$("#v_descripcion").val();
		var orden=$("#v_orden").val();
		var estatus=$("#v_estatus").val();
		var categoria=$("#v_categoria").val();
		var costo=$("#v_costo").val();
		var v_politicasaceptacionid=$("#v_politicasaceptacionid").val();


		var id=$("#id").val();
		var v_numparticipantes=$("#v_numparticipantesmin").val();
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
		var membresias=[];
		var descuentos=[];


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


		var porcentajescoachs=[];
		$(".nombrecoach").each(function(){
			var id=$(this).val();
			coachs.push(id);

			var idelemento=$(this).attr('id').split('_')[1];
			var tipopago=$("#tipo_"+idelemento).val();
			var monto=$("#txtcantidaddescuento_"+idelemento).val();

				var objeto={
					idcoach:id,
					tipopago:pago,
					monto:monto
				};
			    porcentajescoachs.push(objeto);

		});

		$(".from").each(function(){
			var valor=$(this).val();
			periodoinicial.push(valor);
			
		});
		$(".to").each(function(){
			var valor=$(this).val();
			periodofinal.push(valor);
		 });

		
		
		datos.append('v_politicasaceptacionid',v_politicasaceptacionid);
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
		datos.append('porcentajescoachs',JSON.stringify(porcentajescoachs));

		
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
				  aparecermodulos(regresar+"?ac=0&idmenumodulo="+idmenumodulo+"&msj=El servicio se encuentra relacionado con al menos un alumno "+msj,donde);
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

function SeleccionarCategoria(idservicio) {
	var categoriaid=$("#v_categoria").val();
	var datos="categoriaid="+categoriaid;

	/*$("#divhorarios").css('display','none');
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
*/
	$("#profile-tab").css('display','none');
	$("#contact-tab").css('display','none');
	$("#costos-tab").css('display','none');
	$("#coach-tab").css('display','none');
	$("#multi-tab").css('display','none');
	$("#politicas-tab").css('display','none');
	$("#aceptacion-tab").css('display','none');
	$("#otros-tab").css('display','none');

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
						var avanzado=msj.respuesta.avanzado;

					/*	if (horarios==1) {

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
						}*/
					var idmenumodulo=$("#idmenumodulo").text();
							$(".divcategoria").css('display','none');

						if (avanzado==1) {

							$("#profile-tab").css('display','block');
							$("#contact-tab").css('display','block');
							$("#costos-tab").css('display','block');
							$("#coach-tab").css('display','block');
							$("#multi-tab").css('display','block');
							$("#politicas-tab").css('display','block');
							$("#aceptacion-tab").css('display','block');
							$("#otros-tab").css('display','block');

							$(".btnguardarservicio").attr('onclick',"Guardarservicio('f_servicio','catalogos/servicios/vi_servicios.php','main','"+idmenumodulo+"')");
 							//$(".btncontinuar").attr('onclick',"Guardarservicio('f_servicio','catalogos/servicios/vi_servicios.php','main','"+idmenumodulo+"')");
							
 							$(".btnguardarservicio").html('<i class="mdi mdi-arrow-right-box"></i>Continuar');
							$(".divcategoria").css('display','block');

							if (idservicio>0) {

							$("#profile-tab").attr('onclick','ActivarTab(this,"profile")');
							$("#contact-tab").attr('onclick','ActivarTab(this,"contact")');
							$("#costos-tab").attr('onclick','ActivarTab(this,"costos")');
							$("#coach-tab").attr('onclick','ActivarTab(this,"coaches")');
							$("#multi-tab").attr('onclick','ActivarTab(this,"multi")');
							$("#politicas-tab").attr('onclick','ActivarTab(this,"politicas")');
				
							$(".divcategoria").css('display','block');
							

							}
						}else{

							$(".btncontinuar").css('display','none');
							$(".btnguardarservicio").attr('onclick',"Guardarservicio2('f_servicio','catalogos/servicios/vi_servicios.php','main','"+idmenumodulo+"')");
 							$(".btnguardarservicio").html('<i class="mdi mdi-content-save"></i>Guardar');

						}
						$(".diasckeckbox").attr('disabled',true);
						$(".lbldomingo").addClass('btn_colorgray3');
						$(".lbllunes").addClass('btn_colorgray3');
						$(".lblmartes").addClass('btn_colorgray3');
						$(".lblmiercoles").addClass('btn_colorgray3');
						$(".lbljueves").addClass('btn_colorgray3');
						$(".lblviernes").addClass('btn_colorgray3');
						$(".lblsabado").addClass('btn_colorgray3');
						var diasdisponibles=[];
						for (var i = 0; i < dias.length; i++) {
								

								if (dias[i].dia ==0) {
									$(".lbldomingo").removeClass('btn_colorgray3');
									$(".lbldomingo").addClass('btn_colorgray2');
									$("#Domingo").attr('disabled',false);
									$("#Domingo").attr('checked',true);
									diasdisponibles.push('Domingo');
								}
								if (dias[i].dia==1) {
								$(".lbllunes").removeClass('btn_colorgray3');
								$(".lbllunes").addClass('btn_colorgray2');
									
								$("#Lunes").attr('disabled',false);
								$("#Lunes").attr('checked',true);
											diasdisponibles.push('Lunes');

								}
								if (dias[i].dia==2) {
								$(".lblmartes").removeClass('btn_colorgray3');
								$(".lblmartes").addClass('btn_colorgray2');
									$("#Martes").attr('disabled',false);

									$("#Martes").attr('checked',true);
									diasdisponibles.push('Martes');

								}
						        if (dias[i].dia==3) {
						        $(".lblmiercoles").removeClass('btn_colorgray3');
									$(".lblmiercoles").addClass('btn_colorgray2');
						               $("#Miercoles").attr('disabled',false);

									$("#Miercoles").attr('checked',true);
									diasdisponibles.push('Miercoles');

								}
								if (dias[i].dia==4) {
									$(".lbljueves").removeClass('btn_colorgray3');
									$(".lbljueves").addClass('btn_colorgray2');
									$("#Jueves").attr('disabled',false);

									$("#Jueves").attr('checked',true);
									diasdisponibles.push('Jueves');

								}
								if (dias[i].dia==5) {
								$(".lblviernes").removeClass('btn_colorgray3');
								$(".lblviernes").addClass('btn_colorgray2');
								$("#Viernes").attr('disabled',false);

									$("#Viernes").attr('checked',true);
								diasdisponibles.push('Viernes');

								}

								if (dias[i].dia==6) {
									$(".lblsabado").removeClass('btn_colorgray3');
									$(".lblsabado").addClass('btn_colorgray2');
									$("#Sabado").attr('disabled',false);
									$("#Sabado").attr('checked',true);
									diasdisponibles.push('Sábado');

								}
							
						}

						if (diasdisponibles.length>0) {

							var uniqueArray = uArray(diasdisponibles);
							
							var dias='';
							for (var i = 0; i <uniqueArray.length; i++) {

								if (i>0) {
									dias+=', ';
								}
								dias+=uniqueArray[i];
							}

							$("#leyenda").html('Los dias disponibles son: <span style="font-weight:bold;">'+dias+'<span>')
						}



					}
				});
	}
}

function uArray(array) {
    var out = [];
    for (var i=0, len=array.length; i<len; i++)
        if (out.indexOf(array[i]) === -1)
            out.push(array[i]);
    return out;
}


function ObtenerHorariosSemana(idservicio) {
	var datos="idservicio="+idservicio;


		$.ajax({
					url: 'catalogos/servicios/ObtenerHorariosSemana.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					data:datos,
					dataType:'json',
					async:false,
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
			horafinal:horarios[i].horafinal,
			color:horarios[i].color,
			};
		arraydiaseleccionados.push(objeto);
		arraydiaselegidos.push(id);
		
	}

	

   PintarSeleccionados();
	//Resumenfechas();
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


function ObtenerCoachsParticipantes(tipo,idservicio) {
	var usuarios="";
	var datos="tipo="+tipo+"&idservicio="+idservicio;
 //return new Promise((resolve, reject) => {
 			 $.ajax({
					url: 'catalogos/servicios/ObtenerParticipantesCoach.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					data:datos,
					dataType:'json',
					async:false,
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {

						 usuarios=msj.respuesta;
						if (usuarios.length>0) {

							for (var i =0; i <usuarios.length; i++) {
								
								AgregarNuevoCoach2(usuarios[i].idusuarios,usuarios[i].tipopago,usuarios[i].monto);
							
							}
							//resolve(usuarios);

						
						}

					}
				});
	
 		//	});
	
}


function ObtenerDescuentos(idservicio) {
 	var datos="idservicio="+idservicio;
	$.ajax({
					url: 'catalogos/servicios/ObtenerDescuentos.php', //Url a donde la enviaremos
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

						var descuentos=msj.respuesta;
						if (descuentos.length>0) {

							for (var i =0; i <descuentos.length; i++) {
								
								$("#inputdescuento_"+descuentos[i].iddescuento).attr('checked',true);
							}
						}

					}
				});
 } 

 function ObtenerMembresias(idservicio) {
 	var datos="idservicio="+idservicio;
	$.ajax({
					url: 'catalogos/servicios/ObtenerMembresias.php', //Url a donde la enviaremos
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

						var membresias=msj.respuesta;
						if (membresias.length>0) {

							for (var i =0; i <membresias.length; i++) {
								
								$("#inputmembresia_"+membresias[i].idmembresia).attr('checked',true);
							}
						}

					}
				});
 } 


 function ObtenerEncuestas(idservicio) {
 	var datos="idservicio="+idservicio;
	$.ajax({
					url: 'catalogos/servicios/ObtenerEncuestas.php', //Url a donde la enviaremos
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

						var encuestas=msj.respuesta;
						if (encuestas.length>0) {

							for (var i =0; i <encuestas.length; i++) {
								
								$("#inputencuesta_"+encuestas[i].idencuesta).attr('checked',true);
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
					<div class="row periodosservicios" id="contadorpe_`+contadorperiodos+`">
										<div class="col-md-3">
										<label for="from">Fecha inicial</label>
											<input type="date" id="fechainicial_`+contadorperiodos+`" class="form-control from" name="from">

									</div>

									<div class="col-md-3">

										<label for="to">Fecha final</label>
										<input type="date" id="fechafinal_`+contadorperiodos+`" class="form-control to" name="to">

									</div>

									<div class="col-md-3">
										<button type="button"  style="margin-top: 2em;" onclick="EliminarPeriodo(`+contadorperiodos+`)" class="btn btn_rojo"><i class="mdi mdi-delete-empty"></i></button>


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
function EliminarPeriodo(contadorperiodos) {
	
	$("#contadorpe_"+contadorperiodos).remove();

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

function Aplicar() {
		var preguntar=0;
	if (arraydiaselegidos.length==0) {
		preguntar=0;
	}else{
		preguntar=1;
	}

	if (preguntar==1) {

		if(confirm("\u00BFEstas seguro de querer realizar esta operaci\u00f3n , se borrarán los horarios seleccionados?"))
		{
			preguntar=0;
		}

	}

	if (preguntar==0) {

		HorariosDisponibles();
		var id=$("#id").val();
		if (id>0) {
		ObtenerHorariosSemana(id);	
		}
		
	}

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
	if($(".lbldomingo").hasClass('active')){

		 domingo=1;
		}
		 if($(".lbllunes").hasClass('active')){

		 lunes=1;
		}
		 if($(".lblmartes").hasClass('active')){

		 martes=1;
		}
		 if($(".lblmiercoles").hasClass('active')){

		 miercoles=1;
		}
		 if($(".lbljueves").hasClass('active')){

		 jueves=1;
		}
		 if($(".lblviernes").hasClass('active')){

		 Viernes=1;
		}
		 if($(".lblsabado").hasClass('active')){

		 sabado=1;
		}	

	//if(v_zonas.length>0){

	var v_categoria=$("#v_categoriaservicio").val();
	var v_tipocategoria=$("#v_categoria").val();
	var v_fechainicial=$("#v_fechainicial").val();
	console.log(v_fechainicial);
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

						var v_fechainicial=msj.fechadia;
						var dividirfecha=v_fechainicial.split('-');
						
						 $('#picker').markyourcalendar({
	          			 startDate: new Date(dividirfecha[0],dividirfecha[1]-1,dividirfecha[2]),
			             months: ['ene','feb','mar','abr','may','jun','jul','agos','sep','oct','nov','dic'],
			              weekdays: ['dom','lun','mar','mier','jue','vier','sab'],
			           	 isMultiple: true,

			           	  onClickNavigator: function(ev, instance) {
							HorariosDisponibles2();
			           	  }


						});


						 

						/*  $('.btncalendario').click(function(){
						  	HorariosDisponibles();
						  });*/


						 var fechas=msj.arrayfechasdias[0];
						PintarFechasCalendario(fechas);

						var id=fecha+'-'+horainicial+'-'+horafinal+'-'+idzona;


						 var respuesta=msj.respuesta;
						  zonasarray=msj.zonas;
						// console.log('a');
						// console.log(zonasarray);

						 if (respuesta.length>0) {
						 	$("#calendario").css('display','block');
						 for (var i = 0; i < respuesta.length; i++) {
						 	var fecha=respuesta[i].fecha;
						 	var idzona=respuesta[i].idzona;
							var nombrezona=respuesta[i].nombrezona;
						 	var dividirfecha=fecha.split('-');
						 	var nuevafecha=dividirfecha[0]+'-'+parseInt(dividirfecha[1])+'-'+parseInt(dividirfecha[2]);
						 	
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
								 						estilo='color:black;cursor:pointer;';
								 						horario='<span  id="'+id+'" class="'+clase+'">'+horainicial.slice(0,5)+'-'+horafinal.slice(0,5)+'</span>';
								 					}else{


								 						estilo='color:#eeeff0;';
								 						horario=horainicial.slice(0,5)+'-'+horafinal.slice(0,5);

								 					}

								 				html+=`<div  id="`+id+`" class="`+clase+`" style="padding: .5em;text-align: center;margin-bottom: 1em;`+estilo+`">
								 					`+horario+`<br>
								 					`+nombrezona+`<div class="badge1" style="background:`+color+`"></div>
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
						 CargarEventoSeleccionador();
						 	/*$('.inputdia').click(function(e){

						
						 		var id=e.target.id;
						 	console.log('id element ----'+id);

						 		var encontrado=Buscardia(id);

						 		if (encontrado==1) {

						 				console.log('id element'+id);
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
						 	 });*/

					}
				});

		//}
	
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
	if($(".lbldomingo").hasClass('active')){

		 domingo=1;
		}
		 if($(".lbllunes").hasClass('active')){

		 lunes=1;
		}
		 if($(".lblmartes").hasClass('active')){

		 martes=1;
		}
		 if($(".lblmiercoles").hasClass('active')){

		 miercoles=1;
		}
		 if($(".lbljueves").hasClass('active')){

		 jueves=1;
		}
		 if($(".lblviernes").hasClass('active')){

		 Viernes=1;
		}
		 if($(".lblsabado").hasClass('active')){

		 sabado=1;
		}	


	//if(v_zonas.length>0){

	var v_categoria=$("#v_categoriaservicio").val();
	var v_tipocategoria=$("#v_categoria").val();
	var v_fechainicial=$("#v_fechainicial").val();
	var v_fechafinal=$("#v_fechafinal").val();

		var datos="lunes="+lunes+"&martes="+martes+"&miercoles="+miercoles+"&jueves="+jueves+"&viernes="+Viernes+"&sabado="+sabado+"&domingo="+domingo+"&v_categoria="+v_categoria+"&v_tipocategoria="+v_tipocategoria+"&v_fechainicial="+v_fechainicial+"&v_fechafinal="+v_fechafinal+"&v_zonas="+v_zonas;

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
						 zonasarray=msj.zonas;
						 var fechas=msj.arrayfechasdias[0];
						PintarFechasCalendario(fechas);
				
						 var respuesta=msj.respuesta;
						for (var i = 0; i < respuesta.length; i++) {
						 	
						 	var fecha=respuesta[i].fecha;
						 	var idzona=respuesta[i].idzona;
							var nombrezona=respuesta[i].nombrezona;
						 	var dividirfecha=fecha.split('-');
						 	var nuevafecha=dividirfecha[0]+'-'+parseInt(dividirfecha[1])+'-'+parseInt(dividirfecha[2]);
						 	

						 	var htmlcontenedor= $("."+nuevafecha).html();
						 	var color=respuesta[i].color;
						 	var html="";
								 for (var j = 0; j < respuesta[i].horasposibles.length; j++) {
/*								 	console.log(respuesta[i].horasposibles[j]);
*/								 	
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
								 						estilo='color:black;cursor:pointer;';
								 						horario='<span  id="'+id+'" class="'+clase+'">'+horainicial.slice(0,5)+'-'+horafinal.slice(0,5)+'</span>';
								 					}else{


								 						estilo='color:#eeeff0;';
								 						horario=horainicial.slice(0,5)+'-'+horafinal.slice(0,5);

								 					}


								 				html+=`<div  id="`+id+`" class="`+clase+`" style="padding: .5em;text-align: center;margin-bottom: 1em;`+estilo+`">
								 					`+horario+`<br>
								 					`+nombrezona+`<div class="badge1" style="background:`+color+`"></div>
								 				</div>`;


								 				//console.log(html);
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
						 CargarEventoSeleccionador();
					
					}
				});

		//}
}

function CargarEventoSeleccionador() {
		 $('.inputdia').click(function(e){

						 		

						 		var id=e.target.id;

						 		var encontrado=Buscardia(id);

						 		if (encontrado==1) {
						 			 var element = document.getElementById(id);
 									 element.classList.remove("activohorario");
 									 element.style.border='none';

 								 	BorrarElemento(id);
 								 	BorrarElementoObjeto(id);
 								 	element.style.color='black';
						 		}else{

						 			arraydiaselegidos.push(id);
						 			var iddividido = id.split('-');
									
									var zonaelegida =zonasarray.find( zona => zona.idzona === iddividido[5]);
									var color=zonaelegida.color;
									
						 			var dividirfecha=id.split('-');
						 			console.log('aq');

						 			console.log(dividirfecha);
						 			var objeto={
						 				id:id,
						 				fecha:dividirfecha[0]+'-'+dividirfecha[1]+'-'+dividirfecha[2],
						 				idzona:dividirfecha[5],
						 				horainicial:dividirfecha[3],
						 				horafinal:dividirfecha[4],
						 				color:color,

						 			};
						 			arraydiaseleccionados.push(objeto);

						 			var element = document.getElementById(id);
								    element.classList.add("activohorario");
								    element.style.border="1px solid "+color;
			
						 		}

						 		Resumenfechas();
								 
						 	 });

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
				
				arraydiaselegidos.splice(i, 1);
				return 0;
			}
	}

	

}
function BorrarElementoObjeto(id) {
	for (var i = 0; i <arraydiaseleccionados.length; i++) {
			console.log(''+id+'=='+arraydiaseleccionados[i].id);

		if (id == arraydiaseleccionados[i].id) {

			arraydiaseleccionados.splice(i,1);
			return 0;
		}
	}
}

function PintarSeleccionados() {
	console.log('pintado');
		if (arraydiaselegidos.length>0) {
		for (var i = 0; i <arraydiaselegidos.length; i++) {
		
			var id=arraydiaselegidos[i];
			
			var iddividido=arraydiaselegidos[i].split('-');

			if (!!document.getElementById(id)) {
			var element = document.getElementById(id);
				element.classList.add("activohorario");
				element.classList.add("inputdia");
				var zonaelegida =zonasarray.find( zona => zona.idzona === iddividido[5]);
				var color=zonaelegida.color;
 				element.style.border="1px solid "+color;
			}
		}
	}


Resumenfechas();
}
function Resumenfechas() {

		$("#selected-dates").html('');
		let days = ['Domingo','Lunes','Martes','Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'];
		
		var ordenado =arraydiaseleccionados.sort(generateSortFn([{name: 'idzona'}, {name: 'fecha',reverse: false}]));


		if (ordenado.length>0) {
			var idzonaante=0;
		for (var i = 0; i <ordenado.length; i++) {
			
			var id=ordenado[i].id;
			var dividircadena=id.split('-');
			var fecha=dividircadena[2]+'-'+dividircadena[1]+'-'+dividircadena[0];
			var horainicial=dividircadena[3];
			var horafinal=dividircadena[4];
			var idzona=dividircadena[5];

			var fecha2=dividircadena[0]+'-'+dividircadena[1]+'-'+dividircadena[2];

			var datatime=new Date(fecha2);
			var dia=days[datatime.getUTCDay()];

			if (idzona!=idzonaante) {

				if (!!$("#divzona_"+idzona)) {
				

				var valor =zonasarray.find( zona => zona.idzona === idzona);
				var colordiv=valor.color;
				var nombrezona=valor.nombre;

					if (!!$("#colocarzona"+idzona)) {

						var html=`
						<div  class="list-group-item" style="font-weight:bold;">`+nombrezona+`<div class="badge1" style="background:`+colordiv+`"></div></div>
						<div class="zonas" id="colocarzona`+idzona+`"></div>`;
						
						$("#selected-dates").append(html);

					}
				
				

				}
				idzonaante=idzona;
			}


			var htmlfechas=`<div class="list-group-item" class="fechas">
						<div class="row">
							<div class="col-md-4">
								`+dia+`
							</div>
							<div class="col-md-4">
								`+fecha+`
							</div>
							<div class="col-md-4">
							 `+horainicial+`-`+horafinal+`
							</div>
						</div>
					 </div>`;
			
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
										<input type="date" id="fechafinal_`+contadorperiodos+`" class="form-control to" name="to" value="`+respuesta[i].fechafinal+`" >

									</div>

									<div class="col-md-3">
										<button type="button"  style="margin-top: 2em;" onclick="EliminarPeriodo(`+contadorperiodos+`)" class="btn btn_rojo"><i class="mdi mdi-delete-empty"></i></button>


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

function ActivarTab(elemento,idelemento) {
	$(".nav-link").removeClass('active');
	var id=elemento.id;
	$("#"+id).addClass('active');
	$(".tab-pane").removeClass('show');
	$(".tab-pane").removeClass('active');

	$("#"+idelemento).addClass('show');
	$("#"+idelemento).addClass('active');

	if ('multi'==idelemento) {
		$(".btnguardarservicio").html('<i class="mdi mdi-content-save"></i>Guardar');

	}else{
 	
 	$(".btnguardarservicio").html('<i class="mdi mdi-arrow-right-box"></i>Continuar');


	}

}
function Guardarservicio(form,regresar,donde,idmenumodulo) {


	new Promise((resolve, reject) => {
			resolve(Guardando(form,regresar,donde,idmenumodulo));


		}).then((r) => {
		  	
		  	console.log(r);
		  	//GuardarservicioForm(form,regresar,donde,idmenumodulo);

		  });
}

function Guardando(form,regresar,donde,idmenumodulo) {
	var pasar=0;
		if (horarioscomparacion.length>0) {
			var resp=ComprobacionHorarios(id);
			  resp.then(r => {

			  	var bandera=1;
			  	if (r.cantidad==0) {
			  		bandera=0;
			  	}
			  	if (r.fechaspasadas>0) {
			  		bandera=0;
			  	}
			  	
			  	if ( bandera==1 ) {
			  		GuardarservicioForm(form,regresar,donde,idmenumodulo);
			  	}else{
			  		var msg="";
			  			if (r.cantidad==0) {
			  				bandera=0;
			  				msg+="La cantidad de horarios debe ser igual a la que se registro originalmente<br>";
					  	}
					  	if (r.fechaspasadas>0) {
					  		bandera=0;
					  		msg+="Se seleccionaron fechas pasadas a la actual<br>";

					  	}

					  	if (bandera==0) {
					  		AbrirNotificacion(msg,"mdi-close-circle");

					  	}

			  	}

			  });

		}else{
			GuardarservicioForm(form,regresar,donde,idmenumodulo);
		}

}

function GuardarservicioForm(form,regresar,donde,idmenumodulo)
{
	/*if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
	{	
*/



			$("#lbltitulo").removeClass('inputrequerido');
			$("#lbldescripcion").removeClass('inputrequerido');
			$("#lbltiposervicio").removeClass('inputrequerido');
			$("#lblorden").removeClass('inputrequerido');
			$("#lbldias").removeClass('inputrequerido');
			$("#lblcategoria").removeClass('inputrequerido');
			$("#v_numparticipantesmin").removeClass('inputrequerido');
			$("#v_numparticipantesmax").removeClass('inputrequerido');
			$("#lblcostounitario").removeClass('inputrequerido');
			$(".divmodo").removeClass('inputrequerido');
	    	$("#lblperiodos").css('color','#3e5569');
			$("#lblhorarios").removeClass('inputrequerido');
			$("#lblminimo").removeClass('inputrequerido');
			$("#lblmaximo").removeClass('inputrequerido');
			$("#lbldescripcionpolitica").removeClass('inputrequerido');
			$("#lbldescripcionaceptacionpolitica").removeClass('inputrequerido');
			$("#lblseleccionarpoliticaaceptacion").removeClass('inputrequerido');


		var domingo=0,lunes=0,martes=0,miercoles=0,jueves=0,Viernes=0,sabado=0;
		if($(".lbldomingo").hasClass('active')){

		 domingo=1;
		}
		 if($(".lbllunes").hasClass('active')){

		 lunes=1;
		}
		 if($(".lblmartes").hasClass('active')){

		 martes=1;
		}
		 if($(".lblmiercoles").hasClass('active')){

		 miercoles=1;
		}
		 if($(".lbljueves").hasClass('active')){

		 jueves=1;
		}
		 if($(".lblviernes").hasClass('active')){

		 Viernes=1;
		}
		 if($(".lblsabado").hasClass('active')){

		 sabado=1;
		}	

		/*console.log('domingo'+domingo)
		console.log('lunes'+lunes)
		console.log('martes'+martes)
		console.log('miercoles'+miercoles)
		console.log('jueves'+jueves)
		console.log('Viernes'+Viernes)
		console.log('sabado'+sabado)
*/
		//recibimos todos los datos..
		var nombre =$("#v_titulo").val();
		var descripcion=$("#v_descripcion").val();
		var orden=$("#v_orden").val();
		var estatus=$("#v_estatus").val();
		var categoria=$("#v_categoria").val();
		var costo=$("#v_costo").val();
		var id=$("#id").val();
		var v_numparticipantes=$("#v_numparticipantesmin").val();
		var v_numparticipantesmax=$("#v_numparticipantesmax").val();

		var categoriaservicio=$("#v_categoriaservicio").val();

		var v_politicasaceptacionid=$("#v_politicasaceptacionid").val();


		var modalidad=0;

		

		  if(document.querySelector('input[name="v_grupo"]:checked')) {
		     	modalidad=$('input[name="v_grupo"]:checked').val();

		      }

		var modalidadpago=0;
		if ($('input[name=v_grupo2]').is(':checked')) {
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
		//var zonas=[];
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

		/*$(".chkzona").each(function(){
			var valor=$(this).attr('id');
			var id=valor.split('_')[1];

			if ($("#"+valor).is(':checked')) {
				zonas.push(id);
			}
		});
*/

		var porcentajescoachs=[];
		$(".nombrecoach").each(function(){
			var id=$(this).val();
			coachs.push(id);

			var idelemento=$(this).attr('id').split('_')[1];
			var tipopago=$("#tipo_"+idelemento).val();
			var monto=$("#txtcantidaddescuento_"+idelemento).val();

				var objeto={
					idcoach:id,
					tipopago:tipopago,
					monto:monto
				};
			    porcentajescoachs.push(objeto);

		});

		$(".from").each(function(){
			var valor=$(this).val();
			periodoinicial.push(valor);
			
		});
		$(".to").each(function(){
			var valor=$(this).val();
			periodofinal.push(valor);
		 });

		var descuentos=[];
		var membresias=[];
		var encuestas=[];
		$(".chkdescuento").each(function(){
			var valor=$(this).attr('id');
			var id=valor.split('_')[1];
			if ($("#"+valor).is(':checked')) {
				descuentos.push(id);
			}
		});

		$(".chkmembresia").each(function(){
			var valor=$(this).attr('id');
			var id=valor.split('_')[1];
			if ($("#"+valor).is(':checked')) {
				membresias.push(id);
			}
		});

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

		var v_tiempoaviso=$("#v_tiempoaviso").val();
		var v_tituloaviso=$("#v_tituloaviso").val();
		var v_descripcionaviso=$("#v_descripcionaviso").val();

		var v_politicascancelacion=$("#v_politicascancelacion").val();
		var v_politicasaceptacion=$("#v_politicasaceptacion").val();
		var v_reembolso=$("#v_reembolso").is(':checked')?1:0;

		
		var v_asistencia=$("#v_asistencia").is(':checked')?1:0;

		var v_cantidadreembolso=$("#v_cantidadreembolso").val();
		var v_tiporeembolso=$("#v_tipodescuentoreembolso").val();
		
		var v_asignadocliente=$("#v_asignadocliente").is(':checked')?1:0;
		var v_asignadocoach=$("#v_asignadocoach").is(':checked')?1:0;
		var v_asignadoadmin=$("#v_asignadoadmin").is(':checked')?1:0;

		if (horarioscomparacion.length>0) {
			ComprobacionHorarios();
		}
		

		const zonas = [...new Set(arraydiaseleccionados.map(bill => bill.idzona))];
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
		datos.append('zonas',zonas);
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
		datos.append('v_numparticipantesmax',v_numparticipantesmax);

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
		datos.append('v_descuentos',descuentos);
		datos.append('v_membresias',membresias);
		datos.append('v_encuestas',encuestas);
		datos.append('v_asistencia',v_asistencia);
		datos.append('porcentajescoachs',JSON.stringify(porcentajescoachs));

		var bandera1=1;
		if (nombre=='') {
			$("#lbltitulo").addClass('inputrequerido');
			bandera1=0;
		}

		if (descripcion=='') {
			$("#lbldescripcion").addClass('inputrequerido');
			bandera1=0;
		}


		if (categoria == 0) {

			$("#lbltiposervicio").addClass('inputrequerido');
			bandera1=0;
		}

		if (orden=='') {

			$("#lblorden").addClass('inputrequerido');
			bandera1=0;
		}

			
		if (bandera1==1) {

		seccion2=1;
		 //onclick="ActivarTab(this,'profile')"
		$("#profile-tab").attr('onclick','ActivarTab(this,"profile")');
		//document.getElementById("profile-tab").click();

		}else{
		seccion2=0;
		}


		var bandera2=1;
		var validar2=1;
		var cont=0;
		if($(".lbldomingo").hasClass('active')){

		 cont++;
		}
		if($(".lbllunes").hasClass('active')){

		  cont++;
		}
	    if($(".lblmartes").hasClass('active')){

		cont++;
		}
		 if($(".lblmiercoles").hasClass('active')){

		cont++;
		}
		 if($(".lbljueves").hasClass('active')){

		  cont++;
		}
		 if($(".lblviernes").hasClass('active')){

		  cont++;
		}
		 if($(".lblsabado").hasClass('active')){

		  cont++;
		}

		if ($("#v_categoriaservicio").val()==0) {
			validar2=0;
			bandera2=0;
			$("#lblcategoria").addClass('inputrequerido');
		}

		if (cont==0) {
			validar2=0;
			bandera2=0;
			$("#lbldias").addClass('inputrequerido');
		}
								
		if (bandera2==1) {

			seccion3=1;
									 //onclick="ActivarTab(this,'profile')"
			$("#contact-tab").attr('onclick','ActivarTab(this,"contact")');
									//document.getElementById("contact-tab").click();

		}else{
			seccion3=0;
		}

		var bandera3=1;
		//console.log(arraydiaseleccionados);

		if (arraydiaseleccionados.length>0) {
			seccion4=1;
						
			$("#costos-tab").attr('onclick','ActivarTab(this,"costos")');
		}else{
			seccion4=0;
			bandera3=0;
			$("#lblhorarios").addClass('inputrequerido');

		}
		var bandera4=1;
		if ($("#v_numparticipantesmin").val()=='') {
			bandera4=0;
		//$("#v_numparticipantesmin").addClass('inputrequerido');

		}

		if ($("#v_numparticipantesmax").val()=='') {
			bandera4=0;

		//$("#v_numparticipantesmax").addClass('inputrequerido');
	
		}
		
		if ($("#v_costo").val()=='') {

			bandera4=0;
	    	$("#lblcostounitario").addClass('inputrequerido');
	
		}

	
		if (periodoinicial.length==0) {
			bandera4=0;
	    	$("#lblperiodos").css('color','red');
			
		}

		for (var i = 0; i < periodoinicial.length; i++) {
			if (isValidDate(periodoinicial[i])==false) {
			bandera4=0;
	    	$("#lblperiodos").css('color','red');

			}
		}

		for (var i = 0; i < periodofinal.length; i++) {
			if (isValidDate(periodofinal[i])==false) {
			bandera4=0;
	    	$("#lblperiodos").css('color','red');

			}
		}

		if (modalidad==0) {

			$(".divmodo").addClass('inputrequerido');
			bandera4=0;
		}

		if (v_numparticipantes=='') {
			bandera4=0;
			$("#lblminimo").addClass('inputrequerido');
		}
		if (v_numparticipantesmax=='') {
			bandera4=0;
			$("#lblmaximo").addClass('inputrequerido');
		}

		if (bandera4==1) {

			seccion5=1;
									 //onclick="ActivarTab(this,'profile')"
			$("#aceptacion-tab").attr('onclick','ActivarTab(this,"aceptacion")');
									//document.getElementById("contact-tab").click();

		}else{
			seccion5=0;
		}


		var bandera5=1;
		var seccion6=0;
		if (v_politicasaceptacion=='') {

			$("#lbldescripcionaceptacionpolitica").addClass('inputrequerido');
			
			bandera5=0;
			
		}

		if (bandera5==1) {
			seccion6=1;
		}

		/*var bandera6=1;
		
		if (v_politicascancelacion=='') {

			$("#lbldescripcionpolitica").addClass('inputrequerido');
			bandera6=0;
			
		}*/



		if (seccion2==1 && seccion3==1 && seccion4==1 && seccion5==1 &&seccion6==1) {
			//document.getElementById("politicas-tab").click();


		}
	
		if (seccion2==1 && seccion3==1 && seccion4==1 && seccion5==1 && seccion6==0) {
			document.getElementById("aceptacion-tab").click();


		}
		if (seccion2==1 && seccion3==1 && seccion4==1 && seccion5==0 && seccion6==0) {
			document.getElementById("costos-tab").click();


		}

		if (seccion2==1 &&seccion3==1 && seccion4==0 && seccion5==0 && seccion6==0) {
			document.getElementById("contact-tab").click();

		}

		if (seccion2==1 && seccion3==0 && seccion4==0 && seccion5==0 && seccion6==0) {
		document.getElementById("profile-tab").click();

		}
		
		// $('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Procesando...</div>')
				if (bandera1==1) {
		//setTimeout(function(){
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
							$("#id").val(resp[1]);

							


						   console.log("El resultado de msj es: "+msj);
						   if (bandera1==1 && bandera2==1 && bandera3==1 && bandera4==1 && bandera5==1) {
						   	if( resp[0] == 1 ){
						   		arraydiaselegidos=[];
								arraydiaseleccionados=[];
								aparecermodulos(regresar+"?ac=1&idmenumodulo="+idmenumodulo+"&msj=Operacion realizada con exito",donde);
						 	
								//aqui

								
						 	 }else{
								aparecermodulos(regresar+"?ac=0&idmenumodulo="+idmenumodulo+"&msj=Error. "+msj,donde);
						  	}
						   }
						 	/*if( resp[0] == 1 ){
								aparecermodulos(regresar+"?ac=1&idmenumodulo="+idmenumodulo+"&msj=Operacion realizada con exito",donde);
						 	 }else{
								aparecermodulos(regresar+"?ac=0&idmenumodulo="+idmenumodulo+"&msj=Error. "+msj,donde);
						  	}*/			
					  	}
				  });				  					  
		/*},1000);*/

		//}
	 }
}

function Colocardescripcion() {
	var v_titulo=$("#v_titulo").val();
	$("#v_descripcion").val(v_titulo);
}

function CambiarNumeros() {

	var numero=$("#v_costo").val();
		console.log(numero);
	var resultado=formato_numero(numero,2,'.',','); 

	$("#v_costo").val(resultado);
}

function Permitirligar() {
	if ($("#v_ligarclientes").is(':checked')) {
		$("#cantidadligar").css('display','block');
		}else{
		$("#cantidadligar").css('display','none');
	}
}

function HabilitarcantidadReembolso() {
	if ($("#v_reembolso").is(':checked')) {
		$(".divcantidadreembolso").css('display','block');
		}else{
		$(".divcantidadreembolso").css('display','none');
	}
}



function PintarFechasCalendario(fechas) {

	
	for (var i = 0; i <fechas.length; i++) {
		var dividirfecha=fechas[i].fecha.split('-');
		var nuevafecha=dividirfecha[0]+'-'+parseInt(dividirfecha[1])+'-'+parseInt(dividirfecha[2]);
					
		$(".fecha_"+nuevafecha).css('background','#cecece');	 
		$(".fecha_"+nuevafecha).css('border','0');	 

	}
}

function AgregarNuevoCoach() {


	var valorcoach=[];
	 $(".nombrecoach" ).each(function( index ) {
       var valor=$(this).val(); 
       valorcoach.push(valor);    
  	});
	
	VerificarSihayCoach().then(r => {
	contadorcoach=parseFloat($(".multiplecoach").length)+1;

		tabindex=parseFloat(6)+parseFloat(contadorcoach);

if (r.length>valorcoach.length) {
	var html=`
			<div class="row multiplecoach" id="contadorcoach_`+contadorcoach+`" style=" background: #dee1e4;border-radius: 10px;padding: 1em;margin-bottom:1em;">
	
										<div class="col-md-4">
											<label>COACH</label>
											<select name=""  class="form-control nombrecoach" id="nombrecoach_`+contadorcoach+`" style="padding-top:1em;" class="form-control">`;

										for (var i = 0; i <r.length; i++) {

												var encontrado=0;
												for (var j = 0; j < valorcoach.length; j++) {
													if(r[i].idusuarios=valorcoach[j]){

														encontrado=1;
														break;
													}
												}
												if (encontrado==0) {

													html+=`<option value="`+r[i].idusuarios+`">`+r[i].nombre+` `+r[i].paterno+` `+r[i].materno+`</option>`;
		
												}

											}

										html+=`</select> 

										</div>

										<div class="col-md-2">
											<label>PAGO</label>
											<select name=""  class="form-control tipo" id="tipo_`+contadorcoach+`" style="padding-top:1em;" class="form-control">
											<option value="0">PORCENTAJE</option>
											<option value="1">MONTO</option>
											</select> 

										</div>

										<div class="col-md-2">
										<label for="from">CANTIDAD</label>
											<input type="number" id="txtcantidaddescuento_`+contadorcoach+`" class="form-control monto" name="monto">

										</div>


									<div class="col-md-1" style="text-align:right;">
										<button type="button"  style="margin-top: 2em;" onclick="EliminarCoah(`+contadorcoach+`)" class="btn btn_rojo"><i class="mdi mdi-delete-empty"></i></button>


									</div>
										</div>

									</div>

						
								</div>
							

					</div>
					

	`;


	$("#listadocoaches").append(html);
	}else{


		alert('El límite de los coaches registrados es de'+r.length);
	}
	});
		//Obtenerparentescomultiple(contadormultipleparentesco);
		//ObtenerSelectCoachs(contadorcoach);
}

function EliminarCoah(contador) {

	$("#contadorcoach_"+contador).remove();
}

function ObtenerSelectCoachs(contador) {

	
			$.ajax({
					url: 'catalogos/servicios/ObtenerCoachs.php', //Url a donde la enviaremos
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
						if (respuesta.length>0) {
							ColocarCoach(respuesta,contador);
						}
						

					}
				});

}

function ColocarCoach(respuesta,contador) {
	var html="";
	if (respuesta.length>0) {

		for (var i = 0; i <respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].idusuarios+`">`+respuesta[i].nombre+` `+respuesta[i].paterno+` `+respuesta[i].materno+`</option>>`;
		}
	}

	$("#nombrecoach_"+contador).html(html);
}

function VerificarSihayCoach() {
	 return new Promise(function(resolve, reject) {

	 		$.ajax({
					url: 'catalogos/servicios/ObtenerCoachs.php', //Url a donde la enviaremos
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
						var contador=0;
						if (respuesta.length>0) {
							contador=respuesta.length;
						}
						resolve(respuesta);
						

					}
				});


	 });
}

function AgregarNuevoCoach2(idusuarios,tipo,monto) {


	var valorcoach=[];
	 $(".nombrecoach" ).each(function( index ) {
       var valor=$(this).val(); 
       valorcoach.push(valor);    
  	});
	
	VerificarSihayCoach().then(r => {
	contadorcoach=parseFloat($(".multiplecoach").length)+1;

		tabindex=parseFloat(6)+parseFloat(contadorcoach);

	var html=`
			<div class="row multiplecoach" id="contadorcoach_`+contadorcoach+`" style=" background: #dee1e4;border-radius: 10px;padding: 1em;margin-bottom:1em;">
	
										<div class="col-md-4">
											<label>COACH</label>
											<select name=""  class="form-control nombrecoach" id="nombrecoach_`+contadorcoach+`" style="padding-top:1em;" class="form-control">`;

										for (var i = 0; i <r.length; i++) {

												var encontrado=0;
												for (var j = 0; j < valorcoach.length; j++) {
													if(r[i].idusuarios=valorcoach[j]){

														encontrado=1;
														break;
													}
												}
												if (encontrado==0) {

													html+=`<option value="`+r[i].idusuarios+`">`+r[i].nombre+` `+r[i].paterno+` `+r[i].materno+`</option>`;
		
												}

											}

										html+=`</select> 

										</div>

										<div class="col-md-2">
											<label>PAGO</label>
											<select name=""  class="form-control tipo" id="tipo_`+contadorcoach+`" style="padding-top:1em;" class="form-control">
											<option value="0">PORCENTAJE</option>
											<option value="1">MONTO</option>
											</select> 

										</div>

										<div class="col-md-2">
										<label for="from">CANTIDAD</label>
											<input type="number" id="txtcantidaddescuento_`+contadorcoach+`" class="form-control monto" name="monto">

										</div>


									<div class="col-md-1" style="text-align:right;">
										<button type="button"  style="margin-top: 2em;" onclick="EliminarCoah(`+contadorcoach+`)" class="btn btn_rojo"><i class="mdi mdi-delete-empty"></i></button>


									</div>
										</div>

									</div>

						
								</div>
							

					</div>
					

	`;


	$("#listadocoaches").append(html);
	$("#nombrecoach_"+contadorcoach).val(idusuarios);
	$("#tipo_"+contadorcoach).val(tipo);
	$("#txtcantidaddescuento_"+contadorcoach).val(monto);


	
	});
		//Obtenerparentescomultiple(contadormultipleparentesco);
		//ObtenerSelectCoachs(contadorcoach);
}


function AbrirModalClonarServicio(idservicio,campo,tabla,valor,regresar,donde,idmenumodulo,titulo) {
	


		$("#modalclonado").modal();
		$("#tituloclonado").html('CLONAR SERVICIO '+titulo);
		$("#txttituloclonado").val('COPIA '+titulo);
		$("#clonadoservicio").attr('onclick','Siguiente1('+idservicio+',"'+campo+'","'+tabla+'","'+valor+'","'+regresar+'","'+donde+'","'+idmenumodulo+'")');
		$("#divclonado1").css('display','block');
	
		$("#divclonado2").css('display','none');
		$("#divclonado3").css('display','none');
		arraydiaselegidos=[];
		arraydiaseleccionados=[];
		$("#clonadoservicio").text('SIGUIENTE');
		$("#v_fechainicial").val('');
		$("#v_fechafinal").val('');
		$(".myc-day-time-container").html();


	}
function Siguiente1(idservicio,campo,tabla,valor,regresar,donde,idmenumodulo) {
	
	var general=$("#v_general").is(':checked')?1:0;
	var costos=$("#v_costos").is(':checked')?1:0;
	var v_politicasmensajes=$("#v_politicasmensajes").is(':checked')?1:0;
	var v_reglas=$("#v_costos").is(':checked')?1:0;
	var v_coachs=$("#v_coachs").is(':checked')?1:0;

	var datos="general="+general+"&costos="+costos+"&v_politicasmensajes="+v_politicasmensajes+"&v_reglas="+v_reglas+"&v_coachs="+v_coachs+"&idservicio="+idservicio;


	$.ajax({
				url: 'catalogos/servicios/ObtenerServicio.php', //Url a donde la enviaremos
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

						$("#divclonado1").css('display','none');
						$("#divclonado2").css('display','block');
						
							var respuesta=msj.respuesta[0];
							$("#v_categoria").val(respuesta.idcategoriaservicio);
							$("#v_categoriaservicio").val(respuesta.idcategoria);
							var lunes=respuesta.lunes;
							var martes=respuesta.martes;
							var miercoles=respuesta.miercoles;
							var jueves=respuesta.jueves;
							var viernes=respuesta.viernes;
							var sabado=respuesta.sabado;
							var domingo=respuesta.domingo;
							$(".lbllunes").removeClass('active');
							$(".lblmartes").removeClass('active');
							$(".lblmiercoles").removeClass('active');
							$(".lbljueves").removeClass('active');
							$(".lblviernes").removeClass('active');
							$(".lblsabado").removeClass('active');
							$(".lbldomingo").removeClass('active');

						
								if (lunes==1) {
									//$("#Lunes").attr('checked',true);
									$(".lbllunes").addClass('active');
								}
								if (martes==1) {
									//$("#Martes").attr('checked',true);
									$(".lblmartes").addClass('active');
								}
								if (miercoles==1) {
									//$("#Miercoles").attr('checked',true);
									$(".lblmiercoles").addClass('active');

								}
								if (jueves==1) {
									//$("#Jueves").attr('checked',true);
									$(".lbljueves").addClass('active');

								}
								if (viernes==1) {
									//$("#Viernes").attr('checked',true);
									$(".lblviernes").addClass('active');

								}
								if (sabado==1) {
									//$("#Sabado").attr('checked',true);
									$(".lblsabado").addClass('active');

								}
								if (domingo==1) {
									//$("#Domingo").attr('checked',true);
									$(".lbldomingo").addClass('active');

								}

								$("#clonadoservicio").attr('onclick','Siguiente2('+idservicio+',"'+campo+'","'+tabla+'","'+valor+'","'+regresar+'","'+donde+'","'+idmenumodulo+'")');


					}
				});
}


function Siguiente2(idservicio,campo,tabla,valor,regresar,donde,idmenumodulo) {
	$("#divclonado2").css('display','none');
    $("#divclonado3").css('display','block');

    ObtenerAlumnosServicios(idservicio);
	$("#clonadoservicio").attr('onclick','GuardarClonado('+idservicio+',"'+campo+'","'+tabla+'","'+valor+'","'+regresar+'","'+donde+'","'+idmenumodulo+'")');
	$("#clonadoservicio").text('GUARDAR');
}

function ObtenerAlumnosServicios(idservicio) {
		var datos="idservicio="+idservicio;
		$.ajax({
					url: 'catalogos/servicios/ObtenerAlumnos.php', //Url a donde la enviaremos
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
						var asignados=msj.asignados;

						PintarAlumnosNoAsignados(respuesta);
						PintarUsuariosAsignados(asignados);


				        $('#btnRight').click(function (e) {
				            $('select').moveToListAndDelete('#lstBox1', '#lstBox2');
				            e.preventDefault();
				        });

				        $('#btnAllRight').click(function (e) {
				            $('select').moveAllToListAndDelete('#lstBox1', '#lstBox2');
				            e.preventDefault();
				        });

				        $('#btnLeft').click(function (e) {
				           var opts = $('#lstBox2' + ' option:selected');
				           $('select').moveToListAndDelete('#lstBox2', '#lstBox1');
				 
				            e.preventDefault();
				        });

				        $('#btnAllLeft').click(function (e) {
				            $('select').moveAllToListAndDelete('#lstBox2', '#lstBox1');
				            e.preventDefault();
				        });
					}
				});
}
function PintarAlumnosNoAsignados(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i < respuesta.length; i++) {
		html+=`
			<option value="`+respuesta[i].idusuarios+`">`+respuesta[i].nombre+` `+respuesta[i].paterno+` `+respuesta[i].materno+`</option>
		`;	

		}
	}
	$("#lstBox1").html(html);

}

function PintarUsuariosAsignados(respuesta) {
	var html="";
	if (respuesta.length>0) {

		for (var i = 0; i < respuesta.length; i++) {
		console.log(respuesta[i].idusuarios);
		html+=`
			<option value= "`+respuesta[i].idusuarios+`">`+respuesta[i].nombre +` `+respuesta[i].paterno+` `+respuesta[i].materno+`</option>
		`;	

		}
	}
	$("#lstBox2").html(html);
}

function GuardarClonado(idservicio,campo,tabla,valor,regresar,donde,idmenumodulo) {
	var general=$("#v_general").is(':checked')?1:0;
	var costos=$("#v_costos").is(':checked')?1:0;
	var v_politicasmensajes=$("#v_politicasmensajes").is(':checked')?1:0;
	var v_reglas=$("#v_costos").is(':checked')?1:0;
	var v_coachs=$("#v_coachs").is(':checked')?1:0;


	var titulonuevo=$("#txttituloclonado").val();
	var idalumnos=[];
	 $("#lstBox2 option").each(function(){
       idalumnos.push($(this).val());
     });

     var domingo=0,lunes=0,martes=0,miercoles=0,jueves=0,Viernes=0,sabado=0;
		if($(".lbldomingo").hasClass('active')){

		 domingo=1;
		}
		 if($(".lbllunes").hasClass('active')){

		 lunes=1;
		}
		 if($(".lblmartes").hasClass('active')){

		 martes=1;
		}
		 if($(".lblmiercoles").hasClass('active')){

		 miercoles=1;
		}
		 if($(".lbljueves").hasClass('active')){

		 jueves=1;
		}
		 if($(".lblviernes").hasClass('active')){

		 Viernes=1;
		}
		 if($(".lblsabado").hasClass('active')){

		 sabado=1;
		}	

	var fechainicial=$("#v_fechainicial").val();
	var fechafinal=$("#v_fechafinal").val();

	var datos="titulonuevo="+titulonuevo+"&general="+general+"&costos="+costos+"&v_politicasmensajes="+v_politicasmensajes+"&v_reglas="+v_reglas+"&v_coachs="+v_coachs+"&idservicio="+idservicio+"&v_arraydiaselegidos="+arraydiaselegidos+"&idalumnos="+idalumnos;
	datos+="&v_sabado="+sabado+"&v_viernes="+Viernes+"&v_jueves="+jueves+"&v_miercoles="+miercoles+"&v_martes="+martes+"&v_lunes="+lunes+"&v_domingo="+domingo;
	datos+="&v_fechainicial="+fechainicial+"&v_fechafinal="+fechafinal;
	VerificariondeAlumnosConHorarios(datos).then(r => {

		if (r.usuariosnoagregados.length==0) {

			GuardarServicioClonado(datos,campo,tabla,valor,regresar,donde,idmenumodulo);
		


			}else{

		 var respuesta=r.respuesta;
		 var usuariosnoagregados=r.usuariosnoagregados;

		 if (usuariosnoagregados.length>0) {
		 		var html="";
		 			for (var i = 0; i <usuariosnoagregados.length; i++) {
		 				html+=`<span>
		 				El usuario `+usuariosnoagregados[i].nombre +' '+usuariosnoagregados[i].paterno+` `+usuariosnoagregados[i].materno+`
		 				no puede ser asignado a este servicio debido a que pertenece a otro servicio en el mismo horario

		 				</span>`;

		 				var serviciosasignados=usuariosnoagregados[i].servicioscruzados;
		 				for (var j =0; j < serviciosasignados.length; j++) {
		 					html+=`<p>`+serviciosasignados[j].titulo+`</p>`
		 				}
		 				html+=`</br>`;


		 			}


			AbrirNotificacion(""+html,"mdi-checkbox-marked-circle ")

		 }


		}


	});


}

function VerificariondeAlumnosConHorarios(datos){

	 return new Promise((resolve, reject) => {
	 	
	 		$.ajax({
					url: 'catalogos/servicios/VerificarAsignacionHorarios.php', //Url a donde la enviaremos
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
						
						resolve(msj);

					}
				});

	 });
}

function GuardarServicioClonado(datos,campo,tabla,valor,regresar,donde,idmenumodulo,titulo) {

	$.ajax({
					url: 'catalogos/servicios/GuardarServicioClonado.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					data:datos,
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {
						var resp=msj.split('|');

						  	if(resp[0] == 1 ){

						  		$("#modalclonado").modal('hide');
						  		$(".modal-backdrop").removeClass('show');
						  		$(".modal-backdrop").remove();
								aparecermodulos(regresar+"?ac=1&idmenumodulo="+idmenumodulo+"&msj=Operacion realizada con exito",donde);
						 	
								arraydiaselegidos=[];
								arraydiaseleccionados=[];

							}
						

					}
				});
}


function ObtenerTipoServicios2() {

	  $.ajax({
        type: 'POST',
        dataType: 'json',
		url: 'catalogos/servicios/ObtenerTipoServicios.php', //Url a donde la enviaremos
        async: false,
        success: function (resp) {
           
        	var res=resp.respuesta;
        	PintarTipoServicios(res);

        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe " + pagina + " " + XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
            //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
            console.log("Error leyendo fichero jsonP " + d_json + pagina + " " + error, "ERROR");
        }
    });
}
function PintarTipoServicios(respuesta) {
	var html="";
		html+=`<option value="-1">Seleccionar formato de servicio</option>`;

	if (respuesta.length>0) {
		html+=`<option value="0">TODOS</option>`;

		for (var i = 0; i <respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].idcategorias+`">`+respuesta[i].titulo+`</option>`;
		}

		$("#v_categoria").html(html);

	}
}


function ObtenerCoachs() {
	
	  $.ajax({
        type: 'POST',
        dataType: 'json',
		url: 'catalogos/servicios/ObtenerCoachs.php', //Url a donde la enviaremos
        async: false,
        success: function (resp) {
           
        	var res=resp.respuesta;
        	PintarCoachs(res);

        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe " + pagina + " " + XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
            //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
            console.log("Error leyendo fichero jsonP " + d_json + pagina + " " + error, "ERROR");
        }
    });
}

function PintarCoachs(respuesta) {
	var html="";
	html+=`<option value="-2">Seleccionar coach</option>`;
	html+=`<option value="t">TODOS</option>`;

	html+=`<option value="0">Sin Coach</option>`;

	if (respuesta.length>0) {
			for (var i = 0; i <respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].idusuarios+`">`+respuesta[i].nombre+` `+respuesta[i].paterno+` `+respuesta[i].materno+`</option>`;
		}
	}

	$("#v_coach").html(html);

}

function FiltrarServicios(idmenumodulo) {
	var tiposervicio=$("#v_categoria").val();
	var coach=$("#v_coach").val();
	var datos="tiposervicio="+tiposervicio+"&coach="+coach+"&idmenumodulo="+idmenumodulo;
	var bandera=1;
	if (tiposervicio==-1 || coach==-1) {
		bandera=0;
	}
	
	if (bandera==1) {
	$(".divservicios").css('display','block');

	 $.ajax({
        type: 'POST',
		url: 'catalogos/servicios/ObtenerServiciosFiltrado.php', //Url a donde la enviaremos
        async: false,
        data:datos,
        success: function (resp) {
        	PintarServiciosFiltrado(resp);

        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var error;
            if (XMLHttpRequest.status === 404) error = "Pagina no existe " + pagina + " " + XMLHttpRequest.status;// display some page not found error 
            if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
            //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
            console.log("Error leyendo fichero jsonP " + d_json + pagina + " " + error, "ERROR");
        }
    });
	}
}

function PintarServiciosFiltrado(resultado) {

	$("#tblservicios").html(resultado);
	 $('#tbl_Servicios').DataTable();
}

function AbrirModalUsuarios(idservicio) {
	$("#modalAlumnosServicios").modal();
	var datos="idservicio="+idservicio;
		$.ajax({
					url: 'catalogos/servicios/ObtenerAlumnosServicio.php', //Url a donde la enviaremos
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
						var respuesta=msj.asignados;
						
				     	PintarAlumnosServicios(respuesta);
					}
				});
}

function PintarAlumnosServicios(respuesta) {
	var html="";
	if (respuesta.length) {
		for (var i = 0; i < respuesta.length; i++) {
			var pagado="";
			if (respuesta[i].pagado==1) {
				pagado=`<span class="badge badge-success">Pagado</span>`;
			}else{
				pagado=`<span class="badge badge-danger">Pendiente</span>`;
			}


			html+=`<tr>
				<td>`+respuesta[i].nombre+` `+respuesta[i].paterno+` `+respuesta[i].materno+`</td>
				<td>`+pagado+`</td>
				</tr>
			`;
		}
	}

	$("#usuariosinscritos").html(html);
}

function VerificarSihaypago(idservicio) {
	var datos="idservicio="+idservicio;
		$.ajax({
					url: 'catalogos/servicios/VerificarSihaypago.php', //Url a donde la enviaremos
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
						var existepago=msj.existepago;

						if (existepago==1) {

							$("#v_costo").attr('disabled',true);
						}
					}
				});
}

function ObtenerHorariosServicioComprobacion(idservicio) {
	var datos="idservicio="+idservicio;


		$.ajax({
					url: 'catalogos/servicios/ObtenerHorariosSemana.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					data:datos,
					dataType:'json',
					async:false,
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {

						var horarios=msj.respuesta;
						horarioscomparacion=horarios;

					}
				});
}

function ComprobacionHorarios() {
 return new Promise(function(resolve, reject) {
	var datos="horarioscomparacion="+JSON.stringify(horarioscomparacion)+"&arraydiaseleccionados="+JSON.stringify(arraydiaseleccionados)+"&idservicio="+idservicio;
	
	$.ajax({
					url: 'catalogos/servicios/ObtenerComparacion.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
					data:datos,
					dataType:'json',
					async:false,
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						var error;
						console.log(XMLHttpRequest);
						if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
						if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
						$("#divcomplementos").html(error);
					},	
					success: function (msj) {

					resolve(msj);

					}
				});
	});
}

function AbrirModalImagenes(idservicio) {
  
	$("#modalimagenservicio").modal();  
	$(".vfileNames").html("");
	$("#idservicio").val(idservicio);
	ListadoImagenesInformativas(idservicio);
	VerListadoImagenes();

}


function ListadoImagenesInformativas(idservicio) {
   var idservicio= $("#idservicio").val();
    var datos="idservicio="+idservicio;
    $("#vfileNames").html("");
        $.ajax({
     type: 'post',
        url: 'catalogos/servicios/ObtenerImagenesInformativas.php',
        data:datos,
        dataType: "json",
        success: function(vresponse, vtextStatus, vjqXHR){
                

              var vattachedFiles=vresponse.imagenes;
              var codigo=vresponse.codigo;
              var html=`<table class="table">
                <thead>
                  <tr>
                 
                    <th scope="col">TITULO</th>

                    <th scope="col">IMAGEN</th>

                    <th scope="col">ACCIÓN</th>
                   
                  </tr>
                </thead>
                <tbody>`;

                if (vattachedFiles.length>0) {
                  
                  for (var i =0;i < vattachedFiles.length; i++) {

                   
               html+=`<tr>
                      <td>`+vattachedFiles[i].tituloimagen+`</td>
                      <td scope="row">
                      <img style="width:50px;height:50px;" src="catalogos/servicios/imagenesinformativas/`+codigo+`/`+vattachedFiles[i].imagen+`" />
                      </td>
                     
                      <td><span style="cursor:pointer" onclick="deleteArchivo(`+ vattachedFiles[i].idimageninformativa +`,`+vattachedFiles[i].idservicio+`);" class="btn btn_rojo" style="font-size:16px;"><span class="mdi mdi-delete-empty"></span></span></td>
                    </tr>`;
                  }

                }
                 
                 
               html+= `</tbody>
              </table>`;


                $(".vfileNames").html(html);
            
    },
    error: function(vjqXHR, vtextStatus, verrorThrown){
            alert(verrorThrown, vtitle, 0);
    }
  });   



 
}


 function SubirImagenservicioInformativa() {
	 	// body...
	 
        var formData = new FormData();
        var files = $('#imageninformativa')[0].files[0];
        formData.append('file',files);
        $.ajax({
            url: 'catalogos/servicios/uploadImagenInformativa.php',
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
             beforeSend: function() {
         $("#d_foto").css('display','block');
     	 $("#d_foto").html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Cargando...</div>');	

		    },
            success: function(response) {
               	var ruta='<?php echo $ruta; ?>';
	
                if (response != 0) {
                    $(".card-img-top").attr("src", response);
                    $("#d_foto").css('display','none');
                } else {

                	 $("#d_imageninformativa").html('<img src="'+ruta+'" class="card-img-top" alt="" style="border: 1px #777 solid"/> ');
                    alert('Formato de imagen incorrecto.');
                }
            }
        });
        return false;
    }

    function NuevaImagen() {
    	$(".vfileNames").css('display','none');
    	$("#btnnuevaimagen").css('display','none');
    	$(".formimagen").css('display','block');
    	$(".btnguadarimagen").css('display','block');
    	$(".btnguadarimagen").attr('onclick','GuardarImagenInformativa()');
    }

    function VerListadoImagenes() {
    	$(".vfileNames").css('display','block');
    	$("#btnnuevaimagen").css('display','block');
    	$(".formimagen").css('display','none');
    	$(".btnguadarimagen").css('display','none');
    	$(".btnguadarimagen").attr('onclick','');
    }


    function GuardarImagenInformativa() {
    	var datos = new FormData();

		var archivos = document.getElementById("imageninformativa"); //Damos el valor del input tipo file
		var archivo = archivos.files; //Obtenemos el valor del input (los arcchivos) en modo de arreglo
		for (i = 0; i < archivo.length; i++) {
			datos.append('archivo' + i, archivo[i]);
		}
		var titulo=$("#txttituloimagen").val();
		var idservicio=$("#idservicio").val();
		datos.append('v_titulo',titulo);
		datos.append('v_idservicio',idservicio);
		$.ajax({
            url: 'catalogos/servicios/GuardarImagenInformativa.php',
            type: 'post',
            data: datos,
            contentType: false,
            processData: false,
            dataType:'json',
             beforeSend: function() {
      
		    },
            success: function(response) {
              
              var res=response.respuesta;

              if (res==1) {
              	$(".card-img-top").attr('src','');
              	VerListadoImagenes();
              	ListadoImagenesInformativas(idservicio);
              }
            },
		    error: function(vjqXHR, vtextStatus, verrorThrown){
		            alert(verrorThrown, vtitle, 0);
		    }
        });

    }



function deleteArchivo(idimageninformativa,idservicio) {

  var datos='idimageninformativa='+idimageninformativa+"&idservicio="+idservicio;


          var r = confirm("¿Está seguro que desea eliminar la imagen?.");
          if (r == true) {
             
               setTimeout(function () {
                    $.ajax({
                      url: 'catalogos/servicios/eliminarimagen.php', //Url a donde la enviaremos
                      type: 'post', //Metodo que usaremos
                      data:datos,
                        async:false,

                      error: function (XMLHttpRequest, textStatus, errorThrown) {
                        var error;
                        console.log(XMLHttpRequest);
                        if (XMLHttpRequest.status === 404) error = "Pagina no existe" + XMLHttpRequest.status; // display some page not found error 
                        if (XMLHttpRequest.status === 500) error = "Error del Servidor" + XMLHttpRequest.status; // display some server error 
                        $("#contenedor_insumos").html(error);
                      },
                      success: function (msj) {
                        

                        ListadoImagenesInformativas(idservicio);
                      }
                    });
                }, 100);

          } 

  
}


   function deleteAttachedFile(vfileName)
     {
        //Purpose: It deletes attached file.
        //Limitations: The end user must accept the deleting attached file.
        //Returns: None.
        
        var vacceptFunctionName=";";
        var vcancelFunctionName="cancelAttachedFileRemoval();";
        var vmessage="¿Está seguro que desea eliminar el archivo adjuntado?.";
        var vtitle="Eliminación de Archivo Adjuntado.";
        
    
      /*  alertify.confirm(vtitle, vmessage, function(){ //alertify.success('Ok');
          deleteAttachedFileData(vfileName); }
                , function(){ alertify.error('Cancel')});*/



        var txt;
          var r = confirm("¿Está seguro que desea eliminar el archivo adjuntado?.");
          if (r == true) {
             deleteAttachedFileData(vfileName);
          } else {
          
          }


     }

 function deleteAttachedFileData(vfileName)
 {
    //Purpose: It deletes attached file data.
    //Limitations: The attached file data must exist in database server and brought by service rest (attachFiles/:vfileName).
    //Returns: None.
    
    var vtitle="Eliminación de Archivo Adjuntado.";
   /* vconfirmDeleteAttachedFile.remove();
    toastr.clear(vconfirmDeleteAttachedFile, { force: true });*/
    
  $.ajax({
     type: 'post',
        url: 'catalogos/productos/eliminarimagen.php',
        data:{vfileName:vfileName},
    dataType: "json",
        success: function(vresponse, vtextStatus, vjqXHR){
            switch(vresponse.messageNumber){
                case -100: alert("Ocurrió un error al tratar de eliminar el archivo adjuntado, intente de nuevo.");
                           break;
                case -1:   alert("Imposible eliminar el archivo adjuntado, no existe.");
                           break;     
                case 0:    toastrAlert("Imposible eliminar el archivo, intente de nuevo.", vtitle, 3);
                           break;
                case 1:    var vattachedFileIndex=getAttachedFileIndexOnList(vfileName);
                        console.log(vattachedFileIndex);
                           if ( vattachedFileIndex>=0){
                             vattachedFiles.splice(vattachedFileIndex,1);
                           }
                           $(".vfileNames").html("");
                           showAttachedFiles();
                          
                           // alertify.alert('El archivo adjuntado ha sido eliminado correctamente.!');
                           alert('El archivo adjuntado ha sido eliminado correctamente.');
                           break; 
            }
    },
    error: function(vjqXHR, vtextStatus, verrorThrown){
            toastrAlert(verrorThrown, vtitle, 0);
    }
  });   
 }


 function getAttachedFileIndexOnList(vfileName)
 {

    
    var vattachedFileIndex=-1;
    for (var vi=0; vi<vattachedFiles.length; vi++){
        if (vfileName==vattachedFiles[vi]){
            vattachedFileIndex=vi;
            vi=vattachedFiles.length;
        }
    }
    
    return vattachedFileIndex;
 }
