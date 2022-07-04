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
	$emp = new Clasificacion();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$emp->idclasificacion = $_POST['idclasificacion'];
    $verificarrelacion =$emp->VerificarRelacionclasificacion();
    $numrow=$db->num_rows($verificarrelacion);

    if ($numrow>0) {
    	echo 1;
    }
    else{

    	$emp->Borrarclasificacion();
    	echo 0;
    }

	$db->commit();

	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>