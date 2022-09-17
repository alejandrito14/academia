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
require_once('../../clases/class.AsignarUsuarioServicio.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Servicios();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	$asignar=new AsignarUsuarioServicio();
	$asignar->db=$db;
	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$usuarios = json_decode($_POST['idusuario']);

	$idservicios=explode(',',  $_POST['idservicios']);
	
	
	for ($j=0; $j <count($usuarios); $j++) { 

		$asignar->idusuarios = $usuarios[$j]->{'idusuario'};
	
		if (count($idservicios)>0 && $idservicios[0]!='') {
			$asignar->EliminarAsignacionesSinAceptar();
			
			for ($i=0; $i < count($idservicios); $i++) { 
						$asignar->idservicio=$idservicios[$i];
						$asignacion=$asignar->ObtenerAsignacion();

						if (count($asignacion)==0) {
							$asignar->GuardarAsignacion();
						}
				}
			}else{

				$asignar->EliminarAsignacionesSinAceptar();
			}
		}

	$md->guardarMovimiento($f->guardar_cadena_utf8('Servicio'),'Asignación a usuario',$f->guardar_cadena_utf8('Asignación a usuario -'.' servicios: '.$idservicios));

				
	$db->commit();
	$respuesta['respuesta']=1;
	echo json_encode($respuesta);
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>