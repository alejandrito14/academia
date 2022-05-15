<?php

header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Importamos nuestras clases 
require_once("clases/conexcion.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.CodigoPostal.php");



try
{
	
	$codpostal = $_POST['codigo'];
	$idmunicipio=0;
	$estado=0;
	$pais=0;
	$respuesta=0;
	//Creamos nuestros objetos de clase 
	$db= new MySQL();
	$codigop= new CodigoPostal();
	$codigop->db=$db;
	$codigop->codigopostal=$codpostal;




	if (!empty($codpostal)) {
		
	

	$obtener=$codigop->Obtenercodigopostal();
	$row=$db->fetch_assoc($obtener);
	$num=$db->num_rows($obtener);





	if ($num>0){

		$codestado=$row['c_estado'];
		$codmunicipio=$row['c_municipio'];

		$codigop->clavemunicipio=$codmunicipio;
		$codigop->claveestado=$codestado;

		
		$obtenerdatos=$codigop->ObtenerEstadoMunicipio();
		$rowdatos=$db->fetch_assoc($obtenerdatos);
		$numdatos=$db->num_rows($obtenerdatos);


		if ($numdatos>0) {
			$idmunicipio=$rowdatos['idmunicipio'];
			$estado=$rowdatos['estado_id'];
			$pais=$rowdatos['idpais'];

			$respuesta=1;

		}else{

			$respuesta=2;
		}


	}else{



		$respuesta=0;
	}

}else{


	$respuesta=3;
}




	$array=array('respuesta'=>$respuesta,'idmunicipio'=>$idmunicipio,'idestado'=>$estado,'pais'=>$pais,'mensaje'=>$mensaje);

	$vresponse['respuesta']=$array;
	/*$vresponse['idmunicipio']=$idmunicipio;
	$vresponse['idestado']=$estado;
	$vresponse['idpais']=$pais;*/


	echo json_encode($vresponse);
	
}catch(Exception $e){
	
	echo "Error. ".$e;
}
?>