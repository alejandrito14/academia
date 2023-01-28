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
		$sqlfecha=" AND  servicios.fechacreacion>= '$fechainicio' AND servicios.fechacreacion <='$fechafin'";
	}


	$sql="
			SELECT *FROM servicios
			WHERE 1=1 $sqlconcan 
			

		";

		//echo $sql;die();
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
				//if ( $fechaactual<=$fechafin) {
					

					$array[$contador]=$objeto;
					$contador++;
				//}

			} 
		}
		
		
 
if($pantalla==0) {
	# code...


$filename = "rpt_Cobranza-".".xls";
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
		    <th style="width: 30%;">ESTATUS SERVICIO</th>
		    <th style="width: 20%;">ESTATUS DE PAGO</th>
		    <th style="width: 20%;">ID CLIENTE</th>
		    <th style="width: 20%;">NOMBRE DEL CLIENTE</th>
		    <th style="width: 20%;">CELULAR</th>
		    <th style="width: 20%;">ID SERVICIO</th>
		    <th style="width: 20%;">SERVICIO</th>
		   	<th style="width: 20%;">COACH</th>

		   

		  </tr>
		  </thead>
		  <tbody>

		  	<?php for ($j=0; $j <count($array) ; $j++) { 
		  		$arrayestatus=array();
		  			$idservicio=$array[$j]->idservicio;
		  			$asignacion->idservicio=$idservicio;
		  			$obtenercoachs=$asignacion->BuscarAsignacionCoach();
		  			$asignacion->idusuario=0;
		  			$participantes=$asignacion->obtenerUsuariosServiciosAlumnosAsignados();



				for ($i=0; $i < count($participantes); $i++) { 
						$idusuarios=$participantes[$i]->idusuarios;
						$asignacion->idusuario=$idusuarios;
						$asignacion->idservicio=$idservicio;
						$pagadoservicio=$asignacion->VerificarSihaPagado();

						if (count($pagadoservicio)>0) {
							$pagado=1;
						}else{
							$pagado=0;
						}
						$participantes[$i]->pagado=$pagado;





						$objeto=array(

							'estatusservicio'=>$participantes[$i]->estatus,
							'estatusaceptado'=>$participantes[$i]->aceptarterminos,
							'estatuspago'=>$participantes[$i]->pagado,
							'idusuario'=>$participantes[$i]->idusuarios,
							'nombreusuario'=>$participantes[$i]->nombre.' '.$participantes[$i]->paterno.' '.$participantes[$i]->materno,
							'celular'=>$participantes[$i]->celular,
							'idservicio'=>$idservicio,
							'servicio'=>$array[$j]->titulo,
							'coachs'=>$obtenercoachs


						);
						array_push($arrayestatus, $objeto);

				//var_dump($arrayestatus);die();


				}


				for ($e=0; $e <count($arrayestatus) ; $e++) { ?>
					



					<tr>

		 				  <td><?php 
		 				  $imprimir='ACEPTADO';
		 				  $color="#007aff";
		 				  if ($arrayestatus[$e]['estatusaceptado']== '0') {
		 				  	$imprimir='PENDIENTE POR ACEPTAR';
		 				  	$color="#a09f9a";
		 				  } ?>

		 				<span class="divaceptado" style="background: <?php echo $color; ?>"><?php echo $imprimir; ?></span>


		 			</td> 


		 				  <td><?php 
		 				  $pagado="PAGADO";
		 				  $color2="#59c158";
		 				  if ($arrayestatus[$e]['estatuspago']==0) {
		 				  	 $pagado="PENDIENTE POR PAGAR";
		 				  	 $color2="red";
		 				  } ?>

		 				  <span class="divaceptado" style="background: <?php echo $color2; ?>">
		 				 <?php echo $pagado; ?>
		 				</span>
		 				</td>


		 				 <td><?php echo $arrayestatus[$e]['idusuario']; ?></td>

		 				 <td><?php echo $arrayestatus[$e]['nombreusuario']; ?></td>

		 				 <td><?php echo $arrayestatus[$e]['celular']; ?></td>

		 				 <td><?php echo $arrayestatus[$e]['idservicio']; ?></td>

		 				 <td><?php echo $arrayestatus[$e]['servicio']; ?></td>

		 				 <td>
		 				 	
		 				 <?php 
		 				 $coaches=$arrayestatus[$e]['coachs'];

		 				 $nombrescoach="";
		 				 $contador=0;
		 				 if (count($coaches)>0) {
		 				 	for ($m=0; $m < count($coaches); $m++) { 

		 				$nombrescoach=$nombrescoach.$coaches[$m]->idusuarios.'-'.$coaches[$m]->nombre.' '.$coaches[$m]->paterno.' '.$coaches[$m]->materno;

		 					$con=$contador+1;

		 					if ($con<count($coaches)) {
		 					$nombrescoach=',';	
		 					
		 					}

		 					$contador++;
		 				 		
		 				 	}
		 				 }

		 				 echo $nombrescoach;
		 				  ?>

		 				 </td>
		 			</tr>
			<?php

				}




		  	} ?>
		  		


		  </tbody>
		</table>	

