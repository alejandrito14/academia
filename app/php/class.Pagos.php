<?php 
/**
 * 
 */
class Pagos 
{
	
	public $db;
	public $idusuarios;
	public $idmembresia;
	public $idservicio;
	public $tipo;
	public $monto;
	public $estatus;
	public $dividido;
	public $fechainicial;
	public $fechafinal;
	public $folio;

	public function CrearRegistroPago()
	{
		$sql="INSERT INTO pagos(idusuarios, idservicio, idmembresia, tipo, monto, estatus,fechainicial,fechafinal,pagado,folio) VALUES ( '$this->idusuarios','$this->idservicio','$this->idmembresia','$this->tipo', '$this->monto', '$this->estatus','$this->fechainicial','$this->fechafinal',0,'$this->folio')";
		echo $sql;die();
		$resp=$this->db->consulta($sql);

	}


}

 ?>