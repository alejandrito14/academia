<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.NotificacionPush.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Tareas.php");


try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Servicios();
	$f = new Funciones();
	$usuarios=new Usuarios();
	$usuarios->db=$db;
	$notificaciones=new NotificacionPush();
	$notificaciones->db=$db;
	$serviciosasignados=new ServiciosAsignados();
	$serviciosasignados->db=$db;
	$tareas=new Tareas();
	$tareas->db=$db;
	//$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	//$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$emp->idservicio = trim($_POST['id']);
	$emp->titulo = $_POST['v_titulo'];
	$emp->descripcion = $_POST['v_descripcion'];
	
	$emp->orden = trim($f->guardar_cadena_utf8($_POST['v_orden']));
	$emp->estatus = trim($f->guardar_cadena_utf8($_POST['v_estatus']));
	$emp->v_politicaaceptacionseleccion=$_POST['v_politicaaceptacionseleccion'];

	if ($emp->v_politicaaceptacionseleccion=='') {
		$emp->v_politicaaceptacionseleccion=0;
	}
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
	$periodos=json_decode($_POST['periodos']);
	
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
	$emp->descripcionaviso=$_POST['v_descripcionaviso'];
	$emp->politicascancelacion='';
	$emp->politicasaceptacion=$_POST['v_politicasaceptacion'];
	$emp->reembolso=$_POST['v_reembolso'];
	$emp->cantidadreembolso=$_POST['v_cantidadreembolso'];
	$emp->tiporeembolso=$_POST['v_tiporeembolso'];
	$emp->asignadocliente=$_POST['v_asignadocliente'];
	$emp->asignadocoach=$_POST['v_asignadocoach'];
	$emp->asignadoadmin=$_POST['v_asignadoadmin'];
	$emp->numligarclientes=$_POST['v_numligarclientes'];
	$emp->controlasistencia=$_POST['v_asistencia'];
	$emp->idusuarios=$_POST['iduser'];
	$tipousuario=$_POST['idtipousuario'];
		$validaradmin=1;
	$nombrequienagrega="";
	if ($tipousuario==5) {
		$porcentajescoachs=array();
		$validaradmin=0;
		$usuarios->idusuarios=$emp->idusuarios;
		$obtenerusuario=$usuarios->ObtenerUsuario();
		array_push($porcentajescoachs,$obtenerusuario[0]);

		$nombrequienagrega="Coach: ".$obtenerusuario[0]->nombre." ".$obtenerusuario[0]->paterno;
	}


	if ($tipousuario==0) {
	
		$usuarios->idusuarios=$emp->idusuarios;
		$obtenerusuario=$usuarios->ObtenerUsuario();

		$nombrequienagrega=$obtenerusuario[0]->nombre;
	}
	$usuarioinvita="";
	$arraytokens=array();
	$titulonotificacion="";
	$emp->validaradmin=$validaradmin;
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
		/*$md->guardarMovimiento($f->guardar_cadena_utf8('Servicio'),'Servicio',$f->guardar_cadena_utf8('Nuevo Servicio creado con el ID-'.$emp->idservicio));*/

		if ($tipousuario==5) {
		# code...

		$nombrequienagrega="Coach: ".$obtenerusuario[0]->nombre." ".$obtenerusuario[0]->paterno;

		$obtenerusuarios=$usuarios->ObtenerAdministradores();
		
		for ($i=0; $i <count($obtenerusuarios) ; $i++) { 
			$idusuario=$obtenerusuarios[$i]->idusuarios;
			$usuarios->idusuarios=$idusuario;
			$obtenerusuarioinvita=$usuarios->ObtenerUsuario();
			$usuarioinvita=$obtenerusuarioinvita[0]->nombre.', ';
			$ruta='nuevoservicio';
			$valor=$emp->idservicio;
			$texto='|Solicitud de nuevo servicio|'.$emp->titulo.'|'.$nombrequienagrega.'|Periodo: '.date('d-m-Y',strtotime($emp->fechainicial)).' '.date('d-m-Y',strtotime($emp->fechafinal));
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
				$emp->fecha=date('Y-m-d',strtotime($fecha));
				$emp->idzona=$idzona;

				$emp->GuardarHorarioSemana();
			}
		}

			if (count($zonas)>0 && $zonas[0]!='') {
				for ($i=0; $i < count($zonas); $i++) { 

						$emp->idzona=$zonas[$i];
					$emp->GuardarZona();
					}

				}
				

			if (count($porcentajescoachs)>0 ) {

				if ($tipousuario==5) {


				for ($i=0; $i < count($porcentajescoachs); $i++) { 

						$emp->idparticipantes=$porcentajescoachs[$i]->idusuarios;
						$emp->Guardarparticipantes();

						$tipo=0;
						$monto=0;

						$emp->GuardarMontotipo($tipo,$monto);	
					}
				}else{

					for ($i=0; $i < count($porcentajescoachs); $i++) { 

					$emp->idparticipantes=$porcentajescoachs[$i]->{'idcoach'};
					$emp->Guardarparticipantes();

					$tipo=$porcentajescoachs[$i]->{'tipopago'};
					$monto=$porcentajescoachs[$i]->{'monto'};

						$emp->GuardarMontotipo($tipo,$monto);	
						}
					}
				}

			

		
				if (count($periodos)>0) {
					for ($i=0; $i < count($periodos); $i++) { 
						$emp->periodoinicial=$periodos[$i]->{'fechainicial'};
						$emp->periodofinal=$periodos[$i]->{'fechafinal'};

						$emp->GuardarPeriodo();
					}
				}

			/*if (count($descuentos)>0 && $descuentos[0]!='') {
					for ($i=0; $i < count($descuentos); $i++) { 
						$emp->iddescuento=$descuentos[$i];

						$emp->Guardardescuentos();
					}
				}*/


			/*if (count($membresias)>0 && $membresias[0]!='') {
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
			$usuarios->idusuarios=$idusuario;
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
		$titulonotificacion="Edición servicio";
	if ($tipousuario==0){

		if ($emp->estatus==1) {
			$emp->validaradmin=1;
		}else{
			$emp->validaradmin=0;
		}
		
	}

		$obtenerser=$emp->ObtenerServicio();
		$emp->ModificarServicio();
		$usuarios->idusuarios=$emp->idusuarios;
		$obtenerusuario=$usuarios->ObtenerUsuario();
		$nombrequienagrega=$obtenerusuario[0]->nombre." ".$obtenerusuario[0]->paterno;
		
		if ($emp->estatus==1) {
			# code...
		
		if ($tipousuario==0) {
			$usuarios->idusuarios=$emp->idusuarios;
		
		$obtenerusuario=$usuarios->ObtenerUsuario();
		$nombrequienagrega=$obtenerusuario[0]->nombre." ".$obtenerusuario[0]->paterno;
		if ($obtenerser[0]->agregousuario!=$usuarios->idusuarios) {
	    	$usuarios->idusuarios=$obtenerser[0]->agregousuario;

			$obtenerusuarioinvita=$usuarios->ObtenerUsuario();

			$usuarioinvita=$obtenerusuarioinvita[0]->nombre.', ';
		
			$idusuario=$obtenerser[0]->agregousuario;
			$ruta='detalleserviciocoach2';
			$valor=$emp->idservicio;
			$texto='|Confirmacion de servicio|'.$emp->titulo.'|'.$nombrequienagrega.'|Periodo: '.date('d-m-Y',strtotime($emp->fechainicial)).' '.date('d-m-Y',strtotime($emp->fechafinal));
			$estatus=0;
			$notificaciones->AgregarNotifcacionaUsuarios($idusuario,$texto,$ruta,$valor,$estatus);

			$notificaciones->idusuario=$idusuario;
				$obtenertokenusuario=$notificaciones->Obtenertoken();
			$titulonotificacion=$usuarioinvita.$nombrequienagrega." te ha validado el servicio ".$emp->titulo;
			for ($i=0; $i < count($obtenertokenusuario); $i++) { 

				$dato=array('idusuario'=>$idusuario,'token'=>$obtenertokenusuario[$i]->token,'ruta'=>$ruta,'titulonotificacion'=>$titulonotificacion);

					array_push($arraytokens,$dato);
					}
			

				}
		
			}

			$notificaciones->navpage="detalleserviciocoach2";
		}

		

		if (count($arrayhorarios)>0 && $arrayhorarios[0]!='') {
			# code...
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
				$emp->fecha=date('Y-m-d',strtotime($fecha));
				$emp->idzona=$idzona;

				$emp->GuardarHorarioSemana();
			}
		}

			if (count($zonas)>0 && $zonas[0]!='') {
				for ($i=0; $i < count($zonas); $i++) { 

						$emp->idzona=$zonas[$i];
					$emp->GuardarZona();
					}

				}
				$emp->EliminarCoachs();

			if (count($porcentajescoachs)>0 ) {

				if ($tipousuario==5) {
				for ($i=0; $i < count($porcentajescoachs); $i++) { 

						$emp->idparticipantes=$porcentajescoachs[$i]->idusuarios;
						$emp->Guardarparticipantes();

						$tipo=0;
						$monto=0;

						$emp->GuardarMontotipo($tipo,$monto);	
					}
				}else{
				for ($i=0; $i < count($porcentajescoachs); $i++) { 

					$emp->idparticipantes=$porcentajescoachs[$i]->{'idcoach'};
					$emp->Guardarparticipantes();

					$tipo=$porcentajescoachs[$i]->{'tipopago'};
					$monto=$porcentajescoachs[$i]->{'monto'};

						$emp->GuardarMontotipo($tipo,$monto);	
					}

				 }
				}

			

			$emp->EliminarPeriodos();

				if (count($periodos)>0) {
					for ($i=0; $i < count($periodos); $i++) { 
						$emp->periodoinicial=$periodos[$i]->{'fechainicial'};
						$emp->periodofinal=$periodos[$i]->{'fechafinal'};

						$emp->GuardarPeriodo();
					}
				}

					$emp->Eliminardeencuestas();

				if (count($encuestas)>0 && $encuestas[0]!='') {

				for ($i=0; $i < count($encuestas); $i++) { 
						$emp->idencuesta=$encuestas[$i];

						$emp->Guardarencuestas();
					}
				}	
		/*$md->guardarMovimiento($f->guardar_cadena_utf8('Servicio'),'Servicio',$f->guardar_cadena_utf8('Modificación del Servicio -'.$emp->idservicio));*/
/*
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
		}*/
		

			
	/*	$emp->EliminarZonas();

		if (count($zonas)>0 && $zonas[0]!='') {
				for ($i=0; $i < count($zonas); $i++) { 

					$emp->idzona=$zonas[$i];
					$emp->GuardarZona();
					}

				}*/
				/*$emp->EliminarCoachs();
			if (count($coachs)>0 && $coachs[0]!='') {
					
					for ($i=0; $i < count($coachs); $i++) { 
						$emp->idparticipantes=$coachs[$i];
						$emp->Guardarparticipantes();

						
						$tipo=$porcentajescoachs[$i]->{'tipopago'};
						$monto=$porcentajescoachs[$i]->{'monto'};

						$emp->GuardarMontotipo($tipo,$monto);	
					}
				}	*/

			/*	$emp->EliminarPeriodos();

			if (count($periodosinicial)>0 && $periodosinicial[0]!='') {

					for ($i=0; $i < count($periodosinicial); $i++) { 
						$emp->periodoinicial=$periodosinicial[$i];
						$emp->periodofinal=$periodosfinal[$i];

						$emp->GuardarPeriodo();
					}
				}
*/
		

		
/*
		$emp->Eliminardeencuestas();
		if (count($encuestas)>0 && $encuestas[0]!='') {
				for ($i=0; $i < count($encuestas); $i++) { 
						$emp->idencuesta=$encuestas[$i];

						$emp->Guardarencuestas();
					}
				}

	}*/

		
		/*foreach ($_FILES as $key) 
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
		}*/
	
	}
	$nombreimagen=$_POST['imageneservicio'];
	if ($nombreimagen!='' && $nombreimagen!=null) {
			# code...
		
		$sql = "UPDATE servicios SET imagen = '$nombreimagen' WHERE idservicio='".$emp->idservicio."'";   
		$db->consulta($sql);

	}
	//if ($emp->idservicio>0) {
		# code...
	
	if($emp->estatus==1) {
	$serviciosasignados->idservicio=$emp->idservicio;
	$serviciosasignados->idusuario=0;
	$obtenerparticipantes=$serviciosasignados->obtenerUsuariosServiciosAlumnosAsignados();
	$usuarioinvita="";
	if (count($obtenerparticipantes)>0) {
		# code...
	
		for ($k=0; $k <count($obtenerparticipantes); $k++) { 


		$usuarios->idusuarios=$obtenerparticipantes[$k]->idusuarios;
		$obtenerusuario=$usuarios->ObtenerUsuario();

		
			$obtenerusuarioinvita=$usuarios->ObtenerUsuario();
			$usuarioinvita=$obtenerusuarioinvita[0]->nombre.', ';


		$usuarios->idusuarios=$idusuario;
		$obtenerdependencia=$usuarios->ObtenerUsuarioDependencia();
		if (count($obtenerdependencia)>0) {
			$obtenerdatousuario=$usuarios->ObtenerUsuario();
			
			if($obtenerdatousuario[0]->sincel==1) {
				$notificaciones->idusuario=$obtenerdependencia[0]->idusuariostutor;
			}else{
			   $notificaciones->idusuario=$idusuario;
			 
			}
		
			}else{
			$notificaciones->idusuario=$idusuario;
			

		}


			$ruta='serviciospendientesasignados';
			$valor=$emp->idservicio;
			$texto='|Se te asignó un nuevo servicio|'.$emp->titulo.'|';
			$estatus=0;
			$notificaciones->AgregarNotifcacionaUsuarios($idusuario,$texto,$ruta,$valor,$estatus);

			//$notificaciones->idusuario=$usuarios->idusuarios;
				$obtenertokenusuario=$notificaciones->Obtenertoken();
			$titulonotificacion=$usuarioinvita.$nombrequienagrega." se te asignó a un nuevo servicio ".$emp->titulo;
			for ($i=0; $i < count($obtenertokenusuario); $i++) { 

				$dato=array('idusuario'=>$idusuario,'token'=>$obtenertokenusuario[$i]->token,'ruta'=>$ruta,'titulonotificacion'=>$titulonotificacion);

					array_push($arraytokens,$dato);
				}
			

			
		
				}

			}
		}

		if ($emp->tiempoaviso>0) {
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
				$NuevaFecha= $fechaUno->modify("-".$emp->tiempoaviso." minute")->format("Y-m-d H:i");

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
			
		//}
	

	$db->commit();

/*
		if (count($arraytokens)>0) {
			$texto='';

			 $notificaciones->navpage="serviciosporvalidar";

			$notificaciones->EnviarNotificacion($arraytokens,$texto,$titulonotificacion);
		}
*/
	
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
	$respuesta['idservicio']=$emp->idservicio;
	$myJSON = json_encode($respuesta);
    echo $myJSON;

	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>