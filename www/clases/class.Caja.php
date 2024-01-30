<?php 

class Caja 
	{
		public $db; //objeto de conecxion con la base de datos

		public $idusuario;
		public $fechainicio;
		public $fechafin;
		public $montoinicial;
		public $montofinal;
		public $totalventas;
		public $estatus;
		public $idmanejocaja;

		public $idnotapago;


		public function VerificarCajaAbierta()
		{
			$sql = "SELECT *FROM manejocaja WHERE estatus=1 AND idusuario='$this->idusuario'";


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


		public function AbrirCaja()
		{
			$sql="INSERT INTO manejocaja( idusuario, montoinicial, estatus) VALUES ('$this->idusuario', '$this->montoinicial','$this->estatus')";
			
			$resp=$this->db->consulta($sql);
			$this->idmanejocaja=$this->db->id_ultimo();

		}

		public function GuardarNotaCaja()
		{
			$sql="INSERT INTO manejocajanota( idmanejocaja, idnotapago) VALUES ('$this->idmanejocaja', '$this->idnotapago')";

			$resp=$this->db->consulta($sql);
		}

		public function ActualizarCaja()
		{
			$sql="UPDATE manejocaja SET  fechafin = '$this->fechafin',montofinal = '$this->montofinal', estatus = '$this->estatus' WHERE idmanejocaja = '$this->idmanejocaja'";
			$resp=$this->db->consulta($sql);
		}
}