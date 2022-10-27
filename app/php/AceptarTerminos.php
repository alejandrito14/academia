<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Pagos.php");
require_once("clases/class.Invitacion.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.NotificacionPush.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$servicios = new Servicios();
	$servicios->db=$db;
	$f=new Funciones();
	$pagos= new Pagos();
	$pagos->db=$db;
	$invitacion=new Invitacion();
	$invitacion->db=$db;
	$usuarios=new Usuarios();
	$usuarios->db=$db;
	$notificaciones=new NotificacionPush();
	$notificaciones->db=$db;
	$db->begin();

	//Enviamos la conexion a la clase
	$lo->db = $db;

	$lo->idusuarios_servicios=$_POST['idusuarios_servicios'];
	$lo->GuardarAceptacion();


	$obtenerservicioasignado=$lo->ObtenerServicioAsignado();

	$idservicio=$obtenerservicioasignado[0]->idservicio;
	$idusuarios=$obtenerservicioasignado[0]->idusuarios;
	$invitacion->idservicio=$idservicio;
	$invitacion->idusuarioinvitado=$idusuarios;
	$invitacion->ActualizarInvitacion();

	$servicios->idservicio=$idservicio;
	$obtenerservicio=$servicios->ObtenerServicio();

	$modalidad=$obtenerservicio[0]->modalidad;
	$costo=$obtenerservicio[0]->precio;
	if ($modalidad==1) {
		
		$montoapagar=$costo;

	}

	if ($modalidad==2) {
		//grupo
		$obtenerparticipantes=$servicios->ObtenerParticipantes(3);
		$cantidadparticipantes=count($obtenerparticipantes);
		$costo=$obtenerservicio[0]->precio;

		$obtenerhorarios=$servicios->ObtenerHorariosSemana();

		$monto=$costo*count($obtenerhorarios);

		$montoapagar=$monto/$cantidadparticipantes;

	}

	if ($costo>0) {

		$obtenerperiodos=$servicios->ObtenerPeriodosPagos();

		$numeroperiodos=count($obtenerperiodos);
		$montoapagar=$montoapagar/$numeroperiodos;


		for ($i=0; $i < count($obtenerperiodos); $i++) { 

			$pagos->idusuarios=$idusuarios;
			$pagos->idmembresia=0;
			$pagos->idservicio=$idservicio;
			$pagos->tipo=1;
			$pagos->monto=$montoapagar;
			$pagos->estatus=0;
			$pagos->dividido=$modalidad;
			$pagos->fechainicial=$obtenerperiodos[$i]->fechainicial;
			$pagos->fechafinal=$obtenerperiodos[$i]->fechafinal;
			$pagos->concepto=$obtenerservicio[0]->titulo;
			$contador=$lo->ActualizarConsecutivo();
   		    $fecha = explode('-', date('d-m-Y'));
		    $anio = substr($fecha[2], 2, 4);
   			$folio = $fecha[0].$fecha[1].$anio.$contador;
   			
			$pagos->folio=$folio;
			$pagos->CrearRegistroPago();

		}
	}

	
	$usuarios->idusuarios=$idusuarios;
	$obtenerusuario=$usuarios->ObtenerUsuario();
	$nombrequienacepta=$obtenerusuario[0]->nombre." ".$obtenerusuario[0]->paterno;
	$obtenerInvitacion=$invitacion->ObtenerInvitado();
if (count($obtenerInvitacion)>0) {
	$idusuarioinvita=$obtenerInvitacion[0]->idusuarioinvita;

	$notificaciones->idusuario=$idusuarioinvita;
	$obtenertokenusuario=$notificaciones->Obtenertoken();
	$arraytokens=array();
	for ($i=0; $i < count($obtenertokenusuario); $i++) { 
			if ($obtenertokenusuario[$i]->token!=null) {
				# code...
			
				$dato=array('idusuario'=>$idusuarioinvita,'token'=>$obtenertokenusuario[$i]->token);

					array_push($arraytokens,$dato);
				}
		}

		
	$titulonotificacion=$nombrequienacepta." acepto la asignacion al servicio ".$obtenerservicio[0]->titulo;

	$texto='|Aceptó la asignación|'.$obtenerservicio[0]->titulo.'|'.$nombrequienacepta;
	$estatus=0;
	$ruta="";
	$valor="";

	
		$notificaciones->AgregarNotifcacionaUsuarios($idusuarioinvita,$texto,$ruta,$valor,$estatus);
	}
	

		
				

	$db->commit();

	if (count($arraytokens)>0) {
			$texto='';
			for ($i=0; $i <count($arraytokens) ; $i++) { 

				//if ($arraytokens[$i]!='') {
					# code...
				
			 $idusuario=$arraytokens[$i]['idusuario'];
			
			 $notificaciones->idcliente=$idusuario;
			 $notificaciones->valor='';
			 $array=array();
			 array_push($array,$arraytokens[$i]['token']);
			$notificaciones->EnviarNotificacion($array,$texto,$titulonotificacion);
				//}

			}
		}
	

	$respuesta['respuesta']=1;

	//Retornamos en formato JSON 
	$myJSON = json_encode($respuesta);
	echo $myJSON;

}catch(Exception $e){
	$db->rollback();
	//echo "Error. ".$e;
	
	$array->resultado = "Error: ".$e;
	$array->msg = "Error al ejecutar el php";
	$array->id = '0';
		//Retornamos en formato JSON 
	$myJSON = json_encode($array);
	echo $myJSON;
}
?>