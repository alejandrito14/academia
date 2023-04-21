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

/*======================= TERMINA VALIDACIÓN DE SESIÓN =========================*/

//Importamos las clases que vamos a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.MembresiasAsignadas.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new MembresiasAsignadas();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
	$idusuario=$_POST['idusuario'];
	$emp->idusuarios=$idusuario;

	$checarexisteregiste=$emp->ObtenerAsignacionMembresiaUsuario();
	$validado=0;
	$tienemembresia=0;
	if (count($checarexisteregiste)>0) {
		$tienemembresia=1;
	}


				
	$db->commit();
	$respuesta['respuesta']=$tienemembresia;
	echo json_encode($respuesta);
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>