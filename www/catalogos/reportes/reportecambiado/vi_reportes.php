<?php
require_once("../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();

if(!isset($_SESSION['se_SAS']))
{
	//header("Location: ../../login.php");
	echo "login";
	exit;
}

$idmenumodulo = $_GET['idmenumodulo'];

$tipousaurio = $_SESSION['se_sas_Tipo'];  //variables de sesion
$lista_empresas = $_SESSION['se_liempresas']; //variables de sesion

require_once("../../clases/conexcion.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Reportes.php");
require_once("../../clases/class.Botones.php");

$db = new MySQL();
$fu = new Funciones();
$rpt = new Reportes();
$bt = new Botones_permisos(); 

$rpt->db = $db;


// Consultas
$l_reportes = $rpt->Lista_reportes();
$l_reportes_row = $db->fetch_assoc($l_reportes);
$l_reportes_num = $db->num_rows($l_reportes);

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

	<div class="card" style="background-color: #C9C9C9; border-radius: 4px;">
		<div class="card-body">
			<h5 class="card-title" style="float: left; margin-top: 5px;">REPORTES</h5>	
			<div style="clear: both;"></div>

				<div class="row">
					<div class="form-group col-md-6">
						<label for="exampleInputEmail1">LISTA DE REPORTES</label>
						<select name="v_id_reportes" id="v_id_reportes" class="form-control"  onchange="CargarFiltrosreportes($(this).val())">
							  <option value="0">ESCOGER REPORTE</option>

							<?php 

								if ($l_reportes_num==0) { ?>

							  <option value="0">NO SE ENCONTRARON REPORTES EN LA BASE</option>

									
							<?php	}else{


								do
								{
							?>
									<option value="<?php echo $l_reportes_row['idreporte']; ?>"><?php echo $fu->imprimir_cadena_utf8($l_reportes_row['nombre']); ?></option>
									<?php
								}while($l_reportes_row = $db->fetch_assoc($l_reportes));

							}
									?>
																	  
						</select>
					</div>
				</div>
			<div class="row" >
				  <div class="col-md-6" id="divclientesmult" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>Cliente</label>
				  	<select id="vst_clientesmult" class="form-control" multiple="multiple" style="width: 100%;">
				  	</select>
				   	</div>
				  </div>
				</div>

				<div class="row" >
				  <div class="col-md-6" id="divcatproductos" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>Cat. De producto / Sub categoría</label>
				  	<select id="vst_catprductos" class="form-control" multiple="multiple" style="width: 100%;">
				  	</select>
				   	</div>
				  </div>
				</div>	
				

				<div class="row" >
				  <div class="col-md-6" id="divproductos" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>Productos</label>
				  	<select id="vst_prductos" class="form-control" multiple="multiple" style="width: 100%;">
				  	</select>
				   	</div>
				  </div>
				</div>	
				
				<div class="row" >
				  <div class="col-md-6" id="divproductos" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>Productos</label>
				  	<select id="vst_prductos" class="form-control" multiple="multiple" style="width: 100%;">
				  	</select>
				   	</div>
				  </div>
				</div>	
				
				<div class="row" >
				  <div class="col-md-6" id="divclientes" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>Clientes</label>
				  	<select id="vst_clientes" class="chosen-select" style="width: 100%;">
				  	</select>
				   	</div>
				  </div>
				</div>
			<div class="row" >
				  <div class="col-md-6" id="div_anio" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>AÑO</label>
				  	<select id="v_anio" class="form-control" style="width: 100%;">
				  	</select>
				   	</div>
				  </div>
				</div>
			<div class="row" >
				  <div class="col-md-6" id="div_mes" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>MES</label>
				  	<select id="v_mes" class="form-control"  style="width: 100%;">
				  		<option value="1">Enero</option>
				  		<option value="2">Febrero</option>
				  		<option value="3">Marzo</option>
				  		<option value="4">Abril</option>
				  		<option value="5">Mayo</option>
				  		<option value="6">Junio</option>
				  		<option value="7">Julio</option>
				  		<option value="8">Agosto</option>
				  		<option value="9">Septiembre</option>
				  		<option value="10">Octubre</option>
				  		<option value="11">Noviembre</option>
				  		<option value="12">Diciembre</option>
				  	</select>
				   	</div>
				  </div>
				</div>
		
			<div class="row" >
				  <div class="col-md-6" id="divtiposervicioconfiguracion" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>CATEGORÍAS</label>
				  	<select id="v_tiposervicioconfiguracion" class="form-control" multiple="multiple" style="width: 100%;">
				  		
				  	</select>
				   	</div>
				  </div>
				</div>

				<div class="row" >
				  <div class="col-md-6" id="divcategoria" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>SUB CATEGORIA</label>
				  	<select id="vst_categoria" class="form-control" multiple="multiple" style="width: 100%;">
				  	</select>
				   	</div>
				  </div>
				</div>
				<div class="row" >
				  <div class="col-md-6" id="divcategoriaservicio" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>SUB SUB CATEGORIA</label>
				  	<select id="vst_categoriaservicio" class="form-control" multiple="multiple" style="width: 100%;">
				  	</select>
				   	</div>
				  </div>
				</div>
			

				<div class="row" >
				  <div class="col-md-6" id="div_horario" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>HORARIO</label>
				  	<select id="vst_horario" class="form-control" multiple="multiple" style="width: 100%;">
				  	</select>
				   	</div>
				  </div>
				</div>
				
				<div class="row" >
				  <div class="col-md-6" id="div_cancha" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>CANCHA</label>
				  	<select id="vst_cancha" class="form-control" multiple="multiple" style="width: 100%;">
				  	</select>
				   	</div>
				  </div>
				</div>
					 <div class="row" id="fechainicial">

				   <div class="col-md-6" >
				   	<div class="form-group">
				  		 <label>FECHA INICIAL:</label>

			            <div class='input-group date' id='datetimepicker1'>
			               <input type='date' class="form-control" id="fechainicio" />
			               <span class="input-group-addon">
			               <span class="glyphicon glyphicon-calendar"></span>
			               </span>
			           </div>
				  </div>

				</div>
			</div>
			<div class="row" id="horainicio">

				  <div class="col-md-6" >
				  	<div class="form-group">
				  		<label>HORA INICIO:</label>

			            <div class='input-group date' id='datetimepicker1'>
			               <input type='time' class="form-control" id="v_horainicio" value="00:00" />
			               <span class="input-group-addon">
			               <span class="glyphicon glyphicon-calendar"></span>
			               </span>
			            </div>
				  </div>
				</div>

			</div>			
				
 	 <div class="row" id="fechafinal">

				   <div class="col-md-6" >
				   	<div class="form-group">
				  		 <label>FECHA FINAL:</label>

			            <div class='input-group date' id='datetimepicker2'>
			               <input type='date' class="form-control" id="fechafin" />
			               <span class="input-group-addon">
			               <span class="glyphicon glyphicon-calendar"></span>
			               </span>
			           </div>
				  </div>

				</div>
			</div>
			<div class="row" id="horafin">

				<div class="col-md-6" id="">
				  	<div class="form-group">
				  		<label>HORA FIN:</label>

			            <div class='input-group date' id='datetimepicker1'>
			               <input type='time' class="form-control" id="v_horafin" value="23:59" />
			               <span class="input-group-addon">
			               <span class="glyphicon glyphicon-calendar"></span>
			               </span>
			            </div>
				  </div>
				</div>
			</div>


				<div class="row" >
				  <div class="col-md-6" id="div_edad_alumno" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>EDAD DEL ALUMNO</label>
				  	<select id="vst_edad_alumno" class="form-control" multiple="multiple" style="width: 100%;">
				  	</select>
				   	</div>
				  </div>
				</div>
				<div class="row" >
				  <div class="col-md-6" id="div_diassemana" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>DÍAS DE LA SEMANA</label>
				  	<select id="v_diasemana" class="form-control" multiple="multiple" style="width: 100%;">
				  		<option value="0">Domingo</option>
				  		<option value="1">Lunes</option>
				  		<option value="2">Martes</option>
				  		<option value="3">Mircoles</option>
				  		<option value="4">Jueves</option>
				  		<option value="5">Viernes</option>
				  		<option value="6">Sabado</option>
				  	</select>
				   	</div>
				  </div>
				</div>
		
				<div class="row" >
				  <div class="col-md-6" id="div_mensualidad" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>MENSUALIDAD</label>
				  	<select id="vst_mensualidad" class="form-control" multiple="multiple" style="width: 100%;">
				  	</select>
				   	</div>
				  </div>
				</div>
				<div class="row" >
				  <div class="col-md-6" id="estatuspagado" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>ESTATUS PAGADO</label>
				  	<select id="v_estatuspagado" class="form-control" multiple="multiple" style="width: 100%;">
			

				  		<option value="1">PAGADO</option>
				  		<option value="0">NO PAGADO</option>
				  	</select>

				  	
				   	</div>
				  </div>
				</div>

					<div class="row" >
				  <div class="col-md-6" id="div_forma_pago" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>FORMA DE PAGO</label>
				  	<select id="vst_formapago" class="form-control" multiple="multiple" style="width: 100%;">
				  	</select>
				   	</div>
				  </div>
				</div>
			  						 <div class="row" id="fechainiciopago">
				  <div class="col-md-6" id="">
				  	<div class="form-group">
				  		<label>FECHA INICIO DE PAGO:</label>

			            <div class='input-group date' id='datetimepickerpago1'>
			               <input type='date' class="form-control" id="fechainiciopago1" />
			               <span class="input-group-addon">
			               <span class="glyphicon glyphicon-calendar"></span>
			               </span>
			            </div>
				  </div>
				</div>
			</div>

			 <div class="row" id="fechafinpago">
				  <div class="col-md-6" id="">
				  	<div class="form-group">
				  		<label>FECHA FIN DE PAGO:</label>

			            <div class='input-group date' id='datetimepickerpago2'>
			               <input type='date' class="form-control" id="fechafinpago2" />
			               <span class="input-group-addon">
			               <span class="glyphicon glyphicon-calendar"></span>
			               </span>
			            </div>
				  </div>
				</div>
			</div>
				<div class="row">
					<div class="col-md-6" id="">
					
						
						<button style="display: none;    float: right;" id="btngenerareporte" class="btn btn-primary btngenerarreporte" onclick="">GENERAR REPORTE</button>

					</div>

				</div>
		</div>
	</div>

<div class="row">
	<div class="col-md-12">  
	<div  id="divbuttonexcel" style="float:right;">
      <button type="button"  id="btngenerareporteexcel" onclick="" class="btn btn-primary btn-lg" style="float: right; margin-bottom:20px; margin-right:10px" title="excel">
      <i class="mdi mdi-file-excel"></i>Excel</button>
	<div style="clear: both;"></div>
	</div>
	<div id="divmostrartabla" class="table-responsive">
    
    </div> 
    </div>
</div>



		 <div class="col-md-12" id="contenedor_reportes">
			 
		 </div>

		  <div class="col-md-12" id="">
			 <button style="display: none; position: absolute;
    left: 1.5em;" id="btnpantalla" class="btn btn-success" onclick="">EXPORTAR A EXCEL</button>
		 </div>

		 	
<div class="modal" id="modalCargando" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <!-- Contenido del modal aquí -->
      <div class="modal-body">
        <div id="mainc"></div>
      </div>
    </div>
  </div>
</div>


		 <style type="text/css">
		 	.datetimepicker th.switch{
					width: 105px!important;
				}

				.SumoSelect{
					width: 100%;
				}

				.SumoSelect .select-all{
					height: 40px!important;
				}


				.vertabla{
					  overflow: scroll;
					  width: 100%;
					  max-width: 1000px;
					  overflow-x: auto;
				}
		 </style>

<script>
	var arraydatosreportebyid=[];
</script>

<!--  Funcion para llenar el list de sucursales dependiendo el id de empresa  -->
<script src="js/fn_reportes.js"></script>
<script src="js/fn_basereportes.js"></script>

