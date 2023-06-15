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

$idmenumodulo = $_POST['idmenumodulo'];

//validaciones para todo el sistema

$tipousaurio = $_SESSION['se_sas_Tipo'];  //variables de sesion
$lista_empresas = $_SESSION['se_liempresas']; //variables de sesion

//validaciones para todo el sistema


/*======================= TERMINA VALIDACIÓN DE SESIÓN =========================*/

//Importación de clase conexión
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Notapago.php");
require_once("../../clases/class.Botones.php");
require_once("../../clases/class.Funciones.php");

//Declaración de objeto de clase conexión
$db = new MySQL();
$notapago = new Notapago();
$bt = new Botones_permisos(); 
$f = new Funciones();

$notapago->db = $db;
$idnotapago=$_POST['idnotapago'];
 ?>
<form id="f_nivel" name="f_nivel" method="post" action="">
	<div class="card">
		<div class="card-body">
			<h4 class="card-title m-b-0" style="float: left;"><?php echo $titulo; ?></h4>

			<div style="float: right;">
				
				<?php
			
					//SCRIPT PARA CONSTRUIR UN BOTON
					$bt->titulo = "GUARDAR";
					$bt->icon = "mdi mdi-content-save";
					$bt->funcion = "var resp=MM_validateForm('v_nombre','','R'); if(resp==1){ GuardarNivel('f_nivel','catalogos/niveles/vi_nivel.php','main','$idmenumodulo');}";
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
			
					//$bt->armar_boton();
				?>
				
				<!--<button type="button" onClick="var resp=MM_validateForm('v_empresa','','R','v_direccion','','R','v_tel','','R','v_email','',' isEmail R'); if(resp==1){ GuardarEmpresa('f_empresa','catalogos/empresas/fa_empresas.php','main');}" class="btn btn-success" style="float: right;"><i class="mdi mdi-content-save"></i>  GUARDAR</button>-->
				
				<button type="button" onClick="aparecermodulos('catalogos/notaspago/vi_notaspago.php?idmenumodulo=<?php echo $idmenumodulo;?>','main');" class="btn btn-primary" style="float: right; margin-right: 10px;"><i class="mdi mdi-arrow-left-box"></i>VER LISTADO</button>
				<div style="clear: both;"></div>
				
				<input type="hidden" id="id" name="id" value="<?php echo $idpagos; ?>" />
			</div>
			<div style="clear: both;"></div>
		</div>
	</div>
	
	
 <div class="col-md-6 divdetalle" style="display: none;">
<!-- 					<label for="">DETALLE DE NOTA</label>
 -->					<div class="row">
						<div class="col-md-12">
							<span id="folionota" style="text-align: center;
    font-size: 18px;
    justify-content: center;
    font-weight: bold;
    display: flex;"></span>

    <span id="fechapago" style="text-align: center;
    font-size: 18px;
    justify-content: center;
    font-weight: bold;
    display: flex;margin-top: 1em;"></span>
						</div>
						
					</div>
					<div class="listadopagos" id="listadopagos"></div>
					<div>
						<ul class="list-group divmonedero" style="display: none;">
									<li class="list-group-item  align-items-center" style="color:">
								   <div class="row">
								   <div class="col-md-10">
								   		<p id="">Monedero</p>
					                    <p class="" style="
											    float: right;
											">$<span id="monedero">0.00</span></p>
					                   </div>
					                   <div class="col-md-2">

										    <span class="badge ">
										    </span>
								   		 </div>
								    
								    </div>

								  </li>
								</ul>
							</div>

							<div >
								<ul class="list-group" id="uldescuentos" style="background: #46b2e2;"></ul>
							</div>




								<div>
								<ul class="list-group divresumen" style="display: none;">
									<li class="list-group-item  align-items-center" style="background: #aeb3b7;">
								   <div class="row">
								   <div class="col-md-10">
								   		<p id="">Resumen</p>
					                    <p class="" style="
											    float: right;
											">$<span id="" class="lblresumen">0.00</span></p>
					                   </div>
					                   <div class="col-md-2">

										    <span class="badge ">
										    </span>
								   		 </div>
								    
								    </div>

								  </li>
								</ul>
							</div>

								<div>
								<ul class="list-group divcomision" style="display: none;">
									<li class="list-group-item  align-items-center" style="background: #aeb3b7;">
								   <div class="row">
								   <div class="col-md-10">
								   		<p id="">Comisión</p>
					                    <p class="" style="
											    float: right;
											">$<span id="" class="lblcomision">0.00</span></p>
					                   </div>
					                   <div class="col-md-2">

										    <span class="badge ">
										    </span>
								   		 </div>
								    
								    </div>

								  </li>
								</ul>
							</div>


								<div>
								<ul class="list-group divtotal" style="display: none;">
									<li class="list-group-item  align-items-center" style="background: #aeb3b7;">
								   <div class="row">
								   <div class="col-md-10">
								   		<p id="">Total</p>
					                    <p class="" style="
											    float: right;
											">$<span id="" class="lbltotal">0.00</span></p>
					                   </div>
					                   <div class="col-md-2">

										    <span class="badge ">
										    </span>
								   		 </div>
								    
								    </div>

								  </li>
								</ul>
							</div>
							<div class="row">
								<div class="col-md-12 imagenescomprobante">
									
								</div>
							</div>

							<div class="row">
								<div class="col-md-12">
									<label for="">MÉTODO DE PAGO:</label>
									<span id="tipopago"></span>
								</div>
								
								
							</div>

								<div class="row">
									<div class="col-md-12">
									<label for="">ESTATUS:</label>
								<span id="estatus"></span>
							</div>
							</div>

							<!-- <div class="row">
								<div class="col-md-12">
									<button class="btn btn-success btncambiarestatus" onclick="">ACEPTAR PAGO</button>
								</div>
							</div> -->

							</div>
				</div>
			</div>

</form>
			<script>
				var idnotapago="<?php echo $idnotapago; ?>";
				DetalleNota(idnotapago);
			</script>