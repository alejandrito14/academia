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
require_once("../../clases/class.Cuentas.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Cuentas();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$emp->idcuenta = trim($_POST['id']);
	$emp->nombre = trim($f->guardar_cadena_utf8($_POST['v_nombre']));
	
	$emp->estatus=trim($f->guardar_cadena_utf8($_POST['v_estatus']));
	
	
	//Validamos si hacermos un insert o un update
	if($emp->idcuenta == 0)
	{
		//guardando
		$emp->GuardarCuenta();
		$md->guardarMovimiento($f->guardar_cadena_utf8('Cuentas'),'cuentas',$f->guardar_cadena_utf8('Nuevo banco creado con el ID-'.$emp->idcuenta));
	}else{
		$emp->ModificarCuenta();	
		$md->guardarMovimiento($f->guardar_cadena_utf8('Cuentas'),'cuentas',$f->guardar_cadena_utf8('Modificación de cuenta-'.$emp->idcuenta));
	}
				
	$db->commit();
	echo "1|".$emp->idcuenta;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>