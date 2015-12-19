App.ProjectFeature = function(){
  var ProjectFeature = {
    create: create,
    update: update,
    destroy: destroy,
    loadList: loadList,
    reloadList: reloadList,
    activate: activate,
    disactivate: disactivate,
    blur: blur,
    emptyInput: emptyInput,
    hideButtons: hideButtons
  };

  var ElementsCollection = App.ElementsCollection(),
      Template           = App.Template(),
      Project            = App.Project(),
      Message            = App.Message(),
      _el                = ElementsCollection.getElement;

  function create(){
    if ($(this).val() && $(this).val().length > 0) {
      Project.create({
        title: $(this).val()
      }).success(function(project){
        fadeInItem(project);
        reloadNewItem();
        Message.notify('Successfully created a project.');
      }).error(function(){
        Message.error('Failed to create a project.');
      });
    }
  }

  function update(){
    console.log($(this));
    Project.update({
      id: App.CurrentProjectId,
      title: getTitle.bind(this)()
    }).success(function(project){
      App.CurrentProjectTitle = project.title;
      Message.notify('Successfully updated a project.');
      reloadList();
    }).error(function(){
      Message.error('Failed to update a project.');
    });
  }

  function destroy(){
    Project.destroy({
      id: getId.bind(this)()
    }).success(function(){
      fadeOutItem.bind(this)();
      Message.notify('Successfully deleted a project.');
    }.bind(this)).error(function(){
      Message.error('Failed to delete a project.');
    });
  }

  function loadList(){
    Project.query().success(function(projects){
      projects.forEach(function(project){
        appendItem(project);
      });
      prepNewItem();
    }).error(function(){
      Message.error('Failed to load projects.');
    });
  }

  /*
   DOM Operation
   */

  function blur(){
    disactivate();
    $(_el('projectInput')).blur();
  }

  function emptyInput(){
    $(_el('projectInput')).val('');
  }

  function removeNewItem(){
    $(_el('projectAdd')).remove();
  }

  function prepNewItem(){
    return $(Template.get('newProject', { title: '+' })).prependTo(_el('projectList'));
  }

  function activate(){
    $(this).closest(_el('projectItem')).addClass('active');
  }

  function disactivate(){
    $(this).closest(_el('projectItem')).removeClass('active');
  }

  function emptyList(){
    $(_el('projectList')).empty();
  }

  function getTitle(){
    $(this).closest(_el('projectHeader')).find(_el('projectTitle')).text()
    return $(this).closest(_el('projectHeader')).find(_el('projectTitle')).text();
  }

  function getId(){
    return $(this).closest(_el('projectItem')).data('id');
  }

  function fadeInItem(project){
    $(_el('projectList')).fadeInPrepend(newItem(project));
  }

  function fadeOutItem(){
    $(this).closest(_el('projectItem')).fadeOut(500);
  }

  function appendItem(project){
    return $(Template.get('projectItem', {
      title: project.title, id: project.id
    })).appendTo(_el('projectList'));
  }

  function newItem(project){
    return $(Template.get('projectItem', {
      title: project.title,
      id: project.id
    }) );
  }

  function hideButtons(){
    $(_el('projectTitle')).text(App.CurrentProjectTitle);
    $(_el('projectTitle')).blur();
    $(_el('projectButtons')).hide();
  }

  function reloadList(){
    emptyList();
    loadList();
  }

  function reloadNewItem(){
    removeNewItem();
    prepNewItem();
  }

  return ProjectFeature;
};