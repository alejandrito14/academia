<?php	
/**
 * 
 */
class ImagenesTablero 
{
	
	public $db;
	public $tituloimagen;
	public $imagen;
	public $estatus;
	public $idtableroanuncio;
	public $idimagenanuncio;


	public function ObtenerImagenesTablero()
	{
		
		$sql="SELECT * FROM imagentablero WHERE
		idtableroanuncio='$this->idtableroanuncio'";
	
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

	public function GuardarImagenTablero()
	{
		$sql="INSERT INTO imagentablero( tituloimagen, estatus,idtableroanuncio) VALUES ( '$this->tituloimagen',1,'$this->idtableroanuncio')";

		$result = $this->db->consulta($sql);
		$this->idimagentablero=$this->db->id_ultimo();

	}

	public function EliminarImagenTablero()
	{
		$sql="DELETE FROM imagentablero WHERE
		idtableroanuncio='$this->idtableroanuncio' and idimagentablero='$this->idimagentablero'";
		$resp=$this->db->consulta($sql);

	}
}
?>