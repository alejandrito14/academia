<?php 

/**
 * 
 */
class Chat
{
	public $db;
	public $idchat;
	public $idusuarioenvio;
	public $mensaje;
	public $fecha;
	public $estatus;
	public $idsalachat;
	public $conimagen;
	public $imagen;

	public $idusuario;
	public $idservicio;


	public function EnvioMensaje()
	{
		$sql="INSERT INTO chat( idusuarioenvio, mensaje, estatus, idsalachat, conimagen, imagen) VALUES ('$this->idusuarioenvio', '$this->mensaje', $this->estatus, '$this->idsalachat','$this->conimagen','$this->imagen')";
		
			$resp=$this->db->consulta($sql);
			$this->idchat=$this->db->id_ultimo();
	}


	public function DirigidoMensaje()
	{
		$sql="INSERT INTO chatdirigido(idusuarios, estatusleido, idchat) VALUES ('$this->idusuario',0, $this->idchat);";
		
			$resp=$this->db->consulta($sql);

	}

	public function BuscarChats()
	{
		$sql="SELECT
		chat.idchat,
		chat.mensaje,
		chat.fecha,
		chatdirigido.estatusleido,
		chatdirigido.idusuarios,
		chat.idsalachat,
		chat.idusuarioenvio,
		usuarios_alias1.nombre,
		usuarios_alias1.paterno,
		usuarios_alias1.usuario,
		usuarios_alias1.foto
		FROM
		chatdirigido
		JOIN chat
		ON chatdirigido.idchat = chat.idchat 
		JOIN usuarios AS usuarios_alias1
		ON chat.idusuarioenvio = usuarios_alias1.idusuarios
 		WHERE chatdirigido.idusuarios='$this->idusuario' AND chat.idsalachat='$this->idsalachat' ORDER BY idchat desc limit 1 ";

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



	public function ObtenerSalaChatServicio()
	{
		$sql="SELECT *FROM salachat
 		WHERE idservicio='$this->idservicio'
 		 LIMIT 1";

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