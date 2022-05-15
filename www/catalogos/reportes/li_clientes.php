<?PHP

/*======================= INICIA VALIDACIÓN DE SESIÓN =========================*/

require_once("../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();

if(!isset($_SESSION['se_SAS']))
{
	/*header("Location: ../../login.php"); */ echo "login";
	exit;
}

$idmenumodulo = $_GET['idmenumodulo'];

//validaciones para todo el sistema
$tipousaurio = $_SESSION['se_sas_Tipo'];  //variables de sesion
$lista_empresas = $_SESSION['se_liempresas']; //variables de sesion

require_once("../../clases/conexcion.php");
require_once("../../clases/class.Reportes.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Botones.php");

$idmenumodulo = $_GET['idmenumodulo'];

//validaciones para todo el sistema
$lista_empresas = $_SESSION['se_liempresas']; //variables de sesion
$idempresa = $_GET['v_idempresa'] ;

$db = new MySQL();
$rpt = new Reportes();
$bt = new Botones_permisos();
$f = new Funciones();

$rpt->db = $db;

//$result_clientes = $rpt->lista_clientes();

if($tipousaurio != 0)
	{
		if($idempresa == 0)
		{
			$id_empresa ="AND empresas.idempresas IN ($lista_empresas)" ;
		}else
		{
			$id_empresa = "AND empresas.idempresas IN ($idempresa)";
		}
	}else
	{
		if($idempresa == 0)
		{
			$id_empresa =" " ;
		}else
		{
			$id_empresa = "AND empresas.idempresas IN ($idempresa)";
		}
	}
	
	$sql_sucursales = "SELECT clientes.*, empresas.empresas FROM clientes 
		INNER JOIN empresas ON empresas.idempresas = clientes.idempresas
							WHERE 1=1
							$id_empresa
							ORDER BY idempresas";

/*
	if($this->tipo_usuario != 0)
		{
			$SQLidempresas = " WHERE clientes.idempresas IN ($this->lista_empresas) ";

		}else
		{
			$SQLidempresas = " ";
		}
		
		$sql = "SELECT clientes.*, empresas.empresas FROM clientes 
		INNER JOIN empresas ON empresas.idempresas = clientes.idempresas
		".$SQLidempresas;
		*/
				
	     $result_clientes = $db->consulta($sql_sucursales);
	     $result_clientes_row = $db->fetch_assoc($result_clientes);
		 $result_clientes_num = $db->num_rows($result_clientes);
	
//*================== INICIA RECIBIMOS PARAMETRO DE PERMISOS =======================*/

if(isset($_SESSION['permisos_acciones_erp'])){
						//Nombre de sesion | pag-idmodulos_menu
	$permisos = $_SESSION['permisos_acciones_erp']['pag-'.$idmenumodulo];	
}else{
	$permisos = '';
}
//*================== TERMINA RECIBIMOS PARAMETRO DE PERMISOS =======================*/

?>
    
    <!--INCERTAMOS SKINK PARA EL MANEJO DE LAS TABLAS--> 

        <style type="text/css" title="currentStyle">
			@import "js/grid/css/demo_page.css";
			@import "js/grid/css/demo_table.css";
		</style>
		<!--<script type="text/javascript" language="javascript" src="js/grid/js/jquery.js"></script>
		<script type="text/javascript" language="javascript" src="js/grid/js/jquery.dataTables.js"></script>
        <script type="text/javascript" language="javascript" src="js/grid/js/FixedColumns.js"></script>
		<script type="text/javascript" language="javascript" src="js/grid/js/FixedColumns.min.js"></script>-->
    
    <!--TERMINAMOS SKIN DE EL MANEJO DE LAS TABLAS--> 

		<script type="text/javascript" charset="utf-8">
		
			$(document).ready(function() {
				
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
					   "sScrollX": "100%",
		               "sScrollXInner": "100%",
		               "bScrollCollapse": true
						
				} );
				} );
				
				</script>


<div class="form-group col-md-12" style="text-align: right">
		<a class="btn btn-primary" title="Reporte" onClick="generarpdf_rpt_lista_clientes();" style="margin-top: 5px; color: #ffffff"><i class="mdi mdi-account-search"></i>  REPORTE</a>				
	</div>				

<table class="table table-striped table-bordered" id="tbl_clientes" cellpadding="0" cellspacing="0" style="overflow: auto">
	<thead class="thead-dark">
		<tr style="text-align: center">
			<th>ID</th> 
			<th>No. CLIENTE</th>
			<th>NOMBRE CLIENTE</th> 
			<th>EMPRESA</th> 
			<th>TEL&Eacute;FONO</th> 
			<th>ACCI&Oacute;N</th>
		</tr>
	</thead>

	<tbody>
			<?php
			if($result_clientes_num == 0){
			?>
			<tr> 
				<td colspan="7" style="text-align: center">
					<h5 class="alert_warning">NO EXISTEN CLIENTES EN LA BASE DE DATOS.</h5>
				</td>
			</tr>
			<?php
			}else{
				do
				{
			?>
			<tr>
			    <td style="text-align: center;"><?php echo $f->imprimir_cadena_utf8($result_clientes_row['idcliente']); ?></td>
			    <td style="text-align: center;"><?php echo $f->imprimir_cadena_utf8($result_clientes_row['no_cliente']); ?></td>
				<td style="text-align: center;"><?php echo $f->imprimir_cadena_utf8(utf8_encode($result_clientes_row['nombre']." ".$result_clientes_row['paterno']." ".$result_clientes_row['materno'])); ?></td>
				<td style="text-align: center;"><?php echo $result_clientes_row['empresas']?></td>
				<td style="text-align: center;"><?php echo $result_clientes_row['telefono']?></td>
				<td style="text-align: center; font-size: 15px;">
										
					<i class="btn btn-primary mdi mdi-file-pdf" style="cursor: pointer" onclick="generarpdf_rpt_clientes('<?php echo $result_clientes_row['idcliente'];?>')" ></i>					
						
				</td>
			</tr>
			<?php
				}while($result_clientes_row = $db->fetch_assoc($result_clientes));
			}
			?>
	</tbody>
</table>


