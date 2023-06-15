<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Membresia.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Tareas.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.NotificacionPush.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.PagConfig.php");
require_once("clases/class.ServiciosAsignados.php");


try
{
	$db = new MySQL();

	$pagina=new PagConfig();
	$pagina->db=$db;
	$servicios=new Servicios();
	$servicios->db=$db;
	$serviciosasignados=new ServiciosAsignados();
	$serviciosasignados->db=$db;

	$obtenerconfi=$pagina->ObtenerInformacionConfiguracion();

	$fecha=date('Y-m-d H:i');
	$croncancelacionautomatica=$obtenerconfi['croncancelacionautomatica'];
	$horascancelacion=$obtenerconfi['horascancelacion'];
	 $sumafecha  = (new DateTime($fecha))->modify('+'.$horascancelacion.' hours');
	$fechaconsulta=$sumafecha->format('Y-m-d H:i');


	if ($croncancelacionautomatica==1) {
		
		$servicios->fecha=$fechaconsulta;
		$obtenerservicios=$servicios->ServiciosCron();

		if (count($obtenerservicios)>0) {
			for ($i=0; $i < count($obtenerservicios); $i++) { 
				

				$servicios->idservicio=$obtenerservicios[$i]->idservicio;
				$id_user=0;
				$motivocancelacion='cancelación automática';
				$obtenerhorarios=$servicios->ObtenerHorariosSemana();

					for ($j=0; $j <count($obtenerhorarios); $j++) {

						$idhorariosservicio=$obtenerhorarios[$j]->idhorarioservicio;
						$servicios->EliminarHorarioServicio($idhorariosservicio);
					}
					$servicios->motivocancelacion=$motivocancelacion;
					$servicios->fechacancelacion=date('Y-m-d H:i:s');
					$servicios->usuariocancela=$id_user;
					$servicios->GuardarCancelacion();


					$obteneralumnos=$serviciosasignados->obtenerUsuariosServiciosAlumnosAsignados();


					for ($k=0; $k < count($obteneralumnos); $k++) { 
						
						$serviciosasignados->idusuario=$obteneralumnos[$k]->idusuario;
						
						$serviciosasignados->GuardarCancelacion();

					}


				
			}
		}


	}



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