<?php

class Zonas

{

	public $db;//objeto de la clase de conexcion

	

	public $idzona;
	public $nombre;
	public $estatus;
	public $dia;
	public $horainiciosemana;
	public $horafinsemana;
	public $color;
	
	//Funcion para obtener todos los Zonas activos
	public function ObtZonasActivos()
	{
		$sql = "SELECT * FROM zonas WHERE estatus = 1";
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

	public function ObtZonasActivosConcat()
	{
		$sql = "SELECT GROUP_CONCAT(idzona) as idzonas FROM zonas WHERE estatus = 1";
		
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
	

	public function ObtenerTodosZonas()
	{
		$query="SELECT * FROM zonas ";
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	
	
	public function ObtenerZonas()
	{
		$query="SELECT * FROM zonas WHERE estatus=1";
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	//funcion para guardar los paises 
	
	public function Guardarzona()
	{
		$query="INSERT INTO zonas (nombre,estatus,color) VALUES ('$this->nombre','$this->estatus','$this->color')";
		
		$resp=$this->db->consulta($query);
		$this->idzonas = $this->db->id_ultimo();
		
		
	}
	//funcion para modificar los usuarios
	public function Modificarzona()
	{
		$query="UPDATE zonas SET nombre='$this->nombre',
		estatus='$this->estatus',
		color='$this->color'
		WHERE idzona=$this->idzona";

		$resp=$this->db->consulta($query);
	}
	
	///funcion para objeter datos de un usuario
	public function buscarzona()
	{
		$query="SELECT * FROM zonas WHERE idzona=".$this->idzona;

		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

		public function GuardarHorarioSemana()
	{
		$query = "INSERT INTO horarioszona (idzona,dia,horainicial,horafinal) VALUES ('$this->idzona','$this->dia','$this->horainiciosemana','$this->horafinsemana');";

		$this->db->consulta($query);

	}

	public function EliminarHorarioSemana()
	{
		$sql="DELETE FROM horarioszona WHERE idzona='$this->idzona'";
		
		$resp = $this->db->consulta($sql);
		return $resp;
	}



	public function ObtenerHorariosSemanaZona()
	{
		$sql="SELECT *FROM horarioszona WHERE idzona=".$this->idzona."";
		
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


	public function ObtenerZona()
	{
		$query="SELECT * FROM zonas WHERE idzona=".$this->idzona;

		
		$resp=$this->db->consulta($query);
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


	public function VerificarRelacionclasificacion()
	{
		$query="SELECT * FROM servicios_zonas WHERE idzona=".$this->idzona;

		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	public function Borrarzona()
	{
		$sql="DELETE FROM zonas WHERE idzona='$this->idzona'";
		
		$resp = $this->db->consulta($sql);
		return $resp;
	}

	public function ObtZonasActivosOrdenadas()
	{
		$sql = "SELECT * FROM zonas WHERE estatus = 1 ORDER BY idzona";
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
	

}

?>