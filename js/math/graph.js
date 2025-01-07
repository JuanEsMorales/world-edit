export class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  dispose() {
    this.points.length = 0
    this.segments.length = 0
  }

  draw(ctx) {
    for (const segment of this.segments) {
      segment.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }

  addPoint(point) {
    this.points.push(point);
  }

  addSegment(segment) {
    this.segments.push(segment);
  }

  containsPoint(point) {
    return this.points.find(p => p.equals(point));
  }

  containsSegment(segment) {
    return this.segments.find(s => s.equals(segment));
  }

  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }

    return false;
  }

  tryAddSegment(segment) {
    if (!this.containsSegment(segment) && !segment.start.equals(segment.end)) {
      this.addSegment(segment);
      return true;
    }

    return false;
  }

  getSegmentsWithPoint(point) {
    const segs = []
    for (const seg of this.segments) {      
      if (seg.includesPoint(point)) {
        segs.push(seg)
      }
    }
    return segs
  }

  removeSegment(segment) {
    const index = this.segments.findIndex(s => s.equals(segment));
    this.segments.splice(index, 1);
  }

  removePoint(point) {
    const segs = this.getSegmentsWithPoint(point)
    for (const seg of segs) {
      this.removeSegment(seg)
    }
    const index = this.points.findIndex(p => p.equals(point));
    this.points.splice(index, 1);
  }
}