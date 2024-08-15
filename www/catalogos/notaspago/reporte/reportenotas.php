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
require_once("../../../clases/class.Notapago.php");
require_once("../../../clases/class.Usuarios.php");
require_once("../../../clases/class.Servicios.php");
require_once("../../../clases/class.Fechas.php");

require_once("../../../clases/class.Pagos.php");
require_once("../../../clases/class.PagConfig.php");

//Se crean los objetos de clase
$db = new MySQL();
$reporte = new Reportes();
$f = new Funciones();
$bt = new Botones_permisos();
$lo = new PagosCoach();
$lo->db=$db;
$asignacion=new ServiciosAsignados();
$asignacion->db=$db;
$notas=new Notapago();
$notas->db=$db;
$usuarios=new Usuarios();
$usuarios->db=$db;
$servicios=new Servicios();
$servicios->db=$db;
$pagos=new Pagos();
$pagos->db=$db;
$fechas=new Fechas();
$config=new PagConfig();
$config->db=$db;

$obtenerconfi=$config->ObtenerInformacionConfiguracion();
$estatus=array('PENDIENTE','ACEPTADO','CANCELADO','DECLINADO');
$iva=0;
if ($obtenerconfi['iva']!='' && $obtenerconfi['iva']>0) {
	$iva=$obtenerconfi['iva'];
}


//Recibo parametros del filtro
	$idservicio=$_GET['idservicio'];
	$pantalla=$_GET['pantalla'];

	$alumno=$_GET['alumno'];

	$fechafin=$_GET['fechafin'];
	$horainicio=$_GET['horainicio'];
	$horafin=$_GET['horafin'];
	$sqlconcan="";
	$sqalumnoconcan="";
	$sqlfecha="";
	$total_gral=0;
	if ($idservicio>0){
		$sqlconcan=" AND notapago.idservicio=".$idservicio."";
	}
	/*if ($alumno>0) {
		$sqalumnoconcan=" AND usuarios.idusuarios=".$alumno."";
	}
*/

	if (isset($_GET['fechainicio'])) {

		if ($_GET['fechainicio']!='') {
		
		$fechainicio=$_GET['fechainicio'];
		
		$fechainicio=$fechainicio.' 00:00:00 ';
		
		}
	}

	if (isset($_GET['fechafin'])) {
		if ($_GET['fechafin']!='') {
		$fechafin=$_GET['fechafin'];
		
			$fechafin=$fechafin.' 23:59:59 ';
			
		}
	}

	if ($fechainicio!='' && $fechafin!='') {
		$sqlfecha=" AND  notapago.fechareporte>= '$fechainicio' AND notapago.fechareporte <='$fechafin'";
	}

 
	$sql="
			SELECT 
			notapago.idnotapago,
			notapago.idusuario,
			notapago.fecha,
			notapago.subtotal,
			notapago.iva,
			notapago.total,
			notapago.comisiontotal,
			notapago.montomonedero,
			notapago.estatus,
			notapago.idtipopago,
			notapago.tipopago,
			notapago.confoto,
			notapago.datostarjeta,
			notapago.idpagostripe,
			notapago.folio,
			notapago.descuento,
			notapago.descuentomembresia,
			notapago.datostarjeta2,
			notapago.montovisual,
			notapago.cambio,
			usuarios.nombre,
			usuarios.paterno,
			usuarios.materno,
			usuarios.telefono,
			notapago.fechaaceptacion,
			notapago.fechareporte

		 FROM notapago INNER JOIN usuarios ON notapago.idusuario=usuarios.idusuarios

			WHERE 1=1  $sqlconcan $sqlfecha

		";
		$l_pagos=$db->consulta($sql);
		$l_pagos_num = $db->num_rows($l_pagos);

		$l_pagos_row = $db->fetch_assoc($l_pagos);

		
	
 
if($pantalla==0) {
	# code...


$filename = "rpt_Listadonotaspagos-".".xls";
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

 		<table id="tbl_pagos" cellpadding="0" cellspacing="0" class="table  table table-striped table-bordered table-responsive vertabla">
				<thead>
					<tr bgcolor="#3B3B3B" style="color: #FFFFFF; text-align: left;">
						 
						<th style="text-align: center;">FOLIO </th> 
						<th style="text-align: center;">ALUMNO</th>
						<th style="text-align: center;">FECHA</th>
						<th style="text-align: center;">FECHA VALIDACIÓN</th>

						<th style="text-align: center;">TIPO DE PAGO</th>
						<th style="text-align: center;">TOTAL</th>
						<th style="text-align: center;">MONTO MONEDERO</th>

						<th style="text-align: center;">MONTO OTRO TIPO DE PAGO </th>
						<th style="text-align: center;">ESTATUS</th>

					</tr>
				</thead>
				<tbody>
					
					<?php
					if($l_pagos_num== 0){
						?>
						<tr> 
							<td colspan="6" style="text-align: center">
								<h5 class="alert_warning">NO EXISTEN REGISTROS EN LA BASE DE DATOS.</h5>
							</td>
						</tr>
						<?php
					}else{

						do
						{

							?>
							<tr>
							
						
							
							<td style="text-align: center;"><?php echo $l_pagos_row['folio'];?></td>

							<td style="text-align: center;"><?php echo $l_pagos_row['nombre'].' '.$l_pagos_row['paterno'].' '.$l_pagos_row['materno'];?></td>

							<td style="text-align: center;"><?php echo date('d-m-Y H:i:s',strtotime($l_pagos_row['fecha']));?></td>


							<td style="text-align: center;"><?php 

							if ($l_pagos_row['fechareporte']!='') {

							echo date('d-m-Y H:i:s',strtotime($l_pagos_row['fechareporte']));

								}
							?>
								

							</td>
							<td style="text-align: center;"><?php echo $l_pagos_row['tipopago'];?></td>
							<?php $total=$l_pagos_row['total'];
								if ($total==0) {
								$total=$l_pagos_row['montomonedero'];
								}

							 ?>
							
							<td style="text-align: center;">$<?php echo number_format($total,2,'.', ',');?></td>

							<td style="text-align: center;">$<?php echo 

							number_format($l_pagos_row['montomonedero'],2,'.', ',');?></td>


							<?php 
							$diferencia=$l_pagos_row['total'];
							if ($l_pagos_row['total']>0) {
								# code...
							
							$diferencia=$l_pagos_row['total']-$l_pagos_row['montomonedero'];

						}

							 ?>

							 <td>
							 	$<?php 
							 echo number_format($diferencia,2,'.', ',');?>
							 </td>

							<?php 
								$clase="";

								if ($l_pagos_row['estatus']==0) {
									$clase='notapendiente';
								}

									if ($l_pagos_row['estatus']==1) {
									$clase='notaaceptado';
								}

								if ($l_pagos_row['estatus']==2) {
									$clase='notacancelado';
								}

								if ($l_pagos_row['estatus']==3) {
									$clase='notadeclinado';
								}

							 ?>
						
							<td style="text-align: center;" class="<?php echo $clase; ?>"><span class=""><?php echo $estatus[$l_pagos_row['estatus']];?></span></td>

						

							</tr>
							<?php
						}while($l_pagos_row = $db->fetch_assoc($l_pagos));
					}
					?>
				</tbody>
			</table>