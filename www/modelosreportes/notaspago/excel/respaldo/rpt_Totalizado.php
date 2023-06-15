<?php

/*======================= INICIA VALIDACIÓN DE SESIÓN =========================*/

require_once("../../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();

if(!isset($_SESSION['se_SAS']))
{
	/*header("Location: ../../login.php"); */ echo "login";

	exit;
}


$tipousaurio = $_SESSION['se_sas_Tipo'];  //variables de sesion
$lista_empresas = $_SESSION['se_liempresas']; //variables de sesion

//validaciones para todo el sistema


/*======================= TERMINA VALIDACIÓN DE SESIÓN =========================*/


//Importamos nuestras clases
require_once("../../../clases/conexcion.php");
require_once("../../../clases/class.Reportes.php");
require_once("../../../clases/class.Funciones.php");
require_once("../../../clases/class.Botones.php");
require_once("../../../clases/class.PagosCoach.php");
require_once("../../../clases/class.ServiciosAsignados.php");
require_once("../../../clases/class.Pagos.php");
require_once("../../../clases/class.Usuarios.php");
require_once("../../../clases/class.Servicios.php");
require_once("../../../clases/class.Fechas.php");
require_once("../../../clases/class.Notapago.php");

//Se crean los objetos de clase
$db = new MySQL();
$reporte = new Reportes();
$f = new Funciones();
$bt = new Botones_permisos();
$lo = new PagosCoach();
$lo->db=$db;
$asignacion=new ServiciosAsignados();
$asignacion->db=$db;
$pagos=new Pagos();
$pagos->db=$db;
$usuarios=new Usuarios();
$usuarios->db=$db;
$servicios=new Servicios();
$servicios->db=$db;
$fechas=new Fechas();
$nota=new Notapago();
$nota->db=$db;
$estatuspago=array('pendiente','proceso','aceptado','rechazado','reembolso','sin reembolso');
$estatusaceptado=array('NO ACEPTADO','ACEPTADO');
$estatusapagado=array('NO PAGADO','PAGADO');
//Recibo parametros del filtro
	$idservicio=$_GET['idservicio'];
$pantalla=$_GET['pantalla'];
$v_tiposervicios=$_GET['v_tiposervicios'];
	$fechafin=$_GET['fechafin'];
	$horainicio=$_GET['horainicio'];
	$horafin=$_GET['horafin'];
	$sqlconcan="";
	$sqalumnoconcan="";
	$sqlcategorias="";
	$sqlfecha="";
	$total_gral=0;
	if ($idservicio>0){
		$sqlconcan=" AND servicios.idservicio=".$idservicio."";
	}
	/*if ($alumno>0) {
		$sqalumnoconcan=" AND usuarios.idusuarios=".$alumno."";
	}
*/
	if (isset($_GET['fechainicio'])) {

		if ($_GET['fechainicio']!='') {
		
		$fechainicio=$_GET['fechainicio'];
		if (isset($_GET['horainicio'])) {
			$fechainicio=$fechainicio.' 00:00:00';
		}
		}
	}

	if (isset($_GET['fechafin'])) {
		if ($_GET['fechafin']!='') {
		$fechafin=$_GET['fechafin'];
		if (isset($_GET['horafin'])) {
			$fechafin=$fechafin.' 23:59:59';
			}
		}
	}

	if ($fechainicio!='' && $fechafin!='') {
		$sqlfecha=" AND  fechamin>= '$fechainicio' AND fechamin <='$fechafin'";
	}

	if ($v_tiposervicios!='' && $v_tiposervicios>0) {
		$sqlcategorias=" AND servicios.idcategoriaservicio IN($v_tiposervicios)";
	}

	$array=array();
	$sql="
			SELECT *FROM (SELECT servicios.titulo,servicios.idservicio,servicios.precio,servicios.modalidad,
	(SELECT COUNT(*)  FROM horariosservicio WHERE horariosservicio.idservicio=servicios.idservicio) as cantidadhorarios,

			 (SELECT MIN(fecha) from horariosservicio WHERE horariosservicio.idservicio=servicios.idservicio) as fechamin,
(SELECT MAX(fecha) from horariosservicio WHERE horariosservicio.idservicio=servicios.idservicio) as fechamax

			 from servicios

LEFT JOIN categorias on categorias.idcategorias=servicios.idcategoriaservicio
WHERE   servicios.estatus IN(0,1) and categorias.avanzado=1
$sqlconcan $sqalumnoconcan $sqlcategorias
	GROUP BY servicios.idservicio )AS TABLA WHERE 1=1  $sqlfecha 	ORDER BY fechamin,fechamax	";


		$resp=$db->consulta($sql);
		$cont = $db->num_rows($resp);


		$array=array();
		$contador=0;
		if ($cont>0) {

			while ($objeto=$db->fetch_object($resp)) {

				$array[$contador]=$objeto;
				$contador++;
			} 
		}
		
 
if($pantalla==0) {
	# code...


$filename = "rpt_Totalizado".".xls";
header("Content-Type: application/vnd.ms-excel charset=iso-8859-1");
header('Content-Disposition: attachment; filename="'.$filename.'"');

}
?>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 
 <style>
 	.wrap2 { 
 
  height:50px;
  overflow: auto;
  width:100px;
}
 </style>
<table class="table  table table-striped table-bordered table-responsive vertabla" border="1" style="">
	<thead>
	<tr>
		<th>Fecha inicial</th>
		<th>Fecha final</th>
		<th>Id</th>
		<th>Nombre del servicio</th>
		<th>Número de alumnos</th>
		<th>Alumnos</th>
	
		<th>Horarios</th>
		<th>Monto generado totalizado</th>
		<th>Monto descuento membresía totalizado</th>
		<th>Monto descuento otros totalizado</th>

		<th>Monto cobrado totalizado</th>
		<th>Monto pendiente totalizado</th>

		<th>Coach</th>
		<th>Comisión del servicio totalizado</th>

		<!-- <th>Comisión generada coach</th>
		<th>Comisión pagada coach</th>
		<th>Comisión pendiente coach</th>
 -->
	</tr>
	</thead>
	<tbody>

		<?php for ($i=0; $i < count($array); $i++) { 
			$idservicio=$array[$i]->idservicio;
			$servicios->idservicio=$idservicio;


			$peridohorario=$servicios->ObtenerFechaHoras();
			$asignacion->idservicio=$idservicio;
			$alumnos=$asignacion->obtenerUsuariosServiciosAlumnosAsignados();


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
						/*	if ($idservicio==246) {
								echo $montoapagar;
							}*/
$alumnos[$w]->fechareporte="";
$alumnos[$w]->folio="";
		 	if (count($obtenerpago)>0) {

		 		$nota->idpago=$obtenerpago[0]->idpago;
		 		$pagos->idpago=$obtenerpago[0]->idpago;


		 		$obtenernotapago=$nota->ObtenerNotaPagoporPago();
		 	/*	if ($idservicio==347 && $idusuariosalumno==363) {
		 			var_dump($obtenernotapago);die();
		 		}*/
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

			 					/*	if ($idservicio==347 && $idusuariosalumno==363) {
										echo $montopago.'<br>';

								echo $descuento[0]->montodescontar;
								echo $montopagocondescuento.'<br>';
		 				echo $montocomision;die();
		 		}*/

			 			
			 						
			 					$montocomision=$asignacion->CalcularMontoPago($tipomontopago[0]->tipopago,$tipomontopago[0]->monto,$montopagocondescuento);

			 					$montopagocondescuento=$montopagocondescuento-$descuentomembresia[0]->montodescontar;

			 					array_push($montopagoalumno,$montopagocondescuento);
			 					array_push($montodescuentomembresiaalumno, $descuentomembresia[0]->montodescontar);	
			 			 // 

			 			 // $totalpagado=$montopagocondescuento-$descuentomembresia[0]->montodescontar;

			 		}
		 	

		 		}
		 		
		 	}else{
		 				array_push($montopagoalumno, 0);
		 				array_push($montodescuentoalumno, 0);
		 				array_push($montodescuentomembresiaalumno, 0);

						 /*			$obtenerperiodos=$servicios->ObtenerPeriodosPagos();

						 	$montoapagar=0;
						 	for ($l=0; $l <count($obtenerperiodos) ; $l++) { 
						
								$fechainicial=$obtenerperiodos[$l]->fechainicial;
								$fechafinal=$obtenerperiodos[$l]->fechafinal;
								$lo->idusuarios=$idusuariosalumno;
								$lo->idservicio=$idservicio;
								$lo->fechainicial=$fechainicial;
								$lo->fechafinal=$fechafinal;

									$modalidad=$array[$i]->modalidad;
									$costo=$array[$i]->precio;
								
									if ($modalidad==1) {
										
										$montoapagar=$costo;

									}

							if ($modalidad==2) {
								//grupo
								$obtenerparticipantes=$servicios->ObtenerParticipantes(3);
								
								$cantidadparticipantes=count($obtenerparticipantes);
								$costo=$array[$k]->precio;

								$obtenerhorarios=$servicios->ObtenerHorariosSemana();

								$monto=$costo*count($obtenerhorarios);

								$montoapagar=$monto/$cantidadparticipantes;



							}

							
						if ($costo>=0) {

							$obtenerperiodos=$servicios->ObtenerPeriodosPagos();

							$numeroperiodos=count($obtenerperiodos);
							$montoapagar=$montoapagar/$numeroperiodos;


							

								$idusuarios=$idusuariosalumno;
								$idmembresia=0;
								$idservicio=$idservicio;
								$tipo=1;
								$estatus=0;
								$dividido=$modalidad;
								$fechainicial=$obtenerperiodos[$l]->fechainicial;
								$fechafinal=$obtenerperiodos[$l]->fechafinal;
								$concepto=$array[$k]->titulo;
								//$contador=$lo->ActualizarConsecutivo();
					   		    $fecha = explode('-', date('d-m-Y'));
							    $anio = substr($fecha[2], 2, 4);
					   			$folio = $fecha[0].$fecha[1].$anio.$contador;
					   			
								$folio="";

								$fecha=$obtenerperiodos[$l]->fechafinal;
								$obtener[$i]->fechaformato='';
					
						}


						 	}
*/

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
		if ($idservicio==246) {
			//	var_dump($arraycoachcomision);die();

		}

	}
		
		 ?>
		<tr>
			<td><?php echo date('d-m-Y',strtotime($array[$i]->fechamin)); ?></td>
			<td><?php echo date('d-m-Y',strtotime($array[$i]->fechamax)); ?></td>
				
				<td><?php echo $array[$i]->idservicio; ?></td>
			<td><?php echo $array[$i]->titulo; ?></td>
			<td><?php echo count($alumnos); ?></td>
			<td>
					<table id="tabla2">
						<thead>
							<tr>
					          <th>Número</th>
					          <th>Nombre cliente</th>
					          <th>Horarios alumnos</th>
					          <th>Tutor</th>
					          <th>Aceptado</th>
					          <th>Monto generado</th>
					          <th>Monto descuento membresía</th>

					          <th>Monto descuento otros</th>

					          <th>Monto cobrado</th>
					          <th>Monto pendiente</th>
					          <th>Folio</th>
					          <th>Fecha</th>
					        </tr>
						</thead>
						<tbody>
						<?php 

							$totalpagado=0;
						for ($j=0; $j < count($alumnos); $j++) {
						
							?>
						<tr>
							<td><?php echo ($j+1); ?></td>
					          <td><?php echo $alumnos[$j]->nombre.' '.$alumnos[$j]->paterno.' '.$alumnos[$j]->materno; ?>
					          	
					          </td>
					          <td><?php echo $alumnos[$j]->cantidadhorarios; ?></td>
					          <td>
					          	<?php  $tutor=$alumnos[$j]->tutor; 
					          		if ($tutor>0) {
					          			echo "SI";
					          		}else{
					          			echo "NO";
					          		}

					          	?>

					          </td>
					          <td>
					          	
					          		<?php  $aceptarterminos=$alumnos[$j]->aceptarterminos; 
					          		if ($aceptarterminos>0) {
					          			echo "SI";
					          		}else{
					          			echo "NO";
					          		}

					          	?>
					          </td>
					          <td>
					          	
					          	<?php echo '$'.number_format($totalgenerado[$j], 2,'.',','); ?>
					          </td>

					          <td>
					          	<?php echo '$'.number_format($montodescuentomembresiaalumno[$j], 2,'.',','); ?>

					          </td>

					          <td>
					          	<?php echo '$'.number_format($montodescuentoalumno[$j], 2,'.',','); ?>

					          </td>


					          <td>
					           <?php

					           $totalpagado=$totalpagado+$montopagoalumno[$j];
					            echo '$'.number_format($montopagoalumno[$j], 2,'.',','); ?>

					          </td>
					          

					          <td>
					          	
					          	<?php 
					          		$resultado=$totalgenerado[$j]-$montopagoalumno[$j]-$montodescuentoalumno[$j]-$montodescuentomembresiaalumno[$j];



					          		echo '$'.number_format($resultado, 2,'.',',');
					          	 ?>
					          </td>
					          <td><?php echo $alumnos[$j]->folio; ?></td>
					           <td><?php echo $alumnos[$j]->fechareporte; ?></td>
					         </tr> 
					         

					<?php	}

						 ?>
							
							
						</tbody>
				        
				     </table>
			</td>
			
			<td>
				<?php 

				echo $array[$i]->cantidadhorarios;
				 ?>


			</td>
			<td>

				
		
					<?php 
					$totalgenerado2=0;
						if (count($totalgenerado)>0) {
							for ($p=0; $p < count($totalgenerado); $p++) { ?>
						
									<?php 
$totalgenerado2=$totalgenerado2+ $totalgenerado[$p];
								 ?>

								
					
					<?php		
								}
						}

					echo	'$'.number_format($totalgenerado2, 2,'.',',');

		?>



			</td>
			<td>
			<?php
				$totaldescuentomembresia=0;
			 for ($q=0; $q <count($montodescuentomembresiaalumno) ; $q++) { 

				$totaldescuentomembresia=$totaldescuentomembresia+$montodescuentomembresiaalumno[$q];
				# code...
			} 
				echo '$'.number_format($totaldescuentomembresia,2,'.',',');
			?>

		</td>
			<td>

						<?php
				$totaldescuento=0;
			 for ($q=0; $q <count($montodescuentoalumno) ; $q++) { 

				$totaldescuento=$totaldescuento+$montodescuentoalumno[$q];
				# code...
			} 
				echo '$'.number_format($totaldescuento,2,'.',',');
			?>
				
			</td>


		
			<td><?php echo '$'.number_format($totalpagado, 2,'.',',');


			 ?></td>


			<td><?php 
			$totalpendiente2=$totalgenerado2-$totalpagado-$totaldescuento-$totaldescuentomembresia;
			echo '$'.number_format($totalpendiente2,2,'.',','); ?></td>


		
			<td>


				<table id="tabla3">
						<thead>
							<tr>
					          <th>Nombre del coach</th>
					          <th>Horarios</th>
					          <th>Comisión generada</th>
					          <th>Comisión pagada</th>
					          <th>Comisión pendiente</th>
					          <!-- <th>Comisión generada</th>
					          <th>Comisión pagada</th>
					          <th>Comisión pendiente</th> -->
					        </tr>
						</thead>
						<tbody>
							<?php 

								for ($l=0; $l <count($arraycoachcomision) ; $l++) {  ?>
									<tr>
										
										<td><?php echo $arraycoachcomision[$l]['coach']; ?> </td>
										<td><?php echo $alumnos[0]->cantidadhorarios; ?></td>
										
											<td><?php echo '$'.number_format($arraycoachcomision[$l]['montocomision'],2,'.',','); ?></td>
											 <td>
											 
											 		<?php 
										 		 	if($arraycoachcomision[$l]['pagado']==1){
										 		 	echo '$'.number_format($arraycoachcomision[$l]['montopagadocoach'],2,'.',','); 
										 		 	}else{

										 		 		echo '$'.number_format(0,2,'.',',');
										 		 	}
															?>
											 	

											 </td>

						
										 <td>
										 		 	<?php 
										 		 	if($arraycoachcomision[$l]['pagado']==0){
										 		 	echo 	'$'.number_format($arraycoachcomision[$l]['montocomision'],2,'.',',');  
										 		 	}
															?>
										 </td>
							
								

									</tr>

							<?php	}
							 ?>

						</tbody>
					</table>
				


			</td>

				<td>
					<?php
			$comisiondelservio=0;
				for ($l=0; $l <count($arraycoachcomision) ; $l++) {  
					$comisiondelservio=	$comisiondelservio+$arraycoachcomision[$l]['montocomision'];
				}
					



			 echo '$'.number_format($comisiondelservio,2,'.',','); ?></td>
			<!-- <td></td>
			<td></td>
			<td></td> -->
		</tr>

	<?php } ?>
	</tbody>


</table>