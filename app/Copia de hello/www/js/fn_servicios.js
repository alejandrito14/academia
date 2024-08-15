var asignacionperiodos=[];
var meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
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
		                                <img src="`+imagen+`" alt=""  style="width:100%;border-radius:10px;"/>
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
			
			var respuesta=datos.respuesta[0];
			var imagen=respuesta.imagen;
			var horarios=datos.horarios;
			var idservicio=respuesta.idservicio;
			var habilitarcancelacion=datos.habilitarcancelacion;
			var horarios=datos.horarios;
			var cantidadhorarios=horarios.length;
			var calificacion=datos.calificacion;
			var opiniones=datos.opiniones;

			if (calificacion.length>0) {
				$(".divcalificaciones").addClass('iconos');
			}
			if (opiniones.length>0) {
				$(".divopiniones").addClass('iconos');
			}
			$(".cantidadhorarios").text(cantidadhorarios);
			localStorage.setItem('idservicio',idservicio);
			ObtenerImagenesGrupalServicio();
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
			if(localStorage.getItem('idtipousuario')==3) {
				if(respuesta.abiertocliente == 1) {
				$("#permisoasignaralumno").css('display','block');
				}
			}					
		$(".habilitareliminacion").css('display','none');


		if(localStorage.getItem('idtipousuario')==5) {

				if(respuesta.abiertocoach == 1) {
					$("#permisoasignaralumno").css('display','block');
					$(".habilitareliminacion").css('display','block');
				}
			}
	if(localStorage.getItem('idtipousuario')==0) {
	
			if(respuesta.abiertoadmin == 1) {
				$("#permisoasignaralumno").css('display','block');
				$(".habilitareliminacion").css('display','block');

			}
		}
			
			if(respuesta.controlasistencia==1) {
				
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


function ImagenesInformativas() {
	GoToPage('imagenesinformativas');
}

function ObtenerImagenesInformativas() {

	var idusuarios_servicios=localStorage.getItem('idusuarios_servicios');
	var pagina = "ObtenerImagenesInformativas.php";
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
			var imagenesinformativas=datos.imagenesinformativas;
			PintarImagenesinformativas(imagenesinformativas);

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});

}
var imagenesinformativas=[];
function PintarImagenesinformativas(respuesta) {
	var html="";
	if (respuesta.length>0) {
		imagenesinformativas=respuesta;
		for (var i = 0; i <respuesta.length; i++) {
			var imagen="";
		imagen=urlimagenes+`servicios/imagenesinformativas/`+codigoserv+respuesta[i].imagen;

		classe="";
		if (i==0) {
			classe="swiper-slide-active";
		}

	

		html+=`
		  <div class="swiper-slide `+classe+`" role="group"   style="    padding: 0;
    margin: 0; "  id="slider_`+i+`">

    <div class="textolandig">
             	 <div class="">
             		 <div class="">`

      
             html+=` </div>
              		<div class="">
              <div class="">`;
              if (respuesta[i].tituloimagen!='') {
              	html+=`<h1 class="text-color-theme margin-bottom" style="font-size:30px;">
             `+respuesta[i].tituloimagen+`
             </h1>`;

              }
              

             html+=  `</div>
   			 <div onclick="AbrirImagen(`+i+`)">
              <img class="row h-100" src="`+imagen+`" style="height:100%;width:100%;"/>
				</div>
              
                         </div>
                        </div>
                       </div>
                     </div>

          </div>

		`;

		}

		$("#swiper-wrapper-imagenes").html(html);

			 var swiper = new Swiper('.swiper-imagenes', {

				      pagination: {
				        el: '.swiper-pagination',
				       dynamicBullets:true,
				      },
				     /* slideToClickedSlide: true,
				      lazyLoading:true,*/
				   		

				    });

	}
}


function AbrirImagen(posicion) {

		var nombre=imagenesinformativas[posicion].imagen;
		imagen=urlimagenes+`servicios/imagenesinformativas/`+codigoserv+nombre;

	   var myPhotoBrowser = app.photoBrowser.create({
       
        photos: [
         imagen
            ]
      });
      //Open photo browser on click
      myPhotoBrowser.open();
      $(".popup-close").text('Cerrar');
     $(".popup-close").css('margin-top','100px');
}



function CancelarServicio() {
		app.dialog.confirm('','¿Seguro que desea cancelar el servicio?' , function () {

	var idusuarios_servicios=localStorage.getItem('idusuarios_servicios');
	var pagina = "CancelarServicio.php";
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

			if (resp.respuesta==1) {
				alerta('','Se ha cancelado el servicio');
				GoToPage('serviciosasignados');

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


function PantallaCancelarServicio() {
	GoToPage('cancelacionservicio');
}


function ObtenerParticipantesAlumnosCancelacion() {
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

			PintarParticipantesAlumnosCancela(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}
function PintarParticipantesAlumnosCancela(respuesta) {
	
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i < respuesta.length; i++) {
			if (respuesta[i].foto!='' && respuesta[i].foto!=null && respuesta[i].foto!='null') {

				urlimagen=urlphp+`upload/perfil/`+respuesta[i].foto;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;height:80px;"/>';
			}else{

			if (respuesta[i].sexo=='M') {
					urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarmujer');
	
				}else{
					urlimagen=urlphp+`imagenesapp/`+localStorage.getItem('avatarhombre');
		
				}

				//urlimagen="img/icon-usuario.png";
				imagen='<img src="'+urlimagen+'" alt=""  style="width:80px;height:80px;"/>';
			}
			html+=`
				  

                <li style="background: white;
    border-radius: 10px;margin-bottom: 1em;">
            <label class="label-radio item-content">                                                                               
              <div class="item-inner" style="width:90%;">
             
                <div class="row">
                <div class="row">
              		  <div class="col-20">
                        <figure class="avatar   rounded-10">
                        <img src="`+urlimagen+`" alt="" style="width:40px;height:40px;" />
                        </figure>
                        </div>
                        
                    <div class="col-60">
                        <div class="col-100 item-text" style="font-size:18px;" id="participante_`+respuesta[i].idusuarios+`">`+respuesta[i].nombre+` `+respuesta[i].paterno+`
             		   	</div>
             		   <div class="row">
	             		     <div class="col-100 item-text" style="font-size:18px;" id="correo_`+respuesta[i].idusuarios+`">`+respuesta[i].usuario+`
							 </div>
             		   </div>
             		   <div class="row">
                        	  <div class="item-text">`+respuesta[i].nombretipo+`</div>
                    		  </div>
                        </div>

                    <div class="col-10">`;
                    var disabled='';
                    if (respuesta[i].pagado==0) {
                    	disabled='disabled';
                    }

					html+=`<input type="checkbox" name="my-opcion" class="idusuariosasistencia" id="idusuarios_`+respuesta[i].idusuarios+`" style="height:20px;width:20px;" onchange="VerificarSeleccion()"  `+disabled+`> `;                 	
                 

                  html+=`</div>
                        	
                     </div>
               
             		 
              </div>

            </label>
          </li>


			`;
		}

				
			}

	$("#divalumnoscancelacion").html(html);

}

function GuardarCancelarServicio() {
	
	var idusuarioscancela=[];
	var idusuariosnocancela=[];
	$(".idusuariosasistencia" ).each(function( index ) {
	  	var id=$(this).attr('id');
	   	var dividir=id.split('_');
	   if($(this).is(':checked')){
	   
	   	idusuarioscancela.push(dividir[1]);
	   	
	   }else{

	   	idusuariosnocancela.push(dividir[1]);
	   }
	});

	var id_user=localStorage.getItem('id_user');
	var idservicio=localStorage.getItem('idservicio');
	var fechaasistencia=localStorage.getItem('fechaasistencia');
	var datos="id_user="+id_user+"&idusuarioscancela="+idusuarioscancela+"&idusuariosnocancela="+idusuariosnocancela+"&fecha="+fechaasistencia+"&idservicio="+idservicio;
app.dialog.confirm('','¿Seguro que desea cancelar el servicio a los usuarios seleccionados?' , function () {

	var pagina="GuardarMultiCancelacion.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			
			alerta('','Se guardaron datos existosamente');
			ObtenerParticipantesAlumnosCancelacion();

			if (datos.respuesta==1) {
				if (localStorage.getItem('idtipousuario')==5){
				      GoToPage('detalleserviciocoach');
				   }
			  	 if (localStorage.getItem('idtipousuario')==0){
			      	 GoToPage('detalleservicioadmin');
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

function ObtenerServicioNuevo(valor) {
			

	var pagina = "ObtenerServicioNuevo.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user+"&idservicio="+valor;
	
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
 		var encontropago=datos.encontropago;
		var respuesta=datos.respuesta;
		var idcategoriaservicio=respuesta.idcategoriaservicio;
		var idservicio=respuesta.idservicio;
		var idcategoria=respuesta.idcategoria;
		var titulo=respuesta.titulo;
		var descripcion=respuesta.descripcion;
		var politicasaceptacion=respuesta.politicasaceptacion;
		var estatus=respuesta.estatus;
		var tiporeembolso=respuesta.tiporeembolso;
		var idpoliticaaceptacion=respuesta.idpoliticaaceptacion;
		var tiempoaviso=respuesta.tiempoaviso;
		var tituloaviso=respuesta.tituloaviso;
		var aceptarserviciopago=respuesta.aceptarserviciopago;
		$("#v_tiempoaviso").val(tiempoaviso);
		$("#v_tituloaviso").val(tituloaviso);
		//$("#v_estatus").val(estatus);
 	
		if (estatus==1) {
			$("#v_estatus").prop('checked',true);
		}else{
		$("#v_estatus").prop('checked',false);
	
		}
		var imagenservicio=respuesta.imagen;

		if (imagenservicio!=null && imagenservicio!='null' && imagenservicio!='') {
			 $(".imglogoimagenservicio").attr('src',urlimagenes+"servicios/imagenes/"+codigoserv+'/'+imagenservicio);
			localStorage.setItem("fotoimagenservicio",imagenservicio);


			    }else{
			 $(".imglogoimagenservicio").attr('src',urlimagendefaultservicio);

			    }
		$("#v_titulo").val(titulo);
		$("#v_descripcion").val(descripcion);
		 var lunes= respuesta.lunes;
		var martes=respuesta.martes;
		var miercoles=respuesta.miercoles;
		var jueves=respuesta.jueves;
		var viernes=respuesta.viernes;
		var sabado=respuesta.sabado;
		var domingo=respuesta.domingo;
		ObtenerTipoServicios(idcategoriaservicio);

		//ObtenerTipoServicios(idcategoriaservicio);
		//ObtenerCategoriaServicios(idcategoria);
		$("#v_categoria").val(idcategoriaservicio);
		$("#v_categoriaservicio").val(idcategoria);
	 var demo = new Promise((resolve, reject) => {
	 resolve(ObtenerCategoriaServicios(idcategoria));
      
    });
	 demo.then(()=>{
   	SeleccionarCategoriaNuevo2(idcategoriaservicio,valor,lunes,martes,miercoles,jueves,viernes,sabado,domingo);
		 ObtenerEncuestas(idservicio);


		 var modalidad=respuesta.modalidad;
		 ValidarCheckmodalidad(modalidad);

		 if (modalidad==1) {
		 	 $("#v_individual").attr('checked',true);

		 	 if (aceptarserviciopago==1) {
		 	 	$("#v_aceptarserviciopago").val(1);
		 	 	$("#v_aceptarserviciopago").attr('checked',true);

		 	 }
		 }

		 if (modalidad==2) {

		 	 $("#v_grupal").attr('checked',true);
		 	 $("#v_aceptarserviciopago").attr('checked',false);
		 	 $("#v_aceptarserviciopago").val(0);

		 }




		 
		 var numparticipantes=respuesta.numeroparticipantes;
		 var numparticipantesmax=respuesta.numeroparticipantesmax;

		//var totalclases='<?php echo $totalclases; ?>';
		//var montopagarparticipante='<?php echo $montopagarparticipante; ?>';
		//var montopagargrupo	='<?php echo $montopagargrupo ?>';
		var precio	=respuesta.precio;
		//$("#v_totalclase").val(totalclases);

		$("#v_costo").prop("type", "text");
		$("#v_costo").val(precio);
		$("#v_costo").prop("type", "number");

	

		//$("#v_montopagarparticipante").val(montopagarparticipante);
		//$("#v_montopagargrupo").val(montopagargrupo);
		$("#v_numparticipantesmin").val(numparticipantes);
		$("#v_numparticipantesmax").val(numparticipantesmax);

		var modalidadpago=respuesta.modalidadpago;
		//var periodo='<?php echo $periodo; ?>';

		 if (modalidadpago==1) {
		 	 $("#v_habilitarevento").attr('checked',true);
		 	 $("#v_periodo").val(0);
		 }

		 if (modalidadpago==2) {
		 	 $("#v_habilitarperiodo").attr('checked',true);
		 	 $("#v_periodo").val(periodo);
		 }


		
		

		var fechainicial=respuesta.fechainicial; 
		var fechafinal=respuesta.fechafinal;
		
		$("#v_fechainicial").val(fechainicial);
		$("#v_fechafinal").val(fechafinal);
		$("#v_politicasaceptacion").val(politicasaceptacion);
		$("#v_politicaaceptacionseleccion").val(idpoliticaaceptacion);
		SeleccionarPolitica();
		ObtenerHorariosSemana(idservicio);
		//ObtenerHorariosServicioComprobacion(idservicio);
		ObtenerPeriodos(idservicio);
		ObtenerCoachesServicio(idservicio);
		
	abiertocliente=respuesta.abiertocliente;
	abiertocoach=respuesta.abiertocoach;
	abiertoadmin=respuesta.abiertoadmin;
	ligarcliente=respuesta.ligarcliente;
	reembolso=respuesta.reembolso; 
	asistencia=respuesta.controlasistencia;
	//cantidadreembolso='<?php echo $cantidadreembolso; ?>';
	asignadocliente=respuesta.asignadocliente;
	asignadocoach=respuesta.asignadocoach;
	asignadoadmin=respuesta.asignadoadmin;
	cancelado=respuesta.canceladoservicio;
	/*tiempoaviso='<?php echo $tiempoaviso; ?>';
	tituloaviso='<?php echo $tituloaviso; ?>';
	descripcionaviso='<?php echo $descripcionaviso; ?>';
	politicasca='<?php echo $politicasca; ?>';*/

		if (abiertocliente==1) {
			$("#v_abiertocliente").attr('checked',true);
		}

		if (abiertocoach==1) {
			$("#v_abiertocoach").attr('checked',true);
		}
		if (abiertoadmin==1) {

			$("#v_abiertoadmin").attr('checked',true);
		}

		if (ligarcliente==1) {
			
			$("#v_ligarclientes").attr('checked',true);
			Permitirligar();
		}

		if (reembolso==1) {
			
			$("#v_reembolso").attr('checked',true);
			HabilitarcantidadReembolso();
		}

		if (asignadocliente==1) {
			
			$("#v_asignadocliente").attr('checked',true);
		}

		if (asignadoadmin==1) {
			
			$("#v_asignadoadmin").attr('checked',true);
		}
		if (asignadocoach==1) {
			
			$("#v_asignadocoach").attr('checked',true);
		}

		if (asistencia==1) {
		$("#v_asistencia").attr('checked',true);
	
		}

		if (localStorage.getItem('idtipousuario')==0) {
			$("#contentestatus").css('display','block');
		}

		 if (localStorage.getItem('idtipousuario')==0) {
		 	if (cancelado==0) {

		 	  $("#btncancelar").css('display','block');
	
		 	}

     	 }

     	 if (cancelado==1) {
     	 	$("#btncancelarservicio").css('display','none');
     	 	$("#btnguardarservicio").css('display','none');
     	 }

		$("#cantidadhorarios").text(arraydiaselegidos.length);

			if (encontropago>0) {

				$("#v_fechainicial").attr('disabled',true);
				$("#v_fechafinal").attr('disabled',true);
				$("#btnaplicar").attr('disabled',true);
				$(".btneliminarhorario").css('display','none');
			}
		  }
    );

demo.then(()=>{
		ObtenerHorariosCategoria2(idcategoria,idcategoriaservicio,valor,lunes,martes,miercoles,jueves,viernes,sabado,domingo);


});
	//	Permitirligar();
		//HabilitarcantidadReembolso();

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}

function ObtenerServicioAReplicar(valor) {
	var pagina = "ObtenerServicioNuevo.php";
	var id_user=localStorage.getItem('id_user');
	var datos="id_user="+id_user+"&idservicio="+valor;
	 var serviciosreplica=$("#serviciosreplica").val();
		  if (serviciosreplica>0) {
		  		$(".regreso").attr('onclick','ModalPregunta()');
				$(".divimagen").css('display','block');
				$(".divinformacion").css('display','block');
			  }else{
		     regresohome();
		}

	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){



 		arraydiaselegidos=[];
 		arraydiaseleccionados=[];
 		$("#selected-dates").html('');
		var respuesta=datos.respuesta;
		var idcategoriaservicio=respuesta.idcategoriaservicio;
		var idservicio=respuesta.idservicio;
		var idcategoria=respuesta.idcategoria;
		var titulo=respuesta.titulo;
		var descripcion=respuesta.descripcion;
		var politicasaceptacion=respuesta.politicasaceptacion;
		var estatus=respuesta.estatus;
		var tiporeembolso=respuesta.tiporeembolso;
		var idpoliticaaceptacion=respuesta.idpoliticaaceptacion;
		var imagenservicio=respuesta.imagen;

		if (imagenservicio!=null && imagenservicio!='null' && imagenservicio!='') {
			 $(".imglogoimagenservicio").attr('src',urlimagenes+"servicios/imagenes/"+codigoserv+'/'+imagenservicio);
			localStorage.setItem("fotoimagenservicio",imagenservicio);


			    }else{
			 $(".imglogoimagenservicio").attr('src',urlimagendefaultservicio);

			    }
		//$("#v_estatus").val(estatus);

		if (estatus==1) {
			$("#v_estatus").prop('checked',true);
		}else{
		$("#v_estatus").prop('checked',false);
	
		}
		$("#v_titulo").val('Copia '+titulo);
		$("#v_descripcion").val('Copia '+titulo);
		 var lunes= respuesta.lunes;
		var martes=respuesta.martes;
		var miercoles=respuesta.miercoles;
		var jueves=respuesta.jueves;
		var viernes=respuesta.viernes;
		var sabado=respuesta.sabado;
		var domingo=respuesta.domingo;
		ObtenerTipoServicios(idcategoriaservicio);

		//ObtenerTipoServicios(idcategoriaservicio);
		//ObtenerCategoriaServicios(idcategoria);
		$("#v_categoria").val(idcategoriaservicio);
		$("#v_categoriaservicio").val(idcategoria);
	 var demo = new Promise((resolve, reject) => {
	 resolve(ObtenerCategoriaServicios(idcategoria));
      
    });
	 demo.then(()=>{
   	SeleccionarCategoriaNuevo2(idcategoriaservicio,valor,lunes,martes,miercoles,jueves,viernes,sabado,domingo);
		 ObtenerEncuestas(idservicio);

		 var modalidad=respuesta.modalidad;

		 if (modalidad==1) {
		 	 $("#v_individual").attr('checked',true);
		 }

		 if (modalidad==2) {
		 	 $("#v_grupal").attr('checked',true);
		 }

		 
		 var numparticipantes=respuesta.numeroparticipantes;
		 var numparticipantesmax=respuesta.numeroparticipantesmax;

		//var totalclases='<?php echo $totalclases; ?>';
		//var montopagarparticipante='<?php echo $montopagarparticipante; ?>';
		//var montopagargrupo	='<?php echo $montopagargrupo ?>';
		var precio	=respuesta.precio;
		//$("#v_totalclase").val(totalclases);
		$("#v_costo").val(precio);
		//$("#v_montopagarparticipante").val(montopagarparticipante);
		//$("#v_montopagargrupo").val(montopagargrupo);
		$("#v_numparticipantesmin").val(numparticipantes);
		$("#v_numparticipantesmax").val(numparticipantesmax);

		var modalidadpago=respuesta.modalidadpago;
		//var periodo='<?php echo $periodo; ?>';

		 if (modalidadpago==1) {
		 	 $("#v_habilitarevento").attr('checked',true);
		 	 $("#v_periodo").val(0);
		 }

		 if (modalidadpago==2) {
		 	 $("#v_habilitarperiodo").attr('checked',true);
		 	 $("#v_periodo").val(periodo);
		 }


		
		

		var fechainicial=respuesta.fechainicial; 
		var fechafinal=respuesta.fechafinal;
		
		$("#v_fechainicial").val(fechainicial);
		$("#v_fechafinal").val(fechafinal);
		$("#v_politicasaceptacion").val(politicasaceptacion);
		$("#v_politicaaceptacionseleccion").val(idpoliticaaceptacion);
		SeleccionarPolitica();
	//	ObtenerHorariosSemana(idservicio);
		//ObtenerHorariosServicioComprobacion(idservicio);
		//ObtenerPeriodos(idservicio);
		ObtenerCoachesServicio(idservicio);
	abiertocliente=respuesta.abiertocliente;
	abiertocoach=respuesta.abiertocoach;
	abiertoadmin=respuesta.abiertoadmin;
	ligarcliente=respuesta.ligarcliente;
	reembolso=respuesta.reembolso; 
	cantidadreembolso=respuesta.cantidadreembolso;
	asistencia=respuesta.controlasistencia;
	tiporeembolso=respuesta.tiporeembolso;
	tituloaviso=respuesta.tituloaviso;
	tiempoaviso=respuesta.tiempoaviso;
	//cantidadreembolso='<?php echo $cantidadreembolso; ?>';
	asignadocliente=respuesta.asignadocliente;
	asignadocoach=respuesta.asignadocoach;
	asignadoadmin=respuesta.asignadoadmin;
	numligarclientes=respuesta.numligarclientes;
	/*tiempoaviso='<?php echo $tiempoaviso; ?>';
	tituloaviso='<?php echo $tituloaviso; ?>';
	descripcionaviso='<?php echo $descripcionaviso; ?>';
	politicasca='<?php echo $politicasca; ?>';*/

		if (abiertocliente==1) {
			$("#v_abiertocliente").attr('checked',true);
		}

		if (abiertocoach==1) {
			$("#v_abiertocoach").attr('checked',true);
		}
		if (abiertoadmin==1) {

			$("#v_abiertoadmin").attr('checked',true);
		}

		if (ligarcliente==1) {
			
			$("#v_ligarclientes").attr('checked',true);
			Permitirligar();
			$("#v_numligarclientes").val(numligarclientes);

		}

		if (reembolso==1) {
			
			$("#v_reembolso").attr('checked',true);
			HabilitarcantidadReembolso();
			$("#v_tiporeembolso").val(tiporeembolso);
			$("#v_cantidadreembolso").val(cantidadreembolso);
		}

		if (asignadocliente==1) {
			
			$("#v_asignadocliente").attr('checked',true);
		}

		if (asignadoadmin==1) {
			
			$("#v_asignadoadmin").attr('checked',true);
		}
		if (asignadocoach==1) {
			
			$("#v_asignadocoach").attr('checked',true);
		}

		if (asistencia==1) {
		$("#v_asistencia").attr('checked',true);
	
		}

		if (localStorage.getItem('idtipousuario')==0) {
			$("#contentestatus").css('display','block');
		}


		$("#v_tiempoaviso").val(tiempoaviso);
		$("#v_tituloaviso").val(tituloaviso);
		//$("#cantidadhorarios").text(arraydiaselegidos.length);

		  }
    );
	//	Permitirligar();
		//HabilitarcantidadReembolso();

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}

 function ObtenerEncuestas(idservicio) {
 	var datos="idservicio="+idservicio;
	$.ajax({
					url: urlphp+'ObtenerEncuestas.php', //Url a donde la enviaremos
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

						var encuestas=msj.respuesta;
						if (encuestas.length>0) {

							for (var i =0; i <encuestas.length; i++) {
								
								$("#inputencuesta_"+encuestas[i].idencuesta).attr('checked',true);
							}
						}

					}
				});
 } 

function ObtenerHorariosSemana(idservicio) {
	var datos="idservicio="+idservicio;


		$.ajax({
					url: urlphp+'ObtenerHorariosSemana.php', //Url a donde la enviaremos
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
						$("#selected-dates").html('');
						var horarios=msj.respuesta;
						var servicio=msj.servicio;
						 zonasarray=msj.zonas;
						 arraydiaseleccionados=[];
						arraydiaselegidos=[];
						if (horarios.length>0) {
							PintarHorariosServicio(horarios,servicio);
							Resumenfechas();
							CantidadHorarios();
						}


					}
				});
}

function ObtenerPeriodos(idservicio) {
	var datos="idservicio="+idservicio;
			$.ajax({
					url: urlphp+'ObtenerPeriodos.php', //Url a donde la enviaremos
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
						asignacionperiodos=[];
						$("#periodos").html('');
					var respuesta=msj.respuesta;
					//alert('a');
					if (respuesta.length>0) {
						for (var i = 0; i < respuesta.length; i++) {
							var objeto={
								fechainicial:respuesta[i].fechainicial,
								fechafinal:respuesta[i].fechafinal
							};
							asignacionperiodos.push(objeto);
						}
						PintarPeriodos();

					}
					
					

					}
				});
}


function PintarHorariosServicio(horarios,servicio) {

		for (var i = 0; i <horarios.length; i++) {
				var fecha=horarios[i].fecha;
				var dividir=fecha.split('-');
				//aqui
				var id=dividir[0]+'-'+dividir[1]+'-'+dividir[2]+'-'+horarios[i].horainicial+'-'+horarios[i].horafinal+'-'+horarios[i].idzona;
			

				//10-10-2022-19:00-20:00-6
				arraydiaselegidos.push(id);
				var iddividido = id.split('-');
				var color=horarios[i].color;
									
				var dividirfecha=id.split('-');
					var objeto={
						id:id,
						fecha:dividirfecha[0]+'-'+dividirfecha[1]+'-'+dividirfecha[2],
						idzona:dividirfecha[5],
						horainicial:dividirfecha[3],
						horafinal:dividirfecha[4],
						color:color,

					};
				arraydiaseleccionados.push(objeto);
				}
}	

function ObtenerCoachesServicio(idservicio) {
	var datos="idservicio="+idservicio;
			$.ajax({
					url: urlphp+'ObtenerCoaches.php', //Url a donde la enviaremos
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
						asignacioncoach=[];
					var respuesta=msj.respuesta;
					
					for (var i = 0; i < respuesta.length; i++) {
				
							var objeto={
							idcoach:respuesta[i].idusuarios,
							textonombre:respuesta[i].nombre+' '+respuesta[i].paterno+' '+respuesta[i].materno,
							tipopago:respuesta[i].tipopago,
							monto:respuesta[i].monto
							};
						asignacioncoach.push(objeto);

					}
					PintarCoaches();

					}
				});
}


 
function PintarServiciosnoAvanzados() {


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
		   							  <div class="block" style="margin-right:1em;margin-left:1em;">`;
		   							  	html+=` <div class="row listadoserviciosadicionales"></div>`;
		   					
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
            ObtenerServiciosAdicionales();
          },
          opened: function (sheet) {
            console.log('Sheet opened');
          },
        }
      });

       dynamicSheet1.open();
}

function ObtenerUsuariosServicio(idservicio) {
	var datos="idservicio="+idservicio;
			$.ajax({
					url: urlphp+'ObtenerAlumnosServicio.php', //Url a donde la enviaremos
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
						
					var respuesta=msj.respuesta;
					PintarAlumnosServicio(respuesta);	
					}
				});
}

function PintarAlumnosServicio(respuesta) {
	var html="";
	if (respuesta.length>0) {
		$("#usuarios-tab").css('display','block');
		for (var i = 0; i <respuesta.length; i++) {

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
              <div class="item-inner" style="width:80%;">
             
                <div class="row">
                <div class="item-media">
              		  <div class="col-30">
                        <figure class="avatar  rounded-10">
                       <img src="`+urlimagen+`" alt="" style="width:80px;height:80px;">
                        </figure>
                        </div>
                        
                        	<div class="col-100">
                        	 <div class="col-100 item-text" style="margin-left: 1em;font-size:18px;word-break: break-word;" id="participante_`+respuesta[i].idusuarios+`">
             		   </div>


                     <div class="row">
             		     <div class="col-100 item-text" style="font-size:18px;word-break: break-word;" id="correo_`+respuesta[i].idusuarios+`">`+respuesta[i].nombre+`
             		     </div>
             		   </div> <div class="row">
             		     <div class="col-100 item-text" style="font-size:18px;word-break: break-word;" id="correo_`+respuesta[i].idusuarios+`">`+respuesta[i].usuario+`
             		     </div>
             		   </div><div class="row">
                        	  <div class="item-text">Alumno</div>
                    </div>

                        	</div>
                        	
                         	</div>
                        </div>
             		 
              </div>
             <input type="checkbox" name="my-opcion" class="idusuariosiniciar" id="idusuarios_`+respuesta[i].idusuarios+`" style="height:20px;width:20%;" onchange="SeleccionarAsignado(`+respuesta[i].idusuarios+`)">

            </label>
          </li>

			`;
		}
	}
	$(".usuarios").html(html);
}

function VerificarSiElServicioUsuarios(idservicio) {
		    return new Promise(function(resolve, reject) {

				var iduser=localStorage.getItem('id_user');
				var datos="idservicio="+idservicio+"&id_user="+iduser;
			
					$.ajax({
					url: urlphp+'VerificarServicioUsuarios.php', //Url a donde la enviaremos
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

						resolve(msj);
						
					}
				});
				
			});
}

function CancelarServicioAdmin(idservicio) {

	VerificarSiElServicioUsuarios(idservicio).then(r => {

		if (r.existeasignados==0) {
	
       var html=`
         
              <div class="block">
               <div class="row" style="">

                </div>

                <div class="row" style="padding-top:1em;">
                	<label style="font-size:16px;padding:1px;">Motivo de cancelación:</label>
                	<input type="text" name="txtmotivo" id="txtmotivo"  />
                </div>
              </div>
           
         
        `;
       app.dialog.create({
          title: 'Cancelación de servicio',
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
                GuardarCancelacion(idservicio);
              
            }
           },

          verticalButtons: false,
        }).open();
	   }else{


	   	alerta('','El servicio no se puede cancelar, cuenta con usuarios asignados');
	   }


       });
		
}

function GuardarCancelacion(idservicio) {
	// body...
				var iduser=localStorage.getItem('id_user');
				var motivocancelacion=$("#txtmotivo").val();
				var datos="idservicio="+idservicio+"&motivocancelacion="+motivocancelacion+"&id_user="+iduser;
			
				if (motivocancelacion!='') {
					$.ajax({
					url: urlphp+'CancelarServicioAdmin.php', //Url a donde la enviaremos
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
						ObtenerServicioNuevo(idservicio);

						
					}
				});

				}else{

					alerta('','Ingresar motivo de cancelación');
				}
							
}



function CargarMeses() {
	var html="";
	html+=`<option value="0">Seleccionar mes</option>
			`;
	if (meses.length>0) {
		for (var i = 0; i <meses.length; i++) {
			html+=` <option value="`+(i+1)+`">`+meses[i]+`</option>`;
		}
	}

	$("#v_meses").html(html);

	const fechaActual = new Date();
	const mesActual = fechaActual.getMonth() + 1;
	//$("#v_meses").val(mesActual);

	}

function Cargaranios(anio) {

			$.ajax({
					url: urlphp+'Obteneranios.php', //Url a donde la enviaremos
					type: 'POST', //Metodo que usaremos
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
					
					var respuesta=msj.respuesta;
					Pintaranios(respuesta);
					if (anio>0) {
					$("#v_anios").val(anio);

					}	
					}
				});
}
	
function Pintaranios(anios) {
	var html="";
	html+=`<option value="0">Seleccionar año</option>
			`;
	if (anios.length>0) {
		for (var i = 0; i <anios.length; i++) {
			html+=`
			<option value="`+anios[i].valor+`">`+anios[i].valor+`</option>
			`;
		}
	}

	$("#v_anios").html(html);

	const fechaActual = new Date();
	const mesanio = fechaActual.getFullYear();
	
	//$("#v_anios").val(mesanio);
}

