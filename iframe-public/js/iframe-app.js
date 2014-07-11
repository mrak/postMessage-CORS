framebus.subscribe('CORS', function (ajaxOptions, source) {
  var h1 = document.createElement('h1');
  h1.textContent = 'Received AJAX options:';
  document.body.appendChild(h1);
  var p = document.createElement('p');
  p.textContent = JSON.stringify(ajaxOptions);
  document.body.appendChild(p);

  $.ajax(ajaxOptions).done(function (data, textStatus, jqXHR) {
    var h1 = document.createElement('h1');
    h1.textContent = 'Sending back data to host:';
    document.body.appendChild(h1);
    var p = document.createElement('p');
    p.textContent = data.toString();
    document.body.appendChild(p);

    framebus.publish('CORSComplete', data, source);
  });
});
