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

	$lo->idservicio=$_POST['idservicio'];
	$obtenerhorarios=$lo->ObtenerHorariosServicioZona();
	$arreglohorarios=array();

	

		$obtenerhorarios=$lo->ObtenerHorariosServicio();

		for ($i=0; $i <count($obtenerhorarios) ; $i++) { 
		
		$diasemana=$fechas->diaarreglocorto($obtenerhorarios[$i]->dia);


		$horainicio1=date('H:i:s',strtotime($obtenerhorarios[$i]->horainicial));
		$horafinal1=date('H:i:s',strtotime($obtenerhorarios[$i]->horafinal));


		$horainicio=date('H:i',strtotime($obtenerhorarios[$i]->horainicial));

		$horafinal=date('H:i',strtotime($obtenerhorarios[$i]->horafinal));

		$fecha=$obtenerhorarios[$i]->fecha;
		$dianumero=explode('-', $fecha);


		$obtenerhorarios[$i]->fechaproxima=$diasemana.' '.$dianumero[2].'/'.$fechas->mesesAnho3[$fechas->mesdelano($fecha)-1];
		$obtenerhorarios[$i]->horainicial=$horainicio;
		$obtenerhorarios[$i]->horafinal=$horafinal;
		

			}
			


	$respuesta['respuesta']=$obtenerhorarios;
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