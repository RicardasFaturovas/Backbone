 var app = app || {} 
 app.TodoListView = Backbone.View.extend({
      el: '#todo',
      initialize: function(){
          this.completed = this.$('#toggleAll');
          this.input = this.$('#new-todo');
          app.todoListCollection.on('add', this.addOne, this);
          app.todoListCollection.on('reset', this.addAll, this);
          app.todoListCollection.fetch(); 
      },
      events: {
        'keypress #new-todo': 'createTodoOnEnter',
        'click .toggleAll': 'toggleAllCompleted',
      },
      createTodoOnEnter: function(e){
      if ( e.which !== 13 || !this.input.val().trim() ) { // ENTER_KEY = 13
        return;
      }
      app.todoListCollection.create(this.newAttributes());
      this.input.val(''); 
  },
        addOne: function(todo){
        var view = new app.TodoView({model: todo});
        $('#todo-list').append(view.render().el);
        
      },
        addAll: function(){
        this.$('#todo-list').html(''); 
        app.todoListCollection.each(this.addOne, this);
      },
      toggleAllCompleted: function(){
            
              app.todoListCollection.each(function(TodoItem){
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