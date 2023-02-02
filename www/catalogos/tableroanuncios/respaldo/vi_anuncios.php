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
require_once("../../clases/class.TableroAnuncios.php");
require_once("../../clases/class.Botones.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.PagConfig.php");

//Declaración de objeto de clase conexión
$db = new MySQL();
$Anuncios = new TableroAnuncios();
$bt = new Botones_permisos(); 
$f = new Funciones();
$confi=new PagConfig();
$confi->db=$db;
$Anuncios->db = $db;
$configuracion=$confi->ObtenerInformacionConfiguracion();
$valorcheckebox=$configuracion['mostraranuncios'];

$activaromitir=$configuracion['activaromitirfinal'];
//obtenemos todas las empreas que puede visualizar el usuario.

$Anuncios->tipo_usuario = $tipousaurio;
$Anuncios->lista_empresas = $lista_empresas;

$l_Anuncios = $Anuncios->ObtenerTodosAnuncios();
$l_Anuncios_row = $db->fetch_assoc($l_Anuncios);


$l_Anuncios_num = $db->num_rows($l_Anuncios);

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
    <h5 class="card-title" style="float: left;">LISTADO DE TABLERO DE ANUNCIOS</h5>
    
    <div style="float:right;">
      <button type="button" onClick="abrir_filtro('modal-filtros');" class="btn btn-primary" style="float: right;display: none;"><i class="mdi mdi-account-search"></i>  BUSCAR</button>      
      
      <?php
    
        //SCRIPT PARA CONSTRUIR UN BOTON
        $bt->titulo = "NUEVO";
        $bt->icon = "mdi-plus-circle";
        $bt->funcion = "aparecermodulos('catalogos/tableroanuncios/fa_anuncios.php?idmenumodulo=$idmenumodulo','main');";
        $bt->estilos = "float: right; margin-right:10px;";
        $bt->permiso = $permisos;
        $bt->tipo = 5;
        $bt->title="NUEVO";
        

        $bt->armar_boton();
      
      ?>
      
      <div style="clear: both;"></div>
    </div>
    
    <div style="clear: both;"></div>
  </div>
</div>


<div class="card" style="display: none;">
  <div class="card-body">
    <div class="row">
      <div class="col-md-12">
        <!-- 
         <div class="form-group">
                <label>MOSTRAR ANUNCIOS EN LA APLICACIÓN

                  <input type="checkbox" name="v_activaranuncios" onchange="MostrarAnuncios()" value="0" id="v_activaranuncios" style="margin-left: 1em; position: absolute;">
                </label>
              </div> -->
      </div>
            <div class="col-md-12">
               <!-- <div class="form-group">
                <label>OBLIGAR A VISUALIZAR TODO EL ANUNCIO
                  <input type="checkbox" name="v_activaromitirfinal" onchange="MostrarOmitir()" value="0" id="v_activaromitirfinal" style="margin-left: 1em; position: absolute;">
                </label>
              </div> -->
            </div>


            <div class="col-md-12">
              <!--  <div class="form-group">
                <label>ACTIVAR ANUNCIOS PARA TODOS
                  <input type="checkbox" name="v_activaranunciocliente" onchange="Activaranuncios()" value="0" id="v_activaranunciocliente" style="margin-left: 1em; position: absolute;">
                </label>
              </div> -->
            </div>

    </div>
     

              
    </div>
  </div>


<div class="card">
  <div class="card-body">
    <div class="table-responsive" id="contenedor_Anuncios">
      <table id="tbl_Anuncios" cellpadding="0" cellspacing="0" class="table table-striped table-bordered">
        <thead>
          <tr>
             
            <th style="text-align: center;">TÍTULO</th> 
            <th style="text-align: center;">IMÁGEN</th> 

            <th style="text-align: center;">ESTATUS</th>

            <th style="text-align: center;">ACCI&Oacute;N</th>
          </tr>
        </thead>
        <tbody>
          
          <?php
          if($l_Anuncios_num== 0){
            ?>
            <tr> 
              <td colspan="6" style="text-align: center">
                <h5 class="alert_warning">NO EXISTEN REGISTROS EN LA BASE DE DATOS.</h5>
              </td>
            </tr>
            <?php
          }else{
            do
            {
              ?>
              <tr>
              
            
              
              <td style="text-align: center;"><?php echo $f->imprimir_cadena_utf8($l_Anuncios_row['titulo']);?></td>
                  <td style="text-align: center;">
                    <?php 
                     $img='./catalogos/tableroanuncios/imagenes/'.$_SESSION['codservicio'].'/'.$f->imprimir_cadena_utf8($l_Anuncios_row['imagen']);



                     ?>
                     <img src="<?php echo $img; ?>" alt=""style="width: 400px;">
                   </td>

            
              <td style="text-align: center;"><?php echo $estatus[$l_Anuncios_row['estatus']];?></td>

              <td style="text-align: center; font-size: 15px;">

                  <?php
                          //SCRIPT PARA CONSTRUIR UN BOTON
                  $bt->titulo = "";
                  $bt->icon = "mdi-table-edit";
                  $bt->funcion = "aparecermodulos('catalogos/tableroanuncios/fa_anuncios.php?idmenumodulo=$idmenumodulo&idtableroanuncio=".$l_Anuncios_row['idtableroanuncio']."','main')";
                  $bt->estilos = "";
                  $bt->permiso = $permisos;
                  $bt->tipo = 2;
                  $bt->title="EDITAR";
                  $bt->class='btn btn_colorgray';
                  $bt->armar_boton();


                  ?>

                    <?php
            //SCRIPT PARA CONSTRUIR UN BOTON
            $bt->titulo = "";
            $bt->icon = "mdi-delete-empty";
            $bt->funcion = "BorrarDatos('".$l_Anuncios_row['idtableroanuncio']."','idtableroanuncio','tableroanuncios','n','catalogos/tableroanuncios/vi_anuncios.php','main','$idmenumodulo')";
            $bt->estilos = "";
            $bt->permiso = $permisos;
            $bt->tipo = 3;
            $bt->title="BORRAR";

            $bt->armar_boton();
          ?>
          
            <?php
            //SCRIPT PARA CONSTRUIR UN clonar
            $bt->titulo = "";
            $bt->icon = "mdi-cloud-upload";
            $bt->funcion = "AbrirModalAnuncio('".$l_Anuncios_row['idtableroanuncio']."','tableroanuncios','tableroanuncios','n','catalogos/tableroanuncios/vi_anuncios.php','main','$idmenumodulo','".$l_Anuncios_row['titulo']."')";

            /*$bt->permiso = $permisos;*/
            $bt->tipo = 4;
            $bt->title="IMÁGENES EXTRAS";

            $bt->armar_boton();

            ?>

                </td>


              </tr>
              <?php
            }while($l_Anuncios_row = $db->fetch_assoc($l_Anuncios));
          }
          ?>
        </tbody>
      </table>
    </div>
  </div>
</div>



<div class="modal" id="modalimagenanuncio" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Subir imágenes</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

        <div class="row">
          <div class="col-md-6"></div>
          <div class="col-md-6">
            
            <button type="button" id="btnnuevaimagen" onclick="NuevaImagen()" class="btn btn_azul" style="float: right; margin-right:10px;" title="NUEVO">
        <i class="mdi mdi-plus-circle"></i>NUEVO</button>
          </div>

        </div>
       
       <input type="hidden" id="idanuncio" value="">
             <img class="card-img-top" src="">
         <div id="d_foto" style="text-align:center; ">
        <img src="<?php echo $ruta; ?>" class="card-img-top" alt="" style="border: 1px #777 solid"/> 
        </div>

          <div class="formimagen" style="display: none;">
                    <form method="post" action="" enctype="multipart/form-data" id="uploadForm" >
                   
                   
                        <input type="file" class=" inputfile inputfile-1 form-control"   name="file" id="imageninformativa" />


                  <div class="form-group">
                      <label class="form-check-label" for="exampleCheck1">Título</label>
            <input type="text" class="form-control" id="txttituloimagen">
          
          </div>
                     


                    <p></p>

                 <div id="contador"></div>
                    <div id="cargado"></div>
                      <div id='salidaImagen'></div>

                  </form>
</div>


       <div class="vfileNames" id="vfileNames"></div>


       <div class="tbl"></div>
      </div>
      <div class="modal-footer">
          <button type="button" style="display: none;" class="btn btn-success btnguadarimagen">GUARDAR</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">CERRAR</button>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">

  var valor='<?php echo $valorcheckebox ?>';

var activaromitir='<?php echo $activaromitir; ?>';

  ColocarCheckbox(valor);
  ColocarCheckboxOmitirAlfinal(activaromitir);
   $('#tbl_Anuncios').DataTable( {   
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

