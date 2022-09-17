<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Descuentos.php");
require_once("clases/class.Pagos.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Fechas.php");


$db = new MySQL();
$fechas=new Fechas();
$pagos=new Pagos();
$pagos->db=$db;
$servicios=new Servicios();
$servicios->db=$db;

$descuento=new Descuentos();
$descuento->db=$db;

$pagoselegidos=json_decode($_POST['pagos']);
$iduser=$_POST['id_user'];

$arrayservicio=array();
$arraydescuentos=array();
	$descuento->idusuario=$iduser;
	$obtenerdescuentosUsuario=$descuento->ObtenerDescuentosUsuario();
$descuento->idusuario=$iduser;	


	for ($i=0; $i <count($pagoselegidos) ; $i++) { 
		$idpago=$pagoselegidos[$i]->{'id'};
		$montopago=$pagoselegidos[$i]->{'monto'};
		$pagos->idpago=$idpago;
		$buscar=$pagos->ObtenerPago();
		$idservicio=$buscar[0]->idservicio;
		$servicios->idservicio=$idservicio;
		$datosservicio=$servicios->ObtenerServicio();
		$idcategoriatipo=$datosservicio[0]->idcategoriaservicio;

		$descuento->idservicio=$idservicio;
		$obtenerdescuentos=$descuento->ObtenerDescuentos();

			for ($j=0; $j <count($obtenerdescuentos) ; $j++) { 
				
				$iddescuento=$obtenerdescuentos[$j]->iddescuento;
				$monto=$obtenerdescuentos[$j]->monto;
				$convigencia=$obtenerdescuentos[$j]->convigencia;
				$estatus=$obtenerdescuentos[$j]->estatus;
				$titulodescuento=$obtenerdescuentos[$j]->titulo;
				$tipo=$obtenerdescuentos[$j]->tipo;
				$vigenvia=$obtenerdescuentos[$j]->vigencia;
				$validado=1;
				$acumuladescuento=$obtenerdescuentos[$j]->acumuladescuento;

				$numerodeservicios=$obtenerdescuentos[$j]->txtnumeroservicio;
				$porcantidadservicio=$porcantidadservicio[$j]->porcantidadservicio;
				$porhorarioservicio=$obtenerdescuentos[$j]->porhorarioservicio;
				$cantidadhorariosservicios=$obtenerdescuentos[$j]->cantidadhorariosservicios;
				$cantidaddias=$obtenerdescuentos[$j]->cantidaddias;

				$portiposervicio=$obtenerdescuentos[$j]->portiposervicio;
				$porservicio=$obtenerdescuentos[$j]->porservicio;
				$porparentesco=$obtenerdescuentos[$j]->porparentesco;
				$porniveljerarquico=$obtenerdescuentos[$j]->porniveljerarquico;
				$porclientenoasociado=$obtenerdescuentos[$j]->porclientenoasociado;

				$inpadre=$obtenerdescuentos[$j]->inppadre;
				$innieto=$obtenerdescuentos[$j]->inpnieto;
				$inhijo=$obtenerdescuentos[$j]->inphijo;

				$descuento->iddescuento=$iddescuento;
				if ($convigencia==1) {
					$fechaactual=date('Y-m-d');
					
					if ($vigenvia==1) {//periodos
					$obtenerperidosdescuentos=$descuento->obtenerPeridosDescuentos($fechaactual);
						if (count($obtenerperidosdescuentos)>0) {
							$validado=1;
						}else{
							$validado=0;
						}
					}

					if ($vigenvia==2) { //dias de caducidad
						$fechacreacion=$obtenerdescuentos[$j]->fechacreacion;
						$diascaducidad=$obtenerdescuentos[$j]->txtdiascaducidad;

							$date = date("Y-m-d",strtotime($fechacreacion));
							//Restando dias
							$mod_date = date("Y-m-d",strtotime($date."+ ".$diascaducidad." days"));
							
							$fechaactual=date('Y-m-d');


							if ($fechaactual<=$mod_date) {
								$validado=1;
							}else{
								$validado=0;
							}

					}

			}

			if ($estatus==1 && $validado==1) {
					$validado=0;

					if ($porcantidadservicio==1) {
			
						$obtenercantidadserviciosUsuario=$descuento->obtenercantidadserviciosUsuario();
				
						$cantidadservicios=$obtenercantidadserviciosUsuario[0]->cantidadservicios;

						if ($cantidadservicios>=$numerodeservicios) {
							 		$validado=1;
							
						}

					}

		if ($porhorarioservicio==1) {
					
						$fechaactual=date('Y-m-d');

						$fechaantes = date('Y-m-d',strtotime($fechaactual."- ".$cantidaddias." days"));

					$cantidadhorariosServicio=$descuento->ObtenerCantidadHorarios($fechaantes,$fechaactual);
			
					$canthorarios=$cantidadhorariosServicio[0]->cantidadhorarios;
					

					$validado=0;
					if ($canthorarios>=$cantidadhorariosservicios) {
							$validado=1;
						
								}

				}

				if ($portiposervicio==1) {
					
					$obtenercategoriasservicio=$descuento->ObtenerCategoriasDescuento();

					$encontrado=0;
					for ($k=0; $k < count($obtenercategoriasservicio); $k++) { 

						if ($obtenercategoriasservicio[$k]->idcategorias==$idcategoriatipo) {
							$encontrado=1;
							break;
						}
						
						
					}

					if ($encontrado==1) {
									$validado=1;
				 
				 		}else{
				 			$validado=0;
				 		}
					

				}


				if ($porservicio==1) {
					$obtenerserviciosdescuento=$descuento->ObtenerServiciosDescuentos();

					$encontrado=0;
						for ($l=0; $l <count($obtenerserviciosdescuento) ; $l++) { 
							
							if ($obtenerserviciosdescuento[$l]->idservicio==$idservicio) {
								$encontrado=1;
							}
						}

					if ($encontrado==1) {
						$validado=1;
					}else{
						$validado=0;
					}

				}

				if ($porparentesco==1) {
					
					$obtenerparentescosdescuento=$descuento->ObtenerDescuentoParentesco();

					$obtenerparentescosusuario=$descuento->ObtenerParentescoUsuario();
				
					$encontrado=0;
					for ($m=0; $m < count($obtenerparentescosdescuento); $m++) {

								for ($n=0; $n <count($obtenerparentescosusuario); $n++) {
										if ($obtenerparentescosdescuento[$m]->idparentesco!=0) {

													if ($obtenerparentescosdescuento[$m]->idparentesco==$obtenerparentescosusuario[$n]->idparentesco) {
														$encontrado=1;

															$obtenerdescuentos[$i]->monto=$obtenerparentescosdescuento[$m]->txtcantidaddescuento;
															$obtenerdescuentos[$i]->tipo=$obtenerparentescosdescuento[$m]->tipodes;

														  break;
													}

											}else{

												  $encontrado=1;
														$obtenerdescuentos[$i]->monto=$obtenerparentescosdescuento[$m]->txtcantidaddescuento;
														$obtenerdescuentos[$i]->tipo=$obtenerparentescosdescuento[$m]->tipodes;
												  	break;
											}

								}
						
					}



					if ($encontrado==1) {
						$validado=1;
					}else{
						$validado=0;
					}

				}

				if ($porniveljerarquico==1) {

						if($inpadre==1){

								$obtenerparentescosusuario=$descuento->ObtenerParentescoUsuario();

								if (count($obtenerparentescosusuario)>0) {
											$validado=1;							
 								}else{
 									$validado=0;
 								}

						}

						if($inhijo==1){
							$esasociado=$descuento->ObtenerSiesAsociado();

							if (count($esasociado)>0) {
								$validado=1;
							}else{
								$validado=0;
							}

						}

							if($innieto==1){
							
								$esnieto=$descuento->ObtenerSiesNieto();

								if (count($esnieto)>0) {
									$validado=1;
								}else{
									$validado=0;
								}
						}
						
					}

				

			if ($porclientenoasociado==1) {
					
						$obtenermultinoasociados=$descuento->ObtenerMultinoAsociados();

						$obtenercantidadpersonasservicios=$descuento->ObtenerAsignadosServicio();
	
						$cantidad=$obtenercantidadpersonasservicios[0]->cantidad;
							for ($j=0; $j < count($obtenermultinoasociados); $j++) { 
								if ($cantidad==$obtenermultinoasociados[$j]->cantidad) {

								 	$validado=1;
										$obtenerdescuentos[$i]->monto=$obtenermultinoasociados[$j]->txtcantidaddesc;
										$obtenerdescuentos[$i]->tipo=$obtenermultinoasociados[$j]->tipodescuento;
										 break;
									
								}
							}

				}

	
				

						if ($validado==1) {
							$obtenerdescuentos[$i]->montopago=$montopago;

							$descuentospagos=$obtenerdescuentos[$i];

							array_push($arraydescuentos, $descuentospagos);
							
						}

			}


		}


	}



	for ($i=0; $i < count($arraydescuentos); $i++) {	
		$tipo=$arraydescuentos[$i]->tipo;

	
		$monto=$arraydescuentos[$i]->monto;
		$total=$arraydescuentos[$i]->montopago;
		if ($tipo==0) {
		 	$descuento=$monto;
		 	$montoadescontar=($total*$descuento)/100;
		 } 
		 if ($tipo==1) {
		 	$montoadescontar=$monto;
		 }

		 $arraydescuentos[$i]->montoadescontar=$montoadescontar;
		
	}

	$respuesta['descuentos']=$arraydescuentos;
//Retornamos en formato JSON 
	$myJSON = json_encode($respuesta);
	echo $myJSON;

 ?>