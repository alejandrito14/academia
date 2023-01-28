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
require_once("../../clases/class.EnlaceInterno.php");

require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$enlaceinterno = new EnlaceInterno();
	$f = new Funciones();
	
	//enviamos la conexión a las clases que lo requieren
	$enlaceinterno->db=$db;
	$md->db = $db;	

	$enlaceinterno->idrutainternaapp=$_POST['idrutainternaapp'];

	$obtener=$enlaceinterno->ObtenerEnlaceInterno();

	$tabla=$obtener[0]->tabla;
	$idcampo=$obtener[0]->campoid;
	$campovalor=$obtener[0]->campovalor;
	$estatus=$obtener[0]->estatuselementos;

	$sqlestatus="";
	if ($estatus!='') {
		$sqlestatus="AND estatus=".$estatus;
	}

	$sql="SELECT $idcampo as idvalor,$campovalor as titulo FROM $tabla WHERE  1=1 $sqlestatus ";

		$resp=$db->consulta($sql);
		$cont = $db->num_rows($resp);


		$array=array();
		$contador=0;
		if ($cont>0) {

			while ($objeto=$db->fetch_object($resp)) {

				$array[$contador]=$objeto;
				$contador++;
			} 
		}
	

	$respuesta['respuesta']=$array;

	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>