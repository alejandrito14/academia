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
require_once("../../clases/class.Membresia.php");

require_once("../../clases/class.Funciones.php");

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$membresia = new Membresia();
	$f = new Funciones();
	
	//enviamos la conexión a las clases que lo requieren
	$membresia->db=$db;


	$obtener=$membresia->ObtenerMembresiasActivas();


	$respuesta['respuesta']=$obtener;
	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>