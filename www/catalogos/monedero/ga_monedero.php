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
require_once("../../clases/class.Clientes.php");

try

{

	$db= new MySQL();
	$md = new MovimientoBitacora();
	$cli = new Clientes();
	
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
		$cli->idCliente = $cliente;
		$result_cliente = $cli->ObtenerInformacionCliente();
		$row_cliente=$db->fetch_assoc($result_cliente);


		
		$saldo_anterior = $row_cliente['saldo_monedero'];
		
		//Calculamos nuevo saldo
		$nuevo_saldo = $saldo_anterior + $cantidad;
		
		//Guardamos el saldo en la tabla de clientes para posterior guardar el movimiento en tabla cliente_monedero
		$sql = "UPDATE clientes SET saldo_monedero = '$nuevo_saldo' WHERE idcliente = '$cliente'";
	
		$db->consulta($sql);
		

		
		//Guardamos el movimiento en tabla cliente_monedero
		$sql_movimiento = "INSERT INTO cliente_monedero (idcliente,monto,modalidad,tipo,saldo_ant,saldo_act,concepto) VALUES ('$cliente','$cantidad','2','$tipo','$saldo_anterior','$nuevo_saldo','$concepto');";

		$db->consulta($sql_movimiento);
		$ultimo = $db->id_ultimo();
		
		$md->guardarMovimiento(utf8_decode('cliente_monedero'),'cliente_monedero',utf8_decode('Nuevo movimiento de saldo creado con el ID :'.$ultimo));
	}else{
		//ES UN CARGO
		//Obtenemos el saldo que tiene el cliente
		$cli->idCliente = $cliente;
		$result_cliente = $cli->ObtenerInformacionCliente();
		$row_cliente=$db->fetch_assoc($result_cliente);

		$saldo_actual = $row_cliente['saldo_monedero'];
		
		//Calculamos nuevo saldo
		$nuevo_saldo = $saldo_actual - $cantidad;
		
		//Guardamos el saldo en la tabla de clientes para posterior guardar el movimiento en tabla cliente_monedero
		$sql = "UPDATE clientes SET saldo_monedero = '$nuevo_saldo' WHERE idcliente = '$cliente'";
		$db->consulta($sql);
		
		
		//Guardamos el movimiento en tabla cliente_monedero
		$sql_movimiento = "INSERT INTO cliente_monedero (idcliente,monto,modalidad,tipo,saldo_ant,saldo_act,concepto) VALUES ('$cliente','$cantidad','4','$tipo','$saldo_actual','$nuevo_saldo','$concepto');";
		$db->consulta($sql_movimiento);
		$ultimo = $db->id_ultimo();
		
		$md->guardarMovimiento(utf8_decode('cliente_monedero'),'cliente_monedero',utf8_decode('Nuevo movimiento de saldo creado con el ID :'.$ultimo));
	}

	$db->commit();

	$suc = $_SESSION['se_sas_Sucursal'];
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