// JavaScript Document
	
function Buscar_categorias(idmenumodulo)
{
	var id = $('#b_id').val();
	var nombre = $('#b_nombre').val();
	var empresa = $('#b_empresa').val();

	
	var datos = "idcategoria="+id+"&nombre="+nombre+"&empresa="+empresa+"&idmenumodulo="+idmenumodulo;
	
	//console.log(datos);

	/*cerrar_filtro('modal-filtros');
	$('#modal-filtros').modal('hide');
	*/
	$("#contenedor_empresas").html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Cargando...</div>');	
	
		
				  $.ajax({
					  url:'catalogos/categorias/li_categoriasproductos.php', //Url a donde la enviaremos
					type:'GET', //Metodo que usaremos
					data: datos, //Le pasamos el objeto que creamos con los archivos
					error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $("#contenedor_empresas").html(error); 
					  },
					success:function(msj){
					      $("#contenedor_empresas").html(msj); 	  
					  	}
				  });				  					  
			
}


function GuardarCategorias(form,regresar,donde,idmenumodulo)
{
	if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
	{			
		//recibimos todos los datos..
		var nombre =$("#v_nombre").val();
		var depende=$("#v_depende").val();
		var orden=$("#v_orden").val();
		var estatus=$("#v_estatus").val();
		var v_cantidadparticipantes=$("#v_cantidadparticipantes").val();
		var v_numerodias=$("#v_numerodias").val();
		v_activarhorarios=0;
		v_zonas=0;
		v_participantes=0;
		v_coachs=0;
 		
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

		
	

		var v_habilitarcostos=$("#v_habilitarcostos").is(':checked')?1:0;
		var v_habilitarmodalidad=$("#v_habilitarmodalidad").is(':checked')?1:0;
		var v_habilitarcampototalclases=$("#v_habilitarcampototalclases").is(':checked')?1:0;
		var v_habilitarcampopreciounitario=$("#v_habilitarcampopreciounitario").is(':checked')?1:0;
		var v_habilitarcampomontoparticipante=$("#v_habilitarcampomontoparticipante").is(':checked')?1:0;
		var v_habilitarcampomontogrupo=$("#v_habilitarcampomontogrupo").is(':checked')?1:0;
		var v_habilitarmodalidadpago=$("#v_habilitarmodalidadpago").is(':checked')?1:0;
		var v_activaravanzado=$("#v_activaravanzado").is(':checked')?1:0;
		var v_activarcategoria=$("#v_activarcategoria").is(':checked')?1:0;
		var v_activardias=$("#v_activardias").is(':checked')?1:0;
		if($("#v_activarhorarios").is(':checked')){

			v_activarhorarios=1;
		}
		if($("#v_zonas").is(':checked')){

			v_zonas=1;
		}

		if($("#v_participantes").is(':checked')){

			v_participantes=1;
		}

		if ($("#v_coachs").is(':checked')) {
			v_coachs=1;
		}


		var id=$("#id").val();
		var data = new FormData();

		var archivos = document.getElementById("image"); //Damos el valor del input tipo file
		var archivo = archivos.files; //Obtenemos el valor del input (los arcchivos) en modo de arreglo
		console.log(archivo);

		//Como no sabemos cuantos archivos subira el usuario, iteramos la variable y al
		//objeto de FormData con el metodo "append" le pasamos calve/valor, usamos el indice "i" para
		//que no se repita, si no lo usamos solo tendra el valor de la ultima iteracion
		for (i = 0; i < archivo.length; i++) {
			data.append('archivo' + i, archivo[i]);
		}

		data.append('v_nombre',nombre);
		data.append('v_depende',depende);
		data.append('v_orden',orden);
		data.append('id',id);
		data.append('v_estatus',estatus);
		data.append('v_activarhorarios',v_activarhorarios);
		data.append('v_zonas',v_zonas);
		data.append('v_participantes',v_participantes);
		data.append('v_cantidadparticipantes',v_cantidadparticipantes);
		data.append('v_coachs',v_coachs);
		data.append('v_numerodias',v_numerodias);

		data.append('v_habilitarcostos',v_habilitarcostos);
		data.append('v_habilitarmodalidad',v_habilitarmodalidad);
		data.append('v_habilitarcampototalclases',v_habilitarcampototalclases);
		data.append('v_habilitarcampopreciounitario',v_habilitarcampopreciounitario);
		data.append('v_habilitarcampomontoparticipante',v_habilitarcampomontoparticipante);
		data.append('v_habilitarcampomontogrupo',v_habilitarcampomontogrupo);
		data.append('v_habilitarmodalidadpago',v_habilitarmodalidadpago);
		data.append('v_activaravanzado',v_activaravanzado);
		data.append('v_activarcategoria',v_activarcategoria);
		data.append('diasemana',diasemana);
		data.append('horainiciodia',horainicio);
		data.append('horafindia',horafin);
		data.append('v_activardias',v_activardias);

		 $('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Subiendo Archivos...</div>')
				
		setTimeout(function(){
				  $.ajax({
					  url:'catalogos/categorias/ga_categorias.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					contentType: false, //Debe estar en false para que pase el objeto sin procesar
					data: data, //Le pasamos el objeto que creamos con los archivos
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
								aparecermodulos(regresar+"?ac=1&idmenumodulo="+idmenumodulo+"&msj=Operacion realizada con exito&idempresas="+resp[1],donde);
						 	 }else{
								aparecermodulos(regresar+"?ac=0&idmenumodulo="+idmenumodulo+"&msj=Error. "+msj,donde);
						  	}			
					  	}
				  });				  					  
		},1000);
	 }
}

function BorrarCategoria(idcategoria,campo,tabla,valor,regresar,donde,idmenumodulo) {
	if(confirm("\u00BFEstas seguro de querer realizar esta operaci\u00f3n?"))
	{
var datos='idcategoria='+idcategoria;
	$.ajax({
		url:'catalogos/categorias/borrarCategoria.php', //Url a donde la enviaremos
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
				  aparecermodulos(regresar+"?ac=0&idmenumodulo="+idmenumodulo+"&msj=La categoría se encuentra relacionada con un servicio. "+msj,donde);
				}			
			}
	});
	}
}


function Subirimagencategoria(idcategoria) {
	
	$("#idcategoriasproducto").val(idcategoria);
	showAttachedFiles1(idcategoria);
	$("#modalimagencategoria").modal();
}

function PaquetesRelacion(idcategoria,nombre) {

	
	Obtenerpaquetescategorias(idcategoria,nombre);
}

function Obtenerpaquetescategorias(idcategoria,nombre) {

		var datos="id="+idcategoria;

	$.ajax({
					url:'catalogos/categorias/ga_productos.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					dataType:'json', //Debe estar en false para que pase el objeto sin procesar
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
							contador=0;
							$("#nombrecategoria").text(nombre);
							$("#modalpaquetes").modal();
							var paquetes=msj.respuesta;
							PintarPaquetescategoria(paquetes,idcategoria);
						
								
					  	}
				  });

	}

	function PintarPaquetescategoria(paquetes,idcategoria) {
		
		var html=``;

		if (paquetes.length>0) {


			for (var i =0; i < paquetes.length; i++) {

				var ruta=paquetes[i].ruta;
				var seleccionado=paquetes[i].visualizarcarrusel;
				checked="";
				if (seleccionado==1) {
					checked="checked";
				}
			html+=`
			<div class="col-md-3 colpaquetes1" id="colpaquetes_`+paquetes[i].idpaquete+`">
			<div class="card" style="width: 100%">
			  <img class="card-img-top" src="`+ruta+`" >
			  <div class="" style="padding-top:1em;">
			    <p class="paquetestexto" id="texto_`+paquetes[i].idpaquete+`"><input type="checkbox" onchange="SeleccionarPaquetes(`+paquetes[i].idpaquete+`)" class="paquetes" id="paquete_`+paquetes[i].idpaquete+`" `+checked+`> `+paquetes[i].nombrepaquete+`</p>

			  </div>
			</div>
			</div>

			`;
		}

			$("#btnguardarpc").css("display","block");
			$("#btnguardarpc").attr("onclick","GuardarPaquetesVisualizar("+idcategoria+")");

		}else{
 			
 			$("#btnguardarpc").css("display","block");

			$("#btnguardarpc").attr("onclick","");


		}
		

		$("#paquetecategoria").html(html);


	}

	function SeleccionarPaquetes(idpaquete) {
	
		var contador=0;
		$(".paquetes").each(function() {

			if ($(this).is(':checked')) {

				contador++;
			}
			  
			});

		
		if (contador<=15) {

			if ($("#paquete_"+idpaquete).is(':checked')) {

				//$("#paquete_"+idpaquete).prop("checked",false);

			}else{

				//$("#paquete_"+idpaquete).prop("checked",true);

			}
		}else{

			$("#paquete_"+idpaquete).prop("checked",false);


		}
	}

	function GuardarPaquetesVisualizar(idcategoria) {
	if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
	{
		var paquetes=[];
		$(".paquetes").each(function() {
			
				if ($(this).is(':checked')) {

					var id=$(this).attr('id');

					paquetes.push(id.split('_')[1]);
					
				}
			  
			});

		
			var datos="paquetes="+paquetes+"&idcategoria="+idcategoria;

			$.ajax({
					url:'catalogos/categorias/guardarpaquetes.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					dataType:'json', //Debe estar en false para que pase el objeto sin procesar
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

							if (msj.respuesta==1) {

								//$("#modalpaquetes").modal('hide');
								AbrirNotificacion("SE ACTUALIZARON LOS PAQUETES EN EL CARRUSEL","mdi-checkbox-marked-circle");
							}
								
					  	}
				  });

				}
	 
	}


	function Buscarpaquete() {

		var buscador=$("#buscarpaquete").val();
		var concidencia=[];
		var listadopaquetes=[];
		$(".paquetestexto").each(function() {
			var id =$(this).attr('id')
			listadopaquetes.push(id);

		});
	
		var i=0;

	if (buscador!='') {
		$(".paquetestexto").each(function() {

				cadena=$(this).text().toLowerCase();

				if (cadena.indexOf(buscador.toLowerCase())!=-1 ) {

				
		  					if (!BuscarEnarray(concidencia,listadopaquetes[i])) {

						  		concidencia.push(listadopaquetes[i]);
						  		
						  

						  	}

		  		}else{


		  					if (BuscarEnarray(concidencia,listadopaquetes[i])) {

		  						posicion=BuscarPosicion(concidencia,listadopaquetes[i]);

		  						concidencia.splice(posicion,posicion);


						  	}



		  		}
		  		i++;
			  
			});

	
			$(".colpaquetes1").css('display','none');
			for (var i = 0; i <concidencia.length; i++) {
				var id=concidencia[i].split('_')[1];

				$("#colpaquetes_"+id).css('display','block');
			}

		}else{

		$(".colpaquetes1").css('display','block');

		}
	}


	function BuscarEnarray(array,elemento) {
	
	for (var i = 0; i <array.length; i++) {
		
		if (array[i]==elemento) {
			return true;
			break;
		}
	}
}

function BuscarPosicion(array,elemento) {
	
	for (var i = 0; i <array.length; i++) {
		
		if (array[i]==elemento) {
			return i;
		}
	}
}
function Habilitarhorarios(argument) {
	
}
function Habilitarzonas(argument) {
	
}
function Habilitarparticipantes(argument) {
	
}

function HabilitarCostos() {
	if($("#v_habilitarcostos").is(':checked')){

		$("#divcostos").css('display','block');
	}else{
		$("#divcostos").css('display','none');

	}
}
function ActivarAvanzado() {
	if($("#v_activaravanzado").is(':checked')){

		$(".divavanzado").css('display','block');
	}else{

		$(".divavanzado").css('display','none');

	}
}


function ObtenerHorariosSemanaCategorias(idcategoria) {
	var datos="idcategoria="+idcategoria;


		$.ajax({
					url: 'catalogos/categorias/ObtenerHorariosSemana.php', //Url a donde la enviaremos
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
							PintarHorariosSemanaCategorias(horarios);
						}


					}
				});
}


function PintarHorariosSemanaCategorias(horarios) {

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
