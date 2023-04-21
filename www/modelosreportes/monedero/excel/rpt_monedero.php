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
$estatuspago=array('pendiente','proceso','aceptado','rechazado','reembolso','sin reembolso');

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
		$sqlconcan=" AND servicios.idservicio=".$idservicio."";
	}

	$arraytipo=array('ABONO','CARGO');
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
		$sqlfecha=" AND  monedero.fecha>= '$fechainicio' AND monedero.fecha <='$fechafin'";
	}


	$sql="
			SELECT
	monedero.fecha,
	monedero.monto,
	monedero.saldo_ant,
	monedero.saldo_act,
	monedero.concepto,
	usuarios.nombre,
	usuarios.paterno,
	usuarios.materno,
	monedero.tipo,
	monedero.idnota,
	usuarios.idusuarios,
	usuarios.celular
FROM
	monedero
	INNER JOIN usuarios ON monedero.idusuarios = usuarios.idusuarios 

	WHERE 1=1  $sqlfecha
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


$filename = "Reporte8".".xls";
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
		    <th style="width: 10%;">ID</th>
		    <th style="width: 20%;">ALUMNO</th>
		    <th style="width: 20%;">CELULAR</th>
		    <th style="width: 20%;">SALDO ANTERIOR</th>
		    <th style="width: 20%;">SALDO ACTUAL</th>
		   	<th style="width: 20%;">MONTO</th>
		   	<th style="width: 10%;">TIPO</th>

		   	<th style="width: 40%;">FECHA</th>
		  </tr>
		  </thead>
		  <tbody>
		 	<?php 
		 	for ($k=0; $k <count($array); $k++) { 
		 	  	$idusuarios=$array[$k]->idusuarios;
					 	
		 			?>


		 			<?php 


		 			 ?>
		 			 <tr>
				     <td><?php echo $array[$k]->idusuarios; ?></td>
				     <td><?php echo $array[$k]->nombre.' '.$array[$k]->paterno.' '.$array[$k]->materno; ?></td>

 				   	<td><?php echo  $array[$k]->celular; ?></td>
			 <td>$<?php echo $array[$k]->saldo_ant; ?></td>
				         <td>$<?php echo $array[$k]->saldo_act; ?></td>
				     
				      <td>$<?php echo $array[$k]->monto; ?></td>
				      
				      
					 				<td><?php echo $arraytipo[$array[$k]->tipo]; ?></td>
				      <td><?php echo date('d-m-Y H:i:s',strtotime($array[$k]->fecha)); ?></td>
				  	


				  	 
				  	</tr> 
		 	<?php	

		 		
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
