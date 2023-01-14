<?php
class Juego
{
	public $db;//objeto de la clase de conexcion
	public $idjuego;
	public $nombre;
	public $descripcion;
/*	public $idtorneo;
*/	public $idtipojuego;
	public $idtipopartido;
	public $idespacio;
	public $fechahora;
	public $tipo_usuario;
	public $lista_empresas;
	public $idservicio;
	public $idtipocompeticion;
	public function ObtenertodosJuegos()
	{
		$query="SELECT
		juego.idjuego,
		juego.nombre,
		juego.descripcion,
		juego.estatus
		FROM
		juego
		GROUP BY idjuego ";

		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	
	
	public function Obtenerjuegos()
	{
		$query="SELECT * FROM juego WHERE estatus=1";
		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	//funcion para guardar los paises 
	
	public function Guardarjuego()
	{
		$query="INSERT INTO juego (nombre,descripcion,idservicio,estatus,idtipojuego,idtipopartido,iddeporte,idtipocompeticion) VALUES ('$this->nombre','$this->descripcion','$this->idservicio','$this->estatus','$this->idtipojuego','$this->idtipopartido','$this->iddeporte','$this->idtipocompeticion')";
		
		
		$resp=$this->db->consulta($query);
		$this->idjuego = $this->db->id_ultimo();
		
		
	}
	//funcion para modificar los usuarios
	public function Modificarjuego()
	{
		$query="UPDATE juego SET nombre='$this->nombre',
		descripcion='$this->descripcion',
		idtorneo='$this->idtorneo',
		idespacio='$this->idespacio',
		idhorario='$this->fechahora',
		estatus='$this->estatus',
		idtipojuego='$this->idtipojuego',
		idtipopartido='$this->idtipopartido'
		WHERE idjuego=$this->idjuego";


		$resp=$this->db->consulta($query);
	}
	
	///funcion para objeter datos de un usuario
	public function buscarjuego()
	{
		$query="SELECT
		juego.idjuego,
		juego.nombre,
		juego.descripcion,
		juego.idtorneo,
		juego.idespacio,
		juego.idhorario,
		juego.estatus,
		juego.idtipojuego,
		juego.idtipopartido,
		juego.marcador1,
		juego.marcador2,
		juego.jugado,
		espacio.nombre as nombreespacio,
		CONCAT(horario.hora,' ',horario.dia,'/',horario.mes,'/',horario.anio) as fecha,
		tipojuego.nombre as nombretipojuego,
		torneo.nombre as nombretorneo
		FROM
		juego

		INNER JOIN espacio ON espacio.idespacio=juego.idespacio
		INNER JOIN horario ON horario.idhorario=juego.idhorario
		INNER JOIN tipojuego ON tipojuego.idtipojuego=juego.idtipojuego
		INNER JOIN torneo ON torneo.idtorneo=juego.idtorneo
		WHERE juego.idjuego=".$this->idjuego."";

		
		$resp=$this->db->consulta($query);
		
		//echo $total;
		return $resp;
	}
	

	public function GuardarClienteJuego($idcliente,$equipo)
	{
		$query="INSERT INTO juegocliente (idcliente,idjuego,equipo) VALUES ('$idcliente','$this->idjuego','$equipo')";
		
		
		$resp=$this->db->consulta($query);
	}

	public function borrarJuego()
	{
		$query="DELETE FROM juego WHERE idjuego='$this->idjuego'";
		$resp=$this->db->consulta($query);
	}

	public function EliminarClienteJuego($value='')
	{
		$query="DELETE FROM juegocliente WHERE idjuego='$this->idjuego'";
		$resp=$this->db->consulta($query);
	}

	public function EliminarSets()
	{
		
		$query="DELETE FROM sets WHERE idjuego='$this->idjuego'";
		$resp=$this->db->consulta($query);
	}

	public function obtenerjugadores()
	{
		$sql = "SELECT
		juegocliente.idcliente,
		clientes.nombre,
		clientes.paterno,
		clientes.materno,
		clientes.foto,
		clientes.posicion,
		clientes.nivel,
		clientes.email,
		juegocliente.equipo,
		juegocliente.idjuego
		FROM
		juegocliente
		JOIN clientes
		ON juegocliente.idcliente = clientes.idcliente 
		WHERE juegocliente.idjuego='$this->idjuego'";
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

	public function CrearSets($i)
	{
		$i=$i+1;
		$query="INSERT INTO sets (idjuego,numeroset) VALUES ('$this->idjuego','$i')";
		
		
		$resp=$this->db->consulta($query);
	}


	public function BuscarPareja($team,$parejas)
	{
		$pareja=array();

		if (count($parejas)>0 && $team!=0) {
			
			for ($i=0; $i <count($parejas) ; $i++) { 
				if ($parejas[$i]->{'numeropareja'}==$team) {
					//var_dump($parejas[$i]->{'participante1'});die();
					$foto1=$this->ConsultarFoto($parejas[$i]->{'participante1'});
					$foto2=$this->ConsultarFoto($parejas[$i]->{'participante2'});
					$pareja=array('participante1'=>$parejas[$i]->{'participante1'},'participante2'=>$parejas[$i]->{'participante2'},'nombreparticipante1'=>$parejas[$i]->{'nombreparticipante1'},'nombreparticipante2'=>$parejas[$i]->{'nombreparticipante2'},'foto1'=>$foto1,'foto2'=>$foto2);

					break;
				}
			}
		}

		return $pareja;
	}


	public function ConsultarFoto($idusuario)
	{
		$sql="SELECT 
		usuarios.idusuarios,
		usuarios.nombre,
		usuarios.foto,
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
		 WHERE idusuarios='$idusuario'";

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
        
       


        if($array[0]->foto==""){
														$rutaperfil="images/sinfoto.png";
													}
													else{
		
														if ($_SESSION['carpetaapp']=='') {
															$carpeta="";
														}else{
															$carpeta=$_SESSION['carpetaapp'].'/';

														}

														$rutaperfil="../app/".$carpeta."php/upload/perfil/".$array[0]->foto;
													}


											return $rutaperfil;
			}
	
}
?>