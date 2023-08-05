<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Pagos.php");
require_once("clases/class.Usuarios.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Pagos();
	$usua=new Usuarios();
	$usua->db=$db;
	$lo->db=$db;
	$lo->idusuarios=$_POST['id_user'];
	$usua->idusuarios=$_POST['id_user'];
	$pagoselegidos=json_decode($_POST['pagos']);
	$obtenerusuario=$usua->ObtenerUsuario();
	$monedero=$obtenerusuario[0]->monedero;
	$idpagoelegido=$_POST['idpago'];



	$contarpagos=0;

	$totalmontousado=0;
	for ($j=0; $j <count($pagoselegidos); $j++) { 
		$idpago=$pagoselegidos[$j]->{'id'};
		$lo->idpago=$idpago;

		$buscar=$lo->ObtenerPago();
		
		$montousado=$pagoselegidos[$j]->{'monederousado'};
		
		$totalmontousado=$totalmontousado+$montousado;



		}
	
	$monedero=$monedero-$totalmontousado;

	$lo->idpago=$idpagoelegido;
	$buscar=$lo->ObtenerPago();

	$montopago=$buscar[0]->monto;
	$alcanza=0;
	if ($monedero>=$montopago) {
		$alcanza=1;
	}


	$db->commit();

	$respuesta['respuesta']=1;
	$respuesta['monedero']=$monedero;
	$respuesta['montopago']=$montopago;
	$respuesta['alcanza']=$alcanza;
	$respuesta['montousado']=$totalmontousado;
	
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