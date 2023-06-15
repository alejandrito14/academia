<?php
class Totales 
{
	
	public $db;

	public function Totales()
	{
		
		 for ($i=0; $i < count($array); $i++) { 
			$idservicio=$array[$i]->idservicio;
			$servicios->idservicio=$idservicio;
			$cantidadhorarios=$array[$i]->cantidadhorarios;

			$peridohorario=$servicios->ObtenerFechaHoras();
			$asignacion->idservicio=$idservicio;
			$alumnos=$asignacion->obtenerUsuariosServiciosAlumnosAsignadosReporte($estatusaceptado,$estatuspagado);


			$obtenerservicios=$asignacion->obtenerServiciosAsignadosCoach3($sqlcategorias);
					$pagosservicios=array();

				

	$textoestatus=array('Pendiente','Aceptado','Cancelado');
	$arraycoachcomision=array();
 $totalgenerado=array();
$totalpagado=0;
	# code...

$montopagoalumno=array();
$montodescuentoalumno=array();
$montodescuentomembresiaalumno=array();
$fechafolio=array();

for ($w=0; $w <count($alumnos) ; $w++) { 

$idusuariosalumno=$alumnos[$w]->idusuarios;


	for ($k=0; $k <count($obtenerservicios); $k++) {



	$asignacion->idusuario=$obtenerservicios[$k]->idusuarios;
 $datoscoach=$usuarios->ObtenerUsuarioDatos();
		# code...
 
	 $idusuarios=$obtenerservicios[$k]->idusuarios;
 	 $nombreservicio=$obtenerservicios[$k]->titulo;
 	 $nombrecoach=$obtenerservicios[$k]->nombre.' '.$obtenerservicios[$k]->paterno.' '.$obtenerservicios[$i]->materno;
	 $idcoach=$obtenerservicios[$k]->idusuarios;


			$idusuarios_servicios=$obtenerservicios[$k]->idusuarios_servicios;
			$asignacion->idusuarios_servicios=$idusuarios_servicios;
			$tipomontopago=$asignacion->ObtenertipoMontopago();

			
			$pagos->idservicio=$idservicio;
			$servicios->idservicio=$idservicio;

			$peridohorario=$servicios->ObtenerFechaHoras();
		
			 $poncentaje="";
				  	  $pesos="";
				  	  if ($tipomontopago[0]->tipopago==0) {
				  	  	$poncentaje="%";
				  	  }else{

				  	  	$pesos="$";
				  	  }

				  $montopagocoach=$tipomontopago[0]->monto;
						$montopagocoach=$pesos.$montopagocoach.$poncentaje;



			$pagos->idusuarios=$idusuariosalumno;

		 	$obtenerpago=$pagos->ChecarPagosServicio();
		/* if ($idservicio==246) {
		 			var_dump($obtenerpago);die();
		 		}*/
		 	$pagado=0;
		 	$descuentomembresia="";
		 	$fechapago="";
		 	$metodopago="";
		 	$montopago="";
		 	$descuento=0;
		 	$montocomision=0;
		 	$descuentomembresia=0;
		 	$nombredescuento="";
		 	$nombremembresia="";
		 	$totalpagado=0;
		 	$folio="";
		 	$idpago=0;
		 	$fechareporte="";
		 	$fechainicial="";
		 	$fechafinal="";
		 	$montoapagar=0;
		 				 	$modalidad=$array[$i]->modalidad;
									$costo=$array[$i]->precio;
								
									if ($modalidad==1) {
										
										$montoapagar=$costo;

									}

							if ($modalidad==2) {
								//grupo
								$obtenerparticipantes=$servicios->ObtenerParticipantes(3);
								
								$cantidadparticipantes=count($obtenerparticipantes);
								$costo=$array[$i]->precio;

								$obtenerhorarios=$servicios->ObtenerHorariosSemana();

								$monto=$costo*count($obtenerhorarios);

								$montoapagar=$monto/$cantidadparticipantes;



							}

							
						if ($costo>=0) {

							$obtenerperiodos=$servicios->ObtenerPeriodosPagos();

							$numeroperiodos=count($obtenerperiodos);
							$montoapagar=$montoapagar/$numeroperiodos;

						//	$totalgenerado=$totalgenerado+$montoapagar;

							array_push($totalgenerado, $montoapagar);
							}else{
										array_push($totalgenerado, 0);


							}
					
$alumnos[$w]->fechareporte="";
$alumnos[$w]->folio="";
		 	if (count($obtenerpago)>0) {

		 		$nota->idpago=$obtenerpago[0]->idpago;
		 		$pagos->idpago=$obtenerpago[0]->idpago;


		 		$obtenernotapago=$nota->ObtenerNotaPagoporPago();
		 
		 		if(count($obtenernotapago)>0) {

		 
		 			$fechapago=date('d-m-Y H:i:s',strtotime($obtenernotapago[0]->fecha));
		 			$fechareporte=date('d-m-Y H:i:s',strtotime($obtenernotapago[0]->fechareporte));
		 			$alumnos[$w]->fechareporte=$fechareporte;
		 			$metodopago=$obtenernotapago[0]->tipopago;
		 			$folio=$obtenernotapago[0]->folio;
		 			$alumnos[$w]->folio=$folio;
			 		
			 		if ($obtenernotapago[0]->estatus==1) {
			 			
			 			$pagado=1;
			 			
			 			$idpago=$obtenerpago[0]->idpago;
			 			$fechainicial=$obtenerpago[0]->fechainicial;
				  	$fechafinal=$obtenerpago[0]->fechafinal;
			 			$montopago=$obtenerpago[0]->monto;
			 			$totalpagado=$totalpagado+$montopago;
			 			$pagos->idnotapago=$obtenernotapago[0]->idnotapago;
			 			$descuento=$pagos->ObtenerPagoDescuento2();
			 			$descuentomembresia=$pagos->ObtenerPagoDescuentoMembresia();

			 			$nombremembresia=$descuentomembresia[0]->nombremembresia;

			 			$nombredescuento=$descuento[0]->nombredescuento;
			 				$montopagocondescuento=$montopago-$descuento[0]->montodescontar;
			 				
			 				$montoadescontarpago=$descuento[0]->montodescontar;

			 					array_push($montodescuentoalumno, 	$montoadescontarpago);

			 		
			 			
			 						
			 					$montocomision=$asignacion->CalcularMontoPago2($tipomontopago[0]->tipopago,$tipomontopago[0]->monto,$montopagocondescuento,$cantidadhorarios);

			 					$montopagocondescuento=$montopagocondescuento-$descuentomembresia[0]->montodescontar;

			 					array_push($montopagoalumno,$montopagocondescuento);
			 					array_push($montodescuentomembresiaalumno, $descuentomembresia[0]->montodescontar);	
			 			 // 

			 		}
		 	

		 		}
		 		
		 	}else{
		 				array_push($montopagoalumno, 0);
		 				array_push($montodescuentoalumno, 0);
		 				array_push($montodescuentomembresiaalumno, 0);

					

		 	}

		 
		 	$verificadopago=0;
		 	$montopagadocoach=0;
		 	if ($idpago!=0) {
		 		 	$lo->idusuarios=$idcoach;
		 				$lo->fechainicial=$fechainicial;
		 				$lo->fechafinal=$fechafinal;
		 			$verificarpagocoach=	$lo->ObtenerPagoCoachVeri($idpago,$idservicio);
		 				if (count($verificarpagocoach)>0) {
		 						$verificadopago=1;
		 						$montopagadocoach=$verificarpagocoach[0]->monto;
		 				}

		 	}

			$objeto=array('idusuariocoach'=>$idcoach,'coach'=>$nombrecoach,'tipocomision'=>$tipomontopago[0]->tipopago,'monto'=>$tipomontopago[0]->monto,'montocomision'=>$montocomision,'montopagocoach'=>$montopagocoach,'idpago'=>$idpago,'idservicio'=>$idservicio,'pagado'=>$verificadopago,'montopagadocoach'=>$montopagadocoach);

			array_push($arraycoachcomision,$objeto);

		}
		

	}
		
		 

		

						

							$totalpagado=0;
					

						 
		


		
					
					$totalgenerado2=0;
						if (count($totalgenerado)>0) {
							for ($p=0; $p < count($totalgenerado); $p++) { 
						
									
$totalgenerado2=$totalgenerado2+ $totalgenerado[$p];
								 

								
					
			
								}
						}



						$sumatoriagenerado=$sumatoriagenerado+$totalgenerado2;

		



			
				$totaldescuentomembresia=0;
			 for ($q=0; $q <count($montodescuentomembresiaalumno) ; $q++) { 

				$totaldescuentomembresia=$totaldescuentomembresia+$montodescuentomembresiaalumno[$q];
				# code...
			} 



				$sumatoriadescuentomembresia=$sumatoriadescuentomembresia+$totaldescuentomembresia;
			

	

						
				$totaldescuento=0;
			 for ($q=0; $q <count($montodescuentoalumno) ; $q++) { 

				$totaldescuento=$totaldescuento+$montodescuentoalumno[$q];
				# code...
			} 
			

					$sumatoriadescuento=$sumatoriadescuento+$totaldescuento;
			
				
		


		
		
			 $sumatoriacobrado+=$totalpagado;

			 


			
			$totalpendiente2=$totalgenerado2-$totalpagado-$totaldescuento-$totaldescuentomembresia;
	

			$sumatoriapendiente+=$totalpendiente2;

			


		
		




	} 

}
}

?>
 