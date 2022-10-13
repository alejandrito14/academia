<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Invitacion.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$f=new Funciones();
	$fechas=new Fechas();
	$invitacion=new Invitacion();
	//Enviamos la conexion a la clase
	$lo->db = $db;
	$invitacion->db=$db;
	$lo->idusuarios_servicios=$_POST['idusuarios_servicios'];
	$id_user=$_POST['id_user'];
	$idtipousuario=$_POST['idtipousuario'];
	$obtenerservicio=$lo->ObtenerServicioAsignado();
	$lo->idservicio=$obtenerservicio[0]->idservicio;

	$invitado=0;
	$puedeinvitar=0;
	$obtenerinvitaciones=array();
	if ($idtipousuario==3) {
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

	
	$obtenerhorarios=$lo->ObtenerHorariosServicio();
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


	$respuesta['respuesta']=$obtenerservicio[0];
	$respuesta['horarios']=$arreglohorarios;
	$respuesta['invitado']=$invitado;
	$respuesta['invitados']=$obtenerinvitaciones;
	$respuesta['puedeinvitar']=$puedeinvitar;
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