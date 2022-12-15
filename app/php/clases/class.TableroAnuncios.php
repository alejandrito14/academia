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
	public function ObtenerTodosAnuncios()
	{
		$sql="SELECT *FROM tableroanuncios";
			if($this->estatus!=0){

			$sql.=" WHERE estatus=1";
		
			}
			$sql.=" ORDER BY orden asc";
		

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


	public function ObtenerAnuncioTablero()
	{
		
		$sql="SELECT *FROM tableroanuncios WHERE idtableroanuncio='$this->idtableroanuncio'";

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
		$query="INSERT INTO tableroanuncios (titulo,descripcion,estatus,orden) VALUES ('$this->titulo','$this->descripcion','$this->estatus','$this->orden')";
		
		$resp=$this->db->consulta($query);
		$this->idtableroanuncio = $this->db->id_ultimo();
		
	}

	public function modificarAnuncio($value='')
	{
			$query="UPDATE tableroanuncios
			 SET titulo='$this->titulo',
			 descripcion='$this->descripcion',
		     estatus='$this->estatus',
		     orden='$this->orden'
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



	public function CambiarEstatusTablero()
	{
		$query="UPDATE tableroanuncios SET 
		estatus='$this->estatus'
		 WHERE idtableroanuncio='$this->idtableroanuncio' ";

		$result = $this->db->consulta($query);
	}

	public function ObtenerImagenesTablero()
	{
		$sql="SELECT * FROM imagentablero WHERE
		idtableroanuncio='$this->idtableroanuncio'";
	
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

}

 ?>