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
require_once("../../clases/class.Descuentos.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Botones.php");
require_once("../../clases/class.Categorias.php");
require_once("../../clases/class.Servicios.php");
require_once("../../clases/class.Usuarios.php");


$idmenumodulo = $_GET['idmenumodulo'];

//Se crean los objetos de clase
$db = new MySQL();
$emp = new Descuentos();
$f = new Funciones();
$bt = new Botones_permisos();
$cate=new Categorias();
$cate->db=$db;
$obtenercat=$cate->ObtenerCategoriasEstatus(1);

$servicios=new Servicios();
$servicios->db=$db;
$obtenerserv=$servicios->ObtenerServicioActivos();

$emp->db = $db;

$emp->tipo_usuario = $tipousaurio;
$emp->lista_empresas = $lista_empresas;

$cli = new Usuarios();
$cli->db = $db;
$r_clientes = $cli->lista_Usuarios(3);
$a_cliente = $db->fetch_assoc($r_clientes);
$r_clientes_num = $db->num_rows($r_clientes);


//Validamos si cargar el formulario para nuevo registro o para modificacion
if(!isset($_GET['iddescuento'])){
 //El formulario es de nuevo registro
 $iddescuento = 0;

 //Se declaran todas las variables vacias
  $dia='';
  $mes='';
  $anio='';
  $hora='';
  $estatus=1;
 
 $col = "col-md-12";
 $ver = "display:none;";
 $titulo='NUEVO DESCUENTO';

}else{
 //El formulario funcionara para modificacion de un registro

 //Enviamos el id del pagos a modificar a nuestra clase Pagos
 $iddescuento = $_GET['iddescuento'];
 $emp->iddescuento = $iddescuento;

 //Realizamos la consulta en tabla Pagos
 $result_descuento = $emp->buscardescuento();
 $result_descuento_row = $db->fetch_assoc($result_descuento);

 //Cargamos en las variables los datos 

 //DATOS GENERALES
 $titulodes=$f->imprimir_cadena_utf8($result_descuento_row['titulo']);
 $tipo=$f->imprimir_cadena_utf8($result_descuento_row['tipo']);
 $descuento=$f->imprimir_cadena_utf8($result_descuento_row['monto']);
 $convigencia=$f->imprimir_cadena_utf8($result_descuento_row['convigencia']);

 $estatus = $f->imprimir_cadena_utf8($result_descuento_row['estatus']);


 $modalidaddescuento=$result_descuento_row['modalidaddescuento'];
 $acumulardescuento=$result_descuento_row['acumuladescuento'];
 $inpadre=$result_descuento_row['inppadre'];
 $inphijo=$result_descuento_row['inphijo'];
 $inpnieto=$result_descuento_row['inpnieto'];
 $txtdiascaducidad=$result_descuento_row['txtdiascaducidad'];
 $porhorarioservicio=$result_descuento_row['porhorarioservicio'];
 $cantidadhorariosservicios=$result_descuento_row['cantidadhorariosservicios'];
 $cantidaddias=$result_descuento_row['cantidaddias'];
 $v_convigencia=$result_descuento_row['convigencia'];
 $vigencia=$result_descuento_row['vigencia'];
 $txtdiascaducidad=$result_descuento_row['txtdiascaducidad'];
 $porcantidadservicio=$result_descuento_row['porcantidadservicio'];


 $txtnumeroservicio=$result_descuento_row['txtnumeroservicio'];
 $chekhorarioservicios=$result_descuento_row['porhorarioservicio'];
 $cantidadhorariosservicios=$result_descuento_row['cantidadhorariosservicios'];
 $cantidaddias=$result_descuento_row['cantidaddias'];


 $portiposervicio=$result_descuento_row['portiposervicio'];
$porservicio=$result_descuento_row['porservicio'];
$porparentesco=$result_descuento_row['porparentesco'];
$porniveljerarquico=$result_descuento_row['porniveljerarquico'];
$porclientenoasociado=$result_descuento_row['porclientenoasociado'];
$porclientedirecto=$result_descuento_row['porclientedirecto'];
$todoclientes=$result_descuento_row['todosclientes'];

$innpadre=$result_descuento_row['innpadre'];
$inphijo=$result_descuento_row['inphijo'];
$inpnieto=$result_descuento_row['inpnieto'];

$caracteristicasdelasociador=$result_descuento_row['caracteristicaasociador'];
$caracteristicasporservicio=$result_descuento_row['caracteristicasporservicio'];
$caracteristicaportiposervicio=$result_descuento_row['caracteristicaportiposervicio'];

 $col = "col-md-12";
 $ver = "";
  $titulo='EDITAR DESCUENTO';

}

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

<form id="f_descuento" name="f_descuento" method="post" action="">
 <div class="card">
  <div class="card-body">
   <h4 class="card-title m-b-0" style="float: left;"><?php echo $titulo; ?></h4>

   <div style="float: right;position:fixed!important;z-index:10;right:0;margin-right:2em;width: 20%;">
    
    <?php
   
     //SCRIPT PARA CONSTRUIR UN BOTON
     $bt->titulo = "GUARDAR";
     $bt->icon = "mdi mdi-content-save";
     $bt->funcion = "var bandera=1;

     var v_titulo=$('#v_titulo').val();
     var v_descuento=$('#v_descuento').val();

      if(v_titulo==''){
        bandera=0;
      }

   


       if(bandera==1){ Guardardescuento('f_descuento','catalogos/descuentos/vi_descuento.php','main','$idmenumodulo');}
       else{
        var mensaje='';
         if(v_titulo==''){
           mensaje+='TITULO es requerido<br>';
          }

       

          AbrirNotificacion(mensaje,'mdi-close-circle');
       }";
     $bt->estilos = "float: right;";
     $bt->permiso = $permisos;
     $bt->class='btn btn-success';
    
     //validamos que permiso aplicar si el de alta o el de modificacion
    if($iddescuento == 0)
     {
      $bt->tipo = 1;
     }else{
      $bt->tipo = 2;
     }
   
     $bt->armar_boton();
    ?>
    
    <!--<button type="button" onClick="var resp=MM_validateForm('v_empresa','','R','v_direccion','','R','v_tel','','R','v_email','',' isEmail R'); if(resp==1){ GuardarEmpresa('f_empresa','catalogos/empresas/fa_empresas.php','main');}" class="btn btn-success" style="float: right;"><i class="mdi mdi-content-save"></i>  GUARDAR</button>-->
    
    <button type="button" onClick="aparecermodulos('catalogos/descuentos/vi_descuento.php?idmenumodulo=<?php echo $idmenumodulo;?>','main');" class="btn btn-primary" style="float: right; margin-right: 10px;"><i class="mdi mdi-arrow-left-box"></i>VER LISTADO</button>
    <div style="clear: both;"></div>
    
    <input type="hidden" id="id" name="id" value="<?php echo $iddescuento; ?>" />
   </div>
   <div style="clear: both;"></div>
  </div>
 </div>
 
 
 <div class="row">
  <div class="<?php echo $col; ?>">
   <div class="card">
    <div class="card-header" style="padding-bottom: 0; padding-right: 0; padding-left: 0; padding-top: 0;">
     <!--<h5>DATOS</h5>-->

    </div>

    <div class="card-body">
     
    <div class="col-md-6">

     <div class="tab-content tabcontent-border">
      <div class="tab-pane active show" id="generales" role="tabpanel">

     
       
       <div class="form-group m-t-20">
        <label>*TITULO:</label>
        <input type="text" class="form-control" id="v_titulo" name="v_titulo" value="<?php echo $titulodes; ?>" title="TITULO" placeholder='TITULO'>
       </div>
     </div>
   </div>
 </div>


<div class="card">
<div class="card-header" style="margin-top: 1em;">
      
        </div>
      


<div class="col-md-12">

      </div>
  <div class="">

    <div class="col-md-12" style="">


   <div class="form-check">
    <input type="checkbox" id="porparentesco" class="form-check-input " style="top: -0.3em;" onchange="HabilitarParentescos()">
    <label for="" class="form-check-label">POR PARENTESCO</label>

   </div>

   <div class="form-group divparentescos" style="display: none;">

    <button type="button" class="btn btn-primary" onclick="AgregarMultiplesParentesco()" style="margin-bottom: 1em;margin-top:1em;">AGREGAR OPCIONES</button>
    <div id="multipleparentesco"></div>

   </div>
  </div>

  <div class="col-md-6" style="">

   <div class="form-check">
    
    <input type="checkbox" id="porniveljerarquico" class="form-check-input" style="top: -0.3em;" onchange="Habilitarniveljerarquico()" >
    <label for="" class="form-check-label">POR NIVEL JERÁRQUICO</label>
   </div>

    <div class="form-group divniveljerarquico" style="display: none;">
          <label for="">APLICAR A:</label>

     <div class="form-check">
     
     <input type="checkbox" id="inppadre" class="form-check-input" style="top: -0.3em;" >
     <label for="" class="form-check-label">NIVEL 1 (el que asocia)</label>


    </div>

    <div class="form-check">
     
     <input type="checkbox" id="inphijo" class="form-check-input" style="top: -0.3em;" >
     <label for="" class="form-check-label">NIVEL 2 (los asociados)</label>


    </div>

   <div class="form-check">
    
    <input type="checkbox" id="inpnieto" class="form-check-input" style="top: -0.3em;" >
    <label for="" class="form-check-label">NIVEL 3 (los tutorados)</label>


   </div>

</div>
</div>

<div class="col-md-6" style="">

   <div class="form-check">
    

    <input type="checkbox" id="porclientenoasociado" class="form-check-input" style="top: -0.3em;" onchange="HabilitarClientenoasociado()" >
    <label for="" class="form-check-label">POR CLIENTE NO ASOCIADO</label>
   </div>

  </div>
  <div class="col-md-12" style="">

   <div class="form-group divmultiplesdes" style="display: none;">

    <button type="button" class="btn btn-primary" onclick="AgregarMultiplesPrecios()" style="margin-bottom: 1em;    margin-top: 1em;">AGREGAR OPCIONES</button>
    <div id="multipleprecios"></div>

   </div>

  </div>

  <div class="col-md-12">
    <div class="form-check">
    
    <input type="checkbox" id="porclientedirecto" class="form-check-input" style="top: -0.3em;" onchange="Habilitarporclientedirecto()" >
    <label for="" class="form-check-label">POR CLIENTE DIRECTO</label>
   </div>
    
  </div>
  <div class="col-md-12" style="">

     <div class="">
  
    <div class="">
      <div class="" style="">
     

                <div class="card-body" id="lclientesdiv" style="display: none; ">
                <div class="col-md-6" style="padding: 0">
                    <div class="form-group m-t-20">  
            <input type="text" class="form-control" name="buscadorcli_?>" id="buscadorcli_" placeholder="Buscar" onkeyup="BuscarEnLista('#buscadorcli_','.cli_')">
            </div>
          </div>
                   
          <div class="col-md-6">
                      <div class="form-check">
                        <input type="checkbox" id="v_tclientes"  name="v_tclientes" onchange="HabilitarDeshabilitarCheck('#lclientesdiv')" class="form-check-input " title="" placeholder=''  >
                        <label for="">SELECCIONAR TODOS</label>
                      </div>
              <div class="clientes "  style="overflow:scroll;height:100px;overflow-x: hidden" id="clientes_<?php echo $a_cliente['idusuarios'];?>"> 
               <?php      
              if ($r_clientes_num>0) {  
                  do {
            ?>
                  <div class="form-check cli_"  id="cli_<?php echo $a_cliente['idusuarios'];?>_<?php echo $a_cliente['idcliente'];?>">
                      <?php   
                      $valor="";
                     $nombre=mb_strtoupper($f->imprimir_cadena_utf8($a_cliente['nombre']." ".$a_cliente['paterno']." ".$a_cliente['materno']));
                    ?>
                    <input  type="checkbox" onchange="ValidaChecked('<?php echo $a_cliente['idusuarios'];?>')" value="" class="form-check-input chkcliente_<?php echo $idcupon;?>" id="inputcli_<?php echo $a_cliente['idusuarios']?>_<?php echo $idcupon;?>" <?php echo $valor; ?>>
                    <label class="form-check-label" for="flexCheckDefault"><?php echo $nombre; ?></label>
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
    </div><!--card-CLI-->

       
     

      
       
      </div>
      
      
     
     </div>

    </div>

  </div>
</div>

<div class="card">
  <div class="card-body">
    <div class="col-md-12">
  <div class="row">

   <div class="col-md-6" style="">

       <div class="form-group m-t-20" style="display: none;" id="divtipodescuentoglobal">
        <label>*TIPO DE DESCUENTO:</label>
        <select class="form-control" name="v_tipo" id="v_tipo">

        <option value="0" <?php if($tipo == 0) { echo "selected"; } ?> >PORCENTAJE</option>
        <option value="1" <?php if($tipo == 1) { echo "selected"; } ?> >MONTO</option>


         <!-- <option value="0">PORCENTAJE</option>
         <option value="1">MONTO</option> -->
        </select>
       </div>

       <div class="form-group m-t-20" id="divdescuentoglobal" style="display: none;">
        <label>*DESCUENTO:</label>
        <input type="number" class="form-control" id="v_descuento" name="v_descuento" value="<?php echo $descuento; ?>" title="descuento" placeholder='DESCUENTO'>
       </div>


       <div class="form-group" style="display: none;">
        <label for="">DIRIGIDO A</label>
        <select name="txtdirigido" id="txtdirigido" class="form-control">
         <option value="0">SERVICIO</option>
         <option value="1">CLIENTE</option>
        </select>
       </div>

      <div class="form-group">
			    <label for="">MODALIDAD DE DESCUENTO</label>
			    <select name="modalidaddescuento" id="modalidaddescuento" class="form-control">
			       <option value="0" <?php if($modalidaddescuento == 0) { echo "selected"; } ?> >DESCUENTO</option>
         <option value="1" <?php if($tipo == 1) { echo "selected"; } ?> >BONIFICACION</option>
			    </select>
   </div>


         <div class="form-check" style="
    margin-bottom: 1em;">
         		 <input type="checkbox" class="form-check-input " name="v_acumulardescuento"  value="0" id="v_acumulardescuento" onchange="" style="top: -0.3em;">
         <label for="" class="form-check-label">ACUMULA DESCUENTO</label>
       
       </div>


    <div class="form-group m-t-20">
       <label>ESTATUS:</label>
       <select name="v_estatus" id="v_estatus" title="Estatus" class="form-control"  >
        <option value="0" <?php if($estatus == 0) { echo "selected"; } ?> >DESACTIVO</option>
        <option value="1" <?php if($estatus == 1) { echo "selected"; } ?> >ACTIVO</option>
       </select>
      </div>

     </div>
    </div>
   </div>

        <div class="col-md-12">
<div class="card-header" style="margin-top: 1em;">
			
				</div>
			</div>

			<div class="card">

				<div class="card-body">
					<div class="col-md-6">
       <div class="form-check" style="margin-bottom: 1em;">
                    
                       <input type="checkbox" class="form-check-input " name="v_convigencia"  value="1" id="v_convigencia" onclick="DesplegarconVigencia()" style="top: -0.3em;">
                        <label class="form-check-label">
         											  CON VIGENCIA
                     </label>
       </div>

  	<div id="opciones" style="display: none;">
  		  <div class="form-check" style="margin-bottom: 1em;">
                    
                       <input type="radio" class="form-check-input " name="v_vigencia"  value="1" id="v_vigencia" onchange="Activarvigencia()" style="top: -0.3em;">
                        <label class="form-check-label">
         													POR PERIODO
                     </label>
       </div>


   <div class="divvigencia card" style="display: none;width: 120%;">
   <div class="" style="" id="divhorarios">
    <div class="" style="">
     <label> </label>
     <button class="btn btn-primary" type="button" style="  margin-top:1em;" onclick="AgregarPeriodo()">ASIGNAR PERIODOS</button>

    </div>
    <div class="">
      <div style="margin-top: 1em">

       <div class="row">
        <div class="col-md-12">
        
         
        </div>
        <div class="col-md-3">
          
         </div>
       </div>

        
        <div id="periodos"></div>




   
    </div>
   </div>
   </div>
  </div>


   <div class="form-check" style="margin-bottom: 1em;">
                    
                       <input type="radio" class="form-check-input " name="v_vigencia"  value="2" id="v_vigencia2" onchange="Activarvigencia()" style="top: -0.3em;">
                        <label class="form-check-label">
         													POR DÍAS
                     </label>
       </div>


   <div class="form-group divdias" style="display: none;">
    <label for="">DÍAS DE CADUCIDAD</label>
    <input type="number" id="txtdiascaducidad" class="form-control" >
   </div>
</div>

     </div>

</div>
</div>
     <div class="col-md-12">
<div class="card-header" style="margin-top: 1em;">
			
				</div>
			</div>

			<div class="card">

				<div class="card-body">

			<div class="col-md-6">
   <div class="form-check">
      <input type="checkbox" id="porcantidadservicio" class="form-check-input " onchange="HabilitarCantidadServicios()">
    <label class="form-check-label" style="padding-top: 2px;" for="">POR CANTIDAD DE SERVICIOS</label>

   

   </div>

     <div class="form-group divcantidadservicios" style="display: none;">
   	<label for="">CANTIDAD DE SERVICIOS</label>
   	  <input type="number" id="txtnumeroservicio" class="form-control">
   </div>

  </div>

  </div>
  <div class="col-md-12">
<div class="card-header" style="margin-top: 1em;">
			
				</div>
			</div>

			<div class="card">

				<div class="card-body">

			<div class="col-md-6">
 
    <div class="form-check">
    
    
     <input type="checkbox" id="chekhorarioservicios" class="form-check-input " onclick="HabilitarOpcionesHorarios()">
      <label class="form-check-label" for="" style="margin-top: 2px;">POR HORARIOS DE SERVICIOS</label>
   </div>

   <div id="divhorariosservicios" style="display: none;">
	   <div class="form-group" >
	    
	    <label  for="">HORARIOS DE SERVICIOS</label>
	     <input type="text" id="cantidadhorariosservicios" class="form-control">
	   </div>


	   <div class="form-group">
	    
	    <label for="">DÍAS</label>
	     <input type="number" id="cantidaddias" class="form-control">
	   </div>
  </div>


   </div>

  </div>

 </div>
 


<div class="card">
	 <div class="col-md-12">
<div class="card-header" style="margin-top: 1em;">
			
				</div>
			</div>

	<div class="card-body">
   <div class="col-md-6" style="">
    <div class="form-check" >
     <input type="checkbox" id="portiposervicio" class="form-check-input " style="top: -0.3em;" onchange="HabilitarPorTipoServicio()">
    <label class="form-check-label">  POR TIPO DE SERVICIO</label>
    </div>
                <div class="card-body divtiposervicio"  style="display: none;padding-left: 0;">

    <label for="">ELEGIR TIPO DE SERVICIOS</label>
                 <div class="form-group m-t-20">  
                        <input type="text" class="form-control" name="buscadortipo_" id="buscadortipo_" placeholder="Buscar" onkeyup="BuscarEnLista('#buscadortipo_','.pasucat_')">
                    </div>
                    <div class="tiposervicios"  style="overflow:scroll;height:100px;" id="">
                        <?php      
                                
                                if (count($obtenercat)>0) {
                                 for ($i=0; $i <count($obtenercat) ; $i++) {  ?>
                                       
                                        <div class="form-check pasucat_"  id="tiposervicios_<?php echo $obtenercat[$i]->idcategorias;?>">
                                        <?php 
                                     
                                        $valor="";
                                      
                                        ?>
                                        <input  type="checkbox" value="" class="form-check-input chktiposervicio_" id="inputtiposervicio_<?php echo $obtenercat[$i]->idcategorias;?>" >
                                        <label class="form-check-label" for="flexCheckDefault">
                                       <?php echo $obtenercat[$i]->titulo;?>
                                      </label>
                                    </div>                                  
                                <?php
                                    }

                                   }
                                 ?>
                               
                                  
                    </div>
                   
                </div>
                    
              </div> <!--lpaquetesdiv-->
           </div>


<div class="col-md-12">
<div class="card-header" style="margin-top: 1em;">
			
				</div>
			</div>
	<div class="card-body">
  <div class="col-md-6">

 <div class="form-check">
    <input type="checkbox" id="porservicio" class="form-check-input" style="" onchange="HabilitarPorservicio()">    
    <label for="" class="form-check-label" style="    padding-top: 0.3em;">POR SERVICIO</label>


   </div>

   <div class="form-group divservicio" style="display: none;">
    <label for="">ELEGIR SERVICIOS</label>


                <div class="card-body" id="lpaquetesdiv" style="padding-left: 0;">
                    <div class="form-group m-t-20">  
                        <input type="text" class="form-control" name="buscadorpaq_" id="buscadorpaq_" placeholder="Buscar" onkeyup="BuscarEnLista('#buscadorpaq_','.pasuc_')">
                    </div>
                    <div class="paquetessucursales"  style="overflow:scroll;height:100px;" id="">
                        <?php      
                                
                                if (count($obtenerserv)>0) {
                                 for ($i=0; $i <count($obtenerserv) ; $i++) {  ?>
                                       
                                        <div class="form-check pasuc_"  id="pasuc_x_<?php echo $obtenerserv[$i]->idservicio;?>">
                                        <?php 
                                     
                                        $valor="";
                                      
                                        ?>
                                        <input  type="checkbox" value="" class="form-check-input chkservicio_" id="inputserv_<?php echo $obtenerserv[$i]->idservicio?>" >
                                        <label class="form-check-label" for="flexCheckDefault">
                                        <?php echo $obtenerserv[$i]->titulo; 
                                        ?>
                                      </label>
                                    </div>                                  
                                <?php
                                    }

                                   }
                                 ?>
                               
                                  
                    </div>
                    
                </div>
            </div>
        </div>
   </div>


   <div class="col-md-12">
<div class="card-header" style="margin-top: 1em;">
      
        </div>
      </div>
  <div class="card-body">
  <div class="col-md-6">

 <div class="form-check">
    <input type="checkbox" id="caracteristicasdelasociador" class="form-check-input" style="" onchange="HabilitarAsociador()">    
    <label for="" class="form-check-label" style="    padding-top: 0.3em;">CARACTERÍSTICAS DEL ASOCIADOR</label>


   </div>
 </div>

 <div class="card-body caracteristicas" style="display: none;">
   <div class="col-md-6" style="">
    <div class="form-check" >
     <input type="checkbox" id="portiposervicio2" class="form-check-input " style="top: -0.3em;" onchange="HabilitarPorTipoServicio2()">
    <label class="form-check-label">  POR TIPO DE SERVICIO</label>
    </div>
    <div class="divtiposervicio2" style="display: none;">
      <div class="card-body "  style="padding-left: 0;">

    <label for="">ELEGIR TIPO DE SERVICIOS</label>
                 <div class="form-group m-t-20">  
                        <input type="text" class="form-control" name="buscadortipo1_" id="buscadortipo1_" placeholder="Buscar" onkeyup="BuscarEnLista('#buscadortipo1_','.pasucat1_')">
                    </div>
                    <div class="tiposervicios1"  style="overflow:scroll;height:100px;" id="">
                        <?php      
                                
                                if (count($obtenercat)>0) {
                                 for ($i=0; $i <count($obtenercat) ; $i++) {  ?>
                                       
                                 <div class="form-check pasucat1_"  id="tiposervicios1_<?php echo $obtenercat[$i]->idcategorias;?>">
                                        <?php 
                                     
                                        $valor="";
                                      
                                        ?>
                                        <input  type="checkbox" value="" class="form-check-input chktiposervicio2_" id="inputtiposervicio1_<?php echo $obtenercat[$i]->idcategorias;?>" >
                                        <label class="form-check-label" for="flexCheckDefault">
                                       <?php echo $obtenercat[$i]->titulo;?>
                                      </label>
                                    </div>                                  
                                <?php
                                    }

                                   }
                                 ?>
                               
                                  
                    </div>
                   
                </div>
              </div>
                    
              </div> <!--lpaquetesdiv-->
           </div>


   <div class="card-body caracteristicas" style="display: none;">
            <div class="col-md-6">

 <div class="form-check">
    <input type="checkbox" id="porservicio2" class="form-check-input" style="" onchange="HabilitarPorservicio2()">    
    <label for="" class="form-check-label" style="    padding-top: 0.3em;">POR SERVICIO</label>


   </div>

   <div class="card-body divservicio2" style="display: none;padding-left: 0;">
    <label for="">ELEGIR SERVICIOS</label>


                <div class="card-body" id="lpaquetesdiv" style="padding-left: 0;">
                    <div class="form-group m-t-20">  
                        <input type="text" class="form-control" name="buscadorpaq_" id="buscadorpaq_" placeholder="Buscar" onkeyup="BuscarEnLista('#buscadorpaq_','.pasuc2_')">
                    </div>
                    <div class="paquetessucursales"  style="overflow:scroll;height:100px;" id="">
                        <?php      
                                
                                if (count($obtenerserv)>0) {
                                 for ($i=0; $i <count($obtenerserv) ; $i++) {  ?>
                                       
                                        <div class="form-check "  id="pasuc_x_<?php echo $obtenerserv[$i]->idservicio;?>">
                                        <?php 
                                     
                                        $valor="";
                                      
                                        ?>
                                        <input type="checkbox" value="" class="form-check-input chkservicio2_" id="inputserv2_<?php echo $obtenerserv[$i]->idservicio?>" >
                                        <label class="form-check-label" for="flexCheckDefault">
                                        <?php echo $obtenerserv[$i]->titulo; 
                                        ?>
                                      </label>
                                    </div>                                  
                                <?php
                                    }

                                   }
                                 ?>
                               
                                  
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

<script>
 
 
 var iddescuento='<?php echo $iddescuento;  ?>';
 var acumulardescuento='<?php echo $acumulardescuento; ?>';
 var v_convigencia='<?php echo $v_convigencia; ?>';
 var vigencia='<?php echo $vigencia; ?>';
 var txtdiascaducidad='<?php echo $txtdiascaducidad; ?>';
 var porcantidadservicio='<?php echo $porcantidadservicio ?>';

 var cantidadhorariosservicios='<?php echo $cantidadhorariosservicios;  ?>';
  var cantidaddias='<?php echo $cantidaddias ?>';

  var chekhorarioservicios='<?php echo $chekhorarioservicios; ?>';

  var portiposervicio='<?php echo $portiposervicio; ?>';
  var porservicio='<?php echo $porservicio ?>';

  var porparentesco='<?php echo $porparentesco; ?>';
  var porniveljerarquico='<?php echo $porniveljerarquico ?>';
  var porclientenoasociado='<?php echo $porclientenoasociado; ?>';
  var txtdiascaducidad='<?php echo $txtdiascaducidad; ?>';
 var modalidaddescuento='<?php echo $modalidaddescuento; ?>';
 var porclientedirecto='<?php echo $porclientedirecto; ?>';
var todoclientes='<?php echo $todoclientes; ?>';

var caracteristicasdelasociador='<?php echo $caracteristicasdelasociador; ?>';
var caracteristicaportiposervicio='<?php echo $caracteristicaportiposervicio; ?>';
var caracteristicasporservicio='<?php echo $caracteristicasporservicio; ?>';

 if (iddescuento>0) {

  $("#modalidaddescuento").val(modalidaddescuento);

  ObtenerPeriodosDescuento(iddescuento);

  if (acumulardescuento==1) {
  	$("#v_acumulardescuento").prop('checked',true);

  }
  if (v_convigencia==1) {

   	$("#v_convigencia").prop('checked',true);
 			DesplegarconVigencia();
     
 			if (vigencia==1) {

 				$("#v_vigencia").prop('checked',true);

 			}
 			if (vigencia==2) {

 				$("#v_vigencia2").prop('checked',true);
        $("#txtdiascaducidad").val(txtdiascaducidad);

 			}
      Activarvigencia();
  }

  if (porcantidadservicio==1) {
    $("#porcantidadservicio").prop('checked',true);
    HabilitarCantidadServicios();
  }

  if (chekhorarioservicios==1) {
    $("#chekhorarioservicios").prop('checked',true);
    $("#cantidadhorariosservicios").val(cantidadhorariosservicios);
    $("#cantidaddias").val(cantidaddias);

    HabilitarOpcionesHorarios();
  }
  if (portiposervicio==1) {

    $("#portiposervicio").prop('checked',true);
    $(".divtiposervicio").css('display','block');
    ObtenerTipoServicioDescuento(iddescuento);
  }

  if (porservicio==1) {
    $("#porservicio").prop('checked',true);
    $(".divservicio").css('display','block');
    ObtenerServiciosDescuento(iddescuento);
  }

  if(porparentesco==1){
    $("#porparentesco").prop('checked',true);
    HabilitarParentescos();
    ObtenerMultipleParentesco(iddescuento);
  }
  if(porniveljerarquico==1){
    $("#porniveljerarquico").prop('checked',true);
   Habilitarniveljerarquico();

  var inppadre='<?php echo $inpadre; ?>';
  var  inphijo='<?php echo $inphijo; ?>';
  var  inpnieto='<?php echo $inpnieto ?>';

    if (inppadre==1) {
      $("#inppadre").attr('checked',true);
    }
    if (inphijo==1) {
      $("#inphijo").attr('checked',true);

    }
    if (inpnieto==1) {
      $("#inpnieto").attr('checked',true);

    }


  }
  if(porclientenoasociado==1){

    $("#porclientenoasociado").prop('checked',true);

    HabilitarClientenoasociado();
    ObtenerClientesnoasociado(iddescuento);
  }

  if(porclientedirecto==1){

    $("#porclientedirecto").prop('checked',true);
  if (todoclientes==1) {
    $("#v_tclientes").prop('checked',true);

    HabilitarDeshabilitarCheck();
   
  }else{

    ObtenerClientesAsignados(iddescuento);
  }
   Habilitarporclientedirecto();

}



if(caracteristicasdelasociador==1){
  $("#caracteristicasdelasociador").prop('checked',true);
  HabilitarAsociador();


  if (caracteristicaportiposervicio==1) {

    $("#portiposervicio2").prop('checked',true);
    HabilitarPorTipoServicio2();
    ObtenerCaracteriscasTiposervicioAsociador(iddescuento);
  }

  if (caracteristicasporservicio==1) {
     $("#porservicio2").prop('checked',true);
     HabilitarPorservicio2();
     ObtenerCaracteristicasServicioAsociador(iddescuento);
   
  }


}





 }

</script>


<?php

?>