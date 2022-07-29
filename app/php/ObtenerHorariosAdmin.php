<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

require_once("clases/conexcion.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Funciones.php");

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$servicio = new Servicios();
	$f = new Funciones();
	
	//enviamos la conexión a las clases que lo requieren
	$servicio->db=$db;
	
	//Recbimos parametros
	//$servicio->idservicio = trim($_POST['idservicio']);
	$servicio->fecha=$_POST['fecha'];
	$obtener=$servicio->ObtenerHorariosAdmin();

	for ($i=0; $i <count($obtener) ; $i++) { 
		$servicio->idservicio=$obtener[$i]->idservicio;
		$coach=$servicio->ObtenerParticipantes(5);
		$obtener[$i]->coach=$coach;
	}
	$respuesta['respuesta']=$obtener;

	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>