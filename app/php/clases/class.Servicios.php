<?php
class Servicios
{
	public $db;
	public $idservicio;
	public $titulo;
	public $descripcion;
	public $estatus;
	public $categoria;


	public function ObtenerServicios()
	{
		$sql="SELECT *FROM servicios";
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

	public function ObtenerServicio($value='')
	{
		
		$sql="SELECT *FROM servicios WHERE idservicio='$this->idservicio'";

		
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

	public function ObtenerServiciosAdicionales($value='')
	{
		$sql="SELECT servicios.idservicio,servicios.titulo,servicios.descripcion,servicios.imagen FROM servicios  INNER JOIN categorias ON categorias.idcategorias=servicios.idcategoriaservicio
			 WHERE servicios.estatus=1 AND categorias.avanzado=0 ORDER BY servicios.orden asc";
		
		

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

	public function ObtenerHorariosAgrupadoServicio()
	{
		$sql="SELECT *FROM horariosservicio INNER JOIN zonas ON horariosservicio.idzona=zonas.idzona WHERE idservicio='$this->idservicio' GROUP BY dia,horainicial,horafinal ORDER BY dia asc
		 ";

		
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


	public function ObtenerParticipantes($idtipo)
	{
		$sql="SELECT *FROM usuarios INNER JOIN usuarios_servicios ON usuarios.idusuarios=usuarios_servicios.idusuarios WHERE idservicio='$this->idservicio' AND tipo='$idtipo'";

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

	public function ObtenerPeriodosPagos()
	{
		$sql="SELECT *FROM periodoservicio  WHERE idservicio='$this->idservicio'";

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