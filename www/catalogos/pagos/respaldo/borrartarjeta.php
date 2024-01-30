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

include 'stripe-php-7.93.0/init.php';

/*$skey = 'sk_test_51JNNdFJrU4M0Qnc8BPsFAs0EGQ6XM7mEUukHOKUlxtrqRcy0i22Yvzt3W6NwMyynNXFvRzK0mPJHCqPyxxrXf9X800puHYMoeJ';*/
//Inlcuimos las clases a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.ClienteStripe.php");
require_once("../../clases/class.Tipodepagos.php");

try{
	 $idtipodepago=$_POST['idtipodepago'];
    //$idtipodepago=3;//SOLOTEST
    
	$db = new MySQL();

	//Enviamos la conexion a la clase
	
    $tipopago=new Tipodepagos();
    $tipopago->db=$db;
    $tipopago->idtipodepago=$idtipodepago;
    $obtenertipopago=$tipopago->ObtenerTipodepago2();
    $skey=$obtenertipopago[0]->claveprivada;
    $pub_key=$obtenertipopago[0]->clavepublica;
    $obj->skey=$skey;

$stripe = new \Stripe\StripeClient($obj->skey);
$detach = $stripe->paymentMethods->detach(
  $_POST['id'],
  []
);
echo json_encode($detach);
} catch (Error $e) {
  http_response_code(500);
  echo json_encode(['error' => $e->getMessage()]);
} 
?>