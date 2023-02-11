<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Pagos.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Usuarios.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Pagos();
	$f=new Funciones();
	$fechas=new Fechas();
	$usuarios=new Usuarios();

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$usuarios->db=$db;
	$idusuarios=$_POST['id_user'];
	//$lo->idusuarios=$idusuarios;
	$usuarios->idusuarios=$idusuarios;

	$tutorados=$usuarios->ObtenerTutoradosSincel();
	
	for ($i=0; $i <count($tutorados) ; $i++) { 
		$idusuarios.=','.$tutorados[$i]->idusuarios;
	}

	$lo->idusuarios=$idusuarios;
	$obtener=$lo->ObtenerProximovencer();

	if (count($obtener)>0) {

		$fecha=$obtener[0]->fechafinal;
		$obtener[0]->fechaformato="";
		if ($fecha!='') {
			# code...
		
		$dianumero=explode('-',$fecha);
		$obtener[0]->fechaformato=$dianumero[2].'/'.$fechas->mesesAnho3[$fechas->mesdelano($fecha)-1];

			}
		
		}

	$respuesta['respuesta']=$obtener;
	
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