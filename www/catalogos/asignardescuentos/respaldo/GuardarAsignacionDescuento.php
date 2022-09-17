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
require_once("../../clases/class.Descuentos.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');
require_once('../../clases/class.Descuentosasignados.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Descuentos();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	$asignar=new Descuentosasignados();
	$asignar->db=$db;
	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$asignar->idusuarios = trim($_POST['idusuario']);

	$iddescuentos=explode(',',  $_POST['iddescuentos']);
	
	
			$asignar->EliminarAsignacionesDesNoUsados();

		if (count($iddescuentos)>0 && $iddescuentos[0]!='') {
			
			for ($i=0; $i < count($iddescuentos); $i++) {

						$asignar->iddescuento=$iddescuentos[$i];
						$asignacion=$asignar->ObtenerAsignacionDescuento();
						
						if (count($asignacion)==0) {
							$asignar->GuardarAsignacionDescuento();
						}
				}
			}

	$md->guardarMovimiento($f->guardar_cadena_utf8('Descuento'),'Asignación a usuario descuento',$f->guardar_cadena_utf8('Asignación a usuario -'.$asignar->idusuarios.' descuentos: '.$iddescuentos));

				
	$db->commit();
	$respuesta['respuesta']=1;
	echo json_encode($respuesta);
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>