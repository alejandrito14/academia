<?php 
 define('API_ACCESS_KEY','AAAAaWlau64:APA91bGYjpmrXrNETubVwPNOyUB0fYdUHIHlI98hM2CKm9cb-1G_gJsLFtMH1jM5cS2GNGTqk4zEru_pfxZUaOt0KmaAlWmnUovr3n1oZghjjueVMwEBah5oR-KdzgpJ-_CVzePMpJlu');

class NotificacionPush 
{


    public $db;
    public $iduseradmin;
    public $idnotificacionadmin;
    public $estatus;
    public $apikey;
    public $valor;
    public $navpage;
    public $idcliente;
    public $idusuario;
    public $idnotificacioncliente;
    public $banderatuto;
	public function EnviarNotificacion($listatokens,$titulo,$mensaje)
	{

		$fcmUrl = 'https://fcm.googleapis.com/fcm/send';
 	

 		$tokenList=$listatokens;

     $notification = [
            'title' =>$titulo,
            'body' => $mensaje,
            'icon' =>'myIcon', 
            'sound' => 'mySound'
        ];
        $extraNotificationData = ["notification_foreground" => "true", "navigation" => $this->navpage, "idcliente" => $this->idcliente,"valor"=>$this->valor,'banderatuto'=>$this->banderatuto];

        $fcmNotification = [
            'registration_ids' => $tokenList, //multple token array
           //'to'        => $token, //single token
            'notification' => $notification,
            'data' => $extraNotificationData
        ];

        $headers = [
            'Authorization: key=' . API_ACCESS_KEY,
            'Content-Type: application/json'
        ];


        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$fcmUrl);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fcmNotification));
        $result = curl_exec($ch);
        curl_close($ch);


       // echo $result;
	
	}

    public function AgregarNotifcacionaUsuarios($idusuario,$texto,$ruta,$valor,$estatus)
    {
       $sql="INSERT INTO notificacioncliente(idusuario,texto,ruta,valor,estatus) VALUES('$idusuario','$texto','$ruta','$valor','$estatus')";

     
        $resp=$this->db->consulta($sql);

    }

    public function CambiarEstatusNotificacion()
    {
          $query = "UPDATE notificacioncliente SET estatus = '$this->estatus' WHERE idnotificacioncliente = '$this->idnotificacioncliente'";
        $this->db->consulta($query);
    }

    public function ObtenerNotificacion()
    {
       $sql = "SELECT *FROM notificacioncliente WHERE idnotificacioncliente='$this->idnotificacioncliente'  ";

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

    public function Obtenertoken()
    {
        $fechaactual=date('Y-m-d');
        $sql = "SELECT  DISTINCT token,uuid,dispositivo FROM usuariotoken WHERE idusuario='$this->idusuario' and  token!='null' 
        ORDER BY idusuariotoken DESC LIMIT 3 ";
     
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


    public function EnviarNotificacionIndividual($listatokens,$titulo,$mensaje)
    {

        $fcmUrl = 'https://fcm.googleapis.com/fcm/send';
    

        $token=$listatokens;

     $notification = [
            'title' =>$titulo,
            'body' => $mensaje,
            'icon' =>'myIcon', 
            'sound' => 'mySound'
        ];
        $extraNotificationData = ["notification_foreground" => "true", "navigation" => $this->navpage, "idcliente" => $this->idcliente,"valor"=>$this->valor];

        $fcmNotification = [
           // 'registration_ids' => $tokenList, //multple token array
            'to'        => $token, //single token
            'notification' => $notification,
            'data' => $extraNotificationData
        ];

        $headers = [
            'Authorization: key=' . API_ACCESS_KEY,
            'Content-Type: application/json'
        ];


        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$fcmUrl);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fcmNotification));
        $result = curl_exec($ch);
        curl_close($ch);


       // echo $result;
    
    }

	
}


 ?>