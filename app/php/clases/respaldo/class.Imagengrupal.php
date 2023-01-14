<?php 
/**
 * 
 */
class Imagengrupal 
{
	public $db;
	public $idimagenesgrupal;
	public $foto;
	public $descripcion;
	public $estatus;
	public $fechacreacion;
	public $idservicio;
	public $idusuario;

	public function GuardarImagen()
	{
		
		$sql="INSERT INTO imagenesgrupal(foto, estatus,idservicio) VALUES ('$this->foto',1, '$this->idservicio')";
				$resp=$this->db->consulta($sql);
		$this->idimagenesgrupal = $this->db->id_ultimo();

	}

	public function modificarImagen()
	{
			$sql="
			UPDATE imagenesgrupal SET
				 foto = '$this->foto' 
				 WHERE idimagenesgrupal = '$this->idimagenesgrupal'
		";
		$resp=$this->db->consulta($sql);
	}

	public function obtenerImagen()
	{
		$sql="SELECT *FROM imagenesgrupal  WHERE idimagenesgrupal = '$this->idimagenesgrupal' ";


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
		$sql="DELETE FROM imagenesgrupal 
				 WHERE idimagenesgrupal = '$this->idimagenesgrupal'
		";
		$resp=$this->db->consulta($sql);
	}


	public function obtenerImagenes()
	{
		$sql="SELECT *FROM imagenesgrupal ORDER BY idimagenesgrupal ";


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