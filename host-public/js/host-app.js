framebus.subscribe('CORSComplete', function (data) {
  var h1 = document.createElement('h1');
  h1.textContent = 'Received from iframe:';
  document.body.appendChild(h1);
  var p = document.createElement('p');
  p.textContent = data.toString();
  document.body.appendChild(p);
});
setTimeout(function(){
  var h1 = document.createElement('h1');
  h1.textContent = 'Requesting from iframe:';
  document.body.appendChild(h1);
  var p = document.createElement('p');
  p.textContent = 'The contents of http://localhost:3032/resource.txt';
  document.body.appendChild(p);

  framebus.publish('CORS', {
    url: 'http://localhost:3032/resource.txt',
    method: 'GET'
  });
}, 1000);
