<?php
class Sala
{
	public $db;
	public $idsalachat;
	public $nombre;
	public $estatus;
	public $idusuario;
	public $idservicio;
	public function GuardarSala()
	{
		$query="INSERT INTO salachat (nombresala,estatus,idusuario,idservicio) VALUES ('$this->nombre','1','$this->idusuario','$this->idservicio');";

		$resp=$this->db->consulta($query);
		$this->idsalachat=$this->db->id_ultimo();
	}

	public function AsignarUsuarioSala()
	{
		$query="INSERT INTO usuarios_sala (idusuarios,idsalachat) VALUES ('$this->idusuario','$this->idsalachat');";
		
		$resp=$this->db->consulta($query);
	}

	public function Obtenerusuariossala()
	{
		$sql="SELECT *FROM usuarios_sala WHERE idsalachat='$this->idsalachat' ";

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

	public function BuscarSalasServicio()
	{
		$sql="SELECT *FROM salachat WHERE idservicio='$this->idservicio' ";
		
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


	public function ObtenerAgrupadousuariossala()
	{
		$sql="SELECT GROUP_CONCAT(idusuarios) as usuariossala FROM usuarios_sala WHERE idsalachat='$this->idsalachat' ";
		
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


	public function ObtenerSalasServicio()
	{
		$sql="SELECT  * FROM salachat WHERE idservicio='$this->idservicio' ";
		
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

	public function ObtenerMensajes()
	{
		

		$sql="
			SELECT
			chat.idchat,
			chat.mensaje,
			chat.imagen,
			chat.conimagen,
			chat.fecha,
			chat.idsalachat,
			chat.idusuarioenvio,
			usuarios_alias1.nombre,
			usuarios_alias1.paterno,
			usuarios_alias1.usuario,
			usuarios_alias1.foto,
			usuarios_alias1.sexo
			FROM
			chat
		
			JOIN usuarios AS usuarios_alias1
			ON chat.idusuarioenvio = usuarios_alias1.idusuarios
			
			
			WHERE
			chat.idsalachat='$this->idsalachat' 
			ORDER BY idchat  

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


	public function ObtenerOtrosUsuariosSala()
	{
		$sql="SELECT  
			usuarios_sala.idusuarios_sala,
			usuarios_sala.idusuarios,
			usuarios_sala.idsalachat,
			usuarios.nombre,
			usuarios.paterno,
			usuarios.materno,
			usuarios.celular,
			usuarios.email,
			usuarios.usuario,
			usuarios.sexo,
			usuarios.alias
		FROM usuarios_sala INNER JOIN usuarios ON usuarios_sala.idusuarios=usuarios.idusuarios WHERE idsalachat='$this->idsalachat' AND usuarios_sala.idusuarios NOT IN($this->idusuario) ";

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

	public function ObtenerSala()
	{
		$sql="SELECT *FROM salachat WHERE  idsalachat='$this->idsalachat' ";
		
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


	public function ObtenerSalasUsuario()
	{
		$sql="SELECT *FROM usuarios_sala WHERE  idusuarios='$this->idusuario' ";

		
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