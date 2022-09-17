<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.Servicios.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Espacios.php");
require_once("clases/class.ServiciosAsignados.php");

//require_once("clases/class.MovimientoBitacora.php");
/*require_once("clases/class.Sms.php");
require_once("clases/class.phpmailer.php");
require_once("clases/emails/class.Emails.php");*/

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new Servicios();
	$f=new Funciones();
	$fechas=new Fechas();
	$espacios=new Espacios();

	$espacios->db=$db;
	$asignados = new ServiciosAsignados();
	$asignados->db=$db;
	//Enviamos la conexion a la clase
	$lo->db = $db;

	$lo->estatus=$_POST['estatus'];
	 
	$obtenerservicios=$lo->ObtenerServiciosAdmin();


/*	for ($i=0; $i <count($obtenerservicios) ; $i++) { 
		
		$asignados->idservicio=$obtenerservicios[$i]->idservicio;
		$obtenerhorarios=$asignados->ObtenerHorariosProximo();
		$participantes=$asignados->obtenerUsuariosServiciosAlumnosAsignados();

		$obtenerservicios[$i]->cantidadalumnos=count($participantes);
		 //$obtenerservicios[$i]->horarios=$horarios;
		$arreglohorarios=array();

		if (count($obtenerhorarios)>0) {
			
		
		$diasemana=$fechas->diaarreglocorto($obtenerhorarios[0]->dia);


		$horainicio1=date('H:i:s',strtotime($obtenerhorarios[0]->horainicial));
		$horafinal1=date('H:i:s',strtotime($obtenerhorarios[0]->horafinal));




		$horainicio=date('H:i',strtotime($obtenerhorarios[0]->horainicial));

		$horafinal=date('H:i',strtotime($obtenerhorarios[0]->horafinal));

		$fecha=$obtenerhorarios[0]->fecha;
		$dianumero=explode('-', $fecha);


		$obtenerservicios[$i]->fechaproxima=$diasemana.' '.$dianumero[2].'/'.$fechas->mesesAnho3[$fechas->mesdelano($fecha)-1];
		$obtenerservicios[$i]->horainicial=$horainicio;
		$obtenerservicios[$i]->horafinal=$horafinal;
		$diasemananumero=$obtenerhorarios[0]->dia;
		$dia=date('w');
		$horaactual=date('H:i:s');


		$idzona=$obtenerhorarios[0]->idzona;
		$espacios->idespacio=$idzona;
		$zona=$espacios->buscarEspacio();
		$rowzona=$db->fetch_assoc($zona);
	
		$obtenerservicios[$i]->idzona=$rowzona['idzona'];
		$obtenerservicios[$i]->zonanombre=$rowzona['nombre'];
		$obtenerservicios[$i]->zonacolor=$rowzona['color'];

		
		

			}
			else{

			$obtenerservicios[$i]->horainicial="";
			$obtenerservicios[$i]->horafinal="";
			$obtenerservicios[$i]->fechaproxima="";
			$obtenerservicios[$i]->idzona="";
			$obtenerservicios[$i]->zonanombre="";
			$obtenerservicios[$i]->zonacolor="";
			
			}
	// $obtenerservicios[$i]->horarios=$arreglohorarios;




	}*/



	$respuesta['respuesta']=$obtenerservicios;
	
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