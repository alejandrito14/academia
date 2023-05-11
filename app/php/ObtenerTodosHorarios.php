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
	$servicio->idservicio = trim($_POST['idservicio']);
	$servicio->fecha='';
	$obtener=$servicio->ObtenerTodosHorarios();
	$fechaactual=date('Y-m-d');

	if (count($obtener)>0) {
		for ($i=0; $i <count($obtener) ; $i++) { 
			$fecha=date('Y-m-d',strtotime($obtener[$i]->fecha));
			$obtener[$i]->tachado=0;
			if ($fecha>=$fechaactual) {

				$horaactual=date('H:i');

				$hora=date('H:i',strtotime($obtener[$i]->horainicial));

				if ($fecha==$fechaactual) {
					# code...
				
				if ($hora>$horaactual) {
					$obtener[$i]->tachado=0;
				}else{

					$obtener[$i]->tachado=1;
				}
			}else{
				$obtener[$i]->tachado=0;
				
			}
				

			}else{
				
				$obtener[$i]->tachado=1;

			}




		}
	}
	$respuesta['respuesta']=$obtener;

	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>