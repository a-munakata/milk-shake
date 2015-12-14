App.Project = function(){};

App.Project.query = function (props){
  return $.ajax({
    type: "GET",
    url: App.ENDPOINT + "/api/v1/projects"
  });
};

App.Project.create = function(props){
  return $.ajax({
    type: "POST",
    url: App.ENDPOINT + "/api/v1/projects",
    data: props
  });
};

App.Project.update = function(props) {
  return $.ajax({
    type: "PUT",
    url: App.ENDPOINT + "/api/v1/projects/" + props.id,
    data: props
  })
};

App.Project.destroy = function(props) {
  return $.ajax({
    type: "DELETE",
    url: App.ENDPOINT + "/api/v1/projects/" + props.id
  })
};

App.Project.prototype = {
  constructor: App.Project
};