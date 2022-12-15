<?php 
/**
 * 
 */
class Tareas 
{
	
	public $db;
	public $idtarea;
	public $nombretarea;
	public $titulo;
	public $descripcion;
	public $programada;
	public $completada;
	public $estatus;
	public $idservicio;
	public $fechahora;
	public $envio;

	public function ObtenerTareas()
	{
		$sql="SELECT *from (SELECT DATE_FORMAT(programada, '%Y-%m-%d %H:%i') AS hora,titulo,descripcion,idservicio,estatus,idtarea,envia
		FROM tarea) as tabla WHERE tabla.hora='$this->fechahora'";
 		
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


	public function CrearTarea()
	{
		$sql="INSERT INTO tarea( nombretarea, titulo, descripcion, programada, completada, estatus, idservicio, envia) VALUES ('$this->nombretarea','$this->titulo','$this->descripcion','$this->programada','$this->completada','$this->estatus','$this->idservicio',0);";
		
		$resp=$this->db->consulta($sql);
		$this->idtarea=$this->db->id_ultimo();

	}

	public function CambiarEstatusTarea()
	{
		$sql="UPDATE tarea SET estatus='$this->estatus',
			completada='$this->completada'
			WHERE 
			idtarea='$this->idtarea'";
		$resp=$this->db->consulta($sql);

	}

	public function EliminarTareasNoCompletadas()
	{
		$sql="DELETE FROM tarea 
		WHERE idservicio='$this->idservicio' AND estatus=0";
		$resp=$this->db->consulta($sql);
	}

	public function ObtenerTareasServicio()
	{
		$sql="SELECT *FROM tarea 
		WHERE idservicio='$this->idservicio' AND estatus=0";
		
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