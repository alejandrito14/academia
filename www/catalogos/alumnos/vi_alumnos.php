<?php
require_once("../../clases/class.Sesion.php");

//creamos nuestra sesion.
$se = new Sesion();


$idmenumodulo = $_GET['idmenumodulo'];

if(!isset($_SESSION['se_SAS']))
{
	//header("Location: ../login.php");
	echo "login";
	exit;
}
     require_once("../../clases/conexcion.php");
     require_once("../../clases/class.Usuarios.php");
     require_once("../../clases/class.Botones.php");
     require_once("../../clases/class.Funciones.php");

	 
	 $db = new MySQL();
     $cli = new Usuarios();
     $bt = new Botones_permisos(); 
     $f=new Funciones();
     $cli->db = $db;
    
$tipousaurio = $_SESSION['se_sas_Tipo'];  //variables de sesion
$lista_empresas = $_SESSION['se_liempresas']; //variables de sesion


$cli->tipo_usuario= $tipousaurio;
$cli->lista_empresas = $lista_empresas;
	 

	 $sql_cliente = $cli->lista_Usuarios('1,3,5');


	 $result_row = $db->fetch_assoc($sql_cliente);
	 $result_row_num = $db->num_rows($sql_cliente);
$estatus=array('DESACTIVADO','ACTIVADO');

//die("Entro ".$result_row_num);


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


//*================== INICIA RECIBIMOS PARAMETRO DE PERMISOS =======================*/

if(isset($_SESSION['permisos_acciones_erp'])){
						//Nombre de sesion | pag-idmodulos_menu
	$permisos = $_SESSION['permisos_acciones_erp']['pag-'.$idmenumodulo];	
}else{
	$permisos = '';
}
//*================== TERMINA RECIBIMOS PARAMETRO DE PERMISOS =======================*/



 
 ?>
 
<script type="text/javascript" charset="utf-8">

//$(document).ready(function() {

var oTable = $('#zero_config').dataTable( {		

	  "oLanguage": {
					"sLengthMenu": "Mostrar _MENU_ Registros por pagina",
					"sZeroRecords": "Nada Encontrado - Disculpa",
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
	   		 	"ordering": true,

});
//});

</script>
  

<div class="card mb-3">
		<div class="card-body">
		<h5 class="card-title" style="float: left; margin-top: 5px;">LISTADO DE USUARIOS</h5>
		<!--<button type="button" onClick="AbrirModalGeneral2('ModalPrincipal','900','560','catalogos/Usuarios/fa_cliente.php');" class="btn btn-info" style="float: right;">AGREGAR CLIENTE</button>-->
		<?php
		
				
		$bt->titulo = "NUEVO";
		$bt->icon = "mdi-plus-circle";
		$bt->funcion = "
	
			 aparecermodulos('catalogos/alumnos/fa_alumno.php?idmenumodulo=$idmenumodulo','main');
			 ";
		$bt->estilos = "float: right; margin-right: 10px;";
		$bt->permiso = $permisos;
		$bt->tipo = 5;
		$bt->title="NUEVO";
		$bt->armar_boton();

			?>

		
		
		
		<div style="clear: both;"></div>
	</div>
  	<div class="card-body">
		<div class="table-responsive">
				<table id="zero_config" class="table table-bordered table-hover" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>ID</th>

 						<th>TIPO</th>
 					 <th>FOTO</th>
 	 				<th>ALIAS</th>

						<th width="72">NOMBRE</th>
						<th width="72">USUARIO</th>

					<!--	<th>NIVEL</th> -->
						<!--<th>NO TARJETA</th>-->
						<th width="88">CELULAR</th>
										<th width="88">TOKEN</th>

						<th>CORREO</th>
						<th>ASOCIADOS</th>
						<th>ASOCIADO DE</th>
<!-- 						<th width="97">LOCALIDAD</th>
 --> 
						<th>ESTATUS</th>

						<!--<th>SUCURSAL</th>-->
						<th width="64">ACCI&Oacute;N</th>
					</tr>
				</thead>
				<tbody>
					<?php
					
				
					
					if( $result_row_num  != 0)
					{
						do
						{
						
			
					?>

						<tr> 

							<td width="30"><?php echo utf8_encode($result_row['idusuarios']); ?></td>
						  
							<td width="30"><?php echo utf8_encode($result_row['nombretipo']); ?></td>
							<td width="30"><?php

						$fotoperfil=	$result_row['foto'];
								if($fotoperfil=="" || $fotoperfil=='null'){
														$rutaperfil="images/sinfoto.png";
													}
													else{
														//$rutaine="catalogos/paquetes/imagenespaquete/".$_SESSION['codservicio']."/$foto";

														$rutaperfil="app/".$_SESSION['carpetaapp']."/php/upload/perfil/$fotoperfil";
													}

							 ?>
							 	
							 <img src="<?php echo $rutaperfil; ?>" style="height: 30px;width: 30px;">

							 </td>
							<td width="30"><?php echo utf8_encode($result_row['alias']); ?></td>
						  
						  	<td><?php

						  	$nombre=mb_strtoupper($f->imprimir_cadena_utf8($result_row['nombre']." ".$result_row['paterno']." ".$result_row['materno']));

						  	 echo $result_row['nombre']." ".$result_row['paterno']." ".$result_row['materno']; ?></td>
						  	<!--<td><?php echo $nivel; ?></td>-->
						  		<td width="30"><?php echo utf8_encode($result_row['usuario']); ?></td>

						  	<td>
						  		<a href="tel://<?php echo utf8_encode($result_row['celular']); ?>"><?php echo utf8_encode($result_row['celular']); ?>
						  			
						  		</a>
						  	</td>

						  	<td width="30"><?php echo utf8_encode($result_row['token']); ?></td>
						  		<td width="30"><?php echo utf8_encode($result_row['email']); ?></td>

						  		<td>
						  		<?php 
						  		$cli->id_usuario=$result_row['idusuarios'];
						  		$obtenerasociados=$cli->ObtenerAsociados();


						  			if (count($obtenerasociados)>0) {
						  				for ($i=0; $i <count($obtenerasociados) ; $i++) { 
						  					$nombre=$obtenerasociados[$i]->nombre.' '.$obtenerasociados[$i]->paterno.' '.$obtenerasociados[$i]->materno;
						  					$icono="";
						  						$color="";
						  					if ($obtenerasociados[$i]->sututor==1) {
						  						$color="#85cceb";
						  					}

						  					if ($obtenerasociados[$i]->celular!='') {
						  						$icono='<a href="tel://'.$obtenerasociados[$i]->celular.'"> '.$obtenerasociados[$i]->celular.'</a>';
						  					}

						  				 ?>

						  						<p style="background: <?php echo $color; ?>"><?php echo $nombre; ?><?php echo $icono ?></p>
						  			
						  			<?php	
						  					}
						  			}
						  		 ?>	

						  		</td>
						  		<td>

						  			<?php 
						  			$nombre="";
						  				if (count($obtenerasociados)==0) {

						  						$cli->id_usuario=$result_row['idusuarios'];
						  					$buscartutor=$cli->ObtenerTutor();

						  					if (count($buscartutor)>0) {
						  								$nombre=$buscartutor[0]->nombre.' '.$buscartutor[0]->paterno.' '.$buscartutor[0]->materno;

						  					
						  					}

						  				}

						  				echo $nombre;

						  			 ?>
						  			

						  		</td>
						  
						 	<td width="30"><?php echo utf8_encode($estatus[$result_row['estatus']]); ?></td>
							
						
					  	
						  	<td align="center">
								

										<?php
													//SCRIPT PARA CONSTRUIR UN BOTON
													$bt->titulo = "";
													$bt->icon = "mdi-table-edit";
													$bt->funcion = "aparecermodulos('catalogos/alumnos/fa_alumno.php?idmenumodulo=$idmenumodulo&idusuarios=".$result_row['idusuarios']."','main')";
													$bt->estilos = "";
													$bt->permiso = $permisos;
													$bt->tipo = 2;
													$bt->title="EDITAR";
													$bt->class='btn btn_colorgray';
													$bt->armar_boton();


													$bt->titulo = "";
													$bt->icon = "mdi-account";
													$bt->funcion = "detalleAlumno(".$result_row['idusuarios'].")";
													$bt->estilos = ""; 
													$bt->permiso = $permisos;
													$bt->tipo = 2;
													$bt->title="DETALLE";
													$bt->class='btn btn_colorgray';
													$bt->armar_boton();
											


													$bt->titulo = "";
													$bt->icon = "mdi-delete-empty";
													$bt->funcion = "BorrarCliente('".$result_row['idusuarios']."','".$nombre."',".$idmenumodulo.",'catalogos/alumnos/vi_alumnos.php')";
													$bt->estilos = "";
													$bt->permiso = $permisos;
													$bt->tipo = 3;
													$bt->title="BORRAR";

													$bt->armar_boton();
												   					
												
								
													$bt->titulo = "";
													$bt->icon = "mdi-truck";
													$bt->funcion = "AbrirModalDireccionesEnvio('".$result_row['idusuarios']."',".$idmenumodulo.")";
													$bt->estilos = "";
													$bt->permiso = $permisos;
													$bt->tipo = 4;
													$bt->title="DIRECCIONES DE ENVIO";

													//$bt->armar_boton();
							
							
													$bt->titulo = "";
													$bt->icon = "mdi-receipt";
													$bt->funcion = "AbrirModalDatosFiscales('".$result_row['idusuarios']."',".$idmenumodulo.")";
													$bt->estilos = "";
													$bt->permiso = $permisos;
													$bt->tipo = 4;
													$bt->title="DATOS FISCALES";

													//$bt->armar_boton();
							     

													//SCRIPT PARA CONSTRUIR UN BOTON
												
												?>
								
									
						
							</td> 
						</tr>
					<?php 
						}while( $result_row = $db->fetch_assoc($sql_cliente));

					}else{?>
						<tr> 
				<td colspan="8" style="text-align: center">
					<h5 class="alert_warning">NO EXISTEN ALUMNOS EN LA BASE DE DATOS.</h5>
				</td>
			</tr>
						
					<?php }
					?>
				</tbody>
			</table>
		</div>
  	</div>
</div>


<div class="modal fade" id="modaldetallealumno" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog  modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<div class="row">
      		<div class="col-md-12"><h2 style="text-align: center;"></h2></div>
      	</div>
        <div class="row">
        	<div class="col-md-4">
        		<div class="row" style="margin-left: 1em;">
        			<img src="" alt="" class="imgperfil" style="height: 250px;width: 250px;border-radius: 10px;">
        		</div>


        		<div class="row" style="margin-top: 1em;margin-left: 1em;">
							  <div class="" style="width: 100%;">
							    <!-- Tab navs -->
							    <div
							      class="nav flex-column nav-pills text-center"
							      id="v-pills-tab"
							      role="tablist"
							      aria-orientation="vertical"
							    >
							      <a
							        class="nav-link tabskardex active"
							        id="v_tab_1"	 style="cursor:pointer;" onclick="CambioTab(1)"						       

							        >Datos generales</a>
							     
							      <a
							        class="nav-link tabskardex"
							        id="v_tab_2" style="cursor:pointer;" onclick="CambioTab(2)"
							       
							        >Servicios</a
							      >

							      <a
							        class="nav-link tabskardex"
							        id="v_tab_3" style="cursor:pointer;" onclick="CambioTab(3)"
							       
							        >Membresias</a
							      >

							       <a
							        class="nav-link tabskardex"
							        id="v_tab_4" style="cursor:pointer;" onclick="CambioTab(4)"
							       
							        >Asociados</a
							      >
							      <a
							        class="nav-link tabskardex"
							        id="v_tab_5" style="cursor:pointer;" onclick="CambioTab(5)"
							        
							        >Tutorados</a
							      >
							    </div>
							    <!-- Tab navs -->
							  </div>

 
</div>

        	</div>
        	<div class="col-md-8">
        		<div class="">
        				 <div class="col-md-12">
    <!-- Tab content -->
							    <div class="tab-content" id="v-pills-tabContent">
							      <div
							        class="tab-pane tabsk fade show active"
							        id="v-pills-link1"
							        role="tabpanel"
							        aria-labelledby="v-pills-link1-tab"
							      >

							        <table class="table table-user-information">
                    <tbody>
                      <tr>
                      	<td style="    font-weight: bold;">Alias:</td>
                        <td><p class="divalias" style="color: gray;"></p></td>

                       </tr>
                       <tr>
                        <td style="    font-weight: bold;">Nombre:</td>
                        <td><p class="divnombre" style="color: gray;"></p></td>
                      </tr>
                      <tr>
                        <td style="    font-weight: bold;">Fecha Nac.:</td>
                        <td> <p class="divfechanacimiento" style="color: gray;"></p></td>
                      </tr>
                      <tr>
                        <td style="    font-weight: bold;">Correo:</td>
                        <td><p class="divcorreo" style="color: gray;"></p></td>
                      </tr>
                  
                       <tr>
                        <td style="    font-weight: bold;">Sexo:</td>
                        <td><p class="divsexo" style="color: gray;"></p></td>
                      </tr>
                      <tr>
                      			  <td style="    font-weight: bold;">Celular:</td>
                       			 <td><p class="divcelular" style="color: gray;"></p>
                        		</td>
                      </tr>
                     
                      
                        <tr>
                      			  <td style="    font-weight: bold;">Tipo de usuario:</td>
                       			 <td><p class="divtipousuario" style="color: gray;"></p>
                        		</td>
                      </tr>    
                    
                     
                    </tbody>
                  </table>
							       
							       
							      </div>
							      <div
							        class="tab-pane tabsk fade"
							        id="v-pills-link2"
							        role="tabpanel"
							        aria-labelledby="v-pills-link2-tab">
							       	<div class="divservicios"></div>
							       
							      </div>
							      <div
							        class="tab-pane tabsk fade"
							        id="v-pills-link3"
							        >
							        <div class="divmembresias"></div>
							      </div>
							      <div
							        class="tab-pane tabsk fade"
							        id="v-pills-link4"
							       >
							       <div class="divasociados"></div>
							      </div>

							        <div
							        class="tab-pane tabsk fade"
							        id="v-pills-link5"
							       >
							       <div class="divtutorados"></div>
							      </div>
							    </div>
    <!-- Tab content -->
  </div>
        	
        		</div>
        	</div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <!-- <button type="button" class="btn btn-primary"></button> -->
      </div>
    </div>
  </div>
</div>

<script>
	//Buscar_empleado(<?php echo $idmenumodulo; ?>);
</script>

