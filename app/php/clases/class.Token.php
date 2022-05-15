<?php
class Token
{

	public $db;//objeto de la clase de conexcion
	public $idusuarios;//identificador interno de la notaria
	public $token;
	


			//Funcion que nos regresa los registros de la tabla empresas según el filtro

	public function GenerarToken()
	{

	        //UN  CRON VA A ESTAR BORRANDO TODOS LOS TOKEN QUE YA CADUCARON.
		
		
		    //VERIFICAMOS SI EXISTE UN TOKEN ACTIVO.
		   /*   $sql = "SELECT * FROM cliente WHERE idusuarios= '$this->idusuarios' ";

		   
		      $existe = $this->db->consulta($sql);
			  $existe_num = $this->db->num_rows($existe);
		      $existe_row = $this->db->fetch_assoc($existe);*/
		     
			  	$date=date('Y-m-d H:i:s');
				  //generamos.
				 $token = rand(0,9) . rand(0,9) . rand(0,9) . rand(0,9);

				  $sql="UPDATE usuarios SET token='$token' WHERE idusuarios='$this->idusuarios'";

				
			                $resp = $this->db->consulta($sql);
				  
			  
				return $token;
	}
	
	public function CompararToken()
	{

	        //UN  CRON VA A ESTAR BORRANDO TODOS LOS TOKEN QUE YA CADUCARON.
		
		
		    //VERIFICAMOS SI EXISTE UN TOKEN ACTIVO.
		      $sql = "SELECT * FROM usuarios WHERE idusuarios= '$this->idusuarios' AND token = '$this->token' ";
		      $existe = $this->db->consulta($sql);
			  $existe_num = $this->db->num_rows($existe);
		
			  return $existe_num;
	}
	
	
		public function EnviarToken()
	{

	        //UN  CRON VA A ESTAR BORRANDO TODOS LOS TOKEN QUE YA CADUCARON.
		
		
		    //VERIFICAMOS SI EXISTE UN TOKEN ACTIVO.
		      $sql = "SELECT * FROM usuarios WHERE idusuarios= '$this->idusuarios'";
		      $existe = $this->db->consulta($sql);
			  return $existe;
	}

}

?>