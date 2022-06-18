<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Pagos.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$servicios = new Servicios();
	$servicios->db=$db;
	$f=new Funciones();
	$pagos= new Pagos();
	$pagos->db=$db;

	//Enviamos la conexion a la clase
	$lo->db = $db;

	$lo->idusuarios_servicios=$_POST['idusuarios_servicios'];
	$lo->GuardarAceptacion();


	$obtenerservicioasignado=$lo->ObtenerServicioAsignado();

	$idservicio=$obtenerservicioasignado[0]->idservicio;
	$idusuarios=$obtenerservicioasignado[0]->idusuarios;

	$servicios->idservicio=$idservicio;
	$obtenerservicio=$servicios->ObtenerServicio();

	$modalidad=$obtenerservicio[0]->modalidad;
	$costo=$obtenerservicio[0]->precio;
	if ($modalidad==1) {
		
		$montoapagar=$costo;

	}

	if ($modalidad==2) {
		//grupo
		$obtenerparticipantes=$servicios->ObtenerParticipantes(3);
		$cantidadparticipantes=count($obtenerparticipantes);
		$montoapagar=$costo/$cantidadparticipantes;

	}

	if ($costo>0) {

		$obtenerperiodos=$servicios->ObtenerPeriodosPagos();

		for ($i=0; $i < count($obtenerperiodos); $i++) { 

			$pagos->idusuarios=$idusuarios;
			$pagos->idmembresia=0;
			$pagos->idservicio=$idservicio;
			$pagos->tipo=1;
			$pagos->monto=$montoapagar;
			$pagos->estatus=1;
			$pagos->dividido=$modalidad;
			$pagos->fechainicial=$obtenerperiodos[$i]->fechainicial;
			$pagos->fechafinal=$obtenerperiodos[$i]->fechafinal;
			$pagos->concepto=$obtenerservicio[0]->titulo;
			$pagos->CrearRegistroPago();

		}
	}
	

	$respuesta['respuesta']=1;
	
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