<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.TipoCoach.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Usuarios.php");


try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new TipoCoach();
	$usuario=new Usuarios();
	$f=new Funciones();

	$db->begin();

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$usuario->db=$db;

	$idusuario=$_POST['idusuario'];
	$usuario->idusuarios=$idusuario;
	$obtenerusuario=$usuario->ObtenerUsuario();

	$idtipocoach=$obtenerusuario[0]->idtipocoach;
	
	$lo->idtipocoach=$idtipocoach;
	$obtenertipocoach=$lo->ObtenerTipoCoachCategorias();

	
	$db->commit();

	$respuesta['respuesta']=1;
	$respuesta['tipocoach']=$obtenertipocoach;
	
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