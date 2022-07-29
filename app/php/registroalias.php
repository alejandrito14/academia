<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

//Inlcuimos las clases a utilizar
require_once "clases/conexcion.php";
require_once "clases/class.Usuarios.php";
require_once "clases/class.Funciones.php";
//require_once "clases/class.MovimientoBitacora.php";
require_once "clases/class.AltiriaSMS.php";
require_once "clases/class.phpmailer.php";
require_once "clases/emails/class.Emails.php";
//require_once("clases/class.PagConfig.php");

try
{

    //Declaramos objetos de clases
    $db = new MySQL();
    $lo = new Usuarios();
    $f  = new Funciones();

 
    //Enviamos la conexion a la clase
    $lo->db    = $db;
    $idusuario = $_POST['id_user'];
    $alias=$_POST['v_alias'];
    //Recibimos parametros
    $foto   = $_POST['foto'];
    $lo->alias   = $alias;
    $lo->foto=$foto;
    $lo->estatus  = 1;

    $lo->idusuarios = $idusuario;

    $deportes=json_decode($_POST['v_deportes']);
 

    $lo->ActualizarUsuarioFotoAlias();
    $lo->EliminarNivelDeporte();

    for ($i=0; $i < count($deportes); $i++) { 
            
            $idnivel=$deportes[$i]->{'idnivel'};
            $iddeporte=$deportes[$i]->{'iddeporte'};
            $lo->idnivel=$idnivel;
            $lo->iddeporte=$iddeporte;
            $lo->GuardarNivelDeporte();

        }


 
    $arra = array('existe' => 1, 'idusuario' => $lo->idusuarios);


    $respuesta['respuesta'] = $arra;

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
