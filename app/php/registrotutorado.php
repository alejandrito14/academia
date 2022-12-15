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
    $idusuariotutor = $_POST['id_user'];
    $lo->idusuarios=$idusuariotutor;
    //Recibimos parametros
    $nombre   = $_POST['v_nombretu'];
    $paterno  = $_POST['v_paternotu'];
    $materno  = $_POST['v_maternotu'];
    $sexo     = $f->guardar_cadena_utf8($_POST['v_sexotu']);
    $fecha    = $f->guardar_cadena_utf8($_POST['v_fechatu']);
    $telefono = $f->guardar_cadena_utf8($_POST['v_celulartu']);
    $email    = $f->guardar_cadena_utf8($_POST['v_correotu']);
    $parentesco=$_POST['v_parentescotu'];

    $lo->nombre  = $nombre;
    $lo->paterno    = $paterno;
    $lo->materno=$materno;
    $lo->sexo=$sexo;
    $lo->fecha=$fecha;
    $lo->celular=$telefono;
    $lo->email=$email;
    $lo->curp     = "";
    $lo->estatus  = 0;
    $lo->tipo=3;
    $lo->usuario=$email;
    $lo->idtutorado=$_POST['v_idtu'];
    $inputtutor=$_POST['inputtutor'];
    $sincelular=$_POST['inputsincelular'];
    $lo->idusuarios= $idusuariotutor;

    $info= $lo->ObtenerInformacionUsuario();


        if ($lo->idtutorado==-1 || $lo->idtutorado=='') {

             if ($sincelular==1) {
                    $lo->celular2=$info[0]->celular;
                 }

                   $v_idusuario=$_POST['v_idusuario'];
                 if ($v_idusuario==''){
                     $lo->GuardarUsuarioTutorado($sincelular);
                   
                    }else{
                     $lo->idusuariotutorado=$v_idusuario;
                    }

                    $ObtenerOrdenTutorado=$lo->ObtenerOrdenTutorado($idusuariotutor);
                    $orden=$ObtenerOrdenTutorado;
              //   $lo->GuardarUsuarioTutorado();
                 $lo->GuardarUsuarioyTutor($idusuariotutor,$parentesco,$inputtutor,$orden);
        }else{



            $lo->ActualizarUsuarioTutorado();
            $lo->ActualizarParentesco($parentesco);

        }




    $respuesta['respuesta'] = 1;

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
