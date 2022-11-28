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
require_once("../../clases/class.Juego.php");
require_once("../../clases/class.Tipopartidos.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$juego = new Juego();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	$tipo=new Tipopartidos();
	
	//enviamos la conexión a las clases que lo requieren
	$juego->db=$db;
	$md->db = $db;	
	$tipo->db=$db;
	
	$db->begin();
		
	//Recbimos parametros
	$juego->idjuego=trim($f->guardar_cadena_utf8($_POST['idjuego']));



	$ObtenerJugadores=$juego->obtenerjugadores();

	if (count($ObtenerJugadores)>0) {
		
			$vrespuesta['respuesta']=$ObtenerJugadores;

	}else{

			$vrespuesta['respuesta']=0;

	}



	echo json_encode($vrespuesta);

	
				
	
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>