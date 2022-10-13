<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Invitacion.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$f=new Funciones();

	//Enviamos la conexion a la clase
	$lo->db = $db;
	
	$idusuarioscancelacion=$_POST['idusuarioscancela'];
	$id_user=$_POST['id_user'];
	$lo->idservicio=$_POST['idservicio'];
	$obtenerregistrosacancelar=$lo->ObtenerUsuariosServiciosaCancelar($idusuarioscancelacion);

	for ($i=0; $i < count($obtenerregistrosacancelar); $i++) { 
			$lo->idusuarios_servicios=$obtenerregistrosacancelar[$i]->idusuarios_servicios;
			$lo->CancelarServicio();

		}

		

	$respuesta['respuesta']=1;

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