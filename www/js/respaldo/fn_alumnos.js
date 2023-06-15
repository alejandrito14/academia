
function ObtenerTipos(seleccionado) {

	var datos="tipos=3,4,5,6";

	 $.ajax({
					url:'catalogos/alumnos/tiposusuarios.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					data: datos, //Le pasamos el objeto que creamos con los archivos
					dataType:'json',
					error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $("#empresasasignadas").html(error); 
					  },
					success:function(msj){
						
							PintarTiposUsuarios(msj,seleccionado);
					  	}
				  });
}

function PintarTiposUsuarios(respuesta,seleccionado) {
	var html="";
	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
		
			html+=`<option value="`+respuesta[i].idtipousuario+`">`+respuesta[i].nombretipo+`</option>`;
		}
	}

	$("#v_tipo").html(html);

	if (seleccionado!=0) {

		$("#v_tipo").val(seleccionado);
	}
}



function BorrarCliente(idcliente,nombre,idmenumodulo,regresar) {

	var r = confirm("¿SEGURO DE ELIMINAR  "+nombre+" ?");
	if (r == true) {



		var datos='idusuarios='+idcliente;

		$.ajax({
							url:'catalogos/alumnos/eliminarusuario.php', //Url a donde la enviaremos
							type:'POST', //Metodo que usaremos
							data: datos, //Le pasamos el objeto que creamos con los archivos
							error:function(XMLHttpRequest, textStatus, errorThrown){
								var error;
								console.log(XMLHttpRequest);
								  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
								  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
								  $("#main").html(error); 
								},
								success:function(msj){

									if (msj==0) {
										AbrirNotificacion('El usuario se encuentra relacionado  ','mdi mdi-checkbox-marked-circle');

									}

									if (msj==1) {

											AbrirNotificacion('Se ha eliminado correctamente','mdi mdi-checkbox-marked-circle');

											aparecermodulos(regresar+'?idmenumodulo='+idmenumodulo,'main');
	
									}

								}
							});

	} 
}

function AbrirModalAsociado() {
	$("#myModalAsociados").modal();
	 phoneFormatter2('v_celularaso');
	 buscadoralumnos();
	 ObtenerParentescos(0);
	 LimpiarUsuario();
}

function buscadoralumnos() {

	$.ajax({
					url:'catalogos/alumnos/ObtenerAlumnosNoAsignados.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					dataType:'json',
					error:function(XMLHttpRequest, textStatus, errorThrown){
						var error;
						console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $("#d_lista_direcciones_envio").html(error); 
						},
						success:function(msj){

							var respuesta=msj.respuesta;
							PintarResultado(respuesta);
							


						}
					});	
}

function PintarResultado(respuesta) {
	var html="";
	$("#buscadoralumnos").html('');
	html+=`<option value="0">Seleccionar Alumno</option>`;
	if (respuesta.length>0) {

		contar=0;
		for (var i = 0; i <respuesta.length; i++) {
			var buscar=BuscarIdEnArray(respuesta[i].idusuarios);
			

			if (buscar==0) {

				html+=`
				<option value="`+respuesta[i].idusuarios+`">`+respuesta[i].nombre+` `+respuesta[i].paterno+``+respuesta[i].materno+` `+respuesta[i].celular+`</option>
			`;	
			
			}
			
		}


		$("#buscadoralumnos").html(html);
		$("#buscadoralumnos").chosen({width: "70%"});
	    $("#buscadoralumnos").trigger('chosen:updated');

		
	}
}

function BuscarIdEnArray(idusuario) {

	var encontrado=0;
	if (asociados.length>0) {
		for (var i = 0; i <asociados.length; i++) {
			
			if(asociados[i].idalumnoasociado === idusuario){
				encontrado=1;
				return encontrado;

			}
		}
		
		if (encontrado==0) {
			return encontrado;
		}

	}else{

		return encontrado;
	}
}

function GuardarAlumnoAsociado() {
	var v_celularaso=$("#v_celularaso").val();
	//var v_aliasaso=$("#v_aliasaso").val();
	var nombreaso=$("#nombreaso").val();
	var v_paternoaso=$("#v_paternoaso").val();
	var v_maternoaso=$("#v_maternoaso").val();
	var v_sexoaso=$("#v_sexoaso").val();
	var v_fechanacimientoaso=$("#v_fechanacimientoaso").val();
	var emailaso=$("#emailaso").val();
	var v_soytutor=$("#v_soytutor").is(':checked')?1:0;
	var posicion=$("#posicion").val();
	var idalumnoasociado=$("#idalumnoasociado").val();
	var parentesco=$("#v_parentesco").val();
	var textoparentesco=$("#v_parentesco option:selected").text();

	$("#spancelular").text('');
	$("#spannombre").text('');
	$("#spanpaterno").text('');
	$("#spanmaterno").text('');
	$("#spansexo").text('');
	$("#spanfechanacimiento").text('');
	$("#spanemail").text('');
	$("#spanparentesco").text('');

	var bandera=1;
	if (v_celularaso=='') {
		bandera=0;
	}
	if (nombreaso=='') {
		bandera=0;
	}
	if (v_paternoaso=='') {
		bandera=0;
	}
	if (v_maternoaso=='') {
		bandera=0;
	}
	if (v_sexoaso=='') {
		bandera=0;
	}
	if (v_fechanacimientoaso=='') {
		bandera=0;
	}
	if (emailaso=='') {
		bandera=0;
	}

	if (parentesco==0) {
		bandera=0;
	}

	if (bandera==1) {
	var objeto={
		v_celularaso:v_celularaso,
/*		v_aliasaso:v_aliasaso,
*/		nombreaso:nombreaso,
		v_paternoaso:v_paternoaso,
		v_maternoaso:v_maternoaso,
		v_sexoaso:v_sexoaso,
		v_fechanacimientoaso:v_fechanacimientoaso,
		emailaso:emailaso,
		v_soytutor:v_soytutor,
		idalumnoasociado:idalumnoasociado,
		parentesco:parentesco,
		textoparentesco:textoparentesco
	};
	
		if (posicion=='-1') {

			asociados.push(objeto);
		}else{
			encontrado=0;
			for (var i = 0; i <asociados.length; i++) {
				
				if (posicion==i) {

					asociados[i]=objeto;
					encontrado=1;
					break;
				}
				
			}


		}
		$("#idalumnoasociado").val(0);
		$("#myModalAsociados").modal('hide');
		PintarAsociados();
	}else{

		if (v_celularaso=='') {
		bandera=0;
		$("#spancelular").text('Celular requerido');
		}
		if (nombreaso=='') {
			bandera=0;
		$("#spannombre").text('Nombre requerido');
		}
		if (v_paternoaso=='') {
			bandera=0;
		$("#spanpaterno").text('Apellido paterno requerido');
	
		}
		if (v_maternoaso=='') {
			bandera=0;
		$("#spanmaterno").text('Apellido materno requerido');

		}
		if (v_sexoaso=='') {
			bandera=0;
		$("#spansexo").text('Sexo requerido');

		}
		if (v_fechanacimientoaso=='') {
			bandera=0;
		$("#spanfechanacimiento").text('Fecha de nacimiento requerido');

		}
		if (emailaso=='') {
			bandera=0;
		$("#spanemail").text('Email requerido');

		}

		if (parentesco==0) {
			bandera=0;
		$("#spanparentesco").text('Parentesco requerido');

		}

		

	}
}

function PintarAsociados() {
	var html="";
	if (asociados.length>0) {
		for (var i = 0; i < asociados.length; i++) {
			html+=`
			<tr id="fila_`+i+`">
			<td>
			`+asociados[i].v_celularaso+`
			</td>
			<td>`+asociados[i].nombreaso+`</td>
			<td>`+asociados[i].v_paternoaso+`</td>
			<td>`+asociados[i].v_maternoaso+`</td>
			<td>`;

			if(asociados[i].v_sexoaso=='H'){
				html+=`HOMBRE`;
			}else{
				html+=`MUJER`;
			}

			html+=`</td>
			<td>`+asociados[i].v_fechanacimientoaso+`</td>
			<td>`+asociados[i].emailaso+`</td>
			<td>`+asociados[i].textoparentesco+`</td>

			<td>`;

			if (asociados[i].v_soytutor==1) {
				html+=`<span class="mdi mdi-check"></span>`;
	 
			}
			html+=`</td>
			<td align="center">
						
				<button type="button" onclick="EditarAsociado(`+i+`)" class="btn btn_colorgray" style="" title="EDITAR">
					<i class="mdi mdi-table-edit"></i>
				</button>
				<button type="button" onclick="EliminarAsociado(`+i+`)" class="btn btn_rojo" style="" title="BORRAR">
					<i class="mdi mdi-delete-empty"></i>
				</button>
		
				</td>
			</tr>


			`;
		}
	}

	$("#tblasociados").html(html);
}

function EditarAsociado(posicion) {
	
	var encontrado=0;
	var resultado="";
	
	$("#myModalAsociados").modal();

for (var i = 0; i < asociados.length; i++) {
		if (posicion==i) {

			resultado=asociados[i];
			encontrado=1;
			break;
		}
		
	}

	$("#v_celularaso").val(resultado.v_celularaso);
	$("#v_aliasaso").val(resultado.v_aliasaso);
	$("#nombreaso").val(resultado.nombreaso);
	$("#v_paternoaso").val(resultado.v_paternoaso);
	$("#v_maternoaso").val(resultado.v_maternoaso)
	$("#v_sexoaso").val(resultado.v_sexoaso);
	$("#v_fechanacimientoaso").val(resultado.v_fechanacimientoaso);
	$("#emailaso").val(resultado.emailaso);
	$("#v_parentesco").val(resultado.parentesco);
	if (resultado.v_soytutor==1) {
		$("#v_soytutor").attr('checked',true);

		}else{
		$("#v_soytutor").attr('checked',false);

		}
	$("#posicion").val(posicion);
	$("#idalumnoasociado").val(resultado.idalumnoasociado);
	

	
}

function EliminarAsociado(posicion) {

	var r = confirm("¿SEGURO DE ELIMINAR  ASOCIADO ?");
		if (r == true) {

		$("#fila_"+posicion+"").remove();

		for (var i = 0; i < asociados.length; i++) {

			if (posicion==i) {
				asociadoseliminados.push(asociados[i]);
				
				asociados.slice(0,i);
				break;
			}

		}
	}

}

function  Guardarusuario(form_usuario,regreso,donde,archivoenvio,idmenumodulo)
{
	
	if(confirm("\u00BFEstas seguro de querer realizar esta operaci\u00f3n?"))
	{
		var datos = ObtenerDatosFormulario(form_usuario);//obteniedo los datos del formulario
		datos+="&asociados="+JSON.stringify(asociados);
		datos+="&asociadoseliminados="+JSON.stringify(asociadoseliminados);
		$('#abc').html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Cargando...</div>');
	
		setTimeout(function(){
				  $.ajax({
					  type: 'POST',
					  url: archivoenvio,
					  data: datos,
					  error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $('#abc').html('<div class="alert_error">'+error+'</div>');	
						 aparecermodulos(regreso+"?ac=0&msj=Error. "+msj,donde);

					  },
					  success:function(msj){
						   console.log("El resultado de msj es: "+msj);
						  if ( msj == 1 ){
							 
							  aparecermodulos(regreso+"?ac=1&msj=Operacion realizada con exito&idmenumodulo="+idmenumodulo,donde);
						  }
						  else{
							
							 aparecermodulos(regreso+"?ac=0&msj=Error. "+msj,donde);
						  }	
					  }
				  });				  					  
		},1000);
	}
}

function ObtenerParentescos(idparentesco) {
		$.ajax({
		type: 'POST',
		dataType: 'json',
		url:'catalogos/alumnos/ObtenerParentescos.php', //Url a donde la enviaremos
		async:false,
		success: function(datos){
			PintarParentesco(datos.respuesta,idparentesco);

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
				//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
				console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});

}
function PintarParentesco(respuesta,idparentesco) {
		var html="";

	html+=`<option value="0">Seleccionar parentesco</option>`;

	if (respuesta.length>0) {
 
		for (var i = 0; i < respuesta.length; i++) {
			html+=`<option value="`+respuesta[i].idparentesco+`">`+respuesta[i].parentesco+`</option>`;
			console.log(html);
		}


		$("#v_parentesco").html(html);

		if (idparentesco!=0) {
			$("#v_parentesco").val(idparentesco);
		}

	}
}

function ObtenerAsociados(idusuario) {
		var datos="idusuario="+idusuario;
		$.ajax({
		type: 'POST',
		dataType: 'json',
		data:datos,
		url:'catalogos/alumnos/ObtenerAsociados.php', //Url a donde la enviaremos
		async:false,
		success: function(res){
			ColocarAsociados(res.respuesta);

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
				//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
				console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});
}

function ColocarAsociados(respuesta) {
	
	if (respuesta.length>0) {

				for (var i = 0; i <respuesta.length; i++) {
					var objeto={
						v_celularaso:respuesta[i].celular,
						nombreaso:respuesta[i].nombre,
						v_paternoaso:respuesta[i].paterno,
						v_maternoaso:respuesta[i].materno,
						v_sexoaso:respuesta[i].sexo,
						v_fechanacimientoaso:respuesta[i].fechanacimiento,
						emailaso:respuesta[i].email,
						v_soytutor:respuesta[i].sututor,
						idalumnoasociado:respuesta[i].idusuariotutorado,
						parentesco:respuesta[i].idparentesco,
						textoparentesco:respuesta[i].parentesco
					};
					asociados.push(objeto);
				}

				PintarAsociados();
		}

	}
function SeleccionarUsuario() {
	var idusuario=$("#buscadoralumnos").val();
		var datos="idusuario="+idusuario;
		$.ajax({
		type: 'POST',
		dataType: 'json',
		data:datos,
		url:'catalogos/alumnos/ObtenerUsuario.php', //Url a donde la enviaremos
		async:false,
		success: function(res){
			ColocarDatoUsuario(res.respuesta[0]);
			$("#btnfuncion").attr('onclick','LimpiarUsuario()');
			$("#btnfuncion").text('LIMPIAR');

		},error: function(XMLHttpRequest, textStatus, errorThrown){ 
			var error;
				if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
				if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
				//alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
				console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
		}

	});

}

function ColocarDatoUsuario(usuario) {
	
	$("#v_celularaso").val(usuario.celular);
	$("#nombreaso").val(usuario.nombre);
	$("#v_paternoaso").val(usuario.paterno);
	$("#v_maternoaso").val(usuario.materno);
	$("#v_fechanacimientoaso").val(usuario.fechanacimiento);
	$("#emailaso").val(usuario.email);
	$("#v_parentesco").val(0);
	$("#v_soytutor").attr('checked',false);
	$("#idalumnoasociado").val(usuario.idusuarios);
}
function LimpiarUsuario() {

	$("#v_celularaso").val('');
	$("#nombreaso").val('');
	$("#v_paternoaso").val('');
	$("#v_maternoaso").val('');
	$("#v_fechanacimientoaso").val('');
	$("#emailaso").val('');
	$("#v_parentesco").val(0);
	$("#v_soytutor").attr('checked',false);
	$("#posicion").val(-1);
	$("#idalumnoasociado").val(0);
	$("#btnfuncion").text('SELECCIONAR');
	$("#btnfuncion").attr('onclick','SeleccionarUsuario()');
	$("#buscadoralumnos").val(0);
	 $("#buscadoralumnos").trigger('chosen:updated');
}

function CambioTipoUsuario() {

	var tipo=$("#v_tipo").val();

	if (tipo==3) {
	  $("#divasociados").css('display','block');
	}else{
	  $("#divasociados").css('display','none');

	}

}

function ObtenerDependencia(idusuario) {

		var datos="idusuario="+idusuario;
		$.ajax({
		type: 'POST',
		dataType: 'json',
		data:datos,
		url:'catalogos/alumnos/ObtenerDependencia.php', //Url a donde la enviaremos
		async:false,
		success: function(res){
			var resultado=res.respuesta;
			if (resultado.length>0) {
	 		 $("#divasociados").css('display','none');
	 		 $("#v_tipo").attr('onchange','');
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