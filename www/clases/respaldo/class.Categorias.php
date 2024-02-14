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
	public $v_depende;
	public $tiposervicioconfiguracion;

		public function obtenerTodas()
	{
		
		
		
		$sql = "SELECT C.* FROM categorias C";

	
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
		
		
		$sql = "SELECT C.*,tiposervicioconfiguracion.nombre as tiponegocio FROM categorias C 
		left join tiposervicioconfiguracion on tiposervicioconfiguracion.idtiposervicioconfiguracion=C.idtiposervicioconfiguracion
		ORDER BY orden asc ";
		
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
		$sql = "SELECT * FROM categorias WHERE idcategorias = '$this->idcategoria'";
		$resp = $this->db->consulta($sql);
		return $resp;
	}

	//Funcion que sirve para obtener un registro especifico de la tabla empresas
	public function buscarCategoriaporempresa()
	{
		$sql = "SELECT * FROM categorias";
		$resp = $this->db->consulta($sql);
		return $resp;
	}

	//Funcion que guarda un registro en la tabla empresas
	public function guardarCategoria()
	{

		$sql = "INSERT INTO categorias (titulo,orden,estatus,horarios,zonas,participantes,cantidad,coachs,numerodiassemana,configurarcostos,habilitarmodalidad,
		campototalclases,
		campopreciounitario,
		campomontoporparticipante,
		campomontoporgrupo,
		habilitarmodalidadpago,avanzado,asignarcategoria,asignardias,depende,idtiposervicioconfiguracion) VALUES ('$this->nombre','$this->orden','$this->estatus','$this->horarios','$this->zonas','$this->participantes','$this->cantidadparticipantes','$this->coachs','$this->numerodias','$this->habilitarcostos','$this->habilitarmodalidad','$this->habilitarcampototalclases','$this->habilitarcampopreciounitario','$this->habilitarcampomontoparticipante','$this->habilitarcampomontogrupo','$this->habilitarmodalidadpago','$this->habilitaravanzado','$this->activarcategoria','$this->activardias','$this->depende','$this->tiposervicioconfiguracion');";
		
		
		$resp = $this->db->consulta($sql);
		$this->idcategoria = $this->db->id_ultimo();
	}
	
	//Funcion que sirve para modificar un registro en la tabla empresas
	public function modificarCategoria(){
		$sql = "UPDATE categorias SET 
		titulo = '$this->nombre', 
		orden='$this->orden',
		estatus='$this->estatus',
		horarios='$this->horarios',
		zonas='$this->zonas',
		participantes='$this->participantes',
		cantidad='$this->cantidadparticipantes',
		coachs='$this->coachs',
		numerodiassemana='$this->numerodias',
		configurarcostos='$this->habilitarcostos',
		habilitarmodalidad='$this->habilitarmodalidad',
		campototalclases='$this->habilitarcampototalclases',
		campopreciounitario='$this->habilitarcampopreciounitario',
		campomontoporparticipante='$this->habilitarcampomontoparticipante',
		campomontoporgrupo='$this->habilitarcampomontogrupo',
		habilitarmodalidadpago='$this->habilitarmodalidadpago',
		avanzado='$this->habilitaravanzado',
		asignarcategoria='$this->activarcategoria',
		asignardias='$this->activardias',
		depende='$this->depende',
		idtiposervicioconfiguracion='$this->tiposervicioconfiguracion'
		WHERE idcategorias = '$this->idcategoria'";



		
		$this->db->consulta($sql);
	}

	public function VerificarRelacionCategoria()
	{
		$sql="SELECT *FROM servicios WHERE idcategoriaservicio='$this->idcategoria'";

		
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
		$query="SELECT MAX(orden) as ordenar FROM categorias";		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}

	public function BorrarHorariostipo()
	{
		
		$query="DELETE FROM horariostipo WHERE idcategorias=".$this->idcategoria."";	
		$resp=$this->db->consulta($query);
		return $resp;
	}

	public function BorrarCategoria()
	{
		
		$query="DELETE FROM categorias WHERE idcategorias=".$this->idcategoria."";	
		$resp=$this->db->consulta($query);
		return $resp;
	}

	public function ObtenerCategoriasTodas()
	{
		
		$sql="SELECT *FROM categorias ";

		$resp=$this->db->consulta($sql);
		return $resp;
	}


	public function ObtenerCategoriasEstatus($estatus)
	{
		
		$sql="SELECT *FROM categorias WHERE estatus IN(".$estatus.")";

	

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

	public function ObtenerCategoriasEstatusDepende($depende)
	{
		
		$sql="SELECT *FROM categorias WHERE depende IN ($depende)";


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


	public function ObtenerCategoriasGroupEstatusDepende($depende)
	{
		
		$sql="SELECT GROUP_CONCAT(idcategorias) AS categoriasid FROM categorias WHERE depende IN ($depende)";

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

		public function GuardarHorarioSemana()
	{
		$query = "INSERT INTO horariostipo (idcategorias,dia,horainicial,horafinal) VALUES ('$this->idcategoria','$this->dia','$this->horainiciosemana','$this->horafinsemana');";
		$this->db->consulta($query);

	}

	public function EliminarHorarioSemana()
	{
		$sql="DELETE FROM horariostipo WHERE idcategorias='$this->idcategoria'";
		
		$resp = $this->db->consulta($sql);
		return $resp;
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
	

	public function ObtenerCategoria()
	{
	$sql="SELECT *FROM categorias WHERE idcategorias ='$this->idcategoria'";
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


		public function obtenerTodasCategorias()
	{
		
		$sql = "SELECT C.* FROM categorias C";
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


	 public function mostrarEstructuraDependencia($dependencia) {
 	
 	    $estructura = $dependencia['nombre'];
    $dependenciaPadre = $dependencia['dependencia_padre'];

    while ($dependenciaPadre) {
        $estructura = $dependenciaPadre['nombre'] . '/' . $estructura;
        $dependenciaPadre = $dependenciaPadre['dependencia_padre'];


    }

    

    return $estructura;

}

	public function obtenerDependenciaHaciaArriba($subcategoriaId) {
		$resultado=[];

		if ($subcategoriaId!=0 ) {
			# code...
		
    $consulta = "SELECT idcategorias, titulo, depende FROM categorias WHERE idcategorias = '$subcategoriaId'";


		$resultado1=$this->db->consulta($consulta);
    	
    	$subcategoria=$this->db->fetch_assoc($resultado1);

    	$numsubcategoria=$this->db->num_rows($resultado1);

    	//var_dump($subcategoria);die();
   if ($numsubcategoria>0) {
   	# code...
   
    $resultado = array(
        'id' => $subcategoria['idcategorias'],
        'nombre' => $subcategoria['titulo']
    );
    
    $idDependencia = $subcategoria['depende'];


   
    if ($idDependencia != null && $idDependencia!='' && $idDependencia!=0) {
    	
        $dependenciaPadre = $this->obtenerDependenciaHaciaArriba($idDependencia, $conexion);
        $resultado['dependencia_padre'] = $dependenciaPadre;
    	}

	}
}
    
    return $resultado;
}

public function ObtenerCategoriasEstatusDepende2($depende)
	{
		
		$sql="SELECT *FROM categorias WHERE depende IN ($depende) AND estatus=1";


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

	


	public function ObtenerCategoriaServicioConfiguracion()
	{
	$sql="SELECT idtiposervicioconfiguracion, nombre from tiposervicioconfiguracion where estatus=1";
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
	public function ObtenerCategoriabytiposervicio($idtiposervicioconfiguracion)
	{
	$sql = "SELECT * FROM categorias WHERE FIND_IN_SET (idtiposervicioconfiguracion,'$idtiposervicioconfiguracion')";
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
     public function ObtenerCategoriaServicio($idscategorias)
	{
		
		$sql="SELECT idcategoriasservicio, nombrecategoria from categoriasservicio WHERE FIND_IN_SET (idcategorias,'$idscategorias')";

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


	public function ObtenerCategoriasTipoServicioConfi()
	{
		$sql ="SELECT * FROM 
			categorias  WHERE idtiposervicioconfiguracion='$this->tiposervicioconfiguracion'";
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


	public function ObtenerCategoriasListado()
	{
		$sql="SELECT *FROM categorias WHERE estatus=1 AND depende>0 ORDER by titulo asc";
		
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

public function ObtenerAnio()
	{
		$sql="select YEAR(horariosservicio.fecha) as Anio from horariosservicio
GROUP BY YEAR(horariosservicio.fecha)";
		
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




 public function ObtenerSubSubCategoriaServicio()
	{
		
		$sql="SELECT idcategoriasservicio, nombrecategoria from categoriasservicio WHERE idcategorias='$this->idcategoria'";


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