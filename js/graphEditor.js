import { getNearestPoint } from "./math/utils.js"
import { Point } from "./primitives/point.js"
import { Segment } from "./primitives/segment.js"

export class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas
    this.graph = graph

    this.selected = null
    this.hovered = null
    this.dragging = false
    this.mouse = null

    this.ctx = this.canvas.getContext("2d")
    this.#addEventListeners()
  }

  #addEventListeners() {
    this.canvas.addEventListener("mousedown", (e) => {
      if (e.button == 2) {
        if (this.hovered) {
          this.#removePoint(this.hovered)
        } else {
          this.selected = null
        }
      }
      
      if (e.button == 0) {
        if (this.hovered) {
          this.#select(this.hovered)
          this.dragging = true
          return
        }
        this.graph.addPoint(this.mouse)
        this.#select(this.mouse)
        this.hovered = this.mouse
      }
    })

    this.canvas.addEventListener("mousemove", (e) => {
      this.mouse = new Point(e.offsetX, e.offsetY)
      this.hovered = getNearestPoint(this.mouse, this.graph.points, 12)
      if (this.dragging) {
        this.selected.x = this.mouse.x
        this.selected.y = this.mouse.y
      }
    })

    this.canvas.addEventListener("contextmenu", (e) => { e.preventDefault() })
    this.canvas.addEventListener("mouseup", () => { this.dragging = false })
  }

  #removePoint(point) {
    this.graph.removePoint(point)
    this.hovered = null
    if (this.selected == point) {
      this.selected = null
    }
  }

  #select(point) {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, point))
    }
    this.selected = point
  }

  display() {
    this.graph.draw(this.ctx)
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true })
    }
    if (this.selected) {
      const intent = this.hovered ? this.hovered : this.mouse
      new Segment(this.selected, intent).draw(this.ctx, { dash: [3, 3] })
      this.selected.draw(this.ctx, { outline: true })
    }
  }
}