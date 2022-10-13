<?php 

class Invitacion 
	{
		public $db; //objeto de conecxion con la base de datos
		public $idusuarioinvitado;
		public $idusuarioinvita;
		public $idservicio;
		public function ObtenerInvitado()
		{
			$sql = "SELECT *FROM invitacion WHERE idusuarioinvitado='$this->idusuarioinvitado' AND idservicio='$this->idservicio'";

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
		
	



	public function EliminarInvitacion()
	{
		$sql = "DELETE FROM invitacion WHERE idusuarioinvitado='$this->idusuarioinvitado' AND idservicio='$this->idservicio'";

			$resp = $this->db->consulta($sql);
	}


	public function GuardarInvitacion()
	{
		$sql="INSERT INTO invitacion( idusuarioinvitado, idusuarioinvita, idservicio,estatus) VALUES ('$this->idusuarioinvitado','$this->idusuarioinvita', '$this->idservicio',0)";

			$resp = $this->db->consulta($sql);

	}

	public function ActualizarInvitacion()
	{
		$sql = "UPDATE invitacion 
		SET estatus=1 WHERE 
		idusuarioinvitado='$this->idusuarioinvitado' AND idservicio='$this->idservicio'";

		$resp = $this->db->consulta($sql);
	}

	public function ObtenerInvitaciones()
	{
		$sql = "SELECT *FROM invitacion
			INNER JOIN usuarios ON usuarios.idusuarios=invitacion.idusuarioinvitado
		 WHERE idusuarioinvita='$this->idusuarioinvita' AND idservicio='$this->idservicio'";

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