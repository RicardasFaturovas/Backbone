 var app = app || {} 
 app.TodoListCollection = Backbone.Collection.extend({
       model: app.TodoItem,
       localStorage: new Store("backbone-todo"),
       byCompleted: function (completed) {
        filtered = this.filter(function (TodoItem) {
            return TodoItem.get("completed") === completed;
        });
        
        return new app.TodoListCollection(filtered);
    },done: function() {
      return this.where({completed: true});
    },ongoing: function() {
      return this.where({completed: false});
    },all: function() {
      return this;
    }   
   });

