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
require_once("../../clases/class.Descuentos.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');
require_once('../../clases/class.Descuentosasignados.php');


try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Descuentos();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	$asignar=new Descuentosasignados();
	$asignar->db=$db;
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$emp->iddescuento = $_POST['iddescuento'];
   /* $verificarrelacion =$emp->VerificarRelacionDescuento();
    $numrow=$db->num_rows($verificarrelacion);*/

  /*  if ($numrow>0) {
    	echo 1;
    } 
    else{
    	*/
    	$emp->BorrarMultinoasociados();
    	$emp->BorrarMultiparentescodescuento();
    	$emp->BorrarDescuentoClientes();
    	$emp->BorrarCategoriasDescuento();
        $emp->EliminarPeriodosVigencia();
        $emp->BorrarServiciosDescuento();
        $asignar->EliminarAsignacionesDescuentos();

		$emp->EliminarCaracteristicasServicio();
		$emp->EliminarCaracteristicasTipoServicio();
    	$emp->BorrarDescuento();

    	/*$md->guardarMovimiento($f->guardar_cadena_utf8('descuento'),'descuento',$f->guardar_cadena_utf8('borrado de descuento -'.$descuento->iddescuento));
	*/
    	echo 0;
   // }

	$db->commit();

	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>