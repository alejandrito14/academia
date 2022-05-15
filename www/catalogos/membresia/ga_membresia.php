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
require_once("../../clases/class.Membresia.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');

try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Membresia();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$emp->idmembresia = trim($_POST['id']);
	$emp->titulo = trim($f->guardar_cadena_utf8($_POST['v_titulo']));
	//$emp->descripcion = trim($f->guardar_cadena_utf8($_POST['v_descripcion']));
	
	$emp->orden = trim($f->guardar_cadena_utf8($_POST['v_orden']));
	$emp->estatus = trim($f->guardar_cadena_utf8($_POST['v_estatus']));

	$emp->descripcion=$_POST['v_descripcion'];
	$emp->costo=$_POST['v_costo'];
	$emp->duracion=$_POST['v_duracion'];
	$emp->limite=$_POST['v_limite'];

	$serviciosasignados=json_decode($_POST['serviciosasignados']);

	$ruta="imagenes/".$_SESSION['codservicio'].'/';

	
	//Validamos si hacermos un insert o un update
	if($emp->idmembresia == 0)
	{
		//guardando
		$emp->guardarmembresia();
		

		if ($serviciosasignados!='') {
			for ($i=0; $i <count($serviciosasignados) ; $i++) { 
				
				$idservicio=$serviciosasignados[$i]->{'servicio'};
				$tipodescuento=$serviciosasignados[$i]->{'selecttipo'};
				$inputcantidad=$serviciosasignados[$i]->{'inputcantidad'};

				$emp->idservicio=$idservicio;
				$emp->tipodescuento=$tipodescuento;
				$emp->inputcantidad=$inputcantidad;
				$emp->AsignarServicioMembresia();

			}
		}

		$md->guardarMovimiento($f->guardar_cadena_utf8('membresia'),'membresia',$f->guardar_cadena_utf8('Nuevo membresia creado con el ID-'.$emp->idmembresia));

	}else{
		$emp->modificarmembresia();	

		if ($serviciosasignados!='') {

			$emp->EliminarAsignacion();
			for ($i=0; $i <count($serviciosasignados) ; $i++) { 
				
				$idservicio=$serviciosasignados[$i]->{'servicio'};
				$tipodescuento=$serviciosasignados[$i]->{'selecttipo'};
				$inputcantidad=$serviciosasignados[$i]->{'inputcantidad'};

				$emp->idservicio=$idservicio;
				$emp->tipodescuento=$tipodescuento;
				$emp->inputcantidad=$inputcantidad;
				$emp->AsignarServicioMembresia();

			}
		}

		$md->guardarMovimiento($f->guardar_cadena_utf8('membresia'),'membresia',$f->guardar_cadena_utf8('Modificación del membresia -'.$emp->idmembresia));
	}




		foreach ($_FILES as $key) 
		{
		if($key['error'] == UPLOAD_ERR_OK ){//Verificamos si se subio correctamente


			$nombre = str_replace(' ','_',date('Y-m-d H:i:s').'-'.$emp->idmembresia.".jpg");//Obtenemos el nombre del archivo
			
			$temporal = $key['tmp_name']; //Obtenemos el nombre del archivo temporal
			$tamano= ($key['size'] / 1000)."Kb"; //Obtenemos el tamaño en KB

			//obtenemos el nombre del archivo anterior para ser eliminado si existe

			$sql = "SELECT imagen FROM membresia WHERE idmembresia='".$emp->idmembresia."'";

			$result_borrar = $db->consulta($sql);
			$result_borrar_row = $db->fetch_assoc($result_borrar);
			$nombreborrar = $result_borrar_row['imagen'];		  
			if($nombreborrar != "")
			{
				unlink($ruta.$nombreborrar); 
			}


			move_uploaded_file($temporal, $ruta.$nombre); //Movemos el archivo temporal a la ruta especificada

			$sql = "UPDATE membresia SET imagen = '$nombre' WHERE idmembresia='".$emp->idmembresia."'";   
			$db->consulta($sql);	 
		}
	}
				
	$db->commit();
	echo "1|".$emp->idmembresia;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>