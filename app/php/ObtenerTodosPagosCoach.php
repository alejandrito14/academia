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
require_once("clases/class.Servicios.php");

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

	$servicios=new Servicios();
    $servicios->db=$db;

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$buscador="";
	if (isset($_POST['buscador'])) {
	$buscador=$_POST['buscador'];
	}

	$idusuarios=$_POST['id_user'];
	$lo->idusuarios=$idusuarios;
	$usuarios->idusuarios=$idusuarios;
    $datoscoach=$usuarios->ObtenerUsuarioDatos();
	$asignacion->idusuario=$idusuarios;
	$obtenerservicios=$asignacion->obtenerServiciosAsignadosCoach2($buscador);
	$pagosdelcoach=array();

	$textoestatus=array('Pendiente','Pagado','Cancelado');

	for ($i=0; $i <count($obtenerservicios); $i++) {
	 $idservicio=$obtenerservicios[$i]->idservicio;
	 $servicios->idservicio=$idservicio;
	 $obtenerperiodoshoras=$servicios->ObtenerFechaHoras();
			$idusuarios_servicios=$obtenerservicios[$i]->idusuarios_servicios;
			$asignacion->idusuarios_servicios=$idusuarios_servicios;
			$tipomontopago=$asignacion->ObtenertipoMontopago();
			$pagos->idservicio=$idservicio;
			$servicios->idservicio=$idservicio;
			$asignacion->idservicio=$idservicio;
			$asignacion->idusuario=0;
			$obtenerAlumnosServicio=$asignacion->obtenerUsuariosServiciosAsignadosAlumnos();

		for ($h=0; $h <count($obtenerAlumnosServicio) ; $h++) { 
				# code...
				$idusuariosalumno=$obtenerAlumnosServicio[$h]->idusuarios;
			$pagos->idusuarios=$obtenerAlumnosServicio[$h]->idusuarios;


		if (count($tipomontopago)>0) {
				# code...
			if($tipomontopago[0]->monto>0) {
					# code...
				
					$obtenerperiodos=$servicios->ObtenerPeriodosPagos();
					

						for ($a=0; $a < count($obtenerperiodos); $a++) { 
							# code...




							$fechainicial=$obtenerperiodos[$a]->fechainicial;
			   	$fechafinal=$obtenerperiodos[$a]->fechafinal;

			   	$pagos->fechainicial=$fechainicial;
			   	$pagos->fechafinal=$fechafinal;
							$obtenerpagos=$pagos->ObtenerPagosServicio($sqlfecha);

		/*if ($idservicio==262) {
			echo 'usuario'.$idusuariosalumno.'<br>';
			var_dump($obtenerperiodos);die();
			}*/
			if (count($obtenerpagos)>0) {
				# code...

			for ($j=0;$j<count($obtenerpagos);$j++) { 
				# code...
					$idpago=$obtenerpagos[$j]->idpago;
					$lo->fechainicial=$fechainicial;
					$lo->fechafinal=$fechafinal;
					
					$existe=$lo->ObtenerPagoCoach($idpago,$idservicio);
					$estatus=0;
					$estatuspago=$obtenerpagos[$j]->pagado;
					if (count($existe)>0) {
						$estatus=1;
					}
						# code...
					$pagos->idpago=$idpago;
				    $buscarpago=$pagos->ObtenerPagoSoloDescuento();

				    $montopago=$buscarpago[0]->montocondescuento;

        $idservicios=$buscarpago[0]->idservicio;
        $monto=$asignacion->CalcularMontoPago($tipomontopago[0]->tipopago,$tipomontopago[0]->monto,$montopago);


                    if ($montopago>=0) {
                    	# code...
                    
                    $idpago=$buscarpago[0]->idpago;
	                //$estatus=0;
	                $pagado=0;
	                $folio="";
	                $concepto=$buscarpago[0]->concepto;
	               // $lo->idpago=$pagos->idpago;
	                $text=$textoestatus[$estatuspago];
	                $usuarios->idusuarios=$buscarpago[0]->idusuarios;
	                $corresponde=$usuarios->ObtenerUsuarioDatos();

	                $folio=$pagos->ObtenerFolio();
	                
	                $objeto=array(
	                	'idpago'=>$buscarpago[0]->idpago,
	                	'idusuarios'=>$idusuarios,
	                	'idservicio'=>$idservicio,
	                	'concepto'=>$concepto,
	                	'textoestatus'=>$text,
	                	'estatuscoach'=>$estatus,
	               		'estatuspago'=>$estatuspago,

	                	'pagado'=>0,
	                	'folio'=>'',
	                	'corresponde'=>$corresponde,
	                	'monto'=>$monto	,
	                	'tipopago'=>$tipomontopago[0]->tipopago,
	                	'montopagocoach'=>$tipomontopago[0]->monto,

	                	'montopago'=>$montopago,
	                	'montosindescuento'=>$buscarpago[0]->monto,
	                	'descuento'=>$buscarpago[0]->descuento!=0?$buscarpago[0]->descuento:0,
	                	'descuentomembresia'=>0,
	                	'folio'=>$folio[0]->folio,
	                	'tipopagonota'=>$folio[0]->tipopago,
	                	'fechainicial'=>$fechainicial,
	                	'fechafinal'=>$fechafinal,
	                	'periodoinicial'=>date('d/m/Y',strtotime($obtenerperiodoshoras[0]->fechamin)),
	                	'periodofinal'=>date('d/m/Y',strtotime($obtenerperiodoshoras[0]->fechamax)),
	                );

	                 array_push($pagosdelcoach,$objeto);
					
							}
					

						}

					}else{

						$usuarios->idusuarios=$idusuariosalumno;
					
				 $corresponde=$usuarios->ObtenerUsuarioDatos();

			
			
								$pagos->idusuarios=$usuarios->idusuarios;
								$pagos->idservicio=$idservicio;
								$pagos->fechainicial=$fechainicial;
								$pagos->fechafinal=$fechafinal;

								$modalidad=$obtenerservicios[0]->modalidad;
								$costo=$obtenerservicios[0]->precio;
								if ($modalidad==1) {
									
									$montoapagar=$costo;

								}

							

							if ($modalidad==2) {
								//grupo
								$obtenerparticipantes=$servicios->ObtenerParticipantes(3);
							
								$cantidadparticipantes=count($obtenerparticipantes);
								$costo=$obtenerservicios[0]->precio;

								$obtenerhorarios=$servicios->ObtenerHorariosSemana();
								
								$monto=$costo*count($obtenerhorarios);

								$montoapagar=$monto/$cantidadparticipantes;

							}

						if ($costo>0) {

							$obtenerperiodop=$servicios->ObtenerPeriodosPagos();

							$numeroperiodos=count($obtenerperiodop);
							$montoapagar=$montoapagar/$numeroperiodos;


							

								//$idusuarios='';
								$idmembresia=0;
								$idservicio=$idservicio;
								$tipo=1;
								$monto=$montoapagar;
								$estatus=0;
								$dividido=$modalidad;
								$fechainicial=$obtenerperiodos[$a]->fechainicial;
								$fechafinal=$obtenerperiodos[$a]->fechafinal;
								$concepto=$obtenerservicio[0]->titulo;
								//$contador=$lo->ActualizarConsecutivo();
					   		  
					   			
									$folio="";

									$fecha=$obtenerperiodos[$k]->fechafinal;
									$lo->idpago=$obtener[$i]->idpago;
									$obtener[$i]->fechaformato='';
									if ($fecha!='') {
												# code...
											
											$dianumero=explode('-',$fecha);
											$fechaformato=$dianumero[2].'/'.$fechas->mesesAnho3[$fechas->mesdelano($fecha)-1];

											}

				         $text=$textoestatus[$estatus];

					$objeto=array(
	                	'idpago'=>'',
	                	'idusuarios'=>$idusuarios,
	                	'idservicio'=>$idservicio,
	                	'concepto'=>$obtenerservicios[$i]->titulo,
	                	'textoestatus'=>$text,
	                	'estatuspago'=>0,
	                	'estatuscoach'=>0,
	                	'pagado'=>0,
	                	'folio'=>'',
	                	'corresponde'=>$corresponde,
	                	'monto'=>0	,
	                	'tipopago'=>$tipomontopago[0]->tipopago,
	                	'montopagocoach'=>$tipomontopago[0]->monto,
	                	'montopago'=>0,
	                	'montosindescuento'=>$montoapagar,
	                	'descuento'=>0,
	                	'descuentomembresia'=>0,
	                	'folio'=>'',
	                		'tipopagonota'=>'',
	                		'fechainicial'=>$fechainicial,
	                	'fechafinal'=>$fechafinal,
	                	'periodoinicial'=>date('d/m/Y',strtotime($obtenerperiodoshoras[0]->fechamin)),
	                	'periodofinal'=>date('d/m/Y',strtotime($obtenerperiodoshoras[0]->fechamax))
	                );
									
								  						 array_push($pagosdelcoach,$objeto);

																	}

													
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