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
require_once("../../clases/class.Servicios.php");
require_once("../../clases/class.Funciones.php");
require_once('../../clases/class.MovimientoBitacora.php');
try
{
	//declaramos los objetos de clase
	$db = new MySQL();
	$emp = new Servicios();
	$f = new Funciones();
	$md = new MovimientoBitacora();
	
	//enviamos la conexión a las clases que lo requieren
	$emp->db=$db;
	$md->db = $db;	
	
	$db->begin();
		
	//Recbimos parametros
	$emp->idservicio = trim($_POST['id']);
	$emp->titulo = trim($f->guardar_cadena_utf8($_POST['v_titulo']));
	$emp->descripcion = trim($f->guardar_cadena_utf8($_POST['v_descripcion']));
	
	$emp->orden = trim($f->guardar_cadena_utf8($_POST['v_orden']));
	$emp->estatus = trim($f->guardar_cadena_utf8($_POST['v_estatus']));

	$emp->idcategoriaservicio = $_POST['v_categoria'];
	$emp->precio=$_POST['v_costo'];

	$ruta="imagenes/".$_SESSION['codservicio'].'/';
	$diasemanas=explode(',', $_POST['diasemana']);
	$horainiciosemana=explode(',', $_POST['horainiciodia']);
	$horafinsemana=explode(',', $_POST['horafindia']);
	
	$zonas=explode(',',  $_POST['zonas']);
	$coachs=explode(',',  $_POST['coachs']);
	$participantes=explode(',',  $_POST['participantes']);

	$costo=$_POST['v_costo']!=''?$_POST['v_costo']:0;
	$totalclase=$_POST['v_totalclase']!=''?$_POST['v_totalclase']:0;
	$modalidad=$_POST['v_modalidad']!='undefined'?$_POST['v_modalidad']:0;
	$montopagarparticipante=$_POST['v_montopagarparticipante'];
	$montopagargrupo=$_POST['v_montopagargrupo'];
	$categoriaservicio=$_POST['v_categoriaservicio'];

	$emp->totalclase=$totalclase;
	$emp->modalidad=$modalidad;
	$emp->montopagarparticipante=$montopagarparticipante;
	$emp->montopagargrupo=$montopagargrupo;
	$emp->costo=$costo;
	$emp->idcategoria=$categoriaservicio;
	$emp->fechainicial=$_POST['v_fechainicial'];
	$emp->fechafinal=$_POST['v_fechafinal'];

	$emp->modalidadpago=$_POST['v_modalidadpago']!='undefined'?$_POST['v_modalidadpago']:0;
	$emp->periodo=$_POST['v_perido'];
	


	//Validamos si hacermos un insert o un update
	if($emp->idservicio == 0)
	{
		//guardando
		$emp->GuardarServicio();
		$md->guardarMovimiento($f->guardar_cadena_utf8('Servicio'),'Servicio',$f->guardar_cadena_utf8('Nuevo Servicio creado con el ID-'.$emp->idservicio));

		if (count($diasemanas)>0 && $diasemanas[0]!='') {
			# code...
		
		for ($i=0; $i < count($diasemanas); $i++) { 
				$emp->dia=$diasemanas[$i];
				$emp->horainiciosemana=$horainiciosemana[$i];
				$emp->horafinsemana=$horafinsemana[$i];
				$emp->GuardarHorarioSemana();
			}
		}

			if (count($zonas)>0 && $zonas[0]!='') {
				for ($i=0; $i < count($zonas); $i++) { 

						$emp->idzona=$zonas[$i];
					$emp->GuardarZona();
					}

				}

			if (count($coachs)>0 && $coachs[0]!='') {
				for ($i=0; $i < count($coachs); $i++) { 
						$emp->idparticipantes=$coachs[$i];
						$emp->Guardarparticipantes();
					}
				}

			if (count($participantes)>0 && $participantes[0]!='') {
					for ($i=0; $i < count($participantes); $i++) { 
						$emp->idparticipantes=$participantes[$i];
						$emp->Guardarparticipantes();
					}
				}


	}else{
		$emp->ModificarServicio();	
		$md->guardarMovimiento($f->guardar_cadena_utf8('Servicio'),'Servicio',$f->guardar_cadena_utf8('Modificación del Servicio -'.$emp->idservicio));

		if (count($diasemanas)>0 && $diasemanas[0]!='') {
			$emp->EliminarHorarioSemana();
		
		for ($i=0; $i < count($diasemanas); $i++) { 
				$emp->dia=$diasemanas[$i];
				$emp->horainiciosemana=$horainiciosemana[$i];
				$emp->horafinsemana=$horafinsemana[$i];
				$emp->GuardarHorarioSemana();
			}
		}

			if (count($participantes)>0 && $participantes[0]!='') {
				$emp->EliminarParticipantes();
					for ($i=0; $i < count($participantes); $i++) { 
						$emp->idparticipantes=$participantes[$i];
						$emp->Guardarparticipantes();
					}
				}

		if (count($zonas)>0 && $zonas[0]!='') {
			$emp->EliminarZonas();
				for ($i=0; $i < count($zonas); $i++) { 

					$emp->idzona=$zonas[$i];
					$emp->GuardarZona();
					}

				}

			if (count($coachs)>0 && $coachs[0]!='') {
					$emp->EliminarCoachs();
					for ($i=0; $i < count($coachs); $i++) { 
						$emp->idparticipantes=$coachs[$i];
						$emp->Guardarparticipantes();
					}
				}

	}

		
		foreach ($_FILES as $key) 
		{
		if($key['error'] == UPLOAD_ERR_OK ){//Verificamos si se subio correctamente


			$nombre = str_replace(' ','_',date('Y-m-d H:i:s').'-'.$emp->idservicio.".jpg");//Obtenemos el nombre del archivo
			
			$temporal = $key['tmp_name']; //Obtenemos el nombre del archivo temporal
			$tamano= ($key['size'] / 1000)."Kb"; //Obtenemos el tamaño en KB

			//obtenemos el nombre del archivo anterior para ser eliminado si existe

			$sql = "SELECT imagen FROM servicios WHERE idservicio='".$emp->idservicio."'";

			$result_borrar = $db->consulta($sql);
			$result_borrar_row = $db->fetch_assoc($result_borrar);
			$nombreborrar = $result_borrar_row['imagen'];		  
			if($nombreborrar != "")
			{
				unlink($ruta.$nombreborrar); 
			}


			move_uploaded_file($temporal, $ruta.$nombre); //Movemos el archivo temporal a la ruta especificada

			$sql = "UPDATE servicios SET imagen = '$nombre' WHERE idservicio='".$emp->idservicio."'";   
			$db->consulta($sql);	 
		}
	}
				
	$db->commit();
	echo "1|".$emp->idservicio;
	
}catch(Exception $e)
{
	$db->rollback();
	echo "Error. ".$e;
}
?>