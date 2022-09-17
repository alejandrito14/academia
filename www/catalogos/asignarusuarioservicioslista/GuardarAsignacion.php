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
require_once('../../clases/class.ServiciosAsignados.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Servicios();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	$serviciosasignados = new ServiciosAsignados();
	$serviciosasignados->db=$db;

	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$emp->idservicio = trim($_POST['idservicio']);

	$participantes=explode(',',  $_POST['participantes']);



	for ($i=0; $i < count($participantes); $i++) { 
		$serviciosasignados->idusuario=$participantes[$i];
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
	$participantes=$diff;
	var_dump($participantes);die();
	

			$emp->EliminarParticipantes();
		if (count($participantes)>0 && $participantes[0]!='') {
			
			for ($i=0; $i < count($participantes); $i++) { 
						$emp->idparticipantes=$participantes[$i];
						$emp->Guardarparticipantes();
				}
			}

	$md->guardarMovimiento($f->guardar_cadena_utf8('Servicio'),'Asignación',$f->guardar_cadena_utf8('Asignación del Servicio -'.$emp->idservicio));

				
	$db->commit();
	$respuesta['respuesta']=1;
	echo json_encode($respuesta);
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>