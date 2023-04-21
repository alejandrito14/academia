<?php
/*======================= INICIA VALIDACIÓN DE SESIÓN =========================*/

require_once("../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();

if(!isset($_SESSION['se_SAS']))
{
	/*header("Location: ../../login.php"); */ echo "login";

	exit;
}
 
/*======================= TERMINA VALIDACIÓN DE SESIÓN =========================*/

//Importamos las clases que vamos a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Servicios.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');
require_once("../../clases/class.ServiciosAsignados.php");
require_once("../../clases/class.Usuarios.php");
require_once("../../clases/class.Invitacion.php");

require_once("../../clases/class.NotificacionPush.php");
try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Servicios();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	$serviciosasignados = new ServiciosAsignados();
	$usuarios=new Usuarios();
	$usuarios->db=$db;
	$serviciosasignados->db=$db;

	$invitacion=new Invitacion();
	$invitacion->db=$db;
	$notificaciones=new NotificacionPush();
	$notificaciones->db=$db;
	$api=$notificaciones->ObtenerApiKey();
	$notificaciones->apikey=$api['clavetokennotificacion'];
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
		
	//Recbimos parametros
	$emp->idservicio = trim($_POST['idservicio']);

	//$participantes=explode(',',  $_POST['idusuarios']);

	$idusuariosparaasignar=$_POST['idusuarios'];
	$idusuarios=explode(',', $_POST['idusuarios']);
	$idservicio=$_POST['idservicio'];
	$iduser=$_SESSION['se_sas_Usuario'];
	$serviciosasignados->idservicio=$idservicio;
	$obtenerdatosservicio=$serviciosasignados->ObtenerServicio();
	$arrayquitar=explode(',', $_POST['arrayquitar']);
	$idusuariosparaquitar=$_POST['arrayquitar'];
	/*$usuariosquitados=$_POST['usuariosquitados'];
	$usuariosparaquitar=explode(',', $_POST['usuariosquitados']);*/
	$idservicioasignar=$idservicio;
	$usuariosnoagregados=array();
	$db->begin();

	$usuarios->id_usuario=$iduser;
	$obtenerUsu=$usuarios->ObtenerUsuario();
	
	$arraytokens=array();
	/*if ($$idusuariosparaquitar!='') {
		
	
		for ($i=0; $i <count($arrayquitar) ; $i++) { 

				$serviciosasignados->idusuario=$arrayquitar[$i];
				$serviciosasignados->idservicio=$idservicio;
				$serviciosasignados->EliminarAsignacionUsuario();
		}

	}*/


	if ($idusuariosparaasignar!='') {
		# code...
	
	for ($i=0; $i < count($idusuarios); $i++) { 
		$serviciosasignados->idusuario=$idusuarios[$i];
		$obtenersignaciones=$serviciosasignados->BuscarAsignaciones();
		

		for ($j=0; $j < count($obtenersignaciones); $j++) { 

		if ($obtenersignaciones[$j]->idservicio!=$idservicioasignar) {

			$serviciosasignados->idservicio=$obtenersignaciones[$j]->idservicio;

			$obtenerHorarios=$serviciosasignados->ObtenerHorariosServicioZona();


			$servicioscruzados=array();
			$secruza=0;
			for ($k=0; $k <count($obtenerHorarios) ; $k++) { 
				$idserviciocruzado=$obtenerHorarios[$k]->idservicio;
				$fecha=$obtenerHorarios[$k]->fecha;
				$horainicial=$obtenerHorarios[$k]->horainicial;
				$horafinal=$obtenerHorarios[$k]->horafinal;

				
				$minutoAnadir=1;
				$segundos_horaInicial=strtotime($horafinal);
				$segundos_minutoAnadir=$minutoAnadir*60;
				$nuevaHora=date("H:i",$segundos_horaInicial-$segundos_minutoAnadir);



				$serviciosasignados->fecha=$fecha;
				$serviciosasignados->horainicial=$horainicial;
				$serviciosasignados->horafinal=$nuevaHora;
				
				$cruzahorario=$serviciosasignados->EvaluarHorarioFechaZona($idservicioasignar);
				
				if (count($cruzahorario)) {
					$secruza++;

					$emp->idservicio=$idserviciocruzado;
					$infoserviciocruzado=$emp->ObtenerServicio();

					if (!$serviciosasignados->BuscadorArray($servicioscruzados,$infoserviciocruzado[0]->idservicio)) {

						array_push($servicioscruzados,  $infoserviciocruzado[0]);
					}
					
					
				}

			}

			if ($secruza>0) {
				$usuarios->id_usuario=$idusuarios[$i];
				$obtenerUsuario=$usuarios->ObtenerUsuarioDatos();
				
				$obtenerUsuario[0]->servicio=$infoservicio[0]->titulo;
				$obtenerUsuario[0]->idservicio=$infoservicio[0]->idservicio;

				//var_dump($servicioscruzados);die();
				$obtenerUsuario[0]->servicioscruzados=$servicioscruzados;
				
				array_push($usuariosnoagregados,$obtenerUsuario[0]);
				//unset($idusuarios[$i]);

			}

		 }
		}


	}
		$eliminararray=array();
	for ($j=0; $j <count($usuariosnoagregados) ; $j++) { 
		for ($i=0; $i <count($idusuarios); $i++) { 

			
			if ($idusuarios[$i]==$usuariosnoagregados[$j]->idusuarios) {
				$posicion.=$i;
				$valor=$i+1;
				array_push($eliminararray, $idusuarios[$i]);
				if ($valor<count($idusuarios)) {
					$posicion.=',';
					
				}
			}
		}
	}

	$diff=array_values(array_diff($idusuarios,$eliminararray));

	$idusuarios=$diff;


	if (count($idusuarios)>0) {
		# code...
	
	for ($i=0; $i <count($idusuarios) ; $i++) { 
		$serviciosasignados->idusuario=$idusuarios[$i];
		$serviciosasignados->idservicio=$idservicioasignar;
		$usuarioinvita="";
		$usuarios->id_usuario=$idusuarios[$i];
		$obtenerusuarioinvita=$usuarios->ObtenerUsuario();
		$usuarioinvita=$obtenerusuarioinvita[0]->nombre.', ';
		
		$consulta=$serviciosasignados->BuscarAsignacion();

		$invitacion->idservicio=$idservicioasignar;
		$invitacion->idusuarioinvitado=$idusuarios[$i];
		$invitacion->idusuarioinvita=$iduser;

		$invitacion->EliminarInvitacion();

		if (count($consulta)==0) {

		$serviciosasignados->GuardarAsignacion();

		}
		$invitacion->GuardarInvitacion();

		$banderatuto=0;
		$usuarios->id_usuario=$idusuarios[$i];
		$obtenerdependencia=$usuarios->ObtenerUsuarioDependencia();
		$ruta="";
		if (count($obtenerdependencia)>0) {
			$obtenerdatousuario=$usuarios->ObtenerUsuario();
			
			if($obtenerdatousuario[0]->sincel==1) {
				$notificaciones->idusuario=$obtenerdependencia[0]->idusuariostutor;
				$ruta="listadotutoservicios";
				$banderatuto=1;
			}else{
			   $notificaciones->idusuario=$idusuarios[$i];
			   $ruta="serviciospendientesasignados";

			}
			



					}else{
			$notificaciones->idusuario=$idusuarios[$i];
			$ruta="serviciospendientesasignados";

		}
		
		$obtenertokenusuario=$notificaciones->Obtenertoken();

		$idusuario=$idusuarios[$i];
	
	$titulonotificacion=$usuarioinvita.$obtenerUsu[0]->nombre." ".$obtenerUsu[0]->paterno." te ha asignado a ".$obtenerdatosservicio[0]->titulo;

		for ($j=0; $j < count($obtenertokenusuario); $j++) { 

				$dato=array('idusuario'=>$idusuario,'token'=>$obtenertokenusuario[$j]->token,'ruta'=>$ruta,'titulonotificacion'=>$titulonotificacion,'banderatuto'=>$banderatuto);

					array_push($arraytokens,$dato);
				}
			$nombrequienasigna='Asignado por: '.$obtenerUsu[0]->nombre.' '.$obtenerUsu[0]->paterno;
			
			$texto='|Asignacion de servicio|'.$obtenerdatosservicio[0]->titulo.'|'.$nombrequienasigna.'|Periodo: '.date('d-m-Y',strtotime($obtenerdatosservicio[0]->fechainicial)).' '.date('d-m-Y',strtotime($obtenerdatosservicio[0]->fechafinal));
			$estatus=0;
			$valor=$obtenerdatosservicio[0]->idservicio;
			$notificaciones->AgregarNotifcacionaUsuarios($idusuario,$texto,$ruta,$valor,$estatus);
	}



	}
}


if($idusuariosparaquitar!='') {
		# code...
	
	$obtenerusuarioscancelacion=$serviciosasignados->BuscarAsignacionCancelacionUsuarios($idusuariosparaquitar);

	if (count($obtenerusuarioscancelacion)>0) {
		for ($i=0; $i < count($obtenerusuarioscancelacion); $i++) { 

			$idusuariocancelado=$obtenerusuarioscancelacion[$i]->idusuarios;

			$usuarioinvita="";
		$usuarios->id_usuario=$idusuariocancelado;
		$obtenerusuarioinvita=$usuarios->ObtenerUsuario();
		$usuarioinvita=$obtenerusuarioinvita[0]->nombre.', ';


			$serviciosasignados->idusuario=$idusuariocancelado;

			$serviciosasignados->motivocancelacion="cancelado desde la web por usuario ".$iduser;
			$serviciosasignados->cancelado=1;
			$serviciosasignados->CambiarEstatusServicio($obtenerusuarioscancelacion[$i]->idusuarios_servicios);

			
			$usuarios->id_usuario=$idusuariocancelado;
		$obtenerdependencia=$usuarios->ObtenerUsuarioDependencia();
		$ruta="";
		if (count($obtenerdependencia)>0) {
			$obtenerdatousuario=$usuarios->ObtenerUsuario();
			
			if($obtenerdatousuario[0]->sincel==1) {
				$notificaciones->idusuario=$obtenerdependencia[0]->idusuariostutor;
				$ruta="";
				$banderatuto=1;
			}else{
			   $notificaciones->idusuario=$idusuariocancelado;
			   $ruta="";

			}
			



					}else{
			$notificaciones->idusuario=$idusuariocancelado;
			$ruta="";

		}
		
		$obtenertokenusuario=$notificaciones->Obtenertoken();

		$idusuario=$idusuariocancelado;
	
	$titulonotificacion=$usuarioinvita.$obtenerUsu[0]->nombre." ".$obtenerUsu[0]->paterno." te quitó de ".$obtenerdatosservicio[0]->titulo;

		for ($j=0; $j < count($obtenertokenusuario); $j++) { 

				$dato=array('idusuario'=>$idusuario,'token'=>$obtenertokenusuario[$j]->token,'ruta'=>$ruta,'titulonotificacion'=>$titulonotificacion,'banderatuto'=>$banderatuto);

					array_push($arraytokens,$dato);
				}
			$nombrequienasigna='Quitado por: '.$obtenerUsu[0]->nombre.' '.$obtenerUsu[0]->paterno;
			
			$texto='|Quitado del servicio|'.$obtenerdatosservicio[0]->titulo.'|'.$nombrequienasigna.'|Periodo: '.date('d-m-Y',strtotime($obtenerdatosservicio[0]->fechainicial)).' '.date('d-m-Y',strtotime($obtenerdatosservicio[0]->fechafinal));
			$estatus=0;
			$valor=$obtenerdatosservicio[0]->idservicio;
			$notificaciones->AgregarNotifcacionaUsuarios($idusuario,$texto,$ruta,$valor,$estatus);
		}
	}
}
$db->commit();


if (count($arraytokens)>0) {
			$texto='';
			for ($i=0; $i <count($arraytokens) ; $i++) { 

				
				$idusuario=$arraytokens[$i]['idusuario'];
				$notificaciones->navpage=$arraytokens[$i]['ruta'];
			 	$notificaciones->idcliente=$idusuario;
			 	$notificaciones->valor="";
			 	$notificaciones->banderatuto=$arraytokens[$i]['banderatuto'];
			 	$array=array();
			 	array_push($array,$arraytokens[$i]['token']);
			 	$titulonotificacion=$arraytokens[$i]['titulonotificacion'];
			$notificaciones->EnviarNotificacion($array,$texto,$titulonotificacion);
				//}

			}
		}

		/*	$emp->EliminarParticipantes();
		if (count($participantes)>0 && $participantes[0]!='') {
			
			for ($i=0; $i < count($participantes); $i++) { 
						$emp->idparticipantes=$participantes[$i];
						$emp->Guardarparticipantes();
				}
			}

	$md->guardarMovimiento($f->guardar_cadena_utf8('Servicio'),'Asignación',$f->guardar_cadena_utf8('Asignación del Servicio -'.$emp->idservicio));
*/
				
	
	$respuesta['respuesta']=1;
	$respuesta['usuariosnoagregados']=$usuariosnoagregados;
	echo json_encode($respuesta);
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>