    <html>
    <head>
      <script src="https://sdk.mercadopago.com/js/v2"></script>
    </head>
    <body>
      <div id="cardPaymentBrick_container"></div>
      <script>
        const mp = new MercadoPago('TEST-2405ab6c-adf6-492b-8cf1-9c6d393706ef', {
          locale: 'es-AR'
        });
        const bricksBuilder = mp.bricks();
        const renderCardPaymentBrick = async (bricksBuilder) => {
          const settings = {
            initialization: {
              amount: 100, // monto a ser pago
              payer: {
                email: "",
              },
            },
            customization: {
              visual: {
                style: {
                  theme: 'default', // | 'dark' | 'bootstrap' | 'flat'
                }
              },
                paymentMethods: {
                  maxInstallments: 1,
                }
            },
            callbacks: {
              onReady: () => {
                // callback llamado cuando Brick esté listo
              },
              onSubmit: (cardFormData) => {
                //  callback llamado cuando el usuario haga clic en el botón enviar los datos
                //  ejemplo de envío de los datos recolectados por el Brick a su servidor
                return new Promise((resolve, reject) => {
                  fetch("process_payment.php", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(cardFormData)
                  })
                    .then((response) => {
                      // recibir el resultado del pago
                      resolve();
                    })
                    .catch((error) => {
                      // tratar respuesta de error al intentar crear el pago
                      reject();
                    })
                });
              },
              onError: (error) => {
                // callback llamado para todos los casos de error de Brick
              },
            },
          };
          window.cardPaymentBrickController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
        };
        renderCardPaymentBrick(bricksBuilder);
      </script>
    </body>
    </html>
    







