<?php 

class Companias 
	{
		public $db; //objeto de conecxion con la base de datos


		public function ObtenerCompaniasActivas()
		{
			$sql = "SELECT *FROM companiaseguro WHERE estatus=1 ORDER BY nombre asc";


			$resp = $this->db->consulta($sql);
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