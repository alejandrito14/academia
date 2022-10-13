<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.Funciones.php");
/*require_once("clases/class.Sms.php");
require_once("clases/class.phpmailer.php");
require_once("clases/emails/class.Emails.php");*/

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Usuarios();
	$f=new Funciones();

	//Enviamos la conexion a la clase
	$lo->db = $db;


	$idCliente=$_POST['iduser'];
	$lo->idusuarios=$idCliente;

	$obtenernotifacion=$lo->ObtenerTodasNotificaciones();

	for ($i=0; $i <count($obtenernotifacion) ; $i++) { 
		$obtenernotifacion[$i]->fechaformato=date('d/m/Y H:i:s',strtotime($obtenernotifacion[$i]->fecha));
		if($obtenernotifacion[$i]->ruta==''){
			$obtenernotifacion[$i]->ruta=0;
		}

		if ($obtenernotifacion[$i]->valor=='') {
			$obtenernotifacion[$i]->valor=0;
		}
	}



	$respuesta['respuesta']=$obtenernotifacion;
	
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