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
require_once("../../../clases/class.Tipocoach.php");
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
$tipocoach=new Tipocoach();
$tipocoach->db=$db;
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
	$cantidadelementos=0;
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

		
		}
	}

	if (isset($_GET['fechafin'])) {
		if ($_GET['fechafin']!='') {

		$fechafin=$_GET['fechafin'];
	
			
		}
	}

	if ($fechainicio!='' && $fechafin!='') {
		$sqlfecha=" AND  fechamin>= '$fechainicio' AND fechamin <='$fechafin'";
	}


		if (isset($_GET['fechainiciopago'])) {

		if ($_GET['fechainiciopago']!='') {
		
		$fechainiciopago=$_GET['fechainiciopago'];
	
			$fechainiciopago=$fechainiciopago.' 00:00:00';
		
		}
	}


		if (isset($_GET['fechafinpago'])) {

		if ($_GET['fechafinpago']!='') {
		
		$fechafinpago=$_GET['fechafinpago'];
	
			$fechafinpago=$fechafinpago.' 23:59:59';
		
		}
	}


	if ($fechainiciopago!='' && $fechafinpago!='') {
		$sqlfechapago=" AND  fechareporte>= '$fechainiciopago' AND fechareporte <='$fechafinpago'";
	}

	if ($v_tiposervicios!='' && $v_tiposervicios>0) {
		$sqlcategorias=" AND idcategoriaservicio IN($v_tiposervicios)";
	}



	if ($v_tiposervicios2!='' && $v_tiposervicios2>0) {


		$obtenercategoriasdepende=$categorias->ObtenerCategoriasGroupEstatusDepende($v_tiposervicios2);


		$categoriasid=$obtenercategoriasdepende[0]->categoriasid;
 
		/*if ($categoriasid==null) {
			$categoriasid=$tiposervicio;
		}*/

		$sqlcategorias=" AND idcategoriaservicio IN($categoriasid)";
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

$globalgenerado=0;

	$array=array();

	$sql="
			SELECT *FROM (SELECT
    usuarios_servicios.*,
		servicios.titulo,
		servicios.modalidad,
		servicios.precio,
				usuarios.nombre,
				usuarios.paterno,
				usuarios.telefono,
				usuarios.materno,
				usuarios.email,
				usuarios.celular,
						usuarios.tipo,
(SELECT COUNT(*) FROM usuariossecundarios WHERE usuariossecundarios.idusuariotutorado=usuarios.idusuarios AND usuariossecundarios.sututor=1) as tutor,
		
		
		  (
            SELECT COUNT(*)
            FROM notapago_descripcion
            JOIN pagos ON notapago_descripcion.idpago = pagos.idpago
            JOIN notapago ON notapago.idnotapago = notapago_descripcion.idnotapago
            WHERE pagado = 1
                AND notapago.estatus = 1
                AND pagos.idservicio = usuarios_servicios.idservicio
                AND pagos.idusuarios = usuarios_servicios.idusuarios
        ) AS pagado,
				
				  (
            SELECT MAX(notapago.fechareporte)
            FROM notapago_descripcion
            JOIN pagos ON notapago_descripcion.idpago = pagos.idpago
            JOIN notapago ON notapago.idnotapago = notapago_descripcion.idnotapago
            WHERE pagado = 1
                AND notapago.estatus = 1
                AND pagos.idservicio = usuarios_servicios.idservicio
                AND pagos.idusuarios = usuarios_servicios.idusuarios
        ) AS fechareporte,

         (
            SELECT MAX(notapago.folio)
            FROM notapago_descripcion
            JOIN pagos ON notapago_descripcion.idpago = pagos.idpago
            JOIN notapago ON notapago.idnotapago = notapago_descripcion.idnotapago
            WHERE pagado = 1
                AND notapago.estatus = 1
                AND pagos.idservicio = usuarios_servicios.idservicio
                AND pagos.idusuarios = usuarios_servicios.idusuarios
        ) AS folio,
				
				(	SELECT
			count( usuarios_servicios.idusuarios ) AS coaches 
		FROM
			usuarios_servicios
			INNER JOIN usuarios ON usuarios.idusuarios = usuarios_servicios.idusuarios 
		WHERE
			usuarios.tipo = 3
			AND usuarios_servicios.idservicio = servicios.idservicio AND aceptarterminos=1 AND cancelacion=0
		) AS cantidadalumnos,
		 
		(
		SELECT
			COALESCE(GROUP_CONCAT( usuarios_servicios.idusuarios),  0) AS coaches 
		FROM
			usuarios_servicios
			INNER JOIN usuarios ON usuarios.idusuarios = usuarios_servicios.idusuarios 
		WHERE
			usuarios.tipo = 5 
			AND usuarios_servicios.idservicio = servicios.idservicio 
		) AS coaches ,
		( SELECT MIN( fecha ) FROM horariosservicio WHERE horariosservicio.idservicio = servicios.idservicio ) AS fechamin,
		( SELECT MAX( fecha ) FROM horariosservicio WHERE horariosservicio.idservicio = servicios.idservicio ) AS fechamax,
		( SELECT COUNT(*) FROM horariosservicio WHERE horariosservicio.idservicio = servicios.idservicio ) AS cantidadhorarios,
			(SELECT idcategoriaservicio FROM servicios WHERE idservicio=usuarios_servicios.idservicio) as idcategoriaservicio

FROM
    usuarios_servicios
JOIN (
    SELECT
        idservicio,
        idusuarios,
        MAX(fechacreacion) AS ultima_fechacreacion
    FROM
        usuarios_servicios
    GROUP BY
        idservicio,
        idusuarios
) AS ultima_fecha ON usuarios_servicios.idservicio = ultima_fecha.idservicio
    AND usuarios_servicios.idusuarios = ultima_fecha.idusuarios
    AND usuarios_servicios.fechacreacion = ultima_fecha.ultima_fechacreacion
		inner join servicios on usuarios_servicios.idservicio=servicios.idservicio
		inner join usuarios ON  usuarios_servicios.idusuarios=usuarios.idusuarios
				WHERE usuarios.tipo=3 AND usuarios_servicios.cancelacion=0

		) as tabla where 1=1
	";

		$sql.=$sqlconcan. $sqalumnoconcan. $sqlcategorias;


		if ($estatusaceptado!='') {
			$sql.=" AND aceptarterminos IN($estatusaceptado)";	
		}
		if ($estatuspagado!='') {
			$sql.=" AND pagado IN($estatuspagado)";	
		}

		if ($v_coaches>0) {
			$sql.=" AND coaches IN($v_coaches)";
		}

		

		$sql.=$sqlfecha;
		$sql.=$sqlfechapago;

		//echo $sql;die();
		

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



	/*$grupos = array();
	foreach ($array as $fila) {
	    $idservicio = $fila['idservicio'];
	    if (!isset($grupos[$idservicio])) {
	        $grupos[$idservicio] = array();
	    }
	    $grupos[$idservicio][] = $fila;
	}*/
	

	$uniqueValues = [];
	$contador=1;
foreach ($array as $item) {
    $key = $item->idservicio . '|' . $item->titulo;
    if (!isset($uniqueValues[$key])) {
        $uniqueValues[$key] = [
        		
            'idservicio' => $item->idservicio,
            'titulo' => $item->titulo,
             'fechainicial'=>$item->fechamin,
             'fechafinal'=>$item->fechamax,
             'cantidadalumnos'=>$item->cantidadalumnos,
             'modalidad'=>$item->modalidad,
             'precio'=>$item->precio,
             'cantidadhorarios'=>$item->cantidadhorarios

        ];

        $contador++;
    }
}

// Resultado
$uniqueValues = array_values($uniqueValues);
$cantidadelementos=count($uniqueValues);
//var_dump($uniqueValues);die();
 
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

				for ($i=0; $i <count($uniqueValues) ; $i++) { 

										 $idservicio=$uniqueValues[$i]['idservicio'];
										 $cantidadhorarios=$uniqueValues[$i]['cantidadhorarios'];


											$asignacion->idservicio=$idservicio;
											$obtenerservicios=$asignacion->obtenerServiciosAsignadosCoach3($sqlcategorias);

				foreach ($array as $alumnos) {

    if ($alumnos->idservicio == $idservicio) {

    			 $idusuariosalumno=$alumnos->idusuarios;
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
		 	$tdescuentomembresia=0;
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
		 				 	$modalidad=$uniqueValues[$i]['modalidad'];
									$costo=$uniqueValues[$i]['precio'];
								
									if ($modalidad==1) {
										
										$montoapagar=$costo;

									}

							if ($modalidad==2) {
								//grupo
								$obtenerparticipantes=$servicios->ObtenerParticipantes(3);
								
								$cantidadparticipantes=count($obtenerparticipantes);
								$costo=$uniqueValues[$i]['precio'];

								$obtenerhorarios=$servicios->ObtenerHorariosSemana();

								$monto=$costo*count($obtenerhorarios);

									if ($cantidadparticipantes>0) {

													$montoapagar=$monto/$cantidadparticipantes;

									}



							}

							
						if ($costo>=0) {

							//$obtenerperiodos=$servicios->ObtenerPeriodosPagos();

							//$numeroperiodos=count($obtenerperiodos);
							$montoapagar=$montoapagar/1;
							
						$totalgenerado=$totalgenerado+$montoapagar;

							//array_push($totalgenerado, $montoapagar);
							}else{
									//	array_push($totalgenerado, 0);

						$totalgenerado=$totalgenerado+0;
							}
					

		 	if (count($obtenerpago)>0) {

		 		$nota->idpago=$obtenerpago[0]->idpago;
		 		$pagos->idpago=$obtenerpago[0]->idpago;


		 		$obtenernotapago=$nota->ObtenerNotaPagoporPago();
		
		 		if(count($obtenernotapago)>0) {

		 			 	

		 			$fechapago=date('d-m-Y H:i:s',strtotime($obtenernotapago[0]->fecha));
		 			$fechareporte=date('d-m-Y H:i:s',strtotime($obtenernotapago[0]->fechareporte));
		 			$metodopago=$obtenernotapago[0]->tipopago;
		 			$folio=$obtenernotapago[0]->folio;
		 			
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
			 			$tdescuentomembresia=$descuentomembresia[0]->montodescontar;
			 			$nombremembresia=$descuentomembresia[0]->nombremembresia;

			 			$nombredescuento=$descuento[0]->nombredescuento;
			 				$montopagocondescuento=$montopago-$descuento[0]->montodescontar;
			 				
			 				$montoadescontarpago=$descuento[0]->montodescontar;

			 				/*	array_push($montodescuentoalumno, 	$montoadescontarpago);
*/
			 		
			 			
			 					
			 				//	$montocomision=$asignacion->CalcularMontoPago2($tipomontopago[0]->tipopago,$tipomontopago[0]->monto,$montopagocondescuento,$cantidadhorarios);

			 					
			 			 // 

			 		}
		 	

		 		}
		 		
		 	}else{
		 			/*	array_push($montopagoalumno, 0);
		 				array_push($montodescuentoalumno, 0);
		 				array_push($montodescuentomembresiaalumno, 0);
*/
					

		 	}

		 
		 /*	$verificadopago=0;
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
*/


		//	$objeto=array('idusuariocoach'=>$idcoach,'coach'=>$nombrecoach,'tipocomision'=>$tipomontopago[0]->tipopago,'monto'=>$tipomontopago[0]->monto,'montocomision'=>$montocomision,'montopagocoach'=>$montopagocoach,'idpago'=>$idpago,'idservicio'=>$idservicio,'pagado'=>$verificadopago,'montopagadocoach'=>$montopagadocoach);

			//array_push($arraycoachcomision,$objeto);

		}


							
					          	$sumatoriagenerado=$sumatoriagenerado+$montoapagar;
					         

					          $sumatoriadescuentomembresia=$sumatoriadescuentomembresia+$tdescuentomembresia;


					          	$sumatoriadescuento=$sumatoriadescuento+$descuento[0]->montodescontar;

					            $total=$montopago-$descuento[0]->montodescontar;

					            $sumatoriacobrado=$sumatoriacobrado+$total;
					    
					        				$montopago=$montopago-$descuento[0]->montodescontar-$tdescuentomembresia;

					          		$resultado=$montoapagar-$montopago-$descuento[0]->montodescontar-$tdescuentomembresia;

					          	$sumatoriapendiente=$sumatoriapendiente+abs($resultado);

		



				
					   			 }
											}
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

		
						</tr>
						</thead>
						<tbody>
								<?php 
									for ($i=0; $i <count($uniqueValues) ; $i++) { 

										 $idservicio=$uniqueValues[$i]['idservicio'];
										 $cantidadhorarios=$uniqueValues[$i]['cantidadhorarios'];

											$asignacion->idservicio=$idservicio;
											$obtenerservicios=$asignacion->obtenerServiciosAsignadosCoach3($sqlcategorias);

										?>
									<tr>
										
											<td><?php echo $uniqueValues[$i]['fechainicial']; ?></td>
											<td><?php echo $uniqueValues[$i]['fechafinal']; ?></td>
											<td><?php echo $uniqueValues[$i]['idservicio']; ?></td>
											<td><?php echo $uniqueValues[$i]['titulo']; ?></td>
											<td><?php echo $uniqueValues[$i]['cantidadalumnos']; ?></td>

											<td>
															
															<table id="tabla2">
						<thead>
							<tr>
					          
					        </tr>
						</thead>
						<tbody>
						<?php 
							$totalpagado=0;
							$totalpendiente=0;
							$arraycoachcomision=array();
									$contador=0;
							$totalgenerado=0;
							$totaldescuentomembresia=0;
							$totaldescuentootros=0;
							$totalcobrado=0;
					foreach ($array as $alumnos) {

    if ($alumnos->idservicio == $idservicio) {

    			 $idusuariosalumno=$alumnos->idusuarios;
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
			//
			

			$tipocoach->idcoach=$idcoach;

		//	$tipomontopago=$asignacion->ObtenertipoMontopago();
			$tipomontopago=$tipocoach->ObtenerTipoMontoCoach();
			
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
		 	$tdescuentomembresia=0;
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
		 	$modalidad=$uniqueValues[$i]['modalidad'];
				$costo=$uniqueValues[$i]['precio'];
								
									if ($modalidad==1) {
										
										$montoapagar=$costo;

									}

							if ($modalidad==2) {
								//grupo
								$obtenerparticipantes=$servicios->ObtenerParticipantes(3);
								
								$cantidadparticipantes=count($obtenerparticipantes);
								$costo=$uniqueValues[$i]['precio'];

								$obtenerhorarios=$servicios->ObtenerHorariosSemana();

								$monto=$costo*count($obtenerhorarios);

									if ($cantidadparticipantes>0) {

													$montoapagar=$monto/$cantidadparticipantes;

									}



							}

							
						if ($costo>=0) {

							//$obtenerperiodos=$servicios->ObtenerPeriodosPagos();

							//$numeroperiodos=count($obtenerperiodos);
							$montoapagar=$montoapagar/1;
							
						$totalgenerado=$totalgenerado+$montoapagar;

							//array_push($totalgenerado, $montoapagar);
							}else{
									//	array_push($totalgenerado, 0);

						$totalgenerado=$totalgenerado+0;
							}
					
							$globalgenerado=$globalgenerado+$montoapagar;
		 	if (count($obtenerpago)>0) {

		 		$nota->idpago=$obtenerpago[0]->idpago;
		 		$pagos->idpago=$obtenerpago[0]->idpago;


		 		$obtenernotapago=$nota->ObtenerNotaPagoporPago();
		
		 		if(count($obtenernotapago)>0) {

		 			 	

		 			$fechapago=date('d-m-Y H:i:s',strtotime($obtenernotapago[0]->fecha));
		 			$fechareporte=date('d-m-Y H:i:s',strtotime($obtenernotapago[0]->fechareporte));
		 			$metodopago=$obtenernotapago[0]->tipopago;
		 			$folio=$obtenernotapago[0]->folio;
		 			
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
			 			$tdescuentomembresia=$descuentomembresia[0]->montodescontar;
			 			$nombremembresia=$descuentomembresia[0]->nombremembresia;

			 			 $nombredescuento=$descuento[0]->nombredescuento;
			 				$montopagocondescuento=$montopago-$descuento[0]->montodescontar;
			 				
			 				$montoadescontarpago=$descuento[0]->montodescontar;

			 				/*	array_push($montodescuentoalumno, 	$montoadescontarpago);
*/
			 		
			 			
			 					
			 					$montocomision=$asignacion->CalcularMontoPago2($tipomontopago[0]->tipopago,$tipomontopago[0]->monto,$montopagocondescuento,$cantidadhorarios);

			 					
			 			 // 

			 		}
		 	

		 		}
		 		
		 	}else{
		 			/*	array_push($montopagoalumno, 0);
		 				array_push($montodescuentoalumno, 0);
		 				array_push($montodescuentomembresiaalumno, 0);
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


        $resultados[] = $alumnos;
		
							?>
						<tr>
							<td style="width: 100px;"><?php echo ($contador+1); ?></td>
					          <td style="width: 100px;"><?php echo $alumnos->nombre.' '.$alumnos->paterno.' '.$alumnos->materno; ?>
					          	
					          </td>
					          <td style="width: 100px;"><?php echo $alumnos->cantidadhorarios; ?></td>
					          <td style="width: 100px;">
					          	<?php  $tutor=$alumnos->tutor; 
					          		if ($tutor>0) {
					          			echo "SI";
					          		}else{
					          			echo "NO";
					          		}

					          	?>

					          </td>
					          <td style="width: 100px;">
					          	
					          		<?php  $aceptarterminos=$alumnos->aceptarterminos; 
					          		if ($aceptarterminos>0) {
					          			echo "SI";
					          		}else{
					          			echo "NO";
					          		}

					          	?>
					          </td>
					          <td style="width: 100px;">
					          	
					          	<?php echo '$'.number_format($montoapagar, 2,'.',',');

					          

					          	 ?>
					          </td>

					          <td style="width: 100px;">


					          	<?php 
					         	if ($tdescuentomembresia>=0) {
					           	echo '$'.number_format($tdescuentomembresia, 2,'.',','); 
					          						}else{
					          								echo '$'.number_format(0, 2,'.',','); 

					          						}

					         

					          	$totaldescuentomembresia=$totaldescuentomembresia+$tdescuentomembresia;

					          	?>

					          </td>

					          <td style="width: 100px;">
					          	<?php echo '$'.number_format($descuento[0]->montodescontar, 2,'.',','); 
					          	$totaldescuentootros=$totaldescuentootros+$descuento[0]->montodescontar;
					          
					          	?>

					          </td>


					          <td style="width: 100px;">
					           <?php

					          // $totalpagado=$totalpagado+$montopagoalumno[$j];
					            echo '$'.number_format($montopago-$descuento[0]->montodescontar-$descuentomembresia[0]->montodescontar, 2,'.',','); 
					            $total=$montopago-$descuento[0]->montodescontar-$descuentomembresia[0]->montodescontar;

					            $totalcobrado=$totalcobrado+$total;
					          // echo 'aqui';die();
					            ?>

					          </td>
					          

					          <td style="width: 100px;">
					          	
					          	<?php 

					        				$montopago=$montopago-$descuento[0]->montodescontar-$tdescuentomembresia;

					          		$resultado=$montoapagar-$montopago-$descuento[0]->montodescontar-$tdescuentomembresia;

					          		$totalpendiente=$totalpendiente+$resultado;

					          		echo '$'.number_format($resultado, 2,'.',',');
					          	 ?>
					          </td>
					          <td style="width: 100px;"><?php echo $alumnos->folio; ?></td>
					           <td style="width: 100px;"><?php echo $alumnos->fechareporte; ?></td>
					         </tr> 
					         

					<?php	

					$contador++;


				
					    }
}
				

						 ?>

							
							
												</tbody>
				        
				     </table>



				</td>

 								<td> <?php echo $uniqueValues[$i]['cantidadhorarios']; ?> </td>

 								<td><?php echo '$'.number_format($totalgenerado,2,'.',','); ?>
 									

 								</td>


 								<td><?php echo '$'.number_format($totaldescuentomembresia,2,'.',','); ?></td>

 									<td><?php echo '$'.number_format($totaldescuentootros,2,'.',','); ?></td>

 									<td><?php echo '$'.number_format($totalcobrado,2,'.',','); ?></td>
 									<td><?php echo '$'. number_format($totalpendiente,2,'.',','); ?></td>




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

								for ($l=0; $l <count($arraycoachcomision); $l++) {  

									?>
									<tr>
										
										<td><?php echo $arraycoachcomision[$l]['coach']; ?> </td>
										<td><?php echo $uniqueValues[$i]['cantidadhorarios']; ?></td>
										
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
					



			 echo '$'.number_format($comisiondelservio,2,'.',','); ?> 
			 	
			 </td>
		 

									</tr>	



					<?php

										}


								 ?>


							
						</tbody>


</table>

<div class="row">
		<div class="col-md-6"></div>
		<div class="col-md-2"></div>
		<div class="col-md-4">
			<p style="font-size:20px;">TOTAL DE SERVICIOS: <span id="totalservicios" style="font-weight: bold;"><?php echo $cantidadelementos; ?></span></p>

			<p style="font-size:20px;">MONTO: <span id="totalmonto" style="font-weight: bold;"><?php echo '$'.number_format($globalgenerado,2,'.',','); ?></span></p>

		</div>
	</div>





