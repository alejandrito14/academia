<?php
require_once("../../clases/class.Sesion.php");

$se = new Sesion();

   
     $file_name = $_FILES['file']['name'];
     $file_temp = $_FILES['file']['tmp_name'];
     $file_size = $_FILES['file']['size'];
     $allowed_ext = array('avi', 'flv', 'wmv', 'mov', 'mp4');
	 $limite_kb = 200000;
     $ruta='videos/'.$_SESSION['codservicio'].'/';
  	
     $file = explode('.', $file_name);
     $end = end($file);
  //tamaño  && $file_size < 160000000
if(in_array($end, $allowed_ext) && $file_size < 200000000){
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $ruta.$_FILES['file']['name'])) {
        //more code here...
        echo "catalogos/entradas/videos/".$_SESSION['codservicio'].'/'.$_FILES['file']['name'];
    } else {
        echo 0;
    }
} else {
    echo 0;
}

 ?>