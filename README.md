# Stark Payment - Javascript SDK
### Load payment via iframe

Prerequisites
 - Stark Payments Domain API Key from [ Stark dashboard](https://dashboard.starkpayments.net/)

Javascript Integration Steps

- Step 1 : Create Payment link from Server
- Step 2 : Pass order id to the Checkout SDK


### Create Payment link from Server

You can create payment link via Stark API or using stark SDK like [Omnipay](https://github.com/starkpay/omnipay) , [PHP SDK](https://github.com/starkpay/starkpay-php) or by following code

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
## Pass order id to the Checkout SDK

Custom Iframe with Javascript Callback

```javascript
<script src="https://cdn.jsdelivr.net/gh/starkpay/javascript-sdk@0.0.1/src/stark.min.js"></script>
```
```javascript
<script type="text/javascript">
// Your custome iframe id
StrakPay.set_iframe('<ifram id>');
// Payment Link Response -> id 
StrakPay.load('<payment id>');
//on load
StrakPay.onLoadComplete = function() {
  console.log('loading completed');
}
// on any generic error
StrakPay.onError = function(error) {
  console.log(error);
}
// on successfull payment
StrakPay.onPaymentSuccess = function(data) {
  console.log('Payment Successfully Processed');
  console.log(data);
}
// on payment cancelation by the user
StrakPay.onPaymentCancelled = function(data) {
  console.log(data);
}
</script>
```

## License

MIT