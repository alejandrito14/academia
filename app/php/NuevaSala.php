<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Sala.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Usuarios_servicios.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Sala();
	$f=new Funciones();
	$Usuarios_servicios=new Usuarios_servicios();

	//Enviamos la conexion a la clase
	$lo->db = $db;
	$Usuarios_servicios->db=$db;
	$idusuarios=json_decode($_POST['idusuarios']);

	$idusuarios_servicios=$_POST['idusuarios_servicios'];
	$Usuarios_servicios->idusuarios_servicios=$idusuarios_servicios;
	$obtener=$Usuarios_servicios->obtenerDatosUsuariosServicio();

	
	$lo->idservicio=$obtener[0]->idservicio;

	$obtenersala=$lo->BuscarSalasServicio();


	if (count($obtenersala)>0) {
		$salaencontrada=0;
		for ($i=0; $i <count($obtenersala) ; $i++) { 
				$idsala=$obtenersala[$i]->idsalachat;
				$lo->idsalachat=$idsala;
				$obtenerUsuariosSala=$lo->ObtenerAgrupadousuariossala();

				$usuariossala=$obtenerUsuariosSala[0]->usuariossala;
				
				

				$usuariosdesala=explode(',',$usuariossala);
				
					$coincide=0;
				if(count($idusuarios)==count($usuariosdesala)) {
						$coincide=1;
					}else{
						$coincide=0;
					}
				
				if ($coincide==1) {
					
					$totalusuarios=count($usuariosdesala);
					$encontrados=0;
					for ($j=0; $j < count($idusuarios); $j++) { 
						
						for ($k=0; $k <count($usuariosdesala) ; $k++) { 
							
							if ($idusuarios[$j]==$usuariosdesala[$k]) {
								$encontrados++;
							}

						}

					}


					if ($totalusuarios==$encontrados) {
						$salaencontrada=1;
						break;	
					}
				}

			}

	}


	if ($salaencontrada==0) {
		$lo->idusuario=$_POST['id_user'];
		$lo->GuardarSala();


		for ($i=0; $i <count($idusuarios); $i++) { 
			
			$lo->idusuario=$idusuarios[$i];
			$lo->AsignarUsuarioSala();
		}
	}


	$respuesta['idsala']=$lo->idsalachat;
	$respuesta['respuesta']=1;

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