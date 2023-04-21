<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Pagos.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.Membresia.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.ServiciosAsignados.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Pagos();
	$usua=new Usuarios();
	$membresia= new Membresia();
	$servicio=new Servicios();
	$servicio->db=$db;

	$asignacion=new ServiciosAsignados();
	$asignacion->db=$db;

	$usua->db=$db;
	$lo->db=$db;
	$membresia->db=$db;
	$lo->idusuarios=$_POST['id_user'];
	$usua->idusuarios=$_POST['id_user'];
	$pagoselegidos=json_decode($_POST['pagos']);

	$obteneradeudos=array();

$contarpagos=0;
$pagoparaaceptar=array();
for ($j=0; $j <count($pagoselegidos); $j++) { 
		$idpago=$pagoselegidos[$j]->{'id'};
		$lo->idpago=$idpago;

		$buscar=$lo->ObtenerPago();
		$usua->idusuarios=$buscar[0]->idusuarios;
		if (count($buscar)>0) {

			if ($buscar[0]->requiereaceptacion==1) {
					# code...
				
				$servicio->idservicio=$buscar[0]->idservicio;
				$buscarservicio= $servicio->ObtenerServicioPolitica();
				$asignacion->idservicio=$servicio->idservicio;
				$asignacion->idusuario=$buscar[0]->idusuarios;
				$asignacionusuario=$asignacion->BuscarAsignacion();
				$obtenerhorarios1=$asignacion->ObtenerHorariosServicio();
				$objeto=array('idpago'=>$idpago,'concepto'=>$buscar[0]->concepto,'politicasservicio'=>$buscarservicio[0]->descripcion,'fechainicial'=>$buscarservicio[0]->fechainicial,'fechafinal'=>$buscarservicio[0]->fechafinal,'idusuarios_servicios'=>$asignacionusuario[0]->idusuarios_servicios,'horarios'=>count($obtenerhorarios1),'idservicio'=>$servicio->idservicio);

				array_push($pagoparaaceptar,$objeto);
				}
					
			}
		}
	



	

	$respuesta['respuesta']=1;
	$respuesta['pagoparaaceptar']=$pagoparaaceptar;
	//Retornamos en formato JSON 
	$myJSON = json_encode($respuesta);
	echo $myJSON;

}catch(Exception $e){
	$db->rollback();
	//echo "Error. ".$e;
	
	$array->resultado = "Error: ".$e;
	$array->msg = "Error al ejecutar el php";
	$array->id = '0';
		//Retornamos en formato JSON 
	$myJSON = json_encode($array);
	echo $myJSON;
}
?>