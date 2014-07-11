framebus.subscribe('CORSComplete', function (data) {
  var h1 = document.createElement('h1');
  h1.textContent = 'Success!';
  document.body.appendChild(h1);
  var p = document.createElement('p');
  p.textContent = data.toString();
  document.body.appendChild(p);
});
setTimeout(function(){
  framebus.publish('CORS', {
    url: 'http://localhost:3032/js/iframe-app.built.js',
    method: 'GET'
  });
}, 1000);
