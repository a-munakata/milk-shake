var ProjectsController = function(){
  var currentProjectId;

  ////////////////////////////////////////////////

  var init = function(){
    updatePageStatus('index');
    loadProjects();

    // DUMMY
    showProject({ id: 7, title: "Christmas" });
  };

  var updatePageStatus = function(pageStatus){
    // ページ遷移
    $(".page").hide();
    $("." + pageStatus).show();
  };

  var loadProjects = function(){
    // プロジェクトの読み込み
    // TODO: Error handling
    Project.query().success(function(projects){
      projects.forEach(function(project){
        $(".main__projects").append(templates("projectList", { title: project.title, id: project.id }));
      });

      addEmptyProject();
    });
  };

  var addEmptyProject = function(){
    $(".main__projects").append(templates("newProject", { title: '+ NEW' }));
  };

  var removeEmptyProject = function(){
    $(".projectItemCreate").remove();
  };

  var loadTodos = function(){
    // Todoの読み込み
    // TODO: Error handling
    Todo.query({ project_id: currentProjectId }).success(function(todos){
      todos.forEach(function(todo){
        $(".showProject__todos").append(templates("todoList", { title: todo.title, id: todo.id }));
      });
    });
  };

  var reloadProjects = function(){
    resetProjects();
    loadProjects();
  };

  var reloadTodos = function(){
    resetTodos();
    loadTodos();
  };

  var resetProjects = function(){
    $(".main__projects").empty();
  };

  var resetTodos = function(){
    $(".showProject__todos").empty();
  };

  var showProject = function(args){
    updatePageStatus('show');
    $(".showProject__title").html(args.title);

    if (currentProjectId != args.id) {
      currentProjectId = args.id;
      reloadTodos();
    } else {
      // TODO: 同一プロジェクトを選択した場合の処理
    }
  };

  $(document).on("click", ".projectItem__showProject", function(){
    // Project を押した後のshow
    showProject({ id: $(this).closest(".projectItem").data('id'), title: $(this).text() });
  });

  $(document).on("click", ".showProject__back", function(){
    updatePageStatus('index');
  });

//  $(document).on("click", ".main__newProject", function(){
//    $(".newProject").show();
//  });

//  $(document).on("click", ".newProject__close", function(){
//    $(".newProject").hide();
//  });

//  $(document).on("keyup", ".newProject__title", function(){
//    // TODO: キーを過剰に押した時の対応
//    var oldVal, newVal = this.value;
//    if (oldVal != newVal) {
//      newProjectTitle = newVal;
//    }
//    reloadProjects();
//  });

//  $(document).on("click", ".newProject__create", function(){
//    $(".newProject__title").val('');
//    Project.create({ title: newProjectTitle }).success(function(){
//      reloadProjects();
//    });
//    $(".newProject").hide();
//  });

  $(document).on("click", ".projectItem__deleteProject", function(){
    var $projectItem = $(this).closest(".projectItem");

    Project.destroy({ id: $projectItem.data("id") }).success(function(){
      $projectItem.fadeOut(500);
    });
  });

  $(document).on("focus", ".showProject__title", function(){
    console.log("focus");
  });

  $(document).on("focusout", ".showProject__title", function(){
    console.log("focusout");
  });


  $(document).on("focus", ".projectItem__createProject", function(){
    $(this).closest(".projectItem").addClass("active");
  });

  $(document).on("keyup", ".projectItem__createProject", function(e){
    if (e.which == 13) {
      focusoutProject();
      createProject.bind(this)();
    }
    if (e.which == 27) {
      focusoutProject();
    }
  });

  var focusoutProject = function(){
    $(this).closest(".projectItem").removeClass("active");
    $(".projectItem__createProject").blur();
    $(".projectItem__createProject").val('');
  };

  var createProject = function(){
    if ($(this).val() && $(this).val().length > 0) {
      Project.create({ title: $(this).val() }).success(function(project){
        $(".main__projects").append(templates("projectList", { title: project.title, id: project.id }));
        removeEmptyProject();
        addEmptyProject();
      });
    }
  };

  $(document).on("focusout", ".projectItem__createProject", function(){
    $(this).closest(".projectItem").removeClass("active");
    createProject.bind(this)();
  });

  $(document).on("change", ".showProject__checkbox", function(){
    // TODO ✔︎の処理
//    console.log($(this).is(":checked"));
    Todo.update({
      id: $(this).closest(".showProject__item").data("id"),
      is_completed: $(this).is(":checked"),
      completed_at: Math.round($.now()/1000)
    }).success(function(data){
      $(".showProject__checkbox").prop("checked", data.is_completed);
      $(".message").text(data.is_completed);

      if (data.is_completed){
        message("Checked");
      } else {
        message("Unchecked", -1);
      }
    })
  });


  init();
};
