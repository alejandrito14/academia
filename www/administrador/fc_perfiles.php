<?php
require_once("../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();

if(!isset($_SESSION['se_SAS']))
{
	/* header("Location: ../login.php"); */ echo "login";
	exit;
}

require_once("../clases/conexcion.php");
require_once("../clases/class.PerfilesPermisos.php");
require_once("../clases/class.Funciones.php");

try
{
	$db= new MySQL();
	$pp = new PerfilesPermisos();
	$fu = new Funciones();
	
	$pp->db = $db;
	
	$idperfil=$_GET['id'];
	$pp->idperfiles=$idperfil;
	$datos=$pp->ObtenerInfoPerfil();//datos del ferfil
	
	$arrayMenus=$pp->ObtenerMenusPerfil();//cadena con todos los permisos de este perfil
	
	$query="SELECT * FROM modulos WHERE estatus=1 ORDER BY nivel";
	$resp=$db->consulta($query);
	$rows=$db->fetch_assoc($resp);
	$total=$db->num_rows($resp);
	
	$disabled='';
?>

<form id="alta_perfil" method="post" action="">
	<div class="card">
		
		<div class="card-body">
			<h5 class="card-title m-b-0" style="float: left;">EDITAR PERFIL</h5>
			<button type="button" onClick="var resp=MM_validateForm('nombre','','R'); if(resp==1){ if(Validar_Check()==1)
            { GuardarEspecial4('alta_perfil','administrador/ga_md_perfiles.php','administrador/vi_perfiles.php','main');}}" class="btn btn-success alt_btn" style="float: right;" <?php echo $disabled; ?>><i class="mdi mdi-content-save"></i> Guardar</button>

			<button type="button" onClick="aparecermodulos('administrador/vi_perfiles.php','main');" class="btn btn-primary" style="float: right;"><i class="mdi mdi-arrow-left-box"></i>VER LISTADO</button>
			<div style="clear: both;"></div>


		</div>
		
		<div class="card-body">
			<div class="form-group m-t-20">
				<label>*NOMBRE DEL PERFIL:</label>
				<input type="text" name="nombre" id="nombre" class="form-control" title="Nombre" placeholder="NOMBRE DEL PERFIL" value="<?php echo $fu->imprimir_cadena_utf8($datos['perfil']); ?>" />
			</div>

			<div class="form-group m-t-20">
				<label>ESTATUS :</label>
				<select id="estatus" name="estatus" class="form-control">
					<option <?php if($datos['estatus']==1){echo 'selected="selected"';}?> value="1">ACTIVADO</option>
					<option <?php if($datos['estatus']==0){echo 'selected="selected"';}?> value="0">DESACTIVADO</option>
				</select>
			</div>
		</div>
	</div>
	
	<div class="card">
		<div class="card-header">
			<h5 class="card-title m-b-0">MENUS</h5>
			<input type="hidden" name="tipo" id="tipo" value="1" /> 
		</div>
		<div class="card-body">
    		<fieldset>
				<label class="width_full"><span id="requerido">&bull;</span><?php echo  mb_strtoupper($fu->imprimir_cadena_utf8('Selecciona los menus a los cuales va a tener permisos este perfil')); ?></label>           
			</fieldset>
			<div class="row">
				<div class="col-md-12">
				<label for=""><input type="checkbox" name="todos" <?php echo $chekedtodo;?> id="todos" value="1" onchange="SeleccionarTodos(this);"/>SELECCIONAR TODOS</label>
			</div>
			
			
			<div class="row">

				<?php
            	if($total==0)
				{
					$disabled='disabled="disabled"';
				?>
					<div class="col-md-12">
						<p align="center">No Existen Modulos disponibles para crear Perfiles</p>
					</div>
                <?php
				}else{
					$contador_menus=0;
					do
					{
				?>
						<div class="col-lg-3" style="margin-bottom: 10px;">
							<div style="background: #eaeaea; padding: 10px; border-radius: 2px; border: solid 1px #ccc; min-height: 200px;">
								<h5 style="margin: 0; padding: 0;"><?php echo $fu->imprimir_cadena_utf8($rows['modulo']);?></h5>	
								<hr style="margin-top: 5px;"></hr>

								<input type="checkbox" class="" id="modulos_<?php echo $rows['idmodulos']; ?>" onchange="SeleccionarMenus('<?php echo $rows['idmodulos']; ?>')" />Todos

								<?php
								$querym="SELECT * FROM modulos_menu WHERE estatus=1 AND idmodulos=".$rows['idmodulos']." ORDER BY nivel";
								
								$respm=$db->consulta($querym);
								$rowsm=$db->fetch_assoc($respm);
								$totalm=$db->num_rows($respm);

								if($totalm==0)
								{
									echo 'No existen menus disponibles ';
								}
								else
								{
									$header_tbl = '';
									$line_height = 'line-height:46px;';
									do
									{	
										for($i=0;$i<count($arrayMenus);$i++)
										{
											$datos_array = explode("|",$arrayMenus[$i]);
											if($datos_array[0]==$rowsm['idmodulos_menu'])
											{
												$cheked='checked="checked"';
												
												if($datos_array[1] == 1){
													$cheked_insert = "checked";
												}
												
												if($datos_array[2] == 1){
													$cheked_update = "checked";
												}
												
												if($datos_array[3] == 1){
													$cheked_delete = "checked";
												}
												
												
												break;
											}
											else
											{
												$cheked="";
												$cheked_insert = "";
												$cheked_update = "";
												$cheked_delete = "";
											}
											
										}
										$contador_menus=$contador_menus+1;
										?>
										<div class="row" style="padding: 5px 0;">
											<div class="col-sm-6" style="<?php echo $line_height; ?>">
												<input type="checkbox" class="menu_<?php echo $rows['idmodulos'];?>"  onchange="SeleccionarPermisos('<?php echo $contador_menus;?>')" name="menu<?php echo $contador_menus;?>" <?php echo $cheked;?> id="menu<?php echo $contador_menus;?>" value="<?php echo $rowsm['idmodulos_menu'];?>" /><?php echo $fu->imprimir_cadena_utf8($rowsm['menu']);?><br />
											</div>
											
											<div class="col-sm-6">
												<table style="width: 100%;">
													<tr style="<?php echo $header_tbl; ?>">
														<td style="width: 33%;">A</td>
														<td style="width: 33%;">M</td>
														<td style="width: 33%;">E</td>
													</tr>
													<tr>
														<td><input type="checkbox" class="menu_<?php echo $rows['idmodulos'];?>" name="insertar<?php echo $contador_menus;?>" <?php echo $cheked_insert; ?> id="insertar<?php echo $contador_menus;?>" value="1" /></td>
														<td><input type="checkbox" class="menu_<?php echo $rows['idmodulos'];?>" name="modificar<?php echo $contador_menus;?>" <?php echo $cheked_update; ?> id="modificar<?php echo $contador_menus;?>" value="1" /></td>
														<td><input type="checkbox" class="menu_<?php echo $rows['idmodulos'];?>" name="borrar<?php echo $contador_menus;?>" <?php echo $cheked_delete; ?> id="borrar<?php echo $contador_menus;?>" value="1" /></td>
													</tr>
												</table>
											</div>
										</div>
							
									<?php
										$header_tbl = 'display:none;';
										$line_height = '';
									}while($rowsm=$db->fetch_assoc($respm));
								}
								?>
							</div>
						</div>
                    <?php
					}while($rows=$db->fetch_assoc($resp));					
				}
				?>            
			</div>
		</div>
	</div>
	
	<div class="card">
		<div class="card-body">
			<input type="hidden" name="tipo" id="tipo" value="2" />
   			<input type="hidden" name="idperfiles" id="idperfiles" value="<?php echo $idperfil?>" />
			<input type="hidden" name="cantidad_menu" id="cantidad_menu" value="<?php echo $contador_menus;?>" />
			
		</div>
	</div>
</form> 

<script>
	
	function SeleccionarTodos() {
		if( $('#todos').is(':checked') ) {
			   $("input[type=checkbox]").prop('checked',true);
			}else{

			 $("input[type=checkbox]").prop('checked',false);

			}
	}

	function SeleccionarMenus(id) {
		
			if($('#modulos_'+id).is(':checked')) {

			   $(".menu_"+id).prop('checked',true);
			}else{

			  $(".menu_"+id).prop('checked',false);

			}
	}
	function SeleccionarPermisos(contador) {


			if($('#menu'+contador).is(':checked')) {

			   $("#insertar"+contador).prop('checked',true);
			   $("#modificar"+contador).prop('checked',true);
			   $("#borrar"+contador).prop('checked',true);

			}else{

			  $("#insertar"+contador).prop('checked',false);
			  $("#modificar"+contador).prop('checked',false);
			  $("#borrar"+contador).prop('checked',false);

			}
		
	}
</script>
<?php
}
catch(Exception $e)
{
	echo $e;
}
?>