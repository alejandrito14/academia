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
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Pagos.php");
require_once("../../clases/class.Notapago.php");

require_once("../../clases/class.Notapago.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{

    //Declaramos objetos de clases
    $db = new MySQL();
    $f=new Funciones();
    $notapago = new Notapago();
    $pago=new Pagos();
    $md = new MovimientoBitacora();
    $md->db = $db;  
    $pago->db=$db;
    $notapago->db=$db;
    $idnotapago = $_POST['idnotapago'];
    $estado=$_POST['estado'];

    $db->begin();

    $notapago->idnotapago=$idnotapago;
    $notapago->estatus=$estado;
    $notapago->CambiarEstatus();

    $obtenerdescripcionnota=$notapago->ObtenerdescripcionNota();
    if ($notapago->estatus==1) {

            $pago->estatus=2;
            $pago->pagado=1;

         }

        if ($notapago->estatus==0) {
            $pago->estatus=0;
            $pago->pagado=0;
         
        }


         for ($i=0; $i <count($obtenerdescripcionnota) ; $i++) { 
            
            $pago->idpago=$obtenerdescripcionnota[$i]->idpago;
        
            $pago->ActualizarPagado();
        }



    $md->guardarMovimiento($f->guardar_cadena_utf8('nota de pago'),'nota de pago',$f->guardar_cadena_utf8('Cambio de estatus nota de pago ID-'.$pago->idpago.' por usuario '.$_SESSION['se_sas_Usuario']));

    $db->commit();

    $respuesta['respuesta']=1;
    echo json_encode($respuesta);

    

} catch (Exception $e) {
    $db->rollback();
    //echo "Error. ".$e;

    $array->resultado = "Error: " . $e;
    $array->msg       = "Error al ejecutar el php";
    $array->id        = '0';
    //Retornamos en formato JSON
    $myJSON = json_encode($array);
    echo $myJSON;
}
?>