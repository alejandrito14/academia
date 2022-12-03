<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Calificacion.php");

//require_once("clases/class.MovimientoBitacora.php");
/*require_once("clases/class.Sms.php");
require_once("clases/class.phpmailer.php");
require_once("clases/emails/class.Emails.php");*/

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Servicios();
	$f=new Funciones();
	$asignar = new ServiciosAsignados();
	$fechas=new Fechas();
	$calificacion = new Calificacion();
	$calificacion->db=$db;
	//Enviamos la conexion a la clase
	$lo->db = $db;
	$asignar->db=$db;
	$lo->idservicio=$_POST['idservicio'];
	$asignar->idservicio=$lo->idservicio;
	$calificacion->idservicio=$lo->idservicio;

	$habilitarcancelacion=0;

	
	$obtenerservicio=$lo->ObtenerServicio();
	$opiniones=$asignar->ObtenerOpinionesServicio();
	$obtenercalificacion=$calificacion->ObtenerCalificacionesServicio();

	if ($obtenerservicio[0]->asignadoadmin==1) {
			$habilitarcancelacion=1;
		}

	if ($habilitarcancelacion==1) {
		$fechaactual=date('Y-m-d');
		$obtenerperiodos=$lo->FechadentrodePeriodos($fechaactual);

		if (count($obtenerperiodos)>0) {
			$habilitarcancelacion=1;
		}else{
			$habilitarcancelacion=0;
		}

	}

		$asignar->idservicio=$obtenerservicio[0]->idservicio;
	$arreglohorarios=array();
	
	$obtenerhorarios1=$asignar->ObtenerHorariosServicio();
		$obtenerhorarios=$asignar->ObtenerHorariosProximo();


		if (count($obtenerhorarios)>0) {
			
		
		$diasemana=$fechas->diaarreglocorto($obtenerhorarios[0]->dia);


		$horainicio1=date('H:i:s',strtotime($obtenerhorarios[0]->horainicial));
		$horafinal1=date('H:i:s',strtotime($obtenerhorarios[0]->horafinal));


		$horainicio=date('H:i',strtotime($obtenerhorarios[0]->horainicial));

		$horafinal=date('H:i',strtotime($obtenerhorarios[0]->horafinal));

		$fecha=$obtenerhorarios[0]->fecha;
		$dianumero=explode('-', $fecha);


		$obtenerservicio[0]->fechaproxima=$diasemana.' '.$dianumero[2].'/'.$fechas->mesesAnho3[$fechas->mesdelano($fecha)-1];
		$obtenerservicio[0]->horainicial=$horainicio;
		$obtenerservicio[0]->horafinal=$horafinal;
		$diasemananumero=$obtenerhorarios[0]->dia;
		$dia=date('w');
		$horaactual=date('H:i:s');

		$obtenerservicio[0]->fechacompleta=$obtenerhorarios[0]->dia.'|'.$fecha.'|'.$horainicio.'|'.$horafinal;

			}
			else{

			$obtenerservicio[0]->horainicial="";
			$obtenerservicio[0]->horafinal="";
			$obtenerservicio[0]->fechaproxima="";
			}


	$respuesta['opiniones']=$opiniones;
	$respuesta['calificacion']=$obtenercalificacion;
	$respuesta['respuesta']=$obtenerservicio;
	$respuesta['habilitarcancelacion']=$habilitarcancelacion;
	$respuesta['horarios']=$obtenerhorarios1;
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