<?php

class Clasificacion

{

	public $db;//objeto de la clase de conexcion

	

	public $idclasificacion;
	public $nombre;
	public $estatus;
	
	
	//Funcion para obtener todos los niveles activos
	public function ObtprecioActivos()
	{
		$sql = "SELECT * FROM precio WHERE estatus = 1";
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


	public function ObtenerTodosclasificacion()
	{
		$sql = "SELECT * FROM clasificacion";

		$resp=$this->db->consulta($sql);
		
		return $resp;
	}
	

	public function buscarClasificacion()
	{
		$sql = "SELECT * FROM clasificacion WHERE idclasificacion='$this->idclasificacion'";
	
		$resp=$this->db->consulta($sql);
		
		return $resp;
	}


	public function Guardarclasificacion()
	{
		$query="INSERT INTO clasificacion (nombre,estatus) VALUES ('$this->nombre','$this->estatus')";
		
		$resp=$this->db->consulta($query);
		$this->idespacio = $this->db->id_ultimo();
		
		
	}
	//funcion para modificar los usuarios
	public function Modificarclasificacion()
	{
		$query="UPDATE clasificacion SET nombre='$this->nombre',
		estatus='$this->estatus'
		 WHERE idclasificacion=$this->idclasificacion";
	
		$resp=$this->db->consulta($query);
	}

	public function ObtenerListado()
	{
		$sql = "SELECT * FROM clasificacion WHERE estatus = 1";

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

	public function VerificarRelacionclasificacion(){

		$sql = "SELECT * FROM categoriasservicio WHERE idclasificacion='$this->idclasificacion'";
	
		$resp=$this->db->consulta($sql);
		
		return $resp;
	}
	public function Borrarclasificacion(){
			$sql="
		DELETE FROM clasificacion
		 WHERE `idclasificacion` = $this->idclasificacion
		";

	
		$resp=$this->db->consulta($sql);
	}

	

}

?>