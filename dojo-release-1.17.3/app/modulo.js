define(function name(params) {
  var numero = 0;

  return {
    increment: function () {
      numero++;
    },

    decrement: function () {
      numero--;
    },

    getValue: function () {
      return numero;
    },
  };
});
