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
require_once("../../clases/class.Usuarios.php");
require_once("../../clases/class.Botones.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Servicios.php");

//Declaración de objeto de clase conexión
$db = new MySQL();
$bt = new Botones_permisos(); 
$f = new Funciones();

$servicios=new Servicios();
$cli = new Usuarios();
$cli->db = $db;
$r_clientes = $cli->ObtenerUsuariosAlumno();
$a_cliente = $db->fetch_assoc($r_clientes);
$r_clientes_num = $db->num_rows($r_clientes);


$servicios->db=$db;
$serviciosactivos=$servicios->ObtenerServicioActivos();


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



$estatus=array('DESACTIVADO','ACTIVADO');

?>

<div class="card">
	<div class="card-body">
		<h5 class="card-title" style="float: left;">ASIGNAR USUARIOS A SERVICIOS</h5>
		
		<div id="botones" style="float: right;position:fixed!important;z-index:10;right:0;margin-right:2em;width: 17%;display: none;">
		
		

			<button class="btn btn-primary" onclick="CancelarAsignacion()" style="margin-right: 10px;"><i class="mdi mdi-content-cancel"></i>CANCELAR</button>

				<button class="btn btn-success btnguardar" onclick="GuardarAsignacionServicio()" ><i class="mdi mdi-content-save"></i>GUARDAR</button>
			
			<div style="clear: both;"></div>
		</div>
		
		<div style="clear: both;"></div>
	</div>
</div>
	<div class="card">
		<div class="card-title"></div>
		<div class="card-body">
			<div class="row">
				<div class="col-md-3"></div>
				<div class="col-md-6">
					<label for="">ALUMNOS</label>
			<!-- 	<input type="text"  class="form-control "> -->
			
  <form class="form-inline">
    <input class="form-control mr-sm-2 nombreusuario" type="text"  aria-label="Search" style="width: 80%;" disabled="disabled">
    <button class="btn  my-2 my-sm-0" type="button" onclick="ObtenerClientes()"><span class="mdi mdi-magnify"></span></button>
  </form>

  <div id="listarseleccionados">
    
  </div>



				</div>
				<div class="col-md-3"></div>
			</div>

	<form id="f_l_notarias" name="f_l_notarias" style="margin-top: 1em;">

							<div class="row style-select">
			<div class="col-md-12">
				<div class="subject-info-box-1">
					<label>SERVICIOS POR ASIGNAR</label>
					<select multiple class="form-control" id="lstBox1">
						

					</select>
				</div>

				<div class="subject-info-arrows text-center">
					<br /><br />
					<input type='button' id='btnAllRight' value='>>' class="btn btn-default" /><br />
					<input type='button' id='btnRight' value='>' class="btn btn-default" /><br />
					<input type='button' id='btnLeft' value='<' class="btn btn-default" /><br />
					<input type='button' id='btnAllLeft' value='<<' class="btn btn-default" />
				</div>

				<div class="subject-info-box-2">
					<label>SERVICIOS ASIGNADOS</label>
					<select multiple class="form-control" id="lstBox2">
				
					</select>
				</div>

				<div class="clearfix"></div>
			</div>
		</div>

						</form>
			
		</div>



	</div>

  <div class="card serviciosdesc" style="display: none;">
    <div class="card-title"></div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-12">
         <label for="">DESCRIPCIÓN DE SERVICIOS ASIGNADOS</label>
       </div>
      </div>
      <div class="row">
         
        <div class="col-md-12">
           <div class="list-group" id="serviciosdescripcion">
  
            </div>

        </div>

       <div class="col-md-6"></div>

      </div>
    
      <div >
       

      </div>
    </div>
  </div>
		


			
<div id="myModalUsuarios" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        
      </div>
      <div class="modal-body">

				<div class="card" style="" id="divcoachs">
				

				</div>
				<div class="card-body">
					<div class="row">
									<div class="col-md-12">
										<div class="card-body" id="lclientesdiv" style="display: block; padding: 0;">
	                
	     <div class="form-group m-t-20">	 
							<input type="text" class="form-control" name="buscadorcoachs_1" id="buscadorcoachs_" placeholder="Buscar" onkeyup="BuscarEnLista('#buscadorcoachs_','.alumnos_')">
					    </div>
	      <div class="clientes"  style="overflow:scroll;height:100px;overflow-x: hidden" >
						 
	       <div id="divusuarios"></div>

	      </div>
	     </div>

	    </div>
   </div>


       
      </div>
      <div class="modal-footer">

      	 <button type="button" class="btn btn-success" onclick="AceptarSeleccion()">Aceptar</button>

        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>
	
    <script src="js/jquery.selectlistactions.js"></script>  


<script>
        $('#btnAvenger').click(function (e) {
            $('select').moveToList('#StaffList', '#PresenterList');
            e.preventDefault();
        });

        $('#btnRemoveAvenger').click(function (e) {
            $('select').removeSelected('#PresenterList');
            e.preventDefault();
        });

        $('#btnAvengerUp').click(function (e) {
            $('select').moveUpDown('#PresenterList', true, false);
            e.preventDefault();
        });

        $('#btnAvengerDown').click(function (e) {
            $('select').moveUpDown('#PresenterList', false, true);
            e.preventDefault();
        });

        $('#btnShield').click(function (e) {
            $('select').moveToList('#StaffList', '#ContactList');
            e.preventDefault();
        });

        $('#btnRemoveShield').click(function (e) {
            $('select').removeSelected('#ContactList');
            e.preventDefault();
        });

        $('#btnShieldUp').click(function (e) {
            $('select').moveUpDown('#ContactList', true, false);
            e.preventDefault();
        });

        $('#btnShieldDown').click(function (e) {
            $('select').moveUpDown('#ContactList', false, true);
            e.preventDefault();
        });

        $('#btnJusticeLeague').click(function (e) {
            $('select').moveToList('#StaffList', '#FacilitatorList');
            e.preventDefault();
        });

        $('#btnRemoveJusticeLeague').click(function (e) {
            $('select').removeSelected('#FacilitatorList');
            e.preventDefault();
        });

        $('#btnJusticeLeagueUp').click(function (e) {
            $('select').moveUpDown('#FacilitatorList', true, false);
            e.preventDefault();
        });

        $('#btnJusticeLeagueDown').click(function (e) {
            $('select').moveUpDown('#FacilitatorList', false, true);
            e.preventDefault();
        });
		
        $('#btnRight').click(function (e) {
            $('select').moveToListAndDelete('#lstBox1', '#lstBox2');
            e.preventDefault();
        });

        $('#btnAllRight').click(function (e) {
            $('select').moveAllToListAndDelete('#lstBox1', '#lstBox2');
            e.preventDefault();
        });

        $('#btnLeft').click(function (e) {
           var opts = $('#lstBox2' + ' option:selected');
           var idservicio=opts.val();   

           var promesa=VerificarServicio(idservicio);
            promesa.then(r => {
                console.log(r);
              if (r.respuesta==0) {
                 $('select').moveToListAndDelete('#lstBox2', '#lstBox1');
               }else{
                
                    AbrirNotificacion("El servicio no se puede mover , ha sido aceptado por el usuario","mdi-close-circle");
                
               }

             

            });

           


            e.preventDefault();
        });

        $('#btnAllLeft').click(function (e) {
            $('select').moveAllToListAndDelete('#lstBox2', '#lstBox1');
            e.preventDefault();
        });
    </script>



<script type="text/javascript">

	var idmenumodulo='<?php echo $idmenumodulo; ?>';

	 $('#tbl_usuarios').DataTable( {		
		 	"pageLength": 100,
			"oLanguage": {
						"sLengthMenu": "Mostrar _MENU_ ",
						"sZeroRecords": "NO EXISTEN PROVEEDORES EN LA BASE DE DATOS.",
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
</script>
<style>
	#StaffList {
  height: 350px;
  margin-bottom: 10px;
}
#PresenterList,
#ContactList,
#FacilitatorList {
  height: 95px;
  margin-bottom: 10px;
}

.style-select select {
  padding: 0;
}

.style-select select option {
  padding: 4px 10px 4px 10px;
}

.style-select select option:hover {
  background: #EEEEEE;
}

.add-btns {
  padding: 0;
}

.add-btns input {
  margin-top: 25px;
  width: 100%;
}

.selected-left {
  float: left;
  width: 88%;
}

.selected-right {
  float: left;
}

.selected-right button {
  display: block;
  margin-left: 4px;
  margin-bottom: 2px;
}

@media (max-width: 517px) {
  .selected-right button {
    display: inline;
    margin-bottom: 5px;
  }
}

.subject-info-box-1,
.subject-info-box-2 {
  float: left;
  width: 45%;
}

.subject-info-box-1 select,
.subject-info-box-2 select {
  height: 200px;
  padding: 0;
}

.subject-info-box-1 select option,
.subject-info-box-2 select option {
  padding: 4px 10px 4px 10px;
}

.subject-info-box-1 select option:hover,
.subject-info-box-2 select option:hover {
  background: #EEEEEE;
}

.subject-info-arrows {
  float: left;
  width: 10%;
}

.subject-info-arrows input {
  width: 70%;
  margin-bottom: 5px;
}

</style>
