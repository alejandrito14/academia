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
require_once("../../clases/class.Entradas.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Botones.php");

$idmenumodulo = $_GET['idmenumodulo'];

//Se crean los objetos de clase
$db = new MySQL();
$emp = new Entradas();
$f = new Funciones();
$bt = new Botones_permisos();

$emp->db = $db;

$emp->tipo_usuario = $tipousaurio;
$emp->lista_empresas = $lista_empresas;

//Validamos si cargar el formulario para nuevo registro o para modificacion
if(!isset($_GET['identrada'])){
	//El formulario es de nuevo registro
	$identrada = 0;

	//Se declaran todas las variables vacias
	$nombre = "";
	$depende = "0";
	$empresa="";
	$estatus =1;

		$ruta="images/sinfoto.png";

	$col = "col-md-12";
	$ver = "display:none;";
	$titulo='NUEVA ENTRADA';
	$obtenerorden=$emp->ObtenerUltimoOrdenentrada();
	$roworden=$db->fetch_assoc($obtenerorden);
	$num=$db->num_rows($obtenerorden);
	if ($num>0) {
		$orden=$roworden['ordenar']+1;
	}else{
		$orden=0;
	}


}else{
	//El formulario funcionara para modificacion de un registro

	//Enviamos el id de la empresa a modificar a nuestra clase empresas
	$identrada = $_GET['identrada'];
	$emp->identrada = $identrada;

	//Realizamos la consulta en tabla empresas
	$result_presentacion = $emp->buscarentrada();
	$result_presentacion_row = $db->fetch_assoc($result_presentacion);

	//Cargamos en las variables los datos de las empresas

	//DATOS GENERALES
	$titulo1 = $f->imprimir_cadena_utf8($result_presentacion_row['titulo']);
	$descripcion = $f->imprimir_cadena_utf8($result_presentacion_row['descripcion']);
	$tipo=$result_presentacion_row['tipo'];

	$foto = $f->imprimir_cadena_utf8($result_presentacion_row['imagen']);

	$video=$f->imprimir_cadena_utf8($result_presentacion_row['video']);
	$orden = $f->imprimir_cadena_utf8($result_presentacion_row['orden']);
	$estatus = $f->imprimir_cadena_utf8($result_presentacion_row['estatus']);


	$ruta='';
	if($foto==""){
		$ruta="images/sinfoto.png";
	}
	else{
		$ruta="catalogos/entradas/imagenes/".$_SESSION['codservicio']."/$foto";
	}


	$rutavideo='';

	if($video==""){
		$rutavideo="images/sinfoto.png";
	}
	else{
		$rutavideo="catalogos/entradas/videos/".$_SESSION['codservicio']."/$video";
	}

	$col = "col-md-12";
	$ver = "";
		$titulo='EDITAR ENTRADA';

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

<form id="f_entrada" name="f_entrada" method="post" action="">
	<div class="card">
		<div class="card-body">
			<h4 class="card-title m-b-0" style="float: left;"><?php echo $titulo; ?></h4>

			<div style="float: right;">
				
				<?php
			
					//SCRIPT PARA CONSTRUIR UN BOTON
					$bt->titulo = "GUARDAR";
					$bt->icon = "mdi mdi-content-save";
					$bt->funcion = "
					var resp=$('#v_tipo').val(); 
					
						if(resp>0){ Guardarentradas('f_entrada','catalogos/entradas/vi_entradas.php','main','$idmenumodulo');

						}else{

			AbrirNotificacion('Han ocurrido los siguientes errores:<br> Tipo Es requerido','mdi-checkbox-marked-circle');


						}";
					$bt->estilos = "float: right;";
					$bt->permiso = $permisos;
					$bt->class='btn btn-success';
				
					//validamos que permiso aplicar si el de alta o el de modificacion
				if($identrada == 0)
					{
						$bt->tipo = 1;
					}else{
						$bt->tipo = 2;
					}
			
					$bt->armar_boton();
				?>
				
				<!--<button type="button" onClick="var resp=MM_validateForm('v_empresa','','R','v_direccion','','R','v_tel','','R','v_email','',' isEmail R'); if(resp==1){ GuardarEmpresa('f_empresa','catalogos/empresas/fa_empresas.php','main');}" class="btn btn-success" style="float: right;"><i class="mdi mdi-content-save"></i>  GUARDAR</button>-->
				
				<button type="button" onClick="aparecermodulos('catalogos/entradas/vi_entradas.php?idmenumodulo=<?php echo $idmenumodulo;?>','main');" class="btn btn-primary" style="float: right; margin-right: 10px;"><i class="mdi mdi-arrow-left-box"></i> LISTADO DE ENTRADAS </button>
				<div style="clear: both;"></div>
				
				<input type="hidden" id="id" name="id" value="<?php echo $identrada; ?>" />
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

						<div class="form-group m-t-20">
								<label for="">*TIPO</label>
								<select name="v_tipo" id="v_tipo" class="form-control" onchange="ColocarTipo()">
									<option value="0">ELEGIR TIPO</option>
									<option value="1">Imagen</option>
									<option value="2">Video</option>
								</select>
							</div>
							<div class="col-md-12" id="divimagen" style="display: none;">
							<label for="">SUBIR IMÁGEN</label>
									<form method="post" action="#" enctype="multipart/form-data">
								    <div class="card" style="width: 18rem;margin: auto;margin-top: 3em;">
								        <img class="card-img-top" src="">
								        <div id="d_foto" style="text-align:center; ">
											<img src="<?php echo $ruta; ?>" class="card-img-top" alt="" style="border: 1px #777 solid"/> 
										</div>
								        <div class="card-body">
								            <h5 class="card-title"></h5>
								           
								            <div class="form-group">

								            	
								               
								                <input type="file" class="form-control-file" name="image" id="image" onchange="SubirImagenentrada()">
								            </div>
								          <!--   <input type="button" class="btn btn-primary upload" value="Subir"> -->
								        </div>
								    </div>
								</form>

<p style="text-align: center;">Dimensiones de la imagen Ancho:640px Alto:426px</p>
								</div>
							</div>

								<div class="col-md-6" id="divvideo" style="display: none;">
							<label for="">SUBIR VIDEO</label>
									<form method="post" action="#" enctype="multipart/form-data">
								    <div class="card" style="width: 18rem;margin: auto;margin-top: 3em;">
								        <img class="card-img-top1" src="">
								        <div id="d_foto1" style="text-align:center; ">
											
			<video width=320  height=240 id="videoentrada" controls>
            <source src="<?php echo $rutavideo; ?>" type="video/mp4">
              </video>
										</div>
								        <div class="card-body">
								            <h5 class="card-title"></h5>
								           
								            <div class="form-group">

								            	
								               
								                <input type="file" class="form-control-file" name="image2" id="image2" onchange="SubirVideoentrada()" accept="video/mp4,video/x-m4v,video/*">
								            </div>
								          <!--   <input type="button" class="btn btn-primary upload" value="Subir"> -->
								        </div>
								    </div>
								</form>

									<p style="text-align: center;">Formato .mp4</p>
								</div>


							
							<div class="col-md-6" >

							<div class="form-group m-t-20">
								<label>*TÍTULO:</label>
							<input type="text" class="form-control" id="v_titulo" name="v_titulo" value="<?php echo $titulo1; ?>" title="NOMBRE" placeholder='NOMBRE'>
							</div>

							

							

							<div class="form-group m-t-20">
								<label for="">*DESCRIPCIÓN</label>
								<textarea name="v_descripcion" id="v_descripcion" cols="10" rows="5" class="form-control"><?php echo $descripcion;?> </textarea>

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

	var id='<?php echo $identrada; ?>';
	if (id>0) {
			var tipo='<?php echo $tipo; ?>';
			$("#v_tipo").val(tipo);

			ColocarTipo();
	}
			 

	   $("#v_empresa").chosen({width:"100%"});

	    function SubirImagenentrada() {
	 	// body...
	 
        var formData = new FormData();
        var files = $('#image')[0].files[0];
        formData.append('file',files);
        $.ajax({
            url: 'catalogos/entradas/upload.php',
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


       function SubirVideoentrada() {
	 	// body...
	 
        var formData = new FormData();
        var files = $('#image2')[0].files[0];

        formData.append('file',files);
        console.log(formData);
        $.ajax({
            url: 'catalogos/entradas/uploadvideo.php',
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
             beforeSend: function() {
         $("#d_foto1").css('display','block');
     	 $("#d_foto1").html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Cargando...</div>');	

		    },
            success: function(response) {
               	var ruta='<?php echo $rutavideo; ?>';
	
                if (response != 0) {
                
                   $("#d_foto1").html('<video width=320  height=240 id="videoentrada" controls> <source src="'+response+'" type="video/mp4"></video> ');
                } else {

                	 $("#d_foto1").html('<video width=320  height=240 id="videoentrada" controls> <source src="'+ruta+'" type="video/mp4"></video>  ');


                	 
                    alert('Formato de video incorrecto.');
                }
            }
        });
        return false;
    }

</script>

<?php

?>