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
require_once("../../clases/class.Dashboard.php");

require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');
require_once("../../clases/class.Fechas.php");
require_once("../../clases/class.Zonas.php");
require_once("../../clases/class.HorariosServicios.php");

	

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$dashboard = new Dashboard();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	$fechas=new Fechas();
	$zonas=new Zonas();
	$horarioservicio = new HorariosServicios();

	$horarioservicio->db=$db;
	//enviamos la conexión a las clases que lo requieren
	$dashboard->db=$db;
	$md->db = $db;	
	$zonas->db=$db;

	$fecha=date('Y-m-d');
	$fechas->fecha=$fecha;

	$dashboard->fechainicial=$fecha;
	//echo $primerdiames.''.$ultimodiames;die();
	$obtener=$dashboard->ObtenerHorariosFechaEspecificaOrdenHorainicial();

	$obtenerfecha=$fechas->fecha_texto4($fecha);
	
	$obtenerintervalos=$fechas->intervaloHora('00:00:00','23:59:00',30);

	$obtenerzonas=$zonas->ObtZonasActivosOrdenadas();




	for ($i=0; $i <count($obtenerzonas) ; $i++) { 
		
			$obtenerzonas[$i]->intervalos=array();
			
				for ($k=0; $k <count($obtenerintervalos); $k++) { 
					
					$hora1intervalo=$obtenerintervalos[$k];
					$hora2intervalo=$obtenerintervalos[$k+1];

						/*if (($k+1)==count($obtenerintervalos)) {
							$hora2intervalo=$obtenerintervalos[0];
						}*/
				if ($hora1intervalo!='' && $hora2intervalo!='') {
							# code...
						
					$horarioservicio->idzona=$obtenerzonas[$i]->idzona;
					$horarioservicio->horainicial=substr($hora1intervalo, 0, 5);
					$horarioservicio->horafinal=substr($hora2intervalo, 0, 5);
					$horarioservicio->fecha=$fecha;


					$consultarsiestaocupado=$horarioservicio->Disponibilidad4();

					$disponible=1;
					if (count($consultarsiestaocupado)>0) {

						$disponible=0;
					}

				}
						$arrayintervalo = array('horainicialntervalo' =>$hora1intervalo ,'horafinalintervalo'=>$hora2intervalo,'disponible'=>$disponible,'servicio'=>$consultarsiestaocupado);

						array_push($obtenerzonas[$i]->intervalos, $arrayintervalo);

				}


				
			

	}


	$respuesta['respuesta']=1;
	$respuesta['fechaactual']=$obtenerfecha;
	$respuesta['horarios']=$obtener;
	$respuesta['intervalos']=$obtenerintervalos;
	$respuesta['pxintervalo']=30+10;
	$respuesta['zonas']=$obtenerzonas;
	$respuesta['fecha']=$fecha;

	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>