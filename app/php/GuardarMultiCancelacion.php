<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Invitacion.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.NotificacionPush.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$f=new Funciones();
	$servicios=new Servicios();
	$usuarios=new Usuarios();
	$notificaciones=new NotificacionPush();
	
	//Enviamos la conexion a la clase
	$lo->db = $db;
	$servicios->db=$db;
	$notificaciones->db=$db;
	$usuarios->db=$db;
	$idusuarioscancelacion=$_POST['idusuarioscancela'];
	$id_user=$_POST['id_user'];
	$lo->idservicio=$_POST['idservicio'];
	$obtenerregistrosacancelar=$lo->ObtenerUsuariosServiciosaCancelar($idusuarioscancelacion);

	$servicios->idservicio=$lo->idservicio;
	$obtenerservicio=$servicios->ObtenerServicio();

	$arraytokens=array();
	for ($i=0; $i < count($obtenerregistrosacancelar); $i++) { 
			$lo->idusuarios_servicios=$obtenerregistrosacancelar[$i]->idusuarios_servicios;
			$lo->CancelarServicio();

		if ($obtenerservicio[0]->reembolso==1) {
			$lo->idusuarios=$obtenerregistrosacancelar[$i]->idusuarios;
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


		$usuarios->idusuarios = $obtenerregistrosacancelar[$i]->idusuarios;
		$row_cliente = $usuarios->ObtenerUsuario();
		$id_user=$usuarios->idusuarios;
		
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

		}


		$notificaciones->idusuario=$usuarios->idusuarios;
		$obtenertokenusuario=$notificaciones->Obtenertoken();
		array_push($arraytokens,$obtenertokenusuario[0]->token);

	}


	if (count($arraytokens)>0) {

		$texto='';
		$titulonotificacion="Cancelacion de servicio ".$obtenerservicio[0]->titulo;
		$notificaciones->EnviarNotificacion($arraytokens,$texto,$titulonotificacion);

		}

		

	$respuesta['respuesta']=1;

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