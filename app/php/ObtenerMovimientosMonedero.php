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


	$idCliente=$_POST['id_user'];
	$lo->idusuarios=$idCliente;

	$obtenermonedero=$lo->ObtenerMonedero();

	if (count($obtenermonedero)>0) {
		for ($i=0; $i < count($obtenermonedero); $i++) { 
			$obtenermonedero[$i]->fecha=date('d/m/Y H:i:s',strtotime($obtenermonedero[$i]->fecha));

		}
	}

	$respuesta['respuesta']=$obtenermonedero;
	
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