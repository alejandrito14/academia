<?php 
/**
 * 
 */
class Publicidad
{
	public $db;
	
	public $valor;
	public $idpublicidad;
	public $titulo;
	public $descripcion;
	public $orden;
	public $estatus;
	public $imagen;
	public function ObtenerTodosPublicidad()
	{
		$query = "SELECT *
			FROM 
			publicidad";
			
		$result = $this->db->consulta($query);
		return $result;
	}

	public function buscarpublicidad()
	{
		$query = "SELECT *
			FROM 
			publicidad WHERE idpublicidad=".$this->idpublicidad."";
			
		$result = $this->db->consulta($query);
		return $result;
	}

	public function ActualizarMostrarpublicidad()
	{
		$query="UPDATE pagina_configuracion SET 
		mostrarpublicidad='$this->valor'
		WHERE idpagina_configuracion = 1";

		$result = $this->db->consulta($query);
	}
	
	public function ObtenerUltimoOrdenpublicidad()
	{
		$query="SELECT MAX(orden) as ordenar FROM publicidad";		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	public function guardarpublicidad($value='')
	{
		$query="INSERT INTO publicidad (titulo,estatus,orden) VALUES ('$this->titulo','$this->estatus','$this->orden')";
		
		$resp=$this->db->consulta($query);
		$this->idpublicidad = $this->db->id_ultimo();
		
	}

	public function modificarpublicidad($value='')
	{
			$query="UPDATE publicidad
			 SET titulo='$this->titulo',
		     estatus='$this->estatus',
		     orden='$this->orden'
		   	WHERE idpublicidad=$this->idpublicidad";

		$resp=$this->db->consulta($query);
	}



}

 ?>