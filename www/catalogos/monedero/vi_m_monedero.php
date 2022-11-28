<?php
header("Content-Type: text/text; charset=ISO-8859-1");
if (!isset($_SESSION)) 
{
  session_start();
}
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Fechas.php");
require_once("../../clases/class.Clientes.php");
require_once("../../clases/class.Configuracion.php");

$db = new MySQL();
$fe = new Fechas();
$cli = new Clientes();
$conf = new Configuracion();

$cli->db = $db;

$conf->db = $db;
//recibimos el id de la guia

$idcliente = $_GET['idcliente'];


if(isset($_GET['ac']))
{
	if($_GET['ac']==1)
	{
		$msj='<div id="mens" class="alert_success">'.$_GET['msj'].'</div>';
	}
	else
	{
		$msj='<div id="mens" class="alert_error">Error. Intentar mas Tarde '.$_GET['ac'].'</div>';
	}
	
	echo '<script type="text/javascript">OcultarDiv(\'mens\')</script>';
 
    echo $msj;
	
	
	
	
}




//REALIZAMOS BUSQUEDA DE TODOS LOS MOVIMIENTOS DEL CLIENTE EN SU MONEDERO ELECTRONICO 

$cli->idCliente = $idcliente;
$result_pagos = $cli->buscarMovimientosMonederoAbonos();
$result_row_pagos = $db->fetch_assoc($result_pagos);
$result_num_pagos = $db->num_rows($result_pagos);

$result_cargos = $cli->buscarMovimientosMonederoCargos();
$result_cargos_row = $db->fetch_assoc($result_cargos);
$result_cargos_num = $db->num_rows($result_cargos);

$result_cliente = $cli->ObtenerInformacionCliente();

$Nombre = $result_cliente['nombre']." ".$result_cliente['paterno']." ".$result_cliente['materno'];


	$modalidad = array('PAGO CAJA','DEVOLUCION','DEPOSITO','CANCELACION','RETIRO');


//Consultamos configuracion para impresion
	//$result_conf = $conf->ObtenerInformacionConfiguracion();
	//$impresion = $result_conf['notas_print'];
	
	
	//Consultamos configuracion de impresion por sucursal
	$suc = $_SESSION['se_sas_Sucursal'];
	$sql_imp = "SELECT * FROM sucursales WHERE idsucursales = '$suc'";
	$result_imp = $db->consulta($sql_imp);
	$result_imp_row = $db->fetch_assoc($result_imp);
	$impresion = $result_imp_row['notas_print'];

?>

<script type="text/javascript">
	$('#titulo-modal-forms').css("text-transform","uppercase");
	$('#titulo-modal-forms').html("LISTA DE MOVIMIENTOS DE <?php echo $Nombre; ?> ");
</script>

<div id="ModalSecundaria" class="ventana">
<div id="Close" style="text-align: right">
      <img src="images/004.png" width="16" height="16" onClick="$('#ModalSecundaria').css('display','none'); $('#contenido_modal_dos').html('');" style="cursor:pointer">
</div>

    <div id="contenido_modal_dos" >
   
    </div>

</div>

<!--<div class="card">
	<div class="card-body">
		<div id="mensajes"></div>
		<h4 class="card-title" style="float: left;"></h4>
	</div>
</div>-->

<div class="card">
	<div class="card-body">
		<div class="row">
			<div class="col-md-12">
				<table  cellspacing="0"  class="table table-bordered" id="tablacolores" > 
				   <thead>
						<tr style="background-color:#DBD7D7">
							<td align="center" colspan="5">ABONOS</td>
						</tr> 
					   <tr style="background-color:#DBD7D7">

						 <th align="center" style="text-align:center">FECHA</th>
						 <th align="center" style="text-align:center">CONCEPTO</th> 
						   <th align="center" style="text-align:center">SALDO</th> 
						   <th align="center" style="text-align:center"> MODALIDAD</th>

						   <th align="center" style="text-align:center;">ACCIONES</th>

						   <!--<th align="center" style="text-align:center">ACCIONES</th>-->
					   </tr> 
				   </thead> 
				   <tbody> 

				   <?php

				   if($result_num_pagos!=0)
				   {
					$total = 0;
				   do
				   {
				   ?>

					   <tr>			   
						 <td align="center"><?php echo $result_row_pagos['fecha']; ?></td>
						 <td align="center"><?php echo $result_row_pagos['concepto']; ?></td>
						 <td align="center"><?php echo  "$ ".$result_row_pagos['monto']; ?></td> 
						 <td align="center"><?php echo  $modalidad[$result_row_pagos['modalidad']]; ?></td>
						 <?php
						 if($result_row_pagos['modalidad'] == 2 || $result_row_pagos['modalidad'] == 3){ 
						 ?>
						 <td align="center">

							<?php
							if($impresion == 0){ 
							?>
							 <!--<a href="#" onClick="" title="EDITAR"><i class="mdi mdi-printer"></i></a>-->
							 
							 <button type="button" onClick="imprimirPDFSecundaria('ventas/pdf/monedero.php?id=<?php echo $result_row_pagos['idcliente_monedero']; ?>')" title="IMPRIMIR" class="btn btn-outline-danger">
								<i class="mdi mdi-printer"></i>
					  		</button>
							 
							<?php
							}else{
							?>
							 
							 <button type="button" onClick="imprimirPDFSecundaria('ventas/pdf/monedero_termico.php?id=<?php echo $result_row_pagos['idcliente_monedero']; ?>')" title="IMPRIMIR" class="btn btn-outline-danger">
								<i class="mdi mdi-printer"></i>
					  		</button>
							 
							<?php
							}
							?>
						 </td>

						 <?php
						 }else{
						 ?>
						 <td align="center">&nbsp;

						 </td>
						<?php  
						 }
						 ?>

						 <!--<td align="center">
						 <input type="image" src="images/icn_edit.png" title="EDITAR" onclick="aparecermodulos('catalogos/fc_guias_pago.php?idguias_pagos=<?php echo $result_row_pagos['idguias_pagos'];?>&idguia=<?php echo $idguia; ?>','contenido_modal');">
						 <input type="image" src="images/icn_trash.png" title="BORRAR" onclick="BorrarDatosPagoGuia('<?php echo $result_row_pagos['idguias_pagos'];?>','idguias_pagos','guias_pagos','n','catalogos/vi_guias_pagos.php?v_idguia=<?php echo $idguia;?>','contenido_modal')" /></td> -->


					   </tr>

					<?php

						$total = $total + $result_row_pagos['monto'];

				   }while($result_row_pagos = $db->fetch_assoc($result_pagos));
				   }else
				   {
					?>
						<tr>

						 <td align="center" colspan="3">NO EXISTE NINGUN CONCEPTO DE GASTO EN ESTE MOMENTO</td> 

					   </tr>
					   <?php
				   }
					   ?>

				   </tbody> 
			 </table>
			</div>
			<div class="col-md-12">
				<table  cellspacing="0" class="table table-bordered" id="tablacolores" > 
					   <thead> 

							<tr style="background-color:#DBD7D7">
								<td align="center" colspan="4">CARGOS</td>
							</tr> 

						   <tr style="background-color:#DBD7D7">

							 <th align="center" style="text-align:center">FECHA</th>
							 <th align="center" style="text-align:center">CONCEPTO</th> 
							   <th align="center" style="text-align:center">SALDO</th> 
							   <th align="center" style="text-align:center"> MODALIDAD</th>

							   <!--<th align="center" style="text-align:center">ACCIONES</th>-->
						   </tr> 
					   </thead> 
					   <tbody> 

					   <?php


					   if($result_cargos_num!=0)
					   {
						$total = 0;
					   do
					   {

					   ?>

						   <tr>			   
							 <td align="center"><?php echo $result_cargos_row['fecha']; ?></td>
							 <td align="center"><?php echo utf8_encode($result_cargos_row['concepto']); ?></td> 
							 <td align="center"><?php echo  "$ ".$result_cargos_row['monto']; ?></td> 
							 <td align="center"><?php echo  $modalidad[$result_cargos_row['modalidad']]; ?></td>

							 <!--<td align="center">
							 <input type="image" src="images/icn_edit.png" title="EDITAR" onclick="aparecermodulos('catalogos/fc_guias_pago.php?idguias_pagos=<?php echo $result_row_pagos['idguias_pagos'];?>&idguia=<?php echo $idguia; ?>','contenido_modal');">
							 <input type="image" src="images/icn_trash.png" title="BORRAR" onclick="BorrarDatosPagoGuia('<?php echo $result_row_pagos['idguias_pagos'];?>','idguias_pagos','guias_pagos','n','catalogos/vi_guias_pagos.php?v_idguia=<?php echo $idguia;?>','contenido_modal')" /></td> -->


						   </tr>

						<?php

							$total = $total + $result_row_pagos['monto'];
					   }while($result_cargos_row = $db->fetch_assoc($result_cargos));
					   }else
					   {
						?>
							<tr>

							 <td align="center" colspan="4">NO EXISTE NINGUN CONCEPTO DE GASTO EN ESTE MOMENTO</td> 

						   </tr>
						   <?php
					   }
						   ?>


					   </tbody> 
				 </table>
			</div>
		</div>
	</div>
</div>