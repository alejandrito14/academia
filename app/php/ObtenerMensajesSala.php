<?php 
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');


//Inlcuimos las clases a utilizar
require_once("clases/conexcion.php");
require_once("clases/class.ServiciosAsignados.php");
require_once("clases/class.Funciones.php");
require_once("clases/class.Fechas.php");
require_once("clases/class.Sala.php");
require_once("clases/class.Chat.php");
require_once("clases/class.Chatdirigido.php");

try
{
	
	//Declaramos objetos de clases
	$db = new MySQL();
	$lo = new ServiciosAsignados();
	$f=new Funciones();
	$fechas=new Fechas();
	$sala=new Sala();
	$chat=new Chat();
	$chatdirigido=new Chatdirigido();
	//Enviamos la conexion a la clase
	$lo->db = $db;
	$sala->db=$db;
	$chat->db=$db;
	$chatdirigido->db=$db;

	$idsala=$_POST['idsala'];
	$sala->idsalachat=$idsala;
	$sala->idusuario=$_POST['idusuario'];

	$ObtenerMensajes=$sala->ObtenerMensajes();
	$obtenerusuarios=$sala->ObtenerAgrupadousuariossala();
	$obtenerdatosusuarios=$sala->ObtenerOtrosUsuariosSala();


	for ($i=0; $i < count($ObtenerMensajes); $i++) { 
		
		$fechahora=explode(' ',$ObtenerMensajes[$i]->fecha);
		$fecha=$fechahora[0];
		$ObtenerMensajes[$i]->fechaformato='';
		if ($fecha!='') {
	
		$dianumero=explode('-',$fecha);
		$ObtenerMensajes[$i]->fechaformato=$dianumero[2].'/'.$dianumero[1].'/'.$dianumero[0].' '.$fechahora[1];
			
			}
			$ObtenerMensajes[$i]->leido=0;

			if($ObtenerMensajes[$i]->idusuarioenvio==$sala->idusuario){
				$sala->idchat=$ObtenerMensajes[$i]->idchat;

				$leido=0;
				for ($j=0; $j <count($obtenerdatosusuarios); $j++) { 
					
				 $chatdirigido->idchat=$sala->idchat;
				 $chatdirigido->idusuarios=$obtenerdatosusuarios[$j]->idusuarios;
					$checarleido=$chatdirigido->ChecarLeido();
					
					if ($checarleido[0]->estatusleido==1) {
						$leido++;
					}


				}

				if ($leido==count($obtenerdatosusuarios)) {
					$ObtenerMensajes[$i]->leido=1;

				}else{
					$ObtenerMensajes[$i]->leido=0;

				}
				


			}


	}


	$respuesta['respuesta']=$ObtenerMensajes;
	$respuesta['usuarios']=explode(',',$obtenerusuarios[0]->usuariossala);
	$respuesta['datosusuarios']=$obtenerdatosusuarios;
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