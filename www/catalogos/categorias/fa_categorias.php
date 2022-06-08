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
require_once("../../clases/class.Categorias.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Botones.php");

$idmenumodulo = $_GET['idmenumodulo'];

//Se crean los objetos de clase
$db = new MySQL();
$emp = new Categorias();
$f = new Funciones();
$bt = new Botones_permisos();

$emp->db = $db;

$emp->tipo_usuario = $tipousaurio;
$emp->lista_empresas = $lista_empresas;

//Validamos si cargar el formulario para nuevo registro o para modificacion
if(!isset($_GET['idcategoria'])){
	//El formulario es de nuevo registro
	$idcategoria = 0;

	//Se declaran todas las variables vacias
	$nombre = "";
	$depende = "0";
	$empresa="";
	$estatus =1;

		$ruta="images/sinfoto.png";

	$col = "col-md-12";
	$ver = "display:none;";
	$titulo='NUEVO TIPO DE SERVICIO';
	$obtenerorden=$emp->ObtenerUltimoOrdencategoria();
	$roworden=$db->fetch_assoc($obtenerorden);
	$num=$db->num_rows($obtenerorden);
	if ($num>0) {
		$orden=$roworden['ordenar']+1;
	}else{
		$orden=0;
	}
	$cantidad="";


}else{
	//El formulario funcionara para modificacion de un registro

	//Enviamos el id de la empresa a modificar a nuestra clase empresas
	$idcategoria = $_GET['idcategoria'];
	$emp->idcategoria = $idcategoria;

	//Realizamos la consulta en tabla empresas
	$result_presentacion = $emp->buscarCategoria();
	$result_presentacion_row = $db->fetch_assoc($result_presentacion);

	//Cargamos en las variables los datos de las empresas

	//DATOS GENERALES
	$nombre = $f->imprimir_cadena_utf8($result_presentacion_row['titulo']);
	//$depende = $f->imprimir_cadena_utf8($result_presentacion_row['depende']);
	//$empresa = $f->imprimir_cadena_utf8($result_presentacion_row['idempresas']);
	$foto = $f->imprimir_cadena_utf8($result_presentacion_row['foto']);
	$orden = $f->imprimir_cadena_utf8($result_presentacion_row['orden']);
	$estatus = $f->imprimir_cadena_utf8($result_presentacion_row['estatus']);


	$horarios=$result_presentacion_row['horarios'];
	$zonas=$result_presentacion_row['zonas'];
	$participantes=$result_presentacion_row['participantes'];
	$cantidad=$result_presentacion_row['cantidad'];
	$coachs=$result_presentacion_row['coachs'];

	$numerodias=$result_presentacion_row['numerodiassemana'];
	$habilitarcostos=$result_presentacion_row['configurarcostos'];
	$habilitarmodalidad=$result_presentacion_row['habilitarmodalidad'];
	$habilitarcampototalclases=$result_presentacion_row['campototalclases'];
	$habilitarcampopreciounitario=$result_presentacion_row['campopreciounitario'];
	$habilitarcampomontoparticipante=$result_presentacion_row['campomontoporparticipante'];
	$habilitarcampomontogrupo=$result_presentacion_row['campomontoporgrupo'];
	$habilitarmodalidadpago=$result_presentacion_row['habilitarmodalidadpago'];

	$avanzado=$result_presentacion_row['avanzado'];

		$asignarcategoria=$result_presentacion_row['asignarcategoria'];
		$asignardias=$result_presentacion_row['asignardias'];

	$ruta='';
	if($foto==""){
		$ruta="images/sinfoto.png";
	}
	else{
		$ruta="catalogos/categorias/imagenes/".$_SESSION['codservicio']."/$foto";
	}

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

<form id="f_categoria" name="f_categoria" method="post" action="">
	<div class="card">
		<div class="card-body">
			<h4 class="card-title m-b-0" style="float: left;"><?php echo $titulo; ?></h4>

			<div style="float: right;position:fixed!important;z-index:10;right:0;margin-right:2em;width: 20%;">
				
				<?php
			
					//SCRIPT PARA CONSTRUIR UN BOTON
					$bt->titulo = "GUARDAR";
					$bt->icon = "mdi mdi-content-save";
					$bt->funcion = "var resp=MM_validateForm('v_nombre','','R'); if(resp==1){ GuardarCategorias('f_categoria','catalogos/categorias/vi_categorias.php','main','$idmenumodulo');}";
					$bt->estilos = "float: right;";
					$bt->permiso = $permisos;
					$bt->class='btn btn-success';
				
					//validamos que permiso aplicar si el de alta o el de modificacion
				if($idcategoria == 0)
					{
						$bt->tipo = 1;
					}else{
						$bt->tipo = 2;
					}
			
					$bt->armar_boton();
				?>
				
				<!--<button type="button" onClick="var resp=MM_validateForm('v_empresa','','R','v_direccion','','R','v_tel','','R','v_email','',' isEmail R'); if(resp==1){ GuardarEmpresa('f_empresa','catalogos/empresas/fa_empresas.php','main');}" class="btn btn-success" style="float: right;"><i class="mdi mdi-content-save"></i>  GUARDAR</button>-->
				
				<button type="button" onClick="aparecermodulos('catalogos/categorias/vi_categorias.php?idmenumodulo=<?php echo $idmenumodulo;?>','main');" class="btn btn-primary" style="float: right; margin-right: 10px;"><i class="mdi mdi-arrow-left-box"></i> VER LISTADO </button>
				<div style="clear: both;"></div>
				
				<input type="hidden" id="id" name="id" value="<?php echo $idcategoria; ?>" />
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
					
					
					<div class="tab-content tabcontent-border">
						<div class="tab-pane active show" id="generales" role="tabpanel">


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

								            	
								               
								                <input type="file" class="form-control-file" name="image" id="image" onchange="SubirImagenCategoria()">
								            </div>
								          <!--   <input type="button" class="btn btn-primary upload" value="Subir"> -->
								        </div>
								    </div>
								</form>

<p style="text-align: center;">Dimensiones de la imagen Ancho:640px Alto:426px</p>
								</div>



							
							<div class="col-md-6" >

							<div class="form-group m-t-20">
								<label>*NOMBRE:</label>
							<input type="text" class="form-control" id="v_nombre" name="v_nombre" value="<?php echo $nombre; ?>" title="NOMBRE" placeholder='NOMBRE'>
							</div>

							


							<div class="form-group">
								<!-- <div class="btn-group-toggle" data-toggle="buttons">
								  <label class="btn btn-secondary active">
								    <input type="checkbox" class="form-check-input " name="v_activaravanzado" onchange="ActivarAvanzado()"  value="0" id="v_activaravanzado" style="top: -0.3em;"> AVANZADO
								  </label>
								</div> -->
																

								 	<div class="form-check">
					               
					                  <input type="checkbox" class="form-check-input " name="v_activaravanzado" onchange="ActivarAvanzado()"  value="0" id="v_activaravanzado" style="top: -0.3em;">
					                   <label class="form-check-label">
										 AVANZADO
					                </label>
				                </div>
				              </div>

				               <div  class="divavanzado" style="display: none;">
			<div class="card" style="" id="divhorarios">
				<div class="" style="">
					<label>ASIGNAR DISPONIBILIDAD DE HORARIO </label>
					<button class="btn btn-primary" type="button" style="  margin-top: -1em;" onclick="AgregarHorario()"><span class="mdi mdi-plus-box"></span></button>

				</div>
				<div class="">
						<div style="margin-top: 1em">

							<div class="row">
								<div class="col-md-12">
								
									
								</div>
								<div class="col-md-3">
										
									</div>
							</div>

								
								<div id="horarios"></div>




					</div>
				</div>
			</div>
			</div>
				     <div  class="divavanzado" style="display: none;">

				     	<div class="form-group" style="display: none;">
				              	<div class="form-check">
					               
					                  <input type="checkbox" class="form-check-input " name="v_activardias"  value="0" id="v_activardias" style="top: -0.3em;">
					                   <label class="form-check-label">
										 ASIGNAR DÍAS
					                </label>
				                </div>
				            </div>

							<div class="form-group" style="display: none;">
				              	<div class="form-check">
					               
					                  <input type="checkbox" class="form-check-input " name="v_activarcategoria"  value="0" id="v_activarcategoria" style="top: -0.3em;">
					                   <label class="form-check-label">
										 ASIGNAR CATEGORÍA
					                </label>
				                </div>
				            </div>

							 <div class="form-group" style="display: none;">
								 	<div class="form-check">
					               
					                  <input type="checkbox" class="form-check-input " name="v_activarhorarios"  value="0" id="v_activarhorarios" style="">
					                   <label class="form-check-label">
										ASIGNAR HORARIOS
					                </label>
				                </div>
				              </div>

				               <div class="form-group" style="display: none;">
								 	<div class="form-check">
					               
					                  <input type="checkbox" class="form-check-input " name="v_zonas" value="0" id="v_zonas" style="">
					                   <label class="form-check-label">
										ASIGNAR ESPACIO
					                </label>
				                </div>
				              </div>

				               <div class="form-group" style="display: none;">
								 	<div class="form-check">
					               
					                  <input type="checkbox" class="form-check-input " name="v_coachs"  value="0" id="v_coachs" style="">
					                   <label class="form-check-label">
										ASIGNAR COACHS
					                </label>
				                </div>
				              </div>

				               <div class="form-group" style="display: none;">
								 	<div class="form-check">
					               
					                  <input type="checkbox" class="form-check-input " name="v_participantes"  value="0" id="v_participantes" style="">
					                   <label class="form-check-label">
										ASIGNAR PARTICIPANTES
					                </label>
				                </div>
				              </div>

				              <div class="form-group" style="display: none;">
				              		<label>CANTIDAD DE PARTICIPANTES:</label>
							<input type="number" class="form-control" id="v_cantidadparticipantes" name="v_cantidadparticipantes" value="<?php echo $cantidad; ?>" title="CANTIDAD DE PARTICIPANTES" placeholder='CANTIDAD DE PARTICIPANTES'>

				              </div>


				             <div class="form-group" style="display: none;">
				              		<label>NÚMERO DE DÍAS:</label>
							<input type="number" class="form-control" id="v_numerodias" name="v_numerodias" value="<?php echo $numerodias; ?>" title="NÚMERO DE DÍAS" placeholder='NÚMERO DE DÍAS'>

				            </div>


				            <div class="form-group" style="display: none;">
								 	<div class="form-check">
					               
					                  <input type="checkbox" class="form-check-input " name="v_habilitarcostos" onchange="HabilitarCostos()" value="0" id="v_habilitarcostos" style="">
					                   <label class="form-check-label">
										ASIGNAR COSTOS
					                </label>
				                </div>
				              </div>

				             <div id="divcostos" style="margin-left: 1em;display: none;">
				              <div class="form-group" style="display: none;">
								 	<div class="form-check">
					               
					                  <input type="checkbox" class="form-check-input " name="v_habilitarmodalidad"  value="0" id="v_habilitarmodalidad" style="">
					                   <label class="form-check-label">
										HABILITAR MODALIDAD
					                </label>
				                </div>
				              </div>

				               <div class="form-group" style="display: none;">
								 	<div class="form-check">
					               
					                  <input type="checkbox" class="form-check-input " name="v_habilitarcampototalclases"  id="v_habilitarcampototalclases" style="">
					                   <label class="form-check-label">
										HABILITAR CAMPO TOTAL DE CLASES
					                </label>
				                </div>
				              </div>

				              <div class="form-group" style="display: none;">
								 	<div class="form-check">
					               
					                  <input type="checkbox" class="form-check-input " name="v_habilitarcampopreciounitario"  id="v_habilitarcampopreciounitario" style="">
					                   <label class="form-check-label">
										HABILITAR CAMPO PRECIO UNITARIO
					                </label>
				                </div>
				              </div>


				              <div class="form-group" style="display: none;">
								 	<div class="form-check">
					               
					                  <input type="checkbox" class="form-check-input " name="v_habilitarcampomontoparticipante"  id="v_habilitarcampomontoparticipante" style="">
					                   <label class="form-check-label">
										HABILITAR CAMPO MONTO A PAGAR POR PARTICIPANTE
					                </label>
				                </div>
				              </div>

				               <div class="form-group" style="display: none;">
								 	<div class="form-check">
					               
					                  <input type="checkbox" class="form-check-input " name="v_habilitarcampomontoparticipante"  id="v_habilitarcampomontogrupo" style="">
					                   <label class="form-check-label">
										HABILITAR CAMPO MONTO A PAGAR POR GRUPO
					                </label>
				                </div>
				              </div>


				          </div>

				          <div class="form-group" style="display: none;">
								 	<div class="form-check">
					               
					                  <input type="checkbox" class="form-check-input " name="v_habilitarmodalidadpago"  value="0" id="v_habilitarmodalidadpago" style="">
					                   <label class="form-check-label">
										HABILITAR MODALIDAD DE PAGO
					                </label>
				                </div>
				              </div>


				              </div>


							<div class="form-group m-t-20">
								<label>*ORDEN:</label>
							<input type="number" class="form-control" id="v_orden" name="v_orden" value="<?php echo $orden; ?>" title="orden" placeholder='ORDEN'>
							</div>



						<div class="form-group m-t-20">
							<label>ESTATUS:</label>
							<select name="v_estatus" id="v_estatus" title="Estatus" class="form-control"  >
								<option value="0" <?php if($estatus == 0) { echo "selected"; } ?> >DESACTIVO</option>
								<option value="1" <?php if($estatus == 1) { echo "selected"; } ?> >ACTIVADO</option>
							</select>
						</div>


							</div>

							</div>
						
							
						</div>
						
						
					
					</div>
				</div>

		</div>
	</div>


	</div>
</form>
<!-- <script  type="text/javascript" src="./js/mayusculas.js"></script>
 -->
<script>
	var ruta='<?php echo $ruta;?>';
	var idcategoria='<?php echo $idcategoria; ?>';

	if (idcategoria>0) {
		var horarios='<?php echo $horarios;?>';
		var zonas='<?php echo $zonas;?>';
		var participantes='<?php echo $participantes;?>';
		var coachs='<?php echo $coachs; ?>';

		if (horarios==1) {

			$("#v_activarhorarios").attr('checked',true);
		}
		if (zonas==1) {
			$("#v_zonas").attr('checked',true);
	
		}
		if (participantes==1) {

			$("#v_participantes").attr('checked',true);
		
		}

		if (coachs==1) {

			$("#v_coachs").attr('checked',true);
		}

		var numerodias='<?php echo $numerodias; ?>';
		var habilitarcostos='<?php echo $habilitarcostos; ?>';
		var habilitarmodalidad='<?php echo $habilitarmodalidad; ?>';
		var habilitarcampototalclases='<?php echo $habilitarcampototalclases; ?>';
		var habilitarcampopreciounitario='<?php echo $habilitarcampopreciounitario; ?>';
		var habilitarcampomontoparticipante='<?php echo $habilitarcampomontoparticipante; ?>';
		var habilitarcampomontogrupo='<?php echo $habilitarcampomontogrupo; ?>';
		var habilitarmodalidadpago='<?php echo $habilitarmodalidadpago; ?>';
		var avanzado='<?php echo $avanzado; ?>';
		var asignarcategoria='<?php echo $asignarcategoria; ?>';
		var asignardias='<?php echo $asignardias; ?>';

		$("#v_numerodias").val(numerodias);
		if (habilitarcostos==1) {
			$("#v_habilitarcostos").attr('checked',true);		
		}

		if (habilitarmodalidad==1) {
			$("#v_habilitarmodalidad").attr('checked',true);
		}
		if (habilitarcampototalclases==1) {
			$("#v_habilitarcampototalclases").attr('checked',true);
		}
		
		if(habilitarcampopreciounitario==1){
			$("#v_habilitarcampopreciounitario").attr('checked',true);
		}
		if(habilitarcampomontoparticipante==1){
			$("#v_habilitarcampomontoparticipante").attr('checked',true);
		}
		if(habilitarcampomontogrupo==1){
			$("#v_habilitarcampomontogrupo").attr('checked',true);
		}
		if(habilitarmodalidadpago==1){

			$("#v_habilitarmodalidadpago").attr('checked',true);
		}

		

		if (avanzado==1) {

		$("#v_activaravanzado").attr('checked',true);
	
		}

		if (asignarcategoria==1) {

		$("#v_activarcategoria").attr('checked',true);
		
		}

		if (asignardias==1) {

			$("#v_activardias").attr('checked',true);
		}
		HabilitarCostos();
		ActivarAvanzado();
		ObtenerHorariosSemanaCategorias(idcategoria);

	}

	


			 

	   $("#v_empresa").chosen({width:"100%"});

	    function SubirImagenCategoria() {
	 	// body...
	 
        var formData = new FormData();
        var files = $('#image')[0].files[0];
        formData.append('file',files);
        $.ajax({
            url: 'catalogos/categorias/upload.php',
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

<?php

?>