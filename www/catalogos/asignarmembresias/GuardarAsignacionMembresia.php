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
require_once("../../clases/class.Membresia.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');
require_once('../../clases/class.MembresiasAsignadas.php');
require_once('../../clases/class.Pagos.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Membresia();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	$asignar=new MembresiasAsignadas();
	$asignar->db=$db;
	$pagos=new Pagos();
	$pagos->db=$db;
	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$asignar->idusuarios = trim($_POST['idusuario']);

	$idmembresias=explode(',',  $_POST['idmembresias']);
	
	
$asignar->EliminarAsignacionesMembresiasNoPagadas();
		if (count($idmembresias)>0 && $idmembresias[0]!='') {
			
			
			for ($i=0; $i < count($idmembresias); $i++) {

						$asignar->idmembresia=$idmembresias[$i];
						$asignacion=$asignar->ObtenerAsignacionMembresia();
						 
					if (count($asignacion)==0) {
					$asignar->GuardarAsignacionmembresia();
                    $emp->idmembresia=$idmembresias[$i];
                    $obtenermembresia=$emp->ObtenerMembresia();

                      $pagos->idusuarios=$asignar->idusuarios;
                      $pagos->idmembresia=$idmembresias[$i];
                      $pagos->idservicio=0;
                      $pagos->tipo=2;
                      $pagos->monto=$obtenermembresia[0]->costo;
                      $pagos->estatus=0;
                      $pagos->dividido='';
                      $pagos->fechainicial='';
                      $pagos->fechafinal='';
                      $pagos->concepto=$obtenermembresia[0]->titulo;
                      $contador=$emp->ActualizarConsecutivo();
                          $fecha = explode('-', date('d-m-Y'));
                        $anio = substr($fecha[2], 2, 4);
                        $folio = $fecha[0].$fecha[1].$anio.$contador;
                        
                      $pagos->folio=$folio;
                      $pagos->CrearRegistroPago();


						}
				}
			}

	$md->guardarMovimiento($f->guardar_cadena_utf8('Membresia'),'Asignación a usuario membresia',$f->guardar_cadena_utf8('Asignación a usuario -'.$asignar->idusuarios.' membresia: '.$idmembresias));

				
	$db->commit();
	$respuesta['respuesta']=1;
	echo json_encode($respuesta);
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>