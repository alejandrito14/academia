<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.Token.php");
require_once("clases/class.Funciones.php");
//require_once("clases/class.MovimientoBitacora.php");
require_once("clases/class.AltiriaSMS.php");
require_once("clases/class.phpmailer.php");
require_once("clases/emails/class.Emails.php");
require_once "clases/class.WhatsapMensaje.php";
require_once "clases/class.PagConfig.php";


try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Usuarios();
	$f=new Funciones();
	$token=new Token();
	$token->db=$db;
	 $mensaje=new WhatsapMensaje();
    $mensaje->db=$db;
	//Enviamos la conexion a la clase
	$lo->db = $db;


	
	$email = $f->guardar_cadena_utf8($_POST['v_email']);
    $eleccionusuario==1;
	if(isset($_POST['eleccionusuario'])) {
        $eleccionusuario=$_POST['eleccionusuario'];
        }

	$lo->celular=$email;
	
	$validar=$lo->validarUsuarioClienteCelular();

	if ($validar==1) {

		$obtenercliente=$lo->ObtenerUsuarioCelular();

		$result_cliente_row = $db->fetch_assoc($obtenercliente);
		$result_cliente_row_num = $db->num_rows($obtenercliente);

		$token->idusuarios=$result_cliente_row['idusuarios'];
		$obtenertoken=$token->GenerarToken();


		$lo->idusuarios=$result_cliente_row['idusuarios'];
		$lo->nombre=$result_cliente_row['nombre'];
		$lo->paterno=$result_cliente_row['paterno'];
		$lo->materno=$result_cliente_row['materno'];
		$lo->celular=$result_cliente_row['celular'];
		$lo->usuario=$result_cliente_row['usuario'];
		$lo->email=$result_cliente_row['email'];

		$sms = new AltiriaSMS();

		$mail = new PHPMailer(true);


		$enviar_mail = new Emails();	
		$enviar_mail->mailer = $mail;

	if($eleccionusuario==1) {

		$sMessage=utf8_decode($f->nombreapp." informa. ".trim($lo->nombre).", se ha solicitado reestablecer tu clave de acceso. El token es: ").$obtenertoken;
		$sms->setLogin('jozama@hotmail.com');
		$sms->setPassword('jozama78');
		$sDestination = '52'.$lo->celular;
		$response = $sms->sendSMS($sDestination, $sMessage);

	}
 
	if ($eleccionusuario==2) {
		$mensaje->Version='v19.0';

		//$mensaje->Version='v17.0';
    	//$mensaje->phoneid='162367660284534';
		$mensaje->phoneid='239003922634897';
    	$mensaje->tophone='52'.$lo->celular;
  
    	//$mensaje->accestoken='EAAPR4S8LbikBO5OooXf3Uz8fFxvpf9r4zSKZBz5otYZAgNtYBwt4flObUw5YT0ZCXKDXO3BmUV3NfOWFZBsCErVHEor4ZBeoRDv5HcC0lMDujBFGYj9DXLmoYw1OzcbfUaMDjhXUt4p05I6ZArul74mHTNpXeDhg67YoCORxTlXjbLcPBP9ZCYs34cYZA7Jd';

    	$mensaje->accestoken='EAAFFRVtQFoABO73Jm0leTdQAyRWk491qkozHJbjcUUD0ZA2KA75KHn132MvDcyHUycTZC5FyXbMZCt0omSpvXlsYywMidJy1HhTHWzI6NlG4Seq42ZCf9LgGUeU0ZCdZBbs8aOb8KqAl6aMCtEOJPoxZCpoT19Q1ncXUbD9bc3qSDeIbYKP5wiZBvgrQmG4h7ZBRS';
    	$mensaje->texto=$obtenertoken;
    	$resp=$mensaje->EnviarMensaje();
	}

							 							
		  $sql="SELECT *FROM pagina_configuracion";
               $pagina=$db->consulta($sql);

               $pagina_row=$db->fetch_assoc($pagina);

               $enviar_mail->Host = $pagina_row['host'];                                 //HOST
               $enviar_mail->Port =$pagina_row['puertoenvio'];                                             //PUERTO
               $enviar_mail->Username = $pagina_row['nombreusuario'];                                    //USUARIO
               $enviar_mail->Password = $pagina_row['contrasena'];                                           //CONTRASEÑA
               $enviar_mail->remitente = $pagina_row['remitente'];                                 //CORREO QUIEN ENVIA
               $enviar_mail->remitente_nombre = $pagina_row['remitente_nombre'];                     //NOMBRE CORREO QUIEN ENVIA
               $enviar_mail->SMTPAuthe=$pagina_row['r_autenticacion'];
               $enviar_mail->SMTPSecure=$pagina_row['r_ssl'];
                      
			   $enviar_mail->destino = $lo->email;						
			   $enviar_mail->asunto = $f->nombreapp." informa";																
			   $enviar_mail->CharSet = 'UTF-8';
																
											//CORREO DESTINO
               $enviar_mail->destino_nombre = mb_strtoupper($lo->nombre).' '.mb_strtoupper($lo->paterno).' '.mb_strtoupper($lo->materno);

			//Realizamos envio de email

               if ($lo->email!='') {

              // 	$enviar_mail->recuperacion($lo,$obtenertoken);
               }
		

		$arra = array('existe' => $validar,'idusuario'=>$lo->idusuarios,'nombre'=>mb_strtoupper($lo->nombre),'paterno'=>mb_strtoupper($lo->paterno),'materno'=>mb_strtoupper($lo->materno),'email'=>$lo->usuario,'celular'=>$lo->celular,'email'=>$lo->email,'usuario'=>$lo->usuario);




	}else{

		$arra = array('existe' => $validar,'idusuario'=>0);

	}
	


	$respuesta['respuesta']=$arra;
	
	//Retornamos en formato JSON 
	$myJSON = json_encode($respuesta);
	echo $myJSON;

}catch(Exception $e){
	//$db->rollback();
	//echo "Error. ".$e;
	
	$array->resultado = "Error: ".$e;
	$array->msg = "Error al ejecutar el php";
	$array->id = '0';
		//Retornamos en formato JSON 
	$myJSON = json_encode($array);
	echo $myJSON;
}
?>