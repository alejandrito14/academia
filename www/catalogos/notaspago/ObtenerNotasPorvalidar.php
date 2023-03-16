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
require_once("../../clases/class.Notapago.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Fechas.php");

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$nota = new Notapago();
	$f = new Funciones();
	$fechas = new Fechas();
	$se = new Sesion();
	//enviamos la conexión a las clases que lo requieren
	$nota->db=$db;
	$md->db = $db;	
	
	$obtener=$nota->ListadoNotasPagosPorvalidar();


	for ($i=0; $i < count($obtener); $i++) { 
		

		$dividircadena=explode(' ', $obtener[$i]->fecha);
		$fecha=explode('-',$dividircadena[0]);
		$obtener[$i]->fechaformato='';
		if ($fecha!='') {
			# code...
		$fechadividida=$fecha[0].'-'.$fecha[1].'-'.$fecha[2];
		$dianumero=explode('-',$fechadividida);
		$obtener[$i]->fechaformato=$dianumero[2].'/'.$fechas->mesesAnho3[$fechas->mesdelano($fechadividida)-1].' '.$fecha[0];


			$fecha=date('d-m-Y',$obtener[$i]->fechafinal);
			$obtener[$i]->fechafinal=$fecha;
			}

			$nota->idnotapago=$obtener[$i]->idnotapago;
			$conceptosnota=$nota->ObtenerdescripcionNotapago();

			$obtener[$i]->descripcionnota=$conceptosnota;

			

		}

	$respuesta['pagos']=$obtener;
	echo json_encode($respuesta);
		

	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>