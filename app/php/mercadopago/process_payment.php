<?php 

// Configura las credenciales de API de Mercado Pago
  try {

  require_once 'vendor/autoload.php';

   //MercadoPagoSDK::setAccessToken("TEST-5596718914645501-040820-a172f29e2150b6e3fdcabca92bdbfae5-264544172");
 //MercadoPagoSDK::setAccessToken("TEST-5596718914645501-040820-a172f29e2150b6e3fdcabca92bdbfae5-264544172");
MercadoPago\SDK::setAccessToken("TEST-5596718914645501-040820-a172f29e2150b6e3fdcabca92bdbfae5-264544172"); 

 $payment = new MercadoPago\Payment();
      $contents = json_decode(file_get_contents('php://input'), true);

$payment->transaction_amount = 100;
$payment->token = $contents['token'];
$payment->installments = $contents['installments'];

$payer = new MercadoPago\Payer();
$payer->email = $contents['payer']['email'];
$payer->identification = array(
    "type" => $contents['payer']['identification']['type'],
    "number" => $contents['payer']['identification']['number']
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
    
    