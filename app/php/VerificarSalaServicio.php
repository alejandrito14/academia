<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Sala.php");
require_once("clases/class.Chat.php");
require_once("clases/class.Chatdirigido.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$f=new Funciones();
	$fechas=new Fechas();
	$sala=new Sala();
	$chat=new Chat();
	$chatdirigido=new Chatdirigido();
	//Enviamos la conexion a la clase
	$sala->db=$db;
	$chat->db=$db;
	$chatdirigido->db=$db;
	$lo=new Servicios();
	$lo->db=$db;

	$idsala=$_POST['idsala'];
	$sala->idsalachat=$idsala;
	$sala->idusuario=$_POST['idusuario'];

	$obtenersala=$sala->ObtenerSala();

	$idservicio=$obtenersala[0]->idservicio;
	$lo->idservicio=$idservicio;
	$datosservicio=$lo->ObtenerServicio();

	$fechaactual=date('Y-m-d');

	$paso=0;

	if ($fechaactual>$datosservicio[0]->fechafinal) {
		$paso=1;

		}


	$respuesta['respuesta']=1;
	$respuesta['paso']=$paso;

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