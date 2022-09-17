<?php
/*======================= INICIA VALIDACIÓN DE SESIÓN =========================*/

//Importamos las clases que vamos a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.HorariosServicios.php");
require_once("../../clases/class.Categorias.php");
require_once("../../clases/class.Fechas.php");
require_once("../../clases/class.CategoriasServicios.php");

require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');
require_once("../../clases/class.Zonas.php");

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$horarioservicio = new HorariosServicios();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	$categorias = new Categorias();
	$fechas = new Fechas();
	$categorias->db=$db;
	$categoriasservicios=new CategoriasServicios();
	$categoriasservicios->db=$db;

	$zonas=new Zonas();
	$zonas->db=$db;

	//enviamos la conexión a las clases que lo requieren
	$horarioservicio->db=$db;
	$md->db = $db;	
	$zonas->db=$db;
	$idzona=$_POST['idzona'];
	$idcategoria=$_POST['v_categoria'];
	$idtipocategoria=$_POST['v_tipocategoria'];
	$lunes=$_POST['lunes'];
	$martes=$_POST['martes'];
	$miercoles=$_POST['miercoles'];
	$jueves=$_POST['jueves'];
	$viernes=$_POST['viernes'];
	$sabado=$_POST['sabado'];
	$domingo=$_POST['domingo'];
	$obtenerzonas=$zonas->ObtZonasActivosConcat();
	$v_zonas=explode(',',$obtenerzonas[0]->idzonas);
	$v_fechainicial=$_POST['v_fechainicial'];
	$v_fechafinal=$_POST['v_fechafinal'];
	$dias="";

	if ($lunes==1) {
		$dias.='1,';
	}
	if ($martes==1) {
		$dias.='2,';
	}
	if ($miercoles==1) {
		$dias.='3,';
	}
	if ($jueves==1) {
		$dias.='4,';
	}
	if ($viernes==1) {
		$dias.='5,';
	}
	if ($sabado==1) {
		$dias.='6,';
	}
	if ($domingo==1) {
		$dias.='0';
	}
	$diasservicio=explode(',', $dias);
	$categoriasservicios->idcategoriasservicio=$idcategoria;
	$obtenerintervalo=$categoriasservicios->buscarcategoriasservicio();
	$row=$db->fetch_assoc($obtenerintervalo);

	

	$categorias->idcategoria=$idtipocategoria;
	$obtenerzonaho=$categorias->ObtenerHorariosSemanaCategorias();

	$intervaloshorarios=array();
	for ($i=0; $i < count($obtenerzonaho); $i++) { 
		$dia=$obtenerzonaho[$i]->dia;
		$horainicial=new DateTime($obtenerzonaho[$i]->horainicial);
		$horafinal=new Datetime($obtenerzonaho[$i]->horafinal);

		
		 $array=array();
		 $intervaloshorarios[$i]=array('dia'=>$dia,'horas'=>$array);
		 
		 $intervalos=$fechas->intervaloHora($obtenerzonaho[$i]->horainicial,$obtenerzonaho[$i]->horafinal,$row['intervalo']);
	
		 array_push($intervaloshorarios[$i]["horas"], $intervalos);
	}

	//var_dump($intervaloshorarios);die();
	$horariosdeseados=array();
	for ($i=0; $i <count($diasservicio) ; $i++) { 
		
		for ($j=0; $j <count($intervaloshorarios) ; $j++) { 
				if ($diasservicio[$i]!='') {

				
			if ($intervaloshorarios[$j]['dia']==$diasservicio[$i]) {
				$agregar=$intervaloshorarios[$j];
				array_push($horariosdeseados, $intervaloshorarios[$j]);

				}
			}
		}
	}

	//var_dump($horariosdeseados);die();
	//peridos


	$arrayperiodos=array('fechainicial'=>$v_fechainicial,'fechafinal'=>$v_fechafinal);


	$peridos=array();

	array_push($peridos,$arrayperiodos);

	$arrayfechasdias=array();
	for ($i=0; $i < count($peridos); $i++) { 
		
		$dias=$fechas->DiasEntrefechas($peridos[$i]['fechainicial'],$peridos[$i]['fechafinal']);

		array_push($arrayfechasdias,$dias);
	}

	$arreglodiasfechas=array();
	for ($i=0; $i <count($diasservicio) ; $i++) { 

		for ($j=0; $j <count($arrayfechasdias[0]) ; $j++) { 
			
			if($arrayfechasdias[0][$j]['numdia']==$diasservicio[$i]){

				$registro=$arrayfechasdias[0][$j];

				array_push($arreglodiasfechas, $registro);
			}
		}

	}
	//var_dump($arreglodiasfechas);die();
	$diashoras=array();
	for ($i=0; $i <count($horariosdeseados) ; $i++) { 
		
			$dia=$horariosdeseados[$i]['dia'];
			$arrayformateado=array();
				
				for ($j=0; $j <count($horariosdeseados[$i]['horas']) ; $j++) { 
					
					for ($k=0; $k <count($horariosdeseados[$i]['horas'][$j]) ; $k++) { 


					 				$arreglo=array('horainicial'=> $horariosdeseados[$i]['horas'][$j][$k],'horafinal'=> $horariosdeseados[$i]['horas'][$j][$k+1],'disponible'=>0);
					 			array_push($arrayformateado, $arreglo);


					 } 
				
				}

				$arreglo=array('dia'=>$dia,'horas'=>$arrayformateado);

				array_push($diashoras,$arreglo);
				

			}

		//var_dump($diashoras);die();


			for ($i=0; $i <count($arreglodiasfechas) ; $i++) { 
					$arreglodiasfechas[$i]['horasposibles']=array();

					for ($j=0; $j < count($diashoras); $j++) { 
						
						if ($arreglodiasfechas[$i]['numdia']==$diashoras[$j]['dia']) {


							array_push($arreglodiasfechas[$i]['horasposibles'], $diashoras[$j]['horas']);
						}
					}

			}
			//var_dump($arreglodiasfechas);die();
			$zonasarray = $v_zonas;
			$arraydiaszonas=array();
			$arraydatoszona=array();
			for ($h=0; $h <count($zonasarray); $h++) { 
				# code...
				$horarioservicio->idzona=$zonasarray[$h];
				$zonas->idzona=$zonasarray[$h];
				$datoszona=$zonas->ObtenerZona();
				array_push($arraydatoszona, $datoszona[0]);

			for ($i=0; $i <count($arreglodiasfechas) ; $i++) {

				$arreglodiasfechas[$i]['nombrezona']=$datoszona[0]->nombre;
				$arreglodiasfechas[$i]['idzona']=$datoszona[0]->idzona;
				$arreglodiasfechas[$i]['color']=$datoszona[0]->color;

				$fecha=$arreglodiasfechas[$i]['fecha']; 
				$numdia=$arreglodiasfechas[$i]['numdia'];
				$problema=0;
				for ($j=0; $j <count($arreglodiasfechas[$i]['horasposibles'][0]) ; $j++) { 
					$horainicial=substr($arreglodiasfechas[$i]['horasposibles'][0][$j]['horainicial'], 0, 5); ;

					$horafinal=substr($arreglodiasfechas[$i]['horasposibles'][0][$j]['horafinal'],0,5);
					$horarioservicio->dia=$numdia;
					$horarioservicio->horainicial=$horainicial;
					$horarioservicio->horafinal=$horafinal;
					$horarioservicio->fecha=$fecha;

					$consultarsiestaocupado=$horarioservicio->Disponibilidad3();
					//var_dump($consultarsiestaocupado);die();
					if (count($consultarsiestaocupado)>0) {
						# code...

					/*	$horarioreserva=0;

					
					for ($k=0; $k <count($consultarsiestaocupado) ; $k++) { 

					
					if ($consultarsiestaocupado[$k]->horainicial >=$horainicial   && $consultarsiestaocupado[$k]->horainicial <= $horafinal  && $consultarsiestaocupado[$k]->horafinal >= $horainicial  && $consultarsiestaocupado[$k]->horafinal<=  $horafinal) {
					//echo "<b>AMBAS horas estan DENTRO del horario anterior</b>";
					$horarioreserva ++;
				
					} elseif($horainicial <  $consultarsiestaocupado[$k]->horainicial && 
					 $horafinal >  $consultarsiestaocupado[$k]->horafinal) {
					//echo "<b>problema con la HORA FINAL</b>";
					$horarioreserva ++;
				
				
					} elseif($horafinal<  $consultarsiestaocupado[$k]->horainicial && $horafinal >  $consultarsiestaocupado[$k]->horafinal) {
					//echo "<b>problema con la HORA DE INICIO</b>";
					$horarioreserva++;
				
				
					}else{
					//echo "<b>horario DISPONIBLE</b>";
					$horarioreserva = 0;
					break;

						
					}

						

				}*/

				/*if ($horarioreserva==0) {
					$arreglodiasfechas[$i]['horasposibles'][0][$j]['disponible']=1;
				}else{

					$arreglodiasfechas[$i]['horasposibles'][0][$j]['disponible']=0;
				}*/

				/*if ($horafinal==NULL || $horainicial==NULL) {
					
					$arreglodiasfechas[$i]['horasposibles'][0][$j]['disponible']=0;
				}else{

					if ($problema==0) {


						$arreglodiasfechas[$i]['horasposibles'][0][$j]['disponible']=1;

						
						}else{

						$arreglodiasfechas[$i]['horasposibles'][0][$j]['disponible']=0;
						}
					}
*/
$arreglodiasfechas[$i]['horasposibles'][0][$j]['disponible']=0;

					}else{

						/*if ($horafinal==NULL || $horainicial==NULL) {
					
					$arreglodiasfechas[$i]['horasposibles'][0][$j]['disponible']=0;
						
						}else{*/
							$arreglodiasfechas[$i]['horasposibles'][0][$j]['disponible']=1;

						//}

						
					}

					

					
				}
				array_push($arraydiaszonas,$arreglodiasfechas[$i] );

			}
		}


		$fechadia=date('Y-m-d',strtotime($v_fechainicial));
		$dia=date('w',strtotime($fechadia));

		if ($dia!=0) {
			
			 $unafechaantes  = (new DateTime($fechadia))->modify('-1 week');
			 $fechaanterior=$unafechaantes->format('Y-m-d');
			
			$diasentre=$fechas->DiasEntrefechas($fechaanterior,$fechadia);
			

				for ($j=0; $j <count($diasentre) ; $j++) { 
				if($diasentre[$j]['numdia']==0){

					$fechadia=$diasentre[$j]['fecha'];
					
					break;
				}
			}
		}
	//var_dump($arreglodiasfechas);

	$respuesta['respuesta']=$arraydiaszonas;
	$respuesta['zonas']=$arraydatoszona;
	$respuesta['fechadia']=$fechadia;
	$respuesta['arrayfechasdias']=$arrayfechasdias;

	echo json_encode($respuesta);


	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>