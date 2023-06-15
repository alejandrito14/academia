<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Invitacion.php");
require_once("clases/class.NotificacionPush.php");


try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$f=new Funciones();
	$serviciosasignados = new ServiciosAsignados();
	$usuarios=new Usuarios();
	$usuarios->db=$db;
	$emp=new Servicios();
	$emp->db=$db;
	$invitacion=new Invitacion();
	$invitacion->db=$db;
	$notificaciones=new NotificacionPush();
	$notificaciones->db=$db;
	$db->begin();

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$serviciosasignados->db=$db;
	$idusuariosparaasignar=$_POST['usuariosagregados'];
	$idusuarios=explode(',', $_POST['usuariosagregados']);
	$idservicio=$_POST['idservicio'];
	$iduser=$_POST['id_user'];
	$usuarios->idusuarios=$iduser;
	$obtenerUsu=$usuarios->ObtenerUsuario();
	
	$serviciosasignados->idservicio=$idservicio;
	$obtenerdatosservicio=$serviciosasignados->ObtenerServicio();
	$usuariosquitados=$_POST['usuariosquitados'];
	$usuariosparaquitar=explode(',', $_POST['usuariosquitados']);
	$idservicioasignar=$idservicio;
	$usuariosnoagregados=array();
	$arraytokens=array();
	$titulonotificacion="";
	/*$obtenerhorariosservicio=$serviciosasignados->ObtenerHorariosServicioZona();*/

			$emp->idservicio=$idservicio;
			$infoservicio=$emp->ObtenerServicio();
	
	if ($idusuariosparaasignar!='') {
		# code...
	
	for ($i=0; $i < count($idusuarios); $i++) { 
		$serviciosasignados->idusuario=$idusuarios[$i];
		$obtenersignaciones=$serviciosasignados->BuscarAsignaciones();

		for ($j=0; $j < count($obtenersignaciones); $j++) { 
			$serviciosasignados->idservicio=$obtenersignaciones[$j]->idservicio;

			$obtenerHorarios=$serviciosasignados->ObtenerHorariosServicioZona();

			

			$servicioscruzados=array();
			$secruza=0;
			for ($k=0; $k <count($obtenerHorarios) ; $k++) { 
				$idserviciocruzado=$obtenerHorarios[$k]->idservicio;
				$fecha=$obtenerHorarios[$k]->fecha;
				$horainicial=$obtenerHorarios[$k]->horainicial;
				$horafinal=$obtenerHorarios[$k]->horafinal;

				$serviciosasignados->fecha=$fecha;
				$serviciosasignados->horainicial=$horainicial;
				$serviciosasignados->horafinal=$horafinal;
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
				$usuarios->idusuarios=$idusuarios[$i];
				$obtenerUsuario=$usuarios->ObtenerUsuario();

				$obtenerUsuario[0]->servicio=$infoservicio[0]->titulo;
				$obtenerUsuario[0]->idservicio=$infoservicio[0]->idservicio;

				//var_dump($servicioscruzados);die();
				$obtenerUsuario[0]->servicioscruzados=$servicioscruzados;
				
				array_push($usuariosnoagregados,$obtenerUsuario[0]);
				//unset($idusuarios[$i]);

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
	//var_dump($diff);die();
	$idusuarios=$diff;


	if (count($idusuarios)>0) {
		# code...
	$usuarioinvita="";
	for ($i=0; $i <count($idusuarios) ; $i++) { 
		$serviciosasignados->idusuario=$idusuarios[$i];
		$serviciosasignados->idservicio=$idservicioasignar;

		$usuarios->idusuarios=$idusuarios[$i];
		$obtenerusuarioinvita=$usuarios->ObtenerUsuario();
		$usuarioinvita=$obtenerusuarioinvita[0]->nombre.', ';
		
		$consulta=$serviciosasignados->BuscarAsignacion();
 
		$invitacion->idservicio=$idservicioasignar;
		$invitacion->idusuarioinvitado=$idusuarios[$i];
		$invitacion->idusuarioinvita=$iduser;

		$invitacion->EliminarInvitacion();
		if (count($consulta)==0) {
		$serviciosasignados->GuardarAsignacion();
		$invitacion->GuardarInvitacion();

		}
		$banderatuto=0;
		$usuarios->idusuarios=$idusuarios[$i];
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
		//$notificaciones->idusuario=$idusuarios[$i];
		$obtenertokenusuario=$notificaciones->Obtenertoken();
		
		$idusuario=$idusuarios[$i];
	/*	array_push($arraytokens,$obtenertokenusuario[0]->token);*/
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

	

	$obtenerusuarioscancelacion=$serviciosasignados->BuscarAsignacionCancelacion($idusuariosparaasignar);
	
	/*if (count($obtenerusuarioscancelacion)>0) {
		for ($i=0; $i < count($obtenerusuarioscancelacion); $i++) { 

			$idusuariocancelado=$obtenerusuarioscancelacion[$i]->idusuarios;

			$serviciosasignados->idusuario=$idusuariocancelado;

			$serviciosasignados->motivocancelacion="cancelado desde la app por usuario ".$iduser;
			$serviciosasignados->cancelado=1;
			$serviciosasignados->CambiarEstatusServicio($obtenerusuarioscancelacion[$i]->idusuarios_servicios);

			if ($obtenerusuarioscancelacion[$i]->aceptarterminos==1) {
				$pagos=$serviciosasignados->BuscarPagos();

				for ($j=0; $j < count($pagos); $j++) { 
					
					if ($pagos[$j]->pagado==1 && $pagos[$j]->estatus==2) {
						$idpago=$pagos[$j]->idpago;
						
						if($obtenerdatosservicio[0]->reembolso==1){
							$estatus=4;
						
							}else{
								$estatus=5;
							}
						
						$serviciosasignados->CambiarEstatusPago($idpago,$estatus);
					}
				}

			}
			
		}
	}*/
	}
}




		
	/*if ($usuariosquitados!='') {
		for ($i=0; $i < count($usuariosparaquitar); $i++) { 

			$idusuariocancelado=$usuariosparaquitar[$i];

			$serviciosasignados->idusuario=$idusuariocancelado;

			$serviciosasignados->idservicio=$idservicioasignar;
		
		    $consulta=$serviciosasignados->BuscarAsignacion();

		  
		if (count($consulta)>0) {
			$serviciosasignados->motivocancelacion="cancelado desde la app por usuario ".$iduser;
			$serviciosasignados->cancelado=1;
			$serviciosasignados->CambiarEstatusServicio2($idusuariocancelado);

			if ($obtenerusuarioscancelacion[$i]->aceptarterminos==1) {
				$pagos=$serviciosasignados->BuscarPagos();

				for ($j=0; $j < count($pagos); $j++) { 
					
					if ($pagos[$j]->pagado==1 && $pagos[$j]->estatus==2) {
						$idpago=$pagos[$j]->idpago;
						
						if($obtenerdatosservicio[0]->reembolso==1){
							$estatus=4;
						
							}else{
								$estatus=5;
							}
						
						$serviciosasignados->CambiarEstatusPago($idpago,$estatus);
					}
				}

			}
		  }
			
		}
	}*/
	
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

	$respuesta['respuesta']=1;
	$respuesta['usuariosnoagregados']=$usuariosnoagregados;

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