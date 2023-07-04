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
require_once("../../clases/class.MembresiasAsignadas.php");

require_once('../../clases/class.PagConfig.php');


try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$membresia = new Membresia();
	$asignadas=new MembresiasAsignadas();
	$asignadas->db=$db;

    $confi=new PagConfig();
    $confi->db=$db;
	$db->begin();

	$f = new Funciones();
	$idmembresia=$_POST['idmembresia'];
	$estatus=$_POST['estatus'];
	$contraencrip=$_POST['pass'];
	$idusuarios_membresia=$_POST['idusuarios_membresia'];
	$membresia->db=$db;
	$membresia->idmembresia=$idmembresia;
	$obtenermembresia=$membresia->ObtenerMembresia();

	$infoconfi=$confi->ObtenerInformacionConfiguracion();
	
	$contraseguardada=$infoconfi['contracancelaciones'];
    if ($contraencrip == $contraseguardada) {
    	$resp=1;
		$idusuarios_membresia=$_POST['idusuarios_membresia'];
		$asignadas->idusuarios_membresia=$idusuarios_membresia;

		$asignacionmembresia=$asignadas->ObtenerAsignacionMembresiaId();

		

	if ($estatus==0) {
		# code...
	
		$estatusasignacion=$asignacionmembresia[0]->estatus;
		$estatuspago=$asignacionmembresia[0]->estatuspago;
		$pagado=$asignacionmembresia[0]->pagado;
		$asignadas->idpago=$asignacionmembresia[0]->idpago;
		$asignadas->GuardarHistorial($estatusasignacion,$estatuspago,$pagado);

		$asignadas->estatus=1;
		$asignadas->pagado=1;
		$asignadas->CambiarEstatusAsignacion();
		$asignadas->estatus=2;
		$asignadas->CambiarEstatusAsignacionPago();
		
		$pagoinscripcion=$asignadas->obtenerPagoInscripcion();

		if (count($pagoinscripcion)>0) {
			
			$asignadas->idpago=$pagoinscripcion[0]->idpago;
			$asignadas->estatus=2;
			$asignadas->CambiarEstatusAsignacionPago();
			}

			
		}else{

			$obtenerultimo=$asignadas->ObtenerHistorial();
			$asignadas->idusuarios_membresia=$obtenerultimo[0]->idusuarios_membresia;
			$asignadas->estatus=$obtenerultimo[0]->estatus;
			$asignadas->pagado=$obtenerultimo[0]->pagado;
			$asignadas->CambiarEstatusAsignacion();

			$asignadas->idpago=$obtenerultimo[0]->idpago;
			$asignadas->estatus=$obtenerultimo[0]->estatuspago;
			$asignadas->CambiarEstatusAsignacionPago();


			$pagoinscripcion=$asignadas->obtenerPagoInscripcion();

		if (count($pagoinscripcion)>0) {
			
			$asignadas->idpago=$pagoinscripcion[0]->idpago;
			$asignadas->estatus=$obtenerultimo[0]->estatuspago;
			$asignadas->CambiarEstatusAsignacionPago();
			}

		}

	}else{
	
	$resp=0;

	}

	$db->commit();

	$respuesta['respuesta']=$resp;
	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>