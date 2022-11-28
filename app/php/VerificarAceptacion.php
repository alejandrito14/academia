<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Servicios.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$f=new Funciones();
	$servicios=new Servicios();

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$servicios->db=$db;

	$lo->idusuarios_servicios=$_POST['idusuarios_servicios'];

	
	$obtenerservicio=$lo->ObtenerServicioAsignado();

	$servicio=$obtenerservicio[0]->aceptarterminos;
	$idusuario=$obtenerservicio[0]->idusuarios;
	$idservicio=$obtenerservicio[0]->idservicio;
	$lo->idusuario=$idusuario;
	$lo->idservicio=$idservicio;
	$servicios->idservicio=$idservicio;

	$pagado=1;
	$enproceso=0;
	if ($obtenerservicio[0]->precio>0) {
		$pagadoservicio=$lo->VerificarSihaPagado();

	if (count($pagadoservicio)>0) {
				$pagado=1;
			}else{
				$pagado=0;
			}


		$enprocesoservicio=$lo->VerificarSihaPagadoProceso();

			if (count($enprocesoservicio)>0) {
				$enproceso=1;
			}

		}
			$fechaactual=date('Y-m-d');
	/*$verificarsiestaenperiodo=$servicios->FechadentrodePeriodos($fechaactual);*/
	$dentroperiodo=1;
	/*if (count($verificarsiestaenperiodo)>0) {
		$dentroperiodo=1;
	}*/


	$respuesta['respuesta']=$servicio;
	$respuesta['pagado']=$pagado;
	$respuesta['dentroperiodo']=$dentroperiodo;
	$respuesta['enproceso']=$enproceso;

	
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