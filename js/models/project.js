var Project = {
  query: function(args){
    return $.ajax({
      type: "GET",
      url: App.endpoint + "/api/v1/projects",
      success: function (data) {

      }
    });
  },
  create: function(args){
    // TODO: whitelist登録
    return $.ajax({
      type: "POST",
      url: App.endpoint + "/api/v1/projects",
      data: args,
      success: function (data) {

      }
    });
  },
  destroy: function(args){
    return $.ajax({
      type: "DELETE",
      url: App.endpoint + "/api/v1/projects/" + args.id,
      success: function (data) {

      }
    });
  }
};
