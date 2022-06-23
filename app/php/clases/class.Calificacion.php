<?php
class Calificacion
{
	public $db;
	public $idcalificacion;
	public $calificacion;
	public $fechacreacion;
	public $estatus;
	public $idusuario;
	public $idservicio;
	public $comentario;

	public function GuardarCalificacion()
	{
		$sql="INSERT INTO calificacion(calificacion, estatus, comentario, idusuarios, idservicio) VALUES ('$this->calificacion',1, '$this->comentario','$this->idusuario', '$this->idservicio')";
		
		$resp=$this->db->consulta($sql);
		$this->idcalificacion=$this->db->id_ultimo();

	}

}

?>