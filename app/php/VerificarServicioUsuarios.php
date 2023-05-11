<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$asignados=new ServiciosAsignados();
	$asignados->db=$db;
	//Enviamos la conexion a la clase
	
	$idservicio=$_POST['idservicio'];
	$asignados->idservicio=$idservicio;

	$usuariosasignados=$asignados->obtenerUsuariosServicios();
	$existeasignados=0;
	if (count($usuariosasignados)>0) {
		$existeasignados=1;
	}
	



	$respuesta['respuesta']=1;
	$respuesta['existeasignados']=$existeasignados;
	
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