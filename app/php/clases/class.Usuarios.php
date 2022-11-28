<?php 

/**
 * 
 */
class Usuarios 
{
	public $db;
	public $idusuarios;
	public $idperfiles;
	public $nombre;
	public $paterno;
	public $materno;
	public $celular;
	public $sistema;
	public $uuid;
	public $usuario;
	public $clave;
	public $token;
	public $tipousuario;
	public $telefono;
	public $fecha;
	public $email;
	public $sexo;
	public $tokenfirebase;
    public $alias;

    public $idtutorado;

    public $v_codigopostal;
    public $v_pais;
    public $v_estado;
    public $v_municipio;
    public $v_direccion;
    public $v_colonia;
    public $v_referencia;
    public $principaldireccion;
    public $idusuarios_envios;
    public $v_nointerior;
    public $v_noexterior;
    public $calle1;
    public $calle2;
    public $calle;
    public $v_tipoasentamiento;
    public $idnivel;
    public $iddeporte;
    public $celular2;
    public $idusuariotutorado;
	public function validarTelefono()
	{
		 $sql_cliente = "SELECT * FROM usuarios WHERE celular='$this->celular'";

        $result_cliente         = $this->db->consulta($sql_cliente);
        $result_cliente_row     = $this->db->fetch_assoc($result_cliente);
        $result_cliente_row_num = $this->db->num_rows($result_cliente);

        if ($result_cliente_row_num != 0) {
            $r = 1;

        } else {
            $r = 0;

        }
        return $r;
	}

	public function GuardarClienteTelefono()
	{
		 $query = "INSERT INTO usuarios (celular,sistema) VALUES ('$this->celular','$this->sistema')";


        $result          = $this->db->consulta($query);
        $this->idusuarios = $this->db->id_ultimo();
	}

	public function ValidarClienteTelefono()
	{
		 $Query = "SELECT * FROM usuarios WHERE celular='$this->celular'";

        $resp = $this->db->consulta($Query);
        return $resp;
	}

	public function validarToken()
	{
		
        $sql = "SELECT *FROM usuarios WHERE token= '$this->codigosms' and idusuarios='$this->idusuarios'";

        $resp = $this->db->consulta($sql);
        $cont = $this->db->num_rows($resp);

        if ($cont > 0) {
            $validado = 1;
        } else {
            $validado = 0;
        }
        return $validado;
	}

	public function ActualizarUsuario()
	{
		 $query = "UPDATE usuarios SET
       	 nombre = '$this->nombre',
       	 paterno='$this->paterno',
       	 materno='$this->materno',
         telefono='$this->telefono',
         sexo='$this->sexo',
         estatus='$this->estatus',
         fechanacimiento='$this->fecha'
        WHERE idusuarios = '$this->idusuarios' ";
     

        $result = $this->db->consulta($query);
	}

	public function GuardarTokenfirebase()
	{
		$sql = "INSERT INTO usuariotoken (idusuario,token,dispositivo,uuid)
        VALUES ('$this->idusuarios','$this->tokenfirebase','$this->sistema','$this->uuid')";
      
        $result  = $this->db->consulta($sql);
	}
 

		public function ActualizarUsuarioAcceso()
	{
		 $query = "UPDATE usuarios SET
       	 email = '$this->email',
       	 usuario='$this->usuario',
       	 clave='$this->clave',
         tipo='$this->tipousuario'
        WHERE idusuarios = '$this->idusuarios' ";
     
        
        $result = $this->db->consulta($query);
	}

	public function GuardarUsuarioTutorado($sincel)
	{
		$sql = "INSERT INTO usuarios (nombre,paterno,materno,fechanacimiento,sexo,celular,email,usuario,tipo,celular2,sincel)
        VALUES ('$this->nombre','$this->paterno','$this->materno','$this->fecha','$this->sexo','$this->celular','$this->email','$this->usuario','$this->tipo','$this->celular2','$sincel')";
       

        $result  = $this->db->consulta($sql);
        $this->idusuariotutorado=$this->db->id_ultimo();
	}

    public function ActualizarUsuarioTutorado()
    {
         $query = "UPDATE usuarios SET
         nombre = '$this->nombre',
         paterno='$this->paterno',
         materno='$this->materno',
         sexo='$this->sexo',
         email='$this->email',
         usuario='$this->email',
         estatus='$this->estatus',
         fechanacimiento='$this->fecha'
        WHERE idusuarios = '$this->idtutorado' ";
 
        $result = $this->db->consulta($query);
    }

	public function GuardarUsuarioyTutor($idusuariotutorado,$parentesco,$soysututor,$orden)
	{
		$sql = "INSERT INTO usuariossecundarios (idusuariostutor,idusuariotutorado,idparentesco,sututor,orden)
        VALUES ('$this->idusuarios','$this->idusuariotutorado','$parentesco','$soysututor','$orden')";

     

        $result  = $this->db->consulta($sql);
	}

    public function ActualizarParentesco($parentesco)
    {
          $query = "UPDATE usuariossecundarios SET
         idparentesco = '$parentesco'
        WHERE idusuariotutorado = '$this->idtutorado' ";

     
        $result = $this->db->consulta($query);
    }


	function validarUsuarioCliente ()
	{
		$r ;
		$sql_cliente = "SELECT * FROM usuarios WHERE usuario = '$this->usuario'";

		$result_cliente = $this->db->consulta($sql_cliente);
		$result_cliente_row = $this->db->fetch_assoc($result_cliente);
		$result_cliente_row_num = $this->db->num_rows($result_cliente);
		
		
		if ($result_cliente_row_num != 0)
		{
			$r = 1 ;
			
		}
		else
		{
			$r = 0;

		}
		return $r ;
		
		
	}

    function validarUsuarioClienteCelular ()
    {
        $r ;
        $sql_cliente = "SELECT * FROM usuarios WHERE celular = '$this->celular' AND email is not null and usuario is not null and email!='' and usuario!='' and clave!='' ";

        $result_cliente = $this->db->consulta($sql_cliente);
        $result_cliente_row = $this->db->fetch_assoc($result_cliente);
        $result_cliente_row_num = $this->db->num_rows($result_cliente);
        
        
        if ($result_cliente_row_num != 0)
        {
            $r = 1 ;
            
        }
        else
        {
            $r = 0;

        }
        return $r ;
        
        
    }

	public function validarIdUsuarioCorreo()
	{
		$r ;
		$sql_cliente = "SELECT * FROM usuarios WHERE usuario = '$this->usuario' AND idusuarios='$this->idusuarios'";

		
		$result_cliente = $this->db->consulta($sql_cliente);
		$result_cliente_row = $this->db->fetch_assoc($result_cliente);
		$result_cliente_row_num = $this->db->num_rows($result_cliente);
		
		
		if ($result_cliente_row_num != 0)
		{
			$r = 1 ;
			
		}
		else
		{
			$r = 0;

		}
		return $r ;
	}

	public function ObtTutorados()
	{
		$sql="SELECT
		usuarios.nombre,
		usuarios.paterno,
		usuarios.materno,
		usuarios.idusuarios
		FROM
		usuarios
		JOIN usuariossecundarios
		ON usuarios.idusuarios = usuariossecundarios.idusuariotutorado WHERE usuariossecundarios.idusuariostutor='$this->idusuarios'";


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


	public function ObtenerTipo()
	{
		$sql="SELECT *FROM tipousuario WHERE idtipousuario='$this->tipousuario'";
		
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

	public function ObtenerUsuario()
	{
		
		$sql="SELECT *FROM usuarios WHERE idusuarios='$this->idusuarios'";
	
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

	public function ObtenerUsuarioCorreo()
	{
		$sql_cliente = "SELECT * FROM usuarios WHERE usuario = '$this->usuario'";
		
		$result_cliente = $this->db->consulta($sql_cliente);

		return $result_cliente;


	}

    public function ObtenerUsuarioCelular()
    {
        $sql_cliente = "SELECT * FROM usuarios WHERE celular = '$this->celular'";
        
        $result_cliente = $this->db->consulta($sql_cliente);

        return $result_cliente;


    }

	public function validarUsuarioClienteToken()
    {
        $r;
        $sql_cliente   = "SELECT * FROM usuarios WHERE usuario = '$this->usuario' AND token='$this->token'";

      
        $result_cliente         = $this->db->consulta($sql_cliente);
        $result_cliente_row     = $this->db->fetch_assoc($result_cliente);
        $result_cliente_row_num = $this->db->num_rows($result_cliente);

        if ($result_cliente_row_num != 0) {
            $r = 1;

        } else {
            $r = 0;

        }
        return $r;
    }


public function validarUsuarioClienteTokenCel()
    {
        $r;
        $sql_cliente   = "SELECT * FROM usuarios WHERE celular = '$this->celular' AND token='$this->token'";

      
        $result_cliente         = $this->db->consulta($sql_cliente);
        $result_cliente_row     = $this->db->fetch_assoc($result_cliente);
        $result_cliente_row_num = $this->db->num_rows($result_cliente);

        if ($result_cliente_row_num != 0) {
            $r = 1;

        } else {
            $r = 0;

        }
        return $r;
    }


     public function Actualizarcontra()
    {
        $sql = "UPDATE usuarios SET clave='$this->clave'
        WHERE idusuarios='$this->idusuarios'";

        $r = $this->db->consulta($sql);
        return $r;
    }

    public function GuardarVersion($cliente,$version)
    {
         $sql = "UPDATE usuarios
        SET 
        versionactual='$version'
        WHERE idusuarios = '$cliente'";
       
        $this->db->consulta($sql);
    }

    public function GuardarVistoAnuncio()
    {
        $sql = "UPDATE usuarios
        SET 
        anunciovisto=1
        WHERE idusuarios = '$this->idusuarios'";
       
        $this->db->consulta($sql);
    }


     public function ObtenerInformacionUsuario()
    {
        $sql = "SELECT * FROM usuarios  c
        WHERE idusuarios='$this->idusuarios'";

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

    public function ObtenerIdUsuariosAsignados()
    {
    	$sql="SELECT GROUP_CONCAT(usuarios.idusuarios) AS idusuariosasignados FROM usuarios INNER  JOIN 
    	  usuarios_servicios on usuarios.idusuarios=usuarios_servicios.idusuarios";

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

    public function obtenerUsuariosSinasignar($usuariosasignados)
    {
    	 $sql = "SELECT * FROM usuarios INNER JOIN tipousuario ON tipousuario.idtipousuario=usuarios.tipo
    	   WHERE idusuarios NOT IN($usuariosasignados) AND tipo IN(3,5)";

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

     public function BuscarToken()
    {
        $sql = "SELECT *FROM usuariotoken WHERE uuid='$this->uuid' AND idusuario='$this->idusuarios' ORDER BY idusuariotoken DESC LIMIT 1";

        $result = $this->db->consulta($sql);

        return $result;
    }

    public function EliminarClienteUuid()
    {
        $sql = "DELETE FROM usuariotoken WHERE uuid='$this->uuid' AND idusuario='$this->idusuarios'";

        $this->db->consulta($sql);
    }


    public function validarDatosCliente()
    {
        $r;
        $sql_client = "SELECT * FROM usuarios WHERE usuario = '$this->usuario' AND clave='$this->clave' AND idusuarios='$this->idusuarios'";

        $result_cliente         = $this->db->consulta($sql_client);
        $result_cliente_row     = $this->db->fetch_assoc($result_cliente);
        $result_cliente_row_num = $this->db->num_rows($result_cliente);

        if ($result_cliente_row_num != 0) {
            $r = 0;

        } else {
            $r = 1;

        }
        return $r;

    }

     public function ValidarCliente()
    {
        $Query = "SELECT * FROM usuarios WHERE usuario='$this->usuario'";

        $resp = $this->db->consulta($Query);
        return $resp;
    }

    public function BuscarClienteporcorreo()
    {
        $sql = "SELECT * FROM usuarios WHERE usuario = '$this->usuario' AND idusuarios='$this->idusuarios'";

        $result = $this->db->consulta($sql);
        return $result;
    }

      public function BuscarClienteporcorreoMenos()
    {
        $sql = "SELECT * FROM usuarios WHERE usuario = '$this->usuario' AND idusuarios NOT IN('$this->idusuarios')";

        $result = $this->db->consulta($sql);
        return $result;
    }


    public function Actualizardatosacceso()
    {
        $sql = "UPDATE usuarios 
        SET clave='$this->clave',
        usuario='$this->usuario',
        email='$this->email'
        WHERE idusuarios='$this->idusuarios'";

        $r = $this->db->consulta($sql);
        return $r;
    }

     public function actualizar_nombre_foto()
    {
        $sql = "UPDATE usuarios SET foto = '$this->foto' WHERE idusuarios = '$this->idusuarios'";
        $this->db->consulta($sql);
    }

      public function GuardarDireccionEnvio()
    {

        $sql = "INSERT INTO usuarios_envios (idusuarios,no_ext,no_int,col,ciudad,estado,pais,cp,referencia,municipio,telefono,principal,calle,calle1,calle2,asentamiento)
        VALUES ('$this->idusuarios','$this->v_noexterior','$this->v_nointerior','$this->v_colonia','$this->envio_ciudad','$this->v_estado','$this->v_pais','$this->v_codigopostal','$this->v_referencia','$this->v_municipio','$this->envio_telefono',$this->principaldireccion,'$this->calle','$this->calle1','$this->calle2','$this->v_tipoasentamiento')  ";

        $result                  = $this->db->consulta($sql);
        $this->idusuarios_envios = $this->db->id_ultimo();

    }

    public function ModificarDireccionEnvio()
    {

        $sql = "UPDATE usuarios_envios SET
        idusuarios='$this->idusuarios',
        direccion='$this->v_direccion',
        col='$this->v_colonia',
        municipio='$this->v_municipio',
        ciudad='$this->envio_ciudad',
        estado='$this->v_estado',
        pais='$this->v_pais',
        cp='$this->v_codigopostal',
        referencia='$this->v_referencia',
        calle='$this->calle',
        calle1='$this->calle1',
        calle2='$this->calle2',
        asentamiento='$this->v_tipoasentamiento',
        no_ext='$this->v_noexterior',
        no_int='$this->v_nointerior'

        WHERE idusuarios_envios='$this->idusuarios_envios'";

        $r = $this->db->consulta($sql);
        return $r;
    }

    public function ObtenerDirecciones()
    {
        $sql = "SELECT usuarios_envios.idusuarios_envios,usuarios_envios.direccion,usuarios_envios.no_ext,usuarios_envios.no_int,usuarios_envios.col,usuarios_envios.ciudad,usuarios_envios.estado,usuarios_envios.pais,usuarios_envios.cp,pais.idpais as idpais,
        pais.pais as nombrepais,
        estados.id as idestado,
        estados.nombre as nombreestado,
        municipios.id AS idmunicipio,
        municipios.nombre AS nombremunicipio,
        usuarios.idusuarios,
        usuarios_envios.referencia,
        usuarios_envios.telefono,
        usuarios_envios.calle,
        usuarios_envios.calle1,
        usuarios_envios.calle2,
        usuarios_envios.asentamiento

        FROM usuarios_envios
        INNER JOIN usuarios ON usuarios.idusuarios=usuarios_envios.idusuarios
        LEFT JOIN municipios ON municipios.id =usuarios_envios.municipio
        LEFT join estados ON estados.id=usuarios_envios.estado
        LEFT JOIN pais ON pais.idpais=usuarios_envios.pais
        WHERE usuarios.idusuarios ='$this->idusuarios'";

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


    public function ObtenerdirecionCliente()
    {
         $sql = "SELECT usuarios_envios.idusuarios_envios,usuarios_envios.direccion,usuarios_envios.no_ext,usuarios_envios.no_int,usuarios_envios.col,usuarios_envios.ciudad,usuarios_envios.estado,usuarios_envios.pais,usuarios_envios.cp,pais.idpais as idpais,
        pais.pais as nombrepais,
        estados.id as idestado,
        estados.nombre as nombreestado,
        municipios.id AS idmunicipio,
        municipios.nombre AS nombremunicipio,
        usuarios.idusuarios,
        usuarios_envios.referencia,
        usuarios_envios.telefono,
        usuarios_envios.calle,
        usuarios_envios.calle1,
        usuarios_envios.calle2,
        usuarios_envios.asentamiento

        FROM usuarios_envios
        INNER JOIN usuarios ON usuarios.idusuarios=usuarios_envios.idusuarios
        LEFT JOIN municipios ON municipios.id =usuarios_envios.municipio
        LEFT join estados ON estados.id=usuarios_envios.estado
        LEFT JOIN pais ON pais.idpais=usuarios_envios.pais
        WHERE usuarios_envios.idusuarios_envios ='$this->idusuarios_envios'";

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

    public function EliminarDireccion()
    {
     
        $sql = "DELETE FROM usuarios_envios where idusuarios_envios='$this->idusuarios_envios'";

        $this->db->consulta($sql);
    
    }

        public function ActualizarUsuarioFotoAlias()
    {
         $query = "UPDATE usuarios SET
         foto = '$this->foto',
         alias='$this->alias',
         estatus='$this->estatus'
        WHERE idusuarios = '$this->idusuarios' ";
     

        $result = $this->db->consulta($query);
    }

    public function ObtenerparentescoUsuario()
    {
         $sql = "SELECT * FROM usuariossecundarios WHERE idusuariotutorado = '$this->idusuarios'";


        $result = $this->db->consulta($sql);
        return $result;
    }

    public function EliminarUsuarioSecundario()
    {
       $sql = "DELETE FROM usuariossecundarios WHERE  idusuariotutorado='$this->idusuarios'";

        $this->db->consulta($sql);
    }
    public function EliminarUsuario()
    {
        $sql = "DELETE FROM usuarios WHERE  idusuarios='$this->idusuarios'";

        $this->db->consulta($sql);
    }

    public function obtenerUsuariosAlumnos($idusuariosservicio)
    {
         $sql = "SELECT * FROM usuarios INNER JOIN tipousuario ON tipousuario.idtipousuario=usuarios.tipo
           WHERE tipo IN(3) ";
           
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

    public function GuardarNivelDeporte()
    {
       $sql = "INSERT INTO deportenivelusuario (idusuario,idnivel,iddeporte)
        VALUES ('$this->idusuarios','$this->idnivel','$this->iddeporte')";



        $result  = $this->db->consulta($sql);
    }

    public function EliminarNivelDeporte()
    {
        $sql = "DELETE FROM deportenivelusuario WHERE  idusuario='$this->idusuarios'";

        $this->db->consulta($sql);
    }

    public function ObtenerDeportesNivel()
    {
        $sql = "SELECT 
            deportenivelusuario.iddeportenivel,
            deportenivelusuario.idusuario,
            deportenivelusuario.idnivel,
            deportenivelusuario.iddeporte,
            deporte.deporte,
            nivel.nivel
        FROM deportenivelusuario
        INNER JOIN deporte ON deportenivelusuario.iddeporte=deporte.iddeporte
        INNER JOIN nivel ON deportenivelusuario.idnivel=nivel.idnivel
         WHERE  idusuario='$this->idusuarios'";

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

    public function CambiarAlias()
    {
        
         $query = "UPDATE usuarios SET
         alias='$this->alias'
        WHERE idusuarios = '$this->idusuarios' ";
      
        $result = $this->db->consulta($query);
    }

    public function obtenerCoachesActivos()
    {
         $sql = "SELECT * FROM usuarios 
           WHERE usuarios.tipo IN(5) AND estatus=1";
           
      
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


    public function ObtenerTutoradosSincel($value='')
    {
        $sql="SELECT
        usuarios.nombre,
        usuarios.paterno,
        usuarios.materno,
        usuarios.idusuarios
        FROM
        usuarios
        JOIN usuariossecundarios
        ON usuarios.idusuarios = usuariossecundarios.idusuariotutorado WHERE usuariossecundarios.idusuariostutor='$this->idusuarios' AND sincel=1";

       
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
  
    public function ObtenerDependencia()
    {
            $sql="SELECT 
                usuarios.nombre,
                usuarios.paterno,
                usuarios.materno,
                usuarios.celular,
                usuarios.usuario,
                usuariossecundarios.idusuariossecundario,
                usuariossecundarios.idusuariostutor,
                usuariossecundarios.idusuariotutorado,
                usuariossecundarios.idparentesco,
                usuariossecundarios.sututor
            FROM usuariossecundarios
            INNER JOIN usuarios ON usuariossecundarios.idusuariostutor=usuarios.idusuarios
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

    public function EliminarAsociacionUsuario()
    {
         $query = "DELETE FROM usuariossecundarios 
        WHERE idusuariotutorado = '$this->idusuarios' ";
    
        $result = $this->db->consulta($query);
    }


    public function ObtenerOrdenTutorado($idusuariotutor)
    {
        $sql="SELECT 
                MAX(orden) AS orden
            FROM usuariossecundarios
            INNER JOIN usuarios ON usuariossecundarios.idusuariostutor=usuarios.idusuarios
        WHERE usuariossecundarios.idusuariostutor='$idusuariotutor' ";
       
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

        $orden=1;
        if (count($array)>0) {
          $orden = $array[0]->orden+1;
        }
        
        return $orden;
    }

  public function ActualizarCelRespaldo($celular)
    {
        $query = "UPDATE usuarios SET
         celular = '',
         celularrespaldo='$celular',
         estatus=0
        WHERE idusuarios = '$this->idusuarios' ";

         $result = $this->db->consulta($query);

    }  

     public function ObtenerAdministradores()
    {
       $sql="SELECT *from usuarios WHERE tipo=0 AND estatus=1 ";
      
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




    public function ObtenerNotificacionesNoleidas()
    {
        $sql = "SELECT *FROM notificacioncliente WHERE idusuario='$this->idusuarios' and estatus=0 ORDER BY idnotificacioncliente DESC";

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

    public function ObtenerTodasNotificaciones()
    {
        $sql = "SELECT *FROM notificacioncliente WHERE idusuario='$this->idusuarios' ORDER BY idnotificacioncliente DESC";

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
         WHERE idusuarios='$this->idusuarios'";
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