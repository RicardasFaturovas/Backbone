var app = app || {} 
app.CompletedView =  Backbone.View.extend({  
    el:'#completed-todo',
    initialize: function(attrs){
          this.completed = this.$('#toggleAll');
          this.input = this.$('#new-todo1');
          this.collection.on('add', this.addOne1, this);
          this.collection.on('remove', this.removeOne1, this);    
          this.collection.on('reset', this.addAll1, this);
          this.collection.fetch(); 
      },
      
      events: {
        'keypress #new-todo1': 'createTodoOnEnter',
        'click .toggleAll': 'toggleAllCompleted',
      },
      createTodoOnEnter: function(e){
            if ( e.which !== 13 || !this.input.val().trim() ) { // ENTER_KEY = 13
            return;
            }
            this.collection.create(this.newAttributes());
            this.input.val(''); 
        },
        addOne1: function(todo){
        var view = new app.TodoView({model: todo});
        $('#todo-list1').append(view.render().el);
       
      },
      removeOne1: function(todo){
        var view = new app.TodoView({model: todo});
         console.log(view.render().el);
        $('#todo-list1 li').remove();
       
      },
        addAll1: function(){
        this.$('#todo-list1').html(''); 
        this.collection.each(this.addOne1, this);
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