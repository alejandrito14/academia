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
require_once("../../clases/class.Servicios.php");
require_once("../../clases/class.Botones.php");
require_once("../../clases/class.Funciones.php");

//Declaración de objeto de clase conexión
$db = new MySQL();
$Servicios = new Servicios();

$bt = new Botones_permisos(); 
$f = new Funciones();

$Servicios->db = $db;


//obtenemos todas las empreas que puede visualizar el usuario.

$Servicios->tipo_usuario = $tipousaurio;
$Servicios->lista_empresas = $lista_empresas;

$l_Servicios = $Servicios->ObtenerServicios();
$l_Servicios_row = $db->fetch_assoc($l_Servicios);


$l_Servicios_num = $db->num_rows($l_Servicios);

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


$arraytipo=array('','REVISTA','NOTICIAS','CALENDARIO');
$estatus=array('DESACTIVADO','ACTIVADO');

?>

<div class="card">
	<div class="card-body">
		<h5 class="card-title" style="float: left;">LISTADO DE SERVICIOS</h5>
		
		<div style="float:right;">
			<button type="button" onClick="abrir_filtro('modal-filtros');" class="btn btn-primary" style="float: right;display: none;"><i class="mdi mdi-account-search"></i>  BUSCAR</button>			
			
			<?php
		
				//SCRIPT PARA CONSTRUIR UN BOTON
				$bt->titulo = "NUEVO";
				$bt->icon = "mdi-plus-circle";
				$bt->funcion = "aparecermodulos('catalogos/servicios/fa_servicio.php?idmenumodulo=$idmenumodulo','main');";
				$bt->estilos = "float: right; margin-right:10px;";
				$bt->permiso = $permisos;
				$bt->tipo = 5;
				$bt->title="NUEVO";
				

				$bt->armar_boton();
			
			?>
			
			<div style="clear: both;"></div>
		</div>
		
		<div style="clear: both;"></div>
	</div>
</div>

<div class="card">
	<div class="card-body">
		<div class="table-responsive" id="contenedor_Servicios">
			<table id="tbl_Servicios" cellpadding="0" cellspacing="0" class="table table-striped table-bordered">
				<thead>
					<tr>
						 
						<th style="text-align: center;">TÍTULO </th> 

						<th style="text-align: center;">IMÁGEN </th> 
						<th style="text-align: center;">FORMATO DE SERVICIO </th> 
						<th style="text-align: center;">ORDEN </th> 
						<th style="text-align: center;">ESTATUS</th>

						<th style="text-align: center;">ACCI&Oacute;N</th>
					</tr>
				</thead>
				<tbody>
					
					<?php
					if($l_Servicios_num== 0){
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
							
						
							
							<td style="text-align: center;"><?php echo $f->imprimir_cadena_utf8($l_Servicios_row['titulo']);?></td>

						 <td style="text-align: center;">
		                    <?php 
		                     $img='./catalogos/servicios/imagenes/'.$_SESSION['codservicio'].'/'.$f->imprimir_cadena_utf8($l_Servicios_row['imagen']);

		                     ?>
		                     <img src="<?php echo $img; ?>" alt=""style="width: 400px;">
		                   </td>

							<td style="text-align: center;"><?php echo $l_Servicios_row['nombrecategoria'];?></td>
							

							<td style="text-align: center;"><?php echo $l_Servicios_row['orden'];?></td>
							

							<td style="text-align: center;"><?php echo $estatus[$l_Servicios_row['estatus']];?></td>

							<td style="text-align: center; font-size: 15px;">

									<?php
													//SCRIPT PARA CONSTRUIR UN BOTON
									$bt->titulo = "";
									$bt->icon = "mdi-table-edit";
									$bt->funcion = "aparecermodulos('catalogos/servicios/fa_servicio.php?idmenumodulo=$idmenumodulo&idservicio=".$l_Servicios_row['idservicio']."','main')";
									$bt->estilos = "";
									$bt->permiso = $permisos;
									$bt->tipo = 2;
									$bt->title="EDITAR";
									$bt->class='btn btn_colorgray';
									$bt->armar_boton();



									?>

										<?php
						//SCRIPT PARA CONSTRUIR UN BOTON
						$bt->titulo = "";
						$bt->icon = "mdi-delete-empty";
						$bt->funcion = "BorrarServicio('".$l_Servicios_row['idservicio']."','servicios','servicios','n','catalogos/servicios/vi_servicios.php','main','$idmenumodulo')";

						$bt->estilos = "";
						$bt->permiso = $permisos;
						$bt->tipo = 3;
						$bt->title="BORAR";

						$bt->armar_boton();
					?>

								<?php
						//SCRIPT PARA CONSTRUIR UN clonar
						$bt->titulo = "";
						$bt->icon = "mdi-book-multiple";
						$bt->funcion = "AbrirModalClonarServicio('".$l_Servicios_row['idservicio']."','servicios','servicios','n','catalogos/servicios/vi_servicios.php','main','$idmenumodulo','".$l_Servicios_row['titulo']."')";

						/*$bt->permiso = $permisos;*/
						$bt->tipo = 4;
						$bt->title="CLONAR";

						$bt->armar_boton();
					?>


								</td>


							</tr>
							<?php
						}while($l_Servicios_row = $db->fetch_assoc($l_Servicios));
					}
					?>
				</tbody>
			</table>
		</div>
	</div>
</div>



<div id="modalclonado" class="modal fade" role="dialog">
  <div class="modal-dialog modal-lg" style="max-width: 1000px;">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        
        <h4 class="modal-title" id="tituloclonado">CLONAR SERVICIO</h4>
      </div>
      <div class="modal-body">
        
      	<div class="" id="divclonado1">

      	<div class="col-md-6">
      		<div class="form-group">
      			<label for="">TÍTULO</label>
      			<input type="text" id="txttituloclonado" class="form-control">
      		</div>
      

      		<div>
      			<h4>ELIGUE LAS CARACTERÍSTICAS A CLONAR</h4>
      		</div>

      		  <div class="form-check" style="margin-bottom: 1em;">
         		 <input type="checkbox" class="form-check-input " name="v_general"  value="0" id="v_general" onchange="" style="top: -0.3em;" checked>
        		 <label for="" class="form-check-label">GENERAL</label>
       
      		 </div>

      		  <div class="form-check" style="margin-bottom: 1em;">
         		 <input type="checkbox" class="form-check-input " name="v_costos"  value="0" id="v_costos" onchange="" style="top: -0.3em;" checked>
        		 <label for="" class="form-check-label">COSTOS</label>
       
      		 </div>

      		 <div class="form-check" style="margin-bottom: 1em;">
         		 <input type="checkbox" class="form-check-input " name="v_politicasmensajes"  value="0" id="v_politicasmensajes" onchange="" style="top: -0.3em;" checked>
        		 <label for="" class="form-check-label">POLITICAS Y MENSAJES</label>
       
      		 </div>

      		 <div class="form-check" style="margin-bottom: 1em;">
         		 <input type="checkbox" class="form-check-input " name="v_reglas"  value="0" id="v_reglas" onchange="" style="top: -0.3em;" checked>
        		 <label for="" class="form-check-label">REGLAS Y PERMISOS</label>
       
      		 </div>


      		 <div class="form-check" style="margin-bottom: 1em;">
         		 <input type="checkbox" class="form-check-input " name="v_coachs"  value="0" id="v_coachs" onchange="" style="top: -0.3em;" checked>
        		 <label for="" class="form-check-label">ASIGNACIÓN DE COACHES</label>
       
      		 </div>
      	</div>
     </div>

     <div id="divclonado2" style="display: none;">
     	<input type="hidden" id="v_categoria" >
        <input type="hidden" id="v_categoriaservicio" >


     	<div class="col-md-12">
						
						<div class="form-group m-t-20">
								<label for="" id="lbldias">* SELECCIONAR DÍAS:</label>

								<div id="leyenda" style="margin-bottom: 1em;"></div>
								 <div class="form-group m-t-20">
								 	    <div class="btn-group btn-group-toggle d-flex flex-column flex-md-row" data-toggle="buttons">

								 	 <label class="btn btn_colorgray2 lbldomingo lbldias">
								    <input type="checkbox" id="Domingo" class="diasckeckbox" value="0"> Domingo
								  </label>


								 	 <label class="btn btn_colorgray2 lbllunes lbldias">
								   <input type="checkbox" id="Lunes" class="diasckeckbox" value="1"> Lunes
								  </label>


								   <label class="btn btn_colorgray2 lblmartes lbldias">
								  <input type="checkbox" id="Martes" class="diasckeckbox" value="2"> Martes
								  </label>

								   <label class="btn btn_colorgray2 lblmiercoles lbldias">
								 <input type="checkbox" id="Miercoles" class="diasckeckbox" value="3"> Miércoles
								  </label>

								   <label class="btn btn_colorgray2 lbljueves lbldias">
								 <input type="checkbox" id="Jueves" class="diasckeckbox" value="4"> Jueves
								  </label>

								   <label class="btn btn_colorgray2 lblviernes lbldias">
								<input type="checkbox" id="Viernes" class="diasckeckbox" value="5"> Viernes
								  </label>

								   <label class="btn btn_colorgray2 lblsabado lbldias">
								<input type="checkbox" id="Sabado" class="diasckeckbox" value="6"> Sábado
								  </label>



								</div>

									
								</div>
							
							</div>
							
								<div class="card" style="" id="divhorarios">
				<div class="card-header" style="margin-top: 1em;">
					<h5>ASIGNAR HORARIOS</h5>

				</div>
				<div class="card-body">
						<div class="row">
							<div class="col-md-12">

								<div id="leyendahorarios" style="margin-left: 1em;margin-bottom: 1em;">

								Selecciona la fecha inicial y final para el periodo del servicio </div>

							<div class="col-md-3" style="float:left;">
							<div class="form-group m-t-20">
								<label>* FECHA INICIAL:</label>
								<input type="date" class="form-control" id="v_fechainicial" name="v_fechainicial" value="<?php echo $fechainicial; ?>" title="FECHA INICIAL" placeholder='FECHA INICIAL'>
							</div>

						</div>
						<div class="col-md-3" style="float:left;">
							<div class="form-group m-t-20">
								<label>* FECHA FINAL:</label>
								<input type="date" class="form-control" id="v_fechafinal" name="v_fechafinal" value="<?php echo $fechafinal; ?>" title="FECHA FINAL" placeholder='FECHA FINAL'>
							</div>
						</div>

						<div class="col-md-3" style="float:left;">
							<button type="button" style="    margin-top: 2em;" onclick="Aplicar()" class="btn btn-primary">APLICAR</button>
						</div>

						</div>

						<div class="col-md-12">
						<div class="form-group m-t-20 col-md-3">
							<label id="lblhorarios">* ASIGNAR HORARIOS</label>
						</div>
					</div>

					</div>

				
						<div style="margin-top: 3em;display: none;" id="calendario" >


							 <div id="picker"></div>
					    <div class="row">
					    	<div class="col-md-4">
					        <label>Fechas/Horas Seleccionadas:</label>
					        <div id="selected-dates" class="list-group"></div>
					        </div>
					    </div>


					    <div class="form-group">
							
							
						</div>
					</div>
				</div>
			</div>

		</div>
     </div>

     <div class=""  id="divclonado3" style="display: none;">
     		<div class="col-md-12">
						
		<div class="form-group m-t-20">
				<label for="" id="lbldias"> SELECCIÓN DE ALUMNOS</label>

			</div>

			<div class="row">
				
					<div class="col-md-12">
				<div class="subject-info-box-1 " style="">
					<label>ALUMNOS POR ASIGNAR</label>
					<select multiple class="form-control" id="lstBox1">
						

					</select>
				</div>

				<div class="subject-info-arrows text-center">
					<br /><br />
					<input type='button' id='btnAllRight' value='>>' class="btn btn-default" /><br />
					<input type='button' id='btnRight' value='>' class="btn btn-default" /><br />
					<input type='button' id='btnLeft' value='<' class="btn btn-default" /><br />
					<input type='button' id='btnAllLeft' value='<<' class="btn btn-default" />
				</div>

				<div class="subject-info-box-2 ">
					<label>ALUMNOS ASIGNADOS</label>
					<select multiple class="form-control" id="lstBox2">
				
					</select>
				</div>

				<div class="clearfix"></div>
			</div>
			</div>
		</div>

     </div>
    </div>
      <div class="modal-footer">

      	
      	  <button type="button" id="clonadoservicio" class="btn btn-success" >SIGUIENTE</button>
      	  <button type="button" class="btn btn-default" data-dismiss="modal">CERRAR</button>
        
      </div>
    </div>

  </div>
</div>
   <script src="js/jquery.selectlistactions.js"></script>

<script type="text/javascript">
	 $('#tbl_Servicios').DataTable( {		
		 	"pageLength": 100,
			"oLanguage": {
						"sLengthMenu": "Mostrar _MENU_ ",
						"sZeroRecords": "NO EXISTEN PROVEEDORES EN LA BASE DE DATOS.",
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
		 	"paging":   true,
		 	"ordering": false,
        	"info":     false


		} );
</script>
<style>
	#StaffList {
  height: 350px;
  margin-bottom: 10px;
}
#PresenterList,
#ContactList,
#FacilitatorList {
  height: 95px;
  margin-bottom: 10px;
} 

.style-select select {
  padding: 0;
}

.style-select select option {
  padding: 4px 10px 4px 10px;
}

.style-select select option:hover {
  background: #EEEEEE;
}

.add-btns {
  padding: 0;
}

.add-btns input {
  margin-top: 25px;
  width: 100%;
}

.selected-left {
  float: left;
  width: 88%;
}

.selected-right {
  float: left;
}

.selected-right button {
  display: block;
  margin-left: 4px;
  margin-bottom: 2px;
}

@media (max-width: 517px) {
  .selected-right button {
    display: inline;
    margin-bottom: 5px;
  }
}

.subject-info-box-1,
.subject-info-box-2 {
  float: left;
  width: 45%;
}

.subject-info-box-1 select,
.subject-info-box-2 select {
  height: 200px;
  padding: 0;
}

.subject-info-box-1 select option,
.subject-info-box-2 select option {
  padding: 4px 10px 4px 10px;
}

.subject-info-box-1 select option:hover,
.subject-info-box-2 select option:hover {
  background: #EEEEEE;
}

.subject-info-arrows {
  float: left;
  width: 10%;
}

.subject-info-arrows input {
  width: 70%;
  margin-bottom: 5px;
}

</style>