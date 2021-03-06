(function(Ember) {
  /**
    Transforms a string so that it may be used as part of a 'pretty' / SEO friendly URL.

    ```javascript
    'My favorite items.'.parameterize();                        // 'my-favorite-items'
    'action_name'.parameterize();                               // 'action-name'
    '100 ways Ember.js is better than Angular.'.parameterize(); // '100-ways-emberjs-is-better-than-angular'
    ```

    @method parameterize
    @param {String} str The string to parameterize.
    @return {String} the parameterized string.
  */

  var STRING_PARAMETERIZE_REGEXP_1 = (/[_|\/|\s]+/g),
      STRING_PARAMETERIZE_REGEXP_2 = (/[^a-z0-9\-]+/gi),
      STRING_PARAMETERIZE_REGEXP_3 = (/[\-]+/g),
      STRING_PARAMETERIZE_REGEXP_4 = (/^-+|-+$/g);

  var parameterize = Ember.String.parameterize = function(str) {
    return str.replace(STRING_PARAMETERIZE_REGEXP_1, '-') // replace underscores, slashes and spaces with separator
              .replace(STRING_PARAMETERIZE_REGEXP_2, '')  // remove non-alphanumeric characters except the separator
              .replace(STRING_PARAMETERIZE_REGEXP_3, '-') // replace multiple occurring separators
              .replace(STRING_PARAMETERIZE_REGEXP_4, '')  // trim leading and trailing separators
              .toLowerCase();
  };

  if (Ember.EXTEND_PROTOTYPES === true || Ember.EXTEND_PROTOTYPES.String) {
    String.prototype.parameterize = function() {
      return parameterize(this);
    };
  }

}(this.Ember));