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
                	<textarea name="" id="" cols="30" rows="3"></textarea>
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

			if (respuesta[i].foto!='' && respuesta[i].foto!=null) {

				urlimagen=urlimagenes+`upload/perfil/`+respuesta[i].foto;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;height:80px;"/>';
			}else{

				urlimagen=localStorage.getItem('logo');
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

function IniciarChat() {
	var arrayidusuarios=[];
	$(".idusuariosiniciar").each(function( index ) {
		if ($(this).is(':checked')) {

			var id=$(this).attr('id');
			var dividir=id.split('_')[1];

			arrayidusuarios.push(dividir);

		}
  		
	});

	GoToPage('messages');
	//console.log(arrayidusuarios);
	
}