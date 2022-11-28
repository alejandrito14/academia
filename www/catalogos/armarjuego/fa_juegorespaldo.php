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

<form id="f_juego" name="f_juego" method="post" action="">
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
					
					
					<div class="col-md-6">
						<div class="tab-pane active show" id="generales" role="tabpanel">

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
						<!-- 	
							<div class="form-group m-t-20">
								<label for="">*ESPACIO</label>
								<select name="v_espacio" id="v_espacio" class="form-control">
									<option value="0">SELECCIONAR ESPACIO</option>
									<?php

									do
									{
										?>
										<option  value="<?php echo $result_espacios_row['idespacio'] ?>"  <?php if($result_espacios_row['idespacio'] == $idespacio){ echo "selected"; }?>><?php echo strtoupper($f->imprimir_cadena_utf8($result_espacios_row['nombre']));?></option>
										<?php
									}while($result_espacios_row = $db->fetch_assoc($l_espacios));
									?>
								</select>
							</div> -->

						<!-- 	<div class="form-group m-t-20">
								<label for="">*HORARIO</label>
								<select name="v_horario" id="v_horario" class="form-control">
									<option value="0">SELECCIONAR HORARIO</option>
									<?php

									do
									{
										?>
										<option  value="<?php echo $result_horario_row['idhorario'] ?>"  <?php if($result_horario_row['idhorario'] == $idhorario){ echo "selected"; }?>><?php echo strtoupper($f->imprimir_cadena_utf8($result_horario_row['dia'].'/'.$result_horario_row['mes'].'/'.$result_horario_row['anio'].' '.$result_horario_row['hora']));?></option>
										<?php
									}while($result_horario_row = $db->fetch_assoc($l_horarios));
									?>
								</select>
							</div>

 -->

							
							<div class="form-group m-t-20">
								<label>ESTATUS:</label>
								<select name="v_estatus" id="v_estatus" title="Estatus" class="form-control"  >
									<option value="0" <?php if($estatus == 0) { echo "selected"; } ?> >DESACTIVO</option>
									<option value="1" <?php if($estatus == 1) { echo "selected"; } ?> >ACTIVO</option>
								</select>
							</div>


							
						</div>
						
						

					</div>
				</div>


			</div>

			<div class="card" style="height: 30em;overflow: scroll;">
				<div class="" style="">
					

				</div>

				<div class="card-body">
				<div class="row" style="margin-bottom: 1em;">
					<div class="col-md-12">
							<button type="button" class="btn btn-primary" onclick="NuevoPartido()" style="float: left;">NUEVO PARTIDO</button>
					</div>
				
				</div>
					<div class="row">
							<div class="col-md-12">
					<div class="partidos"></div>
				</div>
					</div>
				<!-- 	<div id="partido" class="divpartidos">
						<div>Partido <span id="numpartido"></span></div>
						<h4 class="card-title m-b-0">ELIGE LOS JUGADORES</h4>

						<div class="row">
							<div class="col-md-12">
								<div class="col-md-6" style="float: left;">
									<h4 style="text-align: center;">EQUIPO1</h4>
							  	<div id="player1"></div>
					
								</div>
								<div class="col-md-6" style="float: right;">
									<h4 style="text-align: center;">EQUIPO2</h4>
									<div id="player2"></div>

								</div>
							</div>
						</div>

						</div> -->


					</div>
				</div>
			</div>


		</div>
	</form>
	<script  type="text/javascript" src="./js/mayusculas.js"></script>

	<script>


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