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

//Inlcuimos las clases a utilizar
require_once ("../../clases/conexcion.php");

require_once ("../../clases/class.Funciones.php");
/*require_once "clases/class.MovimientoBitacora.php";
*/require_once ("../../clases/class.Usuarios.php");

require_once("../../clases/class.PagosCoach.php");

require_once("../../clases/class.Pagos.php");
require_once("../../clases/class.Descuentos.php");
require_once("../../clases/class.ServiciosAsignados.php");

require_once("../../clases/class.ClienteStripe.php");
require_once("../../clases/class.Tipodepagos.php");
require_once("../../clases/class.PagConfig.php");
require_once("../../clases/class.Membresia.php");
require_once("../../clases/class.Notapago.php");

require_once("../../clases/class.Servicios.php");
require_once("../../clases/class.Datosfiscales.php");
require_once("../../clases/class.Invitacion.php");
require_once("../../clases/class.Carrito.php");

require_once("stripe-php-7.93.0/init.php");
$folio = "";
 $f = new Funciones();

$arraypaquetes=json_decode($_POST['arraypaquetes']);
$constripe=$_POST['constripe'];
$sumatotalapagar=$_POST['sumatotalapagar'];
$iduser=$se->obtenerSesion('usuariopago');
$descuentosaplicados=json_decode($_POST['descuentosaplicados']);
$descuentosmembresia=json_decode($_POST['descuentosmembresia']);
$rutacomprobante=json_decode($_POST['rutacomprobante']);
$comentariosimagenes=$_POST['comentariosimagenes'];
$comision=$_POST['comision'];
$comisionmonto=$_POST['comisionmonto'];
$comisiontotal=$_POST['comisiontotal'];
$impuestototal=$_POST['impuestototal'];
$impuesto=$_POST['impuesto'];
$montomonedero=$_POST['monedero']==''?0:$_POST['monedero'];
$datostarjeta=$_POST['datostarjeta'];
$datostarjeta2=$_POST['datostarjeta2'];

$subtotalsincomision=$_POST['subtotalsincomision'];
$confoto=$_POST['confoto'];
$constripe=$_POST['constripe'];
$campomonto=$_POST['campomonto'];
$cambio=$_POST['cambiomonto'];
$montovisual=$_POST['montovisual'];

$cambiomonto=$_POST['cambiomonto'];
$requierefactura=$_POST['requierefactura'];
$idusuariosdatosfiscales=$_POST['idusuariosdatosfiscales'];

$comisionpornota=$_POST['comisionpornota'];
$comisionnota=$_POST['comisionnota'];
$tipocomisionpornota=$_POST['tipocomisionpornota'];
$idtipodepago=$_POST['idtipodepago'];
$variable="";

try {
	 $db = new MySQL();
	 $obj = new ClienteStripe();
     $datosfiscales=new Datosfiscales();
   $datosfiscales->db=$db;
   $notapago=new Notapago();
   $notapago->db=$db;

	 $obj->db=$db;
     $db->begin();
     $f = new Funciones();
   $lo=new ServiciosAsignados();
   $lo->db=$db;
 	 $paginaconfi     = new PagConfig();
     $paginaconfi->db = $db;
     $obtenerconfiguracion=$paginaconfi->ObtenerInformacionConfiguracion();
	 $obj->idusuarios=$iduser;

    $contador=$lo->ActualizarConsecutivo();
    $fecha = explode('-', date('d-m-Y'));
    $anio = substr($fecha[2], 2, 4);
    $folio = $fecha[0].$fecha[1].$anio.$contador;
    
    $tipopago=new Tipodepagos();
     $tipopago->db=$db;


      if ($montomonedero>0) {
  
            if ($montomonedero==$sumatotalapagar) {
               $idtipodepago=0;
               $tipopago->idtipodepago=0;
            }else{
                $tipopago->idtipodepago=0;
                $obtenertipopago=$tipopago->ObtenerTipodepago2();
             $variable=$obtenertipopago[0]->tipo;

          
            }

           
          }



            //$idtipodepago=$_POST['idtipodepago'];
            if ($tipopago->idtipodepago!=$idtipodepago) {
                $tipopago->idtipodepago=$idtipodepago;
           
              $obtenertipopago=$tipopago->ObtenerTipodepago2();

               if ($variable!='') {

                  $variable=','.$variable;
                }
 
             // var_dump($obtenertipopago);die();
            }else{
              $variable=str_replace(',','',$variable);
            }
          

            $constripe=$obtenertipopago[0]->constripe;


         $notapago->idusuario=$iduser;
         $notapago->subtotal=$subtotalsincomision;
         $notapago->iva=0;
         $notapago->total=$sumatotalapagar;
         $notapago->comisiontotal=$comisiontotal;
         $notapago->montomonedero=$montomonedero;
         $notapago->estatus=0;

          if($obtenertipopago[0]->tipo!=$variable) {
           $variable=$obtenertipopago[0]->tipo.$variable;
         }

         $notapago->tipopago=$variable;
         $notapago->idtipopago=$idtipodepago;
         $notapago->confoto=$confoto;
         $notapago->datostarjeta=$datostarjeta;
         $notapago->datostarjeta2=$datostarjeta2;
         $notapago->idpagostripe=0;
         $notapago->folio=$folio;
         $notapago->descuento=0;
         $notapago->descuentomembresia=0;
         $notapago->requierefactura=$requierefactura;

         $notapago->comisionpornota=$comisionpornota;
         $notapago->comisionnota=$comisionnota;
         $notapago->tipocomisionpornota=$tipocomisionpornota;
         $notapago->idusuariodatofiscal=0;
          if ($requierefactura==1) {
            $datosfiscales->idusuariosdatosfiscales=$idusuariosdatosfiscales;
             $datosf=$datosfiscales->Obtenerdatofiscal();

              $notapago->razonsocial=$datosf[0]->razonsocial;
              $notapago->rfc=$datosf[0]->rfc;
              $notapago->direccion=$datosf[0]->direccion;
              $notapago->nointerior=$datosf[0]->nointerior;
              $notapago->noexterior=$datosf[0]->noexterior;
              $notapago->colonia=$datosf[0]->colonia;
              $notapago->municipio=$datosf[0]->municipio;
              $notapago->estado=$datosf[0]->estado;
              $notapago->codigopostal=$datosf[0]->codigopostal;
              $notapago->correo=$datosf[0]->correo;
              $notapago->pais=$datosf[0]->pais;
              $notapago->asentamiento=$datosf[0]->asentamiento;
              $notapago->calle=$datosf[0]->calle;
              $notapago->formapago=$datosf[0]->formapago;
              $notapago->metodopago=$datosf[0]->metodopago;
              $notapago->usocfdi=$datosf[0]->usocfdi;
              $buscarimagenes=$datosfiscales->ObtenerImagenesfiscalAgrupado();
              $imagenesfac="";
              if (count($buscarimagenes)>0){
                $imagenesfac=$buscarimagenes[0]->imagenesconstancia;
              }

              $notapago->imagenconstancia=$imagenesfac;
              $notapago->idusuariodatofiscal=$idusuariosdatosfiscales;
         }

         $notapago->CrearNotapago();


        if ($obtenertipopago[0]->constripe==1) {
              # code...
            
          $skey=$obtenertipopago[0]->claveprivada;
          $pub_key=$obtenertipopago[0]->clavepublica;
          $obj->skey=$skey;

         $cantidadintentos=$obtenerconfiguracion['intentostarjeta'];
         $monto =  $sumatotalapagar*100;  
         $descripcion = "Pago servicio ".$obtenerconfiguracion['nombrenegocio1'].' '.$folio;
        $obj->idNotaRemision=$notapago->idnotapago;

        $obj->idTransaccion = '';
        $obj->monto = $monto;
        $obj->digitosTarjeta ='';
        $obj->estatus = '';
        $obj->fechaTransaccion = ''; 
        $obj->comision=$comision;
				$obj->comisiontotal=$comisiontotal;
				$obj->comisionmonto=$comisionmonto;
				$obj->impuestototal=$impuestototal;
				$obj->subtotalsincomision = $subtotalsincomision;
				$obj->impuesto=$impuesto;
				$obj->total=$sumatotalapagar;
                $obj->RegistrarIntentoPago2();
                $db->commit();

            //////SOLO TEST
            //$idpedido = rand(1,1000);  //SOLOTEST
            //$descripcion = "Pedido ". $idpedido; //SOLOTEST
            //$monto =  rand(2000,20000); // SOLOTEST
            $idclientestripe = ObtenerIdClienteStripe($obj);
            $output=array();
           
            // $db = new MySQL();
               // $obj->db = $db; 
               // $db->begin();

           if ($idclientestripe!='' && $skey!=''){
                 
                 \Stripe\Stripe::setApiKey($skey);

                $payment_methods = \Stripe\PaymentMethod::all([
                    'customer' => $idclientestripe,
                    'type' => 'card'
                  ]);
                    
          
                $db = new MySQL();
                $obj->db = $db; 
                $dbresult=$obj->ObtenerLastCard();
                $a_result=$db->fetch_assoc($dbresult);
                $payment_method_id = $a_result['lastcard_stripe'];
                 $obj->fechaactual=date('Y-m-d');
                 $obj->lastcard=$payment_method_id;
                 $intentos=$obj->ObtenerIntentos();
                 // $db->commit();
          
                 
                 \Stripe\Stripe::setApiKey($skey);

                $payment_methods = \Stripe\PaymentMethod::all([
                    'customer' => $idclientestripe,
                    'type' => 'card'
                  ]);
                    
               

                 if (count($intentos)<$cantidadintentos) {
                     # code...
              

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
             //  var_dump($stripe);die();

                $obj->idTransaccion = $paymentIntent->id;
                $obj->monto = $monto;
                $obj->digitosTarjeta = $paymentIntent->payment_method;
                $obj->estatus = $intent->status;
                $obj->fechaTransaccion = $paymentIntent->created;   
                
                    
                $db = new MySQL();
                $obj->db = $db; 
                $db->begin();
                $obj->ActualizarIntento();
                $db->commit();


                if ($obj->estatus=='succeeded') {
                   
                        $output = [
                        'succeeded' => true,
                        'publicKey' => $pub_key,
                        'clientSecret' => $paymentIntent->client_secret,
                        'paymentIntent' => $paymentIntent->id,
                        'entro' => 1
                    ];
                $estatusdeproceso=1;

              
                }else{

                       $output = [
                        'error' => 1,
                        'publicKey' => $pub_key,
                        'clientSecret' => $paymentIntent->client_secret,
                        'paymentIntent' => $paymentIntent->id
                    ]; 

                    $estatusdeproceso=0;
                }
                

                 }else{

                      $output = [
                        'error' => 1,
                        'publicKey' => $pub_key,
                        'clientSecret' => $paymentIntent->client_secret,
                        'paymentIntent' => 0,
                        'intentos'=>$cantidadintentos,
                    ]; 

                    $estatusdeproceso=0;
              }
          }else{


            $output = [
                        'error' => 1,
                        'publicKey' => $pub_key,
                        'clientSecret' => $paymentIntent->client_secret,
                        'paymentIntent' => 0,
                        'intentos'=>0,
                    ]; 

                    $estatusdeproceso=0;

          }

        }else{
          $estatusdeproceso=1;
        }


    

        
          	  if ($constripe==1) {
                 $db = new MySQL();

                 $notapago->db=$db;
               } 

          	   $db->begin();
          	   $pagos=new Pagos();
        			 $pagos->db=$db;
        			 $descuentos=new Descuentos();
        			 $descuentos->db=$db;
               $lo=new ServiciosAsignados();
               $lo->db=$db;
               $membresia= new Membresia();
               $membresia->db=$db;

                   $invitacion=new Invitacion();
               $invitacion->db=$db;
               $carrito=new Carrito();
               $carrito->db=$db;
               //

             /*  $notapago=new Notapago();
               $notapago->db=$db;
*/
               $pagocoach=new PagosCoach();
               $pagocoach->db=$db;
               $servicios=new Servicios();
               $servicios->db=$db;

    
          	for ($i=0; $i < count($arraypaquetes); $i++) { 


              $notapago->descripcion=$arraypaquetes[$i]->nombrepaquete;
              $notapago->cantidad=$arraypaquetes[$i]->cantidad;
              $notapago->monto=$arraypaquetes[$i]->costototal;
              $notapago->costounitario=$arraypaquetes[$i]->costounitario;
              $notapago->idpaquete=$arraypaquetes[$i]->idpaquete;
              $notapago->monederousado=0;

              $carrito->idcarrito=$arraypaquetes[$i]->idcarrito;
             $obtener= $carrito->ObtenerDelCarrito();

             if (count($obtener)>0) {
              
              $notapago->monederousado=$obtener[0]->monederousado;
             }

             $arraypaquetes[$i]->monederousado=$obtener[0]->monederousado;
               $notapago->CreardescripcionpagoPaquete();
          	
              $arraypaquetes[$i]->idnotapagodescripcion=$notapago->idnotapagodescripcion;
               if ($constripe==1) {
              
            	  

                 }


          		}

             

             
              $carrito->idusuarios=$iduser;
              $carrito->EliminarCarrito();
              $notapago->idpagostripe=0;
              if ($constripe==1) {
               $notapago->idpagostripe=$obj->idintento;
             }
               $notapago->descuento=0;
               $notapago->descuentomembresia=0;

          		if (count($descuentosaplicados)>0) {
          		
          		for ($i=0; $i <count($descuentosaplicados) ; $i++) { 
          				
          		$descuentos->iddescuento=$descuentosaplicados[$i]->iddescuento;
          		$descuentos->montopago=$descuentosaplicados[$i]->montopago;
          		$descuentos->montoadescontar=$descuentosaplicados[$i]->montoadescontar;
          		$descuentos->idpago=$descuentosaplicados[$i]->idpago;
          		$descuentos->tipo=$descuentosaplicados[$i]->tipo;
          		$descuentos->monto=$descuentosaplicados[$i]->monto;
              $descuentos->idnotapago=$notapago->idnotapago;
               
          		$descuentos->GuardarDescuentoPago();
              $notapago->descuento= $notapago->descuento+$descuentosaplicados[$i]->montoadescontar;
          			}

          		}
             
              if (count($descuentosmembresia)>0) {
                
                for ($i=0; $i <count($descuentosmembresia) ; $i++) { 
                  $membresia->idpago=$descuentosmembresia[$i]->idpago;
                  $membresia->idmembresia=$descuentosmembresia[$i]->idmembresia;

                  $membresia->idservicio=$descuentosmembresia[$i]->idservicio;
                  $membresia->descuento=$descuentosmembresia[$i]->descuento;
                  $membresia->monto=$descuentosmembresia[$i]->monto;
                  $membresia->montoadescontar=$descuentosmembresia[$i]->montoadescontar;
                   $membresia->idnotapago=$notapago->idnotapago;
                  $membresia->GuardarPagoDescuentoMembresia();
                  $notapago->descuentomembresia=$notapago->descuentomembresia+$descuentosmembresia[$i]->montoadescontar;
                }
              }
          
          if ($estatusdeproceso==1) {

              $notapago->estatus=1;
              $notapago->ActualizarNotapago();
            }


  if ($estatusdeproceso==1) {
       $usuarios=new Usuarios();
        $usuarios->db=$db;
    if ($montomonedero!='' && $montomonedero!=0) {

      for ($j=0; $j < count($arraypaquetes); $j++) { 

          $monederousado=$arraypaquetes[$j]->monederousado;
          $idnotapagodescripcion=$arraypaquetes[$j]->idnotapagodescripcion;
          if ($monederousado>0) {
            # code...
          
          $usuarios->id_usuario = $iduser;
          $row_cliente = $usuarios->ObtenerUsuario();
          $saldo_anterior = $row_cliente[0]->monedero;
    
    //Calculamos nuevo saldo
    $nuevo_saldo = $saldo_anterior - $monederousado;
    $sql = "UPDATE usuarios SET monedero = '$nuevo_saldo' WHERE idusuarios = '$iduser'";
    
    $db->consulta($sql);
    //Guardamos el movimiento en tabla cliente_monedero
    $tipo=1;
    $concepto="Cargo de ".$arraypaquetes[$j]->concepto;
    $sql_movimiento = "INSERT INTO monedero (idusuarios,monto,modalidad,tipo,saldo_ant,saldo_act,concepto,idnota,idnotadescripcion) VALUES ('$iduser','$monederousado','2','$tipo','$saldo_anterior','$nuevo_saldo','$concepto','$notapago->idnotapago','$idnotapagodescripcion');";

     $db->consulta($sql_movimiento);


              }

            }
          }

 /* if ($montomonedero!='' && $montomonedero!=0) {
            $usuarios=new Usuarios();
            $usuarios->db=$db;
              
    $usuarios->idusuarios = $iduser;
    $row_cliente = $usuarios->ObtenerUsuario();
    $saldo_anterior = $row_cliente[0]->monedero;
    
    //Calculamos nuevo saldo
    $nuevo_saldo = $saldo_anterior - $montomonedero;
    $sql = "UPDATE usuarios SET monedero = '$nuevo_saldo' WHERE idusuarios = '$iduser'";
    
    $db->consulta($sql);
    //Guardamos el movimiento en tabla cliente_monedero
    $tipo=1;
    $concepto="Cargo";
    $sql_movimiento = "INSERT INTO monedero (idusuarios,monto,modalidad,tipo,saldo_ant,saldo_act,concepto,idnota) VALUES ('$iduser','$montomonedero','2','$tipo','$saldo_anterior','$nuevo_saldo','$concepto','$notapago->idnotapago');";

     $db->consulta($sql_movimiento);



   }*/



 }

    if ($confoto == 1) {

        $nombreimagenes = $rutacomprobante;
        $comentariosimagenes = explode(',', $comentariosimagenes);

        for ($i = 0; $i < count($nombreimagenes); $i++) {

            $imagen      = $nombreimagenes[$i]->imagencomprobante;
            $comentario  = $nombreimagenes[$i]->comentario;
            $sqlimagenes = "INSERT INTO notapago_comprobante(rutacomprobante,idnotapago,comentario,estatus) VALUES('$imagen',$notapago->idnotapago,'$comentario','0') ";
          
            $db->consulta($sqlimagenes);


        }


         if ($estatusdeproceso==1) {

         $notapago->estatus=1;
         $notapago->ActualizarNotapago();
       }

      
        }

          if ($campomonto==1) {
              $notapago->estatus=1;
              $notapago->ActualizarNotapago();
              $notapago->cambio=abs($cambio);
              $notapago->montovisual=$montovisual;
              $notapago->ActualizarMonto();
            
          }

          		$db->commit();


            

              if ($constripe==0) {
                 $output = [
                        'succeeded' => 1,
                       
                    ]; 
              }


          if($estatusdeproceso==0){


            $notapago->ActualizarNotaAIncompleto();
            $db->commit();
          }


            

    $respuesta['respuesta']       = 1;
    $respuesta['rutacomprobante'] = $nombreimagenes;
    $respuesta['mensaje']         = "";
    $respuesta['output']=$output;
    $respuesta['idnotapago']=$notapago->idnotapago;

    //Retornamos en formato JSON
    $myJSON = json_encode($respuesta);
    echo $myJSON;
	

	}
catch (\Stripe\Exception\CardException $err) {
    $error_code = $err->getError()->code;
     $estatusdeproceso=0;
    $obj->idTransaccion =  $err->getError()->payment_intent->id;
    $obj->monto =$err->getError()->payment_intent->amount;
    $obj->digitosTarjeta = $err->getError()->payment_method->id;
    $obj->estatus = $error_code;
    $obj->fechaTransaccion = $err->getError()->payment_intent->created;   
    $obj->idNotaRemision=$notapago->idnotapago;

    $db = new MySQL();
    $obj->db = $db; 
    $obj->RegistrarIntentoPagoFallido2();

    $notapago->db=$db;
    $notapago->ActualizarNotaAIncompleto();


            $obj->idTransaccion = $paymentIntent->id;
            $obj->monto = $monto;
            $obj->digitosTarjeta = $paymentIntent->payment_method;
            $obj->estatus = $intent->status;
            $obj->fechaTransaccion = $paymentIntent->created;   
                
            $obj->ActualizarIntento();
            $db->commit();
    if($error_code == 'authentication_required') {
   

       $output = [
                       'error' => 'authentication_required', 
        'card'=> $err->getError()->payment_method->card, 
        'paymentMethod' => $err->getError()->payment_method->id, 
        'publicKey' => $pub_key, 
        'clientSecret' => $err->getError()->payment_intent->client_secret,
        'paymentIntent' => $err->getError()->payment_intent->id
                    ]; 

    $respuesta['respuesta']       = 1;
    $respuesta['mensaje']         = "";
    $respuesta['output']=$output;

    //Retornamos en formato JSON
    $myJSON = json_encode($respuesta);
    echo $myJSON;

    } else if ($error_code && $err->getError()->payment_intent != null) {
        $output = [
                       'error' => $error_code, 
        'card'=> $err->getError()->payment_method->card, 
        'paymentMethod' => $err->getError()->payment_method->id, 
        'publicKey' => $pub_key, 
        'clientSecret' => $err->getError()->payment_intent->client_secret,
        'paymentIntent' => $err->getError()->payment_intent->id
                    ]; 

    $respuesta['respuesta']       = 1;
    $respuesta['mensaje']         = "";
    $respuesta['output']=$output;

    //Retornamos en formato JSON
    $myJSON = json_encode($respuesta);
    echo $myJSON;
    } else {

              $output = [
                       'error' => 1, 
      
                    ]; 
          $array->resultado = "Error: Unknown error occurred";
          $array->output=$output;
          $array->msg = "Error al ejecutar el php";
          $array->id = '0';
          $array->respuesta=1;
              //Retornamos en formato JSON 
          $myJSON = json_encode($array);
          echo $myJSON; 
    }

     

} catch (Exception $e) {
	$db->rollback();
    //echo "Error. ".$e;
     $output = [
                'error' => 1,
                ]; 
     $array->resultado = "Error: Unknown error occurred";
     $array->msg = "Error al ejecutar el php";
     $array->id = '0';
     $array->respuesta=$e;
     $array->output=$output;
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