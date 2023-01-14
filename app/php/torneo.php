<?php

 function obtenerequipo($posicion,$posicion2)
{

    $equipo=array(
         /* 0 */  array('1','16'),
         /* 1 */  array('2','15'),
         /* 2 */  array('3','14'),
         /* 3 */  array('4','13'),
         /* 4 */  array('5','12'),
         /* 5 */  array('6','11'),
         /* 6 */  array('7','10'),
         /* 7 */  array('8','9'),
    );
   
 
 return $equipo[$posicion][$posicion2];
}

function is_player($round, $row, $team) {
    return $row == pow(2, $round-1) + 1 + pow(2, $round)*($team - 1);
}

$num_teams = 8*2;//$num_teams = 28;
$total_rounds = floor(log($num_teams, 2)) + 2;

$max_rows = $num_teams*2;
$team_array = array();
$unpaired_array = array();
$score_array = array();

for ($round = 1; $round <= $total_rounds; $round++) {
    $team_array[$round] = 1;
    $unpaired_array[$round] = False;
    $score_array[$round] = False;
}


echo "<table border=\"1\" cellspacing=\"1\" cellpadding=\"1\">\n";
echo "\t<tr>\n";

for ($round = 1; $round <= $total_rounds; $round++) {

    echo "\t\t<td colspan=\"2\"><strong>Round $round</strong></td>\n";

}

echo "\t</tr>\n";
$i=0;
 $interno=0;
 $for=0;
for ($row = 1; $row <= $max_rows; $row++) {

    echo "\t<tr>\n";

    for ($round = 1; $round <= $total_rounds; $round++) {
        $score_size = pow(2, $round)-1;
        if (is_player($round, $row, $team_array[$round])) {
            $unpaired_array[$round] = !$unpaired_array[$round];

            $equipo="";
           if ($round == 1) {
               # code...
           
            if ($for==0){



                $posicio2=0;
                $aqui=1;
                $for=1;
            }else{
                
                $posicio2=1;
                $aqui=2;
                 $for=0;
            }


           $equipo=obtenerequipo($interno,$posicio2);
            if ($aqui==2) {
               $interno++;
              /* echo 'interno'.$interno.'<br>';*/
            }
       }

          
            echo "\t\t<td style=\"border: 1px;\">Team".$equipo."</td>\n";
            echo "\t\t<td width=\"20\" style=\"border: 1px;\">&nbsp;</td>\n";
            $team_array[$round]++;
            $score_array[$round] = False;
           
            
        } else {
            if ($unpaired_array[$round] && $round != $total_rounds) {
                if (!$score_array[$round]) {
                    echo "\t\t<td style=\"    border-right: 0;
    border-left: 0\" rowspan=\"$score_size\"></td>\n";
                    echo "\t\t<td style=\"border-left: 0px;\" rowspan=\"$score_size\" width=\"20\"></td>\n";
                    $score_array[$round] = !$score_array[$round];
                }
            } else {
                echo "\t\t<td style=\"border:0\" colspan=\"2\">&nbsp;</td>\n";
            }
        }

        
    }
$i++;
    echo "\t</tr>\n";

}

echo "</table>\n";

?>