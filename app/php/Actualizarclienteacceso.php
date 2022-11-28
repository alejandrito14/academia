<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.AltiriaSMS.php");
require_once("clases/class.phpmailer.php");
require_once("clases/emails/class.Emails.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Usuarios();
	$f=new Funciones();

	//Enviamos la conexion a la clase
	$lo->db = $db;


	//Recibimos parametros
	$id=$_POST['iduser'];
	
	$email = $f->guardar_cadena_utf8($_POST['v_email']);
	$contra = $f->guardar_cadena_utf8($_POST['v_contra1']);
	$usuario=$_POST['v_usuario'];

	
	$lo->email=$email;
	$lo->clave=$contra;
	$lo->idusuarios=$id;
	$lo->usuario=$usuario;


	$respuesta1=$lo->BuscarClienteporcorreo();
	$contar=$db->num_rows($respuesta1);
	$envio=0;

	if ($contar==1) {
		
		$envio=1;


	
	}else{

		$respuesta2=$lo->BuscarClienteporcorreoMenos();
		$contar2=$db->num_rows($respuesta2);

		if($contar2==0) {
			//$lo->ActualizarCliente();
			$envio=1;
		

		}else{



		$arra = array('respuesta'=>2);


		}

	}

	if ($envio==1) {
		# code...
	
	
			$lo->Actualizardatosacceso();
			$cliente=$lo->ObtenerInformacionUsuario();
		

		$mail = new PHPMailer(true);


		$enviar_mail = new Emails();	
		$enviar_mail->mailer = $mail;

		$sMessage="Se actualizaron los datos de acceso correctamente : ".mb_strtoupper($cliente[0]->nombre).' '.mb_strtoupper($cliente[0]->paterno).' '.mb_strtoupper($cliente[0]->materno).','.$f->nombreapp;

	//enviamos la conexión a las clases que lo requieren

		$sms = new AltiriaSMS();
		$sms->setLogin('jozama@hotmail.com');
		$sms->setPassword('jozama78');
		$sDestination = '52'.$cliente[0]->celular;

		//$response = $sms->sendSMS($sDestination, $sMessage);



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
                      
			   $enviar_mail->destino = $lo->usuario;																			//CORREO DESTINO
               $enviar_mail->destino_nombre = mb_strtoupper($lo->nombre).' '.mb_strtoupper($lo->paterno).' '.mb_strtoupper($lo->materno);
			  $enviar_mail->asunto = "ACTUALIZACIÓN DE DATOS ".$f->nombreapp;																	


			//Realizamos envio de email
	//	$enviar_mail->envio_registro($lo);

		$arra = array('respuesta' => 1,'idusuario'=>$cliente[0]->idusuarios,'nombre'=>$cliente[0]->nombre,'paterno'=>$cliente[0]->paterno,'materno'=>$cliente[0]->materno,'usuario'=>$cliente[0]->usuario,'contra'=>$cliente[0]->clave);



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