<?php
require_once("../../clases/class.Sesion.php");

$se = new Sesion();

    $carpetaapp=$_SESSION['carpetaapp'];

    if ($carpetaapp!='') {
        $ruta="../../../app/".$carpetaapp."/php/upload/datosfactura/";
        $ruta2="../app/".$carpetaapp."/php/upload/datosfactura/";
    }else{

        $ruta="../../../app/php/upload/datosfactura/";
        $ruta2="../app/php/upload/datosfactura/";
    }
   
   // $ruta='imagenes/'.$_SESSION['codservicio'].'/';
if (($_FILES["file"]["type"] == "image/jpg")
    || ($_FILES["file"]["type"] == "image/jpeg")
    || ($_FILES["file"]["type"] == "image/png")
    || ($_FILES["file"]["type"] == "image/gif")) {

    $date=date('Y-m-d H:i:s');
    $nombre = $date.'_'.$_FILES['file']['name'];//Obtenemos el nombre del archivo

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $ruta.$nombre)) {
        //more code here...
         $res=$ruta2.$nombre;


    } else {
        $res=0;
    }
} else {
    $res=0;
}


    $respuesta['respuesta']=$res;
    $respuesta['nombreimagen']=$nombre;
    $respuesta['ruta']=$ruta2;

    echo json_encode($respuesta);
 ?>