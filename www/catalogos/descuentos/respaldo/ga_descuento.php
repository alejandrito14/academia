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
require_once("../../clases/class.Descuentos.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');
require_once('../../clases/class.Descuentosasignados.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$descuento = new Descuentos();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$descuento->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	$asignar=new Descuentosasignados();

	$asignar->db=$db;



	//Recbimos parametros
	$descuento->iddescuento = trim($_POST['id']);
	$descuento->titulo = trim($f->guardar_cadena_utf8($_POST['v_titulo']));
	$descuento->estatus=trim($f->guardar_cadena_utf8($_POST['v_estatus']));
	$descuento->tipo=$_POST['v_tipo'];
	$descuento->monto=$_POST['v_descuento'];
	$descuento->convigencia=$_POST['v_convigencia'];
	$descuento->vigencia=$_POST['v_vigencia'];

	$periodosinicial=explode(',', $_POST['v_periodoinicial']);
	$periodosfinal=explode(',', $_POST['v_periodofinal']);
	$porcantidadservicio=$_POST['porcantidadservicio'];
	$txtnumeroservicio=$_POST['txtnumeroservicio'];
	$portiposervicio=$_POST['portiposervicio'];
	$porservicio=$_POST['porservicio'];
	$porparentesco=$_POST['porparentesco'];
	$objetomultiparentesco=json_decode($_POST['objetomultiparentesco']);
	$porniveljerarquico=$_POST['porniveljerarquico'];
	$inppadre=$_POST['inppadre'];
	$inphijo=$_POST['inphijo'];
	$inpnieto=$_POST['inpnieto'];
	$modalidaddescuento=$_POST['modalidaddescuento'];
	$txtdiascaducidad=$_POST['txtdiascaducidad'];
	$porclientenoasociado=$_POST['porclientenoasociado'];
	$modalidaddescuento=$_POST['modalidaddescuento'];
	$porclientenoasociado=$_POST['porclientenoasociado'];

	$objetomultiprecios=json_decode($_POST['objetomultiprecios']);
	$v_acumulardescuento=$_POST['v_acumulardescuento'];
	$porhorarioservicio=$_POST['porhorarioservicio'];
	$cantidadhorariosservicios=$_POST['cantidadhorariosservicios'];
	$cantidaddias=$_POST['cantidaddias'];
	$descuento->porcantidadservicio=$porcantidadservicio;
	$descuento->dirigidoserviciocliente=$_POST['txtdirigido'];
	$descuento->txtnumeroservicio=$txtnumeroservicio;
	$descuento->portiposervicio=$portiposervicio;
	$descuento->porservicio=$porservicio;
	$descuento->porniveljerarquico=$porniveljerarquico;
	$descuento->inppadre=$inppadre;
	$descuento->inphijo=$inphijo;
	$descuento->inpnieto=$inpnieto;
	$descuento->modalidaddescuento=$modalidaddescuento;
	$descuento->txtdiascaducidad=$txtdiascaducidad;
	$descuento->porclientenoasociado=$porclientenoasociado;
	$descuento->acumuladescuento=$v_acumulardescuento;
	$descuento->porhorarioservicio=$porhorarioservicio;
	$descuento->cantidadhorariosservicios=$cantidadhorariosservicios;
	$descuento->cantidaddias=$cantidaddias;
	$descuento->porparentesco=$porparentesco;

	$tiposervicio=explode(',',$_POST['tiposervicio']);
	$servicios=explode(',', $_POST['servicios']);
/*	$descuento->modalidaddescuento
	$descuento->txtdiascaducidad
	$descuento->porclientenoasociado*/
	//Validamos si hacermos un insert o un update
	if($descuento->iddescuento == 0)
	{
		//guardando
		$descuento->Guardardescuento();
		$md->guardarMovimiento($f->guardar_cadena_utf8('descuento'),'descuento',$f->guardar_cadena_utf8('Nuevo descuento creado con el ID-'.$descuento->iddescuento));
	}else{
		$descuento->Modificardescuento();	
		$descuento->EliminarPeriodosVigencia();
		$descuento->EliminarTipoServicios();
		$descuento->EliminarServicios();
		$descuento->EliminarMultiparentesco();
		$descuento->EliminarMultiNoAsociados();

		$md->guardarMovimiento($f->guardar_cadena_utf8('descuento'),'descuento',$f->guardar_cadena_utf8('Modificación de descuento -'.$descuento->iddescuento));
	}



	if (count($periodosinicial)>0 && $periodosinicial[0]!='') {

					for ($i=0; $i < count($periodosinicial); $i++) { 
						$descuento->periodoinicial=$periodosinicial[$i];
						$descuento->periodofinal=$periodosfinal[$i];

						$descuento->GuardarPeriodo();
					}
				}


		if (count($tiposervicio)>0 && $tiposervicio[0]!='') {
			
			for ($i=0; $i < count($tiposervicio); $i++) { 

					$idcategoria=$tiposervicio[$i];
					$descuento->GuardarTipoDescuento($idcategoria);
				
			}
		}

		if (count($servicios)>0 && $servicios[0]!='') {
			for ($i=0; $i <count($servicios) ; $i++) { 
				

				$descuento->idservicio=$servicios[$i];
				$descuento->GuardarAsignaciondescuentos();
			}
		}


		if (count($objetomultiparentesco)>0) {
			for ($i=0; $i <count($objetomultiparentesco) ; $i++) { 
					$cantfamiliares=$objetomultiparentesco[$i]->{'cantfamiliares'};
					$idparentesco=$objetomultiparentesco[$i]->{'idparentesco'};
					$textoparentesco=$objetomultiparentesco[$i]->{'textoparentesco'};
					$tipodes=$objetomultiparentesco[$i]->{'tipodes'};
					$txtcantidaddescuento=$objetomultiparentesco[$i]->{'txtcantidaddescuento'};

					$descuento->GuardarMultiparentesco($cantfamiliares,$idparentesco,$textoparentesco,$tipodes,$txtcantidaddescuento);
					

			}
		}

		if (count($objetomultiprecios)>0) {
			
			for ($i=0; $i <count($objetomultiprecios) ; $i++) { 
				
				$cantidad=$objetomultiprecios[$i]->{'cantidad'};
				$txtcantidaddesc=$objetomultiprecios[$i]->{'txtcantidaddesc'};
				$tipodescuento=$objetomultiprecios[$i]->tipodescuento;

				$descuento->GuardarMultipleNoAsociado($cantidad,$txtcantidaddesc,$tipodescuento);
			}
		}

				
	$db->commit();
	echo "1|".$descuento->iddescuento;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>