<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

//Inlcuimos las clases a utilizar
require_once "clases/conexcion.php";

require_once "clases/class.Funciones.php";
/*require_once "clases/class.MovimientoBitacora.php";
*/require_once "clases/class.Usuarios.php";

require_once("clases/class.PagosCoach.php");

require_once("clases/class.Pagos.php");
require_once("clases/class.Descuentos.php");
require_once("clases/class.ServiciosAsignados.php");

require_once("clases/class.ClienteStripe.php");
require_once("clases/class.Tipodepagos.php");
require_once("clases/class.PagConfig.php");
require_once("clases/class.Membresia.php");
require_once("clases/class.Notapago.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Datosfiscales.php");

include 'stripe-php-7.93.0/init.php';
$folio = "";


$pagosconsiderados=json_decode($_POST['pagos']);
$constripe=$_POST['constripe'];
$sumatotalapagar=$_POST['sumatotalapagar'];
$iduser=$_POST['id_user'];
$descuentosaplicados=json_decode($_POST['descuentosaplicados']);
$descuentosmembresia=json_decode($_POST['descuentosmembresia']);
$rutacomprobante=$_POST['rutacomprobante'];
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
$montovisual=$_POST['montovisual'];
$cambiomonto=$_POST['cambiomonto'];
$requierefactura=$_POST['requierefactura'];
$idusuariosdatosfiscales=$_POST['idusuariosdatosfiscales'];

$comisionpornota=$_POST['comisionpornota'];
$comisionnota=$_POST['comisionnota'];
$tipocomisionpornota=$_POST['tipocomisionpornota'];
$idtipodepago=$_POST['idtipodepago'];
if ($montomonedero>0) {
  
  if ($montomonedero==$sumatotalapagar) {
     $idtipodepago=0;
    
  }

}

try {
	 $db = new MySQL();
	 $obj = new ClienteStripe();

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

 

            //$idtipodepago=$_POST['idtipodepago'];
            $tipopago=new Tipodepagos();
            $tipopago->db=$db;
            $tipopago->idtipodepago=$idtipodepago;
           
            $obtenertipopago=$tipopago->ObtenerTipodepago2();


            if ($obtenertipopago[0]->constripe==1) {
              # code...
            
            $skey=$obtenertipopago[0]->claveprivada;
            $pub_key=$obtenertipopago[0]->clavepublica;
            $obj->skey=$skey;

             $cantidadintentos=$obtenerconfiguracion['intentostarjeta'];
            $monto =  $sumatotalapagar*100;  
            $descripcion = "Pago servicio ".$obtenerconfiguracion['nombrenegocio1'].' '.$folio;

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
                $obj->RegistrarIntentoPago();
                $db->commit();

            //////SOLO TEST
            //$idpedido = rand(1,1000);  //SOLOTEST
            //$descripcion = "Pedido ". $idpedido; //SOLOTEST
            //$monto =  rand(2000,20000); // SOLOTEST
            $idclientestripe = ObtenerIdClienteStripe($obj);
            $output=array();
           

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
               // echo $intent->status;

                $obj->idTransaccion = $paymentIntent->id;
                $obj->monto = $monto;
                $obj->digitosTarjeta = $paymentIntent->payment_method;
                $obj->estatus = $intent->status;
                $obj->fechaTransaccion = $paymentIntent->created;   
                
                    
                $db = new MySQL();
                $obj->db = $db; 
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


      

          if ($estatusdeproceso==1) {
          	   $db = new MySQL();
          	   $db->begin();
          	   $pagos=new Pagos();
        			 $pagos->db=$db;
        			 $descuentos=new Descuentos();
        			 $descuentos->db=$db;
               $lo=new ServiciosAsignados();
               $lo->db=$db;
               $membresia= new Membresia();
               $membresia->db=$db;

               $notapago=new Notapago();
               $notapago->db=$db;

               $pagocoach=new PagosCoach();
               $pagocoach->db=$db;
               $servicios=new Servicios();
               $servicios->db=$db;
               $datosfiscales=new Datosfiscales();
               $datosfiscales->db=$db;


         $notapago->idusuario=$iduser;
         $notapago->subtotal=$subtotalsincomision;
         $notapago->iva=0;
         $notapago->total=$sumatotalapagar;
         $notapago->comisiontotal=$comisiontotal;
         $notapago->montomonedero=$montomonedero;
         $notapago->estatus=0;
         $notapago->tipopago=$obtenertipopago[0]->tipo;
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


        
          	for ($i=0; $i < count($pagosconsiderados); $i++) { 
               $pagos->pagado=1;
          		  if ($confoto==1) {
                  $pagos->pagado=0;
                }
                if ($campomonto==1) {
                  $pagos->pagado=0;
                }
               

              
                $pagos->fechapago=date('Y-m-d H:i:s');
                $pagos->idpagostripe=$obj->idintento;
              if ($pagosconsiderados[$i]->tipo==1) {
                  $pagos->estatus=2;
                 $servicios->idservicio= $pagosconsiderados[$i]->idservicio;
                 $datosservicio=$servicios->ObtenerServicio();

                  if ($confoto==1) {
                      $pagos->estatus=1;

                   }

                    if ($campomonto==1) {
                      $pagos->estatus=1;

                   }
                  $pagos->idpago=$pagosconsiderados[$i]->id;

                  
                  $buscarpago=$pagos->ObtenerPago();

                  if ($pagosconsiderados[$i]->idservicio>0) {


                      $idcadena=explode('-', $pagosconsiderados[$i]->id);
                      

                      $pagos->idusuarios=$pagosconsiderados[$i]->usuario;
                   
                      $pagos->idservicio=$pagosconsiderados[$i]->servicio;
                      $pagos->tipo=$pagosconsiderados[$i]->tipo;
                      $pagos->monto=$pagosconsiderados[$i]->monto;
                      $pagos->dividido='';
                      $pagos->fechainicial=$pagosconsiderados[$i]->fechainicial;
                      $pagos->fechafinal=$pagosconsiderados[$i]->fechafinal;
                      $pagos->concepto=$datosservicio[0]->titulo;
                      $pagos->idmembresia=0;
                      $pagos->folio=$folio;
                     // $pagos->CrearRegistroPago();
                    }

                  /*   if (count($descuentosaplicados)>0) {
              
               for ($p=0; $p <count($descuentosaplicados) ; $p++) { 
                    if ($descuentosaplicados[$p]->idpago==$pagosconsiderados[$i]->idpago) {
                        $descuentosaplicados[$p]->idpago=$pagos->idpago;
                        }

                      }
                   }*/


             /* if (count($descuentosmembresia)>0) {
                
                for ($i=0; $i <count($descuentosmembresia) ; $i++) { 
                   if($descuentosmembresia[$i]->idpago==$pagosconsiderados[$i]->idpago){
                    $descuentosmembresia[$i]->idpago=$pagos->idpago;

                   }
                  
                }
              }*/

               
                  $pagos->ActualizarEstatus();
                  $pagos->ActualizarPagado();
             /* $pagos->idpago=$pagosconsiderados[$i]->id;
              $buscarpago=$pagos->ObtenerPago();
              
              $montopago=$buscarpago[0]->monto;
              $lo->idservicio=$buscarpago[0]->idservicio;
             $obtenercorachs=$lo->BuscarAsignacionCoach();
              if (count($obtenercorachs)>0) {
                for ($j=0; $j <count($obtenercorachs) ; $j++) { 

                    $lo->idusuarios_servicios=$obtenercorachs[$j]->idusuarios_servicios;
                    $tipomontopago= $lo->ObtenertipoMontopago();
                    $pagocoach->idusuarios=$obtenercorachs[$j]->idusuarios;
                    $pagocoach->idservicio=$lo->idservicio;
                    $pagocoach->monto=$lo->CalcularMontoPago($tipomontopago[0]->tipopago,$tipomontopago[0]->monto,$montopago);
                    $pagocoach->estatus=0;
                    $pagocoach->pagado=0;
                    $pagocoach->folio=$pagocoach->ObtenerFolioPagoCoach();
                    $pagocoach->concepto=$buscarpago[0]->concepto;
                    $pagocoach->idpago=$buscarpago[0]->idpago;
                 
                  
                }
              }*/

           
            




              }

              if ($pagosconsiderados[$i]->tipo==2) {

                   $pagos->idpago=$pagosconsiderados[$i]->id;
                  $buscarpago=$pagos->ObtenerPago();

                  if (count($buscarpago)==0) {


                      $idcadena=explode('-', $pagosconsiderados[$i]->id);
                       $membresia->idmembresia=$idcadena[1];
                      $obtenermembresia=$membresia->ObtenerMembresia();

                      $pagos->idusuarios=$iduser;
                      $pagos->idmembresia=$idcadena[1];
                      $pagos->idservicio=0;
                      $pagos->tipo=2;
                      $pagos->monto=$pagosconsiderados[$i]->monto;
                      $pagos->estatus=0;
                      $pagos->dividido='';
                      $pagos->fechainicial='';
                      $pagos->fechafinal='';
                      $pagos->concepto=$obtenermembresia[0]->titulo;
                     
                        
                      $pagos->folio=$folio;
                      $pagos->CrearRegistroPago();


               

                  }else{
                      $membresia->idmembresia=$buscarpago[0]->idmembresia;
                      $obtenermembresia=$membresia->ObtenerMembresia();
                  }
                   $pagos->estatus=2;

                   if ($confoto==1) {
                      $pagos->estatus=1;

                   }
                   $pagos->ActualizarEstatus();
                   $pagos->ActualizarPagado();

                   $membresia->idusuarios=$iduser;
                 
                  $buscarmembresiausuario=$membresia->buscarMembresiaUsuario();
                

                   $dias=$obtenermembresia[0]->cantidaddias;
                   $date = date("d-m-Y");
                   $mod_date = strtotime($date."+ ".$dias." days");
                   $membresia->fechaexpiracion= date("Y-m-d",$mod_date).' 23:59:59';

                 
                   $membresia->renovacion=0;
                   if (count($buscarmembresiausuario)>0) {
                      $membresia->idusuarios_membresia= $buscarmembresiausuario[0]->idusuarios_membresia;
               
                      $membresia->estatus=1;
                      $membresia->pagado=1;

                   }else{

                     
                      $membresia->estatus=1;
                      $membresia->pagado=1;

                      $ChecarVencidas=$membresia->ObtenerMembresiasVencidas();

                      if (count($ChecarVencidas)>0) {
                          $membresia->renovacion=1;
                        }

                      $membresia->CrearRegistroMembresiaUsuario();
                   }

                  $membresia->ActualizarEstatusMembresiaUsuarioPagado();

          	   }

                if ($pagosconsiderados[$i]->tipo==3) {

                    $pagos->estatus=2;
                    $pagos->idpago=$pagosconsiderados[$i]->id;
                    $pagos->ActualizarEstatus();
                    $pagos->ActualizarPagado();
                }
               //creacion de descripcion de pago
              $buscarpago=$pagos->ObtenerPago();
              $notapago->descripcion=$buscarpago[0]->concepto;
              $notapago->cantidad=1;
              $notapago->monto=$buscarpago[0]->monto;
              $notapago->idpago=$buscarpago[0]->idpago;
               $notapago->Creardescripcionpago();

               ///creacion pago a coach

               if ($constripe==1) {
             
            	   $pagos->GuardarpagosStripe();

                 }


          		}
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
              $descuentos->idnotapago= $notapago->idnotapago;
               
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
              $notapago->estatus=1;
              $notapago->ActualizarNotapago();




  if ($montomonedero!='' && $montomonedero!=0) {
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
    $sql_movimiento = "INSERT INTO monedero (idusuarios,monto,modalidad,tipo,saldo_ant,saldo_act,concepto) VALUES ('$iduser','$montomonedero','2','$tipo','$saldo_anterior','$nuevo_saldo','$concepto');";
     $db->consulta($sql_movimiento);



   }

    if ($confoto == 1) {

        $nombreimagenes = explode(',', $rutacomprobante);
        $comentariosimagenes = explode(',', $comentariosimagenes);

        for ($i = 0; $i < count($nombreimagenes); $i++) {

            $imagen      = $nombreimagenes[$i];
            $comentario  = $comentariosimagenes[$i];
            $sqlimagenes = "INSERT INTO notapago_comprobante(rutacomprobante,idnotapago,comentario,estatus) VALUES('$imagen',$notapago->idnotapago,'$comentario','0') ";
          
            $db->consulta($sqlimagenes);


        }
               

         $notapago->estatus=0;
         $notapago->ActualizarNotapago();

      
        }
  
         if ($campomonto==1) {
              $notapago->estatus=0;
              $notapago->ActualizarNotapago();
              $notapago->cambio=abs($cambiomonto);
              $notapago->montovisual=$montovisual;
              $notapago->ActualizarMonto();
            
          }
         

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
    
    $db = new MySQL();
    $obj->db = $db; 
    $obj->RegistrarIntentoPagoFallido();
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