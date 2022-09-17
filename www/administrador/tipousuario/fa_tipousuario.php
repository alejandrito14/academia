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


$tipousaurio = $_SESSION['se_sas_Tipo'];  //variables de sesion
$lista_empresas = $_SESSION['se_liempresas']; //variables de sesion
/*======================= TERMINA VALIDACIÓN DE SESIÓN =========================*/

//Importamos nuestras clases
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Tipousuario.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Botones.php");

$idmenumodulo = $_GET['idmenumodulo'];

//Se crean los objetos de clase
$db = new MySQL();
$emp = new Tipousuario();
$f = new Funciones();
$bt = new Botones_permisos();

$emp->db = $db;

$emp->tipo_usuario = $tipousaurio;
$emp->lista_empresas = $lista_empresas;

//Validamos si cargar el formulario para nuevo registro o para modificacion
if(!isset($_GET['idtipousuario'])){
	//El formulario es de nuevo registro
	$idtipousuario = 0;

	//Se declaran todas las variables vacias
	 $dia='';
	 $mes='';
	 $anio='';
	 $hora='';
	 $estatus=1;
	
	$col = "col-md-12";
	$ver = "display:none;";
	$titulo='NUEVO TIPO DE USUARIO';
$mostrarapp=0;
$sistema=0;
$edicion=0;
}else{

	$edicion=1;
	//El formulario funcionara para modificacion de un registro

	//Enviamos el id del pagos a modificar a nuestra clase Pagos
	$idtipousuario = $_GET['idtipousuario'];
	$emp->idtipousuario = $idtipousuario;

	//Realizamos la consulta en tabla Pagos
	$result_tipousuario = $emp->buscartipousuario();
	$result_tipousuario_row = $db->fetch_assoc($result_tipousuario);

	//Cargamos en las variables los datos 

	//DATOS GENERALES
	$tipousuario=$f->imprimir_cadena_utf8($result_tipousuario_row['nombretipo']);
	
	$estatus = $f->imprimir_cadena_utf8($result_tipousuario_row['estatus']);
	
	$mostrarapp = $f->imprimir_cadena_utf8($result_tipousuario_row['mostrarenapp']);

	$sistema = $f->imprimir_cadena_utf8($result_tipousuario_row['sistema']);

	$col = "col-md-12";
	$ver = "";
		$titulo='EDITAR TIPO DE USUARIO';

}

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

?>

<form id="f_tipousuario" name="f_tipousuario" method="post" action="">
	<div class="card">
		<div class="card-body">
			<h4 class="card-title m-b-0" style="float: left;"><?php echo $titulo; ?></h4>

			<div style="float: right;position:fixed!important;z-index:10;right:0;margin-right:2em;width: 20%;">
				
				<?php
			
					//SCRIPT PARA CONSTRUIR UN BOTON
					$bt->titulo = "GUARDAR";
					$bt->icon = "mdi mdi-content-save";
					$bt->funcion = "var resp=MM_validateForm('v_nombre','','R'); if(resp==1){ Guardartipousuario('f_tipousuario','administrador/tipousuario/vi_tipousuario.php','main','$idmenumodulo');}";
					$bt->estilos = "float: right;";
					$bt->permiso = $permisos;
					$bt->class='btn btn-success';
				
					//validamos que permiso aplicar si el de alta o el de modificacion
				if($idtipousuario == 0)
					{
						$bt->tipo = 1;
					}else{
						$bt->tipo = 2;
					}
			
					$bt->armar_boton();
				?>
				
				<!--<button type="button" onClick="var resp=MM_validateForm('v_empresa','','R','v_direccion','','R','v_tel','','R','v_email','',' isEmail R'); if(resp==1){ GuardarEmpresa('f_empresa','catalogos/empresas/fa_empresas.php','main');}" class="btn btn-success" style="float: right;"><i class="mdi mdi-content-save"></i>  GUARDAR</button>-->
				
				<button type="button" onClick="aparecermodulos('administrador/tipousuario/vi_tipousuario.php?idmenumodulo=<?php echo $idmenumodulo;?>','main');" class="btn btn-primary" style="float: right; margin-right: 10px;"><i class="mdi mdi-arrow-left-box"></i>VER LISTADO</button>
				<div style="clear: both;"></div>
				
				<input type="hidden" id="id" name="id" value="<?php echo $idtipousuario; ?>" />
				<input type="hidden" id="edicion" name="edicion" value="<?php echo $edicion; ?>" />
			</div>
			<div style="clear: both;"></div>
		</div>
	</div>
	
	
	<div class="row">
		<div class="<?php echo $col; ?>">
			<div class="card">
				<div class="card-header" style="padding-bottom: 0; padding-right: 0; padding-left: 0; padding-top: 0;">
					<!--<h5>DATOS</h5>-->

				</div>

				<div class="card-body">
					
					
					<div class="tab-content tabcontent-border">
						<div class="tab-pane active show" id="generales" role="tabpanel">

					<div class="col-md-6">
							
							<div class="form-group m-t-20">
								<label>*NOMBRE TIPO DE USUARIO:</label>
								<input type="text" class="form-control" id="v_tipousuario" name="v_tipousuario" value="<?php echo $tipousuario; ?>" title="tipousuario" placeholder='tipousuario'>
							</div>
							<div class="col-md-12">
							<div class="form-group">
								<div class="form-check"> 
								<input type="checkbox" class="form-check-input " id="v_mostrar" name="v_mostrar">
								<label style="margin-top:0.2em;" class="form-check-label">MOSTRAR EN APP</label>
								</div>	
								
								
							</div>
							</div>

							<div class="col-md-12">
							<div class="form-group">
								<div class="form-check"> 
								<input type="checkbox" class="form-check-input " id="v_sistema" name="v_sistema">
								<label style="margin-top:0.2em;" class="form-check-label">USUARIO DEL SISTEMA</label>
								</div>	
								
								
							</div>
							</div>

							
						<div class="form-group m-t-20">
							<label>ESTATUS:</label>
							<select name="v_estatus" id="v_estatus" title="Estatus" class="form-control"  >
								<option value="0" <?php if($estatus == 0) { echo "selected"; } ?> >DESACTIVO</option>
								<option value="1" <?php if($estatus == 1) { echo "selected"; } ?> >ACTIVO</option>
							</select>
						</div>

						
							
						</div>
						
						
						</div>
					</div>
				</div>
			</div>
		</div>


	</div>
</form>
<script>
	
	var idtipousuario='<?php echo $idtipousuario ?>';
	if (idtipousuario>=0) {
		var mostrarapp='<?php echo $mostrarapp; ?>';
		var sistema='<?php echo $sistema; ?>';
		
		if (mostrarapp==1) {
			$("#v_mostrar").attr('checked',true);
		}
		if (sistema==1) {

			$("#v_sistema").attr('checked',true);
		}

	}
	



</script>


<?php

?>