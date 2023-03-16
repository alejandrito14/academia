<?php 

class Anios 
	{
		public $db; //objeto de conecxion con la base de datos


		public function Obteneranios()
		{
			$sql = "SELECT *FROM anio WHERE estatus=1 ";


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