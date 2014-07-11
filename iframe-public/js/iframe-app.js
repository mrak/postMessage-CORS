framebus.subscribe('CORS', function (ajaxOptions, source) {
  console.log('--- iframe app ---');
  console.log('Received AJAX options:', ajaxOptions);
  $.ajax(ajaxOptions).done(function (data, textStatus, jqXHR) {
    console.log('--- iframe app ---');
    console.log('Sending back:', data);
    framebus.publish('CORSComplete', data, source);
  });
});
