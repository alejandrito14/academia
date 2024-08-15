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
$l_reportes = $rpt->Lista_reportesante();
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
<script type="text/javascript" charset="utf-8">

	//$(document).ready(function() {

		var oTable = $('#zero_config').dataTable( {		

			"oLanguage": {
				"sLengthMenu": "Mostrar _MENU_ Registros por pagina",
				"sZeroRecords": "Lo sentimos, no se han encontrado registros.",
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
		//} );
</script>

	<div class="card" style="background-color: #C9C9C9; border-radius: 4px;">
		<div class="card-body">
			<h5 class="card-title" style="float: left; margin-top: 5px;">REPORTES</h5>	
			<div style="clear: both;"></div>

				<div class="row">
					<div class="form-group col-md-6">
						<label for="exampleInputEmail1">LISTA DE REPORTES</label>
						<select name="v_id_reportes" id="v_id_reportes" class="form-control"  onchange="CargarFiltrosreportesAnte($(this).val())">
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
				  <div class="col-md-6" id="tiposervicios" style="display: none;">
 
				  	<div class="form-group m-t-20">
				  	<label>CATEGORÍAS</label>
				  	<select id="v_tiposervicios" class="form-control" multiple="multiple" style="width: 100%;">
				  		
				  	</select>
				   	</div>
				  </div>
				</div>

				<div class="row" >
				  <div class="col-md-6" id="divcategoriapadre" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>CATEGORÍAS</label>
				  	<select id="v_categoriapadre" class="form-control" multiple="multiple" style="width: 100%;">
				  		
				  	</select>
				   	</div>
				  </div>
				</div>  

				<div class="row" >
				  <div class="col-md-6" id="tiposervicios2" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>CATEGORÍAS DEPENDIENTES</label>
				  	<select id="v_tiposervicios2" class="form-control" multiple="multiple" style="width: 100%;">
				  		
				  	</select>
				   	</div>
				  </div>
				</div>  

					<div class="row" >
				  <div class="col-md-6" id="tsubcategorias" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>CATEGORÍAS SUBCATEGORÍAS</label>
				  	<select id="v_subcategorias" class="form-control" multiple="multiple" style="width: 100%;">
				  		
				  	</select>
				   	</div>
				  </div>
				</div> 


				<div class="row" >
				  <div class="col-md-6" id="tsubsubcategorias" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>CATEGORÍAS SUB SUBCATEGORÍAS</label>
				  	<select id="v_subsubcategorias" class="form-control" multiple="multiple" style="width: 100%;">
				  		
				  	</select>
				   	</div>
				  </div>
				</div>

				<div class="row" >
				  	<div class=" col-md-6 form-group m-t-20" id="alumnos">
				  	<label>ALUMNOS:</label>
				  	<select id="v_alumnos" class="form-control">
				  		
				  	</select>
				   	</div>
				  </div>

				  <div class="row" >
				  <div class="col-md-6" id="estatusaceptado" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>ESTATUS ACEPTADO</label>
				  	<select id="v_estatusaceptado" class="form-control" multiple="multiple" style="width: 100%;">
				  	

				  		<option value="1">ACEPTADO</option>
				  		<option value="0">NO ACEPTADO</option>
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
				  <div class="col-md-6" id="coaches" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>COACHES</label>
				  	<select id="v_coaches" class="form-control" multiple="multiple" style="width: 100%;">
				  		
				  	</select>

				  	
				   	</div>
				  </div>
				</div>
			
			


				 <!--  <div class="col-md-6" id="estatuspago">

				  	<div class="form-group m-t-20">
				  	<label>ESTATUS DE PAGO:</label>
				  	<select id="v_estatuspago" class="form-control">
				  		
				  	</select>
				   	</div>
				  </div> -->

<!-- 				   <div class="col">
 -->
				  <!-- 	<select id="v_categoria" class="form-control">
				  		
				  	</select>
				    -->
<!-- 				  </div>
 -->
 	 <div class="row" id="fechainicio">
				  <div class="col-md-6" id="">
				  	<div class="form-group">
				  		<label>FECHA INICIO DEL SERVICIO:</label>

			            <div class='input-group date' id='datetimepicker1'>
			               <input type='date' class="form-control" id="fechainicio1" />
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
				  		 <label>FECHA FIN DEL SERVICIO:</label>

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
					
						
						<button style="display: none;    float: right;" id="btngenerar" class="btn btn-primary btngenerarreporte" onclick="">GENERAR REPORTE</button>

					</div>

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


<script src="js/fn_reportesanteriores.js"></script>

<!--  Funcion para llenar el list de sucursales dependiendo el id de empresa  -->
<script type="text/javascript">


	$("#servicios").css('display','none');
	$("#fechainicio").css('display','none');
	$("#fechafinal").css('display','none');
	$("#alumnos").css('display','none');
	$("#horainicio").css('display','none');
	$("#horafin").css('display','none');
	$("#fechainiciopago").css('display','none');
	$("#fechafinpago").css('display','none');

		$('#v_tiposervicios').SumoSelect({ 
			    placeholder: 'Seleccionar categoria',
				     selectAll : true,
	   				 selectAllPartialCheck : true,
	                 locale :  ['Aceptar', 'Cancelar', 'Seleccionar todos'],
					closeAfterClearAll: true, 
				    });
		$('#v_tiposervicios2').SumoSelect({ 
			     placeholder: 'Seleccionar categoria',
				     selectAll : true,
	   				 selectAllPartialCheck : true,
	                 locale :  ['Aceptar', 'Cancelar', 'Seleccionar todos'],
					closeAfterClearAll: true, 
				    });

		$('#v_estatuspagado').SumoSelect({ 
			  placeholder: 'Seleccionar estatus',
				     selectAll : true,selectAllPartialCheck : true,
	                 locale :  ['Aceptar', 'Cancelar', 'Seleccionar todos'],
				 });
		$('#v_estatusaceptado').SumoSelect({ 
				placeholder: 'Seleccionar estatus',

				     selectAll : true,selectAllPartialCheck : true,
	                 locale :  ['Aceptar', 'Cancelar', 'Seleccionar todos'],
				 });

			$('#v_coaches').SumoSelect({ 
				 placeholder: 'Seleccionar coach',

				     selectAll : true,selectAllPartialCheck : true,
	                 locale :  ['Aceptar', 'Cancelar', 'Seleccionar todos'],
				 });

	//CargarSucursales();
//	CargarCategorias();
	


/*	jQuery('#datetimepicker1').datetimepicker({
			format: 'dd-mm-yyyy HH:mm:ss',
            autoclose: true,
            todayHighlight: true,
			language: 'es'
        });

	jQuery('#datetimepicker2').datetimepicker({
			format: 'dd-mm-yyyy HH:mm:ss',
            autoclose: true,
            todayHighlight: true,
			language: 'es'
        });
*/


/*	function getFormattedDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear().toString().slice(2);

    return day + '-' + month + '-' + year;
}*/
</script>

