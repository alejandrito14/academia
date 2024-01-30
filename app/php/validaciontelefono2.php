<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

//Inlcuimos las clases a utilizar
require_once "clases/conexcion.php";
require_once "clases/class.Usuarios.php";
//require_once("clases/class.Token.php");
require_once "clases/class.Funciones.php";
/*require_once("clases/class.MovimientoBitacora.php");
 *//*require_once("clases/class.Sms.php");
require_once("clases/class.phpmailer.php");
require_once("clases/emails/class.Emails.php");*/
require_once "clases/class.AltiriaSMS.php";

require_once "clases/class.WhatsapMensaje.php";

try
{

    //Declaramos objetos de clases
    $db = new MySQL();
    $lo = new Usuarios();
    $f  = new Funciones();
    $mensaje=new WhatsapMensaje();
    $mensaje->db=$db;
    //Enviamos la conexion a la clase
    $lo->db = $db;

    /*$idusuarios=$_POST['idusuarios'];
    $email = $_POST['usuario'];*/
    $celular = $_POST['telefono'];
    $sistema = $_POST['sistema'];
    $uuid    = $_POST['uuid'];
    $inputleido=$_POST['inputleido'];
    $idusuarios=$_POST['iduser'];
   

    $eleccionusuario=1;

    if(isset($_POST['eleccionusuario'])) {
        $eleccionusuario=$_POST['eleccionusuario'];
        }
    //$lo->usuario=$email;
    //$lo->idusuarios=$idusuarios;
    $lo->celular = $celular;
    $lo->sistema = $sistema;
    $lo->uuid    = $uuid;

    $validar    = $lo->validarTelefono();
    $completado = 1;
    if ($validar == 1) {

        $obtenercliente = $lo->ValidarClienteTelefono();
        $result_row     = $db->fetch_assoc($obtenercliente);
        $lo->idusuarios  = $result_row['idusuarios'];

        if ( $result_row['clave'] == '' || $result_row['nombre'] == '' 
        || $result_row['usuario'] == '' 
        || $result_row['paterno'] == '' 
        || $result_row['materno'] == '') {
            $completado = 0;
            }

        $arra = array('existe' => $validar, 'idusuario' => $result_row['idusuarios'], 'completado' => $completado);

    } else {

        $completado = 0;

        if ($idusuarios==0) {
            # code...
        
        $lo->GuardarClienteTelefono();

        }else{

            $lo->idusuarios=$idusuarios;
            $lo->ActualizarUsuarioCel();
        }

        $arra = array('existe' => $validar, 'idusuario' => $lo->idusuarios, 'completado' => $completado);

    }

    # code...

    $lo->codigosms = rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9);
    $sql           = "UPDATE usuarios SET token='$lo->codigosms',aceptopolitica='$inputleido' WHERE idusuarios='$lo->idusuarios'";

    $resp = $db->consulta($sql);

    if ($completado == 0 && $eleccionusuario==1) {
        $sMessage = "¡Hola! Tu code " . $f->nombreapp . " es: " . $lo->codigosms;
        $sms      = new AltiriaSMS();
        $sms->setLogin('jozama@hotmail.com');
        $sms->setPassword('jozama78');
        $sDestination = '52' . $lo->celular;
        $response     = $sms->sendSMS($sDestination, $sMessage);

    }
    $resp="";
     if ($completado == 0 && $eleccionusuario==2) {

    
    $mensaje->Version='v17.0';
    $mensaje->phoneid='162367660284534';
    $mensaje->tophone='52'.$lo->celular;
  
    $mensaje->accestoken='EAAPR4S8LbikBO5OooXf3Uz8fFxvpf9r4zSKZBz5otYZAgNtYBwt4flObUw5YT0ZCXKDXO3BmUV3NfOWFZBsCErVHEor4ZBeoRDv5HcC0lMDujBFGYj9DXLmoYw1OzcbfUaMDjhXUt4p05I6ZArul74mHTNpXeDhg67YoCORxTlXjbLcPBP9ZCYs34cYZA7Jd';
    $mensaje->texto=$lo->codigosms;
    $resp=$mensaje->EnviarMensaje();


     }

    $respuesta['respuesta'] = $arra;
    $respuesta['reswhatsap']=$resp;
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
