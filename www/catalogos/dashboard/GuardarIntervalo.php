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
require_once("../../clases/class.Dashboard.php");

require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');
require_once("../../clases/class.Fechas.php");

	

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$dashboard = new Dashboard();
	$fechas = new Fechas();

	//enviamos la conexión a las clases que lo requieren
	$dashboard->db=$db;
	
	$intervalo=$_POST['intervalo'];

	$dashboard->GuardarIntervalo($intervalo);


	$respuesta['respuesta']=1;

	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>