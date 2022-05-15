<?php
class CodigoPostal
{

	
	public $db;
	public $codigopostal;
	public $clavemunicipio;
	public $claveestado;
	public $idestado;
	public $idmunicipio;
	
	public function Obtenercodigopostal()
	{
		$sql = "SELECT * FROM codigopostal WHERE codigo =".$this->codigopostal." ";
		

		$result = $this->db->consulta($sql);
		return $result;	
		
	}


	public function ObtenerEstadoMunicipio()
	{
		$sql="SELECT *from (SELECT municipios.id as idmunicipio,municipios.estado_id,municipios.clave as clavemunicipio,municipios.nombre,
		municipios.web,estados.id as estadosid,estados.clave as claveestado,estados.nombre as nombreestado,estados.idpais
		FROM municipios INNER JOIN estados WHERE estados.id=municipios.estado_id )as consulta
		WHERE clavemunicipio='$this->clavemunicipio' and claveestado='$this->claveestado' ";

		

		$result=$this->db->consulta($sql);
		return $result;
	}


	public function obtenerClaveestado()
	{
		$sql = "SELECT * FROM estados WHERE id =".$this->idestado." ";
	
		
		$result = $this->db->consulta($sql);
		return $result;	
	}


	public function obtenerClavemunicipio()
	{
		$sql = "SELECT * FROM municipios WHERE id =".$this->idmunicipio." ";
		

		$result = $this->db->consulta($sql);
		return $result;	
	}

	public function Obtenercodigospostalesclave($idestado,$idmunicipio)
	{

		$sql = "SELECT * FROM codigopostal WHERE c_estado=".$idestado." AND c_municipio=".$idmunicipio."";

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



	public function ObtenerColonias($codigo,$cestado,$cmunicipio,$asenta)
	{

		$sql = "SELECT  * from codigopostal WHERE codigo=".$codigo." AND  c_estado=".$cestado." AND c_municipio=".$cmunicipio." GROUP BY  tipo_asenta";

	
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

	public function ObtenerColonias2($codigo,$cestado,$cmunicipio,$asenta)
	{
		$sql = "SELECT  * from codigopostal WHERE codigo=".$codigo." AND  c_estado=".$cestado." AND c_municipio=".$cmunicipio." ORDER BY tipo_asenta,asenta";

	
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