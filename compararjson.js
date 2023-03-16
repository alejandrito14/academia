fetch('archivo.json')
  .then(response => response.json())
  .then(archivo1 => {
    fetch('archivo2.json')
      .then(response => response.json())
      .then(archivo2 => {
        // Comparar los dos objetos
        if (JSON.stringify(archivo1) === JSON.stringify(archivo2)) {
          console.log("Los archivos JSON son iguales");
        } else {
          console.log("Los archivos JSON son diferentes");
        }
      });
  })
  .catch(error => console.error(error));