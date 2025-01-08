import { Point } from "../primitives/point.js"

export function getNearestPoint(loc, points, treshold = 12) {
  let minDist = Number.MAX_SAFE_INTEGER
  let nearest = null
  for (const point of points) {
    const dist = distance(point, loc)
    if (dist < minDist && dist < treshold) {
      minDist = dist
      nearest = point
    }
  }
  return nearest
}

function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}

export function subtract(p1, p2) {
  return new Point(p1.x - p2.x, p1.y - p2.y)
}

export function add(p1, p2) {
  return new Point(p1.x + p2.x, p1.y + p2.y)
}

export function scale(p, scaler) {
  return new Point(p.x * scaler, p.y * scaler)
}

export function translate(loc, angle, offset) {
  return new Point(
    loc.x + Math.cos(angle) * offset,
    loc.y + Math.sin(angle) * offset
  )
}

export function angle(p) {
  return Math.atan2(p.y, p.x)
}
