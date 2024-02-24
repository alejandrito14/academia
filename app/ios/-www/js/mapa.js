var map="";
var marker;
var watchID;
var latitud="";
var longitud="";
geocoder = "";

  function initMap() {


 var promResuelta =  new Promise(resolve => {
 
      resolve(ColocarMapa());
  
  });

 promResuelta.then(
    // Registrar el valor de la promesa cumplida
       function() {
        //Marcar(longitud,latitud);
    }) .catch(
    // Registrar la razón del rechazo
    function(reason) {


    });
  

     // console.log(map);
  
}

function initMap2() {

  

   var promResuelta =  new Promise(resolve => {
 
      resolve(ObtenerPosicionesSucursales());
      //ColocarMapa2
  
  });

 promResuelta.then(
    // Registrar el valor de la promesa cumplida
       function() {

         // ObtenerPosicionesSucursales();


    }) .catch(
    // Registrar la razón del rechazo
    function(reason) {

      Marcar()
    });
  
 
}

function ColocarMapa() {
       var coordinates = {
        lat:parseFloat(latitud),
        lng:parseFloat(longitud)
      };
      var mapOptions = {
              // How zoomed in you want the map to start at (always required)
              zoom: 14,
              center: coordinates,
              scrollwheel: false

              // How you would like to style the map. 
              // This is where you would paste any style found on Snazzy Maps.
             // styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#c9cacc"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
          };
   map = new google.maps.Map(document.getElementById('map'),mapOptions);

     /* map.addListener("click",(e) => {
        
   placeMarkerAndPanTo(e.latLng, map);
  });
*/
      
      console.log(coordinates);
    var marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    /*icon: {
      labelOrigin: new google.maps.Point(75, 32),
      size: new google.maps.Size(32, 32),
      anchor: new google.maps.Point(16, 32)
    },*/
    /*label: {
      text: "5409 Madison St",
      color: "#C70E20",
      fontWeight: "bold"
    }*/
  });


             // geocoder = new google.maps.Geocoder();

}

function ColocarMapa2() {
      var mapOptions = {
              // How zoomed in you want the map to start at (always required)
              zoom: 6,
            mapTypeControl: false,
              scrollwheel: false,
              // The latitude and longitude to center the map (always required)
              center: new google.maps.LatLng(20.8688, -100.2195),

              // How you would like to style the map. 
              // This is where you would paste any style found on Snazzy Maps.
              //styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#c9cacc"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
          };
 
   map = new google.maps.Map(document.getElementById('map2'),mapOptions);

     /* map.addListener("click",(e) => {
        
   placeMarkerAndPanTo(e.latLng, map);
  });*/

   geocoder = new google.maps.Geocoder();

}

var city,postal_code,state,country,sublocality,street_number,route;

function placeMarkerAndPanTo(latLng, map) {
    if (marker != null ) {
            marker.setMap(null);

          }

  

 

  geocoder.geocode(
        { location: latLng },
        (
          results = google.maps.GeocoderResult,
          status= google.maps.GeocoderStatus
        ) => {
          if (status === "OK") {
            if (results[0]) {
          console.log  (results[0].address_components);
           var address_components = results[0].address_components;
                    var components={};
                    jQuery.each(address_components,function(k,v1) {jQuery.each(v1.types,function(k2, v2){components[v2]=v1.long_name});});
                     
                    console.log(components);
                    if(components.locality) {
                        city = components.locality;
                    }
 
                    if(!city) {
                        city = components.administrative_area_level_1;
                    }
 
                    if(components.postal_code) {
                        postal_code = components.postal_code;

                       // alert(postal_code);
                    }
                  
 
                    if(components.administrative_area_level_1) {
                        state = components.administrative_area_level_1;
                    }
                     
                    if(components.route) {
                        route = components.route;
                    }
                    if(components.sublocality_level_1) {
                        sublocality = components.sublocality_level_1;
                    }
                    if(components.country) {
                        country = components.country;
                    }
                    if(components.street_number) {
                      street_number = components.street_number;
                    }

                    } else {
              console.log("No results found");
            }
          } else {
            console.log("Geocoder failed due to: " + status);
          }
        }
      );


    var codigodireccion=localStorage.getItem('codigodireccion');
   // console.log(codigodireccion +'=='+ postal_code);
    //if (codigodireccion==postal_code) {

        marker = new google.maps.Marker({
          position: latLng,
          map:map,
          icon:"",
      });
      map.panTo(latLng);

     // console.log('adentro');

    /*}else{

      marker = new google.maps.Marker({
      position: latLng,
      map:map,
      icon: "https://issoftware1.com.mx/appconcentradora/icon.png",
       });
     map.panTo(latLng);
     // console.log('fuera');

    }*/
     
                   /* $('#input-address-formated').val(results[0].formatted_address);
                    $('#input-address').val(state);
                    $('#input-city').val(city);
                    $('#input-country').val(country);
                    $('#input-postal-code').val(postal_code);
                    $('#input-street').val(route+', '+sublocality);
                    $('#input-interior-number').val(street_number);
                    $('#input-exterior-number').val(street_number);
                    $('#latitude').val(marker.getPosition().lat());
                    $('#longitude').val(marker.getPosition().lng());
    }
           */
}



  function ObtenerPosicion(position) {
        
        var coordenada = 'Latitude: '  + position.coords.latitude      + '<br />' +
                        'Longitude: ' + position.coords.longitude     + '<br />' ;
    
         var latylon = position.coords.latitude+','+position.coords.longitude;

         alert('aq '+latylon);
    
        localStorage.setItem("latylon", latylon);    //Longitud y latitud.   
         Marcar2(position.coords.longitude,position.coords.latitude);
  //direccion(position.coords.longitude,position.coords.latitude);
      TerminarSeguimientoGeo();
    }


    var geo_options = {
  enableHighAccuracy: true,
  maximumAge        : 30000,
  timeout           : 27000
};

    function IniciarGeo()
     {    //si se requiere un cierto tiempo agregar un timeout a la funcion whatchposition
      
      watchID = navigator.geolocation.watchPosition(ObtenerPosicion, ErrorGeoSeguimiento,geo_options);
   
       
   }



    function ErrorGeoSeguimiento(error) {
        var error = 'code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n';
          alerta('','No se puedo geolocalizar, intente de nuevo');
      }


  function TerminarSeguimientoGeo()
    {
        navigator.geolocation.clearWatch(watchID);
  }
function Marcar(longitude,latitude) {
      //alert('aqui3'+longitude);

  if (localStorage.getItem('latlong')!=undefined && localStorage.getItem('latlong')!='') {
            lonlat= localStorage.getItem('latlong');

            var cadena=lonlat.replace('(','').replace(')','');
            latitude=cadena.split(',')[0];
            longitude=cadena.split(',')[1];
           latLng=latitude+","+longitude;

        }else{

          latitude="16.7468307";
          longitude="-93.1366118";
          latLng=latitude+","+longitude;

        }
     // alert('aqui4'+latLng);
          localStorage.setItem('latlong',latLng);

        var location = new google.maps.LatLng(latitude,longitude);
      var markerLocation = new google.maps.LatLng(latitude, longitude);

      var mapCanvas = document.getElementById('map');
      var mapOptions = {
        center: location,
        zoom: 16,
        panControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      var map = new google.maps.Map(mapCanvas, mapOptions);
    //  var markerImage = 'img/marker.png';
      var marker = new google.maps.Marker({
        position: markerLocation,
        map: map,
      //  icon: markerImage
      });
      /* Contenido de la ventana de informanción al dar click en el "Marker" */
      var contentString = '<div class="info-window">' +
                    '<h3>Información Google Maps</h3>' +
                    '<div class="info-content">' +
                    '<p>Mensaje de prueba</p>' +
                    '</div>' +
                    '</div>';
      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
      });
     /* marker.addListener('click', function () {
        infowindow.open(map, marker);
      

      });*/

       map.addListener("click",(e) => {
         marker.setMap(null);
              
         placeMarkerAndPanTo(e.latLng, map);

         
             var latLng = e.latLng;
           
            localStorage.setItem('latlong',latLng);
        });


      var styles = [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]}, {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}];
      map.set('styles', styles);
    

}

function PintarMapa(longit,lat) {
  $(document).ready( function () {
      latitud=lat;
      longitud=longit;
       window.google = {};
     // alert('aq1');
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAUQ4vbyeBnN5XbT-oGNX3_R0R72hJc9N8&callback=initMap";
        script.async = true;

        document.body.appendChild(script);

        
  });
}


function PintarMapa2() {
  $(document).ready( function () {

    
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAUQ4vbyeBnN5XbT-oGNX3_R0R72hJc9N8&callback=initMap";
        script.async = true;

        document.body.appendChild(script);

        
  });
}


function ObtenerLatitudlongitud(asenta,codigo,c_municipio,c_estado) {
 return new Promise(function(resolve, reject) {
  var datos=asenta+','+codigo+','+c_municipio+','+c_estado;

  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+datos+'&region=MX&sensor=false&key=AIzaSyAUQ4vbyeBnN5XbT-oGNX3_R0R72hJc9N8',
    data:datos,
    async:false,
    success: function(datos){
      
    var jsondatos=JSON.stringify(datos);

        var estatus=JSON.stringify(datos,['status']);
        var estado=JSON.parse(estatus);
                console.log(estado);

      
        if (estado.status=="OK") {  
          
          var addres=datos.results;
          var localizacion=addres[0].geometry.location;
          latitud=localizacion.lat;
           longitud=localizacion.lng;

            resolve(addres);
        //var objetodireccion=JSON.parse(direccion);  

        /*var format=JSON.stringify(objetodireccion[0]);
        var json=JSON.parse(format);
        var dividir=json.formatted_address;*/
       // Marcar(latitud,longitud);


        }else{
             app.preloader.hide();


          alerta('','No se ha podido geolocalizar su ubicación');
        }

    },error: function(XMLHttpRequest, textStatus, errorThrown){ 
      var error;
        if (XMLHttpRequest.status === 404) error = "Pagina no existe "+pagina+" "+XMLHttpRequest.status;// display some page not found error 
        if (XMLHttpRequest.status === 500) error = "Error del Servidor"+XMLHttpRequest.status; // display some server error 
        //alerta("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR"); 
        console.log("Error leyendo fichero jsonP "+d_json+pagina+" "+ error,"ERROR");
    }

  });

  });
}

function ObtenerMapa(longitude,latitude) {
  PintarMapa(longitude,latitude);

 
}

function Marcar2(longitude,latitude) {

          var latLng="("+latitude+","+longitude+")";
      
          localStorage.setItem('latlong',latLng);

        var location = new google.maps.LatLng(latitude,longitude);
      var markerLocation = new google.maps.LatLng(latitude, longitude);

      var mapCanvas = document.getElementById('map2');
      var mapOptions = {
        center: location,
        zoom: 16,
      zoomControl: false,
        mapTypeControl: false,
        panControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      var map = new google.maps.Map(mapCanvas, mapOptions);
    //  var markerImage = 'img/marker.png';
      var marker = new google.maps.Marker({
        position: markerLocation,
        map: map,
      //  icon: markerImage
      });
      /* Contenido de la ventana de informanción al dar click en el "Marker" */
      var contentString = '<div class="info-window">' +
                    '<h3>Información Google Maps</h3>' +
                    '<div class="info-content">' +
                    '<p>Mensaje de prueba</p>' +
                    '</div>' +
                    '</div>';
      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
      });
     /* marker.addListener('click', function () {
        infowindow.open(map, marker);
      

      });*/

       map.addListener("click",(e) => {
         marker.setMap(null);
              
         placeMarkerAndPanTo(e.latLng, map);

         
             var latLng = e.latLng;
           
            localStorage.setItem('latlong',latLng);
        });


      var styles = [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]}, {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}];
      map.set('styles', styles);
    

}