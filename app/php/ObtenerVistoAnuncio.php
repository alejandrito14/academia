<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.PagConfig.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Usuarios();
	$f=new Funciones();
	$conf = new PagConfig();

	//Enviamos la conexion a la clase
	$lo->db = $db;

	$id_user = $f->guardar_cadena_utf8($_POST['id_user']);
	$lo->idusuarios=$id_user;
	$informacion=$lo->ObtenerInformacionUsuario();

	//Enviamos la conexion a la clase
	$conf->db = $db;
	$configuracion=$conf->ObtenerInformacionConfiguracion();

	

	$respuesta['configuracion']=$configuracion;
	$respuesta['visto']=$informacion[0]->anunciovisto;
	$respuesta['respuesta']=1;
	
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