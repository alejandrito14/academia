<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Membresia.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.MembresiaUsuarioConfiguracion.php");
require_once("clases/class.Pagos.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Membresia();
	$f=new Funciones();
	$membresiaconfi=new MembresiaUsuarioConfiguracion();
	//Enviamos la conexion a la clase
	$lo->db = $db;
	$membresiaconfi->db=$db;

	$fechaactual=date('Y-m-d').' 23:59:59';
	$membresias=$lo->ObtenerUsuariosMembresia($fechaactual);

	var_dump($membresias);die();

	for ($i=0; $i < count($membresias); $i++) { 
		$lo->idusuarios_membresia=$membresias[$i]->idusuarios_membresia;
		$lo->estatus=2;
		$lo->ActualizarEstatusMembresia();


		$membresiaconfi->idusuarios=$membresias[$i]->idusuarios;
		$membresiaconfi->idmembresia=$membresias[$i]->idmembresia;
		$configuracionmembresia=$membresiaconfi->ObtenerConfiguracionMembresia();

		$lo->idmembresia=$membresias[$i]->idmembresia;

		$obtenercaducadas=$lo->ObtenerMembresiasCaducadas();

		$cantidadcaducadas=count($obtenercaducadas);
		if ($cantidadcaducadas<$configuracionmembresia[0]->repetir) {
				
			 	 $pagos->idusuarios=$idusuarios;
                 $pagos->estatus=0;
                 $pagos->pagado=0;
                 $pagos->idservicio=$idservicio;
                 $pagos->tipo=$tipo;
                 $pagos->monto=$montoapagar;
                 $pagos->dividido='';
                 $pagos->fechainicial='';
                 $pagos->fechafinal='';
                 $pagos->concepto=$concepto;
                 $pagos->idmembresia=0;
                 $pagos->folio="";
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