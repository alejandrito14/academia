// JavaScript Document
	
function Buscar_Tiponegocios(idmenumodulo)
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
					  url:'catalogos/tiponegocios/li_tiponegocios.php', //Url a donde la enviaremos
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


function Guardartiponegocios(form,regresar,donde,idmenumodulo)
{
	if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
	{			
		//recibimos todos los datos..
		var nombre =$("#v_nombre").val();
		var orden=$("#v_orden").val();
		var estatus=$("#v_estatus").val();
		var id=$("#id").val();
		var data = new FormData();

		data.append('v_nombre',nombre);
		data.append('v_orden',orden);
		data.append('id',id);
		data.append('v_estatus',estatus);
		
		 $('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Subiendo Archivos...</div>')
				
		setTimeout(function(){
				  $.ajax({
					  url:'catalogos/tiponegocios/ga_tiponegocios.php', //Url a donde la enviaremos
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

function BorrarTiponegocio(idtiponegocio,campo,tabla,valor,regresar,donde,idmenumodulo) {
	if(confirm("\u00BFEstas seguro de querer realizar esta operaci\u00f3n?"))
	{
var datos='idtiponegocio='+idtiponegocio;
	$.ajax({
		url:'catalogos/tiponegocios/borrarTiponegocio.php', //Url a donde la enviaremos
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
	
	$("#idtiponegociosproducto").val(idcategoria);
	showAttachedFiles1(idcategoria);
	$("#modalimagencategoria").modal();
}

function PaquetesRelacion(idcategoria,nombre) {

	
	Obtenerpaquetestiponegocios(idcategoria,nombre);
}

function Obtenerpaquetestiponegocios(idcategoria,nombre) {

		var datos="id="+idcategoria;

	$.ajax({
					url:'catalogos/tiponegocios/ga_productos.php', //Url a donde la enviaremos
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
					url:'catalogos/tiponegocios/guardarpaquetes.php', //Url a donde la enviaremos
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


function ObtenerHorariosSemanatiponegocios(idcategoria) {
	var datos="idcategoria="+idcategoria;


		$.ajax({
					url: 'catalogos/tiponegocios/ObtenerHorariosSemana.php', //Url a donde la enviaremos
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
							PintarHorariosSemanatiponegocios(horarios);
						}


					}
				});
}


function PintarHorariosSemanatiponegocios(horarios) {

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
