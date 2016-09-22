var rating = Ractive.extend({
	template:'#RateT',
	data:{
		rating:6,
    stars: function () {
      var max = this.get('max');
      return new Array(max);
    },
    highlight:function(rating){
    if(!this.get( 'readonly' ))
    {
      this.set('hightlighted',rating);
    }
  }
	}

});

var r = new rating({
  el:('#rel'),
  data:{
    rating:3,
    max : 10
  }
});
r.on({
    'highlight':function ( index,index2) {
      if(! this.get('readonly'))
      {
        var str3 = JSON.stringify(index, null, 4); 
        console.log("index---->"+str3); 
        console.log("index2---->"+index2); 
        this.set( 'hightlighted', index2 );
      }
    },
    'select':function( event,index) {
        if(! this.get('readonly'))
        {
          var str3 = JSON.stringify(event, null, 4); 
          console.log("event---->"+str3); 
          console.log("index---->"+index); 
          this.set('rating',index);
        }
    }
});

var ractive = new Ractive({
  el:('#el'),
  template: ('#template'),
  components : {'rating':rating,
                }
});

ractive.on(
   'highlight',function ( rating ) {
      alert("!");
      if ( !this.get( 'readonly' ) ) {
        this.set( 'hightlighted', rating );
      }
    }
);

Ractive.components.Rate = rating;

// var str = JSON.stringify(Ractive.components, null, 4); 
// console.log("Ractive.components---->"+str); 

// var str2 = JSON.stringify(Ractive.components.rating, null, 4); 
// console.log("components.rating---->"+str2); 

// var str3 = JSON.stringify(rating.stars, null, 4); 
// console.log("rating.stars---->"+str3); 

// var str3 = JSON.stringify(Container.s, null, 4); 
// console.log("Container.s---->"+str3); 