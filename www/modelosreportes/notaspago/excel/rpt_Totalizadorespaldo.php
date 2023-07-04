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
require_once("../../../clases/class.Categorias.php");
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

$categorias =new Categorias();
$categorias->db=$db;
$nota->db=$db;
$estatuspago=array('pendiente','proceso','aceptado','rechazado','reembolso','sin reembolso');
$estatusaceptado=array('NO ACEPTADO','ACEPTADO');
$estatusapagado=array('NO PAGADO','PAGADO');
//Recibo parametros del filtro
	$idservicio=$_GET['idservicio'];
	$pantalla=$_GET['pantalla'];
	$v_tiposervicios=$_GET['v_tiposervicios'];
	$v_tiposervicios2=$_GET['v_tiposervicios2'];

	$fechafin=$_GET['fechafin'];
	$horainicio=$_GET['horainicio'];
	$horafin=$_GET['horafin'];
	$fechainiciopago=$_GET['fechainiciopago'];
	$fechafinpago=$_GET['fechafinpago'];
	$sqlconcan="";
	$sqalumnoconcan="";
	$sqlcategorias="";
	$sqlfecha="";
	$sqlestatusaceptado="";
	$sqlestatuspagado="";
	$sqlestatuscoach="";
	$estatusaceptado=$_GET['estatusaceptado'];
	$estatuspagado=$_GET['estatuspagado'];
	$v_coaches=$_GET['v_coaches'];

	$sumatoriagenerado=0;
	$sumatoriadescuentomembresia=0;
	$sumatoriadescuento=0;
	$sumatoriacobrado=0;
	$sumatoriapendiente=0;
	$sqlfechapago="";
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

	if ($fechainiciopago!='' && $fechafinpago!='') {
		$sqlfechapago=" AND  notapago.fechareporte>= '$fechainiciopago' AND notapago.fechareporte <='$fechafinpago'";
	}

	if ($v_tiposervicios!='' && $v_tiposervicios>0) {
		$sqlcategorias=" AND servicios.idcategoriaservicio IN($v_tiposervicios)";
	}



	if ($v_tiposervicios2!='' && $v_tiposervicios2>0) {


		$obtenercategoriasdepende=$categorias->ObtenerCategoriasGroupEstatusDepende($v_tiposervicios2);


		$categoriasid=$obtenercategoriasdepende[0]->categoriasid;

		
		$sqlcategorias=" AND servicios.idcategoriaservicio IN($categoriasid)";
	}

	/*if (!='') {

		
	}

	if (!='') {
		$sqlestatuspagado=" AND ";
	}*/

	/*if ($v_coaches!='') {
		$sqlestatuscoach=" AND ";
	}
*/



	$array=array();
	$sql="SELECT
		TABLA.titulo,
	TABLA.idservicio,
		TABLA.precio,
		TABLA.modalidad,
	TABLA.cantidadhorarios,TABLA.fechamin,TABLA.fechamax,TABLA.coaches,TABLA.cantidadalumnos
	
FROM usuarios_servicios

inner join
	(
	SELECT
		servicios.titulo,
		servicios.idservicio,
		servicios.precio,
		servicios.modalidad,
		( SELECT COUNT(*) FROM horariosservicio WHERE horariosservicio.idservicio = servicios.idservicio ) AS cantidadhorarios,
		( SELECT MIN( fecha ) FROM horariosservicio WHERE horariosservicio.idservicio = servicios.idservicio ) AS fechamin,
		( SELECT MAX( fecha ) FROM horariosservicio WHERE horariosservicio.idservicio = servicios.idservicio ) AS fechamax,
		(
		SELECT
			GROUP_CONCAT( usuarios_servicios.idusuarios ) AS coaches 
		FROM
			usuarios_servicios
			INNER JOIN usuarios ON usuarios.idusuarios = usuarios_servicios.idusuarios 
		WHERE
			usuarios.tipo = 5 
			AND usuarios_servicios.idservicio = servicios.idservicio 
		) AS coaches ,
		
			(	SELECT
			count( usuarios_servicios.idusuarios ) AS coaches 
		FROM
			usuarios_servicios
			INNER JOIN usuarios ON usuarios.idusuarios = usuarios_servicios.idusuarios 
		WHERE
			usuarios.tipo = 3
			AND usuarios_servicios.idservicio = servicios.idservicio AND aceptarterminos=1 AND cancelacion=0
		) AS cantidadalumnos
	FROM
		servicios
		LEFT JOIN categorias ON categorias.idcategorias = servicios.idcategoriaservicio 
	WHERE
		servicios.estatus IN ( 0, 1 ) 
		AND categorias.avanzado = 1 
		$sqlconcan $sqalumnoconcan $sqlcategorias

	GROUP BY
		servicios.idservicio 
	) AS TABLA on usuarios_servicios.idservicio=TABLA.idservicio
WHERE
	1 = 1 AND cantidadalumnos>0";

	if ($v_coaches!='') {
		$sql.=" AND coaches IN($v_coaches)";
	}
	$sql.=$sqlfecha;  

	$sql.="  
	GROUP BY usuarios_servicios.idservicio
	ORDER BY fechamin,fechamax";


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

 <?php
	if($pantalla==0) { 

	
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

		 	$obtenerpago=$pagos->ChecarPagosServicio($sqlfechapago);
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
			
				
		

					for ($j=0; $j < count($alumnos); $j++) {
				 $totalpagado=$totalpagado+$montopagoalumno[$j];

				}
		
		
			 $sumatoriacobrado+=$totalpagado;

			 


			
			$totalpendiente2=$totalgenerado2-$totalpagado-$totaldescuento-$totaldescuentomembresia;
	

			$sumatoriapendiente+=$totalpendiente2;



	} 


					 ?>

		<table class="table">
			<thead>
			<th></th>
			<th></th>
			<th></th>
			<th></th>
			<th></th>
			<th></th>
		 </thead>
		 <tbody>
		 	<tr>
		 		
					<td colspan="18"></td>
					<td id=""> $<span id="sumatoriagenerado"><?php echo number_format($sumatoriagenerado,2,'.',','); ?></span></td>
					<td>$<span id="sumatoriadescuentomembresia"><?php echo number_format($sumatoriadescuentomembresia,2,'.',',');?></span></td>
					<td>$<span id="sumatoriadescuento"><?php echo number_format($sumatoriadescuento,2,'.',',');?></span></td>
					<td>$<span id="sumatoriacobrado"><?php echo number_format($sumatoriacobrado,2,'.',',');?></span></td>
					<td>$<span id="sumatoriapendiente"><?php echo number_format($sumatoriapendiente,2,'.',',');?></span></td>
					<td colspan="2"></td>
			  </tr>
		 </tbody>
		</table>
<?php

	}

 ?>


<table class="table  table table-striped table-bordered table-responsive vertabla" border="1" style="">
	<thead>
	<tr>
		<th>Fecha inicial</th>
		<th>Fecha final</th>
		<th>Id</th>
		<th>Nombre del servicio</th>
		<th>Número de alumnos</th>
		<th>
			
			<table>
        <tr>
            <th style="width: 100px;">Número</th>
            <th style="width: 100px;">Nombre cliente</th>
            <th style="width: 100px;">Horarios alumnos</th>
            <th style="width: 100px;">Tutor</th>
            <th style="width: 100px;">Aceptado</th>
            <th style="width: 100px;">Monto generado</th>
            <th style="width: 100px;">Monto descuento membresía</th>
            <th style="width: 100px;">Monto descuento otros</th>
            <th style="width: 100px;">Monto cobrado</th>
            <th style="width: 100px;">Monto pendiente</th>
            <th style="width: 100px;">Folio</th>
            <th style="width: 100px;">Fecha</th>
        </tr>
    </table>
		</th>
	
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

		<?php 

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

 $totalgenerado=array();
$totalpagado=0;
	# code...

$montopagoalumno=array();
$montodescuentoalumno=array();
$montodescuentomembresiaalumno=array();
$fechafolio=array();
		$idusuariosa=0;
$arraycoachcomision=array();
for ($w=0; $w <count($alumnos) ; $w++) { 

$idusuariosalumno=$alumnos[$w]->idusuarios;

$idcoache=0;
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

		 	$obtenerpago=$pagos->ChecarPagosServicio($sqlfechapago);
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
							if ($idusuariosa!=$idusuariosalumno) {
								array_push($totalgenerado, $montoapagar);
								$idusuariosa=$idusuariosalumno;
							}
						
						


							}else{

										array_push($totalgenerado, 0);


							}
						/*	if ($idservicio==246) {
								echo $montoapagar;
							}*/
$alumnos[$w]->fechareporte="";
$alumnos[$w]->folio="";
$alumnos[$w]->montocobrado="";
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


			 					/*	if ($idservicio==347 && $idusuariosalumno==363) {
										echo $montopago.'<br>';

								echo $descuento[0]->montodescontar;
								echo $montopagocondescuento.'<br>';
		 				echo $montocomision;die();
		 		}*/

			 			
			 						
			 					$montocomision=$asignacion->CalcularMontoPago2($tipomontopago[0]->tipopago,$tipomontopago[0]->monto,$montopagocondescuento,$cantidadhorarios);

			 					$montopagocondescuento=$montopagocondescuento-$descuentomembresia[0]->montodescontar;
			 							if ($idusuariosa!=$idusuariosalumno) {

			 					array_push($montodescuentoalumno, 	$montoadescontarpago);
			 					array_push($montopagoalumno,$montopagocondescuento);
			 					array_push($montodescuentomembresiaalumno, $descuentomembresia[0]->montodescontar);	
			 				}
			 			 // 

			 			 // $totalpagado=$montopagocondescuento-$descuentomembresia[0]->montodescontar;

			 		}
		 	

		 		}
		 		
		 	}else{
		 			if ($idusuariosa!=$idusuariosalumno) {
		 				array_push($montopagoalumno, 0);
		 				array_push($montodescuentoalumno, 0);
		 				array_push($montodescuentomembresiaalumno, 0);
		 			}

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
		 			//
		 				$verificarpagocoach=	$lo->ObtenerPagoCoachVeri($idpago,$idservicio);
		 				if (count($verificarpagocoach)>0) {
		 						$verificadopago=1;
		 						$montopagadocoach=$verificarpagocoach[0]->monto;
		 				}

		 	}

			
		 		# code...
		 	
			$objeto=array('idusuariocoach'=>$idcoach,'coach'=>$nombrecoach,'tipocomision'=>$tipomontopago[0]->tipopago,'monto'=>$tipomontopago[0]->monto,'montocomision'=>$montocomision,'montopagocoach'=>$montopagocoach,'idpago'=>$idpago,'idservicio'=>$idservicio,'pagado'=>$verificadopago,'montopagadocoach'=>$montopagadocoach);

			array_push($arraycoachcomision,$objeto);

			if ($servicios->idservicio==824) {
			
			}

		

				

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
					          
					        </tr>
						</thead>
						<tbody>
						<?php 

							$totalpagado=0;
						for ($j=0; $j < count($alumnos); $j++) {
						
							?>
						<tr>
							<td style="width: 100px;"><?php echo ($j+1); ?></td>
					          <td style="width: 100px;"><?php echo $alumnos[$j]->nombre.' '.$alumnos[$j]->paterno.' '.$alumnos[$j]->materno; ?>
					          	
					          </td>
					          <td style="width: 100px;"><?php echo $alumnos[$j]->cantidadhorarios; ?></td>
					          <td style="width: 100px;">
					          	<?php  $tutor=$alumnos[$j]->tutor; 
					          		if ($tutor>0) {
					          			echo "SI";
					          		}else{
					          			echo "NO";
					          		}

					          	?>

					          </td>
					          <td style="width: 100px;">
					          	
					          		<?php  $aceptarterminos=$alumnos[$j]->aceptarterminos; 
					          		if ($aceptarterminos>0) {
					          			echo "SI";
					          		}else{
					          			echo "NO";
					          		}

					          	?>
					          </td>
					          <td style="width: 100px;">
					          	
					          	<?php echo '$'.number_format($totalgenerado[$j], 2,'.',',');

					          

					          	 ?>
					          </td>

					          <td style="width: 100px;">
					          	<?php echo '$'.number_format($montodescuentomembresiaalumno[$j], 2,'.',','); 

					          	

					          	?>

					          </td>

					          <td style="width: 100px;">
					          	<?php echo '$'.number_format($montodescuentoalumno[$j], 2,'.',','); 

					          
					          	?>

					          </td>


					          <td style="width: 100px;">
					           <?php

					           $totalpagado=$totalpagado+$montopagoalumno[$j];
					            echo '$'.number_format($montopagoalumno[$j], 2,'.',','); 

					           
					            ?>

					          </td>
					          

					          <td style="width: 100px;">
					          	
					          	<?php 
					          		$resultado=$totalgenerado[$j]-$montopagoalumno[$j]-$montodescuentoalumno[$j]-$montodescuentomembresiaalumno[$j];



					          		echo '$'.number_format($resultado, 2,'.',',');
					          	 ?>
					          </td >
					          <td style="width: 100px;"><?php echo $alumnos[$j]->folio; ?></td>
					           <td style="width: 100px;"><?php echo $alumnos[$j]->fechareporte; ?></td>
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

						$sumatoriagenerado=$sumatoriagenerado+$totalgenerado2;

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


				$sumatoriadescuentomembresia=$sumatoriadescuentomembresia+$totaldescuentomembresia;
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

					$sumatoriadescuento=$sumatoriadescuento+$totaldescuento;
			?>
				
			</td>


		
			<td><?php echo '$'.number_format($totalpagado, 2,'.',',');
			 $sumatoriacobrado+=$totalpagado;

			 ?></td>


			<td><?php 
			$totalpendiente2=$totalgenerado2-$totalpagado-$totaldescuento-$totaldescuentomembresia;
			echo '$'.number_format($totalpendiente2,2,'.',','); 

			$sumatoriapendiente+=$totalpendiente2;

			?></td>


		
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



<!-- <script>

	// A $( document ).ready() block.
$(document ).ready(function() {
   var sumatoriagenerado='<?php echo $sumatoriagenerado; ?>';
   var sumatoriadescuento='<?php echo $sumatoriadescuento; ?>';
   var sumatoriadescuentomembresia='<?php echo $sumatoriadescuentomembresia; ?>';
   var sumatoriacobrado='<?php echo $sumatoriacobrado; ?>';
   var sumatoriapendiente='<?php echo $sumatoriapendiente; ?>';

	//Colocar(sumatoriagenerado,sumatoriadescuento,sumatoriadescuentomembresia,sumatoriacobrado,sumatoriapendiente);
});
function Colocar(sumatoriagenerado,sumatoriadescuento,sumatoriadescuentomembresia,sumatoriacobrado,sumatoriapendiente) {
		alert('a');
		$("#sumatoriagenerado").text(sumatoriagenerado);
		$("#sumatoriadescuento").text(sumatoriadescuento);
		$("#sumatoriadescuentomembresia").text(sumatoriadescuentomembresia);
		$("#sumatoriacobrado").text(sumatoriacobrado);
		$("#sumatoriapendiente").text(sumatoriapendiente);
	}
	
</script> -->