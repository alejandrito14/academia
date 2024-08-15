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
require_once("../../clases/class.Movimientos.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$movimiento = new Movimientos();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$movimiento->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
		




	//Recbimos parametros
	$movimiento->idmovimiento = trim($_POST['id']);
	$movimiento->tipo = trim($f->guardar_cadena_utf8($_POST['tipomovimiento']));
	$movimiento->estatus=trim($f->guardar_cadena_utf8($_POST['v_estatus']));
	$movimiento->idclasificadorgastos=$_POST['v_clasificadorid'];
	$movimiento->idformapagocuenta=$_POST['v_cuenta'];
	$movimiento->fechaoperacion=$_POST['v_fecha'];
	$movimiento->observacion=$_POST['v_observacion'];
	$movimiento->monto=$_POST['v_monto'];
	
	//Validamos si hacermos un insert o un update
	if($movimiento->idmovimiento == 0)
	{
		//guardando
		$movimiento->Guardarmovimiento();
		$md->guardarMovimiento($f->guardar_cadena_utf8('movimiento'),'movimiento',$f->guardar_cadena_utf8('Nuevo movimiento creado con el ID-'.$movimiento->idmovimiento));
	}else{
		$movimiento->Modificarmovimiento();	
		$md->guardarMovimiento($f->guardar_cadena_utf8('movimiento'),'movimiento',$f->guardar_cadena_utf8('Modificación de movimiento -'.$movimiento->idmovimiento));
	}
				
	$db->commit();
	echo "1|".$movimiento->idmovimiento;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>