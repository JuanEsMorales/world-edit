export class Segment {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  equals(segment) {
    return this.includesSegment(segment);
  }

  includesSegment({ start, end }) {
    return this.start.equals(start) && this.end.equals(end) ||
    this.start.equals(end) && this.end.equals(start);
  }

  includesPoint(point) {    
    return this.start == point || this.end == point
  }

  draw(ctx, { width = 2, color = 'black', dash = [] } = {}) {    
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.setLineDash(dash) 
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
    ctx.setLineDash([])
  }
}