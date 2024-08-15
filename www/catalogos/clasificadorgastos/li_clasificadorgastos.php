<?php

/*======================= INICIA VALIDACIÓN DE SESIÓN =========================*/

require_once("../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();

if(!isset($_SESSION['se_SAS']))
{
	header("Location: ../../login.php");
	exit;
}

/*======================= TERMINA VALIDACIÓN DE SESIÓN =========================*/


//Importamos nuestras clases
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Categorias.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Botones.php");

//Se crean los objetos de clase
$db = new MySQL();
$ca = new Categorias_productos();
$f = new Funciones();
$bt = new Botones_permisos();

$ca->db = $db;
	
//Recibo parametros del filtro
$categoria = $_GET['categoria'];

//Envio parametros a la clase empresas
$ca->categoria = $f->imprimir_cadena_utf8($categoria);

//Realizamos consulta
$resultado_categoria = $ca->obtenerFiltro();
$resultado_categoria_num = $db->num_rows($resultado_categoria);
$resultado_categoria_row = $db->fetch_assoc($resultado_categoria);

//Declaración de variables
$t_estatus = array('Desactivado','Activado');
$t_recurrente = array('No recurrente','recurrente');


//*================== INICIA RECIBIMOS PARAMETRO DE PERMISOS =======================*/

if(isset($_SESSION['permisos_acciones_aexa'])){
						//Nombre de sesion | pag-idmodulos_menu
	$permisos = $_SESSION['permisos_acciones_aexa']['pag-21'];	
}else{
	$permisos = '';
}
//*================== TERMINA RECIBIMOS PARAMETRO DE PERMISOS =======================*/
										
?>

<table class="table table-striped table-bordered" id="tbl_categorias" cellpadding="0" cellspacing="0" style="overflow: auto">
	<thead>
		<tr>
			<th>CATEGOR&Iacute;A</th> 
			<th>DEPENDE</th>
			<th>ACCI&Oacute;N</th>
		</tr>
	</thead>

	<tbody>
			<?php
			if($resultado_categoria_num == 0){
			?>
			<tr> 
				<td colspan="3" style="text-align: center">
					<h5 class="alert_warning">NO EXISTEN CATEGOR&Iacute;AS EN LA BASE DE DATOS.</h5>
				</td>
			</tr>
			<?php
			}else{
				do
				{
					if($resultado_categoria_row['depende'] != 0){
						$ca->idcategorias = $resultado_categoria_row['depende'];
						
						$datos = $ca->ObtenerDatosCategoria();
						
						$depende = $f->imprimir_cadena_utf8($datos['categoria']);
					}else{
						$depende = 'No depende';
					}
			?>
					<tr>
						<td style="text-align: center;"><?php echo $f->imprimir_cadena_utf8($resultado_categoria_row['categoria']); ?></td>
						<td style="text-align: center;"><?php echo $depende;?>  </td>
						<td style="text-align: center; font-size: 15px;">
						
						
							<?php

								//SCRIPT PARA CONSTRUIR UN BOTON
								$bt->titulo = "";
								$bt->icon = "mdi-table-edit";
								$bt->funcion = "aparecermodulos('catalogos/clasificadorgastos/fa_categorias.php?idcategorias=".$resultado_categoria_row['idcategorias']."','main')";
								$bt->estilos = "";
								$bt->permiso = $permisos;
								$bt->tipo = 2;
								
								$bt->armar_boton();
							?>
							
							<?php
								//SCRIPT PARA CONSTRUIR UN BOTON
								$bt->titulo = "";
								$bt->icon = "mdi-delete-empty";
								$bt->funcion = "BorrarDatos('".$resultado_categoria_row['idcategorias']."','idcategorias','categorias','n','catalogos/categorias/vi_categorias.php','main')";
								$bt->estilos = "";
								$bt->permiso = $permisos;
								$bt->tipo = 3;

								$bt->armar_boton();
							?>
						</td>
					</tr>
			<?php
				}while($resultado_categoria_row = $db->fetch_assoc($resultado_categoria));
			}
			?>
	</tbody>
</table>


<script type="text/javascript">
	 $('#tbl_categorias').DataTable( {		
		 	"pageLength": 100,
			"oLanguage": {
						"sLengthMenu": "Mostrar _MENU_ ",
						"sZeroRecords": "NO EXISTEN CATEGORÍAS EN LA BASE DE DATOS.",
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
		 	"ordering": false,
        	"info":     false


		} );
</script>