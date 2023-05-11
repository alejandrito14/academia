<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Espacios.php");
require_once("clases/class.Calificacion.php");
require_once("clases/class.Comentarios.php");
require_once("clases/class.Chat.php");
require_once("clases/class.Fechas.php");

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
	$asignados = new ServiciosAsignados();
	$asignados->db = $db;
	$fechas=new Fechas();
	$espacios = new Espacios();
	$calificacion=new Calificacion();
	$comentarios=new Comentarios();
	$salachat=new Chat();

	$espacios->db = $db;
	$calificacion->db=$db;
	$comentarios->db=$db;
	$salachat->db=$db;


	//Enviamos la conexion a la clase
	$lo->db = $db;
	$iduser=$_POST['id_user'];
	$asignados->idusuario=$iduser;
	/*$obtenerservicios=$asignados->obtenerServiciosAsignadosAgrupados();*/

	$serviciosasignados='';
	$lo->idusuarios=$iduser;
	$obtenerserviciosActivos=$lo->ObtenerServiciosporvalidarAdmin($serviciosasignados);
	
	$fechaactual=date('Y-m-d');
	for ($i=0; $i <count($obtenerserviciosActivos) ; $i++) { 
			$fechainicial=date('Y-m-d',strtotime($obtenerserviciosActivos[$i]->fechainicial));
			$fechafinal=date('Y-m-d',strtotime($obtenerserviciosActivos[$i]->fechafinal));
		
		$obtenerserviciosActivos[$i]->disponible=1;

		if ($fechaactual>=$fechainicial && $fechaactual<=$fechafinal) {
			$obtenerserviciosActivos[$i]->disponible=0;
		}

		$obtenerserviciosActivos[$i]->fechai=date('d/m/Y',strtotime($obtenerserviciosActivos[$i]->fechainicial));
		$obtenerserviciosActivos[$i]->fechaf=date('d/m/Y',strtotime($obtenerserviciosActivos[$i]->fechafinal));


		$asignados->idservicio=$obtenerserviciosActivos[$i]->idservicio;
		
	 	$obtenerhorarios=$asignados->ObtenerHorariosProximo();
	 	$participantes=$asignados->obtenerUsuariosServiciosAlumnosAsignados();
		$obtenerserviciosActivos[$i]->cantidadalumnos=count($participantes);
		$porpasar=1;

		$obtenerserviciosActivos[$i]->idzona='';
		$obtenerserviciosActivos[$i]->zonanombre='';
		$obtenerserviciosActivos[$i]->zonacolor='';
		$obtenerserviciosActivos[$i]->fechahora='';
		$obtenerserviciosActivos[$i]->horainicial='';
		$obtenerserviciosActivos[$i]->horafinal='';

		if (count($obtenerhorarios)==0) {
			
		//horarios pasados
		$obtenerhorarios=$asignados->ObtenerHorariosOrdenados();


		$porpasar=0;
		}


if (count($obtenerhorarios)>0) {

		$diasemana=$fechas->diaarreglocorto($obtenerhorarios[0]->dia);


		$horainicio1=date('H:i:s',strtotime($obtenerhorarios[0]->horainicial));
		$horafinal1=date('H:i:s',strtotime($obtenerhorarios[0]->horafinal));




		$horainicio=date('H:i',strtotime($obtenerhorarios[0]->horainicial));

		$horafinal=date('H:i',strtotime($obtenerhorarios[0]->horafinal));

		$fecha=$obtenerhorarios[0]->fecha;
		$dianumero=explode('-', $fecha);


		$obtenerserviciosActivos[$i]->fechaproxima=$diasemana.' '.$dianumero[2].'/'.$fechas->mesesAnho3[$fechas->mesdelano($fecha)-1];
		$obtenerserviciosActivos[$i]->horainicial=$horainicio;
		$obtenerserviciosActivos[$i]->horafinal=$horafinal;
		$diasemananumero=$obtenerhorarios[0]->dia;
		$dia=date('w');
		$horaactual=date('H:i:s');

		$idzona=$obtenerhorarios[0]->idzona;
		
		$espacios->idespacio=$idzona;
		$zona=$espacios->buscarEspacio();
		$rowzona=$db->fetch_assoc($zona);
	
		$obtenerserviciosActivos[$i]->idzona=$rowzona['idzona'];
		$obtenerserviciosActivos[$i]->zonanombre=$rowzona['nombre'];
		$obtenerserviciosActivos[$i]->zonacolor=$rowzona['color'];
		$obtenerserviciosActivos[$i]->fechahora=$fecha.' '.$obtenerhorarios[0]->horainicial;
		$obtenerserviciosActivos[$i]->porpasar=$porpasar;

	}

		$calificacion->idservicio=$asignados->idservicio;
		$obtenercalificacion=$calificacion->ObtenerCalificacion();

		$obtenerserviciosActivos[$i]->concalificacion=0;
		if (count($obtenercalificacion)>0) {
			$obtenerserviciosActivos[$i]->concalificacion=1;
		}
		$comentarios->idservicio=$asignados->idservicio;
		$obtenercomentarios=$comentarios->ObtenerComentariosServicio();
		$obtenerserviciosActivos[$i]->concomentarios=0;
		if(count($obtenercomentarios)>0) {
			$obtenerserviciosActivos[$i]->concomentarios=1;
		}

		$salachat->idservicio=$asignados->idservicio;
		
		$obtenersala=$salachat->ObtenerSalaChatServicio();

		$obtenerserviciosActivos[$i]->conchat=0;
		if(count($obtenersala)>0) {
			$obtenerserviciosActivos[$i]->conchat=1;
		}


		$lo->idservicio=$asignados->idservicio;
		$obtenescoachesServicios=$lo->ObtenerParticipantesCoach(5);


		$obtenerserviciosActivos[$i]->coaches=$obtenescoachesServicios;


		$obtenerserviciosActivos[$i]->fechacreacion=date('d/m/Y H:i:s',strtotime($obtenerserviciosActivos[$i]->fechacreacion));
	}

	usort($obtenerserviciosActivos, function ($a, $b) {
    return strcmp($b->fechahora,$a->fechahora);
	});


	$fechaactual=date('Y-m-d');

	//$diasemana=$fechas->saber_dia($fechaactual);
	$dianumero=explode('-',$fechaactual);
	$fechaactual=$dianumero[2].'/'.$fechas->mesesAnho3[$fechas->mesdelano($fechaactual)-1].' '.$dianumero[0];

	$respuesta['fechaactual']=$fechaactual;


	$respuesta['respuesta']=$obtenerserviciosActivos;
	
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