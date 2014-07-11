(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
framebus.subscribe('CORSComplete', function (data) {
  setTimeout(function () {
    var h2 = document.createElement('h2');
    h2.textContent = 'Received from iframe:';
    document.body.appendChild(h2);
    var p = document.createElement('p');
    p.textContent = data.toString();
    document.body.appendChild(p);
  }, 1000);
});

setTimeout(function(){
  var h2 = document.createElement('h2');
  h2.textContent = 'Requesting from iframe:';
  document.body.appendChild(h2);
  var p = document.createElement('p');
  p.textContent = 'The contents of http://localhost:3032/resource.txt';
  document.body.appendChild(p);

  framebus.publish('CORS', {
    url: 'http://localhost:3032/resource.txt',
    method: 'GET'
  });
}, 1000);

},{}]},{},[1])