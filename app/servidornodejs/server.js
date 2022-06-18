var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var clientes=[];

app.use(express.static('public'));

app.get('/hello', function(req, res) {
  res.status(200).send("Hello World!");
});


var  fs = require('fs');

/*var https_options = { 
key: fs.readFileSync("is-software.com.mx.key","utf8"),
cert: fs.readFileSync("302d3c3dbdb129e7.crt","utf8"),
ca:   fs.readFileSync("gd_bundle-g2-g1.crt","utf8"),

 requestCert: false,
 rejectUnauthorized: false
};*/

/*var express = require('express');
var app = express();
var server = require('https').Server(https_options,app);
var io = require('socket.io')(server);*/
var clientes=[];

app.use(express.static('public'));

app.get('/hello', function(req, res) {
  res.status(200).send("Hello World!");
});

io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets');
/*  socket.emit('messages', messages);
*/  

  socket.on('new-message', function(data) {
    messages.push(data);

    io.sockets.emit('messages', messages);
  });

   socket.on('conectado', function (data) {

            var clientInfo = new Object();
            clientInfo.Iduser = data.customId;
            clientInfo.tipo = data.tipouser;
            clientInfo.clientId = socket.id;
            if (!Estagregado(data.customId,clientes)) {

                  clientes.push(clientInfo);
            }else{


            }
        
                 
            var nuevo=1;
            if (clientes.length > 0) {
             
                for (var i = 0; i < clientes.length; i++) {
                if (clientes[i].Iduser == data.customId) {
                  console.log('igual');
                    clientes[i].clientId=socket.id;
                    nuevo=0;
                    break;
                 
                }
              }
            }

           if (clientes.length ===0  ||  nuevo == 1 ) {
               var clientInfo = new Object();
                  clientInfo.Iduser = data.customId;
                  clientInfo.tipo = data.tipouser;
                  clientInfo.clientId = socket.id;

            clientes.push(clientInfo);
            
            }

            console.log(JSON.stringify(clientes));
   // socket.emit('conectado2','Te has conectado cn el id:'+ socket.id+ 'array:'+JSON.stringify(clientes));

        });


   socket.on('new-pendientes',function (data) {

       sockets.emit('pendientes',data,clientes);
     
   });

 socket.on('nuevomensaje',function (data) {
        console.log('nuevomensaje');

      console.log(data);
      EnviarMensajeSoportes(data);
     
   });

 socket.on('mensajerespuesta',function (data) {
   console.log(JSON.stringify(data));

      EnviarMensajeRespuesta(data);
     
   });


      socket.on('atendermensaje',function (data) {

         AtenderMensaje(data);


       });

      

       socket.on('mensajeconclusion',function (data) {

         ConcluirSoporte(data);


       });

    socket.on('eliminarmensaje',function (data) {

      Eliminarmensaje(data);
     
   });




 socket.on('pendienteseguimiento',function (data) {
   var idemitido=data.emitido;
   var usuario=data.usuario;

      BuscarId(idemitido ,clientes,data);

     for (var i =0; i < usuario.length; i++) {

          var idusuario=usuario[i].id_usuario;
             BuscarId(idusuario ,clientes,data);

     }

         /*   socket.emit('nuevopendienteseguimiento',data);*/

     

     
   });


      socket.on('pendienterevision',function (data) {
       var usuario=data.usuario;
       var idemitido=data.emitido;
       console.log(data.usuario);

       console.log("aqui");
/*       BuscarId2(idusuario ,clientes,data);
*/       BuscarId2(idemitido ,clientes,data);

         for (var i =0; i < usuario.length; i++) {
              var idusuario=usuario[i].id_usuario;
              BuscarId2(idusuario ,clientes,data);
         }


         
       });



      socket.on('pendientesconcluido',function (data) {
       var usuario=data.usuario;
       var idemitido=data.emitido;
       console.log(data.usuario);

       console.log("aqui");
/*       BuscarId3(idusuario ,clientes,data);
*/     BuscarId3(idemitido ,clientes,data);

       for (var i =0; i < usuario.length; i++) {
              var idusuario=usuario[i].id_usuario;
              BuscarId3(idusuario ,clientes,data);
        }



         
       });

       socket.on('pendientesaseguimiento',function (data) {
         var usuario=data.usuario;
         var idemitido=data.emitido;
         console.log("usu"+data.usuario);

         console.log("aqui");
/*         BuscarId4(idusuario ,clientes,data);
*/         BuscarId4(idemitido ,clientes,data);


         for (var i =0; i < usuario.length; i++) {
              var idusuario=usuario[i].id_usuario;
              BuscarId4(idusuario ,clientes,data);
         }



           
         });

      socket.on('agregarsolicitud',function (data) {

      
             for (var i =0; i < data[0].length; i++) {
                /* var folio=data[i].Numerop;
                 var nombre1=data[i].nombre1+' '+data[i].apaterno1;
                 var nombre2=data[i].nombre2+' '+data[i].apaterno2;
                 var titulo=data[i].titulo;*/
                 var idusuario=data[0][i].idusuario1;
                 var idsolicitud=data[0][i].idsolicitud;
                 console.log("mandar a este id "+idusuario);

                 BuscarId5(idusuario,clientes,data[0][i]);

             }

           
         });

      socket.on('pendientestraspaso',function (data) {
        
         console.log("aqui traspaso");
         var idusuario=data.usuario[0].id_usuario;
         var idemitido=data.emitido[0].id_usuario;
         var idusuarioanterior=data.anterior[0].id_usuario;
        /* console.log(idusuario);
         console.log(data);*/

         BuscarId6(idusuario ,clientes,data);
         BuscarId6(idemitido ,clientes,data);
         QuitarAlAnterior(idusuarioanterior,clientes,data);
      });

      socket.on('EliminarPendiente',function (data) {
        console.log('aqui eliminar');

        BuscarId7(data);
      });

});

//const PORT = process.env.PORT || 3000;

server.listen(3400, function() {

  console.log("Servidor corriendo en http://localhost:3400");

});

function Estagregado(iduser,clientes) {
  for (var i = 0; i < clientes.length; i++) {
    if (clientes[i].Iduser==iduser) {

     return true;
      break;
    }
  }
}
function EnviarMensajeSoportes(data) {

      var arrayusuarios=data.arrayusuarios;


      for (var i = 0; i < arrayusuarios.length; i++) {
          var idusuario=arrayusuarios[i];
          console.log('envio'+idusuario);
          const resultado = clientes.find( cliente => cliente.Iduser ===  idusuario);
          io.in(resultado.clientId).emit('nuevomensaje',data);

      }
   /* for (var i = 0; i < clientes.length; i++) {
         // if (clientes[i].tipo == 2) {
  console.log("enviar soportes"+data+""+clientes[i].clientId);

              io.in(clientes[i].clientId).emit('nuevomensaje',data);

          //}

    }*/
}

function EnviarMensajeRespuesta(data) {

  console.log("preparando envio a"+data.idusuario);
   for (var i = 0; i < clientes.length; i++) {
          if (clientes[i].Iduser == data.idusuario) {
              io.in(clientes[i].clientId).emit('mensajerespuestacliente',data);

          }

    }
}

function ConcluirSoporte(data) {
   console.log("concluir"+data.idusuario);
   for (var i = 0; i < clientes.length; i++) {
          if (clientes[i].Iduser == data.idusuario) {
              io.in(clientes[i].clientId).emit('concluir',data);

          }

    }
}

function Eliminarmensaje(data) {
    console.log("eliminar mensaje"+data.idusuariosoporte);
    if (data.idusuariosoporte==0) {
       for (var i = 0; i < clientes.length; i++) {
          if (clientes[i].tipo == 2) {
              io.in(clientes[i].clientId).emit('eliminarMensaje',data);

          }

    }

    }else{

         for (var i = 0; i < clientes.length; i++) {
          if (clientes[i].Iduser == data.idusuariosoporte+"_s") {
              io.in(clientes[i].clientId).emit('eliminarMensaje',data);

          }

      }

    }
  
}

function BuscarId(iduser,clientes,data) {


  for (var i = 0; i < clientes.length; i++) {

  
    if (clientes[i].Iduser == iduser  || clientes[i].tipo=='Administrador' ) {
        console.log(iduser);
    console.log(clientes[i].Iduser)
            //socket.emit('nuevopendienteseguimiento',data);
/*        io.to(clientes[i].clientId).emit('nuevopendienteseguimiento', data);
*/        io.in(clientes[i].clientId).emit('nuevopendienteseguimiento',data);
    
    }
  }
}


function BuscarId2(iduser,clientes,data) {


  for (var i = 0; i < clientes.length; i++) {

  
    if (clientes[i].Iduser == iduser || clientes[i].tipo=='Administrador' ) {
        console.log(iduser);
    console.log(clientes[i].Iduser)
            //socket.emit('nuevopendienteseguimiento',data);
/*        io.to(clientes[i].clientId).emit('nuevopendienteseguimiento', data);
*/        io.in(clientes[i].clientId).emit('nuevopendienterevision',data);
    
    }
  }
}

function BuscarId3(iduser,clientes,data) {


  for (var i = 0; i < clientes.length; i++) {

  
    if (clientes[i].Iduser == iduser || clientes[i].tipo=='Administrador'  ) {
        console.log(iduser);
    console.log(clientes[i].Iduser)
            //socket.emit('nuevopendienteseguimiento',data);
/*        io.to(clientes[i].clientId).emit('nuevopendienteseguimiento', data);
*/        io.in(clientes[i].clientId).emit('nuevopendienteconcluido',data);
    
    }
  }
}


function BuscarId4(iduser,clientes,data) {


  for (var i = 0; i < clientes.length; i++) {

  
    if (clientes[i].Iduser == iduser || clientes[i].tipo=='Administrador' ) {
        console.log(iduser);
    console.log(clientes[i].Iduser)
            //socket.emit('nuevopendienteseguimiento',data);
/*        io.to(clientes[i].clientId).emit('nuevopendienteseguimiento', data);
*/        io.in(clientes[i].clientId).emit('pendienteaseguimiento',data);
    
    }
  }
}

function BuscarId5(iduser,clientes,data) {
console.log(iduser);

  for (var i = 0; i < clientes.length; i++) {

  
    if (clientes[i].Iduser == iduser  || clientes[i].tipo=='Administrador' ) {
        console.log(iduser);
    console.log(clientes[i].Iduser)
            //socket.emit('nuevopendienteseguimiento',data);
/*        io.to(clientes[i].clientId).emit('nuevopendienteseguimiento', data);
*/        io.in(clientes[i].clientId).emit('agregandopendiente',data);
    
    }
  }
}


function BuscarId6(iduser,clientes,data) {
console.log(iduser);

  for (var i = 0; i < clientes.length; i++) {

  
    if (clientes[i].Iduser == iduser  || clientes[i].tipo=='Administrador' ) {
        console.log(iduser);
        console.log(clientes[i].Iduser)
            //socket.emit('nuevopendienteseguimiento',data);
/*        io.to(clientes[i].clientId).emit('nuevopendienteseguimiento', data);
*/        io.in(clientes[i].clientId).emit('traspaso',data);
    
    }
  }
}


function QuitarAlAnterior(iduser,clientes,data) {
  
   for (var i = 0; i < clientes.length; i++) {

  
    if (clientes[i].Iduser == iduser  ) {
        console.log(iduser);
        console.log(clientes[i].Iduser)
        io.in(clientes[i].clientId).emit('quitarelanterior',data);
    
    }
  }
}


function BuscarId7(idsolicitud) {


  io.emit('eliminarpendiente',idsolicitud);
  
}