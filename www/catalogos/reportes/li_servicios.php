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
require_once("../../clases/class.Servicios.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Botones.php");
require_once("../../clases/class.AccesoEmpresa.php");

//Se crean los objetos de clase
$db = new MySQL();
$su = new Servicios();
$f = new Funciones();
$bt = new Botones_permisos();




			

$su->db = $db;
	
$tipousaurio=$_SESSION['se_sas_Tipo'];
$idusuario=$_SESSION['se_sas_Usuario'];

//Recibo parametros del filtro


//Envio parametros a la clase empresas


//Realizamos consulta
/*if ($tipousaurio==0) {
	

$resultado_servicios = $su->ObtenerTodos();
$resultado_servicios_num = $db->num_rows($resultado_servicios);
$resultado_servicios_row = $db->fetch_assoc($resultado_servicios);

}else{
	*/
	//$acceso->idusuarios=$idusuario;
	$resultado_servicios=$su->ObtenerServiciosAvanzados();
	$resultado_servicios_row=$db->fetch_assoc($resultado_servicios);
	$resultado_servicios_num = $db->num_rows($resultado_servicios);



//}


?>

   <option value="0">TODAS LOS SERVICIOS</option>

<?PHP
	do
	{
?>
      <option value="<?php echo $resultado_servicios_row['idservicio']; ?>"><?php echo $resultado_servicios_row['titulo']; ?> </option>
<?php
	}while($resultado_servicios_row = $db->fetch_assoc($resultado_servicios));
?>
