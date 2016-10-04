 var app = app || {} 
 app.TodoListView = Backbone.View.extend({
      el: '#todo',
      initialize: function(){
          this.doneCollection= this.options.doneCollection; 
          this.ongoingCollection= this.options.ongoingCollection; 
          this.completed = this.$('.toggleAll');
          this.input = this.$('#new-todo');
          this.collection.on('add', this.addOne, this);
          this.collection.on('reset', this.addAll, this);
          this.collection.on('change:completed', this.addToCompleted, this);
          this.collection.on('destroy', this.removeFromCompleted, this);
          this.collection.fetch(); 
      },
      events: {
        'keypress #new-todo': 'createTodoOnEnter',
        'click .toggleAll': 'toggleAllCompleted',
      },
      createTodoOnEnter: function(e){
      if ( e.which !== 13 || !this.input.val().trim() ) { // ENTER_KEY = 13
        return;
      }
      this.collection.create(this.newAttributes());
      this.input.val(''); 
  },
        addOne: function(todo){
        var view = new app.TodoView({model: todo});
        $('#todo-list').append(view.render().el);
        this.ongoingCollection.add(todo);
      },
        addAll: function(){
        this.$('#todo-list').html(''); 
        this.collection.each(this.addOne, this);
      },
      addToCompleted: function(todo){
        var view = new app.TodoView({model: todo});
        if(todo.get('completed')===true){
          this.doneCollection.add(todo);
           this.ongoingCollection.remove(todo);  
        }
        else {
          this.ongoingCollection.add(todo);
          this.doneCollection.remove(todo);  
        }
      },
      removeFromCompleted: function(todo){
        var view = new app.TodoView({model: todo});
        this.doneCollection.remove(todo);
      },
      toggleAllCompleted: function(){
            
              this.collection.each(function(TodoItem){
              TodoItem.save({ completed: !TodoItem.get('completed')});
          }, this);
      },
        newAttributes: function(){
            return {
                title: this.input.val().trim(),
                completed: false
            }
        }
    });