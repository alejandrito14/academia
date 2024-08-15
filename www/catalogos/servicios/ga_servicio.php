<?php
/*======================= INICIA VALIDACIÓN DE SESIÓN =========================*/

require_once("../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();

if(!isset($_SESSION['se_SAS']))
{
	/*header("Location: ../../login.php"); */ echo "login";

	exit;
}
 
/*======================= TERMINA VALIDACIÓN DE SESIÓN =========================*/

//Importamos las clases que vamos a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Servicios.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');
require_once("../../clases/class.NotificacionPush.php");
require_once("../../clases/class.Tareas.php");
require_once("../../clases/class.Usuarios.php");
require_once("../../clases/class.ServiciosAsignados.php");
try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Servicios();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	$notificaciones=new NotificacionPush();
	$notificaciones->db=$db;
	$api=$notificaciones->ObtenerApiKey();
	$notificaciones->apikey=$api['clavetokennotificacion'];
	
	$tareas=new Tareas();
	$tareas->db=$db;
	$usuarios=new Usuarios();
	$usuarios->db=$db;
	$asignados=new ServiciosAsignados();
	$asignados->db=$db;
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$emp->idservicio = trim($_POST['id']);
	$emp->titulo = $_POST['v_titulo'];
	$emp->descripcion = $_POST['v_descripcion'];
	
	$emp->orden = trim($f->guardar_cadena_utf8($_POST['v_orden']));
	$emp->estatus = trim($f->guardar_cadena_utf8($_POST['v_estatus']));
	$emp->validaradmin=0;
	if ($emp->estatus==1) {
		$emp->validaradmin=1;

	}


	//$emp->v_politicaaceptacionseleccion=$_POST['v_politicaaceptacionseleccion'];

	if ($emp->v_politicaaceptacionseleccion=='') {
		$emp->v_politicaaceptacionseleccion=0;
	}

	$tipousuario=$_SESSION['se_sas_Tipo'];

	$emp->idcategoriaservicio = $_POST['v_categoria'];
	$emp->precio=$_POST['v_costo'];

	$ruta="imagenes/".$_SESSION['codservicio'].'/';
	$diasemanas=explode(',', $_POST['diasemana']);
	$horainiciosemana=explode(',', $_POST['horainiciodia']);
	$horafinsemana=explode(',', $_POST['horafindia']);
	
	$zonas=explode(',',$_POST['zonas']);
	$coachs=explode(',',$_POST['coachs']);
	$participantes=explode(',',  $_POST['participantes']);
	$periodosinicial=explode(',', $_POST['v_periodoinicial']);
	$periodosfinal=explode(',', $_POST['v_periodofinal']);
	
	$descuentos=explode(',', $_POST['v_descuentos']);
	$membresias=explode(',', $_POST['v_membresias']);
	$encuestas=explode(',', $_POST['v_encuestas']);

	$lunes=$_POST['v_lunes'];
	$martes=$_POST['v_martes'];
	$miercoles=$_POST['v_miercoles'];
	$jueves=$_POST['v_jueves'];
	$viernes=$_POST['v_viernes'];
	$sabado=$_POST['v_sabado'];
	$domingo=$_POST['v_domingo'];

	$costo=$_POST['v_costo']!=''?str_replace(',','',$_POST['v_costo']):0;
	$totalclase=0;
	$valorclase=$_POST['v_totalclase'];
	if($valorclase!=''&& $valorclase!='undefined' ){
		$totalclase=$_POST['v_totalclase'];
	}

		
	$modalidad=$_POST['v_modalidad']!='undefined'?$_POST['v_modalidad']:0;
	$montopagarparticipante=$_POST['v_montopagarparticipante']!='undefined'?$_POST['v_montopagarparticipante']:0;
	$montopagargrupo=$_POST['v_montopagargrupo']!='undefined'?$_POST['v_montopagargrupo']:0;

	
	$categoriaservicio=$_POST['v_categoriaservicio'];
	$arrayhorarios=explode(',', $_POST['v_arraydiaselegidos']);

	$porcentajescoachs=json_decode($_POST['porcentajescoachs']);
	$v_bloqueocanchas=$_POST['v_bloqueocanchas'];
	
	$emp->bloqueocanchas=$v_bloqueocanchas;
	$emp->lunes=$lunes;
	$emp->martes=$martes;
	$emp->miercoles=$miercoles;
	$emp->jueves=$jueves;
	$emp->viernes=$viernes;
	$emp->sabado=$sabado;
	$emp->domingo=$domingo;

	$emp->totalclase=$totalclase;
	$emp->modalidad=$modalidad;
	$emp->montopagarparticipante=$montopagarparticipante;
	$emp->montopagargrupo=$montopagargrupo;
	$emp->costo=$costo;
	$emp->idcategoria=$categoriaservicio;
	$emp->fechainicial=$_POST['v_fechainicial'];
	$emp->fechafinal=$_POST['v_fechafinal'];
	$emp->aceptarserviciopago=$_POST['v_aceptarserviciopago'];
	$emp->modalidadpago=$_POST['v_modalidadpago']!='undefined'?$_POST['v_modalidadpago']:0;
	$emp->periodo=$_POST['v_perido']!='undefined'? $_POST['v_perido']:0;
	$emp->numparticipantes=$_POST['v_numparticipantes'];
	$emp->numparticipantesmax=$_POST['v_numparticipantesmax'];

	$emp->abiertocliente=$_POST['abiertocliente'];
	$emp->abiertocoach=$_POST['abiertocoach'];
	$emp->abiertoadmin=$_POST['abiertoadmin'];
	$emp->ligarclientes=$_POST['ligarclientes'];
	$emp->tiempoaviso=$_POST['v_tiempoaviso'];
	$emp->tituloaviso=$_POST['v_tituloaviso'];
	

	$emp->descripcionaviso=$_POST['v_descripcionaviso']!='undefined'?$_POST['v_descripcionaviso']:'';

	$emp->politicascancelacion='';
	$emp->politicasaceptacion=$_POST['v_politicasaceptacion'];
	$emp->v_politicaaceptacionseleccion=$_POST['v_politicasaceptacionid'];
	//var_dump($emp->v_politicasaceptacionid);die();
	$emp->reembolso=$_POST['v_reembolso'];
	$emp->cantidadreembolso=$_POST['v_cantidadreembolso'];
	$emp->tiporeembolso=$_POST['v_tiporeembolso'];
	$emp->asignadocliente=$_POST['v_asignadocliente'];
	$emp->asignadocoach=$_POST['v_asignadocoach'];
	$emp->asignadoadmin=$_POST['v_asignadoadmin'];
	$emp->numligarclientes=$_POST['v_numligarclientes'];
	$emp->controlasistencia=$_POST['v_asistencia'];
	$emp->aceptarserviciopago =$_POST['v_aceptarserviciopago'];
	$arraytokens=array();

	$usuarios->id_usuario=$_SESSION['se_sas_Usuario'];
	$emp->idusuarios=$_SESSION['se_sas_Usuario'];

	$tipousuario=$_SESSION['se_sas_Tipo'];

	$obtenerusuario=$usuarios->ObtenerUsuario();

	$nombrequienagrega=$obtenerusuario[0]->nombre;
	$usuarioinvita="";
	$titulonotificacion="";
	$emp->validaradmin=$validaradmin;
	$emp->idtiposervicioconfiguracion=$_POST['v_idtiposervicioconfiguracion'];
	//Validamos si hacermos un insert o un update

	if($emp->idservicio == 0)
	{
		$titulonotificacion="Solicitud de nuevo servicio ".$nombrequienagrega;
	if ($tipousuario==0){

		if ($emp->estatus==1) {
			$emp->validaradmin=1;
		}else{

			$emp->validaradmin=0;
		}
		
	}
		//guardando 
		$emp->GuardarServicio();
		$md->guardarMovimiento($f->guardar_cadena_utf8('Servicio'),'Servicio',$f->guardar_cadena_utf8('Nuevo Servicio creado con el ID-'.$emp->idservicio));

		if (count($arrayhorarios)>0 && $arrayhorarios[0]!='') {
			# code...
		
		for ($i=0; $i < count($arrayhorarios); $i++) { 
				 $dividircadena=explode('-', $arrayhorarios[$i]);
			$fecha=$dividircadena[0].'-'.$dividircadena[1].'-'.$dividircadena[2];
				 $horainicial=substr($dividircadena[3],0,5);
				 $horafinal=substr($dividircadena[4],0,5);
				 $idzona=$dividircadena[5];
				 $numdia=date('w',strtotime($fecha));

				$emp->dia=$numdia;
				$emp->horainiciosemana=$horainicial;
				$emp->horafinsemana=$horafinal;
				$emp->fecha=$fecha;
				$emp->idzona=$idzona;

				$emp->GuardarHorarioSemana();
			}
		}

			if (count($zonas)>0 && $zonas[0]!='') {
				for ($i=0; $i < count($zonas); $i++) { 

						$emp->idzona=$zonas[$i];
						if ($emp->idzona!=0) {
							$emp->GuardarZona();
						}
					
					}

				}

			if (count($coachs)>0 && $coachs[0]!='') {

				for ($i=0; $i < count($coachs); $i++) { 
						$emp->idparticipantes=$coachs[$i];
						$emp->Guardarparticipantes();

						$tipo=$porcentajescoachs[$i]->{'tipopago'};
						$monto=$porcentajescoachs[$i]->{'monto'};

						$emp->GuardarMontotipo($tipo,$monto);	


						$idusuario=$coachs[$i];

						$usuarios->id_usuario=$idusuario;
						$obtenerusuarioinvita=$usuarios->ObtenerUsuario();
						$usuarioinvita=$obtenerusuarioinvita[0]->nombre.', ';

						$ruta='detalleserviciocoach2';
						$valor=$emp->idservicio;
						$texto='|Se te asignó un nuevo servicio|'.$emp->titulo.'|';
						$estatus=0;
						$notificaciones->AgregarNotifcacionaUsuarios($idusuario,$texto,$ruta,$valor,$estatus);

						$notificaciones->idusuario=$idusuario;
							$obtenertokenusuario=$notificaciones->Obtenertoken();
						$titulonotificacion=$usuarioinvita.$nombrequienagrega." te asignó un nuevo servicio ".$emp->titulo;
							$dato=array('idusuario'=>$idusuario,'token'=>$obtenertokenusuario[0]->token,'ruta'=>$ruta,'titulonotificacion'=>$titulonotificacion);
						array_push($arraytokens,$dato);
					}

				}



				if (count($porcentajescoachs)>0) {
					for ($i=0; $i <count($porcentajescoachs) ; $i++) { 
						


					}
				}

			/*if (count($participantes)>0 && $participantes[0]!='') {
					for ($i=0; $i < count($participantes); $i++) { 
						$emp->idparticipantes=$participantes[$i];
						$emp->Guardarparticipantes();
					}
				}*/

				if (count($periodosinicial)>0 && $periodosinicial[0]!='') {
					for ($i=0; $i < count($periodosinicial); $i++) { 
						$emp->periodoinicial=$periodosinicial[$i];
						$emp->periodofinal=$periodosfinal[$i];

						$emp->GuardarPeriodo();
					}
				}

			/*if (count($descuentos)>0 && $descuentos[0]!='') {
					for ($i=0; $i < count($descuentos); $i++) { 
						$emp->iddescuento=$descuentos[$i];

						$emp->Guardardescuentos();
					}
				}


			if (count($membresias)>0 && $membresias[0]!='') {
				for ($i=0; $i < count($membresias); $i++) { 
						$emp->idmembresia=$membresias[$i];

						$emp->Guardarmembresias();
					}
				}*/

				if (count($encuestas)>0 && $encuestas[0]!='') {
				for ($i=0; $i < count($encuestas); $i++) { 
						$emp->idencuesta=$encuestas[$i];

						$emp->Guardarencuestas();
					}
				}



		if ($tipousuario==0) {
				$obtenercoachesservicio=$emp->ObtenerParticipantesCoach(5);

		for ($i=0; $i <count($obtenercoachesservicio) ; $i++) { 
					

			$idusuario=$obtenercoachesservicio[$i]->idusuarios;
			$usuarios->id_usuario=$idusuario;
			$obtenerusuarioinvita=$usuarios->ObtenerUsuario();

			$usuarioinvita=$obtenerusuarioinvita[0]->nombre.', ';

			$ruta='detalleserviciocoach2';
			$valor=$emp->idservicio;
			$texto='|Se te asignó un nuevo servicio|'.$emp->titulo.'|';
			$estatus=0;
			$notificaciones->AgregarNotifcacionaUsuarios($idusuario,$texto,$ruta,$valor,$estatus);

			$notificaciones->idusuario=$idusuario;
				$obtenertokenusuario=$notificaciones->Obtenertoken();
			$titulonotificacion=$usuarioinvita.$nombrequienagrega." te asignó un nuevo servicio ".$emp->titulo;
				$dato=array('idusuario'=>$idusuario,'token'=>$obtenertokenusuario[0]->token,'ruta'=>$ruta,'titulonotificacion'=>$titulonotificacion);
			array_push($arraytokens,$dato);

			

				}
				$notificaciones->navpage="detalleserviciocoach2";

			
			}

	}else{
		$obtenerservicio=$emp->ObtenerServicio();
		$emp->validaradmin=$obtenerservicio[0]->validaradmin;
		$emp->ModificarServicio();	
		$md->guardarMovimiento($f->guardar_cadena_utf8('Servicio'),'Servicio',$f->guardar_cadena_utf8('Modificación del Servicio -'.$emp->idservicio));

		$existe=0;
		$noexiste=0;
	if (count($arrayhorarios)>0 && $arrayhorarios[0]!='') {
		
		for ($i=0; $i < count($arrayhorarios); $i++) { 

			$dividircadena=explode('-', $arrayhorarios[$i]);
				 $fecha=$dividircadena[0].'-'.$dividircadena[1].'-'.$dividircadena[2];
				 $horainicial=substr($dividircadena[3],0,5);
				 $horafinal=substr($dividircadena[4],0,5);

			$emp->fecha=$fecha;
			$emp->horainicial=$horainicial;
			$emp->horafinal=$horafinal;

			$registrohorario=$emp->ExisteHorario();
			if (count($registrohorario)>0) {
				$existe++;
			}else{
				$noexiste++;
			}

		}
	}
	/*var_dump($noexiste);die();*/
	if (count($arrayhorarios)>0 && $arrayhorarios[0]!='') {
			$emp->EliminarHorarioSemana();
		
		for ($i=0; $i < count($arrayhorarios); $i++) { 
				 $dividircadena=explode('-', $arrayhorarios[$i]);
				 $fecha=$dividircadena[0].'-'.$dividircadena[1].'-'.$dividircadena[2];
				 $horainicial=substr($dividircadena[3],0,5);
				 $horafinal=substr($dividircadena[4],0,5);
				 $idzona=$dividircadena[5];
				 $numdia=date('w',strtotime($fecha));

				$emp->dia=$numdia;
				$emp->horainiciosemana=$horainicial;
				$emp->horafinsemana=$horafinal;
				$emp->fecha=$fecha;
				$emp->idzona=$idzona;

				$emp->GuardarHorarioSemana();


			}
		}
		

			/*if (count($participantes)>0 && $participantes[0]!='') {
				$emp->EliminarParticipantes();
					for ($i=0; $i < count($participantes); $i++) { 
						$emp->idparticipantes=$participantes[$i];
						$emp->Guardarparticipantes();
					}
				}*/

		$emp->EliminarZonas();

		if (count($zonas)>0 && $zonas[0]!='') {
				for ($i=0; $i < count($zonas); $i++) { 

					$emp->idzona=$zonas[$i];
					if ($emp->idzona!=0) {
						$emp->GuardarZona();
					}
					
					}

				}
				$emp->EliminarCoachs();
			if (count($coachs)>0 && $coachs[0]!='') {
					
					for ($i=0; $i < count($coachs); $i++) { 
						$emp->idparticipantes=$coachs[$i];
						$emp->Guardarparticipantes();

						$tipo=$porcentajescoachs[$i]->{'tipopago'};
						$monto=$porcentajescoachs[$i]->{'monto'};

						$emp->GuardarMontotipo($tipo,$monto);

						$idusuario=$coachs[$i];

						$usuarios->id_usuario=$idusuario;
						$obtenerusuarioinvita=$usuarios->ObtenerUsuario();
						$usuarioinvita=$obtenerusuarioinvita[0]->nombre.', ';
						$ruta='detalleserviciocoach2';
						$valor=$emp->idservicio;
						$texto='|Se te asignó un nuevo servicio|'.$emp->titulo.'|';
						$estatus=0;
						$notificaciones->idusuario=$idusuario;
						$notificaciones->valor=$valor;
						$verificar=$notificaciones->VerificarSiTieneNotificacion();

					if (count($verificar)==0) {
							# code...
						
						$notificaciones->AgregarNotifcacionaUsuarios($idusuario,$texto,$ruta,$valor,$estatus);

						$notificaciones->idusuario=$idusuario;
							$obtenertokenusuario=$notificaciones->Obtenertoken();
						$titulonotificacion=$usuarioinvita.$nombrequienagrega." te asignó un nuevo servicio ".$emp->titulo;
							$dato=array('idusuario'=>$idusuario,'token'=>$obtenertokenusuario[0]->token,'ruta'=>$ruta,'titulonotificacion'=>$titulonotificacion);

							if ($noexiste==0) {
								array_push($arraytokens,$dato);	
							}
						
						}
					}
				}	

				$emp->EliminarPeriodos();

			if (count($periodosinicial)>0 && $periodosinicial[0]!='') {

					for ($i=0; $i < count($periodosinicial); $i++) { 
						$emp->periodoinicial=$periodosinicial[$i];
						$emp->periodofinal=$periodosfinal[$i];

						$emp->GuardarPeriodo();
					}
				}

		/*$emp->Eliminardescuentos();

		if (count($descuentos)>0 && $descuentos[0]!='') {
					for ($i=0; $i < count($descuentos); $i++) { 
						$emp->iddescuento=$descuentos[$i];

						$emp->Guardardescuentos();
					}
				}*/

		/*$emp->Eliminardemembresias();

		if (count($membresias)>0 && $membresias[0]!='') {
				for ($i=0; $i < count($membresias); $i++) { 
						$emp->idmembresia=$membresias[$i];

						$emp->Guardarmembresias();
					}
				}*/

		$emp->Eliminardeencuestas();
		if (count($encuestas)>0 && $encuestas[0]!='') {
				for ($i=0; $i < count($encuestas); $i++) { 
						$emp->idencuesta=$encuestas[$i];

						$emp->Guardarencuestas();
					}
				}

	}

		
		foreach ($_FILES as $key) 
		{
		if($key['error'] == UPLOAD_ERR_OK ){//Verificamos si se subio correctamente


			$nombre = str_replace(' ','_',date('Y-m-d H:i:s').'-'.$emp->idservicio.".jpg");//Obtenemos el nombre del archivo
			
			$temporal = $key['tmp_name']; //Obtenemos el nombre del archivo temporal
			$tamano= ($key['size'] / 1000)."Kb"; //Obtenemos el tamaño en KB

			//obtenemos el nombre del archivo anterior para ser eliminado si existe

			$sql = "SELECT imagen FROM servicios WHERE idservicio='".$emp->idservicio."'";

			$result_borrar = $db->consulta($sql);
			$result_borrar_row = $db->fetch_assoc($result_borrar);
			$nombreborrar = $result_borrar_row['imagen'];		  
			if($nombreborrar != "")
			{
				unlink($ruta.$nombreborrar); 
			}


			move_uploaded_file($temporal, $ruta.$nombre); //Movemos el archivo temporal a la ruta especificada

			$sql = "UPDATE servicios SET imagen = '$nombre' WHERE idservicio='".$emp->idservicio."'";   
			$db->consulta($sql);	 
		}
	}


	if ($emp->tituloaviso!='' && $emp->tiempoaviso>0) {
		# code...
	
	if (count($arrayhorarios)>0 && $arrayhorarios[0]!='') {
			$tareas->idservicio=$emp->idservicio;

			$obtenertareas=$tareas->ObtenerTareasServicio();
			if (count($obtenertareas)>0) {
				$tareas->EliminarTareasNoCompletadas();

			}
			
		
		for ($i=0; $i < count($arrayhorarios); $i++) { 
				 $dividircadena=explode('-', $arrayhorarios[$i]);
			     $fecha=$dividircadena[0].'-'.$dividircadena[1].'-'.$dividircadena[2];
				 $horainicial=substr($dividircadena[3],0,5);
				 $horafinal=substr($dividircadena[4],0,5);
				 $idzona=$dividircadena[5];
				 $numdia=date('w',strtotime($fecha));

				$emp->dia=$numdia;
				$emp->horainiciosemana=$horainicial;
				$emp->horafinsemana=$horafinal;
				$emp->fecha=$fecha.' '.$horainicial.':00';
				$emp->idzona=$idzona;

				
				$fechaUno = new DateTime($emp->fecha);
				$NuevaFecha= $fechaUno->modify("-".$emp->tiempoaviso." minute")->format("Y-m-d h:i");

				$tareas->nombretarea='Envio notificacion servicio';
				$tareas->titulo=$emp->tituloaviso;
				$tareas->descripcion=$emp->descripcionaviso;
				$tareas->programada=$NuevaFecha;
				$tareas->idservicio=$emp->idservicio;
				$tareas->estatus=0;
				$tareas->envio=0;
				$tareas->CrearTarea();
				
			}
		}
	}

	
/*	if ($noexiste>0) {
		 if($emp->estatus==1) {
			# code...
			$obtenerser=$emp->ObtenerServicio();

		if ($tipousuario==0) {
		
			$idusuario=$obtenerser[0]->agregousuario;
		if ($idusuario>0) {
				# code...
			
		$ruta='detalleserviciocoach2';
		$valor=$emp->idservicio;
		$texto='|Se reagendo el servicio|'.$emp->titulo.'|'.$nombrequienagrega.'|Periodo: '.date('d-m-Y',strtotime($emp->fechainicial)).' '.date('d-m-Y',strtotime($emp->fechafinal));
		$estatus=0;
		$notificaciones->AgregarNotifcacionaUsuarios($idusuario,$texto,$ruta,$valor,$estatus);

		$notificaciones->idusuario=$idusuario;
		$obtenertokenusuario=$notificaciones->Obtenertoken();
		$usuarios->id_usuario=$idusuario;
		$obtenerusuarioinvita=$usuarios->ObtenerUsuario();
		$usuarioinvita=$obtenerusuarioinvita[0]->nombre.', ';
		$titulonotificacion=$usuarioinvita.$nombrequienagrega."se reagendó el servicio ".$emp->titulo;

			for ($i=0; $i < count($obtenertokenusuario); $i++) { 

				$dato=array('idusuario'=>$idusuario,'token'=>$obtenertokenusuario[$i]->token,'titulonotificacion'=>$titulonotificacion,'ruta'=>$ruta);

					array_push($arraytokens,$dato);
				}
			
		
				}

			
			}
		
		$asignados->idusuario=0;
		$asignados->idservicio=$emp->idservicio;
		$obtenerusuariosarignados=$asignados->obtenerUsuariosServiciosAlumnosAsignados();
		
		if(count($obtenerusuariosarignados)>0){
			
		for ($i=0; $i <count($obtenerusuariosarignados) ; $i++) { 
			$idusuario=$obtenerusuariosarignados[$i]->idusuarios;
			$usuarios->id_usuario=$idusuario;
			$obtenerusuarioinvita=$usuarios->ObtenerUsuario();
		$usuarioinvita=$obtenerusuarioinvita[0]->nombre.', ';


			$titulonotificacion=$usuarioinvita.$nombrequienagrega." reagendó el servicio ".$emp->titulo;
			$valor=$emp->idservicio;
			$texto='|Se reagendo el servicio|'.$emp->titulo.'|Periodo: '.date('d-m-Y',strtotime($emp->fechainicial)).' '.date('d-m-Y',strtotime($emp->fechafinal));
			$estatus=0;
			$notificaciones->AgregarNotifcacionaUsuarios($idusuario,$texto,$ruta,$valor,$estatus);

		$usuarios->idusuarios=$idusuario;
		$obtenerdependencia=$usuarios->ObtenerUsuarioDependencia();
		$ruta="";
		if (count($obtenerdependencia)>0) {
			$obtenerdatousuario=$usuarios->ObtenerUsuario();
			
			if($obtenerdatousuario[0]->sincel==1) {
				$notificaciones->idusuario=$obtenerdependencia[0]->idusuariostutor;
				$ruta="";
				$banderatuto=1;
			}else{
			   $notificaciones->idusuario=$idusuario;
			  if ($obtenerusuariosarignados[$i]->aceptarterminos==1) {
				$ruta='detalleservicio2';

				}else{
				$ruta='aceptacionservicio2';

			}

			}
			



					}else{
			$notificaciones->idusuario=$idusuario;
			if ($obtenerusuariosarignados[$i]->aceptarterminos==1) {
				$ruta='detalleservicio2';

				}else{
				$ruta='aceptacionservicio2';

			}

		}

				
				$obtenertokenusuario=$notificaciones->Obtenertoken();

			for ($j=0; $j < count($obtenertokenusuario); $j++) { 

				$dato=array('idusuario'=>$idusuario,'token'=>$obtenertokenusuario[$j]->token,'titulonotificacion'=>$titulonotificacion,'ruta'=>$ruta);

					array_push($arraytokens,$dato);
				}
				

			}
		}



		}

	}*/

	
				
	$db->commit();
	
	if (count($arraytokens)>0) {
			$texto='';
			for ($i=0; $i <count($arraytokens) ; $i++) { 

			
			 $idusuario=$arraytokens[$i]['idusuario'];
			
			 $notificaciones->idcliente=$idusuario;
			 $notificaciones->valor=$emp->idservicio;
			 $notificaciones->navpage=$arraytokens[$i]['ruta'];
			 $array=array();
			 $texto="";
			 $titulonotificacion=$arraytokens[$i]['titulonotificacion'];
			 array_push($array,$arraytokens[$i]['token']);
			$notificaciones->EnviarNotificacion($array,$texto,$titulonotificacion);
				

			}
		}
	echo "1|".$emp->idservicio;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>