<?php
/*======================= INICIA VALIDACIÓN DE SESIÓN =========================*/

require_once("../../clases/class.Sesion.php");
//creamos nuestra sesion.
$se = new Sesion();

if(!isset($_SESSION['se_SAS']))
{
	/*header("Location: ../../login.php"); */ 
	echo "login";

	exit;
}
//Inlcuimos las clases a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Servicios.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Botones.php");
require_once("../../clases/class.Categorias.php");


$idmenumodulo = $_POST['idmenumodulo'];


if(isset($_SESSION['permisos_acciones_erp'])){
						//Nombre de sesion | pag-idmodulos_menu
	$permisos = $_SESSION['permisos_acciones_erp']['pag-'.$idmenumodulo];	
}else{
	$permisos = '';
}
try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Servicios();
	$f=new Funciones();
	$bt = new Botones_permisos(); 
	$categorias=new Categorias();
	$categorias->db=$db;
	$lo->db=$db;
	$tiposervicio=$_POST['tiposervicio'];
	$coach=$_POST['coach'];
	$mes=$_POST['v_meses'];
	$anio=$_POST['v_anios'];
	$v_buscar=$_POST['v_buscar'];
$categoriasid="";
	if ($tiposervicio!=0) {
		// code...
	
	$obtenercategoriasdepende=$categorias->ObtenerCategoriasGroupEstatusDepende($tiposervicio);


	$categoriasid=$obtenercategoriasdepende[0]->categoriasid;
}



$estatus=array('DESACTIVADO','ACTIVADO');


	$obtener=$lo->ObtenerServiciosFiltrado($categoriasid,$coach,$mes,$anio,$v_buscar);

	if (count($obtener)>0) {
		for ($i=0; $i <count($obtener) ; $i++) { 
			$avanzado=0;
			if ($obtener[$i]->idcategorias!='' && $obtener[$i]->idcategorias!=0) {
				$idcategoria=$obtener[$i]->idcategorias;
				$categorias->idcategoria=$idcategoria;
				$detalle=$categorias->ObtenerCategoria();

			
				$avanzado=$detalle[0]->avanzado;
			}
			
			
		 ?>

				<?php
				$obtener[$i]->periodo="";
				 if ($obtener[$i]->fechamin!='' && $obtener[$i]->fechamin!=null) { 

				 $obtener[$i]->periodo= date('d/m/Y',strtotime($obtener[$i]->fechamin)).'-'.date('d/m/Y',strtotime($obtener[$i]->fechamax)); 
					
	} ?>
				

				<?php 
					$coaches=explode(',',$obtener[$i]->coachesfiltro2);
			
					$obtener[$i]->coachesfiltro3=$coaches;
				
				 ?>	

       <?php 
		                     $img='./catalogos/servicios/imagenes/'.$_SESSION['codservicio'].'/'.$f->imprimir_cadena_utf8($obtener[$i]->imagen);

		                     $obtener[$i]->imagen=$img;

		                   ?>
		        <?php 

				$obtener[$i]->fechacreacion=		date('d-m-Y H:i:s',strtotime($obtener[$i]->fechacreacion));

				?>

					
								<?php 

								$obtener[$i]->estatus= $estatus[$obtener[$i]->estatus];

								$obtener[$i]->permiso = $permisos;
								$obtener[$i]->funcioneditar="GuardarFiltro();aparecermodulos('catalogos/servicios/fa_servicio.php?idmenumodulo=$idmenumodulo&idservicio=".$obtener[$i]->idservicio."','main')";


								$obtener[$i]->funcionborrar="BorrarServicio('".$obtener[$i]->idservicio."','servicios','servicios','n','catalogos/servicios/vi_servicios.php','main','$idmenumodulo')";

								$obtener[$i]->funcionclonar="AbrirModalClonarServicio('".$obtener[$i]->idservicio."','servicios','servicios','n','catalogos/servicios/vi_servicios.php','main','$idmenumodulo','".$obtener[$i]->titulo."')";

								$obtener[$i]->funcioninscritos="AbrirModalUsuarios('".$obtener[$i]->idservicio."','servicios','servicios','n','catalogos/servicios/vi_servicios.php','main','$idmenumodulo','".htmlentities(addslashes($obtener[$i]->titulo))."')";

								$obtener[$i]->funcionmodalasignacion="AbrirModalAsignacion('".$obtener[$i]->idservicio."','servicios','servicios','n','catalogos/servicios/vi_servicios.php','main','$idmenumodulo','".htmlentities(addslashes($obtener[$i]->titulo))."')";


								$obtener[$i]->funcionimagenes="AbrirModalImagenes('".$obtener[$i]->idservicio."','servicios','servicios','n','catalogos/servicios/vi_servicios.php','main','$idmenumodulo','".htmlentities(addslashes($obtener[$i]->titulo))."')";



								?> 
	<?php				
		}
	}


		$respuesta['respuesta']=$obtener;

		echo json_encode($respuesta);


}catch(Exception $e){
	//$db->rollback();
	//echo "Error. ".$e;
	
	$array->resultado = "Error: ".$e;
	$array->msg = "Error al ejecutar el php";
	$array->id = '0';
		//Retornamos en formato JSON 
	$myJSON = json_encode($array);
	echo $myJSON;
}
?>