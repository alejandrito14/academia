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
		<div class="row">
			<div class="col-md-6">
				 <div class="form-group">
			    <label for="">CATEGORIAS</label>
			   	<select class="form-control" id="v_categoria"></select>
			   
			  </div>
			</div>
			<div class="col-md-6">
				 <div class="form-group">
			    <label for="">COACH</label>
			   	<select class="form-control" id="v_coach"></select>
			   
			  </div>
			</div>

			

			<div class="col-md-6">
				 <div class="form-group">
			    <label for="">MES</label>
			   	<select class="form-control" id="v_meses"></select>
			   
			  </div>
			</div>

			<div class="col-md-6">
				 <div class="form-group">
			    <label for="">AÑO</label>
			   	<select class="form-control" id="v_anios"></select>
			   
			  </div>
			</div>
		
		</div>
		<div class="row">
			<div class="col-md-6 ">
</div>
			<div class="col-md-6 ">
				 <div class="form-group" style="   text-align: right;">
			    <button class="btn btn-primary" onclick="FiltrarServicios(<?php echo $idmenumodulo;?> )">FILTRAR SERVICIOS</button>
			</div>
			</div>

		</div>
			
	</div>
</div>



<div class="card divservicios"  style="display: none;" >
	<div class="row">
		<div class="col-md-12">
	    <div class="row" style="margin-right: 1em;margin-left: 1em;">
				<div class="col-md-8"></div>
				<div class="col-md-4">
					<input type="text" placeholder="Buscar" id="buscadorservicio"  class="form-control" onkeyup="handleKeyPress(event, '<?php echo $idmenumodulo; ?>')" style="width: 70%;float: right;margin-right: 1em;">
				</div>
	    </div>
		</div>
	</div>
	<div class="card-body">
		<div class="table-responsive" id="contenedor_Servicios">
			<table id="tbl_Servicios" cellpadding="0" cellspacing="0" class="table table-striped table-bordered">
				<thead>
					<tr>
						 <th style="text-align: center;">ID</th>
						<th style="text-align: center;">TÍTULO </th> 

						<th style="text-align: center;">IMÁGEN </th> 
						<th style="text-align: center;">FORMATO DE SERVICIO </th> 
						<th style="text-align: center;">FECHA CREACIÓN</th>
						<th style="text-align: center;">ORDEN </th> 
						<th style="text-align: center;">ESTATUS</th>

						<th style="text-align: center;">ACCI&Oacute;N</th>
					</tr>
				</thead>
				<tbody id="tblservicios">
					
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

										$avanzado=$l_Servicios_row['avanzado'];

							?>
							<tr>
							
						
							<td><?php echo $l_Servicios_row['idservicio'];?></td>
							<td style="text-align: center;"><p><?php echo $f->imprimir_cadena_utf8($l_Servicios_row['titulo']);?></p>
								<p>Periodo: <?php echo date('d/m/Y',strtotime($l_Servicios_row['fechamin'])).'-'.date('d/m/Y',strtotime($l_Servicios_row['fechamax'])); ?> </p>
								
								<?php 
								$coaches=explode(',',$obtener[$i]->coachesfiltro2);
								if ($coaches[0]!='' ) {
									for ($j=0; $j <count($coaches) ; $j++) { 
										
										?>
										 <p style="margin: 0;"><?php echo $coaches[$j]; ?></p> 

										<?php
									}
								}
							 ?>	


							</td>

						 <td style="text-align: center;">
		                    <?php 
		                     $img='./catalogos/servicios/imagenes/'.$_SESSION['codservicio'].'/'.$f->imprimir_cadena_utf8($l_Servicios_row['imagen']);

		                     ?>
		                     <img src="<?php echo $img; ?>" alt=""style="width: 200px;">
		                   </td>

							<td style="text-align: center;"><?php echo $l_Servicios_row['nombrecategoria'];?></td>
							<td style="text-align: center;"><?php echo $l_Servicios_row['fechacreacion'];?></td>
							

							<td style="text-align: center;"><?php echo $l_Servicios_row['orden'];?></td>
							

							<td style="text-align: center;"><?php echo $estatus[$l_Servicios_row['estatus']];?></td>

							<td style="text-align: center; font-size: 15px;">

									<?php
													//SCRIPT PARA CONSTRUIR UN BOTON
									$bt->titulo = "";
									$bt->icon = "mdi-table-edit";
									$bt->funcion = "GuardarFiltro();aparecermodulos('catalogos/servicios/fa_servicio.php?idmenumodulo=$idmenumodulo&idservicio=".$l_Servicios_row['idservicio']."','main')";
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

								if ($avanzado==1) {
						//SCRIPT PARA CONSTRUIR UN clonar
						$bt->titulo = "";
						$bt->icon = "mdi-book-multiple";
						$bt->funcion = "AbrirModalClonarServicio('".$l_Servicios_row['idservicio']."','servicios','servicios','n','catalogos/servicios/vi_servicios.php','main','$idmenumodulo','".$l_Servicios_row['titulo']."')";

						/*$bt->permiso = $permisos;*/
						$bt->tipo = 4;
						$bt->title="CLONAR";

						$bt->armar_boton();
					?>

					<?php
						//SCRIPT PARA CONSTRUIR UN clonar
						$bt->titulo = "";
						$bt->icon = "mdi-account-check";
						$bt->funcion = "AbrirModalUsuarios('".$l_Servicios_row['idservicio']."','servicios','servicios','n','catalogos/servicios/vi_servicios.php','main','$idmenumodulo','".htmlentities(addslashes($l_Servicios_row['titulo']))."')";

						/*$bt->permiso = $permisos;*/
						$bt->tipo = 4;
						$bt->title="ALUMNOS INSCRITOS";

						$bt->armar_boton();
					?>


							<?php
						//SCRIPT PARA CONSTRUIR UN clonar
						$bt->titulo = "";
						$bt->icon = "mdi-account-multiple";
						$bt->funcion = "AbrirModalAsignacion('".$l_Servicios_row['idservicio']."','servicios','servicios','n','catalogos/servicios/vi_servicios.php','main','$idmenumodulo','".htmlentities(addslashes($l_Servicios_row['titulo']))."')";

						/*$bt->permiso = $permisos;*/
						$bt->tipo = 4;
						$bt->title="ASIGNACIÓN DE ALUMNOS";
 
						$bt->armar_boton();
					?>


						<?php
						//SCRIPT PARA CONSTRUIR UN clonar
						$bt->titulo = "";
						$bt->icon = "mdi-cloud-upload";
						$bt->funcion = "AbrirModalImagenes('".$l_Servicios_row['idservicio']."','servicios','servicios','n','catalogos/servicios/vi_servicios.php','main','$idmenumodulo','".htmlentities(addslashes($l_Servicios_row['titulo']))."')";

						/*$bt->permiso = $permisos;*/
						$bt->tipo = 4;
						$bt->title="IMÁGENES INFORMATIVAS";

						$bt->armar_boton();

					}
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


<div class="modal fade" id="modalAlumnosServicios" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="tituloservicio"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <table class="table table-striped table-bordered ">
       	<thead>
       		<tr>
       			<th>ALUMNO</th>
       				<th>ACEPTADO</th>
       			<th>PAGADO</th>
       		</tr>
       	</thead>
       	<tbody id="usuariosinscritos">
       		
       	</tbody>
       </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
       	
      </div>
    </div>
  </div>
</div>



<div class="modal fade" id="modalAlumnosAsignacion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalTitleServicio"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <div class="row">
       	<div class="col-md-6">
       		<h3 style="text-align: center;">Todos los alumnos</h3>
       		<div class="row" style="margin-bottom:1em;">
									<div class="col-md-12">	 
										<input type="text" class="form-control" name="buscadorusuario2_" id="buscadorusuario2_" placeholder="Buscar" onkeyup="BuscarEnLista('#buscadorusuario2_','.alumno')">
									</div>
		</div>
       		<div id="usuariosnoinscritos" style="height: 250px;overflow: scroll;"></div>
       	</div>
       	<div class="col-md-6">
       		<h3 style="text-align: center;">Alumnos inscritos</h3>

       		<div class="row" style="margin-bottom:1em;">
									<div class="col-md-12">	 
										<input type="text" class="form-control" name="buscadorcli_2" id="buscadorusuario_" placeholder="Buscar" onkeyup="BuscarEnLista('#buscadorusuario_','.usu_')">
									</div>
									</div>

       		<div id="usuariosinscritos2" style="height: 250px;overflow: scroll;"></div>

       	</div>

       </div>
      </div>
      <div class="modal-footer">

      	 <button type="button" class="btn btn-success btnasignaralumnos" data-dismiss="modal">Guardar</button>

        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
       	
      </div>
    </div>
  </div>
</div>



<div class="modal" id="modalimagenservicio" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Subir imágenes</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      	<div class="row">
      		<div class="col-md-6"></div>
      		<div class="col-md-6">
      			
      			<button type="button" id="btnnuevaimagen" onclick="NuevaImagen()" class="btn btn_azul" style="float: right; margin-right:10px;" title="NUEVO">
				<i class="mdi mdi-plus-circle"></i>NUEVO</button>
      		</div>

      	</div>
       
       <input type="hidden" id="idservicio" value="">
       			 <img class="card-img-top" src="">
				 <div id="d_foto" style="text-align:center; ">
				<img src="<?php echo $ruta; ?>" class="card-img-top" alt="" style="border: 1px #777 solid"/> 
				</div>

        	<div class="formimagen" style="display: none;">
                    <form method="post" action="" enctype="multipart/form-data" id="uploadForm" >
                   
                   
                        <input type="file" class=" inputfile inputfile-1 form-control"   name="file" id="imageninformativa" />


                  <div class="form-group">
                  	  <label class="form-check-label" for="exampleCheck1">Título</label>
				    <input type="text" class="form-control" id="txttituloimagen">
				  
				  </div>
                     


                    <p></p>

		             <div id="contador"></div>
                    <div id="cargado"></div>
                      <div id='salidaImagen'></div>

                  </form>
</div>


       <div class="vfileNames" id="vfileNames"></div>


       <div class="tbl"></div>
      </div>
      <div class="modal-footer">
          <button type="button" style="display: none;" class="btn btn-success btnguadarimagen">GUARDAR</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">CERRAR</button>
      </div>
    </div>
  </div>
</div>

<script>
	ObtenerTipoServicios2();
	ObtenerCoachs();
</script>
   <script src="js/jquery.selectlistactions.js"></script>

<script type="text/javascript">
	 $('#tbl_Servicios').DataTable( {		
		 	"pageLength": 100,
			"oLanguage": {
						"sLengthMenu": "Mostrar _MENU_ ",
						"sZeroRecords": "NO SE ENCONTRARON REGISTROS EN LA BASE DE DATOS.",
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
		 	"ordering": false,

        	  "paging": false,
    		"searching": false,
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


<script>	
       $(function(){

    //file input field trigger when the drop box is clicked
    $("#seleccionar").click(function(){
        $("#imageninformativa").click();
    });
    
    //prevent browsers from opening the file when its dragged and dropped
    $(document).on('drop dragover', function (e) {
        e.preventDefault();
    });

    //call a function to handle file upload on select file
    $('#imageninformativa').on('change', SubirImagenservicioInformativa);
});

       CargarMeses();
       Cargaranios();
       CargarVariables();

      
</script>

<style>
/*.inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}


.inputfile + label {
    max-width: 80%;
    font-size: 1.25rem;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
    padding: 0.625rem 1.25rem;
}

.inputfile + label svg {
    width: 1em;
    height: 1em;
    vertical-align: middle;
    fill: currentColor;
    margin-top: -0.25em;
    margin-right: 0.25em;
}
*/
.iborrainputfile {
    font-size:16px; 
    font-weight:normal;
    font-family: 'Lato';
}
.alumno{
	    border-top: 1px solid #f0eee5;
    border-bottom: 1px solid #f0eee5;
    padding-top: 1px;
    padding-bottom: 1px;
}
.usu_{
	 border-top: 1px solid #f0eee5;
    border-bottom: 1px solid #f0eee5;
    padding-top: 1px;
    padding-bottom: 1px;
}
</style>