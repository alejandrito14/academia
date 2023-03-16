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
	/*for ($i=0; $i < count($obtenerzonaho); $i++) { */
		/*$dia=$obtenerzonaho[$i]->dia;
		$horainicial=new DateTime($obtenerzonaho[$i]->horainicial);
		$horafinal=new Datetime($obtenerzonaho[$i]->horafinal);

		
		 $array=array();
		 $intervaloshorarios[$i]=array('dia'=>$dia,'horas'=>$array);*/
		 
		 $intervalos=$fechas->intervaloHora($obtenerzonaho[0]->horainicial,$obtenerzonaho[0]->horafinal,$row['intervalo']);
	
		 $horariosintervalos=array();
		for ($i=0; $i <count($intervalos) ; $i++) { 
			
			$horainicial=$intervalos[$i];
			$horafinal="";
			$co=$contador+1;

			if ($co<count($intervalos)) {
				$horafinal=$intervalos[$i+1];
			

			$objeto=array('horainicial'=>$horainicial,'horafinal'=>$horafinal);

			array_push($horariosintervalos, $objeto);
		}
			
			$contador++;
		}
		// array_push($intervaloshorarios[$i]["horas"], $intervalos);
	//}

	
		//var_dump($arreglodiasfechas);die();


		

			
			$zonasarray = $v_zonas;
			$arraydiaszonas=array();
			$arraydatoszona=array();
	
	
	//var_dump($arreglodiasfechas);

	$respuesta['respuesta']=$horariosintervalos;
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