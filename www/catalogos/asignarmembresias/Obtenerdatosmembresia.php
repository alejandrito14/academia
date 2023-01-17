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
require_once('../../clases/class.MovimientoBitacora.php');


try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$membresia = new Membresia();
	$f = new Funciones();
	$idmembresia=$_POST['idmembresia'];
	$membresia->db=$db;
	$membresia->idmembresia=$idmembresia;

	$obtenermembresia=$membresia->ObtenerMembresia();
	

	$respuesta['respuesta']=1;
	$respuesta['membresia']=$obtenermembresia;
	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>