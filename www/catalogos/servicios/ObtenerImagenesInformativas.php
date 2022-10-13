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
require_once("../../clases/class.ImagenesInformativas.php");

require_once("../../clases/class.Funciones.php");

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$imagenesinformativas = new ImagenesInformativas();
	$imagenesinformativas->db=$db;
	$imagenesinformativas->idservicio=$_POST['idservicio'];
	$ObtenerImagenesInformativas=$imagenesinformativas->ObtenerImagenesInformativas();

	



	$respuesta['respuesta']=1;
	$respuesta['imagenes']=$ObtenerImagenesInformativas;
	$respuesta['codigo']=$_SESSION['codservicio'];
	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>