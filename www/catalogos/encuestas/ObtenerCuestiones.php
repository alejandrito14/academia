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
require_once("../../clases/class.Encuesta.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Encuesta();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$emp->idencuesta = $_POST['idencuesta'];

	$obtenercuestiones=$emp->ObtenerCuestiones();

	for ($i=0; $i <count($obtenercuestiones) ; $i++) { 
		
		$emp->idcuestion=$obtenercuestiones[$i]->idcuestion;
		$opciones=$emp->ObtenerOpcionesCuestiones();
		$obtenercuestiones[$i]->opciones=$opciones;
	}
   	

	$db->commit();

	$respuesta['cuestiones']=$obtenercuestiones;

	echo json_encode($respuesta);

}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>