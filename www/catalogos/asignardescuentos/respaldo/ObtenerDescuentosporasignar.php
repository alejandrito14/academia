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
	$descuento = new Descuentos();
	$f = new Funciones();
	$asignar = new Descuentosasignados();
	$idusuario=$_POST['idusuario'];
	$asignar->db=$db;
	$descuento->db=$db;
	$asignar->idusuarios=$idusuario;
	$obtenerdescuentosAsignados=$asignar->ObtenerdescuentoActivosAsignados();

	$arraydescuento="";
	$contador=0;
	for ($i=0; $i <count($obtenerdescuentosAsignados) ; $i++) { 
		
		$iddescuento=$obtenerdescuentosAsignados[$i]->iddescuento;

		$arraydescuento.=$iddescuento;

		if ($i<(count($obtenerdescuentosAsignados)-1)) {
			$arraydescuento.=",";
			}

		$descuento->iddescuento=$iddescuento;
		$obtenerhorarios=$descuento->ObtenerPeriodosDescuento();
		$obtenerdescuentosAsignados[$i]->periodos=$obtenerhorarios;

	}
	$obtenerdescuentos=$descuento->ObtenerdescuentoActivosMenos($arraydescuento);


	$respuesta['respuesta']=1;
	$respuesta['descuentosasignados']=$obtenerdescuentosAsignados;
	$respuesta['descuentos']=$obtenerdescuentos;
	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>