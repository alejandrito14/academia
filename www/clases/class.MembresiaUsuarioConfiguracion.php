<?php 
/**
 * 
 */
class MembresiaUsuarioConfiguracion
{
	public $idusuarios;
	public $idmembresia;
	public $fecha;
	public $numerodias;
	public $repetir;
	public $fechacreacion;
	public $db;


	public function GuardarMembresiaUsuarioConfiguracion()
	{ 
		$sql="INSERT INTO usuario_membresia_configuracion(idusuarios, idmembresia, fecha, numerodias, repetir) VALUES ( '$this->idusuarios','$this->idmembresia','$this->fecha', '$this->numerodias', '$this->repetir')";

		$resp=$this->db->consulta($sql);

	}
	

}

?>