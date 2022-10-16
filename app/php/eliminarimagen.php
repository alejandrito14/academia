<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

try
{
	
		$imageneliminar=$_POST['imageneliminar'];
		$ruta="upload/comprobante/";

		if($imageneliminar != "")
		{
		 unlink($ruta.$imageneliminar); 
		}

	
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