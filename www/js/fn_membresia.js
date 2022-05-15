

function Guardarmembresia(form,regresar,donde,idmenumodulo)
{
	if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
	{			
		//recibimos todos los datos..
		var nombre =$("#v_titulo").val();
		var orden=$("#v_orden").val();
		var estatus=$("#v_estatus").val();

		var v_descripcion=$("#v_descripcion").val();
		var v_costo=$("#v_costo").val();
		var v_duracion=$("#v_duracion").val();
		var v_limite=$("#v_limite").val();
		var serviciosasignados=[];
			$(".servicios").each(function(){
				var valor=$(this).val();
				var id=$(this).attr('id');
				var dividir=id.split('_')[1];
				var selecttipo_=$("#selecttipo_"+dividir).val();
				var inputcantidad_=$("#inputcantidad_"+dividir).val();

				var objeto={
					servicio:valor,
					selecttipo:selecttipo_,
					inputcantidad:inputcantidad_

				};

				serviciosasignados.push(objeto);

			});

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
		datos.append('v_duracion',v_limite);
		datos.append('v_limite',v_limite);
		datos.append('serviciosasignados',JSON.stringify(serviciosasignados));
		
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
	 }
}

function Borrarmembresia(idmembresia,campo,tabla,valor,regresar,donde,idmenumodulo) {
	
var datos='idmembresia='+idmembresia;
	$.ajax({
		url:'catalogos/membresias/borrarmembresia.php', //Url a donde la enviaremos
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

							console.log(servicios);
							PintarServiciosmembresia(servicios);
						}


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
