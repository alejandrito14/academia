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

//Inlcuimos las clases a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Tipodepagos.php");
require_once("../../clases/class.Funciones.php");


$idnotapago=$_POST['idnotapago'];
$idusuario=$_POST['idusuario'];
$idmenumodulo=$_POST['idmenumodulo'];
    
?>


<div class="card">
    <div class="card-body">
       
        
        <div style="float:right;">
            <button type="button" onClick="abrir_filtro('modal-filtros');" class="btn btn-primary" style="float: right;display: none;"><i class="mdi mdi-account-search"></i>  BUSCAR</button>    

                <button type="button" onClick="aparecermodulos('catalogos/pagos/vi_pagos.php?idmenumodulo=<?php echo $idmenumodulo;?>','main');" class="btn btn-primary" style="float: right; margin-right: 10px;"><i class="mdi mdi-arrow-left-box"></i>VER LISTADO </button>      
            
           
            
            <div style="clear: both;"></div>
        </div>
        
        <div style="clear: both;"></div>
    </div>
</div>


      <div class="modal-body">
        <div class="card" style="">
           
         <div class="card-body">
             <div class="card-title">
                DETALLE DE NOTA DE PAGO
            </div>

            <h5 class="card-title" style="font-weight: bold;">FOLIO </h5>
            <h4 id="folio" style="font-weight: normal;"></h4>

            <div class="row">
                
                <div class="col-md-6">
                    

            <h5 class="card-title" style="font-weight: bold;">TIPO DE PAGO </h5>
            <h4 id="tipopago" style="font-weight: normal;"></h4>
                </div>
                <div class="col-md-6">
                    

            <h5 class="card-title" style="font-weight: bold;">FECHA DE PAGO </h5>
            <h4 id="fechapago" style="font-weight: normal;"></h4>

                </div>

            </div>




            <h5 class="card-title" style="font-weight: bold;">ALUMNO </h5>
            <h4 id="alumno" style="font-weight: normal;"></h4>


            <h5 class="card-title" style="font-weight: bold;">ESTATUS </h5>
             <h4 id="estatus" style="font-weight: normal;"></h4>
            <!-- <label class="switch">
                    <input id="btnState_1" type="checkbox" class="cuswitch success btnState_1" >
                    <span class="slider"></span>
             </label> -->


            
         </div>
        </div>

        <table class="table table-striped table-bordered ">
            <thead>
                <tr >
                    <th style="text-align: center;width: 200px;">CONCEPTO</th>
                    <th style="text-align: center;width: 200px;">MONTO</th>

                </tr>
            </thead>
            <tbody class="listadopagos"></tbody>
        </table>
       
        <table class="table table-striped table-bordered ">
            <tbody class="listadodescuentos"></tbody>
        </table>

            <table class="table table-striped table-bordered ">
            <tbody class="listadodescuentosmembresia"></tbody>
        </table>

                <div class="modaldetalle"></div>

      </div>



      <div class="modal" id="modalconfirmacion" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"></h5>
       
      </div>
      <div class="modal-body" id="divconfirmacion">
      
       
      </div>
      <div class="modal-footer">
           <button type="button" class="btn btn-secondary" id="btncerrar" >CANCELAR</button>

           <button type="button" class="btn btn-success" id="btnaceptar">ACEPTAR</button>

      </div>
    </div>
  </div>
</div>



      <script type="text/javascript">

        var idnotapago='<?php echo $idnotapago; ?>';
        var idusuario='<?php echo $idusuario; ?>';
            ObtenerDetalleNota(idnotapago,idusuario);



      </script>