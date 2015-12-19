App.Todo = function(){
  return {
    query: function(props){
      return $.ajax({
        type: 'GET',
        url: App.Endpoint + '/api/v1/projects/' + props.project_id + '/todos'
      });
    },
    show: function(props){
      /*
       unused
       */
    },
    create: function(props){
      return $.ajax({
        type: 'POST',
        url: App.Endpoint + '/api/v1/projects/' + props.project_id + '/todos',
        data: props
      });
    },
    update: function(props){
      return $.ajax({
        type: 'PUT',
        url: App.Endpoint + '/api/v1/todos/' + props.id,
        data: props
      });
    },
    destroy: function(props){
      return $.ajax({
        type: 'DELETE',
        url: App.Endpoint + '/api/v1/todos/' + props.id,
        data: props
      });
    }
  };
};
