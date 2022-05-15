<?php 

class Codservicio 
{


	public function Obtenerbasedecodigo($codservicio)
	{
		
		//$codservicio = $_POST['codservicio'];
       // $con2 = mysqli_connect("189.193.4.113","pepe","121275","isadmin");
        $con2 = mysqli_connect("is-software.net","issoftwa_prueba","prueba","issoftwa_admin");


			       //  mysql_select_db("isadmin",$con2);
           //  $con2 = mysqli_connect("192.169.197.189","issoftware","qr=]3JKxsT+3!","isadmin");
		
			$consulta = "SELECT * FROM servicios_clientes WHERE idservicios_clientes = '$codservicio'";
			


			$servicio =  $con2->query($consulta); 
		
			$servicio_row =  mysqli_fetch_assoc($servicio);  

			$servicio_num=mysqli_num_rows($servicio);



			return $servicio_row;
	}
}


 ?>