<?php
/*================================*
*  Proyecto: AUTOBUSES AEXA 	  *
*  Compañia: CAPSE 				  *
*  Fecha: 22/08/2019     		  *
* MSD José Luis Gómez Aguilar     *
*=================================*/

/*======================= INICIA VALIDACIÓN DE SESIÓN =========================*/

require_once("../../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();

if(!isset($_SESSION['se_SAS']))
{
		/* header("Location: ../login.php"); */ echo "login";
	exit;
}

/*======================= TERMINA VALIDACIÓN DE SESIÓN =========================*/

//Importamos las clases que vamos a utilizar
require_once("../../../clases/conexcion.php");
require_once("../../../clases/class.Sucursales.php");
require_once("../../../clases/class.Funciones.php");
require_once('../../../clases/class.MovimientoBitacora.php');
require_once("../../../clases/class.Sucursalesfolios.php");
try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$su = new Sucursales();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	$folio=new Sucursalesfolios();
	
	//enviamos la conexión a las clases que lo requieren
	$su->db = $db;
	$md->db = $db;	
	$folio->db=$db;
	
	$db->begin();
		
	//Recbimos parametros
	$su->idsucursales = trim($_POST['idsucursales']);
	$su->idempresas = trim($_POST['idempresas']);
	$su->sucursal = trim($f->guardar_cadena_utf8($_POST['v_sucursal']));
	$su->direccion = trim($f->guardar_cadena_utf8($_POST['v_direccion_sucursal']));
	$su->telefono = trim($f->guardar_cadena_utf8($_POST['v_telefono']));
	$su->email = trim($f->guardar_cadena_utf8($_POST['v_email']));
	$su->estatus = trim($f->guardar_cadena_utf8($_POST['v_estatus']));
	$su->iva=trim($_POST['v_iva']);
	
	//Validamos si hacermos un insert o un update
	if($su->idsucursales == 0)
	{
		//guardando
		
		$su->guardar_sucursal();
		$md->guardarMovimiento($f->guardar_cadena_utf8('sucursales'),'sucursales',$f->guardar_cadena_utf8('Nueva sucursal creado con el ID-'.$su->idsucursales));
		$folio->idsucursal=$su->idsucursales;
		$folio->GuardarFolio();
	}else{
		$su->modificar_sucursal();	
		$md->guardarMovimiento($f->guardar_cadena_utf8('sucursales'),'sucursales',$f->guardar_cadena_utf8('Modificación de sucursal -'.$su->idsucursales));
	}
				
	$db->commit();
	echo 1;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>