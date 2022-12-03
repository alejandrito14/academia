<?PHP
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Usuarios.php");
require_once("../../clases/class.Funciones.php");


$db = new MySQL();
$cli = new Usuarios();

$f = new Funciones();


$cli->db = $db;

$cli->id_usuario=$_POST['idusuarios'];
$result_clientes = $cli->ObtenerInformacionusuario();
$row_clientes=$db->fetch_assoc($result_clientes);

$result_cliente_monedero=$cli->ObtenerMonedero();
$row_monedero=$db->fetch_assoc($result_cliente_monedero);
$num_monedero=$db->num_rows($result_cliente_monedero);

					$tipo = array('ABONO','CARGO');

 

?>
		<script type="text/javascript" charset="utf-8">
				var oTable = $('#d_clientes').dataTable( {		
					
					  "oLanguage": {
									"sLengthMenu": "Mostrar _MENU_ Registros por pagina",
									"sZeroRecords": "NO SE ENCONTRARON REGISTROS",
									"sInfo": "Mostrar _START_ a _END_ de _TOTAL_ Registros",
									"sInfoEmpty": "desde 0 a 0 de 0 records",
									"sInfoFiltered": "(filtered desde _MAX_ total Registros)",
									"sSearch": "Buscar",
									"oPaginate": {
												 "sFirst":    "Inicio",
												 "sPrevious": "Anterior",
												 "sNext":     "Siguiente",
												 "sLast":     "Ultimo"
												 }
                                    },
			           "sPaginationType": "full_numbers",
			
				} );
				</script>

<div id="li_modulos" class="tab_container">

	<?php 
	$id = $row_clientes['idcliente'];
		$nombre = $f->imprimir_cadena_utf8($row_clientes['nombre'].' '.$row_clientes['paterno'].' '.$row_clientes['materno']);
	 ?>
<table  border="0" cellspacing="2" cellpadding="2" class="table table-bordered"  id="d_clientes"  >
<thead > 
  <tr >
    <th width="20%" align="center" style="border-top-left-radius: 5px;text-align: center;">FECHA </th>
    <th width="20%" align="center " style="text-align: center;">MONTO</th>
    <th width="20%" align="center" style="text-align: center;" >TIPO</th>
    <th width="20%" align="center" style="text-align: center;">CONCEPTO</th>
<!--     <th width="8%" align="center" style="border-top-right-radius: 5px">ACCION</th>
 -->    </tr>
</thead>    

<tbody>
<!--<tr>
            <td align="center" >0</td>
            <td >Publico General</td>
            <td align="center" ><input type="button" name="button" id="button" value="Seleccionar" onClick="S_cliente_apartado('0','Publico General','0','0'); CerrarModalGeneral('ModalPrincipal');"></td>
      </tr>-->
  
  <?php
  if ($num_monedero>0) {
  
		   do {
				
				?>
			<tr>
		            <td align="center" ><?php echo $row_monedero['fecha'];?></td>
					 <td style="text-align: center;">$<?php echo number_format($row_monedero['monto'],2,'.','.'); ?></td>
					 <td style="text-align: center;"><?php echo $tipo[$row_monedero['tipo']]; ?></td>
					 <td style="text-align: center;"><?php echo mb_strtoupper($f->imprimir_cadena_utf8($row_monedero['concepto'])) ?></td>
		         
		    </tr>
				
				
				<?php


		} while ($row_monedero=$db->fetch_assoc($result_cliente_monedero));
	}

  ?>

    </tbody>
</table>
    </div>