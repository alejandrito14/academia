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
</div>

<div class="tabs" style="width: 100%;">
  <button class="tab boton1" id="punto-venta-tab" style="width: 50%;" onclick="openTab('punto-venta')">Punto de Venta</button>
  <button class="tab boton1" id="pagos-tab" style="width: 50%;" onclick="openTab('pagos')">Pagos</button>
</div>

<div id="punto-venta" class="tab-content">
  <!-- Contenido del punto de venta -->
	  <div class="row" style="    background: gray;
	    padding-top: 1em;margin-top: 1em;    margin-right: 0.2em;
	    margin-left: 0.2em;">
		    <div class="col-md-12">
		    	<div class="row" style="    margin-left: 0.5em;">
		    		 <div class="col-md-12">
		    		 	 
		    		 	 <div class="container">
						  <input type="text" class="form-control" id="searchInput" placeholder="Buscar...">
						  <ul id="searchResults" class="list-group"></ul>
						</div>
					  
		    		 </div>
		    		


		    	</div>

	<div class="row" style="    margin-left: 1.4em;
    margin-top: 1em;
    margin-right: 0.2em;">
		    		<div class="col-md-12">
		    		<table class="table table-striped table-bordered " style="background: white">
		  <thead>
		    <tr>
		       <th scope="col">Cantidad</th>
		       <th scope="col">Nombre</th>
		      <th scope="col">Precio</th>
		      <th scope="col">Importe</th>
		      <th scope="col">Acciones</th>
		    </tr>
		  </thead>
		  <tbody id="tblpaquetes">
		   
		    
		    <!-- Agrega más filas según tus necesidades -->
		  </tbody>
		</table>

		</div>
		</div>
    	</div>

  		
  		</div>



</div>

<div id="pagos" class="tab-content">
  <!-- Contenido de los pagos -->
 
  	<div class="row" style="    background: gray;
    padding-top: 1em;margin-top: 1em;    margin-right: 0.2em;
    margin-left: 0.2em;">
  		

	<div class="col-md-12" style="">
		

		<div class="card">
	<div class="card-body">
	
				<div class="col-md-6" style="float: left;">
				
				</div>

		<!-- <div class="table-responsive" id="contenedor_Pagos"> -->
	<div class="col-md-6" style="float: left;">
			<div class="col-md-12" style="text-align: right;">
					<button style="display: none;margin-bottom: 1em;" class="btn btnnuevopago btn_azul" onclick="AbrirModalNuevoPago()">NUEVO PAGO</button>
			</div>
				<div class="col-md-12">
				<div class="todospagos" style="background: #a09f9a;height: 500px;overflow: scroll;"></div>
			</div>
		</div>
			<!-- <table id="tbl_pagos" cellpadding="0" cellspacing="0" class="table table-striped table-bordered">
				<thead>
					<tr style="text-align: center;">
						 <th > <input type="checkbox" id="inputtodos" onchange="SeleccionarTodosPagos()"> </th> 
						<th style="text-align: center;">CONCEPTO </th> 
						
						
						<th style="text-align: center;">CANTIDAD</th>
						
					</tr>
				</thead>
				<tbody id="listadopagos">
					
				</tbody>
			</table> -->
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
  	</div>


</div>

<div class="row">
	

<div class="col-md-6"></div>

		
<div class="col-md-6">
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
				<div class="col-md-12" style="text-align: right;">$<span id="subtotal" class="lbltotal" style="
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

	<div class="col-md-12 divcomision" style="text-align: right;display: none;">$<span id="comision" class="lblcomision" style="font-size: 16px;">0.00</span>
	</div>


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
		<label class="">Cambio $<span id="cambio">0.00</span></label>
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
</div>

<div class="row">

	<div class="col-md-5"></div>
	<div class="col-md-2"></div>

		<div class="col-md-5">
			
		</div>


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


<style>
	.tabs {
  display: flex;
}

.tab {
  padding: 10px 20px;
  background-color: #ddd;
  border: none;
  cursor: pointer;
}

.tab-content {
  display: none;
}

.container {
  position: relative;
}

#searchResults {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  display: none;
  z-index: 1;
      margin-left: 0.8em;
    margin-right: 0.8em;
}

#searchResults li {
  padding: 10px;
  cursor: pointer;
}

#searchResults li:hover {
  background-color: #f4f4f4;
}


</style>

<script type="text/javascript">
	ObtenerTipodepagos();
var arraypaquetes=[];
	function openTab(tabName) {
  // Ocultar todos los contenidos de las pestañas
  var tabContents = document.getElementsByClassName('tab-content');
  for (var i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = 'none';
  }
  
  // Mostrar el contenido de la pestaña seleccionada
  document.getElementById(tabName).style.display = 'block';
  
  // Agregar la clase "active" al botón de la pestaña seleccionada
  var tabs = document.getElementsByClassName('tab');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
  }
  document.getElementById(tabName + '-tab').classList.add('active');

  if (tabName=='punto-venta') {

  	pagosarealizar=[];

  	$("#btnpagarresumen").attr('onclick','RealizarpagoClientePunto()');
  }

   if (tabName=='pagos') {

  	arraypaquetes=[];

  	$("#btnpagarresumen").attr('onclick','RealizarpagoCliente()');
  }


}

var searchInput = document.getElementById('searchInput');
var searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const results = filterResults(searchTerm);

  
});

function filterResults(searchTerm) {
  // Implementa aquí la lógica para filtrar los resultados según el término de búsqueda
  	  var valor=searchTerm;
  	  var datos="valor="+valor;
      $.ajax({
      type: 'POST',
      data:datos,
      dataType:'json',
	  url:'catalogos/pagos/ObtenerPaquetes.php',
      async:false,
      success: function(msj){
      	console.log(msj.respuesta);
      		  const data = msj.respuesta;

			displayResults(data);

      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server 
           console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
      });

  




}

function displayResults(results) {
  searchResults.innerHTML = '';

  if (results.length > 0) {
    results.forEach(result => {
      const li = document.createElement('li');
      li.textContent = result.nombrepaquete;
      li.id="paquete_"+result.idpaquete;
      li.setAttribute('data-recurso',JSON.stringify(result));
      li.onclick=function() {
		 SeleccionarPaquete(result.idpaquete);
		};

      li.classList.add('list-group-item');
      searchResults.appendChild(li);
    });
    searchResults.style.display = 'block';
  } else {
    searchResults.style.display = 'none';
  }
}

// Cerrar el buscador si se hace clic fuera de él
document.addEventListener('click', function(e) {
  const isSearchInput = searchInput.contains(e.target);
  const isSearchResults = searchResults.contains(e.target);

  if (!isSearchInput && !isSearchResults) {
    searchResults.style.display = 'none';
  }
});


function SeleccionarPaquete(idpaquete) {
	var elemento=$("#paquete_"+idpaquete);
	var dataelemento=elemento.data('recurso');
	 searchResults.style.display = 'none';

	 var encontrado=0;
	 for (var i = 0; i <arraypaquetes.length; i++) {
	 	
	 		if (arraypaquetes[i].idpaquete==idpaquete) {
	 			encontrado=1;
	 			break;
	 		}

	 }

	 if (encontrado==0) {

	 	if (dataelemento.hasOwnProperty('cantidad')) {
	 		dataelemento.cantidad=parseFloat(dataelemento.cantidad)+1;
	 	}else{
	 		dataelemento.cantidad=1;
	 	}
	 	
	 	arraypaquetes.push(dataelemento);
	 }


	 console.log(arraypaquetes);

	 PintarElementos(arraypaquetes);

}


function PintarElementos(arraypaquetes) {
	var html="";
	if (arraypaquetes.length>0) {
		 for (var i = 0; i <arraypaquetes.length; i++) {
		 	html+=`
		 			<tr>
      <td>
      	 <div class="container">
				    <div class="row">
				      <div class="col-6">
				        <div class="input-group">
				          <div class="input-group-prepend">
				            <button class="btn btn-primary" onclick="decrement(`+arraypaquetes[i].idpaquete+`)">-</button>
				          </div>
				          <input type="text" id="quantity" class="form-control" style="border: none;width:40px;text-align:center;" value="`+arraypaquetes[i].cantidad+`">
				          <div class="input-group-append">
				            <button class="btn btn-primary" onclick="increment(`+arraypaquetes[i].idpaquete+`)">+</button>
				          </div>
				        </div>
				      </div>
				    </div>
				  </div>

      </td>
      <td>`+arraypaquetes[i].nombrepaquete+`</td>
      <td>$`+arraypaquetes[i].precioventa+`</td>`;
      var total=arraypaquetes[i].precioventa*arraypaquetes[i].cantidad;
      arraypaquetes[i].importe=total;
      html+=`<td>$`+total+`</td>
      <td>

      <button type="button" onclick="BorrarPaqueteArray(`+arraypaquetes[i].idpaquete+`)" class="btn btn_rojo" style="" title="BORRAR">
								<i class="mdi mdi-delete-empty"></i>
						</button>

      </td>	
    </tr>

		 	`;
			 }


	}

	$("#tblpaquetes").html(html);

	CalcularTotales();
}

function decrement(idpaquete) {
	var encontrado=0;
	var posicion=-1;
	for (var i = 0; i <arraypaquetes.length; i++) {
	 	
	 		if (arraypaquetes[i].idpaquete==idpaquete) {
	 			encontrado=1;
	 			posicion=i;
	 			break;
	 		}

	 }

	 if (encontrado==1) {
	 			var cantidad=arraypaquetes[posicion].cantidad;
	 				var total=cantidad-1;

	 				if (total>=1) {
	 						arraypaquetes[posicion].cantidad=total;

	 				}

	 }

	  PintarElementos(arraypaquetes);
}

function increment(idpaquete) {
		var encontrado=0;
	var posicion=-1;
	for (var i = 0; i <arraypaquetes.length; i++) {
	 	
	 		if (arraypaquetes[i].idpaquete==idpaquete) {
	 			encontrado=1;
	 			posicion=i;
	 			break;
	 		}

	 }

	 if (encontrado==1) {
	 			var cantidad=arraypaquetes[posicion].cantidad;
	 				var total=cantidad+1;

	 				if (total>=1) {
	 						arraypaquetes[posicion].cantidad=total;

	 				}

	 }


	 PintarElementos(arraypaquetes);
}


function BorrarPaqueteArray(idpaquete) {
		var encontrado=0;
	var posicion=-1;
	for (var i = 0; i <arraypaquetes.length; i++) {
	 	
	 		if (arraypaquetes[i].idpaquete==idpaquete) {
	 			encontrado=1;
	 			posicion=i;
	 			break;
	 		}

	 }

	 if (encontrado==1) {
	 			arraypaquetes.splice(posicion, 1); // Elimina el elemento en el índice 
	 }
	 PintarElementos(arraypaquetes);
}

/*
function CalcularTotalesPuntoVenta() {
	var suma=0;
	pagos=[];
	
	if (arraypaquetes.length>0) {

		for (var i = 0; i <arraypaquetes.length; i++) {
			suma=parseFloat(suma)+parseFloat(arraypaquetes[i].importe);
		}
	
	}

	var montodescuento=0;
	for (var i = 0; i < descuentosaplicados.length; i++) {
		montodescuento=parseFloat(montodescuento)+parseFloat(descuentosaplicados[i].montoadescontar);
	}
	

	var montodescuentomembresia=0;
	for (var i = 0; i < descuentosmembresia.length; i++) {
		montodescuentomembresia=parseFloat(montodescuentomembresia)+parseFloat(descuentosmembresia[i].montoadescontar);
	}

	$("#descuento").html(formato_numero(montodescuento,2,'.',','));
	$("#descuentomembresia").html(formato_numero(montodescuentomembresia,2,'.',','));

	// total=parseFloat(suma)-parseFloat(monedero)-parseFloat(montodescuento)+parseFloat(montodescuentomembresia);
	console.log(monedero);
	console.log(montodescuento);
	console.log(montodescuentomembresia);
	var resta=parseFloat(suma)-parseFloat(monedero)-parseFloat(montodescuento)-parseFloat(montodescuentomembresia);
    var sumaconcomision=resta;
	subtotalsincomision=resta;
	console.log(resta);

	$("#subtotal").html(formato_numero(suma,2,'.',','));

	$("#total").html(formato_numero(resta,2,'.',','));


      if (comisionporcentaje!=0 ){
       // comisionporcentaje=localStorage.getItem('comisionporcentaje');
        comimonto=parseFloat(comisionporcentaje)/100;
        
        comimonto=parseFloat(comimonto)*parseFloat(sumaconcomision);

        comision=parseFloat(comimonto)+parseFloat(comisionmonto);
      
       // localStorage.setItem('comision',comision);

     }


     // if (localStorage.getItem('impuesto')!=0 ){
       // impuesto=localStorage.getItem('impuesto');
        impumonto=impuesto/100;

        comision1=parseFloat(comision)*parseFloat(impumonto);
        impuestotal=comision1;
       // localStorage.setItem('impuestotal',comision1);
        comision=parseFloat(comision1)+parseFloat(comision);


     // }
        $(".divcomision").css('display','none');


      if (comision!=0 || comisionmonto!=0 ) {

        $(".divcomision").css('display','block');
        $(".lblcomision").text(formato_numero(comision,2,'.',','));
       // localStorage.setItem('comisiontotal',comision);
        comisiontotal=comision;
        sumaconcomision=parseFloat(sumaconcomision)+parseFloat(comision);
      }
   // subtotalsincomision=total.toFixed(2);
    //localStorage.setItem('subtotalsincomision',resta.toFixed(2));
	  //localStorage.setItem('sumatotalapagar',sumaconcomision.toFixed(2));
	//$(".lblresumen").text(formato_numero(resta,2,'.',','));
   // $(".lbltotal").text(formato_numero(sumaconcomision,2,'.',','));

   $("#total").html(formato_numero(sumaconcomision,2,'.',','));
    $("#monedero").text(formato_numero(monedero,2,'.',','));	
    var suma=sumaconcomision;

    total=sumaconcomision;
    if (suma==0 && monederoaplicado!=0) {

      $("#btnpagarresumen").attr('disabled',false);
    }
}*/





</script>
