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

   /* $paginaconfi     = new Configuracion();
    $paginaconfi->db = $db;
    $obtenerconfiguracion=$paginaconfi->ObtenerInformacionConfiguracion();

    $ediciondedatoscliente=$obtenerconfiguracion['ediciondedatoscliente'];
    $mostraranuncios=$obtenerconfiguracion['mostraranuncios'];
*/
    //Enviamos la conexion a la clase
    $lo->db    = $db;
    $idusuario = $_POST['id_user'];
    //Recibimos parametros
    $nombre   = $_POST['v_nombre'];
    $paterno  = $_POST['v_paterno'];
    $materno  = $_POST['v_materno'];
    $sexo     = $f->guardar_cadena_utf8($_POST['v_sexo']);
    $fecha    = $f->guardar_cadena_utf8($_POST['v_fecha']);
   /* $telefono = $f->guardar_cadena_utf8($_POST['v_telefono']);
    $email    = $f->guardar_cadena_utf8($_POST['v_email']);
    $contra   = $f->guardar_cadena_utf8($_POST['v_contra1']);
    $nivel    = $_POST['v_nivel'];
    $posicion = $_POST['v_posicion'];
    $curp     = $f->guardar_cadena_utf8($_POST['v_curp']);*/

  /*  $v_codigopostal = $f->guardar_cadena_utf8($_POST['v_codigopostal']);
    $v_pais         = $f->guardar_cadena_utf8($_POST['v_pais']);
    $v_estado       = $f->guardar_cadena_utf8($_POST['v_estado']);
    $v_municipio    = $f->guardar_cadena_utf8($_POST['v_municipio']);
    $v_colonia      = $_POST['v_colonia'];
    $v_referencia   = $_POST['v_referencia'];
    $v_edad         = $f->guardar_cadena_utf8($_POST['v_edad']);
    $v_celular      = $f->guardar_cadena_utf8($_POST['v_celular']);*/

    //$rutaine = $_POST['rutaine'];

   /* $no_exterior        = $_POST['noexterior'];
    $no_interior        = $_POST['nointerior'];
    $calle1             = $_POST['calle1'];
    $calle2             = $_POST['calle2'];
    $v_tipoasentamiento = $_POST['v_tipoasentamiento'];
    $calle              = $_POST['calle'];*/
    $sistema            = $_POST['sistema'];
    $tokenfirebase      = $_POST['tokenfirebase'];
    $uuid               = $_POST['uuid'];

    $lo->nombre   = $nombre;
    $lo->paterno  = $paterno;
    $lo->materno  = $materno;
   /* $lo->telefono = $telefono;
    $lo->email    = $email;*/
    $lo->sexo     = $sexo;
    $lo->fecha    = $fecha;
    /*$lo->usuario  = $email;
    $lo->clave    = $contra;
    $lo->nivel    = $nivel;
    $lo->posicion = $posicion;*/
    $lo->curp     = "";
    $lo->estatus  = 1;

  /*  $lo->v_codigopostal = $v_codigopostal;
    $lo->v_pais         = $v_pais;
    $lo->v_estado       = $v_estado;
    $lo->v_municipio    = $v_municipio;
    $lo->v_direccion    = $v_direccion;
    $lo->v_colonia      = $v_colonia;
    $lo->v_referencia   = $v_referencia;
    $lo->celular        = $v_celular;
    $lo->edad           = $v_edad;

    $lo->v_nointerior       = $no_interior;
    $lo->v_noexterior       = $no_exterior;
    $lo->calle1             = $calle1;
    $lo->calle2             = $calle2;
    $lo->calle              = $calle;
    $lo->v_tipoasentamiento = $v_tipoasentamiento;*/

    //$lo->principaldireccion = 1;
    $lo->sistema            = $sistema;
    $lo->idusuarios          = $idusuario;
    
    $edicion=1;
   /* if ($ediciondedatoscliente==1) {
       $edicion=0;
    }
     $anunciovisto=1;
    if ($mostraranuncios==1) {
      $anunciovisto=0;
    }
    $lo->ediciondedatoscliente=$edicion;
    $lo->anunciovisto=$anunciovisto;
*/
  //  $validar = $lo->validarUsuarioCliente();

   // if ($validar == 1) {

        $lo->ActualizarUsuario();
/*
        if ($lo->v_codigopostal != '' && $lo->v_pais != '' && $lo->v_estado != '' && $lo->v_municipio != '') {

            $lo->GuardarDireccionEnvio();

        }*/

        if ($sistema != '' && $tokenfirebase != '') {

            $lo->tokenfirebase = $tokenfirebase;
            $lo->sistema       = $sistema;
            $lo->uuid          = $uuid;

             $lo->GuardarTokenfirebase();

        }

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
        $arra = array('existe' => 1, 'idusuario' => $lo->idusuarios, 'nombre' => mb_strtoupper($lo->nombre), 'paterno' => mb_strtoupper($lo->paterno), 'materno' => mb_strtoupper($lo->materno), 'celular' => $v_celular, 'email' => $email,'usuario' => $usuario);

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
