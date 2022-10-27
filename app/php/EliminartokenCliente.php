<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.Funciones.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Usuarios();
	$f=new Funciones();
	$db->begin();

	//Enviamos la conexion a la clase
	$lo->db = $db;

	$idcliente=$_POST['idcliente'];
	$tokenfirebase=$_POST['tokenfirebase'];
	$sistema=$_POST['sistema'];
	$uuid=$_POST['uuid'];

	$lo->idusuarios=$idcliente;
	$lo->tokenfirebase=$tokenfirebase;
	$lo->sistema=$sistema;
	$lo->uuid=$uuid;
		

			
	$lo->EliminarClienteUuid();
		
	$db->commit();


	$respuesta['idusuario']=$idcliente;
	$respuesta['respuesta']=1;

	//Retornamos en formato JSON 
	$myJSON = json_encode($respuesta);
	echo $myJSON;

}catch(Exception $e){
	$db->rollback();
	//echo "Error. ".$e;
	
	$array->resultado = "Error: ".$e;
	$array->msg = "Error al ejecutar el php";
	$array->id = '0';
		//Retornamos en formato JSON 
	$myJSON = json_encode($array);
	echo $myJSON;
}
?>