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
require_once("../../clases/class.Movimientos.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Botones.php");
require_once("../../clases/class.CategoriasClasificador.php");
require_once("../../clases/class.Formapagocuenta.php");
require_once("../../clases/class.Cuentas.php");

$idmenumodulo = $_GET['idmenumodulo'];

//Se crean los objetos de clase
$db = new MySQL();
$emp = new Movimientos();
$f = new Funciones();
$bt = new Botones_permisos();
$clasificador=new CategoriasClasificador();
$formapagocuenta =new Formapagocuenta();
$clasificador->db=$db;
$formapagocuenta->db=$db;
$cuentas=new Cuentas();
$cuentas->db=$db;

$emp->db = $db;

$emp->tipo_usuario = $tipousaurio;
$emp->lista_empresas = $lista_empresas;

//Validamos si cargar el formulario para nuevo registro o para modificacion
if(!isset($_GET['idmovimiento'])){
	//El formulario es de nuevo registro
	$idmovimiento = 0;

	//Se declaran todas las variables vacias
	 $dia='';
	 $mes='';
	 $anio='';
	 $hora='';
	 $estatus=1;
	
	$col = "col-md-12";
	$ver = "display:none;";
	$titulo='NUEVO MOVIMIENTO';
	$idcuenta='0';
	$dependecuenta='';
	$fecha=date('Y-m-d');
}else{
	//El formulario funcionara para modificacion de un registro

	//Enviamos el id del pagos a modificar a nuestra clase Pagos
	$idmovimiento = $_GET['idmovimiento'];
	$emp->idmovimiento = $idmovimiento;

	//Realizamos la consulta en tabla Pagos
	$result_movimiento = $emp->buscarmovimiento();
	$result_movimiento_row = $db->fetch_assoc($result_movimiento);
 
 $dependecuenta=1;
	$resultadocategoria=$clasificador->ObtenerCategoriasClasificador();
	$resultadocategoria_row=$db->fetch_assoc($resultadocategoria);



	//Cargamos en las variables los datos 

	//DATOS GENERALES
	$idclasificadorgasto=$f->imprimir_cadena_utf8($result_movimiento_row['idclasificadorgastos']);
	
	$estatus = $f->imprimir_cadena_utf8($result_movimiento_row['estatus']);
	$monto=$result_movimiento_row['monto'];
	$tipo=$result_movimiento_row['tipo'];
	$idformapagocuenta=$result_movimiento_row['idformapagocuenta'];
	$clasificador->idclasificadorgasto=$idclasificadorgasto;


	$buscarcuenta=$clasificador->BuscarCuentaClasificador();		

$idcuentaseleccionado=$buscarcuenta[0]->idcuenta;
 $fecha=$result_movimiento_row['fechaoperacion'];
	
$observaciones=$result_movimiento_row['observacion'];
	$col = "col-md-12";
	$ver = "";
		$titulo='EDITAR MOVIMIENTO';

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

<form id="f_movimiento" name="f_movimiento" method="post" action="">
	<div class="card">
		<div class="card-body">
			<h4 class="card-title m-b-0" style="float: left;"><?php echo $titulo; ?></h4>

			<div style="float: right;">
				
				<?php
			
					//SCRIPT PARA CONSTRUIR UN BOTON
					$bt->titulo = "GUARDAR";
					$bt->icon = "mdi mdi-content-save";
					$bt->funcion = " Guardarmovimiento('f_movimiento','catalogos/movimientogastos/vi_movimientogastos.php','main','$idmenumodulo');";
					$bt->estilos = "float: right;";
					$bt->permiso = $permisos;
					$bt->class='btn btn-success';
				
					//validamos que permiso aplicar si el de alta o el de modificacion
				if($idmovimiento == 0)
					{
						$bt->tipo = 1;
					}else{
						$bt->tipo = 2;
					}
			
					$bt->armar_boton();
				?>
				
				<!--<button type="button" onClick="var resp=MM_validateForm('v_empresa','','R','v_direccion','','R','v_tel','','R','v_email','',' isEmail R'); if(resp==1){ GuardarEmpresa('f_empresa','catalogos/empresas/fa_empresas.php','main');}" class="btn btn-success" style="float: right;"><i class="mdi mdi-content-save"></i>  GUARDAR</button>-->
				
				<button type="button" onClick="aparecermodulos('catalogos/movimientogastos/vi_movimientogastos.php?idmenumodulo=<?php echo $idmenumodulo;?>','main');" class="btn btn-primary" style="float: right; margin-right: 10px;"><i class="mdi mdi-arrow-left-box"></i>VER LISTADO</button>
				<div style="clear: both;"></div>
				
				<input type="hidden" id="id" name="id" value="<?php echo $idmovimiento; ?>" />
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

					<div class="tab-content tabcontent-border">
						<div class="tab-pane active show" id="generales" role="tabpanel">


						<div class="form-group m-t-20">
						<label>*MONTO $:</label>
							<input type="text" class="form-control" name="" id="v_monto" value="<?php echo $monto; ?>" onchange="formatCurrency()">
							</div>
					
							
							<div class="form-group m-t-20">
								<label>*TIPO:</label>
								<div class="btn-group-toggle " data-toggle="buttons">
									<div class="btn btn_colorgray2 btncategotipo " id="catetipo_0">
											
											<input type="checkbox" id="catetipoi_0" class="catecheck" onchange="SeleccionarTipomovimiento(0)" value="0">
										CARGO
										</div>
											<div class="btn btn_colorgray2 btncategotipo " id="catetipo_1">
											<input type="checkbox" id="catetipoi_1" class="catecheck" onchange="SeleccionarTipomovimiento(1)" value="1">

											ABONO
										</div>

										</div>
								
								<!-- <select class="v_tipomovimiento form-control" id="v_tipomovimiento" >
									<option value="0" <?php if($tipo==0){ echo ("selected");}?> >CARGO</option>
									<option value="1" <?php if($tipo==1){ echo ("selected");}?>>ABONO</option>
								</select> -->


							</div>


							<div class="form-group m-t-20">
							<label>*CATEGORIA DE CUENTA:</label>
								<div class="btn-group-toggle divcategoriascuenta" data-toggle="buttons"></div>
							<?php 
							
							/*$categorias= $clasificador->ObtenerCategoriasClasificador();*/
									
							
								
								?>
								<!-- <select  class="form-control" id="v_clasificadorid" name="v_clasificadorid" >
									<option value="0" <?php if($depende==0){ echo ("selected");}?>>SELECCIONAR CATEGORIA DE CUENTA</option> -->
							<!-- <?php
								do{
									?> -->
										<!-- <option value="<?php echo ($categorias_row['idclasificadorgastos']);?>" <?php if($categorias_row['idclasificadorgastos']==$idclasificadorgasto){ echo ("selected");}?>><?php echo $categorias_row['nombredepende'].'-'.$categorias_row['nombre'];?></option> -->

										<!-- <div class="btn btn_colorgray2 btncategointervalo1 ">
											
											<input type="checkbox" id="cate_<?php $categorias_row['idclasificadorgastos']?>" class="catecheck" onchange="SeleccionarCategoriagastos('<?php $categorias_row['idclasificadorgastos']?>')" value="0">

											<?php echo $categorias_row['nombredepende'].'-'.$categorias_row['nombre'];?>

										</div> -->
										
								<!-- 	<?php 
									} while($categorias_row=$db->fetch_assoc($categorias));
									?> -->
							<!-- 	</select> -->
							</div>

							<div class="form-group m-t-20">
							<label>*CLASIFICADOR SUBCUENTA:</label>
								<div class="btn-group-toggle divcategoriassubcuenta" data-toggle="buttons"></div>
							</div>


							<div class="form-group m-t-20">
								<label>*CUENTAS BANCARIAS:</label>
								<div class="btn-group-toggle divcategoriascuentasbancarias" data-toggle="buttons">
								<?php 
							
									$obtenercuentas= $formapagocuenta->ObtenerTodosformapagocuentasActivas();
									
									$obtenercuentas_num=$db->num_rows($obtenercuentas);
									$obtenercuentas_row=$db->fetch_assoc($obtenercuentas);
								
								?>
							<!-- 	<select  class="form-control" id="v_cuentaselect" name="v_cuentaselect" >
									<option value="0" <?php if($idcuenta==0){ echo ("selected");}?>>SELECCIONAR CUENTA BANCARIAS</option> -->
									<?php
									do{
									?>
								<!-- 	<option value="<?php echo $obtenercuentas_row['idformapagocuenta'];?>" <?php if($obtenercuentas_row['idformapagocuenta']==$idcuenta){ echo ("selected");}?>><?php echo $obtenercuentas_row['nombre'];?></option> -->
										

										<div class="btn btn_colorgray2 btncategointervalo3 " id="cateformpago_<?php echo $obtenercuentas_row['idformapagocuenta']?>">
											
											<input type="checkbox" id="cateform_<?php echo $obtenercuentas_row['idformapagocuenta']?>" class="catecheck" onchange="SeleccionarCuentabancaria('<?php echo  $obtenercuentas_row['idformapagocuenta']?>')" value="0">

											<?php echo $obtenercuentas_row['nombre'];?>

										</div>

									<?php 
										} while($obtenercuentas_row=$db->fetch_assoc($obtenercuentas));
									?>
								<!-- </select> -->
							</div>
</div>

							<div class="form-group m-t-20">
								<label>*FECHA:</label>
								<input type="date" name="v_fecha" id="v_fecha" class="form-control" value="<?php echo $fecha; ?>">
							</div>


							<div class="form-group m-t-20">
								<label>*OBSERVACIONES:</label>
								<textarea class="form-control" id="v_observacion"><?php echo $observaciones ?></textarea>
							</div>

							
						<!-- <div class="form-group m-t-20">
							<label>ESTATUS:</label>
							<select name="v_estatus" id="v_estatus" title="Estatus" class="form-control"  >
								<option value="0" <?php if($estatus == 0) { echo "selected"; } ?> >DESACTIVO</option>
								<option value="1" <?php if($estatus == 1) { echo "selected"; } ?> >ACTIVO</option>
							</select>
						</div> -->

						
							
						</div>
						
						
					
					</div>

				</div>
				</div>
			</div>
		</div>


	</div>
</form>
<script  type="text/javascript" src="./js/mayusculas.js"></script>
<script type="text/javascript">
	Obtenercategoriascuenta();

function formatCurrency() {
    let input = document.getElementById('v_monto');
    let value = input.value;

    // Eliminar cualquier carácter que no sea un número o un punto decimal
    value = value.replace(/[^\d.]/g, '');

    // Verificar si el valor no está vacío y no es solo un punto decimal
    if (value !== '' && value !== '.') {
        // Convertir el valor a un número decimal
        let number = parseFloat(value);

        // Verificar si el valor es un número válido
        if (!isNaN(number)) {
            // Formatear el número como moneda con el símbolo de peso mexicano
            let formattedValue = number.toLocaleString('es-MX', {
                style: 'currency',
                currency: 'MXN',
                minimumFractionDigits: 2,
            });

            // Actualizar el valor del input
            input.value = formattedValue;
        } else {
            // Si el valor no es válido, limpiar el input
            input.value = '';
        }
    } else {
        input.value = '';
    }
}


var idmovimiento="<?php echo $idmovimiento; ?>";
var idcuentaseleccionado='<?php echo $idcuentaseleccionado; ?>';
var idclasificadorgasto='<?php echo $idclasificadorgasto; ?>';

var idformapagocuenta='<?php echo $idformapagocuenta; ?>';
var tipo='<?php echo $tipo; ?>';

	if (idmovimiento>0) {
	
			if (tipo>=0) {

				SeleccionarTipomovimiento(tipo);
			}

			if (idcuentaseleccionado>0) {
				
				SeleccionarCategoriacuenta(idcuentaseleccionado);
			}

			if (idclasificadorgasto>0) {
				setTimeout(function(){
					SeleccionarCategoriaSub(idclasificadorgasto);
				},1000);
			}

			if (idformapagocuenta>0) {


				setTimeout(function(){
					SeleccionarCuentabancaria(idformapagocuenta);
				},1000);

			}




	}

	 </script>


<?php

?>