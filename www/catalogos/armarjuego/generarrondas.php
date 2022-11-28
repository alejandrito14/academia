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

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$juego = new Juego();
	$f = new Funciones();

	$teams = array('Equipo 1','Equipo 2','Equipo 3','Equipo 4',"Equipo 5", "Equipo 6");
	$results = array();

	foreach($teams as $k){
		foreach($teams as $j){
			if($k == $j){ break; }

			$z = array($k,$j);
			sort($z);
			if(!in_array($z,$results)){
				$results[] = $z;
			}
		}
	}


	$db->commit();
	echo "1|".$juego->idjuego;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>