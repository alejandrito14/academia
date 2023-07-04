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
require_once("../../clases/class.Pagos.php");
require_once("../../clases/class.Botones.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Usuarios.php");

//Declaración de objeto de clase conexión
$db = new MySQL();
$pagos = new Pagos();
$bt = new Botones_permisos(); 
$f = new Funciones();

$pagos->db = $db;
$cli = new Usuarios();
$cli->db = $db;
$r_clientes = $cli->lista_Usuarios(3);
$a_cliente = $db->fetch_assoc($r_clientes);
$r_clientes_num = $db->num_rows($r_clientes);


//obtenemos todas las empreas que puede visualizar el usuario.

$pagos->tipo_usuario = $tipousaurio;
$pagos->lista_empresas = $lista_empresas;

$l_pagos = $pagos->ObtTodosPagos();
$l_pagos_row = $db->fetch_assoc($l_pagos);


$l_pagos_num = $db->num_rows($l_pagos);

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



$estatus=array('PENDIENTE','PROCESO','ACEPTADO','RECHAZADO','REEMBOLSO','SIN REEMBOLSO');
$estatuspago = array('NO PAGADO','PAGADO');
?>


<div class="card">
	<div class="card-body">
		<h5 class="card-title" style="float: left;">COBRAR</h5>
		
		<div style="float:right;">
			<button type="button" onClick="abrir_filtro('modal-filtros');" class="btn btn-primary" style="float: right;display: none;"><i class="mdi mdi-account-search"></i>  BUSCAR</button>			
			
			<?php
		
				//SCRIPT PARA CONSTRUIR UN BOTON
				$bt->titulo = "NUEVO PAGO";
				$bt->icon = "mdi-plus-circle";
				$bt->funcion = "aparecermodulos('catalogos/pagos/fa_pagos.php?idmenumodulo=$idmenumodulo','main');";
				$bt->estilos = "float: right; margin-right:10px;";
				$bt->permiso = $permisos;
				$bt->tipo = 5;
				$bt->title="NUEVO PAGO";
				

				//$bt->armar_boton();
			
			?>
			
			<div style="clear: both;"></div>
		</div>
		
		<div style="clear: both;"></div>
	</div>
</div>

<div class="row">
	<div class="col-md-6" style="">
		<div class="card">
			<div class="card-body">

					<label for="">SELECCIONAR CLIENTE:</label>

				 <div class="col" style="padding: 0">
                    <div class="form-group m-t-20">  
            <input type="text" class="form-control" name="buscadorcli_?>" id="buscadorcli_" placeholder="Buscar" onkeyup="BuscarEnLista('#buscadorcli_','.cli_')">
            </div>
          </div>
                   
          <div class="col">
                     <!--  <div class="form-check">
                        <input type="checkbox" id="v_tclientes"  name="v_tclientes" onchange="HabilitarDeshabilitarCheck('#lclientesdiv')" class="form-check-input " title="" placeholder=''  >
                        <label for="">SELECCIONAR TODOS</label>
                      </div> -->
              <div class="clientes "  style="overflow:scroll;height:100px;overflow-x: hidden" id="clientes_<?php echo $a_cliente['idusuarios'];?>"> 
               <?php      
              if ($r_clientes_num>0) {  
                  do {
            ?>
                  <div  class="form-check cli_"  id="cli_<?php echo $a_cliente['idusuarios'];?>_<?php echo $a_cliente['idcliente'];?>">
                      <?php   
                      $valor="";
                     $nombre=mb_strtoupper($f->imprimir_cadena_utf8($a_cliente['nombre']." ".$a_cliente['paterno']." ".$a_cliente['materno']));
                    ?>
                    <input  type="checkbox" style="" onchange="SeleccionarClientePagos('<?php echo $a_cliente['idusuarios'];?>')" value="" class="form-check-input chkcliente_<?php echo $idcupon;?>" id="inputcli_<?php echo $a_cliente['idusuarios']?>_<?php echo $idcupon;?>" <?php echo $valor; ?>>
                    <label class="form-check-label" for="flexCheckDefault" ><?php echo $nombre; ?></label>
                </div>                    
                  <?php
                    } while ($a_cliente = $db->fetch_assoc($r_clientes));
                     ?>
                  <?php } ?>    
            </div>
          </div>
      </div> <!-- lclientesdiv -->

			</div>
		

	</div>


	
	<div class="col-md-8" style="">
		<!-- <div class="">
			<div class="card">
			<div class="card-body">
				<div class="col-md-6" style="float: left;"></div>
				<div class="col-md-6" style="float: right;">
					<button class="btn btn_azul">NUEVO PAGO</button>
				</div>
			</div>
			</div>
	
		</div> -->

		<div class="card">
	<div class="card-body">
		<div class="col-md-6" style="float: left;"></div>
				<div class="col-md-6" style="float: right;">
					<button style="float: right;display: none;" class="btn btnnuevopago btn_azul" onclick="AbrirModalNuevoPago()">NUEVO PAGO</button>
				</div>

		<div class="table-responsive" id="contenedor_Pagos">
			<label for="">PAGOS</label>
			<table id="tbl_pagos" cellpadding="0" cellspacing="0" class="table table-striped table-bordered">
				<thead>
					<tr style="text-align: center;">
						 <th > <input type="checkbox" id="inputtodos" onchange="SeleccionarTodosPagos()"> </th> 
						<th style="text-align: center;">CONCEPTO </th> 
						
						
						<th style="text-align: center;">CANTIDAD</th>
						
					</tr>
				</thead>
				<tbody id="listadopagos">
					
				</tbody>
			</table>
		</div>

		<div class="table-responsive" id="contenedor_descuentos" style="display: none;">
			<label for="">DESCUENTOS QUE APLICA:</label>
			<table id="tbl_descuentos" cellpadding="0" cellspacing="0" class="table table-striped table-bordered">
				<thead>
					
				</thead>
				<tbody id="listadodescuentos">
					
				</tbody>
			</table>
		</div>


		<div class="table-responsive" id="contenedor_descuentos_membresia" style="display: none;">
			<label for="">DESCUENTOS DE MEMBRESÍA:</label>

			<table id="tbl_descuentos_membresia" cellpadding="0" cellspacing="0" class="table table-striped table-bordered">
				<thead>
					
				</thead>
				<tbody id="listadodescuentosmembresia">
					
				</tbody>
			</table>
		</div>
	</div>
</div>

	</div>
		<!-- <div class="col-md-6">
		<div class="row">
			<div class="col-md-12">
				<div class="card">
				<div class="card-body" style="display: none;">
					<label for="" class="active">FORMA DE PAGO</label>
					<div class="">
						
					</div>
				</div>
			</div>
			</div>
	 		
			
		</div>
		
		


	</div> -->
<div class="col-md-4">
	<div class="row" style="margin-top: 40px;">
	
	<div class="col-md-12">
		<button type="button" class="btn  btn-success btn-lg btn-block"  style="display: none;" id="btnmonederodisponible" disabled>MONEDERO $<span id="monederodisponible">0.00</span></button>
	</div>
</div>
	<div class="row" style="">
	<div class="col-md-6" style="
    margin: 0;
    padding: 0;
">
		<div class="">
			<div class="col-md-12">
				<div class="card">
				<div class="card-body">
			<div class="row" style="
			    /* margin-left: 1em; */
			    ">
			    	<div class="col-md-12" style="font-size: 16px;">SUBTOTAL: </div>
			    	<div class="col-md-12" style="font-size: 16px;">MONEDERO: </div>
			
				<div class="col-md-12" style="font-size: 16px;">DESCUENTO: </div>
				<div class="col-md-12" style="font-size: 16px;">DESCUENTO MEMBRESÍA: </div>
					<div class="col-md-12 divcomision" style="font-size: 16px;display: none;">COMISIÓN: </div>

				<div class="col-md-12" style="font-size: 20px;">TOTAL:</div>

			</div>
		</div>
	</div>
	</div>
	</div>
</div>
	<div class="col-md-6" style="font-size: 16px;">

		<div class="row">
			<div class="col-md-12">
				<div class="card">
				<div class="card-body" style="    padding-left: 0;
    padding-right: 1px;">
			<div class="row" >
				<div class="col-md-12" style="text-align: right;">$<span id="subtotal" style="
    font-size: 16px;
">0.00</span></div>
						<div class="col-md-12" style="text-align: right;">$<span id="monedero" style="
    font-size: 16px;
">0.00</span></div>
				
				<div class="col-md-12" style="text-align: right;">$<span id="descuento" style="
    font-size: 16px;
">0.00</span>
				</div>
				<div class="col-md-12" style="text-align: right;padding-top: 24px;">$<span id="descuentomembresia" style="
    font-size: 16px;
">0.00</span><br>
				</div><br>

	<div class="col-md-12 divcomision" style="text-align: right;display: none;">$<span id="comision" style="
    font-size: 16px;">0.00</span></div>


				<div class="col-md-12" style="text-align: right;font-size: 20px;/* padding-top: 6px; */">$<span id="total">0.00</span></div></div>

			</div>
		</div>
	</div>
	</div>
		</div>
	</div>
	<div class="row">
		
		<div class="col-md-12">
			<div class="form-group">
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
         <div class="list form-list no-margin margin-bottom" id="my-form">
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

<div class="row">
	
	<div class="col-md-12">
		<button type="button" class="btn  btn-success btn-lg btn-block" id="btnpagarresumen" disabled onclick="RealizarpagoCliente()">PAGAR</button>
	</div>
</div>
</div>

	<div class="col-md-5"></div>
	<div class="col-md-2"></div>

		<div class="col-md-5">
			
		</div>


</div>


<div class="modal" id="modalmetodopago" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">PAGO</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<div class="row">
      		<div class="col-md-6">
      			<form>
			  <div class="form-group">
			    <label for="exampleInputEmail1">FORMA DE PAGO</label>
			  	<select name="v_tipopago" id="v_tipopago" onchange="CargarOpcionesTipopago()" class="form-control">
							<option value="0">SELECCIONAR FORMA DE PAGO</option>
						</select>
			  </div>
			</form>
      		</div>
      		<div class="col-md-6"></div>
      	</div>
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">PAGAR</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">CERRAR</button>
      </div>
    </div>
  </div>
</div>


<div class="modal" id="modalimagencomprobante" tabindex="-1" role="dialog">
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
								               
								                <input type="file" class="form-control-file" name="image" id="image" onchange="SubirImagenComprobante()">
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
        <h5 class="modal-title">MONEDERO DISPONIBLE</h5>
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




<script type="text/javascript">
	ObtenerTipodepagos();
</script>
