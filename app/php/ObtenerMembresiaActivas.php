<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Membresia.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.PagConfig.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Membresia();
	$f=new Funciones();
	$usuarios=new Usuarios();
	$configuracion=new PagConfig();
	$configuracion->db=$db;

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$usuarios->db=$db;
	$lo->idusuarios=$_POST['idusuario'];
	$usuarios->idusuarios=$lo->idusuarios;
	$verificarsiestutorado=$usuarios->VerificarSiesTutorado();
	$obterusuario=$usuarios->ObtenerUsuario();
	
	$obtenertablero=$lo->ObtenerUsuarioMembresias();
	//var_dump($obtenertablero);die();
	$idmembresias="";
	$obtenerMembresias=array();

	$obtenerconfimembresia=$configuracion->ObtenerInformacionConfiguracion();

	$activarpopupmembresia=$obtenerconfimembresia['activarpopupmembresia'];


	$idmembresiapadre="";

if ($activarpopupmembresia==1) {
	if (count($obtenertablero)==0) {
		
			if (count($verificarsiestutorado)>0) {

				$idtutor=$verificarsiestutorado[0]->idusuariostutor;

				$buscarSiTutorTieneMembresia=$lo->buscarSiTutorTieneMembresia($idtutor);
				
				if (count($buscarSiTutorTieneMembresia)>0) {
					$idmembresiapadre=$buscarSiTutorTieneMembresia[0]->idmembresia;
				

				if ($verificarsiestutorado[0]->sututor==1) {
					$inpnieto=1;
					$inphijo="";
				}else{
					$inpnieto="";
					$inphijo=1;
				}

				if ($buscarSiTutorTieneMembresia[0]->pagado==1) {
					 
					$obtenerMembresias=$lo->ObtenerMembresiasDependen($idmembresiapadre,$inphijo,$inpnieto);

					for ($i=0; $i <count($obtenerMembresias) ; $i++) { 
						$lo->idmembresia=$obtenerMembresias[$i]->idmembresia;
						$ObtenerSiTutoradosMembresia=$lo->ObtenerSiTutoradosMembresia($idtutor);

						if ($obtenerMembresias[$i]->limite<=count($ObtenerSiTutoradosMembresia)) {
							unset($obtenerMembresias[$i]);
						}

					}
				}
				

			}
			
			}else{

				
					# code...
				
				$obtenerMembresias=$lo->ObtenerMembresiasDisponibles($idmembresias);

			}

		
	}

}
	


	$respuesta['respuesta']=$obtenerMembresias;
	$respuesta['membresias']=$obtenertablero;
	$respuesta['usuario']=$obterusuario[0];
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