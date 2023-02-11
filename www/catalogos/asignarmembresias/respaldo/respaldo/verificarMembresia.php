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
require_once("../../clases/class.MembresiasAsignadas.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new MembresiasAsignadas();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
	$idmembresia=$_POST['idmembresia'];
	$idusuario=$_POST['idusuario'];
	$emp->idmembresia=$idmembresia;
	$emp->idusuarios=$idusuario;

	$checarexisteregiste=$emp->ObtenerAsignacionMembresia();
	$validado=0;
	if (count($checarexisteregiste)>0) {
		$obtener=$emp->VerificarAsignacionmembresia();
		$row=$db->fetch_assoc($obtener);
		$num=$db->num_rows($obtener);
		
		$validado=0;
		if ($num>0) {
			$validado=1;
		}
	}


				
	$db->commit();
	$respuesta['respuesta']=$validado;
	echo json_encode($respuesta);
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>