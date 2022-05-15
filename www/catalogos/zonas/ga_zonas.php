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
require_once("../../clases/class.Zonas.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$zona = new Zonas();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$zona->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
		


	//Recbimos parametros
	$zona->idzona = trim($_POST['id']);
	$zona->nombre = trim($f->guardar_cadena_utf8($_POST['v_zona']));
	$zona->estatus=trim($f->guardar_cadena_utf8($_POST['v_estatus']));
	
	$diasemanas=explode(',', $_POST['diasemana']);

	$horainiciosemana=explode(',', $_POST['horainiciodia']);

	$horafinsemana=explode(',', $_POST['horafindia']);

	//Validamos si hacermos un insert o un update
	if($zona->idzona == 0)
	{
		//guardando
		$zona->Guardarzona();

		if (count($diasemanas)>0 && $diasemanas[0]!='') {
			# code...
		
		for ($i=0; $i < count($diasemanas); $i++) { 
				$zona->dia=$diasemanas[$i];
				$zona->horainiciosemana=$horainiciosemana[$i];
				$zona->horafinsemana=$horafinsemana[$i];
				$zona->GuardarHorarioSemana();
			}
		}

		$md->guardarMovimiento($f->guardar_cadena_utf8('zona'),'zona',$f->guardar_cadena_utf8('Nuevo zona creado con el ID-'.$zona->idzona));
	}else{
		$zona->Modificarzona();	

		if (count($diasemanas)>0 && $diasemanas[0]!='') {
			$zona->EliminarHorarioSemana();
		
		for ($i=0; $i < count($diasemanas); $i++) { 
				$zona->dia=$diasemanas[$i];
				$zona->horainiciosemana=$horainiciosemana[$i];
				$zona->horafinsemana=$horafinsemana[$i];
				$zona->GuardarHorarioSemana();
			}
		}

		$md->guardarMovimiento($f->guardar_cadena_utf8('zona'),'zona',$f->guardar_cadena_utf8('Modificación de zona -'.$zona->idzona));
	}
				
	$db->commit();
	echo "1|".$zona->idzona;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>