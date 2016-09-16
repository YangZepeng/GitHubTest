(function(window, Ractive)
{
  var items;

  // try to load from localStorage
  try {
    items = JSON.parse( localStorage.todoItems );
  } catch ( err ) {}
  
  if ( !items ) {
    items = [
      { completed: true,  description: 'Add a todo' },
      { completed: false, description: 'Add some more todos' },
      { completed: false, description: 'Build something with Ractive.js' }
    ]
  }
  var filters = {
    completed: function ( item ) { return item.completed; },
    active: function ( item ) { return !item.completed; },
    all: function () { return true; }
  };
  var ractive = new Ractive({
    el: '#todoListEl',
    template:'#template',
    data: {
      items: items,
      filters: filters,
      currentFilter: 'all'
    },
    computed: {
      completedTodos: function () {
        return this.get( 'items' ).filter( filters.completed );
      },

      activeTodos: function () {
        return this.get( 'items' ).filter( filters.active );
      },

      filter: function () {
        return filters[ this.get( 'currentFilter' ) ];
      }
    },

    // Methods for interacting with the list
    createTodo: function ( event ) {
      this.push( 'items', {
        description: event.node.value,
        completed: false
      });

      event.node.value = ''; // reset
    },

    submitEdit: function ( event, index ) {
      this.set( 'items[' + index + '].description', event.node.value );
      this.set( 'currentlyEditing', null );
    },

    clearCompleted: function () {
      var items = this.get( 'items' );
      var i = items.length;

      while ( i-- ) {
        if ( items[i].completed ) {
          this.splice( 'items', i, 1 );
        }
      }
    },

    toggleAll: function ( event ) {
      this.set( 'items[*].completed', event.node.checked );
    },

    // Event and transition plugins
    // events: {
    //   tap: require( 'ractive-events-tap' )
    // },

    // transitions: {
    //   slide: require( 'ractive-transitions-slide' )
    // },

    // Decorators allow you to interact with DOM nodes
    // when they are created or destroyed. In this case,
    // we want to select the contents of the edit <input>
    // as soon as it's created
    decorators: {
      select: function ( node ) {
        setTimeout( function () {
          node.select();
        });

        return {
          // teardown is a noop
          teardown: function () {}
        };
      }
    },

    // disable slide transitions during initial render
    noIntro: true
  });

  // persist changes to localStorage if possible
  ractive.observe( 'items', function ( items ) {
    try {
      localStorage.todoItems = JSON.stringify( items );
    } catch ( err ) {}
  });

  window.ractive = ractive;
})(window, Ractive);