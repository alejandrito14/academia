<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.Token.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Sms.php");
require_once("clases/class.phpmailer.php");
require_once("clases/emails/class.Emails.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Usuarios();
	$f=new Funciones();
	$token=new Token();
	$token->db=$db;

	//Enviamos la conexion a la clase
	$lo->db = $db;


	$idusuario=$_POST['idusuario'];
	$email = $_POST['usuario'];
	$password=$_POST['password'];



	$lo->usuario=$email;
	$lo->idusuarios=$idusuario;
	$lo->clave=$password;


	$validar=$lo->validarDatosCliente();


	if ($validar==0) {


		$obtenercliente=$lo->ValidarCliente();
		$result_row=$db->fetch_assoc($obtenercliente);

		$arra = array('existe' => $validar,'idusuario'=>$result_row['idusuarios']);


	}else{

		$arra = array('existe' => $validar,'idusuario'=>0);

	}
	


	$respuesta['respuesta']=$arra;
	
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