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
require_once("../../clases/class.TableroAnuncios.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new TableroAnuncios();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$emp->idtableroanuncio = trim($_POST['id']);
	$emp->titulo = trim($f->guardar_cadena_utf8($_POST['v_titulo']));
	$emp->descripcion =  trim($_POST['v_descripcion']);
	
	$emp->orden = trim($f->guardar_cadena_utf8($_POST['v_orden']));
	$emp->estatus = trim($f->guardar_cadena_utf8($_POST['v_estatus']));


	$ruta="imagenes/".$_SESSION['codservicio'].'/';

	
	//Validamos si hacermos un insert o un update
	if($emp->idtableroanuncio == 0)
	{
		//guardando
		$emp->guardarAnuncio();
		$md->guardarMovimiento($f->guardar_cadena_utf8('Tablero Anuncio'),'tablero anuncio',$f->guardar_cadena_utf8('Nuevo anuncio creado con el ID-'.$emp->idtableroanuncio));
	}else{
		$emp->modificarAnuncio();	
		$md->guardarMovimiento($f->guardar_cadena_utf8('Tablero Anuncio'),'tablero anuncio',$f->guardar_cadena_utf8('Modificación del anuncio -'.$emp->idtableroanuncio));
	}




		foreach ($_FILES as $key) 
		{
		if($key['error'] == UPLOAD_ERR_OK ){//Verificamos si se subio correctamente


			$nombre = str_replace(' ','_',date('Y-m-d H:i:s').'-'.$emp->idtableroanuncio.".jpg");//Obtenemos el nombre del archivo
			
			$temporal = $key['tmp_name']; //Obtenemos el nombre del archivo temporal
			$tamano= ($key['size'] / 1000)."Kb"; //Obtenemos el tamaño en KB

			//obtenemos el nombre del archivo anterior para ser eliminado si existe

			$sql = "SELECT imagen FROM tableroanuncios WHERE idtableroanuncio='".$emp->idtableroanuncio."'";

			$result_borrar = $db->consulta($sql);
			$result_borrar_row = $db->fetch_assoc($result_borrar);
			$nombreborrar = $result_borrar_row['imagen'];		  
			if($nombreborrar != "")
			{
				unlink($ruta.$nombreborrar); 
			}


			move_uploaded_file($temporal, $ruta.$nombre); //Movemos el archivo temporal a la ruta especificada

			$sql = "UPDATE tableroanuncios SET imagen = '$nombre' WHERE idtableroanuncio='".$emp->idtableroanuncio."'";   
			$db->consulta($sql);	 
		}
	}
				
	$db->commit();
	echo "1|".$emp->idtableroanuncio;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>