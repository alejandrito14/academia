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
require_once("../../../clases/class.Categorias.php");
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
$categorias =new Categorias();
$categorias->db=$db;
$nota=new Notapago();
$nota->db=$db;
$estatuspago=array('pendiente','proceso','aceptado','rechazado','reembolso','sin reembolso');
$totalmontoporcobrar=0;
$totalmontocobrado=0;
$totalmontodescuento=0;
$totalmontopendiente=0;
$sumaservicios=0;
//Recibo parametros del filtro
	$idservicio=$_GET['idservicio'];
	$pantalla=$_GET['pantalla'];

	$alumno=$_GET['alumno'];
	$v_categoriapadre="";
	$v_subcategorias="";
	$v_subsubcategorias="";
	if ($_GET['v_categoriapadre']!='') {
		$v_categoriapadre=$_GET['v_categoriapadre'];
	}
	
	if ($_GET['v_subcategorias']!='') {
		$v_subcategorias=$_GET['v_subcategorias'];
	}
	

	if ($_GET['v_subsubcategorias']!='') {
		$v_subsubcategorias=$_GET['v_subsubcategorias'];
	}
	$idcoach=$_GET['v_coaches'];
	$v_meses=$_GET['v_meses'];
	$v_anios=$_GET['v_anios'];

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
		$sqlfechasservicio=" AND  fechainicialservicio>= '$fechainicio' AND fechafinalservicio <='$fechafin'";
	}


/*if ($idcategorias!='') {
*/
			//$sqlcate=" AND idtiposervicioconfiguracion IN($idcategorias)";



		/*$obtenercategoriasdepende=$categorias->ObtenerCategoriasGroupEstatusDepende($idcategorias);
 

		$categoriasid=$obtenercategoriasdepende[0]->categoriasid;*/
 
		/*if ($categoriasid==null) {
			$categoriasid=$tiposervicio;
		}*/

/*		$sqlcate=" AND idcategoriaservicio IN($categoriasid)";
	
}else{

$obtenercategoriasdepende=$categorias->ObtenerCategoriasGroupEstatusDepende($idcategorias);

}*/

if ($idcoach!='') {
	
		$sqlcoach=" AND usuarios_servicios.idusuarios IN($idcoach)";
}


	
	



	$sql="
			 SELECT
tiposervicioconfiguracion.nombre,
tiposervicioconfiguracion.idtiposervicioconfiguracion,
categorias.idcategorias,

categorias.titulo,
categoriasservicio.idcategoriasservicio,
categoriasservicio.nombrecategoria

FROM
categorias
JOIN tiposervicioconfiguracion
ON categorias.idtiposervicioconfiguracion = tiposervicioconfiguracion.idtiposervicioconfiguracion 
JOIN categoriasservicio
ON categorias.idcategorias = categoriasservicio.idcategorias WHERE 1=1 ";

	if($v_categoriapadre!=''){

	$sql.=" AND tiposervicioconfiguracion.idtiposervicioconfiguracion IN($v_categoriapadre)";
	}

	if($v_subcategorias!=''){

	$sql.=" AND categorias.idcategorias IN($v_subcategorias)";
	}


	if ($v_subsubcategorias!='') {

		$sql.=" AND idcategoriasservicio IN($v_subsubcategorias)";
	}

		$resp=$db->consulta($sql);
		$cont = $db->num_rows($resp);


		$array=array();
		$contador=0;
		if ($cont>0) {

			while ($objeto=$db->fetch_object($resp)) {
				$objeto->nodeservicios=0;
				$objeto->montoporcobrar=0;
				$objeto->montocobrado=0;
				$objeto->montopendiente=0;
				$objeto->descuentos=0;
				$array[$contador]=$objeto;
				$contador++;
			} 
		}
		
	
 
if($pantalla==0) {
	# code...


$filename = "rpt_Ventasclasesacademias-".".xls";
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
		  	 <th>FECHA INICIAL</th>
		    <th>FECHA FINAL</th>
		    <th>ID</th>
		    <th>SUB-SUBCATEGORIA</th>
		    <th>No DE SERVICIOS</th>
		    <th>MONTO POR COBRAR</th>
		    <th>MONTO COBRADO</th>
		 		    <th>MONTO DESCUENTO</th>

		    <th>MONTO PENDIENTE</th>

	
		  </tr>
		  </thead>
		  <tbody>
		 	<?php 

		 
		 	for ($k=0; $k <count($array); $k++) { 
		 	 	$idcategoriasservicio=$array[$k]->idcategoriasservicio;
		 			
						/*$lo->idusuarios=$idusuarios;
						$usuarios->id_usuario=$idusuarios;
   		 $datoscoach=$usuarios->ObtenerUsuarioDatos();

						$asignacion->idusuario=$idusuarios;*/
						$obtenerservicios=$asignacion->obtenerServiciosAsignadosCoach6($sqlcate,$sqlfechasservicio,$idcategoriasservicio,$v_meses,$v_anios);
					 $pagosdelcoach=array();
	
	     $textoestatus=array('Pendiente','Aceptado','Cancelado');

	$array[$k]->nodeservicios=count($obtenerservicios);

	for ($i=0; $i <count($obtenerservicios); $i++) { 
			$idservicio=$obtenerservicios[$i]->idservicio;
			$idusuarios_servicios=$obtenerservicios[$i]->idusuarios_servicios;
			$asignacion->idusuarios_servicios=$idusuarios_servicios;
			$tipomontopago=$asignacion->ObtenertipoMontopago();
			$pagos->idservicio=$idservicio;
			$servicios->idservicio=$idservicio;
			$asignacion->idservicio=$idservicio;
			$asignacion->idusuario=0;
			$obtenerAlumnosServicio=$asignacion->obtenerUsuariosServiciosAsignadosAlumnossincancelar();
				if (count($obtenerAlumnosServicio)>0) {
					// code...
				
		for ($h=0; $h <count($obtenerAlumnosServicio) ; $h++) { 
				# code...
				$idusuariosalumno=$obtenerAlumnosServicio[$h]->idusuarios;
			$pagos->idusuarios=$obtenerAlumnosServicio[$h]->idusuarios;
		
			
		//if (count($tipomontopago)>0) {
			


								$modalidad=$obtenerservicios[$i]->modalidad;
								$costo=$obtenerservicios[$i]->precio;
								if ($modalidad==1) {
									
									$montoapagar=$costo;

								}

							

							if ($modalidad==2) {
								//grupo
								$obtenerparticipantes=$servicios->ObtenerParticipantes(3);
							
								$cantidadparticipantes=count($obtenerparticipantes);
								$costo=$obtenerservicios[$i]->precio;

								$obtenerhorarios=$servicios->ObtenerHorariosSemana();
								
								$monto=$costo*count($obtenerhorarios);

								$montoapagar=$monto/$cantidadparticipantes;

							}
							$montopago=$montoapagar;
							if ($idcategoriasservicio==26) {
								// code...
							
							//print_r('idservicio'.$idservicio.'--'.$montopago);
							
						}
							$array[$k]->montoporcobrar=$montopago+$array[$k]->montoporcobrar;


    			$pagos->idservicio=$idservicio;

			   	$pagos->fechainicial=$fechainicial;
			   	$pagos->fechafinal=$fechafinal;
							$obtenerpago=$pagos->ChecarPagosServicio($sqlfecha);



			if (count($obtenerpago)>0) {
				# code...

		 			$fechapago=date('d-m-Y H:i:s',strtotime($obtenernotapago[0]->fecha));
		 			$fechareporte=date('d-m-Y H:i:s',strtotime($obtenernotapago[0]->fechareporte));
		 			$metodopago=$obtenernotapago[0]->tipopago;
		 			$folio=$obtenernotapago[0]->folio;
		 			
		 				$nota->idpago=$obtenerpago[0]->idpago;
		 		$pagos->idpago=$obtenerpago[0]->idpago;


		 		$obtenernotapago=$nota->ObtenerNotaPagoporPago();
		
			 		if ($obtenernotapago[0]->estatus==1) {
			 			
			 			$pagado=1;
			 		
			 			$idpago=$obtenerpago[0]->idpago;
			 			$fechainicial=$obtenerpago[0]->fechainicial;
				  	$fechafinal=$obtenerpago[0]->fechafinal;
			 			$montopago=$obtenerpago[0]->monto;
			 			$totalpagado=$totalpagado+$montopago;
			 			$pagos->idnotapago=$obtenernotapago[0]->idnotapago;


			 				$descuento=$pagos->ObtenerPagoDescuento2();
	
			 			$descuentomembresia=$pagos->ObtenerPagoDescuentoMembresia();
			 		$montoadescontarpago=$descuento[0]->montodescontar;
			 		$tdescuentomembresia=$descuentomembresia[0]->montodescontar;

			 					
			 					$descuentos=$montoadescontarpago+$tdescuentomembresia;
			 				/*	echo '<br>';
			 					print_r($descuentos);
			 					echo '<br>';*/
			 					$montopagomenosdescuento=$montopago-$descuentos;

			 					

			 					$array[$k]->montocobrado=$array[$k]->montocobrado+$montopagomenosdescuento;

			 					$array[$k]->descuentos=$array[$k]->descuentos+$descuentos;

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

							

						if ($costo>0) {

							$obtenerperiodop=$servicios->ObtenerPeriodosPagos();

							$numeroperiodos=count($obtenerperiodop);
							//$montoapagar=$montoapagar/$numeroperiodos;


							

								$idusuarios='';
								$idmembresia=0;
								$idservicio=$idservicio;
								$tipo=1;
								$monto=$montoapagar;
								$estatus=0;
								$dividido=$modalidad;
								$fechainicial=$obtenerperiodos[$a]->fechainicial;
								$fechafinal=$obtenerperiodos[$a]->fechafinal;
								$concepto=$obtenerservicio[$i]->titulo;
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

				           
												


												 		$array[$k]->montopendiente=$montopago+$array[$k]->montopendiente;
									
								  						// array_push($pagosdelcoach,$objeto);

																	}

													
															}


															

											//	}
									//}
								//}
						}
					}else{

							$servicios->idservicio=$idservicio;
								$obtenerhorarios=$servicios->ObtenerHorariosSemana();
						
								$montoapagar=$precio*count($obtenerhorarios);

								$array[$k]->montoporcobrar=$montoapagar+$array[$k]->montoporcobrar;

								$array[$k]->montopendiente=$montoapagar+$array[$k]->montopendiente;
					}

		}
	}


	

 	

		//var_dump($pagosdelcoach);
	//var_dump($array);die();
		 			?>


		 			<?php 
		 			for ($l=0; $l <count($array) ; $l++) { 
		 				# code...

		 			 ?>
		 			 <tr>
		 			 	<td><?php echo $fechainicio; ?></td>
		 			 	<td><?php echo $fechafin; ?></td>
				     <td><?php echo $array[$l]->idcategoriasservicio; ?></td>
				     <td><?php echo $array[$l]->nombrecategoria; ?></td>

				     <?php //$alumno=$pagosdelcoach[$l]['corresponde'][0]->nombre.' '.$pagosdelcoach[$l]['corresponde'][0]->paterno.' '.$pagosdelcoach[$l]['corresponde'][0]->materno;
				     	//$celular=$pagosdelcoach[$l]['corresponde'][0]->celular;


				      ?>
				    

 								<td><?php echo $array[$l]->nodeservicios;

 								$sumaservicios=$sumaservicios+$array[$l]->nodeservicios;

 								 ?></td>
				     

				     <td>$<?php echo number_format($array[$l]->montoporcobrar,2,'.',','); 
				      $totalmontoporcobrar=$totalmontoporcobrar+$array[$l]->montoporcobrar;

				    ?></td>
				     

				      <td>$<?php echo number_format($array[$l]->montocobrado,2,'.',','); 

				       $totalmontocobrado=$totalmontocobrado+$array[$l]->montocobrado;
				     ?></td>
					
 						<td>$<?php echo number_format($array[$l]->descuentos,2,'.',','); 
 							$totalmontodescuento=$totalmontodescuento+$array[$l]->descuentos;
 					?></td>
				    
				     

				  	 

				  	  <td>$<?php 
				  	  $montopendiente=$array[$l]->montopendiente;
				  	  $montop= $montopendiente<=0?'0':$montopendiente;

				  	  echo number_format($montop,2,'.',',');

				  	   $totalmontopendiente=$totalmontopendiente+$montopendiente;

				  	 ?></td>

				  	 <!-- <td>
				  	 	<?php echo $array[$l]->descuentos; ?>
				  	 </td> -->
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


			<tr>
		 			 	 <td></td>
		 			 	 <td></td>
				     <td></td>
				     <td></td>
				    	<td><?php echo $sumaservicios; ?></td>
									<td>$<?php echo number_format($totalmontoporcobrar,2,'.',','); ?></td>
									<td>$<?php echo number_format($totalmontocobrado,2,'.',',');?></td>
									<td>$<?php echo number_format($totalmontodescuento,2,'.',','); ?></td>
									<td>$<?php echo number_format($totalmontopendiente,2,'.',',');?></td>
					</tr>
			 </tbody>

		</table>

<?php 




 ?>
