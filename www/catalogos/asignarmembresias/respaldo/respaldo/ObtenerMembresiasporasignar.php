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
	$obtenermembresiasAsignados=$asignar->ObtenermembresiaActivosAsignados();

	$arraymembresia="";
	$contador=0;
	for ($i=0; $i <count($obtenermembresiasAsignados) ; $i++) { 
		
		$idmembresia=$obtenermembresiasAsignados[$i]->idmembresia;

		$arraymembresia.=$idmembresia;

		if ($i<(count($obtenermembresiasAsignados)-1)) {
			$arraymembresia.=",";
			}

		$membresia->idmembresia=$idmembresia;
		

	}

	$obtenermembresias=$membresia->ObtenermembresiaActivosMenos($arraymembresia);


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