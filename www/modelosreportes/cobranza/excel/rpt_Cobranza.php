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

	if ($v_tiposervicios!='' && $v_tiposervicios>0) {
		$sqlcategorias=" AND servicios.idcategoriaservicio IN($v_tiposervicios)";
	}




	$sql="
SELECT *FROM(SELECT
usuarios_servicios.idusuarios,
usuarios_servicios.aceptarterminos,
usuarios_servicios.fechaaceptacion,
servicios.idcategoriaservicio,
servicios.idservicio,
servicios.titulo,
servicios.precio,
servicios.modalidad,
usuarios.nombre,
usuarios.paterno,
usuarios.materno,
usuarios.celular,
categorias.titulo as nombrecategoria,
(SELECT CONCAT(u.nombre,' ',u.paterno,' ',u.materno) FROM usuariossecundarios inner JOIN usuarios as u on u.idusuarios=usuariossecundarios.idusuariostutor WHERE idusuariotutorado=usuarios_servicios.idusuarios ) as tutor,

(SELECT u.celular FROM usuariossecundarios inner JOIN usuarios as u on u.idusuarios=usuariossecundarios.idusuariostutor WHERE idusuariotutorado=usuarios_servicios.idusuarios ) as celulartutor,

(SELECT MIN(fecha) from horariosservicio WHERE horariosservicio.idservicio=usuarios_servicios.idservicio) as fechamin,
(SELECT MAX(fecha) from horariosservicio WHERE horariosservicio.idservicio=usuarios_servicios.idservicio) as fechamax


FROM
usuarios_servicios
JOIN servicios
ON usuarios_servicios.idservicio = servicios.idservicio 
LEFT JOIN categorias
ON servicios.idcategoriaservicio = categorias.idcategorias 
JOIN usuarios
ON usuarios_servicios.idusuarios = usuarios.idusuarios
WHERE
servicios.estatus IN(0,1) and categorias.avanzado=1 and usuarios.tipo=3 and usuarios_servicios.cancelacion=0 

$sqlconcan $sqalumnoconcan $sqlcategorias
GROUP BY
usuarios_servicios.idusuarios,usuarios_servicios.idservicio
ORDER BY
usuarios_servicios.idusuarios ASC) AS TABLA WHERE 1=1  $sqlfecha


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
$filename = "Reporte6".".xls";
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

		    <th>TUTOR</th>
		    <th>CELULAR</th>
		    <th>TIPO DE SERVICIO</th>

		    <th>ID</th>
		    <th>SERVICIO</th>
		    <th>FECHA INICIAL</th>
		    <th>FECHA FINAL</th>
		    <th>COACHES</th>
		   	<th>ACEPTADO</th>
		  	<th>PAGADO</th>	
		  		
		   	<th>MONTO</th>

		  
		  </tr>
		  </thead>
		  <tbody>
		 	<?php 
		 for ($k=0; $k <count($array); $k++) { 
		 		$pagosservicios=array();
		 		$nombrecategoria=$array[$k]->nombrecategoria;
		 		$nombreservicio=$array[$k]->titulo;
		 	$idservicio=$array[$k]->idservicio;
		 	$asignacion->idservicio=$array[$k]->idservicio;	
		 	$servicios->idservicio=$idservicio;
			$idusuariosalumno=$array[$k]->idusuarios;
		 	$pagos->idusuarios=$idusuariosalumno;
		 	$nombrealumno=$array[$k]->nombre.' '.$array[$k]->paterno.' '.$array[$k]->materno;
		 	$celularalumno=$array[$k]->celular;

		 	$pagos->idservicio=$idservicio;

		 	$obtenerpago=$pagos->ChecarPagosServicio();

		 	/*if ($pagos->idservicio==212 && $pagos->idusuarios==406) {


		 		var_dump($obtenerpago);die();
		 	}*/

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
		 	if (count($obtenerpago)==0) {

		 	$obtenerperiodos=$servicios->ObtenerPeriodosPagos();

		 	
		 	for ($l=0; $l <count($obtenerperiodos) ; $l++) { 
		
				$fechainicial=$obtenerperiodos[$l]->fechainicial;
				$fechafinal=$obtenerperiodos[$l]->fechafinal;
				$lo->idusuarios=$idusuariosalumno;
				$lo->idservicio=$idservicio;
				$lo->fechainicial=$fechainicial;
				$lo->fechafinal=$fechafinal;

					$modalidad=$array[$k]->modalidad;
					$costo=$array[$k]->precio;
					if ($modalidad==1) {
						
						$montoapagar=$costo;

					}

			if ($modalidad==2) {
				//grupo
				$obtenerparticipantes=$servicios->ObtenerParticipantes(3);
				
				$cantidadparticipantes=count($obtenerparticipantes);
				$costo=$array[$k]->precio;

				$obtenerhorarios=$servicios->ObtenerHorariosSemana();

				$monto=$costo*count($obtenerhorarios);

				$montoapagar=$monto/$cantidadparticipantes;



			}


			
		if ($costo>=0) {

			$obtenerperiodos=$servicios->ObtenerPeriodosPagos();

			$numeroperiodos=count($obtenerperiodos);
			$montoapagar=$montoapagar/$numeroperiodos;


			

				$idusuarios=$idusuariosalumno;
				$idmembresia=0;
				$idservicio=$idservicio;
				$tipo=1;
				$estatus=0;
				$dividido=$modalidad;
				$fechainicial=$obtenerperiodos[$l]->fechainicial;
				$fechafinal=$obtenerperiodos[$l]->fechafinal;
				$concepto=$array[$k]->titulo;
				//$contador=$lo->ActualizarConsecutivo();
	   		    $fecha = explode('-', date('d-m-Y'));
			    $anio = substr($fecha[2], 2, 4);
	   			$folio = $fecha[0].$fecha[1].$anio.$contador;
	   			
				$folio="";

				$fecha=$obtenerperiodos[$l]->fechafinal;
				$obtener[$i]->fechaformato='';
	
		}

		$coaches=$asignacion->BuscarAsignacionCoach();

		 	
		 	$aceptado=$array[$k]->aceptarterminos;
		 		/*else{

		 				$agrega=1;

		 		}*/

		 		$peridohorario=$servicios->ObtenerFechaHoras();
						$objeto=array(
								'idservicio'=>$idservicio,
								'nombreservicio'=>$nombreservicio,
								'nombrecategoria'=>$nombrecategoria,
								'idalumno'=>$idusuariosalumno,
								'alumno'=>$nombrealumno,
								'celular'=>$celularalumno,
								'aceptado'=>$aceptado,
								'pagado'=>$pagado,
								'montopago'=>$montoapagar,
								'fechapago'=>'',
								'metodopago'=>'',
								
								'fechahoramin'=>date('d-m-Y',strtotime($peridohorario[0]->fechamin)),
								'fechahoramax'=>date('d-m-Y',strtotime($peridohorario[0]->fechamax)),
								'folio'=>$folio,
								'totalpagado'=>$totalpagado,
								'coaches'=>$coaches,
								'tutor'=>$array[$k]->tutor,
								'celulartutor'=>$array[$k]->celulartutor




						);
								

						


							array_push($pagosservicios, $objeto);
						
		
			

						

		}
	}

	
 	


		 			?>


		 			<?php 

		 			//id alumno/alumno/tutor/celular/tipo de servicio/id servicio/servicio/aceptado/pagado/monto
		 			for ($l=0; $l <count($pagosservicios) ; $l++) { 
		 			
		 			 ?>
		 			 <tr>
		 				<td><?php echo $pagosservicios[$l]['idalumno']; ?></td>
						<td><?php echo $pagosservicios[$l]['alumno']; ?></td>
						<td><?php echo $pagosservicios[$l]['tutor'];?></td>

						<td><?php echo $pagosservicios[$l]['celular']==''?$pagosservicios[$l]['celulartutor']:$pagosservicios[$l]['celular'];?></td>

						<td>
				     	<?php echo $pagosservicios[$l]['nombrecategoria']; ?>
				     </td>
				  

				     <td><?php echo $pagosservicios[$l]['idservicio']; ?></td>
				     <td><?php echo $pagosservicios[$l]['nombreservicio']?>
				     	
				  

				     	<!-- <p style="padding: 0;margin: 0;">
				     		COACHES:

				     	</p> -->

				     	
				     </td>
				     <td><?php echo $pagosservicios[$l]['fechahoramin']; ?></td>
				     
				     <td><?php echo $pagosservicios[$l]['fechahoramax']; ?></td>
			
 					<td>
 						<?php 
				     	$coaches=$pagosservicios[$l]['coaches'];

				     	
				     		for ($n=0; $n < count($coaches); $n++) { 
				     			?>
				     			<p style="padding: 0;margin: 0;"><?php echo $coaches[$n]->nombre.' '.$coaches[$n]->paterno.' '.$coaches[$n]->materno;?></p>

				     		<?php
				     		}
				     	 ?>
 					</td>

				     <td><?php echo $estatusaceptado[$pagosservicios[$l]['aceptado']]; ?></td>
				  	
				  		  <td><?php echo $estatusapagado[$pagosservicios[$l]['pagado']]; ?></td>
				  		 

				  	 <td>$<?php echo number_format($pagosservicios[$l]['montopago'],2,'.', ','); ?></td>
				  
				  	
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
