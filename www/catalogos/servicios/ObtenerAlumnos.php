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
require_once("../../clases/class.Usuarios.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Fechas.php");
require_once("../../clases/class.ServiciosAsignados.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Usuarios();
	$f=new Funciones();
	$fechas=new Fechas();
	$serviciosasignados= new ServiciosAsignados();
	//Enviamos la conexion a la clase
	$lo->db = $db;
	$serviciosasignados->db=$db;

	/*$serviciosasignados->idusuario=$_POST['id_user'];
	$idusuarios_servicios=$_POST['idusuarios_servicios'];
	$serviciosasignados->idusuarios_servicios=$idusuarios_servicios;
	$obtener=$serviciosasignados->ObtenerServicioAsignado();*/
	$idservicio=$_POST['idservicio'];
	$lo->idservicio=$idservicio;

	$serviciosasignados->idservicio=$idservicio;
	$usuariosservicio=$serviciosasignados->obtenerUsuariosServiciosAsignadosAgrupado();

	$idusuariosservicio=$usuariosservicio[0]->idusuarios;

	$obtenerusuarios=$lo->obtenerUsuariosAlumnosNoServicio2($idusuariosservicio);
	$lo->idusuario=0;
	$obtener=$serviciosasignados->obtenerUsuariosServiciosAlumnosAsignados();
	$respuesta['respuesta']=$obtenerusuarios;
	$respuesta['asignados']=$obtener;
	
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