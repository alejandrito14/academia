<?php
/*======================= INICIA VALIDACIÓN DE SESIÓN =========================*/
use Stripe\PaymentMethod;

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
require_once("../../clases/class.ClienteStripe.php");
require_once("../../clases/class.Tipodepagos.php");
//require_once("clases/class.NotaRemision.php");

include 'stripe-php-7.93.0/init.php';
$obj = new ClienteStripe();

$folio = "";
//$skey = 'sk_test_51JNNdFJrU4M0Qnc8BPsFAs0EGQ6XM7mEUukHOKUlxtrqRcy0i22Yvzt3W6NwMyynNXFvRzK0mPJHCqPyxxrXf9X800puHYMoeJ';
//$pub_key = "pk_test_51JNNdFJrU4M0Qnc879SI1I0o7BIpTnoMgioMaKYGDbOjTLCcfl8Rx8TLTlqPbBEifMXrRGqREEOBjCXY6RQo83Uw00M5z8GOPe";

try
{
	//Declaramos objetos de clases
	$db = new MySQL();

	//Enviamos la conexion a la clase
	$obj->db = $db;
	$obj->idusuarios=$_SESSION['usuariopago'];

    $fname = $_POST['fname'];

    $idtipodepago=$_POST['idtipodepago'];
    //$idtipodepago=3;//SOLOTEST
    

    $tipopago=new Tipodepagos();
    $tipopago->db=$db;
    $tipopago->idtipodepago=$idtipodepago;
    $obtenertipopago=$tipopago->ObtenerTipodepago2();
    $skey=$obtenertipopago[0]->claveprivada;
    $pub_key=$obtenertipopago[0]->clavepublica;
    $obj->skey=$skey;


    switch ($fname) {
        case 'getCustomerId':
            $resultado=$obj->ObtenerID();
	        $a_resultado=$db->fetch_assoc($resultado);  
            //Retornamos en formato JSON 
	        $myJSON = json_encode($a_resultado);
	        echo $myJSON;
        break;
        case 'getLastCard':
            $dbresult=$obj->ObtenerLastCard();
	        $a_result=$db->fetch_assoc($dbresult); 
            $myJSON = json_encode($a_result); 
            echo $myJSON; 
        break;
        case 'getClientName':
            $dbresult = $obj->ObtenerDatosCliente();
            $a_result=$obj->db->fetch_assoc($dbresult);
            $myJSON = json_encode($a_result); 
            echo $myJSON; 
        break;
        case 'setCustomerId':
            $obj->customerid=$_POST['customerid'];
            $resultado=$obj->ActualizarId();
            $r_num = $db->num_rows($resultado);
            $output = [
                'update' => $r_num  ,
              ];
	                 
        break;
        case 'setLastCard':       
            $obj->lastcard=$_POST['lastcard'];
            $obj->ActualizarLastCard();
            $output = [
                'update' => 1  ,
              ];
            echo json_encode($output);
        break;
        case 'getCardList':
            \Stripe\Stripe::setApiKey($skey);
            $idclientestripe = ObtenerIdClienteStripe($obj); 
           
            if ($idclientestripe != null) {
                $pmethods = \Stripe\PaymentMethod::all([
                    'customer' => $idclientestripe,
                    'type' => 'card',
                ]);
                echo json_encode($pmethods->data);
            }
            else{
                echo json_encode(array(), JSON_FORCE_OBJECT);
            }            
        break;

         case 'llavepublica':       
            
            $output = [
                'llavepublica' => $pub_key,
              ];
            echo json_encode($output);
        break;

        case 'setupIntent':
            \Stripe\Stripe::setApiKey($skey);
            $idclientestripe = ObtenerIdClienteStripe($obj);
            
            $setupIntent = \Stripe\SetupIntent::create([
                'customer' => $idclientestripe, 
                'usage'=> 'off_session'
            ]);

            $output = json_encode($setupIntent);
            echo $output;
        break;
        case 'paymentIntent':
            \Stripe\Stripe::setApiKey($skey);

            $idpedido=$_POST['idpedido'];
            
            $nota=new NotaRemision();
            $nota->db=$db;
            $nota->idnota_remision=$idpedido;
            $obtenerdetalle=$nota->ObtenerdetalleNota();
            $rownota=$db->fetch_assoc($obtenerdetalle);

           /* if ($rownota['nuevototal']!=0 && $rownota['nuevototal']!=null ) {
                $rownota['total']=$rownota['nuevototal'];
            }


           if ($rownota['datoscosto']!='') {

                $costo=$rownota['datoscosto'];
                $dividircosto=explode('|',$costo);
                $costofinal=$dividircosto[3];

              $rownota['total']=$rownota['total']+$costofinal;
            } 

             if ($rownota['ivacompra']!='') {
              $ivacompra=$rownota['ivacompra'];
              $rownota['total']=$rownota['total']+$ivacompra;
            } */
             
            $monto =  $rownota['sumatotalapagar']*100;  
            $descripcion = "Pedido ". $rownota['folio'];
            $folio = $rownota['folio'];
            //////SOLO TEST
            //$idpedido = rand(1,1000);  //SOLOTEST
            //$descripcion = "Pedido ". $idpedido; //SOLOTEST
            //$monto =  rand(2000,20000); // SOLOTEST
            $idclientestripe = ObtenerIdClienteStripe($obj);

            if (isset($idclientestripe)){
                $payment_methods = \Stripe\PaymentMethod::all([
                    'customer' => $idclientestripe,
                    'type' => 'card'
                  ]);
                     
                $db = new MySQL();
                $obj->db = $db; 
            
                $dbresult=$obj->ObtenerLastCard();
	            $a_result=$db->fetch_assoc($dbresult);
                $payment_method_id = $a_result['lastcard_stripe'];

                $paymentIntent = \Stripe\PaymentIntent::create([
                    'amount' => $monto,
                    'currency' => 'mxn',
                    'payment_method' => $payment_method_id,
                    'description' => $descripcion,
                    'customer' => $idclientestripe,
                    'confirm' => true,
                    'off_session' => true
                  ]); 


                 $stripe = new \Stripe\StripeClient($skey);
                $intent =$stripe->paymentIntents->retrieve(
                  $paymentIntent->id,
                  []
                );


                $obj->idTransaccion = $paymentIntent->id;
                $obj->idNotaRemision = $folio;
                $obj->monto = $monto;
                $obj->digitosTarjeta = $paymentIntent->payment_method;
                $obj->estatus = $intent->status;
                $obj->fechaTransaccion = $paymentIntent->created;   
                
                    
                $db = new MySQL();
                $obj->db = $db; 
                $obj->RegistrarIntentoPago();

                
             if ($intent->status=='succeeded') {
                   
                        $output = [
                        'succeeded' => true,
                        'publicKey' => $pub_key,
                        'clientSecret' => $paymentIntent->client_secret,
                        'paymentIntent' => $paymentIntent->id,
                        'entro' => 1
                    ];
                //$estatusdeproceso=1;
                }else{

                       $output = [
                        'error' => 1,
                        'publicKey' => $pub_key,
                        'clientSecret' => $paymentIntent->client_secret,
                        'paymentIntent' => $paymentIntent->id
                    ]; 

                   // $estatusdeproceso=0;
                }

               

                echo json_encode($output);
              }
        break;
        default:
            $array->resultado = "Error: ".$e;
            $array->msg = "Error al ejecutar el php";
            $array->id = '0';
            //Retornamos en formato JSON 
            $myJSON = json_encode($array);
            echo $myJSON;
      }


}
catch (\Stripe\Exception\CardException $err) {
    $error_code = $err->getError()->code;
    
    $obj->idTransaccion =  $err->getError()->payment_intent->id;
    $obj->idNotaRemision = $folio;
    $obj->monto =$err->getError()->payment_intent->amount;
    $obj->digitosTarjeta = $err->getError()->payment_method->id;
    $obj->estatus = $error_code;
    $obj->fechaTransaccion = $err->getError()->payment_intent->created;   
    
    $db = new MySQL();
    $obj->db = $db; 
    $obj->RegistrarIntentoPago();

    if($error_code == 'authentication_required') {
      echo json_encode(array(
        'error' => 'authentication_required', 
        'card'=> $err->getError()->payment_method->card, 
        'paymentMethod' => $err->getError()->payment_method->id, 
        'publicKey' => $pub_key, 
        'clientSecret' => $err->getError()->payment_intent->client_secret,
        'paymentIntent' => $err->getError()->payment_intent->id
      ));

    } else if ($error_code && $err->getError()->payment_intent != null) {
      echo json_encode(array(
        'error' => $error_code , 
        'publicKey' => $pub_key, 
        'clientSecret' => $err->getError()->payment_intent->client_secret,
        'paymentIntent' => $err->getError()->payment_intent->id
      ));
    } else {
          $array->resultado = "Error: Unknown error occurred";
          $array->msg = "Error al ejecutar el php";
          $array->id = '0';
              //Retornamos en formato JSON 
          $myJSON = json_encode($array);
          echo $myJSON; 
    }
} 
catch(Exception $e){
	$array->resultado = "Error: ".$e;
	$array->msg = "Error al ejecutar el php";
	$array->id = '0';
		//Retornamos en formato JSON 
	$myJSON = json_encode($array);
	echo $myJSON;
}

function ObtenerIdClienteStripe($obj)
{
    $dbresult = $obj->ObtenerIDCustomer();
    $a_result=$obj->db->fetch_assoc($dbresult);
    $row_resultado=$obj->db->num_rows($dbresult);
    $idclientestripe='';
    if ($row_resultado>0) {
          $idclientestripe = $a_result['customerid_stripe']; 

    }
    if($idclientestripe == '')
    {
        $dbresult = $obj->ObtenerDatosCliente();
        $a_result=$obj->db->fetch_assoc($dbresult);
        $nombrecliente = $a_result['nombre'] . " " . $a_result['paterno'];
        $customer = \Stripe\Customer::create([
            //'payment_method' => 'pm_card_chargeCustomerFail', //SOLOTEST
            //'payment_method' => 'pm_card_authenticationRequired', //SOLOTEST
            //'payment_method' => 'pm_card_authenticationRequiredSetupForOffSession', //Sucess SOLOTEST
            'email' => $a_result['email'], //asignar email
            'name' =>  $nombrecliente //asignar nombre
        ]);

        $obj->customerid=$customer->id;
        $obj->GuardarIdCustomer();
        $idclientestripe = $customer->id;
    } 
    return $idclientestripe;
}
?>