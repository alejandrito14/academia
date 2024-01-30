<?php 
require_once("../../clases/class.Sesion.php");

$se = new Sesion();

$carpetaapp=$_SESSION['carpetaapp'];

try
{

	 if ($carpetaapp!='') {
        $ruta="../../../app/".$carpetaapp."/php/upload/comprobante/";
        $ruta2="../app/".$carpetaapp."/php/upload/comprobante/";
    }else{

        $ruta="../../../app/php/upload/comprobante/";
        $ruta2="../app/php/upload/comprobante/";
    }
   
	
		$imageneliminar=$_POST['imageneliminar'];
		//$ruta="upload/comprobante/";

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