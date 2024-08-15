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
require_once("../../clases/class.Tiponegocios.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Tiponegocios();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$emp->idtiponegocio = trim($_POST['id']);
	$emp->nombre = trim($f->guardar_cadena_utf8($_POST['v_nombre']));
	
	$emp->orden = trim($f->guardar_cadena_utf8($_POST['v_orden']));
	$emp->estatus = trim($f->guardar_cadena_utf8($_POST['v_estatus']));

	//Validamos si hacermos un insert o un update
	if($emp->idtiponegocio == 0)
	{
		//guardando
		$emp->GuardarTiponegocio();




		$md->guardarMovimiento($f->guardar_cadena_utf8('Tiponegocios'),'tiponegocios',$f->guardar_cadena_utf8('Nuevo tiponegocios creado con el ID-'.$emp->idtiponegocio));
	}else{
		$emp->ActualizarTiponegocio();	

	
		$md->guardarMovimiento($f->guardar_cadena_utf8('Tiponegocios'),'tiponegocios',$f->guardar_cadena_utf8('Modificación de tiponegocios -'.$emp->idtiponegocio));
	}




	
				
	$db->commit();
	echo "1|".$emp->idtiponegocio;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>