<?php
class CategoriaPaquete
{
	
	public $db;
	
	public $idcategoriapaquete;
	public $nombre;
	public $iddepende;
	public $empresa;
	public $orden;
	public $estatus;
	public $foto;
	
	//validacione de tipo de usuario
	
	public $tipo_usuario;
	public $lista_empresas;
	


	public function ObtenerCategorias()
	{
		$sql="SELECT c1.idcategoriapaquete, c1.nombre, c1.foto, c1.iddepende, c2.nombre AS nombre_padre FROM categoriapaquete c1
LEFT JOIN categoriapaquete c2 ON c1.iddepende = c2.idcategoriapaquete  ";

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