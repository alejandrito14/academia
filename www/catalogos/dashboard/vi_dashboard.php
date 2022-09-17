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
require_once("../../clases/class.Usuarios.php");
require_once("../../clases/class.Servicios.php");

//Declaración de objeto de clase conexión
$db = new MySQL();
$dashboard = new Dashboard();
$bt = new Botones_permisos(); 
$f = new Funciones();
$us=new Usuarios();
$us->db=$db;
$servicios=new Servicios();
$servicios->db=$db;

$obteneralumnos=$us->ObtenerUsuariosAlumnos();

$obtenercoaches=$us->ObtenerTodosUsuariosCoach();

$obtenerservicios=$servicios->ObtenerTodosServicios();

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
                                    <div class="card-footer ">
                <a class=" text-white " onclick="ListadoAlumnos()" style="width: 100%;cursor: pointer;">
                                        	<h3>
	                                        	<span class="mdi  mdi-account"></span></span>
	                                        	<span id="alumnosregistrados">0</span>
	                                        	</h3>

                                        </a>
                                        <div class="small text-white"><!-- <i class="fas fa-angle-right"></i> Font Awesome fontawesome.com -->
                                         
     <div id="mostraralumnos">
            <div id="" class="panel-actions">
            <span style="    justify-content: right;
    display: flex;font-size: 15px;" onclick="CerrarAlumnos()" class="actions "><span class="mdi mdi-close-circle"></span>
   </span>
          </div>

            <div class="table-responsive">
            <table class="table " id="tbltablealumnos" style="overflow-y: hidden;">
             <thead>
              <tr>
               <td style="text-align: center;">Nombre</td>
               <td style="text-align: center;">Email</td>
               <td style="text-align: center;">Celular</td>
              </tr>
             </thead>
             <tbody id="tblalumnos">
              <?php 
              for ($i=0; $i <count($obteneralumnos) ; $i++) { 
               ?>
               <tr>
                
                <td style="text-align: center;"><?php echo  $obteneralumnos[$i]->nombre; ?></td>
                 <td style="text-align: center;"><?php echo  $obteneralumnos[$i]->email; ?></td>
                  <td style="text-align: center;"><?php echo  $obteneralumnos[$i]->celular; ?></td>
               </tr>

            <?php 

             }

               ?>
             </tbody>
            </table>
           </div>
            
                                        </div>





                                        </div>

                                    </div>
                                </div>


                            </div>
                            <div class="col-xl-3 col-md-4">
                                <div class="card bg-naranja text-white mb-4">
                                    <div class="card-body">COACHES</div>
                                    <div class="card-footer ">
                                        <a class="small text-white stretched-link" onclick="ListadoCoaches()" style="width: 100%;cursor: pointer;">
                                        	<h3>
	                                        	<span class="mdi  mdi-account"></span></span>
	                                        	<span id="coachregistros">0</span>
	                                        	</h3>
                                        </a>
                                        <div class="small text-white">
                 <div id="mostrarcoaches">

            <div id="" class="panel-actions">
            <span style="    justify-content: right;
    display: flex;font-size: 15px;" onclick="CerrarCoaches()" class="actions "><span class="mdi mdi-close-circle"></span>
   </span>
          </div>

            <div class="table-responsive">
            <table class="table " id="tbltablecoaches" style="overflow-y: hidden;">
             <thead>
              <tr>
               <td style="text-align: center;">Nombre</td>
               <td style="text-align: center;">Email</td>
               <td style="text-align: center;">Celular</td>
              </tr>
             </thead>
             <tbody id="tblalumnos">
              <?php 
              for ($i=0; $i <count($obtenercoaches) ; $i++) { 
               ?>
               <tr>
                
                <td style="text-align: center;"><?php echo  $obtenercoaches[$i]->nombre; ?></td>
                 <td style="text-align: center;"><?php echo  $obtenercoaches[$i]->email; ?></td>
                  <td style="text-align: center;"><?php echo  $obtenercoaches[$i]->celular; ?></td>
               </tr>

            <?php 

             }

               ?>
             </tbody>
            </table>
           </div>
                                          
                                        </div>

                                    </div>
                                </div>
                            </div>
                           </div>

                               <div class="col-xl-3 col-md-4">
                                <div class="card bg-success text-white mb-4">
                                    <div class="card-body">SERVICIOS</div>
                                    <div class="card-footer ">
                                        <a class="small text-white stretched-link" onclick="ListadoServicios()" style="width: 100%;cursor: pointer;">
                                          <h3>
                                            <span class="mdi mdi-checkbox-blank-circle"></span></span>
                                            <span id="cantidadservicios">0</span>
                                            </h3>
                                        </a>
                                        <div class="small text-white">
                                         
              <div id="mostrarservicios">

            <div id="" class="panel-actions">
            <span style="    justify-content: right;
            display: flex;font-size: 15px;" onclick="CerrarServicios()" class="actions "><span class="mdi mdi-close-circle"></span>
           </span>
          </div>

            <div class="table-responsive">
            <table class="table " id="tbltableservicio" style="overflow-y: hidden;">
             <thead>
              <tr>
               <td style="text-align: center;">Título</td>
               <td style="text-align: center;">Categoría</td>
              </tr>
             </thead>
             <tbody id="tblservicios">
              <?php 
              for ($i=0; $i <count($obtenerservicios) ; $i++) { 
               ?>
               <tr>
                
                <td style="text-align: center;"><?php echo  $obtenerservicios[$i]->titulo; ?></td>
                 <td style="text-align: center;"><?php echo  $obtenerservicios[$i]->categoria; ?></td>
                 
               </tr>

            <?php 

             }

               ?>
             </tbody>
            </table>
           </div>
                                          
                                        </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                              <div id="picker2"></div>

                            </div>

                            <div class="col-xl-3 col-md-6">
                                <div class="card  text-white mb-4">
                                  <div class="card-title" id="txttitle" style="color: black;font-size: 16px;text-align: center;padding-top: 1em;">Horarios</div>
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

<style>
#picker2 table {
  /*  border-collapse: collapse;*/
    table-layout: fixed;
    width:100%;
    box-shadow: 0px 0px 1px rgba(0,0,0,0.2);
    background-color: #fff;
    position: relative;
    top: 0;
    left: 0;
    transform: translateX(0);
    transition: all 0.3s ease;

}

.fc-day-top .fc-mon .fc-past{
justify-content: center; 
display: flex;
}


.fc-toolbar {
    text-align: center;
}
.fc-toolbar .fc-left {
    float: left;
}

.fc .fc-toolbar > * > :first-child {
    margin-left: 0;
}

.fc-state-default.fc-corner-left {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

.fc-icon {
    display: inline-block;
    height: 1em;
    line-height: 1em;
    font-size: 1em;
    text-align: center;
    overflow: hidden;
    font-family: "Courier New", Courier, monospace;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.fc .fc-button-group > * {
    float: left;
    margin: 0 0 0 -1px;
}

.fc-toolbar .fc-right {
    float: right;
}

.fc-toolbar .fc-center {
    display: inline-block;
}

.fc button {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    height: 2.1em;
    padding: 0 0.6em;
    font-size: 1em;
    white-space: nowrap;
    cursor: pointer;
}

.fc-state-default.fc-corner-right {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}

.fc-state-default.fc-corner-left {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

.fc-rigid{
 height: 30px!important;
}
.fc-day-grid-container {
 height:auto!important;
}
.fc-day-top .fc-day-number{
margin: 5em!important!;
}

.fc-day-header{
text-align: center;
 }
 .fc-day-top{
text-align: center!important;

 }
 
.fc-state-default {
    background-color: #f5f5f5;
    background-image: -moz-linear-gradient(top, #ffffff, #e6e6e6);
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#e6e6e6));
    background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6);
    background-image: -o-linear-gradient(top, #ffffff, #e6e6e6);
    background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
    background-repeat: repeat-x;
    border-color: #e6e6e6 #e6e6e6 #bfbfbf;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    color: #333;
    text-shadow: 0 1px 1px rgb(255 255 255 / 75%);
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 20%), 0 1px 2px rgb(0 0 0 / 5%);
}

.fc button .fc-icon {
    position: relative;
    top: -0.05em;
    margin: 0 0.2em;
    vertical-align: middle;
}

.fc-icon-left-single-arrow:after {
    content: "\2039";
    font-weight: bold;
    font-size: 200%;
    top: -7%;
}

.fc-icon-right-single-arrow:after {
    content: "\203A";
    font-weight: bold;
    font-size: 200%;
    top: -7%;
}

/*.fc-button-group{
 display: none;
}*/
.fc-today-button{
 display: none;
}
.fc-day-header{
background: #007aff;
color: white;
}

.fc .fc-row .fc-content-skeleton table, .fc .fc-row .fc-content-skeleton td, .fc .fc-row .fc-helper-skeleton td {
    background: none;
    border-color: transparent;
}

.fc-day-top.fc-other-month {
    opacity: 0.3;
}

.fc-row .fc-content-skeleton td, .fc-row .fc-helper-skeleton td {
    border-bottom: 0;
}

.fc-header-toolbar{

 background:#007aff;
    color: white;
}
.fc-left{
 margin-top: 1em;
    margin-left: 1em;
}
.fc-right{
 margin-top: 1em;
    margin-right: 1em;
}
.fc-center h2{

 margin-top: .3em;
}

.fc-corner-left{
     justify-content: center;
    /* display: block; */
    width: 20%;
    float: left;
    font-size: 30px;
    text-align: center;
    height: 35px;

}

.fc-corner-right{
 justify-content: right;
    display: flow-root;
    width: 20%;
    /* float: right; */
    font-size: 30px;
    text-align: center;
    height: 35px;
}
.fc-header-right{
 visibility: hidden;
}

.fc-button-prev{
cursor: pointer;
}
.fc-button-next{
cursor: pointer;

}
.fc-border-separate tbody tr.fc-first td, .fc-border-separate tbody tr.fc-first th {
    border-top-width: 0;
}

.fc-border-separate td, .fc-border-separate th {
    border-width: 1px 0 0 1px;
}

.fc-grid .fc-other-month .fc-day-number {
    opacity: .3;
    filter: alpha(opacity=30);
}

.fc-grid .fc-day-number {
    /*float: right;*/
    /*padding: 0 2px;*/
    text-align: center;
}
.fc-header-title{
  text-align: center;
}

.fc-day .fc-sun .fc-widget-content .fc-other-month .fc-past .fc-first
{
    display: flex;
    justify-content: center;
}

.fc-day .fc-mon .fc-widget-content {
display: flex;
    justify-content: center;

}

.fc-week .fc-first > div{

 min-height: 20px!important;
}
</style>

<script>
	
	/*ObtenerClientesAndroidios();
	Obtenerregistrados();
	clientesensession();*/

  ObtenerCantidadAlumnos();
  ObtenerCoaches();
  ObtenerServicios();
  PintarCalendario2();


  

   $('#tbltablealumnos').DataTable( {  
    "pageLength": 10,
   "oLanguage": {
      "sLengthMenu": "Mostrar _MENU_ ",
      "sZeroRecords": "NO EXISTEN ALUMNOS EN LA BASE DE DATOS.",
      "sInfo": "Mostrar _START_ a _END_ de _TOTAL_ Registros",
      "sInfoEmpty": "desde 0 a 0 de 0 records",
      "sInfoFiltered": "(filtered desde _MAX_ total Registros)",
      "sSearch": "Buscar",
      "oPaginate": {
          "sFirst":    "Inicio",
          "sPrevious": "Anterior",
          "sNext":     "Siguiente",
          "sLast":     "Ultimo"
          }
      },
     "sPaginationType": "full_numbers", 
    "paging":   true,
    "ordering": true,
         "info":     false


  } );

    $('#tbltablecoaches').DataTable( {  
    "pageLength": 10,
   "oLanguage": {
      "sLengthMenu": "Mostrar _MENU_ ",
      "sZeroRecords": "NO EXISTEN COACHES EN LA BASE DE DATOS.",
      "sInfo": "Mostrar _START_ a _END_ de _TOTAL_ Registros",
      "sInfoEmpty": "desde 0 a 0 de 0 records",
      "sInfoFiltered": "(filtered desde _MAX_ total Registros)",
      "sSearch": "Buscar",
      "oPaginate": {
          "sFirst":    "Inicio",
          "sPrevious": "Anterior",
          "sNext":     "Siguiente",
          "sLast":     "Ultimo"
          }
      },
     "sPaginationType": "full_numbers", 
    "paging":   true,
    "ordering": true,
         "info":     false


  } );

    $('#tbltableservicio').DataTable( {  
    "pageLength": 10,
   "oLanguage": {
      "sLengthMenu": "Mostrar _MENU_ ",
      "sZeroRecords": "NO EXISTEN SERVICIOS EN LA BASE DE DATOS.",
      "sInfo": "Mostrar _START_ a _END_ de _TOTAL_ Registros",
      "sInfoEmpty": "desde 0 a 0 de 0 records",
      "sInfoFiltered": "(filtered desde _MAX_ total Registros)",
      "sSearch": "Buscar",
      "oPaginate": {
          "sFirst":    "Inicio",
          "sPrevious": "Anterior",
          "sNext":     "Siguiente",
          "sLast":     "Ultimo"
          }
      },
     "sPaginationType": "full_numbers", 
    "paging":   true,
    "ordering": true,
         "info":     false


  } );

CerrarAlumnos();
CerrarCoaches();
CerrarServicios();
   
</script>





