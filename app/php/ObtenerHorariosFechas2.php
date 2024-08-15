<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

//Importamos las clases que vamos a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.HorariosServicios.php");
require_once("clases/class.Categorias.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.CategoriasServicios.php");

require_once("clases/class.Funciones.php");
require_once("clases/class.Zonas.php");

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$horarioservicio = new HorariosServicios();
	$f = new Funciones();
	$categorias = new Categorias();
	$fechas = new Fechas();
	$categorias->db=$db;
	$categoriasservicios=new CategoriasServicios();
	$categoriasservicios->db=$db;

	$zonas=new Zonas();
	$zonas->db=$db;

	//enviamos la conexión a las clases que lo requieren
	$horarioservicio->db=$db;
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

	$zonaelegida=$_POST['v_zonas'];

	$filtrarzona='';
	$obtenertodaszonas=$zonas->ObtZonasActivos();


	if($zonaelegida!='' && $zonaelegida!=0) {
		$filtrarzona=$zonaelegida;
	}

	$obtenerzonas=$zonas->ObtZonasActivosConcat($filtrarzona);
	$v_zonas=explode(',',$obtenerzonas[0]->idzonas);

	/*$obtenerzonas=$zonas->ObtZonasActivosConcat();
	$v_zonas=explode(',',$obtenerzonas[0]->idzonas);*/
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

	 
	$horaactual=date('H:i:s');
	$categorias->idcategoria=$idtipocategoria;
	$obtenerzonaho=$categorias->ObtenerHorariosSemanaCategorias();

	$intervaloshorarios=array();
	for ($i=0; $i < count($obtenerzonaho); $i++) { 
		$dia=$obtenerzonaho[$i]->dia;
		$horainicial=new DateTime($obtenerzonaho[$i]->horainicial);
		$horafinal=new Datetime($obtenerzonaho[$i]->horafinal);
		
		//echo $horainicial.''.$horaactual.'<br>';
		//if ($horainicial>=$horaactual) {
			# code...
		
		 $array=array();
		 $intervaloshorarios[$i]=array('dia'=>$dia,'horas'=>$array,'fechaformato'=>'1');
		 
		 $intervalos=$fechas->intervaloHora($obtenerzonaho[$i]->horainicial,$obtenerzonaho[$i]->horafinal,$row['intervalo']);
	
		 array_push($intervaloshorarios[$i]["horas"], $intervalos);
		//}
	}

	
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

	//print_r($horariosdeseados);die();

	$horariosseleccionados=explode(',',$_POST['v_horarios']);
	//var_dump($horariosdeseados);die();
	//var_dump($arreglodiasfechas);die();
	$diashoras=array();
	for ($i=0; $i <count($horariosdeseados) ; $i++) { 
		
			$dia=$horariosdeseados[$i]['dia'];
			$arrayformateado=array();
				
				for ($j=0; $j <count($horariosdeseados[$i]['horas']) ; $j++) { 
						
					for ($k=0; $k <count($horariosdeseados[$i]['horas'][$j]) ; $k++) { 
						$agregar=1;


						if ($horariosseleccionados[0]!=0) {
							$agregar=0;
							for ($l=0; $l <count($horariosseleccionados) ; $l++) { 
								$dividirhora=explode('-',$horariosseleccionados[$l]);
							
								if (substr($horariosdeseados[$i]['horas'][$j][$k],0,5)==substr($dividirhora[0],0,5) && substr($horariosdeseados[$i]['horas'][$j][$k+1],0,5)==substr($dividirhora[1],0,5) ) {
								
									$agregar=1;
									break;
								}


							}
						

						}

						if ($agregar==1) {
							
							 $arreglo=array('horainicial'=> $horariosdeseados[$i]['horas'][$j][$k],'horafinal'=> $horariosdeseados[$i]['horas'][$j][$k+1],'disponible'=>0);
					 			array_push($arrayformateado, $arreglo);

					 			
						
							}

						}
				
				}
				$arreglo=array('dia'=>$dia,'horas'=>$arrayformateado,'fechaformato'=>'0');
				//print_r($arreglo);die();
				array_push($diashoras,$arreglo);
				

			}



		
			for ($i=0; $i <count($arreglodiasfechas) ; $i++) { 
					$arreglodiasfechas[$i]['horasposibles']=array();

					/*if (date('Y-m-d',strtotime($arreglodiasfechas[$i]['fecha']))==date('Y-m-d')) {

							for ($j=0; $j < count($diashoras); $j++) { 
						$arrayhoras=array();
						if ($arreglodiasfechas[$i]['numdia']==$diashoras[$j]['dia']) {

							for ($k=0; $k <count($diashoras[$j]['horas']) ; $k++) { 
							
								/*if(date('H:i:s',strtotime($diashoras[$j]['horas'][$k]['horainicial'])) >= $horaactual)
								{
								
									array_push($arrayhoras, $diashoras[$j]['horas'][$k]);
								//}
							
							}
						
							array_push($arreglodiasfechas[$i]['horasposibles'], $arrayhoras);
						}
					}
						
					}else{*/



							for ($j=0; $j < count($diashoras); $j++) { 
						
						if ($arreglodiasfechas[$i]['numdia']==$diashoras[$j]['dia']) {


							array_push($arreglodiasfechas[$i]['horasposibles'], $diashoras[$j]['horas']);
						}
					}

					//}

				

			}
			
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
					$horainicial=substr($arreglodiasfechas[$i]['horasposibles'][0][$j]['horainicial'], 0, 5);
					
					$horafinal=substr($arreglodiasfechas[$i]['horasposibles'][0][$j]['horafinal'],0,5);
					$horarioservicio->dia=$numdia;
					$horarioservicio->horainicial=$horainicial;
					$horarioservicio->horafinal=$horafinal;
					$horarioservicio->fecha=$fecha;
					
					/*$consultarsiestaocupado=$horarioservicio->Disponibilidad3();
					
					if (count($consultarsiestaocupado)>0) {
				

			$arreglodiasfechas[$i]['horasposibles'][0][$j]['disponible']=0;

					}else{*/

						/*if ($horafinal==NULL || $horainicial==NULL) {
					
					$arreglodiasfechas[$i]['horasposibles'][0][$j]['disponible']=0;
						
						}else{*/
							$arreglodiasfechas[$i]['horasposibles'][0][$j]['disponible']=1;

						

						
					//}

					

					
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
			$obtenerzonas2=$zonas->ObtZonasActivosConcat('');
			$v_zonas=explode(',',$obtenerzonas2[0]->idzonas);
			$zonasarray=$v_zonas;
			$arraydatoszona=array();

			for ($h=0; $h <count($zonasarray); $h++) { 
				$zonas->idzona=$zonasarray[$h];
				$datoszona=$zonas->ObtenerZona();
				array_push($arraydatoszona, $datoszona[0]);

			}


			if (count($arraydiaszonas)>0) {
				

				for ($i = 0; $i < count($arraydiaszonas); $i++) {
					$arraydiaszonas[$i]['fechaformato'] = '';
				    $fechaforma = $fechas->fecha_texto5($arraydiaszonas[$i]['fecha']);
				    $arraydiaszonas[$i]['fechaformato'] = $fechaforma;
				}
			}
			//print_r($arraydiaszonas);

			//$arrayLimitado = array_slice($arraydiaszonas, 0, 3);

			$arrayLimitado=$f->agruparPorFecha2($arraydiaszonas);

			//print_r($arrayagrupado);die();

usort($arrayLimitado, function($a, $b) {
    return strtotime($a['fecha']) - strtotime($b['fecha']);
});

	$respuesta['respuesta']=$arrayLimitado;
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