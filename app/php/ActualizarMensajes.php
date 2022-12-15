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
require_once("clases/class.Chatdirigido.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$f=new Funciones();
	$fechas=new Fechas();
	$sala=new Sala();
	$chat=new Chat();
	$chatdirigido=new Chatdirigido();
	//Enviamos la conexion a la clase
	$lo->db = $db;
	$sala->db=$db;
	$chat->db=$db;
	$chatdirigido->db=$db;

	$idsala=$_POST['idsala'];
	$sala->idsalachat=$idsala;
	$sala->idusuario=$_POST['idusuario'];

	$ObtenerMensajes=$sala->ObtenerMensajes();
	$obtenerusuarios=$sala->ObtenerAgrupadousuariossala();
	$obtenerdatosusuarios=$sala->ObtenerOtrosUsuariosSala();


	for ($i=0; $i < count($ObtenerMensajes); $i++) { 
			$chatdirigido->idusuarios=$sala->idusuario;
			$chatdirigido->idchat=$ObtenerMensajes[$i]->idchat;

			$buscarchatdirigido=$chatdirigido->ChecarLeido();

			if ($buscarchatdirigido[0]->estatusleido==0) {

				$chatdirigido->ActualizarEstatus();
			}


			

		}


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