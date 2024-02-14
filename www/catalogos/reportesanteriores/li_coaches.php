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
require_once("../../clases/class.Clientes.php");
require_once("../../clases/class.Unidadmedida.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Botones.php");

//Se crean los objetos de clase
$db = new MySQL();
$rpt = new Clientes();
$unidadmedida = new UnidadMedida();
$f = new Funciones();
$bt = new Botones_permisos();

$rpt->db = $db;

//Realizamos consulta

$coaches=$rpt->ObtenerParticipantesCoach(5);
$resultado_num=count($coaches);
				if ($resultado_num==0) { ?>
					
					<option value="0">NO SE ENCONTRARON REGISTROS</option>
					
			<?php	}else{?>

				
						<?php 
						for ($i=0; $i <count($coaches) ; $i++) { 
												
							?>
										<option value="<?php echo $coaches[$i]->idusuarios?>">

											<?php 

											 echo $coaches[$i]->nombre.' '.$coaches[$i]->paterno.' '.$coaches[$i]->materno;?>
											 	
											 </option>
									<?php
										}
									}
				?>