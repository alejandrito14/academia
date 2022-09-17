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


try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$servicio = new Servicios();
	$f = new Funciones();
	$asignar = new AsignarUsuarioServicio();
	$usuarios=json_decode($_POST['idusuario']);

	$asignar->db=$db;
	$servicio->db=$db;
	$obtenerserviciosAsignados="";
	$arrayservicio="";
	if (count($usuarios)==1) {

		$idusuario=$usuarios[0]->{'idusuario'};
		$asignar->idusuarios=$idusuario;
		$obtenerserviciosAsignados=$asignar->ObtenerServicioActivosAsignados();
	
	 

	
	$contador=0;
	for ($i=0; $i <count($obtenerserviciosAsignados) ; $i++) { 
		
		$idservicio=$obtenerserviciosAsignados[$i]->idservicio;

		$arrayservicio.=$idservicio;

		if ($i<(count($obtenerserviciosAsignados)-1)) {
			$arrayservicio.=",";
			}

		$servicio->idservicio=$idservicio;
		$obtenerhorarios=$servicio->ObtenerHorariosSemana();
		$obtenerserviciosAsignados[$i]->horarios=$obtenerhorarios;

	}
}
	
	//var_dump($arrayservicio);die();

	$obtenerservicios=$servicio->ObtenerServicioActivosMenos($arrayservicio);


	$respuesta['respuesta']=1;
	$respuesta['serviciosasignados']=$obtenerserviciosAsignados;
	$respuesta['servicios']=$obtenerservicios;
	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>