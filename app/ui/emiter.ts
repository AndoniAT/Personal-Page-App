'use client'
var EventEmitter2 = require('eventemitter2');
const emitter = new EventEmitter2({

  // set this to `true` to use wildcards
  wildcard: false,

  // the delimiter used to segment namespaces
  delimiter: '.', 

  // set this to `true` if you want to emit the newListener event
  newListener: false, 

  // set this to `true` if you want to emit the removeListener event
  removeListener: false, 

  // the maximum amount of listeners that can be assigned to an event
  maxListeners: 10,

  // show event name in memory leak message when more than maximum amount of listeners is assigned
  verboseMemoryLeak: false,

  // disable throwing uncaughtException if an error event is emitted and it has no listeners
  ignoreErrors: false
});

export default emitter;

export const listenerNavBar = ( fn:Function ) => {
  const side_nav_event = ( message:string ) => {
    let newShow = message == 'open';
    fn( newShow );
  };

  emitter.on( 'side_nav', side_nav_event );

  return () => {
    emitter.off( 'side_nav', side_nav_event );
  };
}

export const listenerGallery = ( fn:Function ) => {
  const gallery_event = ( message:string ) => {
    emitter.off( 'gallery', gallery_event );
    let newShow = message == 'open';
    fn( newShow );
    emitter.on( 'gallery', gallery_event );
  };

  emitter.on( 'gallery', gallery_event );

  return () => {
    emitter.off( 'gallery', gallery_event );
  };
}