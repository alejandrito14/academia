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
				  <div class="col-md-6" id="servicios" style="display: none;">

				  	<div class="form-group m-t-20">
				  	<label>SERVICIOS</label>
				  	<select id="v_servicios" class="form-control">
				  		
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
				  		<label>FECHA INICIO:</label>

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
				  		 <label>FECHA FIN:</label>

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

				<div class="row">
					<div class="col-md-6" id="">
					<!-- <div class="col-md-2" style="
					    float: left;
					">
						
					

					</div> -->
					<!-- <div class="col-md-2" style="
					    float: right;
					">
						
					
					</div> -->
					<!-- <div class="col-md-2" style="
					    float: right;
					"> -->
						
						<button style="display: none;    float: right;" id="btngenerar" class="btn btn-primary" onclick="">GENERAR REPORTE</button>

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

		 	



		 <style type="text/css">
		 	.datetimepicker th.switch{
					width: 105px!important;
				}
		 </style>



<!--  Funcion para llenar el list de sucursales dependiendo el id de empresa  -->
<script type="text/javascript">
	$("#servicios").css('display','none');
	$("#fechainicio").css('display','none');
	$("#fechafinal").css('display','none');
	$("#alumnos").css('display','none');
	$("#horainicio").css('display','none');
	$("#horafin").css('display','none');
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

