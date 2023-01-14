<?php
class Categoriasproductos
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
		
		
		
		$sql = "SELECT C.* FROM categoriaproducto C";

	
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
		
		
		$sql = "SELECT C.* FROM categorias C ";
		
		/*$sql .= ($this->nombre != '')? " AND C.categoria LIKE '%$this->nombre%'":"";
		$sql .= ($this->idcategoria != '')? " AND C.idcategoriaproducto = '$this->idcategoria'":"";*/


		$resp = $this->db->consulta($sql);
		return $resp;
	}
	public function obtenerCategorias()
	{
		
		$sql = "SELECT C.* FROM categoriaproducto C ";
		
		
		$resp = $this->db->consulta($sql);
		return $resp;
	}
	
	public function NombreCategoria($id){
		$nombre="";
		if($id==0){
			$nombre= "No Asignado";
		}
		else {
			$sql ="select * from categoriaproducto where idcategoriaproducto='$id'";
			
			$result=$this->db->consulta($sql);
			$result_row=$this->db->fetch_assoc($result);
			$nombre=$result_row['categoria'];
		}
		
		return $nombre;
	}


	
	//Funcion que sirve para obtener un registro especifico de la tabla empresas
	public function buscarCategoria()
	{
		$sql = "SELECT * FROM categoriaproducto WHERE idcategoriaproducto = '$this->idcategoria'";
		$resp = $this->db->consulta($sql);
		return $resp;
	}

	//Funcion que sirve para obtener un registro especifico de la tabla empresas
	public function buscarCategoriaporempresa()
	{
		$sql = "SELECT * FROM categoriaproducto";
		$resp = $this->db->consulta($sql);
		return $resp;
	}

	//Funcion que guarda un registro en la tabla empresas
	public function guardarCategoria()
	{
		$sql = "INSERT INTO categoriaproducto (categoria,depende,orden,estatus) VALUES ('$this->nombre','$this->depende','$this->orden','$this->estatus');";
		
		$resp = $this->db->consulta($sql);
		$this->idcategoria = $this->db->id_ultimo();
	}
	
	//Funcion que sirve para modificar un registro en la tabla empresas
	public function modificarCategoria(){
		$sql = "UPDATE categoriaproducto SET 
		categoria = '$this->nombre', 
		depende = '$this->depende',
		orden='$this->orden',
		estatus='$this->estatus'
		 WHERE idcategoriaproducto = '$this->idcategoria'";
		$this->db->consulta($sql);
	}

	public function VerificarRelacionCategoria()
	{
		$sql="SELECT *FROM productos WHERE idcategoriaproducto='$this->idcategoria'";


		$resp = $this->db->consulta($sql);
		return $resp;
	}


	public function ObtenerImagenescategoriaproducto()
	{
		$sql="SELECT *FROM categoriaproductoimagenes WHERE idcategoriaproducto=".$this->idcategoria."";

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
		$query="SELECT MAX(orden) as ordenar FROM categoriaproducto";		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	public function BorrarCategoria()
	{
		
		$query="DELETE FROM categoriaproducto WHERE idcategoriaproducto=".$this->idcategoria."";	
		$resp=$this->db->consulta($query);
		return $resp;
	}

}
?>