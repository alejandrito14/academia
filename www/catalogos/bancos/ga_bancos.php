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
require_once("../../clases/class.Bancos.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Bancos();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$emp->idbancos = trim($_POST['id']);
	$emp->clave = trim($f->guardar_cadena_utf8($_POST['v_clave']));
	$emp->nombrecorto = trim($f->guardar_cadena_utf8($_POST['v_nombreabrevidado']));
	$emp->nombre = trim($f->guardar_cadena_utf8($_POST['v_nombre']));
	$emp->estatus=trim($f->guardar_cadena_utf8($_POST['v_estatus']));
	
	
	//Validamos si hacermos un insert o un update
	if($emp->idbancos == 0)
	{
		//guardando
		$emp->GuardarBanco();
		$md->guardarMovimiento($f->guardar_cadena_utf8('Bancos'),'categorias',$f->guardar_cadena_utf8('Nuevo banco creado con el ID-'.$emp->idbancos));
	}else{
		$emp->ModificarBanco();	
		$md->guardarMovimiento($f->guardar_cadena_utf8('Bancos'),'categorias',$f->guardar_cadena_utf8('Modificación de banco-'.$emp->idbancos));
	}
				
	$db->commit();
	echo "1|".$emp->idbancos;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>