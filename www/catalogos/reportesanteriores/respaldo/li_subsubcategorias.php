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

//Recibo parametros del filtro
$idempresas = $_GET['v_idempresa'];
//$idinsumo = $_GET['v_idsucursal'];
//$idmenumodulo = $_GET['idmenumodulo'];
//Declaración de variables
$tipousaurio = $_SESSION['se_sas_Tipo'];  //variables de sesion
$lista_empresas = $_SESSION['se_liempresas']; //variables de sesion

//Importamos nuestras clases
require_once("../../clases/conexcion.php");
require_once("../../clases/class.CategoriasServicios.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Botones.php");

//Se crean los objetos de clase
$db = new MySQL();
$rpt = new CategoriasServicios();
$f = new Funciones();
$bt = new Botones_permisos();

$rpt->db = $db;

$idtiposervicio=$_POST['v_tiposervicios2'];

if ($idtiposervicio!='') {
	// code...

$subsucategorias=$rpt->ObtenerSubsubcategorias($idtiposervicio);


$resultado_num=count($subsucategorias);
				if ($resultado_num==0) { ?>
					
					<option value="0">NO SE ENCONTRARON REGISTROS</option>
					
			<?php	}else{ ?>

				
						<?php 
						for ($i=0; $i <count($subsucategorias) ; $i++) { 
												
							?>
										<option value="<?php echo $subsucategorias[$i]->idcategoriasservicio?>">

											<?php 

											 echo $subsucategorias[$i]->nombrecategoria;?>
											 	
											 </option>
									<?php
										}
									}
								}
				?>