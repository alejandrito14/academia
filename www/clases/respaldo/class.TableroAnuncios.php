<?php 
/**
 * 
 */
class TableroAnuncios
{
	public $db;
	
	public $valor;
	public $idtableroanuncio;
	public $titulo;
	public $descripcion;
	public $orden;
	public $estatus;
	public $imagen;
	public $url;
	public function ObtenerTodosAnuncios()
	{
		$query = "SELECT *
			FROM 
			tableroanuncios";
			
		$result = $this->db->consulta($query);
		return $result;
	}

	public function buscaranuncio()
	{
		$query = "SELECT *
			FROM 
			tableroanuncios WHERE idtableroanuncio=".$this->idtableroanuncio."";
			
		$result = $this->db->consulta($query);
		return $result;
	}

	public function ActualizarMostrarAnuncios()
	{
		$query="UPDATE pagina_configuracion SET 
		mostraranuncios='$this->valor'
		WHERE idpagina_configuracion = 1";

		$result = $this->db->consulta($query);
	}
	
	public function ObtenerUltimoOrdenanuncio()
	{
		$query="SELECT MAX(orden) as ordenar FROM tableroanuncios";		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	public function guardarAnuncio($value='')
	{
		$query="INSERT INTO tableroanuncios (titulo,descripcion,estatus,orden,url) VALUES ('$this->titulo','$this->descripcion','$this->estatus','$this->orden','$this->url')";
		
		$resp=$this->db->consulta($query);
		$this->idtableroanuncio = $this->db->id_ultimo();
		
	}

	public function modificarAnuncio($value='')
	{
			$query="UPDATE tableroanuncios
			 SET titulo='$this->titulo',
			 descripcion= '".$this->db->real_escape_string($this->descripcion)."',
		     estatus='$this->estatus',
		     orden='$this->orden',
		      url='$this->url'
		   	WHERE idtableroanuncio=$this->idtableroanuncio";
		   
		$resp=$this->db->consulta($query);
	}

	public function ActualizarMostrarOmitir($value='')
	{
		$query="UPDATE pagina_configuracion SET 
		activaromitirfinal='$this->valor'
		WHERE idpagina_configuracion = 1";

		$result = $this->db->consulta($query);
	}

	public function ActualizarActivarAnuncios($value='')
	{
		$query="UPDATE clientes SET 
		anunciovisto='$this->valor'";

		

		$result = $this->db->consulta($query);
	}

}

 ?>