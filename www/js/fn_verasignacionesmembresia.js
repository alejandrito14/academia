function UsuariosMembresia(idmembresia) {
	
	var datos="idmembresia="+idmembresia;

	$.ajax({
			url: 'catalogos/asignarmembresias/ObtenerUsuariosMembresia.php', //Url a donde la enviaremos
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
						var respuesta=msj.usuarios;
						PintarListaMembresiaUsuarios(respuesta);

					}
				});
}

function PintarListaMembresiaUsuarios(respuesta) {
	var html="";
	html+=`
		<table id="tbl_usuarios" class="table table-striped table-bordered table-responsive ">
		<thead>		
		<th>ID</th>
		<th>Alumno</th>
		<th>Membresia</th>
		<th>Fecha asignación</th>
		<th>Fecha expiración</th>
		<th>Estatus</th>
		<th>Pagado</th>
		<th>Activar</th>

		</thead>

		<tbody>
	`;

	if (respuesta.length>0) {
		for (var i = 0; i <respuesta.length; i++) {
			html+=`<tr>
				<td>`+respuesta[i].idusuarios+`</td>

				<td>`+respuesta[i].nombre+` `+respuesta[i].paterno+` `+respuesta[i].materno+`</td>
				<td>`+respuesta[i].titulo+`</td>
				<td>`+respuesta[i].fecha+`</td>
				<td>`+respuesta[i].fechaexpiracion+`</td>`;
				var estatus="";
				var colorestatus="";
				if (respuesta[i].estatus==0) {
					estatus="ASIGNADO";
					colorestatus="#f2c628";
				}
				if (respuesta[i].estatus==1) {
					estatus="ACTIVA";
					colorestatus="#28b779";
				}

				if (respuesta[i].estatus==2) {
					estatus="CADUCADA";
					colorestatus="red";
				}

				if (respuesta[i].estatus==3) {
					colorestatus="#ee5d36";
					estatus="CANCELADA";
				}
				html+=`<td><span class="badge" style="background:`+colorestatus+`;color: white;">`+estatus+`</span></td>`;

				var pagado="";
				var colorestatuspagado="";

				if (respuesta[i].pagado==1) {
					colorestatuspagado="#28b779";
					pagado='PAGADO';
				}
				if (respuesta[i].pagado==0) {
					colorestatuspagado="red";

					pagado='NO PAGADO';
				}
				html+=`<td><span class="badge" style="background:`+colorestatuspagado+`;color: white;">`+pagado+`</span></td>`;
				html+=`
						<td>`;

				if (respuesta[i].estatus!=1) {
					
						html+=`
				
		                      
		                <div class="material-switch pull-right">
		                    <input id="asignacion_`+respuesta[i].idusuarios_membresia+`" name="someSwitchOption001" type="checkbox" onclick="CambiarEstatusAsignacionMembresia(`+respuesta[i].idusuarios_membresia+`,`+respuesta[i].idmembresia+`)"/>
		                    <label for="asignacion_`+respuesta[i].idusuarios_membresia+`" class="label-success"></label>
		                </div>
				`;
				}else{

						html+=`
				
		                      
		                <div class="material-switch pull-right">
		                    <input id="asignacion_`+respuesta[i].idusuarios_membresia+`" name="someSwitchOption001" type="checkbox" onclick="CambiarEstatusAsignacionMembresia(`+respuesta[i].idusuarios_membresia+`,`+respuesta[i].idmembresia+`)" checked/>
		                    <label for="asignacion_`+respuesta[i].idusuarios_membresia+`" class="label-success checked"></label>
		                </div>
				`;

				}


			


			html+=` </td>	</tr>


			`;
		}



	}

	html+=`</tbody>
	</table>
	`;


	$(".listausuarios").html(html);
	CargarTabla();
}

function CargarTabla() {
	$('#tbl_usuarios').DataTable( {		
		 	"pageLength": 100,
			"oLanguage": {
						"sLengthMenu": "Mostrar _MENU_ ",
						"sZeroRecords": "NO EXISTEN PROVEEDORES EN LA BASE DE DATOS.",
						"sInfo": "Mostrar _START_ a _END_ de _TOTAL_ Registros",
						"sInfoEmpty": "desde 0 a 0 de 0 records",
						"sInfoFiltered": "(filtered desde _MAX_ total Registros)",
						"sSearch": "Buscar",
						"oPaginate": {
									 "sFirst":    "Inicio",
									 "sPrevious": "Anterior",
									 "sNext":     "Siguiente",
									 "sLast":     "Ultimo"
									 }
						},
		   "sPaginationType": "full_numbers", 
		 	"paging":   true,
		 	"ordering": true,
        	"info":     false


		} );
}

function CambiarEstatusAsignacionMembresia(idusuarios_membresia,idmembresia) {
	$("#modalcontrase2").modal();
	$(".btnsave").attr('onclick','GuardarEstatusAsignacion('+idusuarios_membresia+','+idmembresia+')');
}

function GuardarEstatusAsignacion(idusuarios_membresia,idmembresia) {
	$("#txtdescripcioncancelacion").text('');
	$("#txtdescripcioncancelacion").removeClass('inputrequerido');
	$("#txtcancelacion").css('border','0px');
	var estatus=1;
	if($("#asignacion_"+idusuarios_membresia).is(':checked')){
		estatus=0;

	}

	var contra=$("#txtcontrase").val();
	var myString   = "issoftware";
	var datos="estatus="+estatus+"&pass="+contra+"&idusuarios_membresia="+idusuarios_membresia;
	var pagina = "CambiarEstatusAsignacionMembresia.php";
    var bandera=1;
	

	if (bandera==1) {
      $.ajax({
      type: 'POST',
      dataType: 'json',
      data:datos,
      url:'catalogos/asignarmembresias/'+pagina, //Url a donde la enviaremos
      async:false,
      success: function(msj){

      	if (msj.respuesta==1) {
      	 
           $("#modalcontrase2").modal('hide');
           AbrirNotificacion("SE REALIZARON LOS CAMBIOS CORRECTAMENTE","mdi-checkbox-marked-circle ");
          	UsuariosMembresia(idmembresia);

       	}else{


       		alert('Contraseña Inválida');
       }

      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                  //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                  console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
      });
  }else{

  

  }
}