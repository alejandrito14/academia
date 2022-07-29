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