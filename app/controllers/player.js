export default Ember.ObjectController.extend({

  album: null,
  track: null,

  nextTrack: (function(){
    if (this.get('album')) {
      return this.get('album.tracks').findBy('position', this.get('track.position') + 1)
    }
  }).property('track'),

  previousTrack: (function(){
    if (this.get('album')) {
      return this.get('album.tracks').findBy('position', this.get('track.position') - 1)
    }
  }).property('track'),

  actions: {
    pause: function(){
      this.get('track').pause();
    },

    toggle: function(){
      if (this.get('track.playing')) {
        this.get('track').pause();
      }
      else {
        this.get('track').resume();
      }
    },

    play: function(album, track){
      if (this.get('track')) {
        this.get('track').stop();
      }
      this.setProperties({'album': album, 'track': track});
      track.play();
    }
  }
});