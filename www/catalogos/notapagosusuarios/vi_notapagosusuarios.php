<?php
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

//validaciones para todo el sistema


/*======================= TERMINA VALIDACIÓN DE SESIÓN =========================*/

//Importación de clase conexión
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Pagos.php");
require_once("../../clases/class.Botones.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Usuarios.php");

//Declaración de objeto de clase conexión
$db = new MySQL();
$pagos = new Pagos();
$bt = new Botones_permisos(); 
$f = new Funciones();

$pagos->db = $db;
$cli = new Usuarios();
$cli->db = $db;
$r_clientes = $cli->lista_Usuarios(3);
$a_cliente = $db->fetch_assoc($r_clientes);
$r_clientes_num = $db->num_rows($r_clientes);


//obtenemos todas las empreas que puede visualizar el usuario.

$pagos->tipo_usuario = $tipousaurio;
$pagos->lista_empresas = $lista_empresas;

$l_pagos = $pagos->ObtTodosPagos();
$l_pagos_row = $db->fetch_assoc($l_pagos);


$l_pagos_num = $db->num_rows($l_pagos);

/*======================= INICIA VALIDACIÓN DE RESPUESTA (alertas) =========================*/

if(isset($_GET['ac']))
{
	if($_GET['ac']==1)
	{
		echo '<script type="text/javascript">AbrirNotificacion("'.$_GET['msj'].'","mdi-checkbox-marked-circle");</script>'; 
	}
	else
	{
		echo '<script type="text/javascript">AbrirNotificacion("'.$_GET['msj'].'","mdi-close-circle");</script>';
	}
	
	echo '<script type="text/javascript">OcultarNotificacion()</script>';
}

/*======================= TERMINA VALIDACIÓN DE RESPUESTA (alertas) =========================*/

//*================== INICIA RECIBIMOS PARAMETRO DE PERMISOS =======================*/

if(isset($_SESSION['permisos_acciones_erp'])){
						//Nombre de sesion | pag-idmodulos_menu
	$permisos = $_SESSION['permisos_acciones_erp']['pag-'.$idmenumodulo];	
}else{
	$permisos = '';
}
//*================== TERMINA RECIBIMOS PARAMETRO DE PERMISOS =======================*/



$estatus=array('PENDIENTE','PROCESO','ACEPTADO','RECHAZADO','REEMBOLSO','SIN REEMBOLSO');
$estatuspago = array('NO PAGADO','PAGADO');
?>


<div class="card">
	<div class="card-body">
		<h5 class="card-title" style="float: left;">NOTAS DE PAGO POR USUARIO</h5>
		
		<div style="float:right;">
			<button type="button" onClick="abrir_filtro('modal-filtros');" class="btn btn-primary" style="float: right;display: none;"><i class="mdi mdi-account-search"></i>  BUSCAR</button>			
			
			<?php
		
				//SCRIPT PARA CONSTRUIR UN BOTON
				$bt->titulo = "NUEVO PAGO";
				$bt->icon = "mdi-plus-circle";
				$bt->funcion = "aparecermodulos('catalogos/pagos/fa_pagos.php?idmenumodulo=$idmenumodulo','main');";
				$bt->estilos = "float: right; margin-right:10px;";
				$bt->permiso = $permisos;
				$bt->tipo = 5;
				$bt->title="NUEVO PAGO";
				

				//$bt->armar_boton();
			
			?>
			
			<div style="clear: both;"></div>
		</div>
		
		<div style="clear: both;"></div>
	</div>
</div>

<div class="row">
	<div class="col-md-6" style="">
		<div class="card">
			<div class="card-body">

					<label for="">SELECCIONAR CLIENTE:</label>

				 <div class="col" style="padding: 0">
                    <div class="form-group m-t-20">  
            <input type="text" class="form-control" name="buscadorcli_?>" id="buscadorcli_" placeholder="Buscar" onkeyup="BuscarEnLista('#buscadorcli_','.cli_')">
            </div>
          </div>
                   
          <div class="col">
                     <!--  <div class="form-check">
                        <input type="checkbox" id="v_tclientes"  name="v_tclientes" onchange="HabilitarDeshabilitarCheck('#lclientesdiv')" class="form-check-input " title="" placeholder=''  >
                        <label for="">SELECCIONAR TODOS</label>
                      </div> -->
              <div class="clientes "  style="overflow:scroll;height:100px;overflow-x: hidden" id="clientes_<?php echo $a_cliente['idusuarios'];?>"> 
               <?php      
              if ($r_clientes_num>0) {  
                  do {
            ?>
                  <div  class="form-check cli_"  id="cli_<?php echo $a_cliente['idusuarios'];?>_<?php echo $a_cliente['idcliente'];?>">
                      <?php   
                      $valor="";
                     $nombre=mb_strtoupper($f->imprimir_cadena_utf8($a_cliente['nombre']." ".$a_cliente['paterno']." ".$a_cliente['materno']));
                    ?>
                    <input  type="checkbox" style="" onchange="SeleccionarClientePagos('<?php echo $a_cliente['idusuarios'];?>')" value="" class="form-check-input chkcliente_<?php echo $idcupon;?>" id="inputcli_<?php echo $a_cliente['idusuarios']?>_<?php echo $idcupon;?>" <?php echo $valor; ?>>
                    <label class="form-check-label" for="flexCheckDefault" ><?php echo $nombre; ?></label>
                </div>                    
                  <?php
                    } while ($a_cliente = $db->fetch_assoc($r_clientes));
                     ?>
                  <?php } ?>    
            </div>
          </div>
      </div> <!-- lclientesdiv -->

			</div>
		

	</div>
	<div class="col-md-8" style="">
		<!-- <div class="">
			<div class="card">
			<div class="card-body">
				<div class="col-md-6" style="float: left;"></div>
				<div class="col-md-6" style="float: right;">
					<button class="btn btn_azul">NUEVO PAGO</button>
				</div>
			</div>
			</div>
	
		</div> -->



	</div>
		<!-- <div class="col-md-6">
		<div class="row">
			<div class="col-md-12">
				<div class="card">
				<div class="card-body" style="display: none;">
					<label for="" class="active">FORMA DE PAGO</label>
					<div class="">
						
					</div>
				</div>
			</div>
			</div>
	 		
			
		</div>
		
		


	</div> -->


	<div class="col-md-5"></div>
	<div class="col-md-2"></div>

		<div class="col-md-5">
			
		</div>


</div>





<script type="text/javascript">
	ObtenerTipodepagos();
</script>
