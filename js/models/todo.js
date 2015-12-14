App.Todo = function(){};

App.Todo.query = function(props){
  return $.ajax({
    type: "GET",
    url: App.ENDPOINT + "/api/v1/projects/" + props.project_id + "/todos"
  });
};

App.Todo.create = function(props){
  return $.ajax({
    type: "POST",
    url: App.ENDPOINT + "/api/v1/projects/" + props.project_id + "/todos",
    data: props
  });
};

App.Todo.update = function(props){
  return $.ajax({
    type: "PUT",
    url: App.ENDPOINT + "/api/v1/todos/" + props.id,
    data: props
  });
};

App.Todo.prototype = {
  constructor: App.Todo
};