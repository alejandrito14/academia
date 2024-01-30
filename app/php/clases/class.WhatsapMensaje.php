<?php 
/**
 * 
 */
class WhatsapMensaje
{
	
	public $db;
	public $token;
	public $phoneid;
	public $Version;
	public $tophone;
	public $accestoken;
	public $texto;
  public $texto1;
  public $texto2;
  public $link;

	public function EnviarMensaje()
	{
		

		$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => 'https://graph.facebook.com/'.$this->Version.'/'.$this->phoneid.'/messages',
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => '',
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 0,
		  CURLOPT_FOLLOWLOCATION => true,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => 'POST',
		  CURLOPT_POSTFIELDS =>'{
    "messaging_product": "whatsapp",
    "to": "'.$this->tophone.'",
    "type": "template",
    "template": {
        "name": "enviotoken",
        "language": {
            "code": "es_MX"
        },
        "components": [
            {
                "type": "body",
                "parameters": [
                    {
                       "type": "text",
                       "text": "'.$this->texto.'"
                    }
                ]
            },
            {
          "type": "button",
          "sub_type": "url",
          "index": 0,
          "parameters": [
            {
              "type": "text",
              "text": "'.$this->texto.'"
            }
          ]
        }
        ]
    }
}

		',
		  CURLOPT_HTTPHEADER => array(
		    'Content-Type: application/json',
		    'Authorization: Bearer '.$this->accestoken.''
		  ),
		));

		$response = curl_exec($curl);

		curl_close($curl);
		return $response;

	}




public function MensajeSaludo()
{
	
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://graph.facebook.com/'.$this->Version.'/'.$this->phoneid.'/messages',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
    "messaging_product": "whatsapp",
    "to": "'.$this->tophone.'",
    "type": "template",
    "template": {
        "name": "hello_world",
        "language": {
            "code": "en_US"
        }
    }
}',
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json',
    'Authorization: Bearer '.$this->accestoken.''
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;

}



public function Envio2($value='')
{
 
$curlCommand = 'curl -i -X POST https://graph.facebook.com/'.$this->Version.'/'.$this->phoneid.'/messages ' .
  '-H "Authorization: Bearer '.$this->accestoken .'' .
  '-H "Content-Type: application/json" ' .
  '-d \'{
    "messaging_product": "whatsapp",
    "to": "'.$this->tophone.'",
    "type": "template",
    "template": {
        "name": "enviotoken",
        "language": {
            "code": "es_MX"
        },
        "components": [
            {
                "type": "body",
                "parameters": [
                    {
                       "type": "text",
                       "text": "'.$this->texto.'"
                    }
                ]
            },
            {
              "type": "button",
              "sub_type": "url",
              "index": 0,
              "parameters": [
                {
                  "type": "text",
                  "text": "'.$this->texto.'"
                }
              ]
            }
          ]
      }
  }\'';

$output = shell_exec($curlCommand);

 var_dump($output);


}


public function EnviarMensajeReserva()
  {
    

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://graph.facebook.com/'.$this->Version.'/'.$this->phoneid.'/messages',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>'{
  "messaging_product": "whatsapp",
  "to": "'.$this->tophone.'",
  "type": "template",
  "template": {
    "name": "datosreserva",
    "language": {
      "code": "es_MX"
    },
    "components": [
      {
        "type": "header",
        "parameters": [
          {
            "type": "text",
            "text": "Tu reserva woliss"
          }
        ]
      },
      {
        "type": "body",
        "parameters": [
          {
            "type": "text",
            "text": "'.$this->texto1.'"
          },
          {
            "type": "text",
            "text": "'.$this->texto2.'"
          },
          {
            "type": "TEXT",
            "text": "'.$this->link.'"
          }
        ]
      }
    ]
  }
}


    ',
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'Authorization: Bearer '.$this->accestoken.''
      ),
    ));

    $response = curl_exec($curl);
   echo  json_encode($response);
    curl_close($curl);
    return $response;

  }

}



 ?>