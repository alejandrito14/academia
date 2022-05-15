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
require_once("../../clases/class.Entradas.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Entradas();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$emp->identrada = trim($_POST['id']);
	$emp->titulo = trim($f->guardar_cadena_utf8($_POST['v_titulo']));
	$emp->descripcion = trim($f->guardar_cadena_utf8($_POST['v_descripcion']));
	$emp->tipo = trim($f->guardar_cadena_utf8($_POST['v_tipo']));

	$emp->orden = trim($f->guardar_cadena_utf8($_POST['v_orden']));
	$emp->estatus = trim($f->guardar_cadena_utf8($_POST['v_estatus']));


	$ruta="imagenes/".$_SESSION['codservicio'].'/';

	$rutavideos="videos/".$_SESSION['codservicio'].'/';

	//Validamos si hacermos un insert o un update
	if($emp->identrada == 0)
	{
		//guardando
		$emp->guardarEntrada();
		$md->guardarMovimiento($f->guardar_cadena_utf8('Entrada'),'Entradas',$f->guardar_cadena_utf8('Nueva Entrada creado con el ID-'.$emp->identrada));
	}else{
		$emp->modificarEntrada();	
		$md->guardarMovimiento($f->guardar_cadena_utf8('Entrada'),'Entradas',$f->guardar_cadena_utf8('Modificación de la Entrada -'.$emp->identrada));
	}




		/*foreach ($_FILES as $key) 
		{*/
	if (isset($_FILES["archivo"])) {
		/*if($key['error'] == UPLOAD_ERR_OK ){//Verificamos si se subio correctamente*/


			$nombre = str_replace(' ','_',date('Y-m-d H:i:s').'-'.$emp->identrada.".jpg");//Obtenemos el nombre del archivo
			
			$temporal = $_FILES["archivo"]['tmp_name']; //Obtenemos el nombre del archivo temporal
			//$tamano= ($_FILES["archivo"]['size'] / 1000)."Kb"; //Obtenemos el tamaño en KB

			//obtenemos el nombre del archivo anterior para ser eliminado si existe

			$sql = "SELECT imagen FROM entradas WHERE identrada='".$emp->identrada."'";

			$result_borrar = $db->consulta($sql);
			$result_borrar_row = $db->fetch_assoc($result_borrar);
			$nombreborrar = $result_borrar_row['imagen'];		  
			if($nombreborrar != "")
			{
				unlink($ruta.$nombreborrar); 
			}


			move_uploaded_file($temporal, $ruta.$nombre); //Movemos el archivo temporal a la ruta especificada

			$sql = "UPDATE entradas SET imagen = '$nombre' WHERE identrada='".$emp->identrada."'";   
			$db->consulta($sql);	 
		//}
	}

	if (isset($_FILES["video"])) {
		 $file_name = $_FILES['video']['name'];
     $file_temp = $_FILES['video']['tmp_name'];
     $file_size = $_FILES['video']['size'];
     $allowed_ext = array('avi', 'flv', 'wmv', 'mov', 'mp4');

     $file = explode('.', $file_name);
     $end = end($file);


			$nombre1 = str_replace(' ','_',date('Y-m-d H:i:s').'-'.$emp->identrada.'.'.$end);//Obtenemos el nombre del archivo



			$sql1 = "SELECT video FROM entradas WHERE identrada='".$emp->identrada."'";

			$result_borrar1 = $db->consulta($sql1);
			$result_borrar_row1 = $db->fetch_assoc($result_borrar);
			$nombreborrar1 = $result_borrar_row1['video'];		  
			if($nombreborrar != "")
			{
				unlink($rutavideos.$nombreborrar1); 
			}

			move_uploaded_file($_FILES["video"]["tmp_name"], $rutavideos.$nombre1);
		//	move_uploaded_file($temporal, $ruta.$nombre); //Movemos el archivo temporal a la ruta especificada

			$sql1 = "UPDATE entradas SET video = '$nombre1' WHERE identrada='".$emp->identrada."'";   
			$db->consulta($sql1);

	   // if (move_uploaded_file($_FILES["video"]["tmp_name"], $rutavideos.$nombre)) {
	        //more code here...
	       // echo "catalogos/entradas/videos/".$_SESSION['codservicio'].'/'.$_FILES['video']['name'];
	   /* } else {
	        echo 0;
	    }
	*/

	   	
		} 
				
	//}
	$db->commit();
	echo "1|".$emp->identrada;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>