<?PHP
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Clientes.php");
require_once("../../clases/class.Funciones.php");


$db = new MySQL();
$cli = new Clientes();

$f = new Funciones();


$cli->db = $db;

$result_clientes = $cli->ObtenerInformacionClientes();
$row_clientes=$db->fetch_assoc($result_clientes);



 

?>
		<script type="text/javascript" charset="utf-8">
				var oTable = $('#d_clientes').dataTable( {		
					
					  "oLanguage": {
									"sLengthMenu": "Mostrar _MENU_ Registros por pagina",
									"sZeroRecords": "Nada Encontrado - Disculpa",
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
						 	"ordering": true,

				} );
				</script>

<div id="li_modulos" class="tab_container">
<table  border="0" cellspacing="2" cellpadding="2" class="table table-bordered"  id="d_clientes"  >
<thead > 
  <tr >
    <th width="11%" align="center" style="border-top-left-radius: 5px">ID  </th>
    <th width="81%" align="center">NOMBRE CLIENTE</th>
    <th width="8%" align="center" style="border-top-right-radius: 5px">ACCION</th>
    </tr>
</thead>    

<tbody>
<!--<tr>
            <td align="center" >0</td>
            <td >Publico General</td>
            <td align="center" ><input type="button" name="button" id="button" value="Seleccionar" onClick="S_cliente_apartado('0','Publico General','0','0'); CerrarModalGeneral('ModalPrincipal');"></td>
      </tr>-->
  
  <?php
   do {
		$id = $row_clientes['idcliente'];
		$nombre = $f->imprimir_cadena_utf8($row_clientes['nombre'].' '.$row_clientes['paterno'].' '.$row_clientes['materno']);
		//$idniveles = $result_clientes->idniveles;
		
		/*$sql = "SELECT * FROM niveles WHERE idniveles = '$idniveles'";
		$result_sql = $db->consulta($sql);
		$result_sql_row = $db->fetch_assoc($result_sql);*/
		
		//$nivel = $result_sql_row['nombre'];		
		?>
	<tr>
            <td align="center" ><?php echo $id;?></td>
            
           <!--  <?php
			if($idniveles != 0){ 
			?>
            <td><?php echo $nombre." (Nivel: ".$nivel.")"; ?></td>
            <?php
			}else{
			?>
           
            <?php
			}
			?> -->
			 <td><?php echo $nombre; ?></td>
            <td align="center" ><input type="button" name="button" id="button" value="Seleccionar" onClick="S_cliente_monedero('<?php echo $id;?>','<?php echo $nombre;?>','<?php echo $nivel;?>','<?php echo $idniveles; ?>'); $('#ModalSecundaria').css('display','none'); $('#contenido_modal_dos').html('');"></td>
      </tr>
		
		
		<?php


} while ($row_clientes=$db->fetch_assoc($result_clientes));


  ?>

    </tbody>
</table>
    </div>
    