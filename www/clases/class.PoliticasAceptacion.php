<?php 
/**
 * 
 */
class PoliticasAceptacion 
{
	public $db;
	public $idpoliticaaceptacion;
	public $nombre;
	public $descripcion;
	public $estatus;

	public function ObtenerTodospoliticasaceptacion()
	{
		$sql="SELECT *FROM politicasaceptacion WHERE estatus=1";

		$resp=$this->db->consulta($sql);
		return $resp;
	}

	public function buscarpoliticaaceptacion()
	{
		$sql="SELECT *FROM politicasaceptacion WHERE idpoliticasaceptacion='$this->idpoliticaaceptacion'";
		
		$resp=$this->db->consulta($sql);
		return $resp;
	}

	public function Guardarpoliticasaceptacion()
	{
		$sql="INSERT INTO politicasaceptacion( nombre, descripcion, estatus) VALUES ('$this->nombre','$this->descripcion', '$this->estatus')";
		$resp=$this->db->consulta($sql);
		$this->idpoliticaaceptacion=$this->db->id_ultimo();
	}

	public function Modificarpoliticasaceptacion()
	{
		$sql="UPDATE politicasaceptacion
		 SET nombre = '$this->nombre',
		  descripcion = '$this->descripcion', 
		  estatus ='$this->estatus' WHERE 
		  idpoliticasaceptacion = '$this->idpoliticasaceptacion'";
		$resp=$this->db->consulta($sql);


	}
	
}

 ?>