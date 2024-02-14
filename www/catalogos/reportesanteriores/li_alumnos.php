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


$tipousaurio = $_SESSION['se_sas_Tipo'];  //variables de sesion
$lista_empresas = $_SESSION['se_liempresas']; //variables de sesion

//validaciones para todo el sistema


/*======================= TERMINA VALIDACIÓN DE SESIÓN =========================*/


//Importamos nuestras clases
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Usuarios.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Botones.php");
require_once("../../clases/class.AccesoEmpresa.php");

//Se crean los objetos de clase
$db = new MySQL();
$su = new Usuarios();
$f = new Funciones();
$bt = new Botones_permisos();




			

$su->db = $db;
	
$tipousaurio=$_SESSION['se_sas_Tipo'];
$idusuario=$_SESSION['se_sas_Usuario'];
$idservicio="";
//Recibo parametros del filtro


//Envio parametros a la clase empresas

if (isset($_GET['idservicio'])) {
	$idservicio=$_GET['idservicio'];
}
//Realizamos consulta
/*if ($tipousaurio==0) {
	

$resultado_alumnos = $su->ObtenerTodos();
$resultado_alumnos_num = $db->num_rows($resultado_alumnos);
$resultado_alumnos_row = $db->fetch_assoc($resultado_alumnos);

}else{
	*/
	//$acceso->idusuarios=$idusuario;
	if ($idservicio=='' || $idservicio==0 ) {
		# code...
	
	$resultado_alumnos=$su->ObtenerUsuariosAlumno();
	

	}else{
	$su->idservicio=$idservicio;
	$resultado_alumnos=$su->ObtenerUsuariosAlumnoServicio();


	}
	$resultado_alumnos_row=$db->fetch_assoc($resultado_alumnos);
	$resultado_alumnos_num = $db->num_rows($resultado_alumnos);
//}


?>

   <option value="0">TODAS LOS ALUMNOS</option>

<?PHP
	do
	{
?>
      <option value="<?php echo $resultado_alumnos_row['idusuarios']; ?>"><?php echo $resultado_alumnos_row['nombre'].' '.$resultado_alumnos_row['paterno'].' '.$resultado_alumnos_row['materno']; ?> </option>
<?php
	}while($resultado_alumnos_row = $db->fetch_assoc($resultado_alumnos));
?>
