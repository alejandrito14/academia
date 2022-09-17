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
require_once("../../clases/class.Deportes.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Botones.php");
require_once("../../clases/class.Niveles.php");

$idmenumodulo = $_GET['idmenumodulo'];

//Se crean los objetos de clase
$db = new MySQL();
$emp = new Deportes();
$f = new Funciones();
$bt = new Botones_permisos();
$nivel = new Niveles();
$nivel->db = $db;
$listaniveles=$nivel->ObtNivelesActivos();

$emp->db = $db;

$emp->tipo_usuario = $tipousaurio;
$emp->lista_empresas = $lista_empresas;

//Validamos si cargar el formulario para nuevo registro o para modificacion
if(!isset($_GET['iddeporte'])){
	//El formulario es de nuevo registro
	$iddeporte = 0;

	//Se declaran todas las variables vacias
	 $dia='';
	 $mes='';
	 $anio='';
	 $hora='';
	 $estatus=1;
	
	$col = "col-md-12";
	$ver = "display:none;";
	$titulo='NUEVO DEPORTE';

}else{
	//El formulario funcionara para modificacion de un registro

	//Enviamos el id del pagos a modificar a nuestra clase Pagos
	$iddeporte = $_GET['iddeporte'];
	$emp->iddeporte = $iddeporte;

	//Realizamos la consulta en tabla Pagos
	$result_deporte = $emp->buscardeporte();
	$result_deporte_row = $db->fetch_assoc($result_deporte);


	//Cargamos en las variables los datos 

	//DATOS GENERALES
	$deporte=$f->imprimir_cadena_utf8($result_deporte_row['deporte']);
	
	$estatus = $f->imprimir_cadena_utf8($result_deporte_row['estatus']);
	

	$col = "col-md-12";
	$ver = "";
		$titulo='EDITAR DEPORTE';

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

<form id="f_deporte" name="f_deporte" method="post" action="">
	<div class="card">
		<div class="card-body">
			<h4 class="card-title m-b-0" style="float: left;"><?php echo $titulo; ?></h4>

			<div style="float: right;">
				
				<?php
			
					//SCRIPT PARA CONSTRUIR UN BOTON
					$bt->titulo = "GUARDAR";
					$bt->icon = "mdi mdi-content-save";
					$bt->funcion = "var resp=MM_validateForm('v_nombre','','R'); if(resp==1){ Guardardeporte('f_deporte','catalogos/deportes/vi_deporte.php','main','$idmenumodulo');}";
					$bt->estilos = "float: right;";
					$bt->permiso = $permisos;
					$bt->class='btn btn-success';
				
					//validamos que permiso aplicar si el de alta o el de modificacion
				if($idPagos == 0)
					{
						$bt->tipo = 1;
					}else{
						$bt->tipo = 2;
					}
			
					$bt->armar_boton();
				?>
				
				<!--<button type="button" onClick="var resp=MM_validateForm('v_empresa','','R','v_direccion','','R','v_tel','','R','v_email','',' isEmail R'); if(resp==1){ GuardarEmpresa('f_empresa','catalogos/empresas/fa_empresas.php','main');}" class="btn btn-success" style="float: right;"><i class="mdi mdi-content-save"></i>  GUARDAR</button>-->
				
				<button type="button" onClick="aparecermodulos('catalogos/deportes/vi_deporte.php?idmenumodulo=<?php echo $idmenumodulo;?>','main');" class="btn btn-primary" style="float: right; margin-right: 10px;"><i class="mdi mdi-arrow-left-box"></i>VER LISTADO</button>
				<div style="clear: both;"></div>
				
				<input type="hidden" id="id" name="id" value="<?php echo $iddeporte; ?>" />
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
								<label id="lbldeporte">* DEPORTE:</label>
								<input type="text" class="form-control" id="v_deporte" name="v_deporte" value="<?php echo $deporte; ?>" title="deporte" placeholder='deporte'>
							</div>


							<div class="form-group m-t-20">
								<label id="lblniveles">* ELEGIR NIVELES:</label>

				
                    <div class="form-group m-t-20">  
                        <input type="text" class="form-control" name="buscadorpaq_" id="buscadorpaq_" placeholder="Buscar" onkeyup="BuscarEnLista('#buscadorpaq_','.pasuc_')">
                    </div>
                    <div class="paquetessucursales"  style="overflow:scroll;height:90px;" >
                        <?php      
                                for ($i=0; $i < count($listaniveles); $i++) { 
                                	# code...
                                
                                        ?>
                                        <div class="form-check pasuc_"  id="pasuc_<?php echo $listaniveles[$i]->idnivel;?>">
                                        <?php 
                                       
                                        $valor="";
                                        if ($listaniveles[$i]->estatus==1) {
                            
                                        ?>
                                        <input  type="checkbox" class="form-check-input chknivel" id="inputnivel_<?php echo $listaniveles[$i]->idnivel?>" <?php echo $valor; ?>>
                                        <label class="form-check-label" for="flexCheckDefault">
                                        <?php echo $listaniveles[$i]->nivel; 
                                        ?>
                                      </label>
                                    </div>                                  
                                <?php
                            			}
                            		}
                                     
                                 ?>
                                  
                    </div>
                    
                </div> <!--lpaquetesdiv-->
            
        </div>
								
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

				</div>
				</div>
			</div>
		</div>


	</div>
</form>

<script type="text/javascript">
	var iddeporte='<?php echo $iddeporte ?>';
	if (iddeporte>0) {
		ObtenerNivelesDeporte(iddeporte);
	}

</script>



<?php

?>