<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Invitacion.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.NotificacionPush.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$servicios = new Servicios();
	$servicios->db=$db;
	$f=new Funciones();
	$invitacion=new Invitacion();
	$invitacion->db=$db;
	$usuarios=new Usuarios();
	$usuarios->db=$db;
	$notificaciones=new NotificacionPush();
	$notificaciones->db=$db;
	//Enviamos la conexion a la clase
	$lo->db = $db;
	$db->begin();
	$lo->idusuarios_servicios=$_POST['idusuarios_servicios'];
	$lo->motivocancelacion=$_POST['motivocancelacion'];
	$lo->fechacancelacion=date('Y-m-d H:i:s');
	$lo->cancelacion=1;
	$lo->estatus=2;
	$lo->GuardarCancelacion();
	$obtenerservicioasignado=$lo->ObtenerServicioAsignado();
	$idservicio=$obtenerservicioasignado[0]->idservicio;
	$idusuarios=$obtenerservicioasignado[0]->idusuarios;


	$invitacion->idservicio=$idservicio;
	$invitacion->idusuarioinvitado=$idusuarios;
	$usuarios->idusuarios=$idusuarios;
	$obtenerusuario=$usuarios->ObtenerUsuario();
	$nombrequienrechaza=$obtenerusuario[0]->nombre." ".$obtenerusuario[0]->paterno;

	$obtenerInvitacion=$invitacion->ObtenerInvitado();

	$idusuarioinvita=$obtenerInvitacion[0]->idusuarioinvita;

	$notificaciones->idusuario=$idusuarioinvita;
	$obtenertokenusuario=$notificaciones->Obtenertoken();
	$arraytokens=array();
	for ($i=0; $i < count($obtenertokenusuario); $i++) { 

				$dato=array('idusuario'=>$idusuarioinvita,'token'=>$obtenertokenusuario[$i]->token);

					array_push($arraytokens,$dato);
		}


	$titulonotificacion=$nombrequienrechaza." rechazo la asignacion al servicio ".$obtenerservicioasignado[0]->titulo;

	$texto='|Rechazó la asignación|'.$obtenerservicioasignado[0]->titulo.'|'.$nombrequienrechaza;
	$estatus=0;
	$ruta="";
	$valor="";
	$notificaciones->AgregarNotifcacionaUsuarios($idusuarioinvita,$texto,$ruta,$valor,$estatus);

		
				

	$invitacion->EliminarInvitacion();
	$db->commit();

	if (count($arraytokens)>0) {
			$texto='';
			for ($i=0; $i <count($arraytokens) ; $i++) { 

				//if ($arraytokens[$i]!='') {
					# code...
				
			 $idusuario=$arraytokens[$i]['idusuario'];
			
			 $notificaciones->idcliente=$idusuario;
			 $notificaciones->valor='';
			 $array=array();
			 array_push($array,$arraytokens[$i]['token']);
			$notificaciones->EnviarNotificacion($array,$texto,$titulonotificacion);
				//}

			}
		}

	$respuesta['respuesta']=1;
	
	//Retornamos en formato JSON 
	$myJSON = json_encode($respuesta);
	echo $myJSON;

}catch(Exception $e){
	$db->rollback();
	//echo "Error. ".$e;
	
	$array->resultado = "Error: ".$e;
	$array->msg = "Error al ejecutar el php";
	$array->id = '0';
		//Retornamos en formato JSON 
	$myJSON = json_encode($array);
	echo $myJSON;
}
?>