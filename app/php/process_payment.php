<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

// Configura las credenciales de API de Mercado Pago
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
require_once("clases/class.Invitacion.php");

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
$variable="";
    require_once("mercadopago/vendor/autoload.php");




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

         // echo $tipopago->idtipodepago.'!='.$idtipodepago;die();
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


 if ($obtenertipopago[0]->habilitarmercadopago==1) {
 	  $keyprivadamercado=$obtenertipopago[0]->keyprivadamercado;

   MercadoPago\SDK::setAccessToken($keyprivadamercado); 

 $payment = new MercadoPago\Payment();
  $montotransaccion=$_POST['transaction_amount'];   
  $token=$_POST['token'];
  $valor=1;
  if ($_POST['installments']!=1) {
    $valor=1;
  }
  $installments=$valor;

  $contents=json_decode($_POST['payer']);

$payment->transaction_amount = $montotransaccion;
$payment->token = $token;
$payment->installments = $installments;
$payment->description = "Pago #".$folio;

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

      $estatusdeproceso=0;
     if ($payment->status=='rejected') {
       $estatusdeproceso=0;
     }

     if ($payment->status=='approved') {
      # code...
      $estatusdeproceso=1;

     }


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
               $invitacion=new Invitacion();
               $invitacion->db=$db;
              
               $notapago->db=$db;

             /*  $notapago=new Notapago();
               $notapago->db=$db;
*/
               $pagocoach=new PagosCoach();
               $pagocoach->db=$db;
               $servicios=new Servicios();
               $servicios->db=$db;
               /*$datosfiscales=new Datosfiscales();
               $datosfiscales->db=$db;
               */
        
            for ($i=0; $i < count($pagosconsiderados); $i++) { 

              $monederousado=$pagosconsiderados[$i]->monederousado;
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

                    if ($buscarpago[0]->requiereaceptacion==1) {

                      $lo->idservicio=$buscarpago[0]->idservicio;
                      $lo->idusuario=$buscarpago[0]->idusuarios;
                     $asignacion= $lo->BuscarAsignacionServicio(); 

                     $lo->idusuarios_servicios=$asignacion[0]->idusuarios_servicios;
                     $lo->GuardarAceptacion();

                     $obtenerservicioasignado=$lo->ObtenerServicioAsignado();

                      $idservicio=$obtenerservicioasignado[0]->idservicio;
                      $idusuarios=$obtenerservicioasignado[0]->idusuarios;
                      $invitacion->idservicio=$idservicio;
                      $invitacion->idusuarioinvitado=$idusuarios;
                      $invitacion->ActualizarInvitacion();



                    }

               if ($estatusdeproceso==1) {
                  $pagos->ActualizarEstatus();
                  $pagos->ActualizarPagado();


                }
          
           
            




              }

              if ($pagosconsiderados[$i]->tipo==2) { 

                   $pagos->idpago=$pagosconsiderados[$i]->id;
                  $buscarpago=$pagos->ObtenerPago();
                  $membresia->idpago=$pagos->idpago;
                   $membresia->idusuarios=$iduser;
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
                      $membresia->idpago=$buscarpago[0]->idpago;
                      $obtenermembresia=$membresia->ObtenerMembresia();

                   $membresia->idusuarios=$buscarpago[0]->idusuarios;

                  }
                   $pagos->estatus=2;

                   if ($confoto==1) {
                      $pagos->estatus=1;

                   }

                  if ($estatusdeproceso==1) {

                   $pagos->ActualizarEstatus();
                   $pagos->ActualizarPagado();
                 }
                 
                  $buscarmembresiausuario=$membresia->buscarMembresiaUsuario2();
                

                   $dias=$obtenermembresia[0]->cantidaddias;
                   $date = date("d-m-Y");
                   $mod_date = strtotime($date."+ ".$dias." days");
                   $membresia->fechaexpiracion='';

                 
                   $membresia->renovacion=0;
                   if (count($buscarmembresiausuario)>0) {
                      $membresia->idusuarios_membresia= $buscarmembresiausuario[0]->idusuarios_membresia;
               

                  if($buscarmembresiausuario[0]->estatus!=2) {
                    $membresia->estatus=1;
                      }else{
                     $membresia->estatus=2;
                   }
                      
                      $membresia->pagado=1;

                   }else{

                     
                      $membresia->estatus=1;
                      $membresia->pagado=1;

                      $ChecarVencidas=$membresia->ObtenerMembresiasVencidas();

                      if (count($ChecarVencidas)>0) {
                          $membresia->renovacion=1;
                        }

                     // $membresia->CrearRegistroMembresiaUsuario();
                   }

                   if ($campomonto==1) {
                     $membresia->pagado=0;
                    }

              if ($estatusdeproceso==1) {

 
                  $membresia->ActualizarEstatusMembresiaUsuarioPagado2();

                }

               }

                if ($pagosconsiderados[$i]->tipo==3) {

                    $pagos->estatus=2;
                    $pagos->idpago=$pagosconsiderados[$i]->id;

                  if ($estatusdeproceso==1) {

                    $pagos->ActualizarEstatus();
                    $pagos->ActualizarPagado();

                  }
                }
               //creacion de descripcion de pago
              $buscarpago=$pagos->ObtenerPago();
              $notapago->descripcion=$buscarpago[0]->concepto;
              $notapago->cantidad=1;
              $notapago->monto=$buscarpago[0]->monto;
              $notapago->idpago=$buscarpago[0]->idpago;
              $notapago->monederousado=$monederousado;
               $notapago->Creardescripcionpago();


               $pagosconsiderados[$i]->idnotapagodescripcion=$notapago->idnotapagodescripcion;

 
               ///creacion pago a coach
             if ($estatusdeproceso==1) {

               if ($constripe==1) {
             
                 $pagos->GuardarpagosStripe();

                 }

               }


              }
              $notapago->fechareporte=date('Y-m-d H:i:s');
              $notapago->idpagostripe=0;
          if ($estatusdeproceso==1) {

              if ($constripe==1) {
               $notapago->idpagostripe=$obj->idintento;
               
             }

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

    


      if ($estatusdeproceso==1) {

              $notapago->estatus=1;
              $notapago->ActualizarNotapago();

              $notapago->idmercadopago=$payment->id;
              $notapago->estatusmercadopago=$payment->status;
             $notapago->ActualizarIdMercado();
               $output = [
                        'succeeded' => 1,
                       
                    ]; 

            }



  if ($estatusdeproceso==1) {
       $usuarios=new Usuarios();
        $usuarios->db=$db;
    if ($montomonedero!='' && $montomonedero!=0) {

      for ($j=0; $j < count($pagosconsiderados); $j++) { 

              $monederousado=$pagosconsiderados[$j]->monederousado;
              $idnotapagodescripcion=$pagosconsiderados[$j]->idnotapagodescripcion;
  
          $usuarios->idusuarios = $iduser;
          $row_cliente = $usuarios->ObtenerUsuario();
          $saldo_anterior = $row_cliente[0]->monedero;
    
    //Calculamos nuevo saldo
    $nuevo_saldo = $saldo_anterior - $monederousado;
    $sql = "UPDATE usuarios SET monedero = '$nuevo_saldo' WHERE idusuarios = '$iduser'";
    
    $db->consulta($sql);
    //Guardamos el movimiento en tabla cliente_monedero
    $tipo=1;
    $concepto="Cargo de ".$pagosconsiderados[$j]->concepto;
    $sql_movimiento = "INSERT INTO monedero (idusuarios,monto,modalidad,tipo,saldo_ant,saldo_act,concepto,idnota,idnotadescripcion) VALUES ('$iduser','$monederousado','2','$tipo','$saldo_anterior','$nuevo_saldo','$concepto','$notapago->idnotapago','$idnotapagodescripcion');";

     $db->consulta($sql_movimiento);

//3ote entre 16 y 17 sur 10:00 



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



          if($estatusdeproceso==0){


            $notapago->ActualizarNotaAIncompleto();
            $db->commit();
          }



     

    }

    $respuesta['respuesta']       = $estatusdeproceso;
    $respuesta['rutacomprobante'] = $nombreimagenes;
    $respuesta['mensaje']         = "";
    $respuesta['output']=$output;
    $respuesta['idnotapago']=$notapago->idnotapago;
    $respuesta['payment']=$payment;
    //Retornamos en formato JSON
   // $myJSON = json_encode($respuesta);
   // echo $myJSON;


     echo json_encode($respuesta);

    }catch(Exception $e){

      echo $e->getMessage();
    }
    ?>
