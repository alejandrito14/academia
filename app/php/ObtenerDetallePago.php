<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

//Inlcuimos las clases a utilizar
require_once "clases/conexcion.php";
require_once "clases/class.Notapago.php";
require_once "clases/class.Funciones.php";
require_once "clases/class.Pagos.php";
require_once "clases/class.Pais.php";
require_once "clases/class.Estado.php";
require_once "clases/class.Municipio.php";
require_once "clases/class.Usocfdi.php";

try
{

    //Declaramos objetos de clases
    $db = new MySQL();
    $lo = new Notapago();
    $f  = new Funciones();
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
    if (count($obtenerpagosstripe)>0) {
        # code...
    
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

       

    if ($resultado[0]->requierefactura==1) {

        $pais->id_pais=$resultado[0]->pais;
        $obtener=$pais->ObtenerDatosPais();

        $paisfact=$obtener;
       
        $estado->id_estado=$resultado[0]->estado;
        $obteneresta=$estado->ObtenerDatosEstado();

        $estadofact=$obteneresta;

        $municipio->idmunicipio=$resultado[0]->municipio;
        $obtenermuni=$municipio->ObtenerDatosMunicipio();
        $municipiofact=$obtenermuni;
        
        $resultado[0]->pais=$paisfact;
        $resultado[0]->estado= $estadofact;
        $resultado[0]->municipio=$municipiofact;

        $usocfdi->cmetodopago=$resultado[0]->metodopago;
        $usocfdi->cformapago=$resultado[0]->formapago;
        $usocfdi->cusocfdi=$resultado[0]->usocfdi;

        
    }else{

        $resultado[0]->municipio="";
        $resultado[0]->estado="";
        $resultado[0]->pais="";
        $resultado[0]->formapavalor="";
        $resultado[0]->metodopagovalor="";
        $resultado[0]->usocfdivalor="";

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