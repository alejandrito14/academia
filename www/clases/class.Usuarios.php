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
	public $alias;
	public $sexo;
	public $fechanacimiento;
	public $idservicio;
	
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
		$query="INSERT INTO usuarios(idperfiles,nombre,paterno,materno,usuario,clave,celular,telefono,email,estatus,tipo,alias,sexo,fechanacimiento)VALUES($this->idperfiles,'$this->nombre','$this->paterno','$this->materno','$this->usuario','$this->clave','$this->celular','$this->telefono','$this->email',$this->estatus,'$this->tipo','$this->alias','$this->sexo','$this->fechanacimiento')";

		$resp=$this->db->consulta($query);
	    $this->id_usuario=$this->db->id_ultimo();

	}

	//funcion para modificar los usuarios

	public function ModificarUsuario()

	{

		$query="UPDATE usuarios SET idperfiles=$this->idperfiles,nombre='$this->nombre',paterno='$this->paterno',materno='$this->materno',usuario='$this->usuario',
			clave='$this->clave',
			celular='$this->celular',
			telefono='$this->telefono',
			email='$this->email',
			estatus=$this->estatus, 
			tipo=$this->tipo,
			alias='$this->alias',
			sexo='$this->sexo',
			fechanacimiento='$this->fechanacimiento'
		 	WHERE idusuarios=$this->id_usuario";
		
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
		$sql = "SELECT * FROM usuarios INNER JOIN tipousuario ON usuarios.tipo=tipousuario.idtipousuario WHERE tipo IN($tipo)";
		
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
		$sql_cliente = "SELECT * FROM usuarios WHERE tipo=3 ";
		
		$result_cliente = $this->db->consulta($sql_cliente);

		return $result_cliente;


	}

	public function ObtenerUsuariosCoach()
	{
		$sql_cliente = "SELECT * FROM usuarios WHERE tipo=5";
		
		$result_cliente = $this->db->consulta($sql_cliente);

		return $result_cliente;
	}


	public function ObtenerUsuariosAlumnos()
	{
		$sql="SELECT *FROM usuarios WHERE tipo=3 ";

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


	public function ObtenerUsuario()
	{
		
		$sql="SELECT *FROM usuarios WHERE idusuarios='$this->id_usuario'";
		
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
	  public function obtenerServicios()
    {
        $sql = "SELECT * FROM usuarios_servicios WHERE idusuarios = '$this->id_usuario'";


        $result = $this->db->consulta($sql);
        return $result;
    }

    public function EliminarUsuario()
    {
    	 $sql = "DELETE  FROM usuarios WHERE idusuarios = '$this->id_usuario'";
        $result = $this->db->consulta($sql);
        
    }

    public function ObtenerUsuariosAlumnoNOAsignados($idusuariosservicio)
    {
    	$sql = "SELECT * FROM usuarios INNER JOIN tipousuario ON tipousuario.idtipousuario=usuarios.tipo
           WHERE tipo IN(3) AND usuario!=''";
           
        if ($idusuariosservicio!='') {
             $sql.="AND idusuarios NOT IN($idusuariosservicio)";
           }
		
		$result_cliente = $this->db->consulta($sql_cliente);

		return $result_cliente;
    }


    public function ObtenerUsuariosAsociados()
    {
        $sql="SELECT
        GROUP_CONCAT(usuarios.idusuarios) AS asociados
        FROM
        usuarios
        JOIN usuariossecundarios
        ON usuarios.idusuarios = usuariossecundarios.idusuariotutorado WHERE celular is not null AND usuario is not null and celular!='' and usuario!='' ";
     
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


    public function ObtenerTutoresConca()
    {
    	$sql="SELECT
        GROUP_CONCAT(usuarios.idusuarios) AS tutores
        FROM
        usuarios
        JOIN usuariossecundarios
        ON usuarios.idusuarios = usuariossecundarios.idusuariostutor WHERE celular!='' AND usuario!='' ";
     
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
    public function ObtenerAlumnosSinAsignar($idusuariosasignados)
    {
       $sql="SELECT
        * FROM usuarios WHERE tipo=3 ";
        if ($idusuariosasignados!='' && $idusuariosasignados!=null) {

         $sql.=  " AND idusuarios NOT 
      		 IN($idusuariosasignados)";
        
         } 

     

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

    public function GuardarUsuarioTutorado()
	{
		$sql = "INSERT INTO usuarios (nombre,paterno,materno,fechanacimiento,sexo,celular,email,usuario,tipo,alias)
        VALUES ('$this->nombre','$this->paterno','$this->materno','$this->fecha','$this->sexo','$this->celular','$this->email','$this->usuario','$this->tipo','$this->alias')";


        $result  = $this->db->consulta($sql);
        $this->id_usuario=$this->db->id_ultimo();
	}
	public function GuardarUsuarioyTutor($idusuariotutorado,$parentesco,$soysututor)
	{
		$sql = "INSERT INTO usuariossecundarios (idusuariostutor,idusuariotutorado,idparentesco,sututor)
        VALUES ('$idusuariotutorado','$this->id_usuario','$parentesco','$soysututor')";



        $result  = $this->db->consulta($sql);
	}

	public function EliminarAsociacion($idusuario)
	{
		$sql = "DELETE FROM usuariossecundarios WHERE idusuariostutor=".$idusuario." AND idusuariotutorado=".$this->id_usuario."";

        $result  = $this->db->consulta($sql);
	}

	public function ObtenerAsociadosUsuario()
	{
		$sql="SELECT 
		usuariossecundarios.idusuariossecundario,
		usuariossecundarios.idusuariostutor,
		usuariossecundarios.idusuariotutorado,
		usuariossecundarios.idparentesco,
		usuariossecundarios.sututor,
		usuarios.nombre,
		usuarios.paterno,
		usuarios.materno,
		usuarios.celular,
		usuarios.fechanacimiento,
		usuarios.sexo,
		usuarios.email,
		usuarios.usuario,
		usuarios.tipo,
		parentesco.parentesco,
		usuarios.alias

		FROM usuariossecundarios
		INNER JOIN usuarios ON  usuariossecundarios.idusuariotutorado=usuarios.idusuarios
		INNER JOIN parentesco ON usuariossecundarios.idparentesco=parentesco.idparentesco
		 WHERE idusuariostutor='$this->id_usuario'";
     
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


	public function ObtenerUsuarioParaAsociar()
	{
		$sql="SELECT 
		usuarios.idusuarios,
		usuarios.nombre,
		usuarios.paterno,
		usuarios.materno,
		usuarios.celular,
		usuarios.fechanacimiento,
		usuarios.sexo,
		usuarios.email,
		usuarios.usuario,
		usuarios.tipo,
		usuarios.alias
		FROM usuarios
		 WHERE idusuarios='$this->id_usuario'";
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

	public function ObtenerDependencia()
	{
		$sql="SELECT 
		usuariossecundarios.idusuariossecundario,
		usuariossecundarios.idusuariostutor,
		usuariossecundarios.idusuariotutorado,
		usuariossecundarios.idparentesco,
		usuariossecundarios.sututor,
		usuarios.nombre,
		usuarios.paterno,
		usuarios.materno,
		usuarios.celular,
		usuarios.fechanacimiento,
		usuarios.sexo,
		usuarios.email,
		usuarios.usuario,
		usuarios.tipo,
		parentesco.parentesco,
		usuarios.alias

		FROM usuariossecundarios
		INNER JOIN usuarios ON  usuariossecundarios.idusuariotutorado=usuarios.idusuarios
		INNER JOIN parentesco ON usuariossecundarios.idparentesco=parentesco.idparentesco
		 WHERE idusuariotutorado='$this->id_usuario'";
     
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

	public function ObtenerTodosUsuariosCoach()
	{
		$sql = "SELECT * FROM usuarios WHERE tipo=5 ";
		
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

	public function ObtenerUsuarioDatos()
	{
		$sql="SELECT 
		usuarios.idusuarios,
		usuarios.nombre,
		usuarios.paterno,
		usuarios.materno,
		usuarios.celular,
		usuarios.fechanacimiento,
		usuarios.sexo,
		usuarios.email,
		usuarios.usuario,
		usuarios.tipo,
		usuarios.alias
		FROM usuarios
		 WHERE idusuarios='$this->id_usuario'";
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


    public function obtenerUsuariosAlumnosNoServicio($idusuariosservicio)
    {
         $sql = "SELECT * FROM usuarios INNER JOIN tipousuario ON tipousuario.idtipousuario=usuarios.tipo
           WHERE tipo IN(3) AND usuario!=''";
           
        if ($idusuariosservicio!='') {
             $sql.="AND idusuarios NOT IN($idusuariosservicio)";
           }
        $resp = $this->db->consulta($sql);
        $cont = $this->db->num_rows($resp);

        $array    = array();
        $contador = 0;
        if ($cont > 0) {

            while ($objeto = $this->db->fetch_object($resp)) {

                $array[$contador] = $objeto;
                $contador++;
            }
        }
        return $array;
    }



    public function ObtenerTutoradosSincel()
    {
        $sql="SELECT
        usuarios.nombre,
        usuarios.paterno,
        usuarios.materno,
        usuarios.idusuarios
        FROM
        usuarios
        JOIN usuariossecundarios
        ON usuarios.idusuarios = usuariossecundarios.idusuariotutorado WHERE usuariossecundarios.idusuariostutor='$this->id_usuario' AND sincel=1";

       
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


    
    public function VerificarSiesTutorado()
    {
        $sql="SELECT * FROM usuariossecundarios
        WHERE usuariossecundarios.idusuariotutorado='$this->idusuarios' ";

       
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

    public function ObtenerCategoriasServiciotutor($idtutor)
    {
       $sql="SELECT servicios.idservicio,
        servicios.idcategoriaservicio,  categorias.titulo
 FROM usuarios_servicios
       INNER JOIN servicios ON usuarios_servicios.idservicio=servicios.idservicio
       INNER JOIN categorias On categorias.idcategorias=servicios.idcategoriaservicio
        WHERE usuarios_servicios.idusuarios='$idtutor' GROUP BY  servicios.idcategoriaservicio";
  
       
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

    public function ObtenerserviciosTutor($idtutor)
    {
       
       $sql="SELECT servicios.idservicio,
        servicios.idcategoriaservicio,
        servicios.titulo
 FROM usuarios_servicios
       INNER JOIN servicios ON usuarios_servicios.idservicio=servicios.idservicio
        WHERE usuarios_servicios.idusuarios='$idtutor' GROUP BY  servicios.idservicio";
       
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


    	public function ObtenerMonedero()
	{
		$sql="SELECT *from monedero WHERE idusuarios=$this->id_usuario";

		$lista = $this->db->consulta($sql);
		return $lista;
	}

	
    public function ObtenerUsuarioDependencia()
    {
    	 $sql = "SELECT * FROM usuariossecundarios
        WHERE idusuariotutorado='$this->idusuarios'";

        $resp = $this->db->consulta($sql);
        $cont = $this->db->num_rows($resp);

        $array    = array();
        $contador = 0;
        if ($cont > 0) {

            while ($objeto = $this->db->fetch_object($resp)) {

                $array[$contador] = $objeto;
                $contador++;
            }
        }
        return $array;
    }

    public function lista_UsuariosMembresia($tipo)
	{
		$sql = "SELECT * FROM usuarios INNER JOIN tipousuario ON usuarios.tipo=tipousuario.idtipousuario 
		INNER JOIN usuarios_membresia ON usuarios.idusuarios=usuarios_membresia.idusuarios
		WHERE tipo IN($tipo)";
		
		$resp = $this->db->consulta($sql);
		return $resp;
	}

}

?>