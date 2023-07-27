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
	$emp->costoinscripcion=$_POST['v_costoinscripcion'];

	$serviciosasignados=json_decode($_POST['serviciosasignados']);
	$tiposerviciosasignados=json_decode($_POST['tiposerviciosasignados']);

	$diasemanas=explode(',', $_POST['diasemana']);
	$horainiciosemana=explode(',', $_POST['horainicio']);
	$horafinsemana=explode(',', $_POST['horafin']);
	$porcategoria=$_POST['porcategoria'];
	$porservicio=$_POST['porservicio'];
	$porhorario=$_POST['porhorario'];
	$porhorariodescuento=$_POST['v_porhorariodescuento'];
	$porhorariomonto=$_POST['v_porhorariomonto'];

	$color=$_POST['v_color'];
	$emp->porcategoria=$porcategoria;
	$emp->porservicio=$porservicio;
	$emp->color=$color;
	$emp->depende=$_POST['dependede'];
	$emp->membresiadepende=$_POST['membresiadepende'];
	$emp->porhorario=$porhorario;
	$emp->porhorariodescuento=$porhorariodescuento;
	$emp->porhorariomonto=$porhorariomonto;

	$emp->inppadre=$_POST['inppadre'];
	$emp->inphijo=$_POST['inphijo'];
	$emp->inpnieto=$_POST['inpnieto'];
	$emp->v_limitemembresia=$_POST['v_limitemembresia'];
	$emp->fecha=$_POST['v_fecha'];
	$emp->repetir=$_POST['v_repetir']!=''?$_POST['v_repetir']:0;
	
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


		if ($tiposerviciosasignados!='') {
			for ($i=0; $i <count($tiposerviciosasignados) ; $i++) { 
				
				$idtiposervicio=$tiposerviciosasignados[$i]->{'tiposervicio'};
				$tipodescuento=$tiposerviciosasignados[$i]->{'selecttipo'};
				$inputcantidad=$tiposerviciosasignados[$i]->{'inputcantidad'};

				$emp->idcategorias=$idtiposervicio;
				$emp->tipodescuento=$tipodescuento;
				$emp->inputcantidad=$inputcantidad;
				$emp->AsignarCategoriaMembresia();

			}
		}

		if ($porhorario==1) {
			# code...
		
		if (count($diasemanas)>0 && $diasemanas[0]!='') {
			# code...
		
		for ($i=0; $i < count($diasemanas); $i++) { 
				$emp->dia=$diasemanas[$i];
				$emp->horainiciosemana=$horainiciosemana[$i];
				$emp->horafinsemana=$horafinsemana[$i];
				$emp->GuardarHorarioMembresia();
			}

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



		if ($tiposerviciosasignados!='') {

			$emp->EliminarAsignacionTipo();

			for ($i=0; $i <count($tiposerviciosasignados) ; $i++) { 
				
				$idtiposervicio=$tiposerviciosasignados[$i]->{'tiposervicio'};
				$tipodescuento=$tiposerviciosasignados[$i]->{'selecttipo'};
				$inputcantidad=$tiposerviciosasignados[$i]->{'inputcantidad'};

				$emp->idcategorias=$idtiposervicio;
				$emp->tipodescuento=$tipodescuento;
				$emp->inputcantidad=$inputcantidad;
				$emp->AsignarCategoriaMembresia();

			}
		}



		$emp->EliminarHorarioMembresia();
		if ($porhorario==1) {
			# code...
		
		if (count($diasemanas)>0 && $diasemanas[0]!='') {
			# code...
		
		for ($i=0; $i < count($diasemanas); $i++) { 
				$emp->dia=$diasemanas[$i];
				$emp->horainiciosemana=$horainiciosemana[$i];
				$emp->horafinsemana=$horafinsemana[$i];
				$emp->GuardarHorarioMembresia();
			}

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