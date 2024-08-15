<!DOCTYPE html>
<html>
<head>
	<title>Nueva tarjeta</title>
</head>
<body>
<script src="https://sdk.mercadopago.com/js/v2"></script>


	
<style>
    #form-checkout {
      display: flex;
      flex-direction: column;
      max-width: 600px;
    }

    .container {
      height: 18px;
      display: inline-block;
      border: 1px solid rgb(118, 118, 118);
      border-radius: 2px;
      padding: 1px 2px;
    }
  </style>
  <form id="form-checkout" method="POST" action="process_payment.php">
    <select type="text" id="form-checkout__cardId"></select>
    <div id="form-checkout__securityCode-container" class="container"></div>
    <input name="token" id="token" hidden>
    <button>Enviar</button>
  </form>

<script>
    const mp = new MercadoPago('TEST-2405ab6c-adf6-492b-8cf1-9c6d393706ef');

    const securityCodeElement = mp.fields.create('securityCode', {
      placeholder: "CVV"
    }).mount('form-checkout__securityCode-container');

    const customerCards = [{
      "id": "1321222507",
      "last_four_digits": "9999",
      "payment_method": {
        "name": "amex",
      },
      "security_code": {
        "length": 4,
      }
    }];

    function appendCardToSelect() {
      const selectElement = document.getElementById('form-checkout__cardId');
      const tmpFragment = document.createDocumentFragment();
      customerCards.forEach(({ id, last_four_digits, payment_method }) => {
        const optionElement = document.createElement('option');
        optionElement.setAttribute('value', id)
        optionElement.textContent = `${payment_method.name} ended in ${last_four_digits}`
        tmpFragment.appendChild(optionElement);
      })
      selectElement.appendChild(tmpFragment)
    }

    appendCardToSelect();

</script>


</body>
</html>