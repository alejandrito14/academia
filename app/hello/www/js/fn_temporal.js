var variableentradas=[];
function ObtenerEntradasTempo(estatus) {
	var datos="estatus="+estatus;
	var pagina = "ObtenerEntradas.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		async:false,
		success: function(datos){

			var respuesta=datos.respuesta;
			variableentradas=respuesta;
			//PintarEntradas(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function PintarEntradas2() {
	respuesta=variableentradas;
	if (respuesta.length>0) {
		var html="";
		for (var i = 0; i <respuesta.length; i++) {
			 var onclick="";
                      var imagen=0;
                      var video=0;
                      var urlimagen="";
                       if (respuesta[i].tipo==1) {
                      	 	imagen=1;
                      	    urlimagen=urlimagenes+`entradas/imagenes/`+codigoserv+respuesta[i].imagen;

                      	 	onclick="VerImagen("+respuesta[i].identrada+")"
                       }

                       if (respuesta[i].tipo==2) {
                       		video=1;
                       		imagen=1;
                      		urlvideo=urlimagenes+`entradas/videos/`+codigoserv+respuesta[i].video;

                       		onclick="VerVideo("+respuesta[i].identrada+")"

                       		if (respuesta[i].imagen!='') {
                         		imagen=1;
                         	    urlimagen=urlimagenes+`entradas/imagenes/`+codigoserv+respuesta[i].imagen;

                      	 		

                         	}
                       }

                         if (respuesta[i].tipo==3) {

                         	if (respuesta[i].imagen!='') {
                         		imagen=1;
                         	    urlimagen=urlimagenes+`entradas/imagenes/`+codigoserv+respuesta[i].imagen;

                      	 		onclick="VerImagen("+respuesta[i].identrada+")"

                         	}
                      	 	
                       }

                       var checked="";
						if (respuesta[i].estatus==1) {
							checked="checked";
						}

			html+=`
			<div class="card margin-bottom overflow-hidden theme-bg text-color-white" style="margin: 1em;height: 200px;">
                   
					<div class="seleccionador" style="position: absolute;right: 0; display:none;z-index:3;" > 
                   <label>
                   <input type="checkbox" class="" id="cambioentra_`+respuesta[i].identrada+`" onchange="CambiarEstatusEntrada(`+respuesta[i].identrada+`)" style="    margin-right: 1.4em;
				    transform: scale(1.5);" `+checked+`> </label>
				    </div>

                    <div class="overlay"></div>
                    <div class="coverimg h-100 width-100 position-absolute opacity-5" style="background-image: url(`+urlimagen+`);">
                        <img src="img/news1.jpg" alt="" style="display: none;"/>
                    </div>
                    <div class="">
 					
                    `;
                     
                       if (respuesta[i].titulo!='') {
                       	   html+=`    <a  style="color:white;" class="h4 d-block  margin-bottom-half textoabajoderecha" onclick="`+onclick+`">`+respuesta[i].titulo+`</a>`;

                       }
                        	
             
     /*                 if (respuesta[i].descripcion!='' && respuesta[i].descripcion!=null) {
                       	 
                      html+=`  <p class="text-muted" onclick="`+onclick+`">`+respuesta[i].descripcion+`</p>`;

                       }*/
                        	


                     html+=`   <div class="small">`;

                             if (imagen==1) {
                        html+=`   <figure class="avatar avatar-20 rounded margin-horizontal-half" >
                               
                          

                            </figure>`;

                            	}

                            	if (video==1) {

                            		html+=`

                            		<div style="position: absolute;top: 60%;left: 45%;display: flex;margin: auto;font-size: 40px;">
                            		<span class="bi bi-play-circle"  onclick="`+onclick+`"></span>
                            		</div>
                            		`;
                            	}else{

                            		html+=`
                            		<div style="position: absolute;top: 50%;left: 40%;display: flex;margin: auto;font-size: 40px;width:100px;height:100px;" onclick="`+onclick+`" >

                            		</div>

                            		`;
                            	}
                          
                        html+=`</div>`;



                   html+=` </div>
                </div>


			`;


		}

		


		$$(".entradas").html(html);

		if (respuesta.length>=3) {
			
			$$(".entradas").css('height','700px');
		}

		if (respuesta.length<=2) {

			multiplicar=respuesta.length*220;
			$$(".entradas").css('height',multiplicar+'px');
		}

		if (localStorage.getItem('idtipousuario')==0) {
			$(".seleccionador").each(function(index) {
				$(this).css('display','block');
		});	
		}
	


		$(".divblog").css('display','block');

	}else{

		$(".divblog").css('display','none');
	}
}