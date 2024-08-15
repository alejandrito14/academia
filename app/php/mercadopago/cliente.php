<?php 

require_once 'vendor/autoload.php';

use MercadoPago\Customer;
try {



// Credenciales de Mercado Pago
    $access_token = 'TEST-5596718914645501-040820-a172f29e2150b6e3fdcabca92bdbfae5-264544172'; // 




// Configura las credenciales de Mercado Pago
MercadoPago\SDK::setAccessToken($access_token); // Reemplaza 'TU_ACCESS_TOKEN' con tu access token real

// Crea un objeto Customer
$customer = new Customer();
$customer->email = "ejemplo@cliente.com";

// Guarda el cliente en Mercado Pago
try {
    $customer->save();
    echo "ID del cliente creado: " . $customer->id;
} catch (Exception $e) {
    echo 'Error al crear el cliente: ',  $e->getMessage(), "\n";
}
 


 ?>