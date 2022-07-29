<?php 

class Asistencia 
{
	public $db;
	public $idusuarios;
	public $idservicio;
	public $fecha;
	public $dia;
	public $horainicio;
	public $horafin;
	public $observacion;
	public $estatus;
	public $idusuariocoach;
	public $asistio;
	public $idasistenciahorario;

	public function GuardarAsistencia()
	{
		$sql="INSERT INTO 
			 asistenciahorario(idusuarios, idservicio, fecha, dia, horainicio, horafin, observacion, 
				idusuariocoach,asistio) 
				VALUES ('".$this->idusuarios."', 
					 '$this->idservicio', 
					 '$this->fecha',
					 '$this->dia', 
					 '$this->horainicio', 
					 '$this->horafin',
					 '$this->observacion',
					 '$this->idusuariocoach',
					'$this->asistio')";
					
			$resp=$this->db->consulta($sql);

	}

	public function ObtenerRegistroAsistencia()
	{
		$sql="
			SELECT *FROM asistenciahorario WHERE fecha='$this->fecha' AND dia='$this->dia' AND horainicio='$this->horainicio' AND horafin='$this->horafin' AND idservicio='$this->idservicio'
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



	public function ObtenerRegistroAsistenciaUsuario()
	{
		$sql="
			SELECT *FROM asistenciahorario WHERE fecha='$this->fecha' AND dia='$this->dia' AND horainicio='$this->horainicio' AND horafin='$this->horafin' AND idservicio='$this->idservicio' AND idusuarios='$this->idusuarios'
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

	public function EditarAsistencia()
	{
		$sql="UPDATE asistenciahorario
		 SET asistio = '$this->asistio',
		 fechamodificacion='".date('Y-m-d H:i:s')."' 
		 WHERE idasistenciahorario = '$this->idasistenciahorario' AND idusuarios='$this->idusuarios'";
		$resp=$this->db->consulta($sql);

	}
	
}
 ?>