<?php
  class Fechas
  {
	  public $diasSemana = array('Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sábado');
	  public $mesesAnho = array('','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');
	  public $mesesAnho3 = array('Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic');
	 public $diasSemanaCorto = array('Dom','Lun','Mar','Mie','Jue','Vie','Sáb');	
	
	public function Fechas()
	{
	  date_default_timezone_set('America/Mexico_City');
	}  
		
	
	public function semanaano()
	{
		$semanaano = date('W');
		return $semanaano;
	}
	
	public function diasemana()
	{
	    $diaSemana = date('w');
		return $diaSemana;
	}


	public function diaarreglo($dia)
	{
	   
	  return $this->diasSemana[$dia];
	}

	public function diaarreglocorto($dia)
	{
	   
	  return $this->diasSemanaCorto[$dia];
	}

	
	  
	public function diames()
	{
 		$diaMes = date('j');
		return $diaMes;
	}
	
	public function diamesDosdigitos()
	{
 		$diaMes = date('d');
		return $diaMes;
	} 
	 
	public function mesAnho()
	{
		$mesAnho = date('n');
		return $mesAnho;
	}
	  
	public function mesAnhoDosdigitos()
	{
		$mesAnho = date('m');
		return $mesAnho;
	}
	 
	public function anho()
	{
	   $anho = date("Y");
	   return $anho;
	}
	 
	public function anomes()
	{
		 $anomes = date("Y-m");
		 return $anomes;
	}
	  
	public function fechaaYYYY_mm_dd_guion()
	{
		 $fechaactual=date("Y-m-d");
		 return $fechaactual;
	} 
	 
	public function fechaaYYYY_mm_dd_entre()
	{
		$fechaactual=date("Y/m/d");
		return $fechaactual;
	} 
	  
	 public function fechaadd_mm_YYYY_guion()
	 {
		 $fechaactual=date("d-m-Y");
		 return $fechaactual;
	 } 
	 
	 public function fechaadd_mm_YYYY_entre()
	 {
		 $fechaactual=date("d/m/Y");
		 return $fechaactual;
	 } 
	 
	 public function hora()
	 {
		 $purahora=date('H');
		 return $purahora;
	 }
	  
	  public function minutos()
	 {
		 $purahora=date('i');
		 return $purahora;
	 }
	  
	   public function segundos()
	 {
		 $purahora=date('s');
		 return $purahora;
	 }
	 
	 public function hh_mm_ss()
	 {
		   $hora = date('H');
	       $hora .= ":";
	       $hora .= date('i');
	       $hora.= ":";
	       $hora.= date('s');
		   return $hora;
	 }
	  
	 public function fecha_hora_segundosentre()
	 {
	     $fechahora = $this->fechaaYYYY_mm_dd_entre()." ".$this->hh_mm_ss(); //fecha mas hora
		 return $fechahora;
	 }
	  
	 public function fecha_hora_segundos()
	 {
	     $fechahora = $this->fechaaYYYY_mm_dd_guion()." ".$this->hh_mm_ss(); //fecha mas hora
		 return $fechahora;
	 }
	 
     public function fecha_hora_parrafo($tipo)
	 {
		 if($tipo==1)
		 {
	        $fecha = $this->diasSemana[$this->diasemana()]." ".$this->diames()." de ".$this->mesesAnho[$this->mesAnho()-1]." del ".$this->anho()." A Las ".$this->hh_mm_ss(); //fecha y hora en parrafo.
		 }
		 else
		 {
		    $fecha =  $this->diasSemana[$this->diasemana()]." ".$this->diames()." de ".$this->mesesAnho[$this->mesAnho()-1]." del ".$this->anho(); //fecha en parrafo
		 }
		 
		 return $fecha;
	 }
//setlocale(LC_TIME, "es_ES"); //hora en español.
//funcion que me da la semana del año.
	public function weekyear ($date)
    {
		$date = substr($date,0,10);	
		list($year, $month, $day) = explode('-', $date);
		return strftime("%W", mktime(0,0,0,$month,$day,$year));
    }

//funcion que me da el dia de la semana
	public function dayweek($date)
	{
	  $date = substr($date,0,10);	
	  //echo $date;
	  list($year, $month, $day) = explode('-', $date);
	  return strftime("%w", mktime(0,0,0,$month,$day,$year));
	}

//funcion que me da el dia del mes
	public function diadelmes($date)
	{
		  $date = substr($date,0,10);	
		  //echo $date;
		  list($year, $month, $day) = explode('-', $date);
		  return strftime("%d", @mktime(0,0,0,$month,$day,$year));
	}
	

//funcion ue me da el mes del año
	public function mesdelano($date)
	{
		$date = substr($date,0,10);	
		//echo $date;
		list($year, $month, $day) = explode('-', $date);
		return strftime("%m", @mktime(0,0,0,$month,$day,$year));
	}

//funcion que me regresa el año solamente
	public function elano($date)
	{
		$date = substr($date,0,10);	
		//echo $date;
		list($year, $month, $day) = explode('-', $date);
		return strftime("%Y", @mktime(0,0,0,$month,$day,$year));
	}
	
//funcion que me regresa la fecha solamente de un date time
	public function sub_fecha($date)
   {
	 $sub = substr($date,0,10);	
	 return $sub;
   }

//funcion que cambia el formato de la fecha a mexicana  
	public function f_esp($fecha)
	{
		$a = $this->elano($fecha);
		$m = $this->mesdelano($fecha);
		$d = $this->diadelmes($fecha);
		$f = $d."-".$m."-".$a;
		return $f;		
	 }
	 
	 //Funcion que cambiar el formato de fecha de mexicana a gringa
	 public function f_usa3($fecha)
	 {
		 
		$f_array = explode("-",$fecha);
		$a = $f_array[2];
		$m = $f_array[1];
		$d = $f_array[0];
		$f = $a."-".$m."-".$d;
		return $f;		
	 }


//compara dos fechas.. si la fecha uno es mayor que la fecha dos.
	public function datecmp($f1, $f2)
	{
		
		$fecha1=strtotime($f1);
		$fecha2=strtotime($f2);
	
     	if($fecha1 >= $fecha2)
	    {
           return 1;
	    }
		  else
	    {
		  return 0;
	    }
	} 
// Fecha en formato dd/mm/yyyy o dd-mm-yyyy retorna la diferencia en dias
	public function restaFechas($dFecIni, $dFecFin)
    {
	  $dFecIni = str_replace("-","",$dFecIni);
	  $dFecIni = str_replace("/","",$dFecIni);
	  $dFecFin = str_replace("-","",$dFecFin);
	  $dFecFin = str_replace("/","",$dFecFin);
	  
	  @ereg("([0-9]{1,2})([0-9]{1,2})([0-9]{2,4})", $dFecIni, $aFecIni);
	  @ereg( "([0-9]{1,2})([0-9]{1,2})([0-9]{2,4})", $dFecFin, $aFecFin);
	  
	  //echo $date1 = mktime(0,0,0,$aFecIni[2], $aFecIni[1], $aFecIni[3]);
	  //echo "<br>";
	  //echo $date2 = mktime(0,0,0,$aFecFin[2], $aFecFin[1], $aFecFin[3]);
	  
	  return round(($date2 - $date1) / (60 * 60 * 24));
    }
	

//fucion que suma dias a una fecha	
	public function sumaDia($fecha,$dia)
	{
	   list($year,$mon,$day) = explode('-',$fecha);
	   return date('Y-m-d',mktime(0,0,0,$mon,$day+$dia,$year));
	}	
	
	
	public function restaDia($fecha,$dia)
	{
	   list($year,$mon,$day) = explode('-',$fecha);
	   return date('Y-m-d',mktime(0,0,0,$mon,$day-$dia,$year));
	}	
	
	
	public function sumaAnho($fecha,$anhos)
	{
	   list($year,$mon,$day) = explode('-',$fecha);
	   return date('Y-m-d',mktime(0,0,0,$mon,$day,$year+$anhos));
	}
	
	public function sumaMes($fecha,$mes)
	{
		list($year,$mon,$day) = explode('-',$fecha);
		return date('Y-m-d',mktime(0,0,0,$mon+$mes,$day,$year));
	}		

//esta repeteida esta funcion
	public function fecha_esp2($fecha)
	{		
		$a = $this->elano($fecha);
		$m = $this->mesdelano($fecha);
		$d = $this->diadelmes($fecha);
		$f = $d."-".$m."-".$a;
		return $f;			
	}
//funcion de fecha  tipo  dia de mes del año
	public function fecha_texto($fecha)
	{
				
		$a = $this->elano($fecha);
		$m = $this->mesdelano($fecha);
		$d = $this->diadelmes($fecha);
		
		//$m = str_replace("0","",$m);
		
		$m = $this->mesesAnho[$m-1];
		$f = $d." de ".$m." del ".$a;
		return $f;
	}


	//funcion de fecha  tipo  dia de mes del año
	public function fecha_texto2($fecha)
	{
				

		$a = $this->elano($fecha);
		//$m = $this->mesdelano();
		$d = $this->diadelmes($fecha);
		
		
	
		$m = $this->mesesAnho[date("n",strtotime($fecha))];


		$diatexto=$this->diasSemana[date('N', strtotime($fecha))];
		
		$f = $d." de ".$m." del ".$a;

		return $f;
	}


	public function fecha_texto3($fecha)
	{
				

		$a = $this->elano($fecha);
		//$m = $this->mesdelano();
		$d = $this->diadelmes($fecha);
		
		
	
		$m = $this->mesesAnho[date("n",strtotime($fecha))];


		$diatexto=$this->diasSemana[date('N', strtotime($fecha))];


		
		$f = $diatexto." ".$d." de ".$m." del ".$a.' '.date('H:i:s',strtotime($fecha));

		return $f;
	}

public function fecha_texto4($fecha)
	{
				

		$a = $this->elano($fecha);
		//$m = $this->mesdelano();
		$d = $this->diadelmes($fecha);
		
		
	
		$m = $this->mesesAnho[date("n",strtotime($fecha))];


		$diatexto=$this->diasSemana[date('N', strtotime($fecha))];


		
		$f = $diatexto." ".$d." de ".$m.", ".$a.' '.date('H:i:s',strtotime($fecha));

		return $f;
	}

	
	public function fecha_textoguion($fecha)
	{
				
		$a = $this->elano($fecha);
		$m = $this->mesdelano($fecha);
		$d = $this->diadelmes($fecha);
		
		//$m = str_replace("0","",$m);
		
		$m = $this->mesesAnho[$m-1];
		$f = $d."-".$m."-".$a;
		return $f;
	}
	
	public function fecha_textoguion3($fecha)
	{
				
		$a = $this->elano($fecha);
		$m = $this->mesdelano($fecha);
		$d = $this->diadelmes($fecha);
		
		//$m = str_replace("0","",$m);
		
		$m = $this->mesesAnho3[$m-1];
		$f = $d."-".$m."-".$a;
		return $f;
	}


//funcion restar horas.
	public function restarhoras($horaini,$horafin)
	{
		$horai=substr($horaini,0,2);
		$mini=substr($horaini,3,2);
		//$segi=substr($horaini,6,2);
	 
		$horaf=substr($horafin,0,2);
		$minf=substr($horafin,3,2);
		//$segf=substr($horafin,6,2);
	 
		$ini=((($horai*60)*60)+($mini*60)/*+$segi*/);
		$fin=((($horaf*60)*60)+($minf*60)/*+$segf*/);
	 
		$dif=$fin-$ini;
	 
		$difh=floor($dif/3600);
		$difm=floor(($dif-($difh*3600))/60);
		//$difs=$dif-($difm*60)-($difh*3600);
		return date("H:i",mktime($difh,$difm));
		//return date("H-i-s",mktime($difh,$difm,$difs));
	}
	
	public function restaMes($fecha,$mes)
    {
	   list($year,$mon,$day) = explode('-',$fecha);
        return date('Y-m-d',mktime(0,0,0,$mon-$mes,$day,$year));
    }
	
	
	//saber cuantos dias tiene el mes del año
	
	function DiasDelMes($Month, $Year)
		{
		   //Si la extensión que mencioné está instalada, usamos esa.
		   if( is_callable("cal_days_in_month"))
				 {
					return cal_days_in_month(CAL_GREGORIAN, $Month, $Year);
				 }
				 else
				 {
					//Lo hacemos a mi manera.
					return date("d",mktime(0,0,0,$Month+1,0,$Year));
				 }
		}
	
	
	//funcion para saber los dias de diferencia en tre 2 fechas
	public function DiferenciaDias($fechaActual,$fechaFutura)
	{
		//defino fecha 1 
		$ano1 = $this->elano($fechaActual);
		$mes1 = $this->mesdelano($fechaActual);
		$dia1 = $this->diadelmes($fechaActual);
		
		//defino fecha 2 
		$ano2 = $this->elano($fechaFutura); 
		$mes2 = $this->mesdelano($fechaFutura); 
		$dia2 = $this->diadelmes($fechaFutura);
		
		//calculo timestam de las dos fechas 
		$timestamp1 = mktime(0,0,0,$mes1,$dia1,$ano1); 
		$timestamp2 = mktime(4,12,0,$mes2,$dia2,$ano2); 
		
		//resto a una fecha la otra 
		$segundos_diferencia = $timestamp1 - $timestamp2; 
		//echo $segundos_diferencia; 
		
		//convierto segundos en días 
		$dias_diferencia = $segundos_diferencia / (60 * 60 * 24); 
		
		//obtengo el valor absoulto de los días (quito el posible signo negativo) 
		$dias_diferencia = abs($dias_diferencia); 
		
		//quito los decimales a los días de diferencia 
		$dias_diferencia = floor($dias_diferencia); 
		
		return $dias_diferencia;
	}
	
	//funcion para obtener solo la fecha de un campo datetime de la base de datos  
	public function fecha_date($date)
	{
		$fecha1 = explode("-",$date);
		$dia = explode(" ",$fecha1[2]);
		
		$fecha_final = $fecha1[0]."-".$fecha1[1]."-".$dia[0];
		return $fecha_final;
		
	}
	
	public function diaultimodelsiguientemes()
	{
		$fecha = date('Y-m-j');
		$nuevafecha = strtotime ( '+1 month' , strtotime ( $fecha ) ) ;
		$nuevafecha = date ( 'Y-m-j' , $nuevafecha );
		
		$f = explode('-',$nuevafecha);
		$month = $f[1];
		$year = $f[0];
		$day = date("d",mktime(0,0,0, $month+1, 0, $year));
		
		$nuevafecha = date('Y-m-d', mktime(0,0,0, $month, $day, $year));
		
		return $nuevafecha;
	}
	
	public function ultimodiadelmes()
	{
		$fecha = date('Y-m-j');
		//$nuevafecha = strtotime ( '+1 month' , strtotime ( $fecha ) ) ;
		//$nuevafecha = date ( 'Y-m-j' , $fecha );
			
		$f = explode('-',$fecha);
		$month = $f[1];
		$year = $f[0];
		$day = date("d",mktime(0,0,0, $month+1, 0, $year));
		
		$nuevafecha = date('Y-m-d', mktime(0,0,0, $month, $day, $year));
		
		return $nuevafecha;
	}
	  
	  
public function ObtenerHora($hora)
{
    $rest = substr($hora,0,2);    
	return $rest;
}
	
public function ObtenerMinutos($hora)
{
	$rest = substr($hora,3,5);    
	return $rest;
}
	  
	  
function semanadelano($fecha){
    $const  =  [2,1,7,6,5,4,3]; 

    if ($fecha.match('/\//'))
					 {
        $fecha   =  $fecha.replace('/\//g','-',$fecha);
    };

    $fecha  =  $fecha.split("-");

    $dia    =  eval($fecha[0]);
    $mes    =  eval($fecha[1]);
    $ano       =  eval($fecha[2]);   
    if ($mes!=0) {
        $mes--;
    };

    $dia_pri   =  new Date($ano,0,1); 
    $dia_pri   =  $dia_pri.getDay();
    $dia_pri   =  eval($const[$dia_pri]);
    $tiempo0   =  new Date($ano,0,$dia_pri);
    $dia       =  ($dia+$dia_pri);
    $tiempo1   =  new Date($ano,$mes,$dia);
    $lapso     =  ($tiempo1 - $tiempo0);
    $semanas   =  Math.floor($lapso/1000/60/60/24/7);

    if ($dia_pri == 1) {
        $semanas++;
    };

    if ($semanas == 0) {
        $semanas=52;
        $ano--;
    };

    if ($ano < 10) {
        $ano = '0'+$ano;
    };

    return $semanas;
}
	  
	  
	  function dias_restantes($fecha_final) {  
		  $fecha_actual = date("Y-m-d");  
		  $s = strtotime($fecha_final)-strtotime($fecha_actual);  
		  $d = intval($s/86400);  
		  $diferencia = $d;  
		  return $diferencia;  
	  }


	    /** Obtener el ultimo dia del mes actual **/
  function Ultimodia_mes_actual() { 
      $month = date('m');
      $year = date('Y');
      $day = date("d", mktime(0,0,0, $month+1, 0, $year));
 
      return date('Y-m-d', mktime(0,0,0, $month, $day, $year));
  }

  function Ultimodia_mes_fecha($fecha) { 
      $month = date('m',strtotime($fecha));
      $year = date('Y',strtotime($fecha));
      $day = date("d", mktime(0,0,0, $month+1, 0, $year));
 
      return date('Y-m-d', mktime(0,0,0, $month, $day, $year));
  }
 
  /** Obtener el primerdia del mes actual **/
  function Primerdia_mes_actual() {
      $month = date('m');
      $year = date('Y');
      return date('Y-m-d', mktime(0,0,0, $month, 1, $year));
  }  


function Primerdia_mes_fecha($fecha) {
      $month = date('m',strtotime($fecha));
      $year = date('Y',strtotime($fecha));
      return date('Y-m-d', mktime(0,0,0, $month, 1, $year));
  } 

	 function minutosTranscurridos($fecha_i,$fecha_f)
		{
		$minutos = (strtotime($fecha_i)-strtotime($fecha_f))/60;
		$minutos = abs($minutos); $minutos = floor($minutos);
		return $minutos;
		}


	function get_format($df) {
		
	    $str = '';
	    $str .= ($df->invert == 1) ? ' - ' : '';

	    
	    if ($df->y > 0) {
	        // years
	        $str .= ($df->y > 1) ? $df->y . ' Años ' : $df->y . ' Año ';
	    } if ($df->m > 0) {
	        // month
	        $str .= ($df->m > 1) ? $df->m . ' Meses ' : $df->m . ' Mes ';
	    } if ($df->d > 0) {
	        // days
	        $str .= ($df->d > 1) ? $df->d . ' Días ' : $df->d . ' Dia ';
	    } if ($df->h > 0) {
	        // hours
	        $str .= ($df->h > 1) ? $df->h . ' Horas ' : $df->h . ' Hora ';
	    } if ($df->i > 0) {
	        // minutes
	        $str .= ($df->i > 1) ? $df->i . ' Minutos ' : $df->i . ' Minuto ';
	    } if ($df->s > 0) {
	        // seconds
	        $str .= ($df->s > 1) ? $df->s . ' Segundos ' : $df->s . ' Segundo ';
	    }

	    return $str;
	}
	 
	
    function intervaloHora($hora_inicio, $hora_fin, $intervalo = 30) {

		    $hora_inicio = new DateTime($hora_inicio );
		    $hora_fin    = new DateTime($hora_fin );
		    $hora_fin->modify('+1 second'); // Añadimos 1 segundo para que nos muestre $hora_fin

		    // Si la hora de inicio es superior a la hora fin
		    // añadimos un día más a la hora fin
		    if ($hora_inicio > $hora_fin) {

		        $hora_fin->modify('+1 day');
		    }

		    // Establecemos el intervalo en minutos        
		    $intervalo = new DateInterval('PT'.$intervalo.'M');

		    // Sacamos los periodos entre las horas
		    $periodo   = new DatePeriod($hora_inicio, $intervalo, $hora_fin);        

		    foreach( $periodo as $hora ) {

		        // Guardamos las horas intervalos 
		        $horas[] =  $hora->format('H:i:s');
		    }

		    return $horas;
		}
	
	  

    function DiasEntrefechas($fecha1,$fecha2)
    {
    	$fechasdias=array();
    	 for($i=$fecha1;$i<=$fecha2;$i = date("Y-m-d", strtotime($i ."+ 1 days")))
		    {

		        $valores= $this->dia_semana($i);

		        array_push($fechasdias,$valores);
		    }

		    return $fechasdias;
    }

    function dia_semana($fecha)
    {
        $dia = date("d", strtotime($fecha));
       

        $dias = array('', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO');
        $dia_semana = $dias[date('N', strtotime($fecha))];
        //echo $dia_semana.' '.$dia;

        $numdia=date('w',strtotime($fecha));

       $arreglo= array('fecha'=>$fecha,'diaSemana'=>$dia_semana,'dia'=>$dia,'numdia'=>$numdia);



       return $arreglo;

    }


		public function saber_dia($fecha) {
		
			$fecha = $diasSemanaCorto[date('N', strtotime($fecha))];
			echo $fecha;
		}

   

  }
?>