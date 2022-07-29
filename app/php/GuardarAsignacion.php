<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.ServiciosAsignados.php");


try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$f=new Funciones();
	$serviciosasignados = new ServiciosAsignados();

	$db->begin();

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$serviciosasignados->db=$db;
	$idusuariosparaasignar=$_POST['idusuarios'];
	$idusuarios=explode(',', $_POST['idusuarios']);
	$idservicio=$_POST['idservicio'];
	$iduser=$_POST['id_user'];
	$serviciosasignados->idservicio=$idservicio;
	$obtenerdatosservicio=$serviciosasignados->ObtenerServicio();


	for ($i=0; $i <count($idusuarios) ; $i++) { 
		$serviciosasignados->idusuario=$idusuarios[$i];
		$serviciosasignados->idservicio=$idservicio;
		
		$consulta=$serviciosasignados->BuscarAsignacion();

		if (count($consulta)==0) {
		$serviciosasignados->GuardarAsignacion();

		}
	}


	$obtenerusuarioscancelacion=$serviciosasignados->BuscarAsignacionCancelacion($idusuariosparaasignar);

	if (count($obtenerusuarioscancelacion)>0) {
		for ($i=0; $i < count($obtenerusuarioscancelacion); $i++) { 

			$idusuariocancelado=$obtenerusuarioscancelacion[$i]->idusuarios;

			$serviciosasignados->idusuario=$idusuariocancelado;

			$serviciosasignados->motivocancelacion="cancelado desde la app por usuario ".$iduser;
			$serviciosasignados->cancelado=1;
			$serviciosasignados->CambiarEstatusServicio($obtenerusuarioscancelacion[$i]->idusuarios_servicios);

			if ($obtenerusuarioscancelacion[$i]->aceptarterminos==1) {
				$pagos=$serviciosasignados->BuscarPagos();

				for ($j=0; $j < count($pagos); $j++) { 
					
					if ($pagos[$j]->pagado==1 && $pagos[$j]->estatus==2) {
						$idpago=$pagos[$j]->idpago;
						
						if($obtenerdatosservicio[0]->reembolso==1){
							$estatus=4;
						
							}else{
								$estatus=5;
							}
						
						$serviciosasignados->CambiarEstatusPago($idpago,$estatus);
					}
				}

			}
			
		}
	}
	
	$db->commit();

	$respuesta['respuesta']=1;

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