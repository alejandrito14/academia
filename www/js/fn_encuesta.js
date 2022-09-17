function AgregarPregunta() {

	contadorencuesta=parseFloat($(".preguntasencuesta").length)+1;

		tabindex=parseFloat(6)+parseFloat(contadorencuesta);


	var html=`
					<div class="row preguntasencuesta" id="contadorpe_`+contadorencuesta+`" style=" background: #dee1e4;border-radius: 10px;padding: 1em;margin-bottom:1em;">
										<div class="col-md-8">
										<label for="from">Pregunta #`+contadorencuesta+`</label>
											<input type="text" id="txtpregunta_`+contadorencuesta+`" class="form-control pregunta" name="pregunta">

										<div>
										<label></label>
										<div class="opciones" id="opciones_`+contadorencuesta+`" style="padding-top:1em;">

										</div>
										</div>

									</div>

									<div class="col-md-3" style="text-align:right;">
										<button type="button"  style="margin-top: 2em;" onclick="EliminarPregunta(`+contadorencuesta+`)" class="btn btn_rojo"><i class="mdi mdi-delete-empty"></i></button>


									</div>
								</div>
							

					</div>
					

	`;


	$("#divpreguntas").append(html)
	ObtenerOpciones(contadorencuesta);
}


function ObtenerOpciones(contadorencuesta) {

			$.ajax({
					url: 'catalogos/encuestas/ObtenerOpciones.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
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
						
						var respuesta=msj.respuesta;
						var html="";
						if (respuesta.length>0) {
							for (var i =0; i <respuesta.length; i++) {
							html+=`<p><input type="checkbox" class="elegida_`+contadorencuesta+`" id="opcion_`+contadorencuesta+`_`+respuesta[i].idopcion+`"> `+respuesta[i].nombreopcion+`</p>`;
							
							}
							$("#opciones_"+contadorencuesta).append(html);
						}

					}
				});

			
}

function Guardarencuesta(form,regresar,donde,idmenumodulo) {
			var preguntas=[];
			$(".preguntasencuesta").each(function(index) {
				  var id=$(this).attr('id');
				  var dividir=id.split('_')[1];
				  var inputtext=$("#txtpregunta_"+dividir).val();
				  var opciones=[];
				  $(".elegida_"+dividir).each(function(index) {
				  	var idopcion=$(this).attr('id');

				  	if ($("#"+idopcion).is(':checked')) {

				 	 	var dividiropcion=idopcion.split('_')[2];
				 	 	opciones.push(dividiropcion);
				  	}
				 	

				  });
				  var objeto={
				  	id:dividir,
				  	textopregunta:inputtext,
				  	opcioneselegidas:opciones
				  };

				  preguntas.push(objeto);
			});
			
			var titulo=$("#v_tituloencuesta").val();
			var id=$("#id").val();
			var estatus=$("#v_estatus").val();
			var datos="id="+id+"&v_titulo="+titulo+"&v_estatus="+estatus+"&preguntas="+JSON.stringify(preguntas);

			$.ajax({
					url: 'catalogos/encuestas/ga_encuesta.php', //Url a donde la enviaremos
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
						if( resp[0] == 1 ){

								aparecermodulos(regresar+"?ac=1&idmenumodulo="+idmenumodulo+"&msj=Operacion realizada con exito",donde);
						 	 }else{
								aparecermodulos(regresar+"?ac=0&idmenumodulo="+idmenumodulo+"&msj=Error. "+msj,donde);
						  	}	

					}
				});		
	}

function ObtenerCuestiones(idencuesta) {
	var datos="idencuesta="+idencuesta;

		$.ajax({
					url: 'catalogos/encuestas/ObtenerCuestiones.php', //Url a donde la enviaremos
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
						var respuesta=msj.cuestiones;

						PintarCuestiones(respuesta);

					}
				});		
}

function PintarCuestiones(respuesta) {
	var html="";
	if (respuesta.length>0) {

	contadorencuesta=parseFloat($(".preguntasencuesta").length)+1;

		tabindex=parseFloat(6)+parseFloat(contadorencuesta);

		for (var i = 0; i <respuesta.length; i++) {
			
	var html=`
					<div class="row preguntasencuesta" id="contadorpe_`+contadorencuesta+`" style=" background: #dee1e4;border-radius: 10px;padding: 1em;margin-bottom:1em;">
										<div class="col-md-8">
										<label for="from">Pregunta #`+contadorencuesta+`</label>
											<input type="text" id="txtpregunta_`+contadorencuesta+`" class="form-control pregunta" value="`+respuesta[i].titulo+`" name="pregunta">

										<div>
										<label></label>
										<div class="opciones" id="opciones_`+contadorencuesta+`" style="padding-top:1em;">

										</div>
										</div>

									</div>

									<div class="col-md-3" style="text-align:right;">
										<button type="button"  style="margin-top: 2em;" onclick="EliminarPregunta(`+contadorencuesta+`)" class="btn btn_rojo"><i class="mdi mdi-delete-empty"></i></button>


									</div>
								</div>
							

					</div>
					

	`;

				$("#divpreguntas").append(html);

			ObtenerOpciones(contadorencuesta);


			if (respuesta[i].opciones.length>0) {

				for (var j = 0; j < respuesta[i].opciones.length; j++) {
					$("#opcion_"+contadorencuesta+"_"+respuesta[i].opciones[j].idopcion).attr('checked',true);
				}
			}
			contadorencuesta++;

		}


	}
}

function EliminarPregunta(contador) {
	
	$("#contadorpe_"+contador).remove();
}