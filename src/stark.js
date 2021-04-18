var StrakPay = StrakPay || {};
StrakPay.call_queue = [];
StrakPay.PROD_DOMAIN = "http://localhost/starkpayments/code.pay/";
StrakPay.set_endpoint = function(domain) {
    StrakPay.endpoint = StrakPay.PROD_DOMAIN;
}
StrakPay.load = function(id) {
  StrakPay.iframe.src = StrakPay.PROD_DOMAIN + 'payment/' + id + '?iframe=true';
}
StrakPay.set_iframe = function(id) {
  StrakPay.iframe = document.getElementById(id);
}
StrakPay.onLoadComplete = function() {};
StrakPay.onError = function() {};
StrakPay.onPaymentCancelled = function() {};
StrakPay.onPaymentSuccess = function() {};
StrakPay.OAuth2 = StrakPay.OAuth2 || {};