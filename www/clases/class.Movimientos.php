<?php

class Movimientos

{

	public $db;//objeto de la clase de conexcion

	

	public $idmovimiento;
	public $tipo;
	public $idformapagocuenta;
	public $expedioa;
	public $fechaoperacion;
	public $cantidad;
	public $observacion;
	public $idclasificadorgastos;
	public $idcuenta;
	public $estatus;
	public $monto;


	
	
	//Funcion para obtener todos los movimientoes activos
	public function ObtmovimientoesActivos()
	{
		$sql = "SELECT * FROM movimiento WHERE estatus = 1";
		$resp = $this->db->consulta($sql);
		$cont = $this->db->num_rows($resp);


		$array=array();
		$contador=0;
		if ($cont>0) {

			while ($objeto=$this->db->fetch_object($resp)) {

				$array[$contador]=$objeto;
				$contador++;
			} 
		}
		return $array;
	}

	public function ObtenerTodosmovimientos()
	{
		$query="SELECT
		movimiento.*,clasificadorgastos.nombre as nombresubcuenta,cuenta.nombre as categoriacuenta
		FROM
		movimiento
		JOIN clasificadorgastos
		ON movimiento.idclasificadorgastos = clasificadorgastos.idclasificadorgastos 
		JOIN cuenta
		ON cuenta.idcuenta = clasificadorgastos.depende

		";
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	
	
	public function Obtenermovimientoes()
	{
		$query="SELECT * FROM movimiento WHERE estatus=1";
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	//funcion para guardar los paises 
	
	public function Guardarmovimiento()
	{
		$query="INSERT INTO movimiento( idformapagocuenta, fechaoperacion, tipo, monto, observacion, idclasificadorgastos) VALUES ( '$this->idformapagocuenta', '$this->fechaoperacion', '$this->tipo', '$this->monto','$this->observacion', '$this->idclasificadorgastos')";
		
		$resp=$this->db->consulta($query);
		$this->idmovimiento = $this->db->id_ultimo();
		
		
	}
	//funcion para modificar los usuarios
	public function Modificarmovimiento()
	{
		$query="UPDATE movimiento SET idformapagocuenta = '$this->idformapagocuenta', fechaoperacion = '$this->fechaoperacion', tipo = '$this->tipo', monto = '$this->monto',  observacion = '$this->observacion', idclasificadorgastos = '$this->idclasificadorgastos' WHERE idmovimiento='$this->idmovimiento'";

		$resp=$this->db->consulta($query);
	}
	
	///funcion para objeter datos de un usuario
	public function buscarmovimiento()
	{
		$query="SELECT * FROM movimiento WHERE idmovimiento=".$this->idmovimiento;

		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	public function VerificarRelacionmovimiento()
	{
		$query="SELECT * FROM movimiento_deporte WHERE idmovimiento=".$this->idmovimiento;
		$resp=$this->db->consulta($query);
		//echo $total;
		return $resp;
	}

	public function BorrarMovimiento()
	{
		$sql="DELETE FROM movimiento WHERE idmovimiento='$this->idmovimiento'";

		$resp = $this->db->consulta($sql);
		return $resp;
	}
	


	

}

?>