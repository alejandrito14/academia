<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Pagos.php");
require_once("clases/class.Usuarios.php");
require_once("clases/class.Membresia.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Pagos();
	$usua=new Usuarios();
	$membresia= new Membresia();

	$usua->db=$db;
	$lo->db=$db;
	$membresia->db=$db;
	$lo->idusuarios=$_POST['id_user'];
	$usua->idusuarios=$_POST['id_user'];
	$pagoselegidos=json_decode($_POST['pagos']);

	$obteneradeudos=array();

$contarpagos=0;
for ($j=0; $j <count($pagoselegidos); $j++) { 
		$idpago=$pagoselegidos[$j]->{'id'};
		$lo->idpago=$idpago;

		$buscar=$lo->ObtenerPago();
		$usua->idusuarios=$buscar[0]->idusuarios;
		if (count($buscar)>0) {
			# code...
		
		$depende=$usua->ObtenerDependencia();
		
		if (count($depende)>0) {
			# code...
		$lo->idusuarios=$depende[0]->idusuariostutor;

		$membresia->idusuarios=$lo->idusuarios;
		$obtenerMembresia=$membresia->ObtenerMembresiaUsuarioAsociada();

		$lo->idmembresia=$obtenerMembresia[0]->idmembresia;
		$obteneradeudos=$lo->ListadopagosNopagadosMembresia();

				if (count($obteneradeudos)) {
					for ($i=0; $i <count($obteneradeudos) ; $i++) { 
							
					
						if ($obteneradeudos[$i]->idpago==$pagoselegidos[$j]->{'id'}) {
								unset($obteneradeudos[$i]);
							}else{
							$contarpagos++;	
							}
							
						}
					}

				}
			}
		}
	



	$db->commit();

	$respuesta['respuesta']=1;
	$respuesta['pagosadeudados']=0;
	//Retornamos en formato JSON 
	$myJSON = json_encode($respuesta);
	echo $myJSON;

}catch(Exception $e){
	$db->rollback();
	//echo "Error. ".$e;
	
	$array->resultado = "Error: ".$e;
	$array->msg = "Error al ejecutar el php";
	$array->id = '0';
		//Retornamos en formato JSON 
	$myJSON = json_encode($array);
	echo $myJSON;
}
?>