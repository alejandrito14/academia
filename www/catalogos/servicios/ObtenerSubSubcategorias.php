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
require_once("../../clases/class.Encuesta.php");

require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');
require_once('../../clases/class.Categorias.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$encuesta = new Encuesta();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	$categorias=new Categorias();

	//enviamos la conexión a las clases que lo requieren
	$encuesta->db=$db;
	$md->db = $db;	
	$categorias->db=$db;
	

	//Recbimos parametros
	$idcategorias = trim($_POST['idcategoria']);
	$categorias->idcategoria=$idcategorias;
	$obtener=$categorias->ObtenerSubSubCategoriaServicio();

	$respuesta['respuesta']=$obtener;

	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>