<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

require_once("clases/conexcion.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$servicio = new Servicios();
	$f = new Funciones();
	$fechas = new Fechas();

	//enviamos la conexión a las clases que lo requieren
	$servicio->db=$db;
	
	//Recbimos parametros
	//$servicio->idservicio = trim($_POST['idservicio']);
	$obtener=$servicio->ObtenerTodosHorariosSemana();


	for ($i=0; $i <count($obtener) ; $i++) { 
		
		$diasemana=$fechas->diaarreglocorto($obtener[$i]->dia);

		$horainicio=date('H:i',strtotime($obtener[$i]->horainicial));

		$horafinal=date('H:i',strtotime($obtener[$i]->horafinal));

		$fecha=$obtener[$i]->fecha;
		$dianumero=explode('-', $fecha);


		$obtener[$i]->fechaformada=$diasemana.' '.$dianumero[2].'/'.$fechas->mesesAnho3[$fechas->mesdelano($fecha)-1];

		$obtener[$i]->fechacompleta=$obtener[$i]->dia.'|'.$fecha.'|'.$horainicio.'|'.$horafinal;
	}
	$respuesta['respuesta']=$obtener;

	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>