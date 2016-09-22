// var moment = require('moment');
// var moment = $.getScript("../node_modules/moment/moment.js");

var clock =  new Ractive({
  el:'#clock-container',
  template:'#template',
  data:{
    datetime : new Date(),
    moment:moment,
    major:(function(){return new Array(12);})(),
    minor:(function(){return new Array(60);})()
  }
});

setInterval( function () {
  clock.set( 'datetime', new Date() );
}, 1000 );
