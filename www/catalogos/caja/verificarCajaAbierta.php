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
require_once("../../clases/class.Caja.php");
require_once("../../clases/class.Funciones.php");

require_once("../../clases/class.Fechas.php");



try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$caja = new Caja();
	$f = new Funciones();
	$fechas = new Fechas();

	//enviamos la conexión a las clases que lo requieren
	$caja->db=$db;

		
	$caja->idusuario=$_SESSION['se_sas_Usuario'];
	
	$obtenercaja=$caja->VerificarCajaAbierta();

	if (count($obtenercaja)>0) {
		
		$se->crearSesion('idManejoCaja',$obtenercaja[0]->idmanejocaja);

		$fecha=date('d/m/Y H:i:s',strtotime($obtenercaja[0]->fechainicio));


		$fechaobtener=date('Y-m-d',strtotime($obtenercaja[0]->fechainicio));
		$horaobtener=date('H:i:s',strtotime($obtenercaja[0]->fechainicio));

		$obtenercaja[0]->fechainicio=$fechas->fecha_texto5($fechaobtener). ' '.$horaobtener;

	}


	//Recbimos parametros
	$respuesta['respuesta']=1;
	$respuesta['caja']=$obtenercaja;


	echo json_encode($respuesta);

	
				
	
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>