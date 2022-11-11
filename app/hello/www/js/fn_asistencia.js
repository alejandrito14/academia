function Asistencia() {

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
			if(respuesta.length>0){
				GoToPage('asistenciaservicio');

			}else{
				alerta('','No se encuentran alumnos registrados al servicio');
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
function ObtenerAlumnosAsistencia() {

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
			PintarAlumnosAsistencia(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}

function PintarAlumnosAsistencia(respuesta) {

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
			$("#divalumnosasistencia").html(html);

				
			}
	}

function ProxihorarioAsistencia() {
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
		

			var horarioshtml="";

             if (respuesta.fechaproxima!='') {
             	horarioshtml+=`<span>`+respuesta.fechaproxima+` `+respuesta.horainicial+` - `+respuesta.horafinal+` Hrs.</span></br>`;
             }else{

             	horarioshtml='-- Filtrar horario --';

             	//$("#btnguardarasistencia").css('display','none');
             }
             if (respuesta.fechacompleta!='') {

                localStorage.setItem('fechaasistencia',respuesta.fechacompleta);
					ObtenerRegistroAsistencia();
                      }else{

                localStorage.setItem('fechaasistencia','');

                      }

			 $(".colocarhorarios").html(horarioshtml);


			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}

function VerificarSeleccion() {
	/*var contador=0;

	$(".idusuariosasistencia" ).each(function( index ) {
	   if($(this).is(':checked')){
	   	var id=$(this).attr('id');
	   	var dividir=id.split('_');

	   	contador++;
	   }
	});

	if (contador>0) {

		$("#btnguardarasistencia").css('display','block');
	}*/
}

function GuardarAsistencia() {


	var idusuariosasitio=[];
	var idusuariosnoasistio=[];
	$(".idusuariosasistencia" ).each(function( index ) {
	  	var id=$(this).attr('id');
	   	var dividir=id.split('_');
	   if($(this).is(':checked')){
	   
	   	idusuariosasitio.push(dividir[1]);
	   	
	   }else{

	   	idusuariosnoasistio.push(dividir[1]);
	   }
	});

	var id_user=localStorage.getItem('id_user');
	var idservicio=localStorage.getItem('idservicio');
	var fechaasistencia=localStorage.getItem('fechaasistencia');
	var datos="id_user="+id_user+"&idusuariosasistio="+idusuariosasitio+"&idusuariosnoasistio="+idusuariosnoasistio+"&fechaasistencia="+fechaasistencia+"&idservicio="+idservicio;
	
	var pagina="GuardarAsistencia.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			
			alerta('','Se guardaron datos existosamente');

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}
var dynamicSheet1="";
function Obtenermashorarios() {

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
		   							 	<div  class="list simple-list">
		   							 	<ul id="todoshorarios"></ul>
		   							 	</div>
		   							 			` ;
											

		   							 	html+=`</div>

		   							 	 <div class="block block-strong">
									        <p class="row">
									          <button class="col button button-large " id="btnfiltrar" style="">Filtrar
									          </button>
									          </p>

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
            CargarFechasHorarios();
          },
          opened: function (sheet) {
            console.log('Sheet opened');
          },
        }
      });

       dynamicSheet1.open();
}

function CargarFechasHorarios() {
	
	var id_user=localStorage.getItem('id_user');
	var idservicio=localStorage.getItem('idservicio');
	var datos="idservicio="+idservicio;
	var pagina="ObtenerFechasHorarios.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			
			var respuesta=datos.respuesta;
			PintarHorariosEnpantalla(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}
function PintarHorariosEnpantalla(respuesta) {
		var html="";
	if (respuesta.length>0) {

		html+=`
			<li id="busca" style="background: lightgray;border-radius: 10px;">

			<div class="row">
				<div class="col-100">  
				<input type="search" spellcheck="false" placeholder="Buscar " class="" id="buscarhorario" onkeyup="BuscarEnLista('#buscarhorario','.horarios');">
				</div>
				
			</div>
            
          </li>	

		`;

		for (var i = 0; i <respuesta.length; i++) {
			html+=`

			<li class="horarios" id="horario_`+respuesta[i].idhorarioservicio+`">

			<div class="row">
				<div class="col-70" id="formato_`+respuesta[i].idhorarioservicio+`">`+respuesta[i].fechaformada+' '+respuesta[i].horainicial+ '-' +respuesta[i].horafinal+`</div>
				<div class="col-30">
				<input type="radio"  name="checkbox" value="`+respuesta[i].fechacompleta+`" id="che_`+respuesta[i].idhorarioservicio+`" onchange="CambiarValor(`+respuesta[i].idhorarioservicio+`)" >

				</div>
			</div>
            
          </li>	

			`;

		}
	}
	$("#todoshorarios").html(html);
}

function CambiarValor(idhorariofecha) {
	var value=$("#che_"+idhorariofecha).val();
	console.log(value);
    localStorage.setItem('fechaasistencia',value);
    $("#btnfiltrar").addClass('button-active');
    $("#btnfiltrar").attr('onclick','FiltrarHorarios('+idhorariofecha+')');
}

function FiltrarHorarios(idhorariofecha) {
	
    var texto=$("#formato_"+idhorariofecha).text();
    dynamicSheet1.close();
    $(".colocarhorarios").text(texto);
    ObtenerRegistroAsistencia();
}
function ObtenerRegistroAsistencia() {
	var idservicio=localStorage.getItem('idservicio');
	var fechaasistencia=localStorage.getItem('fechaasistencia');
	var datos="idservicio="+idservicio+"&fechaasistencia="+fechaasistencia;
	var pagina="ObtenerRegistroAsistencia.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(respuesta){

			var respuesta=respuesta.asistencia;
		
			if (respuesta.length>0) {
				for (var i = 0; i <respuesta.length; i++) {

						if (respuesta[i].asistio==1) {

						$("#idusuarios_"+respuesta[i].idusuarios).attr('checked',true);
	
						}
				}
			}else{

				$(".idusuariosasistencia").attr('checked',false);

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
	