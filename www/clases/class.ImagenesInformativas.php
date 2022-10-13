<?php 

/**
 * 
 */
class ImagenesInformativas 
{
	public $db;
	public $tituloimagen;
	public $imagen;
	public $estatus;
	public $idservicio;
	public $idimageninformativa;


	public function ObtenerImagenesInformativas()
	{
		
		$sql="SELECT * FROM imageninformativa WHERE
		idservicio='$this->idservicio'";
	
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

	public function GuardarImagenInformativa()
	{
		$sql="INSERT INTO imageninformativa( tituloimagen, estatus,idservicio) VALUES ( '$this->tituloimagen',1,'$this->idservicio')";

		$result = $this->db->consulta($sql);
		$this->idimageninformativa=$this->db->id_ultimo();

	}

	public function EliminarImagenInformativa()
	{
		$sql="DELETE FROM imageninformativa WHERE
		idservicio='$this->idservicio' and idimageninformativa='$this->idimageninformativa'";
		$resp=$this->db->consulta($sql);

	}
}
 ?>