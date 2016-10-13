var app = app || {} 
app.OngoingView =  Backbone.View.extend({  
    el:'#ongoing-todo',
    initialize: function(attrs){
          this.completed = this.$('#toggleAll');
          this.input = this.$('.new-todo1');
          this.collection.on('add', this.onAdd, this);
          this.collection.on('remove', this.onRemove, this);    
          this.collection.on('reset', this.onReset,this);
          this.collection.fetch(); 
          this.render();
          console.log(this.collection);
      },
      render: function(){
          var ongoing = app.todoListCollection.ongoing();
          this.collection = this.collection.reset(ongoing);
          console.log(ongoing);
      },
      events: {
        'keypress .new-todo1': 'createTodoOnEnter',
        'click .toggleAll': 'toggleAllCompleted',
      },
      createTodoOnEnter: function(e){
            if ( e.which !== 13 || !this.input.val().trim() ) { // ENTER_KEY = 13
            return;
            }
            this.collection.create(this.newAttributes());      
            this.input.val(''); 
        },
        onAdd: function(todo){
            app.todoListCollection.add(todo);
        var view = new app.TodoView({model: todo});
        $('.todo-list1').append(view.render().el);
       
      },
      onRemove: function(todo){ 
        this.$('.todo-list1').html(''); 
        this.collection.each(this.onAdd, this);
        var view = new app.TodoView({model: todo});
        $('.todo-list1 li #' + view.model.cid).remove();
       
      },
        onReset: function(collection){
            console.log(collection);
        this.$('.todo-list1').html(''); 
        collection.each(this.onAdd, this);
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