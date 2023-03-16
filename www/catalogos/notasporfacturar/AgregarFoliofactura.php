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
    $folio=$_POST['folio'];

    $db->begin();

    $notapago->foliofactura=$folio;
   $buscarfolio=$notapago->BuscarFoliofactura();


   if (count($buscarfolio)==0) {
       # code...
   
    $notapago->idnotapago=$idnotapago;
    $notapago->fechafactura=date('Y-m-d H:i:s');
    $notapago->foliofactura=$folio;
    $notapago->ActualizarFoliofactura();


    $md->guardarMovimiento($f->guardar_cadena_utf8('nota de pago'),'nota de pago',$f->guardar_cadena_utf8('Añadió folio factura a nota de pago ID-'.$notapago->idnotapago.' por usuario '.$_SESSION['se_sas_Usuario']));

    $db->commit();
    $res=1;
    
    }else{  
    $res=0;
}

    $respuesta['respuesta']=$res;
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