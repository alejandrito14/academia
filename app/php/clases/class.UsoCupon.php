<?php
class UsoCupon
{
	public $db;
	public $idcupon;
	public $codigocupon;
	public $numerodeveces;
	public $idsucursal;
	public $fecha;
	public $idcliente;

	public function ObtenerUsocupon()
	{
		$sql="SELECT *FROM usocupon WHERE idcupon='".$this->idcupon."' AND codigocupon='".$this->codigocupon."'";

		

		$resp=$this->db->consulta($sql);
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


	public function GuardarUsoCupon()
	{
		$query="INSERT INTO usocupon (idcupon,codigocupon,numerodeveces) VALUES ('$this->idcupon','$this->codigocupon','$this->numerodeveces');";
		$resp=$this->db->consulta($query);
	}

	public function ActualizaUsoCupon()
	{
		$query = "UPDATE usocupon SET  
		 	numerodeveces = '$this->numerodeveces' 
		 	WHERE idcupon = '$this->idcupon' ";

		$this->db->consulta($query);
	}


	public function ObtenerUsocuponSucursal()
	{
		$sql="SELECT *FROM usocuponsucursal WHERE idcupon='".$this->idcupon."' AND codigocupon='".$this->codigocupon."'  AND idsucursal='".$this->idsucursal."'";

		$resp=$this->db->consulta($sql);
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

	public function ActualizaUsoCuponSucursal()
	{
		$query = "UPDATE usocuponsucursal SET  
		 	numerodeveces = '$this->numerodeveces' 
		 	WHERE idcupon = '$this->idcupon'  AND idsucursal='$this->idsucursal'";

		$this->db->consulta($query);
	}


	public function GuardarUsoCuponSucursal()
	{
		$query="INSERT INTO usocuponsucursal (idcupon,codigocupon,numerodeveces,idsucursal) VALUES ('$this->idcupon','$this->codigocupon','$this->numerodeveces','$this->idsucursal');";
		$resp=$this->db->consulta($query);
	}


	public function ObtenerUsocuponDia()
	{
			$sql="SELECT *FROM usocupondia WHERE idcupon='".$this->idcupon."' AND codigocupon='".$this->codigocupon."' AND fecha='$this->fecha'";


		$resp=$this->db->consulta($sql);
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

	public function ActualizaUsoCuponDia()
	{
		$query = "UPDATE usocupondia SET  
		 	numerodeveces = '$this->numerodeveces' 
		 	WHERE idcupon = '$this->idcupon'  AND fecha='$this->fecha'";

		$this->db->consulta($query);
	}

	public function GuardarUsoCuponDia()
	{
		$query="INSERT INTO usocupondia (idcupon,codigocupon,numerodeveces,fecha) VALUES ('$this->idcupon','$this->codigocupon','$this->numerodeveces','$this->fecha');";
		$resp=$this->db->consulta($query);
	}

	public function ObtenerUsocuponCliente($value='')
	{
		$sql="SELECT *FROM usocuponcliente WHERE idcupon='".$this->idcupon."' AND codigocupon='".$this->codigocupon."' AND idcliente='$this->idcliente'";


		$resp=$this->db->consulta($sql);
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

	public function ActualizaUsoCuponCliente($value='')
	{
		$query = "UPDATE usocuponcliente SET  
		 	numerodeveces = '$this->numerodeveces' 
		 	WHERE idcupon = '$this->idcupon'  AND idcliente='$this->idcliente'";

		$this->db->consulta($query);
	}

	public function GuardarUsoCuponCliente()
	{
		$query="INSERT INTO usocuponcliente (idcupon,codigocupon,numerodeveces,idcliente) VALUES ('$this->idcupon','$this->codigocupon','$this->numerodeveces','$this->idcliente');";
	
		$resp=$this->db->consulta($query);
	}



}