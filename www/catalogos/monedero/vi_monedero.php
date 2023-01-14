<?php
header("Content-Type: text/text; charset=ISO-8859-1");
require_once("../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();


if(!isset($_SESSION['se_SAS']))
{
	echo "login";
	exit;
}

 require_once("../../clases/conexcion.php");
 require_once("../../clases/class.Funciones.php");
	 
	 $db = new MySQL();
	 $fn = new Funciones(); 
	 
	 

try{	 
	
 
 
 
 if(isset($_GET['ac']))
{
	if($_GET['ac']==1)
	{
		$msj='<div id="mens" class="alert_success">'.$_GET['msj'].'</div>';
	}
	else
	{
		$msj='<div id="mens" class="alert_error">Error. Intentar mas Tarde '.$_GET['msj'].'</div>';
	}
	
	echo '<script type="text/javascript">OcultarDiv(\'mens\')</script>';
	
	echo $msj;
}
 
 
 ?>


<div class="card mb-3" style="display: none;">
	<div class="card-header">
		<h5 class="card-title" style="float: left; margin-top: 5px;">LISTA DE MOVIMIENTOS</h5>
		<button type="button" onClick="/*aparecermodulos('catalogos/fa_guias.php','main');*/ AbrirModalGeneral2('ModalPrincipal','900','400','catalogos/monedero/fa_monedero.php');" class="btn btn-info" style="float: right;">AGREGAR SALDO</button>
		<div style="clear: both;"></div>
	</div>
  	<div class="card-body">
		<form action="" name="filtro" id="filtro">
			<div class="row">

					<div class="col-md-3">
						<div class="form-group">
							<label>NOMBRE:</label>
							<input name="v_nombre" type="text" id="v_nombre" class="form-control" placeholder="NOMBRE"  title="Nombre"/>
						</div>
					</div>

					<div class="col-md-3">
						<div class="form-group">
							<label>APELLIDO PATERNO:</label>
							<input name="v_paterno" type="text" id="v_paterno" class="form-control" placeholder="PATERNO"  title="Apellido Paterno"/>
						</div>
					</div>

					<div class="col-md-3">
						<div class="form-group">
							<label>APELLIDO MATERNO:</label>
							<input name="v_materno" type="text" id="v_materno" class="form-control" placeholder="MATERNO"  title="Apellido Materno"/>
						</div>
					</div>

					<div class="col-md-3" style="display: none;">
						<div class="form-group">
							<label>No. Tarjeta:</label>
							<input name="v_tarjeta" type="text" id="v_tarjeta" class="form-control" placeholder="039489"  title="No. Tarjeta"/>
						</div>
					</div>
			</div>
		</form>
  	</div>
	
	<div class="card-footer text-muted" style="text-align: right;">
		<input type="button" value="BUSCAR MOVIMIENTOS" class="btn btn-info" onClick="b_monedero('li_guias');" style="margin-top: 5px;" >
	</div>
</div>


<div class="card">
	<div class="card-body">
		<h5 class="card-title" style="float: left;">LISTADO DE MONEDERO</h5>
		<button type="button" onClick="/*aparecermodulos('catalogos/fa_guias.php','main');*/ AbrirModalGeneral2('ModalPrincipal','900','400','catalogos/monedero/fa_monedero.php');" class="btn btn_azul" style="float: right;display: none;"><i class="mdi mdi-plus-circle"></i>NUEVO MONEDERO</button>
		
		<div style="float:right;">
			<button type="button" onClick="abrir_filtro('modal-filtros');" class="btn btn-primary" style="float: right;display: none;"><i class="mdi mdi-account-search"></i>  BUSCAR</button>			
			
			
			<div style="clear: both;"></div>
		</div>
			
	</div>
</div>

<div class="card">
	<div class="card-body">
		<div id="li_modulos" class="module_content">
    		<div id="li_guias" class="tab_container" style="overflow: auto;">
    			
			</div>
		</div>
	</div>
</div>

<script>
	
	b_monedero('li_guias');
</script>
                 
                
    
<?php
}//fin del try
catch (Exception $e)
{
	 $v = explode ('|',$e);
		// echo $v[1];
	     $n = explode ("'",$v[1]);
		 $n[0];
		 echo $db->m_error($n[0]);
}
?>