<?php
require_once("../../clases/class.Sesion.php");

//creamos nuestra sesion.
$se = new Sesion();


if(!isset($_SESSION['se_SAS']))
{
	echo "login";
	exit;
}

require_once("../../clases/conexcion.php");
require_once('../../clases/class.MovimientoBitacora.php');
require_once("../../clases/class.Usuarios.php");

try

{

	$db= new MySQL();
	$md = new MovimientoBitacora();
	$cli = new Usuarios();
	
	$md->db = $db;
	$cli->db = $db;
	
	$db->begin();

	
	//enviamos datos a las variables de la tablas
	$cantidad = trim(utf8_decode($_POST['cantidad']));
	$concepto = trim(utf8_decode($_POST['concepto']));
	$cliente = $_POST['cliente'];
	$tipo = $_POST['tipo'];
	
	
	if($tipo == 0){	//ES UN ABONO
	
		//Obtenemos el saldo que tiene el cliente
		$cli->id_usuario = $cliente;
		$result_cliente = $cli->ObtenerInformacionusuario();
		$row_cliente=$db->fetch_assoc($result_cliente);


		
		$saldo_anterior = $row_cliente['monedero'];
		
		//Calculamos nuevo saldo
		$nuevo_saldo = $saldo_anterior + $cantidad;
		
		//Guardamos el saldo en la tabla de clientes para posterior guardar el movimiento en tabla cliente_monedero
		$sql = "UPDATE usuarios SET monedero = '$nuevo_saldo' WHERE idusuarios = '$cliente'";
	
		$db->consulta($sql);
		

		
		//Guardamos el movimiento en tabla cliente_monedero
		$sql_movimiento = "INSERT INTO monedero (idusuarios,monto,modalidad,tipo,saldo_ant,saldo_act,concepto) VALUES ('$cliente','$cantidad','2','$tipo','$saldo_anterior','$nuevo_saldo','$concepto');";

		$db->consulta($sql_movimiento);
		$ultimo = $db->id_ultimo();
		
		$md->guardarMovimiento(utf8_decode('monedero'),'monedero',utf8_decode('Nuevo movimiento de saldo creado con el ID :'.$ultimo.'saldo anterior: '.$saldo_anterior.' nuevo saldo: '.$nuevo_saldo));
	}else{
		//ES UN CARGO
		//Obtenemos el saldo que tiene el cliente
		$cli->id_usuario = $cliente;
		$result_cliente = $cli->ObtenerInformacionusuario();
		$row_cliente=$db->fetch_assoc($result_cliente);

		$saldo_anterior = $row_cliente['monedero'];
		
		//Calculamos nuevo saldo
		$nuevo_saldo = $saldo_anterior - $cantidad;
		
		//Guardamos el saldo en la tabla de clientes para posterior guardar el movimiento en tabla cliente_monedero
		$sql = "UPDATE usuarios SET monedero = '$nuevo_saldo' WHERE idusuarios = '$cliente'";
		$db->consulta($sql);
		
		
		//Guardamos el movimiento en tabla cliente_monedero
		
		$sql_movimiento = "INSERT INTO monedero (idusuarios,monto,modalidad,tipo,saldo_ant,saldo_act,concepto) VALUES ('$cliente','$cantidad','4','$tipo','$saldo_anterior','$nuevo_saldo','$concepto');";

		$db->consulta($sql_movimiento);
		$ultimo = $db->id_ultimo();
		
		//$md->guardarMovimiento(utf8_decode('monedero'),'monedero',utf8_decode('Nuevo movimiento de saldo creado con el ID :'.$ultimo.'saldo anterior: '.$saldo_anterior.' nuevo saldo: '.$nuevo_saldo));
	}

	$db->commit();
	$impresion=0;
	/*$sql_imp = "SELECT * FROM sucursales WHERE idsucursales = '$suc'";
	$result_imp = $db->consulta($sql_imp);
	$result_imp_row = $db->fetch_assoc($result_imp);
	$impresion = $result_imp_row['notas_print'];	*/
	
	echo "1|".$ultimo."|".$impresion;	
	
}

catch(Exception $e)
{

	$db->rollback();

	$v = explode ('|',$e);

		// echo $v[1];

	     $n = explode ("'",$v[1]);

		 $n[0];

	$result = $db->m_error($n[0]);

	echo $result ;

}

?>