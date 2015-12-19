App.ProjectsController = function(){

  var Page               = App.Page(),
      Key                = App.KeyCode(),
      ProjectFeature     = App.ProjectFeature(),
      TodoFeature        = App.TodoFeature(),
      ElementsCollection = App.ElementsCollection(),
      Message            = App.Message(),
      _el                = ElementsCollection.getElement;

  ////////////////////////////////////////////////

  function init(){
    Page.init();
    ProjectFeature.loadList();

    /*
     DUMMY for debugging show
     */

    // showProject({ id: 143, title: App.CurrentProjectTitle });
  }

  function showProject(props){
    App.CurrentProjectId = props.id;
    App.CurrentProjectTitle = props.title;

    $(_el('projectTitle')).html(App.CurrentProjectTitle);

    Page.get('show');

    TodoFeature.reloadList({
      project_id: App.CurrentProjectId
    });
  }

  function updateProject(){
    ProjectFeature.update.bind(this)();
    $(_el('projectButtons')).hide();
  }

  /*
   EVENT LISTENERS
   */

  $(document).on({
    click: function(){
      Page.get('index');
    }
  }, _el('backButton'));

  $(document).on({
    focus: function(){
      $(this).closest(_el('projectAdd')).addClass('focus');
    },
    focusout: function(){
      $(this).closest(_el('projectAdd')).removeClass('focus');
    }
  }, _el('projectInput'));

  $(document).on({
    click: function(){
      TodoFeature.destroy.bind(this)();
    }
  }, _el('deleteTodo'));

  $(document).on({
    click: function(){
      ProjectFeature.hideButtons();
    }
  }, 'body');

  $(document).on({
    click: function(){
      $(this).hide();
    }
  }, _el('projectButtons'));

  $(document).on({
    click: function(e){
      updateProject.bind(this)();
      e.stopPropagation();
    }
  }, _el('updateProjectTitle'));

  $(document).on({
    change: function(){
      TodoFeature.update.bind(this)();
    }
  }, _el('todoCheckbox'));

  $(document).on({
    click: function(){
      showProject({
        id: $(this).closest(_el('projectItem')).data('id'),
        title: $(this).text()
      });
    }
  }, _el('showProject'));

  $(document).on({
    click: function(e){
      $(_el('projectButtons')).show();
      e.stopPropagation();
    },
    keyup: function(e){
      if (Key.isEnter(e.which)) {
        $(_el('projectTitle')).blur();
        updateProject.bind(this)();
      }
      if (Key.isEscape(e.which)) {
        ProjectFeature.hideButtons();
      }
    },
    keydown: function(e){
      if (Key.isEnter(e.which)) {
        return false;
      }
    }
  }, _el('projectTitle'));

  $(document).on({
    click: function(){
      ProjectFeature.destroy.bind(this)();
    }
  }, _el('deleteProject'));

  $(document).on({
    focus: function(){
      ProjectFeature.activate.bind(this)();
    },
    focusout: function(){
      ProjectFeature.disactivate.bind(this)();
      ProjectFeature.emptyInput();
    },
    keyup: function(e){
      if (Key.isEnter(e.which)) {
        ProjectFeature.create.bind(this)();
      }

      if (Key.isEscape(e.which)) {
        ProjectFeature.blur();
        ProjectFeature.emptyInput();
      }
    }
  }, _el('projectInput'));

  $(document).on({
    focusout: function(){
      TodoFeature.emptyInput();
    },
    keyup: function(e){
      if (Key.isEnter(e.which)) {
        TodoFeature.create.bind(this)({
          project_id: App.CurrentProjectId
        });
      }

      if (Key.isEscape(e.which)) {
        TodoFeature.emptyInput();
      }
    }
  }, _el('todoInput'));

  /*
   PUBLIC METHODS
   */

  this.init = init;
};
