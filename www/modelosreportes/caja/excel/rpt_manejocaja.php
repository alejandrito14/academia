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


require_once ("../../../clases/dompdf/autoload.inc.php");
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
$pagos=new Pagos();
$pagos->db=$db;
$usuarios=new Usuarios();
$usuarios->db=$db;
$fechas=new Fechas();
$nota=new Notapago();
$nota->db=$db;
$estatuspago=array('pendiente','proceso','aceptado','rechazado','reembolso','sin reembolso');
$estatusaceptado=array('NO ACEPTADO','ACEPTADO');
$estatusapagado=array('NO PAGADO','PAGADO','PENDIENTE POR VALIDAR');
//Recibo parametros del filtro
	$idservicio=$_GET['idservicio'];
	$pantalla=$_GET['pantalla'];

	$idmanejocaja=$_GET['idmanejocaja'];
	$sqlfechapago="";


	$sqlmanejocaja="SELECT manejocaja.*,CONCAT(usuarios.nombre,' ',usuarios.paterno,' ',usuarios.materno) as usuario  FROM manejocaja
	left join usuarios on manejocaja.idusuario=usuarios.idusuarios
	 WHERE idmanejocaja='$idmanejocaja'";

		$resp1=$db->consulta($sqlmanejocaja);
		$cont1 = $db->num_rows($resp1);


		$arraymanejo=array();
		$contador1=0;
		if ($cont1>0) {

			while ($objeto1=$db->fetch_object($resp1)) {

				$arraymanejo[$contador1]=$objeto1;
				$contador1++;
			} 
		}
		


	$sql="
		SELECT  SUM(total) as monto,tipopago FROM (SELECT
			notapago.total,
			notapago.subtotal,
			notapago.montomonedero,
			notapago.estatus,
			notapago.tipopago,
			notapago.idtipopago
			FROM
			notapago
			JOIN manejocajanota
			ON notapago.idnotapago = manejocajanota.idnotapago
			WHERE idmanejocaja='$idmanejocaja'
			) as tabla GROUP BY tipopago 
			UNION 

			SELECT  SUM(montomonedero) as monto,'Monedero' FROM (SELECT
			notapago.total,
			notapago.subtotal,
			notapago.montomonedero,
			notapago.estatus,
			notapago.tipopago,
			notapago.idtipopago
			FROM
			notapago
			JOIN manejocajanota
			ON notapago.idnotapago = manejocajanota.idnotapago WHERE idmanejocaja='$idmanejocaja') as tabla 
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
$filename = "Rep_manejocaja_".$idmanejocaja.".xls";
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

 		<table class="table  table table-striped table-bordered vertabla"> 
 			<tr>
				<td style="width: 50%">ID CIERRE</td>
            	<td style="width: 50%;"><?php echo $arraymanejo[0]->idmanejocaja; ?></td>
        	</tr>

        	<tr>
				<td style="width: 50%">USUARIO</td>
            	<td style="width: 50%;"><?php echo $arraymanejo[0]->usuario; ?></td>
        	</tr>  
			<tr>
				<td style="width: 50%">FECHA APERTURA</td>
            	<td style="width: 50%;"><?php echo date('d/m/Y H:i:s',strtotime($arraymanejo[0]->fechainicio)); ?></td>
        	</tr> 

        	<tr>
         	   <td style="width: 50%">MONTO INICIAL:</td>
				<td style="width: 50%;">$<?php echo number_format($arraymanejo[0]->montoinicial,2,'.',','); ?></td>
        	</tr> 
			<tr>
         	   <td style="width: 50%">FECHA CIERRE:</td>
				<td style="width: 50%;"><?php echo date('d/m/Y H:i:s',strtotime($arraymanejo[0]->fechafin)); ?></td>
        	</tr>
	       


 		</table>

 		<table class="table  table table-striped table-bordered  vertabla" border="1" style="">
 			<thead>
			  <tr bgcolor="#3B3B3B" style="color: #FFFFFF; text-align: left;">
			    <th style="width: 50%;">TIPO DE PAGO</th>
			    <th style="width: 50%;">MONTO</th>
			   
			  </tr>
		  </thead>
		  <tbody>
		  	
		 	<?php 

		 
		  for ($i=0; $i <count($array) ; $i++) {
		  			
		  		if ($array[$i]->monto>0) {
		  				# code...
		  			
		  		 ?>
		  		<tr>
		  			<td id=""><?php echo $array[$i]->tipopago; ?> </td>	
					<td id="">$<?php echo number_format($array[$i]->monto,2,'.',',');?> </td>	
						
		  		</tr>
		

		  <?php 
				} 
		  	}
		  ?>
		 	
		  </tbody>

		</table>

<?php 
use Dompdf\Dompdf;
if ($pantalla==2){


$dompdf = new DOMPDF();
$dompdf->load_html(ob_get_clean());
$dompdf->render();
$pdf = $dompdf->output();
$filename = "Rep_manejocaja_".$idmanejocaja.".xls";
file_put_contents($filename, $pdf);
$dompdf->stream($filename);

	} 
?>
