<?php
class Categoriaspaquete
{
	
	public $db;
	
	public $idcategoria;
	public $nombre;
	public $depende;
	public $empresa;
	public $orden;
	public $estatus;
	
	//validacione de tipo de usuario
	
	public $tipo_usuario;
	public $lista_empresas;
	

		public function obtenerTodas()
	{
		
		
		
		$sql = "SELECT C.* FROM categoriapaquete C";

	
		$resp = $this->db->consulta($sql);
		return $resp;
	}
	
		public function obtenerEmpresas()
	{
		if($this->tipo_usuario != 0)
		{
		   $SQLidempresas = "and idempresas IN ($this->lista_empresas)";
		}else
		{
		   $SQLidempresas = "";
		}
		
		
		
		$sql = "SELECT * FROM empresas where estatus=1 $SQLidempresas";
		$resp = $this->db->consulta($sql);
		return $resp;
	}
	
		//Funcion que nos regresa los registros de la tabla empresas según el filtro
	public function obtenerFiltro()
	{
		
		
		$sql = "SELECT C.* FROM categoriapaquete C ";
		/*$sql .= ($this->nombre != '')? " AND C.categoria LIKE '%$this->nombre%'":"";
		$sql .= ($this->idcategoria != '')? " AND C.idcategorias = '$this->idcategoria'":"";*/


		$resp = $this->db->consulta($sql);
		return $resp;
	}
	public function obtenerCategorias()
	{
		
		/* if($this->tipo_usuario != 0)
		{
		   $SQLidempresas = "and E.idempresas IN ($this->lista_empresas)";
		}else
		{
		   $SQLidempresas = "";
		}	*/
		$sql = "SELECT C.* FROM categorias C ";
		
		
		$resp = $this->db->consulta($sql);
		return $resp;
	}
	
	public function NombreCategoria($id){
		$nombre="";
		if($id==0){
			$nombre= "No Asignado";
		}
		else {
			$sql ="select * from categorias where idcategorias='$id'";
			
			$result=$this->db->consulta($sql);
			$result_row=$this->db->fetch_assoc($result);
			$nombre=$result_row['categoria'];
		}
		
		return $nombre;
	}


	
	//Funcion que sirve para obtener un registro especifico de la tabla empresas
	public function buscarCategoria()
	{
		$sql = "SELECT * FROM categoriapaquete WHERE idcategoriapaquete = '$this->idcategoria'";
		$resp = $this->db->consulta($sql);
		return $resp;
	}

	//Funcion que sirve para obtener un registro especifico de la tabla empresas
	public function buscarCategoriaporempresa()
	{
		$sql = "SELECT * FROM categoriapaquete";
		$resp = $this->db->consulta($sql);
		return $resp;
	}

	//Funcion que guarda un registro en la tabla empresas
	public function guardarCategoria()
	{
		$sql = "INSERT INTO categoriapaquete (nombre,orden,estatus,iddepende) VALUES ('$this->nombre','$this->orden','$this->estatus','$this->depende')";
		
		$resp = $this->db->consulta($sql);
		$this->idcategoria = $this->db->id_ultimo();
	}
	
	//Funcion que sirve para modificar un registro en la tabla empresas
	public function modificarCategoria(){
		$sql = "UPDATE categoriapaquete SET 
		nombre = '$this->nombre', 
		orden='$this->orden',
		estatus='$this->estatus',
		iddepende='$this->depende'
		 WHERE idcategoriapaquete = '$this->idcategoria'";
		$this->db->consulta($sql);
	}

	public function VerificarRelacionCategoria()
	{
		$sql="SELECT *FROM sucursal WHERE idcategorias='$this->idcategoria'";


		$resp = $this->db->consulta($sql);
		return $resp;
	}


	public function ObtenerImagenesCategorias()
	{
		$sql="SELECT *FROM categoriasimagenes WHERE idcategorias=".$this->idcategoria."";

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

	public function ObtenerUltimoOrdencategoria()
	{
		$query="SELECT MAX(orden) as ordenar FROM categoriapaquete";		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	public function BorrarCategoria()
	{
		
		$query="DELETE FROM categoriapaquete WHERE idcategoriapaquete=".$this->idcategoria."";	
		$resp=$this->db->consulta($query);
		return $resp;
	}

	public function ObtenerPaquetesCategorias($value='')
	{
		
		$sql="SELECT *FROM paquetes WHERE idcategorias=".$this->idcategoria." AND estatus=1 AND promocion=0";

	

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