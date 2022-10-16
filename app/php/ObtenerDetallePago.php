<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

//Inlcuimos las clases a utilizar
require_once "clases/conexcion.php";
require_once "clases/class.Notapago.php";
require_once "clases/class.Funciones.php";
require_once "clases/class.Pagos.php";


try
{

    //Declaramos objetos de clases
    $db = new MySQL();
    $lo = new Notapago();
    $f  = new Funciones();
    $pagos = new Pagos();
    $pagos->db=$db;
    //Enviamos la conexion a la clase
    $lo->db    = $db;
   
    $idnotapago = $_POST['idnotapago'];
    $id_user=$_POST['id_user'];
    //Recibimos parametros
    $lo->idnotapago=$idnotapago;
    $lo->idusuario=$id_user;

    $resultado=$lo->Obtenernota();
    $descuentos=array();
    $descuentosmembresia=array();
    if ($resultado[0]->idpagostripe!=0) {

    	$idpagostripe=$resultado[0]->idpagostripe;
    	$lo->idpagostripe=$idpagostripe;
 	    $obtenerpagosstripe=$lo->ObtenerPagosStripe();


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

 	    }
    }
   
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
    

    $respuesta['respuesta'] = $resultado;
    $respuesta['pagos']=$obtenerpagosstripe;
    $respuesta['descuentos']=$descuentos;
    $respuesta['descuentosmembresia']=$descuentosmembresia;
    $respuesta['imagenescomprobante']=$obtenerimagenes;

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