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
require_once("clases/class.Encuesta.php");
require_once("clases/class.Calificacion.php");
require_once("clases/class.PoliticasAceptacion.php");


try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$f=new Funciones();
	$fechas=new Fechas();
	$invitacion=new Invitacion();
	$servicios=new Servicios();
	$encuesta=new Encuesta();
	$encuesta->db=$db;
	$calificacion = new Calificacion();
	$calificacion->db=$db;
	$politicas=new PoliticasAceptacion();
	$politicas->db=$db;

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$invitacion->db=$db;
	$servicios->db=$db;
	$lo->idusuarios_servicios=$_POST['idusuarios_servicios'];
	$id_user=$_POST['id_user'];
	$idtipousuario=$_POST['idtipousuario'];
	$obtenerservicio=$lo->ObtenerServicioAsignado();
	$lo->idservicio=$obtenerservicio[0]->idservicio;
	$servicios->idservicio=$lo->idservicio;
	$encuesta->idservicio=$lo->idservicio;
	$calificacion->idservicio=$lo->idservicio;
	$calificacion->idusuario=$id_user;
	$obtenerpolitica=array();
	if ($obtenerservicio[0]->idpoliticaaceptacion>0) {
			$politicas->idpoliticaaceptacion=$obtenerservicio[0]->idpoliticaaceptacion;
		$obtenerpolitica=$politicas->ObtenerPoliticaaceptacion();
	}



	$obtenercalificacion=$calificacion->ObtenerCalificacion();
	$invitado=0;
	$puedeinvitar=0;
	$obtenerinvitaciones=array();
	$habilitarcancelacion=0;
	if ($idtipousuario==3) {


		if ($obtenerservicio[0]->asignadocliente==1) {
			$habilitarcancelacion=1;
		}

		$invitacion->idusuarioinvitado=$obtenerservicio[0]->idusuarios;
		$invitacion->idservicio=$lo->idservicio;
		$esinvitado=$invitacion->ObtenerInvitado();

		if (count($esinvitado)>0) {
			$invitado=1;
		}


		if ($obtenerservicio[0]->ligarcliente==1) {
			# code...
		
		$invitacion->idusuarioinvita=$obtenerservicio[0]->idusuarios;
		$obtenerinvitaciones=$invitacion->ObtenerInvitaciones();
		//echo $obtenerservicio[0]->numligarclientes.''.count($obtenerinvitaciones);

			if (count($obtenerinvitaciones) == $obtenerservicio[0]->numligarclientes) {
					$puedeinvitar=1;
				}else{

					$puedeinvitar=0;
				}

			}


	}

	if ($idtipousuario==0) {

		if ($obtenerservicio[0]->asignadoadmin==1) {
			$habilitarcancelacion=1;
		}
	}

	if ($idtipousuario==5) {

		if ($obtenerservicio[0]->asignadocoach==1) {
			$habilitarcancelacion=1;
		}
	}


	if ($habilitarcancelacion==1) {
		$fechaactual=date('Y-m-d');
		$obtenerperiodos=$servicios->FechadentrodePeriodos($fechaactual);

		if (count($obtenerperiodos)>0) {
			$habilitarcancelacion=1;
		}else{
			$habilitarcancelacion=0;
		}

	}

	
	$obtenerhorarios1=$lo->ObtenerHorariosServicio();
	$arreglohorarios=array();

	

		$obtenerhorarios=$lo->ObtenerHorariosProximo();


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

	$opiniones=$lo->ObtenerOpinionesServicio();

	if ($idtipousuario==3) {
		$evaluaciones=$lo->ObtenerEvaluacionesServicio();
	}
	
	if ($idtipousuario==5) {
		$lo->idusuario=0;
		$evaluaciones=$lo->obtenerUsuariosServiciosAlumnosAsignados();

	}



	$respuesta['respuesta']=$obtenerservicio[0];
	$respuesta['horarios']=$obtenerhorarios1;
	$respuesta['invitado']=$invitado;
	$respuesta['invitados']=$obtenerinvitaciones;
	$respuesta['puedeinvitar']=$puedeinvitar;
	$respuesta['habilitarcancelacion']=$habilitarcancelacion;
	$respuesta['opiniones']=$opiniones;
	$respuesta['evaluaciones']=$evaluaciones;
	$respuesta['calificacion']=$obtenercalificacion;
	$respuesta['politicaaceptacion']=$obtenerpolitica;
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