<?php
class ServiciosAsignados
{
	public $db;
	public $idservicio;
	public $idusuario;
	public $idusuarios_servicios;
	public $motivocancelacion;
	public $fechacancelacion;
	public $cancelacion;
	public $estatus;
	

	public function obtenerServiciosAsignados()
	{
		$sql="SELECT *FROM usuarios_servicios INNER JOIN 
		servicios ON usuarios_servicios.idservicio=servicios.idservicio WHERE idusuarios='$this->idusuario' AND usuarios_servicios.estatus IN(0,1)
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


	public function ObtenerHorariosServicio()
	{
		$sql="SELECT *FROM horariosservicio INNER JOIN zonas ON horariosservicio.idzona=zonas.idzona WHERE idservicio='$this->idservicio' ORDER BY fecha,dia,horainicial asc
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


	public function buscarUsuarioServicio()
	{
		$sql="SELECT *FROM usuarios_servicios INNER JOIN 
		servicios ON usuarios_servicios.idservicio=servicios.idservicio WHERE idusuarios='$this->idusuario'
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

	public function ObtenerServicioAsignado()
	{
		$sql="SELECT *FROM usuarios_servicios INNER JOIN 
		servicios ON usuarios_servicios.idservicio=servicios.idservicio WHERE idusuarios_servicios='$this->idusuarios_servicios'
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

	public function GuardarAceptacion()
	{
		$sql="
		UPDATE usuarios_servicios 
		SET aceptarterminos = 1,
		estatus=1, 
		fechaaceptacion = '".date('Y-m-d H:i:s')."'
		WHERE idusuarios_servicios = '$this->idusuarios_servicios'";
		$resp=$this->db->consulta($sql);

	}

	public function GuardarCancelacion()
	{
		$sql="
		UPDATE usuarios_servicios 
		SET cancelacion = '$this->cancelacion', 
		fechacancelacion = '$this->fechacancelacion',
		motivocancelacion='$this->motivocancelacion',
		estatus='$this->estatus'
		WHERE idusuarios_servicios = '$this->idusuarios_servicios'";
		$resp=$this->db->consulta($sql);
	}


	public function ObtenerHorariosServicioZona()
	{
		$sql="SELECT *FROM horariosservicio INNER JOIN zonas ON horariosservicio.idzona=zonas.idzona WHERE idservicio='$this->idservicio'  ORDER BY fecha,dia,horainicial ASC
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


	public function obtenerUsuariosServiciosAsignados()
	{
		$sql="SELECT
				usuarios.nombre,
				usuarios.paterno,
				usuarios.telefono,
				usuarios.materno,
				usuarios.email,
				usuarios.celular,
				usuarios.usuario,
				usuarios.idusuarios,
				usuarios.foto,
				usuarios.tipo,
				tipousuario.nombretipo
				FROM
				usuarios_servicios
				JOIN usuarios
				ON usuarios_servicios.idusuarios = usuarios.idusuarios
				JOIN tipousuario
				ON tipousuario.idtipousuario=usuarios.tipo
				WHERE
				usuarios_servicios.idservicio='$this->idservicio' AND usuarios.idusuarios NOT IN('$this->idusuario') ORDER BY usuarios.tipo DESC 
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

	public function ObtenerHorariosProximo()
	{
		$fechaactual=date('Y-m-d');
		
		$sql="SELECT
					* 
				FROM
					horariosservicio 
				WHERE
				idservicio = '$this->idservicio' 
				AND fecha BETWEEN '$fechaactual'
				AND DATE_ADD(fecha, INTERVAL 15 DAY ) ORDER BY fecha,dia,horainicial ASC ";

		$resp=$this->db->consulta($sql);
		$cont = $this->db->num_rows($resp);


		$array=array();
		$contador=0;
		if ($cont>0) {

			while ($objeto=$this->db->fetch_object($resp)) {
					$horaactual=date('H:i:s');
					$dia=date('w');
					$horaentrada=date('H:i:s',strtotime($objeto->horainicial));

					$salir=0;

					if ($dia==$objeto->dia && $horaentrada>=$horaactual) {
						
						
						$array[$contador]=$objeto;

						$salir=1;
						break;

					}


					if ($salir==0) {
						

						/*$sqlbuscar="SELECT *FROM horariosservicio  WHERE idservicio=".$this->idservicio." AND dia>=".$dia." ORDER BY dia,horainicial asc limit 1";*/
				$sqlbuscar="
						SELECT* FROM
					horariosservicio 
				WHERE
					idservicio = '$this->idservicio' AND dia>='$dia' 
					AND fecha BETWEEN '$fechaactual'
					AND DATE_ADD( fecha, INTERVAL 15 DAY ) ORDER BY fecha,dia,horainicial asc limit 1";


						$respuesta=$this->db->consulta($sqlbuscar);
						$conta = $this->db->num_rows($respuesta);


						if ($conta>0) {
							
							while ($objetosiguiente=$this->db->fetch_object($respuesta)) {

								$array[$contador]=$objetosiguiente;

								$salir=1;
								break;

							}

						}else{

							/*$sqlbuscar="SELECT *FROM horariosservicio  WHERE idservicio=".$this->idservicio." AND dia<=".$dia." ORDER BY dia,horainicial asc limit 1";*/
						$sqlbuscar="
					SELECT* FROM
						horariosservicio 
					WHERE
						idservicio = '$this->idservicio' AND dia<='$dia' 
						AND fecha BETWEEN '$fechaactual'
						AND DATE_ADD( fecha, INTERVAL 15 DAY ) ORDER BY fecha,dia,horainicial asc limit 1";


								$respuesta=$this->db->consulta($sqlbuscar);
								$conta = $this->db->num_rows($respuesta);
								
								while ($objetosiguiente=$this->db->fetch_object($respuesta)) {

								$array[$contador]=$objetosiguiente;

								$salir=1;
								break;

							}

						}


					}

					if ($salir==1) {
						break;
					}



				$contador++;
			} 
		}
		
		return $array;

	}



	public function obtenerUsuariosServiciosAlumnosAsignados()
	{
		$sql="SELECT
				usuarios.nombre,
				usuarios.paterno,
				usuarios.telefono,
				usuarios.materno,
				usuarios.email,
				usuarios.celular,
				usuarios.usuario,
				usuarios.idusuarios,
				usuarios.foto,
				usuarios.tipo,
				tipousuario.nombretipo
				FROM
				usuarios_servicios
				JOIN usuarios
				ON usuarios_servicios.idusuarios = usuarios.idusuarios
				JOIN tipousuario
				ON tipousuario.idtipousuario=usuarios.tipo
				WHERE
				usuarios_servicios.idservicio='$this->idservicio' AND usuarios.idusuarios NOT IN('$this->idusuario') AND usuarios.tipo=3 ORDER BY usuarios.tipo DESC 
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


	public function obtenerUsuariosServiciosAsignadosAgrupado()
	{
		$sql="SELECT
				
				GROUP_CONCAT(usuarios.idusuarios) as idusuarios
				
				FROM
				usuarios_servicios
				JOIN usuarios
				ON usuarios_servicios.idusuarios = usuarios.idusuarios
				JOIN tipousuario
				ON tipousuario.idtipousuario=usuarios.tipo
				WHERE
				usuarios_servicios.idservicio='$this->idservicio' AND usuarios.idusuarios NOT IN('$this->idusuario') ORDER BY usuarios.tipo DESC 
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

}