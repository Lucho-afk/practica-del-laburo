require([
  "dojo/dom-construct",
  "dojo/dom-attr",
  "dojo/dom",
  "dojo/on",
  "dojo/domReady!",
], function (domConstruct, domAttr, dom, on) {
  var n = 0;
  on(dom.byId("placeReplace"), "click", function () {
    domConstruct.place("<div class='node'></div>", "refReplace", "replace");
    domAttr.set("placeReplace", "disabled", "disabled");
  });
});

require(["dojo/html", "dojo/dom", "dojo/on", "dojo/domReady!"], function (
  html,
  dom,
  on
) {
  on(dom.byId("setContent"), "click", function () {
    html.set(dom.byId("content"), "I was set!");
  });
});
require([
  "dojo/html",
  "dojo/dom",
  "dojo/on",
  "dojo/dom-construct",
  "dojo/domReady!",
], function (html, dom, on, domConstruct) {
  var nodo = dom.byId("usuarios");

  on(dom.byId("setContent2"), "click", function () {
    domConstruct.place(
      "<div id='grid' style='background-color:black' onload='showGrid();getData()'>div creado</div>",
      "content",
      "before"
    );
  });
});
