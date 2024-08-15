<?php 

/**
 * 
 */
class ClienteMercadoPago 
{
	public $db;
	public $skey;
	public $idusuarios;
	public $customerid;

	  public function ObtenerIDCustomer()
	{
		$Query="SELECT customerid_mercadopago FROM customermercadopago WHERE idusuarios = '$this->idusuarios' and skeymercado='$this->skey'";
		//echo $Query;die();
		$resp=$this->db->consulta($Query);		
		return $resp;
	}

	public function GuardarIdCustomer()
	{
		$query = "INSERT INTO customermercadopago (skeymercado,idusuarios,customerid_mercadopago) VALUES ('$this->skey','$this->idusuarios','$this->customerid');";
		$resp=$this->db->consulta($query);
		return $resp;

	}


	public function ObtenerDatosCliente()
    {
		$sql="SELECT nombre,paterno,email,celular,materno FROM usuarios
			WHERE idusuarios='$this->idusuarios'";
			
		$resp = $this->db->consulta($sql);
		return $resp;
	}
}
 ?>