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
require_once("../../clases/class.Pagos.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Fechas.php");
require_once("../../clases/class.Usuarios.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Pagos();
	$f=new Funciones();
	$fechas=new Fechas();
	$usuarios=new Usuarios();
	$usuarios->db=$db;

	//Enviamos la conexion a la clase
	$lo->db = $db;

	$idusuarios=$_POST['idcliente'];

	$se->crearSesion('usuariopago',$idusuarios);
	$lo->idusuarios=$idusuarios;
	$usuarios->id_usuario=$idusuarios;

	$datosusuario=$usuarios->ObtenerDatosUsuario();

	$tutorados=$usuarios->ObtenerTutoradosSincel();
	
	for ($i=0; $i <count($tutorados) ; $i++) { 
		$idusuarios.=','.$tutorados[$i]->idusuarios;
	}


	$lo->idusuarios=$idusuarios;


	$obtener=$lo->ListadopagosNopagados();

	for ($i=0; $i < count($obtener); $i++) { 
		
		$fecha=$obtener[$i]->fechafinal;

		if ($fecha!='') {
			# code...
		
		$dianumero=explode('-',$fecha);
		$obtener[$i]->fechaformato=$dianumero[2].'/'.$fechas->mesesAnho3[$fechas->mesdelano($fecha)-1];
		$fecha=date('d-m-Y',strtotime($obtener[$i]->fechafinal));
		$obtener[$i]->fechafinal=$fecha;

			}
		}


	$respuesta['respuesta']=$obtener;
	$respuesta['monedero']=$datosusuario['monedero'];
	
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