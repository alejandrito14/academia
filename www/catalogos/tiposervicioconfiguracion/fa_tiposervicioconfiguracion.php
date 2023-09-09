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


$tipousaurio = $_SESSION['se_sas_Tipo'];  //variables de sesion
$lista_empresas = $_SESSION['se_liempresas']; //variables de sesion
/*======================= TERMINA VALIDACIÓN DE SESIÓN =========================*/

//Importamos nuestras clases
require_once("../../clases/conexcion.php");
require_once("../../clases/class.TiposervicioConfiguracion.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Botones.php");
require_once("../../clases/class.Clasificacion.php");
require_once("../../clases/class.PoliticasAceptacion.php");
require_once("../../clases/class.Encuesta.php");
$idmenumodulo = $_GET['idmenumodulo'];

//Se crean los objetos de clase
$db = new MySQL();
$emp = new TiposervicioConfiguracion();
$f = new Funciones();
$bt = new Botones_permisos();

$emp->db = $db;

$emp->tipo_usuario = $tipousaurio;
$emp->lista_empresas = $lista_empresas;

$politicasaceptacion=new PoliticasAceptacion();
$politicasaceptacion->db=$db;
$obtenerpoliticasaceptacion=$politicasaceptacion->ObtenerPoliticasActivas();

$encuesta=new Encuesta();
$encuesta->db=$db;

$r_encuesta = $encuesta->ObtenerTodosActivoencuesta();
$a_encuesta = $db->fetch_assoc($r_encuesta);
$r_encuesta_num = $db->num_rows($r_encuesta);

//Validamos si cargar el formulario para nuevo registro o para modificacion
if(!isset($_GET['idtiposervicioconfiguracion'])){
	//El formulario es de nuevo registro
	$idtiposervicio = 0;
	$tipo="";
	//Se declaran todas las variables vacias
	 $dia='';
	 $mes='';
	 $anio='';
	 $hora='';
	 $estatus=1;
		$idpoliticaaceptacion=0;
	$col = "col-md-12";
	$ver = "display:none;";
	$titulo='NUEVO TIPO DE SERVICIO';

}else{
	//El formulario funcionara para modificacion de un registro

	//Enviamos el id del pagos a modificar a nuestra clase Pagos
	$idtiposervicio = $_GET['idtiposervicioconfiguracion'];
	$emp->idtiposervicioconfiguracion = $idtiposervicio;

	//Realizamos la consulta en tabla Pagos
	$result_categoriasservicio = $emp->buscartiposervicioconfiguracion();
	$result_categoriasservicio_row = $db->fetch_assoc($result_categoriasservicio);


	//Cargamos en las variables los datos 

	//DATOS GENERALES
	$nombre=$f->imprimir_cadena_utf8($result_categoriasservicio_row['nombre']);
	$descripcion=$result_categoriasservicio_row['descripcion'];
	$estatus = $f->imprimir_cadena_utf8($result_categoriasservicio_row['estatus']);
	$orden=$result_categoriasservicio_row['orden'];

	$nodedias=$result_categoriasservicio_row['nodedias'];

	$costo=$result_categoriasservicio_row['precio'];
	$totalclases=$result_categoriasservicio_row['totalclases'];
 $modalidad=$result_categoriasservicio_row['modalidad'];
$cantidaddias=$result_categoriasservicio_row['diasperiodo'];


$modalidaddepago=$result_categoriasservicio_row['modalidaddepago'];

$periodo=$result_categoriasservicio_row['periodo'];

$numeroparticipantes=$result_categoriasservicio_row['numeroparticipantes'];

$numeroparticipantesmax=$result_categoriasservicio_row['numeroparticipantesmax'];


	$montopagarparticipante=$result_categoriasservicio_row['montopagarparticipante'];
	$montopagargrupo=$result_categoriasservicio_row['montopagargrupo'];
	$modalidad=$result_categoriasservicio_row['modalidad'];

	$modalidadpago=$result_categoriasservicio_row['modalidaddepago'];
	$periodo=$result_categoriasservicio_row['periodo'];

	$numligarclientes=$result_categoriasservicio_row['numligarclientes'];
	$abiertocliente=$result_categoriasservicio_row['abiertocliente'];
	$abiertocoach=$result_categoriasservicio_row['abiertocoach'];
	$abiertoadmin=$result_categoriasservicio_row['abiertoadmin'];
	$ligarcliente=$result_categoriasservicio_row['ligarcliente'];
	$cancelaciondescripcion=$result_categoriasservicio_row['cancelaciondescripcion'];
	$reembolso=$result_categoriasservicio_row['reembolso'];
	$cantidadreembolso=$result_categoriasservicio_row['cantidadreembolso'];
		$tiporeembolso=$result_categoriasservicio_row['tiporeembolso'];

	$asignadocliente=$result_categoriasservicio_row['asignadocliente'];
	$asignadocoach=$result_categoriasservicio_row['asignadocoach'];
	$asignadoadmin=$result_categoriasservicio_row['asignadoadmin'];
	$tiempoaviso=$result_categoriasservicio_row['tiempoaviso'];
	$tituloaviso=$result_categoriasservicio_row['tituloaviso'];
	$descripcionaviso=$result_categoriasservicio_row['descripcionaviso'];
	$politicasca=$result_categoriasservicio_row['politicascancelacion'];
	$politicasaceptacion=$result_categoriasservicio_row['politicasaceptacion'];
	$asistencia=$result_categoriasservicio_row['controlasistencia'];

$idpoliticaaceptacion=$result_categoriasservicio_row['idpoliticaaceptacion'];
//var_dump($idpoliticaaceptacion);die();
$aceptarserviciopago=$result_categoriasservicio_row['aceptarserviciopago'];



	$col = "col-md-12";
	$ver = "";
		$titulo='EDITAR TIPO DE SERVICIO';

}

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

?>

<form id="f_categoriasservicio" name="f_categoriasservicio" method="post" action="">
	<div class="card">
		<div class="card-body">
			<h4 class="card-title m-b-0" style="float: left;"><?php echo $titulo; ?></h4>

			<div style="float: right;position:fixed!important;z-index:10;right:0;margin-right:2em;width: 20%;">
				
				<?php
			
					//SCRIPT PARA CONSTRUIR UN BOTON
					$bt->titulo = "GUARDAR";
					$bt->icon = "mdi mdi-content-save";
					$bt->funcion = "var resp=MM_validateForm('v_nombre','','R'); if(resp==1){ GuardarTipoServicioConfiguracion('f_categoriasservicio','catalogos/tiposervicioconfiguracion/vi_tiposervicioconfiguracion.php','main','$idmenumodulo');}";
					$bt->estilos = "float: right;";
					$bt->permiso = $permisos;
					$bt->class='btn btn-success';
				
					//validamos que permiso aplicar si el de alta o el de modificacion
				if($idPagos == 0)
					{
						$bt->tipo = 1;
					}else{
						$bt->tipo = 2;
					}
			
					$bt->armar_boton();
				?>
				
				<!--<button type="button" onClick="var resp=MM_validateForm('v_empresa','','R','v_direccion','','R','v_tel','','R','v_email','',' isEmail R'); if(resp==1){ GuardarEmpresa('f_empresa','catalogos/empresas/fa_empresas.php','main');}" class="btn btn-success" style="float: right;"><i class="mdi mdi-content-save"></i>  GUARDAR</button>-->
				
				<button type="button" onClick="aparecermodulos('catalogos/tiposervicioconfiguracion/vi_tiposervicioconfiguracion.php?idmenumodulo=<?php echo $idmenumodulo;?>','main');" class="btn btn-primary" style="float: right; margin-right: 10px;"><i class="mdi mdi-arrow-left-box"></i>VER LISTADO</button>
				<div style="clear: both;"></div>
				
				<input type="hidden" id="id" name="id" value="<?php echo $idtiposervicio; ?>" />
			</div>
			<div style="clear: both;"></div>
		</div>
	</div>
	
	
	<div class="row">
		<div class="<?php echo $col; ?>">
			<div class="card">
				<div class="card-header" style="padding-bottom: 0; padding-right: 0; padding-left: 0; padding-top: 0;">
					<!--<h5>DATOS</h5>-->

				</div>

				<div class="card-body">
					
					<div class="col-md-12">
					<div class="tab-content tabcontent-border">
						<div class="tab-pane active show" id="generales" role="tabpanel">
							 <div class="card"  id="divmodalidadcobro" style="">
<div class="card-body">

					
							
							<div class="row">
								<div class="col-md-6">
								<label>*NOMBRE:</label>
								<input type="text" class="form-control" id="v_nombre" name="v_nombre" value="<?php echo $nombre; ?>" title="NOMBRE" placeholder='NOMBRE'>
							</div>
</div>

	<div class="row">
								<div class="col-md-6">
							
								<label>*DESCRIPCIÓN:</label>
								<input type="text" class="form-control" id="v_descripcion" name="v_descripcion" value="<?php echo $descripcion; ?>" title="DESCRIPCIÓN" placeholder='DESCRIPCIÓN'>
							</div>
						</div>
					</div>
				</div>
						

						 <div class="card"  id="divmodalidadcobro" style="">
				<div class="card-header" style="margin-top: 1em;">
					<h5>ASIGNAR COSTO</h5>

				</div>
				<div class="card-body">

				
				     


				          <div class="row">
				          	<div class="col-md-6">
							<div class="form-group m-t-20" id="preciounitariodiv" style="padding-top: 1em;">
								<label for="" id="lblcostounitario">* COSTO UNITARIO $:</label>
								<input type="text" id="v_costo" class="form-control" value="<?php echo $costo; ?>" placeholder="COSTO UNITARIO" title="COSTO UNITARIO"  onkeyup="/^\d+(?:\.\d{1,2})?$/.test(this.value)?'inherit':this.value=''" onblur="CambiarNumeros()">

							</div>

							
							</div>
						
					</div>
				</div>

				<div class="card">
					<div class="card-header">
						<h5>MODALIDAD DE COBRO</h5></div>
					<div class="card-body">
						
							
					<div class="col-md-12">
						<p for=""><label for="" class="divmodo">* MONTO:</label></p>

						<div class="col-md-6" style="float: left;width: 30%;">
								 	<div class="form-check">
					               
					                  <input type="radio" class=" " name="v_grupo" value="1" id="v_individual" style="" onclick="ValidarCheckmodalidad(1)">
					                   <label class="form-check-label" style=" padding-top: 0.3em;">
										MONTO FIJO
					                </label>
				                </div>
				              </div>


				              <div class="col-md-6" style="float: left;width: 30%;">
								 	<div class="form-check">
					                 <input type="radio" class=" " name="v_grupo" value="2" id="v_grupal" style="" onclick="ValidarCheckmodalidad(2)">
					                   <label class="form-check-label" style=" padding-top: 0.3em;">
										MONTO DIVIDIDO
					                </label>
				                </div>
				              </div>
				             </div>


				              <div class="" style="display: none;margin-top: 20px;
    padding-top: 20px;" id="divaceptarserviciopago" >
				              	<div class="col-md-6">

																			   		 <div class="" style="    margin-left: 10px;margin-top: 10px;">
																			   		 		<input type="checkbox" id="v_aceptarserviciopago" value="0" onchange="HabilitarOpcionaceptarserviciopago()">
																			   		 		
																							<label for="" style="margin-left: 3px;">ACEPTAR SERVICIO EN EL PAGO</label>

																							<span style="width: 20px;margin-left: 0.5em;"></span>
																							

																							</div>
																						</div>
				              </div>
				          </div>
				      </div>
						
			
				</div>

				<div class="card">

				<div class="card-header" style="">
							<h5>NÚMERO DE PARTICIPANTES</h5>

						</div>

				<div class="card-body">

					<div class="col-md-6" >

							   <div class="form-group m-t-20">
								<label for="" id="lblminimo">* MÍNIMO:</label>
								<input type="number" id="v_numparticipantesmin" class="form-control" value="<?php echo $numeroparticipantes; ?>" placeholder="MÍNIMO" title="MÍNIMO">

							</div>


 
							   <div class="form-group m-t-20">
								<label for="" id="lblmaximo">* MÁXIMO:</label>
								<input type="number" id="v_numparticipantesmax" class="form-control" value="<?php echo $numeroparticipantesmax; ?>" placeholder="MÁXIMO" title="MÁXIMO">

							</div>

						</div>
						</div>
					</div>
								

							
				   <div class="card">

							<div class="card-header" style="">
							<h5 >PERIODOS DE COBRO</h5>

							</div>

							<div class="card-body">
							


							 <div class="col-md-6">
								<label for="" id="lblmaximo">* CANTIDAD DE DÍAS:</label>
								<input type="number" id="v_cantidaddias" class="form-control" value="<?php echo $cantidaddias;?>" placeholder="CANTIDAD DE DÍAS" title="CANTIDAD DE DÍAS">

							</div>
				              		
				              </div>

				              <div class="row" style="float: left;width: 50%;">

				              </div>



				<!-- 		</div> -->

					<!-- 	<div style="    margin-left: 1em;" id="periodos"></div> -->


			

						
					</div>


					

	
				<div class="card" style="" id="divasistencia">
				<div class="card-header" style="margin-top: 1em;">
					<h5>CONTROLAR ASISTENCIA</h5>

				</div>
				<div class="card-body">
					<div class="row">
						<div class="col-md-6">

					   		 <div class="form-group m-t-20">
									<label for="">ASISTENCIA</label>

									<span style="width: 20px;margin-left: 0.5em;"></span>
										<input type="checkbox" id="v_asistencia" >

									</div>
								</div>

					</div>
				</div>
			</div>

				  	<div class="card" style="" id="divpoliticas">
				<div class="card-header" style="margin-top: 1em;">
					<h5>POLÍTICAS DE CANCELACIÓN</h5>

				</div>
				<div class="card-body">
					<div class="row">
								<div class="col-md-6">

								

					   		 <div class="form-group m-t-20">
									<label for="">REEMBOLSO</label>

									<span style="width: 20px;margin-left: 0.5em;"></span>
										<input type="checkbox" id="v_reembolso" onchange="HabilitarcantidadReembolso()">

									</div>

							<div class="form-group m-t-20 divcantidadreembolso" style="display: none;">
									<label for="">TIPO DE REEMBOLSO:</label>
								<select name="v_tipodescuentoreembolso" id="v_tipodescuentoreembolso" class="form-control">
									<option value="-1" selected="">SELECCIONAR TIPO DE REEMBOLSO</option>
									<option value="0">PORCENTAJE</option>
									<option value="1">MONTO</option>
								</select>
							</div>

 								<div class="form-group m-t-20 divcantidadreembolso" style="display: none;">
									<label for="">CANTIDAD:</label>
									<input type="text" id="v_cantidadreembolso" class="form-control" value="<?php echo $cantidadreembolso; ?>">
								</div>

							

								<div class="form-group m-t-20" style="display: none;">
									<label for="" id="lbldescripcionpolitica">DESCRIPCIÓN:</label>
									<textarea name="" id="v_politicascancelacion" cols="20" rows="5" class="form-control"><?php echo $politicasca; ?></textarea>

								</div>



								<div class="form-group m-t-20">
									<label for="">CANCELADO POR CLIENTE</label>
									<span style="width: 20px;margin-left: 0.5em;"></span>
									<input type="checkbox" id="v_asignadocliente" >
								</div>

								<div class="form-group m-t-20">
									<label for="">CANCELADO POR COACH</label>
									<span style="width: 20px;margin-left: 0.5em;"></span>
									<input type="checkbox" id="v_asignadocoach" >
								</div>

									<div class="form-group m-t-20">
									<label for="">CANCELADO POR ADMIN</label>
									<span style="width: 20px;margin-left: 0.5em;"></span>
									<input type="checkbox" id="v_asignadoadmin">
								</div>

					  </div>
					</div>
				</div>
			</div>

				<div class="card" style="" id="divcoachs">
				<div class="card-header" style="margin-top: 1em;">
					<h5>ASIGNACIONES</h5>

				</div>
				<div class="card-body">
					<div class="row">
								<div class="col-md-6">
									 <div class="form-group m-t-20">
										<label for="">PERMITIR ASIGNAR AL CLIENTE</label>
										<span style="width: 20px;margin-left: 0.5em;"></span><input type="checkbox" id="v_abiertocliente">
									</div>

 								<div class="form-group m-t-20">
										<label for="">PERMITIR ASIGNAR AL COACH</label>
									<span style="width: 20px;margin-left: 0.5em;"></span><input type="checkbox" id="v_abiertocoach">
								</div>

 								<div class="form-group m-t-20">
								<label for="">PERMITIR ASIGNAR AL ADMIN</label>
								<span style="width: 20px;margin-left: 0.5em;"></span><input type="checkbox" id="v_abiertoadmin">
								</div>

							

								


								</div>
							</div>
						</div>

					  </div>


					  <div class="card" style="" id="divcoachs">
				<div class="card-header" style="margin-top: 1em;">
					<h5>LIGAR CLIENTES</h5>

				</div>
				<div class="card-body">
						<div class="form-group m-t-20">
									<label for="">PERMITIR LIGAR CLIENTES</label>
									<span style="width: 20px;margin-left: 0.5em;"></span>
									<input type="checkbox" id="v_ligarclientes" onchange="Permitirligar()">
								</div>
								<div class="col-md-6">

								<div class="form-group m-t-20" id="cantidadligar" style="display: none;">
									<label for="">CANTIDAD</label>
									<input type="number" class="form-control" id="v_numligarclientes" value="<?php echo $numligarclientes; ?>">
								</div>
							</div>
				</div>
			</div>

					<div class="card" style="display: none;" id="divpoliticas">
							<div class="card-header" style="margin-top: 1em;">
								<h5>DESCUENTOS</h5>

							</div>
						<div class="card-body">
								<div class="row">
								<div class="col-md-6">
									<div class="card-body" id="lclientesdiv" style="display: block; padding: 0;">
                
                    <div class="form-group m-t-20">	 
						<input type="text" class="form-control" name="buscadordescuentos_1" id="buscadordescuentos_" placeholder="Buscar" onkeyup="BuscarEnLista('#buscadordescuentos_','.descuentos_')">
				    </div>
                    <div class="descuentos"  style="overflow:scroll;height:100px;overflow-x: hidden" id="descuentos_<?php echo $a_descuentos['iddescuento'];?>">
					    <?php     	
							if ($r_descuentos_num>0) {	
						    	do {
						?>
						    	<div class="form-check descuentos_"  id="cli_<?php echo $a_descuentos['iddescuento'];?>">
						    	    <?php 	
						    			$valor="";
           	 $nombre=mb_strtoupper($f->imprimir_cadena_utf8($a_descuentos['titulo']));
						    		?>
									  <input  type="checkbox"  value="<?php echo $a_descuentos['iddescuento']?>" class=" chkdescuento" id="inputdescuento_<?php echo $a_descuentos['iddescuento']?>" <?php echo $valor; ?>>
									  <label class="form-check-label" for="flexCheckDefault" style="margin-top: 0.2em;"><?php echo $nombre; ?></label>
								</div>						    		
						    	<?php
						    		} while ($a_descuentos = $db->fetch_assoc($r_descuentos));
     					    	 ?>
						    	<?php } ?>    
								    </div>
				                </div> 
							</div>
						</div>
					</div>
				</div>


	<div class="card" id="divpoliticas" style="display: none;">
							<div class="card-header" style="margin-top: 1em;">
								<h5>MEMBRESÍAS</h5>

							</div>
						<div class="card-body">
								<div class="row">
								<div class="col-md-6">
									<div class="card-body" id="lclientesdiv" style="display: block; padding: 0;">
                
                    <div class="form-group m-t-20">	 
						<input type="text" class="form-control" name="buscadormembresia_1" id="buscadormembresia_" placeholder="Buscar" onkeyup="BuscarEnLista('#buscadormembresia_','.membresia_')">
				    </div>
                    <div class="membresia"  style="overflow:scroll;height:100px;overflow-x: hidden" id="membresia_<?php echo $a_membresia['idmembresia'];?>">
					   <!--  <?php     	
							if ($r_membresia_num>0) {	
						    	do {
						?>
						    	<div class="form-check membresia_"  id="cli_<?php echo $a_membresia['idmembresia'];?>">
						    	    <?php 	
						    			$valor="";
                 $nombre=mb_strtoupper($f->imprimir_cadena_utf8($a_membresia['titulo']));
						    		?>
									  <input  type="checkbox" onchange="DescuentoSeleccionado()"  value="<?php echo $a_membresia['idmembresia']?>" class="form-check-input chkmembresia" id="inputmembresia_<?php echo $a_membresia['idmembresia']?>" <?php echo $valor; ?>>
									  <label class="form-check-label" for="flexCheckDefault" style="margin-top: 0.2em;"><?php echo $nombre; ?></label>
								</div>						    		
						    	<?php
						    		} while ($a_membresia = $db->fetch_assoc($r_membresia));
     					    	 ?>
						    	<?php } ?>  -->   
								    </div>
				                </div> 
							</div>
						</div>
					</div>
				</div>

					<div class="card" id="divdias"  >
				<div class="card-header" style="margin-top: 1em;">
					<h5>ENCUESTAS</h5>
				</div>
				<div class="card-body">
					<div class="col-md-6">
						 <div class="form-group m-t-20">	 
						<input type="text" class="form-control" name="buscadorencuesta_1" id="buscadorencuesta_" placeholder="Buscar" onkeyup="BuscarEnLista('#buscadorencuesta_','.encuesta_')">
				    </div>
       <div class="encuesta"  style="overflow:scroll;height:100px;overflow-x: hidden;    padding-top: 10px;" id="encuesta_">
					    <?php     	
							if ($r_encuesta_num>0) {	
						    	do {
						?>
						    	<div class="form-check encuesta_"  id="cli_<?php echo $a_encuesta['idencuesta'];?>">
						    	    <?php 	
						    			$valor="";
              $nombre=mb_strtoupper($f->imprimir_cadena_utf8($a_encuesta['titulo']));
						    		?>

						    		<div class="row" style="    padding-bottom: 10px;">
						    				<div class="col-md-2">
						    					 <input  type="checkbox" onchange=""  value="<?php echo $a_encuesta['idencuesta']?>" class="chkencuesta" id="inputencuesta_<?php echo $a_encuesta['idencuesta']?>" <?php echo $valor; ?>>
						    				</div>
						    		<div class="col-md-6">
						    			
						    			 <label class="form-check-label" for="flexCheckDefault" style="margin-top: 0.2em;"><?php echo $nombre; ?></label>
						    		</div>
						    		 </div>
									 
									 
								</div>						    		
						    	<?php
						    		} while ($a_encuesta = $db->fetch_assoc($r_encuesta));
     					    	 ?>
						    	<?php } ?> 
								    </div>
				                </div> 
							</div>
						</div>




				<div class="" id="aceptacion" role="tabpanel" aria-labelledby="aceptacion-tab">
				 <div class="card" style="" id="">
						<div class="card-header" style="margin-top: 1em;">
							<h5>POLÍTICAS DE ACEPTACIÓN</h5>

						</div>
						<div class="card-body">
							<div class="row">
								<div class="col-md-6">
								<div class="form-group m-t-20" style="">
									<label for="" id="lblseleccionarpoliticaaceptacion">*POLÍTICA DE ACEPTACIÓN</label>
									<select name="" id="v_politicasaceptacionid" class="form-control">
										
										<option value="0" >SELECCIONAR POLÍTICA DE ACEPTACIÓN</option>

									<?php if (count($obtenerpoliticasaceptacion)){

										for ($i=0; $i <count($obtenerpoliticasaceptacion) ; $i++) {  ?>
											<option value="<?php echo $obtenerpoliticasaceptacion[$i]->idpoliticasaceptacion;?>"><?php echo $obtenerpoliticasaceptacion[$i]->descripcion; ?>
												
											</option>
										
										
									<?php 
									}
								} ?>
									</select>

								</div>
							</div>
						</div>

						</div>
					</div>

							<div class="card" style="">
								<div class="card-header" style="margin-top: 1em;">
									<h5>AVISOS</h5>

								</div>
								<div class="card-body">
										<div class="row">
								<div class="col-md-6">
									<div class="form-group m-t-20">
											<label for="">TIEMPO DE AVISO(minutos antes)</label>
											<input type="number" id="v_tiempoaviso" class="form-control" value="<?php echo $tiempoaviso; ?>">
								</div>

								<div class="form-group m-t-20" style="display: none;">
											<label for="">MENSAJE:</label>
											<input type="text" id="v_tituloaviso" class="form-control" value="<?php echo $tituloaviso; ?>">
								</div>

								<!-- 	<div class="form-group m-t-20">
												<label for="">DESCRIPCIÓN:</label>
												<input type="text" id="v_descripcionaviso" class="form-control" value="<?php echo $descripcionaviso ?>">
									</div> -->

								</div>
							</div>

								</div>

							</div>
					</div>

						<div class="form-group m-t-20" style="display: none;">
											<label for="">ORDEN</label>
											<input type="number" id="v_orden" class="form-control" value="0">
								</div>


							
						<div class="col-md-6">
							<label>ESTATUS:</label>
							<select name="v_estatus" id="v_estatus" title="Estatus" class="form-control"  >
								<option value="0" <?php if($estatus == 0) { echo "selected"; } ?> >DESACTIVADO</option>
								<option value="1" <?php if($estatus == 1) { echo "selected"; } ?> >ACTIVO</option>
							</select>
						</div>

						
							
						</div>
						
						
						</div>
					</div>
				</div>
			</div>
		</div>


	</div>
</form>
<style>

.material-switch > input[type="checkbox"] {
    display: none;
}

.material-switch > label {
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    width: 40px;
}

.material-switch > label::before {
    background: rgb(0, 0, 0);
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    content: '';
    height: 16px;
    margin-top: -8px;
    position: absolute;
    opacity: 0.3;
    transition: all 0.4s ease-in-out;
    width: 40px;
}

.material-switch > label::after {
    background: rgb(255, 255, 255);
    border-radius: 16px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    content: '';
    height: 24px;
    left: -4px;
    margin-top: -8px;
    position: absolute;
    top: -4px;
    transition: all 0.3s ease-in-out;
    width: 24px;
}

.material-switch > input[type="checkbox"]:checked + label::before {
    background: inherit;
    opacity: 0.5;
}

.material-switch > input[type="checkbox"]:checked + label::after {
    background: #4caf50; /* Cambio de color cuando está marcado */
    left: 16px; /* Cambio de posición del círculo */
}


</style>
<script>

	// Obtén todos los elementos <input type="checkbox">
var checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Recorre cada elemento y reemplázalo con la estructura de div personalizada
checkboxes.forEach(function(checkbox) {
  var div = document.createElement('div');
  div.className = 'material-switch pull-right';

  var newCheckbox = document.createElement('input');
  newCheckbox.id = checkbox.id;
  newCheckbox.type = 'checkbox';
  newCheckbox.value = checkbox.value;
  newCheckbox.onchange = checkbox.onchange; // Copia la función onchange del checkbox original
  newCheckbox.className=checkbox.className;

  var label = document.createElement('label');
  label.setAttribute('for', checkbox.id);
  label.className = 'label-success';

  div.appendChild(newCheckbox);
  div.appendChild(label);

  // Agregar nuevo div al DOM reemplazando el checkbox original
  checkbox.parentNode.replaceChild(div, checkbox);

  // Agregar evento onchange al nuevo div
  div.addEventListener('change', function() {
    // Propagar el evento onchange al input interno
    checkbox.checked = div.querySelector('input').checked;

    // Ejecutar la función onchange copiada, si existe
    if (typeof newCheckbox.onchange === 'function') {
      newCheckbox.onchange();
    }

    // Tu lógica adicional aquí
    if ($("#" + checkbox.id).is(':checked')) {
      $("#" + checkbox.id).attr('checked', true);
    } else {
      $("#" + checkbox.id).attr('checked', false);
    }
  });
});
	

	var idtiposervicio='<?php echo $idtiposervicio; ?>';
	$("#v_tipo").val(0);
	if (idtiposervicio>0) {
		var idclasificacion='<?php echo $idclasificacion;  ?>';

		$("#v_tipo").val(idclasificacion);

		ObtenerTipoServicioConfiguracionEncuesta(idtiposervicio);
	}

var aceptarserviciopago='<?php echo $aceptarserviciopago; ?>';

	 var modalidad='<?php echo $modalidad;?>';

		 if (modalidad==1) {
		 	 $("#v_individual").attr('checked',true);
				ValidarCheckmodalidad(1);
		 	 if (aceptarserviciopago==1) {

		 	 	$("#v_aceptarserviciopago").val(1);
		 	 	$("#v_aceptarserviciopago").attr('checked',true);

		 	 }
		 }

		 if (modalidad==2) {
		 	 $("#v_grupal").attr('checked',true);
		 }

		 
		 var numparticipantes='<?php echo $numeroparticipantes; ?>';
		 var numparticipantesmax='<?php echo $numeroparticipantesmax; ?>';

		var totalclases='<?php echo $totalclases; ?>';
		var montopagarparticipante='<?php echo $montopagarparticipante; ?>';
		var montopagargrupo	='<?php echo $montopagargrupo ?>';
		var precio	='<?php echo $costo ?>';

		$("#v_totalclase").val(totalclases);
		$("#v_costo").val(precio);
		$("#v_montopagarparticipante").val(montopagarparticipante);
		$("#v_montopagargrupo").val(montopagargrupo);
		$("#v_numparticipantesmin").val(numparticipantes);

		$("#v_numparticipantesmax").val(numparticipantesmax);

		var modalidadpago='<?php echo $modalidadpago; ?>';
		var periodo='<?php echo $periodo; ?>';
	

		 if (modalidadpago==1) {
		 	 $("#v_habilitarevento").attr('checked',true);
		 	 $("#v_periodo").val(0);
		 }

		 if (modalidadpago==2) {
		 	 $("#v_habilitarperiodo").attr('checked',true);
		 	 $("#v_periodo").val(periodo);
		 }




		
	

	abiertocliente='<?php echo $abiertocliente; ?>';
	abiertocoach='<?php echo $abiertocoach; ?>';
	abiertoadmin='<?php echo $abiertoadmin; ?>';
	ligarcliente='<?php echo $ligarcliente; ?>';
	reembolso='<?php echo $reembolso; ?>';
	tiporeembolso='<?php echo $tiporeembolso ?>';
	asistencia='<?php echo $asistencia; ?>';
	//cantidadreembolso='<?php echo $cantidadreembolso; ?>';
	asignadocliente='<?php echo $asignadocliente; ?>';
	asignadocoach='<?php echo $asignadocoach; ?>';
	asignadoadmin='<?php echo $asignadoadmin; ?>';
	
	/*tiempoaviso='<?php echo $tiempoaviso; ?>';
	tituloaviso='<?php echo $tituloaviso; ?>';
	descripcionaviso='<?php echo $descripcionaviso; ?>';
	politicasca='<?php echo $politicasca; ?>';*/

		if (abiertocliente==1) {
			$("#v_abiertocliente").attr('checked',true);
		}

		if (abiertocoach==1) {
			$("#v_abiertocoach").attr('checked',true);
		}
		if (abiertoadmin==1) {

			$("#v_abiertoadmin").attr('checked',true);
		}

		if (ligarcliente==1) {
			
			$("#v_ligarclientes").attr('checked',true);
		}

		if (reembolso==1) {
			
			$("#v_reembolso").attr('checked',true);
			$("#v_tipodescuentoreembolso").val(tiporeembolso);
		
			HabilitarcantidadReembolso();
		}

		if (asignadocliente==1) {
			
			$("#v_asignadocliente").attr('checked',true);
		}

		if (asignadoadmin==1) {
			
			$("#v_asignadoadmin").attr('checked',true);
		}
		if (asignadocoach==1) {
			
			$("#v_asignadocoach").attr('checked',true);
		}

		if (asistencia==1) {
		$("#v_asistencia").attr('checked',true);
	
		}

	Permitirligar();
	HabilitarcantidadReembolso();

	CambioPeriodo();


		var idpoliticaaceptacion='<?php echo $idpoliticaaceptacion;?>';

	$("#v_politicasaceptacionid").val(idpoliticaaceptacion);

</script>



<?php

?>