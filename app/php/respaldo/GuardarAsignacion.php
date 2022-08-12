<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Usuarios.php");


try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$f=new Funciones();
	$serviciosasignados = new ServiciosAsignados();
	$usuarios=new Usuarios();
	$usuarios->db=$db;
	$db->begin();

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$serviciosasignados->db=$db;
	$idusuariosparaasignar=$_POST['idusuarios'];
	$idusuarios=explode(',', $_POST['idusuarios']);
	$idservicio=$_POST['idservicio'];
	$iduser=$_POST['id_user'];
	$serviciosasignados->idservicio=$idservicio;
	$obtenerdatosservicio=$serviciosasignados->ObtenerServicio();
	$idservicioasignar=$idservicio;
	$usuariosnoagregados=array();
	
	/*$obtenerhorariosservicio=$serviciosasignados->ObtenerHorariosServicioZona();*/


	
	for ($i=0; $i < count($idusuarios); $i++) { 
		$serviciosasignados->idusuario=$idusuarios[$i];
		$obtenersignaciones=$serviciosasignados->BuscarAsignaciones();

		for ($j=0; $j < count($obtenersignaciones); $j++) { 
			$serviciosasignados->idservicio=$obtenersignaciones[$j]->idservicio;

			$obtenerHorarios=$serviciosasignados->ObtenerHorariosServicioZona();
			
			$secruza=0;
			for ($k=0; $k <count($obtenerHorarios) ; $k++) { 
				
				$fecha=$obtenerHorarios[$k]->fecha;
				$horainicial=$obtenerHorarios[$k]->horainicial;
				$horafinal=$obtenerHorarios[$k]->horafinal;

				$serviciosasignados->fecha=$fecha;
				$serviciosasignados->horainicial=$horainicial;
				$serviciosasignados->horafinal=$horafinal;
				$cruzahorario=$serviciosasignados->EvaluarHorarioFechaZona($idservicioasignar);

				if (count($cruzahorario)) {
					$secruza++;
				}

			}
			var_dump($secruza);die();
			if ($secruza>0) {
				$usuarios->idusuarios=$idusuarios[$i];
				$obtenerUsuario=$usuarios->ObtenerUsuario();
				
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
	
	for ($i=0; $i <count($idusuarios) ; $i++) { 
		$serviciosasignados->idusuario=$idusuarios[$i];
		$serviciosasignados->idservicio=$idservicioasignar;
		
		$consulta=$serviciosasignados->BuscarAsignacion();

		if (count($consulta)==0) {
		$serviciosasignados->GuardarAsignacion();

		}
	}


	$obtenerusuarioscancelacion=$serviciosasignados->BuscarAsignacionCancelacion($idusuariosparaasignar);

	if (count($obtenerusuarioscancelacion)>0) {
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
	}
	}
	$db->commit();

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