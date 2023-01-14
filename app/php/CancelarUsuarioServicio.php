<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Invitacion.php");
//require_once("clases/class.Monedero.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.NotificacionPush.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$f=new Funciones();
	$usuarios=new Usuarios();
	$servicios=new Servicios();
	$servicios->db=$db;
	$usuarios->db=$db;
	$notificaciones=new NotificacionPush();
	$notificaciones->db=$db;
	$db->begin();
	//Enviamos la conexion a la clase
	$lo->db = $db;
	$invitacion->db=$db;
	
	$id_user=$_POST['idusuarios'];
	$idtipousuario=$_POST['idtipousuario'];
	$lo->idservicio=$_POST['idservicio'];
	$lo->idusuario=$id_user;

	$lo->CancelarServicioUsuario();
	$servicios->idservicio=$lo->idservicio;
	$obtener=$servicios->ObtenerServicio();
	$arraytokens=array();
	
	/*if ($obtener[0]->reembolso==1) {
		$lo->idusuarios=$id_user;
		$obtenerpago=$lo->ObtenerUltimopago();

		if (count($obtenerpago)>0) {
			# code...
			$total=$obtenerpago[0]->monto;
			
		    $cantidadreembolso=$obtenerservicio[0]->cantidadreembolso;
			if ($obtenerservicio[0]->tiporeembolso==0) {
				$montomonedero=($total*$cantidadreembolso)/100;

				}

			if ($obtenerservicio[0]->tiporeembolso==1) {
				$montomonedero=$cantidadreembolso;
			}


		$usuarios->idusuarios = $id_user;
		$row_cliente = $usuarios->ObtenerUsuario();
		$saldo_anterior = $row_cliente[0]->monedero;
		
		//Calculamos nuevo saldo
		$nuevo_saldo = $saldo_anterior + $montomonedero;
		$sql = "UPDATE usuarios SET monedero = '$nuevo_saldo' WHERE idusuarios = '$id_user'";
		
		$db->consulta($sql);
		//Guardamos el movimiento en tabla cliente_monedero
		$tipo=0;
		$concepto="Reembolso";
		$sql_movimiento = "INSERT INTO monedero (idusuarios,monto,modalidad,tipo,saldo_ant,saldo_act,concepto) VALUES ('$id_user','$montomonedero','2','$tipo','$saldo_anterior','$nuevo_saldo','$concepto');";
		
		$db->consulta($sql_movimiento);



		}

	}*/


	// 		$idusuario=$obtenerservicio[0]->idusuario;
	// 		$ruta="";
	// 		$texto='|Cancelacion de servicio|'.$obtener[0]->titulo.'|';
	// 		$estatus=0;
	// 		$valor="";
	// 		$notificaciones->AgregarNotifcacionaUsuarios($idusuario,$texto,$ruta,$valor,$estatus);

	// if (count($arraytokens)>0) {
	// 		$texto='';
	// 		$titulonotificacion="Cancelacion de servicio ".$obtener[0]->titulo;
	// 		$notificaciones->EnviarNotificacion($arraytokens,$texto,$titulonotificacion);
	// 	}

    $db->commit();

	$respuesta['respuesta']=1;

	$myJSON = json_encode($respuesta);
	echo $myJSON;

}catch(Exception $e){
	//echo "Error. ".$e;
	$db->rollback();
	$array->resultado = "Error: ".$e;
	$array->msg = "Error al ejecutar el php";
	$array->id = '0';
		//Retornamos en formato JSON 
	$myJSON = json_encode($array);
	echo $myJSON;
}
?>