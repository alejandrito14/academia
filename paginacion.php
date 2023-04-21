<?php
// Establecer la conexión con la base de datos
$conexion = mysqli_connect("localhost", "usuario", "contraseña", "basedatos");

// Obtener el número total de registros
$total_registros = mysqli_query($conexion, "SELECT COUNT(*) as total FROM registros");
$total_registros = mysqli_fetch_array($total_registros);
$total_registros = $total_registros['total'];

// Establecer la cantidad de registros por página
$registros_por_pagina = 10;

// Calcular el número total de páginas
$total_paginas = ceil($total_registros / $registros_por_pagina);

// Obtener la página actual
if (isset($_GET['pagina'])) {
  $pagina_actual = $_GET['pagina'];
} else {
  $pagina_actual = 1;
}

// Calcular el registro inicial y final de la página actual
$registro_inicial = ($pagina_actual - 1) * $registros_por_pagina;
$registro_final = $registro_inicial + $registros_por_pagina - 1;

// Obtener los registros de la página actual
$registros = mysqli_query($conexion, "SELECT * FROM registros LIMIT $registro_inicial, $registros_por_pagina");
?>
<!DOCTYPE html>
<html>
<head>
  <title>Paginación de registros</title>
</head>
<body>
  <table>
    <tr>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Edad</th>
    </tr>
    <?php while ($registro = mysqli_fetch_array($registros)) { ?>
      <tr>
        <td><?php echo $registro['nombre']; ?></td>
        <td><?php echo $registro['apellido']; ?></td>
        <td><?php echo $registro['edad']; ?></td>
      </tr>
    <?php } ?>
  </table>

  <div>
    <?php for ($i = 1; $i <= $total_paginas; $i++) { ?>
      <a href="?pagina=<?php echo $i; ?>"><?php echo $i; ?></a>
    <?php } ?>
  </div>
</body>
</html>
