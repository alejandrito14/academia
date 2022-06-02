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
require_once("../../clases/class.Clasificacion.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$clasificacion = new Clasificacion();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$clasificacion->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$clasificacion->idclasificacion = trim($_POST['id']);
	$clasificacion->nombre = trim($f->guardar_cadena_utf8($_POST['v_nombre']));

	$clasificacion->estatus=trim($f->guardar_cadena_utf8($_POST['v_estatus']));
	
	
	//Validamos si hacermos un insert o un update
	if($clasificacion->idclasificacion == 0)
	{
		//guardando
		$clasificacion->Guardarclasificacion();
		$md->guardarMovimiento($f->guardar_cadena_utf8('clasificacions'),'clasificacion',$f->guardar_cadena_utf8('Nuevo clasificacion creado con el ID-'.$clasificacion->idclasificacion));
	}else{
		$clasificacion->Modificarclasificacion();	
		$md->guardarMovimiento($f->guardar_cadena_utf8('clasificacions'),'clasificacion',$f->guardar_cadena_utf8('Modificación de clasificacion -'.$clasificacion->idclasificacion));
	}
				
	$db->commit();
	echo "1|".$clasificacion->idclasificacion;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>