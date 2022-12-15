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
require_once("clases/class.Servicios.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$f=new Funciones();
	$fechas=new Fechas();
	$sala=new Sala();
	$chat=new Chat();
	$servicio=new Servicios();

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$sala->db=$db;
	$chat->db=$db;
	$servicio->db=$db;

	$idusuario=$_POST['idusuario'];
	$lo->idusuario=$idusuario;
	$sala->idusuario=$idusuario;

	$obtenersalas=$sala->ObtenerSalasUsuario();
	$arraysalasusuario=array();
	if (count($obtenersalas)>0) {
		for ($i=0; $i < count($obtenersalas); $i++) { 
			$sala->idsalachat=$obtenersalas[$i]->idsalachat;
			$obtenersala=$sala->ObtenerSala();
			$servicio->idservicio=$obtenersala[0]->idservicio;
			$obtenerservicio=$servicio->ObtenerServicio();
		if (count($obtenerservicio)>0){
				# code...
			
			$chat->idsalachat=$obtenersala[0]->idsalachat;
			$chat->idusuario=$idusuario;
			$buscarChats=$chat->BuscarChats();

			
				$sala->idusuario=$idusuario;
				$obtenerdatosusuarios=$sala->ObtenerOtrosUsuariosSala();

				if (count($buscarChats)>0) {

			$fechahora=explode(' ',$buscarChats[0]->fecha);
			$fecha=$fechahora[0];
			$buscarChats[0]->fechaformato='';
			if ($fecha!='') {
			$dianumero=explode('-',$fecha);
			$buscarChats[0]->fechaformato=$dianumero[2].'/'.$dianumero[1].'/'.$dianumero[0].' '.$fechahora[1];
				}


				$arraysalas=array('idsala'=>$chat->idsalachat,'ultimomensaje'=>$buscarChats[0],'servicio'=>$obtenerservicio[0],'usuarios'=>$obtenerdatosusuarios);

				array_push($arraysalasusuario,$arraysalas);
				}
				
			}



		}
	}
	/*$obtenerservicios=$lo->obtenerServiciosAsignados();

	$arraysalasusuario=array();
	for ($i=0; $i <count($obtenerservicios) ; $i++) { 
			$sala->idservicio=$obtenerservicios[$i]->idservicio;
			$buscarSalas=$sala->ObtenerSalasServicio();

			for ($j=0; $j <count($buscarSalas); $j++) { 
				$chat->idsalachat=$buscarSalas[$j]->idsalachat;
				$chat->idusuario=$idusuario;
				$buscarChats=$chat->BuscarChats();

				$sala->idsalachat=$chat->idsalachat;
				$sala->idusuario=$idusuario;
				$obtenerdatosusuarios=$sala->ObtenerOtrosUsuariosSala();

				if (count($buscarChats)>0) {

			$fechahora=explode(' ',$buscarChats[0]->fecha);
			$fecha=$fechahora[0];
			$buscarChats[0]->fechaformato='';
			if ($fecha!='') {
			$dianumero=explode('-',$fecha);
			$buscarChats[0]->fechaformato=$dianumero[2].'/'.$dianumero[1].'/'.$dianumero[0].' '.$fechahora[1];
				}


				$arraysalas=array('idsala'=>$chat->idsalachat,'ultimomensaje'=>$buscarChats[0],'servicio'=>$obtenerservicios[$i],'usuarios'=>$obtenerdatosusuarios);

				array_push($arraysalasusuario,$arraysalas);
				}
				
			}


	}*/

	$respuesta['respuesta']=$arraysalasusuario;
	
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