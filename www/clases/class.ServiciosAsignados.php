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
	
	public $fecha;
	public $horainicial;
	public $horafinal;
	public $idzona;

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
		$horaactual=date('H:i:s');
		$dia=date('w');
		$sql="	SELECT* FROM
					horariosservicio 
				WHERE
					idservicio = '$this->idservicio'  
					AND fecha >='$fechaactual'
					 ORDER BY fecha,dia,horainicial";

				
				
		$resp=$this->db->consulta($sql);
		$cont = $this->db->num_rows($resp);


		$array=array();
		$contador=0;
		$newArray=array();
		if ($cont>0) {

			while ($objeto=$this->db->fetch_object($resp)) {
					$horaactual=date('H:i:s');
					$dia=date('w');
					$horaentrada=date('H:i:s',strtotime($objeto->horainicial));

					
					$datetime1 = $fechaactual.' '.$horaactual;//start time
					$datetime2 = $objeto->fecha.' '.$objeto->horainicial;//end time

					$consulta="SELECT TIMESTAMPDIFF(MINUTE,'$datetime1','$datetime2') as intervalo";
					$resp2=$this->db->consulta($consulta);
					$obj=$this->db->fetch_assoc($resp2);

					$interval = $obj['intervalo'];


						$objeto->diferencia=$interval;
						
						$array[$contador]=$objeto;

						$salir=1;
						//break;

					//}
					$contador++;
				}

 					
				for ($i=0;$i<count($array);$i++){
				   	//echo intval($array[$i]->diferencia).'<br>';

				   	$number=$array[$i]->diferencia;
				    if ($number>=0){
				      array_push($newArray, $array[$i]);
				    
				    }
				    
				}

								

			} 
		
		
		return $newArray;

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
				tipousuario.nombretipo,
				usuarios.alias
				FROM
				usuarios_servicios
				JOIN usuarios
				ON usuarios_servicios.idusuarios = usuarios.idusuarios
				JOIN tipousuario
				ON tipousuario.idtipousuario=usuarios.tipo
				WHERE
				usuarios_servicios.idservicio='$this->idservicio' AND usuarios.idusuarios NOT IN('$this->idusuario') AND usuarios.tipo=3 and usuarios_servicios.cancelacion=0 ORDER BY usuarios.tipo DESC 
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
				usuarios_servicios.idservicio='$this->idservicio' AND usuarios.idusuarios NOT IN('$this->idusuario') AND cancelacion=0 ORDER BY usuarios.tipo DESC 
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


	public function GuardarAsignacion()
	{
		$query="INSERT INTO usuarios_servicios 
		(idservicio,idusuarios) VALUES ('$this->idservicio','$this->idusuario')";
		
		$resp=$this->db->consulta($query);
		$this->idusuarios_servicios=$this->db->id_ultimo();
	}

	public function BuscarAsignacion()
	{
		
		$sql="SELECT
				*
				FROM
				usuarios_servicios
				JOIN usuarios
				ON usuarios_servicios.idusuarios = usuarios.idusuarios
				JOIN tipousuario
				ON tipousuario.idtipousuario=usuarios.tipo
				WHERE tipousuario.idtipousuario=3 AND 
				usuarios_servicios.idservicio = '$this->idservicio' AND usuarios.idusuarios='$this->idusuario' AND cancelacion=0
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


	public function BuscarAsignacionCancelacion($idusuariosnoconsiderados)
	{
		$sql="SELECT
				*
				FROM
				usuarios_servicios
				JOIN usuarios
				ON usuarios_servicios.idusuarios = usuarios.idusuarios
				JOIN tipousuario
				ON tipousuario.idtipousuario=usuarios.tipo
				WHERE tipousuario.idtipousuario=3 AND cancelacion=0 and 
				usuarios_servicios.idservicio = '$this->idservicio' AND usuarios_servicios.idusuarios NOT IN($idusuariosnoconsiderados)
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

	public function BuscarPagos()
	{
		$sql="SELECT
				*
				FROM
				pagos
				WHERE
				idservicio = '$this->idservicio' AND 
				idusuarios ='$this->idusuario'
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

	public function CambiarEstatusPago($idpago,$estatus)
	{
		$query="UPDATE  pagos 
			SET estatus='$estatus'
			 WHERE idpago='$idpago'

		";
		$resp=$this->db->consulta($query);
	}

	public function CambiarEstatusServicio($usuarioservicio)
	{
		$query="UPDATE  usuarios_servicios 
			SET cancelacion='$this->cancelado',
			motivocancelacion='".$this->motivocancelacion."',
			fechacancelacion='".date('Y-m-d H:s:i')."' WHERE idusuarios_servicios='$usuarioservicio'

		";

		$resp=$this->db->consulta($query);
		
	}

	public function ObtenerServicio()
	{
		$sql="SELECT*
				FROM
				servicios WHERE idservicio= '$this->idservicio'
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


	public function ActualizarConsecutivo()
	{

		 $sql="SELECT *FROM pagina_configuracion";
		 $resp = $this->db->consulta($sql);
		 $datos=$this->db->fetch_assoc($resp);


		 $val=$datos['contadorfolio'];
		 $valor=$val+1;

		$sql="UPDATE pagina_configuracion SET contadorfolio='$valor'";


		 $resp = $this->db->consulta($sql);
		return $val;
		
	}

	public function is_negative_number($number=0){

	if( is_numeric($number) AND ($number<0) ){
		return true;
	}else{
		return false;
	}

	}

	public function BuscarAsignaciones()
	{

		$sql="SELECT*
			FROM
			usuarios_servicios WHERE idusuarios= '$this->idusuario' AND aceptarterminos IN(0,1) AND cancelacion=0
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

	public function BuscarHorarioEnArray($fecha,$horainicial,$horafinal,$idzona,$arrayhorariosservicio)
	{
		$encontrado=0;
		if (count($arrayhorariosservicio)>0) {

			for ($i=0; $i <count($arrayhorariosservicio) ; $i++) { 
				
				if ($arrayhorariosservicio[$i]->fecha==$fecha && $arrayhorariosservicio[$i]->horainicial>=$horainicial &&  $arrayhorariosservicio[$i]->horafinal<=$horafinal) {
					
					$encontrado=1;
					break;
					return $encontrado;



				}
			}

			if ($encontrado==0) {
				return $encontrado;
			}


		}else{
			return $encontrado;
		}
		# code...
	}


	public function EvaluarHorarioFechaZona($idservicioasignar)
	{
		
  		$sql="SELECT * FROM horariosservicio WHERE  fecha='$this->fecha' and '$this->horainicial'<=horafinal AND '$this->horafinal'>=horainicial AND idservicio = '$idservicioasignar'";
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


	public function groupArray($array,$groupkey)
	{

	if(count($array)>0)
	{

		$keys = array_keys($array[0]);
		
		$removekey = array_search($groupkey, $keys);

		if ($removekey===false){
			return array("Clave \"$groupkey\" no existe");
		}
		else{
			unset($keys[$removekey]);
		}

		$groupcriteria = array();
		$return=array();

		foreach($array as $value)
		{
			$item=null;

			foreach($keys as $key)
			{
				
				$item[$key] = $value[$key];
			}

			$busca = array_search($value[$groupkey], $groupcriteria);
			
			if($busca === false)
			{
				$groupcriteria[]=$value[$groupkey];
				$return[]=array($groupkey=>$value[$groupkey],'groupeddata'=>array());
				$busca=count($return)-1;
			}
			$return[$busca]['groupeddata'][]=$item;
		}
		return $return;
	}else{
		return array();
	}

}


	public function BuscadorArray($array,$valor)
	{

		$encontrado=false;

		//var_dump($array);

		if (count($array)>0) {
			# code...
		
		for ($i=0; $i <count($array) ; $i++) { 
			
			if ($array[$i]->idservicio==$valor) {
				$encontrado=true;
				break;
			}

		}
	}

		return $encontrado;

	}


	public function BuscarAsignacionCancelacionUsuarios($idusuariosnoconsiderados)
	{
		$sql="SELECT
				*
				FROM
				usuarios_servicios
				JOIN usuarios
				ON usuarios_servicios.idusuarios = usuarios.idusuarios
				JOIN tipousuario
				ON tipousuario.idtipousuario=usuarios.tipo
				WHERE tipousuario.idtipousuario=3 AND cancelacion=0 and 
				usuarios_servicios.idservicio = '$this->idservicio' AND usuarios_servicios.idusuarios  IN($idusuariosnoconsiderados)
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

		public function obtenerUsuariosServiciosAsignadosAgrupadosAlumnos()
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
				usuarios_servicios.idservicio='$this->idservicio' AND usuarios.idusuarios  AND cancelacion=0 ORDER BY usuarios.tipo DESC 
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


	public function EvaluarHorarioFechaServicio($fechae,$horainicale,$horafinale)
	{

		$datetime1 = $this->fecha;
		$datetime2 = $fechae;


		if($datetime1==$datetime2){

			
			if ($this->horainicial>=$horainicale && $this->horafinal<=$horafinale ) {

				return true;
			}else{
				return false;
			}

		}else{

			return false;
		}
		
		
	}



	public function BuscarAsignacionCoach()
	{
		
		$sql="SELECT
				*
				FROM
				usuarios_servicios
				JOIN usuarios
				ON usuarios_servicios.idusuarios = usuarios.idusuarios
				JOIN tipousuario
				ON tipousuario.idtipousuario=usuarios.tipo
				JOIN usuarioscoachs
				ON usuarioscoachs.idusuarios_servicios=usuarios_servicios.idusuarios_servicios
				WHERE tipousuario.idtipousuario=5 AND 
				usuarios_servicios.idservicio = '$this->idservicio'  AND cancelacion=0
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


	public function ObtenerpagoServicio()
	{
		$sql="
			SELECT *FROM pagos WHERE 
			idservicio='$this->idservicio' AND idusuarios='$this->idusuario' AND estatus=2

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


	public function CambiarEstatusAsignacion($usuarioservicio)
	{
		$query="UPDATE  usuarios_servicios 
			SET estatus=1 
			WHERE idusuarios_servicios='$this->idusuarios_servicios'

		";

		$resp=$this->db->consulta($query);
		
	}


}