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
	public $fechaexpiracion;

	public function GuardarMembresiaUsuarioConfiguracion()
	{ 
		$sql="INSERT INTO usuario_membresia_configuracion(idusuarios, idmembresia, fecha, numerodias, repetir) VALUES ( '$this->idusuarios','$this->idmembresia','$this->fecha', '$this->numerodias', '$this->repetir')";

		$resp=$this->db->consulta($sql);

	}

	public function ObtenerConfiguracionMembresia()
	{
		$sql="SELECT *FROM usuario_membresia_configuracion WHERE idusuarios='$this->idusuarios' AND idmembresia='$this->idmembresia' AND fecha >'$this->fechaexpiracion' ORDER BY fecha ASC ";
		
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