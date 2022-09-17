<?php
class Categorias
{
	
	public $db;
	
	public $idcategoria;
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
	public $activarcategoria;
	public $activardias;
	//validacione de tipo de usuario
	
	public $tipo_usuario;
	public $lista_empresas;
	
	public $dia;
	public $horainiciosemana;
	public $horafinsemana;


	public function ObtenerCategorias()
	{
		$sql="SELECT *FROM categorias WHERE estatus=1";
		
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

	public function ObtenerCategoria()
	{
		$sql="SELECT *FROM categorias WHERE idcategorias='$this->idcategoria'";
		
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

	public function ObtenerHorariosCategoriasDia()
	{
		$sql="SELECT *FROM horariostipo WHERE idcategorias=".$this->idcategoria." GROUP BY dia";
		
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

	public function ObtenerServiciosPorCategorias($categorias)
	{
		$sql="SELECT *FROM servicios WHERE idcategoriaservicio IN('$categorias') AND estatus=1";
		
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
	

	public function ObtenerHorariosSemanaCategorias()
	{
		$sql="SELECT *FROM horariostipo WHERE idcategorias=".$this->idcategoria."";
		
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


/*
	public function ObtenerHorariosCategoriasDia()
	{
		$sql="SELECT *FROM horariostipo WHERE idcategorias=".$this->idcategoria." GROUP BY dia";
		
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
	}*/

}
?>