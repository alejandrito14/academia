<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

//Importamos las clases que vamos a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.HorariosServicios.php");
require_once("clases/class.Categorias.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.CategoriasServicios.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Zonas.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.TiposervicioConfiguracion.php");
require_once("clases/class.NotificacionPush.php");

require_once("clases/class.Usuarios.php");
/*require_once("clases/class.ServiciosAsignados.php");
*/
try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$fechas=new Fechas();
	$categorias=new Categorias();
	$categorias->db=$db;
	$horariosServicios=new HorariosServicios();
	$horariosServicios->db=$db;
	$tiposervicioconfiguracion=new TiposervicioConfiguracion();
	$tiposervicioconfiguracion->db=$db;
	$notificaciones=new NotificacionPush();
	$notificaciones->db=$db;
	$usuarios=new Usuarios();
	$usuarios->db=$db;
	$arraytokens=array();
	$db->begin();

	/*$serviciosasignados=new ServiciosAsignados();
	$serviciosasignados->db=$db;*/
	$id=$_POST['id'];

	$costo=explode('$',$_POST['costo']);
	$v_titulo=$_POST['v_titulo'];
	$idsubsubcategoria=$_POST['idsubsubcategoria'];
	$v_dias=explode(',',$_POST['v_dias']);
	$v_horarios=$_POST['v_horarios'];
	$v_fechainicial=$_POST['v_fechainicial'];
	$v_fechafinal=$_POST['v_fechafinal'];
	$idsubcategoria=$_POST['idsubcategoria'];
	$idtiposervicioconfiguracion=$_POST['idtiposervicioconfiguracion'];
	$idusuarios=$_POST['iduser'];
	$estatus=$_POST['estatus'];
	$tipousuario=$_POST['tipousuario'];
	$arraycoachelegidos=json_decode($_POST['arraycoachelegidos']);
	$servicios=new Servicios();
	$servicios->db=$db;

	$obtener=$servicios->ObtenerUltimoOrdenservicio();
	$roworden=$db->fetch_assoc($obtener);
	$num=$db->num_rows($obtener);
	$orden=$roworden['ordenar']+1;
	$servicios->idusuarios=$idusuarios;

	$servicios->costo=$costo[1];
	$servicios->titulo=$v_titulo;
	$servicios->idcategoriaservicio=$idsubcategoria;
	$servicios->fechainicial=$v_fechainicial;
	$servicios->fechafinal=$v_fechafinal;
	$servicios->idcategoria=$idsubsubcategoria;

	
	$servicios->idtiposervicioconfiguracion=$idtiposervicioconfiguracion;
	$servicios->estatus=$estatus;
	$lunes=0;
	$martes=0;
	$miercoles=0;
	$jueves=0;
	$viernes=0;
	$sabado=0;
	$domingo=0;

	$validaradmin=1;

		$nombrequienagrega="";
	if ($tipousuario==5) {
		$porcentajescoachs=array();
		$servicios->validaradmin=0;
		$usuarios->idusuarios=$servicios->idusuarios;
		$obtenerusuario=$usuarios->ObtenerUsuario();
		
		$nombrequienagrega="Coach: ".$obtenerusuario[0]->nombre." ".$obtenerusuario[0]->paterno;
	}

	if ($tipousuario==0) {
	
		$usuarios->idusuarios=$servicios->idusuarios;
		$obtenerusuario=$usuarios->ObtenerUsuario();

		$nombrequienagrega=$obtenerusuario[0]->nombre;
	}

	
	for ($i=0; $i <count($v_dias); $i++) { 
		
		if ($v_dias[$i]==0) {
			$domingo=1;
		}
		if ($v_dias[$i]==1) {
			$lunes=1;
		}

		if ($v_dias[$i]==2) {
			$martes=1;
		}

		if ($v_dias[$i]==3) {
			$miercoles=1;
		}

		if ($v_dias[$i]==4) {
			$jueves=1;
		}

		if ($v_dias[$i]==5) {
			$viernes=1;
		}

		if ($v_dias[$i]==6) {
			$sabado=1;
		}


	}

	$servicios->lunes=$lunes;
	$servicios->martes=$martes;
	$servicios->miercoles=$miercoles;
	$servicios->jueves=$jueves;
	$servicios->viernes=$viernes;
	$servicios->sabado=$sabado;
	$servicios->domingo=$domingo;

	$tiposervicioconfiguracion->idtiposervicioconfiguracion=$idtiposervicioconfiguracion;
	$obtenertiposervicio=$tiposervicioconfiguracion->ObttiposervicioConfiguracionDatos();
	

	if ($tipousuario==0){

		if ($servicios->estatus == 1) {
			$servicios->validaradmin=1;
		}else{

			$servicios->validaradmin=0;
		}
		
	}

	$servicios->orden=$orden;
	$servicios->modalidad=$obtenertiposervicio[0]->modalidad;

	$servicios->montopagarparticipante=0;
	$servicios->montopagargrupo=0;
	
	$servicios->fechainicial=$v_fechainicial;
	$servicios->fechafinal=$v_fechafinal;
	$servicios->modalidadpago=$obtenertiposervicio[0]->modalidaddepago;
	
	$servicios->numparticipantes=$obtenertiposervicio[0]->numeroparticipantes;
	$servicios->numparticipantesmax=$obtenertiposervicio[0]->numeroparticipantesmax;
	$servicios->abiertocliente=$obtenertiposervicio[0]->abiertocliente;
	$servicios->abiertocoach=$obtenertiposervicio[0]->abiertocoach;
	$servicios->abiertoadmin=$obtenertiposervicio[0]->abiertoadmin;
	$servicios->ligarclientes=$obtenertiposervicio[0]->ligarcliente;
	$servicios->tiempoaviso=$obtenertiposervicio[0]->tiempoaviso;
	$servicios->tituloaviso=$obtenertiposervicio[0]->tituloaviso;
	$servicios->descripcionaviso=$obtenertiposervicio[0]->descripcionaviso;
	$servicios->politicascancelacion=$obtenertiposervicio[0]->politicascancelacion;
	$servicios->reembolso=$obtenertiposervicio[0]->reembolso;
	$servicios->cantidadreembolso=$obtenertiposervicio[0]->cantidadreembolso;
	$servicios->asignadocliente=$obtenertiposervicio[0]->asignadocliente;
	$servicios->asignadocoach=$obtenertiposervicio[0]->asignadocoach;
	$servicios->asignadoadmin=$obtenertiposervicio[0]->asignadoadmin;
	$servicios->numligarclientes=$obtenertiposervicio[0]->numligarclientes;
	$servicios->politicasaceptacion=$obtenertiposervicio[0]->politicasaceptacion;
	$servicios->controlasistencia=$obtenertiposervicio[0]->controlasistencia;
	$servicios->idusuarios=$idusuarios; 
	//$servicios->validaradmin=$validaradmin;
	$servicios->tiporeembolso=$obtenertiposervicio[0]->tiporeembolso;
	$servicios->v_politicaaceptacionseleccion=$obtenertiposervicio[0]->idpoliticaaceptacion;
	$servicios->aceptarserviciopago=$obtenertiposervicio[0]->aceptarserviciopago;
	$servicios->idtiposervicioconfiguracion=$idtiposervicioconfiguracion;
	$servicios->bloqueocanchas=0;
	$servicios->totalclase=0;
	$servicios->periodo=0;

	if ($id==0) {


		$titulonotificacion="Solicitud de nuevo servicio ".$nombrequienagrega;
		$servicios->GuardarServicio();

		if ($tipousuario==5) {

		$usuarios->idusuarios=$idusuarios;
		$obtenerusuario=$usuarios->ObtenerUsuario();


		$nombrequienagrega="Coach: ".$obtenerusuario[0]->nombre." ".$obtenerusuario[0]->paterno;

		$obtenerusuarios=$usuarios->ObtenerAdministradores();
		
		for ($i=0; $i <count($obtenerusuarios) ; $i++) { 
			$idusuario=$obtenerusuarios[$i]->idusuarios;
			$usuarios->idusuarios=$idusuario;
			$obtenerusuarioinvita=$usuarios->ObtenerUsuario();
			$usuarioinvita=$obtenerusuarioinvita[0]->nombre.', ';
			$ruta='nuevoservicio';
			$valor=$servicios->idservicio;
			$texto='|Solicitud de nuevo servicio|'.$servicios->titulo.'|'.$nombrequienagrega;
			$estatus=0;
			$notificaciones->AgregarNotifcacionaUsuarios($idusuario,$texto,$ruta,$valor,$estatus);
			$notificaciones->idusuario=$idusuario;
			$obtenertokenusuario=$notificaciones->Obtenertoken();
			$titulonotificacion=$usuarioinvita.$titulonotificacion;

			for ($j=0; $j <count($obtenertokenusuario); $j++) { 
				
				$dato=array('idusuario'=>$idusuario,'token'=>$obtenertokenusuario[$j]->token,'ruta'=>$ruta,'titulonotificacion'=>$titulonotificacion);
			array_push($arraytokens,$dato);

			}
			$notificaciones->navpage="nuevoservicio";
				

		}

	}


	if ($tipousuario==0) {
		$obtenercoachesservicio=$servicios->ObtenerParticipantesCoach(5);

		for ($i=0; $i <count($obtenercoachesservicio) ; $i++) { 
					

			$idusuario=$obtenercoachesservicio[$i]->idusuarios;
			$usuarios->idusuarios=$idusuario;
			$obtenerusuarioinvita=$usuarios->ObtenerUsuario();

			$usuarioinvita=$obtenerusuarioinvita[0]->nombre.', ';

			$ruta='detalleserviciocoach2';
			$valor=$servicios->idservicio;
			$texto='|Se te asignó un nuevo servicio|'.$servicios->titulo.'|';
			$estatus=0;
			$notificaciones->AgregarNotifcacionaUsuarios($idusuario,$texto,$ruta,$valor,$estatus);

			$notificaciones->idusuario=$idusuario;
			$obtenertokenusuario=$notificaciones->Obtenertoken();
			$titulonotificacion=$usuarioinvita.$nombrequienagrega." te asignó un nuevo servicio ".$servicios->titulo;
				$dato=array('idusuario'=>$idusuario,'token'=>$obtenertokenusuario[0]->token,'ruta'=>$ruta,'titulonotificacion'=>$titulonotificacion);
			array_push($arraytokens,$dato);

			

				}
				$notificaciones->navpage="detalleserviciocoach2";

			
			}


	}else{
		$servicios->idservicio=$id;
		$servicios->ModificarServicio();

		$obtenerser=$servicios->ObtenerServicio();



		$usuarios->idusuarios=$servicios->idusuarios;
		$obtenerusuario=$usuarios->ObtenerUsuario();
		$nombrequienagrega=$obtenerusuario[0]->nombre." ".$obtenerusuario[0]->paterno;
		
		if ($servicios->estatus==1) {
			# code...
		
		if ($tipousuario==0) {
			$usuarios->idusuarios=$servicios->idusuarios;
		
		$obtenerusuario=$usuarios->ObtenerUsuario(); 
		$nombrequienagrega=$obtenerusuario[0]->nombre." ".$obtenerusuario[0]->paterno;
		if ($obtenerser[0]->agregousuario!=$usuarios->idusuarios) {
	    	$usuarios->idusuarios=$obtenerser[0]->agregousuario;

			$obtenerusuarioinvita=$usuarios->ObtenerUsuario();

			$usuarioinvita=$obtenerusuarioinvita[0]->nombre.', ';
		
			$idusuario=$obtenerser[0]->agregousuario;
			$ruta='detalleserviciocoach2';
			$valor=$servicios->idservicio;
			$texto='|Confirmacion de servicio|'.$servicios->titulo.'|'.$nombrequienagrega;
			$estatus=0;
			$notificaciones->AgregarNotifcacionaUsuarios($idusuario,$texto,$ruta,$valor,$estatus);

			$notificaciones->idusuario=$idusuario;
				$obtenertokenusuario=$notificaciones->Obtenertoken();
			$titulonotificacion=$usuarioinvita.$nombrequienagrega." te ha validado el servicio ".$servicios->titulo;
			for ($i=0; $i < count($obtenertokenusuario); $i++) { 

				$dato=array('idusuario'=>$idusuario,'token'=>$obtenertokenusuario[$i]->token,'ruta'=>$ruta,'titulonotificacion'=>$titulonotificacion);

					array_push($arraytokens,$dato);
					}
			

				}
		
			}

			$notificaciones->navpage="detalleserviciocoach2";
		}


	}
	


	$horariosposibles=json_decode($_POST['horariosposibles']);



	if (count($horariosposibles)>0) {

		$servicios->EliminarHorarioSemana();

		for ($i=0; $i < count($horariosposibles); $i++) { 

			
			$fecha=$horariosposibles[$i]->fecha;
			$horas=$horariosposibles[$i]->horasposibles;

			for ($j=0; $j <count($horas) ; $j++) { 
				// code...
			
				//print_r($horas);
			if ($horas[$j]->disponible==1) {
				
				 $horainicial=$horas[$j]->horainicial;
				 $horafinal=$horas[$j]->horafinal;
				 $dia=date('N', strtotime($fecha));
				 $horainicial=substr($horainicial,0,5);
				 $horafinal=substr($horafinal,0,5);
				 $idzona=0;
				 $numdia=date('w',strtotime($fecha));

				$servicios->dia=$numdia;
				$servicios->horainiciosemana=$horainicial;
				$servicios->horafinsemana=$horafinal;
				$servicios->fecha=date('Y-m-d',strtotime($fecha));
				$servicios->idzona=$idzona;
				$servicios->GuardarHorarioSemana();

				}

			}


		}
	}

	$servicios->EliminarCoachs();
	if ($tipousuario==0) {

	if (count($arraycoachelegidos)>0) {
		for ($i=0; $i <count($arraycoachelegidos) ; $i++) { 
			
				$servicios->idparticipantes=$arraycoachelegidos[$i]->idusuarios;
				$servicios->Guardarparticipantes();
				
		}
	}
}

	if ($tipousuario==5) {

		$servicios->idparticipantes=$idusuarios;
		$servicios->Guardarparticipantes();
	}


	$nombreimagen=$_POST['imageneservicio'];
	if ($nombreimagen!='' && $nombreimagen!=null) {
			# code...
		
		$sql = "UPDATE servicios SET imagen = '$nombreimagen' WHERE idservicio='".$servicios->idservicio."'";   
		$db->consulta($sql);

	}
		$db->commit();

	/*if ($servicios->estatus==1) {
			# code...
		
		if ($tipousuario==0) {
			$usuarios->idusuarios=$servicios->idusuarios;
		
		$obtenerusuario=$usuarios->ObtenerUsuario();
		$nombrequienagrega=$obtenerusuario[0]->nombre." ".$obtenerusuario[0]->paterno;
		if ($obtenerser[0]->agregousuario!=$usuarios->idusuarios) {
	    	$usuarios->idusuarios=$obtenerser[0]->agregousuario;

			$obtenerusuarioinvita=$usuarios->ObtenerUsuario();

			$usuarioinvita=$obtenerusuarioinvita[0]->nombre.', ';
		
			$idusuario=$obtenerser[0]->agregousuario;
			$ruta='detalleserviciocoach2';
			$valor=$servicios->idservicio;
			$texto='|Confirmacion de servicio|'.$servicios->titulo.'|'.$nombrequienagrega.'|Periodo: '.date('d-m-Y',strtotime($servicios->fechainicial)).' '.date('d-m-Y',strtotime($servicios->fechafinal));
			$estatus=0;
			$notificaciones->AgregarNotifcacionaUsuarios($idusuario,$texto,$ruta,$valor,$estatus);

			$notificaciones->idusuario=$idusuario;
				$obtenertokenusuario=$notificaciones->Obtenertoken();
			$titulonotificacion=$usuarioinvita.$nombrequienagrega." te ha validado el servicio ".$servicios->titulo;
			for ($i=0; $i < count($obtenertokenusuario); $i++) { 

				$dato=array('idusuario'=>$idusuario,'token'=>$obtenertokenusuario[$i]->token,'ruta'=>$ruta,'titulonotificacion'=>$titulonotificacion);

					array_push($arraytokens,$dato);
					}
			

				}
		
			}

			$notificaciones->navpage="detalleserviciocoach2";
		}*/
		
		if (count($arraytokens)>0) {
			$texto='';
			for ($i=0; $i <count($arraytokens) ; $i++) { 

				//if ($arraytokens[$i]!='') {
					# code...
				
			 $idusuario=$arraytokens[$i]['idusuario'];
			
			 $notificaciones->idcliente=$idusuario;
			 $notificaciones->valor=$emp->idservicio;
			 $notificaciones->navpage=$arraytokens[$i]['ruta'];
			 $array=array();
			 $texto="";
			 $titulonotificacion=$arraytokens[$i]['titulonotificacion'];
			 array_push($array,$arraytokens[$i]['token']);
			//$notificaciones->EnviarNotificacion($array,$texto,$titulonotificacion);
				

			}
		}

	$respuesta['respuesta']=1;
	$respuesta['envio']=$arraytokens;
	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>