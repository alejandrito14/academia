<?php
class Emails
{
	//variables requeridas para el envio de this->mailer
	
	public $mailer;//objeto de this->mailerer
	
	//variables par configuracion de servidor de envio.
	
	public $Host;  // CONFIGURACION DEL SERVIDOR  SMTP
	public $Port;  // PUERTO DE SALIDA DEL SMTP
	public $Username; // SMTP USUARIO DE LA CUENTA
	public $Password; //  CONTRASEÑA DE LA CUENTA SMTP 
	
	//termina variables de configuracion de server.
	
	public $destino; //nombre del contacto del cliente.
	public $remitente; //nombre a quien se le envia
	public $destino_nombre;
	public $remitente_nombre;
	public $asunto; //Asunto del correo
	public $nombre;
	public $apellidos;
	public $mensaje;	
	public $email;
	public $token;

	public $SMTPAuthe;
	public $SMTPSecure;


	
	//Funcion que sirve para levantar el email de bienvenida de registro
	public function envio_bienvenida($lo)
	{	

		$cuerpo = '
		SE HA REGISTRADO SATISFATORIAMENTE EN LA APLICACIÓN '.mb_strtoupper($lo->nombre).' '.mb_strtoupper($lo->paterno).' '.mb_strtoupper($lo->materno);

		$this->mailer->IsSMTP(); 								// telling the class to use SMTP
		try
		{
			$this->mailer->SMTPAuth      = true;               	// enable SMTP authentication
			$this->mailer->SMTPKeepAlive = true;               	// SMTP connection will not close after each email sent
			$this->mailer->Host          = $this->Host; 		// sets the SMTP server
			$this->mailer->Port          = $this->Port;       	// set the SMTP port for the GMAIL server
			$this->mailer->Username      = $this->Username; 	// SMTP account username
			$this->mailer->Password      = $this->Password;    	// SMTP account password
			$this->mailer->SMTPSecure = $this->SMTPSecure;
			$this->mailer->SetFrom($this->remitente, $this->remitente_nombre);
			
			//$mail->AddReplyTo('list@mydomain.com', 'List manager');

			$this->mailer->Subject    = utf8_encode($this->asunto);
			$this->mailer->AltBody    = "Para poder visualizar este email es necesario que tengas activo HTML!"; // optional, comment out and test
			$this->mailer->MsgHTML($cuerpo);

			$this->mailer->AddAddress($this->destino,$this->destino_nombre); // CORREO DEL ENCARGADO DE TOMAR LA INFORMACION DE LA PAGINA.
			//$this->mailer->AddAddress("ventas@todoamayoreo.com",$this->destino_nombre); // CORREO DEL ENCARGADO DE TOMAR LA INFORMACION DE LA PAGINA.
			//$this->mailer->AddCC('jlgomeza@gmail.com','jose luis');						  
			//$this->mailer->AddAttachment('clases/emails/revista.pdf');


			//$this->mailer->			
			$this->mailer->Send();

			// Clear all addresses and attachments for next loop
			$this->mailer->ClearAddresses();
			$this->mailer->ClearBCCs();
			$this->mailer->ClearCCs();
			$this->mailer->ClearAttachments();


		}catch (phpmailerException $e) {
				echo $e->errorMessage(); //Pretty error messages from PHPMailer
			} catch (Exception $e) {
				echo $e->getMessage(); //Boring error messages from anything else!
			}	
		}


		public function envio_Invitacion($mensaje)
		{	


			$cuerpo = $mensaje;

		$this->mailer->IsSMTP(); 								// telling the class to use SMTP
		try
		{
			$this->mailer->SMTPAuth      = true;               	// enable SMTP authentication
			$this->mailer->SMTPKeepAlive = true;               	// SMTP connection will not close after each email sent
			$this->mailer->Host          = $this->Host; 		// sets the SMTP server
			$this->mailer->Port          = $this->Port;       	// set the SMTP port for the GMAIL server
			$this->mailer->Username      = $this->Username; 	// SMTP account username
			$this->mailer->Password      = $this->Password;    	// SMTP account password
			$this->mailer->SMTPSecure = 'ssl';
			$this->mailer->SetFrom($this->remitente, $this->remitente_nombre);
			
			//$mail->AddReplyTo('list@mydomain.com', 'List manager');

			$this->mailer->Subject    = utf8_encode($this->asunto);
			$this->mailer->AltBody    = "Para poder visualizar este email es necesario que tengas activo HTML!"; // optional, comment out and test
			$this->mailer->MsgHTML($cuerpo);

			$this->mailer->AddAddress($this->destino,$this->destino_nombre); // CORREO DEL ENCARGADO DE TOMAR LA INFORMACION DE LA PAGINA.
			//$this->mailer->AddAddress("ventas@todoamayoreo.com",$this->destino_nombre); // CORREO DEL ENCARGADO DE TOMAR LA INFORMACION DE LA PAGINA.
			//$this->mailer->AddCC('jlgomeza@gmail.com','jose luis');						  
			//$this->mailer->AddAttachment('clases/emails/revista.pdf');
			$this->mailer->CharSet = 'UTF-8'; 


			//$this->mailer->			
			$this->mailer->Send();

			// Clear all addresses and attachments for next loop
			$this->mailer->ClearAddresses();
			$this->mailer->ClearBCCs();
			$this->mailer->ClearCCs();
			$this->mailer->ClearAttachments();


		}catch (phpmailerException $e) {
				echo $e->errorMessage(); //Pretty error messages from PHPMailer
			} catch (Exception $e) {
				echo $e->getMessage(); //Boring error messages from anything else!
			}	
		}


		public function EnviarCorreoExpedienteSuspendido($numeroexpediente,$nombre)
		{


			$cuerpo ="Se notifica que el expediente con numero ".$numeroexpediente." ha terminado su vigencia, ha pasado a estatus suspendido";

		$this->mailer->IsSMTP(); 								// telling the class to use SMTP
		try
		{
			$this->mailer->SMTPAuth      = true;               	// enable SMTP authentication
			$this->mailer->SMTPKeepAlive = true;               	// SMTP connection will not close after each email sent
			$this->mailer->Host          = $this->Host; 		// sets the SMTP server
			$this->mailer->Port          = $this->Port;       	// set the SMTP port for the GMAIL server
			$this->mailer->Username      = $this->Username; 	// SMTP account username
			$this->mailer->Password      = $this->Password;    	// SMTP account password
			$this->mailer->SMTPSecure = 'ssl';
			$this->mailer->SetFrom($this->remitente, $this->remitente_nombre);
			
			//$mail->AddReplyTo('list@mydomain.com', 'List manager');

			$this->mailer->Subject    = utf8_encode($this->asunto);
			$this->mailer->AltBody    = "Para poder visualizar este email es necesario que tengas activo HTML!"; // optional, comment out and test
			$this->mailer->MsgHTML($cuerpo);

			$this->mailer->AddAddress($this->destino,$this->destino_nombre); // CORREO DEL ENCARGADO DE TOMAR LA INFORMACION DE LA PAGINA.
			//$this->mailer->AddAddress("ventas@todoamayoreo.com",$this->destino_nombre); // CORREO DEL ENCARGADO DE TOMAR LA INFORMACION DE LA PAGINA.
			//$this->mailer->AddCC('jlgomeza@gmail.com','jose luis');						  
			//$this->mailer->AddAttachment('clases/emails/revista.pdf');


			//$this->mailer->			
			$this->mailer->Send();

			// Clear all addresses and attachments for next loop
			$this->mailer->ClearAddresses();
			$this->mailer->ClearBCCs();
			$this->mailer->ClearCCs();
			$this->mailer->ClearAttachments();


		}catch (phpmailerException $e) {
				echo $e->errorMessage(); //Pretty error messages from PHPMailer
			} catch (Exception $e) {
				echo $e->getMessage(); //Boring error messages from anything else!
			}	

		}


		public function CorreoExpedienteSuspendidoNotaria($numeroexpediente,$nombrenotaria)
		{

			$cuerpo ="Se le notifica a la notaria ".$nombrenotaria." que el expediente con numero ".$numeroexpediente." ha terminado su vigencia, ha pasado a estatus suspendido";

		$this->mailer->IsSMTP(); 								// telling the class to use SMTP
		try
		{
			$this->mailer->SMTPAuth      = true;               	// enable SMTP authentication
			$this->mailer->SMTPKeepAlive = true;               	// SMTP connection will not close after each email sent
			$this->mailer->Host          = $this->Host; 		// sets the SMTP server
			$this->mailer->Port          = $this->Port;       	// set the SMTP port for the GMAIL server
			$this->mailer->Username      = $this->Username; 	// SMTP account username
			$this->mailer->Password      = $this->Password;    	// SMTP account password
			$this->mailer->SMTPSecure = 'ssl';
			$this->mailer->SetFrom($this->remitente, $this->remitente_nombre);
			
			//$mail->AddReplyTo('list@mydomain.com', 'List manager');

			$this->mailer->Subject    = utf8_encode($this->asunto);
			$this->mailer->AltBody    = "Para poder visualizar este email es necesario que tengas activo HTML!"; // optional, comment out and test
			$this->mailer->MsgHTML($cuerpo);

			$this->mailer->AddAddress($this->destino,$this->destino_nombre); // CORREO DEL ENCARGADO DE TOMAR LA INFORMACION DE LA PAGINA.
			//$this->mailer->AddAddress("ventas@todoamayoreo.com",$this->destino_nombre); // CORREO DEL ENCARGADO DE TOMAR LA INFORMACION DE LA PAGINA.
			//$this->mailer->AddCC('jlgomeza@gmail.com','jose luis');						  
			//$this->mailer->AddAttachment('clases/emails/revista.pdf');


			//$this->mailer->			
			$this->mailer->Send();

			// Clear all addresses and attachments for next loop
			$this->mailer->ClearAddresses();
			$this->mailer->ClearBCCs();
			$this->mailer->ClearCCs();
			$this->mailer->ClearAttachments();


		}catch (phpmailerException $e) {
				echo $e->errorMessage(); //Pretty error messages from PHPMailer
			} catch (Exception $e) {
				echo $e->getMessage(); //Boring error messages from anything else!
			}	
		}


		public function envio_registro($lo)
		{		
		//$asunto = "ENVIO DE EMAILS";
			$cuerpo = '<!DOCTYPE html>
			<html>
			<head>
			<title>APP PADEL</title>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<style type="text/css">
			/* CLIENT-SPECIFIC STYLES */
			body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
			table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;} /* Remove spacing between tables in Outlook 2007 and up */
			img{-ms-interpolation-mode: bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */

			/* RESET STYLES */
			img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;}
			table{border-collapse: collapse !important;}
			body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}

			/* iOS BLUE LINKS */
			a[x-apple-data-detectors] {
				color: inherit !important;
				text-decoration: none !important;
				font-size: inherit !important;
				font-family: inherit !important;
				font-weight: inherit !important;
				line-height: inherit !important;
			}

			/* MOBILE STYLES */
			@media screen and (max-width: 525px) {

				/* ALLOWS FOR FLUID TABLES */
				.wrapper {
					width: 100% !important;
					max-width: 100% !important;
				}

				/* ADJUSTS LAYOUT OF LOGO IMAGE */
				.logo img {
					margin: 0 auto !important;
				}

				/* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */
				.mobile-hide {
					display: none !important;
				}

				.img-max {
					max-width: 100% !important;
					width: 100% !important;
					height: auto !important;
				}

				/* FULL-WIDTH TABLES */
				.responsive-table {
					width: 100% !important;
				}

				/* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */
				.padding {
					padding: 10px 5% 15px 5% !important;
				}

				.padding-meta {
					padding: 30px 5% 0px 5% !important;
					text-align: center;
				}

				.padding-copy {
					padding: 10px 5% 10px 5% !important;
					text-align: center;
				}

				.no-padding {
					padding: 0 !important;
				}

				.section-padding {
					padding: 50px 15px 50px 15px !important;
				}

				/* ADJUST BUTTONS ON MOBILE */
				.mobile-button-container {
					margin: 0 auto;
					width: 100% !important;
				}

				.mobile-button {
					padding: 15px !important;
					border: 0 !important;
					font-size: 16px !important;
					display: block !important;
				}

			}

			/* ANDROID CENTER FIX */
			div[style*="margin: 16px 0;"] { margin: 0 !important; }
			</style>
			</head>
			<body style="margin: 0 !important; padding: 0 !important;">

			<!-- HIDDEN PREHEADER TEXT -->
			<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
			Bienvenido
			</div>

			<!-- HEADER -->
			<table border="0" cellpadding="0" cellspacing="0" width="100%">
			<tr bgcolor="#042e62">
			<td>&nbsp;</td>
			</tr>
			<tr>
			<td bgcolor="#ffffff" align="center">
			<!--[if (gte mso 9)|(IE)]>
			<table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
			<tr>
			<td align="center" valign="top" width="500">
			<![endif]-->
			<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">
			<tr>
			<td align="center" valign="top" style="padding: 15px 0;" class="logo">
			
			</a>
			</td>
			</tr>
			</table>
			<!--[if (gte mso 9)|(IE)]>
			</td>
			</tr>
			</table>
			<![endif]-->
			</td>
			</tr>
			<tr>
			<td bgcolor="#ffffff" align="center" style="padding: 15px;">
			<!--[if (gte mso 9)|(IE)]>
			<table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
			<tr>
			<td align="center" valign="top" width="500">
			<![endif]-->
			<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="responsive-table">
			<tr>
			<td>
			<!-- COPY -->
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
			<td align="center" style="font-size: 32px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;" class="padding-copy">¡Hola!</td>
			</tr>
			</table>
			</td>
			</tr>
			</table>
			<!--[if (gte mso 9)|(IE)]>
			</td>
			</tr>
			</table>
			<![endif]-->
			</td>
			</tr>

			<tr>
			<td bgcolor="#ffffff" align="center" style="padding: 15px;">
			<!--[if (gte mso 9)|(IE)]>
			<table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
			<tr>
			<td align="center" valign="top" width="500">
			<![endif]-->
			<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="responsive-table">
			<tr>
			<td>
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
			<td>
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
			<td align="center" style="padding: 0 0 0 0; font-size: 14px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: #222; padding-bottom:15px;" class="padding-copy">'.mb_strtoupper($lo->nombre).' '.mb_strtoupper($lo->paterno).' '.mb_strtoupper($lo->materno).'</td>
			</tr>

			<tr>
			<td align="center" style="padding: 0 0 0 0; font-size: 14px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: #222; padding-bottom:15px; font-weight: bold;" class="padding-copy">Acceso a tu cuenta</td>
			</tr>

			<tr>
			<td align="center" style="padding: 10px; font-weight:bold; font-size: 14px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: #222;  background:#eaeaea;" class="padding-copy">USUARIO: '.$lo->usuario.'</td>
			</tr>

			<tr>
			<td align="center" style="padding: 10px; font-weight:bold; font-size: 14px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: #222;  background:#eaeaea;" class="padding-copy">CONTRASE&Ntilde;A: '.$lo->clave.'</td>
			</tr>

			<tr>
			<td align="left" style="padding: 0 0 0 0; font-size: 14px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: #222; text-transform:uppercase; padding-top:15px; padding-bottom:15px;" class="padding-copy"><br><br>
			</td>
			</tr>
			</table>

			</td>
			</tr>
			</table>
			</td>
			</tr>
			</table>
			<!--[if (gte mso 9)|(IE)]>
			</td>
			</tr>
			</table>
			<![endif]-->
			</td>
			</tr>
			</table>
			<!--[if (gte mso 9)|(IE)]>
			</td>
			</tr>
			</table>
			<![endif]-->
			</td>
			</tr>
			<tr>
			<td bgcolor="#ffffff" align="center" style="padding: 20px 0px;">
			<!--[if (gte mso 9)|(IE)]>
			<table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
			<tr>
			<td align="center" valign="top" width="500">
			<![endif]-->
			<!-- UNSUBSCRIBE COPY -->
			<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="max-width: 500px;" class="responsive-table">
			<tr>
			<td align="center" style="font-size: 12px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color:#666666;">
			
			<div style="float:left; width:241px; text-align:center; padding-right: 8px;">
			</div>
			<!--<span style="font-family: Arial, sans-serif; font-size: 12px; float:left; color: #444444;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>-->
			<div style="float:left; width:241px; text-align:center; padding-left:8px;">
			</div>

			<div style="clear:both;"></div>
			<br>

			<!--<a href="http://litmus.com" target="_blank" style="color: #666666; text-decoration: none;">Unsubscribe</a>
			<span style="font-family: Arial, sans-serif; font-size: 12px; color: #444444;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>-->
			<!--<a href="" target="_blank" style="color: #666666; text-decoration: none;">Copyright &copy; 2021,  ISS</a>--->
			</td>
			</tr>
			</table>
			<!--[if (gte mso 9)|(IE)]>
			</td>
			</tr>
			</table>
			<![endif]-->
			</td>
			</tr>
			</table>

			</body>
			</html>';

		$this->mailer->IsSMTP(); 								// telling the class to use SMTP
		try
		{
			$this->mailer->SMTPAuth      = true;               	// enable SMTP authentication
			$this->mailer->SMTPKeepAlive = true;               	// SMTP connection will not close after each email sent
			$this->mailer->Host          = $this->Host; 		// sets the SMTP server
			$this->mailer->Port          = $this->Port;       	// set the SMTP port for the GMAIL server
			$this->mailer->Username      = $this->Username; 	// SMTP account username
			$this->mailer->Password      = $this->Password;    	// SMTP account password
			$this->mailer->SMTPSecure = $this->SMTPSecure;
			$this->mailer->SetFrom($this->remitente, $this->remitente_nombre);
			
			//$mail->AddReplyTo('list@mydomain.com', 'List manager');

			$this->mailer->Subject    = utf8_encode($this->asunto);
			$this->mailer->AltBody    = "Para poder visualizar este email es necesario que tengas activo HTML!"; // optional, comment out and test
			$this->mailer->MsgHTML($cuerpo);

			$this->mailer->AddAddress($this->destino,$this->destino_nombre); // CORREO DEL ENCARGADO DE TOMAR LA INFORMACION DE LA PAGINA.
			//$this->mailer->AddAddress("ventas@todoamayoreo.com",$this->destino_nombre); // CORREO DEL ENCARGADO DE TOMAR LA INFORMACION DE LA PAGINA.
			//$this->mailer->AddCC('jlgomeza@gmail.com','jose luis');						  
			//$this->mailer->AddAttachment('clases/emails/revista.pdf');


			//$this->mailer->			
			$this->mailer->Send();

			// Clear all addresses and attachments for next loop
			$this->mailer->ClearAddresses();
			$this->mailer->ClearBCCs();
			$this->mailer->ClearCCs();
			$this->mailer->ClearAttachments();


		}catch (phpmailerException $e) {
				echo $e->errorMessage(); //Pretty error messages from PHPMailer
			} catch (Exception $e) {
				echo $e->getMessage(); //Boring error messages from anything else!
			}	
		}



		public function recuperacion($lo,$token)
		{		
		//$asunto = "ENVIO DE EMAILS";
			$cuerpo = '<!DOCTYPE html>
			<html>
			<head>
			<title>APP TENNIS</title>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<style type="text/css">
			/* CLIENT-SPECIFIC STYLES */
			body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
			table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;} /* Remove spacing between tables in Outlook 2007 and up */
			img{-ms-interpolation-mode: bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */

			/* RESET STYLES */
			img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;}
			table{border-collapse: collapse !important;}
			body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}

			/* iOS BLUE LINKS */
			a[x-apple-data-detectors] {
				color: inherit !important;
				text-decoration: none !important;
				font-size: inherit !important;
				font-family: inherit !important;
				font-weight: inherit !important;
				line-height: inherit !important;
			}

			/* MOBILE STYLES */
			@media screen and (max-width: 525px) {

				/* ALLOWS FOR FLUID TABLES */
				.wrapper {
					width: 100% !important;
					max-width: 100% !important;
				}

				/* ADJUSTS LAYOUT OF LOGO IMAGE */
				.logo img {
					margin: 0 auto !important;
				}

				/* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */
				.mobile-hide {
					display: none !important;
				}

				.img-max {
					max-width: 100% !important;
					width: 100% !important;
					height: auto !important;
				}

				/* FULL-WIDTH TABLES */
				.responsive-table {
					width: 100% !important;
				}

				/* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */
				.padding {
					padding: 10px 5% 15px 5% !important;
				}

				.padding-meta {
					padding: 30px 5% 0px 5% !important;
					text-align: center;
				}

				.padding-copy {
					padding: 10px 5% 10px 5% !important;
					text-align: center;
				}

				.no-padding {
					padding: 0 !important;
				}

				.section-padding {
					padding: 50px 15px 50px 15px !important;
				}

				/* ADJUST BUTTONS ON MOBILE */
				.mobile-button-container {
					margin: 0 auto;
					width: 100% !important;
				}

				.mobile-button {
					padding: 15px !important;
					border: 0 !important;
					font-size: 16px !important;
					display: block !important;
				}

			}

			/* ANDROID CENTER FIX */
			div[style*="margin: 16px 0;"] { margin: 0 !important; }
			</style>
			</head>
			<body style="margin: 0 !important; padding: 0 !important;">

			<!-- HIDDEN PREHEADER TEXT -->
			<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
			Bienvenido
			</div>

			<!-- HEADER -->
			<table border="0" cellpadding="0" cellspacing="0" width="100%">
			<tr bgcolor="#042e62">
			<td>&nbsp;</td>
			</tr>
			<tr>
			<td bgcolor="#ffffff" align="center">
			<!--[if (gte mso 9)|(IE)]>
			<table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
			<tr>
			<td align="center" valign="top" width="500">
			<![endif]-->
			<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">
			<tr>
			<td align="center" valign="top" style="padding: 15px 0;" class="logo">
			
			</a>
			</td>
			</tr>
			</table>
			<!--[if (gte mso 9)|(IE)]>
			</td>
			</tr>
			</table>
			<![endif]-->
			</td>
			</tr>
			<tr>
			<td bgcolor="#ffffff" align="center" style="padding: 15px;">
			<!--[if (gte mso 9)|(IE)]>
			<table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
			<tr>
			<td align="center" valign="top" width="500">
			<![endif]-->
			<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="responsive-table">
			<tr>
			<td>
			<!-- COPY -->
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
			<td align="center" style="font-size: 32px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;" class="padding-copy">Se ha solicitado reestablcer tu clave de acceso '.$lo->nombre.' '.$lo->paterno.' '.$lo->materno.'</td>
			</tr>
			</table>
			</td>
			</tr>
			</table>
			<!--[if (gte mso 9)|(IE)]>
			</td>
			</tr>
			</table>
			<![endif]-->
			</td>
			</tr>

			<tr>
			<td bgcolor="#ffffff" align="center" style="padding: 15px;">
			<!--[if (gte mso 9)|(IE)]>
			<table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
			<tr>
			<td align="center" valign="top" width="500">
			<![endif]-->
			<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="responsive-table">
			<tr>
			<td>
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
			<td>
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
			<td align="left" style="padding: 0 0 0 0; font-size: 14px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: #222; padding-bottom:15px;" class="padding-copy"></td>
			</tr>

			<tr>
			<td align="left" style="padding: 0 0 0 0; font-size: 14px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: #222; padding-bottom:15px; font-weight: bold;" class="padding-copy">Token de recuperación</td>
			</tr>

			<tr>
			<td align="center" style="padding: 10px; font-weight:bold; font-size: 14px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: #222; text-transform:uppercase; background:#eaeaea;" class="padding-copy">'.$token.'</td>
			</tr>

			<tr>
			<!--<td align="center" style="padding: 10px; font-weight:bold; font-size: 14px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: #222; text-transform:uppercase; background:#eaeaea;" class="padding-copy">CONTRASE&Ntilde;A: '.$lo->clave.'</td>-->
			</tr>

			<tr>
			<td align="left" style="padding: 0 0 0 0; font-size: 14px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: #222; text-transform:uppercase; padding-top:15px; padding-bottom:15px;" class="padding-copy"><br><br>
			</td>
			</tr>
			</table>

			</td>
			</tr>
			</table>
			</td>
			</tr>
			</table>
			<!--[if (gte mso 9)|(IE)]>
			</td>
			</tr>
			</table>
			<![endif]-->
			</td>
			</tr>
			</table>
			<!--[if (gte mso 9)|(IE)]>
			</td>
			</tr>
			</table>
			<![endif]-->
			</td>
			</tr>
			<tr>
			<td bgcolor="#ffffff" align="center" style="padding: 20px 0px;">
			<!--[if (gte mso 9)|(IE)]>
			<table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
			<tr>
			<td align="center" valign="top" width="500">
			<![endif]-->
			<!-- UNSUBSCRIBE COPY -->
			<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="max-width: 500px;" class="responsive-table">
			<tr>
			<td align="center" style="font-size: 12px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color:#666666;">
			
			<div style="float:left; width:241px; text-align:center; padding-right: 8px;">
			</div>
			<!--<span style="font-family: Arial, sans-serif; font-size: 12px; float:left; color: #444444;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>-->
			<div style="float:left; width:241px; text-align:center; padding-left:8px;">
			</div>

			<div style="clear:both;"></div>
			<br>

			<!--<a href="http://litmus.com" target="_blank" style="color: #666666; text-decoration: none;">Unsubscribe</a>
			<span style="font-family: Arial, sans-serif; font-size: 12px; color: #444444;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>-->
			<!--<a href="" target="_blank" style="color: #666666; text-decoration: none;">Copyright &copy; 2021,  ISS</a>--->
			</td>
			</tr>
			</table>
			<!--[if (gte mso 9)|(IE)]>
			</td>
			</tr>
			</table>
			<![endif]-->
			</td>
			</tr>
			</table>

			</body>
			</html>';

		$this->mailer->IsSMTP(); 								// telling the class to use SMTP
		try
		{
			$this->mailer->SMTPAuth      = true;               	// enable SMTP authentication
			$this->mailer->SMTPKeepAlive = true;               	// SMTP connection will not close after each email sent
			$this->mailer->Host          = $this->Host; 		// sets the SMTP server
			$this->mailer->Port          = $this->Port;       	// set the SMTP port for the GMAIL server
			$this->mailer->Username      = $this->Username; 	// SMTP account username
			$this->mailer->Password      = $this->Password;    	// SMTP account password
			$this->mailer->SMTPSecure = $this->SMTPSecure;
			$this->mailer->SetFrom($this->remitente, $this->remitente_nombre);
			
			//$mail->AddReplyTo('list@mydomain.com', 'List manager');

			$this->mailer->Subject    = "=?ISO-8859-1?B?".base64_encode(utf8_decode($this->asunto))."=?=";
			$this->mailer->AltBody    = "Para poder visualizar este email es necesario que tengas activo HTML!"; // optional, comment out and test
			$this->mailer->MsgHTML($cuerpo);
			$this->CharSet = 'UTF-8';

			$this->mailer->AddAddress($this->destino,$this->destino_nombre); // CORREO DEL ENCARGADO DE TOMAR LA INFORMACION DE LA PAGINA.
			//$this->mailer->AddAddress("ventas@todoamayoreo.com",$this->destino_nombre); // CORREO DEL ENCARGADO DE TOMAR LA INFORMACION DE LA PAGINA.
			//$this->mailer->AddCC('jlgomeza@gmail.com','jose luis');						  
			//$this->mailer->AddAttachment('clases/emails/revista.pdf');


			//$this->mailer->			
			$this->mailer->Send();

			// Clear all addresses and attachments for next loop
			$this->mailer->ClearAddresses();
			$this->mailer->ClearBCCs();
			$this->mailer->ClearCCs();
			$this->mailer->ClearAttachments();


		}catch (phpmailerException $e) {
				echo $e->errorMessage(); //Pretty error messages from PHPMailer
			} catch (Exception $e) {
				echo $e->getMessage(); //Boring error messages from anything else!
			}	
		}


		public function actualizacioncontra($lo)
		{		
		//$asunto = "ENVIO DE EMAILS";
			$cuerpo = '<!DOCTYPE html>
			<html>
			<head>
			<title>APP PADEL</title>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<style type="text/css">
			/* CLIENT-SPECIFIC STYLES */
			body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
			table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;} /* Remove spacing between tables in Outlook 2007 and up */
			img{-ms-interpolation-mode: bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */

			/* RESET STYLES */
			img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;}
			table{border-collapse: collapse !important;}
			body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}

			/* iOS BLUE LINKS */
			a[x-apple-data-detectors] {
				color: inherit !important;
				text-decoration: none !important;
				font-size: inherit !important;
				font-family: inherit !important;
				font-weight: inherit !important;
				line-height: inherit !important;
			}

			/* MOBILE STYLES */
			@media screen and (max-width: 525px) {

				/* ALLOWS FOR FLUID TABLES */
				.wrapper {
					width: 100% !important;
					max-width: 100% !important;
				}

				/* ADJUSTS LAYOUT OF LOGO IMAGE */
				.logo img {
					margin: 0 auto !important;
				}

				/* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */
				.mobile-hide {
					display: none !important;
				}

				.img-max {
					max-width: 100% !important;
					width: 100% !important;
					height: auto !important;
				}

				/* FULL-WIDTH TABLES */
				.responsive-table {
					width: 100% !important;
				}

				/* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */
				.padding {
					padding: 10px 5% 15px 5% !important;
				}

				.padding-meta {
					padding: 30px 5% 0px 5% !important;
					text-align: center;
				}

				.padding-copy {
					padding: 10px 5% 10px 5% !important;
					text-align: center;
				}

				.no-padding {
					padding: 0 !important;
				}

				.section-padding {
					padding: 50px 15px 50px 15px !important;
				}

				/* ADJUST BUTTONS ON MOBILE */
				.mobile-button-container {
					margin: 0 auto;
					width: 100% !important;
				}

				.mobile-button {
					padding: 15px !important;
					border: 0 !important;
					font-size: 16px !important;
					display: block !important;
				}

			}

			/* ANDROID CENTER FIX */
			div[style*="margin: 16px 0;"] { margin: 0 !important; }
			</style>
			</head>
			<body style="margin: 0 !important; padding: 0 !important;">

			<!-- HIDDEN PREHEADER TEXT -->
			<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
			Bienvenido
			</div>

			<!-- HEADER -->
			<table border="0" cellpadding="0" cellspacing="0" width="100%">
			<tr bgcolor="#042e62">
			<td>&nbsp;</td>
			</tr>
			<tr>
			<td bgcolor="#ffffff" align="center">
			<!--[if (gte mso 9)|(IE)]>
			<table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
			<tr>
			<td align="center" valign="top" width="500">
			<![endif]-->
			<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">
			<tr>
			<td align="center" valign="top" style="padding: 15px 0;" class="logo">
			
			</a>
			</td>
			</tr>
			</table>
			<!--[if (gte mso 9)|(IE)]>
			</td>
			</tr>
			</table>
			<![endif]-->
			</td>
			</tr>
			<tr>
			<td bgcolor="#ffffff" align="center" style="padding: 15px;">
			<!--[if (gte mso 9)|(IE)]>
			<table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
			<tr>
			<td align="center" valign="top" width="500">
			<![endif]-->
			<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="responsive-table">
			<tr>
			<td>
			<!-- COPY -->
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
			<td align="center" style="font-size: 32px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;" class="padding-copy">Cambio exitoso de tu clave de acceso '.$lo->nombre.' '.$lo->paterno.' '.$lo->materno.'</td>
			</tr>
			</table>
			</td>
			</tr>
			</table>
			<!--[if (gte mso 9)|(IE)]>
			</td>
			</tr>
			</table>
			<![endif]-->
			</td>
			</tr>

			<tr>
			<td bgcolor="#ffffff" align="center" style="padding: 15px;">
			<!--[if (gte mso 9)|(IE)]>
			<table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
			<tr>
			<td align="center" valign="top" width="500">
			<![endif]-->
			<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="responsive-table">
			<tr>
			<td>
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
			<td>
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
			<td align="left" style="padding: 0 0 0 0; font-size: 14px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: #222; padding-bottom:15px;" class="padding-copy"></td>
			</tr>

			<tr>
			<td align="left" style="padding: 0 0 0 0; font-size: 14px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: #222; padding-bottom:15px; font-weight: bold;" class="padding-copy">Acceso a tu cuenta</td>
			</tr>

			<tr>
			<td align="center" style="padding: 10px; font-weight:bold; font-size: 14px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: #222;background:#eaeaea;" class="padding-copy">E-mail: '.$lo->usuario.'</td>
			</tr>

			<tr>
			<td align="center" style="padding: 10px; font-weight:bold; font-size: 14px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: #222;background:#eaeaea;" class="padding-copy">Contrase&ntilde;a: '.$lo->clave.'</td>
			</tr>

			<tr>
			<td align="left" style="padding: 0 0 0 0; font-size: 14px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color: #222; text-transform:uppercase; padding-top:15px; padding-bottom:15px;" class="padding-copy"><br><br>
			</td>
			</tr>
			</table>

			</td>
			</tr>
			</table>
			</td>
			</tr>
			</table>
			<!--[if (gte mso 9)|(IE)]>
			</td>
			</tr>
			</table>
			<![endif]-->
			</td>
			</tr>
			</table>
			<!--[if (gte mso 9)|(IE)]>
			</td>
			</tr>
			</table>
			<![endif]-->
			</td>
			</tr>
			<tr>
			<td bgcolor="#ffffff" align="center" style="padding: 20px 0px;">
			<!--[if (gte mso 9)|(IE)]>
			<table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
			<tr>
			<td align="center" valign="top" width="500">
			<![endif]-->
			<!-- UNSUBSCRIBE COPY -->
			<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="max-width: 500px;" class="responsive-table">
			<tr>
			<td align="center" style="font-size: 12px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color:#666666;">
			
			<div style="float:left; width:241px; text-align:center; padding-right: 8px;">
			</div>
			<!--<span style="font-family: Arial, sans-serif; font-size: 12px; float:left; color: #444444;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>-->
			<div style="float:left; width:241px; text-align:center; padding-left:8px;">
			</div>

			<div style="clear:both;"></div>
			<br>

			<!--<a href="http://litmus.com" target="_blank" style="color: #666666; text-decoration: none;">Unsubscribe</a>
			<span style="font-family: Arial, sans-serif; font-size: 12px; color: #444444;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>-->
			<!--<a href="" target="_blank" style="color: #666666; text-decoration: none;">Copyright &copy; 2021,  ISS</a>--->
			</td>
			</tr>
			</table>
			<!--[if (gte mso 9)|(IE)]>
			</td>
			</tr>
			</table>
			<![endif]-->
			</td>
			</tr>
			</table>

			</body>
			</html>';

		$this->mailer->IsSMTP(); 								// telling the class to use SMTP
		try
		{
			$this->mailer->SMTPAuth      = true;               	// enable SMTP authentication
			$this->mailer->SMTPKeepAlive = true;               	// SMTP connection will not close after each email sent
			$this->mailer->Host          = $this->Host; 		// sets the SMTP server
			$this->mailer->Port          = $this->Port;       	// set the SMTP port for the GMAIL server
			$this->mailer->Username      = $this->Username; 	// SMTP account username
			$this->mailer->Password      = $this->Password;    	// SMTP account password
			$this->mailer->SMTPSecure = $this->SMTPSecure;
			$this->mailer->SetFrom($this->remitente, $this->remitente_nombre);
			
			//$mail->AddReplyTo('list@mydomain.com', 'List manager');

			$this->mailer->Subject = "=?ISO-8859-1?B?".base64_encode(utf8_decode($this->asunto))."=?=";
			$this->CharSet = 'UTF-8';
			$this->mailer->AltBody    = "Para poder visualizar este email es necesario que tengas activo HTML!"; // optional, comment out and test
			$this->mailer->MsgHTML($cuerpo);

			$this->mailer->AddAddress($this->destino,$this->destino_nombre); // CORREO DEL ENCARGADO DE TOMAR LA INFORMACION DE LA PAGINA.
			//$this->mailer->AddAddress("ventas@todoamayoreo.com",$this->destino_nombre); // CORREO DEL ENCARGADO DE TOMAR LA INFORMACION DE LA PAGINA.
			//$this->mailer->AddCC('jlgomeza@gmail.com','jose luis');						  
			//$this->mailer->AddAttachment('clases/emails/revista.pdf');


			//$this->mailer->			
			$this->mailer->Send();

			// Clear all addresses and attachments for next loop
			$this->mailer->ClearAddresses();
			$this->mailer->ClearBCCs();
			$this->mailer->ClearCCs();
			$this->mailer->ClearAttachments();


		}catch (phpmailerException $e) {
				echo $e->errorMessage(); //Pretty error messages from PHPMailer
			} catch (Exception $e) {
				echo $e->getMessage(); //Boring error messages from anything else!
			}	
		}


	}
	?>