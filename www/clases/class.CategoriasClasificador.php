<?php
class CategoriasClasificador
{
	
	public $db;
	
	public $idclasificadorgasto;
	public $nombre;
	public $depende;
	public $estatus;
	public $orden;
	public $idcuenta;


	public function ObtenerCategoriasClasificador()
	{
		$sql = "SELECT clasificadorgastos.*,cuenta.nombre as nombredepende,cuenta.idcuenta FROM clasificadorgastos
			LEFT JOIN cuenta on cuenta.idcuenta=clasificadorgastos.depende
		";

		$resp = $this->db->consulta($sql);
		return $resp;
	}

	public function buscar_categoriaclasificador($value='')
	{
		$sql = "SELECT * FROM clasificadorgastos WHERE idclasificadorgastos='$this->idclasificadorgasto'";
	
		$resp = $this->db->consulta($sql);
		return $resp;
	}


	public function ObtenerUltimoOrdencategoria($value='')
	{
		$query="SELECT MAX(orden) as ordenar FROM clasificadorgastos";		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}


	public function obtenerTodas()
	{
		$sql = "SELECT C.* FROM clasificadorgastos C";

		$resp = $this->db->consulta($sql);
		return $resp;
	}

	public function GuardarCategoriaClasificador($value='')
	{
		$sql="INSERT INTO clasificadorgastos( nombre, depende, estatus, orden) VALUES ( '$this->nombre', '$this->depende','$this->estatus', '$this->orden')";

		$resp = $this->db->consulta($sql);

	}

	public function ModificarCategoriaClasificador($value='')
	{
		$sql="UPDATE clasificadorgastos SET nombre = '$this->nombre', depende = '$this->depende', estatus = '$this->estatus', orden = '$this->orden' WHERE idclasificadorgastos='$this->idclasificadorgasto'";

		$resp = $this->db->consulta($sql);

	}

	public function ObtenerCategoriasClasificadortodas()
	{
		$sql = "SELECT clasificadorgastos.*,cuenta.nombre as nombredepende,cuenta.idcuenta FROM clasificadorgastos
			LEFT JOIN cuenta on cuenta.idcuenta=clasificadorgastos.depende WHERE idcuenta='$this->idcuenta'
		";

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


	public function BuscarCuentaClasificador()
	{
		$sql = "SELECT clasificadorgastos.*,cuenta.nombre as nombredepende,cuenta.idcuenta FROM clasificadorgastos
			LEFT JOIN cuenta on cuenta.idcuenta=clasificadorgastos.depende WHERE idclasificadorgastos='$this->idclasificadorgasto'
		";
		
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



	public function Borrarclasificacion()
	{
		$sql="DELETE FROM clasificadorgastos WHERE idclasificadorgastos='$this->idclasificadorgasto'";
		$resp = $this->db->consulta($sql);

	}

	public function VerificarRelacionclasificacion($value='')
	{
		$sql = "SELECT * FROM movimiento WHERE idclasificadorgastos='$this->idclasificadorgasto'";

		$resp = $this->db->consulta($sql);
		return $resp;
	}
}
