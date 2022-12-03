<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Sala.php");
require_once("clases/class.Chat.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$f=new Funciones();
	$fechas=new Fechas();
	$sala=new Sala();
	$chat=new Chat();
	//Enviamos la conexion a la clase
	$lo->db = $db;
	$sala->db=$db;
	$chat->db=$db;

	$idsala=$_POST['idsala'];
	$sala->idsalachat=$idsala;
	$sala->idusuario=$_POST['idusuario'];

	$ObtenerMensajes=$sala->ObtenerMensajes();
	$obtenerusuarios=$sala->ObtenerAgrupadousuariossala();
	$obtenerdatosusuarios=$sala->ObtenerOtrosUsuariosSala();


	$respuesta['respuesta']=$ObtenerMensajes;
	$respuesta['usuarios']=explode(',',$obtenerusuarios[0]->usuariossala);
	$respuesta['datosusuarios']=$obtenerdatosusuarios;
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