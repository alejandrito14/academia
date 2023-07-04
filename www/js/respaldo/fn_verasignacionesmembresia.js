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
				if (respuesta[i].estatus==0) {
					estatus="ASIGNADO";
				}
				if (respuesta[i].estatus==1) {
					estatus="ACTIVA";
				}

				if (respuesta[i].estatus==2) {
					estatus="CADUCADA";
				}
				html+=`<td>`+estatus+`</td>`;
				var pagado="";
				if (respuesta[i].pagado==1) {
					pagado='PAGADO';
				}
				if (respuesta[i].pagado==0) {
					pagado='NO PAGADO';
				}
				html+=`<td>`+pagado+`</td>`;


			html+=`	</tr>


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