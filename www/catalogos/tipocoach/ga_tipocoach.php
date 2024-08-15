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
require_once("../../clases/class.Tipocoach.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$tipocoach = new Tipocoach();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$tipocoach->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	
	//Recbimos parametros
	$tipocoach->idtipocoach = trim($_POST['idtipocoach']);
	$tipocoach->nombre = trim($f->guardar_cadena_utf8($_POST['v_nombre']));
	$tipocoach->tipocomision=$_POST['v_tipocomision'];
	$tipocoach->monto=$_POST['v_monto'];
	$tipocoach->costo=$_POST['v_costo'];
	$tipocoach->estatus=trim($f->guardar_cadena_utf8($_POST['v_estatus']));
	
	
	//Validamos si hacermos un insert o un update
	if($tipocoach->idtipocoach == 0)
	{
		//guardando
		$tipocoach->Guardartipocoach();
		$md->guardarMovimiento($f->guardar_cadena_utf8('tipocoach'),'tipocoach',$f->guardar_cadena_utf8('Nuevo tipocoach creado con el ID-'.$tipocoach->idtipocoach));
	}else{
		$tipocoach->Modificartipocoach();	 
		$md->guardarMovimiento($f->guardar_cadena_utf8('tipocoach'),'tipocoach',$f->guardar_cadena_utf8('Modificación de tipocoach -'.$tipocoach->idtipocoach));
	}
				
	$db->commit();
	echo "1|".$tipocoach->idtipocoach;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>