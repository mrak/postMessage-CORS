(function (scope, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    scope.framebus = factory();
  }
}(this, function(){
  'use strict';

  var root;
  var listeners = { '*': {} };

  function attach(win) {
    root = win;
    while(root.parent && root.parent !== root) { root = root.parent; }

    if (win.addEventListener) {
      win.addEventListener('message', handler, false);
    } else if (win.attachEvent) {
      win.attachEvent('onmessage', handler);
    } else {
      win.onmessage = handler;
    }
  }

  function handler(e) {
    var payload;
    if (typeof e.data !== 'string') { return; }

    try {
      payload = JSON.parse(e.data);
    } catch (err) {
      return;
    }

    handleForOrigin('*', payload.event, payload.data, e.source);
    handleForOrigin(e.origin, payload.event, payload.data, e.source);
  }

  function handleForOrigin(origin, event, data, source) {
    if (!listeners[origin]) { return; }
    if (!listeners[origin][event]) { return; }

    for (var i = 0; i < listeners[origin][event].length; i++) {
      listeners[origin][event][i](data, source);
    }
  }

  function broadcast(frame, payload, origin) {
    frame.postMessage(payload, origin);

    for(var i = 0; i < frame.frames.length; i++) {
      broadcast(frame.frames[i], payload, origin);
    }
  }

  function publish(event, data, origin) {
    origin = origin || '*';
    if (typeof event !== 'string') { return; }
    if (typeof origin !== 'string') { return; }

    var payload = { event: event, data: data };

    broadcast(root, JSON.stringify(payload), origin);

    return true;
  }

  function subscribe(event, fn, origin) {
    origin = origin || '*';
    if (typeof event !== 'string') { return; }
    if (typeof fn !== 'function') { return; }
    if (typeof origin !== 'string') { return; }

    listeners[origin] = listeners[origin] || {};
    listeners[origin][event] = listeners[origin][event] || [];
    listeners[origin][event].push(fn);
    return true;
  }

  function unsubscribe(event, fn, origin) {
    origin = origin || '*';
    if (typeof event !== 'string') { return; }
    if (typeof fn !== 'function') { return; }
    if (typeof origin !== 'string') { return; }
    if (!listeners[origin]) { return; }
    if (!listeners[origin][event]) { return; }

    for(var i = 0; i < listeners[origin][event].length; i++) {
      if (listeners[origin][event][i] === fn) {
        delete listeners[origin][event][i];
        return true;
      }
    }
  }

  var bus =  {
    pub: publish,
    publish: publish,
    sub: subscribe,
    subscribe: subscribe,
    unsub: unsubscribe,
    unsubscribe: unsubscribe
  };
  if(typeof window !== 'undefined') { attach(window); } else { bus.attach = attach; }
  return bus;
}));
