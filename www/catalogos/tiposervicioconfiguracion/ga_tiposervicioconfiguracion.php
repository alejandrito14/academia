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
require_once("../../clases/class.TiposervicioConfiguracion.php");require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$tiposervicioconfiguracion = new TiposervicioConfiguracion();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$tiposervicioconfiguracion->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
		




	//Recbimos parametros
	$tiposervicioconfiguracion->idtiposervicioconfiguracion = trim($_POST['id']);
	$tiposervicioconfiguracion->nombre = trim($f->guardar_cadena_utf8($_POST['v_nombre']));
	$tiposervicioconfiguracion->descripcion = trim($f->guardar_cadena_utf8($_POST['v_descripcion']));
	$tiposervicioconfiguracion->estatus = $_POST['v_estatus'];
 
	if ($tiposervicioconfiguracion->v_politicaaceptacionseleccion=='') {
		$tiposervicioconfiguracion->v_politicaaceptacionseleccion=0;
	}

	$tipousuario=$_SESSION['se_sas_Tipo'];
	$emp->precio=$_POST['v_costo'];
	$costo=$_POST['v_costo']!=''?str_replace(',','',$_POST['v_costo']):0;
	$totalclase=0;
	$valorclase=$_POST['v_totalclase'];
	if($valorclase!=''&& $valorclase!='undefined' ){
		$totalclase=$_POST['v_totalclase'];
	}

	if ($tiposervicioconfiguracion->v_politicaaceptacionseleccion=='') {
		$emp->v_politicaaceptacionseleccion=0;
	}

	$modalidad=$_POST['v_modalidad']!='undefined'?$_POST['v_modalidad']:0;
	$montopagarparticipante=$_POST['v_montopagarparticipante']!='undefined'?$_POST['v_montopagarparticipante']:0;
	$montopagargrupo=$_POST['v_montopagargrupo']!='undefined'?$_POST['v_montopagargrupo']:0;
	$tiposervicioconfiguracion->periodo=0;
	$tiposervicioconfiguracion->totalclase=$totalclase;
	$tiposervicioconfiguracion->modalidad=$modalidad;
	$tiposervicioconfiguracion->montopagarparticipante=$montopagarparticipante;
	$tiposervicioconfiguracion->montopagargrupo=$montopagargrupo;
	$tiposervicioconfiguracion->costo=$costo;
	$tiposervicioconfiguracion->costo=$costo;
	$tiposervicioconfiguracion->v_politicaaceptacionseleccion=$_POST['v_politicasaceptacionid'];
	$ruta="imagenes/".$_SESSION['codservicio'].'/';

	$tiposervicioconfiguracion->aceptarserviciopago=$_POST['v_aceptarserviciopago'];
	$tiposervicioconfiguracion->modalidadpago=$_POST['v_modalidadpago']!='undefined'?$_POST['v_modalidadpago']:0;

	$tiposervicioconfiguracion->numparticipantes=$_POST['v_numparticipantes'];
	$tiposervicioconfiguracion->numparticipantesmax=$_POST['v_numparticipantesmax'];

	$tiposervicioconfiguracion->abiertocliente=$_POST['abiertocliente'];
	$tiposervicioconfiguracion->abiertocoach=$_POST['abiertocoach'];
	$tiposervicioconfiguracion->abiertoadmin=$_POST['abiertoadmin'];
	$tiposervicioconfiguracion->ligarcliente=$_POST['v_ligarclientes'];
	$tiposervicioconfiguracion->tiempoaviso=$_POST['v_tiempoaviso'];
	$tiposervicioconfiguracion->tituloaviso=$_POST['v_tituloaviso'];
	
	$encuestas=explode(',', $_POST['v_encuestas']);
	$tiposervicioconfiguracion->descripcionaviso=$_POST['v_descripcionaviso']!='undefined'?$_POST['v_descripcionaviso']:'';

	$tiposervicioconfiguracion->politicascancelacion='';
	$tiposervicioconfiguracion->politicasaceptacion=$_POST['v_politicasaceptacion'];
	$tiposervicioconfiguracion->v_politicaaceptacionseleccion=$_POST['v_politicasaceptacionid'];
	//var_dump($emp->v_politicasaceptacionid);die();
	$tiposervicioconfiguracion->reembolso=$_POST['v_reembolso'];
	$tiposervicioconfiguracion->cantidadreembolso=$_POST['v_cantidadreembolso'];
	$tiposervicioconfiguracion->tiporeembolso=$_POST['v_tiporeembolso'];
	$tiposervicioconfiguracion->asignadocliente=$_POST['v_asignadocliente'];
	$tiposervicioconfiguracion->asignadocoach=$_POST['v_asignadocoach'];
	$tiposervicioconfiguracion->asignadoadmin=$_POST['v_asignadoadmin'];
	$tiposervicioconfiguracion->numligarclientes=$_POST['v_numligarclientes'];
	$tiposervicioconfiguracion->controlasistencia=$_POST['v_asistencia'];
	$tiposervicioconfiguracion->aceptarserviciopago =$_POST['v_aceptarserviciopago'];
	$arraytokens=array();

	$usuarios->id_usuario=$_SESSION['se_sas_Usuario'];
	$tiposervicioconfiguracion->idusuarios=$_SESSION['se_sas_Usuario'];

	$tiposervicioconfiguracion->diasperiodo=$_POST['v_cantidaddias'];
	$tiposervicioconfiguracion->orden=$_POST['v_orden'];
	$tiposervicioconfiguracion->nodedias=0;
	//Validamos si hacermos un insert o un update
	if($tiposervicioconfiguracion->idtiposervicioconfiguracion == 0)
	{
		//guardando
		$tiposervicioconfiguracion->Guardartiposervicioconfiguracion();
		$md->guardarMovimiento($f->guardar_cadena_utf8('tiposervicioconfiguracion'),'tiposervicioconfiguracion',$f->guardar_cadena_utf8('Nuevo tiposervicioconfiguracion creado con el ID-'.$tiposervicioconfiguracion->idtiposervicioconfiguracion));
	}else{
		$tiposervicioconfiguracion->Modificartiposervicioconfiguracion();
		$tiposervicioconfiguracion->EliminarEncuestas();	
		$md->guardarMovimiento($f->guardar_cadena_utf8('tiposervicioconfiguracion'),'tiposervicioconfiguracion',$f->guardar_cadena_utf8('Modificación de tiposervicioconfiguracion -'.$tiposervicioconfiguracion->idtiposervicioconfiguracion));
	}


	if (count($encuestas)>0 && $encuestas[0]!='') {
				for ($i=0; $i < count($encuestas); $i++) { 
					   $tiposervicioconfiguracion->idencuesta=$encuestas[$i];

						$tiposervicioconfiguracion->GuardarencuestasTipo();
					}
				}

				
	$db->commit();
	echo "1|".$tiposervicioconfiguracion->idtiposervicioconfiguracion;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>