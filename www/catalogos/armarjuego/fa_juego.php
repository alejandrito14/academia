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
require_once("../../clases/class.Juego.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Botones.php");
/*require_once("../../clases/class.Espacios.php");
require_once("../../clases/class.Horarios.php");
require_once("../../clases/class.Torneos.php");*/
require_once("../../clases/class.Tipojuego.php");
require_once("../../clases/class.Tipopartidos.php");
require_once("../../clases/class.Servicios.php");
require_once("../../clases/class.Deportes.php");

$idmenumodulo = $_GET['idmenumodulo'];

//Se crean los objetos de clase
$db = new MySQL();
$emp = new Juego();
$f = new Funciones();
$bt = new Botones_permisos();
$tipojuego=new Tipojuego();
$tipojuego->db=$db;

$tipopartidos=new Tipopartidos();
$tipopartidos->db=$db;

$servicio= new Servicios();
$servicio->db=$db;

$deporte= new Deportes();
$deporte->db=$db;
/*$torneo=new Torneos();
$torneo->db=$db;
*/
$emp->db = $db;

$emp->tipo_usuario = $tipousaurio;
$emp->lista_empresas = $lista_empresas;


/*$espacios = new Espacios();
$espacios->db = $db;

$horarios= new Horarios();
$horarios->db = $db;*/
//Validamos si cargar el formulario para nuevo registro o para modificacion
if(!isset($_GET['idjuego'])){
	//El formulario es de nuevo registro
	//Se declaran todas las variables vacias
	$nombre='';
	$descripcion='';
	$anio='';
	$espacio='';
	$estatus=1;
	$idjuego=0;
	$col = "col-md-12";
	$ver = "display:none;";
	$titulo='NUEVO JUEGO';
	$cargar=0;
	$edicion =0;
	$disable='';
}else{
	$disable='';

	//El formulario funcionara para modificacion de un registro

	//Enviamos el id del ESPACIOrio a modificar a nuestra clase Juego
	$idjuego = $_GET['idjuego'];
	$emp->idjuego = $idjuego;

	//Realizamos la consulta en tabla Juego
	$result_juego = $emp->buscarjuego();
	$result_juego_row = $db->fetch_assoc($result_juego);

	
	//Cargamos en las variables los datos 

	//DATOS GENERALES
	$nombre=$f->imprimir_cadena_utf8($result_juego_row['nombre']);
	$descripcion=$f->imprimir_cadena_utf8($result_juego_row['descripcion']);
	$idtorneo=$f->imprimir_cadena_utf8($result_juego_row['idtorneo']);
	$idtipojuego=$f->imprimir_cadena_utf8($result_juego_row['idtipojuego']);
	$idtipopartido=$f->imprimir_cadena_utf8($result_juego_row['idtipopartido']);

	$estatus = $f->imprimir_cadena_utf8($result_juego_row['estatus']);
	

	$col = "col-md-12";
	$ver = "";
	$cargar=1;

	$titulo='EDITAR JUEGO';

	$edicion =$_GET['edicionreplica'];
	
	if ($edicion==1) {
		$idjuego='';
		$idhorario='';
		$titulo='REPLICA DE JUEGO';

	}

	if ($edicion==2) {
		$disable="disabled";
	}


	

}

/*$l_espacios = $espacios->ObtenerEspacios();
$result_espacios_row = $db->fetch_assoc($l_espacios);

$l_espacios_num = $db->num_rows($l_espacios);
*/

/*$l_horarios = $horarios->ObtenerHorarios();
$result_horario_row = $db->fetch_assoc($l_horarios);
$l_horarios_num = $db->num_rows($l_horarios);
*/
/*$l_torneo = $torneo->ObtenerTorneosActivos();
$result_torneo_row = $db->fetch_assoc($l_torneo);
$l_torneo_num = $db->num_rows($l_torneo);
*/
$l_servicio=$servicio->ObtenerserviciosConsulta();

$result_servicio_row=$db->fetch_assoc($l_servicio);
$l_servicio_num=$db->num_rows($l_servicio);


$l_tipojuego = $tipojuego->Obtenertipojuego();
$result_tipojuego_row = $db->fetch_assoc($l_tipojuego);
$l_tipojuego_num = $db->num_rows($l_tipojuego);

$l_tipopartido = $tipopartidos->ObtenerTipospartidos();
$result_tipopartido_row = $db->fetch_assoc($l_tipopartido);
$l_tipopartido_num = $db->num_rows($l_tipopartido);

$l_deporte = $deporte->ObtenerDeportes();
$result_deporte_row = $db->fetch_assoc($l_deporte);
$l_tipodeporte_num=$db->num_rows($l_deporte);
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

<form id="f_juego" name="f_juego" method="post" action="" style="height: 2000px;">
	<div class="card">
		<div class="card-body">
			<h4 class="card-title m-b-0" style="float: left;"><?php echo $titulo; ?></h4>
 
			<div style="float: right;">
				
				<?php

					//SCRIPT PARA CONSTRUIR UN BOTON
				$bt->titulo = "GUARDAR";
				$bt->icon = "mdi mdi-content-save";
				$bt->funcion = " GuardarJuego('f_juego','catalogos/armarjuego/vi_juego.php','main','$idmenumodulo');";
				$bt->estilos = "float: right;";
				$bt->permiso = $permisos;
				$bt->class='btn btn-success';
				
					//validamos que permiso aplicar si el de alta o el de modificacion
				if($idjuego == 0)
				{
					$bt->tipo = 1;
				}else{
					$bt->tipo = 2;
				}

				$bt->armar_boton();
				?>
				
				<!--<button type="button" onClick="var resp=MM_validateForm('v_empresa','','R','v_direccion','','R','v_tel','','R','v_email','',' isEmail R'); if(resp==1){ GuardarEmpresa('f_empresa','catalogos/empresas/fa_empresas.php','main');}" class="btn btn-success" style="float: right;"><i class="mdi mdi-content-save"></i>  GUARDAR</button>-->
				
				<button type="button" onClick="aparecermodulos('catalogos/armarjuego/vi_juego.php?idmenumodulo=<?php echo $idmenumodulo;?>','main');" class="btn btn-primary" style="float: right; margin-right: 10px;"><i class="mdi mdi-arrow-left-box"></i> LISTADO DE JUEGOS</button>
				<div style="clear: both;"></div>
				
				<input type="hidden" id="id" name="id" value="<?php echo $idjuego; ?>" />
				<input type="hidden" id="edicion" name="edicion" value="<?php echo $edicion; ?>" />

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
					<ul class="nav nav-tabs" id="myTab" role="tablist">
					  <li class="nav-item" role="presentation">
					    <button onclick="ActivarTab(this,'home')" class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">GENERAL</button>
					  </li>
						<li class="nav-item" role="presentation">
					    <button onclick="ActivarTab(this,'contact')" class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">PARTICIPANTES</button>
					  </li>

					    <li class="nav-item" role="presentation">
					    <button onclick="ActivarTab(this,'profile')" class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">TIPO DE COMPETENCIA</button>
					  </li>

					     <li class="nav-item" role="presentation">
					    <button onclick="ActivarTab(this,'rondas')" class="nav-link" id="rondas-tab" data-bs-toggle="tab" data-bs-target="#rondas" type="button" role="tab" aria-controls="rondas" aria-selected="false">ROL DE JUEGOS</button>
					  </li>

					</ul>
					<div class="tab-content" id="myTabContent">
					  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
					  	
					  		<div class="col-md-6" style="margin-top: 1em;">

							<div class="form-group m-t-20">
								<label>*NOMBRE:</label>
								<input type="text" class="form-control" id="v_nombre" name="v_nombre" value="<?php echo $nombre; ?>" title="NOMBRE" placeholder='NOMBRE' onblur="ValidarNombre();" <?php echo $disable; ?>>
							</div>



							<div class="form-group m-t-20">
								<label>*DESCRIPCIÓN:</label>
								<input type="text" class="form-control" id="v_descripcion" name="v_descripcion" value="<?php echo $descripcion; ?>" title="DESCRIPCIÓN" placeholder='DESCRIPCIÓN '>
							</div>
							<div class="form-group m-t-20">
								<label>*SERVICIO:</label>
								<select  class="form-control" id="v_servicio" name="v_servicio"  title="SERVICIO" onchange="CambiarServicio()" >
									<option value="0">SELECCIONAR SERVICIO</option>
									<?php

									do
									{
										?>
										<option  value="<?php echo $result_servicio_row['idservicio'] ?>"  <?php if($result_servicio_row['idservicio'] == $idservicio){ echo "selected"; }?>><?php echo strtoupper($f->imprimir_cadena_utf8($result_servicio_row['titulo']));?></option>
										<?php
									}while($result_servicio_row = $db->fetch_assoc($l_servicio));
									?>


								</select>
							</div>


							<div class="form-group m-t-20">
								<label for="">*TIPO DE JUEGO:</label>
								<select name="v_tipojuego" id="v_tipojuego" class="form-control" onchange="ObtenerNumeroJugadores()">
									<option value="0">SELECCIONAR TIPO DE JUEGO</option>
									<?php
							if ($l_tipojuego_num>0) {
									do
									{
											
										?>
										<option  value="<?php echo $result_tipojuego_row['idtipojuego'] ?>"  <?php if($result_tipojuego_row['idtipojuego'] == $idtipojuego){ echo "selected"; }?>><?php echo strtoupper($f->imprimir_cadena_utf8($result_tipojuego_row['nombre'].'-'.'PLAYER 1: '.$result_tipojuego_row['numerocontendientes'].' PLAYER 2: '.$result_tipojuego_row['numeroadversarios']));?></option>
										<?php
									}while($result_tipojuego_row = $db->fetch_assoc($l_tipojuego));
								}
									?>
								</select>
							</div>


							<div class="form-group m-t-20">
								<label for="">*TIPO DE PARTIDO:</label>
								<select name="v_tipopartido" id="v_tipopartido" class="form-control">
									<option value="0">SELECCIONAR TIPO DE PARTIDO</option>
									<?php
									if ($l_tipopartido_num>0) {
										# code...
									
									do
									{
										?>
										<option  value="<?php echo $result_tipopartido_row['idtipopartido'] ?>"  <?php if($result_tipopartido_row['idtipopartido'] == $idtipopartido){ echo "selected"; }?>><?php echo strtoupper($f->imprimir_cadena_utf8($result_tipopartido_row['nombre'].',NÚMERO DE SETS: '.$result_tipopartido_row['numerosets']));?></option>
										<?php
									}while($result_tipopartido_row = $db->fetch_assoc($l_tipopartido));
								}
									?>
								</select>
							</div>

										<div class="form-group m-t-20">
								<label for="">*DEPORTE:</label>
								<select name="v_deporte" id="v_deporte" class="form-control">
									<option value="0">SELECCIONAR DEPORTE</option>
									<?php
									if ($l_tipodeporte_num>0) {
										# code...
									
									do
									{
										?>
										<option  value="<?php echo $result_deporte_row['iddeporte'] ?>"  <?php if($result_deporte_row['iddeporte'] == $iddeporte){ echo "selected"; }?>><?php echo strtoupper($f->imprimir_cadena_utf8($result_deporte_row['deporte']));?></option>
										<?php
									}while($result_deporte_row = $db->fetch_assoc($l_deporte));
								}
									?>
								</select>
							</div>
			
							
							<div class="form-group m-t-20">
								<label>ESTATUS:</label>
								<select name="v_estatus" id="v_estatus" title="Estatus" class="form-control"  >
									<option value="0" <?php if($estatus == 0) { echo "selected"; } ?> >DESACTIVO</option>
									<option value="1" <?php if($estatus == 1) { echo "selected"; } ?> >ACTIVO</option>
								</select>
							</div>


					
						
						

					</div>


					  </div>
					
					  <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">

					  	<div class="row divpareja" style="margin-bottom: 1em;">
					  			<div class="form-group m-t-20">

									<div class="col-md-12">
											<button type="button" class="btn btn-primary" onclick="NuevaPareja()" style="float: left;    margin-top: 1em;">NUEVO PAREJA</button>
									</div>
								
								</div>

								</div>

								<div class="row">
									<div class="parejascreadas" style="margin-left: 1em;width: 100%;"></div>
								</div>

								
					  		



					  </div>

					    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

					<div class="col-md-6" style="margin-top: 1em;">

			<div class="" style="">
			

				<div class="">

						<div class="form-group m-t-20">
							<label for="">SELECCIONAR TIPO DE COMPETENCIA</label>
							<select name="v_tipocompe" onchange="SeleccionarTipoCompetencia()" id="v_tipocompe" class="form-control">
								
							</select>

						</div>




						<div class="form-group m-t-20" style="display: none;">
							<label for="">¿Cuantas parejas por llave?</label>
							<input type="number" id="v_parejas" class="form-control" >

						</div>

						<div class="divgrupo" style="display: none;">
					<div class="row " style="margin-bottom: 1em;">
					<div class="col-md-12 ">
							<button type="button" class="btn btn-primary" onclick="NuevoGrupo()" style="float: left;">NUEVO GRUPO</button> 
					</div>
				
				</div>
			</div>
					<div class="row">
							<div class="col-md-12">
					<div class="grupos"></div>
				</div>
					</div>

					</div>
				</div>
			</div>
					  	


					  </div>


		

					  <div class="tab-pane fade" id="rondas" role="tabpanel" aria-labelledby="rondas-tab">

							<div class="col-md-12" style="margin-top: 1em;">

								<div class="form-group m-t-20">
									<button type="button" class="btn btn-primary btngeneralrol" onclick="GenerarRol()">GENERAR ROL DE JUEGOS</button>
								</div>

								<div class="">
									
									<div class="roles" style="overflow: scroll;height: 100em;"></div>
								</div>

								  <div id="writeHere" class="tournament"></div>

							
							</div>
	
					  </div>
					</div>
					
				
				</div>


			</div>

			
			</div>


		</div>
	</form>

	<div class="modal" tabindex="-1" id="modalgrupo" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      	 <div class="form-group">
        	<label for="">NOMBRE DEL GRUPO:</label>
        	<input type="text" id="v_nombregrupo" class="form-control">
        </div>

        <div class="form-group">
        	<label for="">NIVEL:</label>
        	<select name="" id="v_nivel" class="form-control"></select>
        </div>

          <div class="form-group">
          	  <label for="">PAREJAS</label>


					</div>

					<div class="parejas"></div>
      </div>


      <div class="modal-footer">
        <button type="button" class="btn btn-success" onclick="GuardarGrupo()">GUARDAR</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">CERRAR</button>
      </div>
    </div>
  </div>
</div>


 <style type="text/css">
  .tournament {    
    background-color: #F0F0F0;
    border: dashed 1px solid;
    overflow: auto;
  }
  .tournament .bracket {
    background-color: #DFDFDF;
    min-width: 100px;    
    vertical-align: top;
    float: left;
  }
  
  .tournament .bracket .match {
    background-color: #D0D0D0;
    border-top: 1px solid;
    border-right: 1px solid;
    border-bottom: 1px solid;  
  }
  .tournament .bracket .match .p1 {    
    height: 20px;
  }
  .tournament .bracket .match .p2 {
    height: 20px;
  }    
  .tournament .bracket .match .spacer {
    background-color: #DFDFDF;
    height: 38px;
  }
  .tournament .bracket .spacer {
    height: 80px;
  }
  .tournament .bracket .half-spacer {
    height: 40px;
  }
  .tournament .bracket .small-spacer {
    height: 10px;
    background-color: #F1F1F1;
  }
  .tournament .bracket .winner {
    border-bottom: 1px solid;
  }
  
  .left-line {
    border-left: 1px solid;
  }
  
  .tournament .cell {
    min-width: 100px;
    height: 20px;
    float: left;
    background-color: #DFDFDF;    
  }   
  .tournament .l2 {
    background-color: #D0D0D0;
  }     
  .tournament .lmax {
    width: 0px;
    clear: both;
  }    
  </style>

	<script  type="text/javascript" src="./js/mayusculas.js"></script>

	<script>
		var urlimagen='<?php $_SESSION['carpetaapp'];?>';
	ObtenerTipoCompetencia();

		var edicion=<?php echo $edicion; ?>;
		
		$("#v_horario").chosen({width: "100%"}); 
		$("#v_torneo").chosen({width: "100%"}); 
		$("#v_tipojuego").chosen({width: "100%"}); 
		$("#v_tipopartido").chosen({width: "100%"}); 

		$("#v_espacio").chosen({width: "100%"}); 

		var cargar=<?php echo $cargar;?>

		if (cargar==1) {


			CambiarTorneo();
		}


		if (edicion==2) {

			CargarJugadores(<?php echo $idjuego;?>);
		}

	</script>

	<?php

	?>