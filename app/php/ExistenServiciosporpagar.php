<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Invitacion.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Encuesta.php");
require_once("clases/class.Calificacion.php");
require_once("clases/class.PoliticasAceptacion.php");
require_once("clases/class.Pagos.php");


try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$f=new Funciones();
	$fechas=new Fechas();
	$invitacion=new Invitacion();
	$servicios=new Servicios();
	$encuesta=new Encuesta();
	$encuesta->db=$db;
	$calificacion = new Calificacion();
	$calificacion->db=$db;
	$politicas=new PoliticasAceptacion();
	$politicas->db=$db;
	$pagos=new Pagos();
	$pagos->db=$db;

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$invitacion->db=$db;
	$servicios->db=$db;
	
	$id_user=$_POST['id_user'];
	$lo->idusuario=$id_user;
	$obtenerservicios=$lo->obtenerServiciosAsignadosAceptados();
	$contarnopagados=0;
	$serviciosarray=array();
	if (count($obtenerservicios)>0) {
		for ($i=0; $i < count($obtenerservicios); $i++) { 
			$lo->idservicio=$obtenerservicios[$i]->idservicio;
			
			$pagoencontrado=$lo->ObtenerPagoServicio();	

			if (count($pagoencontrado)==0) {
				$contarnopagados++;
			}else{
				array_push($serviciosarray,$obtenerservicios[$i]);
			}

		}
	}

	$pagos->idusuarios=$id_user;
	$obtenerpagostipotres=$pagos->ObtenerPagosTipoDosTres();
	if (count($obtenerpagostipotres)>0) {
		$contarnopagados=$contarnopagados+count($obtenerpagostipotres);
	}

	$respuesta['respuesta']=$contarnopagados;
	//$respuesta['servicios']=$serviciosarray;
	
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