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
require_once("../../clases/class.Membresia.php");

require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');
require_once('../../clases/class.MembresiasAsignadas.php');


try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$membresia = new Membresia();
	$f = new Funciones();
	$asignar = new MembresiasAsignadas();
	$idusuario=$_POST['idusuario'];
	$asignar->db=$db;
	$membresia->db=$db;
	$asignar->idusuarios=$idusuario;
	$membresia->idusuarios=$idusuario;
	$obtenermembresiasAsignados=$asignar->ObtenermembresiaActivosAsignados();

	$arraymembresia="";
	$contador=0;
	$idmembresias="";
	for ($i=0; $i <count($obtenermembresiasAsignados) ; $i++) { 
		
		$idmembresia=$obtenermembresiasAsignados[$i]->idmembresia;

		$idmembresias.=$idmembresia;

		if ($i<(count($obtenermembresiasAsignados)-1)) {
			$idmembresias.=",";
			}

		//$idmembresias=$idmembresia;
		

	}
	
	$membresia->idmembresias=$idmembresias;
	$obtenermembresias=array();

	$verificarsiestutorado=$membresia->VerificarSiesTutorado();

	if (count($verificarsiestutorado)>0) {

				$idtutor=$verificarsiestutorado[0]->idusuariostutor;

				$buscarSiTutorTieneMembresia=$membresia->buscarSiTutorTieneMembresia($idtutor);

				
				if (count($buscarSiTutorTieneMembresia)>0) {
					$idmembresiapadre=$buscarSiTutorTieneMembresia[0]->idmembresia;
				

				if ($verificarsiestutorado[0]->sututor==1) {
					$inpnieto=1;
					$inphijo="";
				}else{
					$inpnieto="";
					$inphijo=1;
				}

				if ($buscarSiTutorTieneMembresia[0]->pagado==1) {
					 
					$obtenerMembresias=$membresia->ObtenerMembresiasDependen($idmembresiapadre,$inphijo,$inpnieto);

					for ($i=0; $i <count($obtenerMembresias) ; $i++) { 
						$membresia->idmembresia=$obtenerMembresias[$i]->idmembresia;
						$ObtenerSiTutoradosMembresia=$membresia->ObtenerSiTutoradosMembresia($idtutor);


						if ($obtenerMembresias[$i]->limite<=count($ObtenerSiTutoradosMembresia)) {
							unset($obtenerMembresias[$i]);
						}

					}
				}
				

			}
			
			}else{

				
					# code...
				
				$obtenermembresias=$membresia->ObtenerMembresiasDisponibles($idmembresias);

			}


	$respuesta['respuesta']=1;
	$respuesta['membresiasasignados']=$obtenermembresiasAsignados;
	$respuesta['membresias']=$obtenermembresias;
	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>