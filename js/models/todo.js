var Todo = {
  query: function(args){
    return $.ajax({
      type: "GET",
      url: App.endpoint + "/api/v1/projects/" + args.project_id + "/todos",
      success: function (data) {

      }
    });
  },
  update: function(args){
    // TODO: whitelist
    return $.ajax({
      type: "PUT",
      url: App.endpoint + "/api/v1/todos/" + args.id,
      data: args,
      success: function (data) {
      }
    });
  }
};
