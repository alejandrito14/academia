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
require_once("../../clases/class.Empresas.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Empresas();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
	$ruta="imagenempresa/".$_SESSION['codservicio'].'/';
	//Recbimos parametros
	$emp->idempresas = trim($_POST['id']);
	$emp->empresas = trim($f->guardar_cadena_utf8($_POST['v_nombre']));
	$emp->descripcion = trim($f->guardar_cadena_utf8($_POST['v_descripcion']));
	$emp->telefono = trim($f->guardar_cadena_utf8($_POST['v_telefono']));
	$emp->email = trim($f->guardar_cadena_utf8($_POST['v_email']));


	
	//Validamos si hacermos un insert o un update
	if($emp->idempresas == 0)
	{
		//guardando
		$emp->guardarEmpresa();
		$md->guardarMovimiento($f->guardar_cadena_utf8('Empresas'),'empresas',$f->guardar_cadena_utf8('Nuevo empresas creado con el ID-'.$emp->idempresas));
		//$emp->guardarEnFoliosEmpresas();
	}else{
		$emp->modificarEmpresa();	
		$md->guardarMovimiento($f->guardar_cadena_utf8('Empresas'),'empresas',$f->guardar_cadena_utf8('Modificación de la empresa -'.$emp->idempresas));
	}



		foreach ($_FILES as $key) 
		{
		if($key['error'] == UPLOAD_ERR_OK ){//Verificamos si se subio correctamente

			$nombre = str_replace(' ','_',date('Y-m-d H:i:s').'-'.$emp->idempresas.".jpg");//Obtenemos el nombre del archivo
			$temporal = $key['tmp_name']; //Obtenemos el nombre del archivo temporal
			$tamano= ($key['size'] / 1000)."Kb"; //Obtenemos el tamaño en KB

			//obtenemos el nombre del archivo anterior para ser eliminado si existe

			$sql = "SELECT imagen FROM empresa WHERE idempresa='".$emp->idempresas."'";
			$result_borrar = $db->consulta($sql);
			$result_borrar_row = $db->fetch_assoc($result_borrar);
			$nombreborrar = $result_borrar_row['imagen'];	
			  

			if($nombreborrar != "")
			{
				unlink($ruta.$nombreborrar); 
			}


			move_uploaded_file($temporal,$ruta.$nombre); //Movemos el archivo temporal a la ruta especificada

			$sql = "UPDATE empresa SET imagen = '$nombre' WHERE idempresa ='".$emp->idempresas."'";   
			$db->consulta($sql);	 
		}
	}
	
				
	$db->commit();
	echo "1|".$emp->idempresas;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>