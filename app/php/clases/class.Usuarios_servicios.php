<?php 

class Usuarios_servicios 
{
	public $db;
	public $idusuarios_servicios;
	public $idusuarios;
	public $idservicio;
	public $fechacreacion;
	public $aceptarterminos;
	public $fechaaceptacion;
	public $cancelacion;
	public $motivocancelacion;
	public $estatus;
	public $fechacancelacion;

	public function obtenerDatosUsuariosServicio()
	{
		$sql="SELECT *FROM usuarios_servicios WHERE idusuarios_servicios='$this->idusuarios_servicios'";
		
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