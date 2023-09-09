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

require_once("class.ReporteCoachComision.php");



//Se crean los objetos de clase
$db = new MySQL();
$reporte = new Reportes();
$reportecoach=new ReporteCoachComision();
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
$reportecoach->db=$db;
$estatuspago=array('pendiente','proceso','aceptado','rechazado','reembolso','sin reembolso');
$estatusaceptado=array('NO ACEPTADO','ACEPTADO');
$estatusapagado=array('NO PAGADO','PAGADO','PENDIENTE POR VALIDAR');
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
	$sqlfechapago="";
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
			//$fechainicio=$fechainicio.' 00:00:00';
		}
		}
	}

	if (isset($_GET['fechafin'])) {
		if ($_GET['fechafin']!='') {
		$fechafin=$_GET['fechafin'];
		if (isset($_GET['horafin'])) {
			//$fechafin=$fechafin.' 23:59:59';
			}
		}
	}

	if ($fechainicio!='' && $fechafin!='') {
		$sqlfecha=" AND  fechamin>= '$fechainicio' AND fechamin <='$fechafin'";
	}


	if (isset($_GET['fechainiciopago'])) {

		if ($_GET['fechainiciopago']!='') {
		
			$fechainiciopago=$_GET['fechainiciopago'];
		
		}
	}

	if (isset($_GET['fechafinpago'])) {
		if ($_GET['fechafinpago']!='') {
		$fechafinpago=$_GET['fechafinpago'];
				
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

	



	$sql="
		SELECT *,
	SUM( cantidadalumnos ) AS sumaalumnos,
	SUM( cantidadhorarios ) AS sumahorarios 
		FROM
		(
	SELECT *FROM (SELECT
		servicios.titulo,
		usuarios.nombre,
		usuarios.paterno,
		usuarios.materno,
		usuarios.idusuarios,
		servicios.idservicio,

		( SELECT MIN( fecha ) FROM horariosservicio WHERE horariosservicio.idservicio = servicios.idservicio ) AS fechamin,
		( SELECT MAX( fecha ) FROM horariosservicio WHERE horariosservicio.idservicio = servicios.idservicio ) AS fechamax,
		( SELECT COUNT(*) FROM horariosservicio WHERE horariosservicio.idservicio = servicios.idservicio ) AS cantidadhorarios,
		(
		SELECT
			count(*) 
		FROM
			usuarios_servicios AS ualumnos
			INNER JOIN usuarios ON usuarios.idusuarios = ualumnos.idusuarios 
		WHERE
			usuarios.tipo = 3 
			AND ualumnos.idservicio = servicios.idservicio 
			AND ualumnos.aceptarterminos = 1 
			AND ualumnos.cancelacion = 0 
		) AS cantidadalumnos 
	FROM
		usuarios
		JOIN usuarios_servicios ON usuarios.idusuarios = usuarios_servicios.idusuarios
		JOIN servicios ON servicios.idservicio = usuarios_servicios.idservicio 
	WHERE
		usuarios.tipo = 5 
		AND usuarios_servicios.cancelacion = 0 ) AS t WHERE 1=1 
		$sqlfecha



		) AS tabla 
		GROUP BY
		tabla.idusuarios
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

//id alumno/alumno/tutor/celular/tipo de servicio/id servicio/servicio/aceptado/pagado/monto
$filename = "Rep_admon_clases_part".".xls";
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
			  <tr bgcolor="#3B3B3B" style="color: #FFFFFF; text-align: left;">
			    <th>ID</th>
			    <th>NOMBRE COACH</th>
			    <th>TOTAL DE HORARIOS</th>
			    <th>TOTAL DE ALUMNOS</th>
			    <th>MONTO COBRADO CON BONO</th>
	 			<th>MONTO COBRADO CON OTRA FORMA</th>
			   
			 	 <th>MONTO TOTAL COBRADO POR EL CLUB</th>

			 	  <th>MONTO TOTAL AUN NO COBRADO PERO QUE SI ACEPTARON EL SERVICIO</th>

			 	 <th>COMISIÓN TOTAL GENERADA DEL COACH</th>

			  </tr>
		  </thead>
		  <tbody>
		  	
		 	<?php 

		 	$totalHorarios = 0;
			$totalAlumnos = 0;
			$totalMontoBono = 0;
			$totalMontoOtraForma = 0;
			$totalMontoCobradoClub = 0;
			$totalComisionCoach = 0;

		  		for ($i=0; $i <count($array) ; $i++) {
		  			

					$idusuariocoach=$array[$i]->idusuarios;
					$reportecoach->idusuario=$idusuariocoach;
				    $obtenerservicios=	$reportecoach->ObtenerServiciosCoach($sqlfechapago,$sqlfechas);

				

		  		 ?>
		  	<tr>
		  		<td id=""><?php echo $array[$i]->idusuarios; ?> </td>	
				<td id=""><?php echo $array[$i]->nombre.' '.$array[$i]->paterno.' '.$array[$i]->materno; ?> </td>	
				<td id="">
					<?php echo $obtenerservicios['totalcantidaddehorarios']; ?> 
				</td>	
				<td id=""> 
					<?php echo $obtenerservicios['totalcantidadalumnos']; ?>
					
				</td>	


				<td id="">


					$<?php echo number_format($obtenerservicios['totalconmonedero'],2,'.',','); ?>

				 </td>	
				
				<td id="">$<?php echo number_format($obtenerservicios['totalconotropago'],2,'.',','); ?> </td>

				<td id="">$<?php echo number_format($obtenerservicios['totalmontocobradoclub'],2,'.',',');?> </td>

				<td id="">$<?php echo number_format($obtenerservicios['totalmontonocobrado'],2,'.',',');?> </td>

					<td id="">$<?php echo number_format($obtenerservicios['totalcomision'],2,'.',',');?> 
				    </td>		

		  	</tr>
		  	<?php	
	$totalHorarios += $obtenerservicios['totalcantidaddehorarios'];
    $totalAlumnos += $obtenerservicios['totalcantidadalumnos'];
    $totalMontoBono += $obtenerservicios['totalconmonedero'];
    $totalMontoOtraForma += $obtenerservicios['totalconotropago'];
    $totalMontoCobradoClub += $obtenerservicios['totalmontocobradoclub'];
    $totalComisionCoach += $obtenerservicios['totalcomision'];

    $totalmontoNoCobrado+=$obtenerservicios['totalmontonocobrado'];

		  }


		 


		 	 if ($pantalla==0) { ?>

	<tr>
    <td colspan="2">Totales:</td>
    <td><?php echo $totalHorarios; ?></td>
    <td><?php echo $totalAlumnos; ?></td>
    <td>$<?php echo number_format($totalMontoBono, 2, '.', ','); ?></td>
    <td>$<?php echo number_format($totalMontoOtraForma, 2, '.', ','); ?></td>
    <td>$<?php echo number_format($totalMontoCobradoClub, 2, '.', ','); ?></td>

    <td>$<?php echo number_format($totalmontoNoCobrado, 2, '.', ','); ?>
    	
    </td>
    <td>$<?php echo number_format($totalComisionCoach, 2, '.', ','); ?></td>
</tr>

<?php } ?>


		 	
		  </tbody>

		</table>




<?php 






 ?>
