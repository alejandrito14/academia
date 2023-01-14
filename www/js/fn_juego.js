var validado=1;
var adversarios=0;
var contendientes=0;
var arrayparejas=[];
var arraygrupos=[];
var roljuego=[];
var roljuegollaves=[];

function GenerarSelectPlayer1() {

	var html="";
	for (var i = 0; i <advserarios; i++) {

		html+=`

		<label>JUGADOR `+(i+1)+` </label>
		<select name="v_clientes1" id="v_contendientes`+i+`" class="v_clientes1 form-control" onchange="Seleccionjugador('v_contendientes`+i+`')">
		<option value="0">SELECCIONAR JUGADOR</option>

		</select>


		`;		
	}

	$("#player1").html(html);

	LlenarContendientes(advserarios);

}

function GenerarSelectPlayer2() {
	var html="";

	for (var i = 0; i <contendientes; i++) {
		html+=`
		<label>JUGADOR `+(i+1)+` </label>
		<select name="v_clientes2" id="v_adversario`+i+`" class="v_clientes2 form-control" onchange="Seleccionjugador('v_adversario`+i+`')">
		<option value="0">SELECCIONAR JUGADOR</option>

		</select>


		`;	
	}
	$("#player2").html(html);

	LlenarAdversarios(contendientes);

}

function LlenarContendientes(jugadores,id) {

	var clientes='';

	var idservicio=$("#v_servicio").val();

	var datos="idservicio="+idservicio;

	$.ajax({
					url:'catalogos/armarjuego/obtenerclientesServicio.php', //Url a donde la enviaremos
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
							
							clientes=msj.respuesta;

							var html="";
							html+='<option value="0">SELECCIONAR JUGADOR</option>';

							for (var i = 0; i <clientes.length; i++) {

								html+='<option value='+clientes[i].idusuarios+'>'+clientes[i].nombre+' '+clientes[i].paterno+' '+clientes[i].materno+'</option>';


							}

							for (var i = 0; i <jugadores; i++) {

								$("#v_contendientes_"+id+"_"+i).html(html);


								$("#v_contendientes_"+id+"_"+i).chosen({width: "100%"}); 


							}

						}
					});





}
function LlenarAdversarios(jugadores,id2) {
	var idservicio=$("#v_servicio").val();
	var datos="idservicio="+idservicio;

	$.ajax({
					url:'catalogos/armarjuego/obtenerclientesServicio.php', //Url a donde la enviaremos
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
							
							clientes=msj.respuesta;

							var html="";
							html+='<option value="0">SELECCIONAR JUGADOR</option>';

							for (var i = 0; i <clientes.length; i++) {

								html+='<option value='+clientes[i].idusuarios+'>'+clientes[i].nombre+' '+clientes[i].paterno+' '+clientes[i].materno+'</option>';


							}

							for (var i = 0; i <jugadores; i++) {

								$("#v_adversario_"+id2+"_"+i).html(html);
								$("#v_adversario_"+id2+"_"+i).chosen({width: "100%"}); 

							}

						}
					});
}


function Seleccionjugador(idselect) {


	var arregloclientes1=[];
	
	$(".v_clientes1").each(function(){

		var valor=$(this).val();
		var id=$(this).attr('id');
		console.log('idcliente: '+valor);
		if (valor>0) {

			const clientes1 = {
				id : id,
				valor : valor,
				
			}
			arregloclientes1.push(clientes1);
		}

	});

	$(".v_clientes2").each(function(){

		var valor=$(this).val();
		var id=$(this).attr('id');

		if (valor>0) {

			const clientes2 = {
				id : id,
				valor : valor,
				
			}
			arregloclientes1.push(clientes2);
		}

	});

	$(".v_clientes1").each(function(){

		var id=$(this).attr('id');

		$("#"+id+" option").each(function(){

			//$(this).prop("disabled",false);
			$(this).attr('disabled',false).trigger("chosen:updated");

		});

	});


	$(".v_clientes2").each(function(){
		var id=$(this).attr('id');

		$("#"+id+" option").each(function(){
			//$(this).prop("disabled",false);
			$(this).attr('disabled',false).trigger("chosen:updated");

		});

	});


	



	for (var i =0; i < arregloclientes1.length; i++) {

		var valor1=arregloclientes1[i].valor;
		var id=arregloclientes1[i].id;

		//console.log(arregloclientes1[i]);
		if (valor1>0) {

			//$(".v_clientes1").find("option[value='"+valor1+"']").prop("disabled",true);
			//$(".v_clientes2").find("option[value='"+valor1+"']").prop("disabled",true);

			//$("#"+id).find("option[value='"+valor1+"']").prop("disabled",false);
			$(".v_clientes2").find("option[value='"+valor1+"']").attr('disabled',true).trigger("chosen:updated");

			$(".v_clientes1").find("option[value='"+valor1+"']").attr('disabled',true).trigger("chosen:updated");

			$("#"+id).find("option[value='"+valor1+"']").attr('disabled',false).trigger("chosen:updated");
		}

	}




}

function Comparar(array,valor) {
	for (var i = 0; i <array.length; i++) {
		
		if (array[i]==valor) {

			return true;
		}

	}
}

function CambiarTorneo() {

	ObtenerNumeroJugadores();
}

/*function GuardarJuego(form,regresar,donde,idmenumodulo){

	var edicion=$("#edicion").val();

	if (edicion==1 || edicion==0) {

		ValidarNombre();

	}else{
		validado=1;
	}

	var clientenoseleccionado1=0;
	var clientenoseleccionado2=0;

	var nombre =$("#v_nombre").val();
	var descripcion=$("#v_descripcion").val();
	var torneo=$("#v_torneo").val();
	var tipojuego=$("#v_tipojuego").val();
	var tipopartido=$("#v_tipopartido").val();
	var espacio=$("#v_espacio").val();
	var horario=$("#v_horario").val();


	if (nombre=='') {
		validado=0;
	}
	if (descripcion=='') {
		validado=0;
	}
	if (torneo==0) {
		validado=0;
	}

	if (tipojuego==0) {
		validado=0;
	}

	if (tipopartido==0) {
		validado=0;
	}

	if(espacio==0){
		validado=0;
	}
	if (horario==0) {
		validado=0;
	}

	$(".v_clientes1").each(function(){
			var id=$(this).attr('id');
			var valor=$(this).val();
			if (valor==0) {
				validado=0;
				clientenoseleccionado1=1;

			}
		});
		$(".v_clientes2").each(function(){
			var id=$(this).attr('id');
			var valor=$(this).val();
			if (valor==0) {
				validado=0;
				clientenoseleccionado2=1;
			}
		});


	if(validado==1){
		if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
		{			
		//recibimos todos los datos..
		var datos = ObtenerDatosFormulario(form);
		
		console.log(datos);

		var equipo1=[];
		var equipo2=[];
		$(".v_clientes1").each(function(){
			var id=$(this).attr('id');
			var valor=$(this).val();
			equipo1.push(valor);
		});


		$(".v_clientes2").each(function(){
			var id=$(this).attr('id');
			var valor=$(this).val();
			equipo2.push(valor);
		});

		variables="&equipo1="+equipo1+"&equipo2="+equipo2;
		datos=datos+variables;

		console.log(datos);




		$('#main').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Procesando...</div>')

			setTimeout(function(){
				$.ajax({
						url:'catalogos/armarjuego/ga_juego.php', //Url a donde la enviaremos
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

	}else{
		var texto='';

			if (nombre=='') {
					validado=0;
					texto+='NOMBRE REQUERIDO<br>';

				}
			if (descripcion=='') {
					validado=0;
					texto+='DESCRIPCIÓN REQUERIDO<br>';

				}
				if (torneo==0) {
					validado=0;
					texto+='TORNEO REQUERIDO<br>';

				}

				if (tipojuego==0) {
					validado=0;
					texto+='TIPO DE JUEGO REQUERIDO<br>';
				}

				if (tipopartido==0) {
					validado=0;
					texto+='TIPO DE PARTIDO REQUERIDO<br>';
				}

				if(espacio==0){
					validado=0;
					texto+='ESPACIO REQUERIDO<br>';
				}
				if (horario==0) {
					validado=0;
					texto+='HORARIO REQUERIDO<br>';
				}

				if (clientenoseleccionado1==1 || clientenoseleccionado2==1) {

					texto+='FALTA POR SELECCIONAR JUGADOR<br>';

				}
				console.log(texto);

				AbrirNotificacion(texto,"mdi-checkbox-marked-circle");


	}

}*/

function BorrarJuego(idjuego,idmenumodulo) {

	var datos='idjuego='+idjuego;

	var regresar ='catalogos/armarjuego/vi_juego.php';
	var donde='main';
	if(confirm("\u00BFDesea realizar esta operaci\u00f3n?"))
		{	
	$.ajax({
					url:'catalogos/armarjuego/borrar_juego.php', //Url a donde la enviaremos
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

							console.log("El resultado de msj es: "+msj);
							if( msj== 1 ){
									aparecermodulos(regresar+"?ac=1&idmenumodulo="+idmenumodulo+"&msj=Operacion realizada con exito&idempresas=",donde);
							}else{
								aparecermodulos(regresar+"?ac=0&idmenumodulo="+idmenumodulo+"&msj=El juego ya ha sido jugado. ",donde);
							}			
						}
					});
	}

}

function detallejuego(idjuego) {
	
	var datos='idjuego='+idjuego;

	
	$.ajax({
					url:'catalogos/armarjuego/obtenerdetallejuego.php', //Url a donde la enviaremos
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

							var respuesta=msj.respuesta.juego;

							$("#titulo-modal-forms3").text('DETALLE DE JUEGO');

							var html=`<div class="card w-75">
							<div class="card-body">
							<p class="card-text">TORNEO: `+respuesta.nombretorneo+`</p>
							<p class="card-text">ESPACIO: `+respuesta.nombreespacio+`</p>
							<p class="card-text">FECHA: `+respuesta.fecha+`</p>
							<p class="card-text">TIPO DE JUEGO: `+respuesta.nombretipojuego+`</p>

							</div>
							</div>`;

							html+=`

							<div class="row">
							<div class="col-md-12">
							<div class="col-md-6" style="float: left;">
							<h4 style="text-align: center;">EQUIPO1</h4>

							
							<div id="player1"></div>

							</div>
							<div class="col-md-6" style="float: right;">
							<h4 style="text-align: center;">EQUIPO2</h4>
							<div id="player2"></div>

							</div>
							</div>
							</div>

							`;
							$("#contenedor-modal-forms3").html(html);


							var jugadores=msj.respuesta.jugadores;
							var equipo1='';
							var equipo2='';


							for (var i = 0; i < jugadores.length; i++) {

								if (jugadores[i].equipo==1) {

									equipo1+=`
									<div class="col-xl-12 col-sm-12 col-md-12"> 
									<div class="card">
									<div class="card-content">
									<div class="card-body">
									<div class="media d-flex">
									<div class="align-self-center">`


									if (jugadores[i].foto==null) {
										equipo1+=`<i class="fa fa-user-circle primary float-left" style="font-size:4em;"></i>`;

									}else{

										equipo1+=`<img src="https://issoftware.com.mx/apptennis/php/upload/perfil/`+jugadores[i].foto+`" style="width: 4em; border-radius: 20px!important;">`;

									}

									equipo1+=`</div>
									<div class="media-body">
									<h4>`+jugadores[i].nombre+' '+
									jugadores[i].paterno+' '+
									jugadores[i].materno +`</h4>
									<span></span>
									</div>
									</div>
									</div>
									</div>
									</div>
									</div>


									`;


								}else{

									equipo2+=`

									<div class="col-xl-12 col-sm-12 col-md-12"> 
									<div class="card">
									<div class="card-content">
									<div class="card-body">
									<div class="media d-flex">
									<div class="align-self-center">`

									if (jugadores[i].foto==null) {
										equipo2+=`<i class="fa fa-user-circle primary float-left" style="font-size:4em;"></i>`;

									}else{

										equipo2+=`<img  src="https://issoftware.com.mx/apptennis/php/upload/perfil/`+jugadores[i].foto+`" style="width: 4em;border-radius: 20px!important;">`;

									}

									equipo2+=`</div>
									<div class="media-body ">
									<h4>`+jugadores[i].nombre+' '+
									jugadores[i].paterno+' '+
									jugadores[i].materno +`</h4>
									<span></span>
									</div>
									</div>
									</div>
									</div>
									</div>
									</div>

									`;

								}
								

							}


							$("#player1").html(equipo1);
							$("#player2").html(equipo2);

							$("#modal-forms3").modal();
							


						}
					});
}

function ValidarNombre() {

	var edicion=$("#edicion").val();

	if (edicion==1 || edicion==0) {

		

	
	var nombre=$("#v_nombre").val();

	var datos ='nombre='+nombre;
	
	$.ajax({
					url:'catalogos/armarjuego/validarnombre.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					data: datos, //Le pasamos el objeto que creamos con los archivos
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
							console.log('nombre '+ msj);
							if (msj==1) {
								validado=0;

								AbrirNotificacion("NOMBRE EXISTENTE EN LA BASE DE DATOS","mdi-checkbox-marked-circle");

							}else{
								validado=1;
							}


						}
					});

	}
}


function CargarJugadores(idjuego) {
	var datos ='idjuego='+idjuego;
	
	$.ajax({
					url:'catalogos/armarjuego/CargarJugadores.php', //Url a donde la enviaremos
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


							var jugadores=msj.respuesta;

							var equipo1=0;
							var equipo2=0;

							var equipo1array=[];
							var equipo2array=[];
							
							if (jugadores!=0) {

								for (var i =0;i<jugadores.length; i++) {
									

									if (jugadores[i].equipo==1) {

										equipo1++;

										equipo1array.push(jugadores[i]);


									}

									if (jugadores[i].equipo==2) {
										equipo2++;

										equipo2array.push(jugadores[i]);

									}
								}

							

								for (var i =0;i<equipo1array.length; i++) {

									
							
									$('#v_contendientes'+i).val(equipo1array[i].idcliente).trigger('chosen:updated');
									Seleccionjugador('#v_contendientes'+i);

								}

								for (var i =0; i <equipo2array.length; i++) {

									$('#v_adversario'+i).val(equipo2array[i].idcliente).trigger('chosen:updated');
									Seleccionjugador('#v_adversario'+i);



								}




							}



						}
					});
}

function NuevoPartido() {
	ObtenerNumeroJugadoresJuego();
	
	var contador=$(".divpartidos").length+1;

	var html=`
		<div id="partido_`+contador+`" class="divpartidos" style="margin-bottom:1em;">
						<h4 style="margin-left: 1em;">Partido <span id="numpartido">`+contador+`</span></h4>
						<h4 style="margin-left: 1em;" class="card-title m-b-0">ELIGE LOS JUGADORES</h4>

					<div class="row">
						<div class="col-md-12">
						<div class="col-md-6" style="float: left;">
							<h4 style="text-align: center;">EQUIPO1</h4>
					  	<div id="player_1_`+contador+`"></div>
						</div>
						<div class="col-md-6" style="float: right;">
							<h4 style="text-align: center;">EQUIPO2</h4>
							<div id="player_2_`+contador+`"></div>
						</div>
					</div>
				</div>
			</div>

			`;

			$(".partidos").append(html);
			var id='player_1_'+contador;
			var id2='player_2_'+contador;

		GenerarSelectPlayer1Div(adversarios,id);
		GenerarSelectPlayer2Div(contendientes,id2);
}

function GenerarSelectPlayer1Div(adversarios,id) {
	alert('a'+id);
	var html="";
	for (var i = 0; i <adversarios; i++) {

		html+=`

		<label>JUGADOR `+(i+1)+` </label>
		<select name="v_clientes1" id="v_contendientes_`+id+`_`+i+`" class="v_clientes1 form-control" onchange="Seleccionjugador('v_contendientes`+i+`')">
		<option value="0">SELECCIONAR JUGADOR</option>

		</select>


		`;		
	}

	$("#"+id).html(html);

	LlenarContendientes(adversarios,id);

}

function GenerarSelectPlayer2Div(contendientes,id2) {
	var html="";

	for (var i = 0; i <contendientes; i++) {
		html+=`
		<label>JUGADOR `+(i+1)+` </label>
		<select name="v_clientes2" id="v_adversario_`+id2+`_`+i+`" class="v_clientes2 form-control" onchange="Seleccionjugador('v_adversario`+i+`')">
		<option value="0">SELECCIONAR JUGADOR</option>

		</select>


		`;	
	}
	$("#"+id2).html(html);

	LlenarAdversarios(contendientes,id2);

}


function ObtenerNumeroJugadoresJuego() {

	var idtipojuego=$("#v_tipojuego").val();
	var datos="idtipojuego="+idtipojuego;

	if(idtipojuego>0){

	  $.ajax({
					url:'catalogos/tipojuego/obtenertipojuego.php', //Url a donde la enviaremos
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
							var respuesta=msj.respuesta;
							adversarios= respuesta.numeroadversarios;
							contendientes=respuesta.numerocontendientes;
							
						/*	GenerarSelectPlayer1(adversarios,'');
							GenerarSelectPlayer2(contendientes,'');*/
						  		
					  	}
				  });

			}

		 }

function ObtenerTipoCompetencia() {
	

	 	 $.ajax({
					url:'catalogos/armarjuego/ObtenerTipoCompetencia.php', //Url a donde la enviaremos
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
							var respuesta=msj.respuesta;
							PintarTipoCompentencia(respuesta);
						/*	GenerarSelectPlayer1(adversarios,'');
							GenerarSelectPlayer2(contendientes,'');*/
						  		
					  	}
				  });
}

function PintarTipoCompentencia(resultado) {
	var html="";
	html+=`<option value="0">SELECCIONAR TIPO DE COMPETENCIA</option>`;
	if (resultado.length>0) {

		for (var i = 0; i <resultado.length; i++) {
			html+=`<option value="`+resultado[i].idtipocompeticion+`">`+resultado[i].nombre+`</option>`;
		}
	}

	$("#v_tipocompe").html(html);
}

function NuevoGrupo() {
	$("#modalgrupo").modal();
	$(".parejas").html('');
	ObtenerNiveles(0);
	ObtenerParejas();
}
function ObtenerNiveles(idnivel) {

	var deporte=$("#v_deporte").val();
	var datos="iddeporte="+deporte;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url:'catalogos/armarjuego/ObtenerNiveles.php', //Url a donde la enviaremos
		data:datos,
		success: function(datos){
			var respuesta=datos.respuesta;

	
			var html="";
			if (respuesta.length>0) {
				html+=`<option value="0">SELECCIONAR NIVEL</option>`;


				for (var i = 0; i < respuesta.length; i++) {

						//armar nivel
						html+=`<option value="`+respuesta[i].idnivel+`">`+respuesta[i].nivel+`</option>`;

					}
				}else{
					html+=`<option value="0">NO SE ENCUENTRAN NIVELES</option>`;



				}

				$("#v_nivel").html(html);

				if (idnivel>0) {
					$("#v_nivel").val(idnivel);
	
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
function NuevaPareja() {

	var	contador=$(".nuevapareja").length+1;

	var html="";

	html+=`
		<div class="row_clonable nuevapareja" id="contador_`+contador+`">
                       
						<div class="row">
							<div class="col-md-6">
		                        <div class="input-group">
		                            <div class="input-group-prepend">
		                                <div style="border-bottom:0px;border-bottom-left-radius:0;" class="input-group-text  ordenar_`+contador+`_0" >`+contador+`</div>
		                            </div>
		                       		<select name="v_clientes1" id="participante_`+contador+`_0" class="v_clientes1 form-control" onchange="Seleccionjugador('v_contendientes`+contador+`')" onclick="Seleccionjugador('v_contendientes`+contador+`')">
										<option value="0">SELECCIONAR PARTICIPANTE</option>
									</select>

		                        <div class="input-group">
		                            <div class="input-group-prepend">
		                                <div style="border-top-left-radius:0;border-top-right-radius:0;" class="input-group-text  ordenar_`+contador+`_1">`+contador+`</div>
		                            </div>
		                           	<select name="v_clientes1" id="participante_`+contador+`_1" class="v_clientes1 form-control" onchange="Seleccionjugador('v_contendientes`+contador+`')" onclick="Seleccionjugador('v_contendientes`+contador+`')">
										<option value="0">SELECCIONAR PARTICIPANTE</option>
									</select>

		                            </div>
                            	</div>
                            	</div>
                            	<div class="col-md-2">
                            		<button type="button" onclick="EliminarPareja(`+contador+`)" class="btn btn_rojo" >
                            		    <i class="mdi mdi-delete-empty"></i>
                            		</button>
                            	</div>

                            </div>
                    </div>

	`;
	$(".parejascreadas").append(html);
	CargarParticipantes(contador);

}
function CargarParticipantes(cont) {
		var clientes='';

	var idservicio=$("#v_servicio").val();

	var datos="idservicio="+idservicio;

	$.ajax({
					url:'catalogos/armarjuego/obtenerclientesServicio.php', //Url a donde la enviaremos
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
							
							clientes=msj.respuesta;

							var html="";
							html+='<option value="0">SELECCIONAR PARTICIPANTE</option>';

							for (var i = 0; i <clientes.length; i++) {

								html+='<option value='+clientes[i].idusuarios+'>'+clientes[i].nombre+' '+clientes[i].paterno+' '+clientes[i].materno+'</option>';


							}

						
								$("#participante_"+cont+"_0").html(html);
								$("#participante_"+cont+"_0").chosen({width: "90%"}); 

								$("#participante_"+cont+"_1").html(html);
								$("#participante_"+cont+"_1").chosen({width: "90%"}); 
								Seleccionjugador(1);
						}
					});



}

function EliminarPareja(contador) {

	$("#contador_"+contador).remove();
	Ordenar();
}

function Ordenar() {

	var contador=1;
	$(".nuevapareja").each(function() {

	  var id=$(this).attr('id');
	  var dividir=id.split('_')[1];
	  console.log(dividir);

		$(".ordenar_"+dividir+"_0").text(contador);
		$(".ordenar_"+dividir+"_1").text(contador);
		contador++;
	});
}

var arrayparejas=[];
function ObtenerParejas() {
	var conta=1;
	$(".parejas").html("");
	arrayparejas=[];
	$(".nuevapareja").each(function() {

	  var id=$(this).attr('id');
	  var dividir=id.split('_')[1];
	  
	  var idparti1=$("#participante_"+dividir+"_0").val();
	  var idparti2=$("#participante_"+dividir+"_1").val();
	  var nombreparticipante1=$("#participante_"+dividir+"_0 option:selected" ).text();
	  var nombreparticipante2=$("#participante_"+dividir+"_1 option:selected" ).text();
	  var numeropareja=$(".ordenar_"+dividir+"_0").text();
	  var parejas={
	  	numeropareja:numeropareja,
	  	participante1:idparti1,
	  	participante2:idparti2,
	  	nombreparticipante1:nombreparticipante1,
	  	nombreparticipante2:nombreparticipante2
	  };

	  arrayparejas.push(parejas);
	});

	console.log(arrayparejas);
	var html="";
		if (arrayparejas.length>0) {
		for (var i = 0; i <arrayparejas.length; i++) {
			html+=`
				<div class="row">

					<div class="col-md-2" style="float: left;width: 10%;"> 
					  <input type="checkbox" class="cheparejas" id="che_`+arrayparejas[i].numeropareja+`">
					</div>
					<div class="col-md-2" style="float: left;width: 10%;">
					  <span class="fa fa-user-circle"></span>
					  <span class="fa fa-user-circle"></span>

					</div>
					<div class="col-md-6" style="float: right;width: 80%;">
						<div class="row">
							<div class="col-md-12">`+arrayparejas[i].nombreparticipante1+`</div>
							<div class="col-md-12">`+arrayparejas[i].nombreparticipante2+`</div>

						</div>
					</div>

				</div>
			`;
		}

	}
	$(".parejas").html(html);
}

function GuardarGrupo() {

	var nombregrupo=$("#v_nombregrupo").val();
	var v_nivel=$("#v_nivel").val();
	var nombrenivel=$("#v_nivel option:selected" ).text();
	var parejas=[];
	var congrupo={
		nombregrupo:nombregrupo,
		v_nivel:v_nivel,
		nombrenivel:nombrenivel,
		parejas:parejas,
		participantes:[],
		grupo:nombregrupo
	};

		$(".cheparejas").each(function() {
			if ($(this).is(':checked')) {
			var id=$(this).attr('id');
			var dividir=id.split('_')[1];
			congrupo.parejas.push(dividir);

			var participantes=parejaencontrada(dividir);
			congrupo.participantes.push(participantes);

			}
			
		});

		arraygrupos.push(congrupo);
		PintarGrupos();
}

function PintarGrupos() {
	var html="";
	if (arraygrupos.length>0) {
		for (var i = 0; i <arraygrupos.length; i++) {
			html+=`
				<div class="card" style="width: 18rem;" id="grupo_`+i+`">
					  <div class="card-header">
					  <div class="row">
					  	<div class="col-md-6" style="float: right;width: 70%;"> GRUPO `+arraygrupos[i].nombregrupo+`</div>
					  	<div class="col-md-4" style="width: 30%;">
						   <span id="" class="btn btn_rojo" style="" onclick="EliminarGrupo(`+i+`)">
						   	<i class="mdi mdi-delete-empty"></i>
						   </span>
					  	</div>
					  </div>
					  
					  </div>
					  <ul class="list-group list-group-flush">`;
						
					  for (var j = 0; j < arraygrupos[i].parejas.length; j++) {
					 		
					  		var participantes=parejaencontrada(arraygrupos[i].parejas[j]);
					  		
					 	 html+=`   <li class="list-group-item">`+participantes.nombreparticipante1+` - `+participantes.nombreparticipante2+`</li>`;
 
					  }
					   

					 html+= `

					 </ul>
					</div>

			`;
		}
	}
	$(".grupos").html(html);

}

const parejaencontrada = (idpareja) => {
  return arrayparejas.filter(
    (arraypareja) => arraypareja.numeropareja === idpareja,
  )[0] || {};
}

function EliminarGrupo(posicion) {

	
	$("#grupo_"+posicion).remove();

	arraygrupos.splice(posicion,1);
}

function GuardarJuego(form,regresar,donde,idmenumodulo) {
	var v_nombre=$("#v_nombre").val();
	var v_descripcion=$("#v_descripcion").val();
	var v_servicio=$("#v_servicio").val();
	var v_tipojuego=$("#v_tipojuego").val();
	var v_tipopartido=$("#v_tipopartido").val();
	var v_deporte=$("#v_deporte").val();
	var v_estatus=$("#v_estatus").val();
	var idjuego=$("#id").val();
	var v_tipocompe=$("#v_tipocompe").val();

	var datos="id="+idjuego+"&v_nombre="+v_nombre+"&v_descripcion="+v_descripcion+"&v_servicio="+v_servicio+"&v_tipojuego="+v_tipojuego+"&v_tipopartido="+v_tipopartido+"&v_deporte="+v_deporte+"&v_estatus="+v_estatus+"&arraygrupos="+JSON.stringify(arraygrupos)+"&v_tipocompe="+v_tipocompe+"&arrayparejas="+JSON.stringify(arrayparejas);

	$.ajax({
					url:'catalogos/armarjuego/ga_juego.php', //Url a donde la enviaremos
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
							
						
						}
					});

}

function GenerarRol() {
	var idservicio=$("#v_servicio").val();
	var datos="idservicio="+idservicio+"&arraygrupos="+JSON.stringify(arraygrupos);
	
			$.ajax({
					url:'catalogos/armarjuego/roldejuego.php', //Url a donde la enviaremos
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

							var respuesta=msj.respuesta;
							roljuego=respuesta;
							PintarRounRobind(respuesta);

							
						
						}
					});
	
	
}


function SeleccionarTipoCompetencia() {
	var v_tipocompe=$("#v_tipocompe").val();
	$(".divgrupo").css('display','none');

	if (v_tipocompe==1) {
		$(".divgrupo").css('display','block');
		$(".btngeneralrol").attr('onclick','GenerarRol()');

	}

	if (v_tipocompe==2) {
		$(".divgrupo").css('display','none');
		$(".grupos").html('');
		$(".btngeneralrol").attr('onclick','GenerarRolLlaves()');
		$(".roles").html('');
	}
}

function PintarRounRobind(roldejuego) {
	var html="";
	if (roldejuego.length>0) {

		for (var a = 0; a < roldejuego.length; a++) {
				console.log(roldejuego[a]);
			respuesta=roldejuego[a].rolesdejuego;

		html+=`<h4 style="font-size: 20px!important;">GRUPO `+roldejuego[a].nombregrupo+`</h4>`;

		for (var i = 0; i < respuesta.length; i++) {
			
			html+=`

			<strong>RONDA `+respuesta[i].round+`</strong>`;

			var roles=respuesta[i].roles;
			var descanza=[];
			var contador=1;
			var cantidadroles=roles.length;
	for (var j = 0; j < roles.length; j++) {
		

		if (roles[j].jugar==0) {
			descanza.push(roles[j]);

		}else{

				html+=`<div class="table-striped matchday-games mb-3" id="games-matchday-1" data-matchday="1">
			    <div class="bg-primary text-white p-2 mb-2">
			        <div class="d-sm-flex">
			            <div>
			                <strong>PARTIDO `+contador+`</strong>
			             </div>
				         <div class="ml-sm-auto mt-2 mt-sm-0">
						        
					            </div>
			          </div>
			    </div>
			    <div class="py-2 mb-4">
			        <div class="row font-weight-bold flex-md-nowrap">
			                <div class="d-none d-md-table-cell col-2"></div>
			                <div class="text-right col">Local</div>
			                <div class="text-center col-3 col-md-2">Resultado</div>
			                <div class="col">Visitante</div>
			                        <div class="d-none d-md-table-cell col-1"></div>
			        </div>
			    </div>

		<div class="list-with-dividers">
			                                            



			<div class="row  flex-md-nowrap" id="game-2799882">
			                    <div class="d-none d-md-table-cell col-2">
			            <div id="date-game-2799882">
			   			 <span class="">
			             
			                        </span>
			        </div>
					<div id="venue-game-2799882" class="text-truncate-container text-center text-sm-left">
			                       
			            </div>
			                                </div>
			                <div class="col">
				            <div class="media media-players  text-right"><div class="media-body  players-names text-truncate">
						            <div class="player text-truncate-container h-osm-45p h-omd-45p h-oxs-35p d-block">
							            <div class="text-truncate-ellipsis">
								            <a class="ajaxLinkLoading" >`+roles[j].pareja1.nombreparticipante1+`
								            </a>
							            </div>
						            </div>
						            <div class="player player2 text-truncate-container d-block mt-dmd-m15p">
							            <div class="text-truncate-ellipsis">
								            <a class="ajaxLinkLoading" >`+roles[j].pareja1.nombreparticipante2+`
								            </a>
							            </div>
						            </div>
					            </div>`;
			           			html+=`
			           			 <div class="d-lg-flex mr-0 mr0 d-none d-sm-block"><div class="media-right hw-30p hw-sm-40p ml-3 ">
				           			 <a class="image-popup" >
					          	  		<img height="50px" width="50px" class="img-fluid " style="border-radius:10px;" src="`+roles[j].pareja1.foto1+`" alt="">
				           			 </a>
			           			 </div>
			           			 <div class="media-right media2 hw-30p hw-sm-40p mt-dmd-m15p ml-lg-m10p  ">
				           			 <a class="image-popup" >
					          	  		<img height="50px" width="50px" class="img-fluid " style="border-radius:10px;" src="`+roles[j].pareja1.foto2+`" alt="">
				           			 </a>
			           			 </div>
			           			 </div>
			           			 </div>`;       
			           	
			           		html+=` </div>
					        <div class="text-center col col-md-2">
					            <span class="font-weight-bold">-</span><br>
					        </div>

			        <div class="col">
			            <div class="media media-players "><div class="d-lg-flex mr-0 mr0 d-none d-sm-block">
				            <div class="media-left hw-30p hw-sm-40p ">
				            	<a class="image-popup" >
					          	  <img height="50px" width="50px" class="img-fluid " style="border-radius:10px;" src="`+roles[j].pareja2.foto1+`" alt="">
					            </a>
				            </div>
				            <div class="media-left media2 hw-30p hw-sm-40p mt-dmd-m15p ml-lg-m10p mr-3 ">
					            <a class="image-popup" >
					           	 <img height="50px" width="50px" class="img-fluid " style="border-radius:10px;" src="`+roles[j].pareja2.foto2+`" alt="">
					            </a>
				            </div>
				            </div>
				            <div class="media-body  players-names text-truncate">
					            <div class="player text-truncate-container h-osm-45p h-omd-45p h-oxs-35p d-block"><div class="text-truncate-ellipsis">
						            <a class="ajaxLinkLoading" >`+roles[j].pareja2.nombreparticipante1+`
						            </a>
					            </div>
				            </div>
				            <div class="player player2 text-truncate-container d-block mt-dmd-m15p">
					            <div class="text-truncate-ellipsis">
						            <a class="ajaxLinkLoading" >`+roles[j].pareja2.nombreparticipante2+`
						            </a>
					            </div>
				            </div>
			            </div>
			            </div>       
			             </div>
			    
			    <div class="d-block d-md-none mt-1 text-center col-12">
			        <div id="date-game-2799882">
			    <span class="">
			              
			                    `;
			                    
			                    var lugarhorario="";
			                    if(roles[j].horario!=null) {
			                    	var dividirfecha=roles[j].horario.fecha.split('-');
			                   	lugarhorario=`<span>`+roles[j].horario.nombre+` `;
			                   	lugarhorario+=dividirfecha[2]+'-'+dividirfecha[1]+'-'+dividirfecha[0]+` `;
			                    lugarhorario+=roles[j].horario.horainicial+`-`+roles[j].horario.horafinal+`</span>`;

			                	}

			                    html+=` 
			                     <a  class=" ">`+lugarhorario+`              
			                   </a>
			                        </span>
			        </div>
			<div id="venue-game-2799882" class="text-truncate-container text-center text-sm-left">

			            </div>
			                        <div class="mt-1">
										   
										   

									    </div>
									</div>
								</div>               

							 </div>

							  <div class="row">
							  	<div class="col">Horario</div>
							   </div>
			    
			           
			    </div>




						`;

						contador++;
				}


				var igual=j+1;
				if (igual==cantidadroles) {

					if (descanza.length>0) {

						for (var k = 0; k <descanza.length; k++) {
							
							if(roles[j].pareja1.nombreparticipante1!=undefined){
								html+=`

							 <div class="border-top pt-3 mt-3 mb-4">
			           			 Descansa: `+roles[j].pareja1.nombreparticipante1+` / `+roles[j].pareja1.nombreparticipante2+`</div>
							`;
							}else{

									html+=`

							 <div class="border-top pt-3 mt-3 mb-4">
			           			 Descansa: `+roles[j].pareja2.nombreparticipante1+` / `+roles[j].pareja2.nombreparticipante2+`</div>
							`;
								
							}
						}
					}
				}
			}
		}
	}
}

	$(".roles").html(html);
}

function GenerarRolLlaves() {
		var idservicio=$("#v_servicio").val();

		$("#writeHere").html('');
		var arrayparejas=[];
		$(".nuevapareja").each(function() {

			  var id=$(this).attr('id');
			  var dividir=id.split('_')[1];
			  
			  var idparti1=$("#participante_"+dividir+"_0").val();
			  var idparti2=$("#participante_"+dividir+"_1").val();
			  var nombreparticipante1=$("#participante_"+dividir+"_0 option:selected" ).text();
			  var nombreparticipante2=$("#participante_"+dividir+"_1 option:selected" ).text();
			  var numeropareja=$(".ordenar_"+dividir+"_0").text();
			  var parejas={
			  	numeropareja:numeropareja,
			  	participante1:idparti1,
			  	participante2:idparti2,
			  	nombreparticipante1:nombreparticipante1,
			  	nombreparticipante2:nombreparticipante2
			  };

			  arrayparejas.push(parejas);
			});
	    var datos="idservicio="+idservicio+"&arrayparejas="+JSON.stringify(arrayparejas);

			$.ajax({
					url:'catalogos/armarjuego/roldejuegollaves.php', //Url a donde la enviaremos
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
							var respuesta=msj.respuesta;
							roldejuegollaves=respuesta;
							console.log(respuesta);
						//$(".roles").html(msj);
							Creacionllave(respuesta);
						
						}
					});
}


function GuardarJuego(form_usuario,regreso,donde,idmenumodulo) {
	if(confirm("\u00BFEstas seguro de querer realizar esta operaci\u00f3n?"))
	{
		var datos = ObtenerDatosFormulario(form_usuario);//obteniedo los datos del formulario
		datos+="&parejas="+JSON.stringify(arrayparejas);
		datos+="&rolesdejuego="+JSON.stringify(roljuego);
		datos+="&roljuegollaves="+JSON.stringify(roljuegollaves);

		//$('#abc').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Cargando...</div>');
	
		//setTimeout(function(){
				  $.ajax({
					  type: 'POST',
					  url:'catalogos/armarjuego/ga_juego.php', //Url a donde la enviaremos
					  data: datos,
					  error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $('#abc').html('<div class="alert_error">'+error+'</div>');	
						 aparecermodulos(regreso+"?ac=0&msj=Error. "+msj,donde);

					  },
					  success:function(msj){
						   console.log("El resultado de msj es: "+msj);
						  if ( msj == 1 ){
							 
							  //aparecermodulos(regreso+"?ac=1&msj=Operacion realizada con exito&idmenumodulo="+idmenumodulo,donde);
						  }
						  else{
							
							 //aparecermodulos(regreso+"?ac=0&msj=Error. "+msj,donde);
						  }	
					  }
				  });				  					  
		//},1000);
	}
}
