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
require_once("../../clases/class.Pagos.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Fechas.php");

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$pagos = new Pagos();
	$f = new Funciones();
	$fechas = new Fechas();
	$se = new Sesion();
	//enviamos la conexión a las clases que lo requieren
	$pagos->db=$db;
	$md->db = $db;	
	$pagos->idusuarios=$_POST['idusuario'];
	$obtener=$pagos->ListadopagosNopagados();
	$se->crearSesion('usuariopago',$pagos->idusuarios);
	

	for ($i=0; $i < count($obtener); $i++) { 
		
		$fecha=$obtener[$i]->fechafinal;
		$obtener[$i]->fechaformato='';
		if ($fecha!='') {
			# code...
		
		$dianumero=explode('-',$fecha);
		$obtener[$i]->fechaformato=$dianumero[2].'/'.$fechas->mesesAnho3[$fechas->mesdelano($fecha)-1];


			$fecha=date('d-m-Y',$obtener[$i]->fechafinal);
			$obtener[$i]->fechafinal=$fecha;
			}



		}

	$respuesta['pagos']=$obtener;
	echo json_encode($respuesta);
		

	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>