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

$idmenumodulo = $_GET['idmenumodulo'];

//validaciones para todo el sistema

$tipousaurio = $_SESSION['se_sas_Tipo'];  //variables de sesion
$lista_empresas = $_SESSION['se_liempresas']; //variables de sesion

//validaciones para todo el sistema


/*======================= TERMINA VALIDACIÓN DE SESIÓN =========================*/

//Importación de clase conexión
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Dashboard.php");
require_once("../../clases/class.Botones.php");
require_once("../../clases/class.Funciones.php");

//Declaración de objeto de clase conexión
$db = new MySQL();
$dashboard = new Dashboard();
$bt = new Botones_permisos(); 
$f = new Funciones();

$dashboard->db = $db;


if(isset($_SESSION['permisos_acciones_erp'])){
						//Nombre de sesion | pag-idmodulos_menu
	$permisos = $_SESSION['permisos_acciones_erp']['pag-'.$idmenumodulo];	
}else{
	$permisos = '';
}
//*================== TERMINA RECIBIMOS PARAMETRO DE PERMISOS =======================*/




?>

<div class="row">
                              <!-- <div class="col-xl-3 col-md-6">
                                  <div class="card bg-primary text-white mb-4">
                                      <div class="card-body">DESCARGAS</div>
                                      <div class="card-footer d-flex align-items-center justify-content-between">
                                          <a class="small text-white stretched-link" >	
                                          <div class="row">
  	                                        <div>
  	                                        	<h3>
  	                                        	<span class="mdi mdi-android"></span>
  	                                        	<span id="usuariosandroid">0</span></h3>
  	                                        </div>

                                         	 	<div style="margin-left: 1em">
  	                                        	<h3>
  	                                        	<span class="mdi mdi-apple"></span></span>
  	                                        	<span id="usuariosios">0</span>
  	                                        	</h3>
                                          	</div>

                                          	</div>
                                          </a>
                                          <div class="small text-white"></div>
                                      </div>
                                  </div>
                              </div> -->
                            <div class="col-xl-3 col-md-4">
                                <div class="card bg-azul text-white mb-4">
                                    <div class="card-body">ALUMNOS</div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <a class="small text-white stretched-link" >
                                        	<h3>
	                                        	<span class="mdi  mdi-account"></span></span>
	                                        	<span id="alumnosregistrados">0</span>
	                                        	</h3>

                                        </a>
                                        <div class="small text-white"><!-- <i class="fas fa-angle-right"></i> Font Awesome fontawesome.com --></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-4">
                                <div class="card bg-naranja text-white mb-4">
                                    <div class="card-body">COACHES</div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <a class="small text-white stretched-link" >
                                        	<h3>
	                                        	<span class="mdi  mdi-account"></span></span>
	                                        	<span id="coachregistros">0</span>
	                                        	</h3>
                                        </a>
                                        <div class="small text-white"><!-- <i class="fas fa-angle-right"></i> Font Awesome fontawesome.com --></div>
                                    </div>
                                </div>
                            </div>

                               <div class="col-xl-3 col-md-4">
                                <div class="card bg-success text-white mb-4">
                                    <div class="card-body">SERVICIOS</div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <a class="small text-white stretched-link" >
                                          <h3>
                                            <span class="mdi mdi-checkbox-blank-circle"></span></span>
                                            <span id="cantidadservicios">0</span>
                                            </h3>
                                        </a>
                                        <div class="small text-white"><!-- <i class="fas fa-angle-right"></i> Font Awesome fontawesome.com --></div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4">
                              <div id="picker"></div>

                            </div>

                            <div class="col-xl-3 col-md-4">
                                <div class="card  text-white mb-4">
                                  <div class="card-title" id="txttitle" style="color: black;font-size: 16px;text-align: center;">Horarios</div>
                                    <div class="card-body">
                                      <div class="horarios"></div>
                                    </div>
                                    
                                </div>
                            </div>
                            <!-- <div class="col-xl-3 col-md-6">
                                <div class="card bg-danger text-white mb-4">
                                    <div class="card-body">Danger Card</div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <a class="small text-white stretched-link" href="#">View Details</a>
                                        <div class="small text-white"></div>
                                    </div>
                                </div>
                            </div> -->
                        </div>



<script>
	
	/*ObtenerClientesAndroidios();
	Obtenerregistrados();
	clientesensession();*/

  ObtenerCantidadAlumnos();
  ObtenerCoaches();
  ObtenerServicios();
  PintarCalendario2();
</script>





