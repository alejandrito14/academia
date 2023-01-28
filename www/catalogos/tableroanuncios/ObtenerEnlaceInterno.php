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
require_once("../../clases/class.EnlaceInterno.php");

require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$enlaceinterno = new EnlaceInterno();
	$f = new Funciones();
	
	//enviamos la conexión a las clases que lo requieren
	$enlaceinterno->db=$db;
	$md->db = $db;	
	$enlaceinterno->idrutainternaapp=$_POST['v_enlace'];
	

	//Recbimos parametros
	
	$obtener=$enlaceinterno->ObtenerEnlaceInterno();


	$respuesta['respuesta']=$obtener[0];

	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>