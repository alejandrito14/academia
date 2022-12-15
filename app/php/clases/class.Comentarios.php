<?php 
/**
 * 
 */
class Comentarios 
{
	
	public $db;
	public $idcomentario;
	public $idservicio;
	public $comentario;
	public $estatus;
	public $idusuarios;

	public function ObtenerComentariosServicio()
	{	

		$sql = "SELECT *FROM comentariosusuarios
			INNER JOIN usuarios ON usuarios.idusuarios=comentariosusuarios.idusuarios
		 WHERE comentariosusuarios.estatus=1 AND idservicio='$this->idservicio' ORDER BY usuarios.idusuarios,comentariosusuarios.idcomentariosusuarios";

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



	


		public function ObtenerComentarios()
		{	

		$sql = "SELECT *FROM comentariosusuarios
			INNER JOIN servicios ON comentarios.idservicio=comentariosusuarios.idservicio
			INNER JOIN usuarios ON usuarios.idusuarios=comentariosusuarios.idusuarios
			ORDER BY idcomentariosusuarios";


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

	public function CambiarEstatusComentario()
	{
		
          $query = "UPDATE comentarios SET estatus = '$this->estatus' WHERE idcomentarios = '$this->idcomentario'";
        $this->db->consulta($query);
    
	}



	public function ObtenerComentariosVisitaAdmin()
	{	

		$sql = "SELECT 
				comentarios.idcomentarios,
				comentarios.comentario,
				comentarios.idusuarios,
				comentarios.idvisita,
				comentarios.estatus,
				comentarios.fechacreacion,
				usuarios.nombre,
				usuarios.paterno,
				usuarios.materno,
				usuarios.idusuarios AS idusuarios_0
			FROM comentarios
			INNER JOIN usuarios ON usuarios.idusuarios=comentarios.idusuarios

		 WHERE  idvisita='$this->idvisita' ORDER BY idcomentarios";


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




		public function ObtenerComentariosValidadosSucursal()
		{	

		$sql = "SELECT *FROM comentarios
			INNER JOIN visitas ON comentarios.idvisita=visitas.idvisita
			INNER JOIN sucursales ON visitas.idsucursales=sucursales.idsucursales
			INNER JOIN usuarios ON usuarios.idusuarios=comentarios.idusuarios
			WHERE sucursales.idsucursales='$this->idsucursales' AND comentarios.estatus=1
			ORDER BY idcomentarios";


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
		
	public function GuardarComentario()
	{
		$query="INSERT INTO comentariosusuarios(idusuarios, comentario,estatus,idservicio)
		VALUES ('$this->idusuarios','$this->comentario','$this->estatus','$this->idservicio')";
		
		$resp=$this->db->consulta($query);
		
		}



	public function ObtenerComentariosUsuarioServicio()
	{	

		$sql = "SELECT *FROM comentariosusuarios
			INNER JOIN usuarios ON usuarios.idusuarios=comentariosusuarios.idusuarios
		 WHERE comentariosusuarios.estatus=1 AND idservicio='$this->idservicio' AND usuarios.idusuarios='$this->idusuarios' ORDER BY idcomentariosusuarios";

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