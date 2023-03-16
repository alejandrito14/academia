<?php
// Parámetros de la distribución binomial
$n = 10; // tamaño de la muestra
$p = 0.15; // probabilidad de éxito

// Calcular la distribución de probabilidad
$distribucion = array();
for ($x = 0; $x <= $n; $x++) {
    $prob = binomial($n, $p, $x);
    $distribucion[$x] = $prob;
}

// Función para calcular la probabilidad binomial
function binomial($n, $p, $x) {
    $comb = 1;
    for ($i = 1; $i <= $x; $i++) {
        $comb *= ($n - $i + 1) / $i;
    }
    return $comb * pow($p, $x) * pow(1 - $p, $n - $x);
}

// Mostrar la tabla de distribución de probabilidad
echo "<table>\n";
echo "<tr><th>x</th><th>P(X=x)</th></tr>\n";
for ($x = 0; $x <= $n; $x++) {
    echo "<tr><td>$x</td><td>" . number_format($distribucion[$x], 3) . "</td></tr>\n";
}
echo "</table>\n";

// Generar el gráfico de distribución de probabilidad con Chart.js
echo '<canvas id="myChart"></canvas>';

// Cargar la biblioteca Chart.js
echo '<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>';

// Configurar los datos y opciones del gráfico
$data = array_values($distribucion);
$labels = array_keys($distribucion);
$options = [
    'scales' => [
        'y' => [
            'ticks' => [
                'beginAtZero' => true,
                'precision' => 3
            ]
        ]
    ]
];
$chart_data = [
    'type' => 'bar',
    'data' => [
        'labels' => $labels,
        'datasets' => [
            [
                'label' => 'Distribución binomial',
                'data' => $data,
                'backgroundColor' => 'rgba(54, 162, 235, 0.2)',
                'borderColor' => 'rgba(54, 162, 235, 1)',
                'borderWidth' => 1
            ]
        ]
    ],
    'options' => $options
];

// Generar el script para inicializar el gráfico
$js = 'var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, ' . json_encode($chart_data) . ');';

// Mostrar el script del gráfico
echo '<script>' . $js . '</script>';


