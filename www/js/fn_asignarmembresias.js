
function ObtenerClientesMembresia() {
	
	$.ajax({
		url:'catalogos/asignarmembresias/ObtenerAlumnos.php', //Url a donde la enviaremos
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

		  PintarUsuariosAlumnosMembresia(resp);

			 			
			}
	});
}

function PintarUsuariosAlumnosMembresia(respuesta) {
	var html="";
	if (respuesta.length>0) {

		for (var i = 0; i <respuesta.length; i++) {
			 var nombre=respuesta[i].nombre+" "+respuesta[i].paterno+" "+respuesta[i].materno+` - `+respuesta[i].usuario;

			html+=`

				<div class="form-check alumnos_"  id="alumnos_`+respuesta[i].idusuarios+`">		 
		  		<input  type="checkbox"   value="`+respuesta[i].idusuarios+`" class="form-check-input chkalumno" id="inputalumno_`+respuesta[i].idusuarios+`" onchange="SeleccionarAlumnoMembresia(`+respuesta[i].idusuarios+`,'`+nombre+`')">
		  		<label class="form-check-label" for="flexCheckDefault" style="margin-top: 0.2em;">`+nombre+`</label> 
				</div>						    		

			`;
		}
		$("#divusuarios").html(html);
	}
}
var alumnoseleccionado=0;
var nombreseleccionado="";
function SeleccionarAlumnoMembresia(idusuario,nombre) {
	
	$(".chkalumno").prop('checked',false);
	$("#inputalumno_"+idusuario).prop('checked',true);

	alumnoseleccionado=idusuario;
	nombreseleccionado=nombre;
	
}




function AceptarSeleccionMembresia() {

	$("#myModalUsuarios").modal('hide');
	$(".nombreusuario").val(nombreseleccionado);
	ObtenerMembresiasporasignar();
	$("#botones").css('display','block');
}

function ObtenerMembresiasporasignar() {
	
	var datos="idusuario="+alumnoseleccionado;

	$.ajax({
		url:'catalogos/asignarmembresias/ObtenerMembresiasporasignar.php', //Url a donde la enviaremos
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
		 
	  		var Membresias=msj.membresias;
	  		var Membresiasasignados=msj.membresiasasignados;
	  		PintarMembresias(Membresias);
	  		PintarAsignadosMembresias(Membresiasasignados);
			 			
			}
	});
}


function PintarMembresias(respuesta) {
	var html="";
	if (respuesta.length>0) {

		for (var i = 0; i < respuesta.length; i++) {
			html+=`
			<option value="`+respuesta[i].idmembresia+`">`+respuesta[i].titulo+`</option>
			`;
		}

		
	}
	$("#lstBox1").html(html);
}
function PintarAsignadosMembresias(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i < respuesta.length; i++) {
		html+=`
			<option value="`+respuesta[i].idmembresia+`">`+respuesta[i].titulo+`</option>
		`;	

		}
	}
	$("#lstBox2").html(html);


	var html2="";
	if(respuesta.length>0) {
			for (var i = 0; i < respuesta.length; i++) {
			html2+=`
				 <a href="#" class="list-group-item list-group-item-action flex-column align-items-start ">
	        <div class="d-flex w-100 justify-content-between">
	          <p class="mb-1"><span style="font-weight: bold;">TÍTULO:</span> `+respuesta[i].titulo+`</p>
	          <small></small>
	        </div>`;
	        porcentaje="";
	        monto="";
	       

	        html2+=`<p class="mb-1"><span style="font-weight: bold;">Membresia:</span> `+respuesta[i].descripcion+`</p>`;
	        html2+=`
	       	 </div>
	        </a>
	        `;
	    }
	}

$("#membresiasdescripcion").html(html2);

}



function GuardarAsignacionMembresia() {

	var idMembresias=[];
	 $("#lstBox2 option").each(function(){
    
       idMembresias.push($(this).val());

     });
	 if (alumnoseleccionado>0) {
     var datos="idusuario="+alumnoseleccionado+"&idmembresias="+idMembresias+"&membresiaseleccionada="+JSON.stringify(membresiaseleccionada);

	$.ajax({
		url:'catalogos/asignarmembresias/GuardarAsignacionMembresia.php', //Url a donde la enviaremos
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
		 ObtenerMembresiasporasignar();
		AbrirNotificacion("SE REALIZARON LOS CAMBIOS CORRECTAMENTE","mdi-checkbox-marked-circle ")
		$("#botones").css('display','none');		
			}
		});

	}else{

		AbrirNotificacion("NO SE ENCUENTRA USUARIO SELECCIONADO","mdi-close-circle");
	}
}
function VerificarMembresia(idmembresia) {
	  return new Promise(function(resolve, reject) {
		var datos="idmembresia="+idmembresia+"&idusuario="+alumnoseleccionado;
				$.ajax({
				type: 'POST',
				dataType: 'json',
				data:datos,
				url:'catalogos/asignarmembresias/verificarMembresia.php', //Url a donde la enviaremos
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

function AbrirModalFormulario() {
	var selectObject =document.getElementById("lstBox1");
 	
    for (var i = 0; i < selectObject.options.length; i++) {
        if(selectObject.options[i].selected == true){              
           ids=selectObject.options[i].value;
          }
      }


      ObtenerMembresiaSeleccionada(ids).then(function(resp) {
  			var respuesta=resp.membresia[0];
  			$("#v_fecha").val(respuesta.fecha);
  			$("#v_repetir").val(respuesta.repetir);
  			$("#v_numerodias").val(respuesta.cantidaddias);	
	});

	$("#mymodal").modal();
	$("#inputmembresiaselec").val(ids);
}
var membresiaseleccionada=[];

function AgregarMembresia() {

	$("#v_fecha").removeClass('campoborderequerido');
	$("#v_numerodias").removeClass('campoborderequerido');
	$("#v_repetir").removeClass('campoborderequerido');
			$(".mensaje").html('');


	 var fecha=$("#v_fecha").val();
	 var numerodias=$("#v_numerodias").val();
	 var repetir=$("#v_repetir").val();
	 var idmembresia=$("#inputmembresiaselec").val();
	 var bandera=1;
	 if (fecha=='') {
	 	bandera=0;
	 }

	 if (numerodias=='') {
	 	bandera=0;
	 }
	 if (repetir=='') {
	 	bandera=0;
	 }
	 if (bandera==1) {
	 	$('select').moveToListAndDelete('#lstBox1', '#lstBox2');

	 		var objeto={
	 			fecha:fecha,
	 			numerodias:numerodias,
	 			repetir:repetir,
	 			idmembresia:idmembresia
	 		};

	      membresiaseleccionada.push(objeto);
	      	 $("#mymodal").modal('hide');
	      	 $("#botones").css('display','block');
	      console.log(membresiaseleccionada);
		}else{

			var msj="";
			if (fecha=='') {
			 	$("#v_fecha").addClass('campoborderequerido');
			 }

			 if (numerodias=='') {
			 	$("#v_numerodias").addClass('campoborderequerido');
			 }

			 if (repetir=='') {
			 	$("#v_repetir").addClass('campoborderequerido');
			 }

			//AbrirNotificacion(msj,"mdi-close-circle ")
 
			$(".mensaje").html('<p style="color:red;">*Campos requeridos</p>');
		}

}

function ObtenerMembresiaSeleccionada(idmembresia) {
	  return new Promise(function(resolve, reject) {
		var datos="idmembresia="+idmembresia;
				$.ajax({
				type: 'POST',
				dataType: 'json',
				data:datos,
				url:'catalogos/asignarmembresias/Obtenerdatosmembresia.php', //Url a donde la enviaremos
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

function BorrarAsignacionmembresia() {
	var idmembresia=$('#lstBox2 option:selected');
	for (var i = 0; i < membresiaseleccionada.length; i++) {
		if (membresiaseleccionada[i].idmembresia==idmembresia) {
			membresiaseleccionada.splice(i,1);
		}
	}
}
