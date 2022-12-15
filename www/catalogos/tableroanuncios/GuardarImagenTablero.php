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
require_once("../../clases/class.ImagenesTablero.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');
try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new ImagenesTablero();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
	$ruta="imagenestablero/".$_SESSION['codservicio'].'/';
	
	//Recbimos parametros
	$emp->idtableroanuncio = trim($_POST['v_idanuncio']);
	$emp->tituloimagen = trim($f->guardar_cadena_utf8($_POST['v_titulo']));


	$emp->GuardarImagenTablero();

	foreach ($_FILES as $key) 
		{
		if($key['error'] == UPLOAD_ERR_OK ){//Verificamos si se subio correctamente


			$nombre = str_replace(' ','_',date('Y-m-d H:i:s').'-'.$emp->idtableroanuncio.".jpg");//Obtenemos el nombre del archivo
			
			$temporal = $key['tmp_name']; //Obtenemos el nombre del archivo temporal
			$tamano= ($key['size'] / 1000)."Kb"; //Obtenemos el tamaño en KB

			//obtenemos el nombre del archivo anterior para ser eliminado si existe

			$sql = "SELECT imagen FROM imagentablero WHERE idtableroanuncio='".$emp->idtableroanuncio."'";

			$result_borrar = $db->consulta($sql);
			$result_borrar_row = $db->fetch_assoc($result_borrar);
			$nombreborrar = $result_borrar_row['imagen'];		  
			if($nombreborrar != "")
			{
				unlink($ruta.$nombreborrar); 
			}


			move_uploaded_file($temporal, $ruta.$nombre); //Movemos el archivo temporal a la ruta especificada

			$sql = "UPDATE imagentablero SET imagen = '$nombre' WHERE idtableroanuncio='".$emp->idtableroanuncio."'";   
			$db->consulta($sql);	 
		}
	}

	$db->commit();

	$respuesta['respuesta']=1;
	$myJSON = json_encode($respuesta);
	echo $myJSON;
}catch(Exception $e)
	{
	$db->rollback();
	echo "Error. ".$e;


	}

	?>