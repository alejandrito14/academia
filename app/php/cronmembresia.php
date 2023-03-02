<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Membresia.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.MembresiaUsuarioConfiguracion.php");
require_once("clases/class.Pagos.php");
require_once("clases/class.MembresiasAsignadas.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Membresia();
	$f=new Funciones();
	$membresiaconfi=new MembresiaUsuarioConfiguracion();
	$asignar=new MembresiasAsignadas();
	$pagos=new Pagos();
	$pagos->db=$db;
	$asignar->db=$db;
	//Enviamos la conexion a la clase
	$lo->db = $db;
	$membresiaconfi->db=$db;
	$db->begin();

	$fechaactual=date('Y-m-d');
		//$fechaactual='2023-02-28';

	$arraysinmembresia=array();
	$arrayconmembresia=array();

	$usuariosid=explode(',', $idusuario);

	//for ($k=0; $k <count($usuariosid) ; $k++) { 
		# code...
	
	$membresias=$lo->ObtenerUsuariosMembresia($fechaactual,$usuariosid[$k]);

	if (count($membresias)>0) {
		# code...
	
	for ($i=0; $i < count($membresias); $i++) { 
		$lo->idusuarios=$membresias[$i]->idusuarios;
		$lo->idmembresia=$membresias[$i]->idmembresia;
		$lo->estatus=2;
		$lo->ActualizarEstatusMembresia();

		$membresiaconfi->idusuarios=$membresias[$i]->idusuarios;
		$membresiaconfi->idmembresia=$membresias[$i]->idmembresia;
		

		if ($membresias[$i]->fechaexpiracion!='' && $membresias[$i]->fechaexpiracion!=null) {
			# code...
			$membresiaconfi->fechaexpiracion=date('Y-m-d',strtotime($membresias[$i]->fechaexpiracion));
		//var_dump($configuracion);die();
		if ($membresias[$i]->configuracion>0) {
			# code...
				$configuracion=$membresiaconfi->ObtenerConfiguracionMembresia();
			
			$lo->idmembresia=$membresias[$i]->idmembresia;

			$asignar->idusuarios = $membresias[$i]->idusuarios;
			$asignar->idmembresia = $lo->idmembresia;
			$asignar->fechaexpiracion=$configuracion[0]->fecha.' 23:59:59';
		    $asignar->GuardarAsignacionmembresia();
			$lo->idmembresia=$membresias[$i]->idmembresia;
        	$obtenermembresia=$lo->ObtenerMembresia();

                      $pagos->idusuarios=$asignar->idusuarios;
                      $pagos->idmembresia=$membresias[$i]->idmembresia;
                      $pagos->idservicio=0;
                      $pagos->tipo=2;
                      $pagos->monto=$obtenermembresia[0]->costo;
                      $pagos->estatus=0;
                      $pagos->dividido='';
                      $pagos->fechainicial='';
                      $pagos->fechafinal='';
                      $pagos->concepto=$obtenermembresia[0]->titulo;
                    
                     $pagos->folio='';
                     $pagos->CrearRegistroPago();

                     $asignar->idpago=$pagos->idpago;
                     $asignar->ActualizarIdPago();

                      $valor=array('idusuarios'=> $pagos->idusuarios,'idmembresia'=>$pagos->idmembresia,'fechaexpiracion'=>$asignar->fechaexpiracion);
				array_push($arrayconmembresia,$valor);

		}
	}

		//OBTENER CONFIGURACION DE MEMRESIA

		//$lo->


		//$membresiaconfi->idusuarios=$membresias[$i]->idusuarios;
		//$membresiaconfi->idmembresia=$membresias[$i]->idmembresia;
		//$configuracionmembresia=$membresiaconfi->ObtenerConfiguracionMembresia();

		
		//$obtenercaducadas=$lo->ObtenerMembresiasCaducadas();

		//$cantidadcaducadas=count($obtenercaducadas);
		//if ($cantidadcaducadas<$configuracionmembresia[0]->repetir) {
				
		


			//}
                     

	}

	}else{


		

	}

//}
	$db->commit();
	$respuesta['respuesta']=1;

	$nombreArchivo = "salidacronmembresia.txt";

	
	
	$respuesta['valoresconmembresia']=$arrayconmembresia;
	
	//Retornamos en formato JSON 
	$myJSON = json_encode($respuesta);
	file_put_contents($nombreArchivo, $myJSON, FILE_APPEND);
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