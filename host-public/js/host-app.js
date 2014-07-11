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
