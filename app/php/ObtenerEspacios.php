<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Zonas.php");

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$espacios = new Zonas();
	//enviamos la conexión a las clases que lo requieren
	$espacios->db=$db;
	//Recbimos parametros
	$obtener=$espacios->ObtZonasActivos();


	$respuesta['respuesta']=$obtener;

	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>