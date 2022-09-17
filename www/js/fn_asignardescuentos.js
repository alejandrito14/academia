
function ObtenerClientesDescuento() {
	
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

		  PintarUsuariosAlumnosDescuento(resp);

			 			
			}
	});
}

function PintarUsuariosAlumnosDescuento(respuesta) {
	var html="";
	if (respuesta.length>0) {

		for (var i = 0; i <respuesta.length; i++) {
			 var nombre=respuesta[i].nombre+" "+respuesta[i].paterno+" "+respuesta[i].materno+` - `+respuesta[i].usuario;

			html+=`

				<div class="form-check alumnos_"  id="alumnos_`+respuesta[i].idusuarios+`">		 
		  		<input  type="checkbox"   value="`+respuesta[i].idusuarios+`" class="form-check-input chkalumno" id="inputalumno_`+respuesta[i].idusuarios+`" onchange="SeleccionarAlumnoDescuento(`+respuesta[i].idusuarios+`,'`+nombre+`')">
		  		<label class="form-check-label" for="flexCheckDefault" style="margin-top: 0.2em;" id="nombrealumnos_`+respuesta[i].idusuarios+`">`+nombre+`</label> 
				</div>						    		

			`;
		}
		$("#divusuarios").html(html);
	}
}
var alumnoseleccionado=[];
var nombreseleccionado=[];
function SeleccionarAlumnoDescuento(idusuario,nombre) {
	
	/*$(".chkalumno").prop('checked',false);
	$("#inputalumno_"+idusuario).prop('checked',true);

	alumnoseleccionado=idusuario;
	nombreseleccionado=nombre;
*/
	alumnoseleccionado=[];
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




function AceptarSeleccionDescuento() {

	$("#myModalUsuarios").modal('hide');
	$("#lstBox1").html('');
	$("#lstBox2").html('');
	//$(".nombreusuario").val(nombreseleccionado);
	ObtenerDescuentosporasignar();
	var html="";
	for (var i = 0; i < alumnoseleccionado.length; i++) {
		html+=`<p style="margin:0;" id="seleccionado_`+alumnoseleccionado[i].idusuario+`">`+alumnoseleccionado[i].nombre+`</p>`;
	}
	$("#listarseleccionados").html(html);
	$("#botones").css('display','block');
}

function ObtenerDescuentosporasignar() {
	
	var datos="idusuario="+JSON.stringify(alumnoseleccionado);

	$.ajax({
		url:'catalogos/asignardescuentos/ObtenerDescuentosporasignar.php', //Url a donde la enviaremos
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
		 
	  		var descuentos=msj.descuentos;
	  		var descuentosasignados=msj.descuentosasignados;
	  		PintarDescuentos(descuentos);
	  		PintarAsignadosDescuentos(descuentosasignados);
			 			
			}
	});
}


function PintarDescuentos(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i < respuesta.length; i++) {
			html+=`
			<option value="`+respuesta[i].iddescuento+`">`+respuesta[i].titulo+`</option>
			`;
		}

		
	}
	$("#lstBox1").html(html);
}
function PintarAsignadosDescuentos(respuesta) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i < respuesta.length; i++) {
		html+=`
			<option value="`+respuesta[i].iddescuento+`">`+respuesta[i].titulo+`</option>
		`;	

		}
	}
	$("#lstBox2").html(html);


	var html2="";
	var arraytipo=['PORCENTAJE','MONTO'];
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
	        if (respuesta[i].tipo==0) {
	        	porcentaje="%";
	        }
	        if (respuesta[i].tipo==1) {
	        	monto="$";
	        }

	        html2+=`<p class="mb-1"><span style="font-weight: bold;">DESCUENTO:</span> `+monto+``+respuesta[i].monto+``+porcentaje+`</p>`;
	        html2+=`
	       	 </div>
	        </a>
	        `;
	    }
	}

$("#descuentosdescripcion").html(html2);

}



function GuardarAsignacionDescuento() {

	var iddescuentos=[];
	 $("#lstBox2 option").each(function(){
    
       iddescuentos.push($(this).val());

     });
	 if (alumnoseleccionado.length >0) {
     var datos="idusuario="+JSON.stringify(alumnoseleccionado)+"&iddescuentos="+iddescuentos;

	$.ajax({
		url:'catalogos/asignardescuentos/GuardarAsignacionDescuento.php', //Url a donde la enviaremos
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
		 ObtenerDescuentosporasignar();
		AbrirNotificacion("SE REALIZARON LOS CAMBIOS CORRECTAMENTE","mdi-checkbox-marked-circle ")
			 			
			}
		});

	}else{

		AbrirNotificacion("NO SE ENCUENTRA USUARIO SELECCIONADO","mdi-close-circle");
	}
}
function VerificarDescuento(iddescuento) {
	  return new Promise(function(resolve, reject) {
		var datos="iddescuento="+iddescuento+"&idusuario="+alumnoseleccionado;
				$.ajax({
				type: 'POST',
				dataType: 'json',
				data:datos,
				url:'catalogos/asignardescuentos/verificarDescuento.php', //Url a donde la enviaremos
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

