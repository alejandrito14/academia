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

$idmenumodulo = $_GET['idmenumodulo'];

//Se crean los objetos de clase
$db = new MySQL();
$emp = new Servicios();
$f = new Funciones();
$bt = new Botones_permisos();
$cate=new Categorias();
$cate->db=$db;
$obtenercat=$cate->ObtenerCategoriasEstatus(1);

$cateservicios=new CategoriasServicios();
$cateservicios->db=$db;
$obtenercateservicios=$cateservicios->ObtcategoriasservicioActivos();

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

$emp->db = $db;

$emp->tipo_usuario = $tipousaurio;
$emp->lista_empresas = $lista_empresas;

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
	$titulo1=$f->imprimir_cadena_utf8($result_SERVICIO_row['titulo']);
	$descripcion=$f->imprimir_cadena_utf8($result_SERVICIO_row['descripcion']);
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
<div id="idmenumodulo" style="display: none;"><?php echo $idmenumodulo; ?></div>

<form id="f_servicio" name="f_servicio" method="post" action="">
	<div class="card">
		<div class="card-body">
		<h4 class="card-title m-b-0" style="float: left;"><?php echo $titulo; ?></h4>

		<div style="float: right;position:fixed!important;z-index:10;right:0;margin-right:2em;width: 20%;">
				
				<?php
			
					//SCRIPT PARA CONSTRUIR UN BOTON
					$bt->titulo = "GUARDAR";
					$bt->icon = "mdi mdi-content-save";
					$bt->funcion = " Guardarservicio('f_servicio','catalogos/servicios/vi_servicios.php','main','$idmenumodulo');";
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
			
					$bt->armar_boton();
				?>
				
			
				
				<button type="button" onClick="aparecermodulos('catalogos/servicios/vi_servicios.php?idmenumodulo=<?php echo $idmenumodulo;?>','main');" class="btn btn-primary" style="float: right; margin-right: 10px;"><i class="mdi mdi-arrow-left-box"></i>VER LISTADO</button>
				<div style="clear: both;"></div>
				
				<input type="hidden" id="id" name="id" value="<?php echo $idservicio; ?>" />
			</div>


			
			<div style="clear: both;"></div>
		</div>
	</div>
	


	<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button onclick="ActivarTab(this,'home')" class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true" onclick="">CONFIGURAR SERVICIO</button>
  </li>
  <li class="nav-item" role="presentation">
    <button type="button"  class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">SELECCIONAR DÍAS</button>

<!--     onclick="ActivarTab(this,'profile')"
 -->  </li>
  <li class="nav-item" role="presentation">
    <button type="button"  class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">ASIGNAR HORARIOS</button>

<!--     onclick="ActivarTab(this,'contact')"
 -->  </li>

   <li class="nav-item" role="presentation">
    <button  type="button" class="nav-link" id="costos-tab" data-bs-toggle="tab" data-bs-target="#costos" type="button" role="tab" aria-controls="costos" aria-selected="false">ASIGNAR COSTOS</button>

<!--     onclick="ActivarTab(this,'costos')"
 -->  </li>



 <li class="nav-item" role="presentation" >
    <button  type="button" onclick="ActivarTab(this,'coaches')" class="nav-link" id="coach-tab" data-bs-toggle="tab" data-bs-target="#coach" type="button" role="tab" aria-controls="coach" aria-selected="false">ASIGNAR COACHES</button>

  </li>

   <li class="nav-item" role="presentation" >
    <button  type="button" onclick="ActivarTab(this,'multi')" class="nav-link" id="multi-tab" data-bs-toggle="tab" data-bs-target="#multi" type="button" role="tab" aria-controls="multi" aria-selected="false">MULTI - COACHES</button>
  </li>

   <li class="nav-item" role="presentation">
    <button  type="button" onclick="ActivarTab(this,'politicas')" class="nav-link" id="politicas-tab" data-bs-toggle="tab" data-bs-target="#politicas" type="button" role="tab" aria-controls="politicas" aria-selected="false">POLÍTICAS DE CANCELACIÓN</button>

<!--     onclick="ActivarTab(this,'politicas')"
 -->  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
  		<div class="">
			<div class="card">
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
								<label>*TÍTULO:</label>
								<input type="text" class="form-control" id="v_titulo" name="v_titulo" value="<?php echo $titulo1; ?>" title="TÍTULO" placeholder='TÍTULO' onblur="Colocardescripcion()">
							</div>

							<div class="form-group m-t-20">
								<label>*DESCRIPCIÓN:</label>
								<textarea name="v_descripcion" id="v_descripcion" placeholder="DESCRIPCIÓN" class="form-control"><?php echo $descripcion; ?></textarea>
							</div>
							
						

							<div class="form-group m-t-20">
								<label for="">*TIPO DE SERVICIO:</label>
								<select name="v_categoria" id="v_categoria" onchange="SeleccionarCategoria(0)" class="form-control">
									<option value="0" >SELECCIONAR TIPO DE SERVICIO</option>

									<?php if (count($obtenercat)){

										for ($i=0; $i <count($obtenercat) ; $i++) {  ?>
											<option value="<?php echo $obtenercat[$i]->idcategorias;?>"><?php echo $obtenercat[$i]->titulo; ?></option>
										
										
									<?php 
									}
								} ?>
									
								</select>
							</div>

							<div class="form-group m-t-20">
								<label>*ORDEN:</label>
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
							
							<button class="btn btn-success" id="btncontinuar">Continuar</button>

						</div>

						</div>
							
						</div>
						
			
			</div>
		</div>

  </div>
  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
  		<div class="card" id="divdias"  >
				<div class="card-header" style="margin-top: 1em;">
					<h5>DÍAS</h5>
				</div>
				<div class="card-body">
					<div class="col-md-6">
						
						<div class="form-group m-t-20">
								<label for="" id="lbldias">*SELECCIONAR DÍAS:</label>

								<div id="leyenda" style="margin-bottom: 1em;"></div>
								 <div class="form-group m-t-20">
								 	    <div class="btn-group btn-group-toggle d-flex flex-column flex-md-row" data-toggle="buttons">

								 	 <label class="btn btn_colorgray2 lbldomingo">
								    <input type="checkbox" id="Domingo" class="diasckeckbox" value="0"> Domingo
								  </label>


								 	 <label class="btn btn_colorgray2 lbllunes">
								   <input type="checkbox" id="Lunes" class="diasckeckbox" value="1"> Lunes
								  </label>


								   <label class="btn btn_colorgray2 lblmartes">
								  <input type="checkbox" id="Martes" class="diasckeckbox" value="2"> Martes
								  </label>

								   <label class="btn btn_colorgray2 lblmiercoles">
								 <input type="checkbox" id="Miercoles" class="diasckeckbox" value="3"> Miércoles
								  </label>

								   <label class="btn btn_colorgray2 lbljueves">
								 <input type="checkbox" id="Jueves" class="diasckeckbox" value="4"> Jueves
								  </label>

								   <label class="btn btn_colorgray2 lblviernes">
								<input type="checkbox" id="Viernes" class="diasckeckbox" value="5"> Viernes
								  </label>

								   <label class="btn btn_colorgray2 lblsabado">
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

			</div>


			<div class="card" id="divcategoria" style="">
				<div class="card-header" style="margin-top: 1em;">
					<h5>ASIGNAR CATEGORÍA</h5>
				</div>
				<div class="card-body">
					<div class="col-md-6">
						
						<div class="form-group m-t-20">
								<label for="" id="lblcategoria">*CATEGORIA:</label>
								<select name="v_categoriaservicio" id="v_categoriaservicio" class="form-control">
									<option value="0" >SELECCIONAR CATEGORÍA</option>

									<?php

									 if (count($obtenercateservicios)){

										for ($i=0; $i <count($obtenercateservicios) ; $i++) {  ?>
											<option value="<?php echo $obtenercateservicios[$i]->idcategoriasservicio;?>"><?php echo $obtenercateservicios[$i]->nombrecategoria; ?></option>
										
								
										
									<?php 
									}
								} ?>
									
								</select>
							</div>
							


					</div>
				</div>

			</div>

  </div>
  <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
  	<div class="card" style="" id="divhorarios">
				<div class="card-header" style="margin-top: 1em;">
					<h5>ASIGNAR HORARIOS</h5>

				</div>
				<div class="card-body">
						<div class="row">
							<div class="col-md-12">

								<div id="leyendahorarios" style="margin-left: 1em;margin-bottom: 1em;">

								Selecciona la fecha inicial y final para elegir el periodo del servicio </div>

							<div class="col-md-3" style="float:left;">
							<div class="form-group m-t-20">
								<label>*FECHA INICIAL:</label>
								<input type="date" class="form-control" id="v_fechainicial" name="v_fechainicial" value="<?php echo $fechainicial; ?>" title="FECHA INICIAL" placeholder='FECHA INICIAL'>
							</div>

						</div>
						<div class="col-md-3" style="float:left;">
							<div class="form-group m-t-20">
								<label>*FECHA FINAL:</label>
								<input type="date" class="form-control" id="v_fechafinal" name="v_fechafinal" value="<?php echo $fechafinal; ?>" title="FECHA FINAL" placeholder='FECHA FINAL'>
							</div>
						</div>

						<div class="col-md-3" style="float:left;">
							<button type="button" style="    margin-top: 2em;" onclick="HorariosDisponibles()" class="btn btn-primary">APLICAR</button>
						</div>

						</div>

						<div class="col-md-12">
						<div class="form-group m-t-20 col-md-3">
							<label id="lblhorarios">*ASIGNAR HORARIOS</label>
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


					</div>
				</div>
			</div>



  </div>


   <div class="tab-pane fade" id="costos" role="tabpanel" aria-labelledby="profile-tab">
   			 <div class="card"  id="divmodalidadcobro" style="">
				<div class="card-header" style="margin-top: 1em;">
					<h5>ASIGNAR COSTO</h5>

				</div>
				<div class="card-body">

				
				     


				          <div class="row">
				          	<div class="col-md-6">
							<div class="form-group m-t-20" id="preciounitariodiv" style="padding-top: 1em;">
								<label for="" id="lblcostounitario">*COSTO UNITARIO $:</label>
								<input type="number" id="v_costo" class="form-control" value="<?php echo $costo; ?>" placeholder="COSTO UNITARIO" title="COSTO UNITARIO" onblur="CambiarNumeros()">

							</div>

							
							</div>
						
					</div>
				</div>

				<div class="card">
					<div class="card-header">
						<h5>MODALIDAD DE COBRO</h5></div>
					<div class="card-body">
						
							
					<div class="col-md-6">
						<p for=""><label for="" class="divmodo">*MONTO:</label></p>

						<div class="form-group" style="float: left;width: 30%;">
								 	<div class="form-check">
					               
					                  <input type="radio" class="form-check-input " name="v_grupo" value="1" id="v_individual" style="" >
					                   <label class="form-check-label" style=" padding-top: 0.3em;">
										MONTO FIJO
					                </label>
				                </div>
				              </div>


				              <div class="form-group" style="float: left;width: 30%;">
								 	<div class="form-check">
					                 <input type="radio" class="form-check-input " name="v_grupo" value="2" id="v_grupal" style="" >
					                   <label class="form-check-label" style=" padding-top: 0.3em;">
										MONTO DIVIDIDO
					                </label>
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
								<label for="" id="lblminimo">*MÍNIMO:</label>
								<input type="number" id="v_numparticipantesmin" class="form-control" value="<?php echo $numeroparticipantesmin; ?>" placeholder="MÍNIMO" title="MÍNIMO">

							</div>



							   <div class="form-group m-t-20">
								<label for="" id="lblmaximo">*MÁXIMO:</label>
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
							<label for="" id="lblperiodos" style="margin-top:1em;margin-bottom: 1em;">*PERIODOS DE COBRO:</label>
				              		 <button class="btn btn-primary" id="btnperiodo" type="button" style=" margin-top: -1em;margin-bottom: 1em;" onclick="AgregarPeriodo()">NUEVO PERIODO</button>
				              </div>

				              <div class="row" style="float: left;width: 50%;">

				              </div>



						</div>

						<div style="    margin-left: 1em;" id="periodos"></div>
					</div>


					 <div class="tab-pane fade" id="coaches" role="tabpanel" aria-labelledby="coach-tab">


					 	<div class="card" style="" id="divcoachs">
				<div class="card-header" style="margin-top: 1em;">
					<h5>ASIGNAR COACHES</h5>

				</div>
				<div class="card-body">
					<div class="row">
								<div class="col-md-6">
									<div class="card-body" id="lclientesdiv" style="display: block; padding: 0;">
                
                    <div class="form-group m-t-20">	 
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
				    </div>
                </div> 
								</div>
							</div>
					</div>
			</div>
					 </div>

			<div class="tab-pane fade" id="multi" role="tabpanel" aria-labelledby="multi-tab">

				<div class="card" style="" id="divcoachs">
				<div class="card-header" style="margin-top: 1em;">
					<h5>MULTI-COACHES</h5>

				</div>
				<div class="card-body">
					<div class="row">
								<div class="col-md-6">
									 <div class="form-group m-t-20">
										<label for="">ABIERTO CLIENTE</label>
										<input type="checkbox" id="v_abiertocliente">
									</div>

 								<div class="form-group m-t-20">
										<label for="">ABIERTO COACH</label>
									<input type="checkbox" id="v_abiertocoach">
								</div>

 								<div class="form-group m-t-20">
											<label for="">ABIERTO ADMIN</label>
											<input type="checkbox" id="v_abiertoadmin">
								</div>

									<div class="form-group m-t-20">
											<label for="">PERMITIR LIGAR CLIENTES</label>
											<input type="checkbox" id="v_ligarclientes">
								</div>

								


								</div>
							</div>
						</div>

					  </div>

					  	<div class="card" style="" id="divcoachs">
								<div class="card-header" style="margin-top: 1em;">
									<h5>AVISOS</h5>

								</div>
								<div class="card-body">
										<div class="row">
								<div class="col-md-6">
									<div class="form-group m-t-20">
											<label for="">TIEMPO DE AVISOS (minutos)</label>
											<input type="text" id="v_tiempoaviso" class="form-control">
								</div>

								<div class="form-group m-t-20">
											<label for="">TÍTULO:</label>
											<input type="text" id="v_tituloaviso" class="form-control">
								</div>

									<div class="form-group m-t-20">
												<label for="">DESCRIPCIÓN:</label>
												<input type="text" id="v_descripcionaviso" class="form-control">
									</div>

								</div>
							</div>

								</div>

							</div>
					</div>


					   <div class="tab-pane fade" id="politicas" role="tabpanel" aria-labelledby="politicas-tab">

					   	<div class="card" style="" id="divpoliticas">
				<div class="card-header" style="margin-top: 1em;">
					<h5>POLÍTICAS DE CANCELACIÓN</h5>

				</div>
				<div class="card-body">
					<div class="row">
								<div class="col-md-6">

									 <div class="form-group m-t-20">
									<label for="">DESCRIPCIÓN</label>
									<textarea name="" id="v_politicascancelacion" cols="20" rows="5" class="form-control"></textarea>

									</div>


					   		 <div class="form-group m-t-20">
									<label for="">REEMBOLSO</label>
										<input type="checkbox" id="v_reembolso">

									</div>
 								<div class="form-group m-t-20">
									<label for="">CANTIDAD $:</label>
									<input type="text" id="v_cantidadreembolso" class="form-control">
								</div>


								<div class="form-group m-t-20">
									<label for="">ASIGNADO POR CLIENTE:</label>
									<input type="checkbox" id="v_asignadocliente" >
								</div>

								<div class="form-group m-t-20">
									<label for="">ASIGNADO POR COACH:</label>
									<input type="checkbox" id="v_asignadocoach" >
								</div>

									<div class="form-group m-t-20">
									<label for="">ASIGNADO POR ADMIN:</label>
									<input type="checkbox" id="v_asignadoadmin">
								</div>

					  </div>
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

	
	<!-- <div class="row">
		<div class="<?php echo $col; ?>">
			<div class="card">
				<div class="card-header" style="padding-bottom: 0; padding-right: 0; padding-left: 0; padding-top: 0;">

				</div> -->

			<!-- 	<div class="card-body">
					
					
					

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
								           <input type="button" class="btn btn-primary upload" value="Subir"> -->
								      <!--   </div>
								    </div>
								</form>

									<p style="text-align: center;">Dimensiones de la imagen Ancho:640px Alto:360px</p>
								</div>

							<div class="col-md-6">
							<div class="form-group m-t-20">
								<label>*TÍTULO:</label>
								<input type="text" class="form-control" id="v_titulo" name="v_titulo" value="<?php echo $titulo1; ?>" title="TÍTULO" placeholder='TÍTULO'>
							</div>

							<div class="form-group m-t-20">
								<label>DESCRIPCIÓN:</label>
								<textarea name="v_descripcion" id="v_descripcion" placeholder="DESCRIPCIÓN" class="form-control"><?php echo $descripcion; ?></textarea>
							</div>
							
						

							<div class="form-group m-t-20">
								<label for="">*TIPO DE SERVICIO:</label>
								<select name="v_categoria" id="v_categoria" onchange="SeleccionarCategoria()" class="form-control">
									<option value="0" >SELECCIONAR TIPO DE SERVICIO</option>

									<?php if (count($obtenercat)){

										for ($i=0; $i <count($obtenercat) ; $i++) {  ?>
											<option value="<?php echo $obtenercat[$i]->idcategorias;?>"><?php echo $obtenercat[$i]->titulo; ?></option>
										
										
									<?php 
									}
								} ?>
									
								</select>
							</div>

							<div class="form-group m-t-20">
								<label>*ORDEN:</label>
								<input type="text" class="form-control" id="v_orden" name="v_orden" value="<?php echo $orden; ?>" title="ORDEN" placeholder='ORDEN'>
							</div>

						<div class="form-group m-t-20">
							<label>ESTATUS:</label>
							<select name="v_estatus" id="v_estatus" title="Estatus" class="form-control"  >
								<option value="0" <?php if($estatus == 0) { echo "selected"; } ?> >DESACTIVO</option>
								<option value="1" <?php if($estatus == 1) { echo "selected"; } ?> >ACTIVO</option>
							</select>
						</div>

						</div>
							 -->
						
				<!-- </div>
			</div>

		

				<div class="card" id="divdias" style="display: none;" >
				<div class="card-header">
					<h5>DIAS</h5>
				</div>
				<div class="card-body">
					<div class="col-md-6">
						
						<div class="form-group m-t-20">
								<label for="">*SELECCIONAR DIAS:</label>
								 <div class="form-group m-t-20">
									<input type="checkbox" id="Domingo" class="diasckeckbox" value="0"> Domingo
								</div>
								 <div class="form-group m-t-20">
									<input type="checkbox" id="Lunes" class="diasckeckbox" value="1"> Lunes
								</div>
								<div class="form-group m-t-20">
								<input type="checkbox" id="Martes" class="diasckeckbox" value="2"> Martes
								</div>
								<div class="form-group m-t-20">
								<input type="checkbox" id="Miercoles" class="diasckeckbox" value="3"> Miércoles
								</div>
								<div class="form-group m-t-20">
								<input type="checkbox" id="Jueves" class="diasckeckbox" value="4"> Jueves
								</div>
								<div class="form-group m-t-20">
								<input type="checkbox" id="Viernes" class="diasckeckbox" value="5"> Viernes
							</div>
							<div class="form-group m-t-20">
									<input type="checkbox" id="Sabado" class="diasckeckbox" value="6"> Sábado
								</div>

							</div>
							


					</div>
				</div>

			</div>
 -->
	<!-- 	<div class="card" id="divcategoria" style="display: none;">
				<div class="card-header">
					<h5>ASIGNAR CATEGORÍA</h5>
				</div>
				<div class="card-body">
					<div class="col-md-6">
						
						<div class="form-group m-t-20">
								<label for="">*CATEGORIA:</label>
								<select name="v_categoriaservicio" id="v_categoriaservicio" class="form-control">
									<option value="0" >SELECCIONAR CATEGORÍA</option>

									<?php

									 if (count($obtenercateservicios)){

										for ($i=0; $i <count($obtenercateservicios) ; $i++) {  ?>
											<option value="<?php echo $obtenercateservicios[$i]->idcategoriasservicio;?>"><?php echo $obtenercateservicios[$i]->nombrecategoria; ?></option>
										
								
										
									<?php 
									}
								} ?>
									
								</select>
							</div>
							


					</div>
				</div>

			</div> -->

		<!-- 	<div class="card" style="display: none;" id="divzonas">
				<div class="card-header" style="">
					<h5>ASIGNAR ESPACIO</h5>

				</div>
				<div class="card-body">
						
						<div class=" col-md-6">
							
						
					 <div class="form-group m-t-20">	 
						<input type="text" class="form-control" name="buscadorzonas_1" id="buscadorzonas_" placeholder="Buscar" onkeyup="BuscarEnLista('#buscadorzonas_','.zonas_')">
				    </div>
				    </div>
				     <div class="clientes col-md-6"  style="overflow:scroll;height:100px;overflow-x: hidden" >
					    <?php     	
							if ($num_zonas>0) {	
						    	do {
						?>
						    	<div class="form-check zonas_"  id="cli_<?php echo $rowzonas['idzona'];?>_<?php echo $rowzonas['idzona'];?>">
						    	    <?php 	
						    			$valor="";
                                        $nombre=mb_strtoupper($f->imprimir_cadena_utf8($rowzonas['nombre']));
                                        $color=$rowzonas['color'];
						    		?>
									  <input  type="checkbox" onchange=""  value="<?php echo $rowzonas['idzona']?>" class="form-check-input chkzona" id="inputz_<?php echo $rowzonas['idzona']?>" <?php echo $valor; ?>>
									  <label id="lblzona_<?php echo $rowzonas['idzona']?>"class="form-check-label" for="flexCheckDefault" style="margin-top: 0.2em;"><?php echo $nombre; ?></label><div id="divzona_<?php echo $rowzonas['idzona']?>"  style="height: 20px;    float: right;width:50px;background: <?php echo $color; ?>"></div>
								</div>						    		
						    	<?php
						    		} while ($rowzonas = $db->fetch_assoc($r_zonas));
     					    	 ?>
						    	<?php } ?>    
				    </div>
					</div>
			</div>
	
 -->

			<!-- <div class="card" id="divmodalidadpago" style="display: none; padding-bottom: 1em;">

				<div class="card-header" style="">
					<h5>MODALIDAD DE PAGO</h5>

				</div>

				<div class="card-body">

					<div class="col-md-6" >
					<div id="" >

							<div class="form-group m-t-20">
									<label for=""></label>

							</div>

						<div class="form-group" style="float: left;width: 50%;">
								 	<div class="form-check">
					               
					                  <input type="radio" class="form-check-input " name="v_grupo2" onchange="CambioPeriodo()" value="1" id="v_habilitarevento" style="" >
					                   <label class="form-check-label" style="    padding-top: 0.3em;">
										POR EVENTO
					                </label>
				                </div>
				              </div>


				              <div class="form-group" style="float: left;width: 50%;">
								 	<div class="form-check">
					                 <input type="radio" class="form-check-input " name="v_grupo2" onchange="CambioPeriodo()" value="2" id="v_habilitarperiodo" style="" >
					                   <label class="form-check-label" style="    padding-top: 0.3em;">
										POR PERIODO
					                </label>
				                </div>
				              </div>
				          </div>

				          
				              <div class="form-group" style="display: none;" id="divperidodo">
								 <label for="">PERIODO:</label>
								 	<select name="v_periodo" id="v_periodo" title="PERIODO" class="form-control"  >
								 		<option value="0">SELECCIONAR EL PERIODO</option>
								 		<option value="1">MENSUAL</option>
								 		<option value="2">ANUAL</option>
									</select>
				              </div>

				</div>
			</div>

			</div> -->

			<!-- <div class="card" style="display: none;" id="divhorarios">
				<div class="card-header" style="">
					<h5>ASIGNAR HORARIOS</h5>

				</div>
				<div class="card-body">
						<div class="row">
							<div class="col-md-12">

							<div class="col-md-4" style="float:left;">
							<div class="form-group m-t-20">
								<label>*FECHA INICIAL:</label>
								<input type="date" class="form-control" id="v_fechainicial" name="v_fechainicial" value="<?php echo $fechainicial; ?>" title="FECHA INICIAL" placeholder='FECHA INICIAL'>
							</div>

						</div>
						<div class="col-md-4" style="float:left;">
							<div class="form-group m-t-20">
								<label>*FECHA FINAL:</label>
								<input type="date" class="form-control" id="v_fechafinal" name="v_fechafinal" value="<?php echo $fechafinal; ?>" title="FECHA FINAL" placeholder='FECHA FINAL'>
							</div>
						</div>

						<div class="col-md-4" style="float:left;">
							<button type="button" style="    margin-top: 2em;" onclick="HorariosDisponibles()" class="btn btn-primary">FILTRAR HORARIOS</button>
						</div>

						</div>
					</div>


						<div style="margin-top: 3em">

							 <div id="picker"></div>
					    <div class="row">
					    	<div class="col-md-4">
					        <label>Fechas/Horas Seleccionadas:</label>
					        <div id="selected-dates"></div>
					        </div>
					    </div>


					</div>
				</div>
			</div>
 -->
<!-- 
			<div class="card"  id="divmodalidadcobro" style="display: none;">
				<div class="card-header" style="">
					<h5>ASIGNAR COSTO</h5>

				</div>
				<div class="card-body">

						<div class="col-md-6" >
						<div id="divmodalidad">

							<div class="form-group m-t-20">
									<label for="">*MODALIDAD:</label>

							</div>

						<div class="form-group" style="float: left;width: 50%;">
								 	<div class="form-check">
					               
					                  <input type="radio" class="form-check-input " name="v_grupo" value="1" id="v_individual" style="" >
					                   <label class="form-check-label" style=" padding-top: 0.3em;">
										MONTO FIJO
					                </label>
				                </div>
				              </div>


				              <div class="form-group" style="float: left;width: 50%;">
								 	<div class="form-check">
					                 <input type="radio" class="form-check-input " name="v_grupo" value="2" id="v_grupal" style="" >
					                   <label class="form-check-label" style=" padding-top: 0.3em;">
										MONTO DIVIDIDO
					                </label>
				                </div>
				              </div>
				          </div>

				        <div class="form-group m-t-20">
								<label for="">No. PARTICIPANTES:</label>
								<input type="number" id="v_numparticipantes" class="form-control" value="<?php echo $numeroparticipantes; ?>" placeholder="NÚMERO DE PARTICIPANTES" title="NÚMERO DE PARTICIPANTES">

							</div>
 -->


				          
							<!-- <div class="form-group m-t-20">
								<label for="">*FECHA INICIAL:</label>
								<input type="date" id="v_fechainicial" class="form-control" value="<?php echo $fechainicial; ?>" placeholder="FECHA INICIAL" title="FECHA INICIAL">

							</div>


							<div class="form-group m-t-20">
								<label for="">*FECHA FINAL:</label>
								<input type="date" id="v_fechafinal" class="form-control" value="<?php echo $fechafinal; ?>" placeholder="FECHA FINAL" title="FECHA FINAL">

							</div> -->

					<!-- <div class="form-group m-t-20" id="totalclasesdiv" style="display: none;">
								<label for="">*TOTAL DE CLASES:</label>
								<input type="number" id="v_totalclase" class="form-control" value="<?php echo $totalclase; ?>" placeholder="TOTAL DE CLASES" title="TOTAL DE CLASES">

					</div> -->

<!-- 
							<div class="form-group m-t-20" id="preciounitariodiv" style="display: none;">
								<label for="">*PRECIO UNITARIO $:</label>
								<input type="number" id="v_costo" class="form-control" value="<?php echo $costo; ?>" placeholder="PRECIO UNITARIO" title="PRECIO UNITARIO">

							</div> -->


							<!-- <div class="form-group m-t-20" id="montopargarparticipante" style="display: none;">
								<label for="">*MONTO A PAGAR x PARTICIPANTE $:</label>
								<input type="number" id="v_montopagarparticipante" class="form-control" value="<?php echo $costo; ?>" placeholder="MONTO" title="MONTO">

							</div> -->


							<!-- <div class="form-group m-t-20" id="montopagargrupo" style="display: none;">
								<label for="">*MONTO A PAGAR x GRUPO $:</label>
								<input type="number" id="v_montopagargrupo" class="form-control" value="<?php echo $costo; ?>" placeholder="MONTO" title="MONTO">

							</div> -->
<!-- 
							<div class="form-group" style="float: left;width: 50%;display: none;">
								 	<div class="form-check">
					               
					                  <input type="radio" class="form-check-input " name="v_grupo2" onchange="CambioPeriodo()" value="1" id="v_habilitarevento" style="" >
					                   <label class="form-check-label" style="    padding-top: 0.3em;">
										POR EVENTO
					                </label>
				                </div>
				              </div>


				              <div class="form-group" style="float: left;width: 50%;display: none;">
								 	<div class="form-check">
					                 <input type="radio" class="form-check-input " name="v_grupo2" onchange="CambioPeriodo()" value="2" id="v_habilitarperiodo" style="" checked>
					                   <label class="form-check-label" style="    padding-top: 0.3em;">
										POR PERIODO
					                </label>
				                </div>
				              </div>




						</div>
					</div>
		 -->


			<!-- <div class="card" style="" id="divperiodos">
			
				 <h5 style="margin-left: 2.5em;">PERIODOS DE PAGO</h5>
				<div class="card-body">
						<div style="margin-top: 3em">

							<div class="row">
								<div class="col-md-12">
								
									<button class="btn btn-primary" id="btnperiodo" type="button" style=" float: right;   margin-top: -1em;display: none;" onclick="AgregarPeriodo()">NUEVO PERIODO</button>
								</div>
								<div class="col-md-3">
										
									</div>
							</div>

								<div id="periodos"></div>




					</div>
				</div>
			</div>
	</div> -->

			<!-- <div class="card" style="display: none;" id="divparticipantes">
				<div class="card-header" style="">
					<h5>ASIGNAR PARTICIPANTES</h5>
					<h5>CANTIDAD A ELEGIR <span id="cantidadparticipantes"></span></h5>

				</div>
				<div class="card-body">
					<div class="row">
								<div class="col-md-6">
									<div class="card-body" id="lclientesdiv" style="display: block; padding: 0;">
                
                    <div class="form-group m-t-20">	 
						<input type="text" class="form-control" name="buscadorcli_1" id="buscadorcli_" placeholder="Buscar" onkeyup="BuscarEnLista('#buscadorcli_','.cli_')">
				    </div>
                    <div class="clientes"  style="overflow:scroll;height:100px;overflow-x: hidden" id="clientes_<?php echo $a_cliente['idusuarios'];?>">
					    <?php     	
							if ($r_clientes_num>0) {	
						    	do {
						?>
						    	<div class="form-check cli_"  id="cli_<?php echo $a_cliente['idusuarios'];?>_<?php echo $a_cliente['idusuarios'];?>">
						    	    <?php 	
						    			$valor="";
                                        $nombre=mb_strtoupper($f->imprimir_cadena_utf8($a_cliente['nombre']." ".$a_cliente['paterno']." ".$a_cliente['materno']));
						    		?>
									  <input  type="checkbox" onchange="SeleccionarCliente()"  value="<?php echo $a_cliente['idusuarios']?>" class="form-check-input chkcliente" id="inputcli_<?php echo $a_cliente['idusuarios']?>" <?php echo $valor; ?>>
									  <label class="form-check-label" for="flexCheckDefault" style="margin-top: 0.2em;"><?php echo $nombre.' - '.$a_cliente['usuario']; ?></label>
								</div>						    		
						    	<?php
						    		} while ($a_cliente = $db->fetch_assoc($r_clientes));
     					    	 ?>
						    	<?php } ?>    
				    </div>
                </div> 
								</div>
							</div>
					</div>
			</div>
 -->
			



			<!-- <div class="card" style="display: none;" id="divcoachs">
				<div class="card-header" style="">
					<h5>ASIGNAR COACHS</h5>

				</div>
				<div class="card-body">
					<div class="row">
								<div class="col-md-6">
									<div class="card-body" id="lclientesdiv" style="display: block; padding: 0;">
                
                    <div class="form-group m-t-20">	 
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
				    </div>
                </div> 
								</div>
							</div>
					</div>
			</div> -->

		</div>


	</div>
</form>
<script>
	$("#profile-tab").css('display','none');
	$("#contact-tab").css('display','none');
	$("#costos-tab").css('display','none');

	
	var idservicio='<?php echo $idservicio?>';
	var fecha='<?php echo date('Y-m-d'); ?>';

	$("#v_fechainicial").val(fecha);
	$("#v_fechafinal").val(fecha);

	if (idservicio>0) {
		var idcategoriaservicio='<?php echo $idcategoriaservicio; ?>';

		var idcategoria='<?php echo $idcategoria; ?>';
		$("#v_categoria").val(idcategoriaservicio);

		$("#v_categoriaservicio").val(idcategoria);

		 SeleccionarCategoria(idservicio);
		 Obtenerparticipantes(3,idservicio);
		 ObtenerZonas(idservicio);
		 ObtenerCoachs(5,idservicio);

		 var modalidad='<?php echo $modalidad;?>';

		 if (modalidad==1) {
		 	 $("#v_individual").attr('checked',true);
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

		ObtenerPeriodos(idservicio);

	}else{
		arraydiaseleccionados=[];
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

<script>



  function cargarinputperiodos() {
    	// body...
  
    var dateFormat = "mm/dd/yy",
      from = $( ".from" )
        .datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          numberOfMonths: 3
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $( ".to" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3
      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });
 
    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
 
      return date;
    }
  } 
  </script>

   <script type="text/javascript">
        (function($) {
          $('#picker').markyourcalendar({
          	 startDate: new Date(),
          /*  availability: [
              ['1:00', '2:00', '3:00', '4:00', '5:00'],
              ['2:00'],
              ['3:00'],
              ['4:00'],
              ['5:00'],
              ['6:00'],
              ['7:00']
            ],*/

             months: ['ene','feb','mar','abr','may','jun','jul','agos','sep','oct','nov','dic'],

              weekdays: ['dom','lun','mar','mier','jue','vier','sab'],

            isMultiple: true,
            onClick: function(ev, data) {
            	alert('a');
              // data is a list of datetimes
              console.log(data);
             /* var html = ``;
              $.each(data, function() {
                var d = this.split(' ')[0];
                var t = this.split(' ')[1];
                html += `<p>` + d + ` ` + t + `</p>`;
              });
              $('#selected-dates').html(html);*/
            },
            onClickNavigator: function(ev, instance) {

            	HorariosDisponibles2();
              /*var arr = [
                [
                  ['4:00', '5:00', '6:00', '7:00', '8:00'],
                  ['1:00', '5:00'],
                  ['2:00', '5:00'],
                  ['3:30'],
                  ['2:00', '5:00'],
                  ['2:00', '5:00'],
                  ['2:00', '5:00']
                ],
                [
                  ['2:00', '5:00'],
                  ['4:00', '5:00', '6:00', '7:00', '8:00'],
                  ['4:00', '5:00'],
                  ['2:00', '5:00'],
                  ['2:00', '5:00'],
                  ['2:00', '5:00'],
                  ['2:00', '5:00']
                ],
                [
                  ['4:00', '5:00'],
                  ['4:00', '5:00'],
                  ['4:00', '5:00', '6:00', '7:00', '8:00'],
                  ['3:00', '6:00'],
                  ['3:00', '6:00'],
                  ['3:00', '6:00'],
                  ['3:00', '6:00']
                ],
                [
                  ['4:00', '5:00'],
                  ['4:00', '5:00'],
                  ['4:00', '5:00'],
                  ['4:00', '5:00', '6:00', '7:00', '8:00'],
                  ['4:00', '5:00'],
                  ['4:00', '5:00'],
                  ['4:00', '5:00']
                ],
                [
                  ['4:00', '6:00'],
                  ['4:00', '6:00'],
                  ['4:00', '6:00'],
                  ['4:00', '6:00'],
                  ['4:00', '5:00', '6:00', '7:00', '8:00'],
                  ['4:00', '6:00'],
                  ['4:00', '6:00']
                ],
                [
                  ['3:00', '6:00'],
                  ['3:00', '6:00'],
                  ['3:00', '6:00'],
                  ['3:00', '6:00'],
                  ['3:00', '6:00'],
                  ['4:00', '5:00', '6:00', '7:00', '8:00'],
                  ['3:00', '6:00']
                ],
                [
                  ['3:00', '4:00'],
                  ['3:00', '4:00'],
                  ['3:00', '4:00'],
                  ['3:00', '4:00'],
                  ['3:00', '4:00'],
                  ['3:00', '4:00'],
                  ['4:00', '5:00', '6:00', '7:00', '8:00']
                ]
              ]
              var rn = Math.floor(Math.random() * 10) % 7;*/
             // instance.setAvailability(arr[rn]);
            }
          });
        })(jQuery);
    </script>


<?php

?>