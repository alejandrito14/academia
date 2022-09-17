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
require_once("../../clases/class.Servicios.php");

//Declaración de objeto de clase conexión
$db = new MySQL();
$bt = new Botones_permisos(); 
$f = new Funciones();

$servicios=new Servicios();
$cli = new Usuarios();
$cli->db = $db;
$r_clientes = $cli->ObtenerUsuariosAlumno();
$a_cliente = $db->fetch_assoc($r_clientes);
$r_clientes_num = $db->num_rows($r_clientes);


$servicios->db=$db;
$serviciosactivos=$servicios->ObtenerServicioActivos();


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
		<h5 class="card-title" style="float: left;">ASIGNAR USUARIOS A SERVICIOS</h5>
		
		<div style="float:right;">
		
			
			<?php
		
				//SCRIPT PARA CONSTRUIR UN BOTON
				$bt->titulo = "NUEVO NIVEL";
				$bt->icon = "mdi-plus-circle";
				$bt->funcion = "aparecermodulos('catalogos/nivel/fa_nivel.php?idmenumodulo=$idmenumodulo','main');";
				$bt->estilos = "float: right; margin-right:10px;";
				$bt->permiso = $permisos;
				$bt->tipo = 5;
				$bt->title="NUEVO NIVEL";
				

				//$bt->armar_boton();
			
			?>
			
			<div style="clear: both;"></div>
		</div>
		
		<div style="clear: both;"></div>
	</div>
</div>
	<div class="row">
			<div class=" col-md-4">
				
				<div class="card">
					<div class="card-header">
					<div class="card-title">SERVICIOS</div>
				</div>
				<div class="card-body">
					<div style="margin-left: 20px;margin-right: 20px;margin-top:20px;">
					<ul class="list-group listaservicios" >
						
						<?php 

						for ($i=0; $i < count($serviciosactivos); $i++) { 

							$contar=$servicios->ObtenerCuantosAsignados($serviciosactivos[$i]->idservicio);
							?>

							<li class="list-group-item item" onclick="UsuariosServicio(<?php echo $serviciosactivos[$i]->idservicio;?>)" id="lista_<?php echo $serviciosactivos[$i]->idservicio;?>">
								<div class="row">
								<span class="col-md-8">
								<?php echo $serviciosactivos[$i]->titulo; ?> 
								</span>

								<span class="col-md-4">
									<span style="    border-radius: 30px;
                                        background: #3e5569;color: white;    padding-top: 5px;
    padding-right: 10px;
    padding-left: 10px;
    padding-bottom: 5px;"><?php echo $contar; ?></span></span>
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


			<div class="col-md-8" id="listausuarios" style="float: right;display: none;">
				<div class="card">
					<div class="card-header">
						<div class="card-title tituloseleccionado">USUARIOS</div>
					</div>
					<div class="">
					<div class="card-body" id="lclientesdiv" style="display: block; padding: 0;">
                	
                    <div class="form-group m-t-20 mostrar" style="margin: 20px;display: none;">	 
						<input type="text" class="form-control" name="buscadorcli_1" id="buscadorcli_" placeholder="Buscar" onkeyup="BuscarEnLista('#buscadorcli_','.cli_')">
				    </div>
                    <div class="clientes mostrar"  style="overflow:scroll;overflow-x: hidden;    margin: 20px;display: none;" id="clientes_<?php echo $a_cliente['idusuarios'];?>">
					    <?php     	
							if ($r_clientes_num>0) {	
						    	do {
						?>
						    	<div class="form-check cli_"  id="cli_<?php echo $a_cliente['idusuarios'];?>_<?php echo $a_cliente['idusuarios'];?>">
						    	    <?php 	
						    			$valor="";
                                        $nombre=mb_strtoupper($f->imprimir_cadena_utf8($a_cliente['nombre']." ".$a_cliente['paterno']." ".$a_cliente['materno']));
						    		?>
									  <input  type="checkbox"   value="<?php echo $a_cliente['idusuarios']?>" class="form-check-input chkcliente" id="inputcli_<?php echo $a_cliente['idusuarios']?>" <?php echo $valor; ?>>
									  <label class="form-check-label" for="flexCheckDefault" style="margin-top: 0.2em;"><?php echo $nombre.' - '.$a_cliente['usuario']; ?></label>
								</div>						    		
						    	<?php
						    		} while ($a_cliente = $db->fetch_assoc($r_clientes));
     					    	 ?>
						    	<?php } ?>    
						    </div>

						    <div class="col-md-12">
						    	<div class="col-md-4" style="float: left;"></div>
						    	<div class="col-md-4" style="float: left;">
						    		
						    	</div>
						    	<div class="col-md-4" style="float: right;margin: 20px;justify-content: right;display: flex;">
						    		<button class="btn btn-success btnguardar" >GUARDAR</button>

						    		<button class="btn btn-primary">CANCELAR</button>
						    	</div>
						    </div>
		                </div> 
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

