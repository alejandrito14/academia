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
	$servicio = new Servicios();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$servicio->db=$db;
	$md->db = $db;	

	

	//Recbimos parametros
	$servicio->idservicio = trim($_POST['idservicio']);
	$arrayelegidos=json_decode($_POST['arraydiaseleccionados']);
	$obtener=$servicio->ObtenerHorariosSemana($servicio->idservicioes);

	$cantidad=0;
	$fechaspasadas=0;
	if (count($arrayelegidos) ==count($obtener)) {
		$cantidad=1;
	
		$esigual=0;
			for ($i=0; $i < count($arrayelegidos); $i++) { 
				
				$fecha=$arrayelegidos[$i]->{'fecha'};
				$horainicial=$arrayelegidos[$i]->{'horainicial'};
				$horafinal=$arrayelegidos[$i]->{'horafinal'};
				for ($j=0; $j < count($obtener); $j++) { 

					
					if ($obtener[$j]->fecha==$fecha && $obtener[$j]->horainicial==$horainicial && $obtener[$j]->horafinal==$horafinal) {
						$esigual++;
						break;
					}
					
				}
			}
			$pasa=0;
			if ($esigual==count($obtener)) {
				$pasa=1;
			}
		
	


			if ($pasa==0) {
				//var_dump($arrayelegidos);
				$fechaactual=date('Y-m-d H:i');
			for ($i=0; $i < count($arrayelegidos); $i++) { 
			 $fechaelegida=date('Y-m-d H:i',$arrayelegidos[$i]->{'fecha'}.' '.$arrayelegidos[$i]->{'horainicial'});
			// echo $fechaelegida.'<'.$fechaactual.'<br>';
				if ($fechaelegida<$fechaactual) {
					$fechaspasadas++;
				}
	
			}

	}


}



	$respuesta['respuesta']=$obtener;
	$respuesta['cantidad']=$cantidad;
	$respuesta['fechaspasadas']=$fechaspasadas;
	$respuesta['esigual']=$esigual;

	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>