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
		$sql="SELECT *,
			(SELECT MIN(fecha) from horariosservicio WHERE horariosservicio.idservicio =servicios.idservicio) as fechamin,
	(SELECT MAX(fecha) from horariosservicio WHERE horariosservicio.idservicio =servicios.idservicio) as fechamax,
		(SELECT
			COUNT(*)
			FROM
			notapago_descripcion
			JOIN pagos
			ON notapago_descripcion.idpago = pagos.idpago 
			JOIN notapago
			ON notapago.idnotapago = notapago_descripcion.idnotapago
			WHERE
			pagado=1 AND notapago.estatus=1 AND
			  pagos.idservicio=usuarios_servicios.idservicio AND pagos.idusuarios=usuarios_servicios.idusuarios)as pagado
		FROM usuarios_servicios INNER JOIN 
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
				usuarios_servicios.idservicio,
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
				usuarios.alias,
				usuarios_servicios.estatus,
				usuarios_servicios.aceptarterminos,
				(SELECT COUNT(*)  FROM horariosservicio WHERE horariosservicio.idservicio=usuarios_servicios.idservicio) as cantidadhorarios,
				(SELECT COUNT(*) FROM usuariossecundarios WHERE usuariossecundarios.idusuariotutorado=usuarios.idusuarios AND usuariossecundarios.sututor=1) as tutor

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

	
	public function obtenerServiciosAsignadosCoach2($sqlcategorias)
	{
		$sql="SELECT *FROM usuarios_servicios INNER JOIN 
		servicios ON usuarios_servicios.idservicio=servicios.idservicio
		INNER JOIN usuarios ON usuarios.idusuarios=usuarios_servicios.idusuarios
		 WHERE idusuarios='$this->idusuario' AND usuarios_servicios.estatus IN(0,1)
			AND cancelacion=0 AND servicios.validaradmin=1 ";

		/*if ($sqlcategorias!='') {
			
			$sql.=$sqlcategorias;
		}*/


		$sql.="	GROUP BY usuarios_servicios.idservicio,usuarios_servicios.idusuarios
		 ";

		$resp=$this->db->consulta($sql);
		$cont = $this->db->num_rows($resp);


		$array=array();
		$contador=0;
		if ($cont>0) {

			while ($objeto=$this->db->fetch_object($resp)) {

				/*$fechaactual=date('Y-m-d');


				$sql1="SELECT *FROM horariosservicio WHERE idservicio='$objeto->idservicio' AND fecha>='$fechaactual'";
				$resphorarios=$this->db->consulta($sql1);

				$conta = $this->db->num_rows($resphorarios);
*/
				//if ($conta>0) {

					$array[$contador]=$objeto;
					$contador++;
				
				//}
			} 
		}
		
		return $array;
	}

	
	public function CalcularMontoPago($tipo,$cantidad,$montopago)
	{

		if ($tipo==0) {

		 	$monto=($montopago*$cantidad)/100;
			
		}
		if ($tipo==1) {
			$monto=$cantidad;
		}



		return $monto;


	}


	
	public function CalcularMontoPago2($tipo,$cantidad,$montopago,$cantidadhorarios)
	{

		if ($tipo==0) {

		 	$monto=($montopago*$cantidad)/100;
			
		}
		if ($tipo==1) {
			$monto=$cantidad;
		}


		if ($tipo==2) {
			$monto=$cantidadhorarios*$cantidad;
		}


		return $monto;


	}

	public function ObtenertipoMontopago()
	{
		$sql="SELECT
				*
				FROM
				usuarioscoachs
				WHERE 
				idusuarios_servicios = '$this->idusuarios_servicios';
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



	public function obtenerUsuariosServiciosAsignadosAlumnos()
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
				usuarios_servicios.aceptarterminos
				FROM
				usuarios_servicios
				JOIN usuarios
				ON usuarios_servicios.idusuarios = usuarios.idusuarios
				JOIN tipousuario
				ON tipousuario.idtipousuario=usuarios.tipo
				WHERE
				usuarios_servicios.idservicio='$this->idservicio' AND usuarios_servicios.estatus=1 AND usuarios.tipo=3 ORDER BY usuarios.tipo DESC 
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


	public function VerificarSihaPagado()
	{
		$sql="SELECT * FROM pagos
			WHERE  idservicio = '$this->idservicio' 
			AND pagado=1 AND idusuarios='$this->idusuario'
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


	public function obtenerCoach2V()
	{
	
		$sql="SELECT *,
		(SELECT COUNT(*) FROM usuarios_servicios  INNER JOIN pagos on usuarios_servicios
		.idusuarios=pagos.idusuarios   WHERE pagos.pagado=1 AND usuarios_servicios.idservicio=servicios.idservicio )  AS pagados,
		(SELECT COUNT(*) FROM usuarios_servicios    WHERE usuarios_servicios.aceptarterminos=1  AND usuarios_servicios.idservicio=servicios.idservicio) as aceptados
		FROM usuarios_servicios INNER JOIN 
		servicios ON usuarios_servicios.idservicio=servicios.idservicio WHERE idusuarios='$this->idusuario' AND usuarios_servicios.estatus IN(0,1)
			AND cancelacion=0 AND servicios.validaradmin=1 
			GROUP BY usuarios_servicios.idservicio,usuarios_servicios.idusuarios";


		$resp=$this->db->consulta($sql);
		$cont = $this->db->num_rows($resp);


		$array=array();
		$contador=0;
		if ($cont>0) {

			while ($objeto=$this->db->fetch_object($resp)) {

				$fechaactual=date('Y-m-d');
			/*if ($objeto->aceptados==$objeto->pagados && $objeto->pagados>=$objeto->aceptados) {*/

				/*$sql1="SELECT *FROM horariosservicio WHERE idservicio='$objeto->idservicio' AND fecha>='$fechaactual'";
				$resphorarios=$this->db->consulta($sql1);

				$conta = $this->db->num_rows($resphorarios);

				if ($conta>0) {*/

					$array[$contador]=$objeto;
					$contador++;
				
				//}
			/*}else{


				$array[$contador]=$objeto;
						$contador++;
			}*/
		}
		
		return $array;
	}
}


	public function ObtenerNoVigentes()
	{
		$sql="SELECT *,
				(SELECT COUNT(*) FROM usuarios_servicios  INNER JOIN pagos on usuarios_servicios
		.idusuarios=pagos.idusuarios   WHERE pagos.pagado=1 AND usuarios_servicios.idservicio=servicios.idservicio )  AS pagados,
		(SELECT COUNT(*) FROM usuarios_servicios    WHERE usuarios_servicios.aceptarterminos=1  AND usuarios_servicios.idservicio=servicios.idservicio) as aceptados
		FROM usuarios_servicios INNER JOIN 
		servicios ON usuarios_servicios.idservicio=servicios.idservicio WHERE idusuarios='$this->idusuario' AND usuarios_servicios.estatus IN(0,1)
			AND cancelacion=0 AND servicios.validaradmin=1 

			GROUP BY usuarios_servicios.idservicio,usuarios_servicios.idusuarios
		 ";

		$resp=$this->db->consulta($sql);
		$cont = $this->db->num_rows($resp);


		$array=array();
		$contador=0;
		if ($cont>0) {

			while ($objeto=$this->db->fetch_object($resp)) {

				$fechaactual=date('Y-m-d');
			/*if ($objeto->aceptados==$objeto->pagados && $objeto->pagados>=$objeto->aceptados) {

				$sql1="SELECT COUNT(*) AS horarios FROM horariosservicio WHERE idservicio='$objeto->idservicio' AND fecha>'$fechaactual'";
				$resphorarios=$this->db->consulta($sql1);

				$horarios = $this->db->fetch_assoc($resphorarios);

				$conta=$horarios['horarios'];

				if ($conta==0) {

					$array[$contador]=$objeto;
					$contador++;
				
				}

			}else{*/

					$array[$contador]=$objeto;
						$contador++;
					

				//}
			} 
		}
		
		return $array;
	}


		public function obtenerServiciosAsignadosCoach3($sqlcategorias)
	{
		$sql="SELECT *FROM usuarios_servicios INNER JOIN 
		servicios ON usuarios_servicios.idservicio=servicios.idservicio
		INNER JOIN usuarios ON usuarios.idusuarios=usuarios_servicios.idusuarios
		 WHERE usuarios_servicios.idservicio='$this->idservicio' AND usuarios_servicios.estatus IN(0,1)
			AND cancelacion=0 AND servicios.validaradmin IN(0,1) AND usuarios.tipo=5 ";



	/*	$sql.="	GROUP BY usuarios_servicios.idservicio,usuarios_servicios.idusuarios
		 ";*/
		
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

	public function EliminarAsignacionUsuario()
	{
		$sql="DELETE FROM usuarios_servicios WHERE idusuarios='$this->idusuario' AND idservicio='$this->idservicio'";
		$resp=$this->db->consulta($sql);

	}

	
	public function obtenerServiciosAsignadosAceptados()
	{
		$sql="SELECT 
			usuarios_servicios.idusuarios_servicios,
				usuarios_servicios.idusuarios,
				usuarios_servicios.idservicio,
				usuarios_servicios.fechacreacion,
				usuarios_servicios.aceptarterminos,
				usuarios_servicios.fechaaceptacion,
				usuarios_servicios.cancelacion,
				usuarios_servicios.motivocancelacion,
				usuarios_servicios.estatus,
				usuarios_servicios.fechacancelacion,
				servicios.idservicio AS idservicio_0,
				servicios.titulo,
				servicios.descripcion,
				servicios.idcategoriaservicio,
				servicios.imagen,
				servicios.orden,
				servicios.fechainicial,
				servicios.fechafinal,
				servicios.nodedias,
				servicios.idcategoria,
				servicios.precio,
				servicios.totalclases,
				servicios.montopagarparticipante,
				servicios.montopagargrupo,
				servicios.modalidad,
				servicios.modalidaddepago,
				servicios.periodo,
				servicios.lunes,
				servicios.martes,
				servicios.miercoles,
				servicios.jueves,
				servicios.viernes,
				servicios.sabado,
				servicios.domingo,
				servicios.numeroparticipantes,
				servicios.numeroparticipantesmax,
				servicios.abiertocliente,
				servicios.abiertocoach,
				servicios.abiertoadmin,
				servicios.ligarcliente,
				servicios.reembolso,
				servicios.cancelaciondescricion,
				servicios.idpoliticaaceptacion,
				servicios.tiporeembolso,
				servicios.validaradmin,
				servicios.agregousuario,
				servicios.habilitarclonadocoach,
				servicios.habilitarclonadoadmin,
				servicios.controlasistencia,
				servicios.politicasaceptacion,
				servicios.numligarclientes,
				servicios.politicascancelacion,
				servicios.descripcionaviso,
				servicios.tiempoaviso,
				servicios.tituloaviso,
				servicios.asignadoadmin,
				servicios.asignadocoach,
				servicios.asignadocliente,
				servicios.cantidadreembolso,
					servicios.aceptarserviciopago

		FROM usuarios_servicios INNER JOIN 
		servicios ON usuarios_servicios.idservicio=servicios.idservicio    WHERE usuarios_servicios.idusuarios IN($this->idusuario) AND usuarios_servicios.estatus IN(1)
			AND usuarios_servicios.cancelacion=0 AND usuarios_servicios.aceptarterminos=1 
			
			UNION 
			
			
			SELECT 
			usuarios_servicios.idusuarios_servicios,
				usuarios_servicios.idusuarios,
				usuarios_servicios.idservicio,
				usuarios_servicios.fechacreacion,
				usuarios_servicios.aceptarterminos,
				usuarios_servicios.fechaaceptacion,
				usuarios_servicios.cancelacion,
				usuarios_servicios.motivocancelacion,
				usuarios_servicios.estatus,
				usuarios_servicios.fechacancelacion,
				servicios.idservicio AS idservicio_0,
				servicios.titulo,
				servicios.descripcion,
				servicios.idcategoriaservicio,
				servicios.imagen,
				servicios.orden,
				servicios.fechainicial,
				servicios.fechafinal,
				servicios.nodedias,
				servicios.idcategoria,
				servicios.precio,
				servicios.totalclases,
				servicios.montopagarparticipante,
				servicios.montopagargrupo,
				servicios.modalidad,
				servicios.modalidaddepago,
				servicios.periodo,
				servicios.lunes,
				servicios.martes,
				servicios.miercoles,
				servicios.jueves,
				servicios.viernes,
				servicios.sabado,
				servicios.domingo,
				servicios.numeroparticipantes,
				servicios.numeroparticipantesmax,
				servicios.abiertocliente,
				servicios.abiertocoach,
				servicios.abiertoadmin,
				servicios.ligarcliente,
				servicios.reembolso,
				servicios.cancelaciondescricion,
				servicios.idpoliticaaceptacion,
				servicios.tiporeembolso,
				servicios.validaradmin,
				servicios.agregousuario,
				servicios.habilitarclonadocoach,
				servicios.habilitarclonadoadmin,
				servicios.controlasistencia,
				servicios.politicasaceptacion,
				servicios.numligarclientes,
				servicios.politicascancelacion,
				servicios.descripcionaviso,
				servicios.tiempoaviso,
				servicios.tituloaviso,
				servicios.asignadoadmin,
				servicios.asignadocoach,
				servicios.asignadocliente,
				servicios.cantidadreembolso,
					servicios.aceptarserviciopago

		FROM usuarios_servicios INNER JOIN 
		servicios ON usuarios_servicios.idservicio=servicios.idservicio    WHERE usuarios_servicios.idusuarios IN($this->idusuario) AND usuarios_servicios.estatus IN(0)
			AND usuarios_servicios.cancelacion=0 and servicios.aceptarserviciopago=1
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


	
	public function VerificacionUsuarioServicios($idcategoria)
	{
		$sql="SELECT *FROM (SELECT usuarios_servicios.idusuarios,usuarios_servicios.idservicio,
			(SELECT COUNT(*) FROM pagos INNER JOIN notapago_descripcion on pagos.idpago=notapago_descripcion.idpago
		INNER JOIN notapago on notapago_descripcion.idnotapago =notapago.idnotapago
		WHERE pagos.idservicio=servicios.idservicio and pagos.idusuarios='$this->idusuario' and notapago.estatus=1 ) AS numeropagos
		FROM usuarios_servicios INNER JOIN 
		servicios ON usuarios_servicios.idservicio=servicios.idservicio WHERE usuarios_servicios.idusuarios='$this->idusuario' AND usuarios_servicios.cancelacion=0 and usuarios_servicios.aceptarterminos=1 AND servicios.idcategoriaservicio='$idcategoria')as tabla WHERE numeropagos=0";
		
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




	public function obtenerUsuariosServiciosAlumnosAsignadosReporte($estatusaceptado,$estatuspagado)
	{
		$sql="SELECT*FROM (SELECT *,  CASE WHEN pagado > 0 THEN 1 ELSE 0 END AS pagado_flag
		FROM (SELECT
				usuarios_servicios.idservicio,
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
				usuarios.alias,
				usuarios_servicios.estatus,
				usuarios_servicios.aceptarterminos,
				(SELECT COUNT(*)  FROM horariosservicio WHERE horariosservicio.idservicio=usuarios_servicios.idservicio) as cantidadhorarios,
				(SELECT COUNT(*) FROM usuariossecundarios WHERE usuariossecundarios.idusuariotutorado=usuarios.idusuarios AND usuariossecundarios.sututor=1) as tutor,
				(SELECT COUNT(*) FROM  pagos 
				INNER JOIN notapago_descripcion ON pagos.idpago=notapago_descripcion.idpago
				INNER join notapago ON notapago.idnotapago=notapago_descripcion.idnotapago
				WHERE pagos.idusuarios=usuarios_servicios.idusuarios and pagos.idservicio=usuarios_servicios.idservicio and notapago.estatus=1 ) as pagado

				FROM
				usuarios_servicios
				JOIN usuarios
				ON usuarios_servicios.idusuarios = usuarios.idusuarios
				JOIN tipousuario
				ON tipousuario.idtipousuario=usuarios.tipo
				WHERE
				usuarios_servicios.idservicio='$this->idservicio' AND usuarios.idusuarios NOT IN('$this->idusuario') AND usuarios.tipo=3";

				if ($estatusaceptado!='') {
					$sql.=" AND usuarios_servicios.aceptarterminos IN($estatusaceptado)";
				}
				

				$sql.=" and usuarios_servicios.cancelacion=0 ORDER BY usuarios.tipo DESC )	 AS TABLA 
				 ) AS T2 WHERE 1=1
					
		 ";

		 if ($estatuspagado!='') {
		 	
		 	$sql.=" AND  pagado_flag IN(".$estatuspagado.")";
		 }
		 /*if ($this->idservicio==542) {
		 	echo $sql;die();
		 }*/
		
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
