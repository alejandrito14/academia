<?php

class Usuarios

{

	public $db;//objeto de la clase de conexcion

	

	public $id_usuario;//identificador de usuario

	public $idperfiles;//ide del perfil al que pertenece el usuario

	public $nombre;//nombre del usuario

	public $paterno;//apellido paterno del usuario

	public $materno;//apellido materno del usuario

	public $usuario;//usuario para el ingreso al sistema

	public $clave;//clave del usuario para el ingreso al sistema

	public $celular;//numero celular del usuario

	public $telefono;//numero de casa del usuario

	public $email;//email del usuario

	public $estatus;//estatus del usuario


	public $tipo;
	public $tipo_usuario;
	public $sucursal;
	
	
	
	//Funcion para obtener todos los usuarios activos
	public function ObtUsuariosActivos()
	{
		$sql = "SELECT * FROM usuarios WHERE estatus = 1";
		$resp = $this->db->consulta($sql);
		return $resp;
	}

	

	//funcion para guardar los usuarios del sistemas de las mpresas

	public function GuardarUsuario()

	{
		$query="INSERT INTO usuarios(idperfiles,nombre,paterno,materno,usuario,clave,celular,telefono,email,estatus,tipo)VALUES($this->idperfiles,'$this->nombre','$this->paterno','$this->materno','$this->usuario','$this->clave','$this->celular','$this->telefono','$this->email',1,'$this->tipo')";


		$resp=$this->db->consulta($query);
	}

	//funcion para modificar los usuarios

	public function ModificarUsuario()

	{

		$query="UPDATE usuarios SET idperfiles=$this->idperfiles,nombre='$this->nombre',paterno='$this->paterno',materno='$this->materno',usuario='$this->usuario',clave='$this->clave',celular='$this->celular',telefono='$this->telefono',email='$this->email',estatus=$this->estatus, tipo=$this->tipo_usuario WHERE idusuarios=$this->id_usuario";
		
				

		$resp=$this->db->consulta($query);

	}

	//funcion para borrar los usuarios

	public function BorrarUsuario()

	{

		$query="DELETE FROM usuarios WHERE idusuarios=$this->id_usuario";

		$resp=$this->db->consulta($query);

	}

	///funcion para objeter datos de un usuario

	public function ObtenerDatosUsuario()

	{

		$query="SELECT * FROM usuarios WHERE idusuarios=".$this->id_usuario;

		$resp=$this->db->consulta($query);

		$rows=$this->db->fetch_assoc($resp);

		$total = $this->db->num_rows($resp);

		//echo $total;

		return $rows;

	}


	public function ObtenerTodasSucursales()
	{
		$query="SELECT GROUP_CONCAT(idsucursales) as idsucursales FROM sucursales";

		$resp=$this->db->consulta($query);

		$rows=$this->db->fetch_assoc($resp);

		$total = $this->db->num_rows($resp);

		//echo $total;

		return $rows;
	}
	

	//funcion para validar la existencia de un usuario

	public function ValidarUsuario($usuario)

	{

		 $query="SELECT * FROM usuarios WHERE usuario='".$usuario."'";

		$resp=$this->db->consulta($query);

		$rows=$this->db->fetch_assoc($resp);

		$total=$this->db->num_rows($resp);

		

		if($total!=0)

		{

			return 1;

		}

		else

		{

			return 0;

		}

	}


	public function ObtenerTokenusuarios()

	{

		$sql="SELECT
				GROUP_CONCAT(usuariotoken.token) as tokenusuario
			FROM  usuarios INNER JOIN usuariotoken ON usuarios.idusuarios=usuariotoken.idusuario WHERE idusuario=".$this->id_usuario."
			";

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


	public function ObtTodosUsuarios()
	{
		$sql = "SELECT * FROM usuarios WHERE estatus = 1";
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


	public function ObtenerUsuariosToken()
	{
		$sql="SELECT
				usuarios.nombre,
				usuarios.paterno,
				usuarios.materno,
				usuarios.idusuarios
				FROM
				usuarios
				JOIN usuariotoken
				ON usuarios.idusuarios = usuariotoken.idusuario GROUP BY idusuarios
			";

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

	public function lista_Usuarios($tipo)
	{
		$sql = "SELECT * FROM usuarios WHERE tipo IN($tipo)";
		
		$resp = $this->db->consulta($sql);
		return $resp;
	}

	public function ObtenerInformacionusuario()
	{
		$sql = "SELECT * FROM usuarios WHERE idusuarios='$this->id_usuario'";
		
		$resp = $this->db->consulta($sql);
		return $resp;
	}

	public function lista_UsuariosTutores()
	{
		$sql = "SELECT * FROM usuarios INNER JOIN usuariossecundarios ON idusuarios=idusuariostutor";
		
		$resp = $this->db->consulta($sql);
		return $resp;
	}

	public function ObtenerUsuariosAlumno()
	{
		$sql_cliente = "SELECT * FROM usuarios WHERE tipo=3 AND usuario!=''";
		
		$result_cliente = $this->db->consulta($sql_cliente);

		return $result_cliente;


	}

	public function ObtenerUsuariosCoach()
	{
		$sql_cliente = "SELECT * FROM usuarios WHERE tipo=5";
		
		$result_cliente = $this->db->consulta($sql_cliente);

		return $result_cliente;
	}

}

?>