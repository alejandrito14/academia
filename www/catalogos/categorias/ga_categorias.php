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

/*======================= TERMINA VALIDACIÓN DE SESIÓN =========================*/

//Importamos las clases que vamos a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Categorias.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Categorias();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$emp->idcategoria = trim($_POST['id']);
	$emp->nombre = trim($f->guardar_cadena_utf8($_POST['v_nombre']));
	$emp->depende = trim($f->guardar_cadena_utf8($_POST['v_depende']));
	$emp->empresa = trim($f->guardar_cadena_utf8($_POST['v_empresa']));
	$emp->orden = trim($f->guardar_cadena_utf8($_POST['v_orden']));
	$emp->estatus = trim($f->guardar_cadena_utf8($_POST['v_estatus']));


	$emp->numerodias=$_POST['v_numerodias'];

	if ($emp->numerodias=='') {
		$emp->numerodias=0;
	}

	$emp->habilitaravanzado=$_POST['v_activaravanzado'];

	if ($emp->habilitaravanzado==1) {
		$emp->habilitarcostos=1;
		$emp->habilitarmodalidad=1;
		$emp->habilitarcampopreciounitario=1;
		$emp->habilitarmodalidadpago=1;
		$emp->activarcategoria=1;
		$emp->activardias=1;
		$emp->coachs=1;
		$emp->horarios=1;
		$emp->zonas=1;
	}
	
	$emp->habilitarcampototalclases=0;
	$emp->habilitarcampomontoparticipante=0;
	$emp->habilitarcampomontogrupo=0;
	$emp->participantes=0;
	


	$ruta="imagenes/".$_SESSION['codservicio'].'/';

	/*$horarios=$_POST['v_activarhorarios'];
	$zonas=$_POST['v_zonas'];
	$participantes=$_POST['v_participantes'];
	$cantidadparticipantes=$_POST['v_cantidadparticipantes'];
	$coachs=$_POST['v_coachs'];*/
	
	if ($cantidadparticipantes>0) {
		$emp->participantes=1;
	}


	$diasemanas=explode(',', $_POST['diasemana']);
	$horainiciosemana=explode(',', $_POST['horainiciodia']);
	$horafinsemana=explode(',', $_POST['horafindia']);


	//$emp->participantes=$participantes;
	$emp->cantidadparticipantes=$cantidadparticipantes;
	
	//Validamos si hacermos un insert o un update
	if($emp->idcategoria == 0)
	{
		//guardando
		$emp->guardarCategoria();


		if (count($diasemanas)>0 && $diasemanas[0]!='') {		
		for ($i=0; $i < count($diasemanas); $i++) { 
				$emp->dia=$diasemanas[$i];
				$emp->horainiciosemana=$horainiciosemana[$i];
				$emp->horafinsemana=$horafinsemana[$i];
				$emp->GuardarHorarioSemana();
			}
		}


		$md->guardarMovimiento($f->guardar_cadena_utf8('Categoria'),'categorias',$f->guardar_cadena_utf8('Nueva categoria creado con el ID-'.$emp->idcategoria));
	}else{
		$emp->modificarCategoria();	

		$emp->EliminarHorarioSemana();
		if (count($diasemanas)>0 && $diasemanas[0]!='') {
			
		
		for ($i=0; $i < count($diasemanas); $i++) { 
				$emp->dia=$diasemanas[$i];
				$emp->horainiciosemana=$horainiciosemana[$i];
				$emp->horafinsemana=$horafinsemana[$i];
				$emp->GuardarHorarioSemana();
			}
		}

		$md->guardarMovimiento($f->guardar_cadena_utf8('Categoria'),'categorias',$f->guardar_cadena_utf8('Modificación de la categoria -'.$emp->idcategoria));
	}




		foreach ($_FILES as $key) 
		{
		if($key['error'] == UPLOAD_ERR_OK ){//Verificamos si se subio correctamente


			$nombre = str_replace(' ','_',date('Y-m-d H:i:s').'-'.$emp->idcategoria.".jpg");//Obtenemos el nombre del archivo
			
			$temporal = $key['tmp_name']; //Obtenemos el nombre del archivo temporal
			$tamano= ($key['size'] / 1000)."Kb"; //Obtenemos el tamaño en KB

			//obtenemos el nombre del archivo anterior para ser eliminado si existe

			$sql = "SELECT foto FROM categorias WHERE idcategorias='".$emp->idcategoria."'";

			$result_borrar = $db->consulta($sql);
			$result_borrar_row = $db->fetch_assoc($result_borrar);
			$nombreborrar = $result_borrar_row['foto'];		  
			if($nombreborrar != "")
			{
				unlink($ruta.$nombreborrar); 
			}


			move_uploaded_file($temporal, $ruta.$nombre); //Movemos el archivo temporal a la ruta especificada

			$sql = "UPDATE categorias SET foto = '$nombre' WHERE idcategorias='".$emp->idcategoria."'";   
			$db->consulta($sql);	 
		}
	}
				
	$db->commit();
	echo "1|".$emp->idcategoria;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>