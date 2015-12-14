App.ProjectsController = function(){
  var currentPageStatus;
  var currentProjectId;
  var currentProjectTitle;

  ////////////////////////////////////////////////

  function init(){
//    updatePageStatus('index');
    updatePageProps({ page_status: 'index' });
    loadProjects();

    // DUMMY
//    showProject({ id: 7, title: "Christmas" });
  }

  function updatePageStatus(pageStatus){
    // updatePageDomが必要なだけで、これ自体ないもしていない
    // が、updateCurrentProjectIdは複数の目的のためにprojectIdを更新して
    // 値を共有するため、それに合わせてこうしている
    if (pageStatus && currentPageStatus != pageStatus) {
      currentPageStatus = pageStatus;
    }
  }

  function updateCurrentProjectId(project_id){
    if (project_id && currentProjectId != project_id) {
      currentProjectId = project_id;
    }
  }

  function updateCurrentProjectTitle(title){
    if (title && currentProjectTitle != title) {
      currentProjectTitle = title;
    }
  }

  function updatePageDom(pageStatus){
    // ページ遷移
    // TODO: ここの名前とかやり方をどうにか
    // updatePageStatus()が呼ばれた後でないと正しく動かない
    $("[ms-page]").hide();
    $("[ms-page='" + pageStatus + "']").show();
  }

  function updatePageProps(props){
    updateCurrentProjectId(props.project_id);
    updatePageStatus(props.page_status);
    updatePageDom(props.page_status);
    updateCurrentProjectTitle(props.project_title)
  }

  function loadProjects(){
    // プロジェクトの読み込み
    // TODO: Error handling
    App.Project.query().success(function(projects){
      projects.forEach(function(project){
        $("[ms-project-list]").append(App.templates("projectItem", { title: project.title, id: project.id }));
      });

      addEmptyProject();
    });
  }

  function resetProjects(){
    $("[ms-project-list]").empty();
  }

  function reloadProjects(){
    resetProjects();
    loadProjects();
  }

  function addEmptyProject(){
    $("[ms-project-list]").append(App.templates("newProject", { title: '+' }));
  }

  function removeEmptyProject(){
    $("[ms-new-project-item]").remove();
  }

  function loadTodos(){
    // Todoの読み込み
    // TODO: Error handling

    App.Todo.query({ project_id: currentProjectId }).success(function(todos){
      todos.forEach(function(todo){
        $("[ms-todo-list]").append(App.templates("todoItem", { title: todo.title, id: todo.id }));
        // TODO: Refactoring
        toggleCheckbox.bind(document.querySelector("[ms-todo-item][data-id='" + todo.id + "'] input"))(todo);
      });
    });
  }

  function toggleCheckbox(data){
    $(this).prop("checked", data.is_completed);
  }

  function reloadTodos(){
    resetTodos();
    loadTodos();
  }

  function resetTodos(){
    $("[ms-todo-list]").empty();
  }

  function showProject(props){
    // TODO: props.idなのか、project_idなのかわからなくなってきた。
    // props.idがproject_id?
    // DOMの方もdata-idとかなっているから、data-project-idにするとか
    updatePageProps({
      page_status: 'show',
      project_id: props.id,
      project_title: props.title
    });

    $("[ms-project-title]").html(currentProjectTitle);

    if (currentProjectId != props.id || props.id == undefined) {
      // TODO: ここの条件式がうまくいっていないような
      // 別なプロジェクトを選択した場合のみ、reloadTodos();
    } else {
      // TODO: 同一プロジェクトを選択した場合の処理
    }
    reloadTodos();
  }

  function focusoutProject(){
    // TODO: Dup
    $(this).closest("[ms-project-item]").removeClass("active");
    $("[ms-project-input]").blur();
    $("[ms-project-input]").val('');
  }

  function focusoutTodo(){
    // TODO: Dup
    $(this).closest("[ms-todo-item]").removeClass("active");
    $("[ms-todo-input]").blur();
    $("[ms-todo-input]").val('');
  }

  function createProject(){
    // TODO: Dup
    if ($(this).val() && $(this).val().length > 0) {
      App.Project.create({ title: $(this).val() }).success(function(project){
        $("[ms-project-list]").append(App.templates("projectItem", { title: project.title, id: project.id }));
        removeEmptyProject();
        addEmptyProject();
      });
    }
  }

  function createTodo(){
    // 引数でproject_idを渡すか、変数を共有するか？
    // TODO: Dup
    if ($(this).val() && $(this).val().length > 0) {
      App.Todo.create({ title: $(this).val(), project_id: currentProjectId }).success(function(todo){
        $("[ms-todo-list]").append(App.templates("todoItem", { title: todo.title, id: todo.id }));
        removeEmptyProject();
        addEmptyProject();
      });
    }
  }

  // EVENT LISTENERS
  ////////////////////

  $(document).on({
    click: function(){
      // Project を押した後のshow
      showProject({ id: $(this).closest("[ms-project-item]").data('id'), title: $(this).text() });
    }
  }, "[ms-show-project]");

  $(document).on({
    click: function(){
      // updatePageStatus('index');
      updatePageProps({ page_status: 'index' });
    }
  }, "[ms-back-button]");

  $(document).on({
    focus: function(){
      $(this).closest("[ms-new-project-item]").addClass("focus");
    },
    focusout: function(){
      $(this).closest("[ms-new-project-item]").removeClass("focus");
    }
  }, "[ms-project-input]");

  $(document).on({
    click: function(){
      var $projectItem = $(this).closest("[ms-project-item]");

      App.Project.destroy({ id: $projectItem.data("id") }).success(function(){
        $projectItem.fadeOut(500);
      });
    }
  }, "[ms-delete-project]");

  // TODO: Duplicated with TodoItem
  $(document).on({
    focus: function(){
      $(this).closest("[ms-project-item]").addClass("active");
    },
    focusout: function(){
      $(this).closest("[ms-project-item]").removeClass("active");
      createProject.bind(this)();
    },
    keyup: function(e){
      if (e.which == 13) {
        focusoutProject();
        createProject.bind(this)();
      }
      if (e.which == 27) {
        focusoutProject();
      }
    }
  }, "[ms-project-input]");

  // TODO: Duplicated with ProjectItem
  $(document).on({
    focus: function(){
      $(this).closest("[ms-todo-item]").addClass("active");
    },
    focusout: function(){
      $(this).closest("[ms-todo-item]").removeClass("active");
      createTodo.bind(this)();
    },
    keyup: function(e){
      if (e.which == 13) {
        focusoutTodo();
        createTodo.bind(this)({ project_id: currentProjectId });
      }
      if (e.which == 27) {
        focusoutTodo();
      }
    }
  }, "[ms-todo-input]");

  $(document).on({
    click: function(e){
      e.stopPropagation();

      // TODO: ここの条件式をわかりやすく
      //      $(document).on({
      //        focus: function(){
      //
      //        },
      //        focusout: function(e){
      //
      //        }
      //      }, "[ms-project-title]");

      // TODO: CANCEL押すとおかしい
      if ($(this).find("[ms-update-project-title]").length > 0) {
        console.log("NOOOO")
        App.Project.update({
          id: currentProjectId,
          title: $(this).closest("[ms-project-header]").find("[ms-project-title]").text()
        }).success(function(){
          App.message("Project title has been updated.", 5000);
          reloadProjects();
        });
      } else {
        $(this).text(currentProjectTitle)
      }
    }
  }, ":not([ms-update-project-title])");

  $(document).on({
    change: function(){
      // TODO ✔︎の処理
      App.Todo.update({
        id: $(this).closest("[ms-todo-item]").data("id"),
        is_completed: $(this).is(":checked"),
        completed_at: $(this).is(":checked") ? Math.round($.now()/1000) : null
      }).success( toggleCheckbox.bind(this) )
    }
  }, "[ms-todo-checkbox]");

  // PUBLIC METHODS
  ////////////////////

  this.init = init;
};
