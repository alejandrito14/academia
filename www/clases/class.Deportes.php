<?php

class Deportes

{

	public $db;//objeto de la clase de conexcion

	

	public $iddeporte;
	public $nombre;
	public $estatus;
	public $idnivel;
	
	//Funcion para obtener todos los Deportes activos
	public function ObtDeportesActivos()
	{
		$sql = "SELECT * FROM deporte WHERE estatus = 1";
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

	public function ObtenerTodosDeportes()
	{
		$query="SELECT * FROM deporte ";
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	
	
	public function ObtenerDeportes()
	{
		$query="SELECT * FROM deporte WHERE estatus=1";
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	//funcion para guardar los paises 
	
	public function Guardardeporte()
	{
		$query="INSERT INTO deporte (deporte,estatus) VALUES ('$this->nombre','$this->estatus')";
		
		$resp=$this->db->consulta($query);
		$this->iddeporte = $this->db->id_ultimo();
		
		
	}
	//funcion para modificar los usuarios
	public function Modificardeporte()
	{
		$query="UPDATE deporte SET 
		deporte='$this->nombre',
		estatus='$this->estatus'
		WHERE iddeporte=$this->iddeporte";

		$resp=$this->db->consulta($query);
	}
	
	///funcion para objeter datos de un usuario
	public function buscardeporte()
	{
		$query="SELECT * FROM deporte WHERE iddeporte=".$this->iddeporte;

		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	public function VerificarRelaciondeporte()
	{
		$query="SELECT * FROM usuarios WHERE iddeporte=".$this->iddeporte;
		$resp=$this->db->consulta($query);
		//echo $total;
		return $resp;
	}

	public function BorrarDeporte()
	{
		$sql="DELETE FROM deporte WHERE iddeporte='$this->iddeporte'";

		$resp = $this->db->consulta($sql);
		return $resp;
	}
	
	public function GuardarNivelDeporte()
	{
		$query="INSERT INTO nivel_deporte (idnivel,iddeporte) VALUES ('$this->idnivel','$this->iddeporte')";
		$resp=$this->db->consulta($query);
	}
	public function EliminarNiveldeporte()
	{
		$sql="DELETE FROM nivel_deporte WHERE iddeporte='$this->iddeporte'";

		$resp = $this->db->consulta($sql);
		return $resp;
	}

	public function ObtenernivelesDeporte()
	{
		$sql="SELECT * FROM nivel_deporte INNER JOIN nivel ON nivel_deporte.idnivel=nivel.idnivel WHERE iddeporte=".$this->iddeporte;
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

	public function BorrarNivelDeporte()
	{
		$sql="DELETE  FROM nivel_deporte WHERE iddeporte=".$this->iddeporte;
		$resp=$this->db->consulta($sql);
	}


}

?>