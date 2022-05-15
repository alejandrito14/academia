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

	$idcliente=$_POST['idusuario'];
	$tokenfirebase=$_POST['tokenfirebase'];
	$sistema=$_POST['sistema'];
	$uuid=$_POST['uuid'];

	if ($idcliente>0) {
		$lo->idusuarios=$idcliente;

	}else{
		$lo->idusuarios=0;
	}

	
	$lo->tokenfirebase=$tokenfirebase;
	$lo->sistema=$sistema;
	$lo->uuid=$uuid;
		$resultado=$lo->BuscarToken();
		$existe=$db->fetch_assoc($resultado);
		$numresultado=$db->num_rows($resultado);


		if ($numresultado>0) {
			
			//if ($idcliente>0) {
				
			$lo->EliminarClienteUuid();

				//}			
			$lo->GuardarTokenfirebase();

		}else{


			
			$lo->GuardarTokenfirebase();
				
		}

		$db->commit();


	  


	$respuesta['idusuarios']=$idusuarios;
	$respuesta['respuesta']=1;
	$respuesta['uid']=$uuid;

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