
function ObtenerParticipantesEvaluacion() {
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
			PintarParticipantesAlumnosEvaluacion(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}

function PintarParticipantesAlumnosEvaluacion(respuesta) {
	if (respuesta.length>0) {

		var html="";
		for (var i =0; i < respuesta.length; i++) {

			if (respuesta[i].foto!='' && respuesta[i].foto!=null && respuesta[i].foto!='null') {

				urlimagen=urlphp+`upload/perfil/`+respuesta[i].foto;
				imagen='<img src="'+urlimagen+'" alt=""  style="width:100px;height:80px;"/>';
			}else{

				urlimagen="img/icon-usuario.png";
				imagen='<img src="'+urlimagen+'" alt=""  style="width:80px;height:80px;"/>';
			}

			var encuestas=respuesta[i].encuestas;
			var totalencuestas="";
			for (var j = 0; j < encuestas.length; j++) {
				var icono='<i class="bi-card-list"></i>';
				var clase="iconosrojo";
				if (encuestas[j].contestado==1) {
					icono='<i class="bi-card-checklist"></i>';
					clase="iconosverde";
				}
				
				totalencuestas+=`<div class="col "><span class="avatar avatar-30 rounded-circle `+clase+`">`+icono+`</span></div>`;
			}
			html+=`
				  

                <li style="background: white;
    border-radius: 10px;" onclick="DetalleEvaluaciones(`+respuesta[i].idusuarios+`)">
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


             		   </div>
             		   <div class="row">
             		     <div class="col-100 item-text" style="font-size:18px;" id="correo_`+respuesta[i].idusuarios+`">`+respuesta[i].usuario+`
             		     </div>
             		   </div>
             		   <div class="row">
                        	  <div class="item-text">`+respuesta[i].nombretipo+`</div>
                    </div>

                    <div class="row">
                        	  `+totalencuestas+`
                    </div>
                        	</div>
                        	
                        	</div>
                        </div>
             		 
              </div>

            </label>
          </li>


			`;
		}
		$(".divparticipantesalumnoseva").html(html);

	}
}

function DetalleEvaluaciones(idusuarios) {
	localStorage.setItem('idusuarioevaluacion',idusuarios);
	GoToPage('listadoevaluaciones');
}

function ObtenerListadoEvaluciones() {
	var idservicio=localStorage.getItem('idservicio');
	var pagina = "ObtenerEvaluaciones.php";
	var id_user=localStorage.getItem('id_user');
	var idusuarioevaluacion=localStorage.getItem('idusuarioevaluacion');
	var datos="idusuarioevaluacion="+idusuarioevaluacion+"&idservicio="+idservicio+"&id_user="+id_user;
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			var respuesta=datos.respuesta;
			PintarEvaluaciones(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});

}
function PintarEvaluaciones(respuesta) {  //<i class="bi-card-checklist"></i>
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			html+=
			`

			      <li style="background: white;
    border-radius: 10px;" onclick="Listacuestiones(`+respuesta[i].idencuesta+`)">
            <label class="label-radio item-content">                                                                               
              <div class="item-inner" style="width:80%;">
             
                <div class="row">
                <div class="item-media">
              		  <div class="col-30">
                        <figure class="avatar avatar-50 text-color-theme  rounded-10">
                       <i style="font-size:30px;" class="bi-card-checklist"></i>
                        </figure>
                        </div>
                        
                        	<div class="col-100">
                        	 <div class="col-100 item-text" style="margin-left: 1em;font-size:18px;" id="evaluacion_`+respuesta[i].idencuesta+`">`+respuesta[i].titulo+`

             		   </div>
             		   <div class="row">
             		     </div>
             		   </div>
             		   <div class="row">
                    </div>
                        	</div>
                        	
                        	</div>
                        </div>
             		 
              </div>

            </label>
          </li>


		
			`;
		}


	}

			$(".listaevaluaciones").html(html);

}

function Listacuestiones(idencuesta) {
	localStorage.setItem('idencuesta',idencuesta);
	GoToPage('listadocuestiones');
}

function Listadocuestiones() {
	var idservicio=localStorage.getItem('idservicio');
	var pagina = "ObtenerCuestiones.php";
	var id_user=localStorage.getItem('id_user');
	var idencuesta=localStorage.getItem('idencuesta');
	var datos="idencuesta="+idencuesta+"&idservicio="+idservicio+"&id_user="+id_user;
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			var respuesta=datos.cuestiones;
			PintarCuestiones(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}
var opciones="";
var cuestiones="";
function PintarCuestiones(respuesta) {
	 var html="";
	if (respuesta.length>0) {
		cuestiones=respuesta;
		for (var i = 0; i <respuesta.length; i++) {
			
			html+=`

		 <div style="background: white;border-radius: 10px;margin-bottom:1em;padding-bottom: 1em;">
            <label class="label-radio item-content">                                                                               
              <div class="" style="width:90%;">
             
                <div class="row">
                <div class="item-media">
              		  <div class="col-30">
                        <figure class="avatar avatar-50 text-color-theme  rounded-10">
                       <i style="font-size:30px;" class="bi-question-square-fill"></i>

                        </figure>
                        </div>
                        
                        	<div class="col-100">
                        	 <div class="col-100 item-text" style="margin-left: 1em;font-size:18px;" id="evaluacion_`+respuesta[i].idencuesta+`_`+respuesta[i].idcuestion+`">`+respuesta[i].titulo+`

             		   			</div>
		             		   <div class="row">
		             		   </div>
             		   </div>

                        	</div>
                        	</div>

                        	<div class="row">
							<div class="col-100">
							<div class="col-50"></div>
							<div class="col-50">
                		`;

             		   		
             		   		 opciones=respuesta[i].opciones;
             		   		for (var j = 0; j <opciones.length; j++) {
             		   			
             		   			if (opciones[j].idopcion==1) {
             		   				var opcionesvalue="";
/*             		   				  opcionesvalue+=`<option value="0">Selecciona un valor</option>`;
*/
             		   				for (var k = 0; k <10; k++) {
             		   					opcionesvalue+=`<option value="`+(k+1)+`">`+(k+1)+`</option>`;
             		   				}
             		   				html+=`
             		   				<label style="font-size: 12px; margin-left: 1em;color: gray;">Selecciona un valor del 1 al 10</label>
             		   				<select id="res_`+respuesta[i].idencuesta+`_`+opciones[j].idcuestion+`_`+opciones[j].idopcion+`" style="text-align:center;">`+opcionesvalue+`</select>
             		   				<input type="hidden" id="respuesta_`+respuesta[j].idencuesta+`-`+opciones[j].idcuestion+'_'+opciones[j].idopcion+`">	
             		   				`;

             		   			}

             		   			if (opciones[j].idopcion==2) {

             		   				html+=`
             		   				<label style="font-size: 12px; margin-left: 1em;color: gray;">Elige una opción</label>

             		   					<div class="">
									        <div class="row">
									          <button class="col button button-large" onclick="Marcar(`+respuesta[i].idencuesta+`,`+opciones[j].idcuestion+`,`+opciones[j].idopcion+`,1)" id="btn_`+respuesta[i].idencuesta+`_`+opciones[j].idcuestion+`_`+opciones[j].idopcion+`_1">SI</button>
									        </div>

									        <div class="row">
									          <button class="col button button-large" onclick="Marcar(`+respuesta[i].idencuesta+`,`+opciones[j].idcuestion+`,`+opciones[j].idopcion+`,2)" id="btn_`+respuesta[i].idencuesta+`_`+opciones[j].idcuestion+`_`+opciones[j].idopcion+`_2">NO</button>
									        </div>

										</div>
             		   					 <label class="radio" style="display:none;">SI<input type="radio" value="1"  name="radioopcion_`+respuesta[i].idencuesta+`_`+opciones[j].idcuestion+`_`+opciones[j].idopcion+`" id="radio_`+respuesta[i].idencuesta+`_`+opciones[j].idcuestion+`_`+opciones[j].idopcion+`_1" /><i class="icon-radio"></i></label>
             		   				
 										 <label class="radio" style="display:none;" >NO<input type="radio" value="2" name="radioopcion_`+respuesta[i].idencuesta+`_`+opciones[j].idcuestion+`_`+opciones[j].idopcion+`" id="radio_`+respuesta[i].idencuesta+`_`+opciones[j].idcuestion+`_`+opciones[j].idopcion+`_2" /><i class="icon-radio"></i></label>
             		   				
										<input type="hidden" id="respuesta_`+respuesta[i].idencuesta+`-`+opciones[j].idcuestion+'_'+opciones[j].idopcion+`">	
             		   				
             		   				`;

             		   			}

             		   			if (opciones[j].idopcion==3) {

             		   				html+=`
             		   				<label style="font-size: 12px; margin-left: .8em;color: gray;">Escribe la respuesta</label>

             		   				<textarea style="margin-left: .5em;background:#eaebf1;margin-bottom: 1em;padding-left:1em;" id="respuesta_`+respuesta[i].idencuesta+`_`+opciones[j].idcuestion+'_'+opciones[j].idopcion+`"></textarea>
             		   					
             		   				`;
             		   			}

             		   		}

             		   		
             		   		html+=`
             		   		
             		   		</div>
             		   		</div>
                    		</div>
                        	
                        	</div>
                       
             		 
              </div>

            </label>
          </div>


		
		
			`;
		}
	}

	$("#divcuestiones").html(html);
}

function Marcar(idencuesta,idcuestion,idopcion,valor) {
		var valor2=1;

		if (valor==2) {
			valor2=1;
		}else{
			valor2=2;
		}
	$("#radio_"+idencuesta+"_"+idcuestion+"_"+idopcion+"_"+valor).attr('checked',false);
	$("#radio_"+idencuesta+"_"+idcuestion+"_"+idopcion+"_"+valor2).attr('checked',false);
	$("#btn_"+idencuesta+"_"+idcuestion+"_"+idopcion+"_"+valor).removeClass('button-active');
	$("#btn_"+idencuesta+"_"+idcuestion+"_"+idopcion+"_"+valor2).removeClass('button-active');

	if($("#radio_"+idencuesta+"_"+idcuestion+"_"+idopcion+"_"+valor).is(':checked'))
	{

	$("#radio_"+idencuesta+"_"+idcuestion+"_"+idopcion+"_"+valor).attr('checked',false);

	}else{

	$("#radio_"+idencuesta+"_"+idcuestion+"_"+idopcion+"_"+valor).attr('checked',true);

	$("#btn_"+idencuesta+"_"+idcuestion+"_"+idopcion+"_"+valor).addClass('button-active');

	}
}

function GuardarRespuestas() {
	var idusuarioencuesta=$("#idusuarioencuesta").val();
	var idencuesta=localStorage.getItem('idencuesta');
	var idservicio=localStorage.getItem('idservicio');
	var id_user=localStorage.getItem('id_user');
	var datos="";
	var respuestas=[];

	for (var i = 0; i <cuestiones.length; i++) {

			opciones=cuestiones[i].opciones;
		for (var j = 0; j < opciones.length; j++) {
			    if(opciones[j].idopcion==1) {

			    var valor=$("#res_"+cuestiones[i].idencuesta+"_"+opciones[j].idcuestion+"_"+opciones[j].idopcion).val();

			    }

	            if(opciones[j].idopcion==2) {


				var valor=$('input[name=radioopcion_'+cuestiones[i].idencuesta+'_'+opciones[j].idcuestion+'_'+opciones[j].idopcion+']:checked').val();
	            }

	            if(opciones[j].idopcion==3) {

			    var valor=$("#respuesta_"+cuestiones[i].idencuesta+"_"+opciones[j].idcuestion+"_"+opciones[j].idopcion).val();
	            }

	            var objeto={
	        	idopcion:opciones[j].idopcion,
	        	idcuestion:opciones[j].idcuestion,
	        	respuesta:valor
	       		 };

	        respuestas.push(objeto);

	        }

	        
		}
		var mostrar=0;
		if ($("#v_mostrar").is(':checked')) {
			mostrar=1;
		}

	var idusuarioevaluacion=localStorage.getItem('idusuarioevaluacion');
	var datos="idencuesta="+idencuesta+"&idservicio="+idservicio+"&id_user="+id_user+"&respuestas="+JSON.stringify(respuestas)+"&idusuarioevaluacion="+idusuarioevaluacion+"&mostrar="+mostrar+"&idusuarioencuesta="+idusuarioencuesta;
	var pagina="GuardarRespuestas.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){

			var resp=datos.respuesta;
			if (resp==1) {

				alerta('','Se guardó los datos correctamente')
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

function ObtenerSitienerespuestas() {
	var idencuesta=localStorage.getItem('idencuesta');
	var idusuarioevaluacion=localStorage.getItem('idusuarioevaluacion');
	var idservicio=localStorage.getItem('idservicio');
	var datos="idencuesta="+idencuesta+"&idusuarioevaluacion="+idusuarioevaluacion+"&idservicio="+idservicio;

	var pagina="ConsultarSihayrespuestas.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){

			var resp=datos.respuesta;
			var encuesta=datos.encuesta;
			if (encuesta.length>0) {

				PintarResultadoEncuesta(encuesta[0]);

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

function PintarResultadoEncuesta(encuesta) {
	$("#idusuarioencuesta").val(encuesta.idusuarioencuesta);

	if (encuesta.mostraralumno==1) {
		
		$("#v_mostrar").attr('checked',true);
	}
	var opciones=encuesta.cuestion;

	for (var j=0; j < opciones.length; j++) {
		   if(opciones[j].idopcion==1) {

			    $("#res_"+encuesta.idencuesta+"_"+opciones[j].idcuestion+"_"+opciones[j].idopcion).val(opciones[j].respuesta);

			    }

	            if(opciones[j].idopcion==2) {


				$('#radio_'+encuesta.idencuesta+'_'+opciones[j].idcuestion+'_'+opciones[j].idopcion+'_'+opciones[j].respuesta).attr('checked',true);
	            $('#btn_'+encuesta.idencuesta+'_'+opciones[j].idcuestion+'_'+opciones[j].idopcion+'_'+opciones[j].respuesta).addClass('button-active');

	            }

	            if(opciones[j].idopcion==3) {

			    $("#respuesta_"+encuesta.idencuesta+"_"+opciones[j].idcuestion+"_"+opciones[j].idopcion).val(opciones[j].respuesta);
	            }
		}

}

function ObtenerDatosEncuesta() {
	var datos="idencuesta="+idencuesta+"&idservicio="+idservicio+"&id_user="+id_user;
	var pagina="ObtenerDatosEncuesta.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			var respuesta=datos.cuestiones;
			//PintarCuestiones(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}
function VerificarSihayEvaluacionUsuario() {
	var id_user=localStorage.getItem('id_user');
	var idservicio=localStorage.getItem('idservicio');
	var idtipousuario=localStorage.getItem('idtipousuario')

	var datos="idservicio="+idservicio+"&id_user="+id_user+"&idtipousuario="+idtipousuario;
	var pagina="ObtenerEvaluacionesUsuario.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			var respuesta=datos.respuesta;
			if (respuesta.length>0) {
				$(".divevaluaciones").css('display','block');
				$(".avatarcircle > i").removeClass('bi-check-circle');
				$(".avatarcircle > i").addClass('bi-check-circle-fill');
			}else{
				$(".divevaluaciones").css('display','none');
	
			}
			//PintarEvaluacionesUsuario(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}
function ObtenerListadoEvalucionesUsuario(argument) {
		var id_user=localStorage.getItem('id_user');
	var idservicio=localStorage.getItem('idservicio');

	var datos="idservicio="+idservicio+"&id_user="+id_user;
	var pagina="ObtenerEvaluacionesUsuario.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			var respuesta=datos.respuesta;
			
			PintarEvaluacionesUsuario(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}

function PintarEvaluacionesUsuario(respuesta) {  //<i class="bi-card-checklist"></i>
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			html+=
			`

			      <li style="background: white;
    border-radius: 10px;" onclick="Listacuestiones(`+respuesta[i].idencuesta+`)">
            <label class="label-radio item-content">                                                                               
              <div class="item-inner" style="width:80%;">
             
                <div class="row">
                <div class="item-media">
              		  <div class="col-30">
                        <figure class="avatar avatar-50 text-color-theme  rounded-10">
                       <i style="font-size:30px;" class="bi-card-checklist"></i>
                        </figure>
                        </div>
                        
                        	<div class="col-100">
                        	 <div class="col-100 item-text" style="margin-left: 1em;font-size:18px;" id="evaluacion_`+respuesta[i].idencuesta+`">`+respuesta[i].titulo+`

             		   </div>
             		   <div class="row">
             		     </div>
             		   </div>
             		   <div class="row">
                    </div>
                        	</div>
                        	
                        	</div>
                        </div>
             		 
              </div>

            </label>
          </li>


		
			`;
		}


	}

			$(".listaevaluaciones").html(html);

}


function ListadocuestionesUsuario() {
	$(".mostrar").css('display','none');
	var idservicio=localStorage.getItem('idservicio');
	var pagina = "ObtenerCuestiones.php";
	var id_user=localStorage.getItem('id_user');
	var idencuesta=localStorage.getItem('idencuesta');
	var datos="idencuesta="+idencuesta+"&idservicio="+idservicio+"&id_user="+id_user;
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		async:false,
		success: function(datos){
			var respuesta=datos.cuestiones;
			PintarCuestionesUsuario(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}
var opciones="";
var cuestiones="";
function PintarCuestionesUsuario(respuesta) {
	console.log('cues');
	 var html="";
	if (respuesta.length>0) {
		cuestiones=respuesta;
		for (var i = 0; i <respuesta.length; i++) {
			
			html+=`

		 <div style="background: white;border-radius: 10px;margin-bottom:1em;padding-bottom: 1em;">
            <label class="label-radio item-content">                                                                               
              <div class="" style="width:90%;">
             
                <div class="row">
                <div class="item-media">
              		  <div class="col-30">
                        <figure class="avatar avatar-50 text-color-theme  rounded-10">
                       <i style="font-size:30px;" class="bi-question-square-fill"></i>

                        </figure>
                        </div>
                        
                        	<div class="col-100">
                        	 <div class="col-100 item-text" style="margin-left: 1em;font-size:18px;" id="evaluacion_`+respuesta[i].idencuesta+`_`+respuesta[i].idcuestion+`">`+respuesta[i].titulo+`

             		   			</div>
		             		   <div class="row">
		             		   </div>
             		   </div>

                        	</div>
                        	</div>

                        	<div class="row">
							<div class="col-100">
							<div class="col-50"></div>
							<div class="col-50">
                		`;

             		   		
             		   		 opciones=respuesta[i].opciones;
             		   		for (var j = 0; j <opciones.length; j++) {
             		   			
             		   			if (opciones[j].idopcion==1) {
             		   				var opcionesvalue="";
/*             		   				  opcionesvalue+=`<option value="0">Selecciona un valor</option>`;
*/
             		   				
             		   				html+=`
             		   				<div id="res_`+respuesta[i].idencuesta+`_`+opciones[j].idcuestion+`_`+opciones[j].idopcion+`"  style="text-align:center;" ></div>
             		   				<input type="hidden" id="respuesta_`+respuesta[j].idencuesta+`-`+opciones[j].idcuestion+'_'+opciones[j].idopcion+`">	
             		   				`;

             		   			}

             		   			if (opciones[j].idopcion==2) {

             		   				html+=`

             		   					<div class="">
									        <div class="row">
									          <button class="col button button-large"  id="btn_`+respuesta[i].idencuesta+`_`+opciones[j].idcuestion+`_`+opciones[j].idopcion+`_1">SI</button>
									        </div>

									        <div class="row">
									          <button class="col button button-large"  id="btn_`+respuesta[i].idencuesta+`_`+opciones[j].idcuestion+`_`+opciones[j].idopcion+`_2">NO</button>
									        </div>

										</div>
             		   					 <label class="radio" style="display:none;">SI<input type="radio" value="1"  name="radioopcion_`+respuesta[i].idencuesta+`_`+opciones[j].idcuestion+`_`+opciones[j].idopcion+`" id="radio_`+respuesta[i].idencuesta+`_`+opciones[j].idcuestion+`_`+opciones[j].idopcion+`_1" /><i class="icon-radio"></i></label>
             		   				
 										 <label class="radio" style="display:none;" >NO<input type="radio" value="2" name="radioopcion_`+respuesta[i].idencuesta+`_`+opciones[j].idcuestion+`_`+opciones[j].idopcion+`" id="radio_`+respuesta[i].idencuesta+`_`+opciones[j].idcuestion+`_`+opciones[j].idopcion+`_2" /><i class="icon-radio"></i></label>
             		   				
										<input type="hidden" id="respuesta_`+respuesta[i].idencuesta+`-`+opciones[j].idcuestion+'_'+opciones[j].idopcion+`">	
             		   				
             		   				`;

             		   			}

             		   			if (opciones[j].idopcion==3) {

             		   				html+=`

             		   				<div style="margin-left: .5em;background:#eaebf1;margin-bottom: 1em;padding-left:1em;border-radius: 10px;padding: 1em;" id="respuesta_`+respuesta[i].idencuesta+`_`+opciones[j].idcuestion+'_'+opciones[j].idopcion+`"><div>
             		   					
             		   				`;
             		   			}

             		   		}

             		   		
             		   		html+=`
             		   		
             		   		</div>
             		   		</div>
                    		</div>
                        	
                        	</div>
                       
             		 
              </div>

            </label>
          </div>


		
		
			`;
		}
	}

	$("#divcuestiones").html(html);
	  ObtenerRespuestas(); 
}


function ObtenerRespuestas() {
	var idencuesta=localStorage.getItem('idencuesta');
	var idusuarioevaluacion=localStorage.getItem('id_user');
	var idservicio=localStorage.getItem('idservicio');
	var datos="idencuesta="+idencuesta+"&idusuarioevaluacion="+idusuarioevaluacion+"&idservicio="+idservicio;

	var pagina="ConsultarSihayrespuestas.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){

			var resp=datos.respuesta;
			var encuesta=datos.encuesta;
			if (encuesta.length>0) {

				PintarResultadoEncuestaUsuario(encuesta[0]);

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

function PintarResultadoEncuestaUsuario(encuesta) {
	$("#idusuarioencuesta").val(encuesta.idusuarioencuesta);

	var opciones=encuesta.cuestion;

	for (var j=0; j < opciones.length; j++) {

		   if(opciones[j].idopcion==1) {
		   	alert(encuesta.idencuesta+' '+opciones[j].idcuestion+' '+opciones[j].idopcion);
			    $("#res_"+encuesta.idencuesta+"_"+opciones[j].idcuestion+"_"+opciones[j].idopcion).text(opciones[j].respuesta);

			    }

	            if(opciones[j].idopcion==2) {

				$('#radio_'+encuesta.idencuesta+'_'+opciones[j].idcuestion+'_'+opciones[j].idopcion+'_'+opciones[j].respuesta).attr('checked',true);
	            $('#btn_'+encuesta.idencuesta+'_'+opciones[j].idcuestion+'_'+opciones[j].idopcion+'_'+opciones[j].respuesta).addClass('button-active');

	            }

	            if(opciones[j].idopcion==3) {

			    $("#respuesta_"+encuesta.idencuesta+"_"+opciones[j].idcuestion+"_"+opciones[j].idopcion).text(opciones[j].respuesta);
	            }
		}

}

function ConsultarSihayComentarios() {
	var idservicio=localStorage.getItem('idservicio');
    var idusuario=localStorage.getItem('id_user');
    var idtipousuario=localStorage.getItem('idtipousuario');
    var datos="idservicio="+idservicio+"&idusuario="+idusuario+"&idtipousuario="+idtipousuario;
    var pagina = "ObtenerComentariosServicio.php";
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: urlphp+pagina,
        data:datos,
        crossDomain: true,
        cache: false,
        async:false,
        success: function(datos){

           	var resp=datos.respuesta;
           	if (resp.length>0) {
           	    $('.divopiniones > i').removeClass('bi-chat-square-dots');

           		$('.divopiniones > i').addClass('bi-chat-square-dots-fill');
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

function VerificarSihayEvaluacion() {
	var id_user=localStorage.getItem('id_user');
	var idservicio=localStorage.getItem('idservicio');

	var datos="idservicio="+idservicio+"&id_user="+id_user;
	var pagina="ObtenerEvaluaciones.php";
	$.ajax({
		type: 'POST',
		dataType: 'json',
	 	url: urlphp+pagina,
		crossDomain: true,
		cache: false,
		data:datos,
		success: function(datos){
			var respuesta=datos.respuesta;
			if (respuesta.length>0) {
				
				$(".divevaluaciones").css('display','block');
			}else{
				$(".divevaluaciones").css('display','none');
	
			}
			//PintarEvaluacionesUsuario(respuesta);

			},error: function(XMLHttpRequest, textStatus, errorThrown){ 
				var error;
		 		  	if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				  	if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
								//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
					console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
			}

		});
}