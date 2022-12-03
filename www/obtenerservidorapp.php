<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');

require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");

error_reporting(E_ALL);





//primero debemos de obtnre los valores de id de servicio   DB, USAURIO DB, CLAVE DB, IP SERVER DB.
//DEBEMOS DE VALIDAR LA FECHA DE VIGENCIA DEL SERVICIO.
	$clave=$_POST['clave'];
	$vigente=0;
	if ($clave=='issoftware') {
		# code...
	
		$codservicio = $_POST['codservicio'];
       // $con2 = mysqli_connect("189.193.4.113","pepe","121275","isadmin");
        $con2 = mysqli_connect("is-software.net","issoftwa_prueba","prueba","issoftwa_admin");

		
			$consulta = "SELECT * FROM servicios_clientes WHERE idservicios_clientes = '$codservicio'";
			

			$servicio =  $con2->query($consulta); 
		
			$servicio_row =  mysqli_fetch_assoc($servicio);  

			$servicio_num=mysqli_num_rows($servicio);


		    if( $servicio_num  != 0)
			{
				//obtenemos la fecha de la base de datos en su vigencia.
				
				$f_vigencia = date("Y-m-d",strtotime($servicio_row['vigencia']));
				$f_actual = date("Y-m-d");

				if ($f_actual<=$f_vigencia) {

		
					$vigente=1;
	

					
				}else
				{

					$vigente=0;

				}
				
				
				
			}else{

				$vigente=0;

				
			}
		

		}

//TERMINAMOS DE VALIDAR EL SERVICIO.


			$respuesta['vigente']=$vigente;
			$respuesta['datosservidor']=$servicio_row;

			echo json_decode($respuesta);




?>