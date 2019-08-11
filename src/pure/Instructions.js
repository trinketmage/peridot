import { angleToVector } from "@trinketmage/sword";

function checkBounds(robot, { x, y }, grid) {
  const { columns, rows } = grid;
  if (x >= 0 && y >= 0 && x < columns && y < rows) {
    if (
      (grid.data[y][x].bottom.wall && robot.direction.y === -1) ||
      (grid.data[robot.position.y][robot.position.x].bottom.wall &&
        robot.direction.y === 1)
    ) {
      return false;
    } else if (
      (grid.data[y][x].right.wall && robot.direction.x === -1) ||
      (grid.data[robot.position.y][robot.position.x].right.wall &&
        robot.direction.x === 1)
    ) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

export default {
  forward(model) {
    const { direction, position } = model.robot;
    const destination = {
      x: position.x + direction.x,
      y: position.y + direction.y
    };
    if (checkBounds(model.robot, destination, model.grid)) {
      model.robot.position = destination;
    }
  },
  turnLeft(model) {
    model.robot.angle -= 90;
    model.robot.direction = angleToVector(model.robot.angle);
  },
  dropToken(model) {
    if (model.robot.compartment.hold > 0) {
      const { x, y } = model.robot.position;
      model.grid.data[y][x].tokens++;
      model.robot.compartment.hold--;
    }
  },
  pickToken(model) {
    const { x, y } = model.robot.position;
    const { capacity, hold } = model.robot.compartment;
    if (model.grid.data[y][x].tokens > 0 && hold < capacity) {
      model.grid.data[y][x].tokens--;
      model.robot.compartment.hold++;
    }
  },
  end() {}
  // lookSouth(model) {
  //   model.robot.direction = {
  //     x: 0,
  //     y: 1
  //   };
  //   model.robot.angle = vectorToAngle(model.robot.direction);
  // },
  // lookEast(model) {
  //   model.robot.direction = {
  //     x: 1,
  //     y: 0
  //   };
  //   model.robot.angle = vectorToAngle(model.robot.direction);
  // },
  // lookWest(model) {
  //   model.robot.direction = {
  //     x: -1,
  //     y: 0
  //   };
  //   model.robot.angle = vectorToAngle(model.robot.direction);
  // },
  // lookNorth(model) {
  //   model.robot.direction = {
  //     x: 0,
  //     y: -1
  //   };
  //   model.robot.angle = vectorToAngle(model.robot.direction);
  // }
};
