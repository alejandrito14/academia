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

//Inlcuimos las clases a utilizar
require_once("../../clases/conexcion.php");
require_once("../../clases/class.Usuarios.php");
require_once("../../clases/class.Funciones.php");
//require_once("clases/class.MovimientoBitacora.php");
/*require_once("clases/class.Sms.php");
require_once("clases/class.phpmailer.php");
require_once("clases/emails/class.Emails.php");*/

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Usuarios();
	$f=new Funciones();

	//Enviamos la conexion a la clase
	$lo->db = $db;

	$pagosarealizar=json_decode($_POST['pagosarealizar']);


	$contartipo=0;
	$sintitpo=0;
	$concepto=[];
	$contipo=[];
	  if (count($pagosarealizar)>0) {
	    for ($i =0;$i < count($pagosarealizar); $i++) {
	      
	      $tipopago=$pagosarealizar[$i]->{'tipopago'};
	     
	      if ($tipopago!='' && $tipopago!=null) {
	       

	         array_push($concepto, $pagosarealizar[$i]->{'concepto'});
	        $contartipo++;
	        array_push($contipo,$pagosarealizar[$i]);
	      }else{
	        $sintitpo++;


	      }
	    }

	  }
  $pasa=0;
  if ($contartipo>0 && $sintitpo==0) {

        $tipo=0;
        if (count($contipo)>=2) {
          
          $igual=0;
              for($i = 0; $i < count($contipo); $i++) {
                 $tipo=$contipo[$i]->tipopago;

                 if ($i< count($contipo)-1) {
                   if ($contipo[$i + 1]->tipopago === $contipo[$i]->tipopago) {
                   $igual++;
                  }
                }

            }
            $con=count($contipo)-1;


            if ($igual==$con) {
              $pasa=1;
            }else{
              $pasa=0;
            }
        }else{

          $pasa=1;
        }
    

    
  }

  else if ($sintitpo>0 && $contartipo==0) {
    $pasa=1;
  }

  else{
  	
    $pasa=0;
  }


	$respuesta['respuesta']=1;
	$respuesta['pasa']=$pasa;
	$respuesta['conceptos']=$concepto;
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