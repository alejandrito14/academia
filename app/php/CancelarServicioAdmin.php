<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Invitacion.php");
//require_once("clases/class.Monedero.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.NotificacionPush.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$f=new Funciones();
	$usuarios=new Usuarios();
	$servicios=new Servicios();
	$servicios->db=$db;
	$usuarios->db=$db;
	$notificaciones=new NotificacionPush();
	$notificaciones->db=$db;
	$db->begin();
	//Enviamos la conexion a la clase
	$lo->db = $db;
	$invitacion->db=$db;
	$servicios->idservicio=$_POST['idservicio'];
	$id_user=$_POST['id_user'];
	$motivocancelacion=$_POST['motivocancelacion'];
	

	$obtenerhorarios=$servicios->ObtenerHorariosSemana();

	for ($i=0; $i <count($obtenerhorarios); $i++) {

		$idhorariosservicio=$obtenerhorarios[$i]->idhorarioservicio;
		$servicios->EliminarHorarioServicio($idhorariosservicio);
	}
	$servicios->motivocancelacion=$motivocancelacion;
	$servicios->fechacancelacion=date('Y-m-d H:i:s');
	$servicios->usuariocancela=$id_user;
	$servicios->GuardarCancelacion();

    $db->commit();

	$respuesta['respuesta']=1;

	$myJSON = json_encode($respuesta);
	echo $myJSON;

}catch(Exception $e){
	//echo "Error. ".$e;
	$db->rollback();
	$array->resultado = "Error: ".$e;
	$array->msg = "Error al ejecutar el php";
	$array->id = '0';
		//Retornamos en formato JSON 
	$myJSON = json_encode($array);
	echo $myJSON;
}
?>