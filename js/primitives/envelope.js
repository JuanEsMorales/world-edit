import { angle, subtract, translate } from "../math/utils.js"
import { Polygon } from "./poligon.js"

export class Envelope {
  constructor(skeleton, width, roundness = 1) {
    this.skeleton = skeleton
    this.poly = this.#generatePolygon(width, roundness) 
  }

  #generatePolygon(width, roundness) {
    const { start, end } = this.skeleton

    const radius = width / 2
    const alpha = angle(subtract(start, end))
    const alpha_cw = alpha + Math.PI / 2
    const alpha_ccw = alpha - Math.PI / 2

    const points = []
    const step = Math.PI / Math.max(1, roundness)
    const eps = step / 2

    for (let i = alpha_ccw; i <= alpha_cw + eps; i+= step) {
      points.push(translate(start, i, radius))
    }
    for (let i = alpha_ccw; i <= alpha_cw + eps; i+= step) {
      points.push(translate(end, Math.PI + i, radius))
    }

    return new Polygon(points)
  }

  draw(ctx) {
    this.poly.draw(ctx)
  }
}