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
require_once("../../clases/class.Servicios.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Botones.php");
require_once("../../clases/class.Categorias.php");
require_once("../../clases/class.Usuarios.php");
require_once("../../clases/class.Zonas.php");
require_once("../../clases/class.CategoriasServicios.php");
require_once("../../clases/class.Descuentos.php");
require_once("../../clases/class.Membresia.php");
require_once("../../clases/class.Encuesta.php");
require_once("../../clases/class.PoliticasAceptacion.php");

$idmenumodulo = $_GET['idmenumodulo'];

//Se crean los objetos de clase
$db = new MySQL();
$emp = new Servicios();
$f = new Funciones();
$bt = new Botones_permisos();
$cate=new Categorias();
$cate->db=$db;
$descuentos=new Descuentos();
$descuentos->db=$db;
$emp->db=$db;
$obtenercat=$cate->ObtenerCategoriasEstatus(1);

$cateservicios=new CategoriasServicios();
$cateservicios->db=$db;
$obtenercateservicios=$cateservicios->ObtcategoriasservicioActivos();

$politicasaceptacion=new PoliticasAceptacion();
$politicasaceptacion->db=$db;
$obtenerpoliticasaceptacion=$politicasaceptacion->ObtenerPoliticasActivas();



$cli = new Usuarios();
$cli->db = $db;
$r_clientes = $cli->ObtenerUsuariosAlumno();
$a_cliente = $db->fetch_assoc($r_clientes);
$r_clientes_num = $db->num_rows($r_clientes);



$r_coach = $cli->ObtenerUsuariosCoach();
$a_coach = $db->fetch_assoc($r_coach);
$r_coach_num = $db->num_rows($r_coach);

$zonas=new Zonas();
$zonas->db=$db;
$r_zonas=$zonas->ObtenerZonas();
$rowzonas=$db->fetch_assoc($r_zonas); 
$num_zonas=$db->num_rows($r_zonas);


$r_descuentos = $descuentos->ObtenerDescuentos();
$a_descuentos = $db->fetch_assoc($r_descuentos);
$r_descuentos_num = $db->num_rows($r_descuentos);


$membresia=new Membresia();
$membresia->db=$db;


$r_membresia = $membresia->ObtenerTodosActivomembresia();
$a_membresia = $db->fetch_assoc($r_membresia);
$r_membresia_num = $db->num_rows($r_membresia);


$encuesta=new Encuesta();
$encuesta->db=$db;

$r_encuesta = $encuesta->ObtenerTodosActivoencuesta();
$a_encuesta = $db->fetch_assoc($r_encuesta);
$r_encuesta_num = $db->num_rows($r_encuesta);



//Validamos si cargar el formulario para nuevo registro o para modificacion
if(!isset($_GET['idservicio'])){
	//El formulario es de nuevo registro
	$idservicio = 0;

	//Se declaran todas las variables vacias
	 $dia='';
	 $mes='';
	 $anio='';
	 $hora='';
	 $estatus=1;
	$ruta="images/sinfoto.png";

	$col = "col-md-12";
	$ver = "display:none;";
	$titulo='NUEVO SERVICIO';
	$costo="";
	$obtenerorden=$emp->ObtenerUltimoOrdenservicio();
	$roworden=$db->fetch_assoc($obtenerorden);
	$num=$db->num_rows($obtenerorden);
	if ($num>0) {
		$orden=$roworden['ordenar']+1;
	}else{
		$orden=0;
	}

}else{
	//El formulario funcionara para modificacion de un registro

	//Enviamos el id del pagos a modificar a nuestra clase Pagos
	$idservicio = $_GET['idservicio'];
	$emp->idservicio = $idservicio;

	//Realizamos la consulta en tabla Pagos
	$result_SERVICIO = $emp->buscarservicio();
	$result_SERVICIO_row = $db->fetch_assoc($result_SERVICIO);

	//Cargamos en las variables los datos 

	//DATOS GENERALES
	$titulo1=$result_SERVICIO_row['titulo'];
	$descripcion=$result_SERVICIO_row['descripcion'];
	$imagen=$f->imprimir_cadena_utf8($result_SERVICIO_row['imagen']);
	$orden=$f->imprimir_cadena_utf8($result_SERVICIO_row['orden']);
	$estatus = $f->imprimir_cadena_utf8($result_SERVICIO_row['estatus']);
	$idcategoriaservicio = $f->imprimir_cadena_utf8($result_SERVICIO_row['idcategoriaservicio']);	
	$costo=$result_SERVICIO_row['precio'];
	$fechainicial=$result_SERVICIO_row['fechainicial'];
	$fechafinal=$result_SERVICIO_row['fechafinal'];
	$idcategoria=$result_SERVICIO_row['idcategoria'];
	$totalclases=$result_SERVICIO_row['totalclases'];
	$montopagarparticipante=$result_SERVICIO_row['montopagarparticipante'];
	$montopagargrupo=$result_SERVICIO_row['montopagargrupo'];
	$modalidad=$result_SERVICIO_row['modalidad'];

	$modalidadpago=$result_SERVICIO_row['modalidaddepago'];
	$periodo=$result_SERVICIO_row['periodo'];
	$lunes=$result_SERVICIO_row['lunes'];
	$martes=$result_SERVICIO_row['martes'];
	$miercoles=$result_SERVICIO_row['miercoles'];
	$jueves=$result_SERVICIO_row['jueves'];
	$viernes=$result_SERVICIO_row['viernes'];
	$sabado=$result_SERVICIO_row['sabado'];
	$domingo=$result_SERVICIO_row['domingo'];
	$numeroparticipantes=$result_SERVICIO_row['numeroparticipantes'];
	$numeroparticipantesmax=$result_SERVICIO_row['numeroparticipantesmax'];
	$numligarclientes=$result_SERVICIO_row['numligarclientes'];
	$abiertocliente=$result_SERVICIO_row['abiertocliente'];
	$abiertocoach=$result_SERVICIO_row['abiertocoach'];
	$abiertoadmin=$result_SERVICIO_row['abiertoadmin'];
	$ligarcliente=$result_SERVICIO_row['ligarcliente'];
	$cancelaciondescripcion=$result_SERVICIO_row['cancelaciondescripcion'];
	$reembolso=$result_SERVICIO_row['reembolso'];
	$cantidadreembolso=$result_SERVICIO_row['cantidadreembolso'];
		$tiporeembolso=$result_SERVICIO_row['tiporeembolso'];

	$asignadocliente=$result_SERVICIO_row['asignadocliente'];
	$asignadocoach=$result_SERVICIO_row['asignadocoach'];
	$asignadoadmin=$result_SERVICIO_row['asignadoadmin'];
	$tiempoaviso=$result_SERVICIO_row['tiempoaviso'];
	$tituloaviso=$result_SERVICIO_row['tituloaviso'];
	$descripcionaviso=$result_SERVICIO_row['descripcionaviso'];
	$politicasca=$result_SERVICIO_row['politicascancelacion'];
	$politicasaceptacion=$result_SERVICIO_row['politicasaceptacion'];
	$asistencia=$result_SERVICIO_row['controlasistencia'];

$idpoliticaaceptacion=$f->imprimir_cadena_utf8($result_SERVICIO_row['idpoliticaaceptacion']);
$aceptarserviciopago=$result_SERVICIO_row['aceptarserviciopago'];

	$col = "col-md-12";
	$ver = "";
		$titulo='EDITAR SERVICIO';

$foto = $f->imprimir_cadena_utf8($result_SERVICIO_row['imagen']);

$ruta='';
	if($foto==""){
		$ruta="images/sinfoto.png";
	}
	else{
		$ruta="catalogos/servicios/imagenes/".$_SESSION['codservicio']."/$foto";
	}


}

if(isset($_SESSION['permisos_acciones_erp'])){
						//Nombre de sesion | pag-idmodulos_menu
	$permisos = $_SESSION['permisos_acciones_erp']['pag-'.$idmenumodulo];	
}else{
	$permisos = '';
}
//*================== TERMINA RECIBIMOS PARAMETRO DE PERMISOS =======================*/

?>
<div id="idmenumodulo" style="display: none;"><?php echo $idmenumodulo; ?></div>

<div class="card" id="tiposervicioconfi" style="display: none;"  >
				<div class="card-header" style="margin-top: 1em;">
					<h5></h5>
				</div>
				<div class="card-body">
					<div class="col-md-12">
						
					<div class="row tiposervicioconfiguracion"></div>
							


					</div>

					

				</div>
			</div>


			<div class="card" id="nuevoservicio" style="display: block;">
							
				<form id="f_servicio" name="f_servicio" method="post" action="">
			<div class="card">
				<div class="card-body">
						<h4 class="card-title m-b-0" style="float: left;"><?php echo $titulo; ?></h4>

		<div style="float: right;position:fixed!important;z-index:10;right:0;margin-right:2em;width: 20%;">
				
				<?php
			
					//SCRIPT PARA CONSTRUIR UN BOTON
					$bt->titulo = "GUARDAR";
					$bt->icon = "mdi mdi-content-save";
					$bt->funcion = " Guardarservicio3('f_servicio','catalogos/servicios/vi_servicios.php','main','$idmenumodulo');";
					$bt->estilos = "float:right;";
					$bt->permiso = $permisos;
					$bt->class='btn btn-success btnguardarservicio';
				
					//validamos que permiso aplicar si el de alta o el de modificacion
				if($idservicio == 0)
					{
						$bt->tipo = 1;
					}else{
						$bt->tipo = 2;
					}
			
					echo $bt->armar_boton();
				?>
				
			
				
				<button type="button" onClick="Limpiarvariables();aparecermodulos('catalogos/servicios/vi_servicios.php?idmenumodulo=<?php echo $idmenumodulo;?>','main');" class="btn btn-primary" style="float: right; margin-right: 10px;"><i class="mdi mdi-arrow-left-box"></i>VER LISTADO</button>
				<div style="clear: both;"></div>
				
				<input type="hidden" id="id" name="id" value="<?php echo $idservicio; ?>" />
			</div>


			
			<div style="clear: both;"></div>
		</div>
	</div>
	

<!-- 
	<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button onclick="ActivarTab(this,'home')" class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true" onclick=""> GENERAL</button>
  </li>
  <li class="nav-item" role="presentation">
    <button type="button"  class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">DISPONIBILIDAD</button>


   </li>
 

   <li class="nav-item" role="presentation">
    <button  type="button" class="nav-link" id="costos-tab" data-bs-toggle="tab" data-bs-target="#costos" type="button" role="tab" aria-controls="costos" aria-selected="false">COSTOS</button>

 </li>

  <li class="nav-item" role="presentation">
    <button  type="button" onclick="ActivarTab(this,'aceptacion')" class="nav-link" id="aceptacion-tab" data-bs-toggle="tab" data-bs-target="#aceptacion" type="button" role="tab" aria-controls="aceptacion" aria-selected="false">POLÍTICAS Y MENSAJES</button>

</li>

  



   <li class="nav-item" role="presentation" >
    <button  type="button" onclick="ActivarTab(this,'multi')" class="nav-link" id="multi-tab" data-bs-toggle="tab" data-bs-target="#multi" type="button" role="tab" aria-controls="multi" aria-selected="false">REGLAS Y PERMISOS</button>
  </li>

   <li class="nav-item" role="presentation" >
    <button  type="button" onclick="ActivarTab(this,'coaches')" class="nav-link" id="coach-tab" data-bs-toggle="tab" data-bs-target="#coach" type="button" role="tab" aria-controls="coach" aria-selected="false">ASIGNAR COACHES</button>

  </li>

 <li class="nav-item" role="presentation" >
    <button  type="button" onclick="ActivarTab(this,'otros')" class="nav-link" id="otros-tab" data-bs-toggle="tab" data-bs-target="#otros" type="button" role="tab" aria-controls="otros" aria-selected="false">OTROS</button>

  </li>

  
</ul> -->

	
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
  		<div class="">
			<div class="card">

				<div class="row">
									<h4 style="margin-left: 30px;">DATOS GENERALES</h4>
								</div>
				<div class="card-header" style="padding-bottom: 0; padding-right: 0; padding-left: 0; padding-top: 0;">
					<!--<h5>DATOS</h5>-->

				</div>

				<div class="card-body">
					

						<div class="col-md-6" >

									<form method="post" action="#" enctype="multipart/form-data">
								    <div class="card" style="width: 18rem;margin: auto;margin-top: 3em;">
								        <img class="card-img-top" src="">
								        <div id="d_foto" style="text-align:center; ">
											<img src="<?php echo $ruta; ?>" class="card-img-top" alt="" style="border: 1px #777 solid"/> 
										</div>
								        <div class="card-body">
								            <h5 class="card-title"></h5>
								           
								            <div class="form-group">

								            	
								               
								                <input type="file" class="form-control-file" name="image" id="image" onchange="SubirImagenservicio()">
								            </div>
								          <!--   <input type="button" class="btn btn-primary upload" value="Subir"> -->
								        </div>
								    </div>
								</form>

									<p style="text-align: center;">Dimensiones de la imagen Ancho:640px Alto:360px</p>
								</div>

							<div class="col-md-6">
							<div class="form-group m-t-20">
								<label id="lbltitulo">* TÍTULO:</label>
								<!-- <input type="text" class="form-control" id="v_titulo" name="v_titulo" title="TÍTULO" placeholder='TÍTULO' value="<?php echo trim($titulo1); ?>" > -->

								<textarea name="v_titulo" id="v_titulo" placeholder="DESCRIPCIÓN" class="form-control" onblur="Colocardescripcion()" onfocus="ColocarCursorAlPrincipio(this)" onclick ="ColocarCursorAlPrincipio(this)"><?php echo $titulo1; ?>
								</textarea>
							</div>

							<div class="form-group m-t-20">
								<label id="lbldescripcion">* DESCRIPCIÓN:</label>
								<textarea name="v_descripcion" id="v_descripcion" placeholder="DESCRIPCIÓN" onfocus="ColocarCursorAlPrincipio(this)" onclick ="ColocarCursorAlPrincipio(this)" class="form-control"><?php echo $descripcion; ?></textarea>
							</div>
							
						

							<div class="form-group m-t-20">
								<label for="" id="lbltiposervicio">* CATEGORÍA:</label>
								<select name="v_categoria" id="v_categoria" onchange="SeleccionarCategoria(0)" class="form-control">
									<option value="0" >SELECCIONAR CATEGORÍA</option>

									<?php if (count($obtenercat)){

										for ($i=0; $i <count($obtenercat) ; $i++) {  ?>
											<option value="<?php echo $obtenercat[$i]->idcategorias;?>"><?php echo $obtenercat[$i]->titulo; ?></option>
										
										
									<?php 
									}
								} ?>
									
								</select>
							</div>


						
						<div class="form-group m-t-20 divcategoria" style="display: none;">
							<label for="" id="lblcategoria">* INTÉRVALO:</label>
								<select name="v_categoriaservicio" id="v_categoriaservicio" class="form-control">
									<option value="0" >SELECCIONAR INTÉRVALO</option>

									<?php

									 if (count($obtenercateservicios)){

										for ($i=0; $i <count($obtenercateservicios) ; $i++) {  ?>
											<option value="<?php echo $obtenercateservicios[$i]->idcategoriasservicio;?>"><?php echo $obtenercateservicios[$i]->nombrecategoria; ?></option>
										
								
										
									<?php 
									}
								} ?>
									
								</select>
							</div>
						

							<div class="form-group m-t-20">
								<label id="lblorden">* ORDEN:</label>
								<input type="number" class="form-control" id="v_orden" name="v_orden" value="<?php echo $orden; ?>" title="ORDEN" placeholder='ORDEN'>
							</div>

						<div class="form-group m-t-20">
							<label>ESTATUS:</label>
							<select name="v_estatus" id="v_estatus" title="Estatus" class="form-control"  >
								<option value="0" <?php if($estatus == 0) { echo "selected"; } ?> >DESACTIVO</option>
								<option value="1" <?php if($estatus == 1) { echo "selected"; } ?> >ACTIVO</option>
							</select>
						</div>

						<div class="form-group">
							
							<!-- <button type="button" class="btn btn-success btncontinuar"  id="btncontinuar" style="float: right;">Continuar</button> -->

						</div>

						</div>
							
						</div>
						
			
			</div>
		</div>

  </div>
  
  		<div class="card" id="divdias"  >
				<div class="card-header" style="margin-top: 1em;">
					<h5>DÍAS</h5>
				</div>
				<div class="card-body">
					<div class="col-md-6">
						
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
								<!--  <div class="form-group m-t-20">
									<input type="checkbox" id="Lunes" class="diasckeckbox" value="1"> Lunes
								</div> -->
								<!-- <div class="form-group m-t-20">
								<input type="checkbox" id="Martes" class="diasckeckbox" value="2"> Martes
								</div> -->
								<!-- <div class="form-group m-t-20">
								<input type="checkbox" id="Miercoles" class="diasckeckbox" value="3"> Miércoles
								</div> -->
								<!-- <div class="form-group m-t-20">
								<input type="checkbox" id="Jueves" class="diasckeckbox" value="4"> Jueves
								</div> -->
								<!-- <div class="form-group m-t-20">
								<input type="checkbox" id="Viernes" class="diasckeckbox" value="5"> Viernes
							</div> -->
						<!-- 	<div class="form-group m-t-20">
									<input type="checkbox" id="Sabado" class="diasckeckbox" value="6"> Sábado
								</div> -->

							</div>
							


					</div>

					

				</div>

				<div class="card" style="" id="divhorarios">
				<div class="card-header" style="margin-top: 1em;">
					<h5 id="lblhorarios">ASIGNAR HORARIOS</h5>

				</div>
				<div class="card-body">
						<div class="row">
							<div class="col-md-12">

								<div id="leyendahorarios" style="margin-left: 1em;margin-bottom: 1em;">

								Selecciona la fecha inicial y final para el periodo del servicio </div>
						<div class="row">
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

					</div>

					<div class="row">
						<div class="col-md-3">
							
							<div class="form-group m-t-20">
								<label>CANCHA:</label>
								<select name="" class="form-control" id="v_zonas" multiple="multiple"></select>
							</div>
						</div>


						<div class="col-md-3">
							
							<div class="form-group m-t-20">
								<label>HORARIOS:</label>
								<select  id="v_horarios" class="form-control" multiple="multiple" >
									<option value="0">Seleccionar horario</option>
								</select>
							</div>
						</div>

						</div>

						<div class="row">
							<div class="form-check " style="margin-left: 1em;justify-content: center;
    display: flex;">
	    <input type="checkbox" id="habilitarseleccion" class="form-check-input checkcambia" value="0" style="top: -0.3em;" onchange="HabilitarSeleccion()">
	    <label for="" class="form-check-label" style="margin-left: 10px;">Selección automática</label>

	   </div>
						</div>
								<div class="row"  style="margin-bottom: 1em;margin-top: 1em;">

													<div class="col-md-3" style="float:left;">
														<button type="button" style="    width: 100%;" onclick="Aplicar()" class="btn btn-primary">APLICAR</button>
													</div>

							</div>
							<div class="row">
								<div class="btnfechas" style="    width: 100%;display: none;margin-bottom: 1em;">
											<div class="col-md-3" style="float:left;">
												<button type="button" style="    width: 100%;" class="btn btn-primary" onclick="AbrirModalResumen();">
												  Resumen de fechas
												</button>
								   </div>

								   <div class="col-md-3" style="    margin-top: 40px;">
								   	<h4 id="titulototalhorarios" style="font-size: 18px!important;">Total de horarios: <span id="totalhorarios">0</span></h4>
								   </div>

								</div>
							</div>
						</div>

						<!-- <div class="col-md-12">
						<div class="form-group m-t-20 col-md-3">
							<label id="lblhorarios">* ASIGNAR HORARIOS</label>
						</div>
					</div> -->

					</div>

				
						<div style="margin-top: 3em;display: none;" id="calendario" >


							 <div id="picker"></div>



						 <div class="modal fade" id="exampleModalhorarios" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					  <div class="modal-dialog" role="document">
					    <div class="modal-content">
					      <div class="modal-header">
					        <h5 class="modal-title" id="exampleModalLabel">Fechas/Horas Seleccionadas</h5>
					        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
					          <span aria-hidden="true">&times;</span>
					        </button>
					      </div>
					      <div class="modal-body">
					        <div class="row">
										    	<div class="col-md-12">
										        <label></label>
										        <div id="selected-dates" class="list-group"></div>
										        </div>
										    </div>
					      </div>
					      <div class="modal-footer">
					        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>

					        <!--  <button type="button" class="btn btn-success" onclick="GuardarHorariostem()">Guardar</button> -->
					       
					      </div>
					    </div>
					  </div>
					</div>
					   


					    <div class="form-group">
							
							<!-- <button type="button" class="btn btn-success btncontinuar"  id="btncontinuar" style="float: right;">Continuar</button> -->

						</div>
					</div>
				</div>
			</div>


			</div>


		

 
  


   
   			 <div class="card"  id="divmodalidadcobro" style="">
   			 	<div class="row">
									<h4 style="margin-left: 20px;">DATOS AVANZADOS</h4>
								</div>

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
					               
					                  <input type="radio" class="form-check-input " name="v_grupo" value="1" id="v_individual" style="" onclick="ValidarCheckmodalidad(1)">
					                   <label class="form-check-label" style=" padding-top: 0.3em;">
										MONTO FIJO
					                </label>
				                </div>
				              </div>


				              <div class="col-md-6" style="float: left;width: 30%;">
								 						 	<div class="form-check">
					                 <input type="radio" class="form-check-input " name="v_grupo" value="2" id="v_grupal" style="" onclick="ValidarCheckmodalidad(2)">
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
																			   		 		<input type="checkbox" id="v_aceptarserviciopago" class="checkcambia" value="0" onchange="HabilitarOpcionaceptarserviciopago()">
																			   		 		
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
								<input type="number" id="v_numparticipantesmin" class="form-control" value="<?php echo $numeroparticipantesmin; ?>" placeholder="MÍNIMO" title="MÍNIMO">

							</div>


 
							   <div class="form-group m-t-20">
								<label for="" id="lblmaximo">* MÁXIMO:</label>
								<input type="number" id="v_numparticipantesmax" class="form-control" value="<?php echo $numeroparticipantes; ?>" placeholder="MÁXIMO" title="MÁXIMO">

							</div>

						</div>
						</div>
					</div>
								

							
				           <div class="card">

							<div class="card-header" style="">
							<h5 >PERIODOS DE COBRO</h5>

							</div>

							<div class="card-body">
							<label for="" id="lblperiodos" style="margin-top:1em;margin-bottom: 1em;">* PERIODOS DE COBRO:</label>
				              		 <button class="btn btn-primary" id="btnperiodo" type="button" style=" margin-top: -1em;margin-bottom: 1em;" onclick="AgregarPeriodo()">NUEVO PERIODO</button>
				              </div>

				              <div class="row" style="float: left;width: 50%;">

				              </div>



						</div>

						<div style="    margin-left: 1em;" id="periodos"></div>


						<div class="card">
							<div class="card-body">
								<!-- <button type="button" class="btn btn-success btncontinuar"  id="btncontinuar" style="float: right;">Continuar</button> -->

							</div>
							

						</div>

						
					</div>


					 


					

			<div class="card">
							<div class="card-body">
								
								
							</div>
							

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
										<input type="checkbox" class="checkcambia" id="v_asistencia" >

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
										<input type="checkbox" id="v_reembolso" class="checkcambia" onchange="HabilitarcantidadReembolso()">

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
									<input type="checkbox" class="checkcambia" id="v_asignadocliente" >
								</div>

								<div class="form-group m-t-20">
									<label for="">CANCELADO POR COACH</label>
									<span style="width: 20px;margin-left: 0.5em;"></span>
									<input type="checkbox" class="checkcambia" id="v_asignadocoach" >
								</div>

									<div class="form-group m-t-20">
									<label for="">CANCELADO POR ADMIN</label>
									<span style="width: 20px;margin-left: 0.5em;"></span>
									<input type="checkbox" class="checkcambia" id="v_asignadoadmin">
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
										<span style="width: 20px;margin-left: 0.5em;"></span><input type="checkbox" class="checkcambia" id="v_abiertocliente">
									</div>

 								<div class="form-group m-t-20">
										<label for="">PERMITIR ASIGNAR AL COACH</label>
									<span style="width: 20px;margin-left: 0.5em;"></span><input type="checkbox" class="checkcambia" id="v_abiertocoach">
								</div>

 								<div class="form-group m-t-20">
								<label for="">PERMITIR ASIGNAR AL ADMIN</label>
								<span style="width: 20px;margin-left: 0.5em;"></span><input type="checkbox" class="checkcambia" id="v_abiertoadmin">
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
									<span style="width: 20px;margin-left: 0.5em;"></span><input type="checkbox" class="checkcambia" id="v_ligarclientes" onchange="Permitirligar()">
								</div>

								<div class="form-group m-t-20" id="cantidadligar" style="display: none;">
									<label for="">CANTIDAD</label>
									<input type="number" class="form-control" id="v_numligarclientes" value="<?php echo $numligarclientes; ?>">
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
									  <input  type="checkbox"  value="<?php echo $a_descuentos['iddescuento']?>" class="form-check-input chkdescuento" id="inputdescuento_<?php echo $a_descuentos['iddescuento']?>" <?php echo $valor; ?>>
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
					    <?php     	
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
						    	<?php } ?>    
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
                    <div class="encuesta"  style="overflow:scroll;height:100px;overflow-x: hidden" id="encuesta_">
					    <?php     	
							if ($r_encuesta_num>0) {	
						    	do {
						?>
						    	<div class="form-check encuesta_" style="    margin-top: 1em;
    margin-bottom: 1em;justify-content: left;
    display: flex;"  id="cli_<?php echo $a_encuesta['idencuesta'];?>">
						    	    <?php 	
						    			$valor="";
             $nombre=mb_strtoupper($f->imprimir_cadena_utf8($a_encuesta['titulo']));
						    		?>
									  <input  type="checkbox" onchange=""  style="float: left;"  value="<?php echo $a_encuesta['idencuesta']?>" class="form-check-input checkcambia chkencuesta" id="inputencuesta_<?php echo $a_encuesta['idencuesta']?>" <?php echo $valor; ?>>
									  <label class="form-check-label" for="flexCheckDefault" style="margin-left: 10px;"><?php echo $nombre; ?></label>
								</div>						    		
						    	<?php
						    		} while ($a_encuesta = $db->fetch_assoc($r_encuesta));
     					    	 ?>
						    	<?php } ?>    
								    </div>
				                </div> 
							</div>
						</div>

					  

							<div class="card">
							<div class="card-body">
							<!-- 	<button type="button" class="btn btn-success btncontinuar"  id="btncontinuar" style="float: right;">Continuar</button> -->
								
							</div>
							

						</div>
					</div>


			
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


							 	<div class="card" style="" id="divcoachs">
				<div class="card-header" style="margin-top: 1em;">
					<h5>ASIGNAR COACHES</h5>

				</div>
				<div class="card-body">
					<div class="row">
					  <div class="col-md-12">
					<div class="card-body" id="lclientesdiv" style="display: block; padding: 0;">
						<button class="btn btn-primary" type="button" style="margin-bottom: 1em;" onclick="AgregarNuevoCoach()" id="btncoach">AGREGAR COACH</button>

						<div id="listadocoaches"></div>
                
                   <!--  <div class="form-group m-t-20">	 
						<input type="text" class="form-control" name="buscadorcoachs_1" id="buscadorcoachs_" placeholder="Buscar" onkeyup="BuscarEnLista('#buscadorcoachs_','.coachs_')">
				    </div>
                    <div class="clientes"  style="overflow:scroll;height:100px;overflow-x: hidden" id="clientes_<?php echo $a_cliente['idcliente'];?>">
					    <?php     	
							if ($r_coach_num>0) {	
						    	do {
						?>
						    	<div class="form-check coachs_"  id="cli_<?php echo $a_coach['idusuarios'];?>_<?php echo $a_coach['idcliente'];?>">
						    	    <?php 	
						    			$valor="";
            $nombre=mb_strtoupper($f->imprimir_cadena_utf8($a_coach['nombre']." ".$a_coach['paterno']." ".$a_coach['materno']));
						    		?>
									  <input  type="checkbox" onchange="CoachSeleccionado()"  value="<?php echo $a_coach['idusuarios']?>" class="form-check-input chkcoach" id="inputcoach_<?php echo $a_coach['idusuarios']?>" <?php echo $valor; ?>>
									  <label class="form-check-label" for="flexCheckDefault" style="margin-top: 0.2em;"><?php echo $nombre; ?></label>
								</div>						    		
						    	<?php
						    		} while ($a_coach = $db->fetch_assoc($r_coach));
     					    	 ?>
						    	<?php } ?>    
				    </div> -->
                </div> 
								</div>
							</div>
					</div>
			</div>
			
		

					<div class="tab-pane fade" id="otros" role="tabpanel" aria-labelledby="otros-tab">

					</div>



				</div>
			</div>
		</div>

			<div class="card" style="" id="divperiodos">
		
				<div class="card-body">
						<div style="">
						

					</div>
				</div>
			</div>
	</div>

   </div>

</div>


		</div>


	</div>
</form>
		</div>
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
//var checkboxes = document.querySelectorAll('input[type="checkbox"]');

var checkboxes = document.querySelectorAll('.checkcambia');

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
	
				
				ObtenerTipoServicioConfiguracion();
				CargarCalendario();

			var idservicio='<?php echo $idservicio?>';
			var fecha='<?php echo date('Y-m-d'); ?>';

			$("#v_fechainicial").val(fecha);
			$("#v_fechafinal").val(fecha);
			var arraydiaselegidos=[];
			var arraydiaseleccionados=[];
			if (idservicio>0) {
				var idcategoriaservicio='<?php echo $idcategoriaservicio; ?>';
		  var aceptarserviciopago='<?php echo $aceptarserviciopago; ?>';
		  var idcategoria='<?php echo $idcategoria; ?>';
		$("#v_categoria").val(idcategoriaservicio);

		$("#v_categoriaservicio").val(idcategoria);
		  var idpoliticaaceptacion='<?php echo $idpoliticaaceptacion; ?>';

		$("#v_politicasaceptacionid").val(idpoliticaaceptacion);

		 SeleccionarCategoria(idservicio);
		// Obtenerparticipantes(3,idservicio);
		 ObtenerZonas(idservicio);
		// ObtenerCoachs(5,idservicio);

		VerificarSihaypago(idservicio);
		ObtenerCoachsParticipantes(5,idservicio);

		 ObtenerDescuentos(idservicio);
		 ObtenerMembresias(idservicio);
		 ObtenerEncuestas(idservicio);

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


		 var lunes='<?php echo $lunes; ?>';
		var martes='<?php echo $martes;?>';
		var miercoles='<?php echo $miercoles; ?>';
		var jueves='<?php echo $jueves;?>';
		var viernes='<?php echo $viernes;?>';
		var sabado='<?php echo $sabado;?>';
		var domingo='<?php echo $domingo; ?>';

		if (lunes==1) {
			//$("#Lunes").attr('checked',true);
			$(".lbllunes").addClass('active');
		}
		if (martes==1) {
			//$("#Martes").attr('checked',true);
			$(".lblmartes").addClass('active');
		}
		if (miercoles==1) {
			//$("#Miercoles").attr('checked',true);
			$(".lblmiercoles").addClass('active');

		}
		if (jueves==1) {
			//$("#Jueves").attr('checked',true);
			$(".lbljueves").addClass('active');

		}
		if (viernes==1) {
			//$("#Viernes").attr('checked',true);
			$(".lblviernes").addClass('active');

		}
		if (sabado==1) {
			//$("#Sabado").attr('checked',true);
			$(".lblsabado").addClass('active');

		}
		if (domingo==1) {
			//$("#Domingo").attr('checked',true);
			$(".lbldomingo").addClass('active');

		}

		var fechainicial='<?php echo $fechainicial; ?>';
		var fechafinal='<?php echo $fechafinal; ?>';
		
		$("#v_fechainicial").val(fechainicial);
		$("#v_fechafinal").val(fechafinal);

		ObtenerHorariosSemana(idservicio);
		ObtenerHorariosServicioComprobacion(idservicio);
		ObtenerPeriodos(idservicio);
		ObtenerEspacios();

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
	}else{
		arraydiaseleccionados=[];
		horarioscomparacion=[];
		AgregarPeriodo();
	}
	CambioPeriodo();

	
	    function SubirImagenservicio() {
	 	// body...
	 
        var formData = new FormData();
        var files = $('#image')[0].files[0];
        formData.append('file',files);
        $.ajax({
            url: 'catalogos/servicios/upload.php',
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
             beforeSend: function() {
         $("#d_foto").css('display','block');
     	 $("#d_foto").html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Cargando...</div>');	

		    },
            success: function(response) {
               	var ruta='<?php echo $ruta; ?>';
	
                if (response != 0) {
                    $(".card-img-top").attr("src", response);
                    $("#d_foto").css('display','none');
                } else {

                	 $("#d_foto").html('<img src="'+ruta+'" class="card-img-top" alt="" style="border: 1px #777 solid"/> ');
                    alert('Formato de imagen incorrecto.');
                }
            }
        });
        return false;
    }
			</script>
			 <script type="text/javascript">
  $('#v_horarios').SumoSelect({placeholder: 'Seleccionar horarios',
			     selectAll : true,
   				 selectAllPartialCheck : true,
       locale :  ['Aceptar', 'Cancelar', 'Seleccionar todos'],
					closeAfterClearAll: true,
				 });
  $('#v_zonas').SumoSelect({placeholder: 'Seleccionar espacios',
			    selectAll : true,
   				selectAllPartialCheck : true,
       locale :  ['Aceptar', 'Cancelar', 'Seleccionar todos'],
				closeAfterClearAll: true
  	 });



   	$("#v_categoriaservicio").attr('onchange','ObtenerEspacios()');

   	  	$("#v_zonas").attr('onchange','ObtenerHorariosCategoria()');

      /*  (function($) {*/
   /* var calendario=$('#picker').markyourcalendar({
          	 startDate: new Date(),
         

             months: ['ene','feb','mar','abr','may','jun','jul','agos','sep','oct','nov','dic'],

              weekdays: ['dom','lun','mar','mier','jue','vier','sab'],

            isMultiple: true,
            
            onClickNavigator: function(ev, instance) {

            	HorariosDisponibles2();
              
            }
          });*/
       /* })(jQuery);*/
    </script>

    <style>
    	.SumoSelect{
					width: 100%;
				}

				.SumoSelect .select-all{
					height: 40px!important;
				}
    </style>

<?php

?>