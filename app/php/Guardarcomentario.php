<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Comentarios.php");
try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Comentarios();



	$f=new Funciones();
	$db->begin();

	//Enviamos la conexion a la clase
	$lo->db = $db;

	$idservicio=$_POST['idservicio'];
	$lo->comentario=$_POST['comentario'];
	$lo->idusuarios=$_POST['iduser'];

	$lo->idservicio=$idservicio;
	$lo->estatus=1;
	$lo->GuardarComentario();
		

	
	
	$db->commit();

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