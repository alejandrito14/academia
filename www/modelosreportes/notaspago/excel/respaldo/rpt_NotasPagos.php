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
$estatuspago=array('pendiente','proceso','aceptado','rechazado','reembolso','sin reembolso');
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
		if (isset($_GET['horainicio'])) {
			$fechainicio=$fechainicio.' '.$_GET['horainicio'];
		}
		}
	}

	if (isset($_GET['fechafin'])) {
		if ($_GET['fechafin']!='') {
		$fechafin=$_GET['fechafin'];
		if (isset($_GET['horafin'])) {
			$fechafin=$fechafin.' '.$_GET['horafin'];
			}
		}
	}

	if ($fechainicio!='' && $fechafin!='') {
		$sqlfecha=" AND  notapago.fechareporte>= '$fechainicio' AND notapago.fechareporte <='$fechafin'";
	}
 

	$sql="
			SELECT
			usuarios.idusuarios,
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
			notapago.descripcionaceptacion,
			notapago.comisionpornota,
			notapago.tipocomisionpornota,
			notapago.comisionnota,
			notapago.requierefactura,
			notapago.razonsocial,
			notapago.idnotapago,
			usuarios.nombre,
			usuarios.paterno,
			usuarios.materno,
			usuarios.telefono,
			notapago.fechaaceptacion,
			notapago.fechareporte
			FROM
			notapago
			JOIN usuarios
		    ON usuarios.idusuarios = notapago.idusuario

			WHERE 1=1 AND notapago.estatus=1  $sqlconcan $sqlfecha

		";

		
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


$filename = "rpt_NotasPagos-".".xls";
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
		    <th style="width: 30%;">FOLIO DEL TICKET</th>
		    <th style="width: 20%;">FECHA DE ACEPTACIÓN EN LA APP</th>
		    <th style="width: 20%;">ID CLIENTE</th>
		    <th style="width: 20%;">NOMBRE DEL CLIENTE</th>
		    <th style="width: 20%;">CANTIDAD</th>
		    <th style="width: 20%;">ID PRODUCTO</th>
		    <th style="width: 20%;">NOMBRE DEL PRODUCTO</th>
		   	<th style="width: 20%;">PRECIO UNITARIO</th>
		   	<th style="width: 20%;">IVA</th>

		   	<th style="width: 20%;">SUBTOTAL</th>

		   	<th style="width: 20%;">DESCUENTO</th>
		   	<th style="width: 20%;">TOTAL</th>
			<th style="width: 20%;">TIPO DE PAGO</th>
		   	<th style="width: 20%;">CUENTA DE PAGO</th>
		   	<th style=""> FECHA DE VALIDACIÓN DE PAGO</th>


		  </tr>
		  </thead>
		  <tbody>

		  	<?php 

		  
		 	for ($k=0; $k <count($array); $k++) { 
		 		$idnota=$array[$k]->idnotapago;
		 			$arraynotas=array();

		 		$notas->idnotapago=$idnota;
		 		$obtenerdescripcionnota=$notas->ObtenerdescripcionNota();


		 		if (count($obtenerdescripcionnota)>0) {

		 			for ($j=0; $j <count($obtenerdescripcionnota) ; $j++) { 
		 				$pagos->idpago=$obtenerdescripcionnota[$j]->idpago;
		 				$pagos->idnotapago=$idnota;
		 				$obtenerpago=$pagos->ObtenerPago();

		 				$obtenerdescuento=$pagos->ObtenerPagoDescuento();
		 				
		 				$montodescuento=$obtenerdescuento[0]->descuento;
		 				$montocondescuentomembresia=$obtenerdescuento[0]->descuentomembresia;

		 				$descuento=$montodescuento+$montocondescuentomembresia;

		 				$ivacalculado=0;
		 				
		 				$preciototal=$obtenerdescripcionnota[$j]->cantidad*$obtenerdescripcionnota[$j]->monto;
		 				$dividir=($iva/100)+1;
						$precioiva=$preciototal/$dividir;

						$ivacalculado=$preciototal-$precioiva;

						

		 				$total=$obtenerdescripcionnota[$j]->monto-$descuento;
		 				$objeto=array(
		 					'folioticket'=>$array[$k]->folio,
		 					'fechahora'=>$array[$k]->fecha,
		 					'fechaaceptacion'=>$array[$k]->fechaaceptacion,
		 					'idcliente'=>$array[$k]->idusuarios,
		 					'nombrecliente'=>$array[$k]->nombre.' '.$array[$k]->paterno.' '.$array[$k]->materno,
		 					'cantidad'=>$obtenerdescripcionnota[$j]->cantidad,
		 					'idproducto'=>$obtenerpago[0]->idservicio==0?$obtenerpago[0]->idmembresia:$obtenerpago[0]->idservicio,
		 					'producto'=>$obtenerdescripcionnota[$j]->concepto,
		 					'preciounitario'=>number_format($precioiva,2, '.', ','),
		 					'subtotal'=>number_format($obtenerdescripcionnota[$j]->cantidad*$obtenerdescripcionnota[$j]->monto,2, '.', ','),
		 					'iva'=>number_format($ivacalculado,2, '.', ','),
		 					'descuento'=>number_format($descuento,2, '.', ','),
		 					'total'=>$total,
		 					'tipopago'=>$array[$k]->tipopago,
		 					'cuenta'=>''

		 				);
		 					
		 					array_push($arraynotas, $objeto);
		 				}
		 				
		 			}


		 			for ($n=0; $n < count($arraynotas); $n++) {  ?>
		 				<tr>

		 				 <td><?php echo $arraynotas[$n]['folioticket']; ?></td>

		 				 <td><?php echo date('d-m-Y H:i:s',strtotime($arraynotas[$n]['fechahora'])); ?></td>
							<td><?php echo $arraynotas[$n]['idcliente']; ?></td>
							<td><?php echo $arraynotas[$n]['nombrecliente']; ?></td>
							<td><?php echo $arraynotas[$n]['cantidad']; ?></td>
							<td><?php echo $arraynotas[$n]['idproducto']; ?></td>
							<td><?php echo $arraynotas[$n]['producto']; ?></td>
							<td>$<?php echo $arraynotas[$n]['preciounitario']; ?></td>
							<td>$<?php echo $arraynotas[$n]['iva']; ?></td>

							<td>$<?php echo $arraynotas[$n]['subtotal']; ?></td>
							
							<td>$<?php echo $arraynotas[$n]['descuento']; ?></td>
							<td>$<?php echo $arraynotas[$n]['total']; ?></td>
							<td><?php echo $arraynotas[$n]['tipopago']; ?></td>
							<td><?php echo $arraynotas[$n]['cuenta']; ?></td>
							
							<td><?php

							if ($arraynotas[$n]['fechaaceptacion']!=null) {
									echo date('d-m-Y H:i:s',strtotime($arraynotas[$n]['fechaaceptacion']));
								}

							  ?></td>
							</tr>
							
		 		

		 		<?php	}
		 			?>



		 			
		 		

		 <?php	}


		 	?>



		  </tbody>
		</table>
		