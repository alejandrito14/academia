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
require_once("../../clases/class.Encuesta.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$encuesta = new Encuesta();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$encuesta->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
		




	//Recbimos parametros
	$encuesta->idencuesta = trim($_POST['id']);
	$encuesta->titulo = trim($f->guardar_cadena_utf8($_POST['v_titulo']));
	$encuesta->estatus=trim($f->guardar_cadena_utf8($_POST['v_estatus']));
	
	$preguntas=json_decode($_POST['preguntas']);
	
	//Validamos si hacermos un insert o un update
	if($encuesta->idencuesta == 0)
	{
		//guardando
		$encuesta->Guardarencuesta();
		$md->guardarMovimiento($f->guardar_cadena_utf8('encuesta'),'encuesta',$f->guardar_cadena_utf8('Nuevo encuesta creado con el ID-'.$encuesta->idencuesta));
	}else{
		$encuesta->Modificarencuesta();	
		$encuesta->EliminarPreguntas();
		$md->guardarMovimiento($f->guardar_cadena_utf8('encuesta'),'encuesta',$f->guardar_cadena_utf8('Modificación de encuesta -'.$encuesta->idencuesta));
	}


	for ($i=0; $i < count($preguntas); $i++) { 
			
			$titulocuestion=$preguntas[$i]->{'textopregunta'};
			$encuesta->titulocuestion=$titulocuestion;
			$encuesta->GuardarCuestion();

			$opciones=$preguntas[$i]->{'opcioneselegidas'};

			if (count($opciones)>0) {
				for ($j=0; $j <count($opciones) ; $j++) { 
					
					$idopcion=$opciones[$j];
					$encuesta->idopcion=$idopcion;
					$encuesta->GuardarOpcionCuestion();

				}
			}



		}
				
	$db->commit();
	echo "1|".$encuesta->idencuesta;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>