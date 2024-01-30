<?php
/*======================= INICIA VALIDACIÓN DE SESIÓN =========================*/

require_once("../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();

if(!isset($_SESSION['se_SAS']))
{
	/*header("Location: ../../login.php"); */ echo "login";

	exit;
}

//Inlcuimos las clases a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Descuentos.php");
require_once("../../clases/class.Pagos.php");
require_once("../../clases/class.Servicios.php");
require_once("../../clases/class.Fechas.php");
require_once("../../clases/class.Usuarios.php");



$db = new MySQL();
$fechas=new Fechas();
$pagos=new Pagos();
$pagos->db=$db;
$servicios=new Servicios();
$servicios->db=$db;

$descuento=new Descuentos();
$descuento->db=$db;

$usuarios=new Usuarios();
$usuarios->db=$db;

$pagoselegidos=json_decode($_POST['pagos']);
$iduser=$_POST['id_user'];

$arrayservicio=array();
$arraydescuentos=array();
	$descuento->idusuario=$iduser;
	/*$obtenerdescuentosUsuario=$descuento->ObtenerDescuentosUsuario();
	*/


	for ($i=0; $i <count($pagoselegidos) ; $i++) { 
		$idpago=$pagoselegidos[$i]->id;
		$montopago=$pagoselegidos[$i]->monto;
		$pagos->idpago=$idpago;

		$buscar=$pagos->ObtenerPago();

		if (count($buscar)>0) {
			# code...
			$pagoselegidos[$i]->tipo=$buscar[0]->tipo;
			$descuento->idusuario=$buscar[0]->idusuarios;
			$usuarios->idusuarios=$descuento->idusuario;

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


				$porcaracteristicasasociador=$obtenerdescuentos[$j]->caracteristicaasociador;

				$caracteristicasporservicio=$obtenerdescuentos[$j]->caracteristicasporservicio;
				$caracteristicaportiposervicio=$obtenerdescuentos[$j]->caracteristicaportiposervicio;

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

			if ($estatus==1 ) {
					if ($validado==1) {
						# code...
					

					if ($porcantidadservicio==1) {
			
						$obtenercantidadserviciosUsuario=$descuento->obtenercantidadserviciosUsuario();
				
						$cantidadservicios=$obtenercantidadserviciosUsuario[0]->cantidadservicios;

						if ($cantidadservicios>=$numerodeservicios) {
							 		$validado=1;
							
						}

					}
				}
if ($validado==1) {
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
			}
			if ($validado==1) {

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
}

if ($validado==1) {

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
}

if ($validado==1) {
				if ($porparentesco==1) {
					
					
					$obtenerparentescosdescuento=$descuento->ObtenerDescuentoParentesco();
					//$descuento->idusuario=$iduser;
					//var_dump($obtenerparentescosdescuento);die();
				
					$encontrado=0;
					for ($m=0; $m < count($obtenerparentescosdescuento); $m++) {

						$idparentesco=$obtenerparentescosdescuento[$m]->idparentesco;
						$rangoinicial=$obtenerparentescosdescuento[$m]->rangoinicial;
						$rangofinal=$obtenerparentescosdescuento[$m]->rangofinal;
						$obtenerparentescosusuario=$descuento->ObtenerParentescoUsuario();
						if (count($obtenerparentescosusuario)>0) {
							# code...
						
						$obtenerUsuariosTutor=$descuento->ObtenerTodosParentescoUsuario($obtenerparentescosusuario[0]->idusuariostutor,$idparentesco,$idcategoriatipo);
						//var_dump($obtenerUsuariosTutor);die();
						//echo ''.count($obtenerUsuariosTutor).'=='.$cantidadfam;die();

						//echo $obtenerparentescosusuario[0]->orden.'>='.$rangoinicial .'&&'. $obtenerparentescosusuario[0]->orden.'<='.$rangofinal.'<br>';
						$orden=0;
						for ($a=0; $a < count($obtenerUsuariosTutor); $a++) { 
							if ($obtenerUsuariosTutor[$a]->idusuarios==$descuento->idusuario) {
								$orden=$a;
								break;
							}
						}

						
							if ($orden>=$rangoinicial && $orden<=$rangofinal) {
									$encontrado=1;
									$obtenerdescuentos[$j]->monto=$obtenerparentescosdescuento[$m]->txtcantidaddescuento;
									$obtenerdescuentos[$j]->tipo=$obtenerparentescosdescuento[$m]->tipodes;

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
			}
			//echo 'validado'.$validado;
if ($validado==1) {
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
}

if ($validado==1) {
				

			if ($porclientenoasociado==1) {
					
						$obtenermultinoasociados=$descuento->ObtenerMultinoAsociados();

						$obtenercantidadpersonasservicios=$descuento->ObtenerAsignadosServicio();
						$validado=0;
						$cantidad=$obtenercantidadpersonasservicios[0]->cantidad;
							for ($o=0; $o < count($obtenermultinoasociados); $o++) { 
								if ($cantidad==$obtenermultinoasociados[$o]->cantidad) {

								 	$validado=1;
										$obtenerdescuentos[$j]->monto=$obtenermultinoasociados[$o]->txtcantidaddesc;
										$obtenerdescuentos[$j]->tipo=$obtenermultinoasociados[$o]->tipodescuento;
										 break;
									
								}
							}

				}

	
				}

			if ($validado==1) {
				if($porcaracteristicasasociador==1){

					
			//$usuarios->idusuarios=$iduser;
			$verificarsiestutorado=$usuarios->VerificarSiesTutorado();
		
				if (count($verificarsiestutorado)==1) {
					$idtutor=$verificarsiestutorado[0]->idusuariostutor;
//print('a'+$caracteristicaportiposervicio);die();
					if($caracteristicaportiposervicio==1){

						$obtenercategoriasserviciotutor=$usuarios->ObtenerCategoriasServiciotutor($idtutor);
						;
						
$obtenertiposervicioasociador=$descuento->ObtenerTipoDescuentoAsociador();
						$encontradocategoria=0;
				for ($a=0; $a <count($obtenertiposervicioasociador) ; $a++) { 
							
						for ($b=0; $b < count($obtenercategoriasserviciotutor); $b++) { 
								
						

					if($obtenertiposervicioasociador[$a]->idcategorias==$obtenercategoriasserviciotutor[$b]->idcategoriaservicio){

								$encontradocategoria=1;
								
								break;

								}

							}
						}


					}


				 if($caracteristicasporservicio==1){

				 	$obtenerserviciotutor=$usuarios->ObtenerserviciosTutor($idtutor);

				 	$obtenerservicioasociador=$descuento->ObtenerServicioAsociador();
				 	$encontradoservicio=0;
				 		for ($c=0; $c < count($obtenerservicioasociador); $c++) { 


				 			for ($d=0; $d < count($obtenerserviciotutor); $d++) { 
				 				if ($obtenerservicioasociador[$c]->idservicio==$obtenerserviciotutor[$d]->idservicio) {
				 					$encontradoservicio=1;
				 					break;
				 				}
				 			}
				 			
				 		}


					}
					$validado=0;
					if($caracteristicaportiposervicio==1 && $caracteristicasporservicio==1){

					if($encontradocategoria==1 && $encontradoservicio)

						$validado=1;

					}else if($caracteristicaportiposervicio==1){

						if ($encontradocategoria==1) {
							$validado=1;
						}
					}else if($caracteristicasporservicio==1){

						if ($encontradoservicio==1) {
							$validado=1;
						}

					}else{
						$validado=0;
					}

					

					}else{

						$validado=0;
					}



					}


				}

						if ($validado==1) {
							$obtenerdescuentos[$j]->montopago=$montopago;
							$obtenerdescuentos[$j]->idpago=$idpago;

							$descuentospagos=$obtenerdescuentos[$j];

							array_push($arraydescuentos, $descuentospagos);
							
						}

				}

			}
		}
	//}

	
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