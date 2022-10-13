<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

//Importamos las clases que vamos a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Encuesta.php");
require_once("clases/class.Funciones.php");


try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$encuesta = new Encuesta();
	$f = new Funciones();
	
	//enviamos la conexión a las clases que lo requieren
	$encuesta->db=$db;

	//Recbimos parametros
	$encuesta->idservicio = trim($_POST['idservicio']);
	$obtener=$encuesta->ObtenerEncuestasServicio();


	$respuesta['respuesta']=$obtener;

	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>