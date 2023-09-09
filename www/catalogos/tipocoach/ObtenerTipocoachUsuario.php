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
require_once("../../clases/class.Tipocoach.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');
require_once("../../clases/class.Usuarios.php");
try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$tipocoach = new Tipocoach();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	$usuarios=new Usuarios();
	$usuarios->db=$db;
	//enviamos la conexión a las clases que lo requieren
	$tipocoach->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	$idusuarios=$_POST['idusuario'];
	$usuarios->id_usuario=$idusuarios;
	$obtenerusuario=$usuarios->ObtenerUsuario();

	$tipocoachusuario=$obtenerusuario[0]->idtipocoach;
	$tipocoach->idtipocoach=$tipocoachusuario;
	$obtenertipocoach=$tipocoach->Obtenertipocoach();
	

	$respuesta['respuesta']=1;
	$respuesta['tipocoach']=$obtenertipocoach;

	//Retornamos en formato JSON 
	$myJSON = json_encode($respuesta);
	echo $myJSON;
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>