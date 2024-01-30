<?php 
/**
 * 
 */
class Carrito 
{
	
	public $db;
	public $idcarrito;
	public $idusuarios;
	public $idpaquete;
	public $cantidad;
	public $costounitario;
	public $costototal;
	public $idsucursal;
	public $idespecialista;
	public $idcitaapartada;
	public $nombrepaquete;
	public $estatus;
	public $titulosgrupos;
	public $preciooriginal;

	public function AgregarCarrito()
	{
		$sql="INSERT INTO carrito(idusuarios, idpaquete, cantidad, costounitario, costototal, nombrepaquete, estatus) VALUES ('$this->idusuarios', '$this->idpaquete',$this->cantidad,'$this->costounitario','$this->costototal', '$this->nombrepaquete', 1)";
		
		$resp=$this->db->consulta($sql);

	}


	public function ObtenerCarrito()
	{
		$sql="
			SELECT
			carrito.idcarrito,
			paquetes.nombrepaquete,
			paquetes.foto,
			carrito.cantidad,
			carrito.costounitario,
			carrito.costototal,
			carrito.idusuarios,
			carrito.idpaquete			
			FROM
			carrito
			JOIN paquetes
			ON carrito.idpaquete = paquetes.idpaquete 
		
			WHERE carrito.idusuarios='$this->idusuarios' AND carrito.estatus=1 
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


	public function BorrardelCarrito()
	{
		$sql="DELETE FROM carrito WHERE idcarrito='$this->idcarrito'";

		$resp=$this->db->consulta($sql);

	}


	public function ObtenerDelCarrito()
	{
		$sql="
			SELECT
			carrito.idcarrito,
			paquetes.nombrepaquete,
			paquetes.foto,
			carrito.cantidad,
			carrito.costounitario,
			carrito.costototal,
			carrito.idusuarios,
			carrito.idpaquete			
			FROM
			carrito
			JOIN paquetes
			ON carrito.idpaquete = paquetes.idpaquete 
		
		 WHERE idcarrito='$this->idcarrito'";
		
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

	public function ActualizarTotal()
	{
		$sql="UPDATE carrito 
		SET costototal='$this->costototal',
		cantidad='$this->cantidad'
		WHERE idcarrito='$this->idcarrito'";
		
		$resp=$this->db->consulta($sql);
	}

	public function ActualizarEstatusCarrito()
	{
		$sql="UPDATE carrito 
		SET estatus='$this->estatus'
		WHERE idcarrito='$this->idcarrito'";
		
		$resp=$this->db->consulta($sql);
	}

	public function ActualizarCarritoCosto()
	{
		$sql="UPDATE carrito 
		SET costototal='$this->costototal',
		costounitario='$this->costounitario',
		cantidad='$this->cantidad'
		WHERE idcarrito='$this->idcarrito'";
		
		$resp=$this->db->consulta($sql);
	}

	public function ActualizarIdUsuarioCarrito(){
			$sql="UPDATE carrito 
		SET idusuarios='$this->idusuarios'
		WHERE idcarrito='$this->idcarrito'";
		
		$resp=$this->db->consulta($sql);


	}
	 public function ActualizarIdusuarioCita(){

	 	$sql="UPDATE citaapartado 
		SET idusuario='$this->idusuarios'
		WHERE idcitaapartado='$this->idcitaapartada'";
		
		$resp=$this->db->consulta($sql);

	 }


	public function BuscarPaqueteCarrito()
	{
		$sql="
			SELECT
			carrito.idcarrito,
			paquetes.nombrepaquete,
			paquetes.foto,
			paquetes.servicio,
			paquetes.preciosugerido as precioventa,
			carrito.cantidad,
			carrito.costounitario,
			carrito.costototal,
			carrito.idusuarios,
			carrito.idpaquete			
			FROM
			carrito
			JOIN paquetes
			ON carrito.idpaquete = paquetes.idpaquete 
		
			WHERE carrito.idusuarios='$this->idusuarios' AND carrito.idpaquete='$this->idpaquete' AND carrito.estatus=1 
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

	public function EliminarCarrito()
	{

		$sql="DELETE FROM carrito WHERE idusuarios='$this->idusuarios'";
		
		$resp=$this->db->consulta($sql);
	}

}
 ?>