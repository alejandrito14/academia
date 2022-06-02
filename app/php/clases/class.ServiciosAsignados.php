<?php
class ServiciosAsignados
{
	public $db;
	public $idservicio;
	public $idusuario;
	public $idusuarios_servicios;
	

	public function obtenerServiciosAsignados()
	{
		$sql="SELECT *FROM usuarios_servicios INNER JOIN 
		servicios ON usuarios_servicios.idservicio=servicios.idservicio WHERE idusuarios='$this->idusuario'
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


	public function ObtenerHorariosServicio()
	{
		$sql="SELECT *FROM horariosservicio INNER JOIN zonas ON horariosservicio.idzona=zonas.idzona WHERE idservicio='$this->idservicio'
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


	public function buscarUsuarioServicio()
	{
		$sql="SELECT *FROM usuarios_servicios INNER JOIN 
		servicios ON usuarios_servicios.idservicio=servicios.idservicio WHERE idusuarios='$this->idusuario'
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

	public function ObtenerServicioAsignado()
	{
		$sql="SELECT *FROM usuarios_servicios INNER JOIN 
		servicios ON usuarios_servicios.idservicio=servicios.idservicio WHERE idusuarios_servicios='$this->idusuarios_servicios'
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

	public function GuardarAceptacion()
	{
		$sql="
		UPDATE usuarios_servicios 
		SET aceptarterminos = 1, 
		fechaaceptacion = '".date('Y-m-d H:i:s')."'
		WHERE idusuarios_servicios = '$this->idusuarios_servicios'";
		$resp=$this->db->consulta($sql);

	}

}