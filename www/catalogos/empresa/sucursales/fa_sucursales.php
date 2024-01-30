<?php
/*================================*
*  Proyecto: AUTOBUSES AEXA		  *
*  Compañia: CAPSE 				  *
*  Fecha: 22/08/2019     		  *
* MSD José Luis Gómez Aguilar     *
*=================================*/

/*======================= INICIA VALIDACIÓN DE SESIÓN =========================*/

require_once("../../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();


if(!isset($_SESSION['se_SAS']))
{
	//header("Location: ../../../login.php");
			/* header("Location: ../login.php"); */ echo "login";

	exit;
}

/*======================= TERMINA VALIDACIÓN DE SESIÓN =========================*/


//Importamos nuestras clases
require_once("../../../clases/conexcion.php");
require_once("../../../clases/class.Sucursales.php");
require_once("../../../clases/class.Funciones.php");

//Se crean los objetos de clase
$db = new MySQL();
$su = new Sucursales();
$f = new Funciones();

$su->db = $db;

$idempresas = $_GET['idempresas'];

//Validamos si cargar el formulario para nuevo registro o para modificacion
if(!isset($_GET['idsucursales'])){
	//El formulario es de nuevo registro
	$idsucursales = 0;

	//Se declaran todas las variables vacias
	$sucursal = "";
	$direccion = "";
	$telefono = "";
	$email = "";
	$estatus = 1;
	$iva="";
}else{
	//El formulario funcionara para modificacion de un registro

	//Enviamos el id de la empresa a modificar a nuestra clase camiones areas
	$idsucursales = $_GET['idsucursales'];
	$su->idsucursales = $idsucursales;

	//Realizamos la consulta en tabla camiones areas
	$result_sucursal = $su->buscar_sucursal();
	$result_sucursal_row = $db->fetch_assoc($result_sucursal);

	//Cargamos en las variables los datos de las areas de camiones

	//DATOS GENERALES
	$sucursal = $f->imprimir_cadena_utf8($result_sucursal_row['sucursal']);
	$direccion = $f->imprimir_cadena_utf8($result_sucursal_row['direccion']);
	$telefono = $f->imprimir_cadena_utf8($result_sucursal_row['telefono']);
	$email = $f->imprimir_cadena_utf8($result_sucursal_row['email']);
	$estatus = $result_sucursal_row['estatus'];
	$iva = $result_sucursal_row['iva'];

}
?>

<form id="f_sucursales" name="f_sucursales" method="post" action="">
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-body">					
					<div class="form-group m-t-20">
						<label>*SUCURSAL:</label>
						<input type="text" class="form-control" id="v_sucursal" name="v_sucursal" value="<?php echo $sucursal; ?>" title="SUCURSAL">
					</div>

					<div class="form-group m-t-20">
						<label>*DIRECCI&Oacute;N:</label>
						<textarea id="v_direccion_sucursal" class="form-control" name="v_direccion_sucursal" title="DIRECCI&Oacute;N"><?php echo $direccion; ?></textarea>
					</div>
					
					<div class="form-group m-t-20">
						<label>TEL&Eacute;FONO:</label>
						<input type="text" class="form-control" id="v_telefono" name="v_telefono" value="<?php echo $telefono; ?>" tabindex="111" maxlength="10" placeholder='(___) ___ -____'>
					</div>
					
					<div class="form-group m-t-20">
						<label>EMAIL:</label>
						<input type="email" class="form-control" id="v_email" name="v_email" value="<?php echo $email; ?>" title="EMAIL">
					</div>

					<div class="form-group m-t-20">
						<label>I.V.A:</label>
						<input type="text" class="form-control" id="v_iva" name="v_iva" value="<?php echo $iva; ?>" placeholder='0.0' title="I.V.A">
					</div>
					
					
					<div class="form-group m-t-20">
						<label>ESTATUS:</label>
						<select id="v_estatus" name="v_estatus" class="form-control">
							<option value="0" <?php if(0 == $estatus){ echo "selected"; }?>>DESACTIVADO</option>
							<option value="1" <?php if(1 == $estatus){ echo "selected"; }?>>ACTIVADO</option>
						</select>
					</div>
				</div>
				<div class="row">
				<div class="col-md-9">
					
				</div>
				<div class="col-md-3">
					<button type="button" onClick="var resp=MM_validateForm('v_sucursal','','R','v_direccion_sucursal','','R','v_email','','isEmail'); if(resp==1){ Guardar_sucursal('f_sucursales');}" class="btn btn-info" style="float: right;margin-right: 2em;"><i class="mdi mdi-content-save"></i> ACEPTAR</button>
				</div>
				</div>

				<div style="clear: both;"></div>
				<input type="hidden" id="idsucursales" name="idsucursales" value="<?php echo $idsucursales; ?>" />
				<input type="hidden" id="idempresas" name="idempresas" value="<?php echo $idempresas; ?>" />
				
			</div>
		</div>
	</div>
</form>
<script  type="text/javascript" src="./js/mayusculas.js"></script>
<script type="text/javascript">
phoneFormatter('v_telefono');

</script>

