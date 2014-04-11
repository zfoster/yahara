Yahara.CurrentUser = Ember.Object.extend({
  token: localStorage.token,
  cardnumber: null,
  authorized: Ember.computed.bool('token'),
  error: false,
  collection: Ember.A(),

  signOut: function(){
    this.set('token', null);
    localStorage.removeItem('token');
  },

  signIn: function(token){
    this.set('token', token);
    localStorage.token = token;
    this.loadCollection();
  },

  loadCollection: function(response){
    var user = this;
    if (arguments.length == 1) {
      user.get('collection').addObjects(response.map(function(album){
        return album.mprint.active;
      }));
    }
    else {
      ic.ajax.request({
        type: "GET",
        url: ENV.HOST + "/collection",
        data: user.getProperties('token')
      }).then(function(data){
        user.get('collection').addObjects(data.map(function(album){
          return album.mprint.active;
        }));
      }, function(error){
        console.error('There was a problem loading the collection');
      });
    }
  }
});