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

	/*if ($fechainicio!='' && $fechafin!='') {
		$sqlfecha=" AND  pagos.fechapago>= '$fechainicio' AND pagos.fechapago <='$fechafin'";
	}*/


	$sql="
			SELECT
			usuarios.nombre,
			usuarios.paterno,
			usuarios.materno,
			usuarios.celular,
			usuarios.usuario,
			usuarios.idusuarios
			FROM
			usuarios_servicios

			JOIN usuarios
			ON usuarios_servicios.idusuarios = usuarios.idusuarios 

			WHERE 1=1 AND  usuarios.tipo=5  $sqlconcan $sqalumnoconcan 
			GROUP BY usuarios.idusuarios
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


$filename = "rpt_PagosCoachNoVigentes-".".xls";
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
		    <th>NOMBRE COACH</th>
		    <th>ID</th>
		    <th>SERVICIO</th>
		    <th>ID</th>
		    <th>ALUMNO</th>
		    <th>CELULAR</th>
		   	<th>PAGADO COACH(estatus)</th>

		   	<th>NOTA</th>
		   	<th>TIPO PAGO</th>

		   	<th>SUBTOTAL</th>
		   	<th>DESCUENTO</th>
		   	<th>DESCUENTO MEMB.</th>
		   	<th>TOTAL</th>
			<th>COMISIÓN COACH (monto/porcentaje)</th>
		   	<th>MONTO COMISIÓN COACH</th>

		  </tr>
		  </thead>
		  <tbody>
		 	<?php 
		 	for ($k=0; $k <count($array); $k++) { 
		 		$idusuarios=$array[$k]->idusuarios;
		 				


	$lo->idusuarios=$idusuarios;
	$usuarios->id_usuario=$idusuarios;
    $datoscoach=$usuarios->ObtenerUsuarioDatos();
	$asignacion->idusuario=$idusuarios;
	$obtenerservicios=$asignacion->ObtenerNoVigentes();
	$pagosdelcoach=array();




	$textoestatus=array('Pendiente','Aceptado','Cancelado');
	
	for ($i=0; $i <count($obtenerservicios); $i++) { 
			$idservicio=$obtenerservicios[$i]->idservicio;
			$idusuarios_servicios=$obtenerservicios[$i]->idusuarios_servicios;
			$asignacion->idusuarios_servicios=$idusuarios_servicios;
			$tipomontopago=$asignacion->ObtenertipoMontopago();

			/*if ($obtenerservicios[$i]->idusuarios_servicios==785) {
				//var_dump($tipomontopago);die();
			}*/
			
			$pagos->idservicio=$idservicio;
			$servicios->idservicio=$idservicio;
			$asignacion->idservicio=$idservicio;
			$asignacion->idusuario=0;
			$obtenerAlumnosServicio=$asignacion->obtenerUsuariosServiciosAsignadosAlumnos();//obtiene los alumnos que han aceptado el servicio, alumno que no halla aceptado no va aparecer

			/*if ($idservicio==269) {
				var_dump($obtenerAlumnosServicio);die();
			}*/

		for ($h=0; $h <count($obtenerAlumnosServicio) ; $h++) { 
				# code...
				$idusuariosalumno=$obtenerAlumnosServicio[$h]->idusuarios;
			$pagos->idusuarios=$obtenerAlumnosServicio[$h]->idusuarios;
		
			
		if (count($tipomontopago)>0) {
				# code...
			if($tipomontopago[0]->monto>0) {
					# code...
				
					$obtenerperiodos=$servicios->ObtenerPeriodosPagos();
					

						for ($a=0; $a < count($obtenerperiodos); $a++) { 
							# code...

							$fechainicial=$obtenerperiodos[$a]->fechainicial;
			   	$fechafinal=$obtenerperiodos[$a]->fechafinal;

			   	$pagos->fechainicial=$fechainicial;
			   	$pagos->fechafinal=$fechafinal;
							$obtenerpagos=$pagos->ObtenerPagosServicio($sqlfecha);

			if (count($obtenerpagos)>0) {
				# code...

			for ($j=0;$j<count($obtenerpagos);$j++) { 
				# code...
					$idpago=$obtenerpagos[$j]->idpago;
					$lo->fechainicial=$fechainicial;
					$lo->fechafinal=$fechafinal;
					$existe=$lo->ObtenerPagoCoach($idpago,$idservicio);
					$estatus=0;
					if (count($existe)==0) {
						$estatus=1;
					}
						# code...
					$pagos->idpago=$idpago;
				    $buscarpago=$pagos->ObtenerPagoDescuento();

				    $montopago=$buscarpago[0]->montocondescuento;

                    $idservicios=$buscarpago[0]->idservicio;
                    $monto=$asignacion->CalcularMontoPago($tipomontopago[0]->tipopago,$tipomontopago[0]->monto,$montopago);


                    if ($montopago>0) {
                    	# code...
                    
                    $idpago=$buscarpago[0]->idpago;
	                $estatus=0;
	                $pagado=0;
	                $folio="";
	                $concepto=$buscarpago[0]->concepto;
	               // $lo->idpago=$pagos->idpago;
	                $text=$textoestatus[$estatus];
	                $usuarios->id_usuario=$buscarpago[0]->idusuarios;
	                $corresponde=$usuarios->ObtenerUsuarioDatos();

	                $folio=$pagos->ObtenerFolio();
	                
	                $objeto=array(
	                	'idpago'=>$buscarpago[0]->idpago,
	                	'idusuarios'=>$idusuarios,
	                	'idservicio'=>$idservicio,
	                	'concepto'=>$concepto,
	                	'textoestatus'=>$text,
	                	'estatus'=>$estatus,
	                	'pagado'=>0,
	                	'folio'=>'',
	                	'corresponde'=>$corresponde,
	                	'monto'=>$monto	,
	                	'tipopago'=>$tipomontopago[0]->tipopago,
	                	'montopagocoach'=>$tipomontopago[0]->monto,

	                	'montopago'=>$montopago,
	                	'montosindescuento'=>$buscarpago[0]->monto,
	                	'descuento'=>$buscarpago[0]->descuento!=0?$buscarpago[0]->descuento:0,
	                	'descuentomembresia'=>$buscarpago[0]->descuentomembresia!=0?$buscarpago[0]->descuentomembresia:0,
	                	'folio'=>$folio[0]->folio,
	                	'tipopagonota'=>$folio[0]->tipopago,
	                	'fechainicial'=>$fechainicial,
	                	'fechafinal'=>$fechafinal,
	                );

	                // array_push($pagosdelcoach,$objeto);
					
							}
					

						}

					}else{

						$usuarios->id_usuario=$idusuariosalumno;
					
				 $corresponde=$usuarios->ObtenerUsuarioDatos();

			
						/*for ($o=0; $o <count($obtenerperiodos) ; $o++) { 
							# code...
								$fechainicial=$obtenerperiodos[$o]->fechainicial;
								$fechafinal=$obtenerperiodos[$o]->fechafinal;*/
								$pagos->idusuarios=$usuarios->idusuarios;
								$pagos->idservicio=$idservicio;
								$pagos->fechainicial=$fechainicial;
								$pagos->fechafinal=$fechafinal;

								$modalidad=$obtenerservicios[0]->modalidad;
								$costo=$obtenerservicios[0]->precio;
								if ($modalidad==1) {
									
									$montoapagar=$costo;

								}

							

							if ($modalidad==2) {
								//grupo
								$obtenerparticipantes=$servicios->ObtenerParticipantes(3);
							
								$cantidadparticipantes=count($obtenerparticipantes);
								$costo=$obtenerservicios[0]->precio;

								$obtenerhorarios=$servicios->ObtenerHorariosSemana();
								
								$monto=$costo*count($obtenerhorarios);

								$montoapagar=$monto/$cantidadparticipantes;

							}

						if ($costo>0) {

							$obtenerperiodop=$servicios->ObtenerPeriodosPagos();

							$numeroperiodos=count($obtenerperiodop);
							$montoapagar=$montoapagar/$numeroperiodos;


							

								$idusuarios='';
								$idmembresia=0;
								$idservicio=$idservicio;
								$tipo=1;
								$monto=$montoapagar;
								$estatus=0;
								$dividido=$modalidad;
								$fechainicial=$obtenerperiodos[$a]->fechainicial;
								$fechafinal=$obtenerperiodos[$a]->fechafinal;
								$concepto=$obtenerservicio[0]->titulo;
								//$contador=$lo->ActualizarConsecutivo();
					   		  
					   			
											$folio="";

											$fecha=$obtenerperiodos[$k]->fechafinal;
											$lo->idpago=$obtener[$i]->idpago;
											$obtener[$i]->fechaformato='';
											if ($fecha!='') {
												# code...
											
											$dianumero=explode('-',$fecha);
											$fechaformato=$dianumero[2].'/'.$fechas->mesesAnho3[$fechas->mesdelano($fecha)-1];

											}

				           
												 $objeto=array(
	                	'idpago'=>'',
	                	'idusuarios'=>$idusuarios,
	                	'idservicio'=>$idservicio,
	                	'concepto'=>$obtenerservicios[$i]->titulo,
	                	'textoestatus'=>$text,
	                	'estatus'=>0,
	                	'pagado'=>0,
	                	'folio'=>'',
	                	'corresponde'=>$corresponde,
	                	'monto'=>0	,
	                	'tipopago'=>$tipomontopago[0]->tipopago,
	                	'montopagocoach'=>$tipomontopago[0]->monto,
	                	'montopago'=>0,
	                	'montosindescuento'=>$montoapagar,
	                	'descuento'=>0,
	                	'descuentomembresia'=>0,
	                	'folio'=>'',
	                	'tipopagonota'=>'',
	                		'fechainicial'=>$fechainicial,
	                	'fechafinal'=>$fechafinal
	                );
									
								  						 array_push($pagosdelcoach,$objeto);

																	}

													
															}

															

												}
									}
								}
						}

		}


	

 	

		//var_dump($pagosdelcoach);

		 			?>


		 			<?php 
		 			for ($l=0; $l <count($pagosdelcoach) ; $l++) { 
		 				# code...

		 			 ?>
		 			 <tr>
				     <td><?php echo $array[$k]->idusuarios; ?></td>
				     <td><?php echo $array[$k]->nombre.' '.$array[$k]->paterno.' '.$array[$k]->materno; ?></td>

				     <?php $alumno=$pagosdelcoach[$l]['corresponde'][0]->nombre.' '.$pagosdelcoach[$l]['corresponde'][0]->paterno.' '.$pagosdelcoach[$l]['corresponde'][0]->materno;
				     	$celular=$pagosdelcoach[$l]['corresponde'][0]->celular;


				      ?>
				    

 					<td><?php echo $pagosdelcoach[$l]['idservicio']; ?></td>
				     

				     <td><?php echo $pagosdelcoach[$l]['concepto']; ?></td>
				     

				      <td><?php echo $pagosdelcoach[$l]['corresponde'][0]->idusuarios; ?></td>
					 <td><?php echo $alumno; ?></td>

 					<td><?php echo $celular; ?></td>

				     <td><?php echo $estatuspago[$pagosdelcoach[$l]['estatus']]; ?></td>
				  	

				     <td><?php echo $pagosdelcoach[$l]['folio']; ?></td>
				      <td><?php echo $pagosdelcoach[$l]['tipopagonota']; ?></td>

				      <td>$<?php echo $pagosdelcoach[$l]['montosindescuento']; ?></td>

				      <td>$<?php echo $pagosdelcoach[$l]['descuento']; ?></td>

				      <td>$<?php echo $pagosdelcoach[$l]['descuentomembresia']; ?></td>

				  	  <td>$<?php echo $pagosdelcoach[$l]['montopago']; ?></td>

				  	  <td><?php
				  	  $poncentaje="";
				  	  $pesos="";
				  	  if ($pagosdelcoach[$l]['tipomontopago']==0) {
				  	  	$poncentaje="%";
				  	  }else{

				  	  	$pesos="$";
				  	  }

				  	   echo $pesos.$pagosdelcoach[$l]['montopagocoach'].$poncentaje ?></td>


				  	  <td>$<?php echo number_format($pagosdelcoach[$l]['monto'], 2, '.', ',');?></td>
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
