<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Espacios.php");
require_once("clases/class.Calificacion.php");
require_once("clases/class.Comentarios.php");
require_once("clases/class.Chat.php");

//require_once("clases/class.MovimientoBitacora.php");
/*require_once("clases/class.Sms.php");
require_once("clases/class.phpmailer.php");
require_once("clases/emails/class.Emails.php");*/

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$f=new Funciones();
	$fechas=new Fechas();
	$espacios=new Espacios();
	$calificacion=new Calificacion();
	$comentarios=new Comentarios();
	$salachat=new Chat();

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$espacios->db=$db;
	$calificacion->db=$db;
	$comentarios->db=$db;
	$salachat->db=$db;
	$idusuario=$_POST['idusuario'];
	$calificacion->idusuario=$idusuario;
	$lo->idusuario=$idusuario;
	$obtenerservicios=$lo->obtenerServiciosAsignados();

	for ($i=0; $i <count($obtenerservicios) ; $i++) { 
		
		$lo->idservicio=$obtenerservicios[$i]->idservicio;
	
	 	$obtenerhorarios=$lo->ObtenerHorariosProximo();
	 	$participantes=$lo->obtenerUsuariosServiciosAlumnosAsignados();
		$obtenerservicios[$i]->cantidadalumnos=count($participantes);
		$porpasar=1;

		if (count($obtenerhorarios)==0) {
			
		//horarios pasados
		$obtenerhorarios=$lo->ObtenerHorariosOrdenados();
		$porpasar=0;
		}

		$diasemana=$fechas->diaarreglocorto($obtenerhorarios[0]->dia);


		$horainicio1=date('H:i:s',strtotime($obtenerhorarios[0]->horainicial));
		$horafinal1=date('H:i:s',strtotime($obtenerhorarios[0]->horafinal));




		$horainicio=date('H:i',strtotime($obtenerhorarios[0]->horainicial));

		$horafinal=date('H:i',strtotime($obtenerhorarios[0]->horafinal));

		$fecha=$obtenerhorarios[0]->fecha;
		$dianumero=explode('-', $fecha);


		$obtenerservicios[$i]->fechaproxima=$diasemana.' '.$dianumero[2].'/'.$fechas->mesesAnho3[$fechas->mesdelano($fecha)-1];
		$obtenerservicios[$i]->horainicial=$horainicio;
		$obtenerservicios[$i]->horafinal=$horafinal;
		$diasemananumero=$obtenerhorarios[0]->dia;
		$dia=date('w');
		$horaactual=date('H:i:s');


		$idzona=$obtenerhorarios[0]->idzona;
		$espacios->idespacio=$idzona;
		$zona=$espacios->buscarEspacio();
		$rowzona=$db->fetch_assoc($zona);
	
		$obtenerservicios[$i]->idzona=$rowzona['idzona'];
		$obtenerservicios[$i]->zonanombre=$rowzona['nombre'];
		$obtenerservicios[$i]->zonacolor=$rowzona['color'];
		$obtenerservicios[$i]->fechahora=$fecha.' '.$obtenerhorarios[0]->horainicial;
		$obtenerservicios[$i]->porpasar=$porpasar;


		$calificacion->idservicio=$lo->idservicio;
		$obtenercalificacion=$calificacion->ObtenerCalificacion();

		$obtenerservicios[$i]->concalificacion=0;
		if (count($obtenercalificacion)>0) {
			$obtenerservicios[$i]->concalificacion=1;
		}
		$comentarios->idservicio=$lo->idservicio;
		$obtenercomentarios=$comentarios->ObtenerComentariosServicio();
		$obtenerservicios[$i]->concomentarios=0;
		if(count($obtenercomentarios)>0) {
			$obtenerservicios[$i]->concomentarios=1;
		}

		$salachat->idservicio=$lo->idservicio;
		
		$obtenersala=$salachat->ObtenerSalaChatServicio();

		$obtenerservicios[$i]->conchat=0;
		if(count($obtenersala)>0) {
			$obtenerservicios[$i]->conchat=1;
		}


	}


	usort($obtenerservicios, function ($a, $b) {
    return strcmp($b->fechahora,$a->fechahora);
	});


	$fechaactual=date('Y-m-d');

	//$diasemana=$fechas->saber_dia($fechaactual);
	$dianumero=explode('-',$fechaactual);
	$fechaactual=$dianumero[2].'/'.$fechas->mesesAnho3[$fechas->mesdelano($fechaactual)-1].' '.$dianumero[0];


	$respuesta['respuesta']=$obtenerservicios;
	$respuesta['fechaactual']=$fechaactual;
	
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