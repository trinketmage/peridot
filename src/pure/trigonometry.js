export function vectorToAngle(p2, p1 = { x: 0, y: 0 }) {
  const x = p2.x - p1.x;
  const y = p2.y - p1.y;
  var rad = Math.atan2(y, x);
  return rad * (180 / Math.PI);
}

export function angleToVector(angle) {
  const theta = (angle * Math.PI) / 180;
  const x = Math.round(Math.cos(theta));
  const y = Math.round(Math.sin(theta));
  return {
    x,
    y
  };
}
