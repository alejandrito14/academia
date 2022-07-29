<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

require_once("clases/conexcion.php");
require_once("clases/class.Asistencia.php");
require_once("clases/class.Funciones.php");

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$asistencia = new Asistencia();
	$f = new Funciones();
	
	//enviamos la conexión a las clases que lo requieren
	$asistencia->db=$db;
	//Recbimos parametros
	$fechaasistencia=explode('|',$_POST['fechaasistencia']);
	
	$asistencia->idservicio = trim($_POST['idservicio']);
	
	$dia=$fechaasistencia[0];
	$fecha=$fechaasistencia[1];
	$horainicio=$fechaasistencia[2];
	$horafinal=$fechaasistencia[3];

	$asistencia->fecha=$fecha;
	$asistencia->dia=$dia;
	$asistencia->horainicio=$horainicio;
	$asistencia->horafin=$horafinal;

	$obtenerasistencia=$asistencia->ObtenerRegistroAsistencia();

	$respuesta['asistencia']=$obtenerasistencia;
	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>