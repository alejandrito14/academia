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
		$sqlfecha=" AND  usuarios_membresia.fecha>= '$fechainicio' AND usuarios_membresia.fecha <='$fechafin'";
	}


	$sql="
			SELECT
			usuarios.nombre,
			usuarios.paterno,
			usuarios.materno,
			usuarios.celular,
			usuarios.usuario,
			usuarios.idusuarios,
			usuarios_membresia.estatus,
			usuarios_membresia.fechaexpiracion,
			usuarios_membresia.fecha,
			usuarios_membresia.pagado,
			membresia.titulo,
			usuarios_membresia.idpago			FROM
			usuarios_membresia

			JOIN usuarios
			ON usuarios_membresia.idusuarios = usuarios.idusuarios 
			JOIN membresia
			ON usuarios_membresia.idmembresia=membresia.idmembresia

			WHERE 1=1   $sqlconcan $sqalumnoconcan $sqlfecha 
			
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


$filename = "Reporte2".".xls";
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
		    <th>ALUMNO</th>
		   	<th>MEMBRESÍA</th>
		   	<th>PAGADO</th>
		   	<th>MÉTODO PAGO</th>
		   	<th>FECHA DE PAGO</th>
		   	<th>PERIODO</th>
		
		  </tr>
		  </thead>
		  <tbody>
		 	<?php 
		 	for ($k=0; $k <count($array); $k++) { 
		 		$idusuarios=$array[$k]->idusuarios;

     		$nombre=$array[$k]->nombre.' '.$array[$k]->paterno.' '.$array[$k]->materno;
		 		$titulomembresia=$array[$k]->titulo;
		 		$pagado=$array[$k]->pagado;
		 		$tipopago="";
		 		$fechapago="";
		 		$vigencia="";
		 		$fechaexpiracion="";
		 		if ($array[$k]->fechaexpiracion!='') {
		 			$fechaexpiracion=date('d-m-Y',strtotime($array[$k]->fechaexpiracion));
		 		}
		 		

		 		//if ($idusuarios==308) {
		 			# code...
		 		
		 		if ($pagado==1 && $array[$k]->idpago>0) {

		 			//echo $array[$k]->idpago;
		 			$pagos->idpago=$array[$k]->idpago;
		 			$buscarpagonota=$pagos->ObtenerDatosNotaPago();
		 			//var_dump($buscarpagonota);die();

		 			if (count($buscarpagonota)>0) {
		 				$tipopago=$buscarpagonota[0]->tipopago;
		 			$fechapago=date('d-m-Y H:i:s',strtotime($buscarpagonota[0]->fechareporte));
		 			}
		 			
		 			
		 		}

		 	//}

		 		?>


		 		<tr>
		 			<td><?php echo $idusuarios; ?></td>

		 			<td><?php echo $nombre; ?></td>
		 			<td><?php echo $titulomembresia; ?></td>
		 			<td>
		 				<?php echo $pagado==1?'Pagado':'No pagado'; ?>

		 			</td>
		 			<td><?php echo $tipopago; ?></td>
		 			<td><?php echo $fechapago; ?></td>
		 			<td><?php echo $fechaexpiracion; ?></td>
		 		</tr>


		 				
		 		<?php		}

		 	?>

		 </tbody>
		</table>

