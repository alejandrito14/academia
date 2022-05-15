<?php

class CategoriasServicios

{

	public $db;//objeto de la clase de conexcion
	public $idcategoriasservicio;
	public $nombre;
	public $estatus;
	public $tipo;
	
	
	//Funcion para obtener todos los categoriasservicio activos
	public function ObtcategoriasservicioActivos()
	{
		$sql = "SELECT * FROM categoriasservicio WHERE estatus = 1";
	
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

	public function ObtenerTodoscategoriasservicio()
	{
		$query="SELECT * FROM categoriasservicio ";
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	
	
	public function Obtenercategoriasservicio()
	{
		$query="SELECT * FROM categoriasservicio WHERE estatus=1";
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	//funcion para guardar los paises 
	
	public function Guardarcategoriasservicio()
	{
		$query="INSERT INTO categoriasservicio (nombrecategoria,estatus,tipo) VALUES ('$this->nombre','$this->estatus','$this->tipo')";
		
		$resp=$this->db->consulta($query);
		$this->idcategoriasservicio = $this->db->id_ultimo();
		
		
	}
	//funcion para modificar los usuarios
	public function Modificarcategoriasservicio()
	{
		$query="UPDATE categoriasservicio SET nombrecategoria='$this->nombre',
		estatus='$this->estatus'
		WHERE idcategoriasservicio=$this->idcategoriasservicio";

		$resp=$this->db->consulta($query);
	}
	
	///funcion para objeter datos de un usuario
	public function buscarcategoriasservicio()
	{
		$query="SELECT * FROM categoriasservicio WHERE idcategoriasservicio=".$this->idcategoriasservicio;

		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	


	

}

?>