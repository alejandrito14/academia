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

	public function ObtenerCalificacion()
	{
		$sql = "SELECT *FROM calificacion WHERE idusuarios='$this->idusuario' AND idservicio='$this->idservicio' ";


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

	public function ObtenerCalificacionesServicio()
	{
		$sql = "SELECT 
			calificacion.calificacion,
			calificacion.fechacreacion,
			calificacion.estatus,
			calificacion.comentario,
			calificacion.idusuarios,
			calificacion.idservicio,
			usuarios.nombre,
			usuarios.paterno,
			usuarios.usuario,
			usuarios.alias,
			usuarios.foto,
			usuarios.materno
		FROM calificacion
			INNER JOIN usuarios ON calificacion.idusuarios = usuarios.idusuarios
		 WHERE  calificacion.idservicio='$this->idservicio' ";


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