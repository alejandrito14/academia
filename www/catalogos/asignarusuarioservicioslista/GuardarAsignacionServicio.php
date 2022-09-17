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
require_once('../../clases/class.AsignarUsuarioServicio.php');
require_once('../../clases/class.ServiciosAsignados.php');
require_once('../../clases/class.Usuarios.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Servicios();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	$serviciosasignados = new ServiciosAsignados();
	$serviciosasignados->db=$db;
	$usua=new Usuarios();
	$usua->db=$db;
	/*$asignar=new AsignarUsuarioServicio();
	$asignar->db=$db;*/
	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$usuarios = json_decode($_POST['idusuario']);

	$idservicios=explode(',',  $_POST['idservicios']);
	$usuariosnoagregados=array();
	$ids="";
	$idusuarios=array();

	$iduser=$_SESSION['se_sas_Usuario'];

	$idusuariosparaasignar="";
	$valor=0;
	for ($i=0; $i < count($usuarios); $i++) { 
		$serviciosasignados->idusuario=$usuarios[$i]->{'idusuario'};
		array_push($idusuarios, $usuarios[$i]->{'idusuario'});
		$idusuariosparaasignar.=$usuarios[$i]->{'idusuario'};

		$valor=$i+1;
		if ($valor<count($usuarios)) {
					$idusuariosparaasignar.=',';
					
				}

		

			for ($l=0; $l < count($idservicios); $l++) { 
				$obtenersignaciones=$serviciosasignados->BuscarAsignaciones();
		

			for ($j=0; $j < count($obtenersignaciones); $j++) { 
			
				//echo $obtenersignaciones[$j]->idservicio.'!='.$idservicios[$l].'<br>';
			if ($obtenersignaciones[$j]->idservicio!=$idservicios[$l]) {
				# code...
			$idservicioasignar=$idservicios[$l];
			$serviciosasignados->idservicio=$obtenersignaciones[$j]->idservicio;

			$obtenerHorarios=$serviciosasignados->ObtenerHorariosServicioZona();
			$emp->idservicio=$idservicios[$l];
			$infoservicio=$emp->ObtenerServicio();
			
			$secruza=0;
			$servicioscruzados=array();
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
					$emp->idservicio=$idserviciocruzado;
					$infoserviciocruzado=$emp->ObtenerServicio();
			
						if (!$serviciosasignados->BuscadorArray($servicioscruzados,$infoserviciocruzado[0]->idservicio)) {

						array_push($servicioscruzados,  $infoserviciocruzado[0]);
					}

					$secruza++;
				}

			}

			if ($secruza>0) {
				$usua->id_usuario=$usuarios[$i]->{'idusuario'};
				$obtenerUsuario=$usua->ObtenerUsuarioDatos();

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
	}

		$eliminararray=array();
	for ($j=0; $j <count($usuariosnoagregados) ; $j++) { 
		for ($i=0; $i <count($usuarios); $i++) { 
			
			if ($usuarios[$i]->{'idusuario'}==$usuariosnoagregados[$j]->idusuarios) {
				$posicion.=$i;
				$valor=$i+1;
				array_push($eliminararray, $usuarios[$i]->{'idusuario'});
				if ($valor<count($usuarios)) {
					$posicion.=',';
					
				}
			}
		}
	}


	$diff=array_values(array_diff($idusuarios,$eliminararray));
	
	$idusuarios=$diff;
	//var_dump($participantes);die();

	if ($idservicios[0]!='') {
		# code...
	

	if (count($idusuarios)>0) {
		# code...
	
	for ($i=0; $i <count($idusuarios) ; $i++) { 
		$serviciosasignados->idusuario=$idusuarios[$i];

		for ($j=0; $j < count($idservicios); $j++) { 
			# code...
		$idservicioasignar=$idservicios[$j];
		$serviciosasignados->idservicio=$idservicioasignar;
		
		$consulta=$serviciosasignados->BuscarAsignacion();
	

		if (count($consulta)==0) {

		$serviciosasignados->GuardarAsignacion();
		$ids.=$idusuarios[$i];
			if ($valor<count($idusuarios)) {
					$ids.=',';
					
				}

			}
			$valor++;
		}
	}



	/*$obtenerusuarioscancelacion=$serviciosasignados->BuscarAsignacionCancelacion($idusuariosparaasignar);*/

	/*if (count($obtenerusuarioscancelacion)>0) {
		for ($i=0; $i < count($obtenerusuarioscancelacion); $i++) { 

			$idusuariocancelado=$obtenerusuarioscancelacion[$i]->idusuarios;

			$serviciosasignados->idusuario=$idusuariocancelado;

			$serviciosasignados->motivocancelacion="cancelado desde la web por usuario ".$iduser;
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
	

/*	for ($j=0; $j <count($participantes); $j++) { 
		$ids=$ids.$usuarios[$j]->{'idusuario'}.',';

		$asignar->idusuarios = $usuarios[$j]->{'idusuario'};
	
		if (count($idservicios)>0 && $idservicios[0]!='') {
			$asignar->EliminarAsignacionesSinAceptar();
			
			for ($i=0; $i < count($idservicios); $i++) { 
						$asignar->idservicio=$idservicios[$i];
						$asignacion=$asignar->ObtenerAsignacion();

						if (count($asignacion)==0) {
							$asignar->GuardarAsignacion();
						}
				}
			}else{

				$asignar->EliminarAsignacionesSinAceptar();
			}
		}*/

	$md->guardarMovimiento($f->guardar_cadena_utf8('Servicio'),'Asignación a usuario',$f->guardar_cadena_utf8('Asignación a usuario -'.$ids.' servicios: '.$idservicios));

				
	$db->commit();
	$respuesta['respuesta']=1;
	$respuesta['usuariosnoagregados']=$usuariosnoagregados;

	echo json_encode($respuesta);
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>