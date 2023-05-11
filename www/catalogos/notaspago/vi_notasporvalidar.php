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
require_once("../../clases/class.Notapago.php");
require_once("../../clases/class.Botones.php");
require_once("../../clases/class.Funciones.php");

//Declaración de objeto de clase conexión
$db = new MySQL();
$notapago = new Notapago();
$bt = new Botones_permisos(); 
$f = new Funciones();

$notapago->db = $db;


//obtenemos todas las empreas que puede visualizar el usuario.

$notapago->tipo_usuario = $tipousaurio;
$notapago->lista_empresas = $lista_empresas;

$l_pagos = $notapago->ObtTodosNotaPagos();
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



$estatus=array('PENDIENTE','ACEPTADO','CANCELADO');
$estatuspago = array('NO PAGADO','PAGADO');
?>

<div class="card">
	<div class="card-body">
		<h5 class="card-title" style="float: left;">LISTADO DE NOTA DE PAGOS POR VALIDAR</h5>
		
		<div style="float:right;">
			<button type="button" onClick="abrir_filtro('modal-filtros');" class="btn btn-primary" style="float: right;display: none;"><i class="mdi mdi-account-search"></i>  BUSCAR</button>			
			
			<?php
		
				//SCRIPT PARA CONSTRUIR UN BOTON
				$bt->titulo = "NUEVO PAGO";
				$bt->icon = "mdi-plus-circle";
				$bt->funcion = "aparecermodulos('catalogos/notaspago/fa_notaspago.php?idmenumodulo=$idmenumodulo','main');";
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

<div class="card">
	<div class="card-body">
		<div class="table-responsive" id="contenedor_Pagos">
			<div class="row" style="margin-bottom: 1em;">
				<div class="col-md-6">
				<label for="">TIPO DE PAGOS</label>
				<div class="" id="tipodepagos">
					
				</div>
			</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<label for="">BUSCAR:</label>
					<input type="text" id="buscadornota" class="form-control" onkeyup="BuscarEnLista('#buscadornota','.linotasporvalidar')" >
					<div class="notasporvalidar" style="height: 400px;
    overflow: scroll;margin-top: 1em;">
						<ul></ul>
					</div>
				</div>

				<div class="col-md-6 divdetalle" style="display: none;">
					<label for="">DETALLE DE NOTA</label>
					<div class="row">
						<div class="col-md-12">
							<span id="folionota" style="text-align: center;
    font-size: 18px;
    justify-content: center;
    font-weight: bold;
    display: flex;"></span>

    <span id="fechapago" style="text-align: center;
    font-size: 18px;
    justify-content: center;
    font-weight: bold;
    display: flex;margin-top: 1em;"></span>
						</div>
						
					</div>
					<div class="listadopagos" id="listadopagos"></div>
					<div>
						<ul class="list-group divmonedero" style="display: none;">
									<li class="list-group-item  align-items-center" style="color:">
								   <div class="row">
								   <div class="col-md-10">
								   		<p id="">Monedero</p>
					                    <p class="" style="
											    float: right;
											">$<span id="monedero">0.00</span></p>
					                   </div>
					                   <div class="col-md-2">

										    <span class="badge ">
										    </span>
								   		 </div>
								    
								    </div>

								  </li>
								</ul>
							</div>

							<div >
								<ul class="list-group" id="uldescuentos" style="background: #46b2e2;"></ul>
							</div>




								<div>
								<ul class="list-group divresumen" style="display: none;">
									<li class="list-group-item  align-items-center" style="background: #aeb3b7;">
								   <div class="row">
								   <div class="col-md-10">
								   		<p id="">Resumen</p>
					                    <p class="" style="
											    float: right;
											">$<span id="" class="lblresumen">0.00</span></p>
					                   </div>
					                   <div class="col-md-2">

										    <span class="badge ">
										    </span>
								   		 </div>
								    
								    </div>

								  </li>
								</ul>
							</div>

								<div>
								<ul class="list-group divcomision" style="display: none;">
									<li class="list-group-item  align-items-center" style="background: #aeb3b7;">
								   <div class="row">
								   <div class="col-md-10">
								   		<p id="">Comisión</p>
					                    <p class="" style="
											    float: right;
											">$<span id="" class="lblcomision">0.00</span></p>
					                   </div>
					                   <div class="col-md-2">

										    <span class="badge ">
										    </span>
								   		 </div>
								    
								    </div>

								  </li>
								</ul>
							</div>


								<div>
								<ul class="list-group divtotal" style="display: none;">
									<li class="list-group-item  align-items-center" style="background: #aeb3b7;">
								   <div class="row">
								   <div class="col-md-10">
								   		<p id="">Total</p>
					                    <p class="" style="
											    float: right;
											">$<span id="" class="lbltotal">0.00</span></p>
					                   </div>
					                   <div class="col-md-2">

										    <span class="badge ">
										    </span>
								   		 </div>
								    
								    </div>

								  </li>
								</ul>
							</div>
							<div class="row">
								<div class="col-md-12 imagenescomprobante">
									
								</div>
							</div>

							<div class="row">
								<div class="col-md-12">
									<label for="">MÉTODO DE PAGO:</label>
									<span id="tipopago"></span>
								</div>
								
								
							</div>

								<div class="row">
									<div class="col-md-12">
									<label for="">ESTATUS:</label>
								<span id="estatus"></span>
							</div>
							</div>

							<div class="row">
								<div class="col-md-12">
									<button class="btn btn-success btncambiarestatus" onclick="">ACEPTAR PAGO</button>
								</div>
							</div>

							<div class="row" style="margin-top:1em;">
								<div class="col-md-12">
									<button class="btn btn_rojo btncambiarcancelar" onclick="">CANCELAR PAGO</button>
								</div>
							</div>

							</div>
				</div>
			</div>
		<!-- 	<table id="tbl_pagos" cellpadding="0" cellspacing="0" class="table table-striped table-bordered">
				<thead>
					<tr>
						 
						<th style="text-align: center;">FOLIO </th> 
						<th style="text-align: center;">ALUMNO</th>
						<th style="text-align: center;">FECHA</th>
						<th style="text-align: center;">MÉTODO DE PAGO</th>
						<th style="text-align: center;">MONTO</th>
						<th style="text-align: center;">ESTATUS</th>

						<th style="text-align: center;">ACCI&Oacute;N</th>
					</tr>
				</thead>
				<tbody>
					
					<?php
					if($l_pagos_num== 0){
						?>
						<tr> 
							<td colspan="6" style="text-align: center">
								<h5 class="alert_warning">NO EXISTEN REGISTROS EN LA BASE DE DATOS.</h5>
							</td>
						</tr>
						<?php
					}else{
						do
						{
							?>
							<tr>
							
						
							
							<td style="text-align: center;"><?php echo $l_pagos_row['folio'];?></td>

							<td style="text-align: center;"><?php echo $l_pagos_row['nombre'].' '.$l_pagos_row['paterno'].' '.$l_pagos_row['materno'];?></td>

							<td style="text-align: center;"><?php echo date('d-m-Y H:i:s',strtotime($l_pagos_row['fecha']));?></td>
							<td style="text-align: center;"><?php echo $l_pagos_row['tipopago'];?></td>

							<td style="text-align: center;">$<?php echo $l_pagos_row['total'];?></td>
						
							<td style="text-align: center;"><?php echo $estatus[$l_pagos_row['estatus']];?></td>

							<td style="text-align: center; font-size: 15px;">

									<?php
													//SCRIPT PARA CONSTRUIR UN BOTON
									$bt->titulo = "";
									$bt->icon = "mdi-eye";
									$bt->funcion = "VerdatelleNotapago('".$l_pagos_row['idnotapago']."','".$l_pagos_row['idusuario']."','".$idmenumodulo."')";
									$bt->estilos = "";
									$bt->permiso = $permisos;
									$bt->tipo = 2;
									$bt->title="VER DETALLE";
									$bt->class='btn btn_accion';
									$bt->armar_boton();


									?>

								</td>


							</tr>
							<?php
						}while($l_pagos_row = $db->fetch_assoc($l_pagos));
					}
					?>
				</tbody>
			</table> -->
		</div>
	</div>
</div>



<div class="modal" id="modalaceptacion" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">ACEPTAR PAGO <span id="folionotaestatus" class="folionotaestatus"></span></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<div class="row">
      		<div class="col-md-12">
      			<form>
			  <div class="form-group">

			  	<label for="">DESCRIPCIÓN</label>
			  	<textarea name="" id="txtvalidacion" cols="10" rows="5" class="form-control"></textarea>
			  	<label for="" id="txtdescripcion"></label>
			  </div>
			</form>
      		</div>
      		<div class="col-md-6"></div>
      	</div>
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success btnvalidacion" onclick="GuardarValidacion()">GUARDAR</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">CERRAR</button>
      </div>
    </div>
  </div>
</div>


<div class="modal" id="modalcancelacion" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">CANCELAR PAGO <span id="folionotaestatus" class="folionotaestatus"></span></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<div class="row">
      		<div class="col-md-12">
      			<form>
			  <div class="form-group">

			  	<label for="">DESCRIPCIÓN</label>
			  	<textarea name="" id="txtcancelacion" cols="10" rows="5" class="form-control"></textarea>
			  	<label for="" id="txtdescripcioncancelacion"></label>
			  </div>
			</form>
      		</div>
      		<div class="col-md-6"></div>
      	</div>
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success btnvalidacioncancel" onclick="GuardarCancelacion()">GUARDAR</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">CERRAR</button>
      </div>
    </div>
  </div>
</div>




<script type="text/javascript">
	ObtenerNotasPorvalidar(0);
	ObtenerTipoDepagosNotasValidar();
</script>

