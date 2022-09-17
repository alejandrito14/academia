<?php 
/**
 * 
 */
class Usuariodatosalud
{
	
	public $db;
	public $estatura;
	public $peso;
	public $patologia;
	public $cirugia;
	public $alergia;
	public $ortopedico;
	public $medicamento;
	public $inputleido;
	public $inputleido2;
	public $idusuarios;
	public $idusuariodatosalud;

	public function GuardardatoSalud()
	{
		$sql="INSERT INTO `usuariodatosalud`( `estatura`, `peso`, `patologias`, `cirugias`, `alergias`, `ortopedicos`, `medicamentos`, `aceptopoliticas`, `datosverdaderos`, `idusuarios`) 
		VALUES ('$this->estatura','$this->peso','$this->patologia','$this->cirugia','$this->alergia','$this->ortopedico', '$this->medicamento', $this->inputleido, '$this->inputleido2', '$this->idusuarios');";


		 $result = $this->db->consulta($sql);


	}

	public function ActualizardatoSalud()
	{
		$sql="
		UPDATE `usuariodatosalud` 
		SET `estatura` = '$this->peso',
		 `patologias` = '$this->patologia', 
		 `cirugias` = '$this->cirugia', 
		 `alergias` = '$this->alergia',
		  `ortopedicos` = '$this->ortopedico', 
		  `medicamentos` = '$this->medicamento',
		  `aceptopoliticas` = $this->inputleido,
		  `datosverdaderos` = $this->inputleido2, 
		  `idusuarios` = $this->idusuarios
		      WHERE `idusuariodatosalud` = '$this->idusuariodatosalud'
		";
		
		
        $resp = $this->db->consulta($sql);


	}

	public function ObtenerdatosSalud()
	{
		$sql = "SELECT *FROM usuariodatosalud WHERE idusuarios='$this->idusuarios'";

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