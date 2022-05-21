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
require_once("../../clases/class.CategoriasServicios.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$categoriasservicio = new CategoriasServicios();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$categoriasservicio->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
		




	//Recbimos parametros
	$categoriasservicio->idcategoriasservicio = trim($_POST['id']);
	$categoriasservicio->nombre = trim($f->guardar_cadena_utf8($_POST['v_categoriasservicio']));
	$categoriasservicio->estatus=trim($f->guardar_cadena_utf8($_POST['v_estatus']));
	$categoriasservicio->tipo=$_POST['v_tipo'];
	$categoriasservicio->intervalo=$_POST['v_intervalo'];
	
	//Validamos si hacermos un insert o un update
	if($categoriasservicio->idcategoriasservicio == 0)
	{
		//guardando
		$categoriasservicio->Guardarcategoriasservicio();
		$md->guardarMovimiento($f->guardar_cadena_utf8('categoriasservicio'),'categoriasservicio',$f->guardar_cadena_utf8('Nuevo categoriasservicio creado con el ID-'.$categoriasservicio->idcategoriasservicio));
	}else{
		$categoriasservicio->Modificarcategoriasservicio();	
		$md->guardarMovimiento($f->guardar_cadena_utf8('categoriasservicio'),'categoriasservicio',$f->guardar_cadena_utf8('Modificación de categoriasservicio -'.$categoriasservicio->idcategoriasservicio));
	}
				
	$db->commit();
	echo "1|".$categoriasservicio->idcategoriasservicio;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>