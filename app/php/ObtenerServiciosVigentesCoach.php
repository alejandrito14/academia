<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Espacios.php");
require_once("clases/class.Calificacion.php");
require_once("clases/class.Comentarios.php");
require_once("clases/class.Chat.php");

//require_once("clases/class.MovimientoBitacora.php");
/*require_once("clases/class.Sms.php");
require_once("clases/class.phpmailer.php");
require_once("clases/emails/class.Emails.php");*/

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$f=new Funciones();
	$fechas=new Fechas();
	$espacios=new Espacios();
	$calificacion=new Calificacion();
	$comentarios=new Comentarios();
	$salachat=new Chat();

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$espacios->db=$db;
	$calificacion->db=$db;
	$comentarios->db=$db;
	$salachat->db=$db;
	$idusuario=$_POST['idusuario'];
	$calificacion->idusuario=$idusuario;
	$lo->idusuario=$idusuario;
	$vcategoria=0;
	if (isset($_POST['vcategoria'])) {
		$vcategoria=$_POST['vcategoria'];
	}

	$fechaactual=date('Y-m-d');

	$lo->fecha=$fechaactual;
	$obtenerservicios=$lo->ObtenerServiciosAsignadosCoachVigentes($vcategoria);

	$cantidad=count($obtenerservicios);

	$respuesta['respuesta']=$cantidad;
	$respuesta['fechaactual']=$fechaactual;
	
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