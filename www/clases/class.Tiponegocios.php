<?php
class Tiponegocios
{
	
	public $db;
	
	public $idtiponegocio;
	public $nombre;
	public $depende;
	public $empresa;
	public $orden;
	public $estatus;
	public $horarios;
	public $zonas;
	public $participantes;
	public $cantidadparticipantes;
	public $coachs;
	public $numerodias;

	public $habilitarcostos;
	public $habilitarmodalidad;
	public $habilitarcampototalclases;
	public $habilitarcampopreciounitario;
	public $habilitarcampomontoparticipante;
	public $habilitarcampomontogrupo;
	public $habilitarmodalidadpago;
	public $habilitaravanzado;
	public $activartiponegocio;
	public $activardias;
	//validacione de tipo de usuario
	
	public $tipo_usuario;
	public $lista_empresas;
	
	public $dia;
	public $horainiciosemana;
	public $horafinsemana;
	public $v_depende;
	public $tiposervicioconfiguracion;

		public function obtenerTodas()
	{
		
		
		
		$sql = "SELECT C.* FROM tiponegocio C";

	
		$resp = $this->db->consulta($sql);
		return $resp;
	}
	
	public function obtenerFiltro()
	{
		$sql="SELECT *FROM tiponegocio";
		$resp = $this->db->consulta($sql);
		return $resp;
	}

	public function ObtenerUltimoOrdentiponegocio($value='')
	{
		$query="SELECT MAX(orden) as ordenar FROM tiponegocio";		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
		// code...
	}


	public function GuardarTiponegocio()
	{
		$sql="INSERT INTO tiponegocio( nombre,orden,estatus) VALUES ( '$this->nombre','$this->orden', '$this->estatus')";

	 	$resp=$this->db->consulta($sql);
	 	$this->idtiponegocio=$this->db->id_ultimo();

	}

	public function ActualizarTiponegocio()
	{
		$sql="UPDATE tiponegocio SET nombre = '$this->nombre', orden = '$this->orden', estatus = '$this->estatus' WHERE idtiponegocio='$this->idtiponegocio'";
	 	$resp=$this->db->consulta($sql);


	}

	public function BorrarTiponegocio()
	{
		$sql="DELETE FROM tiponegocio WHERE idtiponegocio='$this->idtiponegocio'";
		$resp=$this->db->consulta($sql);

	}

	public function buscartiponegocio()
	{
		$sql = "SELECT *from tiponegocio WHERE idtiponegocio='$this->idtiponegocio'";

	
		$resp = $this->db->consulta($sql);
		return $resp;
	}


}
?>