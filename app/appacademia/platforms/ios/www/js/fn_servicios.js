function ObtenerServiciosAdicionales() {
	var pagina = "ObtenerServiciosAdicionales.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		async:false,
		
		success: function(datos){

			var respuesta=datos.respuesta;
			PintarServiciosAdicionales(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function PintarServiciosAdicionales(respuesta) {
		
		var html="";
		if (respuesta.length>0) {

			for (var i = 0; i < respuesta.length; i++) {
				

						imagen=urlimagenes+`servicios/imagenes/`+codigoserv+respuesta[i].imagen;

				html+=`
					 <div class="col-100 medium-50 margin-bottom">
		                <div class="row">
		                    <div class="col-100">
		                        <figure class="rounded-15 position-relative h-190 width-100 no-margin overflow-hidden">
		                            <div class="coverimg h-100 width-100 position-absolute start-0 top-0">
		                                <img src="`+imagen+`" alt=""  style="width:100%;"/>
		                            </div>
		                        </figure>
		                    </div>
		                    <div class="col align-self-center">
		                        <h5 class="margin-bottom" style="font-size:24px;margin-top: 0.5em;"> `+respuesta[i].titulo+`</h5>
		                      
		                        <p class="text-muted" style="text-align:justify;">`+respuesta[i].descripcion+`</p>
		                        <!--<a href="/blogdetails/" class="small">Read More <i class="bi bi-arrow-right"></i></a>--!>
		                    </div>
		                </div>
		            </div>


				`;


			}


		$(".listadoserviciosadicionales").html(html);

		}
	
}
function ObtenerServicioAdmin() {

	var pagina = "ObtenerServicio.php";
	var id_user=localStorage.getItem('id_user');
	var idservicio=localStorage.getItem('idservicio');
	var datos="id_user="+id_user+"&idservicio="+idservicio;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			
			console.log(datos);
			var respuesta=datos.respuesta[0];
			var imagen=respuesta.imagen;
			var horarios=datos.horarios;
			var idservicio=respuesta.idservicio;
			localStorage.setItem('idservicio',idservicio);
			if (imagen!=null && imagen!='') {

				imagen=urlimagenes+`servicios/imagenes/`+codigoserv+imagen;
	
			}else{


				imagen=localStorage.getItem('logo');
			}
			$("#imgservicioasignado").attr('src',imagen);

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
				if (respuesta.abiertocliente == 1) {
				$("#permisoasignaralumno").css('display','block');
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

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}
function ObtenerParticipantesAlumnosAdmin() {
	var idservicio=localStorage.getItem('idservicio');
	var pagina = "ObtenerParticipantesAlumnosAdmin.php";
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
			$(".cantidadalumnos").text(respuesta.length);
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