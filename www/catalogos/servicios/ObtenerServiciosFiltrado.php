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



$estatus=array('DESACTIVADO','ACTIVADO');


	$obtener=$lo->ObtenerServiciosFiltrado($tiposervicio,$coach);

	if (count($obtener)>0) {
		for ($i=0; $i <count($obtener) ; $i++) { 

			$idcategoria=$obtener[$i]->idcategorias;
			$categorias->idcategoria=$idcategoria;
			$detalle=$categorias->ObtenerCategoria();

			print_r($detalle);
			$avanzado=$detalle[0]->avanzado;
			
		 ?>
			<tr>
							
						
							
				<td style="text-align: center;"><?php echo $f->imprimir_cadena_utf8($obtener[$i]->titulo);?></td>

						 <td style="text-align: center;">
		                    <?php 
		                     $img='./catalogos/servicios/imagenes/'.$_SESSION['codservicio'].'/'.$f->imprimir_cadena_utf8($obtener[$i]->imagen);

		                     ?>
		                     <img src="<?php echo $img; ?>" alt=""style="width: 400px;">
		                   </td>

							<td style="text-align: center;"><?php echo $obtener[$i]->nombrecategoria;?></td>
							

							<td style="text-align: center;"><?php echo $obtener[$i]->orden;?></td>
							

							<td style="text-align: center;"><?php echo $estatus[$obtener[$i]->estatus];?></td>

							<td style="text-align: center; font-size: 15px;">

									<?php
								//SCRIPT PARA CONSTRUIR UN BOTON
									$bt->titulo = "";
									$bt->icon = "mdi-table-edit";
									$bt->funcion = "aparecermodulos('catalogos/servicios/fa_servicio.php?idmenumodulo=$idmenumodulo&idservicio=".$obtener[$i]->idservicio."','main')";
									$bt->estilos = "";
									$bt->permiso = $permisos;
									$bt->tipo = 2;
									$bt->title="EDITAR";
									$bt->class='btn btn_colorgray';
									$bt->armar_boton();



									?>

					<?php

					
						# code...
					
						//SCRIPT PARA CONSTRUIR UN BOTON
						$bt->titulo = "";
						$bt->icon = "mdi-delete-empty";
						$bt->funcion = "BorrarServicio('".$obtener[$i]->idservicio."','servicios','servicios','n','catalogos/servicios/vi_servicios.php','main','$idmenumodulo')";

						$bt->estilos = "";
						$bt->permiso = $permisos;
						$bt->tipo = 3;
						$bt->title="BORAR";

						$bt->armar_boton();
					?>

					<?php
					if ($avanzado==1) {
						//SCRIPT PARA CONSTRUIR UN clonar
						$bt->titulo = "";
						$bt->icon = "mdi-book-multiple";
						$bt->funcion = "AbrirModalClonarServicio('".$obtener[$i]->idservicio."','servicios','servicios','n','catalogos/servicios/vi_servicios.php','main','$idmenumodulo','".$l_Servicios_row['titulo']."')";

						/*$bt->permiso = $permisos;*/
						$bt->tipo = 4;
						$bt->title="CLONAR";

						$bt->armar_boton();
					?>

					<?php
						//SCRIPT PARA CONSTRUIR UN clonar
						$bt->titulo = "";
						$bt->icon = "mdi-account-multiple";
						$bt->funcion = "AbrirModalUsuarios('".$obtener[$i]->idservicio."','servicios','servicios','n','catalogos/servicios/vi_servicios.php','main','$idmenumodulo','".$obtener[$i]->titulo."')";

						/*$bt->permiso = $permisos;*/
						$bt->tipo = 4;
						$bt->title="ALUMNOS INSCRITOS";

						$bt->armar_boton();
					?>

					<?php
						//SCRIPT PARA CONSTRUIR UN clonar
						$bt->titulo = "";
						$bt->icon = "mdi-cloud-upload";
						$bt->funcion = "AbrirModalImagenes('".$obtener[$i]->idservicio."','servicios','servicios','n','catalogos/servicios/vi_servicios.php','main','$idmenumodulo','".$obtener[$i]->titulo."')";

						/*$bt->permiso = $permisos;*/
						$bt->tipo = 4;
						$bt->title="IMÁGENES INFORMATIVAS";

						$bt->armar_boton();

					}
					?>


								</td>


							</tr>
	<?php				
		}
	}


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