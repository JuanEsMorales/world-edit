import { Envelope } from "./primitives/envelope.js"

export class World {
  constructor(graph, roadWidth = 100, roadRoundness = 3) {
    this.graph = graph
    this.roadWidth = roadWidth
    this.roadRoundness = roadRoundness

    this.envelopes = []

    this.generate()
  }

  generate() {
    this.envelopes.length = 0
    for (const seg of this.graph.segments) {
      this.envelopes.push(
        new Envelope(seg, this.roadWidth, this.roadRoundness)
      )
    }
  }

  draw(ctx) {
    for (const enve of this.envelopes) {
      enve.draw(ctx)
    }
  }

}