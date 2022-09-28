  var participastesalumnosservicio="";
    var listaalumnos="";
    var usuariosquitados=[];
    var usuariosagregados=[];
    var dynamicSheet2="";
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

				if (respuesta.ligarcliente==1) {

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
	  app.dialog.preloader('Guardando...');
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
		  app.dialog.close();

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

function PantallaRechazarTerminos() {
	 var html=`
         
              <div class="block">

                <div class="row" style="padding-top:1em;">
                	<label style="font-size:16px;padding:1px;">Motivo:</label>
                	<textarea name="" id="txtcomentariorechazo" cols="30" rows="3"></textarea>
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
	
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){

			if (datos.respuesta==1) {

				alerta('','Operación realizada');
				GoToPage('home');
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

				urlimagen='img/icon-usuario.png';
				imagen='<img src="'+urlimagen+'" alt=""  style="width:80px;height:80px;"/>';
			}
			html+=`
				  

                <li>
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
                        	 <div class="col-100 item-text" style="margin-left: 1em;font-size:18px;" id="participante_`+respuesta[i].idusuarios+`">`+respuesta[i].nombre+` `+respuesta[i].paterno+`
             		   </div><div class="row">
                        	  <div class="item-text">`+respuesta[i].nombretipo+`</div>
                    </div>
                        	</div>
                        	
                        	</div>
                        </div>
             		 
              </div>
             <input type="checkbox" name="my-opcion" class="idusuariosiniciar" id="idusuarios_`+respuesta[i].idusuarios+`"  style="height:20px;width:20px;">

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
			
			
             if(horarios.length>1){

             	$("#btncalendario").css('display','block');
             }else{

             	$("#btncalendario").css('display','none');

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

				urlimagen="img/icon-usuario.png";
				imagen='<img src="'+urlimagen+'" alt=""  style="width:60px;height:60px;"/>';
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
                      `+imagen+`
                        </figure>
                        </div>
                        
                    <div class="col-80">
                         <div class="col-100 item-text" style="margin-left: 1em;font-size:18px;" id="participante_`+respuesta[i].idusuarios+`">`+respuesta[i].nombre+` `+respuesta[i].paterno+`
                         </div>
             		 
	             		 <div class="col-100 item-text" style="font-size:18px;    margin-left: 1em;" id="correo_`+respuesta[i].idusuarios+`">`+respuesta[i].usuario+`
	             		 	</div>
             		
                        	  <div class=" col-100 item-text" style="    margin-left: 1em;">`+respuesta[i].nombretipo+`</div>
                    		  </div>
                        </div>

                    <div class="col-10">

                    </div>
                        	
                     </div>
               
             		 
              </div>

            
          </div></label></li>

			`;
		}
		$("#divparticipantesalumnos").html(html);

	}else{
				$(".listadoalumnos").css('display','none');

	}
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
				imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;height:80px;"/>';
			}else{

				urlimagen="img/icon-usuario.png";
				imagen='<img src="'+urlimagen+'" alt=""  style="width:80px;height:80px;"/>';
			}

			if (respuesta[i].alias=="" || respuesta[i].alias==null) {

				respuesta[i].alias="";
			}
			html+=`
				  

                <li class="lista_" id="lista_`+respuesta[i].idusuarios+`" >
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
             		     <div class="col-100 item-text" style="font-size:18px;word-break: break-word;" id="correo_`+respuesta[i].idusuarios+`">`+respuesta[i].alias+`
             		     </div>
             		   </div>`;


             		   html+=` <div class="row">
             		     <div class="col-100 item-text" style="font-size:18px;word-break: break-word;" id="correo_`+respuesta[i].idusuarios+`">`+respuesta[i].celular+`
             		     </div>
             		   </div>`;

             		   html+=`<div class="row">
                        	  <div class="item-text">`+respuesta[i].nombretipo+`</div>
                    </div>

                        	</div>
                        	
                         	</div>
                        </div>
             		 
              </div>
             <input type="checkbox" name="my-opcion" class="idusuariosiniciar" id="idusuarios_`+respuesta[i].idusuarios+`"  style="height:20px;width:20%;" onchange="SeleccionarAsignado(`+respuesta[i].idusuarios+`)">

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
				imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;height:80px;"/>';
			}else{

				urlimagen="img/icon-usuario.png";
				imagen='<img src="'+urlimagen+'" alt=""  style="width:80px;height:80px;"/>';
			}
			html+=`
				  

                <li class="lista_" id="lista_`+respuesta[i].idusuarios+`" style="border-radius: 10px;margin-bottom: 1em;">
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
             <input type="checkbox" name="my-opcion" class="idusuariosiniciar" id="idusuarios_`+respuesta[i].idusuarios+`"  style="height:20px;width:20%;" onchange="SeleccionarAsignado(`+respuesta[i].idusuarios+`)">

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
	$(".idusuariosiniciar").each(function( index ) {
  			if ($(this).is(':checked')) {
  				contar++;
  			}
	});


	if (contar>0) {
		$("#btnpasar2").text('Agregar ('+contar+') elemento(s)');
		$("#btnpasar2").css('display','block');

	}else{

		$("#btnpasar2").text('Agregar elementos');
		$("#btnpasar2").css('display','none');

	}

	if (contar>0) {

		$("#btnguardarasignacion").css('display','block');
	}else{

		$("#btnguardarasignacion").css('display','none');
	
	}
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
	
	$(".listaa_" ).each(function( index ) {
	  	//if ($(this).is(':checked')) {
	  		var id=$(this).attr('id');
	  		var dividir=id.split('_')[1];
	  		idusuarios.push(dividir);
	});

	var datos="id_user="+id_user+"&idusuarios="+idusuarios+"&idservicio="+idservicio+"&usuariosquitados="+usuariosquitados;
	
	
	var usuariosparaquitar="";
	var usuariosparagregar="";

	for (var i = 0; i < usuariosquitados.length; i++) {
		
		var id=usuariosquitados[i];
		var resultado = participastesalumnosservicio.find( usuarios => usuarios.idusuarios === id );
			
				if (resultado == undefined) {
					 resultado = listaalumnos.find( usuarios => usuarios.idusuarios === id );
		
				}

			usuariosparaquitar+=`<p style="text-align:center;font-size:18px;">`+(i+1)+`.- `+resultado.nombre+` `+ resultado.paterno+`</p>`;

	}


	for (var i = 0; i < usuariosagregados.length; i++) {
		
		var id=usuariosagregados[i];
		var resultado = participastesalumnosservicio.find( usuarios => usuarios.idusuarios === id );
			
				if (resultado == undefined) {
					 resultado = listaalumnos.find( usuarios => usuarios.idusuarios === id );
		
				}

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

		   							  	<h3 style="text-align:center;font-size:22px;margin-bottom:1em;">Se realizaran las siguientes acciones</h3>`;
 							if (usuariosquitados.length>0) {
		   							  html+=`
		   							  <div class="row" style="margin-bottom:1em;">
		   							  <h4 style="text-align:center;border-radius: 10px;color: red;padding: 0.5em;font-weight: bold;">Usuarios a cancelar el servicio</h4>`;
		   							
		   							     html+=usuariosparaquitar +`</div>`;
		
			   							

		   							}

		   						if (usuariosagregados.length>0) {

		   							 html+=`
		   							 <div class="row" style="margin-bottom:1em;">
		   							 <h4 style="text-align:center;border-radius: 10px;color: rgb(89, 193, 88);padding: 0.5em;font-weight: bold;">Usuarios a agregar el servicio</h4>`;
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
	
	$(".listaa_" ).each(function( index ) {
	  	//if ($(this).is(':checked')) {
	  		var id=$(this).attr('id');
	  		var dividir=id.split('_')[1];
	  		idusuarios.push(dividir);
	});

	var datos="id_user="+id_user+"&idusuarios="+idusuarios+"&idservicio="+idservicio+"&usuariosquitados="+usuariosquitados+"&usuariosagregados="+usuariosagregados;
	
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){

				
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

			if (respuesta[i].foto!='' && respuesta[i].foto!=null) {

				urlimagen=urlphp+`upload/perfil/`+respuesta[i].foto;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;height:80px;"/>';
			}else{

				urlimagen="img/icon-usuario.png";
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
		html="";

		for (var i =0; i < respuesta.length; i++) {

			if (respuesta[i].foto!='' && respuesta[i].foto!=null && respuesta[i].foto!='null') {

				urlimagen=urlphp+`upload/perfil/`+respuesta[i].foto;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;height:80px;"/>';
			}else{

				urlimagen="img/icon-usuario.png";
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
                        <img src="`+urlimagen+`" alt="" style="width:80px;height:80px;" />
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


			if (resultado.foto!='' && resultado.foto!=null) {

				urlimagen=urlphp+`upload/perfil/`+resultado.foto;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;height:80px;"/>';
			}else{

				urlimagen="img/icon-usuario.png";
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

		$("#divparticipantesalumnos").append(html);
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

				urlimagen="img/icon-usuario.png";
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
