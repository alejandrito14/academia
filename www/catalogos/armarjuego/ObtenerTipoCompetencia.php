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
require_once("../../clases/class.TipoCompetencia.php");
require_once("../../clases/class.Funciones.php");

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$tipocompetencia = new TipoCompetencia();
	$f = new Funciones();
	
	//enviamos la conexión a las clases que lo requieren
	$tipocompetencia->db=$db;


	$obtenertiposdecompetencia=$tipocompetencia->obtenerTipoCompetencia();



	$respuesta['respuesta']=$obtenertiposdecompetencia;

	echo json_encode($respuesta);


	//Validamos si hacermos un insert o un update
	
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>