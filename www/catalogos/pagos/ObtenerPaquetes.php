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
require_once("../../clases/class.Paquetes.php");
require_once("../../clases/class.Funciones.php");
	
	try
	{
	//declaramos los objetos de clase
	$db = new MySQL();
	$paquetes = new Paquetes();
	$paquetes->db=$db;
	$f = new Funciones();
	$db->begin();
	$valor=$_POST['valor'];
	$obtener=$paquetes->ObtenerPaquetesF($valor);

	$db->commit();
	$respuesta['respuesta']=$obtener;
	echo json_encode($respuesta);
	
}catch(Exception $e)
	{
		$db->rollback();
		echo "Error. ".$e;
	}
?>