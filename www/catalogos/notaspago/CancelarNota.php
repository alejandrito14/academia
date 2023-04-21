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

require_once('../../clases/class.MovimientoBitacora.php');
require_once('../../clases/class.Membresia.php');
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

    $membresia=new Membresia();
    $membresia->db=$db;
    $idnotapago = $_POST['idnotapago'];
    $estado=$_POST['estado'];
    $descripcion=$_POST['descripcion'];

    $db->begin();

    $notapago->idnotapago=$idnotapago;
    $notapago->estatus=$estado;
    $notapago->canceladonota=1;
    $notapago->descripcioncancelacion=$descripcion;
    $notapago->idusuariocancelado=$_SESSION['se_sas_Usuario'];
    $fecha=date('Y-m-d H:i:s');
    $notapago->fechacancelacion=$fecha;
    $notapago->CambiarEstatusCancelado();
    
    $obtenerdescripcionnota=$notapago->ObtenerdescripcionNota();
    

      
    $pago->estatus=3;
    $pago->pagado=0;
         
        


         for ($i=0; $i <count($obtenerdescripcionnota) ; $i++) { 
            
            $pago->idpago=$obtenerdescripcionnota[$i]->idpago;
            $notapago->idpago=$pago->idpago;
            $obtenerpago=$pago->BuscarPago2();


            $checarPago=$notapago->BuscarEnNotasPagadas();
        
            if (count($checarPago)==0) {
                $pago->ActualizarPagado();
           
             }
           


            if(count($obtenerpago)>0) {
                # code...
            if($obtenerpago[0]->tipo == 2) {


               $idusuario=$obtenerpago[0]->idusuarios;
               $idmembresia=$obtenerpago[0]->idmembresia;

               $membresia->idusuarios=$idusuario;
               $membresia->idmembresia=$idmembresia;

               $obtenermembresia=$membresia->ObtenerMembresiaUsuarioPorPagar();

               $idusuarios_membresia=$obtenermembresia[0]->idusuarios_membresia;
               $membresia->ActualizarEstatusMembresiaCancelada($idusuarios_membresia);
               ///falta por realizar el cambio a pagado
               }




            }
        }



    $md->guardarMovimiento($f->guardar_cadena_utf8('nota de pago'),'nota de pago cancelada',$f->guardar_cadena_utf8('Cambio de estatus a '.$notapago->estatus.' nota de pago ID-'.$notapago->idnotapago.' por usuario '.$_SESSION['se_sas_Usuario']));

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