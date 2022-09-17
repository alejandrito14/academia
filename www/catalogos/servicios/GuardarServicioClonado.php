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
require_once('../../clases/class.ServiciosAsignados.php');
require_once('../../clases/class.Encuesta.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Servicios();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	$serviciciosasignados=new ServiciosAsignados();
	$serviciciosasignados->db=$db;
	$encuestas=new Encuesta();
	$encuestas->db=$db;
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
	
	//Recbimos parametros
	$emp->idservicio = trim($_POST['idservicio']);
	$general=$_POST['general'];
	$costos=$_POST['costos'];
	$v_politicasmensajes=$_POST['v_politicasmensajes'];
	$v_reglas=$_POST['v_reglas'];
	$v_coachs=$_POST['v_coachs'];

	$emp->titulo = trim($f->guardar_cadena_utf8($_POST['titulonuevo']));
	$idalumnos=explode(',',$_POST['idalumnos']);

	$obtenerservicio=$emp->ObtenerServicio();
	$datosservicio=$obtenerservicio[0];
	$obtenerperiodos="";

	if ($general==1) {

	$emp->descripcion = $datosservicio->descripcion;
	$emp->idcategoriaservicio = $datosservicio->idcategoriaservicio;
	$emp->idcategoria=$datosservicio->idcategoria;
	$emp->imagen=$datosservicio->imagen;
	$emp->orden = $datosservicio->orden;
	$emp->estatus = $datosservicio->estatus;
	}

	if ($costos==1) {

	$costo=$datosservicio->precio!=''?str_replace(',','',$datosservicio->precio):0;
		
	$emp->costo=$costo;
	$modalidad=$datosservicio->modalidad;
	$montopagarparticipante=$datosservicio->montopagarparticipante;
	$montopagargrupo=$datosservicio->montopagargrupo;
	$emp->modalidad=$modalidad;
	$emp->montopagarparticipante=$montopagarparticipante;
	$emp->montopagargrupo=$montopagargrupo;

	$emp->modalidadpago=$datosservicio->modalidadpago!=''?$datosservicio->modalidadpago:0;

	$emp->numparticipantes=$datosservicio->numeroparticipantes;
	$emp->numparticipantesmax=$datosservicio->numeroparticipantesmax;

	$emp->periodo=$datosservicio->periodo!=''? $datosservicio->periodo:0;
	//periodos de cobro

	$obtenerperiodos=$emp->ObtenerPeriodosPagos();

	}
	if ($v_politicasmensajes==1) {
		
		$emp->politicascancelacion=$datosservicio->politicascancelacion;
    	$emp->politicasaceptacion=$datosservicio->politicasaceptacion;

    	$emp->tiempoaviso=$datosservicio->tiempoaviso;
		$emp->tituloaviso=$datosservicio->tituloaviso;
		$emp->descripcionaviso=$datosservicio->descripcionaviso;
	

	}

	if ($v_reglas==1) {
		

		$emp->abiertocliente=$datosservicio->abiertocliente;
		$emp->abiertocoach=$datosservicio->abiertocoach;
		$emp->abiertoadmin=$datosservicio->abiertoadmin;
		$emp->ligarclientes=$datosservicio->ligarcliente;
		$emp->reembolso=$datosservicio->reembolso;
		$emp->cantidadreembolso=$datosservicio->cantidadreembolso;
		$emp->asignadocliente=$datosservicio->asignadocliente;
		$emp->asignadocoach=$datosservicio->asignadocoach;
		$emp->asignadoadmin=$datosservicio->asignadoadmin;
		$emp->numligarclientes=$datosservicio->numligarclientes;
		$emp->controlasistencia=$datosservicio->controlasistencia;



	}

	$coachs="";
	if ($v_coachs==1) {
		$serviciciosasignados->idservicio=$emp->idservicio;
		$coachs=$serviciciosasignados->BuscarAsignacionCoach();


	}

	$encuestaservicio=$encuestas->ObtenerEncuestasServicio();


	
	$arrayhorarios=explode(',', $_POST['v_arraydiaselegidos']);
	
	$periodosinicial=explode(',', $_POST['v_periodoinicial']);
	$periodosfinal=explode(',', $_POST['v_periodofinal']);

	$porcentajescoachs=json_decode($_POST['porcentajescoachs']);

	$encuestas=explode(',', $_POST['v_encuestas']);

	$emp->fechainicial=$_POST['v_fechainicial'];
	$emp->fechafinal=$_POST['v_fechafinal'];
	$lunes=$_POST['v_lunes'];
	$martes=$_POST['v_martes'];
	$miercoles=$_POST['v_miercoles'];
	$jueves=$_POST['v_jueves'];
	$viernes=$_POST['v_viernes'];
	$sabado=$_POST['v_sabado'];
	$domingo=$_POST['v_domingo'];
	
	$totalclase=0;
	$emp->totalclase=$totalclase;
	$emp->lunes=$lunes;
	$emp->martes=$martes;
	$emp->miercoles=$miercoles;
	$emp->jueves=$jueves;
	$emp->viernes=$viernes;
	$emp->sabado=$sabado;
	$emp->domingo=$domingo;
	$nombreimagen=$datosservicio->imagen;
	
			 


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


			$sql = "UPDATE servicios SET imagen = '$nombreimagen' WHERE idservicio='".$emp->idservicio."'";   
			$db->consulta($sql);


	if($v_coachs==1){

		if (count($coachs)>0 && $coachs!='') {
				for ($i=0; $i < count($coachs); $i++) { 
						$emp->idparticipantes=$coachs[$i]->idusuarios;
						$emp->Guardarparticipantes();

						$tipo=$coachs[$i]->tipopago;
						$monto=$coachs[$i]->monto;

						$emp->GuardarMontotipo($tipo,$monto);	
					}
				}
	}
			/*if (count($zonas)>0 && $zonas[0]!='') {
				for ($i=0; $i < count($zonas); $i++) { 

						$emp->idzona=$zonas[$i];
					$emp->GuardarZona();
					}

				}*/

			
				if (count($encuestaservicio)>0) {
				for ($i=0; $i < count($encuestaservicio); $i++) { 
						$emp->idencuesta=$encuestaservicio[$i]->idencuesta;

						$emp->Guardarencuestas();
					}
				}


	
			if (count($obtenerperiodos)>0  && $obtenerperiodos!="") {

			for ($i=0; $i < count($obtenerperiodos); $i++) { 

					$emp->periodoinicial=$obtenerperiodos[$i]->fechainicial;
					$emp->periodofinal=$obtenerperiodos[$i]->fechafinal;

					$emp->GuardarPeriodo();
				}
			}

			
			if (count($idalumnos)>0 && $idalumnos[0]!='') {
				for ($i=0; $i < count($idalumnos); $i++) { 
						$emp->idparticipantes=$idalumnos[$i];
						$emp->Guardarparticipantes();
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