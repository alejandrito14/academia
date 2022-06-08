function ObtenerServicioAsignado() {
	
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
		success: function(datos){
			var respuesta=datos.respuesta;
			var imagen=respuesta.imagen;
			var horarios=datos.horarios;

			imagen=urlimagenes+`servicios/imagenes/`+codigoserv+imagen;
			$("#imgservicioasignado").attr('src',imagen);

			$(".tituloservicio").text(respuesta.titulo);

			if (horarios.length>0) {
							PintarHorarios(horarios);

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
	var idusuarios_servicios=localStorage.getItem('idusuarios_servicios');
	var pagina = "AceptarTerminos.php";
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

			if (datos.respuesta==1) {
				
				GoToPage('detalleservicio');
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

function PantallaCalificacion() {
	
       var html=`
         
              <div class="block">
               <div class="row">
                  
                <div class="col">
                 <i class="bi-star-fill iconosestrella estrellaseleccionada">
                   
                 </i>
               </div>
                 <div class="col">
                  <i class="bi bi-star iconosestrella estrellaseleccionada"></i>
                </div>
                  <div class="col">
                   <i class="bi bi-star iconosestrella estrellaseleccionada"></i>
                 </div>
                   <div class="col">
                    <i class="bi bi-star iconosestrella estrellaseleccionada"></i>
                  </div>
                    <div class="col">                 
                      <i class="bi-star iconosestrella estrellaseleccionada"></i>
                    </div>
               

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
          verticalButtons: false,
        }).open();
	
}