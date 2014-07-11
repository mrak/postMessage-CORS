framebus.subscribe('CORS', function (ajaxOptions, source) {
  setTimeout(function () {
    var h2 = document.createElement('h2');
    h2.textContent = 'Received AJAX options from host:';
    document.body.appendChild(h2);
    var p = document.createElement('p');
    p.textContent = JSON.stringify(ajaxOptions);
    document.body.appendChild(p);

    $.ajax(ajaxOptions).done(function (data, textStatus, jqXHR) {
      setTimeout(function () {
        var h2 = document.createElement('h2');
        h2.textContent = 'Sending back data to host:';
        document.body.appendChild(h2);
        var p = document.createElement('p');
        p.textContent = data.toString();
        document.body.appendChild(p);

        framebus.publish('CORSComplete', data, source);
      }, 1000);
    });
  }, 1000)
});
