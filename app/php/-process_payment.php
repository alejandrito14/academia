<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

// Configura las credenciales de API de Mercado Pago
  try {

    require_once("mercadopago/vendor/autoload.php");

 	
   MercadoPago\SDK::setAccessToken("TEST-5596718914645501-040820-a172f29e2150b6e3fdcabca92bdbfae5-264544172"); 

 $payment = new MercadoPago\Payment();
  $montotransaccion=$_POST['transaction_amount'];   
  $token=$_POST['token'];
  $installments=$_POST['installments'];

  $contents=json_decode($_POST['payer']);

$payment->transaction_amount = $montotransaccion;
$payment->token = $token;
$payment->installments = $installments;

$payer = new MercadoPago\Payer();
$payer->email = $contents->email; 
 $payer->identification = array(
        "type" => $contents->identification->type,
        "number" => $contents->identification->number
      );

$payment->payer = $payer;

$payment->save();
$response = array(
    'status' => $payment->status,
    'status_detail' => $payment->status_detail,
    'id' => $payment->id
);

      echo json_encode($response);

    }catch(Exception $e){

      echo $e->getMessage();
    }
    ?>
