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
require_once("../../clases/class.Juego.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');
require_once('../../clases/class.RoundRobin.php');
require_once('../../clases/class.Servicios.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$juego = new Juego();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	$juego->db=$db;
	$md->db = $db;
	$round=new RoundRobin();
	$servicio = new Servicios();
	$servicio->db=$db;
	
	$db->begin();
	$arraygrupos=json_decode($_POST['arraygrupos']);
	$idservicio=$_POST['idservicio'];
	$servicio->idservicio=$idservicio;
	$obtenerhorarios=$servicio->ObtenerHorariosSemana();

	$numerosparejas=array();
	$parejas=array();
	$grupos=array();
	$objetos=array();

	if (count($arraygrupos)>0) {

		for ($i=0; $i <count($arraygrupos) ; $i++) { 

			$nombregrupo=$arraygrupos[$i]->nombregrupo;
			$objetos=array();

			for ($j=0; $j <count($arraygrupos[$i]->{'participantes'}) ; $j++) { 

				$numeropareja=$arraygrupos[$i]->{'participantes'}[$j]->{'numeropareja'};
				
				array_push($numerosparejas,$numeropareja);

				array_push($parejas, $arraygrupos[$i]->{'participantes'}[$j]);

				$objeto=array('numeropareja'=>$numeropareja,'participantes'=>$arraygrupos[$i]->{'participantes'}[$j],'nombregrupo'=>$nombregrupo);

				array_push($objetos,$objeto);
				
			}


			array_push($grupos,$objetos);



		}
	}
 
	//echo json_encode($grupos);
	$roles=array();
 	for ($i=0; $i <count($grupos) ; $i++) { 
 		$numpareja=$grupos[$i];

 	
 		$numerosparejas=array();
 		 for ($j=0; $j < count($numpareja); $j++) { $nombregrupo=$grupos[$i][$j]['nombregrupo'];
 			$arreglo=$numpareja[$j]['numeropareja'];

 				array_push($numerosparejas,$arreglo);
 			}


 			$round->teams=$numerosparejas;
			$roldejuego=$round->create_round_robin_tournament($numerosparejas);

			
			$objetogrupo=array('nombregrupo'=>$nombregrupo,'rolesdejuego'=>$roldejuego);

			array_push($roles, $objetogrupo);

 	}

	
	/*$round->teams=$numerosparejas;
	$roldejuego=$round->create_round_robin_tournament($numerosparejas);

*/
	$posicion=0;

	
	for ($k=0; $k < count($roles); $k++) {

		$grupo=$roles[$k]['rolesdejuego'];


	for ($i=0; $i < count($grupo); $i++) { 
		
		$roles1=$grupo[$i]['roles'];
		
			
		for ($j=0; $j <count($roles1) ; $j++) { 
			
			$team1=$roles1[$j]['team1'];
			$team2=$roles1[$j]['team2'];


			$buscarpareja1=$juego->BuscarPareja($team1,$parejas);
			
			$roles[$k]['rolesdejuego'][$i]['roles'][$j]['pareja1']=$buscarpareja1;

			$buscarpareja2=$juego->BuscarPareja($team2,$parejas);

			$roles[$k]['rolesdejuego'][$i]['roles'][$j]['pareja2']=$buscarpareja2;

			
				
		}

	}
}


	$coincide=0;
/*	if (count($obtenerhorarios)) {
		$posicion=0;
		$coincide=1;

	for ($i=0; $i < count($roldejuego); $i++) { 
		
		$roles=$roldejuego[$i]['roles'];
		

		for ($j=0; $j <count($roles) ; $j++) { 
			
				$roldejuego[$i]['roles'][$j]['horario']=$obtenerhorarios[$posicion];
			
				$posicion++;

		}

	}

}*/

	$respuesta['respuesta']=$roles;
	$respuesta['parejas']=$parejas;
	$respuesta['coincide']=$coincide;


	echo json_encode($respuesta);
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>