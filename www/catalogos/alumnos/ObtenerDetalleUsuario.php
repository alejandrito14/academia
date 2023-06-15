<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Usuarios.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.ServiciosAsignados.php");
require_once("../../clases/class.MembresiasAsignadas.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Usuarios();
	$f=new Funciones();
	$serviciosasignados=new ServiciosAsignados();
	$serviciosasignados->db=$db;
	$membresias=new MembresiasAsignadas();
	$membresias->db=$db;

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$idusuario=$_POST['idusuario'];
	$lo->id_usuario=$idusuario;

	$obtener=$lo->ObtenerUsuario();

	
	$fotoperfil=$obtener[0]->foto;
		$rutaperfil="images/sinfoto.png";

	if ($fotoperfil=='' || $fotoperfil=='null') {
		$obtener[0]->imagenperfil=$rutaperfil;
	
	}else{

		if ($_SESSION['carpetaapp']!='') {
			$carpeta=$_SESSION['carpetaapp']."/";
		}
		$obtener[0]->imagenperfil="app/".$carpeta."php/upload/perfil/$fotoperfil";

	 	/*if (!file_exists($obtener[0]->imagenperfil)) {
			$rutaperfil="images/sinfoto.png";
			$obtener[0]->imagenperfil=$rutaperfil;
		}*/
	}
	$obtener[0]->fechanacimiento=date('d-m-Y',strtotime($obtener[0]->fechanacimiento));
	$serviciosasignados->idusuario=$idusuario;
	$obtenesservicios=$serviciosasignados->obtenerServiciosAsignados();

	$tipousuario=$obtener[0]->tipo;

	if (count($obtenesservicios)>0) {
		for ($i=0; $i < count($obtenesservicios); $i++) { 
			$obtenesservicios[$i]->fechamin=date('d-m-Y',strtotime($obtenesservicios[$i]->fechamin));
			$obtenesservicios[$i]->fechamax=date('d-m-Y',strtotime($obtenesservicios[$i]->fechamax));

			if ($tipousuario==5) {
				$obtenesservicios[$i]->aceptarterminos=1;
			}


		}
	}
	$membresias->idusuarios=$idusuario;
	$obtenermembresias=$membresias->MembresiasUsuariosAsignadas();

	if (count($obtenermembresias)>0) {
		
		for ($i=0; $i <count($obtenermembresias) ; $i++) { 
			$obtenermembresias[$i]->fechaexpiracion=date('d-m-Y',strtotime($obtenermembresias[$i]->fechaexpiracion));
		}
	}


	$tutoasociados=$lo->ObtenerAsociadosUsuario();

	$tutorados=array();
	$asociados=array();
	for ($i=0; $i < count($tutoasociados); $i++) { 
		if ($tutoasociados[$i]->sututor==1) {
			
			array_push($tutorados, $tutoasociados[$i]);
		}else{
			array_push($asociados, $tutoasociados[$i]);
		}
	}

	$respuesta['respuesta']=$obtener;
	$respuesta['asignados']=$obtenesservicios;
	$respuesta['membresias']=$obtenermembresias;
	$respuesta['tutorados']=$tutorados;
	$respuesta['asociados']=$asociados;
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