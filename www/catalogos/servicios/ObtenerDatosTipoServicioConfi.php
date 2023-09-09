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
//Inlcuimos las clases a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.TiposervicioConfiguracion.php");
require_once("../../clases/class.Funciones.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new TiposervicioConfiguracion();
	$f=new Funciones();
	$lo->db=$db;
	$idtipoconfiguracionservicio=$_POST['idtiposervicioconfiguracion'];
	$lo->idtiposervicioconfiguracion=$idtipoconfiguracionservicio;

	$obtener=$lo->ObttiposervicioConfiguracionDatos();


	$respuesta['respuesta']=$obtener[0];
	
	//Retornamos en formato JSON 
	$myJSON = json_encode($respuesta);
	echo $myJSON;

}catch(Exception $e){
	//$db->rollback();
	//echo "Error. ".$e;
	
	$array->resultado = "Error: ".$e;
	$array->msg = "Error al ejecutar el php";
	$array->id = '0';
		//Retornamos en formato JSON 
	$myJSON = json_encode($array);
	echo $myJSON;
}
?>