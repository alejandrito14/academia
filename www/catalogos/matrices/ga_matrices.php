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
require_once("../../clases/class.Matrices.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$matriz = new Matrices();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$matriz->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
		




	//Recbimos parametros
	$matriz->id = trim($_POST['id']);
	$matriz->nombre = trim($f->guardar_cadena_utf8($_POST['v_nombre']));
	$matriz->estatus=trim($f->guardar_cadena_utf8($_POST['v_estatus']));

	$matriz->valor1=$_POST['v_valor1'];
	$matriz->valor2=$_POST['v_valor2'];

	$valores1=explode(',',$_POST['valores1']);
	$valores2=explode(',',$_POST['valores2']);
	
	
	//Validamos si hacermos un insert o un update
	if($matriz->id == 0)
	{
		//guardando
		$matriz->Guardarmatriz();


		if ($valores1[0]!='' && $valores2[0]!='') {
			
			for ($i=0; $i <count($valores1) ; $i++) { 
				$matriz->valor1=$valores1[$i];
				$matriz->valor2=$valores2[$i];

				$matriz->GuardarValoresMatriz();

			}
		}
		$md->guardarMovimiento($f->guardar_cadena_utf8('matriz'),'matriz',$f->guardar_cadena_utf8('Nuevo matriz creado con el ID-'.$matriz->id));
	}else{
		$matriz->Modificarmatriz();	
		$matriz->EliminarValoresMatriz();

		if ($valores1[0]!='' && $valores2[0]!='') {
			
			for ($i=0; $i <count($valores1) ; $i++) { 
				$matriz->valor1=$valores1[$i];
				$matriz->valor2=$valores2[$i];

				$matriz->GuardarValoresMatriz();

			}
		}
		$md->guardarMovimiento($f->guardar_cadena_utf8('matriz'),'matriz',$f->guardar_cadena_utf8('Modificación de matriz -'.$matriz->id));
	}
				
	$db->commit();
	echo "1|".$matriz->id;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>