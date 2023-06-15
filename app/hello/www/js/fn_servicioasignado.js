  var participastesalumnosservicio="";
    var listaalumnos="";
    var usuariosquitados=[];
    var usuariosagregados=[];
    var dynamicSheet2="";

    function MensajeNoacceso() {
    	alerta('','No se encuentran opiniones registradas');
    }

    function MensajeNoaccesoEvaluacion() {
    	alerta('','No se encuentran evaluaciones registradas');
    }
function ObtenerServicioAsignado() {
	
	var idusuarios_servicios=localStorage.getItem('idusuarios_servicios');
	var pagina = "ObtenerServicioAsignado.php";
	var id_user=localStorage.getItem('id_user');
	var idtipousuario=localStorage.getItem('idtipousuario');
	var datos="id_user="+id_user+"&idusuarios_servicios="+idusuarios_servicios+"&idtipousuario="+idtipousuario;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		async:false,
		success: function(datos){
			var invitado=datos.invitado;
			var respuesta=datos.respuesta;
			var imagen=respuesta.imagen;
			var horarios=datos.horarios;
			var idservicio=respuesta.idservicio;
			var puedeinvitar=datos.puedeinvitar;
			var invitados=datos.invitados;
			var habilitarcancelacion=datos.habilitarcancelacion;
			var opiniones=datos.opiniones;
			var evaluaciones=datos.evaluaciones;
			var calificacion=datos.calificacion;
			var politicaaceptacion=datos.politicaaceptacion;
			localStorage.setItem('idservicio',idservicio);
			  ObtenerImagenesGrupalServicio();
			  ObtenerImagenesIndividualServicioUsuario();
			  VerificarcantidadhorariosAdmin();
		      VerificarSihayEvaluacionUsuario();
			  ConsultarSihayComentarios();
			  ObtenerParticipantesAlumnos();
			var cantidadhorarios=horarios.length;
			$(".cantidadhorarios").text(cantidadhorarios);
			if (imagen!=null && imagen!='' && imagen!='null') {

				imagen=urlimagenes+`servicios/imagenes/`+codigoserv+imagen;
	
			}else{


				imagen=urlimagendefaultservicio;
			}
			$(".imgservicioasignado").attr('src',imagen);

			$(".tituloservicio").text(respuesta.titulo);

			var fechainicial=respuesta.fechainicial.split('-');
			var fechafinal=respuesta.fechafinal.split('-');
			var fechai=fechainicial[2]+'/'+fechainicial[1]+'/'+fechainicial[0];
			var fechaf=fechafinal[2]+'/'+fechafinal[1]+'/'+fechafinal[0];

			$(".fechasservicio").text(fechai+' - '+fechaf);

			var horarioshtml="";

             if (respuesta.fechaproxima!='') {
             	horarioshtml+=`<span>`+respuesta.fechaproxima+` `+respuesta.horainicial+` - `+respuesta.horafinal+` Hrs.</span></br>`;
             }
             if (politicaaceptacion.length>0) {
            
             $(".descripcionpoliticas").text(politicaaceptacion[0].descripcion);
             
             }else{
               $(".descripcionpoliticas").text(respuesta.politicasaceptacion);
	
             }
			$(".colocarhorarios").html(horarioshtml);

			$(".cantidadtotal").text(respuesta.numeroparticipantesmax);
			$(".comentariosservicio").attr('onClick','MensajeNoacceso()');

			if (opiniones.length>0) {
				$(".comentariosservicio").attr('onClick','GoToPage("comentariosservicio")');
				$(".divopiniones").addClass('iconos');
			}
			$(".evaluacionservicio").attr('onClick','MensajeNoaccesoEvaluacion()');

			if (evaluaciones.length>0) {
				$(".divevaluacionesicono").addClass('iconos');
				$(".evaluacionservicio").attr('onClick','GoToPage("evaluacionesservicio")');
		
			}

			if (calificacion.length>0) {
				$(".divcalificacion").addClass('iconos');
		
			}
				$("#permisoasignaralumno").css('display','none');
			if (localStorage.getItem('idtipousuario')==3) {
				ObtenerInvitados();

				if (respuesta.ligarcliente==1 && invitado==0 && puedeinvitar==0) {

				$("#permisoasignaralumno").css('display','block');
				}

				if (puedeinvitar==1) {

					if (invitados.length>0) {
						var html="";
						for (var i = 0; i <invitados.length; i++) {
						html+=`
								<div class="col">
									`+invitados[i].nombre+`
								</div>
								`;


						}

						$("#permisoasignaralumno").html(html);
					}

				}


			}
		if (localStorage.getItem('idtipousuario')==5) {

				if (respuesta.abiertocoach == 1) {
					$("#permisoasignaralumno").css('display','block');
					$(".habilitareliminacion").css('display','block');
				}
			}

	if (localStorage.getItem('idtipousuario')==0) {


			if (respuesta.abiertoadmin == 1) {
				$("#permisoasignaralumno").css('display','block');
				$(".habilitareliminacion").css('display','block');


			}
		}
			
			if (respuesta.controlasistencia==1) {
				
				$(".divasistencia").css('display','block');

			}

			if (habilitarcancelacion==1) {

				$(".divcancelar").css('display','block');
			}else{
				$(".divcancelar").css('display','none');

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


function ObtenerServicioAsignado2() {
	
	var idservicio=localStorage.getItem('idservicio');
	var pagina = "ObtenerServicioAsignado2.php";
	var id_user=localStorage.getItem('id_user');
	var idtipousuario=localStorage.getItem('idtipousuario');
	var datos="id_user="+id_user+"&idservicio="+idservicio+"&idtipousuario="+idtipousuario;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		async:false,
		success: function(datos){
			var invitado=datos.invitado;
			var respuesta=datos.respuesta;
			var imagen=respuesta.imagen;
			var horarios=datos.horarios;
			var idservicio=respuesta.idservicio;
			var puedeinvitar=datos.puedeinvitar;
			var invitados=datos.invitados;
			var habilitarcancelacion=datos.habilitarcancelacion;
			var opiniones=datos.opiniones;
			var evaluaciones=datos.evaluaciones;
			var idusuarios_servicios=datos.idusuarios_servicios;
			var calificacion=datos.calificacion;
			var politicaaceptacion=datos.politicaaceptacion;



			localStorage.setItem('idusuarios_servicios',idusuarios_servicios);
			localStorage.setItem('idservicio',idservicio);
			  ObtenerImagenesGrupalServicio();
			  ObtenerImagenesIndividualServicioUsuario();
			  VerificarcantidadhorariosAdmin();
  			  VerificarSihayEvaluacionUsuario();
  			  ConsultarSihayComentarios();
  			  ObtenerParticipantesAlumnos();

			var cantidadhorarios=horarios.length;
			$(".cantidadhorarios").text(cantidadhorarios);
			if (imagen!=null && imagen!='' && imagen!='null') {

				imagen=urlimagenes+`servicios/imagenes/`+codigoserv+imagen;
	
			}else{


				imagen=urlimagendefaultservicio;
			}
			$(".imgservicioasignado").attr('src',imagen);

			$(".tituloservicio").text(respuesta.titulo);

			var fechainicial=respuesta.fechainicial.split('-');
			
			var fechafinal=respuesta.fechafinal.split('-');
			var fechai=fechainicial[2]+'/'+fechainicial[1]+'/'+fechainicial[0];
			var fechaf=fechafinal[2]+'/'+fechafinal[1]+'/'+fechafinal[0];

			$(".fechasservicio").text(fechai+' - '+fechaf);

			var horarioshtml="";

             if (respuesta.fechaproxima!='') {
             	horarioshtml+=`<span>`+respuesta.fechaproxima+` `+respuesta.horainicial+` - `+respuesta.horafinal+` Hrs.</span></br>`;
             }

		if (politicaaceptacion.length>0) {
            
             $(".descripcionpoliticas").text(politicaaceptacion[0].descripcion);
             
             }else{
               $(".descripcionpoliticas").text(respuesta.politicasaceptacion);
	
             }			

             $(".colocarhorarios").html(horarioshtml);

			$(".cantidadtotal").text(respuesta.numeroparticipantesmax);
			$(".comentariosservicio").attr('onClick','MensajeNoacceso()');

			if (opiniones.length>0) {
				$(".comentariosservicio").attr('onClick','GoToPage("comentariosservicio")');
				$(".divopiniones").addClass('iconos');
			}
			$(".evaluacionservicio").attr('onClick','MensajeNoaccesoEvaluacion()');

			if (evaluaciones.length>0) {
				$(".divevaluacionesicono").addClass('iconos');
				$(".evaluacionservicio").attr('onClick','GoToPage("evaluacionesservicio")');
		
			}
			if (calificacion.length>0) {
				$(".divcalificacion").addClass('iconos');
		
			}
				$("#permisoasignaralumno").css('display','none');
			if (localStorage.getItem('idtipousuario')==3) {

				if (respuesta.ligarcliente==1 && invitado==0 && puedeinvitar==0) {

				$("#permisoasignaralumno").css('display','block');
				}

				if (puedeinvitar==1) {

					if (invitados.length>0) {
						var html="";
						for (var i = 0; i <invitados.length; i++) {
						html+=`
								<div class="col">
									`+invitados[i].nombre+`
								</div>
								`;


						}

						$("#permisoasignaralumno").html(html);
					}

				}


			}
		if (localStorage.getItem('idtipousuario')==5) {

				if (respuesta.abiertocoach == 1) {
					$("#permisoasignaralumno").css('display','block');
				}
			}

	if (localStorage.getItem('idtipousuario')==0) {


			if (respuesta.abiertoadmin == 1) {
				$("#permisoasignaralumno").css('display','block');
			}
		}
			
			if (respuesta.controlasistencia==1) {
				
				$(".divasistencia").css('display','block');

			}

			if (habilitarcancelacion==1) {

				$(".divcancelar").css('display','block');
			}else{
				$(".divcancelar").css('display','none');

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

function ObtenerServicioAsignadoCoach() {
	var pagina = "ObtenerServicioAsignadoCoach.php";
	var idservicio=localStorage.getItem('idservicio');
	//var pagina = "ObtenerServicioAsignado.php";
	var id_user=localStorage.getItem('id_user');
	var idtipousuario=localStorage.getItem('idtipousuario');
	var datos="id_user="+id_user+"&idservicio="+idservicio+"&idtipousuario="+idtipousuario;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		async:false,
		success: function(datos){
			var invitado=datos.invitado;
			var respuesta=datos.respuesta;
			var imagen=respuesta.imagen;
			var horarios=datos.horarios;
			var idservicio=respuesta.idservicio;
			var puedeinvitar=datos.puedeinvitar;
			var invitados=datos.invitados;
			var habilitarcancelacion=datos.habilitarcancelacion;
			var idusuarios_servicios=datos.idusuarios_servicios;
			localStorage.setItem('idusuarios_servicios',idusuarios_servicios);
			localStorage.setItem('idservicio',idservicio);
			  ObtenerImagenesGrupalServicio();
			  ObtenerParticipantesAlumnos();
			  VerificarcantidadhorariosAdmin();
			  VerificarSihayEvaluacion();


			  var cantidadhorarios=horarios.length;
			$(".cantidadhorarios").text(cantidadhorarios);
			if (imagen!=null && imagen!='' && imagen!='null') {

				imagen=urlimagenes+`servicios/imagenes/`+codigoserv+imagen;
	
			}else{


				imagen=urlimagendefaultservicio;
			}
			$(".imgservicioasignado").attr('src',imagen);

			$(".tituloservicio").text(respuesta.titulo);

			var fechainicial=respuesta.fechainicial.split('-');
			var fechafinal=respuesta.fechafinal.split('-');
			var fechai=fechainicial[2]+'/'+fechainicial[1]+'/'+fechainicial[0];
			var fechaf=fechafinal[2]+'/'+fechafinal[1]+'/'+fechafinal[0];

			$(".fechasservicio").text(fechai+' - '+fechaf);

			var horarioshtml="";

             if (respuesta.fechaproxima!='') {
             	horarioshtml+=`<span>`+respuesta.fechaproxima+` `+respuesta.horainicial+` - `+respuesta.horafinal+` Hrs.</span></br>`;
             }

             $(".descripcionpoliticas").text(respuesta.politicasaceptacion);
			$(".colocarhorarios").html(horarioshtml);

			$(".cantidadtotal").text(respuesta.numeroparticipantesmax);


				$("#permisoasignaralumno").css('display','none');
			if (localStorage.getItem('idtipousuario')==3) {

				if (respuesta.ligarcliente==1 && invitado==0 && puedeinvitar==0) {

				$("#permisoasignaralumno").css('display','block');
				}

				if (puedeinvitar==1) {

					if (invitados.length>0) {
						var html="";
						for (var i = 0; i <invitados.length; i++) {
						html+=`
								<div class="col">
									`+invitados[i].nombre+`
								</div>
								`;


						}

						$("#permisoasignaralumno").html(html);
					}

				}


			}
		if (localStorage.getItem('idtipousuario')==5) {

				if (respuesta.abiertocoach == 1) {
					$("#permisoasignaralumno").css('display','block');
				}
			}

	if (localStorage.getItem('idtipousuario')==0) {


			if (respuesta.abiertoadmin == 1) {
				$("#permisoasignaralumno").css('display','block');
			}
		}
			
			if (respuesta.controlasistencia==1) {
				
				$(".divasistencia").css('display','block');

			}

			if (habilitarcancelacion==1) {

				$(".divcancelar").css('display','block');
			}else{
				$(".divcancelar").css('display','none');

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

function PintarHorarios(horarios) {
		var horarioshtml="";
	for (var i = 0; i < horarios.length; i++) {
			
      horarioshtml+=`<span>`+horarios[i].diasemana.slice(0,3) +` `+horarios[i].horainicial+` - `+horarios[i].horafinal+` Hrs.</span></br>`;
                    
	}

	$(".colocarhorarios").html(horarioshtml);
}

function AceptarTerminos() {
	 app.dialog.confirm('','¿Está seguro  de aceptar el servicio?' , function () {
	var idusuarios_servicios=localStorage.getItem('idusuarios_servicios');
	var pagina = "AceptarTerminos.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user+"&idusuarios_servicios="+idusuarios_servicios;
	CrearModalEsperaDialog();


	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){


         $(".mensajeproceso").css('display','none');
         $(".mensajeerror").css('display','none');
         $(".mensajeexito").css('display','block');
         $(".botonok").css('display','block');

		 
			if (datos.respuesta==1) {
				
				GoToPage('serviciosasignados');
			}
			
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
					$(".mensajeproceso").css('display','none');
                    $(".mensajeerror").css('display','block');
                    $(".mensajeexito").css('display','none');
                    $(".botonok").css('display','block');
			}

		});
	 });
}



function PantallaRechazarTerminos() {
	 var html=`
         
              <div class="">

                <div class="row" style="padding-top:1em;">
                	<label style="font-size:16px;padding:1px;">Motivo:</label>
                	<textarea name="" id="txtcomentariorechazo" cols="30" rows="3"></textarea>
               	<span class="mensajemotivo"></span>
                </div>
              </div>
           
         
        `;
       app.dialog.create({
          title: 'Rechazar servicio',
          //text: 'Dialog with vertical buttons',
          content:html,
          buttons: [
            {
              text: 'Cancelar',
            },
            {
              text: 'Aceptar',
            },
            
          ],

           onClick: function (dialog, index) {
            if(index === 0){
             
          }
          else if(index === 1){
               RechazarTerminos();

            }

        },
          verticalButtons: false,
        }).open();
	
}

function RechazarTerminos() {
	var idusuarios_servicios=localStorage.getItem('idusuarios_servicios');
	var pagina = "RechazarTerminos.php";
	var id_user=localStorage.getItem('id_user');
	var motivo=$("#txtcomentariorechazo").val();
	var datos="id_user="+id_user+"&idusuarios_servicios="+idusuarios_servicios+"&motivocancelacion="+motivo;

	if (motivo!='' && motivo.length>=10) {
			app.dialog.close();
			CrearModalEsperaDialog();

	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){

			if (datos.respuesta==1) {

				 $(".mensajeproceso").css('display','none');
        		 $(".mensajeerror").css('display','none');
         		 $(".mensajeexito").css('display','block');
         		 $(".botonok").css('display','block');
			
				//alerta('','Operación realizada');
				GoToPage('home');
			}
			
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
					$(".mensajeproceso").css('display','none');
                    $(".mensajeerror").css('display','block');
                    $(".mensajeexito").css('display','none');
                    $(".botonok").css('display','block');
			}

		});
	}else{

		alerta('','Para continuar coloque un motivo de rechazo, cantidad mínima de 10 caracteres');
	}
}


function ObtenerCalificacion() { 
	 return new Promise(function(resolve, reject) {
	var idusuarios_servicios=localStorage.getItem('idusuarios_servicios');
	var id_user=localStorage.getItem('id_user');
	
	var datos="idusuarios_servicios="+idusuarios_servicios+"&id_user="+id_user;
	var pagina="ObtenerCalificacionUsuarioServicio.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(resp){
			
			resolve(resp);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});

	});
}
function PantallaCalificacion(respuesta) {
		
       var html=`
         
              <div class="block">
               <div class="row">
                  
                <div class="col" >
                	<div>
                	 <i class="bi bi-star iconosestrella estrellaseleccionada" id="estre_1"  onclick="Cambio(1)">  </i>
	                	 <div class="oculto">
	                	 <input type="checkbox"  id="che_1" >
	                	</div>
                	</div>
               
               </div>
                 <div class="col"  >
                 	<div >
	                  <i class="bi bi-star iconosestrella estrellaseleccionada" id="estre_2" onclick="Cambio(2)"></i>
	               		<input type="checkbox" class="oculto" id="che_2"  >
               		</div>
                </div>
                <div class="col" >
	                  <div  >
		                   <i class="bi bi-star iconosestrella estrellaseleccionada" id="estre_3" onclick="Cambio(3)" ></i>
		                	<input type="checkbox" class="oculto" id="che_3"  >
	                  </div>
                 </div>
                   <div class="col" >
                   <div  >
                   	    <i class="bi bi-star iconosestrella estrellaseleccionada" id="estre_4" onclick="Cambio(4)"></i>
                 		<input type="checkbox" class="oculto" id="che_4" >
                 	</div>
                  </div>
                    <div class="col" >   
	                    <div  >              
	                     	 <i class="bi bi-star iconosestrella estrellaseleccionada" id="estre_5" onclick="Cambio(5)" ></i>
	                 		 <input type="checkbox" class="oculto" id="che_5"  >
	                   	</div>
                    </div>
               

                </div>

                <div class="row" style="padding-top:1em;">
                	<label style="font-size:16px;padding:1px;">Comentarios:</label>
                	<textarea name="" id="txtcomentario" cols="30" rows="3"></textarea>
                </div>
              </div>
           
         
        `;
       app.dialog.create({
          title: 'Califica el servicio',
          //text: 'Dialog with vertical buttons',
          content:html,
          buttons: [
            {
              text: 'Cancelar',
            },
            {
              text: 'Calificar',
            },
            
          ],
           onClick: function (dialog, index) {
                    if(index === 0){
               
          }
          else if(index === 1){
             	CalificarServicio();

            }
           
        },
          verticalButtons: false,
        }).open();
	var calificacion=respuesta.calificacion;
	if (calificacion.length>0) {
		var cantidad=calificacion[0].calificacion;
		Cambio(cantidad);
		disableClicks();
		$("#txtcomentario").val(calificacion[0].comentario);
		$("#txtcomentario").attr('disabled',true);

	}
}

function disableClicks() {
  $(".iconosestrella").attr('onclick','');
  $(".dialog-buttons").html('<span class="dialog-button" onclick="CerrarModal()">Cerrar</span>');


}
function CerrarModal() {
	app.dialog.close();
}


function CalificarServicio() {
	var idusuarios_servicios=localStorage.getItem('idusuarios_servicios');
	var id_user=localStorage.getItem('id_user');
	var calificacion=$(".colorestrella").length;
	var txtcomentario=$("#txtcomentario").val();
	var datos="idusuarios_servicios="+idusuarios_servicios+"&calificacion="+calificacion+"&txtcomentario="+txtcomentario+"&id_user="+id_user;
	var pagina="GuardarCalificacion.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			var respuesta=datos.respuesta;
			
			alerta('','Se guardó calificacion');

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}

function SeleccionarEstrella(cantidad) {
	var colocar=0;
	if ($("#che_"+cantidad).is(':checked')) {

		
		colocar=0;

	}else{
		
		colocar=1;

	}

	if (colocar==1) {
		/*$("#estre_"+cantidad).removeClass('bi-star');
		$("#estre_"+cantidad).addClass('bi-star-fill');*/
		if (cantidad>=1) {
			for (var i = 1; i <=cantidad; i++) {
				$("#estre_"+i).removeClass('bi-star');
				$("#estre_"+i).addClass('bi-star-fill');
				$("#estre_"+i).addClass('colorestrella');

				$("#che_"+i).attr('checked',true);
			}
		}
		
	}else{
			
			for (var i = 1; i <= 5; i++) {
				$("#estre_"+i).removeClass('bi-star-fill');
				$("#estre_"+i).addClass('bi-star');
				$("#estre_"+i).removeClass('colorestrella');

				$("#che_"+i).attr('checked',false);
			}

			if (cantidad>=1) {
			for (var i = 1; i <=cantidad; i++) {
				$("#estre_"+i).removeClass('bi-star');
				$("#estre_"+i).addClass('bi-star-fill');
				$("#estre_"+i).addClass('colorestrella');


				$("#che_"+i).attr('checked',true);

			}
		}
	
	}
	

}

function Cambio(valor) {

	  select = $('#che_'+valor);
	  select.on('change', SeleccionarEstrella(valor));
	  select.trigger('change');
}

function ElegirParticipantesChat() {
	GoToPage('elegirparticipantes');
}


function ObtenerParticipantes() {
	
	var idusuarios_servicios=localStorage.getItem('idusuarios_servicios');
	var pagina = "ObtenerParticipantes.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user+"&idusuarios_servicios="+idusuarios_servicios;
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			var respuesta=datos.respuesta;
			PintarParticipantes(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}

function PintarParticipantes(respuesta) {

	if (respuesta.length>0) {
		var html="";
		for (var i =0; i < respuesta.length; i++) {

			if (respuesta[i].foto!='' && respuesta[i].foto!=null && respuesta[i].foto!='null') {

				urlimagen=urlphp+`upload/perfil/`+respuesta[i].foto;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;height:80px;"/>';
			}else{

				if (respuesta[i].sexo=='M') {

                    urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarmujer');
    
                }else{
                    urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarhombre');
        
                }

				imagen='<img src="'+urlimagen+'" alt=""  style="width:80px;height:80px;"/>';
			}
			html+=`
				  

                <li class="lista_" id="lista_`+respuesta[i].idusuarios+`" style="background:white;border-radius: 10px;margin-bottom: 1em;">
            <label class="label-radio item-content">                                                                               
              <div class="item-inner" style="width:100%;">
             
                <div class="row">
                <div class="item-media">

		              		  <div class="col-30">
				                        <figure class="avatar  rounded-10">
				                        <img src="`+urlimagen+`" alt="" style="width:80px;height:80px;" />
				                        </figure>
		                      </div>

		                      <div class="col-50">
		                      	<div class="row">`;

		                      		html+=` <div class="row">
			                        	   <div class="item-text" style="font-size:20px;">`;
			                        	 if (respuesta[i].alias!='' && respuesta[i].alias!=null) {

			                        	   html+="Alias: "+respuesta[i].alias;
			                        	}

			                        	 html+=  `</div>
			                        	  </div>`;
			                    

                        
		                        	html+=` <div class="row">
		                        	   <div class="col-100 item-text" style="font-size:18px;" id="participante_`+respuesta[i].idusuarios+`">`+respuesta[i].nombre+` `+respuesta[i].paterno+`
		             		  		   </div>
		             		  		 </div>
		             		  		  <div class="row">
		             		  		   <div class="item-text">`;
		             		  	
		             		  		 if (respuesta[i].celular!='') {

				             		 	 html+=respuesta[i].celular;

				                    		}
				                    html+=`
				                  			  </div>

				                    		  </div>`;

										   html+=`<div class="row">`;
				             		   		if (respuesta[i].tutorado==1) {

				             		   		html+=`<div class="item-text">Tutorado</div>`;

				             		   		}



                  						html+= `</div>`;

				                    	html+=`</div>

			                    	</div>

		                    

		                  		<div class="col-20">
            				 <input type="checkbox" name="my-opcion" class="idusuariosiniciar" id="idusuarios_`+respuesta[i].idusuarios+`"  style="height: 20px;position: absolute; right: 2em;width: 20px;top: 3em;">

		                  		</div>


                        	</div>
                        	
                        	</div>
                        </div>
             		 
              </div>

            </label>
          </li>


			`;
		}
		$("#divparticipantes").html(html);

	}
}

function ObtenerParticipantesAdmin() {
	
	var idservicio=localStorage.getItem('idservicio');
	var pagina = "ObtenerParticipantesAdmin.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user+"&idservicio="+idservicio;
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			var respuesta=datos.respuesta;
			PintarParticipantes(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}

function IniciarChat() {
	var arrayidusuarios=[];
	$(".idusuariosiniciar").each(function( index ) {
		if ($(this).is(':checked')) {

			var id=$(this).attr('id');
			var dividir=id.split('_')[1];

			arrayidusuarios.push(dividir);

		}
  		
	});

	if (arrayidusuarios.length>0) {
	localStorage.setItem('usuariossala',JSON.stringify(arrayidusuarios));

	var pagina = "NuevaSala.php";
	var id_user=localStorage.getItem('id_user');
	var idusuarios_servicios=localStorage.getItem('idusuarios_servicios');

	arrayidusuarios.push(id_user);

	var datos="idusuarios_servicios="+idusuarios_servicios+"&id_user="+id_user+"&idusuarios="+JSON.stringify(arrayidusuarios);
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(respuesta){
			var resultado=respuesta.idsala;
			localStorage.setItem('idsala',resultado);
			
			GoToPage('messages');

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});

		}else{

			alerta('','No se ha seleccionado ningun participante');
		}
	//console.log(arrayidusuarios);
	
}
var dynamicSheet1="";
function FechasServicio() {
	GoToPage('calendario');
}
function FechasServicio2() {


var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 80%;">
            <!--<div class="toolbar">
              <div class="toolbar-inner">
                <div class="left"></div>
                <div class="right">
                  <a class="link sheet-close"></a>
                </div>
              </div>
            </div>--!>
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px; ">
            	 
              <div class="page-content" style="height: 100%;">
                <div style="background: white; height: 100%;width: 100%;border-radius: 20px;">
   						     <div class="row">
	   						     <div class="col-20">
	   						      	
	   						    </div>

   						    	 <div class="col-60">
   						    	 <span class="titulomodal"></span>
   						    	 </div>
   						    	 <div class="col-20">
   						    	 <span class="limpiarfiltros"></span>
   						    	 </div>
   							 </div>
   							 <div class="" style="position: absolute;top:2em;width: 100%;">
   							 	
	   							  <div class="">
		   							  <div class="block" style="margin-right:1em;margin-left:1em;">
		   	

		   							 		<div class="card-content ">
		   							 		<div class="row">
			   							 		<div class="col-100">
			   							 			<p style="text-align: center;font-size: 16px;font-weight: bold;">Horarios</p>
			   							 		</div>
		   							 		<div class="col-100">
			   							 		<div class="row">
				   							 		<div class="col-100">
				   							 		</div>
				   							 		<div class="col-100">
				   							 		</div>
			   							 		</div>
		   							 		<div class="row">
		   							 			<div class="col">
		   							 			<div class="colocartodoshorarios"></div>
		   							 					</div>
		   							 				</div>
		   							 			</div>
		   							 		</div>

		   							 		</div>
		   							 		<div class="row">
		   							 			<div class="col">
		   							 			
		   							 			</div>
		   							 		</div>
		   					

										</div>

	   							 	</div>

   							 </div>

   				</div>
                
              </div>
            </div>
          </div>`;
          
	  dynamicSheet1 = app.sheet.create({
        content: html,

    	swipeToClose: true,
        backdrop: false,
        // Events
        on: {
          open: function (sheet) {
            console.log('Sheet open');


          },
          opened: function (sheet) {
            console.log('Sheet opened');
             CargarHorarios();
          },
        }
      });

       dynamicSheet1.open();


	
}

function Verificarcantidadhorarios() {
	var idusuarios_servicios=localStorage.getItem('idusuarios_servicios');
	var pagina = "ObtenerHorariosServicio.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user+"&idusuarios_servicios="+idusuarios_servicios;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			var horarios=datos.respuesta;
			
				$("#btncalendario").css('display','none');
                $(".btncalendario").css('display','none');

             if(horarios.length>0){

             	$("#btncalendario").css('display','block');
                $(".btncalendario").css('display','block');

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

function VerificarcantidadhorariosAdmin() {
	var idusuarios_servicios=localStorage.getItem('idservicio');
	var pagina = "ObtenerHorariosServicioAdmin.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user+"&idservicio="+idusuarios_servicios;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			var horarios=datos.respuesta;
			
			$(".btncalendario").css('display','none');
			$("#btncalendario").css('display','none');

             if(horarios.length>0){

             	$("#btncalendario").css('display','block');
                $(".btncalendario").css('display','block');
   
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
function CargarHorarios() {
	var idusuarios_servicios=localStorage.getItem('idusuarios_servicios');
	var pagina = "ObtenerHorariosServicio.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user+"&idusuarios_servicios="+idusuarios_servicios;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			var horarios=datos.respuesta;
			
			console.log(horarios);
			var horarioshtml="";

            /* if (respuesta.fechaproxima!='') {
             	horarioshtml+=`<span>`+respuesta.fechaproxima+` `+respuesta.horainicial+` - `+respuesta.horafinal+` Hrs.</span></br>`;
             }*/

             for (var i = 0; i < horarios.length; i++) {
			
             	horarioshtml+=`<span>`+horarios[i].fechaproxima+` `+horarios[i].horainicial+` - `+horarios[i].horafinal+` Hrs.</span></br>`;
                    
				}

			$(".colocartodoshorarios").html(horarioshtml);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
	}

function ObtenerParticipantesAlumnos() {
	var idusuarios_servicios=localStorage.getItem('idusuarios_servicios');
	var pagina = "ObtenerParticipantesAlumnos.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user+"&idusuarios_servicios="+idusuarios_servicios;
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			var respuesta=datos.respuesta;
			var cantidad=respuesta.length;
			if (localStorage.getItem('idtipousuario')==3) {
				cantidad=cantidad+1;
			}
			$(".cantidadalumnos").text(cantidad);
			PintarParticipantesAlumnos(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}

function PintarParticipantesAlumnos(respuesta) {

	if (respuesta.length>0) {
		$(".listadoalumnos").css('display','block');
		var html="";
		for (var i =0; i < respuesta.length; i++) {
			var imagen="";
			if (respuesta[i].foto!='' && respuesta[i].foto!=null  && respuesta[i].foto!='null') {

				urlimagen=urlphp+`upload/perfil/`+respuesta[i].foto;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:60px;height:60px;"/>';
			}else{

				if (respuesta[i].sexo=='M') {
                    urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarmujer');
    
                }else{
                    urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarhombre');
       
                }

				imagen='<img src="'+urlimagen+'" alt=""  style="width:60px;height:60px;"/>';
			}


			var background="";
			if (localStorage.getItem('idtipousuario')!=3) {
			if (respuesta[i].pagado==0){
				background="color:red;";
				}
			}
			

html+=`
         <li style="
    border-radius: 10px;margin-bottom: 1em;background: white;border-radius: 10px;">
            <label class="label-radio item-content">                                                                               
              <div class="item-inner" style="width:90%;">
             
                <div class="row">
                <div class="row">
              		  <div class="col-20">
                        <figure class="avatar   rounded-10">
                      `+imagen+`
                        </figure>
                        </div>
                        
                    <div class="col-50">
                         <div class="col-100 item-text" style="margin-left: 1em;font-size:14px;`+background+`" id="participante_`+respuesta[i].idusuarios+`">`+respuesta[i].nombre+` `+respuesta[i].paterno+`
                         </div>
             		 
	             		 <div class="col-100 item-text" style="font-size:14px;margin-left: 1em;`+background+`" id="correo_`+respuesta[i].idusuarios+`">`+respuesta[i].usuario+`
	             		 	</div>
             		
                        	  <div class=" col-100 item-text" style="font-size:14px;margin-left: 1em;`+background+`">`+respuesta[i].nombretipo+`</div>`;

             
               	
                	       html+=` </div>
                        	 <div class="col-30">

                        	 <div class="row">
                         
                        `;

                       	if (localStorage.getItem('idtipousuario')==5) {
	                       html+=`
	                       <div class="col-50"> 
	                       <button id="" class="button " style="font-size: 26px;" onclick="SubirFotoIndividual(`+respuesta[i].idusuarios+`)">
	                       		 <i class="bi bi-card-image"></i>
	                        </button>
 							</div>
	                        `;
	                    }
	          if (localStorage.getItem('idtipousuario')==0 || localStorage.getItem('idtipousuario')==5 ) {

                     if (respuesta[i].aceptarterminos==0 || respuesta[i].pagado==0 ){

                   		html+=`<div class="col-50"> 
                        	<button id="" class="button habilitareliminacion " style="font-size: 26px;color:red;" onclick="CancelarUsuarioServicio(`+respuesta[i].idusuarios+`)">
								<i class="bi-trash-fill"></i>	                        </button> 
	                        </div>`;
                    		

                    		}

                    	}
                        html+=`

                        	</div>
                        </div>

                        `;

            
                    if (localStorage.getItem('idtipousuario')!=3) {
                    	html+=`
                    		<div class="col-30">`;
                    		var aceptoback="#c2c2c2";
                    		if (respuesta[i].aceptarterminos==1){

                    			aceptoback="#007aff";
                    		}
                    		var pagadoback="red";
                    	if (respuesta[i].pagado==1){

                    			pagadoback="#59c158";
                    		}

                        html+=`<span style="
							    background:`+aceptoback+` ;
							" class="divaceptado"></span>`;

                       html+=` <span style="
							    background:`+pagadoback+` ;" class="divaceptado"></span>`;

                       html+=`</div>`;

                    	
                    }

                    html+=` </div>
               
             		 
              </div>

            
          </div></label></li>

			`;
		}
		$("#divparticipantesalumnos").html(html);

	}else{
				$(".listadoalumnos").css('display','none');

	}
}

function SubirFotoIndividual(idusuarioseleccionado) {
	localStorage.setItem('idusuarioseleccionado',idusuarioseleccionado);
	GoToPage('imagenesindividuales');
}

function ObtenerAlumnosAdmin() {
	var idservicio=localStorage.getItem('idservicio');
	var pagina = "ObtenerAlumnosAdmin.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user+"&idservicio="+idservicio;
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			var respuesta=datos.respuesta;
			PintarAlumnosAdmin(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}


function PintarAlumnosAdmin(respuesta) {


	if (respuesta.length>0) {
		listaalumnos=respuesta;
		var html="";
		for (var i =0; i < respuesta.length; i++) {


			if (respuesta[i].foto!='' && respuesta[i].foto!=null && respuesta[i].foto!='null') {

				urlimagen=urlphp+`upload/perfil/`+respuesta[i].foto;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:80px;height:80px;"/>';
			}else{

				if (respuesta[i].sexo=='M') {
                    urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarmujer');
    
                }else{
                    urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarhombre');
        
                }

				imagen='<img src="'+urlimagen+'" alt=""  style="width:80px;height:80px;"/>';
			}

			if (respuesta[i].alias=="" || respuesta[i].alias==null) {

				respuesta[i].alias="";
			}
			html+=`
				  

              <li class="lista_" id="lista_`+respuesta[i].idusuarios+`"  style="background:white;border-radius: 10px;margin-bottom: 1em;">
            <label class="label-radio item-content">                                                                               
              <div class="item-inner" style="width:100%;">
             
                <div class="row">
                <div class="item-media">
              		  <div class="col-30">
                        <figure class="avatar  rounded-10">
                       `+imagen+`
                        </figure>

                        </div>
                         <div class="col-50">
	                         <div class="row">

	                         `;

	                         html+=`
	                         <div class="row">`;
		           			if (respuesta[i].alias!='') {

	                          		html+=`
	                          		<div class="col-100 item-text" style="font-size:20px;word-break: break-word;color:#7a7a7a;" id="correo_`+respuesta[i].idusuarios+`">`+respuesta[i].alias+`
		            
		             		    	 </div>`;

		             		    	}
		             		   html+=` </div>
		             		    	 `;	
		             		    
	                        // }

	                           html+=` 
             		  
	                       <div class="row">

	                        <div class="col-100 " style="font-size:18px;word-break: break-word;color:#9c9c9c;" id="participante_`+respuesta[i].idusuarios+`">`+respuesta[i].nombre+` `+respuesta[i].paterno+` `+respuesta[i].materno+`
	             		    </div>
	             		  </div>


                    `;
		             		   
		

	             		   html+=` <div class="row">`;
	             		   if (respuesta[i].celular!='') {
	             		    	html+=`
	             		    	<div class="col-100 item-text" style="font-size:18px;word-break: break-word;color:#7a7a7a;" id="correo_`+respuesta[i].idusuarios+`">`+respuesta[i].celular+`
	             		     	</div>`;
	             		     }
	             		    html+=` </div> `;

             		   html+=`<div class="row">`;

             		   		
             		   		if (respuesta[i].tutorado==1) {
             		   		html+=`<div class="item-text"><span class="badge" style="background:#38a2f7;">Tutorado</span></div>`;
             		   		html+=`<div class="item-text" style="color:#9c9c9c;">`+respuesta[i].tutor+`</div>`;

             		   		}

             		   	//	html+=`<div class="item-text">Tutorado: `+t+`</div>`;

             		   		



                  			html+= `</div>

                   		

                        	</div>


                        	
                         	</div>

                         	<div class="col-20">
                         	    <input type="checkbox" name="my-opcion" class="idusuariosiniciar" id="idusuarios_`+respuesta[i].idusuarios+`"  style="height:20px;width:20px;" onchange="SeleccionarAsignado(`+respuesta[i].idusuarios+`)">

                         	</div>
                        </div>
             		 
              </div>

            </label>
          </li>


			`;
		}
		$("#divalumnos").html(html);

	}
}

function ObtenerAlumnos() {
	var idusuarios_servicios=localStorage.getItem('idusuarios_servicios');
	var pagina = "ObtenerAlumnos.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user+"&idusuarios_servicios="+idusuarios_servicios;
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			var respuesta=datos.respuesta;
			PintarAlumnos(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}


function PintarAlumnos(respuesta) {
	if (respuesta.length>0) {
		listaalumnos=respuesta;
		console.log(listaalumnos);
		var html="";

		for (var i =0; i < respuesta.length; i++) {

			if (respuesta[i].foto!='' && respuesta[i].foto!=null && respuesta[i].foto!='null') {

				urlimagen=urlphp+`upload/perfil/`+respuesta[i].foto;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:80px;height:80px;"/>';
			}else{

				if (respuesta[i].sexo == 'M') {

					urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarmujer');
	
				}else{
					urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarhombre');
		 
				}


				imagen='<img src="'+urlimagen+'" alt=""  style="width:80px;height:80px;"/>';
			}

			if (respuesta[i].alias==null) {
				respuesta[i].alias="";

			}
			html+=`
				  

                <li class="lista_" id="lista_`+respuesta[i].idusuarios+`"  style="background: white;border-radius: 10px;margin-bottom: 1em;">
            <label class="label-radio item-content">                                                                               
              <div class="item-inner" style="width:100%;">
             
                <div class="row">
                <div class="item-media">
              		  <div class="col-30">
                        <figure class="avatar  rounded-10">
                        <img src="`+urlimagen+`" alt="" style="width:80px;height:80px;" />
                        </figure>
                        
                        </div>
                         <div class="col-50">
	                         <div class="row">

	                         <div class="row">`;

	                         if (respuesta[i].alias!='' && respuesta[i].alias!=null) {
	                         html+=` <div class="col-100 item-text" style="font-size:20px;word-break: break-word;color:#7a7a7a;" id="correo_`+respuesta[i].idusuarios+`">`+respuesta[i].alias+`
		             		     </div>`;	
	                         }
		             		   


	             		    html+=` </div>
             		  
	                       <div class="row">

	                        <div class="col-100 item-text" style="font-size:18px;word-break: break-word;color:#9c9c9c;" id="participante_`+respuesta[i].idusuarios+`">`+respuesta[i].nombre+` `+respuesta[i].paterno+` `+respuesta[i].materno+`
	             		    </div>
	             		   </div>


                    `;


	             		   html+=` <div class="row">
	             		     <div class="col-100 item-text" style="font-size:18px;word-break: break-word;color:#7a7a7a;" id="correo_`+respuesta[i].idusuarios+`">`+respuesta[i].celular+`
	             		     </div>
             		   `;

             	
             		   html+=`<div class="row">`;
             		   		if (respuesta[i].tutorado==1) {
             		   		html+=`<div class="item-text"><span class="badge" style="background:#38a2f7;">Tutorado</span></div>`;
             		   		html+=`<div class="item-text" style="color:#9c9c9c;">`+respuesta[i].tutor+`</div>`;

             		   		}



                  	  html+= `</div>
                   		 </div>

                        	</div>


                        	
                         	</div>

                         	<div class="col-20">
                         	    <input type="checkbox" name="my-opcion" class="idusuariosiniciar" id="idusuarios_`+respuesta[i].idusuarios+`"  style="height:20px;width:20px;" onchange="SeleccionarAsignado(`+respuesta[i].idusuarios+`)">

                         	</div>
                        </div>
             		 
              </div>

            </label>
          </li>

			`;
		}
		$("#divalumnos").html(html);

	}else{
		listaalumnos=[];
	}
}

function SeleccionarAsignado(idusuarios) {
	var contar=0;

	if($("#idusuarios_"+idusuarios).is(':checked')) {

	 var promesa=VerificacionUsuarioServicio(idusuarios);
     promesa.then(r => {

    	if (r.pagospendientes==0) {
		    	$(".idusuariosiniciar").each(function( index ) {
		  			if ($(this).is(':checked')) {
		  				contar++;
		  			}
				});


			if (contar>0) {
				$("#btnpasar2").text('Agregar ('+contar+') elemento(s)');
				$("#btnpasar2").css('display','block');
				$(".divflotanteasignacion").css('display','block');

			}else{

				$("#btnpasar2").text('Agregar elementos');
				$("#btnpasar2").css('display','none');
				$(".divflotanteasignacion").css('display','none');

			}
			
		}else{
			alerta('','El usuario no se puede asignar a este servicio, debido a que tiene un pago pendiente');
			
			$("#idusuarios_"+idusuarios).prop('checked',false);

		}

    });
	
	}

	/*if (contar>0) {

		$("#btnguardarasignacion").css('display','block');
	}else{

		$("#btnguardarasignacion").css('display','none');
	
	}*/
}

function VerificacionUsuarioServicio(idusuario) {
	    return new Promise(function(resolve, reject) {
	   
	    var idservicio=localStorage.getItem('idservicio');
	    var datos="idusuario="+idusuario+"&idservicio="+idservicio;
	    var pagina = "VerificacionUsuarioServicio.php";
		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resp){

			resolve(resp);

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});

	});
}
function SeleccionarUsuarioAsignado(argument) {
	var contar=0;
	$(".idusuariosasignados").each(function( index ) {
  			if ($(this).is(':checked')) {
  				contar++;
  			}
	});

	if (contar>0) {
			$("#btnpasar").css('display','block');
			$("#btnpasar").text('Quitar ('+contar+') elemento(s) ');
	
		}else{
			$("#btnpasar").text('Quitar elementos ');
			$("#btnpasar").css('display','none');

		}

if (contar>0) {

		$("#btnguardarasignacion").css('display','block');
	}else{

		$("#btnguardarasignacion").css('display','none');
	
	}
	
}
function LimpiarFiltroalumnos() {
	
	$(".lista_").css('display','block');
}


function GuardarAsignacion() {
	var pagina = "GuardarAsignacion.php";
	var id_user=localStorage.getItem('id_user');
	var idservicio=localStorage.getItem('idservicio');

	var idusuarios=[];
	
	$(".lista_" ).each(function( index ) {
		var id=$(this).attr('id');
		var dividir=id.split('_')[1];
		console.log(dividir);
	  	if($("#idusuarios_"+dividir).is(':checked')) {
	  		
	  		idusuarios.push(dividir);
	  	}
	});
	//console.log(idusuarios);
	var datos="id_user="+id_user+"&idusuarios="+idusuarios+"&idservicio="+idservicio+"&usuariosquitados="+usuariosquitados;
	
	
	var usuariosparaquitar="";
	var usuariosparagregar="";

	/*for (var i = 0; i < usuariosquitados.length; i++) {
		
		var id=usuariosquitados[i];
		var resultado = participastesalumnosservicio.find( usuarios => usuarios.idusuarios === id );
			
				if (resultado == undefined) {
					 resultado = listaalumnos.find( usuarios => usuarios.idusuarios === id );
		
				}

			usuariosparaquitar+=`<p style="text-align:center;font-size:18px;">`+(i+1)+`.- `+resultado.nombre+` `+ resultado.paterno+`</p>`;

	}*/

//	console.log(listaalumnos);
	for (var i = 0; i < idusuarios.length; i++) {
		
		var id=idusuarios[i];
		var resultado = listaalumnos.find( usuarios => usuarios.idusuarios == id );
			console.log(resultado);
				/*if (resultado == undefined) {
					 resultado = listaalumnos.find( usuarios => usuarios.idusuarios === id );
		
				}*/

			usuariosparagregar+=`<p style="text-align:center;font-size:18px;">`+(i+1)+`.- `+resultado.nombre+` `+ resultado.paterno+`</p>`;

	}

			var html="";

	html+=`	<div class="sheet-modal my-sheet-swipe-to-close1" style="height: 100%;background: none;">
            <div class="toolbar">
              <div class="toolbar-inner">
                <div class="left"></div>
                <div class="right">
                  <a class="link sheet-close"></a>
                </div>
              </div> 
            </div>
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px; ">
              <div class="iconocerrar link sheet-close" style="z-index:100;">
	 									<span class="bi bi-x-circle-fill"></span>
	   						    	 </div>

              <div class="" style="height: 100%;">
                   <div class="row">
	   						     <div class="col-20">
	   						      	
	   						    </div>

   						    	 <div class="col-60">
   						    	 <span class="titulomodal"></span>
   						    	 </div>
   						    	 <div class="col-20">
   						    	 <span class="limpiarfiltros"></span>
   						    	 </div>
   							 </div>
                <div class="page-content" style="background: white; height: 100%;width: 100%;border-radius: 20px;">
   						
   							 <div class="" style="position: absolute;top:2em;width: 100%;">
   							 	
	   							  <div class="">
		   							  <div class="block" style="margin-right:1em;margin-left:1em;">

		   							  	<h3 style="text-align:center;font-size:22px;margin-bottom:1em;">Se realizarán las siguientes acciones</h3>`;
 				

		   						if (idusuarios.length>0) {

		   							 html+=`
		   							 <div class="row" style="margin-bottom:1em;">
		   							 <h4 style="text-align:center;border-radius: 10px;color: rgb(89, 193, 88);padding: 0.5em;font-weight: bold;">Usuarios por agregar al servicio</h4>`;
		   						     html+=usuariosparagregar+`</div>`;

		   							}
		   							html+=`
		   						 <div class="row" style="margin-bottom:1em;margin-top:3em;">

		   						 	 <a id="btnguardarasignacion" onclick="GuardarAsignaciones()" style="border-radius: 10px;
									    height: 60px;" class="button button-fill button-large button-raised margin-bottom color-theme">
									      <div class="fab-text">Guardar</div>
									    </a>
		   						 	</div>


		   							</div>
	   							 	</div>
   							 </div>
		   				</div>
		                
		              </div>
		            </div>
		          </div>`;
	  dynamicSheet2 = app.sheet.create({
        content: html,
    	swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
            console.log('Sheet open');
          },
          opened: function (sheet) {
            console.log('Sheet opened');
          },
        }
      });

       dynamicSheet2.open();

}

function GuardarAsignaciones() {
	dynamicSheet2.close();
	var pagina = "GuardarAsignacion.php";
	var id_user=localStorage.getItem('id_user');
	var idservicio=localStorage.getItem('idservicio');

	var idusuarios=[];
	
	$(".lista_" ).each(function( index ) {
		var id=$(this).attr('id');
		var dividir=id.split('_')[1];
	
	  	if($("#idusuarios_"+dividir).is(':checked')) {
	  		usuariosagregados.push(dividir);
	  	}
	});

	var datos="id_user="+id_user+"&idusuarios="+idusuarios+"&idservicio="+idservicio+"&usuariosquitados="+usuariosquitados+"&usuariosagregados="+usuariosagregados;
	CrearModalEsperaDialog();
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			CerrarEspera();
				
			if (datos.respuesta==1) {

				var usuariosnoagregados=datos.usuariosnoagregados;

					if (usuariosnoagregados.length > 0) {
						var html="";
						for (var i = 0; i <usuariosnoagregados.length; i++) {
							html+=`<span>Usuario: `+usuariosnoagregados[i].usuario+`
							no se pudo asignar, ya que se encuentra asignado a 
							</span>`;


							var serviciosasignados=usuariosnoagregados[i].servicioscruzados;
			 				for (var j =0; j < serviciosasignados.length; j++) {
			 					html+=`<p>`+serviciosasignados[j].titulo+`</p>`
			 				}
			 				html+=`</br>`;
						}

						alerta(html,'No se pudieron asignar los siguientes usuarios');
					}else{

					  alerta('','Se realizaron los cambios correctamente');

					}
				
				if (localStorage.getItem('idtipousuario')==0) {
				     GoToPage('detalleservicioadmin');

				   }

				  if (localStorage.getItem('idtipousuario')==3) {
				     GoToPage('detalleservicio');

				   }
				   if (localStorage.getItem('idtipousuario')==5){
				      GoToPage('detalleserviciocoach');

				    }
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

function VerificarTotalAlumnos() {
var idservicio=localStorage.getItem('idservicio');
var datos="idservicio="+idservicio;
var pagina="VerificarTotalAlumnos.php";
$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
  
			if (datos.cupodisponible==0) {
				usuariosquitados=[];
				usuariosagregados=[];
				
				GoToPage('asignaralumnos');
			}else{
				var cantidadmaxima=datos.limitemaximo;
				alerta('','El límite de alumnos para el servicio es de '+cantidadmaxima);
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

function ObtenerCalificacionesServicio() {
	var idservicio=localStorage.getItem('idservicio');
	var pagina = "ObtenerCalificacionesServicio.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user+"&idservicio="+idservicio;
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			var respuesta=datos.calificaciones;
			PintarCalificacionesServicio(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}
function PintarCalificacionesServicio(respuesta) {

	if (respuesta.length>0) {
		var html="";
		for (var i =0; i < respuesta.length; i++) {


			if (respuesta[i].foto!='' && respuesta[i].foto!=null && respuesta[i].foto!='null') {

				urlimagen=urlphp+`upload/perfil/`+respuesta[i].foto;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;height:80px;"/>';
			}else{

				if (respuesta[i].sexo=='M') {

                    urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarmujer');
    
                }else{
                    urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarhombre');
        
                }

				imagen='<img src="'+urlimagen+'" alt=""  style="width:80px;height:80px;"/>';
			}
			var calificacion=respuesta[i].calificacion;
			var cal1="";
			var cal2="";
			var cal3="";
			var cal4="";
			var cal5="";

			cal1=calificacion>0?'bi-star-fill colorestrella':'bi bi-star';
			cal2=calificacion>=1?'bi-star-fill colorestrella':'bi bi-star';
			cal3=calificacion>=2?'bi-star-fill colorestrella':'bi bi-star';
			cal4=calificacion>=3?'bi-star-fill colorestrella':'bi bi-star';
			cal5=calificacion>=5?'bi-star-fill colorestrella':'bi bi-star';


			html+=`
				  

                <li class="lista_" id="lista_`+respuesta[i].idusuarios+`" style="background: white;border-radius: 10px;">
            <label class="label-radio item-content">                                                                               
              <div class="item-inner" style="width:80%;">
             
                <div class="row">
                <div class="item-media">
              		  <div class="col-30">
                        <figure class="avatar  rounded-10">
                        <img src="`+urlimagen+`" alt="" style="width:80px;height:80px;" />
                        </figure>
                        </div>
                        
                        	<div class="col-100">
                        	 <div class="col-100 item-text" style="margin-left: 1em;font-size:18px;word-break: break-word;" id="participante_`+respuesta[i].idusuarios+`">`+respuesta[i].nombre+` `+respuesta[i].paterno+`
             		   </div>


                     <div class="row">
             		     <div class="col-100 item-text" style="font-size:18px;word-break: break-word;" id="correo_`+respuesta[i].idusuarios+`">`+respuesta[i].comentario+`
             		     </div>
             		   </div>

             		  

                    <div class="row">
                  
	                <div class="col" >
	                	<div>
	                	 <i class="iconosestrella estrellaseleccionada `+cal1+`" id="estre_1"  >  </i>
		                	 <div class="oculto">
		                	 <input type="checkbox"  id="che_1" >
		                	</div>
	                	</div>
	               
	               </div>
	                 <div class="col"  >
	                 	<div >
		                  <i class="iconosestrella estrellaseleccionada `+cal2+`" id="estre_2" ></i>
		               		<input type="checkbox" class="oculto" id="che_2"  >
	               		</div>
	                </div>
	                <div class="col" >
		                  <div  >
			                   <i class=" iconosestrella estrellaseleccionada `+cal3+`" id="estre_3" ></i>
			                	<input type="checkbox" class="oculto" id="che_3"  >
		                  </div>
	                 </div>
                   	<div class="col" >
	                   <div  >
	                   	    <i class=" iconosestrella estrellaseleccionada `+cal4+`" id="estre_4" ></i>
	                 		<input type="checkbox" class="oculto" id="che_4" >
	                 	</div>
	                  </div>
	                    <div class="col" >   
		                    <div  >              
		                     	 <i class=" iconosestrella estrellaseleccionada `+cal5+`" id="estre_5"  ></i>
		                 		 <input type="checkbox" class="oculto" id="che_5"  >
		                   	</div>
	                    </div>
                    </div>

                        	</div>
                        	
                         	</div>
                        </div>
             		 
              </div>

            </label>
          </li>


			`;
		}
		$("#divalumnoscalificaciones").html(html);

	}
}


function ObtenerParticipantesAlumnosServicio() {
	var idusuarios_servicios=localStorage.getItem('idservicio');
	var pagina = "ObtenerParticipantesAlumnosServicio.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user+"&idservicio="+idusuarios_servicios;
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			var respuesta=datos.respuesta;
			
			PintarParticipantesAlumnosServicio(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}


function PintarParticipantesAlumnosServicio(respuesta) {
var html="";

	if (respuesta.length>0) {
		participastesalumnosservicio=respuesta;

		for (var i =0; i < respuesta.length; i++) {

			if (respuesta[i].foto!='' && respuesta[i].foto!=null && respuesta[i].foto!='null') {

				urlimagen=urlphp+`upload/perfil/`+respuesta[i].foto;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;height:80px;"/>';
			}else{

				
			if (respuesta[i].sexo == 'M') {

					urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarmujer');
	
				}else{
					urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarhombre');
		 
				}
	
				imagen='<img src="'+urlimagen+'" alt=""  style="width:80px;height:80px;"/>';
			}

		if (respuesta[i].alias=="" || respuesta[i].alias==null) {

				respuesta[i].alias="";
			}
			html+=`
				  

                <li class="listaa_" id="listaa_`+respuesta[i].idusuarios+`" style="background: white;border-radius: 10px;margin-bottom: 1em;">
            <label class="label-radio item-content">                                                                               
              <div class="item-inner" style="width:80%;">
             
                <div class="row">
                <div class="item-media">
              		  <div class="col-30">
                        <figure class="avatar  rounded-10">
                       `+imagen+`
                        </figure>
                        </div>
                        
                        	<div class="col-100">
                        	 <div class="col-100 item-text" style="margin-left: 1em;font-size:18px;word-break: break-word;" id="participante_`+respuesta[i].idusuarios+`">`+respuesta[i].nombre+` `+respuesta[i].paterno+`
             		   </div>


                     <div class="row">
             		     <div class="col-100 item-text" style="font-size:18px;word-break: break-word;" id="correo_`+respuesta[i].idusuarios+`">`+respuesta[i].alias+`
             		     </div>
             		   </div>

             		   

             		   <div class="row">
                        	  <div class="item-text">`+respuesta[i].nombretipo+`</div>
                    </div>

                        	</div>
                        	
                         	</div>
                        </div>
             		 
              </div>
             <input type="checkbox" name="my-opcion" class="idusuariosasignados" id="idusuarios_`+respuesta[i].idusuarios+`"  style="height:20px;width:20%;" onchange="SeleccionarUsuarioAsignado(`+respuesta[i].idusuarios+`)">

            </label>
          </li>


			`;
		}
}else{

	participastesalumnosservicio=[];
}
	
$("#divparticipantesalumnos").html(html);

}

function BuscarEnArrayUsuarios(valor,array) {
	var encontrado=0;
	if (array.length>0) {
		for (var i = 0; i <array.length; i++) {
			
			if (array[i]==valor) {
				encontrado=1;
				return encontrado;

			}
		}
	}else{

		return encontrado;
	}
}

function EliminardeArray(valor,array) {
	
	if (array.length>0) {
		for (var i = 0; i <array.length; i++) {
			
			if (array[i]==valor) {
				array.splice(i,1);

			}
		}
	}
}


function AgregarElemento() {

	 if (localStorage.getItem('idtipousuario')==3) {

	 	  ObtenerVerificacionServicio().then(r => {

	 	  	var valor=r.respuesta;
	 	 	var num= valor.numligarclientes;
	 	  
	 	 	if (usuariosagregados.length < num) {
	 	 			AgregarElementoArray();
	 	 	}else{


	 	 		alerta('El límite para agregar es de'+num,'');
	 	 	}
	 	  


	 	  });

	 }else{

	 	AgregarElementoArray();
	 }
	 

}

function AgregarElementoArray() {
	var idusua=[];
		$(".idusuariosiniciar").each(function( index ) {
  			if ($(this).is(':checked')) {
  				var id=$(this).attr('id');
  				var dividir=id.split('_')[1];
  				console.log(dividir);
  				idusua.push(dividir);
  				$("#lista_"+dividir).remove();

  				EliminardeArray(dividir,usuariosquitados);

  				if (!BuscarEnArrayUsuarios(dividir,usuariosagregados)) {

  					usuariosagregados.push(dividir);
  				}
  		}
	});

	var html="";
		for (var i = 0; i <idusua.length; i++) {
			var id=idusua[i];
			var resultado = listaalumnos.find( usuarios => usuarios.idusuarios === id );
			
			if (resultado == undefined) {
				 resultado = participastesalumnosservicio.find( usuarios => usuarios.idusuarios === id );
		
				}


			if (resultado.foto!='' && resultado.foto!=null && resultado.foto!='null') {

				urlimagen=urlphp+`upload/perfil/`+resultado.foto;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;height:80px;"/>';
			}else{

				if (resultado.sexo=='M') {

					urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarmujer');
	
				}else{
					urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarhombre');
		
				}

				//urlimagen="img/icon-usuario.png";
				imagen='<img src="'+urlimagen+'" alt=""  style="width:80px;height:80px;"/>';
			}
			html+=`


                <li class="listaa_" id="listaa_`+resultado.idusuarios+`" style="background: white;border-radius: 10px;margin-bottom: 1em;">
            <label class="label-radio item-content">                                                                               
              <div class="item-inner" style="width:80%;">
             
                <div class="row">
                <div class="item-media">
              		  <div class="col-30">
                        <figure class="avatar  rounded-10">
                        <img src="`+urlimagen+`" alt="" style="width:80px;height:80px;" />
                        </figure>
                        </div>
                        
                        	<div class="col-100">
                        	 <div class="col-100 item-text" style="margin-left: 1em;font-size:18px;word-break: break-word;" id="participante_`+resultado.idusuarios+`">`+resultado.nombre+` `+resultado.paterno+`
             		   </div>


                     <div class="row">
             		     <div class="col-100 item-text" style="font-size:18px;word-break: break-word;" id="correo_`+resultado.idusuarios+`">`+resultado.usuario+`
             		     </div>
             		   </div>

             		   <div class="row">
                        	  <div class="item-text">`+resultado.nombretipo+`</div>
                    </div>

                        	</div>
                        	
                         	</div>
                        </div>
             		 
              </div>
             <input type="checkbox" name="my-opcion" class="idusuariosasignados" id="idusuarios_`+resultado.idusuarios+`"  style="height:20px;width:20%;" onchange="SeleccionarUsuarioAsignado(`+resultado.idusuarios+`)">

            </label>
          </li>
				`;




			}

		$("#divparticipantesalumnosasig").append(html);
		$("#btnpasar2").text('Agregar elementos');
		 toastTop = app.toast.create({
          text: 'Se agregaron '+idusua.length+' elemento(s)',
          position: 'top',
          closeTimeout: 2000,
        });
	   toastTop.open();

	   $(".divflotanteasignacion").css('display','block');
}

function QuitarElemento() {
	var idusu=[];
	
		$(".idusuariosasignados").each(function( index ) {
  			if ($(this).is(':checked')) {
  				var id=$(this).attr('id');
  				var dividir=id.split('_')[1];
  				console.log(dividir);
  				idusu.push(dividir);

  				//usuariosquitados.push(dividir);
  				$("#listaa_"+dividir).remove();
  				  	EliminardeArray(dividir,usuariosagregados);

  					if (!BuscarEnArrayUsuarios(dividir,usuariosquitados)) {

		  				usuariosquitados.push(dividir);
		  			}

  			}
	});


		var html="";
		for (var i = 0; i <idusu.length; i++) {
			var id=idusu[i];
			var resultado = participastesalumnosservicio.find( usuarios => usuarios.idusuarios === id );
			
				if (resultado == undefined) {
					 resultado = listaalumnos.find( usuarios => usuarios.idusuarios === id );
		
				}


			if (resultado.foto!='' && resultado.foto!=null) {

				urlimagen=urlphp+`upload/perfil/`+resultado.foto;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;height:80px;"/>';
			}else{

				if (resultado.sexo=='M') {

					urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarmujer');
	
				}else{
					urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarhombre');
		
				}
				imagen='<img src="'+urlimagen+'" alt=""  style="width:80px;height:80px;"/>';
			}

			html+=`


                <li class="lista_" id="lista_`+resultado.idusuarios+`" >
            <label class="label-radio item-content">                                                                               
              <div class="item-inner" style="width:80%;">
             
                <div class="row">
                <div class="item-media">
              		  <div class="col-30">
                        <figure class="avatar  rounded-10">
                        <img src="`+urlimagen+`" alt="" style="width:80px;height:80px;" />
                        </figure>
                        </div>
                        
                        	<div class="col-100">
                        	 <div class="col-100 item-text" style="margin-left: 1em;font-size:18px;word-break: break-word;" id="participante_`+resultado.idusuarios+`">`+resultado.nombre+` `+resultado.paterno+`
             		   </div>


                     <div class="row">
             		     <div class="col-100 item-text" style="font-size:18px;word-break: break-word;" id="correo_`+resultado.idusuarios+`">`+resultado.usuario+`
             		     </div>
             		   </div>

             		   <div class="row">
                        	  <div class="item-text">`+resultado.nombretipo+`</div>
                    </div>

                        	</div>
                        	
                         	</div>
                        </div>
             		 
              </div>
             <input type="checkbox" name="my-opcion" class="idusuariosiniciar" id="idusuarios_`+resultado.idusuarios+`"  style="height:20px;width:20%;" onchange="SeleccionarAsignado(`+resultado.idusuarios+`)">

            </label>
          </li>
				`;
			
		}

		$("#divalumnos").append(html);
	$("#btnpasar").text('Quitar elementos');

	 toastTop = app.toast.create({
          text: 'Se quitaron '+idusu.length+' elemento(s)',
          position: 'top',
          closeTimeout: 2000,
        });
	   toastTop.open();
	$(".divflotanteasignacion").css('display','block');

}

function GuardarAsignacionServicio() {
 app.dialog.confirm('','¿Está seguro  de realizar la acción?' , function () {

	var pagina = "GuardarAsignacionServicio.php";
	var id_user=localStorage.getItem('id_user');
	var idservicio=localStorage.getItem('idservicio');
	var idusuarios=id_user;
	var datos="id_user="+id_user+"&idservicio="+idservicio+"&idusuarios="+idusuarios;
	
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			var respuesta=datos.respuesta;
			if (datos.respuesta==1) {

				var usuariosnoagregados=datos.usuariosnoagregados;

					if (usuariosnoagregados.length > 0) {
						var html="";
						for (var i = 0; i <usuariosnoagregados.length; i++) {
							html+=`<span>Usuario: `+usuariosnoagregados[i].usuario+`
							no se pudo asignar, ya que se encuentra asignado a 
							</span>`;


							var serviciosasignados=usuariosnoagregados[i].servicioscruzados;
			 				for (var j =0; j < serviciosasignados.length; j++) {
			 					html+=`<p>`+serviciosasignados[j].titulo+`</p>`
			 				}
			 				html+=`</br>`;
						}

						alerta(html,'No se puede realizar la acción');
					}else{

					  alerta('','Se realizaron los cambios correctamente');

					  		if (localStorage.getItem('idtipousuario')==3) {

								var idusuarios_servicios=datos.idusuarios_servicio;
							    localStorage.setItem('idusuarios_servicios',idusuarios_servicios);

							     GoToPage('aceptacionservicio');

							   }
					}
				
		

				  
			}
			

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
	});
}


function GuardarAsignacionServicioCoach() {
	
 app.dialog.confirm('','¿Está seguro  de realizar la acción?' , function () {

	var pagina = "GuardarAsignacionServicio.php";
	var id_user=localStorage.getItem('id_user');
	var idservicio=localStorage.getItem('idservicio');
	var idusuarios=id_user;
	var datos="id_user="+id_user+"&idservicio="+idservicio+"&idusuarios="+idusuarios;
	
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			var respuesta=datos.respuesta;
			if (datos.respuesta==1) {

				var usuariosnoagregados=datos.usuariosnoagregados;

					if (usuariosnoagregados.length > 0) {
						var html="";
						for (var i = 0; i <usuariosnoagregados.length; i++) {
							html+=`<span>Usuario: `+usuariosnoagregados[i].usuario+`
							no se pudo asignar, ya que se encuentra asignado a 
							</span>`;


							var serviciosasignados=usuariosnoagregados[i].servicioscruzados;
			 				for (var j =0; j < serviciosasignados.length; j++) {
			 					html+=`<p>`+serviciosasignados[j].titulo+`</p>`
			 				}
			 				html+=`</br>`;
						}

						alerta(html,'No se puede realizar la acción');
					}else{

					  alerta('','Se realizaron los cambios correctamente');

					  		if (localStorage.getItem('idtipousuario')==5) {

								var idusuarios_servicios=datos.idusuarios_servicio;
							    localStorage.setItem('idusuarios_servicios',idusuarios_servicios);

							     GoToPage('detalleserviciocoach');

							   }
					}
				
		

				  
			}
			

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
	});
}
function CancelarAsignacion() {

  if (localStorage.getItem('idtipousuario')==0) {
   	GoToPage('detalleservicioadmin');
   }

  if (localStorage.getItem('idtipousuario')==3) {
     GoToPage('detalleservicio');
   }
   if (localStorage.getItem('idtipousuario')==5){
  	  GoToPage('detalleserviciocoach');
    }
    usuariosquitados=[];
	usuariosagregados=[];
}

function ObtenerVerificacionServicio() { 
	 return new Promise(function(resolve, reject) {
	var idusuarios_servicios=localStorage.getItem('idusuarios_servicios');
	var pagina = "ObtenerServicioAsignado.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user+"&idusuarios_servicios="+idusuarios_servicios;
	
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(resp){
			
			resolve(resp);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});

	});
}

function ObtenerVerificarFechasDias(fechainicial,fechafinal,arraydiaselegidos) { 
	 return new Promise(function(resolve, reject) {
	var idusuarios_servicios=localStorage.getItem('idusuarios_servicios');
	var pagina = "ObtenerVerificarFechasDias.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user+"&fechainicial="+fechainicial+"&fechafinal="+fechafinal+"&v_arraydiaselegidos="+arraydiaselegidos;
	
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(resp){
			
			resolve(resp);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});

	});
}
function ObtenerInvitados() {
	var idservicio=localStorage.getItem('idservicio');
	var pagina = "ObtenerInvitados.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user+"&idservicio="+idservicio;
	
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(resp){
				var usuarios=resp.respuesta;
				if (usuarios.length>0) {

					PintarInvitados(usuarios);

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

function PintarInvitados(respuesta) {
	
	if (respuesta.length>0) {
		$(".listadoinvitados").css('display','block');
		var html="";
		for (var i =0; i < respuesta.length; i++) {
			var imagen="";
			if (respuesta[i].foto!='' && respuesta[i].foto!=null  && respuesta[i].foto!='null') {

				urlimagen=urlphp+`upload/perfil/`+respuesta[i].foto;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:60px;height:60px;"/>';
			}else{

				if (respuesta[i].sexo=='M') {
                    urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarmujer');
    
                }else{
                    urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarhombre');
       
                }

				imagen='<img src="'+urlimagen+'" alt=""  style="width:60px;height:60px;"/>';
			}


			var background="";
			if (localStorage.getItem('idtipousuario')!=3) {
			if (respuesta[i].pagado==0){
				background="color:red;";
				}
			}
			

html+=`
         <li style="
    border-radius: 10px;margin-bottom: 1em;background: white;border-radius: 10px;">
            <label class="label-radio item-content">                                                                               
              <div class="item-inner" style="width:90%;">
             
                <div class="row">
                <div class="row">
              		  <div class="col-20">
                        <figure class="avatar   rounded-10">
                      `+imagen+`
                        </figure>
                        </div>
                        
                    <div class="col-60">
                         <div class="col-100 item-text" style="margin-left: 1em;font-size:14px;`+background+`" id="participante_`+respuesta[i].idusuarios+`">`+respuesta[i].nombre+` `+respuesta[i].paterno+`
                         </div>
             		 
	             		 <div class="col-100 item-text" style="font-size:14px;margin-left: 1em;`+background+`" id="correo_`+respuesta[i].idusuarios+`">`+respuesta[i].usuario+`
	             		 	</div>
             		
               
                        </div>
                        	 <div class="col-20">
                         <div class="col"> 
                        `;

                       	if (localStorage.getItem('idtipousuario')==5) {
	                       html+=`<button id="" class="button " style="font-size: 26px;" onclick="SubirFotoIndividual(`+respuesta[i].idusuarios+`)">
	                       		 <i class="bi bi-card-image"></i>
	                        </button>`;
	                    }

                      html+= ` </div>
                        </div>

                        `;

            
                    if (localStorage.getItem('idtipousuario')!=3) {
                    	html+=`
                    		<div class="col-30">`;
                    		var aceptoback="#c2c2c2";
                    		if (respuesta[i].aceptarterminos==1){

                    			aceptoback="#007aff";
                    		}
                    		var pagadoback="red";
                    	if (respuesta[i].pagado==1){

                    			pagadoback="#59c158";
                    		}

                        html+=`<span style="
							    background:`+aceptoback+` ;
							" class="divaceptado"></span>`;

                       html+=` <span style="
							    background:`+pagadoback+` ;" class="divaceptado"></span>`;

                       html+=`</div>`;

                    	
                    }

                    html+=` </div>
               
             		 
              </div>

            
          </div></label></li>

			`;
		}
		$("#divinvitados").html(html);

	}else{
				$(".listadoinvitados").css('display','none');

	}
}

function CancelarUsuarioServicio(idusuarios) {
	
	 app.dialog.confirm('','¿Está seguro  de realizar la cancelación del usuario ?' , function () {
	 	var pagina="CancelarUsuarioServicio.php";
	 	var idservicio=localStorage.getItem('idservicio');
	 	var idtipousuario=localStorage.getItem('idtipousuario');
	 	var datos="idservicio="+idservicio+"&idusuarios="+idusuarios+"&idtipousuario="+idtipousuario;
	 	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(resp){


  			ObtenerParticipantesAlumnosAdmin();

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});


	});
}

