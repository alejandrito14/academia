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
require_once("../../clases/class.Pais.php");

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

$pais = new Paises();
$pais->db=$db;


//obtenemos todas las empreas que puede visualizar el usuario.

$pagos->tipo_usuario = $tipousaurio;
$pagos->lista_empresas = $lista_empresas;

$l_pagos = $pagos->ObtTodosPagos();
$l_pagos_row = $db->fetch_assoc($l_pagos);


$l_pagos_num = $db->num_rows($l_pagos);

$obtenerpais2=$pais->ObtenerPaices();
$rows_pais2=$db->fetch_assoc($obtenerpais2);
  
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
		<h5 class="card-title" style="float: left;"></h5>
		
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
		
<div class="col-md-6" id="divapertura">
       
       </div>
	</div>
<div class="col-md-6">
	<div class="card">
		<div class="card-body" id="divfechahoraapertura" style="margin: 0;
    padding-bottom: 0;">
			<p style=" margin-left: 10px">FECHA Y HORA DE APERTURA:</p>
				<p style=" margin-left: 10px;font-size: 20px;"><span id="fechahoraapertura"></span></p>

				<form style="margin-top: 1em;
    margin-right: 85px;" class="form-inline" >
          	<button type="button" class="btn  btn-success btn-lg btn-block" style="background: red;border: 1px solid red;" id="btncerrar" onclick="AbrirModalCerrarCaja()">Cerrar caja</button>
          </form>
		</div>
	</div>
</div>

 

<div class="row" id="divseleccionar" style="display: none;">
	<div class="col-md-6" style="">
		<div class="card">
			<div class="card-body">

					<label for="" style="padding-left: 10px;">SELECCIONAR CLIENTE:</label>

                   
          <div class="col">

          	<form class="form-inline">
								    <input class="form-control mr-sm-2 nombreusuario" type="text" aria-label="Search" style="width: 80%;" disabled="disabled">
								    <button class="btn  my-2 my-sm-0" type="button" onclick="ObtenerClientesFiltro()"><span class="mdi mdi-magnify"></span></button>
								  </form>
             
          </div>

          <div class="col">
          	
          </div>
      </div> <!-- lclientesdiv -->

			</div>
		

	</div>
	<div class="col-md-6" >
		<div class="row" style="    padding-right: 15px;border-radius: 10px;width: 100%;">
			<div id="datoscliente" class="col-md-12" style="margin-top: 40px;margin-bottom: 1em;"></div>
		</div>
		<div class=""></div>
	</div>
</div> 
<div class="row">
	<div class="col-md-12" >
<div class ="divtabs" style="display: none;">
			<div class="tabs" style="width: 100%;    padding-left: 30px;    padding-right: 30px;">
			  <button class="tab boton1" id="punto-venta-tab" style="width: 50%;" onclick="openTab('punto-venta')">Punto de Venta</button>	
			  <button class="tab boton1" id="pagos-tab" style="width: 50%;" onclick="openTab('pagos')">Servicios</button>
			</div>

</div>

<div id="punto-venta" class="tab-content" style="padding-left: 30px;    padding-right: 30px;">
 
	  <div class="row" style="    background: #7488d2;
    padding-top: 1em;
    margin-top: 1em;
    margin-right: 0.2em;
    margin-left: 0.2em;
    padding-right: 1em;
    border-radius: 8px;">
		    <div class="col-md-12" style="    margin-top: 1em;">
		    	<div class="row" style="    margin-left: 0.5em;">
		    		 <div class="col-md-12">
		    		 	 
		    		 	 <div class="" style="    padding-left: 1em;padding-right: 1em;">
						 				 <input type="text" class="form-control" id="searchInput" placeholder="Buscar producto (Presionar la tecla enter para hacer la búsqueda) " onkeypress="handleKeyPress(event)">
						 				 <ul id="searchResults" class="list-group"></ul>
											</div>
					  
		    		 </div>
		    		


		    	</div>

	<div class="row" style="    margin-left: 1.4em;
    margin-top: 1em;
    margin-right: 0.2em;">
		    		<div class="col-md-12">
		 <div class="tablapaquetediv" style="display: none;">
		 <table class="table table-striped table-bordered " style="background: white;">
		  <thead>
		    <tr>
		      
		       <th style="width: 20%" scope="col">Nombre</th>
		        <th style="width: 20%" scope="col">Cantidad</th>
		      <th style="width: 20%" scope="col">Precio</th>
		      <th style="width: 20%" scope="col">Importe</th>
		    </tr>
		  </thead>
		  <tbody id="tblpaquetes">
		   
		    
		    <!-- Agrega más filas según tus necesidades -->
		  </tbody>
		</table>
		</div>

			<div class="row" style="    margin-bottom: 1em;">
				<div class="col-md-10"></div>
								<div class="col-md-2">
									 <button id="btnAgregar" class="btn btn-primary" style="float: right;display: none;">Agregar producto</button>
								</div>

		 
				</div>

		</div>
		

		</div>

	</div>
</div>

	<div id="tablaventa" style="display: none;margin-top: 1em;margin-bottom: 1em;">
    <h4 for="" style="font-size:18px!important;text-align: center;">Productos agregados</h4>

 <div class="row" style="    background: black;
    padding-top: 1em;
    margin-bottom: 1em;
    margin-right: 0.2em;
    margin-left: 0.2em;
    border-radius: 8px;
    padding-right: 1em;" >
		    <div class="col-md-12">


		<div class="row" style="margin-left: 1.4em;
    margin-top: 1em;
    margin-right: 0.2em;margin-bottom: 1em;" >
		    		<div class="col-md-12">
		    		<table class="table table-striped table-bordered " style="background: white">
		  <thead>
		    <tr>
		      
		       <th style="width: 20%" scope="col">Nombre</th>
		        <th style="width: 20%" scope="col">Cantidad</th>
		      <th style="width: 20%" scope="col">Precio</th>
		      <th style="width: 20%" scope="col">Importe</th>
		      <th style="width: 20%" scope="col">Acciones</th>
		    </tr>
		  </thead>
		  <tbody id="tblpaquetesventa">
		   
		    
		    <!-- Agrega más filas según tus necesidades -->
		  </tbody>
		</table>

		</div>
		</div>

    	</div>

  		
  		</div>


</div>
</div>
</div>

</div>

<div id="pagos" class="tab-content" style="padding-left: 20px;    padding-right: 20px;">
  <!-- Contenido de los pagos -->
 
  	<div class="row" style="    background: #7488d2;
    padding-top: 1em;
    margin-top: 1em;
    margin-right: 1em;
    margin-left: 1em;
    border-radius: 8px;">
  		

	<div class="col-md-12" style="">
		

		<div class="card" style="        margin-right: 2em;
    margin-left: 2em;
    margin-top: 1em;">
	<div class="card-body">
	
				<div class="col-md-6" style="float: left;">
				
				</div>

		<!-- <div class="table-responsive" id="contenedor_Pagos"> -->
	<div class="col-md-6" style="float: left;">
			<div class="col-md-12" style="text-align: right;">
					<button style="display: none;margin-bottom: 1em;" class="btn btnnuevopago btn_azul" onclick="AbrirModalNuevoPago()">NUEVO PAGO</button>
			</div>
				<div class="col-md-12">
				<div class="todospagos" style="background: #e5ecfe;overflow: scroll;"></div>

				<div class="todosdescuentos" style="background: #e5ecfe;height: 500px;overflow: scroll;"></div>
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
<div class="card">
<div style="display: none;        padding-left: 30px;
    background: black;
    padding-right: 30px;
    margin-right: 2.8em;
    margin-left: 2.8em;
    border-radius: 10px;" id="metodopagodiv">
<div class="row" style="    background: white;
    margin-left: 0.5em;
    margin-top: 2em;
    margin-right: 0.5em;
    margin-bottom: 2em;">

	

		<div class="col-md-6"></div>

		
		<div class="col-md-6">

			<div class="row" style="margin-top: 10px;">
				<div class="col-md-12">
						<div class="form-group requierefacturadiv" style="margin-left: 10px;display: none;">
							REQUIERE FACTURA
							<input type="checkbox" 
							id="requierefactura" onchange="ObtenerListadoDatosFiscales()" 
										/>

						</div>
				</div>

				<div class="col-md-12">
						<div class="divfiscal" style="">
							

						</div>
				</div>

			</div>

	<div class="row" style="margin-top: 10px;
    padding-right: 30px;">
	
	<div class="col-md-12">
		<button type="button" class="btn  btn-success btn-lg btn-block"  style="display: none;
    
    " id="btnmonederodisponible" disabled>APLICAR MONEDERO $<span id="monederodisponible">0.00</span></button>
	</div>
</div>
	<div class="row detallepago" style="">
	<div class="col-md-6" style="
    margin: 0;
    padding: 0;
">
		<div class="">
			<div class="col-md-12">
				<div class="card">
				<div class="card-body" style="    padding: 1.25rem 0rem 1rem 1rem;">
			<div class="row" style="
			       
			    ">
			    	<div class="col-md-12" style="font-size: 16px;">SUBTOTAL: </div>
			    	<div class="col-md-12" style="font-size: 16px;">MONEDERO: </div>
			
				<div class="col-md-12" style="font-size: 16px;">DESCUENTO: </div>
				<div class="col-md-12" style="font-size: 16px;">DESCUENTO MEMB.: </div>
					<div class="col-md-12 divcomision" style="font-size: 16px;display: none;">COMISIÓN: </div>

				<div class="col-md-12" style="font-size: 20px;">TOTAL:</div>

			</div>
		</div>
	</div>
	</div>
	</div>
</div>
	<div class="col-md-6" style="font-size: 16px;">
 
		<div class="row" style="width: 94%;">
			<div class="col-md-12">
				<div class="card">
				<div class="card-body" style="padding: 1.25rem 1rem 1rem 1rem;">
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
				<div class="col-md-12" style="text-align: right;">$<span id="descuentomembresia" style="
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
	<div class="row" style="padding-right: 30px;">
		
		<div class="col-md-12">
			<div class="form-group">
			<!-- <select name="" id="tipopago" class="form-control" onchange="CargarOpcionesTipopago()" style="padding-left: 30px;">
				<option value="0">SELECCIONAR MÉTODO DE PAGO</option>
			</select> -->
			<p>SELECCIONAR MÉTODO DE PAGO</p>
			<div class="divtipopago  btn-group-toggle litipodepago"></div>
		</div>
		</div>
		
	</div>


	<div class="row" style="padding-right: 30px;">
		
		<div class="col-md-12 divbancos" style="display: none;" >
			<div class="form-group">
			<!-- <select name="" id="tipopago" class="form-control" onchange="CargarOpcionesTipopago()" style="padding-left: 30px;">
				<option value="0">SELECCIONAR MÉTODO DE PAGO</option>
			</select> -->
			<p>SELECCIONAR BANCO</p>
			<div class="divbancos  btn-group-toggle libancos"></div>
		</div>
		</div>


		<div class="col-md-12 divdigitos" style="display: none;" >
			<div class="form-group">
				<label for="">DÍGITOS DE LA TARJETA</label>

				<input type="text" class="form-control" id="txtdigitostarjeta" onkeyup="VerficarFormulariocompleto()">
		</div>
		</div>


			<div class="col-md-12 divopcionestarjeta"  style="display: none;">
			<div class="form-group">
				<label for="">OPCIONES DE TARJETA</label>

					<div class="btn-group-toggle ">
								<label class="btn btn_colorgray2 btntipo" id="catetipo_1">
			<input type="checkbox" id="catetipo_1" class="catechecktipo1" onchange="SeleccionarOpciontarjeta(1)" value="0"> 
				DÉBITO</label>

					<label class="btn btn_colorgray2 btntipo" id="catetipo_2">
			<input type="checkbox" id="catetipo_2" class="catechecktipo1" onchange="SeleccionarOpciontarjeta(2)" value="0"> 
				CRÉDITO</label>

					</div>


			
				
		</div>
		</div>
		
	</div>


	<div class="">
			
		 <div class="divtransferencia" style="display: none;">
      <div  >
        <div class="list media-list" style="list-style: none;">
           <div class="informacioncuenta" style="padding-right: 30px;"></div>
        </div>
        

       </div>
     </div>
       <div id="campomonto" style="display: none;">
    <div class="subdivisiones" style="margin-top: 1.5em;width: 12em!important;" >
      <span style="margin-top: .5em;margin-left: .5em;">¿Con cuanto pagas?</span>
    </div>

    <div class="row" style="">
     <div  style="" class="col-md-12">
      

          <div style="padding-right:30px;">
            
            <div class="label-radio item-content">
              
              <div class="item-inner">
             
                <div class="">

                  <input type="number" name="montovisual" class="form-control" id="montovisual" style="font-size: 18px;float: left;padding-right: 30px;" placeholder="$0.00"  />
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

      <div class="row" style="margin-top: 5px;">
					<div class="col-md-12">
						<label class="">Cambio $<span id="cambio">0.00</span>
						</label>
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

                    <ul id="lista-imagenescomprobante" class="list-group" style="margin-bottom: 1em;">
                        
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

          <div  style="padding-right: 30px;">
            <ul id="listadotarjetas">
              
            </ul>
            <div class="divisiones2 divnueva" style="display: none;">
              <a class="btn btn-warning botonesredondeado botones btnnuevatarjeta"  style="color: black!important;background: #FFC830!important;margin-right: 1em; margin-top: 1em;margin-bottom: 10px;width: 100%;">Nueva Tarjeta</a>
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

                <div class="item-input-wrap" style="font-size: 15px;padding-right: 30px;">
                  <input type="text" name="cardholder-name" placeholder="TITULAR DE LA TARJETA" class="mayusculas place form-control" id="v_cardholder-name" style="" />
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
          <div class=" " style="padding-right: 30px;">
            <a class="btn btn-warning" onclick="" id="submit-card" style="margin-bottom: 1em; color: white!important; background: #FFC830!important;width: 100%;">Guardar Tarjeta</a>



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

				<div class="row" style="padding-right: 30px;margin-bottom: 1em;">
					
						<div class="col-md-12">
							<button type="button" class="btn  btn-success btn-lg btn-block" id="btnpagarresumen" style="background: #007aff;border-color: #007aff;" disabled onclick="RealizarpagoCliente()" style="">PAGAR</button>
						</div>
				</div>

		</div>

				<div class="col-md-2"></div>

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


<div class="modal" id="modaldatofiscal" tabindex="-1" role="dialog">
  <div class="modal-dialog " role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">NUEVO DATO FISCAL</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<div class="row">
      		<div class="col-md-12">
      		<form>
      			<div class="row">
          <div class="col-md-12">

          		<form method="post" action="#" enctype="multipart/form-data">
								    <div class="card" style="width: 18rem;margin: auto;margin-top: 3em;">
								        <img class="card-img-top" src="">
								        <div id="d_foto" style="text-align:center; ">
											<img src="<?php echo $ruta; ?>" class="card-img-top" alt="" style="border: 1px #777 solid"/> 
										</div>
								        <div class="card-body">
								            <h5 class="card-title"></h5>
								           
								            <div class="form-group">

								            	
								               
								                <input type="file" class="form-control-file" name="image" id="image" onchange="SubirImagenFiscal()">
								            </div>
								          <!--   <input type="button" class="btn btn-primary upload" value="Subir"> -->
								        </div>
								    </div>
								</form>
          <div class="form-group">

            <input type="hidden" id="v_idfactura" value="0">
            <label>RAZON SOCIAL:</label>
            <input name="v_fis_razonsocial" id="v_fis_razonsocial" title="Razon Social" type="text" class="form-control" placeholder="RAZON SOCIAL"  required value="<?php echo $v_fis_razonsocial; ?>" >
            <label for="" id="lblrazon" style="color: red;"></label>
          </div>
          </div>

          <div class="col-md-12">

          <div class="form-group">
            <label>RFC:</label>
            <input name="v_fis_rfc" id="v_fis_rfc" title="RFC" type="text" class="form-control" placeholder="RFC" onkeyup="Validarrfc();" required value="<?php echo $v_fis_rfc; ?>" >
            <label id="lblrfc" style="color: red;"></label>
          </div>
        </div>


          <div class="col-md-12">
              <div class="form-group ">
                <label for="">CORREO FISCAL</label>
                <input type="text" id="correofiscal" title="CORREO FISCAL" class="form-control" placeholder="CORREO FISCAL" value="<?php echo $correofiscal; ?>">

               <label id="lblcorreofiscal" style="color: red;"></label>

              </div>
              
            </div>

       

        </div>
          <div class="row">
            
            <div class="col-md-12">
            	 
              <div class="form-group m-t-20">
                <label>CP:</label>
                <input name="v_fis_cp" id="v_fis_cp" title="CP" type="text" class="form-control" placeholder="CP" onkeyup="Buscarcodigo()" required value="<?php echo $v_fis_cp; ?>">
                <label id="lblcp" style="color: red;"></label>

              </div>
            </div>
            

            <div class="col-md-12">

                <div class="form-group m-t-20">
                <label>PAIS:</label>
               
                <select name="v_fis_pais" id="v_fis_pais" class="form-control" onchange="ObtenerEstadosCatalogo2(0,$(this).val(),'v_fis_estado');">
                  <option value="0">SELECCIONAR PAIS</option>

                    <?php

                  do { ?>

                    <option  value="<?php echo $rows_pais2['idpais'] ?>" <?php if($rows_pais2['idpais']==$idpais) echo "selected"; ?>><?php echo mb_strtoupper($f->imprimir_cadena_utf8($rows_pais2['pais']));?></option>

                  <?php } while($rows_pais2=$db->fetch_assoc($obtenerpais2));

                  ?>
                

                </select>

               <label id="lblpais" style="color: red;"></label>

              </div>

               


          
              
            </div>

            <div class="col-md-12">
              
             

                  <div class="form-group m-t-20">
                <label>ESTADO:</label>
               
                <select name="v_fis_estado" id="v_fis_estado" class="form-control" onchange="ObtenerMunicipiosCatalogo(0,$(this).val(),'v_fis_municipio')">
                  <option value="0">SELECCIONAR ESTADO</option>
                </select>
                <label id="lblestado" style="color: red;"></label>

              </div>   
              
            </div>  
            
            <div class="col-md-12">
           

                <div class="form-group m-t-20">
                <label>MUNICIPIO:</label>
                <select name="v_fis_municipio" id="v_fis_municipio" class="form-control" onchange="  ObtenerMuColonias();">
                  <option value="0">SELECCIONAR MUNICIPIO</option>
                </select>

               <label id="lblmunicipio" style="color: red;"></label>

              </div> 
              
            </div>  
  
              <div class="col-md-12">

              <div class="form-group m-t-20">
                <label>COLONIA:</label>
            


                <select name="v_fis_colonia" id="v_fis_colonia" class="form-control" onchange="">
                  <option value="0">SELECCIONAR COLONIA</option>
                </select>

                <label id="lbllocalidad" style="color: red;"></label>


              </div>
            </div>
          
            
            <div class="col-md-12">
             

              
            </div>  
          </div>

            <div class="row">
            

             <div class="col-md-12">

            <div class="form-group">
              <label>CALLE/AV/BLVD:</label>
              <textarea name="v_fis_direccion" required id="v_fis_direccion" class="form-control" placeholder="DIRECCION" title="DIRECCIÓN"><?php echo $v_fis_direccion; ?></textarea>

              <label id="lblcalle" style="color: red;"></label>

            </div>
          </div>

            <div class="col-md-12">
              <div class="form-group m-t-20">
                <label>NO. INT:</label>
                <input name="v_fis_no_int" id="v_fis_no_int" title="NO.INT" type="text" class="form-control" placeholder="NO.INT"  required value="<?php echo $v_fis_no_int; ?>">

                        <label id="lblnoint" style="color: red;"></label>

              </div>  
            </div>

            <div class="col-md-12">
              <div class="form-group m-t-20">
                <label>NO. EXT:</label>
                <input name="v_fis_no_ext" id="v_fis_no_ext" title="NO.EXT" type="text" class="form-control" placeholder="NO.EXT"  required value="<?php echo $v_fis_no_ext; ?>" >
                <label id="lblnoext" style="color: red;"></label>

              </div>
            </div>

          <!--   <div class="col-md-12">
              <div class="form-group m-t-20">
                <label>COLONIA:</label>
                <input name="v_fis_col" id="v_fis_col" title="COLONIA" type="text" class="form-control" placeholder="COLONIA"  required value="<?php echo $v_fis_col; ?>" >
              <label id="lblcolonia" style="color: red;"></label>


              </div>  
            </div> -->

          

                  
          <div class="col-md-12">
            <div class="form-group m-t-20">
              
              <label for="">USO CFDI:</label>

              <select name="usocfdi" id="usocfdi" class="form-control">
                
                <option value="0">SELECCIONAR USO DEL CFDI</option>
             
              </select>
              <label id="lbluso" style="color: red;"></label>

            </div>
          </div>


          <div class="col-md-12">
            <div class="form-group m-t-20">
              
              <label for="">MÉTODO DE PAGO:</label>

              <select name="metodopago" id="metodopago" class="form-control">
                
                <option value="0" >SELECCIONAR MÉTODO DE PAGO</option>
               
              </select>
              <label id="lblmetodo" style="color: red;"></label>

            </div>
          </div>


          <div class="col-md-12">
            <div class="form-group m-t-20">
              
              <label for="">FORMA DE PAGO:</label>

              <select name="formapago" id="formapago" class="form-control">
                
                <option value="0" >SELECCIONAR FORMA DE PAGO</option>
              
              </select>
              <label id="lblforma" style="color: red;"></label>

            </div>
          </div>
            

            
          </div>

			  
			</form>
      		</div>
      	</div>
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary btnguardardatofiscal" >GUARDAR</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">CERRAR</button>
      </div>
    </div>
  </div>
</div>

<div class="modal modalclientes" id="modalclientes" tabindex="-1" role="dialog">
	 <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body">
      	<div class="row">
      		<div class="col-md-12">

      			  <div class="form-group m-t-20">	 
							<input type="text" class="form-control" name="buscadoralumnos_1" id="buscadoralumnos_" placeholder="Buscar" onkeyup="BuscarEnLista('#buscadoralumnos_','.alumnos_')">
					    </div>

      			  <div class="clientes"  style="overflow:scroll;height:100px;overflow-x: hidden" >
      			<div class="" id="divusuarios"></div>
      		</div>
      		</div>
      	</div>
      </div>

       <div class="modal-footer">
        <button type="button" class="btn btn-success btnseleccionarcliente" onclick="">SELECCIONAR</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">CERRAR</button>
      </div>


     </div>
    </div>


	
</div>


<div class="modal" id="modalimagencomprobante1" tabindex="-1" role="dialog">
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
								        <div id="d_foto" class="d_foto" style="text-align:center; ">
											<img src="images/sinfoto.png" class="card-img-top" alt="" style="border: 1px #777 solid"> 
										</div>
								        <div class="card-body">
								            <h5 class="card-title"></h5>
								           
								            <div class="form-group">
								               
								                <input type="file" class="form-control-file" name="image2" id="image2" onchange="SubirImagenComprobante()">
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
        <h5 class="modal-title" style="text-align: center;">
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      	<div class="row">
      		<div class="col-md-12">
      			<h5 style="text-align: center;    font-size: 20px!important;">Monedero disponible</h5>
      				<h4  style="text-align: center;    font-size: 20px!important;color: #4fab2a;">$<span id="monederodispo"></span></h4>

      		</div>
      	</div>
      	<div class="row">
      		<div class="col-md-12">
      			<form>
			  <div class="form-group">
			  <!-- 	<label for="">MONEDERO DISPONIBLE</label>
			  	<span id="monederodisponible"></span> -->

			  	<label for="">MONEDERO A USAR</label>
			  	<input type="number" id="monederoausar" placeholder="$0.00" class="form-control" style="display: none;">


			  	<table id="" class="table">

			  		<thead>
			  			<tr>
			  				<th>CONCEPTO</th>
			  				<th>COSTO UNITARIO</th>
			  				<th>COSTO TOTAL</th>
			  				<th>MONTO A USAR</th>

			  			</tr>
			  		</thead>
			  		<tbody id="tbllistarseleccionado"></tbody>
			  		
			  	</table>
			  </div>
			</form>
      		</div>
      		<div class="col-md-12">
      			<p id="mensajerespuesta" style="color: red;text-align: right;"></p>
      		</div>
      	</div>
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success btnguardarmonedero" onclick="GuardarMonedero()">GUARDAR</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">CERRAR</button>
      </div>
    </div>
  </div>
</div>



<!-- <div class="modal" id="modalmonedero" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<div class="row">
      		<div class="col-md-12">
      			<form>
							  <div class="form-group">

							  	<label for="">MONEDERO A USAR</label>
							  	<input type="number" id="monederoausar" placeholder="$0.00" class="form-control">
							  </div>
								</form>
      		</div>
      		<div class="col-md-6"></div>
      	</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" onclick=""></button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal"></button>
      </div>
    </div>
  </div>
</div> -->

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



<div class="modal" id="modalcomentario" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">  </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<div class="row">
      		<div class="col-md-12">
      			<form>
			  <div class="form-group">
			 
			  	<label for="">COMENTARIO</label>
			  	<textarea id="comentariocomprobante" class="form-control"></textarea> 
			  </div>
			</form>
      		</div>
      		<div class="col-md-6"></div>
      	</div>
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success btncomentario" onclick="GuardarComentario()">GUARDAR</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">CERRAR</button>
      </div>
    </div>
  </div>
</div>



<div class="modal" id="modalcierrecaja" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">CERRAR CAJA</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<div class="row">
      		<div class="col-md-12">
      			<form>
							  <div class="form-group">
							 
							  	<!-- <label for="">Saldo final</label>
							  	 <input type="number" class="form-control" id="saldofinal" name="saldofinal" step="0.01" required> -->
							  	 	<p style="text-align: center;"><label for="">¿ESTÁ SEGURO DE CERRAR LA CAJA?</label></p>
							  	 	<div class="" style="display: flex;justify-content: center;">
							  	 		 <button type="button" class="btn btn-success " style="margin-right: 1em;" onclick="CerrarCaja()">SI</button>
       					 <button type="button" class="btn btn-secondary" data-dismiss="modal">NO</button>
							  	 	</div>
							  	  

							  </div>
							</form>
      		</div>
      		<div class="col-md-6"></div>
      	</div>
       
      </div>
      <div class="modal-footer">
      <!--   <button type="button" class="btn btn-success " onclick="CerrarCaja()">GUARDAR</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">CERRAR</button> -->
      </div>
    </div>
  </div>
</div>


<div class="modal" id="modalreportecaja" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">REPORTE DE CIERRE DE CAJA</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<div id="divreportecaja"></div>
       
      </div>
      <div class="modal-footer">
        <a type="button" class="btn btn-success btnimprimirreporte" >IMPRIMIR</a>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">CERRAR</button>
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

			 <!--  <div class="form-check">
			    <input type="checkbox" id="opcion_1" class="opciones form-check-input " style="top: -0.3em;" onchange="HabilitarOpcion(1)">
			    <label for="" class="form-check-label">SERVICIO</label>

			   </div>

			   <div class="form-check">
			    <input type="checkbox" id="opcion_2" class="opciones form-check-input " style="top: -0.3em;" onchange="HabilitarOpcion(2)">
			    <label for="" class="form-check-label">MEMBRESÍA</label>

			   </div> -->


			    <div class="form-check" style="display: none;">
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


<div class="modal" id="modaldetalleope" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document" style="max-width: 900px;">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" style="text-align: center;">
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      	<div class="row">
      		<div class="col-md-12">
      			<h4 style="text-align: center;">RESUMEN DE COMPRA</h4>
      		</div>
      	</div>
      	<div class="row">
      		<div class="col-md-12">
      			<form>
							  <div class="form-group">
							 

								  	<table id="" class="table table-striped ">
								  		<thead>
								  			<tr>
								  				<th style="text-align: center;">CANTIDAD</th>
								  				<th style="text-align: center;">CONCEPTO</th>
								  				<th style="text-align: center;">COSTO UNI.</th>

								  				<th style="text-align: center;">SUBTOTAL</th>
								  				<th style="text-align: center;">MONEDERO </th>
								  				
								  				<th style="text-align: center;">DESCUENTO</th>
								  				<th style="text-align: center;">DESCUENTO MEMB.</th>
								  				<th style="text-align: center;">TOTAL</th>
								  			</tr>
								  		</thead>
								  		<tbody id="tbllistardetalle"></tbody>
								  	</table>
							  </div>
								</form>
      		</div>
      		
      	</div>
      	<div class="row">
      		  <div class="col-md-5" id="" >
															</div>
      		<div class="col-md-7" id="" >
      			<div id="totales" class="row">
      				
      					

      			</div>
      		</div>
      	</div>
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success btnbotonpago" onclick="Pagar()">PAGAR</button>
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

<style>

.material-switch > input[type="checkbox"] {
    display: none;
}

.material-switch > label {
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    width: 40px;
}

.material-switch > label::before {
    background: rgb(0, 0, 0);
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    content: '';
    height: 16px;
    margin-top: -8px;
    position: absolute;
    opacity: 0.3;
    transition: all 0.4s ease-in-out;
    width: 40px;
}

.material-switch > label::after {
    background: rgb(255, 255, 255);
    border-radius: 16px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    content: '';
    height: 24px;
    left: -4px;
    margin-top: -8px;
    position: absolute;
    top: -4px;
    transition: all 0.3s ease-in-out;
    width: 24px;
}

.material-switch > input[type="checkbox"]:checked + label::before {
    background: inherit;
    opacity: 0.5;
}

.material-switch > input[type="checkbox"]:checked + label::after {
    background: #4caf50; /* Cambio de color cuando está marcado */
    left: 16px; /* Cambio de posición del círculo */
}


</style>

<script type="text/javascript">
	var clienteid=0;
var arraypaquetes=[];
var carrito=[];
var arraycarrito=[];
var NtabName=""
var elementoscarrito=[];
var elementospagos=[];
var arraypagoscheck=[];
var arraypagos=[];
var cargadoscarrito=[];
	//openTab('punto-venta');
var monederousuario=0;
VerificarCajaAbierta();
ObtenerTipodepagos();
		/* ObtenerTipodepagos();
	  ObtenerMonedero();

  	descuentosaplicados=[];
	 	descuentosmembresia=[];
	 	
  	ObtenerPaquetesCarrito();

   	$("#tblpaquetesventa").html('');
  	//arraycarrito=[];
  	pagosarealizar=[];
  	descuentosaplicados=[];
	 	descuentosmembresia=[];
	 	//	ObtenerMonedero();
  	ObtenerClientePagos(clienteid);
  	$(".todosdescuentos").html("");

  	CalcularTotales();*/




	function openTab(tabName) {
  // Ocultar todos los contenidos de las pestañas
  NtabName=tabName;
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
$("#btnpagarresumen").attr('onclick','AbrirModalDetalleOperacion()');

  

}

var searchInput = document.getElementById('searchInput');
var searchResults = document.getElementById('searchResults');

/*searchInput.addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const results = filterResults(searchTerm);

  
});*/

function handleKeyPress(event) {
	var searchInput = document.getElementById('searchInput');
	 const searchTerm = searchInput.value.toLowerCase();
 /* const results = filterResults(searchTerm);*/
        if (event.keyCode === 13) { // 13 es el código de tecla para "Enter"
            // Llamar a tu función aquí
            filterResults(searchTerm); // Cambia "realizarBusqueda" al nombre de tu función
        }
    }

function filterResults(searchTerm) {
  // Implementa aquí la lógica para filtrar los resultados según el término de búsqueda
  	  var valor=searchTerm;
  	  var datos="valor="+valor;
  	  filtrar=false;
  	   $(".tablapaquetediv").css('display','none');
				  $("#btnAgregar").css('display','none');
  	  $("#tblpaquetes").html(" ");
  	  if (valor!='') {
  	  	filtrar=true;
  	  }
  	  if (filtrar==true) {
      $.ajax({
      type: 'POST',
      data:datos,
      dataType:'json',
	  url:'catalogos/pagos/ObtenerPaquetes.php',
      async:false,
      success: function(msj){
      	console.log(msj.respuesta);
      		  const data = msj.respuesta;
						 arraypaquetes=data;
		//	displayResults(data);
						$("#btnAgregar").attr('onclick','AgregarCarrito()');
				  $(".tablapaquetediv").css('display','block');
				  $("#btnAgregar").css('display','block');
	    	PintarBusquedaResultado(data);

      },error: function(XMLHttpRequest, textStatus, errorThrown){ 
        var error;
          if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
          if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server 
           console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
            }
      });

  }




}

function AgregarCarrito() {
	var paquetescarrito=[];
	$(".paquetecan").each(function( index ) {
			if ($(this).val()>0) {
								var cantidad=$(this).val();
					  	var elemento=$(this).attr('id');
					  	var id=elemento.split('_')[1];

					  	var objeto={
					  		idpaquete:id,
					  		cantidad:cantidad
					  	};
					  	paquetescarrito.push(objeto);
			}

	});
		var datos="paquetes="+JSON.stringify(paquetescarrito);
	 var pagina="Obtenerdatospaquetes.php";
	 $.ajax({
    type: 'POST',
    dataType: 'json',
    url: urlphp+pagina,
				data: datos, 
    success: function(datos){

    	var carrito=datos.carrito;
    	arraycarrito=carrito;
    	elementoscarrito=arraycarrito;
    	$("#tablaventa").css('display','block');
    	if (carrito.length>0) {
    		
    		PintarElementos(carrito);
    		$("#searchInput").val('');

    	}
   $("#metodopagodiv").css('display','block');

   $(".requierefacturadiv").css('display','block');
   
    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
                //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
                console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
          }
    });




}
function PintarBusquedaResultado(arraypaquetes) {
	var html="";
		if (arraypaquetes.length>0) {
		 for (var i = 0; i <arraypaquetes.length; i++) {
		 	html+=`
		 			<tr>
     
      <td style="width: 20%;">`+arraypaquetes[i].nombrepaquete+`</td>

       <td style="width: 5%;">
      	 <div class="container" style="    width: 150px;">
				    <div class="row">
				      <div class="col">
				        <div class="input-group">
				          <div class="input-group-prepend">
				            <button class="btn btn-primary" onclick="decrement(`+arraypaquetes[i].idpaquete+`)">-</button>
				          </div>
				          <input type="text" id="quantity_`+arraypaquetes[i].idpaquete+`" class="form-control paquetecan" style="border: none;width:40px;text-align:center;" value="`+arraypaquetes[i].cantidad+`">
				          <div class="input-group-append">
				            <button class="btn btn-primary" onclick="increment(`+arraypaquetes[i].idpaquete+`)">+</button>
				          </div>
				        </div>
				      </div>
				    </div>
				  </div>

      </td>
      <td style="width: 20%;">$`+arraypaquetes[i].precioventa+`</td>`;
      var total=arraypaquetes[i].precioventa*arraypaquetes[i].cantidad;
      arraypaquetes[i].importe=total;
      html+=`<td style="width: 20%;">$`+total+`</td>
      <td style="width: 20%;">

   

      </td>	
    </tr>

		 	`;
			 }


	}

	$("#tblpaquetes").html(html);
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


function PintarElementos(arraycarrito) {
	var html="";
	if (arraycarrito.length>0) {
		 for (var i = 0; i <arraycarrito.length; i++) {
		 	html+=`
		 			<tr>
     
      <td style="width: 20%;">`+arraycarrito[i].nombrepaquete+`</td>
        <td style="width: 5%;">
      	 <div class="container" style="    width: 150px;">
				    <div class="row">
				      <div class="col">
				        <div class="input-group">
				          <div class="input-group-prepend">
				            <button class="btn btn-primary" style=" " onclick="decrementpaquete(`+arraycarrito[i].idcarrito+`)">-</button>
				          </div>
				          <input type="text" id="quantity" class="form-control" style="border: none;width:40px;text-align:center;background: none;" value="`+arraycarrito[i].cantidad+`" readonly/>
				          <div class="input-group-append">
				            <button class="btn btn-primary" style=""onclick="incrementpaquete(`+arraycarrito[i].idcarrito+`)">+</button>
				          </div>
				        </div>
				      </div>
				    </div>
				  </div>

      </td>
      <td style="width: 20%;">$`+arraycarrito[i].costounitario+`</td>`;
      var total=arraycarrito[i].costototal;
      html+=`<td style="width: 20%;">$`+total+`</td>
      <td style="width: 20%;">

      <button type="button" onclick="BorrarPaqueteArray(`+arraycarrito[i].idcarrito+`)" class="btn btn_rojo" style="" title="BORRAR">
								<i class="mdi mdi-delete-empty"></i>
						</button>

      </td>	
    </tr>

		 	`;
			 }


	}

	$("#tblpaquetesventa").html(html);

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
	 				var total=parseFloat(cantidad)-1;

	 				if (total>=0) {
	 						arraypaquetes[posicion].cantidad=total;

	 				}

	 }

	  PintarBusquedaResultado(arraypaquetes);
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
	 				var total=parseFloat(cantidad)+1;

	 				if (total>=1) {
	 						arraypaquetes[posicion].cantidad=total;

	 				}

	 }


	 PintarBusquedaResultado(arraypaquetes);
}


function BorrarPaqueteArray(idcarrito) {

		var datos="idcarrito="+idcarrito;
		var respuesta = confirm("¿Estás seguro de eliminar este elemento?");

if (respuesta) {
  // El usuario ha
	 $.ajax({
					url:'catalogos/pagos/BorrarPaqueteCarrito.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					data: datos, //Le pasamos el objeto que creamos con los archivos
					dataType:'json',
					error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $('#abc').html('<div class="alert_error">'+error+'</div>');	
						  //aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
					  },
					success:function(msj){
							
								ObtenerPaquetesCarrito();

						
								
					  	}
				  });
	}

}

function ObtenerPaquetesCarrito() {
	
	 $.ajax({
					url:'catalogos/pagos/ObtenerPaquetesCarrito.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					dataType:'json',
					error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $('#abc').html('<div class="alert_error">'+error+'</div>');	
						  //aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
					  },
					success:function(msj){
							
							var carrito=msj.carrito;
							arraycarrito=carrito;
						$("#metodopagodiv").css('display','none');
							if (carrito.length>0) {
								$("#tablaventa").css('display','block');
								$("#metodopagodiv").css('display','block');
							}
							PintarElementos(carrito);
							CalcularTotales();
						
								
					  	}
				  });
}



	 function SubirImagenFiscal() {
	 	// body...
	 
        var formData = new FormData();
        var files = $('#image')[0].files[0];
        formData.append('file',files);
        $.ajax({
            url: 'catalogos/pagos/uploadfiscal.php',
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            dataType:'json',
             beforeSend: function() {
					      $("#d_foto").css('display','block');
					      $("#d_foto").html('<div align="center" class="mostrar"><img src="images/loader.gif" alt="" /><br />Cargando...</div>');	

		    },
            success: function(response) {
                if (response != 0) {
                    $(".card-img-top").attr("src", response.respuesta);
                    $("#d_foto").css('display','none');
                } else {
                    alert('Formato de imagen incorrecto.');
                }
            }
        });
        return false;
    }


   function decrementpaquete(idcarrito) {

   	var datos="idcarrito="+idcarrito+"&accion=1";
    	$.ajax({
					url:'catalogos/pagos/actualizarcarrito.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					data: datos, //Le pasamos el objeto que creamos con los archivos
					dataType:'json',
					error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $('#abc').html('<div class="alert_error">'+error+'</div>');	
						  //aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
					  },
					success:function(msj){
							
								ObtenerPaquetesCarrito();

						
								
					  	}
				  });
    
    } 

    function incrementpaquete(idcarrito) {
    		var datos="idcarrito="+idcarrito+"&accion=2";
    	$.ajax({
					url:'catalogos/pagos/actualizarcarrito.php', //Url a donde la enviaremos
					type:'POST', //Metodo que usaremos
					data: datos, //Le pasamos el objeto que creamos con los archivos
					dataType:'json',
					error:function(XMLHttpRequest, textStatus, errorThrown){
						  var error;
						  console.log(XMLHttpRequest);
						  if (XMLHttpRequest.status === 404)  error="Pagina no existe"+XMLHttpRequest.status;// display some page not found error 
						  if (XMLHttpRequest.status === 500) error="Error del Servidor"+XMLHttpRequest.status; // display some server error 
						  $('#abc').html('<div class="alert_error">'+error+'</div>');	
						  //aparecermodulos("catalogos/vi_ligas.php?ac=0&msj=Error. "+error,'main');
					  },
					success:function(msj){
							
								ObtenerPaquetesCarrito();

						
								
					  	}
				  });
   
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
