<?php

class TipoCoach

{

	public $db;//objeto de la clase de conexcion

	

	public $idtipocoach;
	public $nombre;
	public $tipocomision;
	public $monto;
	public $costo;

	public $estatus;
	public $idcoach;
	
	
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
		$query="INSERT INTO tipocoach (nombre,estatus,tipocomision,monto,costo) VALUES ('$this->nombre','$this->estatus','$this->tipocomision','$this->monto','$this->costo')";


		
		$resp=$this->db->consulta($query);
		$this->idtipocoach = $this->db->id_ultimo();
		
		
	}
	//funcion para modificar los usuarios
	public function Modificartipocoach()
	{
		$query="UPDATE tipocoach SET 
		nombre='$this->nombre',
		estatus='$this->estatus',
		tipocomision='$this->tipocomision',
		monto='$this->monto',
		costo='$this->costo'
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

	public function ObtenerTipoMontoCoach()
	{
		try {
			$query="SELECT
			usuarios.idusuarios,
			usuarios.nombre,
			usuarios.paterno,
			usuarios.materno,
			tipocoach.idtipocoach,
			tipocoach.tipocomision as tipopago,
			tipocoach.monto,
			tipocoach.costo
			FROM
			usuarios
			LEFT JOIN tipocoach
			ON usuarios.idtipocoach = tipocoach.idtipocoach
			WHERE
			idusuarios=".$this->idcoach."";

		
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
			
		} catch (Exception $e) {
			echo $e;
		}

		
	}

	
	public function VerificarRelacionTipoCoach()
	{
		$query="SELECT * FROM usuarios WHERE idtipocoach=".$this->idtipocoach;
		$resp=$this->db->consulta($query);
		
		return $resp;
	}


	public function ObtenerTipoCoachCategorias()
	{
		try {
			$query="SELECT
			* FROM tipocoach
			inner JOIN tipocoachsubcategoria on tipocoachsubcategoria.idtipocoach=tipocoach.idtipocoach
			WHERE
			tipocoach.idtipocoach=".$this->idtipocoach."";

		
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
			
		} catch (Exception $e) {
			echo $e;
		}

	}
}

?>