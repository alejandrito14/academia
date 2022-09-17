var arrayquitar=[];
var arrayagregar=[];
function UsuariosServicio(idservicio) {
	
	var datos="idservicio="+idservicio;
	$.ajax({
	  url:'catalogos/asignarusuarioservicios/Obtenerasignacion.php', //Url a donde la enviaremos
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
	  		arrayquitar=[];
	  		arrayagregar=[];
	  		var servicio=msj.servicio[0];
	  		$(".tituloseleccionado").html('<span style="font-weight: 400;">ASIGNAR A SERVICIO:</span> <span style="font-weight: bold;">'+servicio.titulo+'</span>');
		 	$(".descripcionseleccionado").html('<span style="font-weight: 400;">DESCRIPCION:</span> <span style="font-weight: bold;">'+servicio.descripcion+'</span>');

			$("#periodoinicial").html(servicio.fechainicialformato);
			$("#periodofinal").html(servicio.fechafinalformato);

		 	$(".item").removeClass('active');
		 	$("#lista_"+idservicio).addClass('active');
			$("#listausuarios").css('display','block');
			$(".mostrar").css('display','block');
			$(".btnguardar").attr('onclick','GuardarAsignacion('+idservicio+')');
			$("#btnconsultar").attr('onclick','ObterHorariosServicio('+idservicio+')');

			$(".chkcliente").prop('checked',false);
				var usuarios=msj.respuesta;
						if (usuarios.length>0) {

							for (var i =0; i <usuarios.length; i++) {
								
								$("#inputcli_"+usuarios[i].idusuarios).prop('checked',true);
							}
						}

		}
	});
}



function GuardarAsignacion(idservicio) {

			var participantes=[];

		$(".chkcliente").each(function(){
			var valor=$(this).attr('id');
			var id=valor.split('_')[1];

			if ($("#"+valor).is(':checked')) {
				participantes.push(id);
			}
		});

	
	var datos="idservicio="+idservicio+"&participantes="+participantes+"&arrayquitar="+arrayquitar+"&arrayagregar="+arrayagregar;
	$.ajax({
	  url:'catalogos/asignarusuarioservicios/GuardarAsignacion.php', //Url a donde la enviaremos
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

	  	arrayquitar=[];
	  	arrayagregar=[];
		 var respuesta=msj.respuesta;
		 var usuariosnoagregados=msj.usuariosnoagregados;
		 UsuariosServicio(idservicio);
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

		 }else{

			AbrirNotificacion("SE REALIZARON LOS CAMBIOS CORRECTAMENTE","mdi-checkbox-marked-circle ")
 	
		 }

			 			
			

		
		}
	});
}

function ActualizarServicios() {
		
	var datos="";
	$.ajax({
	  url:'catalogos/asignarusuarioservicios/ObtenerServicios.php', //Url a donde la enviaremos
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
		 	if (msj.respuesta==1) {

				
		 	}
		
		}
	});
}

function ObterHorariosServicio(idservicio) {
	
		 $("#myModalHorarios").modal();
		 $('#picker').markyourcalendar({
	          			 startDate: new Date(),
			             months: ['ene','feb','mar','abr','may','jun','jul','agos','sep','oct','nov','dic'],
			              weekdays: ['dom','lun','mar','mier','jue','vier','sab'],
			           	 isMultiple: true,
						});
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
							PintarHorariosServicio2(horarios,servicio);
						}


					}
				});

}
function PintarHorariosServicio2(horarios,servicio) {
	HorariosDisponibles3(servicio);
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

	

   PintarSeleccionados2();
	//Resumenfechas();
}


function HorariosDisponibles3(servicio) {
	var v_zonas=[];
	arraydiaselegidos=[];
	arraydiaseleccionados=[];
		$(".myc-day-time-container").html('');
//Resumenfechas();
	/*$(".chkzona").each(function( index ) {
	 if($( this ).is(':checked')){

	 		var id=$(this).attr('id');
	 		var dividir=id.split('_');

	 		v_zonas.push(dividir[1]);

			 }

	 	;
	});*/


	/*var domingo=0,lunes=0,martes=0,miercoles=0,jueves=0,Viernes=0,sabado=0;
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
		}*/	

	//if(v_zonas.length>0){

	/*var v_categoria=$("#v_categoriaservicio").val();
	var v_tipocategoria=$("#v_categoria").val();
	var v_fechainicial=$("#v_fechainicial").val();
	var v_fechafinal=$("#v_fechafinal").val();*/
	
	console.log(servicio);
		var v_zonas="";
		var datos="domingo="+servicio.domingo+"&lunes="+servicio.lunes+"&martes="+servicio.martes+"&miercoles="+servicio.miercoles+"&jueves="+servicio.jueves+"&viernes="+servicio.viernes+"&sabado="+servicio.sabado+"&v_categoria="+servicio.idcategoriaservicio+"&v_tipocategoria="+servicio.idcategoria+"&v_fechainicial="+servicio.fechainicial+"&v_fechafinal="+servicio.fechafinal+"&v_zonas="+v_zonas;

			$.ajax({
					url: 'catalogos/servicios/ObtenerHorarios.php', //Url a donde la enviaremos
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

						var v_fechainicial=msj.fechadia;
						var dividirfecha=v_fechainicial.split('-');
							
						 $('#picker').markyourcalendar({
	          			 startDate: new Date(dividirfecha[0],dividirfecha[1]-1,dividirfecha[2]),
			             months: ['ene','feb','mar','abr','may','jun','jul','agos','sep','oct','nov','dic'],
			              weekdays: ['dom','lun','mar','mier','jue','vier','sab'],
			           	 isMultiple: true,


						});



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
								 			console.log(''+horainicial);

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

						 PintarSeleccionados2();
						 //CargarEventoSeleccionador();
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

function PintarSeleccionados2() {
	console.log(arraydiaselegidos);
		if (arraydiaselegidos.length>0) {
		for (var i = 0; i <arraydiaselegidos.length; i++) {
		
			var id=arraydiaselegidos[i];
			
			var iddividido=arraydiaselegidos[i].split('-');

			if (!!document.getElementById(id)) {
			var element = document.getElementById(id);
				element.classList.add("activohorario");
	
				var zonaelegida =zonasarray.find( zona => zona.idzona === iddividido[5]);
				var color=zonaelegida.color;
 				element.style.border="1px solid "+color;
			}
		}
	}



}


function CapturarValor(idcliente) {
	
	if ($("#inputcli_"+idcliente).is(':checked')) {
		var resp=BuscarEnarrayQuitar(idcliente);
		arrayagregar.push(idcliente)

	}else{
		var resp=BuscarEnarrayagregar(idcliente);
		arrayquitar.push(idcliente);
	}



}


function BuscarEnarrayQuitar(idcliente) {
	if (arrayquitar.length>0) {
		for (var i = 0; i <arrayquitar.length; i++) {
			if (arrayquitar[i] === idcliente) {

				arrayquitar.splice(i,1);
			}
		}
	}
}
function BuscarEnarrayagregar(idcliente) {
	if (arrayagregar.length>0) {
		for (var i = 0; i <arrayagregar.length; i++) {

			if (arrayagregar[i] === idcliente) {

				arrayagregar.splice(i,1);
			}
		}
	}
}