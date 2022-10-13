<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

//Importamos las clases que vamos a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Zonas.php");

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$servicio = new Servicios();
	$f = new Funciones();
	$zonas=new Zonas();
	//enviamos la conexión a las clases que lo requieren
	$servicio->db=$db;
	$zonas->db=$db;
	//Recbimos parametros
	$servicio->idservicio = trim($_POST['idservicio']);
	$obtenerzonas=$zonas->ObtZonasActivos();
	$obtener=$servicio->ObtenerHorariosSemana($servicio->idservicio);

	$obtenerservicio=$servicio->ObtenerServicio();


	$respuesta['respuesta']=$obtener;
	$respuesta['servicio']=$obtenerservicio[0];
	$respuesta['zonas']=$obtenerzonas;
	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>