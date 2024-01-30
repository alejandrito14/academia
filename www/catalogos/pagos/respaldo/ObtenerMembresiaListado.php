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


	$db = new MySQL();
	$membresias=new Membresia();
	$membresias->db=$db;


	$obtenermembresias= $membresias->ObtenermembresiaActivosMenos('');

	$respuesta['respuesta']=$obtenermembresias;
	echo json_encode($respuesta);


?>