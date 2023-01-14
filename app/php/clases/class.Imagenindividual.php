<?php 
/**
 * 
 */
class Imagenindividual 
{
	public $db;
	public $idimagenesindividual;
	public $foto;
	public $descripcion;
	public $estatus;
	public $fechacreacion;
	public $idservicio;
	public $idusuarioseleccionado;
	public $idusuarioenvia;

	public function GuardarImagen()
	{
		
		$sql="INSERT INTO imagenesindividual(foto, estatus,idservicio,idusuarios,idusuarioenvia) VALUES ('$this->foto',1, '$this->idservicio','$this->idusuarioseleccionado','$this->idusuarioenvia')";
		$resp=$this->db->consulta($sql);
		$this->idimagenesindividual = $this->db->id_ultimo();

	}

	public function modificarImagen()
	{
			$sql="
			UPDATE imagenesgrupal SET
				 foto = '$this->foto' 
				 WHERE idimagenesindividual = '$this->idimagenesindividual'
		";
		$resp=$this->db->consulta($sql);
	}

	public function obtenerImagen()
	{
		$sql="SELECT *FROM imagenesindividual  WHERE idimagenesindividual = '$this->idimagenesindividual' ";

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

	public function EliminarImagen()
	{
		$sql="DELETE FROM imagenesindividual 
				 WHERE idimagenesindividual = '$this->idimagenesindividual'
		";
		$resp=$this->db->consulta($sql);
	}


	public function obtenerImagenesIndividual()
	{
		$sql="SELECT *FROM imagenesindividual ORDER BY idimagenesindividual ";


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

	public function ObtenerImagenesIndividuales()
	{
		$sql="SELECT *FROM imagenesindividual WHERE idusuarios='$this->idusuarioseleccionado' AND idservicio='$this->idservicio' AND estatus=1 ";
		
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

	public function EliminarImagenIndividual()
	{
		$sql="DELETE FROM imagenesindividual 
				 WHERE idimagenesindividual = '$this->idimagenesindividual'
		";
		
		$resp=$this->db->consulta($sql);
	}

}

 ?>