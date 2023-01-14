<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Datosfiscales.php");
require_once("clases/class.Funciones.php");
/*require_once("clases/class.Sms.php");
require_once("clases/class.phpmailer.php");
require_once("clases/emails/class.Emails.php");*/

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Datosfiscales();
	$f=new Funciones();

	//Enviamos la conexion a la clase
	$lo->db = $db;


	$idCliente=$_POST['idusuario'];
	$lo->idusuario=$idCliente;

	$obtenerdatofiscal=$lo->ObtenerDatosfiscalesUsuario();

	for ($i=0; $i <count($obtenerdatofiscal); $i++) { 

			$lo->idusuariosdatosfiscales=$obtenerdatofiscal[$i]->idusuariosdatosfiscales;
			$imagenes=$lo->ObtenerImagenesfiscal();

			$obtenerdatofiscal[$i]->imagenes=$imagenes;
		
		}



	$respuesta['respuesta']=$obtenerdatofiscal;
	
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