<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Pagos.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Notapago.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Pagos();
	$f=new Funciones();
	$fechas=new Fechas();
	$notapago = new Notapago();

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$notapago->db=$db;
	$idusuarios=$_POST['id_user'];
	$lo->idusuarios=$idusuarios;
	$obtener=$lo->ListadoNotaspagospagados();

	$textoestatus=array('Pendiente','Aceptado','Cancelado');

	for ($i=0; $i < count($obtener); $i++) { 
		
		$fecha=$obtener[$i]->fecha;
		$dianumero=explode('-',$fecha);
		$obtener[$i]->fechaformatopago=explode(' ',$dianumero[2])[0].'/'.$fechas->mesesAnho3[$fechas->mesdelano($fecha)-1].' '.$dianumero[0];
			$obtener[$i]->monto=$obtener[$i]->total;
			
			$obtener[$i]->concepto=$obtener[$i]->folio;
			$obtener[$i]->textoestatus=$textoestatus[$obtener[$i]->estatus];


			$$notapago->idnotapago=$obtener[$i]->idnotapago;
			$obtenerdescripcion=$notapago->ObtenerdescripcionNota();
			$total=0;
			for ($j=0; $j <count($obtenerdescripcion) ; $j++) { 

				$total=$total+$obtenerdescripcion[$j]->monto;
			
			}
			$obtener[$i]->total=$total;


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