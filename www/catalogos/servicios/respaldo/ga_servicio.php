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
try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Servicios();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$emp->idservicio = trim($_POST['id']);
	$emp->titulo = trim($f->guardar_cadena_utf8($_POST['v_titulo']));
	$emp->descripcion = trim($f->guardar_cadena_utf8($_POST['v_descripcion']));
	
	$emp->orden = trim($f->guardar_cadena_utf8($_POST['v_orden']));
	$emp->estatus = trim($f->guardar_cadena_utf8($_POST['v_estatus']));

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
	$emp->politicascancelacion=$_POST['v_politicascancelacion'];
	$emp->politicasaceptacion=$_POST['v_politicasaceptacion'];
	$emp->reembolso=$_POST['v_reembolso'];
	$emp->cantidadreembolso=$_POST['v_cantidadreembolso'];
	$emp->asignadocliente=$_POST['v_asignadocliente'];
	$emp->asignadocoach=$_POST['v_asignadocoach'];
	$emp->asignadoadmin=$_POST['v_asignadoadmin'];
	$emp->numligarclientes=$_POST['v_numligarclientes'];
	$emp->controlasistencia=$_POST['v_asistencia'];

	//Validamos si hacermos un insert o un update
	if($emp->idservicio == 0)
	{
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
					$emp->GuardarZona();
					}

				}

			/*if (count($coachs)>0 && $coachs[0]!='') {
				for ($i=0; $i < count($coachs); $i++) { 
						$emp->idparticipantes=$coachs[$i];
						$emp->Guardarparticipantes();
					}
				}*/

			if (count($participantes)>0 && $participantes[0]!='') {
					for ($i=0; $i < count($participantes); $i++) { 
						$emp->idparticipantes=$participantes[$i];
						$emp->Guardarparticipantes();
					}
				}

				if (count($periodosinicial)>0 && $periodosinicial[0]!='') {
					for ($i=0; $i < count($periodosinicial); $i++) { 
						$emp->periodoinicial=$periodosinicial[$i];
						$emp->periodofinal=$periodosfinal[$i];

						$emp->GuardarPeriodo();
					}
				}

			if (count($descuentos)>0 && $descuentos[0]!='') {
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
				}

				if (count($encuestas)>0 && $encuestas[0]!='') {
				for ($i=0; $i < count($encuestas); $i++) { 
						$emp->idencuesta=$encuestas[$i];

						$emp->Guardarencuestas();
					}
				}


	}else{
		$emp->ModificarServicio();	
		$md->guardarMovimiento($f->guardar_cadena_utf8('Servicio'),'Servicio',$f->guardar_cadena_utf8('Modificación del Servicio -'.$emp->idservicio));

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
					$emp->GuardarZona();
					}

				}
				$emp->EliminarCoachs();
			if (count($coachs)>0 && $coachs[0]!='') {
					
					for ($i=0; $i < count($coachs); $i++) { 
						$emp->idparticipantes=$coachs[$i];
						$emp->Guardarparticipantes();
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

		$emp->Eliminardescuentos();

		if (count($descuentos)>0 && $descuentos[0]!='') {
					for ($i=0; $i < count($descuentos); $i++) { 
						$emp->iddescuento=$descuentos[$i];

						$emp->Guardardescuentos();
					}
				}

		$emp->Eliminardemembresias();

		if (count($membresias)>0 && $membresias[0]!='') {
				for ($i=0; $i < count($membresias); $i++) { 
						$emp->idmembresia=$membresias[$i];

						$emp->Guardarmembresias();
					}
				}

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
				
	$db->commit();
	echo "1|".$emp->idservicio;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>