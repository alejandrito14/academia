<?php 
/**
 * 
 */
class Usuariodatoemergencia
{
	
	public $db;
	public $nombre;
	public $numero1;
	public $numero2;
	public $alergias;
	public $patologia;
	public $sangre;
	public $poliza;
	public $compania;
	public $inputleido;
	public $inputleido2;
	public $idusuarios;
	public $idusuariodatosemergencia;

	public function GuardardatoEmergencia()
	{
		$sql="INSERT INTO `usuariodatosemergencia`( `nombrecontacto`, `numeroemergencia`, `alergias`, `patologias`, `tiposangre`, `poliza`, `idusuarios`, `aceptopoliticas`, `datosverdaderos`, `idcompaniaseguro`,`numeroemergencia2`) 
		VALUES ('$this->nombre','$this->numero1','$this->alergias','$this->patologia','$this->sangre', '$this->poliza', $this->idusuarios, '$this->inputleido', '$this->inputleido2','$this->compania', '$this->numero2');";


		 $result = $this->db->consulta($sql);


	}

	public function ActualizardatoEmergencia()
	{
		$sql="
		UPDATE `usuariodatosemergencia` 
		SET `nombrecontacto` = '$this->nombre',
		 `numeroemergencia` = '$this->numero1', 
		 `alergias` = '$this->alergias', 
		 `patologias` = '$this->patologia',
		  `tiposangre` = '$this->sangre', 
		  `poliza` = '$this->poliza',
		  `idusuarios` = $this->idusuarios, 
		  `aceptopoliticas` = $this->inputleido,
		  `datosverdaderos` = $this->inputleido2, 
		  `idcompaniaseguro` = $this->compania,
		  `numeroemergencia2` = '$this->numero2'
		      WHERE `idusuariodatosemergencia` = '$this->idusuariodatosemergencia'
		";

		
        $resp = $this->db->consulta($sql);


	}

	public function ObtenerdatosEmergencia()
	{
		$sql = "SELECT *FROM usuariodatosemergencia WHERE idusuarios='$this->idusuarios'";

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
}

 ?>