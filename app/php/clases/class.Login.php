<?php
class Login
{

	
	public $db;					//Objeto de conexion
	public $usuario; 			//Usuario
	public $password;			//Contraseña
	public $celular;
	public $idusuarios;
	//Funcion que sirve para validar el usuario y contraseña en DB
	
	public function validar_credenciales()
	{
		$sql = "SELECT * FROM usuarios us WHERE us.usuario = '$this->usuario' AND us.clave = '$this->password' AND us.estatus = '1' AND us.tipo = 0"; 
		$result = $this->db->consulta($sql);
		return $result;
	}
	
	//Funcion que sirve para obtener el id del usuario logueado
	public function obtener_id_login()
	{
		$sql = "SELECT idusuarios FROM usuarios WHERE usuario = '$this->usuario' AND clave = '$this->password' AND estatus = '1'";
		$result = $this->db->consulta($sql);
		$result_row = $this->db->fetch_assoc($result);
		return $result_row['idusuarios'];
	}
	
	//Funcion que sirve para obtener el perfil del usuario logueado
	public function obtener_perfil()
	{
		$sql = "SELECT idperfiles FROM usuarios WHERE usuario = '$this->usuario' AND clave = '$this->password' AND estatus = '1'";
		$result = $this->db->consulta($sql);
		$result_row = $this->db->fetch_assoc($result);
		return $result_row['idperfiles'];
	}
	
	
	public function obtener_id_tipo()
	   {
	   	$sql = "SELECT tipo FROM usuarios WHERE usuario = '$this->usuario' AND clave = '$this->password' AND estatus = '1'";
		$result = $this->db->consulta($sql);
		$result_row = $this->db->fetch_assoc($result);
		return $result_row['tipo'];
	   }

	   public function validar_credenciales_cliente()
	   {
	   	$sql = "SELECT * FROM usuarios us WHERE us.usuario =  BINARY '$this->usuario' AND us.clave = '$this->password' AND estatus=1 "; 
	
		$result = $this->db->consulta($sql);
		return $result;
	   }
	
	public function validar_credenciales_email()
	   {
	   	$sql = "SELECT * FROM usuarios us WHERE us.email = BINARY '$this->usuario' AND us.clave = '$this->password'  AND estatus=1 "; 
	
		$result = $this->db->consulta($sql);
		return $result;
	   }
	public function validar_celular()
	   {
	   	$sql = "SELECT * FROM usuarios us WHERE us.celular = '$this->usuario' AND us.clave = '$this->password'   AND estatus=1"; 
	
		$result = $this->db->consulta($sql);
		return $result;
	   }
	
	

	public function buscar_celular()
	   {
	   	$sql = "SELECT * FROM usuarios us WHERE us.celular = '$this->celular' AND idusuarios='$this->idusuarios'
	   	"; 
		
		$result = $this->db->consulta($sql);
		return $result;
	   }


	public function buscar_celular2()
	   {
	   	$sql = "SELECT * FROM usuarios us WHERE us.celular = '$this->celular'
	   	"; 
		
		$result = $this->db->consulta($sql);
		return $result;
	   }

	   public function BuscarUsuarioAsociado()
	   {
	   	$sql="SELECT *FROM usuariossecundarios WHERE idusuariotutorado='$this->idusuarios' ";


	  
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

	    public function BuscarUsuarioAsociadoTutor()
	   {
	   	$sql="SELECT *FROM usuariossecundarios WHERE idusuariostutor='$this->idusuarios'";

	   
	  
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