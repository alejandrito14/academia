<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Sala.php");
require_once("clases/class.ServiciosAsignados.php");

require_once("clases/class.Servicios.php");
try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Usuarios();
	$f=new Funciones();
	$sala=new Sala();
	$sala->db=$db;
	$asignados = new ServiciosAsignados();
	$asignados->db=$db;
	$servicios=new Servicios();
	$servicios->db=$db;


	//Enviamos la conexion a la clase
	$lo->db = $db;
	$lo->idusuarios=$_POST['id_user'];

	$obtener=$lo->ObtenerTutoradosSincel();
	if (count($obtener)>0) {
	
	
	for ($i=0; $i <count($obtener) ; $i++) { 
		$sala->idusuario=$obtener[$i]->idusuarios;
		$idusuario=$obtener[$i]->idusuarios;
		$existesala=$sala->ContarChatsSala();

		$obtener[$i]->chat=0;
		$obtener[$i]->cantidadchat=0;

		if (count($existesala)>0) {
			$obtener[$i]->chat=1;
			$obtener[$i]->cantidadchat=count($existesala);

		}
		$asignados->idusuario=$idusuario;
		$serviciosasignadospend=$asignados->obtenerServiciosAsignadosPendientes();

		$obtener[$i]->contadorasignadospendientes=count($serviciosasignadospend);

		$serviciosasignados=$asignados->obtenerServiciosAsignadosTuto();

		$obtener[$i]->contadorasignados=count($serviciosasignados);

		$obtenerservicios=$asignados->obtenerServiciosAsignadosAgrupados();

		$serviciosasignados2=$obtenerservicios[0]->serviciosasignados;
		
		$obtener[$i]->contadorActivos=0;
		if ($serviciosasignados2!=null) {
			$obtenerserviciosActivos=$servicios->ObtenerServiciosActivos($serviciosasignados2);

			$obtener[$i]->contadorActivos=count($obtenerserviciosActivos);
		}
		//

		//


	}

}

	$respuesta['respuesta']=$obtener;
	
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