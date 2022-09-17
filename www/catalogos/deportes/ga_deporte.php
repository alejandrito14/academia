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
require_once("../../clases/class.Deportes.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$deporte = new Deportes();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$deporte->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
		




	//Recbimos parametros
	$deporte->iddeporte = trim($_POST['id']);
	$deporte->nombre = trim($f->guardar_cadena_utf8($_POST['v_deporte']));
	$deporte->estatus=trim($f->guardar_cadena_utf8($_POST['v_estatus']));
	$niveles=explode(',',$_POST['niveles']);
	
	//Validamos si hacermos un insert o un update
	if($deporte->iddeporte == 0)
	{
		//guardando
		$deporte->Guardardeporte();
		$md->guardarMovimiento($f->guardar_cadena_utf8('deporte'),'deporte',$f->guardar_cadena_utf8('Nuevo deporte creado con el ID-'.$deporte->iddeporte));
	}else{
		$deporte->Modificardeporte();
		$deporte->EliminarNiveldeporte();	
		$md->guardarMovimiento($f->guardar_cadena_utf8('deporte'),'deporte',$f->guardar_cadena_utf8('Modificación de deporte -'.$deporte->iddeporte));
	}


	if (count($niveles)>0 && $niveles[0]!='') {
			for ($i=0; $i < count($niveles); $i++) { 

						$deporte->idnivel=$niveles[$i];
						$deporte->GuardarNivelDeporte();
					}
				}
				
	$db->commit();
	echo "1|".$deporte->iddeporte;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>