var $ = go.GraphObject.make;

var myDiagram =
  $(go.Diagram, "myDiagramDiv",
    {
      "undoManager.isEnabled": true,
      layout: $(go.TreeLayout,
                { angle: 90, layerSpacing: 35 })
    });

// the template we defined earlier
myDiagram.nodeTemplate =
  $(go.Node, "Horizontal",
    { background: "#44CCFF" },
    $(go.Picture,
      { margin: 10, width: 50, height: 50, background: "red" },
      new go.Binding("source")),
    $(go.TextBlock, "Default Text",
      { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
      new go.Binding("text", "name"))
  );

// define a Link template that routes orthogonally, with no arrowhead
myDiagram.linkTemplate =
  $(go.Link,
    { routing: go.Link.Orthogonal, corner: 5 },
    $(go.Shape, // the link's path shape
      { strokeWidth: 3, stroke: "#555" }));

var model = $(go.TreeModel);
model.nodeDataArray =
[
  { key: "1",              name: "A"   },
  { key: "2", parent: "1", name: "B1"    },
  { key: "3", parent: "1", name: "B2"  },
  // { key: "4", parent: "3", name: "C2"  },
  // { key: "5", parent: "3", name: "C3" },
  // { key: "6", parent: "2", name: "C1" }
];
myDiagram.model = model;