# Stark Payments - Javascript SDK
## Crypto Payment iFrame Checkout

### Introduction

This SDK has been developed at the request of business owners. Rather than re-directing a paying customer to a secure payment page on our gateway, the customer now remains on the merchant's online store and pay for goods and services in a more streamlined format.

Developer's can integrate and run this SDK in a matter of minutes.


### Prerequisites
 - API Key - You can obtain a API Live/Test Key by registering at [ Stark Payments](https://dashboard.starkpayments.net/)

### Javascript Integration Steps

- Step 1 : Create Payment ID or Link using the Stark API or SDK
- Step 2 : Create iFrame Checkout using payment id


### Creating a Payment ID or Link

There are several ways in which you can create a Payment ID or Link, including:

- [Stark Crypto Payment API](https://pay.starkpayments.net/apidoc/)
- [Omnipay Driver by Stark](https://github.com/starkpay/omnipay)
- [PHP SDK](https://github.com/starkpay/starkpay-php)

or by implementing the following code snippets:

### Curl
```curl
curl --location --request POST 'https://pay.starkpayments.net/api/payment' \
--header 'x-api-key: <apikey>' \
--form 'amount="10"' \
--form 'currency="USD"' \
--form 'description="BILL 12123"' \
--form 'redirectUrl=""' \
--form 'reference="12123"'
```
### PHP
```php
<?php

$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://pay.starkpayments.net/api/payment',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => array('amount' => '10','currency' => 'USD','description' => 'BILL 12123','redirectUrl' => '','reference' => '12123'),
  CURLOPT_HTTPHEADER => array(
    'x-api-key: <apikey>'
  ),
));
$response = curl_exec($curl);
```
### NodeJS using axios
```nodejs
var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();
data.append('amount', '10');
data.append('currency', 'USD');
data.append('description', 'BILL 12123');
data.append('redirectUrl', '');
data.append('reference', '12123');

var config = {
  method: 'post',
  url: 'https://pay.starkpayments.net/api/payment',
  headers: { 
    'x-api-key': '<apikey>', 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
Example Response
```json
{
    "version": "v0.0.2",
    "success": true,
    "id": "ts_607d2716cf0d0",
    "mode": "Test",
    "amount": "10",
    "status": "processing",
    "metadata": {
        "transactionId": "ts_607d2716cf0d0"
    },
    "links": {
        "paymentUrl": "https://pay.starkpayments.net/payment/ts_607d2716cf0d0"
    }
}
```
## Create iframe checkout using payment id

Custom iFrame with Javascript Callback

```javascript
<script src="https://cdn.jsdelivr.net/gh/starkpay/javascript-sdk@0.0.4/src/stark.min.js"></script>
```
```html
<iframe id="<iframe id>" class="custom_iframe"></iframe>
```
```javascript
<script type="text/javascript">
// Your custome iframe id
StarkPay.set_iframe('<iframe id>');
// Payment Link Response -> id 
StarkPay.load('<payment id>');
//on load
StarkPay.onLoadComplete = function() {
  console.log('loading completed');
}
// on any generic error
StarkPay.onError = function(error) {
  console.log(error);
}
// payment broadcasted to the blockchain (once the payment is confirmed, the webhook will be triggered)
StarkPay.onPaymentSuccess = function(data) {
  console.log('Payment Successfully Broadcasted');
  console.log(data);
}
// on payment cancelation by the user
StarkPay.onPaymentCancelled = function(data) {
  console.log(data);
}
</script>
```

## License

MIT
