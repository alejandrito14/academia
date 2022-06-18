function Guardarzona(form,regresar,donde,idmenumodulo)
{ 
	if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
	{			
		//recibimos todos los datos..
		var datos = ObtenerDatosFormulario(form);

		var color=$("#v_color").val();

		var datos=datos+"&v_color="+color;
		 $('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Procesando...</div>')
				
		setTimeout(function(){
				  $.ajax({
					url:'catalogos/zonas/ga_zonas.php', //Url a donde la enviaremos
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

function BorrarZonas(idzona,campo,tabla,valor,regresar,donde,idmenumodulo) {
	if(confirm("\u00BFEstas seguro de querer realizar esta operaci\u00f3n?"))
	{
var datos='idzona='+idzona;
	$.ajax({
		url:'catalogos/zonas/borrarZonas.php', //Url a donde la enviaremos
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
				  aparecermodulos(regresar+"?ac=0&idmenumodulo="+idmenumodulo+"&msj=La entrada se encuentra relacionada . "+msj,donde);
				}			
			}
	});
}
}

/*
function ObtenerHorariosSemanaZona(idzona) {
	var datos="idzona="+idzona;


		$.ajax({
					url: 'catalogos/zonas/ObtenerHorariosSemana.php', //Url a donde la enviaremos
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
							PintarHorariosSemanaZonas(horarios);
						}


					}
				});
}


function PintarHorariosSemanaZonas(horarios) {

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