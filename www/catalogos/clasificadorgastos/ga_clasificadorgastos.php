<?php
/*================================*
*  Proyecto: AUTOBUSES AEXA		  *
*  Compañia: CAPSE 				  *
*  Fecha: 31/08/2019     		  *
*  MSD José Luis Gómez Aguilar   *
*=================================*/

/*======================= INICIA VALIDACIÓN DE SESIÓN =========================*/

require_once("../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();

if(!isset($_SESSION['se_SAS']))
{
	header("Location: ../../login.php");
	exit;
}

/*======================= TERMINA VALIDACIÓN DE SESIÓN =========================*/

//Importamos las clases que vamos a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.CategoriasClasificador.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$ca = new CategoriasClasificador();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$ca->db = $db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$ca->idclasificadorgasto = trim($_POST['id']);
	$ca->nombre = trim($f->guardar_cadena_utf8($_POST['v_nombre']));
	$ca->depende = trim($f->guardar_cadena_utf8($_POST['idcategoriaseleccionada']));
	$ca->estatus=$_POST['v_estatus'];
	$ca->orden=$_POST['v_orden'];
	
	//Validamos si hacermos un insert o un update
	if($ca->idclasificadorgasto == 0)
	{
		//guardando
		$ca->GuardarCategoriaClasificador();
		$md->guardarMovimiento($f->guardar_cadena_utf8('categorias clasificador'),'clasificador',$f->guardar_cadena_utf8('Nueva categoria de cuenta el ID-'.$ca->idclasificadorgasto));
	}else{
		$ca->ModificarCategoriaClasificador();	
		$md->guardarMovimiento($f->guardar_cadena_utf8('categorias clasificador'),'clasificador',$f->guardar_cadena_utf8('Modificación de categoria de cuenta -'.$ca->idclasificadorgasto));
	}
				
	$db->commit();
	echo "1|".$st->idclasificadorgasto;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>