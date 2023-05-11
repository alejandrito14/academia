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
		$sqlfecha=" AND  pagos.fechapago>= '$fechainicio' AND pagos.fechapago <='$fechafin'";
	}

	if ($v_tiposervicios!='' && $v_tiposervicios>0) {
		$sqlcategorias=" AND servicios.idcategoriaservicio IN($v_tiposervicios)";
	}

	$array=array();
	$sql="
			SELECT servicios.titulo,servicios.idservicio from servicios

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
		

?>

<table class="table  table table-striped table-bordered table-responsive vertabla" border="1" style="">
	<thead>
	<tr>
		<th>Fecha inicial</th>
		<th>Fecha final</th>
		<th>Nombre del servicio</th>
		<th>Número de alumnos</th>
		<th>Alumnos</th>
		<th>Coach</th>
		<th>Horarios</th>
		<th>Monto generado</th>
		<th>Monto cobrado</th>
		<th>Monto pendiente</th>
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



	for ($k=0; $k <count($obtenerservicios); $k++) {
	$asignacion->idusuario=$obtenerservicios[$k]->idusuarios;
   	 $datoscoach=$usuarios->ObtenerUsuarioDatos();

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
		 	$fechareporte="";
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
			 			

			 			$montopago=$obtenerpago[0]->monto;
			 			$pagos->idnotapago=$obtenernotapago[0]->idnotapago;
			 			$descuento=$pagos->ObtenerPagoDescuento2();
			 			$descuentomembresia=$pagos->ObtenerPagoDescuentoMembresia();

			 			$nombremembresia=$descuentomembresia[0]->nombremembresia;

			 			$nombredescuento=$descuento[0]->nombredescuento;
			 				$montopagocondescuento=$montopago-$descuento[0]->montodescontar;
			 				

			 			
			 						
			 					$montocomision=$asignacion->CalcularMontoPago($tipomontopago[0]->tipopago,$tipomontopago[0]->monto,$montopagocondescuento);

			 						 			
			 			 // 
						

			 			  $totalpagado=$montopagocondescuento-$descuentomembresia[0]->montodescontar;

			 		}
		 	

		 		}
		 		
		 	}

			$objeto=array('idusuariocoach'=>$idcoach,'coach'=>$nombrecoach,'tipocomision'=>$tipomontopago[0]->tipopago,'monto'=>$tipomontopago[0]->monto,'montocomision'=>$montocomision,'montopagocoach'=>$montopagocoach);

			array_push($arraycoachcomision,$objeto);

		}
		
		 ?>
		<tr>
			<td><?php echo date('d-m-Y',strtotime($peridohorario[0]->fechamin)); ?></td>
			<td><?php echo date('d-m-Y',strtotime($peridohorario[0]->fechamax)); ?></td>
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
					        </tr>
						</thead>
						<tbody>
						<?php 
						for ($j=0; $j < count($alumnos); $j++) {?>
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
					         </tr> 
					         

					<?php	}

						 ?>
							
							
						</tbody>
				        
				     </table>
			</td>
			<td>

				<table id="tabla3">
						<thead>
							<tr>
					          <th>Nombre del coach</th>
					          <th>Monto/Porcentaje</th>
					          <th>Comisión generada</th>
					          <th>Comisión pagada</th>
					          <th>Comisión pendiente</th>
					        </tr>
						</thead>
						<tbody>
							<?php 

								for ($l=0; $l <count($arraycoachcomision) ; $l++) {  ?>
									<tr>
										
										<td><?php echo $arraycoachcomision[$l]['coach']; ?> </td>
										<td><?php echo $arraycoachcomision[$l]['montopagocoach']; ?></td>
										<td></td>
										<td></td>
										<td></td>

									</tr>

							<?php	}
							 ?>

						</tbody>
					</table>
				


			</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<!-- <td></td>
			<td></td>
			<td></td> -->
		</tr>

	<?php } ?>
	</tbody>


</table>