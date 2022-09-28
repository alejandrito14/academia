<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Espacios.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Zonas.php");
require_once("clases/class.CategoriasServicios.php");
require_once("clases/class.Categorias.php");
require_once("clases/class.HorariosServicios.php");

//require_once("clases/class.MovimientoBitacora.php");
/*require_once("clases/class.Sms.php");
require_once("clases/class.phpmailer.php");
require_once("clases/emails/class.Emails.php");*/

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Servicios();
	$f=new Funciones();
	$categorias = new Categorias();
	$fechas = new Fechas();
	$espacios=new Espacios();
	$zonas=new Zonas();
	$zonas->db=$db;
	$categorias->db=$db;
	$categoriasservicios=new CategoriasServicios();
	$categoriasservicios->db=$db;
	$horarioservicio = new HorariosServicios();
	$horarioservicio->db=$db;


	$espacios->db=$db;
	$asignados = new ServiciosAsignados();
	$asignados->db=$db;
	//Enviamos la conexion a la clase
	$lo->db = $db;
	$lo->idservicio=$_POST['idservicio'];
	$datosservicio=$lo->ObtenerServicio(); 
	$tiposervicio=$datosservicio[0]->idcategoriaservicio;
	$categoriaservicio=$datosservicio[0]->idcategoria;



	$idcategoria=$categoriaservicio;
	$idtipocategoria=$tiposervicio;
	$lunes=$datosservicio[0]->lunes;
	$martes=$datosservicio[0]->martes;
	$miercoles=$datosservicio[0]->miercoles;
	$jueves=$datosservicio[0]->jueves;
	$viernes=$datosservicio[0]->viernes;
	$sabado=$datosservicio[0]->sabado;
	$domingo=$datosservicio[0]->domingo;
	$obtenerzonas=$zonas->ObtZonasActivosConcat();
	$v_zonas=explode(',',$obtenerzonas[0]->idzonas);
	$fecha=$_POST['fecha'];
	/*$v_fechainicial=$fechas->Primerdia_mes_fecha($fecha);
	$v_fechafinal=$fechas->Ultimodia_mes_fecha($fecha);*/

	$v_fechainicial=$_POST['fechainicial'];
	$v_fechafinal=$_POST['fechafinal'];

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

	//	var_dump($diashoras);die();


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

				
					if (count($consultarsiestaocupado)>0) {
						# code...

					
$arreglodiasfechas[$i]['horasposibles'][0][$j]['disponible']=0;

					}else{

						
							$arreglodiasfechas[$i]['horasposibles'][0][$j]['disponible']=1;

						
					}

					

					
				}
				array_push($arraydiaszonas,$arreglodiasfechas[$i] );

			}
		}


		$fechadia=date('Y-m-d',strtotime($v_fechainicial));

		$dia=date('w',strtotime($fechadia));

		/*if ($dia!=0) {
			
			 $unafechaantes  = (new DateTime($fechadia))->modify('-1 week');
			 $fechaanterior=$unafechaantes->format('Y-m-d');
			
			$diasentre=$fechas->DiasEntrefechas($fechaanterior,$fechadia);
			

				for ($j=0; $j <count($diasentre) ; $j++) { 
				if($diasentre[$j]['numdia']==0){

					$fechadia=$diasentre[$j]['fecha'];
					
					break;
				}
			}
		}*/

	$respuesta['respuesta']=$arraydiaszonas;
	$respuesta['zonas']=$arraydatoszona;
	$respuesta['fechadia']=$fechadia;
	$respuesta['arrayfechasdias']=$arrayfechasdias;

	echo json_encode($respuesta);



}catch(Exception $e){
	//$db->rollback();
	//echo "Error. ".$e;
	
	$array->resultado = "Error: ".$e;
	$array->msg = "Error al ejecutar el php";
	$array->id = '0';
		//Retornamos en formato JSON 
	$myJSON = json_encode($array);
	echo $myJSON;
}
?>