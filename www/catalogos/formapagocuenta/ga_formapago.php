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
require_once("../../clases/class.Formapagocuenta.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Formapagocuenta();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$emp->idformapagocuenta = trim($_POST['id']);
	$emp->nombre = trim($f->guardar_cadena_utf8($_POST['v_nombre']));
	
	$emp->estatus=trim($f->guardar_cadena_utf8($_POST['v_estatus']));
	
	
	//Validamos si hacermos un insert o un update
	if($emp->idformapagocuenta == 0)
	{
		//guardando
		$emp->Guardarformapagocuenta();
		$md->guardarMovimiento($f->guardar_cadena_utf8('Forma de pago cuenta'),'forma de pago cuentas',$f->guardar_cadena_utf8('Nueva forma de pago cuenta creado con el ID-'.$emp->idformapagocuenta));
	}else{
		$emp->Modificarformapagocuenta();	
		$md->guardarMovimiento($f->guardar_cadena_utf8('Forma de pago cuenta'),'forma de pago cuentas',$f->guardar_cadena_utf8('Modificación de forma de pago cuenta-'.$emp->idformapagocuenta));
	}
				
	$db->commit();
	echo "1|".$emp->idformapagocuenta;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>