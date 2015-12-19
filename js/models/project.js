App.Project = function(){
  return {
    query: function (props){
      return $.ajax({
        type: 'GET',
        url: App.Endpoint + '/api/v1/projects'
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
        url: App.Endpoint + '/api/v1/projects',
        data: props
      });
    },
    update: function(props) {
      return $.ajax({
        type: 'PUT',
        url: App.Endpoint + '/api/v1/projects/' + props.id,
        data: props
      })
    },
    destroy: function(props) {
      return $.ajax({
        type: 'DELETE',
        url: App.Endpoint + '/api/v1/projects/' + props.id
      })
    }
  };
};