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

	$alumno=$_GET['alumno'];
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
		$sqlfecha=" AND  pagos.fechapago>= '$fechainicio' AND pagos.fechapago <='$fechafin'";
	}

	if ($v_tiposervicios!='' && $v_tiposervicios>0) {
		$sqlcategorias=" AND servicios.idcategoriaservicio IN($v_tiposervicios)";
	}




	$sql="
			SELECT *from servicios

LEFT JOIN categorias on categorias.idcategorias=servicios.idcategoriaservicio
WHERE   servicios.estatus IN(0,1) and categorias.avanzado=1
$sqlconcan $sqalumnoconcan $sqlcategorias
	GROUP BY servicios.idservicio  		";
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


$filename = "Reporte1".".xls";
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
 			<thead >
		  <tr bgcolor="#3B3B3B" style="color: #FFFFFF; text-align: left;">
		   
		    <th>ID</th>
		    <th>SERVICIO</th>
		    <th>ID</th>
		    <th>ALUMNO</th>
		    <th>CELULAR</th>
		   	<th>ACEPTADO</th>
		  		<th>PAGADO</th>	
		  		<th>FOLIO TICKET</th>	
		  		<th>TOTAL PAGADO</th>	

		   	<th>MONTO</th>

		   	<th>TIPO PAGO</th>
		   	<th>FECHA PAGO</th>
		   	<th>NOMBRE DESCUENTO</th>

		   	<th>DESCUENTO</th>
		   	<th>MEMBRESÍA</th>

		   	<th>DESCUENTO MEMB.</th>
		   	<th>ID</th>
						<th>COACH</th>
		   	<th>COMISIÓN COACH</th>
		   	<th>MONTO COMISIÓN</th>

		  </tr>
		  </thead>
		  <tbody>
		 	<?php 
		 	for ($k=0; $k <count($array); $k++) { 
		 		$pagosservicios=array();


		 	$idservicio=$array[$k]->idservicio;	
		 	$asignacion->idservicio=$array[$k]->idservicio;
			
				
					$obtenerservicios=$asignacion->obtenerServiciosAsignadosCoach3($sqlcategorias);
					$pagosservicios=array();

				

	$textoestatus=array('Pendiente','Aceptado','Cancelado');
	$arraycoachcomision=array();

	for ($i=0; $i <count($obtenerservicios); $i++) {
	$asignacion->idusuario=$obtenerservicios[$i]->idusuarios;
   	 $datoscoach=$usuarios->ObtenerUsuarioDatos();

	 $idusuarios=$obtenerservicios[$i]->idusuarios;
 	 $nombreservicio=$obtenerservicios[$i]->titulo;

 	 $nombrecoach=$obtenerservicios[$i]->nombre.' '.$obtenerservicios[$i]->paterno.' '.$obtenerservicios[$i]->materno;
	 $idcoach=$obtenerservicios[$i]->idusuarios;


			
			$idusuarios_servicios=$obtenerservicios[$i]->idusuarios_servicios;
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

			$objeto=array('idusuariocoach'=>$idcoach,'coach'=>$nombrecoach,'tipocomision'=>$tipomontopago[0]->tipopago,'monto'=>$tipomontopago[0]->monto,'montocomision'=>0,'montopagocoach'=>$montopagocoach);

			array_push($arraycoachcomision,$objeto);

		}
		//var_dump($arraycoachcomision);die();
		$asignacion->idservicio=$idservicio;
		$asignacion->idusuario=0;
		$obtenerAlumnosServicio=$asignacion->obtenerUsuariosServiciosAsignadosAlumnos();

		for ($h=0; $h <count($obtenerAlumnosServicio) ; $h++) { 
				# code...
				$idusuariosalumno=$obtenerAlumnosServicio[$h]->idusuarios;
		 	$pagos->idusuarios=$obtenerAlumnosServicio[$h]->idusuarios;
		 	$nombrealumno=$obtenerAlumnosServicio[$h]->nombre.' '.$obtenerAlumnosServicio[$h]->paterno.' '.$obtenerAlumnosServicio[$h]->materno;
		 	$celularalumno=$obtenerAlumnosServicio[$h]->celular;

		 	$pago->idusuarios=$idusuariosalumno;

		 	$obtenerpago=$pagos->ChecarPagosServicio();

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
		 	if (count($obtenerpago)>0) {
		 	

		 		$nota->idpago=$obtenerpago[0]->idpago;
		 		$pagos->idpago=$obtenerpago[0]->idpago;
		 		$obtenernotapago=$nota->ObtenerNotaPagoporPago();

		 		if(count($obtenernotapago)>0) {
		 			$fechapago=date('d-m-Y H:i:s',strtotime($obtenernotapago[0]->fecha));
		 			$metodopago=$obtenernotapago[0]->tipopago;
		 			$folio=$obtenernotapago[0]->folio;
			 			if ($obtenernotapago[0]->estatus==1) {
			 					$pagado=1;
			 			

			 			$montopago=$obtenerpago[0]->monto;
			 			$pagos->idnotapago=$obtenernotapago[0]->idnotapago;
			 			$descuento=$pagos->ObtenerPagoDescuento2();
			 			$descuentomembresia=$pagos->ObtenerPagoDescuentoMembresia();

			 			$nombremembresia=$descuentomembresia[0]->nombremembresia;

			 			$nombredescuento=$descuento[0]->nombredescuento;
			 				$montopagocondescuento=$montopago-$descuento[0]->montodescontar;
			 				

			 			if (count($arraycoachcomision)>0) {
			 				for ($l=0; $l < count($arraycoachcomision); $l++) { 
			 						
			 					$montocomision=$asignacion->CalcularMontoPago($arraycoachcomision[$l]['tipocomision'],$arraycoachcomision[$l]['monto'],$montopagocondescuento);

			 					$arraycoachcomision[$l]['montocomision']=$montocomision;

			 					}
			 				}	
			 			 // 
						

			 			  $totalpagado=$montopagocondescuento-$descuentomembresia[0]->montodescontar;

			 		}
		 	

		 		}
		 		
		 	}

		 	$aceptado=$obtenerAlumnosServicio[$h]->aceptarterminos;
		 		$agrega=0;
		 		if ($fechapago!='') {
		 			
		 		 			$fechapago2=date('Y-m-d',strtotime($obtenernotapago[0]->fecha));

$fechainicio=date('Y-m-d',strtotime($fechainicio));
$fechafin=date('Y-m-d',strtotime($fechafin));

		 			if($fechapago2>=$fechainicio && $fechapago2<=$fechafin) {
		 				$agrega=1;
		

		 
		 			}

		 		}/*else{

		 				$agrega=1;

		 		}*/

		 		
						$objeto=array(
								'idservicio'=>$idservicio,
								'nombreservicio'=>$nombreservicio,
								'idalumno'=>$idusuariosalumno,
								'alumno'=>$nombrealumno,
								'celular'=>$celularalumno,
								'aceptado'=>$aceptado,
								'pagado'=>$pagado,
								'montopago'=>$montopago,
								'fechapago'=>$fechapago,
								'metodopago'=>$metodopago,
								'nombredescuento'=>$nombredescuento,
								'descuento'=>$descuento[0]->montodescontar,
								'nombremembresia'=>$descuentomembresia[0]->nombremembresia,
								'descuentomembresia'=>$descuentomembresia[0]->montodescontar,
								'idcoach'=>$idcoach,
								'nombrecoach'=>$nombrecoach,
								'comisioncoach'=>$montopagocoach,
								'montocomision'=>$montocomision,
								'fechahoramin'=>date('d-m-Y',strtotime($peridohorario[0]->fechamin)),
								'fechahoramax'=>date('d-m-Y',strtotime($peridohorario[0]->fechamax)),
								'folio'=>$folio,
								'totalpagado'=>$totalpagado,
								'coaches'=>$arraycoachcomision




						);
							//	var_dump($objeto);die();

						if ($agrega==1) {


							array_push($pagosservicios, $objeto);
						}
		
			

						

		}

	
 	


		 			?>


		 			<?php 
		 			for ($l=0; $l <count($pagosservicios) ; $l++) { 
		 			
		 			 ?>
		 			 <tr>
				     <td><?php echo $pagosservicios[$l]['idservicio']; ?></td>
				     <td><?php echo $pagosservicios[$l]['nombreservicio']?>
				     	
				     	<p> PERIODO: <?php echo $pagosservicios[$l]['fechahoramin'].' / '. $pagosservicios[$l]['fechahoramax'];?></p>
				     </td>
				  

				      <td><?php echo $pagosservicios[$l]['idalumno']; ?></td>
								 <td><?php echo $pagosservicios[$l]['alumno']; ?></td>

 							<td><?php echo $pagosservicios[$l]['celular'];?></td>

				     <td><?php echo $estatusaceptado[$pagosservicios[$l]['aceptado']]; ?></td>
				  	
				  		  <td><?php echo $estatusapagado[$pagosservicios[$l]['pagado']]; ?></td>
				  		   <td><?php echo $pagosservicios[$l]['folio']; ?></td>
				  		  <td>$<?php echo number_format($pagosservicios[$l]['totalpagado'],2,'.', ','); ?></td>

				  	 <td>$<?php echo number_format($pagosservicios[$l]['montopago'],2,'.', ','); ?></td>
				  	<td><?php echo $pagosservicios[$l]['metodopago']; ?></td>
				  	<td><?php echo $pagosservicios[$l]['fechapago']; ?></td>

				  	<td><?php echo $pagosservicios[$l]['nombredescuento']?>

 						<td>$<?php echo number_format($pagosservicios[$l]['descuento'],2,'.', ','); ?></td>
 							<td><?php echo $pagosservicios[$l]['nombremembresia']?>
				      <td>$<?php echo number_format($pagosservicios[$l]['descuentomembresia'], 2,'.',','); ?></td>
				      <td><?php echo $pagosservicios[$l]['idcoach']; ?></td>

				 	<td><?php $coaches= $pagosservicios[$l]['coaches'];
				 	
				 		for ($c=0; $c < count($coaches); $c++) {  ?>
				 			
				 			<p><?php echo $coaches[$c]['coach']; ?></p>
				 		<?php
				 			}

				 	 ?>
				 		


				 	</td>


				  	  <td>

				  	  	<?php $coaches= $pagosservicios[$l]['coaches'];
				 	
				 		for ($c=0; $c < count($coaches); $c++) {  ?>
				 			
				 			<p><?php echo $coaches[$c]['montopagocoach']; ?></p>
				 		<?php
				 			}

				 	 ?>
				 		

				  	  
				  	   	
				  	   </td>

				  	   <td>
				  	   	
				  	   	<?php $coaches= $pagosservicios[$l]['coaches'];
				 		$suma=0;
				 		for ($c=0; $c < count($coaches); $c++) { 
				 			$suma=$suma+$coaches[$c]['montocomision'];
				 			
				 		
				 			} 

				 	?>

				 			<p>$<?php echo $suma; ?></p>
				 	 
				 		


				  	   </td>
				  	
				  	</tr> 
		 	<?php	

		 		}
		 	}

		 	 ?>
		 	<!--  <tr>
				<td colspan="7" style="text-align: right; font-weight: bold">TOTAL</td>
				<td style="text-align: right; font-weight: bold">$ 
					<?php echo number_format($total_gral,2); ?>
				</td>
					
			</tr> -->
			 </tbody>

		</table>

<?php 




 ?>
