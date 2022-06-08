<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");

//require_once("clases/class.MovimientoBitacora.php");
/*require_once("clases/class.Sms.php");
require_once("clases/class.phpmailer.php");
require_once("clases/emails/class.Emails.php");*/

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$f=new Funciones();
	$fechas=new Fechas();
	//Enviamos la conexion a la clase
	$lo->db = $db;

	$idusuario=$_POST['idusuario'];
	$lo->idusuario=$idusuario;
	$obtenerservicios=$lo->obtenerServiciosAsignados();

	for ($i=0; $i <count($obtenerservicios) ; $i++) { 
		
		$lo->idservicio=$obtenerservicios[$i]->idservicio;
		$horarios=$lo->ObtenerHorariosServicio();

		//$obtenerservicios[$i]->horarios=$horarios;
		$arreglohorarios=array();

		for ($j=0; $j < count($horarios); $j++) { 
				
		$diasemana=$fechas->diaarreglo($horarios[$j]->dia);
		$horainicio1=date('H:i',strtotime($horarios[$j]->horainicial));
		$horafinal1=date('H:i',strtotime($horarios[$j]->horafinal));

		$arreglo=array('diasemana'=>$diasemana,'horainicial'=>$horainicio1,'horafinal'=>$horafinal1);

		array_push($arreglohorarios,$arreglo);

		}
	 $obtenerservicios[$i]->horarios=$arreglohorarios;




	}

	$respuesta['respuesta']=$obtenerservicios;
	
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