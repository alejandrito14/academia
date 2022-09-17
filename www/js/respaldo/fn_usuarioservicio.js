

function ObtenerClientes() {
	
	$.ajax({
		url:'catalogos/asignarusuarioservicioslista/ObtenerAlumnos.php', //Url a donde la enviaremos
	  type:'POST', //Metodo que usaremos
	 dataType:'json',
	  error:function(XMLHttpRequest, textStatus, errorThrown){
			var error;
			console.log(XMLHttpRequest);
			if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
			if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
			$('#abc').html('<div class="alert_error">'+error+'</div>');	
			//aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
		},
	  success:function(msj){
		  var resp = msj.usuarios;
		  $("#myModalUsuarios").modal();

		  PintarUsuariosAlumnos(resp);

			 			
			}
	});
}

function PintarUsuariosAlumnos(respuesta) {
	var html="";
	if (respuesta.length>0) {

		for (var i = 0; i <respuesta.length; i++) {
			 var nombre=respuesta[i].nombre+" "+respuesta[i].paterno+" "+respuesta[i].materno+` - `+respuesta[i].usuario;

			html+=`

				<div class="form-check alumnos_"  id="alumnos_`+respuesta[i].idusuarios+`">		 
		  		<input  type="checkbox"   value="`+respuesta[i].idusuarios+`" class="form-check-input chkalumno" id="inputalumno_`+respuesta[i].idusuarios+`" onchange="SeleccionarAlumno(`+respuesta[i].idusuarios+`,'`+nombre+`')">
		  		<label class="form-check-label" for="flexCheckDefault" style="margin-top: 0.2em;" id="nombrealumnos_`+respuesta[i].idusuarios+`">`+nombre+`</label> 
				</div>						    		

			`;
		}
		$("#divusuarios").html(html);
	}
}
var alumnoseleccionado=[];
var nombreseleccionado=[];
function SeleccionarAlumno(idusuario,nombre) {
	
	/*$(".chkalumno").prop('checked',false);
	$("#inputalumno_"+idusuario).prop('checked',true);

	alumnoseleccionado=idusuario;
	nombreseleccionado=nombre;
*/alumnoseleccionado=[];
	$(".chkalumno").each(function( index ) {
	   if($(this).is(':checked')){
	   	var id=$(this).attr('id');
	   	var dividir=id.split('_')[1];

	   	var nombrealumnos_=$("#nombrealumnos_"+dividir).text();
	   	var objeto={
	   		idusuario:dividir,
	   		nombre:nombrealumnos_
	   	}

	   	alumnoseleccionado.push(objeto);

	   }
	});

	
}

function AceptarSeleccion() {



	$("#myModalUsuarios").modal('hide');
	//$(".nombreusuario").val(nombreseleccionado);
	$("#lstBox1").html('');
	$("#lstBox2").html('');
		ObtenerServiciosporasignar();
	

	var html="";
	for (var i = 0; i < alumnoseleccionado.length; i++) {
		html+=`<p style="margin:0;" id="seleccionado_`+alumnoseleccionado[i].idusuario+`">`+alumnoseleccionado[i].nombre+`</p>`;
	}
	$("#listarseleccionados").html(html);
	
	$("#botones").css('display','block');



}
function CerrarSeleccion() {
	
	$("#myModalUsuarios").modal('hide');

}

function ObtenerServiciosporasignar() {
	
	var datos="idusuario="+JSON.stringify(alumnoseleccionado);

	$.ajax({
		url:'catalogos/asignarusuarioservicioslista/ObtenerServiciosporasignar.php', //Url a donde la enviaremos
	  type:'POST', //Metodo que usaremos
	 dataType:'json',
	 data:datos,
	 async:false,
	  error:function(XMLHttpRequest, textStatus, errorThrown){
			var error;
			console.log(XMLHttpRequest);
			if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
			if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
			$('#abc').html('<div class="alert_error">'+error+'</div>');	
			//aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
		},
	  success:function(msj){
		 
	  		var servicios=msj.servicios;
	  		var serviciosasignados=msj.serviciosasignados;
	  		PintarServicios(servicios);
	  		PintarAsignados(serviciosasignados);
			 			
			}
	});
}

function PintarServicios(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i < respuesta.length; i++) {
			html+=`
			<option value="`+respuesta[i].idservicio+`">`+respuesta[i].titulo+`</option>
			`;
		}

		
	}
	$("#lstBox1").html(html);
}
function PintarAsignados(respuesta) {
	$(".serviciosdesc").css('display','none');

	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i < respuesta.length; i++) {
		html+=`
			<option value="`+respuesta[i].idservicio+`">`+respuesta[i].titulo+`</option>
		`;	

		}
	}
	$("#lstBox2").html(html);

	var html2="";
	if (respuesta.length>0) {
		$(".serviciosdesc").css('display','block');

		for (var i = 0; i < respuesta.length; i++) {
		/*html2+=`
			 <a href="#" class="list-group-item list-group-item-action flex-column align-items-start ">
        <div class="d-flex w-100 justify-content-between">
          <p class="mb-1"><span style="font-weight: bold;">TÍTULO:</span> `+respuesta[i].titulo+`</p>
          <small></small>
        </div>
        <p class="mb-1"><span style="font-weight: bold;">DESCRIPCIÓN:</span> `+respuesta[i].descripcion+`</p>
        <p class="mb-1"><span style="font-weight: bold;">TIPO DE FORMATO:</span> `+respuesta[i].titulocategoria+`</p>
        <p class="mb-1"><span style="font-weight: bold;">FECHA INICIAL:</span> `+respuesta[i].fechainicial+`</p>
        <p class="mb-1"><span style="font-weight: bold;">FECHA FINAL:</span> `+respuesta[i].fechafinal+`</p>`;
*/
        var domingo="btn_colorgray3";
        var lunes="btn_colorgray3";
        var martes="btn_colorgray3";
        var miercoles="btn_colorgray3";
        var jueves="btn_colorgray3";
        var viernes="btn_colorgray3";
        var sabado="btn_colorgray3";
         if (respuesta[i].domingo==1) {
        	domingo="active1";
        }
        if (respuesta[i].lunes==1) {
			lunes="active1";
        }

         if (respuesta[i].martes==1) {
			martes="active1";

        }
        if (respuesta[i].miercoles==1) {
			miercoles="active1";

        }

         if (respuesta[i].jueves==1) {
			jueves="active1";

        }
         if (respuesta[i].viernes==1) {
			viernes="active1";

        }
 if (respuesta[i].sabado==1) {
			sabado="active1";

        }
        var fecha1=respuesta[i].fechainicial;
        var fecha2=respuesta[i].fechafinal;

        html2+=`
        	<div class="list-group-item">
						<div class="row">
							<div class="col-md-3">
							`+respuesta[i].titulo+`
							</div>
						
							<div class="col-md-3">
							 `+respuesta[i].descripcion+`
							</div>
							<div class="col-md-2">
							`+respuesta[i].titulocategoria+`
							</div>

							<div class="col-md-2">
							 `+fecha1.split('-')[2]+`-`+fecha1.split('-')[1]+`-`+fecha1.split('-')[0]+` 
							</div>
							<div class="col-md-2">
							 `+fecha2.split('-')[2]+`-`+fecha2.split('-')[1]+`-`+fecha2.split('-')[0]+` 
							</div>

						</div>
					 </div>

        `;

  /*  html2+=`
    	<div class="form-group m-t-20">
		 <div class="btn-group btn-group-toggle d-flex flex-column flex-md-row" data-toggle="buttons">

			<label class="btn btn_colorgray2 lbldomingo lbldias `+domingo+` ">
			 <input type="checkbox" id="Domingo" class="diasckeckbox" value="0" disabled="disabled"> Domingo
			 </label>
			<label class="btn btn_colorgray2 lbllunes lbldias `+lunes+` ">
			 <input type="checkbox" id="Lunes" class="diasckeckbox" value="1" disabled="disabled"> Lunes
			</label>
			<label class="btn btn_colorgray2 lblmartes lbldias `+martes+` ">
			<input type="checkbox" id="Martes" class="diasckeckbox" value="2" disabled="disabled"> Martes
			</label>

			<label class="btn btn_colorgray2 lblmiercoles lbldias  `+miercoles+`">
			<input type="checkbox" id="Miercoles" class="diasckeckbox" value="3" disabled="disabled"> Miércoles
			</label>

			<label class="btn btn_colorgray2 lbljueves lbldias `+jueves+` ">
			<input type="checkbox" id="Jueves" class="diasckeckbox" value="4" disabled="disabled"> Jueves
		 	</label>

			<label class="btn btn_colorgray2 lblviernes lbldias `+viernes+` ">
			<input type="checkbox" id="Viernes" class="diasckeckbox" value="5" disabled="disabled"> Viernes
			</label>

			<label class="btn btn_colorgray2 lblsabado lbldias `+sabado+` ">
			<input type="checkbox" id="Sabado" class="diasckeckbox" value="6" disabled="disabled"> Sábado
			</label>

			</div>

									
			</div>

      </a>
		`;	*/

		}
	}

		$("#serviciosdescripcion").html(html2);

}

function GuardarAsignacionServicio() {

	var idservicios=[];
	 $("#lstBox2 option").each(function(){
    
       idservicios.push($(this).val());

     });
	 if (alumnoseleccionado.length > 0) {
     var datos="idusuario="+JSON.stringify(alumnoseleccionado)+"&idservicios="+idservicios;

	$.ajax({
		url:'catalogos/asignarusuarioservicioslista/GuardarAsignacionServicio.php', //Url a donde la enviaremos
	  type:'POST', //Metodo que usaremos
	 dataType:'json',
	 data:datos,
	 async:false,
	  error:function(XMLHttpRequest, textStatus, errorThrown){
			var error;
			console.log(XMLHttpRequest);
			if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
			if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
			$('#abc').html('<div class="alert_error">'+error+'</div>');	
			//aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
		},
	  success:function(msj){
		 ObtenerServiciosporasignar();

		AbrirNotificacion("SE REALIZARON LOS CAMBIOS CORRECTAMENTE","mdi-checkbox-marked-circle ")
			 			
			}
		});

	}else{

		AbrirNotificacion("NO SE ENCUENTRA USUARIO SELECCIONADO","mdi-close-circle");
	}
}

function CancelarAsignacion() {
	alumnoseleccionado=0;
	nombreseleccionado="";
	$(".nombreusuario").val('');
	$("#lstBox1").html('');

	$("#lstBox2").html('');
	$("#botones").css('display','none');

}
function VerificarServicio(idservicio) {
	  return new Promise(function(resolve, reject) {
		var datos="idservicio="+idservicio+"&idusuario="+alumnoseleccionado;
				$.ajax({
				type: 'POST',
				dataType: 'json',
				data:datos,
				url:'catalogos/asignarusuarioservicioslista/verificarServicios.php', //Url a donde la enviaremos
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

