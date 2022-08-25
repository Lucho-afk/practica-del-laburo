// function borderContainer(){
//     require([
//         "dijit/layout/BorderContainer",
//         "dijit/layout/ContentPane"
//     ],function(BorderContainer,ContentPane){
//         var bc = new BorderContainer({
//             style: "width: 100%; height: 100%; border: none;"
//         },"contenido");
//         var cp1 = new ContentPane({
//             region: "top",
//             content: "<h1>THE PROJECT DOJO</h1><br>"+menu()
//             // content: menu()
//         },"menu");
//         var cp2 = new ContentPane({
//             region: "center",
//             content: "center"
//             // content: showGrid()
//         });

//         bc.addChild(cp1);
//         bc.addChild(cp2);

//         bc.startup();

//     });

// }
var grid, store, dataStore, danik;
var generated = false;

function menu() {
  require([
    "dojo/dom-style",
    "dojo/dom",
    "dojo/dom-construct",
    "dijit/MenuBar",
    "dijit/PopupMenuBarItem",
    "dijit/Menu",
    "dijit/MenuBarItem",
    "dijit/MenuItem",
    "dijit/DropDownMenu",
    "dojo/ready",
  ], function (
    ready,
    dom,
    domConstruct,
    MenuBar,
    PopupMenuBarItem,
    Menu,
    MenuBarItem,
    MenuItem,
    DropDownMenu
  ) {
    //var cs = domStyle.getComputedStyle(dom.byId("menu"));
    //var w = cs.width, h = cs.height;
    //dom.byId("menu").innerHTML = "menu.backgroundColor: " + backgroundColor;
    //var backgroundColor = style.set("menu", "backgroundColor", "red");

    var pMenuBar = new MenuBar({}, "menu");
    pMenuBar.addChild(
      new MenuBarItem({
        id: "user",
        label: "Users",
        onClick: function () {
          // dom.byId("users").innerHTML = "Users";
          dom.byId("users").style.display = "inline";
          dom.byId("products").style.display = "none";
          if (!generated) {
            // domConstruct.destroy("grid");
            showGrid();
          } else dom.byId("grid").style.display = "inline";
        },
      })
    );
    pMenuBar.addChild(
      new MenuBarItem({
        id: "prod",
        label: "Productos",
        onClick: function () {
          dom.byId("products").innerHTML =
            "<div id='grid2' onload='showGrid2()'><p>parrafo</p></div>";
          dom.byId("products").style.display = "inline";
          dom.byId("users").style.display = "none";
          dom.byId("grid").style.display = "none";
        },
      })
    );

    // pMenuBar.placeAt("menu");
    pMenuBar.startup();
  });
}

function getData() {
  require(["dojo/request"], function (request) {
    request.get("../../clientes.json").then(function (data) {
      localStorage.setItem("customers", data);
    });
  });
}

function deleteCustomer(item) {
  let arr = JSON.parse(localStorage.getItem("customers"));

  console.log("viejo: ", arr);
  let newArr = arr.filter((contact) => contact.id != item);
  console.log("nuevo: ", newArr);

  let newArrJson = JSON.stringify(newArr);

  localStorage.setItem("customers", newArrJson);

  arr.forEach(function (datos) {
    if (item == datos.id) {
      store.remove(item);
      grid.render();
    }
  });

  grid.update();
  grid.render();
}

function showGrid() {
  require([
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/Stateful",

    "dojo/on",
    "dojo/_base/array",

    "dojox/grid/DataGrid",
    "dojo/store/Memory",
    "dojo/data/ObjectStore",

    "dojo/request",
    "dojo/domReady!",
  ], function (
    dom,
    domConstruct,
    Stateful,
    on,
    arrayUtil,
    DataGrid,
    Memory,
    ObjectStore
  ) {
    // domConstruct.create("div",{id: "grid"},"users");
    dom.byId("grid").style.display = "inline";

    let data = JSON.parse(localStorage.getItem("customers"));

    store = new Memory({ data: data });
    dataStore = new ObjectStore({ objectStore: store });
    danik = new Stateful(data);

    function createGrid(dataStore) {
      grid = new DataGrid(
        {
          store: dataStore,
          query: { id: "*" },

          structure: [
            {
              noscroll: true,
              defaultCell: { width: "100px", editable: true },
              cells: [
                { name: "Id", field: "id" },
                { name: "First Name", field: "first" },
                { name: "Last Name", field: "last" },
                { name: "Phone", field: "phone" },
                { name: "Email", field: "email", width: "160px" },
                {
                  name: "Action",
                  field: "id",
                  formatter: getDelete,
                  width: "80px",
                },
              ],
            },
          ],
        },
        "grid"
      );
      generated = true;
      return grid;
    }

    function getDelete(item) {
      return `<button onclick=deleteCustomer(${item}) id='myButton' class='btn'>Delete</button>`;
    }

    dojo.ready(function () {
      getData();
      grid = createGrid(dataStore);
      grid.startup();
    });
  });
}

/*--------------------------------------------------------------------------------------------------------*/

function showGrid2() {
  require([
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/Stateful",

    "dojo/on",
    "dojo/_base/array",

    "dojox/grid/DataGrid",
    "dojo/store/Memory",
    "dojo/data/ObjectStore",

    "dojo/request",
    "dojo/domReady!",
  ], function (
    dom,
    domConstruct,
    Stateful,
    on,
    arrayUtil,
    DataGrid,
    Memory,
    ObjectStore
  ) {
    // domConstruct.create("div",{id: "grid"},"users");
    dom.byId("grid").style.display = "inline";

    let data = JSON.parse(localStorage.getItem("customers"));

    store = new Memory({ data: data });
    dataStore = new ObjectStore({ objectStore: store });
    danik = new Stateful(data);

    function createGrid(dataStore) {
      grid = new DataGrid(
        {
          store: dataStore,
          query: { id: "1" },

          structure: [
            {
              noscroll: true,
              defaultCell: { width: "100px", editable: true },
              cells: [
                { name: "Id", field: "id" },
                { name: "First Name", field: "first" },
                { name: "Last Name", field: "last" },
                { name: "Phone", field: "phone" },
                { name: "Email", field: "email", width: "160px" },
                {
                  name: "Action",
                  field: "id",
                  formatter: getDelete,
                  width: "80px",
                },
              ],
            },
          ],
        },
        "grid"
      );
      generated = true;
      return grid;
    }

    function getDelete(item) {
      return `<button onclick=deleteCustomer(${item}) id='myButton' class='btn'>Delete</button>`;
    }

    dojo.ready(function () {
      getData();
      grid = createGrid(dataStore);
      grid.startup();
    });
  });
}
