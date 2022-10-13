<?php
class Espacios
{
	public $db;//objeto de la clase de conexcion
	
	public $idespacio;//
	public $nombre;
	public $lugar;
	public $ubicacion;
	public $estatus;
	public $tipo_usuario;
	public $lista_empresas;
	public function ObtenerTodosEspacios()
	{
		$query="SELECT * FROM zonas ";
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	
	
	///funcion para objeter datos de un usuario
	public function buscarEspacio()
	{
	try {
		$query="SELECT * FROM zonas WHERE idzona=".$this->idespacio;
	
		$resp=$this->db->consulta($query);
		
			return $resp;
		} catch (Exception $e) {
    		echo 'imprimir'.$this->idespacio.'Excepción capturada: ',  $e->getMessage(), "\n";
		}
		
	}
	
	
}
?>