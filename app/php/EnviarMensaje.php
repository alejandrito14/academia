<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Chat.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Sala.php");
require_once("clases/class.NotificacionPush.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.ServiciosAsignados.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Chat();
	$f=new Funciones();
	$sala=new Sala();
	$sala->db=$db;
	$usuarios=new Usuarios();
	$usuarios->db=$db;
	$notificaciones=new NotificacionPush();
	$notificaciones->db=$db;
	//Enviamos la conexion a la clase
	$lo->db = $db;
	$serviciosasignados = new ServiciosAsignados();
	$serviciosasignados->db=$db;


	$lo->idusuarioenvio=$_POST['usuario'];
	$sala->idusuario=$lo->idusuarioenvio;
	$lo->mensaje=$_POST['mensaje'];
	$lo->fecha=date('Y-m-d H:i:s');
	$lo->estatus=1;
	$lo->idsalachat=$_POST['soporte'];
	$lo->conimagen=0;
	$lo->imagen='';
	$usuarios->idusuarios=$lo->idusuarioenvio;
 	$obtenerUsu=$usuarios->ObtenerUsuario();
 	$sala->idsalachat=$lo->idsalachat;
 	$obtenersala=$sala->ObtenerSala();
 	$idservicio=$obtenersala[0]->idservicio;
 	$serviciosasignados->idservicio=$idservicio;
	$obtenerdatosservicio=$serviciosasignados->ObtenerServicio();
	
	$lo->EnvioMensaje();
	$sala->idsalachat=$lo->idsalachat;
	$obtenerusuariossala=$sala->Obtenerusuariossala();

	$nombrequienasigna='de: '.$obtenerUsu[0]->nombre.' '.$obtenerUsu[0]->paterno;
			
	
	for($i=0; $i <count($obtenerusuariossala); $i++) { 
		
		$lo->idusuario=$obtenerusuariossala[$i]->idusuarios;
		$lo->DirigidoMensaje();
	}

	$obtenerusuariosnoti=$sala->ObtenerOtrosUsuariosSala();

	
	

	//si es tutorado poner la palabra para
	$arraytokens=array();
	$ruta="messages";
		$usuarioinvita="";

	if (count($obtenerusuariosnoti)>0) {
		for ($i=0; $i <count($obtenerusuariosnoti) ; $i++) { 
			
 
		$notificaciones->idusuario=$obtenerusuariosnoti[$i]->idusuarios;
		

		$idusuario=$obtenerusuariosnoti[$i]->idusuarios;

		$usuarios->idusuarios=$idusuario;
		$obtenerusuarioinvita=$usuarios->ObtenerUsuario();
		$usuarioinvita=$obtenerusuarioinvita[0]->nombre.', ';

		$usuarios->idusuarios=$idusuario;
		$obtenerdependencia=$usuarios->ObtenerUsuarioDependencia();

		if (count($obtenerdependencia)>0) {
			$obtenerdatousuario=$usuarios->ObtenerUsuario();
			if($obtenerdatousuario[0]->sincel==1) {
			$notificaciones->idusuario=$obtenerdependencia[0]->idusuariostutor;
				$ruta="messages";

			}else{
			   $notificaciones->idusuario=$idusuario;
			   $ruta="messages";

			}
	

					}else{
		$notificaciones->idusuario=$obtenerusuariosnoti[$i]->idusuarios;
			$ruta="messages";

		}
	/*	array_push($arraytokens,$obtenertokenusuario[0]->token);*/
			
		$obtenertokenusuario=$notificaciones->Obtenertoken();
		$titulonotificacion=$usuarioinvita.$obtenerUsu[0]->nombre." ".$obtenerUsu[0]->paterno. ' te ha enviado un mensaje relacionado con el servicio '.$obtenerdatosservicio[0]->titulo;

		for ($j=0; $j < count($obtenertokenusuario); $j++) { 

				$dato=array('idusuario'=>$idusuario,'token'=>$obtenertokenusuario[$j]->token,'ruta'=>$ruta,'titulonotificacion'=>$titulonotificacion);

					array_push($arraytokens,$dato);
				}
			$idusuario=$notificaciones->idusuario;
			$texto='|Nuevo mensaje|'.$obtenerdatosservicio[0]->titulo.'|'.$nombrequienasigna.'|'.$lo->mensaje;
			$estatus=0;
			$valor=$lo->idsalachat;
			$notificaciones->AgregarNotifcacionaUsuarios($idusuario,$texto,$ruta,$valor,$estatus);
		}
	}


	if (count($arraytokens)>0) {
			$texto='';
			for ($i=0; $i <count($arraytokens) ; $i++) { 

				
				$idusuario=$arraytokens[$i]['idusuario'];
				$notificaciones->navpage=$arraytokens[$i]['ruta'];
			 	$notificaciones->idcliente=$idusuario;
			 	$notificaciones->valor=$lo->idsalachat;
			 	$titulonotificacion=$arraytokens[$i]['titulonotificacion'];
			 	$array=array();
			 	array_push($array,$arraytokens[$i]['token']);
			$notificaciones->EnviarNotificacion($array,$texto,$titulonotificacion);
				//}

			}
		}


	$respuesta['idsala']=$lo->idsalachat;
	$respuesta['respuesta']=1;
	$respuesta['imagen']=0;

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