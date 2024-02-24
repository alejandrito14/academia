var dynamicSheet1="";
var intervalove=0;
var intervalovefinal=0;

var dynamicSheet4="";
var dynamicSheet5="";
var dynamicSheet6="";

function ObtenerTableroAnuncios(estatus) {

	//return new Promise((resolve, reject) => {
 
	var datos="estatus="+estatus;
	var pagina = "ObtenerTableroAnuncios.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
			$$(".cardswiper").html('');

			var respuesta=datos.respuesta;
			PintarTableroAnuncios2(respuesta);
			//resolve(respuesta);
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});

	//});
}

function PintarTableroAnuncios(respuesta) {
	var html="";

			var	classe="swiper-slide-active";

		if (respuesta.length>0) {

			html+=` <div class="swiper-wrapper">`;
		for (var i = 0; i < respuesta.length; i++) {
		imagen=urlimagenes+`tableroanuncios/imagenes/`+codigoserv+respuesta[i].imagen;
			var checked="";
			if (respuesta[i].estatus==1) {
				checked="checked";
			}
				html+=`
<div class="swiper-slide swiper-slide-active" role="group"  style="margin-right: 20px;width:200px;">
				<div class="card-bx featured-card">
						<div class="card-media" style="width:100%;height:72px;">
							<a  class="">
							<img src="`+imagen+`" alt="">
							</a>
						</div>
						<div class="card-info">
							<h5 class="title" >
								<a >`+respuesta[i].titulo+`
								</a>
							</h5>
							<p class="location">
							</p>
							<h6 class="text-primary vacancy">
							</h6>
						</div>
					</div>
				</div>

				`;
				classe="";
		}

		html+=`</div>`;
		console.log(html);
		$$(".cardswiper").html(html);

		 var swiper1 = new Swiper(".cardswiper", {
		     slidesPerView: "auto",
		    spaceBetween: 30,
		    pagination: false,

		  });
			$(".divtableroauncios").css('display','block');

			if (localStorage.getItem('idtipousuario')==0) {
				$(".seleccionadoranuncio").each(function(index) {
				$(this).css('display','block');
				});	
			}



	}else{

		$(".divtableroauncios").css('display','none');

	}
}

function PintarTableroAnuncios2(respuesta) {
	
	if (respuesta.length>0) {
		var html="";
		html+=`<div class="swiper-wrapper">`;
		for (var i = 0; i <respuesta.length; i++) {
		imagen=urlimagenes+`tableroanuncios/imagenes/`+codigoserv+respuesta[i].imagen;

			   var checked="";
			if (respuesta[i].estatus==1) {

				checked="checked";
			}
			html+=`
				<div class="swiper-slide coverimg" >
				<div class="seleccionador" style="position: absolute;right: 0;z-index:3;display:none;" > <label><input type="checkbox" class="" style="    margin-right: 1.4em;
				    transform: scale(1.5);    height: 15px;width: 20px;" id="cambiopubli_`+respuesta[i].idtableroanuncios+`" onchange="CambioEstatusPublicidad(`+respuesta[i].idtableroanuncios+`)" `+checked+`>
				     </label>
				    </div>
                 <a  class="card margin-bottom coverimg" style="display: contents;">
                 <div class="card-content " style="padding-top:0;padding-bottom:0;">
                 <div class="row">

                	<div class="" style="padding: 0;margin: 0px auto;" >
                        <img src="`+imagen+`" alt="" onclick="" style="width: 100%;border-radius: 10px;margin: 0;padding: 0px;">
                      </div>
                      <div class="" style="width:100%;">
							<h5 class="" style="margin:0;text-align:center;">
								<span style="color:#bdbdbc;">`+respuesta[i].titulo+`
								</span>
							</h5>
							
						</div>

               
                   </div>
                 </div>
                </a>
              </div>

			`;


			
		}

		html+=`</div>`;

		$$(".cardswiper").html(html);


	if(localStorage.getItem('idtipousuario')==0){

		var swiper3 = new Swiper(".cardswiper", {
		    slidesPerView: "auto",
		    spaceBetween: 0,
		    pagination: false,
		    
		  });
	}else{

		var swiper3 = new Swiper(".cardswiper", {
		    slidesPerView: "auto",
		    spaceBetween: 0,
		    pagination: false,
		     autoplay: {
		        delay: 2500,
		        disableOnInteraction: false,
		        },
		  });
	}

			$(".divpublicidad").css('display','block');
	
	}else{

		$(".divpublicidad").css('display','none');
	}
	
}


function ObtenerTableroCategorias(estatus) {

	//return new Promise((resolve, reject) => {
 
	var datos="estatus="+estatus;
	var pagina = "ObtenerTableroCategorias.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
			$$(".cardswipercategorias").html('');

			var respuesta=datos.respuesta;
			PintarTableroCategorias(respuesta);
			//resolve(respuesta);
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});

	//});
}

function PintarTableroCategorias(respuesta) {
	var html="";
	if (respuesta.length>0) {
		html+=`<div class="swiper-wrapper">`;
		for (var i = 0; i < respuesta.length; i++) {
			
			imagen=urlimagenes+`categorias/imagenes/`+codigoserv+respuesta[i].foto;

			html+=`
				<div class="swiper-slide" style="width: 50%!important;">
						<a  class="categories-bx">
							<div class="">
								<img src="`+imagen+`" alt="" style="width:80%;">
							</div>


							<h6 class="title">
							
							<span>`+respuesta[i].titulo+`</span></h6>
						</a>
					</div>

			`;	
		}

		html+=`</div>`;

		$(".cardswipercategorias").html(html);

		 var swiper2 = new Swiper(".cardswipercategorias", {
		     slidesPerView: "auto",
		    spaceBetween: 30,
		    pagination: false,

		  });
	}

}


function ObtenerTableroSucursal(estatus) {

	//return new Promise((resolve, reject) => {
 
	var datos="estatus="+estatus;
	var pagina = "ObtenerTableroSucursal.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
			$$(".cardswipersucursal").html('');

			var respuesta=datos.respuesta;
			PintarTableroSucursal(respuesta);
			//resolve(respuesta);
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});

	//});
}

function PintarTableroSucursal(respuesta) {
	var html="";
	if (respuesta.length>0) {

		for (var i = 0; i < respuesta.length; i++) {
			
		imagen=urlimagenes+`sucursal/imagenes/`+codigoserv+respuesta[i].imagen;

		var coordenadas=respuesta[i].ubicacion;
	var lat="";
	var long="";
	var onclick="";
	if (coordenadas!='' && coordenadas!=null) {
	 coordenadas=respuesta[i].ubicacion.split(',');

		lat=coordenadas[0];
		long=coordenadas[1];

		onclick="abrirGoogleMaps('"+lat+"','"+long+"')";
	}
	var estilo="";
	var cantidadsucursal=respuesta.length;
	if (cantidadsucursal>1) {
		estilo="border-bottom:1px solid; ";
	}



		      html+=`
		      <div class="" onclick="DetalleSucursal(`+respuesta[i].idsucursal+`)"> 
		      	<div class="row" style="`+estilo+`padding-bottom: 1em;">
			        <div class="col-40"  style="margin-left: 10px;"> 
							<img src="`+imagen+`" alt="" style="width: 100%;">

			        </div>
			        <div class="col-60">
			        	<div class="row" style="    margin-left: 10px;">
								<div class="col-100">
								<p class="title" style="color:black;margin:0;font-size: 18px;margin-bottom: 10px;">
										<a >`+respuesta[i].titulo+`
									</p>
									<p style="font-size: 14px;color:#c7aa6a;line-height: 16px;">
									`+respuesta[i].direccion+`</p>
									
									
								</div>
							
							</div>
							<div class="row" style="
							    margin-top: 1em;    margin-left: 20px;">
							
							</div>

			        </div>
		      

		      </div>

		      </div>


		      `;



		}
	


		$$(".cardswipersucursal").html(html);



		/* var swiper3 = new Swiper(".cardswipersucursal", {
		     slidesPerView: "auto",
		    spaceBetween: 30,
		    pagination: false,

		  });
	    <div class="col-10" style="">
																
								<span style="" class="material-icons-outlined" onclick="AgendarDesdeSucursal(`+respuesta[i].idsucursal+`)">
									calendar_month
									</span>
								</div>

								<div class="col-80" style="">
									<span class="material-icons-outlined" style="font-size:28px;" onclick="`+onclick+`">
									location_on
									</span>

								</div>

		  */

	}
}


function AgendarDesdeSucursal(idsucursal) {
	localStorage.setItem('idsucursal',idsucursal);
	VistaCategoria(idsucursal);
}

function ObtenerTableroCitas(estatus) {
    var fecha="";
	var estatus=1;
	var iduser=localStorage.getItem('id_user');
	var datos="idusuarios="+iduser+"&fechafiltro="+fecha+"&estatus="+estatus+"&hoy=1";
	var pagina = "ObtenerTableroCitasFiltro.php";
	//return new Promise((resolve, reject) => {
 	//var idusuarios=localStorage.getItem('id_user');
	//var datos="estatus="+estatus+"&idusuarios="+idusuarios;
	var pagina = "ObtenerTableroCitasFiltro.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
			
			var fecha=datos.fechafiltro;

			var respuesta=datos.respuesta;
			if (respuesta.length>0) {
				//$(".iconocitas").css('display','');
			}
			//$(".numerocitas").text(respuesta.length);
			PintarTableroCitas(respuesta,fecha);
			

			$(".fechaactual").text(fecha);

			//resolve(respuesta);
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});

	//});
}

function ObtenerCitasProgramadas() {
	var fecha="";
	var estatus=1;
	var iduser=localStorage.getItem('id_user');
	var datos="idusuarios="+iduser+"&fechafiltro="+fecha+"&estatus="+estatus+"&hoy=1";
	//return new Promise((resolve, reject) => {
 	//var idusuarios=localStorage.getItem('id_user');
	//var datos="estatus="+estatus+"&idusuarios="+idusuarios;
	var pagina = "ObtenerCitasProgramadas.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
			
			var respuesta=datos.respuesta;
			if (respuesta.length>0) {
				$(".iconocitas").css('display','');
			}else{
				$(".iconocitas").css('display','none');

			}
			$(".numerocitas").text(respuesta.length);
			
			//resolve(respuesta);
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function PintarTableroCitas(respuesta,fechaactual) {
	var html="";

	$(".titulocitas").css('display','none');
	 var numero=respuesta.length;

		var contadorpasado=0;
	if (respuesta.length>0) {
		$(".titulocitas").css('display','block');
		for (var i = 0; i < respuesta.length; i++) {
			var cancelado=0;
			var clasecancelado="";
			if (respuesta[i].cancelacion==1) {
				cancelado=1;
				clasecancelado="clasecancelado";
			}

			var colorborde='#9c9c9c';
	         if (i % 2 === 0) {
	         
	         colorborde='#c7aa6a';
	         }


		if (respuesta[i].porpasar==0 && contadorpasado==0) {


	html+=`<div class="row" style="    display: flex;
    justify-content: center;
    width: 100%;margin-bottom: 10px;">
				<div class="linea"><span>Hoy `+fechaactual+`</span></div>

				</div>`;
				contadorpasado++;


			}

				imagen=urlimagenes+`sucursal/imagenes/`+codigoserv+respuesta[i].imagen;
				var color="color:black;";
				if (respuesta[i].estatus==0) {
					 color="color:black;";
				}

				if (respuesta[i].estatus==1) {
					color="color:#C7AA6A;";

				}

				if (respuesta[i].estatus==2) {
					color="color:#5ac35b;";
				}

			html+=`
			<li class="col-100" style=" border: 1px solid `+colorborde+`;
    border-radius: 10px; margin-right: 1em; margin-left: 1em;margin-bottom: 1em;" >
				
				<div class="row">
				<div class="col-60">
					<div class="card-bx job-card" style="padding-right: 0;" >
						
					<div class="card-info">
						<p class="item-title cambiarfuente">
						<p class="cambiarfuente `+clasecancelado+`" style="margin:0;color:white;"  >`+respuesta[i].anio+` </p>
						<a style="color:white;" >
							<p class="cambiarfuente `+clasecancelado+`" style="margin:0;word-break: break-word;">`+respuesta[i].fechaformato+` </p>
						</a>

						<p class="cambiarfuente `+clasecancelado+`" style="color: white;font-size: 18px;margin:0;" >`+respuesta[i].horacita+`hrs.</p>

						</p>
					  <div class="">
				
						<p class="cambiarfuente `+clasecancelado+`" style="color: white;margin:0;" >Barbero: `+respuesta[i].nombreespecialista+`</p>
						<p class="cambiarfuente `+clasecancelado+`" style="color: white;margin:0;" >Barbería: `+respuesta[i].titulo+`</a></p>`;
						
							//aqui checkin checkout

								
									if (respuesta[i].checkin==1) {
								html+=`
									<p class="" style="display: flex;">`;
								html+=`<span>check-in: `+respuesta[i].fechachekin+`</span> <span class="material-icons-outlined" style=" width: 30px;justify-content: center;font-size: 20px;color:#5ac35b;margin-left: 5px;">
										check_circle_outline
										</span>

										`;
								html+=`</p>`;
									}

									if (respuesta[i].checkout==1) {
								html+=`
									<p class="" style="display: flex;">`;
								html+=`<span>check-out: `+respuesta[i].fechachekout+`</span> <span class="material-icons-outlined" style=" width: 30px;justify-content: center;font-size: 20px;color:#5ac35b;margin-left: 5px;">
										check_circle_outline
										</span>`;
								html+=`</p>`;
									}

								html+=`</p>`;
								
								html+=`<a id="btncalendario" style=" color: #007aff!important;text-align: center;justify-content: center;" onclick="AbrirModalCita(`+respuesta[i].idcita+`)">Ver detalle</a>`;

						html+=`</div>
							</div>

						</div>

						</div>
						<div class="col-40">`;
					var claseestatus="";

                if (respuesta[i].estatuscita==0) {
                  claseestatus='estatuscitapendiente';
                  }
                  if (respuesta[i].estatuscita==1) {
                  claseestatus='estatuscitaproceso';
                  }
                  if(respuesta[i].estatuscita==2) {
                  claseestatus='estatuscitafinalizada';
                  }

                  if(respuesta[i].estatuscita==3) {
                  claseestatus='estatuscitacancelada';
                  }

                   if(respuesta[i].estatuscita==4) {
                  claseestatus='estatuscitavencida';
                  }

                 
                html+=`
                  <p  style="display: flex;" >`;
                html+=`<span class="`+claseestatus+`">`+respuesta[i].textoestatus+`</span>  `;
                html+=`</p>`;
                  

						html+=`</div>


						</div>
					</div>`;
					var onclick="";
					
					if (respuesta[i].checkin==0) {

						//onclick="GenerarQrCita2("+respuesta[i].idcita+")";
	
					}else{

						
					}



					/*html+=`<a  class="bookmark-btn active" onclick="`+onclick+`" >
						<span class="material-icons-outlined" style="font-size: 28px;`+color+`">
							qr_code
						</span>
					</a>`;*/


				html+=`

				</div>
			</li>
			`;
		}
	}
	$(".tablerocitas").html(html);
}


function GenerarQrCita2(idcita) {
	var iduser=localStorage.getItem('id_user');
	var datos="idcita="+idcita+"&iduser="+iduser;
	var pagina = "ObtenerDetalleCita.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		success: function(datos){

				var respuesta=datos.respuesta;
				const myPromise = new Promise((resolve, reject) => {
				ObtenerDetalleCita(respuesta);	

				});
				
				localStorage.setItem('idcita',idcita);

				myPromise.then((successMessage) => {

				GenerarQrCita(idcita);

				});
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function Obtenerpublicidad(estatus){

	var datos="estatus="+estatus;
	var pagina = "ObtenerPublicidad.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		crossDomain: true,
		cache: false,
		async:false,
		success: function(datos){

			var respuesta=datos.respuesta;
			Pintarpublicidad2(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});

}

function Pintarpublicidad(respuesta) {
		$("·divpublicidad").css('display','none');

	if (respuesta.length>0) {
		$("·divpublicidad").css('display','block');
		var html="";
		html+=`<div class="swiper-wrapper">`;
		for (var i = 0; i <respuesta.length; i++) {
			   		imagen=urlimagenes+`publicidad/imagenes/`+codigoserv+respuesta[i].imagen;

			   var checked="";
			if (respuesta[i].estatus==1) {

				checked="checked";
			}
			html+=`
				<div class="swiper-slide coverimg" >
				<div class="seleccionador" style="position: absolute;right: 0;z-index:3;display:none;" > <label><input type="checkbox" class="" style="    margin-right: 1.4em;
				    transform: scale(1.5);    height: 15px;width: 20px;" id="cambiopubli_`+respuesta[i].idpublicidad+`" onchange="CambioEstatusPublicidad(`+respuesta[i].idpublicidad+`)" `+checked+`>
				     </label>
				    </div>
                 <a  class="card margin-bottom coverimg" style="display: contents;">
                 <div class="card-content card-content-padding " style="padding-top:0;padding-bottom:0;    padding-right: 1.5em;">
                 <div class="row">

                	<div class="" style="padding: 0;margin: 0px auto;" onclick="DetallePromocion(`+respuesta[i].idpublicidad+`)">
                        <img src="`+imagen+`" alt="" onclick="" style="width: 100%;border-radius: 10px;margin: 0;padding: 0px;"">
                      </div>


               
                   </div>
                 </div>
                </a>
              </div>

			`;
		}

		html+=`</div>`;

		$$(".cardpublicidad").html(html);


	if(localStorage.getItem('idtipousuario')==0){

		var swiper2 = new Swiper(".cardpublicidad", {
		    slidesPerView: "auto",
		    spaceBetween: 0,
		    pagination: false,
		    
		  });
	}else{

		var swiper2 = new Swiper(".cardpublicidad", {
		    slidesPerView: "auto",
		    spaceBetween: 0,
		    pagination: false,
		     autoplay: {
		        delay: 2500,
		        disableOnInteraction: false,
		        },
		  });
	}

			$(".divpublicidad").css('display','block');
	
	}else{

		$(".divpublicidad").css('display','none');
	}
	

}

function Pintarpublicidad2(respuesta) {
	if (respuesta.length>0) {
		var html="";
		html+=`<div class="swiper-wrapper">`;
		for (var i = 0; i <respuesta.length; i++) {
		imagen=urlimagenes+`publicidad/imagenes/`+codigoserv+respuesta[i].imagen;

			   var checked="";
			if (respuesta[i].estatus==1) {

				checked="checked";
			}
			html+=`
				<div class="swiper-slide coverimg" >
				<div class="seleccionador" style="position: absolute;right: 0;z-index:3;display:none;" > <label><input type="checkbox" class="" style="    margin-right: 1.4em;
				    transform: scale(1.5);    height: 15px;width: 20px;" id="cambiopubli_`+respuesta[i].idpublicidad+`" onchange="CambioEstatusPublicidad(`+respuesta[i].idpublicidad+`)" `+checked+`>
				     </label>
				    </div>
                 <a  class="card margin-bottom coverimg" style="display: contents;">
                 <div class="card-content  " style="padding-top:0;padding-bottom:0; ">
                 <div class="row">

                	<div class="" style="padding: 0;margin: 0px auto;" >
                        <img src="`+imagen+`" alt="" onclick="" style="width: 100%;border-radius: 10px;margin: 0;padding: 0px;"">
                      </div>
                      <div class="card-info">
							
							
						</div>

               
                   </div>
                 </div>
                </a>
              </div>

			`;
		}

		html+=`</div>`;

		$$(".cardpublicidad").html(html);


	if(localStorage.getItem('idtipousuario')==0){

		var swiper4 = new Swiper(".cardpublicidad", {
		    slidesPerView: "auto",
		    spaceBetween: 0,
		    pagination: false,
		    
		  });
	}else{

		var swiper4 = new Swiper(".cardpublicidad", {
		    slidesPerView: "auto",
		    spaceBetween: 0,
		    pagination: false,
		     autoplay: {
		        delay: 2500,
		        disableOnInteraction: false,
		        },
		  });
	}

			$(".divpublicidad").css('display','block');
	
	}else{

		$(".divpublicidad").css('display','none');
	}

}


function ObtenerCategorias(estatus) {

	//return new Promise((resolve, reject) => {
 
	var datos="estatus="+estatus;
	var pagina = "ObtenerTableroCategorias.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
			$$(".welcome-swiper").html('');

			var respuesta=datos.respuesta;
			PintarCategorias(respuesta);
			//resolve(respuesta);
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});

	//});
}

function PintarCategorias(respuesta) {
	var html="";
	if (respuesta.length>0) {
		html+=`<div class="swiper-wrapper">`;
		for (var i = 0; i < respuesta.length; i++) {
			
			imagen=urlimagenes+`categorias/imagenes/`+codigoserv+respuesta[i].foto;

			html+=`
				<div class="swiper-slide">
						<div class="card card-bx card-featured listacategorias" style="width: 50%;height:100px;" id="cat_`+respuesta[i].idcategorias+`" onclick="ElegirCategoria(`+respuesta[i].idcategorias+`)">
							<div class="icon-bx">
								<img src="`+imagen+`" alt="" style="width:100%;">
							</div>
							<div class="dz-info">
								<h5 class="title">`+respuesta[i].titulo+`</h5>
								
							</div>
						</div>
					</div>


			`;
		}
		html+=`</div>`;
	}

			$$(".welcome-swiper").html(html);


	var swiper3 = new Swiper(".welcome-swiper", {
		    slidesPerView: "auto",
		    spaceBetween: 0,
		    pagination: false,
		    
		  });
}

function ElegirCategoria(idcategoria) {

	$(".listacategorias").removeClass('bordecategoria');
	$("#cat_"+idcategoria).addClass('bordecategoria');
	localStorage.setItem('idcategoriaelegida',idcategoria);
}

function DetallePromocion(idpublicidad) {
	var datos="idpublicidad="+idpublicidad;
	var pagina = "ObtenerDetallePromocion.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){
			
			var respuesta=datos.respuesta;
			PintarDetallePromocion(respuesta);
			//resolve(respuesta);
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});


}

function PintarDetallePromocion(respuesta) {
	
var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 100%;background: none;">
            <div class="toolbar">
              <div class="toolbar-inner">
                <div class="left"></div>
                <div class="right">
                  <a class="link sheet-close"></a>
                </div>
              </div>
            </div>
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px; ">
            	 <div class="iconocerrar link sheet-close" style="z-index:10;">
	 														<span class="material-icons-outlined">
																		cancel
																		</span>
	   						    	 </div>
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
		   							 	 
		   							  	<div class="row">
		   							  		<h1 class=" margin-bottom" style="font-size:24px;text-align:center;">
								             `+respuesta.titulo+`
								             </h1>
		   							  	</div>
		   							 	 <div class="row margin-bottom">
									        <div class="col-100 no-padding-horizontal">
										        
										          </div>
									        </div>
								      </div>
		   							 			`;

		   							 			//var descripcion= respuesta.descripcion;

/*		   							 			var dividircadena=descripcion.replace('|','<br>');
*/
		   							 	html+=`</div>

		   							 		<div class="row">
			   							  		<p class=" margin-bottom" style="font-size:18px;text-align: justify;">
									             
									             </p>
		   							  		</div>

		   							  		<div class="row margin-bottom " style="padding-top: 1em;">
		   							  		<div class="col-100">`;
		   							  		if (respuesta.url!='' && respuesta.url!=null) {
		   							  		html+=`<button class="button button-fill button-large color-theme button-raised margin-bottom-half btnmisservicios" onclick="showArchivo('`+respuesta.url+`')">
		   							  			<i class="bi bi-globe2 margin-horizontal-half">
		   							  			</i>
		   							  			Visitar
		   							  			
		   							  			</button>`;
		   							  		}

		   							  		html+=`</div>
		   							  		</div>

	   							 	</div>

   							 </div>

   				</div>
                
              </div>
            </div>
          </div>`;
          
	 var dynamicSheet1 = app.sheet.create({
        content: html,

    	swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
           


			 var swiper = new Swiper('.swiper-imagenes', {

				      pagination: {
				        el: '.swiper-pagination',
				       dynamicBullets:true,
				      },
				     /* slideToClickedSlide: true,
				      lazyLoading:true,*/
				   		

				    });

			

          },
          opened: function (sheet) {
            console.log('Sheet opened');
          },
        }
      });

       dynamicSheet1.open();
}

function ObtenerIntereses() {

	var pagina = "ObtenerIntereses.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		async:false,
		success: function(datos){

			var respuesta=datos.respuesta;
			PintarIntereses(respuesta);
			//resolve(respuesta);
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function PintarIntereses(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i < respuesta.length; i++) {
			html+=`
				<div class="col-100" style="
   						 margin-top: .5em;margin-bottom:.5em; border-radius: 10px;color:white;
    background: #C7AA6A;" onclick="GuardarInteres(`+respuesta[i].idintereses+`)" id="interes_`+respuesta[i].idintereses+`">
					<p style="    text-align: center;
    margin: 3px;word-break: break-all;line-height:2;">
					`+respuesta[i].interes+`</p>
					</div>

			`;
		}
	}
	$(".listadointeres").html(html);
}

var arrayinteres=[];
function GuardarInteres(idintereses) {
	if ($("#interes_"+idintereses).hasClass('interesseleccionado')) {

		$("#interes_"+idintereses).removeClass('interesseleccionado');
		BorraInteres(idintereses);
	}else{
		$("#interes_"+idintereses).addClass('interesseleccionado');
		arrayinteres.push(idintereses);
	}

}

function BorraInteres(idinteres) {
	if (arrayinteres.length>0) {
		for (var i = 0; i < arrayinteres.length; i++) {
			
			if (arrayinteres[i]==idinteres) {
				arrayinteres.splice(idinteres,1);
			}
		}
	}
}

function GuardarIntereses() {
	var iduser=localStorage.getItem('id_user');
	var datos="iduser="+iduser+"&arrayinteres="+arrayinteres;
	var pagina = "GuardarIntereses.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(datos){

			var respuesta=datos.respuesta;
			localStorage.removeItem('idusuarioinvitado');
			   GoToPage("home");

			
			//resolve(respuesta);
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});

	}
function CargarDatos() {
	  //ObtenerTableroAnuncios(1);
     // ObtenerTableroCategorias(1);
      ObtenerTableroSucursal(1);
      ObtenerTableroCitas(1);
      Obtenerpublicidad(1);
      ObtenerDetalleEmpresa();
    PintarCantidadcarrito();
    ObtenerFechaActual();
    ObtenerEdad();
   // GuardarZonaHoraria();
	$(".divhoy").attr('onclick','ObtenerTableroCitas(1);');
    $(".liconfiguracion").css('display','none');

	$(".divcalendario").attr('onclick','AbrirCalendarioUsuario()');
    $(".nombreusuario").text('');
    $(".lblusuario").css('display','none');
    $(".lilogin").css('display','');

     var invitado= localStorage.getItem("invitado");
    	if (invitado==0) {
       		 $(".lblusuario").css('display','block');

    		var nombre=localStorage.getItem('nombre');
    		$(".nombreusuario").text(nombre);
    		$(".lilogin").css('display','none');
    		//$(".lblusuario").attr('onclick','verperfil()');
    	}


     var os=  localStorage.getItem("SO");
       $(".bcantidadcarrito").css('right','8px');

     if (os=='ios') {
     	$(".bcantidadcarrito").css('right','8px');
     }
}

function verperfil() {
	GoToPage('perfil');
}

function Cargarperfilfoto() {
	
	var pagina = "Obtenerdatospersonales.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){

			var respuesta=datos.respuesta;
			var confi=datos.confi;
		
			if (respuesta.foto!='' && respuesta.foto!='null' && respuesta.foto!=null ) {

				localStorage.setItem('foto',respuesta.foto)

			}else{
				if (respuesta.sexo=='M') {
					foto=confi.avatarmujer;
				}
				else{
					foto=confi.avatarhombre;
				}

				localStorage.setItem('avatar',foto);

				localStorage.setItem('foto','');

			}

			if (respuesta.nombre==null) {
				respuesta.nombre='';
			}
			if (respuesta.paterno==null) {
				respuesta.paterno='';
			}
			if (respuesta.materno==null) {
				respuesta.materno='';
			}
			var nombre=respuesta.nombre+' '+respuesta.paterno+' '+respuesta.materno;
			$("#txtnombre").text(nombre);

			CargarFoto();

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function DetalleSucursal(idsucursal) {
	localStorage.setItem('idsucursal',idsucursal);
	GoToPage('detallesucursal');
}

function IraCarrito() {
	GoToPage('carrito');
}

function AbrirModalCita(idcita) {
var iduser=localStorage.getItem('id_user');
	var datos="idcita="+idcita+"&iduser="+iduser;
	var pagina = "ObtenerDetalleCita.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		success: function(datos){

			var respuesta=datos.respuesta;
			localStorage.setItem('idcita',idcita);

				ObtenerDetalleCita(respuesta);	

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
	

}

function ObtenerDetalleCita(respuesta) {
		var imagen=urlimagenes+`sucursal/imagenes/`+codigoserv+respuesta.imagen;

	var html2="";

	var coordenadas=respuesta.ubicacion;
	var lat="";
	var long="";
	if (coordenadas!='') {
	 coordenadas=respuesta.ubicacion.split(',');

		lat=coordenadas[0];
		long=coordenadas[1];
	}
		var llamada="";
	if (respuesta.telefono!='') {
		llamada="hacerLlamada('"+respuesta.telefono+"')";
	}

var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 100%;background: black;">
            <div class="toolbar" style="background: black;margin-top: 20px;">
              <div class="toolbar-inner">
                <div class="left"></div>
                <div class="right">
                  <a class="link sheet-close"></a>
                </div>
              </div>
            </div>
            <div class="sheet-modal-inner" style="background: black;border-top-left-radius: 20px;border-top-right-radius:20px; ">
            	 <div class="iconocerrar link sheet-close" style="z-index:10;">
	 		<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5188 4.48126C23.4385 2.4011 20.788 0.984547 17.9026 0.410715C15.0171 -0.163118 12.0264 0.131546 9.30839 1.25744C6.59043 2.38334 4.26736 4.28991 2.63294 6.73606C0.998525 9.18221 0.12616 12.0581 0.12616 15C0.12616 17.9419 0.998525 20.8178 2.63294 23.264C4.26736 25.7101 6.59043 27.6167 9.30839 28.7426C12.0264 29.8685 15.0171 30.1631 17.9026 29.5893C20.788 29.0155 23.4385 27.5989 25.5188 25.5188C26.9003 24.1375 27.9961 22.4976 28.7437 20.6928C29.4914 18.888 29.8762 16.9535 29.8762 15C29.8762 13.0465 29.4914 11.1121 28.7437 9.30724C27.9961 7.50242 26.9003 5.86255 25.5188 4.48126ZM20.3126 18.7613C20.4187 18.8606 20.5034 18.9808 20.5612 19.1142C20.6191 19.2476 20.6489 19.3915 20.6489 19.5369C20.6489 19.6823 20.6191 19.8262 20.5612 19.9596C20.5034 20.093 20.4187 20.2131 20.3126 20.3125C20.2133 20.411 20.0956 20.4889 19.9661 20.5418C19.8367 20.5946 19.698 20.6214 19.5582 20.6206C19.2795 20.6195 19.0124 20.5088 18.8145 20.3125L15.0001 16.4981L11.2388 20.3125C11.0409 20.5088 10.7738 20.6195 10.4951 20.6206C10.3553 20.6214 10.2166 20.5946 10.0872 20.5418C9.95773 20.4889 9.83999 20.411 9.74071 20.3125C9.54282 20.1134 9.43174 19.8441 9.43174 19.5634C9.43174 19.2827 9.54282 19.0135 9.74071 18.8144L13.502 15L9.74071 11.2388C9.56665 11.0355 9.47569 10.774 9.48602 10.5066C9.49635 10.2392 9.6072 9.98557 9.79642 9.79635C9.98565 9.60712 10.2393 9.49627 10.5067 9.48594C10.7741 9.47561 11.0356 9.56657 11.2388 9.74063L15.0001 13.5019L18.7613 9.74063C18.8597 9.63878 18.9772 9.55729 19.107 9.50083C19.2369 9.44437 19.3766 9.41404 19.5182 9.41158C19.6598 9.40911 19.8004 9.43456 19.9322 9.48646C20.0639 9.53836 20.1842 9.6157 20.286 9.71407C20.3879 9.81244 20.4694 9.9299 20.5258 10.0598C20.5823 10.1896 20.6126 10.3293 20.6151 10.4709C20.6175 10.6125 20.5921 10.7532 20.5402 10.8849C20.4883 11.0167 20.411 11.1369 20.3126 11.2388L16.4982 15L20.3126 18.7613Z" fill="#AAAAAA"></path>
            </svg>
	   						    	 </div>
              <div class="page-content cambiarfuente" style="height: 100%;">
                <div style="background: black; height: 100%;width: 100%;border-radius: 20px;">
   						     <div class="row">
	   						     <div class="col-20">
	   						      	
	   						    </div>

   						    	 <div class="col-60">
   						    	 <span class="titulomodal cambiarfuente" style="font-size: 20px;text-align: center;font-weight: 600;color: #c7aa6a;"">
   						    	 Tu cita</span>
   						    	 </div>
   						    	 <div class="col-20">
   						    	 <span class="limpiarfiltros"></span>
   						    	 </div>
   							 </div>
   							 <div class="" style="position: absolute;top:1em;width: 100%;">
   							 	
	   						<div class="">
		   				   <div class="" style="">
		   					<div class="" style="">
		   							 	 
							<div class="row">
					<div class="col-100" style="margin-left: 1em;margin-right: 1em;">
                <div class="card margin-bottom" style="background:black!important;">
                    <div class="card-header">
                    <div class="datoscita">

                    <div class="row divimgqr itemcarrito1" style="margin-top: 10px;padding: 20px;padding-top: 1em;display:none" >
                        	<div class="imagenqr" style="justify-content: center;display: flex;"></div>
                        </div>
                        <div class="row" style="" >
                            
                            <div class="col-100">`;
                  
                           html+=`
     <div class=" cambiarfuente " style="list-style: none;background: black;">
      <li class="item-content cambiarfuente itemcarrito2" style="margin-top: 1em;border-bottom: 1px solid;margin-bottom: 1em;padding: 20px;
    padding-top: 1em;border-top: 1px solid white;">
            <div class="row" style="margin-bottom: 10px;">
              <div class="col-90">
                <div class="icon-text-container">`;
                if (respuesta.servicio==1) {
                  etiqueta="Servicio";
                }

                if (respuesta.servicio==0) {
                  etiqueta="Producto";
                }

               html+=`
               <span class="material-icons-outlined">inventory_2
                </span> <p style="margin:0;">`+etiqueta+`: <span class="texto">`+respuesta.concepto+`</span>
                </p>

                </div>
                <div class="icon-text-container" style="margin-top: 10px;">
                <span class="material-icons-outlined">local_atm</span>
                  <p style="margin:0;">Costo: <span class="texto">$`+respuesta.costo+`</span>
                  </p>
                </div>
                <div class="icon-text-container" style="margin-top: 10px;">
                 <span class="material-icons-outlined">
                    add_business
                    </span>
                    <p style="margin:0;">
                   
                    Negocio: <span class="texto">`+respuesta.titulo+`</span></p>
                     </div>
                    `;

                       if (respuesta.servicio==0) {
                      html+=`<p style="margin:0;">Cantidad: `+respuesta.cantidad+`</p>`;
                 
                  }else{


                    html+=` 
                        <div class="icon-text-container" style="margin-top: 10px;">
                        <span class="material-icons-outlined">supervised_user_circle</span>
                    <p style="margin:0;">Barbero: <span class="texto">`+respuesta.nombre+` `+respuesta.paterno+`</span></p>
                    </div>
                    `;
                    html+=`
                   <div class="icon-text-container" style="margin-top:10px;">
                     <span class="material-icons-outlined">calendar_month</span>

                     <p style="margin:0;">Fecha/Hora: <span class="texto">`+respuesta.fechaformato+` `+respuesta.horainicial+'-'+respuesta.horafinal+`</span></p>

                     </div>
                     `;

                        if (respuesta.concortesia==1  ) {


                          if (respuesta.idcortesia>0 ) {

                          html+=`


                         <div class="icon-text-container" style="margin-top: 10px;">
                           <span class="material-icons-outlined">card_giftcard</span>

                           <p style="margin:0;">Cortesía: <span class="texto">`+respuesta.nombrepaquetecortesia+`</span></p>

                           </div>`;

                      }


                      if (respuesta.idcortesia==0 && respuesta.colococortesia==1) {

                          html+=`


                         <div class="icon-text-container" style="margin-top: 10px;">
                           <span class="material-icons-outlined">card_giftcard</span>

                           <p style="margin:0;">Cortesía: <span class="texto">Ninguna</span></p>

                           </div>`;
                      }

                       /* html+=`
                        <div class="col-100" style="padding-bottom: 1em;
    padding-top: 1em;">
                      <button class="button  color-theme  " style="background:#C7AA6A;padding:10px 20px;" onclick="ObtenerCortesia(`+respuesta[i].idcarrito+`,`+respuesta[i].idpaquete+`)">
                        Cortesia
                       </button>
                     
                     </div>
                      `;*/

                    }else{

                 
          

                    }
                  }

                  

              html+=` </div>
                <div class="col-10">`;

                  if (respuesta.precioante!=0) {
                     html+=`
                     <div class="col-100">
                     <p style="margin:0;text-decoration:line-through;font-size: 12px;text-align: right;">$`+respuesta.precioante+`</p>
                     </div>
                     `;

                  }


                   html+=`
                   <div class="col-100">
                   
                     </div>
                     `;

                 



             html+=` </div>

              </div>
          </li>

        </div>
           <div class="icon-text-container" style="margin-top: 10px; margin-left: 30px;">

                            	
                            	`;
                            	//aqui
                            if(respuesta.checkin==1) {
                            	
                            	html+=`
 								<p class="" style="display: flex;">
                            	 <span>check-in:</span> <span class="material-icons-outlined" 
                            	style=" width: 30px;justify-content: center;font-size: 20px;color:#5ac35b;margin-left: 5px;">
								check_circle_outline
								</span>
								</p>
								`;	
                            
                            }

                            	if (respuesta.checkout==1) {

								html+=`
								<p class="" style="display: flex;">
										<span>check-out:</span> <span class="material-icons-outlined" style=" width: 30px;justify-content: center;font-size: 20px;color:#5ac35b;margin-left: 5px;">
										check_circle_outline
										</span>
								</p>
										`;
									}
								html+=`
							
							</div>
							
								`;

                            		if(respuesta.cancelacion==0 && respuesta.checkin==0 && respuesta.checkout==0 && respuesta.sepuedecancelar==1) {

	                            	html+=`
	                            		<div class="col-100">
	                            			<button style="background: rgb(199, 170, 106); display: block;" type="button" class="button button-fill color-theme button-large button-raised btncontinuarcita cambiarfuente faustina" 
	                            			onclick="AbrirModalCancelacion(`+respuesta.idcita+`)">Cancelar</button>

	                            		</div>

	                            	`;

                            	}


                            	 if (respuesta.cancelacion==1) {
                                  html+=`
                                    <div class="col-100">
                                      <p class="" style="display: flex;margin-left: 20px;"><span>cancelado:</span> <span class="material-icons-outlined" 
                                      style=" width: 30px;justify-content: center;font-size: 20px;color:red;">
                                      block
                                      </span>
                                    </p>
                                </div>

                                  `;

                                }
                            
                            html+=`

                            </div>


                             <div class="col-100">
                                <div class="avatar">
                                    <img src="`+imagen+`" alt="" style="
																																			margin-top: 1.4em;    width: 100%;
																																			    border-radius: 10px;
																																			">
                                </div>
                            </div>

                           
                            </div>

                            
                        </div>

                        	<div class="" style="">
                        		<div class="row ">
                        			<div class="calificacion"></div>
                        		 </div>
                        	</div>
                       
                    </div>
                    
                </div>
            </div>
			</div>
		   							 	 
		   	</div>

		   	<div class="opcionescita">						 			
		   	<div class="row" style="margin-right: 2em; margin-left: 2em;    margin-top: 1em;">
				<div class="col" onclick="`+llamada+`">
					<span style="justify-content: center;
    display: flex;" class="material-icons-outlined">call</span>
					<p class=" mt-5 mb-0 telefono cambiarfuente" style="color:white;font-size: 14px;text-align: center;">¿Necesitas un cambio?</p>
				</div>
				<div class="col" onclick="abrirGoogleMaps('`+lat+`','`+long+`')">
					<span style="justify-content: center;
    display: flex;" class="material-icons-outlined">location_on</span>
					<p class=" mt-5 mb-0 cambiarfuente" style="color:white;font-size: 14px;text-align: center;">Encuentra la sucursal</p>
				</div>`;
					var funcioncalifica="CalificarCita("+respuesta.idcita+")";
					
				if (respuesta.checkout==1) { 
					califica=`<span style="justify-content: center;display: flex;" class="material-icons-outlined"> grade </span>`;

					if (respuesta.llevacalificacion>0) {
					califica=`
						<i class=" iconosestrella" >
	                     	 <span class="material-icons-outlined " style="color: #C7AA6A!important;justify-content: center;display: flex;">
						star
						</span>
	                  </i>
					`;
						funcioncalifica="VerCalificacion("+respuesta.idcita+")";
					}
				html+=`<div class="col" id="btncalifica_`+respuesta.idcita+`" onclick="`+funcioncalifica+`">
					`+califica+`
					<p class=" cambiarfuente mt-5 mb-0" style="color:white;font-size: 14px;text-align: center;">Califica</p>
				</div>`;

				}

				if (respuesta.checkin==0) {
			/*	html+=`<div class="col" onclick="GenerarQrCita(`+respuesta.idcita+`)">
					<span style="justify-content: center;
    display: flex;" class="material-icons-outlined">qr_code</span>

					<h5 class="mt-5 mb-0" style="font-size: 12px;text-align: center;">Mostrar Qr</h5>
				</div>`;*/

			}

			html+=`
			</div>
			
					<div class="row cambiarfuente" style=" margin-right: 2em; margin-left: 2em;">
						<div class="col-100">
							<p style="font-size: 16px;font-weight: bold;margin-left: 1em;text-align:center;" id="titulogaleria">Galeria de imágenes</p>
						</div>
						
					</div>
		

					<div class="" style="margin-right: 2em;margin-left: 2em;margin-bottom: 100px;">
						<div class="">
								<div class="listadoimagenescita cambiarfuente" style="width:100%;">
								</div>
						</div>
					</div>
		
				<div class="row" style="height:200px;">
                         
                       	 </div>
					
						</div>		   							  	
           			 </div>
				</div>
		   							 	 
		   							 			`;

		   							
		   							 	html+=`</div>
	  	
		   							 		<div class="row">`;

		   							 	


		   							  		html+=`</div>

		   							  		<div class="row margin-bottom " style="padding-top: 1em;">
		   							  		<div class="col-100">`;
		   							  		


		   							  		html+=`</div>
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
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {

          	if (respuesta.estatus==0 && respuesta.checkin==0 && respuesta.cancelacion==0) {
          		$(".divimgqr").css('display','');
          		GenerarQrCita(respuesta.idcita);
          	}
           	ObtenerImagenescitaCliente();

			 $(".cambiarfuente2").css('display','none');
            if (tipoletra!='') {
              $(".cambiarfuente").addClass(tipoletra);
           
            }
          $(".cambiarfuente2").css('display','block');
 

          },
          opened: function (sheet) {
            console.log('Sheet opened');
          },
          close:function (sheet) {
          	// BorrarIntervalo();
          	 clearInterval(intervalove);

									localStorage.setItem('idqrgenerado','');
             ObtenerTableroCitas(1);
          },
        }
      });

       dynamicSheet1.open();
}

function RegresarLanding() {
	GoToPage('welcome');
}

function GenerarQrCita(idcita) {
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user+"&idcita="+idcita;
	var pagina = "generarqr.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		success: function(datos){	
			var respuesta=datos;
			var ruta=urlphp+'/upload/qrgenerado/'+datos.imgqr;
			localStorage.setItem('idqrgenerado',datos.idqrgenerado);
		

			//$(".datoscita").css('display','none');
			$(".imagenqr").html('<img src="" id="colocarqr" class="colocarqr" alt="" style="width:100%"/>');

			$(".colocarqr").attr('src',ruta.trim());

				//countdown(agregaMinutos(new Date(), .50).toString(), 'clock', '');
		 intervalove=setInterval('VerificarSihasidoleido()',1000);

			
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function VerificarSihasidoleido() {
		var id_user=localStorage.getItem('id_user');
		var idcita=localStorage.getItem('idcita');
		var idqrgenerado=localStorage.getItem('idqrgenerado');
		var datos="id_user="+id_user+"&idcita="+idcita+"&idqrgenerado="+idqrgenerado;
		var pagina = "VerificarSihasidoleido.php";
		$.ajax({ 
			type: 'POST',
			dataType: 'json',
			url: urlphp+pagina,
			data:datos,
			success: function(resultado){	
				var respuesta=resultado.respuesta;

				if (respuesta==1) {
					
					 clearInterval(intervalove);
					 dynamicSheet1.close();
					 dynamicSheet1.destroy();
					 var datosqr=resultado.datosqr[0];
					 var detallecita=resultado.detallecita[0];
					 AbrirValidacionQr(detallecita);
					 ObtenerCitasProgramadas();

					 intervalovefinal=setInterval('VerificarSihaSidoFinalizada()',1000);

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


function AbrirValidacionQr(respuesta) {
			
var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 70%;background: black;">
            
            <div class="sheet-modal-inner" style="background: black;">
               <div class="iconocerrar link sheet-close" style="z-index:10;">
               <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5188 4.48126C23.4385 2.4011 20.788 0.984547 17.9026 0.410715C15.0171 -0.163118 12.0264 0.131546 9.30839 1.25744C6.59043 2.38334 4.26736 4.28991 2.63294 6.73606C0.998525 9.18221 0.12616 12.0581 0.12616 15C0.12616 17.9419 0.998525 20.8178 2.63294 23.264C4.26736 25.7101 6.59043 27.6167 9.30839 28.7426C12.0264 29.8685 15.0171 30.1631 17.9026 29.5893C20.788 29.0155 23.4385 27.5989 25.5188 25.5188C26.9003 24.1375 27.9961 22.4976 28.7437 20.6928C29.4914 18.888 29.8762 16.9535 29.8762 15C29.8762 13.0465 29.4914 11.1121 28.7437 9.30724C27.9961 7.50242 26.9003 5.86255 25.5188 4.48126ZM20.3126 18.7613C20.4187 18.8606 20.5034 18.9808 20.5612 19.1142C20.6191 19.2476 20.6489 19.3915 20.6489 19.5369C20.6489 19.6823 20.6191 19.8262 20.5612 19.9596C20.5034 20.093 20.4187 20.2131 20.3126 20.3125C20.2133 20.411 20.0956 20.4889 19.9661 20.5418C19.8367 20.5946 19.698 20.6214 19.5582 20.6206C19.2795 20.6195 19.0124 20.5088 18.8145 20.3125L15.0001 16.4981L11.2388 20.3125C11.0409 20.5088 10.7738 20.6195 10.4951 20.6206C10.3553 20.6214 10.2166 20.5946 10.0872 20.5418C9.95773 20.4889 9.83999 20.411 9.74071 20.3125C9.54282 20.1134 9.43174 19.8441 9.43174 19.5634C9.43174 19.2827 9.54282 19.0135 9.74071 18.8144L13.502 15L9.74071 11.2388C9.56665 11.0355 9.47569 10.774 9.48602 10.5066C9.49635 10.2392 9.6072 9.98557 9.79642 9.79635C9.98565 9.60712 10.2393 9.49627 10.5067 9.48594C10.7741 9.47561 11.0356 9.56657 11.2388 9.74063L15.0001 13.5019L18.7613 9.74063C18.8597 9.63878 18.9772 9.55729 19.107 9.50083C19.2369 9.44437 19.3766 9.41404 19.5182 9.41158C19.6598 9.40911 19.8004 9.43456 19.9322 9.48646C20.0639 9.53836 20.1842 9.6157 20.286 9.71407C20.3879 9.81244 20.4694 9.9299 20.5258 10.0598C20.5823 10.1896 20.6126 10.3293 20.6151 10.4709C20.6175 10.6125 20.5921 10.7532 20.5402 10.8849C20.4883 11.0167 20.411 11.1369 20.3126 11.2388L16.4982 15L20.3126 18.7613Z" fill="#AAAAAA"></path>
            </svg>
                       </div>
              <div class="page-content" style="height: 100%;">
                <div style="background: black; height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <span class="titulomodal cambiarfuente" style="font-size: 20px;
    text-align: center;
    font-weight: 600;
    color: #c7aa6a;"></span>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:1em;width: 100%;">
                
	   							  <div class="">
		   							  <div class="block" style="margin-right:1em;margin-left:1em;">
		   									

		   							  		<div class="card-content" style="margin-top:2em;">
		   										<div class="row">
			   										<div class="col-100">
			   											<h3 style="margin-left: 1em;
    														margin-right: 1em;
    														text-align: center;line-height:1;
    									">Check-in realizado exitosamente</h3>
			   										</div>
		   										</div>
		   									</div>
		   				
		   							 		<div class="card-content ">
		   							 		<div class="row">
		   							 		<div class="col-100">
			   							 		<div class="" style="margin-top:1em;">
			   							 		

																<span class="material-icons-outlined" style=" width: 30px;
																    justify-content: center;
																    font-size: 100px;
																    display: flex;
																    margin: auto;color:#5ac35b;">
																			check_circle_outline
																			</span>
			   							 		</div>
		   							 		</div>
		   		
			   							 		<div class="col-100">
			   							 		</div>
		   							 		</div>
		   							 				<div class="row">
		   							 					<div class="col">`;

		   						 html+=`
                 <div class=" cambiarfuente " style="list-style: none;background: black;">
          							<li class="item-content cambiarfuente" style="    margin-top: 1em;
    								margin-right: 1em;
    								margin-left: 1em;
    								border-bottom: 1px solid;
    								margin-bottom: 1em;">
          					  <div class="row" style="margin-bottom: 10px;">
             					 <div class="col-90">
				                <div class="icon-text-container">`;
				                if (respuesta.servicio==1) {
				                  etiqueta="Servicio";
				                }

				                if (respuesta.servicio==0) {
				                  etiqueta="Producto";
				                }

               html+=`
               <span class="material-icons-outlined">inventory_2
                </span> <p style="margin:0;">`+etiqueta+`: <span class="texto">`+respuesta.concepto+`</span>
                </p>

                </div>
                <div class="icon-text-container" style="margin-top: 10px;">
                <span class="material-icons-outlined">local_atm</span>
                  <p style="margin:0;">Costo: <span class="texto">$`+respuesta.costo+`</span>
                  </p>
                </div>
                <div class="icon-text-container" style="margin-top: 10px;">
                 <span class="material-icons-outlined">
                    add_business
                    </span>
                    <p style="margin:0;">
                   
                    Negocio: <span class="texto">`+respuesta.titulo+`</span></p>
                     </div>
                    `;

                       if (respuesta.servicio==0) {
                      html+=`<p style="margin:0;">Cantidad: `+respuesta.cantidad+`</p>`;
                 
                  }else{


                    html+=` 
                        <div class="icon-text-container" style="margin-top: 10px;">
                        <span class="material-icons-outlined">supervised_user_circle</span>
                    <p style="margin:0;">Barbero: <span class="texto">`+respuesta.nombre+` `+respuesta.paterno+`</span></p>
                    </div>
                    `;
                    html+=`
                   <div class="icon-text-container" style="margin-top:10px;">
                     <span class="material-icons-outlined">calendar_month</span>

                     <p style="margin:0;">Fecha/Hora: <span class="texto">`+respuesta.fechaformato+` `+respuesta.horainicial+'-'+respuesta.horafinal+`</span></p>

                     </div>
                     `;

                        if (respuesta.concortesia==1  ) {


                          if (respuesta.idcortesia>0 ) {

                          html+=`


                         <div class="icon-text-container" style="margin-top: 10px;">
                           <span class="material-icons-outlined">card_giftcard</span>

                           <p style="margin:0;">Cortesía: <span class="texto">`+respuesta.nombrepaquetecortesia+`</span></p>

                           </div>`;

                      }


                      if (respuesta.idcortesia==0 && respuesta.colococortesia==1) {

                          html+=`


                         <div class="icon-text-container" style="margin-top: 10px;">
                           <span class="material-icons-outlined">card_giftcard</span>

                           <p style="margin:0;">Cortesía: <span class="texto">Ninguna</span></p>

                           </div>`;
                      }

                       /* html+=`
                        <div class="col-100" style="padding-bottom: 1em;
    padding-top: 1em;">
                      <button class="button  color-theme  " style="background:#C7AA6A;padding:10px 20px;" onclick="ObtenerCortesia(`+respuesta[i].idcarrito+`,`+respuesta[i].idpaquete+`)">
                        Cortesia
                       </button>
                     
                     </div>
                      `;*/

                    }else{

                 
          

                    }
                  }

                  

              html+=` </div>
                <div class="col-10">`;

                  if (respuesta.precioante!=0) {
                     html+=`
                     <div class="col-100">
                     <p style="margin:0;text-decoration:line-through;font-size: 12px;text-align: right;">$`+respuesta.precioante+`</p>
                     </div>
                     `;

                  }


				                   html+=`
				                   <div class="col-100">
				                   
				                     </div>
				                     `;

                 



									             html+=` </div>

									              </div>
									          </li>

									        </div>`;
									html+=`

		   							 					</div>
		   							 				</div>
		   							 			</div>
		   							 		</div>

		   							 		</div>
		   							 		<div class="row">
		   							 			<div class="col">
		   							 			<h4 style="
												    text-align: center;
												    font-size: 28px;
												    color: red;
												    padding-top: 1em;
												"></h4>
		   							 			</div>
		   							 		</div>
		   							 		<div class="row" style="margin-top:6em;">
		   									
											 
											</div>
										</div>
		   				

										</div>

	   							 	</div>

   							 </div>

   				</div>
                
              </div>
            </div>
          </div>`;
          
	  dynamicSheet4 = app.sheet.create({

        content: html,

    	swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
		
					
          },
          opened: function (sheet) {
          
          },

          close:function () {
          	 AbrirModalCita(respuesta.idcita);
          }
        }
      });

       dynamicSheet4.open();
	}

	function CerrarModal() {

		dynamicSheet4.close();
	}

	
function ObtenerPolitica() {
	var pagina = "ObtenerConfiguracion.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		async:false,
		success: function(datos){

			
			var cadena =datos.respuesta.politicaprivacidad;

			$(".textopoliticas").html('<p style="text-align:justify;">'+cadena+'</p>');

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}


function entrarinvitado() {
	  return new Promise((resolve, reject) => {

	
	resolve(CrearUsuarioInvitado());

	});
	

}

function CrearUsuarioInvitado() {

	if (localStorage.getItem("idusuarioinvitado")!=undefined && localStorage.getItem("idusuarioinvitado")!=null && localStorage.getItem("idusuarioinvitado")!=0) {
				var idusuario=localStorage.getItem("idusuarioinvitado");
				localStorage.setItem("id_user",idusuario);
				localStorage.setItem("idusuarioinvitado",idusuario);
				localStorage.setItem('pregunta',1);
    			localStorage.setItem('session',1);
				localStorage.setItem("nombre","Invitado");
				localStorage.removeItem('carrito');
				localStorage.setItem('invitado',1);
				localStorage.setItem('idtipousuario',6);
				//GoToPage("home");
	}else if(localStorage.getItem("id_user")!=undefined && localStorage.getItem("id_user")!=null && localStorage.getItem("id_user")!=0){

				localStorage.setItem('invitado',0);

				
	}


	else{

		var pagina = "CrearUsuarioInvitado.php";
		$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		async:false,
		success: function(resp){
				var idusuario=resp.id_user;
				localStorage.setItem("id_user",idusuario);
				localStorage.setItem("idusuarioinvitado",idusuario);
				localStorage.setItem('pregunta',1);
    			localStorage.setItem('session',1);
				localStorage.setItem("nombre","Invitado");
				localStorage.removeItem('carrito');
				localStorage.setItem('invitado',1);
				localStorage.setItem('idtipousuario',6);
				//GoToPage("home");
			
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});

	}

	
}

function CerrarCalificacion() {
			$(".opcionescita").css('display','block');
			$(".datoscita").css('display','block');
			$(".calificacion").css('display','none');
}
function CalificarCita(idcita){


  var parrafo="<p class='cambiarfuente "+estiloparrafo+"' style=''>Califica tu cita</p>";
     var parrafo2="<p class='cambiarfuente "+estiloparrafo+"' style=''>Ingresa tu comentario</p>";


  var html2="";

var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height:70%;background: black;">
            
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px; ">
               <div class="iconocerrar link sheet-close" style="z-index:10;">
               <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5188 4.48126C23.4385 2.4011 20.788 0.984547 17.9026 0.410715C15.0171 -0.163118 12.0264 0.131546 9.30839 1.25744C6.59043 2.38334 4.26736 4.28991 2.63294 6.73606C0.998525 9.18221 0.12616 12.0581 0.12616 15C0.12616 17.9419 0.998525 20.8178 2.63294 23.264C4.26736 25.7101 6.59043 27.6167 9.30839 28.7426C12.0264 29.8685 15.0171 30.1631 17.9026 29.5893C20.788 29.0155 23.4385 27.5989 25.5188 25.5188C26.9003 24.1375 27.9961 22.4976 28.7437 20.6928C29.4914 18.888 29.8762 16.9535 29.8762 15C29.8762 13.0465 29.4914 11.1121 28.7437 9.30724C27.9961 7.50242 26.9003 5.86255 25.5188 4.48126ZM20.3126 18.7613C20.4187 18.8606 20.5034 18.9808 20.5612 19.1142C20.6191 19.2476 20.6489 19.3915 20.6489 19.5369C20.6489 19.6823 20.6191 19.8262 20.5612 19.9596C20.5034 20.093 20.4187 20.2131 20.3126 20.3125C20.2133 20.411 20.0956 20.4889 19.9661 20.5418C19.8367 20.5946 19.698 20.6214 19.5582 20.6206C19.2795 20.6195 19.0124 20.5088 18.8145 20.3125L15.0001 16.4981L11.2388 20.3125C11.0409 20.5088 10.7738 20.6195 10.4951 20.6206C10.3553 20.6214 10.2166 20.5946 10.0872 20.5418C9.95773 20.4889 9.83999 20.411 9.74071 20.3125C9.54282 20.1134 9.43174 19.8441 9.43174 19.5634C9.43174 19.2827 9.54282 19.0135 9.74071 18.8144L13.502 15L9.74071 11.2388C9.56665 11.0355 9.47569 10.774 9.48602 10.5066C9.49635 10.2392 9.6072 9.98557 9.79642 9.79635C9.98565 9.60712 10.2393 9.49627 10.5067 9.48594C10.7741 9.47561 11.0356 9.56657 11.2388 9.74063L15.0001 13.5019L18.7613 9.74063C18.8597 9.63878 18.9772 9.55729 19.107 9.50083C19.2369 9.44437 19.3766 9.41404 19.5182 9.41158C19.6598 9.40911 19.8004 9.43456 19.9322 9.48646C20.0639 9.53836 20.1842 9.6157 20.286 9.71407C20.3879 9.81244 20.4694 9.9299 20.5258 10.0598C20.5823 10.1896 20.6126 10.3293 20.6151 10.4709C20.6175 10.6125 20.5921 10.7532 20.5402 10.8849C20.4883 11.0167 20.411 11.1369 20.3126 11.2388L16.4982 15L20.3126 18.7613Z" fill="#AAAAAA"></path>
            </svg>
                       </div>
              <div class="page-content" style="height: 100%;">
                <div style="background: black; height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <span class="titulomodal cambiarfuente" style="font-size: 20px;
    text-align: center;
    font-weight: 600;
    color: #c7aa6a;"></span>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:1em;width: 100%;">
                
                       
                        `;
                      

                          html+=`
                          <div class="row" style="margin-left: 3em; margin-right: 3em;margin-top: 20px;">
                          <div class="col-100">
                          <div style="color: #c7aa6a;text-align: center;" class="cambiarfuente">
                            `+parrafo+`

                            </div>
                          </div>

                          </div>`;

                          html+=`
                          	 <div class="row" style=" margin-left: 3em; margin-right: 3em;">
                  
                <div class="col" >
                	<div class="alineacionestrella">
                	 <i class=" iconosestrella " id="estre_1"  onclick="Cambio(1)">
                	 	<span class="material-icons-outlined">
						star
						</span>
                	   </i>
	                	 <div class="oculto">
	                	 <input type="checkbox"  id="che_1" >
	                	</div>
                	</div>
               
               </div>
                 <div class="col"  >
                 	<div class="alineacionestrella">
	                  <i class="bi bi-star iconosestrella " id="estre_2" onclick="Cambio(2)">
	                  <span class="material-icons-outlined">
						star
						</span>
	                  </i>
	               		<input type="checkbox" class="oculto" id="che_2"  >
               		</div>
                </div>
                <div class="col" >
	                  <div class="alineacionestrella" >
		                   <i class="bi bi-star iconosestrella " id="estre_3" onclick="Cambio(3)" >
		                   <span class="material-icons-outlined">
						star
						</span>
		                   </i>
		                	<input type="checkbox" class="oculto" id="che_3"  >
	                  </div>
                 </div>
                   <div class="col" >
                   <div class="alineacionestrella" >
                   	    <i class="bi bi-star iconosestrella " id="estre_4" onclick="Cambio(4)">
                   	    <span class="material-icons-outlined">
						star
						</span>
                   	    </i>
                 		<input type="checkbox" class="oculto" id="che_4" >
                 	</div>
                  </div>
                    <div class="col" >   
	                    <div class="alineacionestrella" >              
	                     	 <i class="bi bi-star iconosestrella " id="estre_5" onclick="Cambio(5)" >
	                     	 <span class="material-icons-outlined">
						star
						</span>
	                     	 </i>
	                 		 <input type="checkbox" class="oculto" id="che_5"  >
	                   	</div>
                    </div>
               

                </div>

                <div class="row" style="    margin-left: 3em; margin-right: 3em;margin-top:1em;">
                                <div style="color: #c7aa6a;text-align: center;width: 100%;" class="cambiarfuente">
 								`+parrafo2+`</div>
                          <div class="col-100">
                              <form>
                            <div class="list" style="margin:0;">
                              <ul class="row">

                                <li class="item-content col-100 item-input item-input-with-value">

                                  <div class="item-inner">
                                    <div class="item-input-wrap">
                                      <textarea placeholder="" id="txtcomentario" class="form-control"></textarea>
                                    </div>
                                  </div>
                                </li>

                                </ul>
                                </div>


                                </form>

                           <div id="txtadvertencia" style="color:red;"></div>

                          </div>

                          </div>

               

                          `;

                          html+=`


                            <div class="row margin-bottom " style="padding-top: 1em;margin-left: 3em;margin-right:3em;margin-top:20px;display:flex;justify-content:center;">
                            <div class="col-100">
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="GuardarCalificacion(`+idcita+`);">Guardar</button>
                            </div>

                          </div>
                          `;

                      
                         html+=` </div>

                         


                      </div>

                  </div>

                </div>
                
              </div>
            </div>
          </div>`;
         
    dynamicSheet1 = app.sheet.create({
        content: html,

      swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {

             if (tipoletra!='') {
              $(".cambiarfuente").addClass(tipoletra);
            }

          },
          opened: function (sheet) {
            console.log('Sheet opened');

           
          },
        }
      });


       dynamicSheet1.open();

}
function CalificarCita2(idcita) {
		$(".datoscita").css('display','none');
		$(".opcionescita").css('display','none');

	var html="";
		html+=`
			<div class="row" style="margin-top: 2em;">
                  
                <div class="col-20" >
                	<div>
                	 <span  id="estre_1"  onclick="Cambio(1)" style="font-size:20px;"><span class="material-icons-outlined">
						star
						</span>
						</span>
	                	 <div class="oculto">
	  
	                	 <input type="checkbox"  id="che_1" >
	                	</div>
                	</div>
               
               </div>
                 <div class="col-20"  >
                 	<div >
                	 <span  id="estre_2"  onclick="Cambio(2)" style="font-size:20px;">
<span class="material-icons-outlined">
star
</span>
                	 </span>
	               		<input type="checkbox" class="oculto" id="che_2"  >
               		</div>
                </div>
                <div class="col-20" >
	                  <div  >
                	 <span  id="estre_3"  onclick="Cambio(3)" style="font-size:20px;">
						<span class="material-icons-outlined">
						star
						</span>
                	 </span>
		                	<input type="checkbox" class="oculto" id="che_3"  >
	                  </div>
                 </div>
                   <div class="col-20" >
                   <div  >
                	 <span  id="estre_4"  onclick="Cambio(4)" style="font-size:20px;">
                	 <span class="material-icons-outlined">
					star
					</span>
                	 </span>
                 		<input type="checkbox" class="oculto" id="che_4" >
                 	</div>
                  </div>
                    <div class="col-20" >   
	                    <div  >              
                	 <span  id="estre_5"  onclick="Cambio(5)" style="font-size:20px;">
<span class="material-icons-outlined">
star
</span>
                	 </span>
	                 		 <input type="checkbox" class="oculto" id="che_5"  >
	                   	</div>
                    </div>

                    </div>
                    <div class="row" style="padding-top:1em;">
                    <div class="col-20" >   
	                    <div  >              
                	 <span  id="estre_6"  onclick="Cambio(6)" style="font-size:20px;">
<span class="material-icons-outlined">
star
</span>
                	 </span>
	                 		 <input type="checkbox" class="oculto" id="che_6"  >
	                   	</div>
                    </div>

                    <div class="col-20" >   
	                    <div  >              
                	 <span  id="estre_7"  onclick="Cambio(7)" style="font-size:20px;">
<span class="material-icons-outlined">
star
</span>
                	 </span>
	                 		 <input type="checkbox" class="oculto" id="che_7"  >
	                   	</div>
                    </div>
               	

               		<div class="col-20" >   
	                    <div  >              
                	 <span  id="estre_8"  onclick="Cambio(8)" style="font-size:20px;">
<span class="material-icons-outlined">
star
</span>
                	 </span>
	                 		 <input type="checkbox" class="oculto" id="che_8"  >
	                   	</div>
                    </div>

                    <div class="col-20" >   
	                    <div  >              
                	 <span  id="estre_9"  onclick="Cambio(9)" style="font-size:20px;">
<span class="material-icons-outlined">
star
</span>
                	 </span>
	                 		 <input type="checkbox" class="oculto" id="che_9"  >
	                   	</div>
                    </div>

                    <div class="col-20" >   
	                    <div  >              
                	 <span  id="estre_10"  onclick="Cambio(10)" style="font-size:20px;">
					<span class="material-icons-outlined">
					star
					</span>
                	 </span>
	                 		 <input type="checkbox" class="oculto" id="che_10"  >
	                   	</div>
                    </div>

                </div>


                <div class="row" style="padding-top:1em;">
                	<label style="font-size:16px;padding:1px;">Comentarios:</label>
                	<textarea name="" id="txtcomentario" cols="30" rows="3" style="color:black;"></textarea>
                </div>
              </div>

              <div class="row">
   <div class="col">
    
     <a id="btneliminarcuenta" class="button button-fill button-large button-raised margin-bottom color-theme" style="margin: 1em;" onclick="GuardarCalificacion(`+idcita+`)">
               Guardar calificacion
         </a>


          <a id="btneliminar" class="button button-fill button-large button-raised margin-bottom " style="margin: 1em;" onclick="CerrarCalificacion()">
              Cerrar
         </a>
   </div>
  </div>

		`;
		$(".calificacion").html(html);
	$(".calificacion").css('display','block');

}


function Cambio(valor) {

	  select = $('#che_'+valor);
	  select.on('change', SeleccionarEstrella(valor));
	  select.trigger('change');
}


function SeleccionarEstrella(cantidad) {
	var colocar=0;

	$(".iconosestrella span" ).each(function( index ) {
		  $(this).removeClass('colorestrella');


	});

	if ($("#che_"+cantidad).is(':checked')) {

		
		colocar=0;

	}else{
		
		colocar=1;
		$("#estre_"+cantidad).removeClass('colorestrella')
		$("#che_"+cantidad).attr('checked',false);
	}

	/*if (colocar==1) {
		$("#estre_"+cantidad).removeClass('bi-star');
		$("#estre_"+cantidad).addClass('bi-star-fill');*/
		

		if (cantidad>=1) {
			for (var i = 1; i <=cantidad; i++) {
			

				$("#estre_"+i+" span").addClass('colorestrella');

				$("#che_"+i).attr('checked',true);
			}
		}

		/*
		
	}else{
			
			for (var i = 1; i <= 10; i++) {
				
				$("#estre_"+i+" span").removeClass('colorestrella');
				$("#che_"+i).attr('checked',false);
			}

			if (cantidad>=1) {
			for (var i = 1; i <=cantidad; i++) {
				
				$("#estre_"+i+" span").addClass('colorestrella');


				$("#che_"+i).attr('checked',true);

			}
		}
	
	}*/
	

}

function GuardarCalificacion(idcita) {
	var idusuario=localStorage.getItem('id_user');
	var cantidad=$(".colorestrella").length;
	var comentario=$("#txtcomentario").val();
	
	// app.dialog.confirm('','¿Seguro de guardar la calificación?', function () {
 	const myPromise = new Promise((resolve, reject) => {
     dynamicSheet1.close();

     CrearModalEspera5(() => {
	

	var datos="idcita="+idcita+"&idusuario="+idusuario+"&cantidad="+cantidad+"&comentario="+comentario;
	var pagina = "GuardarCalificacionCita.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resp){
			dynamicSheet2.close();

			var aviso="Calificación guardada exitosamente";
			AbrirModalAviso(aviso);
				$("#txtcomentario").val('');
			ObtenerCitaCalificacion(idcita);
			
				//$(".calificacion").css('display','none');
				//CerrarModal2();
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});

	});
});
}

function ObtenerCitaCalificacion(idcita) {
	var iduser=localStorage.getItem('id_user');
	var datos="idcita="+idcita+"&iduser="+iduser;

	var califica=`<i class=" iconosestrella" >
	                     	 <span class="material-icons-outlined " style="color: #C7AA6A!important;justify-content: center;display: flex;">
						star
						</span>
	                  </i>
					<p class=" cambiarfuente mt-5 mb-0" style="color:white;font-size: 14px;text-align: center;">Califica</p>

	                  `;

	$("#btncalifica_"+idcita).html(califica);
	$("#btncalifica_"+idcita).attr('onclick','VerCalificacion('+idcita+')');	/*var pagina = "ObtenerDetalleCita.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		success: function(datos){

			var respuesta=datos.respuesta;
				
				localStorage.setItem('idcita',idcita);
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});*/
}

function VerCalificacion(idcita) {
	var idusuario=localStorage.getItem('id_user');
	var datos="idcita="+idcita+"&idusuario="+idusuario;
	var pagina = "ObtenerCalificacion.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resp){
			AbrirModalCalificacionCita(resp);
				
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function AbrirModalCalificacionCita(resp) {
	var calificacion=resp.calificacion[0];
	var idcita=calificacion.idcita;
	var numero=calificacion.calificacion;
	var comentario=calificacion.comentario;
	
	var parrafo="<p class='cambiarfuente "+estiloparrafo+"' style=''>Calificación</p>";
	var parrafo2="<p class='cambiarfuente "+estiloparrafo+"' style=''>Comentario</p>";
	var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height:70%;background: black;">
            
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px; ">
               <div class="iconocerrar link sheet-close" style="z-index:10;">
               <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5188 4.48126C23.4385 2.4011 20.788 0.984547 17.9026 0.410715C15.0171 -0.163118 12.0264 0.131546 9.30839 1.25744C6.59043 2.38334 4.26736 4.28991 2.63294 6.73606C0.998525 9.18221 0.12616 12.0581 0.12616 15C0.12616 17.9419 0.998525 20.8178 2.63294 23.264C4.26736 25.7101 6.59043 27.6167 9.30839 28.7426C12.0264 29.8685 15.0171 30.1631 17.9026 29.5893C20.788 29.0155 23.4385 27.5989 25.5188 25.5188C26.9003 24.1375 27.9961 22.4976 28.7437 20.6928C29.4914 18.888 29.8762 16.9535 29.8762 15C29.8762 13.0465 29.4914 11.1121 28.7437 9.30724C27.9961 7.50242 26.9003 5.86255 25.5188 4.48126ZM20.3126 18.7613C20.4187 18.8606 20.5034 18.9808 20.5612 19.1142C20.6191 19.2476 20.6489 19.3915 20.6489 19.5369C20.6489 19.6823 20.6191 19.8262 20.5612 19.9596C20.5034 20.093 20.4187 20.2131 20.3126 20.3125C20.2133 20.411 20.0956 20.4889 19.9661 20.5418C19.8367 20.5946 19.698 20.6214 19.5582 20.6206C19.2795 20.6195 19.0124 20.5088 18.8145 20.3125L15.0001 16.4981L11.2388 20.3125C11.0409 20.5088 10.7738 20.6195 10.4951 20.6206C10.3553 20.6214 10.2166 20.5946 10.0872 20.5418C9.95773 20.4889 9.83999 20.411 9.74071 20.3125C9.54282 20.1134 9.43174 19.8441 9.43174 19.5634C9.43174 19.2827 9.54282 19.0135 9.74071 18.8144L13.502 15L9.74071 11.2388C9.56665 11.0355 9.47569 10.774 9.48602 10.5066C9.49635 10.2392 9.6072 9.98557 9.79642 9.79635C9.98565 9.60712 10.2393 9.49627 10.5067 9.48594C10.7741 9.47561 11.0356 9.56657 11.2388 9.74063L15.0001 13.5019L18.7613 9.74063C18.8597 9.63878 18.9772 9.55729 19.107 9.50083C19.2369 9.44437 19.3766 9.41404 19.5182 9.41158C19.6598 9.40911 19.8004 9.43456 19.9322 9.48646C20.0639 9.53836 20.1842 9.6157 20.286 9.71407C20.3879 9.81244 20.4694 9.9299 20.5258 10.0598C20.5823 10.1896 20.6126 10.3293 20.6151 10.4709C20.6175 10.6125 20.5921 10.7532 20.5402 10.8849C20.4883 11.0167 20.411 11.1369 20.3126 11.2388L16.4982 15L20.3126 18.7613Z" fill="#AAAAAA"></path>
            </svg>
                </div>
              <div class="page-content" style="height: 100%;">
                <div style="background: black; height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <span class="titulomodal cambiarfuente" style="font-size: 20px;
    text-align: center;
    font-weight: 600;
    color: #c7aa6a;"></span>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:1em;width: 100%;">
                
                       
                        `;
                      

                          html+=`
                          <div class="row" style="margin-left: 3em; margin-right: 3em;margin-top: 20px;">
                          <div class="col-100">
                          <div style="color: #c7aa6a;text-align: center;" class="cambiarfuente">
                            `+parrafo+`

                            </div>
                          </div>

                          </div>`;

                          html+=`
                          	 <div class="row" style=" margin-left: 3em; margin-right: 3em;">
                  
                <div class="col" >
                	<div class="alineacionestrella">
                	 <i class=" iconosestrella " id="estre_1"  >
                	 	<span class="material-icons-outlined">
						star
						</span>
                	   </i>
	                	 <div class="oculto">
	                	 <input type="checkbox"  id="che_1" >
	                	</div>
                	</div>
               
               </div>
                 <div class="col"  >
                 	<div  class="alineacionestrella">
	                  <i class="bi bi-star iconosestrella " id="estre_2" >
	                  <span class="material-icons-outlined">
						star
						</span>
	                  </i>
	               		<input type="checkbox" class="oculto" id="che_2"  >
               		</div>
                </div>
                <div class="col" >
	                  <div  class="alineacionestrella" >
		                   <i class="bi bi-star iconosestrella " id="estre_3"  >
		                   <span class="material-icons-outlined">
						star
						</span>
		                   </i>
		                	<input type="checkbox" class="oculto" id="che_3"  >
	                  </div>
                 </div>
                   <div class="col" >
                   <div   class="alineacionestrella">
                   	    <i class="bi bi-star iconosestrella " id="estre_4" >
                   	    <span class="material-icons-outlined">
						star
						</span>
                   	    </i>
                 		<input type="checkbox" class="oculto" id="che_4" >
                 	</div>
                  </div>
                    <div class="col" >   
	                    <div   class="alineacionestrella">              
	                     	 <i class="bi bi-star iconosestrella " id="estre_5" >
	                     	 <span class="material-icons-outlined">
						star
						</span>
	                     	 </i>
	                 		 <input type="checkbox" class="oculto" id="che_5"  >
	                   	</div>
                    </div>
               

                </div>

                <div class="row" style="margin-left: 3em; margin-right: 3em;margin-top:1em;">
                                <div style="color: #c7aa6a;text-align: center;width: 100%;" class="cambiarfuente">
 								`+parrafo2+`</div>
                          <div class="col-100">
                             
                          <p class="cambiarfuente `+estiloparrafo+`" style="color:white;text-align:center;">`+comentario+`</p>
		                          


                          </div>

                          </div>

               

                          `;

                          html+=`


                            <div class="row margin-bottom " style="padding-top: 1em;margin-left: 3em;margin-right:3em;margin-top:20px;display:flex;justify-content:center;">
                            <div class="col-100">
	                            </div>

                          </div>
                          `;

                      
                         html+=` </div>

                         


                      </div>

                  </div>

                </div>
                
              </div>
            </div>
          </div>`;
         
    dynamicSheet1 = app.sheet.create({
        content: html,

      swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {

             if (tipoletra!='') {
              $(".cambiarfuente").addClass(tipoletra);
            }

          },
          opened: function (sheet) {
            console.log('Sheet opened');

           Cambio(numero);
          },
        }
      });


       dynamicSheet1.open();
}

function CerrarModal2() {
	app.dialog.close();
}

function AbrirCalendarioUsuario() {
	localStorage.setItem('fechafiltro','');

	  calendarModal = app.calendar.create({
        inputEl: '#demo-calendar-modal',
        openIn: 'customModal',
        header: true,
        footer: true,
        toolbarCloseText:'Cerrar',
        headerPlaceholder:'Seleccionar fecha',
         dateFormat: 'dd/mm/yyyy',
         closeOnSelect:true,
         on:{
         	 calendarChange:function (c) {
          
            var fecha=c.value;
            var convertirfecha=new Date(fecha);
            var mes=(convertirfecha.getMonth() + 1)<10?'0'+(convertirfecha.getMonth() + 1):(convertirfecha.getMonth() + 1);
            var mesdata=convertirfecha.getMonth();
            var dia=convertirfecha.getDate()<10?'0'+convertirfecha.getDate():convertirfecha.getDate();
            var diadata=convertirfecha.getDate();
            fecha1=convertirfecha.getFullYear()+'-'+ mes+'-'+dia;
            localStorage.setItem('fechafiltro',fecha1);
         

          },
         	 close: function (c) {

         	 		if (localStorage.getItem('fechafiltro')!='') {
         	 			myStopFunction(intervalo);
         	 			FiltrarTableroCitasUsuario();
         	 		}
          }
         }
      });

	calendarModal.open();

}

function FiltrarTableroCitasUsuario() {
	var iduser=localStorage.getItem('id_user');
	var fecha=localStorage.getItem('fechafiltro');
	var estatus=1;
	var datos="idusuarios="+iduser+"&fechafiltro="+fecha+"&estatus="+estatus+"&hoy=0";
	var pagina = "ObtenerTableroCitasFiltro.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		success: function(datos){
			myStopFunction(intervalo);
			var respuesta=datos.respuesta;
			var fecha=datos.fechafiltro;
			PintarTableroCitas(respuesta);
			$(".fechaactual").text(fecha);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}


function AbrirModalCancelacion(idcita) {
	 var aviso='El monto será reembolsado a tu monedero';
	 aviso+=' ¿Estás seguro de cancelar el servicio?';

  var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 70%;background: black;">
           
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px; ">
               <div class="iconocerrar link sheet-close" style="z-index:10;">
               <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5188 4.48126C23.4385 2.4011 20.788 0.984547 17.9026 0.410715C15.0171 -0.163118 12.0264 0.131546 9.30839 1.25744C6.59043 2.38334 4.26736 4.28991 2.63294 6.73606C0.998525 9.18221 0.12616 12.0581 0.12616 15C0.12616 17.9419 0.998525 20.8178 2.63294 23.264C4.26736 25.7101 6.59043 27.6167 9.30839 28.7426C12.0264 29.8685 15.0171 30.1631 17.9026 29.5893C20.788 29.0155 23.4385 27.5989 25.5188 25.5188C26.9003 24.1375 27.9961 22.4976 28.7437 20.6928C29.4914 18.888 29.8762 16.9535 29.8762 15C29.8762 13.0465 29.4914 11.1121 28.7437 9.30724C27.9961 7.50242 26.9003 5.86255 25.5188 4.48126ZM20.3126 18.7613C20.4187 18.8606 20.5034 18.9808 20.5612 19.1142C20.6191 19.2476 20.6489 19.3915 20.6489 19.5369C20.6489 19.6823 20.6191 19.8262 20.5612 19.9596C20.5034 20.093 20.4187 20.2131 20.3126 20.3125C20.2133 20.411 20.0956 20.4889 19.9661 20.5418C19.8367 20.5946 19.698 20.6214 19.5582 20.6206C19.2795 20.6195 19.0124 20.5088 18.8145 20.3125L15.0001 16.4981L11.2388 20.3125C11.0409 20.5088 10.7738 20.6195 10.4951 20.6206C10.3553 20.6214 10.2166 20.5946 10.0872 20.5418C9.95773 20.4889 9.83999 20.411 9.74071 20.3125C9.54282 20.1134 9.43174 19.8441 9.43174 19.5634C9.43174 19.2827 9.54282 19.0135 9.74071 18.8144L13.502 15L9.74071 11.2388C9.56665 11.0355 9.47569 10.774 9.48602 10.5066C9.49635 10.2392 9.6072 9.98557 9.79642 9.79635C9.98565 9.60712 10.2393 9.49627 10.5067 9.48594C10.7741 9.47561 11.0356 9.56657 11.2388 9.74063L15.0001 13.5019L18.7613 9.74063C18.8597 9.63878 18.9772 9.55729 19.107 9.50083C19.2369 9.44437 19.3766 9.41404 19.5182 9.41158C19.6598 9.40911 19.8004 9.43456 19.9322 9.48646C20.0639 9.53836 20.1842 9.6157 20.286 9.71407C20.3879 9.81244 20.4694 9.9299 20.5258 10.0598C20.5823 10.1896 20.6126 10.3293 20.6151 10.4709C20.6175 10.6125 20.5921 10.7532 20.5402 10.8849C20.4883 11.0167 20.411 11.1369 20.3126 11.2388L16.4982 15L20.3126 18.7613Z" fill="#AAAAAA"></path>
            </svg>
                       </div>
              <div class="page-content" style="height: 100%;">
                <div style="background: black; height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <span class="titulomodal cambiarfuente" style="font-size: 20px;
    text-align: center;
    font-weight: 600;
    color: #c7aa6a;"></span>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:1em;width: 100%;">
                
                       
                        `;

                       

                          html+=`
                          <div class="divcitacancela">
                          <div class="row" style="margin-left: 2em;margin-right: 2em;margin-top:20px;">
                          <div class="col-100">
                          <p class="cambiarfuente `+estiloparrafo+` cambiarfuente2" style="color: #c7aa6a;text-align: center;">`+aviso+`</p>
                          </div>

                          </div>

                          <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-50">
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="CancelarCita(`+idcita+`)">Si</button>
                            </div>

                            <div class="col-50">
                            <button style="background: white;color:black;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="CerrarModalAviso5()">No</button>
                            </div>
                          </div>

                          </div>

                          <div class="divmotivocancela" style="display:none;">
                          	<div class="">
                          		<div class="col-100">
                              <form>
                            	<div class="list" style="margin:0;">
	                              <ul class="row">
	                                <li class="item-content col-100 item-input item-input-with-value">
	                                  <div class="item-inner">
	                                    <div class="item-input-wrap">
	                                      <input type="text" placeholder="Motivo de cancelación"  id="motivocancelacion" class="form-control"/>
	                                    </div>
	                                  </div>
	                                </li>

	                                </ul>
                                </div>
                                </form>
                          	</div>
                          </div>


                      </div>

                  </div>

                </div>
                
              </div>
            </div>
          </div>`;
          /*<p><button class="button color-theme btncortesias" id="cortesia_`+respuesta[i].idcortesia+`" onclick="ElegirCortesia(`+idcarrito+`,`+respuesta[i].idcortesia+`)" style="background: white;color:black;padding: 10px 20px;">
                                        Elegir
                                       </button>
                                     </p>*/
    dynamicSheet5 = app.sheet.create({
        content: html,

      swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
           $(".cambiarfuente2").css('display','none');
            

          },
          opened: function (sheet) {
            console.log('Sheet opened');

            if (tipoletra!='') {
              $(".cambiarfuente").addClass(tipoletra);
            }
          $(".cambiarfuente2").css('display','block');

          },
        }
      });

       dynamicSheet5.open();

}

function CancelarCita(idcita) {
	dynamicSheet5.close();
	AbirModalMotivo(idcita);
	/* const myPromise = new Promise((resolve, reject) => {
        CrearModalEspera2(() => {
              RealizarCancelacion(idcita);
                resolve("Modal cerrado después de realizar el cargo");
            });

        });*/
}

function AbirModalMotivo(idcita) {
	
  var aviso='Por favor escriba el motivo de la cancelación';
  var parrafo="<p class='cambiarfuente "+estiloparrafo+"' >"+aviso+"</p>";

  var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 70%;background: black;">
           
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px; ">
               <div class="iconocerrar link sheet-close" style="z-index:10;">
               <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5188 4.48126C23.4385 2.4011 20.788 0.984547 17.9026 0.410715C15.0171 -0.163118 12.0264 0.131546 9.30839 1.25744C6.59043 2.38334 4.26736 4.28991 2.63294 6.73606C0.998525 9.18221 0.12616 12.0581 0.12616 15C0.12616 17.9419 0.998525 20.8178 2.63294 23.264C4.26736 25.7101 6.59043 27.6167 9.30839 28.7426C12.0264 29.8685 15.0171 30.1631 17.9026 29.5893C20.788 29.0155 23.4385 27.5989 25.5188 25.5188C26.9003 24.1375 27.9961 22.4976 28.7437 20.6928C29.4914 18.888 29.8762 16.9535 29.8762 15C29.8762 13.0465 29.4914 11.1121 28.7437 9.30724C27.9961 7.50242 26.9003 5.86255 25.5188 4.48126ZM20.3126 18.7613C20.4187 18.8606 20.5034 18.9808 20.5612 19.1142C20.6191 19.2476 20.6489 19.3915 20.6489 19.5369C20.6489 19.6823 20.6191 19.8262 20.5612 19.9596C20.5034 20.093 20.4187 20.2131 20.3126 20.3125C20.2133 20.411 20.0956 20.4889 19.9661 20.5418C19.8367 20.5946 19.698 20.6214 19.5582 20.6206C19.2795 20.6195 19.0124 20.5088 18.8145 20.3125L15.0001 16.4981L11.2388 20.3125C11.0409 20.5088 10.7738 20.6195 10.4951 20.6206C10.3553 20.6214 10.2166 20.5946 10.0872 20.5418C9.95773 20.4889 9.83999 20.411 9.74071 20.3125C9.54282 20.1134 9.43174 19.8441 9.43174 19.5634C9.43174 19.2827 9.54282 19.0135 9.74071 18.8144L13.502 15L9.74071 11.2388C9.56665 11.0355 9.47569 10.774 9.48602 10.5066C9.49635 10.2392 9.6072 9.98557 9.79642 9.79635C9.98565 9.60712 10.2393 9.49627 10.5067 9.48594C10.7741 9.47561 11.0356 9.56657 11.2388 9.74063L15.0001 13.5019L18.7613 9.74063C18.8597 9.63878 18.9772 9.55729 19.107 9.50083C19.2369 9.44437 19.3766 9.41404 19.5182 9.41158C19.6598 9.40911 19.8004 9.43456 19.9322 9.48646C20.0639 9.53836 20.1842 9.6157 20.286 9.71407C20.3879 9.81244 20.4694 9.9299 20.5258 10.0598C20.5823 10.1896 20.6126 10.3293 20.6151 10.4709C20.6175 10.6125 20.5921 10.7532 20.5402 10.8849C20.4883 11.0167 20.411 11.1369 20.3126 11.2388L16.4982 15L20.3126 18.7613Z" fill="#AAAAAA"></path>
            </svg>
                       </div>
              <div class="page-content" style="height: 100%;">
                <div style="background: black; height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <span class="titulomodal cambiarfuente" style="font-size: 20px;
    text-align: center;
    font-weight: 600;
    color: #c7aa6a;"></span>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:1em;width: 100%;">
                
                       
                        `;

                       html+=`
                          <div class="row" style="    margin-left: 2em; margin-right: 2em;    margin-top: 20px;">
                          <div class="col-100">
                          <div style="color: #c7aa6a;text-align: center;" class="cambiarfuente `+estiloparrafo+`">
                            `+parrafo+`

                            </div>
                          </div>

                          </div>`;

                          html+=`
                          <div class="row" style="    margin-left: 2em; margin-right: 2em;margin-top:1em;">
                          <div class="col-100">
                              <form>
                            <div class="list" style="margin:0;">
                              <ul class="row">
                                <li class="item-content col-100 item-input item-input-with-value">
                                  <div class="item-inner">
                                    <div class="item-input-wrap">
                                      <textarea  placeholder=""  id="motivocancelacion" class="form-control"/></textarea>
                                    </div>
                                  </div>
                                </li>

                                </ul>
                                </div>


                                </form>

                           <div id="txtadvertencia" style="color:red;"></div>

                          </div>

                          </div>`;

                       
                      
                        


                               html+=`
                            <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;display:flex;justify-content:center;">
                            <div class="col-100">
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="AceptarCancelacion(`+idcita+`)">Aceptar</button>
                            </div>

                            
                          </div>
                          `;
                           html+=` </div>`;
                     html+=` </div>

                  </div>

                </div>
                
              </div>
            </div>
          </div>`;
          /*<p><button class="button color-theme btncortesias" id="cortesia_`+respuesta[i].idcortesia+`" onclick="ElegirCortesia(`+idcarrito+`,`+respuesta[i].idcortesia+`)" style="background: white;color:black;padding: 10px 20px;">
                                        Elegir
                                       </button>
                                     </p>*/
    dynamicSheet3 = app.sheet.create({
        content: html,

      swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
           $(".cambiarfuente2").css('display','none');
            

          },
          opened: function (sheet) {
            console.log('Sheet opened');

            if (tipoletra!='') {
              $(".cambiarfuente").addClass(tipoletra);
            }
          $(".cambiarfuente2").css('display','block');

          },
        }
      });

       dynamicSheet3.open();
}

function AceptarCancelacion(idcita) {

	 var iduser=localStorage.getItem('id_user');
	 var motivocancelac=$("#motivocancelacion").val();
 
	 const myPromise = new Promise((resolve, reject) => {
                  dynamicSheet3.close();

     CrearModalEspera5(() => {
	

	var datos="idusuarios="+iduser+"&motivocancela="+motivocancelac+"&idcita="+idcita;
	var pagina = "RealizarCancelacion.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		success: function(respuesta){
				var resp=respuesta.montoamonedero;
				var idusucursal=respuesta.detallecita.idsucursal;
				localStorage.setItem('idsucursal',idusucursal);
               dynamicSheet2.close();

               CrearModalRetorno(resp);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});

	 resolve("Modal cerrado después de realizar el cargo");
            });
 	});



}


function CrearModalRetorno(resp) {
	 var aviso=`<p  class="cambiarfuente `+estiloparrafo+`">Tu cancelación se realizó exitosamente</p>`;
	     aviso+=`<p  class="cambiarfuente `+estiloparrafo+`">El monto <span style="color:white;">$`+resp+`</span> fue enviado a tu <span style="color:white;">monedero</span></p>`;
	     aviso+=`<p class="cambiarfuente `+estiloparrafo+`">¿Deseas reagendar?</p>`;

  var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 70%;background: black;">
           
            <div class="sheet-modal-inner" style="background: white;border-top-left-radius: 20px;border-top-right-radius:20px; ">
               <div class="iconocerrar link sheet-close" style="z-index:10;">
               <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5188 4.48126C23.4385 2.4011 20.788 0.984547 17.9026 0.410715C15.0171 -0.163118 12.0264 0.131546 9.30839 1.25744C6.59043 2.38334 4.26736 4.28991 2.63294 6.73606C0.998525 9.18221 0.12616 12.0581 0.12616 15C0.12616 17.9419 0.998525 20.8178 2.63294 23.264C4.26736 25.7101 6.59043 27.6167 9.30839 28.7426C12.0264 29.8685 15.0171 30.1631 17.9026 29.5893C20.788 29.0155 23.4385 27.5989 25.5188 25.5188C26.9003 24.1375 27.9961 22.4976 28.7437 20.6928C29.4914 18.888 29.8762 16.9535 29.8762 15C29.8762 13.0465 29.4914 11.1121 28.7437 9.30724C27.9961 7.50242 26.9003 5.86255 25.5188 4.48126ZM20.3126 18.7613C20.4187 18.8606 20.5034 18.9808 20.5612 19.1142C20.6191 19.2476 20.6489 19.3915 20.6489 19.5369C20.6489 19.6823 20.6191 19.8262 20.5612 19.9596C20.5034 20.093 20.4187 20.2131 20.3126 20.3125C20.2133 20.411 20.0956 20.4889 19.9661 20.5418C19.8367 20.5946 19.698 20.6214 19.5582 20.6206C19.2795 20.6195 19.0124 20.5088 18.8145 20.3125L15.0001 16.4981L11.2388 20.3125C11.0409 20.5088 10.7738 20.6195 10.4951 20.6206C10.3553 20.6214 10.2166 20.5946 10.0872 20.5418C9.95773 20.4889 9.83999 20.411 9.74071 20.3125C9.54282 20.1134 9.43174 19.8441 9.43174 19.5634C9.43174 19.2827 9.54282 19.0135 9.74071 18.8144L13.502 15L9.74071 11.2388C9.56665 11.0355 9.47569 10.774 9.48602 10.5066C9.49635 10.2392 9.6072 9.98557 9.79642 9.79635C9.98565 9.60712 10.2393 9.49627 10.5067 9.48594C10.7741 9.47561 11.0356 9.56657 11.2388 9.74063L15.0001 13.5019L18.7613 9.74063C18.8597 9.63878 18.9772 9.55729 19.107 9.50083C19.2369 9.44437 19.3766 9.41404 19.5182 9.41158C19.6598 9.40911 19.8004 9.43456 19.9322 9.48646C20.0639 9.53836 20.1842 9.6157 20.286 9.71407C20.3879 9.81244 20.4694 9.9299 20.5258 10.0598C20.5823 10.1896 20.6126 10.3293 20.6151 10.4709C20.6175 10.6125 20.5921 10.7532 20.5402 10.8849C20.4883 11.0167 20.411 11.1369 20.3126 11.2388L16.4982 15L20.3126 18.7613Z" fill="#AAAAAA"></path>
            </svg>
                       </div>
              <div class="page-content" style="height: 100%;">
                <div style="background: black; height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <span class="titulomodal cambiarfuente" style="font-size: 20px;
    text-align: center;
    font-weight: 600;
    color: #c7aa6a;"></span>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:1em;width: 100%;">
                
                       
                        `;

                       html+=`
                          <div class="row" style="    margin-left: 2em; margin-right: 2em;    margin-top: 20px;">
                          <div class="col-100">
                          <div style="color: #c7aa6a;text-align: center;" class="cambiarfuente `+estiloparrafo+`">
                            `+aviso+`

                            </div>
                          </div>

                          </div>`;

                      	
                       html+=`
                       	     <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-50">
                            <button style="background: #C7AA6A;color:white;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="ContinuarReagenda()">Si</button>
                            </div>

                            <div class="col-50">
                            <button style="background: white;color:black;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente" onclick="CerrarModalAvisoCancela()">No</button>
                            </div>
                          </div>

                          </div>
                       `;
                      
                        


                   
                           html+=` </div>`;
                     html+=` </div>

                  </div>

                </div>
                
              </div>
            </div>
          </div>`;
          
    dynamicSheet6 = app.sheet.create({
        content: html,

      swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
           $(".cambiarfuente2").css('display','none');
            

          },
          opened: function (sheet) {
            console.log('Sheet opened');

            if (tipoletra!='') {
              $(".cambiarfuente").addClass(tipoletra);
            }
          $(".cambiarfuente2").css('display','block');

          },
        }
      });

       dynamicSheet6.open();
}

function ContinuarReagenda() {
	dynamicSheet1.close();
	dynamicSheet6.close();
	GoToPage('disponibilidadfechasucursal');
}



function CrearModalEspera5(callback) {
  
var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 70%;background: black;">
            
            <div class="sheet-modal-inner" style=" ">
              
              <div class="page-content" style="height: 100%;">
                <div style="background: black; height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <span class="titulomodal cambiarfuente" style="font-size: 20px;
    text-align: center;
    font-weight: 600;
    color: #c7aa6a;"></span>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:1em;width: 100%;">
                
                       
                        `;

                       
                          
                          
                      

                          html+=`
                          <div class="row" style="    margin-left: 2em; margin-right: 2em;    margin-top: 20px;">
                          <div class="col-100">
                          <div style="color: #c7aa6a;font-size: 30px;text-align: center;" class="cambiarfuente">
                           
                          <div id="" class="mensajeproceso" style="font-weight:bold;color:#c7aa6a;" >En proceso...
                            <img src="img/loading.gif" style="width:20%;display: flex;justify-content: center;align-items: center;margin:0px auto;margin-top: 20px;">

                          </div>
                          <p id="" class="mensajeerror" style="font-weight:bold;display:none;color:#c7aa6a;text-align:center;line-height: 1;" >Oops, algo no está bien, intenta de nuevo.</p>
                          <p id="" class="mensajeexito" style="font-weight:bold;display:none;color:#c7aa6a;text-align:center;line-height: 1;" >Se realizó correctamente</p>

                        </div>

                        

                          

                          </div>
                          </div>

                          <div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <div class="col-100" style="margin-left: 1em;margin-right: 1em;">
                            <button style="background: #C7AA6A;color:white;display:none;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente butonok" onclick="VerCompras()"  id="btnConfirm">Aceptar</button>
                            </div>

                            <div class="col-100" style="margin-left: 1em;margin-right: 1em;" >
                            <button style="background: #C7AA6A;color:white;display:none;" type="button" class="button button-fill color-theme button-large button-raised  cambiarfuente butoerror" onclick="CerrarEspera2()"  id="btnCancel" >Aceptar</button>
                            </div>
                          </div>


                      </div>

                  </div>

                </div>
                
              </div>
            </div>
          </div>`;
          /*<p><button class="button color-theme btncortesias" id="cortesia_`+respuesta[i].idcortesia+`" onclick="ElegirCortesia(`+idcarrito+`,`+respuesta[i].idcortesia+`)" style="background: white;color:black;padding: 10px 20px;">
                                        Elegir
                                       </button>
                                     </p>*/
    dynamicSheet2 = app.sheet.create({
        content: html,

      swipeToClose: false,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {

           $(".cambiarfuente2").css('display','none');
            if (tipoletra!='') {
              $(".cambiarfuente").addClass(tipoletra);
           
            }
          $(".cambiarfuente2").css('display','block');
 

          },
          opened: function (sheet) {
                 console.log('Sheet opened');

          },
        }
      });



       dynamicSheet2.open();


        setTimeout(() => {
        // Ejecuta RealizarCargo() dentro del timeout
        callback();
    }, 1000); // Cambiado a 5000 milisegundos (5 segundos)
}

function CerrarModalAviso5() {
	dynamicSheet5.close();
}

function CerrarModalAvisoCancela() {
		dynamicSheet6.close();
		dynamicSheet1.close();
		ObtenerTableroCitas();
}
function CerrarModalAviso6() {
	dynamicSheet6.close();
}

function ObtenerEdad() {
	var iduser=localStorage.getItem('id_user');
	var datos="idusuarios="+iduser;
	if (iduser>0) {
	var pagina = "Validaredad.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		async:false,
		success: function(resp){

			var edadusuario=resp.edadusuario;
			if (edadusuario=='') {
				estiloparrafo='textoestilo1';
			}

			if (edadusuario<=30) {

				estiloparrafo='textoestilo1';
	
			}
			if(edadusuario>30) {

				estiloparrafo='textoestilo2';
	
			}

			

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
	}else{


		estiloparrafo='textoestilo1';


	}
}


function VerificarSihaSidoFinalizada() {
		var id_user=localStorage.getItem('id_user');
		var idcita=localStorage.getItem('idcita');
		
		var datos="id_user="+id_user+"&idcita="+idcita;
		var pagina = "VerificarSihaSidoFinalizada.php";
		$.ajax({ 
			type: 'POST',
			dataType: 'json',
			url: urlphp+pagina,
			data:datos,
			success: function(resultado){	
				var respuesta=resultado.respuesta;

				if (respuesta==1) {
					
					 clearInterval(intervalovefinal);
					 dynamicSheet1.close();
					 dynamicSheet1.destroy();
					 dynamicSheet4.close();
					 dynamicSheet4.destroy();
					 var datosqr=resultado.datosqr[0];
					 var detallecita=resultado.detallecita[0];
					 AbrirValidacionQrFinal(detallecita);
					 ObtenerCitasProgramadas();


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



function AbrirValidacionQrFinal(respuesta) {
			
var html=` <div class="sheet-modal my-sheet-swipe-to-close1" style="height: 70%;background: black;">
            
            <div class="sheet-modal-inner" style="background: black;">
               <div class="iconocerrar link sheet-close" style="z-index:10;">
               <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5188 4.48126C23.4385 2.4011 20.788 0.984547 17.9026 0.410715C15.0171 -0.163118 12.0264 0.131546 9.30839 1.25744C6.59043 2.38334 4.26736 4.28991 2.63294 6.73606C0.998525 9.18221 0.12616 12.0581 0.12616 15C0.12616 17.9419 0.998525 20.8178 2.63294 23.264C4.26736 25.7101 6.59043 27.6167 9.30839 28.7426C12.0264 29.8685 15.0171 30.1631 17.9026 29.5893C20.788 29.0155 23.4385 27.5989 25.5188 25.5188C26.9003 24.1375 27.9961 22.4976 28.7437 20.6928C29.4914 18.888 29.8762 16.9535 29.8762 15C29.8762 13.0465 29.4914 11.1121 28.7437 9.30724C27.9961 7.50242 26.9003 5.86255 25.5188 4.48126ZM20.3126 18.7613C20.4187 18.8606 20.5034 18.9808 20.5612 19.1142C20.6191 19.2476 20.6489 19.3915 20.6489 19.5369C20.6489 19.6823 20.6191 19.8262 20.5612 19.9596C20.5034 20.093 20.4187 20.2131 20.3126 20.3125C20.2133 20.411 20.0956 20.4889 19.9661 20.5418C19.8367 20.5946 19.698 20.6214 19.5582 20.6206C19.2795 20.6195 19.0124 20.5088 18.8145 20.3125L15.0001 16.4981L11.2388 20.3125C11.0409 20.5088 10.7738 20.6195 10.4951 20.6206C10.3553 20.6214 10.2166 20.5946 10.0872 20.5418C9.95773 20.4889 9.83999 20.411 9.74071 20.3125C9.54282 20.1134 9.43174 19.8441 9.43174 19.5634C9.43174 19.2827 9.54282 19.0135 9.74071 18.8144L13.502 15L9.74071 11.2388C9.56665 11.0355 9.47569 10.774 9.48602 10.5066C9.49635 10.2392 9.6072 9.98557 9.79642 9.79635C9.98565 9.60712 10.2393 9.49627 10.5067 9.48594C10.7741 9.47561 11.0356 9.56657 11.2388 9.74063L15.0001 13.5019L18.7613 9.74063C18.8597 9.63878 18.9772 9.55729 19.107 9.50083C19.2369 9.44437 19.3766 9.41404 19.5182 9.41158C19.6598 9.40911 19.8004 9.43456 19.9322 9.48646C20.0639 9.53836 20.1842 9.6157 20.286 9.71407C20.3879 9.81244 20.4694 9.9299 20.5258 10.0598C20.5823 10.1896 20.6126 10.3293 20.6151 10.4709C20.6175 10.6125 20.5921 10.7532 20.5402 10.8849C20.4883 11.0167 20.411 11.1369 20.3126 11.2388L16.4982 15L20.3126 18.7613Z" fill="#AAAAAA"></path>
            </svg>
                       </div>
              <div class="page-content" style="height: 100%;">
                <div style="background: black; height: 100%;width: 100%;border-radius: 20px;">
                   <div class="row">
                     <div class="col-20">
                        
                    </div>

                     <div class="col-60">
                     <span class="titulomodal cambiarfuente" style="font-size: 20px;
    text-align: center;
    font-weight: 600;
    color: #c7aa6a;"></span>
                     </div>
                     <div class="col-20">
                     <span class="limpiarfiltros"></span>
                     </div>
                 </div>
                 <div class="" style="position: absolute;top:1em;width: 100%;">
                
	   							  <div class="">
		   							  <div class="block" style="margin-right:1em;margin-left:1em;">
		   									

		   							  		<div class="card-content" style="margin-top:2em;">
		   										<div class="row">
			   										<div class="col-100">
			   											<h3 style="margin-left: 1em;
    														margin-right: 1em;
    														text-align: center;line-height:1;
    									">Check-out realizado exitosamente</h3>
			   										</div>
		   										</div>
		   									</div>
		   				
		   							 		<div class="card-content ">
		   							 		<div class="row">
		   							 		<div class="col-100">
			   							 		<div class="" style="margin-top:1em;">
			   	
											<span class="material-icons-outlined" style=" width: 30px;justify-content: center;
																    font-size: 100px; display: flex;margin: auto;color:#5ac35b;">
																			check_circle_outline
																			</span>
			   							 		</div>
		   							 		</div>
		   		
			   							 		<div class="col-100">
			   							 		</div>
		   							 		</div>
		   							 				<div class="row">
		   							 					<div class="col">`;

		   						 html+=`
                 <div class=" cambiarfuente " style="list-style: none;background: black;">
          							<li class="item-content cambiarfuente" style="    margin-top: 1em;
    								margin-right: 1em;
    								margin-left: 1em;
    								border-bottom: 1px solid;
    								margin-bottom: 1em;">
          					  <div class="row" style="margin-bottom: 10px;">
             					 <div class="col-90">
				                <div class="icon-text-container">`;
				                if (respuesta.servicio==1) {
				                  etiqueta="Servicio";
				                }

				                if (respuesta.servicio==0) {
				                  etiqueta="Producto";
				                }

               html+=`
               <span class="material-icons-outlined">inventory_2
                </span> <p style="margin:0;">`+etiqueta+`: <span class="texto">`+respuesta.concepto+`</span>
                </p>

                </div>
                <div class="icon-text-container" style="margin-top: 10px;">
                <span class="material-icons-outlined">local_atm</span>
                  <p style="margin:0;">Costo: <span class="texto">$`+respuesta.costo+`</span>
                  </p>
                </div>
                <div class="icon-text-container" style="margin-top: 10px;">
                 <span class="material-icons-outlined">
                    add_business
                    </span>
                    <p style="margin:0;">
                   
                    Negocio: <span class="texto">`+respuesta.titulo+`</span></p>
                     </div>
                    `;

                       if (respuesta.servicio==0) {
                      html+=`<p style="margin:0;">Cantidad: `+respuesta.cantidad+`</p>`;
                 
                  }else{


                    html+=` 
                        <div class="icon-text-container" style="margin-top: 10px;">
                        <span class="material-icons-outlined">supervised_user_circle</span>
                    <p style="margin:0;">Barbero: <span class="texto">`+respuesta.nombre+` `+respuesta.paterno+`</span></p>
                    </div>
                    `;
                    html+=`
                   <div class="icon-text-container" style="margin-top:10px;">
                     <span class="material-icons-outlined">calendar_month</span>

                     <p style="margin:0;">Fecha/Hora: <span class="texto">`+respuesta.fechaformato+` `+respuesta.horainicial+'-'+respuesta.horafinal+`</span></p>

                     </div>
                     `;

                        if (respuesta.concortesia==1  ) {


                          if (respuesta.idcortesia>0 ) {

                          html+=`


                         <div class="icon-text-container" style="margin-top: 10px;">
                           <span class="material-icons-outlined">card_giftcard</span>

                           <p style="margin:0;">Cortesía: <span class="texto">`+respuesta.nombrepaquetecortesia+`</span></p>

                           </div>`;

                      }


                      if (respuesta.idcortesia==0 && respuesta.colococortesia==1) {

                          html+=`


                         <div class="icon-text-container" style="margin-top: 10px;">
                           <span class="material-icons-outlined">card_giftcard</span>

                           <p style="margin:0;">Cortesía: <span class="texto">Ninguna</span></p>

                           </div>`;
                      }

                       

                    }else{

                 
          

                    }
                  }

                  

              html+=` </div>
                <div class="col-10">`;

                  if (respuesta.precioante!=0) {
                     html+=`
                     <div class="col-100">
                     <p style="margin:0;text-decoration:line-through;font-size: 12px;text-align: right;">$`+respuesta.precioante+`</p>
                     </div>
                     `;

                  }


				                   html+=`
				                   <div class="col-100">
				                   
				                     </div>
				                     `;

                 



									             html+=` </div>

									              </div>
									          </li>

									        </div>`;
									html+=`

		   							 					</div>
		   							 				</div>
		   							 			</div>
		   							 		</div>

		   							 		</div>
		   							 		<div class="row margin-bottom " style="padding-top: 1em;    margin-left: 2em;margin-right: 2em;margin-top:20px;">
                            <divclass="col-100"><button style="background: #C7AA6A;display:none;" type="button" class="button button-fill color-theme button-large button-raised btnagregarcortesia cambiarfuente" onclick="CerrarModal4()">Aceptar</button></div>
                          </div>
		   							 		<div class="row" style="margin-top:6em;">
		   									
											 
											</div>
										</div>
		   				

										</div>

	   							 	</div>

   							 </div>

   				</div>
                
              </div>
            </div>
          </div>`;
          
	  dynamicSheet4 = app.sheet.create({

        content: html,

    	swipeToClose: true,
        backdrop: true,
        // Events
        on: {
          open: function (sheet) {
		
					
          },
          opened: function (sheet) {
          
          },

          close:function () {
          	 CalificarCita(respuesta.idcita);
          }
        }
      });

       dynamicSheet4.open();
	}

	function CerrarModal4() {

		dynamicSheet4.close();

	}