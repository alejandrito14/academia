<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.ServiciosAsignados.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Usuarios();
	$f=new Funciones();
	$fechas=new Fechas();
	$serviciosasignados= new ServiciosAsignados();
	//Enviamos la conexion a la clase
	$lo->db = $db;
	$serviciosasignados->db=$db;

	/*$serviciosasignados->idusuario=$_POST['id_user'];
	$idusuarios_servicios=$_POST['idusuarios_servicios'];
	$serviciosasignados->idusuarios_servicios=$idusuarios_servicios;
	$obtener=$serviciosasignados->ObtenerServicioAsignado();*/
	$idservicio=$_POST['idservicio'];
	$lo->idservicio=$idservicio;

	$serviciosasignados->idservicio=$idservicio;
	$usuariosservicio=$serviciosasignados->obtenerUsuariosServiciosAsignadosAgrupado();

	$idusuariosservicio=$usuariosservicio[0]->idusuarios;

	$obtenerusuarios=$lo->obtenerUsuariosAlumnos($idusuariosservicio);


	for ($i=0; $i <count($obtenerusuarios) ; $i++) { 
		
			$lo->idusuarios=$obtenerusuarios[$i]->idusuarios;
			$estutorado=$lo->ObtenerparentescoUsuario();
			$row=$db->fetch_assoc($estutorado);
			$contador=$db->num_rows($estutorado);
			$obtenerusuarios[$i]->tutor="";
			$obtenerusuarios[$i]->tutorado=0;
			if ($contador>0) {
			$obtenerusuarios[$i]->tutorado=1;


			$obtenerusuarios[$i]->tutor=$row['nombre'].' '.$row['paterno'].' '.$row['materno'];
			}
		}
	$respuesta['respuesta']=$obtenerusuarios;
	
	//Retornamos en formato JSON 
	$myJSON = json_encode($respuesta);
	echo $myJSON;

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