Yahara.Track = Ember.Model.extend({
  id: Ember.attr(),
  title: Ember.attr(),
  position: Ember.attr(Number),
  length: Ember.attr(Number),
  filename: Ember.attr(),
  album: Ember.belongsTo('Yahara.Album', {key: 'album_id'}),

  media_uri: function(){
    return ENV.HOST + "/stream/" + this.get('album.id') + "/" + encodeURIComponent(this.get('filename')) + ".mp3?token=";
  }.property('file_name'),

  playing: false,
  sound: null,
  currentPosition: 0,
  finished: false,

  pctStyle: function(){
    return "width: " + (this.get('currentPosition')/this.get('length'))*100 + "%";
  }.property('currentPosition'),

  play: function (){
    var track = this;
    track.loadSound().then(function() {
      track.get('sound').play();
      track.set('playing', true);
    });
  },

  nextTrack: function(){
    return this.get('album.tracks').findBy('position', this.get('position') + 1);
  }.property('album'),

  previousTrack: function(){
    return this.get('album.tracks').findBy('position', this.get('position') - 1);
  }.property('album'),

  pause: function(){
    this.set('playing', false);
    this.get('sound').pause();
  },

  stop: function(){
    this.set('playing', false);
    this.get('sound').stop();
  },

  resume: function(){
    this.set('playing', true);
    this.get('sound').play();
  },

  loadSound: function(){
    var track = this;
    return Ember.$.ajax(track.get('media_uri') + localStorage.token).then(function(data){
      track.set('sound', soundManager.createSound({
        url: data.url,
        whileplaying: function(){
          track.updatePosition();
        },
        onfinish: function(){
          track.set('finished', true);
        }
      }));
    });
  },

  updatePosition: function(){
    this.set('currentPosition', this.get('sound').position);
  }

});

Yahara.Track.url = "/api/catalog";
Yahara.Track.collectionKey = "albums";
Yahara.Track.adapter = Yahara.Adapter.create();
