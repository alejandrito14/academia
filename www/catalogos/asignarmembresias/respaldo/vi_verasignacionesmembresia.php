<?php
/*======================= INICIA VALIDACIÓN DE SESIÓN =========================*/

require_once("../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();

if(!isset($_SESSION['se_SAS']))
{
	/*header("Location: ../../login.php"); */ echo "login";

	exit;
}

$idmenumodulo = $_GET['idmenumodulo'];

//validaciones para todo el sistema

$tipousaurio = $_SESSION['se_sas_Tipo'];  //variables de sesion
$lista_empresas = $_SESSION['se_liempresas']; //variables de sesion

//validaciones para todo el sistema


/*======================= TERMINA VALIDACIÓN DE SESIÓN =========================*/

//Importación de clase conexión
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Usuarios.php");
require_once("../../clases/class.Botones.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Membresia.php");

//Declaración de objeto de clase conexión
$db = new MySQL();
$bt = new Botones_permisos(); 
$f = new Funciones();

$membresia=new Membresia();
$cli = new Usuarios();
$cli->db = $db;
$r_clientes = $cli->ObtenerUsuariosAlumno();
$a_cliente = $db->fetch_assoc($r_clientes);
$r_clientes_num = $db->num_rows($r_clientes);


$membresia->db=$db;
$Obtenermembresias=$membresia->ObtenerMembresias();


/*======================= INICIA VALIDACIÓN DE RESPUESTA (alertas) =========================*/

if(isset($_GET['ac']))
{
	if($_GET['ac']==1)
	{
		echo '<script type="text/javascript">AbrirNotificacion("'.$_GET['msj'].'","mdi-checkbox-marked-circle");</script>'; 
	}
	else
	{
		echo '<script type="text/javascript">AbrirNotificacion("'.$_GET['msj'].'","mdi-close-circle");</script>';
	}
	
	echo '<script type="text/javascript">OcultarNotificacion()</script>';
}

/*======================= TERMINA VALIDACIÓN DE RESPUESTA (alertas) =========================*/

//*================== INICIA RECIBIMOS PARAMETRO DE PERMISOS =======================*/

if(isset($_SESSION['permisos_acciones_erp'])){
						//Nombre de sesion | pag-idmodulos_menu
	$permisos = $_SESSION['permisos_acciones_erp']['pag-'.$idmenumodulo];	
}else{
	$permisos = '';
}
//*================== TERMINA RECIBIMOS PARAMETRO DE PERMISOS =======================*/



$estatus=array('DESACTIVADO','ACTIVADO');

?>

<div class="card">
	<div class="card-body">
		<h5 class="card-title" style="float: left;">CLIENTES-MEMBRESÍAS</h5>
		
		<div style="float: right;position:fixed!important;z-index:10;right:0;margin-right:2em;width: 20%;display: none;" id="botones">
		
			<button class="btn btn-success btnguardar" ><i class="mdi mdi-content-save"></i>GUARDAR</button>

			<button class="btn btn-primary"><i class="mdi mdi-content-cancel"></i>CANCELAR</button>
			
			<div style="clear: both;"></div>
		</div>
		
		<div style="clear: both;"></div>
	</div>
</div>
	<div class="row">
			<div class=" col-md-4">
				
				<div class="card">
					<div class="card-header">
					<div class="card-title">MEMBRESÍAS</div>
				</div>
				<div class="card-body">
					<div style="margin-left: 20px;margin-right: 20px;margin-top:20px;">
					<ul class="list-group listaservicios" >
						
						<?php 

						for ($i=0; $i < count($Obtenermembresias); $i++) { 

							$contar=$membresia->ObtenerCuantosAsignados($Obtenermembresias[$i]->idmembresia);
							?>

							<li class="list-group-item item" onclick="UsuariosMembresia(<?php echo $Obtenermembresias[$i]->idmembresia;?>)" id="lista_<?php echo $Obtenermembresias[$i]->idmembresia;?>">
								<div class="row">
								<span class="col-md-8">
								<?php echo $Obtenermembresias[$i]->titulo; ?> 
								</span>

								<span class="col-md-4">
									<span style="    border-radius: 30px;
                                        background: #3e5569;color: white;    padding-top: 5px;
    									padding-right: 10px;padding-left: 10px;padding-bottom: 5px;"><?php echo $contar; ?></span>
    								</span>
								</div>


							</li>

					<?php	}
						 ?>
					  
					 
					</ul>
					<div>
				</div>
			</div>
		</div>
	</div>
	</div>


			<div class="col-md-8" id="" style="float: right;">
				<div class="listausuarios"></div>

				
		</div>
	</div>
<div id="myModalHorarios" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        
      </div>
      <div class="modal-body">
       <div id="picker"></div>


       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>



<script type="text/javascript">

	var idmenumodulo='<?php echo $idmenumodulo; ?>';

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
</script>

