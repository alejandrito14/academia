

function Guardarmembresia(form,regresar,donde,idmenumodulo)
{ 
	if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
	{			
		//recibimos todos los datos..
		var nombre =$("#v_titulo").val();
		var orden=$("#v_orden").val();
		var estatus=$("#v_estatus").val(); 
		var dependede=$("#dependede").is(':checked')?1:0;
		var membresiadepende=$("#v_membresia").val();
		var inppadre=$("#inppadre").is(':checked')?1:0;
		var inphijo=$("#inphijo").is(':checked')?1:0;
		var inpnieto=$("#inpnieto").is(':checked')?1:0;
		var fecha=$("#v_fecha").val();
		var repetir=$("#v_repetir").val();

		var v_descripcion=$("#v_descripcion").val();
		var v_costo=$("#v_costo").val();
		var v_duracion=$("#v_duracion").val();
		var v_limite=$("#v_limite").val();
		var v_limitemembresia=$("#v_limitemembresia").val();
		var serviciosasignados=[];
			$(".servicios").each(function(){
				var valor=$(this).val();
				var id=$(this).attr('id');
				var dividir=id.split('_')[1];

				var idservicio=$("#selectservicio_"+dividir).val();
				var selecttipo_=$("#selecttipo_"+dividir).val();
				var inputcantidad_=$("#inputcantidad_"+dividir).val();

				var objeto={
					servicio:idservicio,
					selecttipo:selecttipo_,
					inputcantidad:inputcantidad_,
					idelemento:dividir

				};

				serviciosasignados.push(objeto);

			});

			var tiposerviciosasignados=[];
			$(".tiposervicios").each(function(){
				var valor=$(this).val();
				var id=$(this).attr('id');
				var dividir=id.split('_')[1];

				var idtiposervicio=$("#selecttiposervicio_"+dividir).val();
				var selecttipo_=$("#selecttipo2_"+dividir).val();
				var inputcantidad_=$("#inputcantidad2_"+dividir).val();

				var objeto={
					tiposervicio:idtiposervicio,
					selecttipo:selecttipo_,
					inputcantidad:inputcantidad_,
					idelemento:dividir
				};

				tiposerviciosasignados.push(objeto);

			});
			var bandera=1;

			if (serviciosasignados.length>0) {
				for (var i = 0; i < serviciosasignados.length; i++) {

					if (serviciosasignados[i].inputcantidad=='') {
						bandera=0;
						$("#inputcantidad_"+serviciosasignados[i].idelemento).css('border-color','red');
					}

					if (serviciosasignados[i].selecttipo == 0) {
						bandera=0;
						$("#selecttipo_"+serviciosasignados[i].idelemento).css('border-color','red');

					}
				}
			}

			if (tiposerviciosasignados.length>0) {
			for (var i = 0; i < tiposerviciosasignados.length;i++) {
				if (tiposerviciosasignados[i].inputcantidad == '') {
					bandera=0;
					$("#inputcantidad2_"+tiposerviciosasignados[i].idelemento).css('border-color','red');

				}

				if (tiposerviciosasignados[i].selecttipo == 0) {
					bandera=0;
					$("#selecttipo2_"+tiposerviciosasignados[i].idelemento).css('border-color','red');

				}
			}
		}

		var porcategoria=$("#v_tiposervicio").is(':checked')?1:0;
		var porservicio=$("#v_servicio").is(':checked')?1:0;
		var v_color=$("#v_color").val();
		var id=$("#id").val();
		var datos = new FormData();

		var archivos = document.getElementById("image"); //Damos el valor del input tipo file
		var archivo = archivos.files; //Obtenemos el valor del input (los arcchivos) en modo de arreglo

		//Como no sabemos cuantos archivos subira el usuario, iteramos la variable y al
		//objeto de FormData con el metodo "append" le pasamos calve/valor, usamos el indice "i" para
		//que no se repita, si no lo usamos solo tendra el valor de la ultima iteracion
		for (i = 0; i < archivo.length; i++) {
			datos.append('archivo'+i, archivo[i]);
		}
	
		datos.append('v_titulo',nombre); 
		datos.append('v_orden',orden); 
		datos.append('id',id);
		datos.append('v_estatus',estatus);
		datos.append('v_descripcion',v_descripcion);
		datos.append('v_costo',v_costo);
		datos.append('v_duracion',v_duracion);
		datos.append('v_limite',v_limite);
		datos.append('serviciosasignados',JSON.stringify(serviciosasignados));
		datos.append('tiposerviciosasignados',JSON.stringify(tiposerviciosasignados));
		datos.append('porcategoria',porcategoria);
		datos.append('porservicio',porservicio);
		datos.append('v_color',v_color);
		datos.append('dependede',dependede);
		datos.append('membresiadepende',membresiadepende);
		datos.append('inppadre',inppadre);
		datos.append('inphijo',inphijo);
		datos.append('inpnieto',inpnieto);
		datos.append('v_limitemembresia',v_limitemembresia);
		datos.append('v_fecha',fecha);
		datos.append('v_repetir',repetir);
		
		if (bandera==1) {
		$('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Procesando...</div>')

		setTimeout(function(){
				  $.ajax({
					url:'catalogos/membresia/ga_membresia.php', //Url a donde la enviaremos
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

		}else{


			if (bandera==0) {

			AbrirNotificacion('Datos incompletos',"mdi-close-circle");			
			}
		}
	 }
}

function Borrarmembresia(idmembresia,campo,tabla,valor,regresar,donde,idmenumodulo) {
	if(confirm("\u00BFEstas seguro de querer realizar esta operaci\u00f3n?"))
	{
var datos='idmembresia='+idmembresia;
	$.ajax({
		url:'catalogos/membresia/borrarmembresia.php', //Url a donde la enviaremos
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


function AgregarServicioNuevo(){

		contadorservicio=parseFloat($(".serviciosincluye").length)+1;

		tabindex=parseFloat(6)+parseFloat(contadorservicio);
		var htmls="";
		var html="";
		CargarServicios().then(r => {
								 	
          		if (r.length>0) {
													
					htmls+=`<option value="0">SELECCIONAR SERVICIO</option>`;
					for (var i = 0; i <r.length; i++) {								
						htmls+=`<option value="`+r[i].idservicio+`">`+r[i].titulo+`</option>`;
					}

				}
       		

			 html=`
					<div class="row serviciosincluye" id="contador`+contadorservicio+`">
										<div class="col-md-3">
									<label>SERVICIO:</label>	

									<select class="form-control servicios" id="selectservicio_`+contadorservicio+`" tabindex="`+tabindex+`">`;
										html+=htmls;

									html+=`</select>
									</div>
									<div class="col-md-4">
									<label>DESCUENTO:</label>
										<div class="form-group mb-2" style="">
											<select class=" form-control tipo" id="selecttipo_`+contadorservicio+`" tabindex="`+(tabindex+1)+`">
												<option value="0" >SELECCIONAR TIPO</option>
												<option value="1" >MONTO</option>
												<option value="2" >PORCENTAJE</option>
											

											</select>
										</div>

									</div>

								
									<div class="col-md-4">

										<label>CANTIDAD:</label>
										<div class="form-group mb-2" style="">
											<input type="number"  class="form-control cantidad" id="inputcantidad_`+contadorservicio+`" tabindex="`+(tabindex+1)+`" >
										</div>
									</div>
									<div class="col-md-1">
										<button type="button"  style="margin-top: 2em;" onclick="EliminarOpcionservicio(`+contadorservicio+`)" class="btn btn_rojo"><i class="mdi mdi-delete-empty"></i></button>
									</div>
								</div>

	`;

	
	$("#servicios").append(html);
	});
	//CargarServicios();

}


function CargarServicios() {
 return new Promise(function(resolve, reject) {
	 $.ajax({
					url:'catalogos/membresia/ObtenerServicios.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
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
						
						resolve(msj.respuesta);

					  	}
				  });

	 });
}

function PintarOpcionsServicio(respuesta,contadorservicio) {
	if (respuesta.length>0) {
		var html="";
		html+=`<option val="0">SELECCIONAR SERVICIO</option>`;
		for (var i = 0; i <respuesta.length; i++) {
			
			html+=`<option val="`+respuesta[i].idservicio+`">`+respuesta[i].titulo+`</option>`;
		}

		$("#selectservicio_"+contadorservicio).html(html);
	}
}


function EliminarOpcionservicio(contador) {

		$("#contador"+contador).remove();

}



function ObtenerServiciosMembresia(idmembresia) {
	var datos="idmembresia="+idmembresia;


		$.ajax({
					url: 'catalogos/membresia/ObtenerServiciosMembresia.php', //Url a donde la enviaremos
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

						var servicios=msj.respuesta;

						if (servicios.length>0) {
							$(".divservicio").css('display','block');
							console.log(servicios);
							PintarServiciosmembresia(servicios);
						}


					}
				});
}

function ObtenerCategoriasMembresia(idmembresia) {
	var datos="idmembresia="+idmembresia;


		$.ajax({
					url: 'catalogos/membresia/ObtenerTiposServicioMembresia.php', //Url a donde la enviaremos
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

						var tipos=msj.respuesta;

						if (tipos.length>0) {
							$(".divtiposervicio").css('display','block');
							console.log(tipos);
							PintarTipoServiciosmembresia(tipos);
						}


					}
				});
}

	

function PintarTipoServiciosmembresia(tipos) {

	var html="";
	var htmls="";

	CargarTipoServicios().then(r => {
							 	
          		if (r.length>0) {
													
					htmls+=`<option value="0">SELECCIONAR TIPO DE SERVICIO</option>`;
					for (var j = 0; j <r.length; j++) {								
						htmls+=`<option value="`+r[j].idcategorias+`">`+r[j].titulo+`</option>`;
					}

				}
			}).then(()=>{

				for (var i = 0; i <tipos.length; i++) {

		obtenerdiv=$("#tiposervicios").html();

		contadortipo=parseFloat($(".tipoincluye").length)+1;

		tabindex=parseFloat(6)+parseFloat(contadortipo);
	
			html=`
					<div class="row tipoincluye" id="contadort`+contadortipo+`">
										<div class="col-md-3">
									<label>TIPO DE SERVICIO:</label>	

									<select class="form-control tiposervicios" id="selecttiposervicio_`+contadortipo+`" tabindex="`+tabindex+`">`;
										html+=htmls;

									html+=`</select>
									</div>
									<div class="col-md-4">
									<label>DESCUENTO:</label>
										<div class="form-group mb-2" style="">
											<select class=" form-control tipo" id="selecttipo2_`+contadortipo+`" tabindex="`+(tabindex+1)+`">
												<option value="0" >SELECCIONAR TIPO</option>
												<option value="1" >MONTO</option>
												<option value="2" >PORCENTAJE</option>
											
											</select>
										</div>

									</div>

								
									<div class="col-md-4">

										<label>CANTIDAD:</label>
										<div class="form-group mb-2" style="">
											<input type="number"  class="form-control cantidad" id="inputcantidad2_`+contadortipo+`" tabindex="`+(tabindex+1)+`" >
										</div>
									</div>
									<div class="col-md-1">
										<button type="button"  style="margin-top: 2em;" onclick="EliminarOpciontipo(`+contadortipo+`)" class="btn btn_rojo"><i class="mdi mdi-delete-empty"></i></button>
									</div>
								</div>`;


	

	colocarhtml=obtenerdiv+html;

	var tipo=tipos[i].idcategorias;
	var descuento=tipos[i].descuento;
	var monto=tipos[i].monto;


	$("#tiposervicios").append(html);
	$("#selecttiposervicio_"+contadortipo).val(tipo);
	$("#selecttipo2_"+contadortipo).val(descuento);
 	$("#inputcantidad2_"+contadortipo).val(monto);
	

			
	}

			

	});

}

function PintarServiciosmembresia(servicios) {

	var html="";
	var htmls="";

	CargarServicios().then(r => {
							 	
          		if (r.length>0) {
													
					htmls+=`<option value="0">SELECCIONAR SERVICIO</option>`;
					for (var j = 0; j <r.length; j++) {								
						htmls+=`<option value="`+r[j].idservicio+`">`+r[j].titulo+`</option>`;
					}

				}
			}).then(()=>{

				for (var i = 0; i <servicios.length; i++) {

		obtenerdiv=$("#servicios").html();

		contadorservicio=parseFloat($(".serviciosincluye").length)+1;

		tabindex=parseFloat(6)+parseFloat(contadorservicio);
	
		 html=`
					<div class="row serviciosincluye" id="contador`+contadorservicio+`">
										<div class="col-md-3">
									<label>SERVICIO:</label>	

									<select class="form-control servicios" id="selectservicio_`+contadorservicio+`" tabindex="`+tabindex+`">`;
										html+=htmls;

									html+=`</select>
									</div>
									<div class="col-md-4">
									<label>DESCUENTO:</label>
										<div class="form-group mb-2" style="">
											<select class=" form-control tipo" id="selecttipo_`+contadorservicio+`" tabindex="`+(tabindex+1)+`">
												<option value="0" >SELECCIONAR TIPO</option>
												<option value="1" >MONTO</option>
												<option value="2" >PORCENTAJE</option>
											

											</select>
										</div>

									</div>

								
									<div class="col-md-4">

										<label>CANTIDAD:</label>
										<div class="form-group mb-2" style="">
											<input type="number"  class="form-control cantidad" id="inputcantidad_`+contadorservicio+`" tabindex="`+(tabindex+1)+`" >
										</div>
									</div>
									<div class="col-md-1">
										<button type="button"  style="margin-top: 2em;" onclick="EliminarOpcionservicio(`+contadorservicio+`)" class="btn btn_rojo"><i class="mdi mdi-delete-empty"></i></button>
									</div>
								</div>

	`;


	colocarhtml=obtenerdiv+html;

	var servicio=servicios[i].idservicio;
	var descuento=servicios[i].descuento;
	var monto=servicios[i].monto;


	$("#servicios").append(html)

	$("#selectservicio_"+contadorservicio).val(servicio);
	$("#selecttipo_"+contadorservicio).val(descuento);
 	$("#inputcantidad_"+contadorservicio).val(monto);
	

			
}

			

	});

}
function Desplegartiposervicio() {
	
	if ($("#v_tiposervicio").is(':checked')) {
	$(".divtiposervicio").css('display','block');	
	
	}else{
		$(".divtiposervicio").css('display','none');	

	}
}

function Desplegarporservicio() {
	if ($("#v_servicio").is(':checked')) {
	$(".divservicio").css('display','block');	
	
	}else{
		$(".divservicio").css('display','none');	

	}
}



function AgregarTipoNuevo(){

		contadortipo=parseFloat($(".tipoincluye").length)+1;

		tabindex=parseFloat(6)+parseFloat(contadortipo);
		var htmls="";
		var html="";
		CargarTipoServicios().then(r => {
								 	
          		if (r.length>0) {
													
					htmls+=`<option value="0">SELECCIONAR TIPO DE SERVICIO</option>`;
					for (var i = 0; i <r.length; i++) {								
						htmls+=`<option value="`+r[i].idcategorias+`">`+r[i].titulo+`</option>`;
					}

				}
       		

			 html=`
					<div class="row tipoincluye" id="contadort`+contadortipo+`">
										<div class="col-md-3">
									<label>TIPO DE SERVICIO:</label>	

									<select class="form-control tiposervicios" id="selecttiposervicio_`+contadortipo+`" tabindex="`+tabindex+`">`;
										html+=htmls;

									html+=`</select>
									</div>
									<div class="col-md-4">
									<label>DESCUENTO:</label>
										<div class="form-group mb-2" style="">
											<select class=" form-control tipo" id="selecttipo2_`+contadortipo+`" tabindex="`+(tabindex+1)+`">
												<option value="0" >SELECCIONAR TIPO</option>
												<option value="1" >MONTO</option>
												<option value="2" >PORCENTAJE</option>
											

											</select>
										</div>

									</div>

								
									<div class="col-md-4">

										<label>CANTIDAD:</label>
										<div class="form-group mb-2" style="">
											<input type="number"  class="form-control cantidad" id="inputcantidad2_`+contadortipo+`" tabindex="`+(tabindex+1)+`" >
										</div>
									</div>
									<div class="col-md-1">
										<button type="button"  style="margin-top: 2em;" onclick="EliminarOpciontipo(`+contadortipo+`)" class="btn btn_rojo"><i class="mdi mdi-delete-empty"></i></button>
									</div>
								</div>

	`;

	
	$("#tiposervicios").append(html);
	});
	//CargarServicios();

}


function CargarTipoServicios() {
 return new Promise(function(resolve, reject) {
	 $.ajax({
					url:'catalogos/membresia/ObtenerTipoServicios.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
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
						
						resolve(msj.respuesta);

					  	}
				  });

	 });
}

function EliminarOpciontipo(contador) {

		$("#contadort"+contador).remove();

}

function HabilitarDepende() {
	CargarMembresias(0);
	if ($("#dependede").is(':checked')) {
		$(".divmembresia").css('display','block');
		
	}else{

		$(".divmembresia").css('display','none');
		
	}
}

function CargarMembresias(valor) {
		$.ajax({
					url: 'catalogos/membresia/ObtenerMembresias.php', //Url a donde la enviaremos
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
							var html="";
							html+=`	<option value="0"> Seleccionar membresía</option> `;

							for (var i = 0; i < respuesta.length; i++) {
								html+=`

								<option value="`+respuesta[i].idmembresia+`"> `+respuesta[i].titulo+`</option> `;
						
							}
							$("#v_membresia").html(html);

						}

						if (valor>0) {
							$("#v_membresia").val(valor);

						}
						
					}
				});
}
