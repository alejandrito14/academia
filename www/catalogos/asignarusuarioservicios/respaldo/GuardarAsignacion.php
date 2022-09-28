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

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Servicios();
	$f = new Funciones();
	$md = new MovimientoBitacora();

	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$emp->idservicio = trim($_POST['idservicio']);

	$participantes=explode(',',  $_POST['participantes']);
	
	

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