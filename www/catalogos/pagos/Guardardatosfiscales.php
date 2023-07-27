<?php 


//Inlcuimos las clases a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Datosfiscales.php");
require_once("../../clases/class.Funciones.php");
require_once("../../clases/class.Sesion.php");
try
{
	$se=new Sesion();
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Datosfiscales();
	$f=new Funciones();

	//Enviamos la conexion a la clase
	$lo->db = $db;


	
	$v_codigopostal=$f->guardar_cadena_utf8($_POST['v_codigopostal']);
	$v_pais=$f->guardar_cadena_utf8($_POST['v_pais']);
	$v_estado=$f->guardar_cadena_utf8($_POST['v_estado']);
	$v_municipio=$f->guardar_cadena_utf8($_POST['v_municipio']);
	//$v_direccion=$f->guardar_cadena_utf8($_POST['v_direccion']);
	$v_colonia=$_POST['v_colonia'];

	$v_nombre=$_POST['razonsocial'];//nombre o razon social
	$v_rfc=$f->guardar_cadena_utf8($_POST['v_rfc']);
	$v_nointerior=$f->guardar_cadena_utf8($_POST['v_nointerior']);
	$v_noexterior=$f->guardar_cadena_utf8($_POST['v_noexterior']);
	$v_correo=$f->guardar_cadena_utf8($_POST['v_correo']);
	$idusuariosdatosfiscales=$_POST['id'];
 	$idusuarios=$se->obtenerSesion('usuariopago');
	$lo->idusuario=$idusuarios;
	$lo->v_codigopostal=$v_codigopostal;
	$lo->v_pais=$v_pais;
	$lo->v_estado=$v_estado;
	$lo->v_municipio=$v_municipio;
	$lo->v_colonia=$v_colonia;
	$lo->razonsocial=$v_nombre;
	$lo->v_rfc=$v_rfc;
	$lo->v_nointerior=$v_nointerior;
	$lo->v_noexterior=$v_noexterior;
	$lo->v_correo=$v_correo;
	$lo->idusuariosdatosfiscales=$idusuariosdatosfiscales;
	$lo->calle1=$_POST['v_calle1'];
	$lo->calle2=$_POST['v_calle2'];
	$lo->asentamiento=$_POST['v_colonia'];
	$lo->calle=$_POST['v_calle'];
	$lo->v_referencia=$_POST['referencia'];
	$lo->vformapago=$_POST['formapago'];
	$lo->vmetodopago=$_POST['metodopago'];
	$lo->vusocfdi=$_POST['v_usocfdi'];

	$imagendatosfactura=explode(',',$_POST['imagendatosfactura']);
	
	if ($idusuariosdatosfiscales>0) {
		$lo->ModificarDatosFiscal();
		
	}else{

		$lo->GuardarDatosfiscales();

	}

/*	if ($imagendatosfactura[0]!='') {
		
		$lo->EliminarImagenesDatofiscal();

		for ($i=0; $i < count($imagendatosfactura); $i++) { 
			
			$lo->rutaimagen=$imagendatosfactura[$i];
			$lo->GuardarImagenFiscal();
		}
	}*/



	if (isset($_FILES["archivo"])) {
		/*if($key['error'] == UPLOAD_ERR_OK ){//Verificamos si se subio correctamente*/


			$nombre = str_replace(' ','_',date('Y-m-d H:i:s').'-'.$lo->identrada.".jpg");//Obtenemos el nombre del archivo
			
			$temporal = $_FILES["archivo"]['tmp_name']; //Obtenemos el nombre del archivo temporal
			//$tamano= ($_FILES["archivo"]['size'] / 1000)."Kb"; //Obtenemos el tamaño en KB

			//obtenemos el nombre del archivo anterior para ser eliminado si existe

			$sql = "SELECT ruta FROM imagenesconstancia WHERE idusuariosdatosfiscales='".$lo->idusuariosdatosfiscales."'";

			$result_borrar = $db->consulta($sql);
			$result_borrar_row = $db->fetch_assoc($result_borrar);
			$nombreborrar = $result_borrar_row['ruta'];		  
			if($nombreborrar != "")
			{
				unlink($ruta.$nombreborrar); 
			}


			move_uploaded_file($temporal, $ruta.$nombre); //Movemos el archivo temporal a la ruta especificada

			$sql = "UPDATE imagenesconstancia SET ruta = '$nombre' WHERE idusuariosdatosfiscales='".$lo->idusuariosdatosfiscales."'";   
			$db->consulta($sql);	 
		//}
	}


	$respuesta['iddatosfiscal']=$lo->idusuariosdatosfiscales;
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