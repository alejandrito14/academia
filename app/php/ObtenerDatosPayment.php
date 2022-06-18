<?php 
use Stripe\PaymentMethod;

header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

include 'stripe-php-7.93.0/init.php';
//pk_test_51Gsee5HfhZt076luqmLv27N1v6tKYOkscemmGjdWjVr3tH0KF3UF5ME9dp0TnuvP6FD72xiDlyC5mdWU9CAAIEX700z5FodQAZ

//$skey="sk_test_51Gsee5HfhZt076luMSTImP5xJonHnnEI5FNllfeucsoQJpKovHPsQckBhd1nav8AyuqbCZarJb3doHfXph8SAlqV004L2o7T9B";
$skey="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";
try {

	 
//obtener cargo
	/* $stripe = new \Stripe\StripeClient($skey);
	$cargo=$stripe->charges->retrieve(
  'ch_3JpkU1AVjBLtALb22Ssx0SVM');
*/

//intento

$stripe = new \Stripe\StripeClient($skey);
$intent =$stripe->paymentIntents->retrieve(
  'pi_3KXHO7AVjBLtALb22M8JQMvZ',
  []
);
echo $intent;

  // $stripe = new \Stripe\StripeClient($skey);
	/*$intent=$stripe->charges->retrieve(
	  'pi_3KKnzhHfhZt076lu1A0HHqMk',
	); */
	
}catch(Exception $e){


    echo $e;
	
}
 

   //$intent = \Stripe\PaymentIntent::retrieve('pm_1KKnzVHfhZt076luTGINpFBD');
//$charges = $intent->charges->data;

 ?>