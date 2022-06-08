<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$f=new Funciones();
	$fechas=new Fechas();
	//Enviamos la conexion a la clase
	$lo->db = $db;

	$lo->idusuarios_servicios=$_POST['idusuarios_servicios'];

	
	$obtenerservicio=$lo->ObtenerServicioAsignado();
	$lo->idservicio=$obtenerservicio[0]->idservicio;
	$obtenerhorarios=$lo->ObtenerHorariosServicio();
	$arreglohorarios=array();

	for ($j=0; $j < count($obtenerhorarios); $j++) { 
				
		$diasemana=$fechas->diaarreglo($obtenerhorarios[$j]->dia);
		$horainicio1=date('H:i',strtotime($obtenerhorarios[$j]->horainicial));
		$horafinal1=date('H:i',strtotime($obtenerhorarios[$j]->horafinal));

		$arreglo=array('diasemana'=>$diasemana,'horainicial'=>$horainicio1,'horafinal'=>$horafinal1);

		array_push($arreglohorarios,$arreglo);

		}

	$respuesta['respuesta']=$obtenerservicio[0];
	$respuesta['horarios']=$arreglohorarios;
	//Retornamos en formato JSON 
	$myJSON = json_encode($respuesta);
	echo $myJSON;

}catch(Exception $e){
	//$db->rollback();
	//echo "Error. ".$e;
	
	$array->resultado = "Error: ".$e;
	$array->msg = "Error al ejecutar el php";
	$array->id = '0';
		//Retornamos en formato JSON 
	$myJSON = json_encode($array);
	echo $myJSON;
}
?>