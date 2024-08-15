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
require_once("clases/class.Calificacion.php");
require_once("clases/class.Comentarios.php");
require_once("clases/class.Chat.php");

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
	$fechas=new Fechas();
	$espacios=new Espacios();


	$calificacion=new Calificacion();
	$comentarios=new Comentarios();
	$salachat=new Chat();

	$calificacion->db=$db;
	$comentarios->db=$db;
	$salachat->db=$db;

	$espacios->db=$db;
	$asignados = new ServiciosAsignados();
	$asignados->db=$db;
	//Enviamos la conexion a la clase
	$lo->db = $db;

	$lo->estatus=$_POST['estatus'];
	$idcategorias=0;
	$v_coach=0;
	$v_mes=0;
	$v_anio=0;
	if (isset($_POST['v_categorias'])) {
		$idcategorias=$_POST['v_categorias'];
	}

	if (isset($_POST['v_coach'])) {
		$v_coach=$_POST['v_coach'];

	}
	if (isset($_POST['v_mes'])) {
		$v_mes=$_POST['v_mes'];

	}

	if (isset($_POST['v_anio'])) {
		$v_anio=$_POST['v_anio'];
	}else{

		$v_anio=date('Y');
	}

	
	$obtenerservicios=$lo->ObtenerServiciosAdmin2($idcategorias,$v_coach,$v_mes,$v_anio);
 


	/*usort($obtenerservicios, function ($a, $b) {
    return strcmp($b->fechahora,$a->fechahora);
	});*/


	$fechaactual=date('Y-m-d');

	//$diasemana=$fechas->saber_dia($fechaactual);
	$dianumero=explode('-',$fechaactual);
	$fechaactual=$dianumero[2].'/'.$fechas->mesesAnho3[$fechas->mesdelano($fechaactual)-1].' '.$dianumero[0];

	$respuesta['fechaactual']=$fechaactual;
	$respuesta['respuesta']=$obtenerservicios;
	
	//Retornamos en formato JSON 
	$myJSON = json_encode($respuesta);
	echo $myJSON;

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