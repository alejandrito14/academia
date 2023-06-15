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
require_once("../../clases/class.ServiciosAsignados.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Servicios.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$f=new Funciones();
	$servicios=new Servicios();

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$servicios->db=$db;

	$lo->idusuario=$_POST['idusuario'];
	$lo->idservicio=$_POST['idservicio'];
	$servicios->idservicio=$_POST['idservicio'];
	$obtenerservicio=$servicios->ObtenerServicio();
	$idcategoria=$obtenerservicio[0]->idcategoriaservicio;

	$obtener=$lo->VerificacionUsuarioServicios($idcategoria);
	$pagospendientes=0;
	if(count($obtener)>0) {
		$pagospendientes=1;
	}


	$respuesta['respuesta']=$obtener;
	$respuesta['pagospendientes']=$pagospendientes;

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