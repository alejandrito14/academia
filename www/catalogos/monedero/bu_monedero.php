<?php
require_once("../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();
//validaciones para todo el sistema

$tipousaurio = $_SESSION['se_sas_Tipo'];  //variables de sesion
$lista_empresas = $_SESSION['se_liempresas']; //variables de sesion


if(!isset($_SESSION['se_SAS']))
{
	header("Location: ../login.php");
	exit;
}


require_once("../../clases/conexcion.php");
require_once("../../clases/class.Funciones.php");

try 
{

    $db= new MySQL();
	
	$f = new Funciones();
	

	
	 
	
	//enviamos datos a las variables de la tablas	
	$nombre =  $f->imprimir_cadena_utf8($_POST['nombre']);
	$paterno = $f->imprimir_cadena_utf8($_POST['paterno']);
	$materno = $f->imprimir_cadena_utf8($_POST['materno']);
	$tarjeta = $f->imprimir_cadena_utf8($_POST['tarjeta']);
	
		
 	$idsucursales = $_SESSION['se_sas_Sucursal'];
	
	$p_nombre = ($nombre != "" ) ? " AND c.nombre LIKE '%$nombre%' " : '';
	$p_paterno = ($paterno != "" ) ? "AND  c.paterno LIKE '%$paterno%' " : '';
	$p_materno = ($materno != "" ) ? " AND c.materno LIKE '%$materno%' " : '';
	$p_tarjeta = ($tarjeta != "" ) ? "AND  c.no_tarjeta LIKE '%$tarjeta%' " : '';
	
	
	//$p_pago = ($pago != "" ) ? "AND  est_pago in($pago) " : '';
	//$p_ini = ($ini != "" ) ? " est_recibido != $ini" : '';
	
	/*if($tipousaurio != 0)
		{
			$SQLidempresas = " AND   c.idempresas IN ($lista_empresas) ";

		}else
		{*/
			$SQLidempresas = " ";
		
	
	$sql_guias = "SELECT * FROM usuarios c WHERE estatus IN(0,1,2) and tipo=3 $p_nombre $p_materno $p_paterno $p_tarjeta $SQLidempresas ";

			
	
	
	//die($sql_guias);
	//echo $sql_guias;
	
	//$sql_mandar = $f->conver_especial($sql_guias);
		
//ejecuto la consulta y creo un fecth assoc	
	
	$result_gastos = $db->consulta($sql_guias);
	$result_gastos_row = $db->fetch_assoc($result_gastos); 
	$result_gastos_row_num = $db->num_rows($result_gastos);
	 //error por si no se encuentra ni un registro
	 if ($result_gastos_row_num <= 0)
	 {
		 echo "<p style='text-align:center; color:red;'>Lo sentimos no se encontraron los resultados de la busqueda</p> ";
		 
		 }
	else 
	{	 
?>

	


			

			<table  cellspacing="0"  class="table table-bordered" id="d_modulos"> 
		   <thead> 
			   <tr >
			     
			     <!--<th align="center" style="text-align:center"> FECHA</th>--> 
                 	<th align="center" style="text-align:center"> ALUMNO</th>
				   <th align="center" style="text-align:center">SALDO</th>
				   <th align="center" style="text-align: center;">ACCIÓN</th>
				   <!--<th align="center" style="text-align:center">MODALIDAD</th> 
   				   <th align="center" style="text-align:center"> TIPO</th>-->
   				                      
                   <!--<th align="center" style="text-align:center">ACCIONES</th>-->
			   </tr> 
		   </thead> 
		   <tbody> 
            
            <?php
			
			if($result_gastos_row_num != 0)
			 {
					$modalidad = array('PAGO CAJA','DEVOLUCION','DEPOSITO');
					$tipo = array('ABONO','CARGO');
		           do
			         {

			         	if ($result_gastos_row['nombre']!='') {
			         		# code...
			         	
			         		# code...
			         	
						?>
           
			   <tr style="cursor:pointer">
			   
			     <!--<td align="center"><?PHP echo $result_gastos_row['fecha']; ?></td> -->
                 <td align="center" style="text-transform:uppercase;"><?PHP 
                 $nombre=$f->imprimir_cadena_utf8($result_gastos_row['nombre']." ".$result_gastos_row['paterno']." ".$result_gastos_row['materno']);

                 echo $f->imprimir_cadena_utf8($result_gastos_row['nombre']." ".$result_gastos_row['paterno']." ".$result_gastos_row['materno']); ?></td> 
			     <td align="center"><?php echo "$ ".$result_gastos_row['monedero']; ?></td>

			     <td align="center">
			     	
			     <button onclick="ObtenerMovimientos('<?php echo $result_gastos_row['idusuarios']; ?>')" class="btn btn_accion"><i class="mdi mdi-eye"></i></button>
			     <button  class="btn btn_accion" title="AGREGAR" onclick="agregarsaldoacliente('<?php echo $result_gastos_row['idusuarios']; ?>','<?php echo $nombre; ?>')" ><i class="mdi mdi-plus"></i></button>
			     </td>
			     <!--<td align="center"><?php echo $modalidad[$result_gastos_row['modalidad']]; ?></td> 
			     <td align="center"><?php echo  $tipo[$result_gastos_row['tipo']]; ?></td>-->
			     
   			
   			     <!--<td align="center">
                     <input type="hidden" id="sql_regresar" value="<?Php echo $sql_guias; ?>" />
                     <input type="image" src="images/icn_edit.png" title="EDITAR" onclick=" AbrirModalGuias('ModalPrincipal','900','560','catalogos/fc_guias.php?id=<?php echo $result_gastos_row['idguias_pedidos'];?>');">
                     
                     
                     <input type="image" src="images/icn_trash.png" title="BORRAR" onclick="BorrarDatos('<?php echo $result_gastos_row['idguias_pedidos'];?>','idguias_pedidos','guias_pedidos','n','catalogos/vi_guias2.php','main')" />
                     
                     <input type="image" src="images/print.png" title="IMPRIMIR" onclick="imprimirPDF('catalogos/pdf/reporteGuia.php?id=<?php echo $result_gastos_row['idguias_pedidos']; ?>')">
                 
                 
                 </td> -->
			   </tr>
            <?php
            	}
			}
			while($result_gastos_row = $db->fetch_assoc($result_gastos));
			
			?>
            <?php
			
			 }
			   else
			 {
				 ?>
				<tr  >
			   
			     <td align="center" colspan="3">NO EXISTE NINGUN CONCEPTO DE GASTO EN ESTE MOMENTO</td> 
			     
			   </tr>
           	   <?php

			  }
			?>
		   </tbody> 
     </table>  

     	<script type="text/javascript" charset="utf-8">
		
				
				var oTable = $('#d_modulos').dataTable( {	
				 "ordering": false,	
					   "lengthChange": true,
					   "pageLength": 50,		
					
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
					   "sScrollX": "100%",
		               "sScrollXInner": "100%",
		               "bScrollCollapse": true,
					  		 	"ordering": true,

					  
						
				} );
				
				</script>
          
           <?php 
		     } 
		   }
		   catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}		


		   ?> 