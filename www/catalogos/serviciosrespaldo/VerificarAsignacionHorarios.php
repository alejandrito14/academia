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
require_once('../../clases/class.Usuarios.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Servicios();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	$emp->db=$db;

	$serviciosasignados = new ServiciosAsignados();
	$serviciosasignados->db=$db;
	$usua=new Usuarios();
	$usua->db=$db;
	$arraydiaselegidos=explode(',',$_POST['v_arraydiaselegidos']);
	$usuarios=explode(',',$_POST['idalumnos']);

	$idusuarios=array();
	$idusuariosparaasignar="";
	$usuariosnoagregados=array();

	if (count($usuarios)>0) {
		# code...
	
	
	for ($i=0; $i < count($usuarios); $i++) { 
		$serviciosasignados->idusuario=$usuarios[$i];
		array_push($idusuarios);
		$idusuariosparaasignar.=$usuarios[$i];

		$valor=$i+1;
		if ($valor<count($usuarios)) {
					$idusuariosparaasignar.=',';
					
				}

				$obtenersignaciones=$serviciosasignados->BuscarAsignaciones();
		
			$secruza=0;
			$servicioscruzados=array();
			for ($j=0; $j < count($obtenersignaciones); $j++) { 
			
				//echo $obtenersignaciones[$j]->idservicio.'!='.$idservicios[$l].'<br>';
			
				# code...
		
			$serviciosasignados->idservicio=$obtenersignaciones[$j]->idservicio;

			$obtenerHorarios=$serviciosasignados->ObtenerHorariosServicioZona();
			$emp->idservicio=$idservicios[$l];
			$infoservicio=$emp->ObtenerServicio();
			
			
			for ($k=0; $k <count($obtenerHorarios) ; $k++) { 
				$idserviciocruzado=$obtenerHorarios[$k]->idservicio;
				$fecha=$obtenerHorarios[$k]->fecha;
				$horainicial=$obtenerHorarios[$k]->horainicial;
				$horafinal=$obtenerHorarios[$k]->horafinal;

				$serviciosasignados->fecha=$fecha;
				$serviciosasignados->horainicial=$horainicial;
				$serviciosasignados->horafinal=$horafinal;

				for ($l=0; $l < count($arraydiaselegidos); $l++) { 

					$dividir=explode('-',$arraydiaselegidos[$l]);

					$fechae=$dividir[0].'-'.$dividir[1].'-'.$dividir[2];
					$horainiciale=$dividir[3];
					$horafinale=$dividir[4];
					
					$cruzahorario=$serviciosasignados->EvaluarHorarioFechaServicio($fechae,$horainiciale,$horafinale);

					if ($cruzahorario==true) {
						$emp->idservicio=$idserviciocruzado;
						$infoserviciocruzado=$emp->ObtenerServicio();
				
							if (!$serviciosasignados->BuscadorArray($servicioscruzados,$infoserviciocruzado[0]->idservicio)) {

							array_push($servicioscruzados,  $infoserviciocruzado[0]);
						}

						$secruza++;
					}
				}

			
				

			}
		
			if ($secruza>0) {
				$usua->id_usuario=$usuarios[$i];
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