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
require_once("../../clases/class.Membresia.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Botones.php");

$idmenumodulo = $_GET['idmenumodulo'];

//Se crean los objetos de clase
$db = new MySQL();
$emp = new Membresia();
$f = new Funciones();
$bt = new Botones_permisos();

$emp->db = $db;

$emp->tipo_usuario = $tipousaurio;
$emp->lista_empresas = $lista_empresas;

//Validamos si cargar el formulario para nuevo registro o para modificacion
if(!isset($_GET['idmembresia'])){
	//El formulario es de nuevo registro
	$idmembresia = 0;

	//Se declaran todas las variables vacias
	$nombre = "";
	$depende = "0";
	$empresa="";
	$estatus =1;
	//$descripcion="";
		$ruta="images/sinfoto.png";

	$col = "col-md-12";
	$ver = "display:none;";
	$titulo='NUEVA MEMBRESÍA';
	$obtenerorden=$emp->ObtenerUltimoOrdenmembresia();
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
	$idmembresia = $_GET['idmembresia'];
	$emp->idmembresia = $idmembresia;

	//Realizamos la consulta en tabla empresas
	$result_membresia = $emp->buscarmembresia();
	$result_membresia_row = $db->fetch_assoc($result_membresia);

	//Cargamos en las variables los datos de las empresas

	//DATOS GENERALES
	$titulomembresia = $f->imprimir_cadena_utf8($result_membresia_row['titulo']);
	//$descripcion = $f->imprimir_cadena_utf8($result_membresia_row['descripcion']);
	
	$foto = $f->imprimir_cadena_utf8($result_membresia_row['imagen']);
	$orden = $f->imprimir_cadena_utf8($result_membresia_row['orden']);
	$estatus = $f->imprimir_cadena_utf8($result_membresia_row['estatus']);
	$costo=$result_membresia_row['costo'];
	$duracion=$result_membresia_row['cantidaddias'];
	$limite=$result_membresia_row['tiempodepago'];
	$descripcion=$result_membresia_row['descripcion'];
	$porcategoria=$result_membresia_row['porcategoria'];
	$porservicio=$result_membresia_row['porservicio'];
	$porhorario=$result_membresia_row['porhorario'];
	$color=$result_membresia_row['color'];
	$depende=$result_membresia_row['depende'];
	$membresiadepende=$result_membresia_row['idmembresiadepende'];
	$inppadre=$result_membresia_row['inppadre'];
	$inphijo=$result_membresia_row['inphijo'];
	$inpnieto=$result_membresia_row['inpnieto'];
	$v_limitemembresia=$result_membresia_row['limite'];
	$repetir=$result_membresia_row['repetir'];
	$fecha=$result_membresia_row['fecha'];
	$tipodescuentoporhorario=$result_membresia_row['tipodescuentoporhorario'];
	$montoporhorario=$result_membresia_row['montoporhorario'];

	
	$ruta='';
	if($foto==""){
		$ruta="images/sinfoto.png";
	}
	else{
		$ruta="catalogos/membresia/imagenes/".$_SESSION['codservicio']."/$foto";
	}

	$col = "col-md-12";
	$ver = "";
		$titulo='EDITAR MEMBRESÍA';

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

<form id="f_membresia" name="f_membresia" method="post" action="">
	<div class="card">
		<div class="card-body">
			<h4 class="card-title m-b-0" style="float:left;"><?php echo $titulo;?></h4>

			<div style="float: right;position:fixed!important;z-index:10;right:0;margin-right:2em;width: 20%;">
				
				<?php
			
					//SCRIPT PARA CONSTRUIR UN BOTON
					$bt->titulo = "GUARDAR";
					$bt->icon = "mdi mdi-content-save";
					$bt->funcion = "var resp=MM_validateForm('v_titulo','','R'); if(resp==1){ Guardarmembresia('f_membresia','catalogos/membresia/vi_membresia.php','main','$idmenumodulo');}";
					$bt->estilos = "float: right;";
					$bt->permiso = $permisos;
					$bt->class='btn btn-success';
				
					//validamos que permiso aplicar si el de alta o el de modificacion
				if($idmembresia == 0)
					{
						$bt->tipo = 1;
					}else{
						$bt->tipo = 2;
					}
			
					$bt->armar_boton();
				?>
				
				<!--<button type="button" onClick="var resp=MM_validateForm('v_empresa','','R','v_direccion','','R','v_tel','','R','v_email','',' isEmail R'); if(resp==1){ GuardarEmpresa('f_empresa','catalogos/empresas/fa_empresas.php','main');}" class="btn btn-success" style="float: right;"><i class="mdi mdi-content-save"></i>  GUARDAR</button>-->
				
				<button type="button" onClick="aparecermodulos('catalogos/membresia/vi_membresia.php?idmenumodulo=<?php echo $idmenumodulo;?>','main');" class="btn btn-primary" style="float: right; margin-right: 10px;"><i class="mdi mdi-arrow-left-box"></i>VER LISTADO </button>
				<div style="clear: both;"></div>
				
				<input type="hidden" id="id" name="id" value="<?php echo $idmembresia; ?>" />
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

								            	
								               
								                <input type="file" class="form-control-file" name="image" id="image" onchange="SubirImagenmembresia()">
								            </div>
								          <!--   <input type="button" class="btn btn-primary upload" value="Subir"> -->
								        </div>
								    </div>
								</form>

									<p style="text-align: center;">Dimensiones de la imagen Ancho:640px Alto:640px</p>
								</div>



							
							<div class="col-md-6" >

							<div class="form-group m-t-20">
								<label>*TITULO:</label>
							<input type="text" class="form-control" id="v_titulo" name="v_titulo" value="<?php echo $titulomembresia; ?>" title="TITULO" placeholder='TITULO'>
							</div>

								<div class="form-group m-t-20">
								<label>*DESCRIPCIÓN:</label>
								<textarea name="v_descripcion" id="v_descripcion" cols="20" rows="4" class="form-control" title="DESCRIPCIÓN" placeholder='DESCRIPCIÓN'><?php echo $descripcion ?></textarea>
							</div>


							<div class="form-group m-t-20">
								<label for="">*COSTO $</label>
								<input type="number" id="v_costo" class="form-control" value="<?php echo $costo; ?>" placeholder="COSTO" title="COSTO">

							</div>

								<div class="form-group m-t-20">
								<label for="">*FECHA</label>
								<input type="date" id="v_fecha" class="form-control" value="<?php echo $fecha; ?>" placeholder="COSTO" title="COSTO">

							</div>




							<div class="form-group m-t-20">
								<label for="">*TIEMPO EN QUE APLICA (días)</label>
								<input type="number" id="v_duracion" class="form-control" value="<?php echo $duracion; ?>" placeholder="TIEMPO EN QUE APLICA (días)" title="TIEMPO EN QUE APLICA (días)">

							</div>

								<div class="form-group m-t-20">
								<label for="">*CANTIDAD DE VECES A REPETIR </label>
								<input type="text" id="v_repetir" class="form-control" value="<?php echo $repetir; ?>" placeholder="CANTIDAD DE VECES A REPETIR" title="CANTIDAD DE VECES A REPETIR">

							</div>

							
							<div class="form-group m-t-20">
								<label for="">*LÍMITE DE PAGO DESPUES DE LA FECHA (días)</label>
								<input type="number" id="v_limite" class="form-control" value="<?php echo $limite; ?>" placeholder="LÍMITE " title="LÍMITE ">

							</div>

							<div class="form-group m-t-20">
								<label for="">*COLOR</label>
								<input type="color" id="v_color" class="form-control" name="v_color" value="<?php echo $color; ?>" placeholder="COLOR" title="COLOR"> 
							</div>


							<div class="form-group m-t-20">
								<label>*ORDEN:</label>
							<input type="number" class="form-control" id="v_orden" name="v_orden" value="<?php echo $orden; ?>" title="orden" placeholder='ORDEN'>
							</div>

						 <div class="form-check" style="margin-top: 1em;margin-bottom: 1em;">
						    <input type="checkbox" id="dependede" class="form-check-input " style="top: -0.3em;" onchange="HabilitarDepende()">
						    <label for="" class="form-check-label"> ASOCIADO CON</label>

						   </div>

		<div class="form-group m-t-20 divmembresia" style="display: none;">
							<label>MEMBRESÍA:</label>
							<select name="v_membresia" id="v_membresia" title="Membresia" class="form-control"  >
							<option value="0"> Seleccionar membresía</option> 
							</select>
						</div>

			<div class="divmembresia" style="display: none;">
				
				<div class="form-group">
					<label for="">LÍMITE DE MEMBRESÍAS :</label>
					<input type="number" id="v_limitemembresia" value="<?php echo $v_limitemembresia; ?>" class="form-control">
				</div>
			</div>

		 <div class="form-group divniveljerarquico" >
          <label for="">APLICAR A:</label>

     <div class="form-check">
     
     <input type="checkbox" id="inppadre" class="form-check-input" name="nivelj" style="top: -0.3em;" >
     <label for="" class="form-check-label">NIVEL 1 (el que asocia)</label>

    </div>

    <div class="form-check">
     
     <input type="checkbox" id="inphijo" class="form-check-input" name="nivelj" style="top: -0.3em;" >
     <label for="" class="form-check-label">NIVEL 2 (los asociados)</label>


    </div>

   <div class="form-check">
    
    <input type="checkbox" id="inpnieto" class="form-check-input" name="nivelj" style="top: -0.3em;" >
    <label for="" class="form-check-label">NIVEL 3 (los tutorados)</label>


   </div>

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

				<div class="card" style="" id="divhorarios">
				<div class="card-header" style="">

				</div>
				<div class="card-body">
						<div style="margin-top: 3em">

							<div class="row">
								<div class="col-md-12">
									<div class="form-check" style="margin-bottom: 1em;">
                    
					       <input type="checkbox" class="form-check-input " name="v_tiposervicio" value="1" id="v_tiposervicio" onclick="Desplegartiposervicio()" style="top: -0.3em;" />
					            <label class="form-check-label">POR TIPO SERVICIO</label>
					       </div>
								
									
								</div>
								<div class="col-md-3">
										
									</div>
							</div>
						<div class="divtiposervicio" style="display: none;">
							<div class="row">
								<div class="col-md-12">
									<button class="btn btn-primary" type="button" style=" float: right;   margin-top: -1em;" onclick="AgregarTipoNuevo()">NUEVO TIPO DE SERVICIO</button>
								</div>
								
							</div>
								
							<div id="tiposervicios"></div>
						</div>



					</div>
				</div>
			</div>

				<div class="card" style="" id="divhorarios">
				<div class="card-header" style="">
					
				</div>
				<div class="card-body">
						<div style="margin-top: 3em">

							<div class="row">
								<div class="col-md-12">

									<div class="form-check" style="margin-bottom: 1em;">
                    
					       <input type="checkbox" class="form-check-input " name="v_servicio" value="1" id="v_servicio" onclick="Desplegarporservicio()" style="top: -0.3em;">
					            <label class="form-check-label">POR SERVICIO</label>
					       </div>
								
								
								</div>
								<div class="col-md-3">
										
									</div>
							</div>
							<div class="divservicio" style="display: none;">
							<div class="row">
								<div class="col-md-12">
									
									<button class="btn btn-primary" type="button" style=" float: right;   margin-top: -1em;" onclick="AgregarServicioNuevo()">NUEVO SERVICIO</button>
								</div>
							</div>
								
								<div id="servicios"></div>

							</div>




					</div>
				</div>
			</div>


					<div class="card" style="" id="divhorarios">
				<div class="card-header" style="">

				</div>
				<div class="card-body">
						<div style="margin-top: 3em">

							<div class="row">
								<div class="col-md-12">
									<div class="form-check" style="margin-bottom: 1em;">
                    
					       <input type="checkbox" class="form-check-input " name="v_horarioseleccion" value="1" id="v_horarioseleccion" onclick="Desplegarhorarioselecciona()" style="top: -0.3em;" />
					            <label class="form-check-label">POR HORARIO</label>
					       </div>
								
									
								</div>
								<div class="col-md-3">
										
									</div>
							</div>
						<div class="divhorarios" style="display: none;">



							<div class="row">
								<div class="col-md-12">
									<div class="col-md-6">
									<label>DESCUENTO:</label>
										<div class="form-group mb-2" style="">
											<select class=" form-control " id="v_porhorariodescuento" tabindex="">
												<option value="0" >SELECCIONAR TIPO</option>
												<option value="1" >MONTO</option>
												<option value="2" >PORCENTAJE</option>
											

											</select>
										</div>

											<label>MONTO:</label>
											<div class="form-group mb-2" style="">
												<input type="text" id="v_porhorariomonto" class="form-control">
											</div>

										</div>
								</div>
								<div class="col-md-12">

									<button class="btn btn-primary" type="button" style=" float: right;   margin-top: -1em;" onclick="AgregarHorarioNuevo()">NUEVO HORARIO</button>
								</div>
								
							</div>
								
							<div id="horarios"></div>
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
	var idmembresia='<?php echo $idmembresia; ?>';
	var porcategoria='<?php echo $porcategoria; ?>';
	var porservicio='<?php echo $porservicio; ?>';
		var porhorario='<?php echo $porhorario; ?>';
	var depende='<?php echo $depende; ?>';
	var membresiadepende='<?php echo $membresiadepende; ?>';
	var inppadre='<?php echo $inppadre; ?>';
	var inphijo='<?php echo $inphijo; ?>';
	var inpnieto='<?php echo $inpnieto; ?>';
	var tipodescuentoporhorario='<?php echo $tipodescuentoporhorario;?>';
	var montoporhorario='<?php echo $montoporhorario;?>';

	if (idmembresia>0) {

		ObtenerServiciosMembresia(idmembresia);
		ObtenerCategoriasMembresia(idmembresia);
		ObtenerHorariosMembresia(idmembresia);
		if (porservicio==1) {
			$("#v_servicio").attr('checked',true);
			Desplegarporservicio();
		}
		if (porcategoria==1) {
			$("#v_tiposervicio").attr('checked',true);
			Desplegartiposervicio();
		}
		if (porhorario==1) {
		 $("#v_horarioseleccion").attr('checked',true);
		 Desplegarhorarioselecciona();

		}
		if (depende==1) {
			$("#dependede").prop('checked',true);
			HabilitarDepende();
			
			CargarMembresias(membresiadepende);
		}

		if (inppadre==1) {
			$("#inppadre").prop('checked',true);
		}
		if (inphijo==1) {
		$("#inphijo").prop('checked',true);
		}
		if (inpnieto==1) {

		$("#inpnieto").prop('checked',true);
		}

		$("#v_porhorariodescuento").val(tipodescuentoporhorario);
		$("#v_porhorariomonto").val(montoporhorario);

		
	}
			 

	/*$("#v_costo").on({
		  "focus": function(event) {
		    $(event.target).select();
		  },
		  "keyup": function(event) {
		    $(event.target).val(function(index, value) {
		      return value.replace(/\D/g, "")
		        .replace(/([0-9])([0-9]{2})$/, '$1.$2')
		        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
		    });
		  }
		});*/


	
	    function SubirImagenmembresia() {
	 	// body...
	 
        var formData = new FormData();
        var files = $('#image')[0].files[0];
        formData.append('file',files);
        $.ajax({
            url: 'catalogos/membresia/upload.php',
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