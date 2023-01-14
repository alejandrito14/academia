<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.PagosCoach.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.ServiciosAsignados.php"); 
require_once("clases/class.Pagos.php");
require_once("clases/class.Usuarios.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new PagosCoach();
	$f=new Funciones();
	$fechas=new Fechas();
	$asignacion=new ServiciosAsignados();
	$asignacion->db=$db;
	$pagos=new Pagos();
	$pagos->db=$db;
	$usuarios=new Usuarios();
	$usuarios->db=$db;
	//Enviamos la conexion a la clase
	$lo->db = $db;

	$idusuarios=$_POST['id_user'];
	$lo->idusuarios=$idusuarios;
	$usuarios->idusuarios=$idusuarios;
    $datoscoach=$usuarios->ObtenerUsuarioDatos();
	$asignacion->idusuario=$idusuarios;
	$obtenerservicios=$asignacion->obtenerServiciosAsignadosCoach();
	$pagosdelcoach=array();

	$textoestatus=array('Pendiente','Aceptado','Cancelado');

	for ($i=0; $i <count($obtenerservicios); $i++) { 
			$idservicio=$obtenerservicios[$i]->idservicio;
			$idusuarios_servicios=$obtenerservicios[$i]->idusuarios_servicios;
			$asignacion->idusuarios_servicios=$idusuarios_servicios;
			$tipomontopago=$asignacion->ObtenertipoMontopago();
			$pagos->idservicio=$idservicio;
			$obtenerpagos=$pagos->ObtenerPagosServicio();

		if (count($tipomontopago)>0) {
				# code...
			if($tipomontopago[0]->monto>0) {
					# code...
				
			if (count($obtenerpagos)>0) {
				# code...

			for ($j=0;$j<count($obtenerpagos);$j++) { 
				# code...
					$idpago=$obtenerpagos[$j]->idpago;
					//echo $idpago;die();
					//$lo->idpago=$idpago;
					//$lo->idservicio=$idservicio;
					$existe=$lo->ObtenerPagoCoach($idpago,$idservicio);

					if (count($existe)==0) {
						# code...
					$pagos->idpago=$idpago;
				    $buscarpago=$pagos->ObtenerPago();
				   	//echo $pagos->idpago.'<br>';

				    $montopago=$buscarpago[0]->monto;
                    $idservicios=$buscarpago[0]->idservicio;
                    $monto=$asignacion->CalcularMontoPago($tipomontopago[0]->tipopago,$tipomontopago[0]->monto,$montopago);
                    $idpago=$buscarpago[0]->idpago;
	                $estatus=0;
	                $pagado=0;
	                $folio="";
	                $concepto=$buscarpago[0]->concepto;
	               // $lo->idpago=$pagos->idpago;
	                $text=$textoestatus[$estatus];
	                $usuarios->idusuarios=$buscarpago[0]->idusuarios;
	                $corresponde=$usuarios->ObtenerUsuarioDatos();
	                $objeto=array(
	                	'idpago'=>$buscarpago[0]->idpago,
	                	'idusuarios'=>$idusuarios,
	                	'idservicio'=>$idservicio,
	                	'concepto'=>$concepto,
	                	'textoestatus'=>$text,
	                	'estatus'=>0,
	                	'pagado'=>0,
	                	'folio'=>'',
	                	'corresponde'=>$corresponde,
	                	'monto'=>$monto	,
	                	'tipopago'=>$tipomontopago[0]->tipopago,
	                	'montopagocoach'=>$tipomontopago[0]->monto,
	                	'montopago'=>$montopago
	                );

	                 array_push($pagosdelcoach,$objeto);
					
							}

						}

					}
				}
			}

	
		}


		


	$respuesta['respuesta']=$pagosdelcoach;
	$respuesta['datoscoach']=$datoscoach;
	
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