<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Comentarios.php");
require_once("clases/class.PagosCoach.php");
require_once("clases/class.Tipodepagos.php");
require_once("clases/class.Pagos.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new PagosCoach();
	$pagos = new Pagos();

	$f=new Funciones();
	$db->begin();

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$pagos->db = $db;

	$idservicio=$_POST['idservicio'];
	$lo->idusuarios=$_POST['idcoach'];
	$lo->idservicio=$_POST['idservicio'];
	$iduser=$_POST['iduser'];

	$pagos->idpago=$_POST['idpago'];
	$buscarpago=$pagos->ObtenerPago();

	 $idtipodepago=$_POST['txttipopago'];
     $tipopago=new Tipodepagos();
     $tipopago->db=$db;
     $tipopago->idtipodepago=$idtipodepago;
     $obtenertipopago=$tipopago->ObtenerTipodepago2();

     $lo->monto=$_POST['monto'];
     $lo->estatus=1;
     $lo->pagado=1;
     $lo->folio=$lo->ObtenerFolioPagoCoach();
     $lo->concepto=$buscarpago[0]->concepto;
     $lo->idpago=$buscarpago[0]->idpago;
     $lo->idtipopago=$idtipodepago;
     $lo->tipopago=$obtenertipopago[0]->tipo;
     $lo->idusuariocreado=$iduser;
     $lo->fechapago=date('Y-m-d H:i:s');
     $lo->descripcionpago=$_POST['txtdescripcionpago'];
     $lo->GuardarPagoCoach();

	 $db->commit();

	$respuesta['respuesta']=1;

	//Retornamos en formato JSON 
	$myJSON = json_encode($respuesta);
	echo $myJSON;

}catch(Exception $e){
	$db->rollback();
	//echo "Error. ".$e;
	
	$array->resultado = "Error: ".$e;
	$array->msg = "Error al ejecutar el php";
	$array->id = '0';
		//Retornamos en formato JSON 
	$myJSON = json_encode($array);
	echo $myJSON;
}
?>