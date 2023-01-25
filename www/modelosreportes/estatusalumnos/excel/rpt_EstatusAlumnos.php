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
		$sqlfecha=" AND  usuarios_servicios.fechacreacion>= '$fechainicio' AND usuarios_servicios.fechacreacion <='$fechafin'";
	}


	$sql="
			SELECT *FROM usuarios_servicios
			INNER JOIN servicios ON usuarios_servicios.idservicio=servicios.idservicio
			INNER JOIN usuarios ON usuarios_servicios.idusuarios=usuarios.idusuarios
			WHERE 1=1 $sqlfecha


		";

		
		$resp=$db->consulta($sql);
		$cont = $db->num_rows($resp);


		$array=array();
		$contador=0;
		if ($cont>0) {

			while ($objeto=$db->fetch_object($resp)) {

				$servicios->idservicio=$objeto->idservicio;
				$obtenerfechas=$servicios->ObtenerPeriodosFechaHoras();

				$fechainicio=$obtenerfechas[0]->fecha;
				$fechafin=$obtenerfechas[1]->fecha;
				$fechaactual=date('Y-m-d');
				if ($fechainicio>=$fechaactual && $fechafin<=$fechaactual) {
					

					$array[$contador]=$objeto;
					$contador++;
				}

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
		    <th style="width: 20%;">FECHA Y HORA DE PAGO</th>
		    <th style="width: 20%;">ID CLIENTE</th>
		    <th style="width: 20%;">NOMBRE DEL CLIENTE</th>
		    <th style="width: 20%;">CANTIDAD</th>
		    <th style="width: 20%;">ID PRODUCTO</th>
		    <th style="width: 20%;">NOMBRE DEL PRODUCTO</th>
		   	<th style="width: 20%;">PRECIO UNITARIO</th>

		   	<th style="width: 20%;">SUBTOTAL</th>
		   	<th style="width: 20%;">IVA</th>

		   	<th style="width: 20%;">DESCUENTO</th>
		   	<th style="width: 20%;">TOTAL</th>
			<th style="width: 20%;">TIPO DE PAGO</th>
		   	<th style="width: 20%;">CUENTA DE PAGO</th>

		  </tr>
		  </thead>
		  <tbody>

		  	<?php for ($i=0; $i <count($array) ; $i++) { 
		  		
		  			$idservicio=$array[$i]->idservicio;
		  			$idusuarios=$array[$i]->idusuarios;




		  	} ?>
		  		


		  </tbody>
		</table>	

