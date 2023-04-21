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
require_once("../../clases/class.Niveles.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Botones.php");

$idmenumodulo = $_GET['idmenumodulo'];

//Se crean los objetos de clase
$db = new MySQL();
$emp = new Niveles();
$f = new Funciones();
$bt = new Botones_permisos();

$emp->db = $db;

$emp->tipo_usuario = $tipousaurio;
$emp->lista_empresas = $lista_empresas;

//Validamos si cargar el formulario para nuevo registro o para modificacion


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
	
	
	<div class="row">
		<div class="col-md-12">


			<div class="card">
				<div class="card-header" style="padding-bottom: 0; padding-right: 0; padding-left: 0; padding-top: 0;">
					<!--<h5>DATOS</h5>-->

				</div>

				<div class="card-body">

					<div class="row">
				
				<div class="col-md-6">
					
			<!-- 	<input type="text"  class="form-control "> -->
			
  	<div class="">
  		<div class="">
  		  		<label for="" style="    ">ALUMNOS:</label>
	
  		</div>
  	</div>
    <input class="form-control mr-sm-2 nombreusuario" type="text" aria-label="Search" style="float: left;width: 90%;" disabled="disabled">
    <button class="btn" type="button" onclick="ObtenerClientesNotas()"><span class="mdi mdi-magnify"></span></button>
  



				</div>
				<div class="col-md-3"></div>
				<div class="col-md-3"></div>
			</div>


					<div class="row" style="margin-top: 1em;">
						
						<div class="col-md-6">
							<div class="divtodospagos" style="display: none;">
							<div class="row" style="padding-bottom: 1em;">
								<div class="col-md-12">
								<h3 class="nombreusuario2"></h3>
								</div>
								<div class="col-md-6">
									<label for="">SELECCIONAR PAGOS</label>
								</div>
									<div class="col-md-6" style="float: right;">
										<button style="float: right;display: none;" type="button" class="btn btnnuevopago btn_azul" onclick="AbrirModalNuevoPago()">NUEVO CONCEPTO</button>
									</div>
							</div>
							

						<div class="todospagos" style="background: #a09f9a;height: 500px;overflow: scroll;"></div>

						</div>
					</div>
					<div class="col-md-6 " >
						<div class="row" style="padding-bottom: 3em;">
							
						</div>
						<div class="divresumenpago" style="display: none;">
							<div class="row" style="margin-top: 2.4em;">
								<div class="col-md-6">
							   <label for="">RESUMEN DE PAGO</label>
								</div>
								<div class="col-md-6">
								</div>

					</div>
						<div  style="background: gray;margin-top: 1.4em;">
							
							<div class="listadopagoselegidos"></div>

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
					      <div class="col-md-2" style="justify-content: center;display: flex;margin-top: 1.3em;">

										    <span class="badge ">
										    	<button class="btn btn-success" type="button" onclick="AbrirModalMonedero()">APLICAR</button>
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
		
		<div class="col-md-12 "  >
			<div class="form-group divmetodopago" style="display: none;">
			<select name="" id="tipopago" class="form-control" onchange="CargarOpcionesTipopago()" style="width: 100%;">
				<option value="0">SELECCIONAR MÉTODO DE PAGO</option>
			</select>
		</div>
		</div>
		
	</div>


	<div class="">
			
		 <div class="divtransferencia" style="display: none;">
      <div  >
        <div class="list media-list" style="list-style: none;">
           <div class="informacioncuenta"></div>
        </div>
        

       </div>
     </div>
       <div id="campomonto" style="display: none;">
    <div class="subdivisiones" style="margin-top: 1.5em;width: 12em!important;" >
      <span style="margin-top: .5em;margin-left: .5em;">¿Con cuanto pagas?</span>
    </div>

    <div class="list media-list sortable">
     <div  style="list-style: none;">
      

          <div>
            
            <div class="label-radio item-content">
              
              <div class="item-inner">
             
                <div class="">

                  <input type="number" name="montovisual" class="form-control" id="montovisual" style="font-size: 18px;float: left;" placeholder="$0.00"  />
                  <input type="number" name="montocliente" id="montocliente"  style="font-size: 18px;float: left;width: 60%;    margin-left: 1.2em;display: none;" placeholder="$0.00"   />

                 
                </div>

                </div>


                <div class="item-after" style="">
                 


                   <span class="botoneditar" style="margin-right:.10em;" >
                  
                  <i class="bi bi-pencil "></i>
                  <span class="if-not-md"></span>

                  </span>


                     <span class="botoneditar" onclick="" style="visibility: collapse;">
                  
                      <i class="bi bi-pencil"></i>

                  </span>
                 
                </div>

              
            </div>


            </div>
        </div>

      </div>

      <div class="row">
	<div class="col-md-12">
		<label class="">Cambio de $<span id="cambio">0.00</span></label>
	</div>
	
</div>
</div> 



    <div class=" row">
              <div style="background-color:#dfdfdf;border-radius:10px;padding-top: .5px;padding-bottom: .5px;display: none;" id="aparecerimagen">
              <div class="">
                  <div class="row no-gap" style="text-align: center;"> 
                   <img src="" id="imagencomprobante" width="60" />
                  </div>
                </div>

                 <div class="block "> 
                     <div class="list media-list sortable" id="" style="">           

                    <ul id="lista-imagenescomprobante">
                        
                    </ul>
                </div> 
              </div>


        </div>

      </div>
       
       

        <div class=" divtarjetas" >
          <div class="" id="divlistadotarjetas">

      <div class="divisiones2" style="display: none;"><span style="margin-top: .5em;margin-left: .5em;">Seleccionar tarjeta</span></div>
      <div class="">
        <div class="">
          
          <div style="text-align: center;" id="categorianombre" class="categorianombre"></div>
          <div class="swiper-container  demo-swiper">
            <div class="swiper-wrapper" id="slidecategoria">

            </div>
          </div>

          <div class="list simple-list li">
            <ul id="listadotarjetas">
              
            </ul>
            <div class="divisiones2 divnueva" style="display: none;">
              <a class="btn btn-warning botonesredondeado botones btnnuevatarjeta"  style="color: black!important;background: #FFC830!important;margin-right: 1em; margin-top: 1em;margin-bottom: 10px; width: 100%;">Nueva Tarjeta</a>
            </div>    
          </div>
              
        </div>
      </div>
    </div>
    <div class="" id="divagregartarjeta" style="display: none;">

      <div class="divisiones2" style="    margin-bottom: 1em;
    margin-top: 1em;font-weight: bold;display: none;"><span style="">Introduce la información de la tarjeta</span></div>

      <div class="divisiones2" style="">

         <div class="">
         <div class="list form-list no-margin margin-bottom" id="my-form" style="background: white;">
           <div>
            
              <div>
                <div class="item-content item-input">
                <div class="item-inner">
                <div class="item-title item-label" >*Nombre en la tarjeta</div> 

                <div class="item-input-wrap" style="font-size: 15px;">
                  <input type="text" name="cardholder-name" placeholder="TITULAR DE LA TARJETA" class="mayusculas place form-control" id="v_cardholder-name" />
                  <span class="input-clear-button"></span>
                </div>
                  <label for="" id="lblnombre" class="lbl" style="color:red;"></label>
                </div>
                </div>
              </div>
              <div>
                <div class="item-content item-input">
                <div class="item-inner">
                <div class="item-title item-label">*Número de tarjeta</div>
                <div class="item-input-wrap" style="font-size: 15px;">
                  <div class="sr-input sr-element sr-card-element" id="v_card-number" style="margin-top: .5em;" >
                    <!-- A Stripe card Element will be inserted here. -->
                  </div>
                  <span class="input-clear-button"></span>
                </div>
                <label for="" id="lblntarjeta" class="lbl" style="color:red;"></label>
                </div>
                </div>
              </div> 
              <div>
                <div class="item-content item-input">
                <div class="item-inner">
                <div class="item-title item-label">*Fecha de vencimiento</div>
                <div class="item-input-wrap" style="font-size: 15px;">
                  <div class="sr-input sr-element sr-card-element" id="v_card-expiry" style="margin-top: .5em;">
                    <!-- A Stripe card Element will be inserted here. -->
                  </div>
                  <span class="input-clear-button"></span>
                </div>
                <label for="" id="lblntarjeta" class="lbl" style="color:red;"></label>
                </div>
                </div>

              </div> 

              <div>
                <div class="item-content item-input">
                <div class="item-inner">
                <div class="item-title item-label">*CVC</div>
                <div class="item-input-wrap" style="font-size: 15px;">
                  <div class="sr-input sr-element sr-card-element" id="v_card-cvc" style="margin-top: .5em;">
                    <!-- A Stripe card Element will be inserted here. -->
                  </div>
                  <span class="input-clear-button"></span>
                </div>
                <label for="" id="lblcvc" class="lbl" style="color:red;"></label>
                </div>
                </div>
              </div>
          </div>
          <div class="sr-field-error " id="card-errors" role="alert" style="color:#E25950;"></div>
          <div class=" ">
            <a class="btn btn-warning" onclick="" id="submit-card" style="margin-bottom: 1em;width: 100%; color: white!important;
    background: #FFC830!important;">Guardar Tarjeta</a>



     <a class="btn btn-danger botonesredondeado botones"  id="btnatras" style="
    color: white!important;
    background: red!important;
    margin-top: 1em;margin-bottom: 1em;">Cancelar</a>
          </div>  
        </div>
         </div> 
      </div>
    </div>  	


	</div>
</div>

<div class="row" >
	
	<div class="col-md-12 divpagar" style="display: none;">
		<button type="button" class="btn  btn-success btn-lg btn-block" id="btnpagarresumen" disabled onclick="RealizarpagoCliente()">PAGAR</button>
	</div>
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

<div id="myModalUsuariosnotas" class="modal fade" role="dialog">
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

      	 <button type="button" class="btn btn-success" onclick="ObtenerPagos()">Aceptar</button>

        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>
</div>


<div class="modal" id="modalimagencomprobante1"tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">SUBIR IMAGEN COMPROBANTE</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<div class="row">
      		<div class="col-md-12">
      			<form>
			  <div class="form-group">
			   <div class="card" style="width: 18rem;margin: auto;margin-top: 3em;">
								        <img class="card-img-top" src="">
								        <div id="d_foto" style="text-align:center; ">
											<img src="images/sinfoto.png" class="card-img-top" alt="" style="border: 1px #777 solid"> 
										</div>
								        <div class="card-body">
								            <h5 class="card-title"></h5>
								           
								            <div class="form-group">
								               
								                <input type="file" class="form-control-file" name="image" id="image"  onchange="SubirImagenComprobante()">
								            </div>
								          <!--   <input type="button" class="btn btn-primary upload" value="Subir"> -->
								        </div>
								    </div>
			  </div>
			</form>
      		</div>
      		<div class="col-md-6"></div>
      	</div>
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" onclick="GuardarImagen()">GUARDAR</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">CERRAR</button>
      </div>
    </div>
  </div>
</div>



<div class="modal" id="modalmonedero" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">MONEDERO DISPONIBLE $<span class="monederodisponible"></span></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<div class="row">
      		<div class="col-md-12">
      			<form>
			  <div class="form-group">
			  <!-- 	<label for="">MONEDERO DISPONIBLE</label>
			  	<span id="monederodisponible"></span> -->

			  	<label for="">MONEDERO A USAR</label>
			  	<input type="number" id="monederoausar" placeholder="$0.00" class="form-control">
			  </div>
			</form>
      		</div>
      		<div class="col-md-6"></div>
      	</div>
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" onclick="GuardarMonedero()">GUARDAR</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">CERRAR</button>
      </div>
    </div>
  </div>
</div>


<div class="modal" id="modalespera" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"></h5>
       
      </div>
      <div class="modal-body" id="divespera">
      
       
      </div>
      <div class="modal-footer">

      </div>
    </div>
  </div>
</div>


<div class="modal" id="modalnuevopago" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">NUEVO PAGO</h5>
       
      </div>
      <div class="modal-body" id="">
      	<div class="row">
      		<div class="col-md-12">
      			<form>
			  <div class="form-group">
			  	<label for="">CONCEPTO</label>
			  	<input type="text" id="txtconcepto" class="form-control">
			  </div>

			   <div class="form-group">
			  	<label for="">MONTO $</label>
			  	<input type="number" id="txtmonto" class="form-control">
			  </div>

			  <div class="form-check">
			    <input type="checkbox" id="opcion_1" class="opciones form-check-input " style="top: -0.3em;" onchange="HabilitarOpcion(1)">
			    <label for="" class="form-check-label">SERVICIO</label>

			   </div>

			   <div class="form-check">
			    <input type="checkbox" id="opcion_2" class="opciones form-check-input " style="top: -0.3em;" onchange="HabilitarOpcion(2)">
			    <label for="" class="form-check-label">MEMBRESÍA</label>

			   </div>


			    <div class="form-check">
			    <input type="checkbox" id="opcion_3" class="opciones form-check-input " style="top: -0.3em;"onchange="HabilitarOpcion(3)">
			    <label for="" class="form-check-label">OTROS</label>

			   </div>



			</form>

			<div id="listado" style="display: none;margin-top: 1em;">
				 <div class="form-group">
				 	<div id="divmembresia" style="display: none;">
					<label for="">MEMBRESÍAS</label>
					<select id="membresiaslistado" class="form-control" style="display: none;"></select>
					</div>

					<div id="divservicios" style="display: none;">
					<label for="">SERVICIOS:</label>
					<select name="" id="servicioslistado" class="form-control" style="display: none;"></select></div>
				</div>
			</div>


		</div>
	</div>
       
      </div>
      <div class="modal-footer">
      	 <button type="button" class="btn btn-success" onclick="GuardarPago()">GUARDAR</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">CERRAR</button>
      </div>
    </div>
  </div>
</div>



<script>
	ObtenerTipodepagos();
</script>

<?php

?>