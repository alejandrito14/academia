<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Membresia.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Tareas.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.NotificacionPush.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Membresia();
	$f=new Funciones();
	$asignados=new ServiciosAsignados();
	$asignados->db=$db;
	$tareas=new Tareas();
	$tareas->db=$db;
	$emp=new Servicios();
	$emp->db=$db;
	$notificaciones=new NotificacionPush();
	$notificaciones->db=$db;
	//Enviamos la conexion a la clase
	$lo->db = $db;

	$fechaactual=date('Y-m-d H:i');
	$tareas->fechahora=$fechaactual;
	$arraytokens=array();

	$obtenertareas=$tareas->ObtenerTareas();

	if (count($obtenertareas)>0) {
		# code...
	
	for ($m=0; $m < count($obtenertareas); $m++) { 

		if ($obtenertareas[$m]->idservicio>0) {

	$emp->idservicio=$obtenertareas[$m]->idservicio;
	$obtenerservicio=$emp->ObtenerServicio();
			
			$emp->titulo=$obtenerservicio[0]->titulo;
			$asignados->idservicio=$emp->idservicio;
			$asignados->idusuario=0;
			$obtenerusuarios=$asignados->obtenerUsuariosServiciosAsignados();

			
		for ($i=0; $i <count($obtenerusuarios) ; $i++) { 
			$nombre=$obtenerusuarios[0]->nombre;
			$titulonotificacion=$nombre.', '.$obtenertareas[$m]->titulo.' '.$emp->titulo;
			$descripcion="";
			$idusuario=$obtenerusuarios[$i]->idusuarios;
			$ruta='detalleservicio2';
			$valor=$emp->idservicio;
			$texto='|'.$obtenertareas[$m]->titulo.'|'.$obtenertareas[$m]->descripcion.'|'.$emp->titulo;
			$estatus=0;
			$notificaciones->AgregarNotifcacionaUsuarios($idusuario,$texto,$ruta,$valor,$estatus);
			$notificaciones->idusuario=$idusuario;
			$obtenertokenusuario=$notificaciones->Obtenertoken();

			for ($j=0; $j <count($obtenertokenusuario) ; $j++) { 
				
				$dato=array('idusuario'=>$idusuario,'token'=>$obtenertokenusuario[$j]->token,'ruta'=>$ruta,'titulonotificacion'=>$titulonotificacion);
			    array_push($arraytokens,$dato);

				}
		
				

			}

			$obtenercoachs=$asignados->BuscarAsignacionCoach();

			for ($i=0; $i <count($obtenercoachs) ; $i++) { 
			$nombre=$obtenercoachs[0]->nombre;
			$titulonotificacion=$nombre.', '.$obtenertareas[$m]->titulo.' '.$emp->titulo;
			$descripcion="";
			$idusuario=$obtenercoachs[$i]->idusuarios;
			$ruta='detalleservicio2';
			$valor=$emp->idservicio;
			$texto='|'.$obtenertareas[$m]->titulo.'|'.$obtenertareas[$m]->descripcion.'|'.$emp->titulo;
			$estatus=0;
			$notificaciones->AgregarNotifcacionaUsuarios($idusuario,$texto,$ruta,$valor,$estatus);
			$notificaciones->idusuario=$idusuario;
			$obtenertokenusuario=$notificaciones->Obtenertoken();

			for ($j=0; $j <count($obtenertokenusuario) ; $j++) { 
				
				$dato=array('idusuario'=>$idusuario,'token'=>$obtenertokenusuario[$j]->token,'ruta'=>$ruta,'titulonotificacion'=>$titulonotificacion);
			    array_push($arraytokens,$dato);

				}
		
				

			}




			/*$fechaactual=date('Y-m-d');
			$fechafinal=date('Y-m-d',strtotime($obtenerservicio[0]->fechafinal));
			if ($fechaactual<=$fechafinal) {
				
				$tareas->nombretarea=$obtenertareas[$m]->nombretarea;
				$tareas->titulo=$obtenertareas[$m]->titulo;
				$tareas->descripcion=$obtenertareas[$m]->descripcion;
				$tareas->programada="";
				$tareas->idservicio=$emp->idservicio;
				$tareas->envio=$obtenertareas[$m]->envio;
				$tareas->CrearTarea();

			}*/

		}else{




		}
		$tareas->idtarea=$obtenertareas[$m]->idtarea;
		$tareas->estatus=1;
		$tareas->completada=date('Y-m-d H:i');
		$tareas->CambiarEstatusTarea();
	}
}



		if (count($arraytokens)>0) {
			$texto='';
			for ($i=0; $i <count($arraytokens) ; $i++) { 

				
			 $idusuario=$arraytokens[$i]['idusuario'];
			
			 $notificaciones->idcliente=$idusuario;
			 $notificaciones->valor=$emp->idservicio;
			 $notificaciones->navpage=$arraytokens[$i]['ruta'];
			 $array=array();
			 
			 $titulonotificacion=$arraytokens[$i]['titulonotificacion'];
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