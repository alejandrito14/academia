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
require_once("../../clases/class.Tipousuario.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$tipousuario = new Tipousuario();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$tipousuario->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
		




	//Recbimos parametros
	$tipousuario->idtipousuario = trim($_POST['id']);
	$tipousuario->nombre = trim($f->guardar_cadena_utf8($_POST['v_tipousuario']));
	$tipousuario->estatus=trim($f->guardar_cadena_utf8($_POST['v_estatus']));
	$tipousuario->mostrarenapp=$_POST['mostrarc'];
	$tipousuario->sistema=$_POST['sistemac'];
	$edicion=$_POST['edicion'];
	//Validamos si hacermos un insert o un update
	if($edicion == 0)
	{
		//guardando
		$tipousuario->Guardartipousuario();
		$md->guardarMovimiento($f->guardar_cadena_utf8('tipousuario'),'tipousuario',$f->guardar_cadena_utf8('Nuevo tipousuario creado con el ID-'.$tipousuario->idtipousuario));
	}else{
		$tipousuario->Modificartipousuario();	
		$md->guardarMovimiento($f->guardar_cadena_utf8('tipousuario'),'tipousuario',$f->guardar_cadena_utf8('Modificación de tipousuario -'.$tipousuario->idtipousuario));
	}
				
	$db->commit();
	echo "1|".$tipousuario->idtipousuario;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>