<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Fechas.php");

//require_once("clases/class.MovimientoBitacora.php");
/*require_once("clases/class.Sms.php");
require_once("clases/class.phpmailer.php");
require_once("clases/emails/class.Emails.php");*/

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Servicios();
	$f=new Funciones();
	$asignar = new ServiciosAsignados();
	$fechas=new Fechas();

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$asignar->db=$db;
	$lo->idservicio=$_POST['idservicio'];
	$obtenerservicio=$lo->ObtenerServicio();

	$asignar->idservicio=$idservicio;
	$asignados=$asignar->BuscarAsignaciones();
	$seencontropago=0;
	for ($i=0; $i <count($asignados) ; $i++) { 
		# code...
		$asignar->idusuario=$asignados[$i]->idusuarios;
		$pago=$asignar->VerificarSihaPagado();

		if (count($pago)>0) {
			$seencontropago++;
		}
	}


	$respuesta['respuesta']=$obtenerservicio[0];
	$respuesta['encontropago']=$seencontropago;
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