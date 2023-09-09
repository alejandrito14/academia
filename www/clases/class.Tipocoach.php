<?php

class Tipocoach

{

	public $db;//objeto de la clase de conexcion

	

	public $idtipocoach;
	public $nombre;
	public $tipocomision;
	public $monto;
	public $costo;

	public $estatus;
	
	
	//Funcion para obtener todos los tipocoaches activos
	public function ObttipocoachesActivos()
	{
		$sql = "SELECT * FROM tipocoach WHERE estatus = 1";
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

	public function ObtenerTodostipocoaches()
	{
		$query="SELECT * FROM tipocoach ";
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	
	
	public function Obtenertipocoaches()
	{
		$query="SELECT * FROM tipocoach WHERE estatus=1";
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	//funcion para guardar los paises 
	
	public function Guardartipocoach()
	{
		$query="INSERT INTO tipocoach (tipocoach,estatus) VALUES ('$this->nombre','$this->estatus')";
		
		$resp=$this->db->consulta($query);
		$this->idtipocoach = $this->db->id_ultimo();
		
		
	}
	//funcion para modificar los usuarios
	public function Modificartipocoach()
	{
		$query="UPDATE tipocoach SET tipocoach='$this->nombre',
		estatus='$this->estatus'
		WHERE idtipocoach=$this->idtipocoach";

		$resp=$this->db->consulta($query);
	}
	
	///funcion para objeter datos de un usuario
	public function buscartipocoach()
	{
		$query="SELECT * FROM tipocoach WHERE idtipocoach=".$this->idtipocoach;

		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	public function VerificarRelaciontipocoach()
	{
		$query="SELECT * FROM tipocoach_deporte WHERE idtipocoach=".$this->idtipocoach;
		$resp=$this->db->consulta($query);
		//echo $total;
		return $resp;
	}

	public function Borrartipocoach()
	{
		$sql="DELETE FROM tipocoach WHERE idtipocoach='$this->idtipocoach'";

		$resp = $this->db->consulta($sql);
		return $resp;
	}
	

	public function Obtenertipocoach()
	{
		$query="SELECT * FROM tipocoach WHERE idtipocoach=".$this->idtipocoach;

		
		$resp = $this->db->consulta($query);
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

	

}

?>