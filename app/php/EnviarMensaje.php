<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Chat.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Sala.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Chat();
	$f=new Funciones();
	$sala=new Sala();
	$sala->db=$db;

	//Enviamos la conexion a la clase
	$lo->db = $db;


	$lo->idusuarioenvio=$_POST['usuario'];
	$lo->mensaje=$_POST['mensaje'];
	$lo->fecha=date('Y-m-d H:i:s');
	$lo->estatus=1;
	$lo->idsalachat=$_POST['soporte'];
	$lo->conimagen=0;
	$lo->imagen='';

	$lo->EnvioMensaje();
	$sala->idsalachat=$lo->idsalachat;
	$obtenerusuariossala=$sala->Obtenerusuariossala();
	
	for($i=0; $i <count($obtenerusuariossala); $i++) { 
		
		$lo->idusuario=$obtenerusuariossala[$i]->idusuarios;
		$lo->DirigidoMensaje();
	}




	$respuesta['idsala']=$lo->idsalachat;
	$respuesta['respuesta']=1;
	$respuesta['imagen']=0;

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