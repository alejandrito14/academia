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
    //Recibimos parametros
    $nombre   = $_POST['v_nombretu'];
    $paterno  = $_POST['v_paternotu'];
    $materno  = $_POST['v_maternotu'];
    $sexo     = $f->guardar_cadena_utf8($_POST['v_sexotu']);
    $fecha    = $f->guardar_cadena_utf8($_POST['v_fechatu']);
    $telefono = $f->guardar_cadena_utf8($_POST['v_celulartu']);
    $email    = $f->guardar_cadena_utf8($_POST['v_correotu']);

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


    $validar = $lo->validarUsuarioCliente();

    if ($validar == 0) {

        $lo->GuardarUsuarioTutorado();
        $lo->GuardarUsuarioyTutor($idusuariotutor);

    }
/*
        if ($lo->v_codigopostal != '' && $lo->v_pais != '' && $lo->v_estado != '' && $lo->v_municipio != '') {

            $lo->GuardarDireccionEnvio();

        }*/

       /* if ($sistema != '' && $tokenfirebase != '') {

            $lo->tokenfirebase = $tokenfirebase;
            $lo->sistema       = $sistema;
            $lo->uuid          = $uuid;

            $lo->GuardarTokenfirebase();
        }*/

        /*if ($rutaine != 0) {

            $extension = explode('.', $rutaine);

            $rutaine = "upload/ine/" . $_POST['rutaine'];

            $exists = is_file($rutaine);

            if ($exists == true) {

                $nombre = "INE_" . $lo->idCliente . '.' . $extension[1];
                chmod($rutaine, 0777);

                rename($rutaine, "upload/ine/" . $nombre);
                $lo->ine = $nombre;
                $lo->actualizar_nombre_ine();
            }

        }*/

       /* if (isset($_FILES["file"]["name"])) {

            $new_image_name = urldecode($_FILES["file"]["name"]);

          

            foreach ($_FILES as $key) {
                if ($key['error'] == UPLOAD_ERR_OK) {
//Verificamos si se subio correctamente

                    $nombre = $f->conver_especial($lo->idCliente . "_" . $key['name']); //Obtenemos el nombre del archivo

                    $nombre_img = explode("?", $nombre);

                    //$nombre = $nombre_img[0].".jpg";
                    $nombre = $nombre_img[0];

                    $temporal = $key['tmp_name']; //Obtenemos el nombre del archivo temporal

                    move_uploaded_file($temporal, "upload/ine/" . $nombre); //Movemos el archivo temporal a la ruta especificada
                    //El echo es para que lo reciba jquery y lo ponga en el div "cargados"
                    $lo->ine = $nombre;
                    $lo->actualizar_nombre_ine();
                }
            }
        }*/

       /* if (isset($_POST['imagen'])) {
            # code...

            $imagen      = $_POST['imagen'];
            $uploads_dir = "upload/ine/";
            $nombreimg   = $lo->idCliente . "_" . date("Y-m-d H:i:s") . ".png";

            $path = $uploads_dir . "/" . $nombreimg;

            $img = str_replace(' ', '+', $imagen);
            file_put_contents($path, base64_decode($img));
            $imagen = $nombreimg;

            $lo->ine = $nombreimg;
            $lo->actualizar_nombre_ine();
        }*/

        /*$mail = new PHPMailer(true);

        $enviar_mail         = new Emails();
        $enviar_mail->mailer = $mail;

        $nombre = substr($lo->nombre, 0, 40);

        $ruta     = '';
        $sMessage = "Hola " . mb_strtoupper($nombre) . ', Ya terminaste tu registro en la APP ' . $f->nombreapp . ', Gracias.' . $ruta;

        //enviamos la conexión a las clases que lo requieren

        $sms = new AltiriaSMS();

        $sms->setLogin('jozama@hotmail.com');
        $sms->setPassword('jozama78');
        $sDestination = '52' . $lo->celular;

        $response = $sms->sendSMS($sDestination, $sMessage);

        $sql    = "SELECT *FROM pagina_configuracion";
        $pagina = $db->consulta($sql);

        $pagina_row = $db->fetch_assoc($pagina);

        $enviar_mail->Host             = $pagina_row['host']; //HOST
        $enviar_mail->Port             = $pagina_row['puertoenvio']; //PUERTO
        $enviar_mail->Username         = $pagina_row['nombreusuario']; //USUARIO
        $enviar_mail->Password         = $pagina_row['contrasena']; //CONTRASEÑA
        $enviar_mail->remitente        = $pagina_row['remitente']; //CORREO QUIEN ENVIA
        $enviar_mail->remitente_nombre = $pagina_row['remitente_nombre']; //NOMBRE CORREO QUIEN ENVIA
        $enviar_mail->SMTPAuthe        = $pagina_row['r_autenticacion'];
        $enviar_mail->SMTPSecure       = $pagina_row['r_ssl'];

        $enviar_mail->destino        = $email; //CORREO DESTINO
        $enviar_mail->destino_nombre = mb_strtoupper($lo->nombre) . ' ' . mb_strtoupper($lo->paterno) . ' ' . mb_strtoupper($lo->materno); //NOMBRE CORRECO DESTINO
        $enviar_mail->asunto         = "Bienvenido a " . $f->nombreapp;

        //Realizamos envio de email
        $enviar_mail->envio_registro($lo);
*/
        $arra = array('existe' => $validar, 'email' => $email);

    /*} else {

        $arra = array('existe' => $validar, 'idusuario' => 0);

    }*/

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
