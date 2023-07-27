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


require_once("../../clases/conexcion.php");
require_once("../../clases/class.Pagos.php");
require_once("../../clases/class.Funciones.php");
	
	try
	{
	//declaramos los objetos de clase
	$db = new MySQL();
	$pagos = new Pagos();
	$f = new Funciones();
	$db->begin();

	//enviamos la conexión a las clases que lo requieren
	$pagos->db=$db;

	$pagos->idpago=$_POST['idpago'];
	$pagos->idusuarios=$se->obtenerSesion('usuariopago');
	$pagos->idservicio=$_POST['idservicio'];
	$pagos->idmembresia=$_POST['idmembresia'];
	$pagos->monto=$_POST['monto'];
	$pagos->concepto=$_POST['concepto'];
	$pagos->tipo=$_POST['idopcion'];
	$pagos->fechapago=date('Y-m-d');


	if ($pagos->idpago==0) {
		
		$pagos->Guardarpago();
	}

	$db->commit();
	$respuesta['respuesta']=1;
	echo json_encode($respuesta);
	
}catch(Exception $e)
	{
		$db->rollback();
		echo "Error. ".$e;
	}
?>