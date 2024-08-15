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
require_once("../../clases/class.TiposervicioConfiguracion.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Botones.php");

//Se crean los objetos de clase
$db = new MySQL();
$tiposervicio = new TiposervicioConfiguracion();
$f = new Funciones();
$bt = new Botones_permisos();

$tiposervicio->db = $db;
	


//Recibo parametros del filtro


//Envio parametros a la clase empresas


//Realizamos concalta
$resultado_tiposervicio = $tiposervicio->ObtenerTipoServicionConfiguracion();
$resultado_tiposervicio_num = $db->num_rows($resultado_tiposervicio);
$resultado_tiposervicio_row = $db->fetch_assoc($resultado_tiposervicio);

?>

   <option value="0">TODAS LAS CATEGORIAS</option>

<?PHP
	do
	{
?>
      <option value="<?php echo $resultado_tiposervicio_row['idtiposervicioconfiguracion']; ?>"><?php echo $resultado_tiposervicio_row['nombre']; ?> </option>
<?php
	}while($resultado_tiposervicio_row = $db->fetch_assoc($resultado_tiposervicio));
?>
