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
require_once("../../clases/class.PoliticasAceptacion.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$politicasaceptacion = new PoliticasAceptacion();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$politicasaceptacion->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
		



	//Recbimos parametros
	$politicasaceptacion->idpoliticasaceptacion = trim($_POST['id']);
	$politicasaceptacion->nombre = trim($f->guardar_cadena_utf8($_POST['v_nombre']));
	$politicasaceptacion->descripcion = trim($f->guardar_cadena_utf8($_POST['v_descripcion']));
	$politicasaceptacion->estatus=trim($f->guardar_cadena_utf8($_POST['v_estatus']));
	
	
	//Validamos si hacermos un insert o un update
	if($politicasaceptacion->idpoliticasaceptacion == 0)
	{
		//guardando
		$politicasaceptacion->Guardarpoliticasaceptacion();
		$md->guardarMovimiento($f->guardar_cadena_utf8('politicasaceptacion'),'politicasaceptacion',$f->guardar_cadena_utf8('Nuevo politicasaceptacion creado con el ID-'.$politicasaceptacion->idpoliticasaceptacion));
	}else{
		$politicasaceptacion->Modificarpoliticasaceptacion();	
		$md->guardarMovimiento($f->guardar_cadena_utf8('politicasaceptacion'),'politicasaceptacion',$f->guardar_cadena_utf8('Modificación de politicasaceptacion -'.$politicasaceptacion->idpoliticasaceptacion));
	}
				
	$db->commit();
	echo "1|".$politicasaceptacion->idpoliticaaceptacion;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>