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

//Inlcuimos las clases a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Membresia.php");
require_once("../../clases/class.Servicios.php");
require_once("../../clases/class.Pagos.php");


	$db = new MySQL();
	$servicios=new Servicios();
	$membresias=new Membresia();
	$membresias->db=$db;
	$servicios->db=$db;

	$obtenerservicios=$servicios->ObtenerServicioActivos();

	
	$respuesta['respuesta']=$obtenerservicios;
	echo json_encode($respuesta);



?>