export default {
  help: "help",
  run: "run",
  tokens: "tokens",
  placeholder: "hello Peridot!",
  instructions: {
    forward: "move",
    turnLeft: "left",
    dropToken: "drop_token",
    pickToken: "pick_token",
    end: "end"
  },
  conditions: {
    wallFace: "facing_wall",
    wallLeft: "wall_on_left",
    wallRight: "wall_on_right",
    onToken: "on_token",
    hasToken: "has_token",
    faceNorth: "face_north",
    faceSouth: "face_south",
    faceEast: "face_east",
    faceWest: "face_west"
  },
  structures: {
    define: "define",
    repeat: "repeat",
    times: "times",
    if: "if",
    elseif: "else_if",
    else: "else",
    while: "while"
  },
  operators: {
    and: "and",
    or: "or"
  },
  errors: {
    HitBoundsError: "Peridot had hit the bounds",
    HitWallError: "Peridot had hit a wall",
    MaxToken: "Peridot can't pick more token",
    NoTokenToDrop: "Peridot can't drop any token"
  }
};
