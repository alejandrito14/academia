<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.NotificacionPush.php");


	$notificaciones=new NotificacionPush();

	$array=array();
	$token="dKp9pwofQ56jCIa814drDv:APA91bE5Htr3ry0LOjNdcF67wz_klLEp9jtotToEglJ9zya_lPeiS0c4dzbf2mLXmmPC1HlRCMZ86i1DBP7Ri_ScokFFf8-xhvRw9oj95ZYY-eYlSRoBxvSHdvcMBqefG9OCsQ6-BJ6P";
	 array_push($array,$token);
	 $titulonotificacion="Notificación de asignación";
	 $texto="";
	$notificaciones->EnviarNotificacion($array,$texto,$titulonotificacion);
				

 ?>