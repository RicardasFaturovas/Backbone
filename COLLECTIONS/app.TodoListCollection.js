 var app = app || {} 
 app.TodoListCollection = Backbone.Collection.extend({
       model: app.TodoItem,
       localStorage: new Store("backbone-todo"),
       byCompleted: function (completed) {
        filtered = this.filter(function (TodoItem) {
            return app.TodoItem.get("completed") === completed;
        });
        return new app.TodoListCollection(filtered);
    }
   });

