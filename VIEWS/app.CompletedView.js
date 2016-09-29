var app = app || {} 
app.CompletedView =  Backbone.View.extend({  
    el:'#completed-todo',
    initialize: function(attrs){
          this.options = attrs;
          this.completed = this.$('#toggleAll');
          this.input = this.$('#new-todo1');
          app.todoListCollection.on('add', this.addOne, this);
          //app.todoListCollection.on('change', this.render, this);
          app.todoListCollection.on('reset', this.addAll, this);
          app.todoListCollection.fetch( {
              traditional: true,
              data: {completed: 'true'}
          }); 
      },
      
      events: {
        'keypress #new-todo1': 'createTodoOnEnter',
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
        $('#todo-list1').append(view.render().el);
       
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