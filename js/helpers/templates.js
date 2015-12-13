var templates = function(name, args){
  args || (args = {});

  return {
    projectList: "<li class='projectItem' data-id='" + args.id + "'>" +
        "<button class='projectItem__showProject'>" + args.title + "</button>" +
        "<button class='projectItem__deleteProject'>X</button>" +
      "</li>",
    newProject: "<li class='projectItem projectItemCreate'>" +
        "<input type='text' class='projectItem__createProject' placeholder='" + args.title + "'/>" +
      "</li>",
    todoList: "<li class='showProject__item' data-id='" + args.id + "'>" +
        "<label>" +
          "<input class='showProject__checkbox' type='checkbox'/>" +
          "<span class='showProject__todoLabel'>" +
            args.title + "" +
          "</span>" +
        "</label>" +
      "</li>"
  }[name]
};