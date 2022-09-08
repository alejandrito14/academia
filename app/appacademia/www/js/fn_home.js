function CargarInicio() {
	var idtipousuario=localStorage.getItem('idtipousuario');
	
	   		if (idtipousuario==0) {  
					app.preloader.show();						 

				  setTimeout(function () {
				     CargarDatosAdmin();
					app.preloader.hide();

				  }, 2000);
			
                    
                  }
               if (idtipousuario==3) {
                        
						
			 	app.preloader.show();						 

				  setTimeout(function () {
				     CargarDatos();
				app.preloader.hide();

				  }, 2000);
			
	  
                    }
                    if (idtipousuario==5) {
                 
                
					app.preloader.show();						 

				  setTimeout(function () {
				     CargarDatosCoach();
					app.preloader.hide();

				  }, 2000);
				
                }
}
function CargarDatos() {
	localStorage.setItem('variable',0);

  var nombreusuario= localStorage.getItem('alias');
	$$(".nombreusuario").text(nombreusuario);
	var tipousuario=localStorage.getItem('tipoUsuario');
	$$(".tipousuario").text(tipousuario);
	$$(".btnmisservicios").attr('onclick','MisServiciosAlumno()');
    $$(".btnserviciosactivos").attr('onclick','ServiciosActivos()');

 	classtipo='tipoalumno';
 	 $$(".tipousuario").removeClass('tipoadmin');
 	 $$(".tipousuario").removeClass('tipocoach');
  	$$(".tipousuario").addClass(classtipo);


	ObtenerTableroAnuncios(1);
	ObtenerEntradas(1);
	//ObtenerServiciosAsignados();
	Obtenerpublicidad(1);
	ObtenerConfiguracion();
	MostrarBotonServiciosActivos();

	var promesa=getConfiguracion();
    promesa.then(r => {
      var activarpopupmembresia=r.respuesta.activarpopupmembresia;

      if (activarpopupmembresia==1) {
      		var promesa2=getUsuario();
      		  promesa2.then(r2 => {
      		  	console.log(r2);
      		  	var visto=r2.respuesta.popupmembresia;
      		  	if (visto==1) {

      		  		ObtenerMembresiaActivas();

      		  	}

      		  });

        	
      }

    });

	var iduser=localStorage.getItem('id_user');
	socket=io.connect(globalsockect, { transports : ["websocket"],rejectUnauthorized: false });
    socket.on('connect', function (data) 
	{
       socket.emit('conectado', { customId:iduser,tipouser:localStorage.getItem('idtipousuario')});
    });
 	socket.on('mensajerespuestacliente',function (data) 
	{
    	console.log("mensaje respuesta");
    	PintarMensaje(data);
	});

	socket.on('nuevomensaje',function (data) 
	{	
			console.log(data);
    	if (data.idusuario!=iduser) {
    		console.log('idsala'+data.soporte);
    		if (data.soporte == localStorage.getItem('idsala')) {
    			PintarMensaje(data);
$$('.messages-content').scrollTop( $('.messages-content').get(0).scrollHeight, 400 );

    		}
    	}
	});
}

function CargarDatosAdmin(argument) {
	localStorage.setItem('variable',0);

	 var nombreusuario= localStorage.getItem('nombre')
	$$(".nombreusuario").text(nombreusuario);
	var tipousuario=localStorage.getItem('tipoUsuario');
	$$(".tipousuario").text(tipousuario);
	$("#lipagos").css('display','none');
	var idtipousuario=localStorage.getItem('idtipousuario');

   
      classtipo='tipoadmin';
    $$(".tipousuario").addClass(classtipo);
    $$(".btnnuevoservicio").attr('onclick','NuevoServicio()');
    $$(".btnreplicaservicio").attr('onclick','ReplicaServicio()');



 	 const promesa=ObtenerTableroAnuncios(0)

 	 promesa.then(val =>{

		ObtenerEntradas(0);

		Obtenerpublicidad(0);
		ObtenerConfiguracion();

 	 }).then(val =>{

 	 	$(".seleccionador").each(function(index) {
				$(this).css('display','block');
		});
 	 }).catch(err => { console.log(err) });

	

	//ObtenerServiciosRegistrados();
	$$(".btnmisservicios").attr('onclick','MisServiciosAdmin()');
	$$(".btndisponibilidad").attr('onclick','CargarCalendarioAdmin()');

	socket=io.connect(globalsockect, { transports : ["websocket"],rejectUnauthorized: false });
    socket.on('connect', function (data) 
	{
       socket.emit('conectado', { customId:iduser,tipouser:localStorage.getItem('idtipousuario')});
    });
 	socket.on('mensajerespuestacliente',function (data) 
	{
    	//console.log("mensaje respuesta");
    	PintarMensaje(data);
	});

	socket.on('nuevomensaje',function (data) 
	{	
			//console.log(data);
    	if (data.idusuario!=iduser) {
    		//console.log('idsala'+data.soporte);
    		if (data.soporte == localStorage.getItem('idsala')) {
    		
    			PintarMensaje(data);
			$$('.messages-content').scrollTop( $('.messages-content').get(0).scrollHeight, 400 );

    		}
    	}
	});
}

function MisServiciosAdmin() {
	GoToPage('serviciosregistrados');
}


function CargarDatosCoach() {
	localStorage.setItem('variable',0);

  var nombreusuario= localStorage.getItem('alias');
	$$(".nombreusuario").text(nombreusuario);
	var tipousuario=localStorage.getItem('tipoUsuario');
	$$(".tipousuario").text(tipousuario);
	$("#lipagos").css('display','none');
	$$(".tipousuario").addClass('tipocoach');
	$$(".btnmisservicios").attr('onclick','MisServiciosCoah()');
  classtipo='tipocoach';
  $$(".tipousuario").addClass(classtipo);
    $$(".btnserviciosactivos").attr('onclick','ServiciosActivosCoach()');
    $$(".btnnuevoservicio").attr('onclick','NuevoServicio()');
    $$(".btnreplicaservicio").attr('onclick','ReplicaServicio()');

	ObtenerTableroAnuncios(1);
	ObtenerEntradas();
	MostrarBotonServiciosActivosCoach();

	//ObtenerServiciosAsignadosCoach();
	//Obtenerpublicidad();
	ObtenerConfiguracion();
	var iduser=localStorage.getItem('id_user');

	socket=io.connect(globalsockect, { transports : ["websocket"],rejectUnauthorized: false });
    socket.on('connect', function (data) 
	{
       socket.emit('conectado', { customId:iduser,tipouser:localStorage.getItem('idtipousuario')});
    });
 	socket.on('mensajerespuestacliente',function (data) 
	{
    	console.log("mensaje respuesta");
    	if (data.soporte==localStorage.getItem('idsala')) {
    		PintarMensaje(data);
    	}
    	
	});

	socket.on('nuevomensaje',function (data) 
	{	

    	if (data.idusuario!=iduser) {
    		if (data.soporte==localStorage.getItem('idsala')) {
    			
    			PintarMensaje(data);
$$('.messages-content').scrollTop( $('.messages-content').get(0).scrollHeight, 400 );

    			 messages.addMessage({
		            text: data.mensaje,
		            type: 'received',
		            name: data.nombre,
		            avatar: person.avatar
	          });

    			 var contar=parseFloat($(".badge6").text());
	    		var suma=contar+1;
	    		if (suma>0) {

	    			$(".badge6").text(suma);
	    			$(".badge6").css('display','block');

	    		}
    		
    		}

    		
    	}
	});
}
function MisServiciosCoah() {
	GoToPage('serviciosasignados');
}

function MisServiciosAlumno() {
		GoToPage('serviciosasignados');

}

function ObtenerTableroAnuncios(estatus) {

	return new Promise((resolve, reject) => {
 
	var datos="estatus="+estatus;
	var pagina = "ObtenerTableroAnuncios.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		success: function(datos){

			var respuesta=datos.respuesta;
			PintarTableroAnuncios(respuesta);
			resolve(respuesta);
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


function PintarTableroAnuncios(respuesta) {
	var html="";
		if (respuesta.length>0) {

			html+=` <div class="swiper-wrapper">`;
		for (var i = 0; i <respuesta.length; i++) {
		imagen=urlimagenes+`tableroanuncios/imagenes/`+codigoserv+respuesta[i].imagen;
			var checked="";
			if (respuesta[i].estatus==1) {
				checked="checked";
			}
				html+=`

              <div class="swiper-slide" >
                <div class="card" style="width: 200px;">
                  <div class="card-content card-content-padding ">
                   <div class="seleccionador" style="position: absolute;right: 0;display:none" > <label>
                   <input type="checkbox" class="" style="margin-right: 1.4em;height: 15px;width: 20px;
				    transform: scale(1.5);" id="cambio_`+respuesta[i].idtableroanuncio+`" onchange="CambioEstatusTablero(`+respuesta[i].idtableroanuncio+`)" `+checked+`> 
				    </label>
				    </div>
                    <div class="row margin-bottom ">
                      <div class="col-auto align-self-center">
                        <img src="`+imagen+`" alt="" onclick="VerDetallesTablero(`+respuesta[i].idtableroanuncio+`)"  style="width: 100%;border-radius: 10px"/>
                      </div>
                      <div class="col align-self-center text-align-right">
                        <p class="small">
                          <span class="text-uppercase size-10"></span><br />
                          <span class="text-muted"></span>
                        </p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-100">
                        <h5 class="fw-normal margin-bottom-half">
                         `+respuesta[i].titulo+`
                          <span class="small text-muted"></span>
                        </h5>
                        <p class="no-margin-bottom text-muted size-12"></p>
                        <p class="text-muted size-12"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

				`;

		}

		html+=`</div>`;

		$$(".cardswiper").html(html);

		 var swiper1 = new Swiper(".cardswiper", {
		    slidesPerView: "auto",
		    spaceBetween: 0,
		    pagination: false
		  });
			$(".divtableroauncios").css('display','block');

	}else{

		$(".divtableroauncios").css('display','none');

	}
}
function ObtenerServicios(estatus) {
	var datos="estatus="+estatus;
	var pagina = "ObtenerServicios.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		async:false,
		data:datos,
		success: function(datos){

			var respuesta=datos.respuesta;
			PintarServicios(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function PintarServicios(respuesta) {
	var html="";
		if (respuesta.length>0) {

			html+=` <div class="swiper-wrapper">`;
		for (var i = 0; i <respuesta.length; i++) {
		imagen=urlimagenes+`servicios/imagenes/`+codigoserv+respuesta[i].imagen;
				html+=`

              <div class="swiper-slide" >
                <div class="card" style="width: 200px;">
                  <div class="card-content card-content-padding ">
                   <div class="seleccionador" style="position: absolute;right: 0; display:none;" > 
                   <label>
                   <input type="checkbox" class="" style="    margin-right: 1.4em;
				    transform: scale(1.5);"> </label>
				    </div>
                    <div class="row margin-bottom ">
                      <div class="col-auto align-self-center">
                        <img src="`+imagen+`" alt="" onclick="VerDetalles(`+respuesta[i].idservicio+`)"  style="width: 100%;border-radius: 10px"/>
                      </div>
                      <div class="col align-self-center text-align-right">
                        <p class="small">
                          <span class="text-uppercase size-10"></span><br />
                          <span class="text-muted"></span>
                        </p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-100">
                        <h5 class="fw-normal margin-bottom-half">
                         `+respuesta[i].titulo+`
                          <span class="small text-muted"></span>
                        </h5>
                        <p class="no-margin-bottom text-muted size-12"></p>
                        <p class="text-muted size-12"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

				`;

		}

		html+=`</div>`;

		$$(".cardswiper").html(html);

		 var swiper1 = new Swiper(".cardswiper", {
		    slidesPerView: "auto",
		    spaceBetween: 0,
		    pagination: false
		  });
	}
}
function ObtenerEntradas(estatus) {
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
			PintarEntradas(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function PintarEntradas(respuesta) {
	
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


		$(".divblog").css('display','block');

	}else{

		$(".divblog").css('display','none');
	}
}

function ObtenerServiciosAsignados() {
	var idusuario=localStorage.getItem('id_user');
	var datos="idusuario="+idusuario;
	var pagina = "ObtenerServiciosAsignados.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){

			var respuesta=datos.respuesta;
			var fechaactual=datos.fechaactual;
			console.log(datos);
			PintarServiciosAsignados2(respuesta,fechaactual);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function PintarServiciosAsignados(respuesta) {
	
		var html="";

	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			
			var imagen='';
			if (respuesta[i].imagen!='' && respuesta[i].imagen!=null && respuesta[i].imagen!='null') {

				urlimagen=urlimagenes+`servicios/imagenes/`+codigoserv+respuesta[i].imagen;
				imagen='<img src="'+urlimagen+'" alt=""  style="width: 120px;border-radius: 10px;height: 80px;"/>';
			}else{

				urlimagen=urlimagendefaultservicio;
				imagen='<img src="'+urlimagen+'" alt=""  style="width: 120px;border-radius: 10px;height: 80px;"/>';
			}

			html+=`
				 <div class="list-item"  style="background: white; margin: 1em;padding: 1em;border-radius: 10px;">
                <div class="row">
                  <div class="col-40" style="justify-content:center;display:flex;" >
                    <div class="" onclick="DetalleServicioAsignado(`+respuesta[i].idusuarios_servicios+`)">`+imagen+`
                      
                    </div>
                  </div>
                  <div class="col-60" >
                   <div class="row" style="margin-left: 0.4em;">
                    `;
                  //  horarios=respuesta[i].horarios;
                    	var horarioshtml="";
                    	//for (var j = 0; j < horarios.length; j++) {
                    		if (respuesta[i].fechaproxima!='') {
                    		horarioshtml+=`<span>`+respuesta[i].fechaproxima+` `+respuesta[i].horainicial+` - `+respuesta[i].horafinal+` Hrs.</span></br>`;
                    		}
                    	//}

                    html+=`
                     <p class="text-color-theme size-12" style="text-align:center;font-weight:bold;" onclick="DetalleServicioAsignado(`+respuesta[i].idusuarios_servicios+`)">`+horarioshtml+`</p>
                     <p class="text-color-theme size-12" style="text-align:center;" onclick="DetalleServicioAsignado(`+respuesta[i].idusuarios_servicios+`)">`+respuesta[i].zonanombre+`</p>

 					<p class="text-muted no-margin-bottom"  style="text-align: center;opacity: 0.6;font-size: 12px;"  onclick="DetalleServicioAsignado(`+respuesta[i].idusuarios_servicios+`)">`+respuesta[i].titulo+`</p>
                  

                  </div>
                  <div class="row" style="margin-top:1em;">
                  	<div class="col" style="text-align:center;" >
                  		<div class="avatar avatar-40 alert-primary text-color-blue rounded-circle iconos" onclick="OpinionesServicio(`+respuesta[i].idusuarios_servicios+`)"><i class="bi bi-chat-square-dots"></i></div>
                                    	<div class="avatar avatar-40 alert-primary text-color-blue rounded-circle iconos" onclick="ParticipantesServicio(`+respuesta[i].idusuarios_servicios+`)"><i class="bi bi-chat-left-quote-fill"></i></div>
                  		<div class="avatar avatar-40 alert-primary text-color-blue rounded-circle iconos" onclick="AbirCalificarServicio(`+respuesta[i].idusuarios_servicios+`)"><i class="bi bi-star"></i></div>


                  	</div>
                  
                                  

                  </div>

               	</div>
                  
                </div>
              </div>

			`;
		}

		$$(".serviciosasignados").html(html);
	}else{


		html+=`
			 <div class="list-item">
                <div class="row text-color-theme">
                  <h4 style="text-align:center;">En breve el administrador te asignará tus servicios</h4>
                </div>
              </div>


		`;

				$$(".serviciosasignados").html(html);

	}
}



function PintarServiciosAsignados2(respuesta,fechaactual) {
	
		var html="";

	if (respuesta.length>0) {
		var contadorpasado=0;
		for (var i = 0; i <respuesta.length; i++) {
			
			var imagen='';
			if (respuesta[i].imagen!='' && respuesta[i].imagen!=null && respuesta[i].imagen!='null') {

				urlimagen=urlimagenes+`servicios/imagenes/`+codigoserv+respuesta[i].imagen;
				imagen='<img src="'+urlimagen+'" alt=""  style="width: 100%;height: 70%;border-top-left-radius: 10px;border-top-right-radius: 10px;"/>';
			}else{

				urlimagen=urlimagendefaultservicio;
				imagen='<img src="'+urlimagen+'" alt=""  style="width: 100%;height: 70%;border-top-left-radius: 10px;border-top-right-radius: 10px;"/>';
			}



			if (respuesta[i].porpasar==0 && contadorpasado==0) {


				html+=`<div class="row">
				<div class="linea"><span>Hoy `+fechaactual+`</span></div>

				</div>`;
				contadorpasado++;


			}
			var clasecomentario="vacio";
			var clasechat="vacio";
			var clasecalificacion="vacio";
			if (respuesta[i].concalificacion==1){
				clasecalificacion="convalor";
			}
			if (respuesta[i].conchat==1){
				clasechat="convalor";
			}
			if (respuesta[i].concomentarios==1) {
				clasecomentario="convalor";
			}


			html+=`
				 <div class="list-item"  style="background: white; margin: 1em;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;">
                <div class="row">
                  <div class="col-100" style="padding:0;" >
                    <div class="" onclick="DetalleServicioAsignado(`+respuesta[i].idusuarios_servicios+`)">`+imagen+`
                      
                    </div>
                  </div>
                  </div>
                  <div class="row" style="height:10em;">
                  <div class="col-100" >
                   <div class="row" style="margin-top:.5em;">
                    `;
                  //  horarios=respuesta[i].horarios;
                    	var horarioshtml="";
                    	//for (var j = 0; j < horarios.length; j++) {
                    		if (respuesta[i].fechaproxima!='') {
                    		horarioshtml+=`<span style="color:black;font-size:18px;">`+respuesta[i].fechaproxima+` </span><br><span style="margin-top:.5em;font-size:16px;">`+respuesta[i].horainicial+` - `+respuesta[i].horafinal+` Hrs.</span>`;
                    		}
                    	//}

                    html+=`
                     <span class="text-color-theme size-12" style="text-align:center;font-weight:bold;" onclick="DetalleServicioAsignado(`+respuesta[i].idusuarios_servicios+`)">`+horarioshtml+`</span>
                     <span class="text-color-theme size-12" style="text-align:center;" onclick="DetalleServicioAsignado(`+respuesta[i].idusuarios_servicios+`)">`+respuesta[i].zonanombre+`</span>

 					<span class="text-muted no-margin-bottom"  style="text-align: center;opacity: 0.6;font-size: 12px;"  onclick="DetalleServicioAsignado(`+respuesta[i].idusuarios_servicios+`)">`+respuesta[i].titulo+`</span>
                  

                  </div>
                  <div class="row" style="margin-top:1em;">
                  	<div class="col" style="text-align:center;" >`;


                  	html+=`<div class="avatar avatar-40 alert-primary text-color-blue rounded-circle iconos `+clasecomentario+`" onclick="OpinionesServicio(`+respuesta[i].idusuarios_servicios+`)"><i class="bi bi-chat-square-dots"></i></div>`;
                    html+=`	<div class="avatar avatar-40 alert-primary text-color-blue rounded-circle iconos `+clasechat+`" onclick="ParticipantesServicio(`+respuesta[i].idusuarios_servicios+`)"><i class="bi bi-chat-left-quote-fill"></i></div>`;
                  	html+=`	<div class="avatar avatar-40 alert-primary text-color-blue rounded-circle iconos `+clasecalificacion+`" onclick="AbirCalificarServicio(`+respuesta[i].idusuarios_servicios+`)"><i class="bi bi-star"></i></div>`;


                  	html+=`</div>
                  
                                  

                  </div>

               	</div>
                  
                </div>
              </div>
              </div>
              </div>

			`;




		}

		$$(".serviciosasignados").html(html);
	}else{


		html+=`
			 <div class="list-item">
                <div class="row text-color-theme">
                  <h4 style="text-align:center;">En breve el administrador te asignará tus servicios</h4>
                </div>
              </div>


		`;

				$$(".serviciosasignados").html(html);

	}
}

function ObtenerServiciosAsignadosCoach() {
	var idusuario=localStorage.getItem('id_user');
	var datos="idusuario="+idusuario;
	var pagina = "ObtenerServiciosAsignados.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){

			var respuesta=datos.respuesta;
			var fechaactual=datos.fechaactual;
			PintarServiciosAsignadosCoach2(respuesta,fechaactual);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function PintarServiciosAsignadosCoach2(respuesta,fechaactual) {
		
	
	var html="";

	if (respuesta.length>0) {
		var contadorpasado=0;
		for (var i = 0; i <respuesta.length; i++) {
			
			var imagen='';
			if (respuesta[i].imagen!='' && respuesta[i].imagen!=null && respuesta[i].imagen!='null') {

				urlimagen=urlimagenes+`servicios/imagenes/`+codigoserv+respuesta[i].imagen;
				imagen='<img src="'+urlimagen+'" alt=""  style="width: 100%;height: 70%;border-top-left-radius: 10px;border-top-right-radius: 10px;"/>';
			}else{

				urlimagen=urlimagendefaultservicio;
				imagen='<img src="'+urlimagen+'" alt=""  style="width: 100%;height: 70%;border-top-left-radius: 10px;border-top-right-radius: 10px;"/>';
			}


			var clasecantidad="colorred";

		if (respuesta[i].cantidadalumnos!='' && respuesta[i].numeroparticipantesmax!='') {
			
				if (respuesta[i].cantidadalumnos==respuesta[i].numeroparticipantesmax) {
				clasecantidad="colorgreen";
				
				}

			}

			var opacidad="";
			if (respuesta[i].fechaproxima=='') {
				opacidad="opacity:0.6;"
			}


			if (respuesta[i].porpasar==0 && contadorpasado==0) {


				html+=`<div class="row">
				<div class="linea"><span>Hoy `+fechaactual+`</span></div>

				</div>`;
				contadorpasado++;


			}
			var clasecomentario="vacio";
			var clasechat="vacio";
			var clasecalificacion="vacio";
			if (respuesta[i].concalificacion==1){
				clasecalificacion="convalor";
			}
			if (respuesta[i].conchat==1){
				clasechat="convalor";
			}
			if (respuesta[i].concomentarios==1) {
				clasecomentario="convalor";
			}

			var colocarnumero="";
              if(respuesta[i].numeroparticipantesmax=='' ) {
				respuesta[i].numeroparticipantesmax=0;
              }
               if(respuesta[i].numeroparticipantesmin=='' ) {
				respuesta[i].numeroparticipantesmin=0;
              }
                colocarnumero+=`<div style="text-align:center;`+opacidad+`" class="textoarribaizquierda `+clasecantidad+`">`;
						                 
                 colocarnumero+=`<span>`+respuesta[i].cantidadalumnos+ ` </span>de<span> `+respuesta[i].numeroparticipantesmax+`</span></div>`;
                  		
               



			html+=`
				 <div class="list-item"  style="background: white; margin: 1em;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;">
                <div class="row">
                  <div class="col-100" style="padding:0;" >
                     `+colocarnumero+`
                    <div class="" onclick="DetalleServicioAsignadoCoach(`+respuesta[i].idusuarios_servicios+`)">`+imagen+`
                      
                    </div>
                   
                  </div>
                  </div>
                  <div class="row" style="height:10em;">
                  <div class="col-100" >
                   <div class="row" style="margin-top:.5em;">
                    `;
                  //  horarios=respuesta[i].horarios;
                    	var horarioshtml="";
                    	//for (var j = 0; j < horarios.length; j++) {
                    		if (respuesta[i].fechaproxima!='') {
                    		horarioshtml+=`<span style="color:black;font-size:18px;">`+respuesta[i].fechaproxima+` </span><br><span style="margin-top:.5em;font-size:16px;">`+respuesta[i].horainicial+` - `+respuesta[i].horafinal+` Hrs.</span>`;
                    		}
                    	//}

                    html+=`
                     <span class="text-color-theme size-12" style="text-align:center;font-weight:bold;" onclick="DetalleServicioAsignadoCoach(`+respuesta[i].idusuarios_servicios+`)">`+horarioshtml+`</span>
                     <span class="text-color-theme size-12" style="text-align:center;" onclick="DetalleServicioAsignadoCoach(`+respuesta[i].idusuarios_servicios+`)">`+respuesta[i].zonanombre+`</span>

 					<span class="text-muted no-margin-bottom"  style="text-align: center;opacity: 0.6;font-size: 12px;"  onclick="DetalleServicioAsignadoCoach(`+respuesta[i].idusuarios_servicios+`)">`+respuesta[i].titulo+`</span>
                  

                  </div>
                  <div class="row" style="margin-top:1em;">
                  	<div class="col" style="text-align:center;" >`;


                  	html+=`<div class="col" style="text-align:center;" >
                  		<div class="avatar avatar-40 alert-primary text-color-blue rounded-circle `+clasecomentario+` iconos" style="`+opacidad+`" onclick="OpinionesServicio(`+respuesta[i].idusuarios_servicios+`)"><i class="bi bi-chat-square-dots"></i></div>
                  	    <div class="avatar avatar-40 alert-primary text-color-blue rounded-circle `+clasechat+` iconos" style="`+opacidad+`"  onclick="ParticipantesServicio(`+respuesta[i].idusuarios_servicios+`)"><i class="bi bi-chat-left-quote-fill" ></i></div>

                  	</div>`;
                  	html+=`</div>
                  
                                  

                  </div>

               	</div>
                  
                </div>
              </div>
              </div>
              </div>

			`;




		}

		$$(".serviciosasignados").html(html);
	}else{


		html+=`
			 <div class="list-item">
                <div class="row text-color-theme">
                  <h4 style="text-align:center;">En breve el administrador te asignará tus servicios</h4>
                </div>
              </div>


		`;

				$$(".serviciosasignados").html(html);

	}
}

function PintarServiciosAsignadosCoach(respuesta) {
		
	

	var html="";

	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {

		

			var clasecantidad="colorred";

		if (respuesta[i].cantidadalumnos!='' && respuesta[i].numeroparticipantesmax!='') {
			
				if (respuesta[i].cantidadalumnos==respuesta[i].numeroparticipantesmax) {
				clasecantidad="colorgreen";
				
				}

			}

			var opacidad="";
			if (respuesta[i].fechaproxima=='') {
				opacidad="opacity:0.6;"
			}

				if (respuesta[i].imagen!='' && respuesta[i].imagen!=null && respuesta[i].imagen!='null') {

				urlimagen=urlimagenes+`servicios/imagenes/`+codigoserv+respuesta[i].imagen;
				imagen='<img src="'+urlimagen+'" alt=""  style="width: 120px;border-radius: 10px;height: 80px;'+opacidad+'"/>';
			}else{

				urlimagen=urlimagendefaultservicio;
				imagen='<img src="'+urlimagen+'" alt=""  style="width: 120px;border-radius: 10px;height: 80px;'+opacidad+'"/>';
			}

			html+=`
			 <div class="list-item" style="background: white; margin: 1em;padding: 1em;border-radius: 10px;" >
                <div class="row">
                  <div class="col-30">
                  	<div class="">
                    <div class="avatar  shadow rounded-10 " style="    border-radius: 10px;
    padding: 0; margin: 0;" onclick="DetalleServicioAsignadoCoach(`+respuesta[i].idusuarios_servicios+`)">
                    `+imagen+`
                    </div>
                    </div>
                  	<div class="row">`;

                  	if(respuesta[i].numeroparticipantesmax!='' && respuesta[i].cantidadalumnos>=0) {

                  	html+=`<p style="text-align:center;display:none;`+opacidad+`" class="`+clasecantidad+`">`;
						                 
                    html+=`<span>`+respuesta[i].cantidadalumnos+ ` </span>de<span> `+respuesta[i].numeroparticipantesmax+`</span>`;
                  		
                  		console.log(html);
                  		}

                  html+=`</p>
                  	</div>

                  </div>
                  <div class="col-70" >
                   <div class="row" style="margin-left: 0.4em;">

                    `;
                   var horarioshtml="";
                    	//for (var j = 0; j < horarios.length; j++) {
                    		if (respuesta[i].fechaproxima!='') {
                    		horarioshtml+=`<span>`+respuesta[i].fechaproxima+` `+respuesta[i].horainicial+` - `+respuesta[i].horafinal+` Hrs.</span></br>`;
                    		}

                    html+=`

                    <p class="text-color-theme size-12" style="text-align:center;font-weight:bold;" onclick="DetalleServicioAsignadoCoach(`+respuesta[i].idusuarios_servicios+`)">`+horarioshtml+`</p>
                     <p class="text-color-theme size-12" style="text-align:center;" onclick="DetalleServicioAsignadoCoach(`+respuesta[i].idusuarios_servicios+`)">`+respuesta[i].zonanombre+`</p>

 					<p class="text-muted no-margin-bottom"  style="text-align: center;opacity: 0.6;font-size: 12px;" onclick="DetalleServicioAsignadoCoach(`+respuesta[i].idusuarios_servicios+`)">`+respuesta[i].titulo+`</p>
                  

                  </div>`;
                  if (respuesta[i].idcategoria>0) {
                 html+=` <div class="" style="margin-top:1em;width:100%;text-align:center;">
                  	
                  	<div class="col" style="text-align:center;" >
                  		<div class="avatar avatar-40 alert-primary text-color-blue rounded-circle iconos" style="`+opacidad+`" onclick="OpinionesServicio(`+respuesta[i].idusuarios_servicios+`)"><i class="bi bi-chat-square-dots"></i></div>
                  	    <div class="avatar avatar-40 alert-primary text-color-blue rounded-circle iconos" style="`+opacidad+`"  onclick="ParticipantesServicio(`+respuesta[i].idusuarios_servicios+`)"><i class="bi bi-chat-left-quote-fill" ></i></div>

                  	</div>



                  
                  	`;
                 	



                  }

                  html+=`</div>

               	</div>
                  
                </div>
              </div>

			`;
		}

		$$(".serviciosasignados").html(html);
	}else{


		html+=`
			

		`;

				$$(".serviciosasignados").html(html);

		}
}


function AbirCalificarServicio(idusuarios_servicios) {
	localStorage.setItem('idusuarios_servicios',idusuarios_servicios);

	 ObtenerCalificacion().then(r => {
		PantallaCalificacion(r);

	  });
}


function AbirPantallaCalificarServicio() {

	 ObtenerCalificacion().then(r => {
		PantallaCalificacion(r);

	  });
}

function ParticipantesServicio(idusuarios_servicios) {
localStorage.setItem('idusuarios_servicios',idusuarios_servicios);
localStorage.setItem('variable',1);

	GoToPage('elegirparticipantes');

}

function OpinionesServicio(idusuarios_servicios) {
	localStorage.setItem('idusuarios_servicios',idusuarios_servicios);
	localStorage.setItem('variable',1);
	
	GoToPage('comentariosservicio');
	
}

function OpinionesServicioAdmin(idservicio) {
	localStorage.setItem('idservicio',idservicio);
	localStorage.setItem('variable',1);
	
	GoToPage('comentariosservicio');
	
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
			Pintarpublicidad(respuesta);

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

	if (respuesta.length>0) {
		var html="";
		html+=`<div class="swiper-wrapper">`;
		for (var i = 0; i <respuesta.length; i++) {
			   urlimagen=urlimagenes+`publicidad/imagenes/`+codigoserv+respuesta[i].imagen;
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

                	<div class="" style="padding: 0;margin: 0px auto;">
                        <img src="`+urlimagen+`" alt="" onclick="" style="width: 100%;border-radius: 10px;margin: 0;padding: 0px;"">
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


function VerDetallesTablero(idtableroanuncio) {
	var datos="idtableroanuncio="+idtableroanuncio;
	var pagina = "ObtenerAnuncioTablero.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		success: function(datos){

			var respuesta=datos.respuesta[0];
			PintarAnuncioTablero(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}


function PintarAnuncioTablero(respuesta) {

	urlimagen=urlimagenes+`tableroanuncios/imagenes/`+codigoserv+respuesta.imagen;

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
	 									<span class="bi bi-x-circle-fill"></span>
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
		   							 	
		   							 			<figure class="overflow-hidden rounded-15 text-center">
								                    <img src="`+urlimagen+`" alt="" class="width-100 margin-left-auto margin-right-auto">
								                </figure>` ;
								                if (respuesta.titulo!='' && respuesta.titulo!=null ) {
								             	html+=`<h5 class="margin-bottom" style="font-size:24px;">`+respuesta.titulo+`</h5>`;
 	
								                }
								                if (respuesta.descripcion!='' && respuesta.descripcion!=null) {
								                html+=`<p class="text-muted" style="text-align:justify;">`+respuesta.descripcion+`</p>`;
								            }


		   							 	html+=`</div>

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
            console.log('Sheet open');
          },
          opened: function (sheet) {
            console.log('Sheet opened');
          },
        }
      });

       dynamicSheet1.open();
}
function VerDetalles(idservicio) {
	var datos="idservicio="+idservicio;
	var pagina = "ObtenerServicio.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		success: function(datos){

			var respuesta=datos.respuesta[0];
			PintarServicio(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}
function PintarServicio(respuesta) {

	urlimagen=urlimagenes+`servicios/imagenes/`+codigoserv+respuesta.imagen;

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
            <div class="iconocerrar link sheet-close">
	 									<span class="bi bi-x-circle-fill"></span>
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
		   							 	
		   							 			<figure class="overflow-hidden rounded-15 text-center">
								                    <img src="`+urlimagen+`" alt="" class="width-100 margin-left-auto margin-right-auto">
								                </figure>` ;
								                if (respuesta.titulo!='' && respuesta.titulo!=null ) {
								             	html+=`<h5 class="margin-bottom" style="font-size:24px;">`+respuesta.titulo+`</h5>`;
 	
								                }
								                if (respuesta.descripcion!='' && respuesta.descripcion!=null) {
								                html+=`<p class="text-muted">`+respuesta.descripcion+`</p>`;
								            }


		   							 	html+=`</div>

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
            console.log('Sheet open');
          },
          opened: function (sheet) {
            console.log('Sheet opened');
          },
        }
      });

       dynamicSheet1.open();
}

function VerImagen(identrada) {
	var datos="identrada="+identrada;
	var pagina = "ObtenerEntrada.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		success: function(datos){

			var respuesta=datos.respuesta[0];
			Imagen(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function Imagen(respuesta) {

	urlimagen=urlimagenes+`entradas/imagenes/`+codigoserv+respuesta.imagen;
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
		   							 	
		   							 			<figure class="overflow-hidden rounded-15 text-center">
								                    <img src="`+urlimagen+`" alt="" class="width-100 margin-left-auto margin-right-auto">
								                </figure>`;
								                if(respuesta.titulo!='' && respuesta.titulo!=null) {
								                html+=`<h5 class="margin-bottom" style="font-size:24px;">`+respuesta.titulo+`</h5>`;

								                }

								                if(respuesta.descripcion!='' && respuesta.descripcion!=null) {
								              html+=` <p class="text-muted">`+respuesta.descripcion+`</p>`;
								          			}
		   							
		   							 html+=`	</div>
	   							 	</div>
   							 </div>
		   				</div>
		                
		              </div>
		            </div>
		          </div>`;
	 var dynamicSheet2 = app.sheet.create({
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
function VerVideo(identrada) {
	var datos="identrada="+identrada;
	var pagina = "ObtenerEntrada.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		data:datos,
		success: function(datos){

			var respuesta=datos.respuesta[0];
			
			Video(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});

}

function Video(respuesta) {
		urlvideo=urlimagenes+`entradas/videos/`+codigoserv+respuesta.video;
		
		descripcion=respuesta.descripcion;
	  var myPhotoBrowserVideo = app.photoBrowser.create({
        photos: [
          {
            html: '<video width="320" height="240"   src="'+urlvideo+'" controls autoplay></video>',
            caption: descripcion
          }
         
        ],
       	theme: 'light',
        type: 'standalone',
        navbar:false,
        toolbar:false,
          on: {
          open: function (sheet) {
            $(".popup-close").text('Cerrar');
			//$('.navbar-bg').css('cssText','background-color:black!important');

           // $(".navbar-bg").css('','black');
          },

          close:function (argument) {
          	
          //	$('.navbar-bg').css('cssText','background-color:whitesmoke!important');

          }
     	 }
      });

     
     
    //  $('.pb-standalone-video').on('click', function () {
        myPhotoBrowserVideo.open();
     // });
    //})
}


function ObtenerConfiguracion() {
	
	var pagina = "ObtenerConfiguracion.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		async:false,
		success: function(datos){

			
			Colocar(datos.respuesta.nombrenegocio1,datos.respuesta.logo);


			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}

function Colocar(nombrenegocio,logo) {

	if (logo!='') {

		imagen=urlimagenes+'configuracion/imagenes/'+codigoserv+logo;
	}else{

		imagen=urlimagenlogo;
	}

	$(".imglogo").attr('src',imagen);

	$(".negocio").text(nombrenegocio);
}

function regresohome() {
	      var id_user=localStorage.getItem('id_user');

      var idtipousuario=localStorage.getItem('idtipousuario');
      var ruta="";
			if (id_user>0) {

                    if (idtipousuario==0) {
                        ruta='/homeadmin/';

                    }
                    if (idtipousuario==3) {
                       ruta='/home/';

                    }
                    if (idtipousuario==5) {
                       ruta='/homecoach/';

                    }



                  }else{

                  	  ruta='/login/';


                  }
                 
           $(".regreso").attr('href',ruta);


}

function ObtenerAlumnosSinServicio() {
	var idusuario=localStorage.getItem('id_user');
	var datos="idusuario="+idusuario;
	var pagina = "ObtenerAlumnosSinServicio.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){

			var respuesta=datos.respuesta;
			PintarAlumnosSinServicio(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
}


function PintarAlumnosSinServicio(respuesta) {
	
		var html="";

	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			urlimagen=urlimagendefault;
			htmlimg=`<i class="bi-person-fill" style="font-size: 40px;"></i>`;
			if (respuesta[i].foto!='' && respuesta[i].foto!=null) {

				urlimagen=urlphp+`upload/perfil/`+respuesta[i].foto;
			htmlimg=` <img src="`+urlimagen+`" alt=""  style="width:80px;height:60px;"/>`;
			}

			html+=`
				 <li class="list-item" onclick="VerdetalleUsuario(`+respuesta[i].idusuarios+`)">
                <div class="row">
                  <div class="col-30">
                    <div class="avatar  shadow rounded-10 ">
                    `+htmlimg+`
                    </div>
                  </div>
                  <div class="col-60">
                    <p class="text-color-theme no-margin-bottom">`+respuesta[i].nombre+` `+respuesta[i].paterno+`</p>
                    <p class="text-muted" style="opacity:0.6;" >Tipo usuario: `+respuesta[i].nombretipo+`</p>
                    `;
                   

                    html+=`
                  </div>
                  <div class="col-10">
                    <p class=""><i style="text-align: right;
    display: flex;
    justify-content: right;" class="bi bi-chevron-right"></i></p>
                    <p class="text-muted size-12"></p>
                  </div>
                </div>
              </li>

			`;
		}

		$$(".alumnosingreso").html(html);
	}else{


		html+=`
			

		`;

				$$(".alumnosingreso").html(html);

		}

}

function VerdetalleUsuario(idusuario) {
	
	localStorage.setItem('idusuario',idusuario);
	GoToPage('detalleUsuario');
}

function CambioEstatusTablero(idtableroanuncio) {
		var estatus=0;
				if ($("#cambio_"+idtableroanuncio).is(':checked')) {
					estatus=1;
				}
	var html=`
         
              <div class="block">
               <div class="row" style="">

                </div>

                <div class="row" style="padding-top:1em;">
                	<label style="font-size:16px;padding:1px;">¿Desea cambiar el estatus del anuncio?</label>
                	
                </div>
              </div>
           
         
        `;
       app.dialog.create({
          title: '',
          //text: 'Dialog with vertical buttons',
          content:html,
          buttons: [
            {
              text: 'NO',
            },
            {
              text: 'SI',
            },
            
          ],

           onClick: function (dialog, index) {
                    if(index === 0){

                    	if(estatus==1){
                    		$("#cambio_"+idtableroanuncio).prop('checked',false);
                    	}else{
                    		$("#cambio_"+idtableroanuncio).prop('checked',true);

                    	}
              
          }
          else if(index === 1){
              
              
			 
				var datos="estatus="+estatus+"&idtableroanuncio="+idtableroanuncio;
				var pagina = "CambioEstatusTablero.php";
				$.ajax({
					type: 'POST',
					dataType: 'json',
					url: urlphp+pagina,
					crossDomain: true,
					cache: false,
					data:datos,
					success: function(datos){

						//alerta('','Se realizó el cambio correctamente');

						},error: function(XMLHttpRequest, textStatus, errorThrown){ 
							var error;
							  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
							  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
											//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
						}
					});
              
            }
           },

          verticalButtons: false,
        }).open();
	
}


function CambioEstatusPublicidad(idpublicidad) {
	var estatus=0;
	if ($("#cambiopubli_"+idpublicidad).is(':checked')) {
		estatus=1;
	}


	var html=`
         
              <div class="block">
               <div class="row" style="">

                </div>

                <div class="row" style="padding-top:1em;">
                	<label style="font-size:16px;padding:1px;">¿Desea cambiar el estatus de la publicidad?</label>
                </div>
              </div>
           
         
        `;
       app.dialog.create({
          title: '',
          //text: 'Dialog with vertical buttons',
          content:html,
          buttons: [
            {
              text: 'NO',
            },
            {
              text: 'SI',
            },
            
          ],

           onClick: function (dialog, index) {
             if(index === 0){
              if (estatus==1) {
              	$("#cambiopubli_"+idpublicidad).prop('checked',false);
              }else{
              	$("#cambiopubli_"+idpublicidad).prop('checked',true);
     	
              }
          }
          else if(index === 1){
               var datos="estatus="+estatus+"&idpublicidad="+idpublicidad;
				var pagina = "CambioEstatusPublicidad.php";
				$.ajax({
					type: 'POST',
					dataType: 'json',
					url: urlphp+pagina,
					crossDomain: true,
					cache: false,
					data:datos,
					success: function(datos){

						//alerta('','Se realizó el cambio correctamente');

						},error: function(XMLHttpRequest, textStatus, errorThrown){ 
							var error;
							  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
							  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
											//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
								console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
						}
					});
              
            }
           },

          verticalButtons: false,
        }).open();
	
}

function CambiarEstatusEntrada(identrada) {
	var estatus=0;
	if ($("#cambioentra_"+identrada).is(':checked')) {
		estatus=1;
	}
	var html=`
         
              <div class="block">
               <div class="row" style="">

                </div>

                <div class="row" style="padding-top:1em;">
                	<label style="font-size:16px;padding:1px;">¿Desea cambiar el estatus del blog?</label>
                </div>
              </div>
           
         
        `;
       app.dialog.create({
          title: '',
          //text: 'Dialog with vertical buttons',
          content:html,
          buttons: [
            {
              text: 'NO',
            },
            {
              text: 'SI',
            },
            
          ],

           onClick: function (dialog, index) {
                    if(index === 0){

                 if (estatus==1) {
                 $("#cambioentra_"+identrada).prop('checked',false);	
                 }else{
                 $("#cambioentra_"+identrada).prop('checked',true);
                 }
              
          }
          else if(index === 1){
               
	var datos="estatus="+estatus+"&identrada="+identrada;
	var pagina = "CambioEstatusEntradas.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){

/*			alerta('','Se realizó el cambio correctamente');
*/
			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
              
            }
           },

          verticalButtons: false,
        }).open();
	

}


function Cargarperfilfoto(argument) {
	
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
			if (respuesta.foto!='') {

				localStorage.setItem('foto',respuesta.foto)

			}else{
						localStorage.setItem('foto','');

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

function DetalleServicioAsignado(idusuarios_servicios) {
	
	var pagina = "VerificarAceptacion.php";
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
			localStorage.setItem('idusuarios_servicios',idusuarios_servicios);

			var respuesta=datos.respuesta;
			if (respuesta==0) {

				GoToPage('aceptacionservicio');
 
			}else{

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

function DetalleServicioAsignadoCoach(idusuarios_servicios) {
			localStorage.setItem('idusuarios_servicios',idusuarios_servicios);

	GoToPage('detalleserviciocoach');
}

function ObtenerServiciosRegistrados() {

	var pagina = "ObtenerServicios.php";
	var estatus=0;
	var datos="estatus="+estatus;
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){

			var respuesta=datos.respuesta;
			var fechaactual=datos.fechaactual;
			PintarServiciosRegistrados2(respuesta,fechaactual);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});

}

function PintarServiciosRegistrados(respuesta) {
	
	var html="";

	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {

				var opacidad="";
			if (respuesta[i].fechaproxima=='') {
				opacidad="opacity:0.6;"
			}


			if (respuesta[i].imagen!='' && respuesta[i].imagen!=null  && respuesta[i].imagen!='null') {

				urlimagen=urlimagenes+`servicios/imagenes/`+codigoserv+respuesta[i].imagen;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:120px;height:80px;'+opacidad+'"/>';
			}else{

				urlimagen=urlimagendefaultservicio;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:120px;height:80px;'+opacidad+'"/>';
			}

			var clasecantidad="colorred";

			if (respuesta[i].cantidadalumnos!='' && respuesta[i].numeroparticipantesmax!='') {
				if (respuesta[i].cantidadalumnos==respuesta[i].numeroparticipantesmax) {
				clasecantidad="colorgreen";
				}	
			}else{

				respuesta[i].cantidadalumnos=0;
			}
			
			
			html+=`
			 <div class="list-item" style="background: white; margin: 1em;padding: 1em;border-radius: 10px;`+opacidad+`" >
                <div class="row">
                  <div class="col-30">
                  	<div class="">
                    <div class="avatar  shadow rounded-10 " style="    border-radius: 10px;
    padding: 0; margin: 0;" onclick="DetalleServicioAdmin(`+respuesta[i].idservicio+`)">
                    `+imagen+`
                    </div>
                    </div>
                  	<div class="row">`;

               if(respuesta[i].numeroparticipantesmax!='' && respuesta[i].cantidadalumnos!='') {

                 html+=`<p style="text-align:center;display:none;" class="`+clasecantidad+`">
                 <span>`+respuesta[i].cantidadalumnos+ ` </span>de<span> `+respuesta[i].numeroparticipantesmax+`</span>
                 </p>`;

             		}
                 html+=`</div>

                  </div>
                  <div class="col-70" >
                   <div class="row" style="margin-left: 0.4em;">

                    `;
                   var horarioshtml="";
                    	//for (var j = 0; j < horarios.length; j++) {
                    		if (respuesta[i].fechaproxima!='') {
                    		horarioshtml+=`<span>`+respuesta[i].fechaproxima+` `+respuesta[i].horainicial+` - `+respuesta[i].horafinal+` Hrs.</span></br>`;
                    		}

                    html+=`

                    <p class="text-color-theme size-12" style="text-align:center;font-weight:bold;`+opacidad+`" onclick="DetalleServicioAdmin(`+respuesta[i].idservicio+`)">`+horarioshtml+`</p>
                     <p class="text-color-theme size-12" style="text-align:center;`+opacidad+`" onclick="DetalleServicioAdmin(`+respuesta[i].idservicio+`)">`+respuesta[i].zonanombre+`</p>

 					<p class="text-muted no-margin-bottom"  style="text-align: center;opacity: 0.6;font-size: 12px;" onclick="DetalleServicioAdmin(`+respuesta[i].idservicio+`)">`+respuesta[i].titulo+`</p>
                  

                  </div>`;
                  if (respuesta[i].idcategoria>0) {
                 html+=` <div class="" style="margin-top:1em;width:100%;text-align:center;">
                  	<div class="" >
                  		<div class="avatar avatar-40 alert-primary text-color-blue rounded-circle iconos" style="`+opacidad+`" onclick="OpinionesServicioAdmin(`+respuesta[i].idservicio+`)"><i class="bi bi-chat-square-dots"></i></div>
                  	
                  	<div class="avatar avatar-40 alert-primary text-color-blue rounded-circle iconos" style="`+opacidad+`" onclick="ParticipantesServicio(`+respuesta[i].idservicio+`)"><i class="bi bi-chat-left-quote-fill"></i></div>

                  	</div>



                  
                  	`;
                 	



                  }

                  html+=`</div>

               	</div>
                  
                </div>
              </div>

			`;
		}

		$$(".serviciosregistrados").html(html);
	}else{


		html+=`
			

		`;

				$$(".serviciosregistrados").html(html);

		}




}

function PintarServiciosRegistrados2(respuesta,fechaactual) {
	var html="";
	if (respuesta.length>0) {

		var contadorpasado=0;
		for (var i = 0; i <respuesta.length; i++) {
			
			var imagen='';
			if (respuesta[i].imagen!='' && respuesta[i].imagen!=null && respuesta[i].imagen!='null') {

				urlimagen=urlimagenes+`servicios/imagenes/`+codigoserv+respuesta[i].imagen;
				imagen='<img src="'+urlimagen+'" alt=""  style="width: 100%;height: 70%;border-top-left-radius: 10px;border-top-right-radius: 10px;"/>';
			}else{

				urlimagen=urlimagendefaultservicio;
				imagen='<img src="'+urlimagen+'" alt=""  style="width: 100%;height: 70%;border-top-left-radius: 10px;border-top-right-radius: 10px;"/>';
			}


			var clasecantidad="colorred";

		if (respuesta[i].cantidadalumnos!='' && respuesta[i].numeroparticipantesmax!='') {
			
				if (respuesta[i].cantidadalumnos==respuesta[i].numeroparticipantesmax) {
				clasecantidad="colorgreen";
				
				}

			}

			var opacidad="";
			if (respuesta[i].fechaproxima=='') {
				opacidad="opacity:0.6;"
			}


			if (respuesta[i].porpasar==0 && contadorpasado==0) {


				html+=`<div class="row">
				<div class="linea"><span>Hoy `+fechaactual+`</span></div>

				</div>`;
				contadorpasado++;


			}
			var clasecomentario="vacio";
			var clasechat="vacio";
			var clasecalificacion="vacio";
			if (respuesta[i].concalificacion==1){
				clasecalificacion="convalor";
			}
			if (respuesta[i].conchat==1){
				clasechat="convalor";
			}
			if (respuesta[i].concomentarios==1) {
				clasecomentario="convalor";
			}

			var colocarnumero="";
              if(respuesta[i].numeroparticipantesmax=='' ) {
				respuesta[i].numeroparticipantesmax=0;
              }
               if(respuesta[i].numeroparticipantesmin=='' ) {
				respuesta[i].numeroparticipantesmin=0;
              }
                colocarnumero+=`<div style="text-align:center;`+opacidad+`" class="textoarribaizquierda `+clasecantidad+`">`;
						                 
                 colocarnumero+=`<span>`+respuesta[i].cantidadalumnos+ ` </span>de<span> `+respuesta[i].numeroparticipantesmax+`</span></div>`;
                  		
               



			html+=`
				 <div class="list-item"  style="background: white; margin: 1em;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;">
                <div class="row">
                  <div class="col-100" style="padding:0;" >
                     `+colocarnumero+`
                    <div class="" onclick="DetalleServicioAdmin(`+respuesta[i].idservicio+`)">`+imagen+`
                      
                    </div>
                   
                  </div>
                  </div>
                  <div class="row" style="height:10em;">
                  <div class="col-100" >
                   <div class="row" style="margin-top:.5em;">
                    `;
                  //  horarios=respuesta[i].horarios;
                    	var horarioshtml="";
                    	//for (var j = 0; j < horarios.length; j++) {
                    		if (respuesta[i].fechaproxima!='') {
                    		horarioshtml+=`<span style="color:black;font-size:18px;">`+respuesta[i].fechaproxima+` </span><br><span style="margin-top:.5em;font-size:16px;">`+respuesta[i].horainicial+` - `+respuesta[i].horafinal+` Hrs.</span>`;
                    		}
                    	//}

                    html+=`
                     <span class="text-color-theme size-12" style="text-align:center;font-weight:bold;" onclick="DetalleServicioAdmin(`+respuesta[i].idservicio+`)">`+horarioshtml+`</span>
                     <span class="text-color-theme size-12" style="text-align:center;" onclick="DetalleServicioAdmin(`+respuesta[i].idservicio+`)">`+respuesta[i].zonanombre+`</span>

 					<span class="text-muted no-margin-bottom"  style="text-align: center;opacity: 0.6;font-size: 12px;"  onclick="DetalleServicioAdmin(`+respuesta[i].idservicio+`)">`+respuesta[i].titulo+`</span>
                  

                  </div>
                  <div class="row" style="margin-top:1em;">
                  	<div class="col" style="text-align:center;" >`;


                   if (respuesta[i].idcategorias>0) {
               		  html+=` <div class="" style="width:100%;text-align:center;">
                  	<div class="" >
                  		<div class="avatar avatar-40 alert-primary text-color-blue rounded-circle `+clasecomentario+` iconos" style="`+opacidad+`" onclick="OpinionesServicioAdmin(`+respuesta[i].idservicio+`)"><i class="bi bi-chat-square-dots"></i></div>
                  	
                  	<div class="avatar avatar-40 alert-primary text-color-blue rounded-circle `+clasechat+` iconos" style="`+opacidad+`" onclick="ParticipantesServicio(`+respuesta[i].idservicio+`)"><i class="bi bi-chat-left-quote-fill"></i></div>

                  	</div>
   
                  	`;
               
                  }
                  	html+=`</div>
                  
                                  
                  </div>

               	</div>
                  
                </div>
              </div>
              </div>
              </div>

			`;




		}

		$$(".serviciosregistrados").html(html);


	}else{


		html+=`
		
		`;
		$$(".serviciosregistrados").html(html);

		}

}

function DetalleServicioAdmin(idservicio) {
	localStorage.setItem('idservicio',idservicio);
	GoToPage('detalleservicioadmin');
}

function ContarNuevasSolicitudes() {

 	var pagina = "ObtenerNuevasSolicitudes.php";
	
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		success: function(datos){

			var respuesta=datos.respuesta;
			PintarServiciosRegistrados(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
 }

 function ServiciosActivos() {
 	GoToPage('serviciosactivos');
 }
 function ServiciosActivosCoach() {
 	GoToPage('serviciosactivoscoach');
 }

function MostrarBotonServiciosActivos() {
	var pagina = "ObtenerServiciosActivos.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user;

	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(res){
			console.log(datos);
			var respuesta=res.respuesta;

			if (respuesta.length>0) {

				$(".divserviciosactivos").css('display','block');
		
			}else{
			
				$(".divserviciosactivos").css('display','none');


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


function MostrarBotonServiciosActivosCoach() {
	var pagina = "ObtenerServiciosActivosCoach.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user;

	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(res){
			console.log(datos);
			var respuesta=res.respuesta;

			if (respuesta.length>0) {

				$(".divserviciosactivos").css('display','block');
		
			}else{
			
				$(".divserviciosactivos").css('display','none');


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

function ObtenerServiciosActivos() {
	var pagina = "ObtenerServiciosActivos.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user;

	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(res){
			console.log(datos);
			var respuesta=res.respuesta;
			var fechaactual=res.fechaactual;
			if (respuesta.length>0) {

			PintarServicioActivos2(respuesta,fechaactual);
		
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

function PintarServicioActivos(respuesta) {
	
	var html="";

	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {

				var opacidad="";
			if (respuesta[i].disponible==0) {
				opacidad="opacity:0.6;"
			}

			if (respuesta[i].imagen!='' && respuesta[i].imagen!=null && respuesta[i].imagen!='null') {

				urlimagen=urlimagenes+`servicios/imagenes/`+codigoserv+respuesta[i].imagen;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:120px;height:80px;'+opacidad+'"/>';
			}else{

				urlimagen=urlimagendefaultservicio;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:120px;height:80px;'+opacidad+'"/>';
			}

			var clasecantidad="colorred";

			if (respuesta[i].cantidadalumnos!='' && respuesta[i].numeroparticipantesmax!='') {
				if (respuesta[i].cantidadalumnos==respuesta[i].numeroparticipantesmax) {
				clasecantidad="colorgreen";
				}	
			}else{

				respuesta[i].cantidadalumnos=0;
			}
			
			
			html+=`
			 <div class="list-item" style="background: white; margin: 1em;padding: 1em;border-radius: 10px;`+opacidad+`" >
                <div class="row">
                  <div class="col-30">
                  	<div class="">
                    <div class="avatar  shadow rounded-10 " style="    border-radius: 10px;
    padding: 0; margin: 0;" onclick="DetalleServicioActivo(`+respuesta[i].idservicio+`)">
                    `+imagen+`
                    </div>
                    </div>
                  	<div class="row">`;

              
                 html+=`</div>

                  </div>
                  <div class="col-70" >
                   <div class="row" style="margin-left: 0.4em;">

                    `;
                   var horarioshtml="";
                    	//for (var j = 0; j < horarios.length; j++) {
                    	/*	if (respuesta[i].fechaproxima!='') {
                    		horarioshtml+=`<span>`+respuesta[i].fechaproxima+` `+respuesta[i].horainicial+` - `+respuesta[i].horafinal+` Hrs.</span></br>`;
                    		}*/

                    html+=`
 					<p class="text-muted no-margin-bottom"  style="text-align: center;opacity: 0.6;font-size: 12px;" onclick="DetalleServicioActivo(`+respuesta[i].idservicio+`)">`+respuesta[i].titulo+`</p>
                 
 					<p class="text-muted no-margin-bottom"  style="text-align: center;opacity: 0.6;font-size: 12px;" onclick="DetalleServicioActivo(`+respuesta[i].idservicio+`)">`+respuesta[i].fechai+` `+respuesta[i].fechaf +`</p>

                  </div>`;
                

                  html+=`</div>

               	</div>
                  
                </div>
              </div>

			`;
		}

		$$(".serviciosactivos").html(html);
	}else{


		html+=`
			

		`;

		$$(".serviciosactivos").html(html);

		}



}

function PintarServicioActivos2(respuesta,fechaactual) {
	
	
	var html="";

	if (respuesta.length>0) {
		var contadorpasado=0;
		for (var i = 0; i <respuesta.length; i++) {
			
			var imagen='';
			if (respuesta[i].imagen!='' && respuesta[i].imagen!=null && respuesta[i].imagen!='null') {

				urlimagen=urlimagenes+`servicios/imagenes/`+codigoserv+respuesta[i].imagen;
				imagen='<img src="'+urlimagen+'" alt=""  style="width: 100%;height: 70%;border-top-left-radius: 10px;border-top-right-radius: 10px;"/>';
			}else{

				urlimagen=urlimagendefaultservicio;
				imagen='<img src="'+urlimagen+'" alt=""  style="width: 100%;height: 70%;border-top-left-radius: 10px;border-top-right-radius: 10px;"/>';
			}


			var clasecantidad="colorred";

		if (respuesta[i].cantidadalumnos!='' && respuesta[i].numeroparticipantesmax!='') {
			
				if (respuesta[i].cantidadalumnos==respuesta[i].numeroparticipantesmax) {
				clasecantidad="colorgreen";
				
				}

			}

			var opacidad="";
			if (respuesta[i].fechaproxima=='') {
				opacidad="opacity:0.6;"
			}


			if (respuesta[i].porpasar==0 && contadorpasado==0) {


				html+=`<div class="row">
				<div class="linea"><span>Hoy `+fechaactual+`</span></div>

				</div>`;
				contadorpasado++;


			}
			var clasecomentario="vacio";
			var clasechat="vacio";
			var clasecalificacion="vacio";
			if (respuesta[i].concalificacion==1){
				clasecalificacion="convalor";
			}
			if (respuesta[i].conchat==1){
				clasechat="convalor";
			}
			if (respuesta[i].concomentarios==1) {
				clasecomentario="convalor";
			}

			var colocarnumero="";
              if(respuesta[i].numeroparticipantesmax=='' ) {
				respuesta[i].numeroparticipantesmax=0;
              }
               if(respuesta[i].numeroparticipantesmin=='' ) {
				respuesta[i].numeroparticipantesmin=0;
              }
               /* colocarnumero+=`<div style="text-align:center;`+opacidad+`" class="textoarribaizquierda `+clasecantidad+`">`;
						                 
                 colocarnumero+=`<span>`+respuesta[i].cantidadalumnos+ ` </span>de<span> `+respuesta[i].numeroparticipantesmax+`</span></div>`;
                  	*/	
               



			html+=`
				 <div class="list-item"  style="background: white; margin: 1em;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;">
                <div class="row">
                  <div class="col-100" style="padding:0;" >
                     `+colocarnumero+`
                    <div class="" onclick="DetalleServicioActivo(`+respuesta[i].idservicio+`)">`+imagen+`
                      
                    </div>
                   
                  </div>
                  </div>
                  <div class="row" style="height:10em;">
                  <div class="col-100" >
                   <div class="row" style="margin-top:.5em;">
                    `;
                    	var horarioshtml="";
                    		if (respuesta[i].fechaproxima!='') {
                    		horarioshtml+=`<span style="color:black;font-size:18px;">`+respuesta[i].fechaproxima+` </span><br><span style="margin-top:.5em;font-size:16px;">`+respuesta[i].horainicial+` - `+respuesta[i].horafinal+` Hrs.</span>`;
                    		}

                    html+=`
                     <span class="text-color-theme size-12" style="text-align:center;font-weight:bold;" onclick="DetalleServicioActivo(`+respuesta[i].idservicio+`)">`+horarioshtml+`</span>
                     <span class="text-color-theme size-12" style="text-align:center;" onclick="DetalleServicioActivo(`+respuesta[i].idservicio+`)">`+respuesta[i].zonanombre+`</span>

 					<span class="text-muted no-margin-bottom"  style="text-align: center;opacity: 0.6;font-size: 12px;"  onclick="DetalleServicioActivo(`+respuesta[i].idservicio+`)">`+respuesta[i].titulo+`</span>
                  

                  </div>
                  <div class="row" style="margin-top:1em;">
                  	<div class="col" style="text-align:center;" >`;

/*
                  	html+=`<div class="avatar avatar-40 alert-primary text-color-blue rounded-circle iconos `+clasecomentario+`" onclick="OpinionesServicio(`+respuesta[i].idusuarios_servicios+`)"><i class="bi bi-chat-square-dots"></i></div>`;
                    html+=`	<div class="avatar avatar-40 alert-primary text-color-blue rounded-circle iconos `+clasechat+`" onclick="ParticipantesServicio(`+respuesta[i].idusuarios_servicios+`)"><i class="bi bi-chat-left-quote-fill"></i></div>`;
                  	html+=`	<div class="avatar avatar-40 alert-primary text-color-blue rounded-circle iconos `+clasecalificacion+`" onclick="AbirCalificarServicio(`+respuesta[i].idusuarios_servicios+`)"><i class="bi bi-star"></i></div>`;
*/

                  	html+=`</div>
                  
                                  

                  </div>

               	</div>
                  
                </div>
              </div>
              </div>
              </div>

			`;




		}

		$$(".serviciosactivos").html(html);
	}else{


		html+=`
			 <div class="list-item">
                <div class="row text-color-theme">
                  <h4 style="text-align:center;">En breve el administrador te asignará tus servicios</h4>
                </div>
              </div>


		`;

				$$(".serviciosactivos").html(html);

	}
}

function DetalleServicioActivo(idservicio) {
	localStorage.setItem('idservicio',idservicio);
	GoToPage('detalleservicioactivo');
}

function DetalleServicioActivoCoach(idservicio) {
	localStorage.setItem('idservicio',idservicio);
	GoToPage('detalleservicioactivocoach');
}

  /*
 function ContarImagenesGaleria() {
 	var pagina = "ObtenerNuevasImagenes.php";
	
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		success: function(datos){

			var respuesta=datos.respuesta;
			PintarServiciosRegistrados(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
 } 

function ContarNuevasPromociones() {
 	var pagina = "ObtenerNuevasImagenes.php";
	
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		success: function(datos){

			var respuesta=datos.respuesta;
			PintarServiciosRegistrados(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
				  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}
		});
 } 
*/


function ObtenerServiciosActivosCoach() {
	var pagina = "ObtenerServiciosActivosCoach.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user;

	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(res){
			console.log(datos);
			var respuesta=res.respuesta;

			if (respuesta.length>0) {
				var fechaactual=res.fechaactual;
				
			PintarServicioActivosCoach2(respuesta,fechaactual);
		
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

function PintarServicioActivosCoach(respuesta) {
	
	var html="";

	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {

				var opacidad="";
			if (respuesta[i].disponible==0) {
				opacidad="opacity:0.6;"
			}

			if (respuesta[i].imagen!='' && respuesta[i].imagen!=null) {

				urlimagen=urlimagenes+`servicios/imagenes/`+codigoserv+respuesta[i].imagen;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:120px;height:80px;'+opacidad+'"/>';
			}else{

				urlimagen=urlimagendefaultservicio;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:120px;height:80px;'+opacidad+'"/>';
			}

			var clasecantidad="colorred";

			if (respuesta[i].cantidadalumnos!='' && respuesta[i].numeroparticipantesmax!='') {
				if (respuesta[i].cantidadalumnos==respuesta[i].numeroparticipantesmax) {
				clasecantidad="colorgreen";
				}	
			}else{

				respuesta[i].cantidadalumnos=0;
			}
			
			
			html+=`
			 <div class="list-item" style="background: white; margin: 1em;padding: 1em;border-radius: 10px;`+opacidad+`" >
                <div class="row">
                  <div class="col-30">
                  	<div class="">
                    <div class="avatar  shadow rounded-10 " style="    border-radius: 10px;
    padding: 0; margin: 0;" onclick="DetalleServicioActivoCoach(`+respuesta[i].idservicio+`)">
                    `+imagen+`
                    </div>
                    </div>
                  	<div class="row">`;

              
                 html+=`</div>

                  </div>
                  <div class="col-70" >
                   <div class="row" style="margin-left: 0.4em;">

                    `;
                   var horarioshtml="";
                    	//for (var j = 0; j < horarios.length; j++) {
                    	/*	if (respuesta[i].fechaproxima!='') {
                    		horarioshtml+=`<span>`+respuesta[i].fechaproxima+` `+respuesta[i].horainicial+` - `+respuesta[i].horafinal+` Hrs.</span></br>`;
                    		}*/

                    html+=`
 					<p class="text-muted no-margin-bottom"  style="text-align: center;opacity: 0.6;font-size: 12px;" onclick="DetalleServicioActivoCoach(`+respuesta[i].idservicio+`)">`+respuesta[i].titulo+`</p>
                 
 					<p class="text-muted no-margin-bottom"  style="text-align: center;opacity: 0.6;font-size: 12px;" onclick="DetalleServicioActivoCoach(`+respuesta[i].idservicio+`)">`+respuesta[i].fechai+` `+respuesta[i].fechaf +`</p>

                  </div>`;
                

                  html+=`</div>

               	</div>
                  
                </div>
              </div>

			`;
		}

		$$(".serviciosactivos").html(html);
	}else{


		html+=``;

		$$(".serviciosactivos").html(html);

		}



}

function PintarServicioActivosCoach2(respuesta,fechaactual) {
	var html="";
	if (respuesta.length>0) {
		var contadorpasado=0;
		for (var i = 0; i <respuesta.length; i++) {
			
			var imagen='';
			if (respuesta[i].imagen!='' && respuesta[i].imagen!=null && respuesta[i].imagen!='null') {

				urlimagen=urlimagenes+`servicios/imagenes/`+codigoserv+respuesta[i].imagen;
				imagen='<img src="'+urlimagen+'" alt=""  style="width: 100%;height: 70%;border-top-left-radius: 10px;border-top-right-radius: 10px;"/>';
			}else{

				urlimagen=urlimagendefaultservicio;
				imagen='<img src="'+urlimagen+'" alt=""  style="width: 100%;height: 70%;border-top-left-radius: 10px;border-top-right-radius: 10px;"/>';
			}


			var clasecantidad="colorred";

		if (respuesta[i].cantidadalumnos!='' && respuesta[i].numeroparticipantesmax!='') {
			
				if (respuesta[i].cantidadalumnos==respuesta[i].numeroparticipantesmax) {
				clasecantidad="colorgreen";
				
				}

			}

			var opacidad="";
			if (respuesta[i].fechaproxima=='') {
				opacidad="opacity:0.6;"
			}


			if (respuesta[i].porpasar==0 && contadorpasado==0) {


				html+=`<div class="row">
				<div class="linea"><span>Hoy `+fechaactual+`</span></div>

				</div>`;
				contadorpasado++;


			}
			var clasecomentario="vacio";
			var clasechat="vacio";
			var clasecalificacion="vacio";
			if (respuesta[i].concalificacion==1){
				clasecalificacion="convalor";
			}
			if (respuesta[i].conchat==1){
				clasechat="convalor";
			}
			if (respuesta[i].concomentarios==1) {
				clasecomentario="convalor";
			}

			var colocarnumero="";
              if(respuesta[i].numeroparticipantesmax=='' ) {
				respuesta[i].numeroparticipantesmax=0;
              }
               if(respuesta[i].numeroparticipantesmin=='' ) {
				respuesta[i].numeroparticipantesmin=0;
              }
                colocarnumero+=`<div style="text-align:center;`+opacidad+`" class="textoarribaizquierda `+clasecantidad+`">`;
						                 
                 colocarnumero+=`<span>`+respuesta[i].cantidadalumnos+ ` </span>de<span> `+respuesta[i].numeroparticipantesmax+`</span></div>`;
                  		
               



			html+=`
				 <div class="list-item"  style="background: white; margin: 1em;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;">
                <div class="row">
                  <div class="col-100" style="padding:0;" >
                     `+colocarnumero+`
                    <div class="" onclick="DetalleServicioActivoCoach(`+respuesta[i].idservicio+`)">`+imagen+`
                      
                    </div>
                   
                  </div>
                  </div>
                  <div class="row" style="height:10em;">
                  <div class="col-100" >
                   <div class="row" style="margin-top:.5em;">
                    `;
                    	var horarioshtml="";
                    		if (respuesta[i].fechaproxima!='') {
                    		horarioshtml+=`<span style="color:black;font-size:18px;">`+respuesta[i].fechaproxima+` </span><br><span style="margin-top:.5em;font-size:16px;">`+respuesta[i].horainicial+` - `+respuesta[i].horafinal+` Hrs.</span>`;
                    		}

                    html+=`
                     <span class="text-color-theme size-12" style="text-align:center;font-weight:bold;" onclick="DetalleServicioActivoCoach(`+respuesta[i].idservicio+`)">`+horarioshtml+`</span>
                     <span class="text-color-theme size-12" style="text-align:center;" onclick="DetalleServicioActivoCoach(`+respuesta[i].idservicio+`)">`+respuesta[i].zonanombre+`</span>
 					<span class="text-muted no-margin-bottom"  style="text-align: center;opacity: 0.6;font-size: 12px;"  onclick="DetalleServicioActivoCoach(`+respuesta[i].idservicio+`)">`+respuesta[i].titulo+`</span>
                  

                  </div>
                  <div class="row" style="margin-top:1em;">
                  	<div class="col" style="text-align:center;" >`;



                  	html+=`</div>
                  
                                  

                  </div>

               	</div>
                  
                </div>
              </div>
              </div>
              </div>

			`;




		}
		$$(".serviciosactivos").html(html);
		}else{


		html+=``;

		$$(".serviciosactivos").html(html);

		}

}
