<?php 
/**
 * 
 */
class Integrantes 
{
	public $db;
	public $idintegrante;
	public $numero;
	public $idusuarios;
	public $idjuego;
	public $idgrupo;

	public function GuardarIntegrante()
	{
		$sql="INSERT INTO integrante(numero, idusuarios,idjuego) VALUES ('$this->numero','$this->idusuarios','$this->idjuego')";
		
		$resp=$this->db->consulta($sql);

	}

	public function ActualizarGrupoIntegrante()
	{
		$sql="UPDATE integrante SET idgrupo = '$this->idgrupo' WHERE idjuego='$this->idjuego' AND idusuarios='$this->idusuarios'";
		
		$resp=$this->db->consulta($sql);
	}
}

 ?>