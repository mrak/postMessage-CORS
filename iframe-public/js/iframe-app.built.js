(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])