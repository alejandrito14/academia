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

//Se crean los objetos de clase
$db = new MySQL();
$reporte = new Reportes();
$f = new Funciones();
$bt = new Botones_permisos();
	
$estatuspago=array('pendiente','proceso','aceptado','rechazado','reembolso','sin reembolso');

//Recibo parametros del filtro
	$idservicio=$_GET['idservicio'];

	$alumno=$_GET['alumno'];

	$fechafin=$_GET['fechafin'];
	$horainicio=$_GET['horainicio'];
	$horafin=$_GET['horafin'];
	$sqlconcan="";
	$sqalumnoconcan="";
	$sqlfecha="";
	$total_gral=0;
	if ($idservicio>0){
		$sqlconcan=" AND servicios.idservicio=".$idservicio."";
	}
	if ($alumno>0) {
		$sqalumnoconcan=" AND usuarios.idusuarios=".$alumno."";
	}

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
		$sqlfecha=" AND  pagos.fechacreacion>= '$fechainicio' AND pagos.fechacreacion <='$fechafin'";
	}


	$sql="
			SELECT
			usuarios.nombre,
			usuarios.paterno,
			usuarios.materno,
			usuarios.celular,
			usuarios.usuario,
			pagos.monto,
			pagos.tipo,
			pagos.estatus,
			pagos.pagado,
			pagos.fechaevento,
			pagos.dividido,
			pagos.concepto,
			pagos.folio,
			pagos.idpago,
			pagos.fechacreacion,
			usuarios.idusuarios,
			servicios.titulo,
			servicios.descripcion,
			servicios.idservicio AS idservicio_0,
			servicios.estatus AS estatus_0
			FROM
			pagos
			JOIN usuarios
			ON pagos.idusuarios = usuarios.idusuarios 
			JOIN servicios
			ON pagos.idservicio = servicios.idservicio	
			WHERE 1=1 $sqlconcan $sqalumnoconcan $sqlfecha

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
		
	
 


$filename = "rpt_Ventas_general-".".xls";
header("Content-Type: application/vnd.ms-excel charset=iso-8859-1");
header('Content-Disposition: attachment; filename="'.$filename.'"');


?>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 
 <style>
 	.wrap2 { 
 
  height:50px;
  overflow: auto;
  width:100px;
}
 </style>

 		<table class="table vertabla" border="1" style="">
 			<thead >
		  <tr bgcolor="#3B3B3B" style="color: #FFFFFF; text-align: left;">
		    <th>SERVICIO</th>
		    <th>ALUMNO</th>
		    <th>FOLIO</th>
		    <th>CONCEPTO</th>
		   
		   	<th>FECHA CREACIÓN</th>
		   	<th>FECHA PAGO</th>

		   	<th>ESTATUS</th>
		   	<th>MONTO</th>

		  </tr>
		  </thead>
		  <tbody>
		 	<?php 
		 	for ($i=0; $i <count($array); $i++) { 
		 		$total_gral=$total_gral+$array[$i]->monto;;
		 			?>
		 			 <tr>
				     <td><?php echo $array[$i]->titulo; ?></td>
				     <td><?php echo $array[$i]->nombre.' '.$array[$i]->paterno.' '.$array[$i]->materno; ?></td>
					 <td><?php echo $array[$i]->folio; ?></td>

				     <td><?php echo $array[$i]->concepto; ?></td>

				     <td><?php echo date('d-m-Y H:i:s',strtotime($array[$i]->fechacreacion)); ?></td>
				     <td><?php echo date('d-m-Y H:i:s',strtotime($array[$i]->fechaevento)); ?></td>

				     <td><?php echo $estatuspago[$array[$i]->estatus]; ?></td>
				  	 <td>$<?php echo $array[$i]->monto; ?></td>

				  	</tr>
		 	<?php	
		 	}

		 	 ?>
		 	 <tr>
				<td colspan="7" style="text-align: right; font-weight: bold">TOTAL</td>
				<td style="text-align: right; font-weight: bold">$ 
					<?php echo number_format($total_gral,2); ?>
				</td>
					
			</tr>
			 </tbody>

		</table>

<?php 




 ?>

  