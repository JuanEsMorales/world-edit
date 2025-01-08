import { GraphEditor } from './graphEditor.js';
import { Graph } from './math/graph.js';
import { Envelope } from './primitives/envelope.js';
import { Viewport } from './viewport.js';
import { World } from './world.js';

const myCanvas = document.getElementById('my-canvas')
const disposeButton = document.getElementById('dispose')
const saveButton = document.getElementById('save')

disposeButton.addEventListener("click", () => dispose())
saveButton.addEventListener("click", () => save())

myCanvas.width = 600;
myCanvas.height = 600;

const ctx = myCanvas.getContext('2d');

const graphString = localStorage.getItem("graph")
const graphInfo = graphString ? JSON.parse(graphString) : null

const graph = graphInfo ? Graph.load(graphInfo) : new Graph()
const world = new World(graph)
const viewport = new Viewport(myCanvas)
const graphEditor = new GraphEditor(viewport, graph)

animate()

function animate() {
  viewport.reset()
  world.generate()
  world.draw(ctx)
  graphEditor.display()
  ctx.restore()
  requestAnimationFrame(animate)
}

function dispose() {  
  graphEditor.dispose()
}

function save() {
  localStorage.setItem('graph', JSON.stringify(graph))
}
