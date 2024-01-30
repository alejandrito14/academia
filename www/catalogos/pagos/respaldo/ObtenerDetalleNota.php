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
require_once ("../../clases/class.Notapago.php");
require_once ("../../clases/class.Funciones.php");
require_once ("../../clases/class.Pagos.php");
require_once ("../../clases/class.Usuarios.php");
require_once ("../../clases/class.Sesion.php");
require_once ("../../clases/class.Pais.php");
require_once ("../../clases/class.Estado.php");
require_once ("../../clases/class.Municipio.php");
require_once ("../../clases/class.Usocfdi.php");


try
{

    //Declaramos objetos de clases
    $db = new MySQL();
    $lo = new Notapago();
    $f  = new Funciones();
    $usuarios=new Usuarios();
    $usuarios->db=$db;
    $sesion=new Sesion();

    $pagos = new Pagos();
    $pagos->db=$db;


    $pais = new Paises();
    $pais->db=$db;

    $estado=new Estado();
    $estado->db=$db;
    $municipio=new Municipio();
    $municipio->db=$db;

    $usocfdi=new Usocfdi();
    $usocfdi->db=$db;

    //Enviamos la conexion a la clase
    $lo->db    = $db;
   
    $idnotapago = $_POST['idnotapago'];
    $rutaimagenes=$_SESSION['carpetaapp'];
  /*  $id_user=$_POST['id_user'];
    $usuarios->id_usuario=$id_user;
    $datosusuario=$usuarios->ObtenerDatosUsuario();*/
    //Recibimos parametros
    $lo->idnotapago=$idnotapago;
    $lo->idusuario=$id_user;
    $pagos->idnotapago=$idnotapago;
    
    $resultado=$lo->Obtenernota();
    $descuentos=array();
    $descuentosmembresia=array();
    if ($resultado[0]->idpagostripe!=0) {

    	 $obtenerpagosstripe=$lo->ObtenerdescripcionNota();

/*
 	    for ($i=0; $i < count($obtenerpagosstripe); $i++) { 
 	    	$pagos->idpago=$obtenerpagosstripe[$i]->idpago;
 	    	$pagosdescuentos=$pagos->ObtenerdescuentosPagos();

 	    $pagos->descuentos=array();
 	    	if (count($pagosdescuentos)>0) {
 	    		$pagos->descuentos=$pagosdescuentos;
 	    	 	    	array_push($descuentos,$pagosdescuentos);

 	    	}


 	    	$pagosdescuentomembresia=$pagos->Obtenerdescuentosmembresia();


 	    	$pagos->descuentosmembresia=array();

 	      if (count($pagosdescuentomembresia)>0) {
 	      		$pagos->descuentosmembresia=$pagosdescuentomembresia;
 	    	array_push($descuentosmembresia, $pagosdescuentomembresia);

 	    	}

 	    }*/
    }
   $obtenerimagenes=array();
    if ($resultado[0]->confoto==1) {
        
        $obtenerpagosstripe=$lo->ObtenerdescripcionNota();
        $obtenerimagenes=$lo->ObtenerImagenesComprobante();




    }

    if ($resultado[0]->confoto==0 && $resultado[0]->idpagostripe==0 ) {
          $obtenerpagosstripe=$lo->ObtenerdescripcionNota();
         /* $sumatotal=0;
          for ($i=0; $i <count($obtenerpagosstripe) ; $i++) { 
              $sumatotal=$sumatotal+$obtenerpagosstripe[$i]->monto;
          }
*/
    }


      for ($i=0; $i < count($obtenerpagosstripe); $i++) { 
        	

        	$pagos->idpago=$obtenerpagosstripe[$i]->idpago;
 	    	$pagosdescuentos=$pagos->ObtenerdescuentosPagos();

 	    	if (count($pagosdescuentos)>0) {
 	    		$pagos->descuentos=$pagosdescuentos;
 	    	 	    	array_push($descuentos,$pagosdescuentos);

                for ($k=0; $k <count($pagosdescuentos) ; $k++) { 
                  array_push($descuentos,$pagosdescuentos[$k]);
                }

 	    	}

 	    	$pagosdescuentomembresia=$pagos->Obtenerdescuentosmembresia();
 

 	    	$pagos->descuentosmembresia=array();

   	      if (count($pagosdescuentomembresia)>0) {
   	      		$pagos->descuentosmembresia=$pagosdescuentomembresia;
   	    

             for ($k=0; $k <count($pagosdescuentomembresia) ; $k++) { 
                array_push($descuentosmembresia, $pagosdescuentomembresia[$k]);

             }

   	    	}
 	    	
        }
       

       if ($resultado[0]->requierefactura==1) {
        $pais->id_pais=$resultado[0]->pais;
        $obtener=$pais->ObtenerDatosPais();

        $paisfact=$obtener[0];
        $resultado[0]->nombrepais=$paisfact;


        $estado->id_estado=$resultado[0]->estado;
        $obteneresta=$estado->ObtenerDatosEstado();

        $estadofact=$obteneresta[0];

         $municipio->idmunicipio=$resultado[0]->municipio;
         $obtenermuni=$municipio->ObtenerDatosMunicipio();
       $municipiofact=$obtenermuni[0];
        
       
       $resultado[0]->nombrestado= $estadofact;
       $resultado[0]->nombremunicipio=$municipiofact;

       $usocfdi->cmetodopago=$resultado[0]->metodopago;
        $usocfdi->cformapago=$resultado[0]->formapago;
       $usocfdi->cusocfdi=$resultado[0]->usocfdi;

       $obteneruso=$usocfdi->ObtenerUso();

       $obtenermetodo=$usocfdi->ObtenerMetodoPago();

       $obtenerforma=$usocfdi->ObtenerFormadepago();

        $resultado[0]->cusocfdi=$obteneruso[0];
        $resultado[0]->cmetodopago=$obtenermetodo[0];

        $resultado[0]->cformapago=$obtenerforma[0];

      $idusuariodatofiscal= $resultado[0]->idusuariodatofiscal;
        $obtenerdatosfiscalimagen=$usocfdi->ObtenerImagenesConstancia($idusuariodatofiscal);
        $resultado[0]->imagenesconstancia= $obtenerdatosfiscalimagen;
       }
    

    $respuesta['respuesta'] = $resultado;
    $respuesta['pagos']=$obtenerpagosstripe;
    $respuesta['descuentos']=$descuentos;
    $respuesta['descuentosmembresia']=$descuentosmembresia;
    $respuesta['imagenescomprobante']=$obtenerimagenes;
    $respuesta['usuario']=$datosusuario;
    $respuesta['rutaimagenes']=$rutaimagenes;

    //Retornamos en formato JSON
    $myJSON = json_encode($respuesta);
    echo $myJSON;

} catch (Exception $e) {
    //$db->rollback();
    //echo "Error. ".$e;

    $array->resultado = "Error: " . $e;
    $array->msg       = "Error al ejecutar el php";
    $array->id        = '0';
    //Retornamos en formato JSON
    $myJSON = json_encode($array);
    echo $myJSON;
}